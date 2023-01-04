"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMQJobQueueStrategy = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const shared_utils_1 = require("@vendure/common/lib/shared-utils");
const core_1 = require("@vendure/core");
const bullmq_1 = require("bullmq");
const events_1 = require("events");
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("./constants");
const redis_health_indicator_1 = require("./redis-health-indicator");
const QUEUE_NAME = 'vendure-job-queue';
const DEFAULT_CONCURRENCY = 3;
/**
 * @description
 * This JobQueueStrategy uses [BullMQ](https://docs.bullmq.io/) to implement a push-based job queue
 * on top of Redis. It should not be used alone, but as part of the {@link BullMQJobQueuePlugin}.
 *
 * @docsCategory job-queue-plugin
 */
class BullMQJobQueueStrategy {
    constructor() {
        this.queueNameProcessFnMap = new Map();
        this.stopped = false;
    }
    async init(injector) {
        var _a;
        const options = injector.get(constants_1.BULLMQ_PLUGIN_OPTIONS);
        this.options = options;
        this.connectionOptions =
            (_a = options.connection) !== null && _a !== void 0 ? _a : {
                host: 'localhost',
                port: 6379,
                maxRetriesPerRequest: null,
            };
        this.redisConnection =
            this.connectionOptions instanceof events_1.EventEmitter
                ? this.connectionOptions
                : new ioredis_1.default(this.connectionOptions);
        const redisHealthIndicator = injector.get(redis_health_indicator_1.RedisHealthIndicator);
        core_1.Logger.info(`Checking Redis connection...`, constants_1.loggerCtx);
        const health = await redisHealthIndicator.isHealthy('redis');
        if (health.redis.status === 'down') {
            core_1.Logger.error('Could not connect to Redis', constants_1.loggerCtx);
        }
        else {
            core_1.Logger.info(`Connected to Redis ✔`, constants_1.loggerCtx);
        }
        this.queue = new bullmq_1.Queue(QUEUE_NAME, Object.assign(Object.assign({}, options.queueOptions), { connection: this.redisConnection }))
            .on('error', (e) => core_1.Logger.error(`BullMQ Queue error: ${e.message}`, constants_1.loggerCtx, e.stack))
            .on('resumed', () => core_1.Logger.verbose(`BullMQ Queue resumed`, constants_1.loggerCtx))
            .on('paused', () => core_1.Logger.verbose(`BullMQ Queue paused`, constants_1.loggerCtx));
        if (await this.queue.isPaused()) {
            await this.queue.resume();
        }
        this.workerProcessor = async (bullJob) => {
            var _a;
            const queueName = bullJob.name;
            core_1.Logger.debug(`Job ${bullJob.id} [${queueName}] starting (attempt ${bullJob.attemptsMade + 1} of ${(_a = bullJob.opts.attempts) !== null && _a !== void 0 ? _a : 1})`);
            const processFn = this.queueNameProcessFnMap.get(queueName);
            if (processFn) {
                const job = await this.createVendureJob(bullJob);
                try {
                    job.on('progress', _job => bullJob.updateProgress(_job.progress));
                    const result = await processFn(job);
                    await bullJob.updateProgress(100);
                    return result;
                }
                catch (e) {
                    throw e;
                }
            }
            throw new core_1.InternalServerError(`No processor defined for the queue "${queueName}"`);
        };
        this.scheduler = new bullmq_1.QueueScheduler(QUEUE_NAME, Object.assign(Object.assign({}, options.schedulerOptions), { connection: this.redisConnection }))
            .on('error', (e) => core_1.Logger.error(`BullMQ Scheduler error: ${e.message}`, constants_1.loggerCtx, e.stack))
            .on('stalled', jobId => core_1.Logger.warn(`BullMQ Scheduler stalled on job ${jobId}`, constants_1.loggerCtx))
            .on('failed', jobId => core_1.Logger.warn(`BullMQ Scheduler failed on job ${jobId}`, constants_1.loggerCtx));
    }
    async destroy() {
        var _a;
        await Promise.all([this.queue.close(), (_a = this.worker) === null || _a === void 0 ? void 0 : _a.close(), this.scheduler.close()]);
    }
    async add(job) {
        var _a, _b, _c, _d, _e, _f;
        const retries = (_c = (_b = (_a = this.options).setRetries) === null || _b === void 0 ? void 0 : _b.call(_a, job.queueName, job)) !== null && _c !== void 0 ? _c : job.retries;
        const backoff = (_f = (_e = (_d = this.options).setBackoff) === null || _e === void 0 ? void 0 : _e.call(_d, job.queueName, job)) !== null && _f !== void 0 ? _f : {
            delay: 1000,
            type: 'exponential',
        };
        const bullJob = await this.queue.add(job.queueName, job.data, {
            attempts: retries + 1,
            backoff,
        });
        return this.createVendureJob(bullJob);
    }
    async cancelJob(jobId) {
        const bullJob = await this.queue.getJob(jobId);
        if (bullJob) {
            if (await bullJob.isActive()) {
                // Not yet possible in BullMQ, see
                // https://github.com/taskforcesh/bullmq/issues/632
                throw new core_1.InternalServerError(`Cannot cancel a running job`);
            }
            try {
                await bullJob.remove();
                return this.createVendureJob(bullJob);
            }
            catch (e) {
                const message = `Error when cancelling job: ${e.message}`;
                core_1.Logger.error(message, constants_1.loggerCtx);
                throw new core_1.InternalServerError(message);
            }
        }
    }
    async findMany(options) {
        var _a, _b, _c, _d;
        const start = (_a = options === null || options === void 0 ? void 0 : options.skip) !== null && _a !== void 0 ? _a : 0;
        const end = start + ((_b = options === null || options === void 0 ? void 0 : options.take) !== null && _b !== void 0 ? _b : 10);
        let jobTypes = constants_1.ALL_JOB_TYPES;
        const stateFilter = (_c = options === null || options === void 0 ? void 0 : options.filter) === null || _c === void 0 ? void 0 : _c.state;
        if (stateFilter === null || stateFilter === void 0 ? void 0 : stateFilter.eq) {
            switch (stateFilter.eq) {
                case 'PENDING':
                    jobTypes = ['wait'];
                    break;
                case 'RUNNING':
                    jobTypes = ['active'];
                    break;
                case 'COMPLETED':
                    jobTypes = ['completed'];
                    break;
                case 'RETRYING':
                    jobTypes = ['repeat'];
                    break;
                case 'FAILED':
                    jobTypes = ['failed'];
                    break;
                case 'CANCELLED':
                    jobTypes = ['failed'];
                    break;
            }
        }
        const settledFilter = (_d = options === null || options === void 0 ? void 0 : options.filter) === null || _d === void 0 ? void 0 : _d.isSettled;
        if ((settledFilter === null || settledFilter === void 0 ? void 0 : settledFilter.eq) != null) {
            jobTypes =
                settledFilter.eq === true
                    ? ['completed', 'failed']
                    : ['wait', 'waiting-children', 'active', 'repeat', 'delayed', 'paused'];
        }
        let items = [];
        let jobCounts = {};
        try {
            items = await this.queue.getJobs(jobTypes, start, end);
        }
        catch (e) {
            core_1.Logger.error(e.message, constants_1.loggerCtx, e.stack);
        }
        try {
            jobCounts = await this.queue.getJobCounts(...jobTypes);
        }
        catch (e) {
            core_1.Logger.error(e.message, constants_1.loggerCtx, e.stack);
        }
        const totalItems = Object.values(jobCounts).reduce((sum, count) => sum + count, 0);
        return {
            items: await Promise.all(items
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(bullJob => this.createVendureJob(bullJob))),
            totalItems,
        };
    }
    async findManyById(ids) {
        const bullJobs = await Promise.all(ids.map(id => this.queue.getJob(id.toString())));
        return Promise.all(bullJobs.filter(shared_utils_1.notNullOrUndefined).map(j => this.createVendureJob(j)));
    }
    async findOne(id) {
        const bullJob = await this.queue.getJob(id.toString());
        if (bullJob) {
            return this.createVendureJob(bullJob);
        }
    }
    async removeSettledJobs(queueNames, olderThan) {
        try {
            const jobCounts = await this.queue.getJobCounts('completed', 'failed');
            await this.queue.clean(100, 0, 'completed');
            await this.queue.clean(100, 0, 'failed');
            return Object.values(jobCounts).reduce((sum, num) => sum + num, 0);
        }
        catch (e) {
            core_1.Logger.error(e.message, constants_1.loggerCtx, e.stack);
            return 0;
        }
    }
    async start(queueName, process) {
        this.queueNameProcessFnMap.set(queueName, process);
        if (!this.worker) {
            const options = Object.assign(Object.assign({ concurrency: DEFAULT_CONCURRENCY }, this.options.workerOptions), { connection: this.redisConnection });
            this.worker = new bullmq_1.Worker(QUEUE_NAME, this.workerProcessor, options)
                .on('error', e => core_1.Logger.error(`BullMQ Worker error: ${e.message}`, constants_1.loggerCtx, e.stack))
                .on('closing', e => core_1.Logger.verbose(`BullMQ Worker closing: ${e}`, constants_1.loggerCtx))
                .on('closed', () => core_1.Logger.verbose(`BullMQ Worker closed`))
                .on('failed', (job, failedReason) => {
                var _a;
                core_1.Logger.warn(`Job ${job.id} [${job.name}] failed (attempt ${job.attemptsMade} of ${(_a = job.opts.attempts) !== null && _a !== void 0 ? _a : 1})`);
            })
                .on('completed', (job, failedReason) => {
                core_1.Logger.debug(`Job ${job.id} [${job.name}] completed`);
            });
        }
    }
    async stop(queueName, process) {
        if (!this.stopped) {
            this.stopped = true;
            try {
                await Promise.all([
                    this.scheduler.disconnect(),
                    this.queue.disconnect(),
                    this.worker.disconnect(),
                ]);
            }
            catch (e) {
                core_1.Logger.error(e, constants_1.loggerCtx, e.stack);
            }
        }
    }
    async createVendureJob(bullJob) {
        var _a;
        const jobJson = bullJob.toJSON();
        return new core_1.Job({
            queueName: bullJob.name,
            id: bullJob.id,
            state: await this.getState(bullJob),
            data: bullJob.data,
            attempts: bullJob.attemptsMade,
            createdAt: new Date(jobJson.timestamp),
            startedAt: jobJson.processedOn ? new Date(jobJson.processedOn) : undefined,
            settledAt: jobJson.finishedOn ? new Date(jobJson.finishedOn) : undefined,
            error: jobJson.failedReason,
            progress: +jobJson.progress,
            result: jobJson.returnvalue,
            retries: (_a = bullJob.opts.attempts) !== null && _a !== void 0 ? _a : 0,
        });
    }
    async getState(bullJob) {
        const jobJson = bullJob.toJSON();
        if ((await bullJob.isWaiting()) || (await bullJob.isWaitingChildren())) {
            return generated_types_1.JobState.PENDING;
        }
        if (await bullJob.isActive()) {
            return generated_types_1.JobState.RUNNING;
        }
        if (await bullJob.isDelayed()) {
            return generated_types_1.JobState.RETRYING;
        }
        if (await bullJob.isFailed()) {
            return generated_types_1.JobState.FAILED;
        }
        if (await bullJob.isCompleted()) {
            return generated_types_1.JobState.COMPLETED;
        }
        if (!jobJson.finishedOn) {
            return generated_types_1.JobState.CANCELLED;
        }
        throw new core_1.InternalServerError('Could not determine job state');
        // TODO: how to handle "cancelled" state? Currently when we cancel a job, we simply remove all record of it.
    }
}
exports.BullMQJobQueueStrategy = BullMQJobQueueStrategy;
//# sourceMappingURL=bullmq-job-queue-strategy.js.map
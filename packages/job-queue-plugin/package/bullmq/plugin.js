"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BullMQJobQueuePlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMQJobQueuePlugin = void 0;
const core_1 = require("@vendure/core");
const bullmq_job_queue_strategy_1 = require("./bullmq-job-queue-strategy");
const constants_1 = require("./constants");
const redis_health_check_strategy_1 = require("./redis-health-check-strategy");
const redis_health_indicator_1 = require("./redis-health-indicator");
const redis_job_buffer_storage_strategy_1 = require("./redis-job-buffer-storage-strategy");
/**
 * @description
 * This plugin is a drop-in replacement of the DefaultJobQueuePlugin, which implements a push-based
 * job queue strategy built on top of the popular [BullMQ](https://github.com/taskforcesh/bullmq) library.
 *
 * ## Advantages over the DefaultJobQueuePlugin
 *
 * The advantage of this approach is that jobs are stored in Redis rather than in the database. For more complex
 * applications with many job queues and/or multiple worker instances, this can massively reduce the load on the
 * DB server. The reason for this is that the DefaultJobQueuePlugin uses polling to check for new jobs. By default
 * it will poll every 200ms. A typical Vendure instance uses at least 3 queues (handling emails, collections, search index),
 * so even with a single worker instance this results in 15 queries per second to the DB constantly. Adding more
 * custom queues and multiple worker instances can easily result in 50 or 100 queries per second. At this point
 * performance may be impacted.
 *
 * Using this plugin, no polling is needed, as BullMQ will _push_ jobs to the worker(s) as and when they are added
 * to the queue. This results in significantly more scalable performance characteristics, as well as lower latency
 * in processing jobs.
 *
 * ## Installation
 *
 * `yarn add \@vendure/job-queue-plugin bullmq`
 *
 * or
 *
 * `npm install \@vendure/job-queue-plugin bullmq`
 *
 * @example
 * ```ts
 * import { BullMQJobQueuePlugin } from '\@vendure/job-queue-plugin/package/bullmq';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     BullMQJobQueuePlugin.init({
 *       connection: {
 *         port: 6379
 *       }
 *     }),
 *   ],
 * };
 * ```
 *
 * ### Running Redis locally
 *
 * To develop with this plugin, you'll need an instance of Redis to connect to. Here's a docker-compose config
 * that will set up [Redis](https://redis.io/) as well as [Redis Commander](https://github.com/joeferner/redis-commander),
 * which is a web-based UI for interacting with Redis:
 *
 * ```YAML
 * version: "3"
 * services:
 *   redis:
 *     image: bitnami/redis:6.2
 *     hostname: redis
 *     container_name: redis
 *     environment:
 *       - ALLOW_EMPTY_PASSWORD=yes
 *     ports:
 *       - "6379:6379"
 *   redis-commander:
 *     container_name: redis-commander
 *     hostname: redis-commander
 *     image: rediscommander/redis-commander:latest
 *     environment:
 *       - REDIS_HOSTS=local:redis:6379
 *     ports:
 *       - "8085:8081"
 * ```
 *
 * ## Concurrency
 *
 * The default concurrency of a single worker is 3, i.e. up to 3 jobs will be processed at the same time.
 * You can change the concurrency in the `workerOptions` passed to the `init()` method:
 *
 * @example
 * ```TypeScript
 * const config: VendureConfig = {
 *   plugins: [
 *     BullMQJobQueuePlugin.init({
 *       workerOptions: {
 *         concurrency: 10,
 *       },
 *     }),
 *   ],
 * };
 * ```
 *
 * @docsCategory job-queue-plugin
 */
let BullMQJobQueuePlugin = BullMQJobQueuePlugin_1 = class BullMQJobQueuePlugin {
    /**
     * @description
     * Configures the plugin.
     */
    static init(options) {
        this.options = options;
        return this;
    }
};
BullMQJobQueuePlugin = BullMQJobQueuePlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        configuration: config => {
            config.jobQueueOptions.jobQueueStrategy = new bullmq_job_queue_strategy_1.BullMQJobQueueStrategy();
            config.jobQueueOptions.jobBufferStorageStrategy = new redis_job_buffer_storage_strategy_1.RedisJobBufferStorageStrategy();
            config.systemOptions.healthChecks.push(new redis_health_check_strategy_1.RedisHealthCheckStrategy());
            return config;
        },
        providers: [
            { provide: constants_1.BULLMQ_PLUGIN_OPTIONS, useFactory: () => BullMQJobQueuePlugin_1.options },
            redis_health_indicator_1.RedisHealthIndicator,
        ],
    })
], BullMQJobQueuePlugin);
exports.BullMQJobQueuePlugin = BullMQJobQueuePlugin;
//# sourceMappingURL=plugin.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisJobBufferStorageStrategy = void 0;
const core_1 = require("@vendure/core");
const ioredis_1 = __importStar(require("ioredis"));
const constants_1 = require("./constants");
const BUFFER_LIST_PREFIX = 'vendure-job-buffer';
class RedisJobBufferStorageStrategy {
    init(injector) {
        const options = injector.get(constants_1.BULLMQ_PLUGIN_OPTIONS);
        if (options.connection instanceof ioredis_1.default) {
            this.redis = options.connection;
        }
        else if (options.connection instanceof ioredis_1.Cluster) {
            this.redis = options.connection;
        }
        else {
            this.redis = new ioredis_1.default(options.connection);
        }
    }
    async add(bufferId, job) {
        const result = await this.redis.lpush(this.keyName(bufferId), this.toJobConfigString(job));
        return job;
    }
    async bufferSize(bufferIds) {
        const ids = (bufferIds === null || bufferIds === void 0 ? void 0 : bufferIds.length) ? bufferIds : await this.getAllBufferIds();
        const result = {};
        for (const id of bufferIds || []) {
            const key = this.keyName(id);
            const count = await this.redis.llen(key);
            result[id] = count;
        }
        return result;
    }
    async flush(bufferIds) {
        const ids = (bufferIds === null || bufferIds === void 0 ? void 0 : bufferIds.length) ? bufferIds : await this.getAllBufferIds();
        const result = {};
        for (const id of bufferIds || []) {
            const key = this.keyName(id);
            const items = await this.redis.lrange(key, 0, -1);
            await this.redis.del(key);
            result[id] = items.map(item => this.toJob(item));
        }
        return result;
    }
    keyName(bufferId) {
        return `${BUFFER_LIST_PREFIX}:${bufferId}`;
    }
    toJobConfigString(job) {
        var _a;
        const jobConfig = Object.assign(Object.assign({}, job), { data: job.data, id: (_a = job.id) !== null && _a !== void 0 ? _a : undefined });
        return JSON.stringify(jobConfig);
    }
    toJob(jobConfigString) {
        try {
            const jobConfig = JSON.parse(jobConfigString);
            return new core_1.Job(jobConfig);
        }
        catch (e) {
            core_1.Logger.error(`Could not parse buffered job:\n${e.message}`, constants_1.loggerCtx, e.stack);
            throw e;
        }
    }
    async getAllBufferIds() {
        const stream = this.redis.scanStream({
            match: `${BUFFER_LIST_PREFIX}:*`,
        });
        const keys = await new Promise((resolve, reject) => {
            const allKeys = [];
            stream.on('data', _keys => allKeys.push(..._keys));
            stream.on('end', () => resolve(allKeys));
            stream.on('error', err => reject(err));
        });
        return keys.map(key => key.replace(`${BUFFER_LIST_PREFIX}:`, ''));
    }
}
exports.RedisJobBufferStorageStrategy = RedisJobBufferStorageStrategy;
//# sourceMappingURL=redis-job-buffer-storage-strategy.js.map
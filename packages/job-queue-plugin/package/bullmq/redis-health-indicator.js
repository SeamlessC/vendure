"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const core_1 = require("@vendure/core");
const bullmq_1 = require("bullmq");
const constants_1 = require("./constants");
let RedisHealthIndicator = class RedisHealthIndicator extends terminus_1.HealthIndicator {
    constructor(options) {
        super();
        this.options = options;
    }
    async isHealthy(key, timeoutMs = 5000) {
        const connection = new bullmq_1.RedisConnection(this.options.connection);
        const pingResult = await new Promise(async (resolve, reject) => {
            try {
                connection.on('error', err => {
                    core_1.Logger.error(`Redis health check error: ${err.message}`, constants_1.loggerCtx, err.stack);
                    resolve(err);
                });
                if (this.timeoutTimer) {
                    clearTimeout(this.timeoutTimer);
                }
                const timeout = new Promise(_resolve => (this.timeoutTimer = setTimeout(_resolve, timeoutMs)));
                const client = await Promise.race([connection.client, timeout]);
                clearTimeout(this.timeoutTimer);
                if (!client) {
                    resolve('timeout');
                    return;
                }
                client.ping((err, res) => {
                    if (err) {
                        resolve(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }
            catch (e) {
                resolve(e);
            }
        });
        try {
            await connection.close();
            // await connection.disconnect();
        }
        catch (e) {
            core_1.Logger.error(`Redis health check error closing connection: ${e.message}`, constants_1.loggerCtx, e.stack);
        }
        const result = this.getStatus(key, pingResult === 'PONG');
        if (pingResult === 'PONG') {
            return result;
        }
        throw new terminus_1.HealthCheckError('Redis failed', result);
    }
};
RedisHealthIndicator = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.BULLMQ_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], RedisHealthIndicator);
exports.RedisHealthIndicator = RedisHealthIndicator;
//# sourceMappingURL=redis-health-indicator.js.map
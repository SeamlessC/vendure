"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisHealthCheckStrategy = void 0;
const redis_health_indicator_1 = require("./redis-health-indicator");
let indicator;
class RedisHealthCheckStrategy {
    init(injector) {
        indicator = injector.get(redis_health_indicator_1.RedisHealthIndicator);
    }
    getHealthIndicator() {
        return () => indicator.isHealthy('redis (job queue)');
    }
}
exports.RedisHealthCheckStrategy = RedisHealthCheckStrategy;
//# sourceMappingURL=redis-health-check-strategy.js.map
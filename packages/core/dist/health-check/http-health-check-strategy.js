"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHealthCheckStrategy = void 0;
const terminus_1 = require("@nestjs/terminus");
let indicator;
/**
 * @description
 * A {@link HealthCheckStrategy} used to check health by pinging a url. Internally it uses
 * the [NestJS HttpHealthIndicator](https://docs.nestjs.com/recipes/terminus#http-healthcheck).
 *
 * @example
 * ```TypeScript
 * import { HttpHealthCheckStrategy, TypeORMHealthCheckStrategy } from '\@vendure/core';
 *
 * export const config = {
 *   // ...
 *   systemOptions: {
 *     healthChecks: [
 *       new TypeORMHealthCheckStrategy(),
 *       new HttpHealthCheckStrategy({ key: 'my-service', url: 'https://my-service.com' }),
 *     ]
 *   },
 * };
 * ```
 *
 * @docsCategory health-check
 */
class HttpHealthCheckStrategy {
    constructor(options) {
        this.options = options;
    }
    async init(injector) {
        indicator = await injector.get(terminus_1.HttpHealthIndicator);
    }
    getHealthIndicator() {
        const { key, url, timeout } = this.options;
        return () => indicator.pingCheck(key, url, { timeout });
    }
}
exports.HttpHealthCheckStrategy = HttpHealthCheckStrategy;
//# sourceMappingURL=http-health-check-strategy.js.map
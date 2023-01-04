import { HealthIndicatorFunction } from '@nestjs/terminus';
import { Injector } from '../common/index';
import { HealthCheckStrategy } from '../config/system/health-check-strategy';
export interface HttpHealthCheckOptions {
    key: string;
    url: string;
    timeout?: number;
}
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
export declare class HttpHealthCheckStrategy implements HealthCheckStrategy {
    private options;
    constructor(options: HttpHealthCheckOptions);
    init(injector: Injector): Promise<void>;
    getHealthIndicator(): HealthIndicatorFunction;
}

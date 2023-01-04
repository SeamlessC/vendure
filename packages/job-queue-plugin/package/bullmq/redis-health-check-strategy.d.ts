import { HealthIndicatorFunction } from '@nestjs/terminus';
import { HealthCheckStrategy, Injector } from '@vendure/core';
export declare class RedisHealthCheckStrategy implements HealthCheckStrategy {
    init(injector: Injector): void;
    getHealthIndicator(): HealthIndicatorFunction;
}

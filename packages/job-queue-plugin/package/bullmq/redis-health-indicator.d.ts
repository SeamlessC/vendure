import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { BullMQPluginOptions } from './types';
export declare class RedisHealthIndicator extends HealthIndicator {
    private options;
    private timeoutTimer;
    constructor(options: BullMQPluginOptions);
    isHealthy(key: string, timeoutMs?: number): Promise<HealthIndicatorResult>;
}

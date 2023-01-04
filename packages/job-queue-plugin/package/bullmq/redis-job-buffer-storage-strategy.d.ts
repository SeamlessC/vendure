import { Injector, Job, JobBufferStorageStrategy } from '@vendure/core';
export declare class RedisJobBufferStorageStrategy implements JobBufferStorageStrategy {
    private redis;
    init(injector: Injector): void;
    add(bufferId: string, job: Job<any>): Promise<Job<any>>;
    bufferSize(bufferIds?: string[]): Promise<{
        [bufferId: string]: number;
    }>;
    flush(bufferIds?: string[]): Promise<{
        [bufferId: string]: Job[];
    }>;
    private keyName;
    private toJobConfigString;
    private toJob;
    private getAllBufferIds;
}

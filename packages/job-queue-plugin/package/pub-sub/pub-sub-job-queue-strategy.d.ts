import { InjectableJobQueueStrategy, Injector, Job, JobData, JobQueueStrategy } from '@vendure/core';
export declare class PubSubJobQueueStrategy extends InjectableJobQueueStrategy implements JobQueueStrategy {
    private concurrency;
    private queueNamePubSubPair;
    private pubSubClient;
    private topics;
    private subscriptions;
    private listeners;
    init(injector: Injector): void;
    destroy(): void;
    add<Data extends JobData<Data> = {}>(job: Job<Data>): Promise<Job<Data>>;
    start<Data extends JobData<Data> = {}>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    stop<Data extends JobData<Data> = {}>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private topic;
    private subscription;
}

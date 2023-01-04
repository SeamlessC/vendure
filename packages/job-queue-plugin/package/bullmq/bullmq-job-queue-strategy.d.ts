import { JobListOptions } from '@vendure/common/lib/generated-types';
import { ID, Injector, InspectableJobQueueStrategy, Job, JobData, PaginatedList } from '@vendure/core';
/**
 * @description
 * This JobQueueStrategy uses [BullMQ](https://docs.bullmq.io/) to implement a push-based job queue
 * on top of Redis. It should not be used alone, but as part of the {@link BullMQJobQueuePlugin}.
 *
 * @docsCategory job-queue-plugin
 */
export declare class BullMQJobQueueStrategy implements InspectableJobQueueStrategy {
    private redisConnection;
    private connectionOptions;
    private queue;
    private worker;
    private scheduler;
    private workerProcessor;
    private options;
    private queueNameProcessFnMap;
    init(injector: Injector): Promise<void>;
    destroy(): Promise<void>;
    add<Data extends JobData<Data> = {}>(job: Job<Data>): Promise<Job<Data>>;
    cancelJob(jobId: string): Promise<Job | undefined>;
    findMany(options?: JobListOptions): Promise<PaginatedList<Job>>;
    findManyById(ids: ID[]): Promise<Job[]>;
    findOne(id: ID): Promise<Job | undefined>;
    removeSettledJobs(queueNames?: string[], olderThan?: Date): Promise<number>;
    start<Data extends JobData<Data> = {}>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private stopped;
    stop<Data extends JobData<Data> = {}>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private createVendureJob;
    private getState;
}

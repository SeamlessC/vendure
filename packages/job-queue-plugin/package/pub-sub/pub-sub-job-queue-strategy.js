"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubJobQueueStrategy = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
class PubSubJobQueueStrategy extends core_1.InjectableJobQueueStrategy {
    constructor() {
        super(...arguments);
        this.topics = new Map();
        this.subscriptions = new Map();
        this.listeners = new core_1.QueueNameProcessStorage();
    }
    init(injector) {
        var _a, _b;
        this.pubSubClient = injector.get(pubsub_1.PubSub);
        const options = injector.get(constants_1.PUB_SUB_OPTIONS);
        this.concurrency = (_a = options.concurrency) !== null && _a !== void 0 ? _a : 20;
        this.queueNamePubSubPair = (_b = options.queueNamePubSubPair) !== null && _b !== void 0 ? _b : new Map();
        super.init(injector);
    }
    destroy() {
        super.destroy();
        for (const subscription of this.subscriptions.values()) {
            subscription.removeAllListeners('message');
        }
        this.subscriptions.clear();
        this.topics.clear();
    }
    async add(job) {
        if (!this.hasInitialized) {
            throw new Error('Cannot add job before init');
        }
        const id = await this.topic(job.queueName).publish(Buffer.from(JSON.stringify(job.data)));
        core_1.Logger.debug(`Sent message ${job.queueName}: ${id}`);
        return new core_1.Job({
            id,
            queueName: job.queueName,
            data: job.data,
            attempts: 0,
            state: generated_types_1.JobState.PENDING,
            createdAt: new Date(),
        });
    }
    async start(queueName, process) {
        if (!this.hasInitialized) {
            this.started.set(queueName, process);
            return;
        }
        if (this.listeners.has(queueName, process)) {
            return;
        }
        const subscription = this.subscription(queueName);
        const listener = (message) => {
            core_1.Logger.debug(`Received message: ${queueName}: ${message.id}`, constants_1.loggerCtx);
            const job = new core_1.Job({
                id: message.id,
                queueName,
                data: JSON.parse(message.data.toString()),
                attempts: message.deliveryAttempt,
                state: generated_types_1.JobState.RUNNING,
                startedAt: new Date(),
                createdAt: message.publishTime,
            });
            process(job)
                .then(() => {
                message.ack();
            })
                .catch(err => {
                message.nack();
            });
        };
        this.listeners.set(queueName, process, listener);
        subscription.on('message', listener);
    }
    async stop(queueName, process) {
        const listener = this.listeners.getAndDelete(queueName, process);
        if (!listener) {
            return;
        }
        this.subscription(queueName).off('message', listener);
    }
    topic(queueName) {
        let topic = this.topics.get(queueName);
        if (topic) {
            return topic;
        }
        const pair = this.queueNamePubSubPair.get(queueName);
        if (!pair) {
            throw new Error(`Topic name not set for queue: ${queueName}`);
        }
        const [topicName, subscriptionName] = pair;
        topic = this.pubSubClient.topic(topicName);
        this.topics.set(queueName, topic);
        return topic;
    }
    subscription(queueName) {
        let subscription = this.subscriptions.get(queueName);
        if (subscription) {
            return subscription;
        }
        const pair = this.queueNamePubSubPair.get(queueName);
        if (!pair) {
            throw new Error(`Subscription name not set for queue: ${queueName}`);
        }
        const [topicName, subscriptionName] = pair;
        subscription = this.topic(queueName).subscription(subscriptionName, {
            flowControl: {
                maxMessages: this.concurrency,
            },
        });
        this.subscriptions.set(queueName, subscription);
        return subscription;
    }
}
exports.PubSubJobQueueStrategy = PubSubJobQueueStrategy;
//# sourceMappingURL=pub-sub-job-queue-strategy.js.map
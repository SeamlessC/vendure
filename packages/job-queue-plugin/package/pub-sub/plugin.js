"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PubSubPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubPlugin = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const pub_sub_job_queue_strategy_1 = require("./pub-sub-job-queue-strategy");
let PubSubPlugin = PubSubPlugin_1 = class PubSubPlugin {
    static init(options) {
        this.options = options;
        return PubSubPlugin_1;
    }
};
PubSubPlugin = PubSubPlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        providers: [
            { provide: constants_1.PUB_SUB_OPTIONS, useFactory: () => PubSubPlugin_1.options },
            { provide: pubsub_1.PubSub, useFactory: () => new pubsub_1.PubSub() },
        ],
        configuration: config => {
            config.jobQueueOptions.jobQueueStrategy = new pub_sub_job_queue_strategy_1.PubSubJobQueueStrategy();
            return config;
        },
    })
], PubSubPlugin);
exports.PubSubPlugin = PubSubPlugin;
//# sourceMappingURL=plugin.js.map
import { Type } from '@vendure/core';
import { PubSubOptions } from './options';
export declare class PubSubPlugin {
    private static options;
    static init(options: PubSubOptions): Type<PubSubPlugin>;
}

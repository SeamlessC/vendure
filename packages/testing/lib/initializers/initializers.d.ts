import { ConnectionOptions } from 'typeorm';
import { TestDbInitializer } from './test-db-initializer';
export declare type InitializerRegistry = {
    [type in ConnectionOptions['type']]?: TestDbInitializer<any>;
};
/**
 * @description
 * Registers a {@link TestDbInitializer} for the given database type. Should be called before invoking
 * {@link createTestEnvironment}.
 *
 * @docsCategory testing
 */
export declare function registerInitializer(type: ConnectionOptions['type'], initializer: TestDbInitializer<any>): void;
export declare function getInitializerFor(type: ConnectionOptions['type']): TestDbInitializer<any>;

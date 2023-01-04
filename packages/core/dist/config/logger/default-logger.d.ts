import { LogLevel, VendureLogger } from './vendure-logger';
/**
 * @description
 * The default logger, which logs to the console (stdout) with optional timestamps. Since this logger is part of the
 * default Vendure configuration, you do not need to specify it explicitly in your server config. You would only need
 * to specify it if you wish to change the log level (which defaults to `LogLevel.Info`) or remove the timestamp.
 *
 * @example
 * ```ts
 * import { DefaultLogger, LogLevel, VendureConfig } from '\@vendure/core';
 *
 * export config: VendureConfig = {
 *     // ...
 *     logger: new DefaultLogger({ level: LogLevel.Debug, timestamp: false }),
 * }
 * ```
 *
 * @docsCategory Logger
 */
export declare class DefaultLogger implements VendureLogger {
    /** @internal */
    level: LogLevel;
    private readonly timestamp;
    private defaultContext;
    private readonly localeStringOptions;
    private static originalLogLevel;
    constructor(options?: {
        level?: LogLevel;
        timestamp?: boolean;
    });
    /**
     * @description
     * A work-around to hide the info-level logs generated by Nest when bootstrapping the AppModule.
     * To be run directly before the `NestFactory.create()` call in the `bootstrap()` function.
     *
     * See https://github.com/nestjs/nest/issues/1838
     * @internal
     */
    static hideNestBoostrapLogs(): void;
    /**
     * @description
     * If the log level was changed by `hideNestBoostrapLogs()`, this method will restore the
     * original log level. To be run directly after the `NestFactory.create()` call in the
     * `bootstrap()` function.
     *
     * See https://github.com/nestjs/nest/issues/1838
     * @internal
     */
    static restoreOriginalLogLevel(): void;
    setDefaultContext(defaultContext: string): void;
    error(message: string, context?: string, trace?: string | undefined): void;
    warn(message: string, context?: string): void;
    info(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    private logMessage;
    private logContext;
    private logTimestamp;
    private ensureString;
}

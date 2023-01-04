"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServer = void 0;
const core_1 = require("@nestjs/core");
const core_2 = require("@vendure/core");
const bootstrap_1 = require("@vendure/core/dist/bootstrap");
const populate_for_testing_1 = require("./data-population/populate-for-testing");
const initializers_1 = require("./initializers/initializers");
// tslint:disable:no-console
/**
 * @description
 * A real Vendure server against which the e2e tests should be run.
 *
 * @docsCategory testing
 */
class TestServer {
    constructor(vendureConfig) {
        this.vendureConfig = vendureConfig;
    }
    /**
     * @description
     * Bootstraps an instance of Vendure server and populates the database according to the options
     * passed in. Should be called in the `beforeAll` function.
     *
     * The populated data is saved into an .sqlite file for each test file. On subsequent runs, this file
     * is loaded so that the populate step can be skipped, which speeds up the tests significantly.
     */
    async init(options) {
        const { type } = this.vendureConfig.dbConnectionOptions;
        const { dbConnectionOptions } = this.vendureConfig;
        const testFilename = this.getCallerFilename(1);
        const initializer = initializers_1.getInitializerFor(type);
        try {
            await initializer.init(testFilename, dbConnectionOptions);
            const populateFn = () => this.populateInitialData(this.vendureConfig, options);
            await initializer.populate(populateFn);
            await initializer.destroy();
        }
        catch (e) {
            throw e;
        }
        await this.bootstrap();
    }
    /**
     * @description
     * Bootstraps a Vendure server instance. Generally the `.init()` method should be used, as that will also
     * populate the test data. However, the `bootstrap()` method is sometimes useful in tests which need to
     * start and stop a Vendure instance multiple times without re-populating data.
     */
    async bootstrap() {
        this.app = await this.bootstrapForTesting(this.vendureConfig);
    }
    /**
     * @description
     * Destroy the Vendure server instance and clean up all resources.
     * Should be called after all tests have run, e.g. in an `afterAll` function.
     */
    async destroy() {
        // allow a grace period of any outstanding async tasks to complete
        await new Promise(resolve => global.setTimeout(resolve, 500));
        await this.app.close();
    }
    getCallerFilename(depth) {
        let pst;
        let stack;
        let file;
        let frame;
        pst = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, _stack) => {
            Error.prepareStackTrace = pst;
            return _stack;
        };
        stack = new Error().stack;
        stack = stack.slice(depth + 1);
        do {
            frame = stack.shift();
            file = frame && frame.getFileName();
        } while (stack.length && file === 'module.js');
        return file;
    }
    /**
     * Populates an .sqlite database file based on the PopulateOptions.
     */
    async populateInitialData(testingConfig, options) {
        const app = await populate_for_testing_1.populateForTesting(testingConfig, this.bootstrapForTesting, Object.assign({ logging: false }, options));
        await app.close();
    }
    /**
     * Bootstraps an instance of the Vendure server for testing against.
     */
    async bootstrapForTesting(userConfig) {
        const config = await bootstrap_1.preBootstrapConfig(userConfig);
        core_2.Logger.useLogger(config.logger);
        const appModule = await Promise.resolve().then(() => __importStar(require('@vendure/core/dist/app.module')));
        try {
            core_2.DefaultLogger.hideNestBoostrapLogs();
            const app = await core_1.NestFactory.create(appModule.AppModule, {
                cors: config.apiOptions.cors,
                logger: new core_2.Logger(),
            });
            const earlyMiddlewares = config.apiOptions.middleware.filter(mid => mid.beforeListen);
            earlyMiddlewares.forEach(mid => {
                app.use(mid.route, mid.handler);
            });
            await app.listen(config.apiOptions.port);
            await app.get(core_2.JobQueueService).start();
            core_2.DefaultLogger.restoreOriginalLogLevel();
            return app;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
}
exports.TestServer = TestServer;
//# sourceMappingURL=test-server.js.map
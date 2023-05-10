"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../core/typings.d.ts" />
const core_1 = require("@vendure/core");
const cli_1 = require("@vendure/core/cli");
const initial_data_1 = require("@vendure/core/mock-data/data-sources/initial-data");
const testing_1 = require("@vendure/testing");
const path_1 = __importDefault(require("path"));
const dev_config_1 = require("./dev-config");
// tslint:disable:no-console
/**
 * A CLI script which populates the dev database with deterministic random data.
 */
if (require.main === module) {
    // Running from command line
    const populateConfig = core_1.mergeConfig(core_1.defaultConfig, core_1.mergeConfig(dev_config_1.devConfig, {
        authOptions: {
            tokenMethod: 'bearer',
            requireVerification: false,
        },
        importExportOptions: {
            importAssetsDir: path_1.default.join(__dirname, '../core/mock-data/assets'),
        },
        customFields: {},
    }));
    testing_1.clearAllTables(populateConfig, true).then(() => cli_1.populate(() => core_1.bootstrap(populateConfig).then(async (app) => {
        await app.get(core_1.JobQueueService).start();
        return app;
    }), initial_data_1.initialData, path_1.default.join(__dirname, './all_input.csv'))
        // )
        .then(async (app) => {
        console.log('populating customers...');
        // await populateCustomers(app, 10, message => Logger.error(message));
        return app.close();
    })
        .then(() => process.exit(0), err => {
        console.log(err);
        process.exit(1);
    }));
}
//# sourceMappingURL=populate-dev-server.js.map
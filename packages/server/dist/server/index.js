"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const dev_config_1 = require("./dev-config");
/**
 * This bootstraps the dev server, used for testing Vendure during development.
 */
core_1.bootstrap(dev_config_1.devConfig)
    .then(app => {
    if (process.env.RUN_JOB_QUEUE === '1') {
        app.get(core_1.JobQueueService).start();
    }
})
    .catch(err => {
    // tslint:disable-next-line
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
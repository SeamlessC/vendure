"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const commander_1 = __importDefault(require("commander"));
const dev_config_1 = require("./dev-config");
commander_1.default
    .command('generate <name>')
    .description('Generate a new migration file with the given name')
    .action(name => {
    return core_1.generateMigration(dev_config_1.devConfig, { name, outputDir: './migrations' });
});
commander_1.default
    .command('run')
    .description('Run all pending migrations')
    .action(() => {
    return core_1.runMigrations(dev_config_1.devConfig);
});
commander_1.default
    .command('revert')
    .description('Revert the last applied migration')
    .action(() => {
    return core_1.revertLastMigration(dev_config_1.devConfig);
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=migration.js.map
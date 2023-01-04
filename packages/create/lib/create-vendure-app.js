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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-console */
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = __importDefault(require("commander"));
const detect_port_1 = __importDefault(require("detect-port"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const listr_1 = __importDefault(require("listr"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const rxjs_1 = require("rxjs");
const constants_1 = require("./constants");
const gather_user_responses_1 = require("./gather-user-responses");
const helpers_1 = require("./helpers");
// tslint:disable-next-line:no-var-requires
const packageJson = require('../package.json');
helpers_1.checkNodeVersion(constants_1.REQUIRED_NODE_VERSION);
let projectName;
// Set the environment variable which can then be used to
// conditionally modify behaviour of core or plugins.
const createEnvVar = 'CREATING_VENDURE_APP';
process.env[createEnvVar] = 'true';
commander_1.default
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk_1.default.green('<project-directory>')} [options]`)
    .action(name => {
    projectName = name;
})
    .option('--log-level <logLevel>', `Log level, either 'silent', 'info', or 'verbose'`, /^(silent|info|verbose)$/i, 'silent')
    .option('--use-npm', 'Uses npm rather than Yarn as the default package manager')
    .option('--ci', 'Runs without prompts for use in CI scenarios')
    .parse(process.argv);
const options = commander_1.default.opts();
createApp(projectName, options.useNpm, options.logLevel || 'silent', options.ci);
async function createApp(name, useNpm, logLevel, isCi = false) {
    if (!runPreChecks(name, useNpm)) {
        return;
    }
    if (await helpers_1.isServerPortInUse()) {
        console.log(chalk_1.default.red(`Port ${constants_1.SERVER_PORT} is in use. Please make it available and then re-try.`));
        process.exit(1);
    }
    console.log(chalk_1.default.cyan(`Welcome to @vendure/create v${packageJson.version}!`));
    console.log();
    console.log(`Let's configure a new Vendure project. First a few questions:`);
    console.log();
    const root = path_1.default.resolve(name);
    const appName = path_1.default.basename(root);
    const scaffoldExists = helpers_1.scaffoldAlreadyExists(root, name);
    const useYarn = useNpm ? false : helpers_1.shouldUseYarn();
    if (scaffoldExists) {
        console.log(chalk_1.default.green(`It appears that a new Vendure project scaffold already exists. Re-using the existing files...`));
        console.log();
    }
    const { dbType, configSource, envSource, envDtsSource, indexSource, indexWorkerSource, migrationSource, readmeSource, dockerfileSource, dockerComposeSource, populateProducts, } = isCi
        ? await gather_user_responses_1.gatherCiUserResponses(root, useYarn)
        : await gather_user_responses_1.gatherUserResponses(root, scaffoldExists, useYarn);
    const originalDirectory = process.cwd();
    process.chdir(root);
    if (!useYarn && !helpers_1.checkThatNpmCanReadCwd()) {
        process.exit(1);
    }
    const packageJsonContents = {
        name: appName,
        version: '0.1.0',
        private: true,
        scripts: {
            'dev:server': 'ts-node ./src/index.ts',
            'dev:worker': 'ts-node ./src/index-worker.ts',
            dev: useYarn ? 'concurrently yarn:dev:*' : 'concurrently npm:dev:*',
            build: 'tsc',
            'start:server': 'node ./dist/index.js',
            'start:worker': 'node ./dist/index-worker.js',
            start: useYarn ? 'concurrently yarn:start:*' : 'concurrently npm:start:*',
            'migration:generate': 'ts-node migration generate',
            'migration:run': 'ts-node migration run',
            'migration:revert': 'ts-node migration revert',
        },
    };
    console.log();
    console.log(`Setting up your new Vendure project in ${chalk_1.default.green(root)}`);
    console.log('This may take a few minutes...');
    console.log();
    const rootPathScript = (fileName) => path_1.default.join(root, `${fileName}.ts`);
    const srcPathScript = (fileName) => path_1.default.join(root, 'src', `${fileName}.ts`);
    const listrTasks = [];
    if (scaffoldExists) {
        // ...
    }
    else {
        listrTasks.push({
            title: 'Installing dependencies',
            task: (() => {
                return new rxjs_1.Observable(subscriber => {
                    subscriber.next('Creating package.json');
                    fs_extra_1.default.writeFileSync(path_1.default.join(root, 'package.json'), JSON.stringify(packageJsonContents, null, 2) + os_1.default.EOL);
                    const { dependencies, devDependencies } = helpers_1.getDependencies(dbType, isCi ? `@${packageJson.version}` : '');
                    subscriber.next(`Installing ${dependencies.join(', ')}`);
                    helpers_1.installPackages(root, useYarn, dependencies, false, logLevel, isCi)
                        .then(() => {
                        if (devDependencies.length) {
                            subscriber.next(`Installing ${devDependencies.join(', ')}`);
                            return helpers_1.installPackages(root, useYarn, devDependencies, true, logLevel, isCi);
                        }
                    })
                        .then(() => subscriber.complete())
                        .catch(err => subscriber.error(err));
                });
            }),
        }, {
            title: 'Generating app scaffold',
            task: ctx => {
                return new rxjs_1.Observable(subscriber => {
                    fs_extra_1.default.ensureDirSync(path_1.default.join(root, 'src'));
                    const assetPath = (fileName) => path_1.default.join(__dirname, '../assets', fileName);
                    ctx.configFile = srcPathScript('vendure-config');
                    fs_extra_1.default.writeFile(ctx.configFile, configSource)
                        .then(() => fs_extra_1.default.writeFile(path_1.default.join(root, '.env'), envSource))
                        .then(() => fs_extra_1.default.writeFile(srcPathScript('environment.d'), envDtsSource))
                        .then(() => fs_extra_1.default.writeFile(srcPathScript('index'), indexSource))
                        .then(() => fs_extra_1.default.writeFile(srcPathScript('index-worker'), indexWorkerSource))
                        .then(() => fs_extra_1.default.writeFile(rootPathScript('migration'), migrationSource))
                        .then(() => fs_extra_1.default.writeFile(path_1.default.join(root, 'README.md'), readmeSource))
                        .then(() => fs_extra_1.default.writeFile(path_1.default.join(root, 'Dockerfile'), dockerfileSource))
                        .then(() => fs_extra_1.default.writeFile(path_1.default.join(root, 'docker-compose.yml'), dockerComposeSource))
                        .then(() => fs_extra_1.default.mkdir(path_1.default.join(root, 'src/plugins')))
                        .then(() => fs_extra_1.default.copyFile(assetPath('gitignore.template'), path_1.default.join(root, '.gitignore')))
                        .then(() => {
                        subscriber.next(`Created files`);
                        return fs_extra_1.default.copyFile(assetPath('tsconfig.template.json'), path_1.default.join(root, 'tsconfig.json'));
                    })
                        .then(() => createDirectoryStructure(root))
                        .then(() => {
                        subscriber.next(`Created directory structure`);
                        return copyEmailTemplates(root);
                    })
                        .then(() => {
                        subscriber.next(`Copied email templates`);
                        subscriber.complete();
                    })
                        .catch(err => subscriber.error(err));
                });
            },
        });
    }
    listrTasks.push({
        title: 'Initializing server',
        task: async (ctx) => {
            try {
                // register ts-node so that the config file can be loaded
                require(path_1.default.join(root, 'node_modules/ts-node')).register();
                const { populate } = await Promise.resolve().then(() => __importStar(require(path_1.default.join(root, 'node_modules/@vendure/core/cli/populate'))));
                const { bootstrap, DefaultLogger, LogLevel, JobQueueService } = await Promise.resolve().then(() => __importStar(require(path_1.default.join(root, 'node_modules/@vendure/core/dist/index'))));
                const configFile = srcPathScript('vendure-config');
                const { config } = await Promise.resolve().then(() => __importStar(require(configFile)));
                const assetsDir = path_1.default.join(__dirname, '../assets');
                const initialDataPath = path_1.default.join(assetsDir, 'initial-data.json');
                const port = await detect_port_1.default(3000);
                const vendureLogLevel = logLevel === 'silent'
                    ? LogLevel.Error
                    : logLevel === 'verbose'
                        ? LogLevel.Verbose
                        : LogLevel.Info;
                const bootstrapFn = async () => {
                    var _a;
                    await helpers_1.checkDbConnection(config.dbConnectionOptions, root);
                    const _app = await bootstrap(Object.assign(Object.assign({}, config), { apiOptions: Object.assign(Object.assign({}, ((_a = config.apiOptions) !== null && _a !== void 0 ? _a : {})), { port }), silent: logLevel === 'silent', dbConnectionOptions: Object.assign(Object.assign({}, config.dbConnectionOptions), { synchronize: true }), logger: new DefaultLogger({ level: vendureLogLevel }), importExportOptions: {
                            importAssetsDir: path_1.default.join(assetsDir, 'images'),
                        } }));
                    await _app.get(JobQueueService).start();
                    return _app;
                };
                const app = await populate(bootstrapFn, initialDataPath, populateProducts ? path_1.default.join(assetsDir, 'products.csv') : undefined);
                // Pause to ensure the worker jobs have time to complete.
                if (isCi) {
                    console.log('[CI] Pausing before close...');
                }
                await new Promise(resolve => setTimeout(resolve, isCi ? 30000 : 2000));
                await app.close();
                if (isCi) {
                    console.log('[CI] Pausing after close...');
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            }
            catch (e) {
                console.log();
                console.error(chalk_1.default.red(e.message));
                console.log();
                console.log(e);
                throw e;
            }
        },
    });
    const tasks = new listr_1.default(listrTasks);
    try {
        await tasks.run();
    }
    catch (e) {
        process.exit(1);
    }
    const startCommand = useYarn ? 'yarn dev' : 'npm run dev';
    console.log();
    console.log(chalk_1.default.green(`Success! Created a new Vendure server at ${root}`));
    console.log();
    console.log(`We suggest that you start by typing:`);
    console.log();
    console.log(chalk_1.default.green(`    cd ${name}`));
    console.log(chalk_1.default.green(`    ${startCommand}`));
    console.log();
    console.log('Happy hacking!');
    process.exit(0);
}
/**
 * Run some initial checks to ensure that it is okay to proceed with creating
 * a new Vendure project in the given location.
 */
function runPreChecks(name, useNpm) {
    if (typeof name === 'undefined') {
        console.error('Please specify the project directory:');
        console.log(`  ${chalk_1.default.cyan(commander_1.default.name())} ${chalk_1.default.green('<project-directory>')}`);
        console.log();
        console.log('For example:');
        console.log(`  ${chalk_1.default.cyan(commander_1.default.name())} ${chalk_1.default.green('my-vendure-app')}`);
        process.exit(1);
        return false;
    }
    const root = path_1.default.resolve(name);
    fs_extra_1.default.ensureDirSync(name);
    if (!helpers_1.isSafeToCreateProjectIn(root, name)) {
        process.exit(1);
    }
    return true;
}
/**
 * Generate the default directory structure for a new Vendure project
 */
async function createDirectoryStructure(root) {
    await fs_extra_1.default.ensureDir(path_1.default.join(root, 'static', 'email', 'test-emails'));
    await fs_extra_1.default.ensureDir(path_1.default.join(root, 'static', 'assets'));
}
/**
 * Copy the email templates into the app
 */
async function copyEmailTemplates(root) {
    const templateDir = path_1.default.join(root, 'node_modules/@vendure/email-plugin/templates');
    try {
        await fs_extra_1.default.copy(templateDir, path_1.default.join(root, 'static', 'email', 'templates'));
    }
    catch (err) {
        console.error(chalk_1.default.red(`Failed to copy email templates.`));
    }
}
//# sourceMappingURL=create-vendure-app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherCiUserResponses = exports.gatherUserResponses = void 0;
const shared_constants_1 = require("@vendure/common/lib/shared-constants");
const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
// tslint:disable:no-console
/**
 * Prompts the user to determine how the new Vendure app should be configured.
 */
async function gatherUserResponses(root, alreadyRanScaffold, useYarn) {
    function onSubmit(prompt, answer) {
        if (prompt.name === 'dbType') {
            dbType = answer;
        }
    }
    let dbType;
    const scaffoldPrompts = [
        {
            type: 'select',
            name: 'dbType',
            message: 'Which database are you using?',
            choices: [
                { title: 'MySQL', value: 'mysql' },
                { title: 'MariaDB', value: 'mariadb' },
                { title: 'Postgres', value: 'postgres' },
                { title: 'SQLite', value: 'sqlite' },
                { title: 'SQL.js', value: 'sqljs' },
                // Don't show these until they have been tested.
                // { title: 'MS SQL Server', value: 'mssql' },
                // { title: 'Oracle', value: 'oracle' },
            ],
            initial: 0,
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbHost',
            message: `What's the database host address?`,
            initial: 'localhost',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbPort',
            message: `What port is the database listening on?`,
            initial: (() => defaultDBPort(dbType)),
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbName',
            message: `What's the name of the database?`,
            initial: 'vendure',
        },
        {
            type: (() => (dbType === 'postgres' ? 'text' : null)),
            name: 'dbSchema',
            message: `What's the schema name we should use?`,
            initial: 'public',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbUserName',
            message: `What's the database user name?`,
            initial: 'root',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'password')),
            name: 'dbPassword',
            message: `What's the database password?`,
        },
        {
            type: 'text',
            name: 'superadminIdentifier',
            message: 'What identifier do you want to use for the superadmin user?',
            initial: shared_constants_1.SUPER_ADMIN_USER_IDENTIFIER,
        },
        {
            type: 'text',
            name: 'superadminPassword',
            message: 'What password do you want to use for the superadmin user?',
            initial: shared_constants_1.SUPER_ADMIN_USER_PASSWORD,
        },
    ];
    const initPrompts = [
        {
            type: 'toggle',
            name: 'populateProducts',
            message: 'Populate with some sample product data?',
            initial: true,
            active: 'yes',
            inactive: 'no',
        },
    ];
    const answers = await prompts_1.default(alreadyRanScaffold ? initPrompts : [...scaffoldPrompts, ...initPrompts], {
        onSubmit,
        onCancel() {
            /* */
            console.log(`Setup cancelled`);
            process.exit(1);
        },
    });
    return Object.assign(Object.assign({}, (await generateSources(root, answers, useYarn))), { dbType: answers.dbType, populateProducts: answers.populateProducts, superadminIdentifier: answers.superadminIdentifier, superadminPassword: answers.superadminPassword });
}
exports.gatherUserResponses = gatherUserResponses;
/**
 * Returns mock "user response" without prompting, for use in CI
 */
async function gatherCiUserResponses(root, useYarn) {
    const ciAnswers = {
        dbType: 'sqlite',
        dbHost: '',
        dbPort: '',
        dbName: 'vendure',
        dbUserName: '',
        dbPassword: '',
        populateProducts: true,
        superadminIdentifier: shared_constants_1.SUPER_ADMIN_USER_IDENTIFIER,
        superadminPassword: shared_constants_1.SUPER_ADMIN_USER_PASSWORD,
    };
    return Object.assign(Object.assign({}, (await generateSources(root, ciAnswers, useYarn))), { dbType: ciAnswers.dbType, populateProducts: ciAnswers.populateProducts, superadminIdentifier: ciAnswers.superadminIdentifier, superadminPassword: ciAnswers.superadminPassword });
}
exports.gatherCiUserResponses = gatherCiUserResponses;
/**
 * Create the server index, worker and config source code based on the options specified by the CLI prompts.
 */
async function generateSources(root, answers, useYarn) {
    const assetPath = (fileName) => path_1.default.join(__dirname, '../assets', fileName);
    /**
     * Helper to escape single quotes only. Used when generating the config file since e.g. passwords
     * might use special chars (`< > ' "` etc) which Handlebars would be default convert to HTML entities.
     * Instead, we disable escaping and use this custom helper to escape only the single quote character.
     */
    handlebars_1.default.registerHelper('escapeSingle', (aString) => {
        return typeof aString === 'string' ? aString.replace(/'/g, `\\'`) : aString;
    });
    const templateContext = Object.assign(Object.assign({}, answers), { useYarn, dbType: answers.dbType === 'sqlite' ? 'better-sqlite3' : answers.dbType, name: path_1.default.basename(root), isSQLite: answers.dbType === 'sqlite', isSQLjs: answers.dbType === 'sqljs', requiresConnection: answers.dbType !== 'sqlite' && answers.dbType !== 'sqljs', cookieSecret: Math.random().toString(36).substr(2) });
    async function createSourceFile(filename, noEscape = false) {
        const template = await fs_extra_1.default.readFile(assetPath(filename), 'utf-8');
        return handlebars_1.default.compile(template, { noEscape })(templateContext);
    }
    return {
        indexSource: await createSourceFile('index.hbs'),
        indexWorkerSource: await createSourceFile('index-worker.hbs'),
        configSource: await createSourceFile('vendure-config.hbs', true),
        envSource: await createSourceFile('.env.hbs', true),
        envDtsSource: await createSourceFile('environment.d.hbs', true),
        migrationSource: await createSourceFile('migration.hbs'),
        readmeSource: await createSourceFile('readme.hbs'),
        dockerfileSource: await createSourceFile('Dockerfile.hbs'),
        dockerComposeSource: await createSourceFile('docker-compose.hbs'),
    };
}
function defaultDBPort(dbType) {
    switch (dbType) {
        case 'mysql':
        case 'mariadb':
            return 3306;
        case 'postgres':
            return 5432;
        case 'mssql':
            return 1433;
        case 'oracle':
            return 1521;
        default:
            return 3306;
    }
}
//# sourceMappingURL=gather-user-responses.js.map
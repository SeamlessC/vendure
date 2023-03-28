"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
/* tslint:disable:no-console */
const admin_ui_plugin_1 = require("@vendure/admin-ui-plugin");
const asset_server_plugin_1 = require("@vendure/asset-server-plugin");
const shared_constants_1 = require("@vendure/common/lib/shared-constants");
const core_1 = require("@vendure/core");
const email_plugin_1 = require("@vendure/email-plugin");
const path_1 = __importDefault(require("path"));
const vendure_plugin_google_storage_assets_1 = require("vendure-plugin-google-storage-assets");
const cutomer_channels_module_1 = require("./customer-channels/cutomer-channels.module");
const nanoid_1 = require("./nanoid");
const card_payment_1 = __importDefault(require("./payment-methods/card-payment"));
const cash_payment_1 = __importDefault(require("./payment-methods/cash-payment"));
const payhere_listener_controller_1 = require("./payment-methods/payhere-listener.controller");
/**
 * Config settings used during development
 */
exports.devConfig = {
    apiOptions: {
        shopListQueryLimit: 1000,
        port: shared_constants_1.API_PORT,
        adminApiPath: shared_constants_1.ADMIN_API_PATH,
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            },
        },
        adminApiDebug: false,
        shopApiPath: shared_constants_1.SHOP_API_PATH,
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            },
        },
        shopApiDebug: false,
    },
    authOptions: {
        disableAuth: false,
        tokenMethod: ['bearer', 'cookie'],
        requireVerification: true,
        verificationTokenDuration: '1y',
        customPermissions: [],
        cookieOptions: {
            secret: 'abc',
        },
    },
    dbConnectionOptions: Object.assign({ synchronize: false, logging: false, migrations: [path_1.default.join(__dirname, 'migrations/*.ts')] }, getDbConfig()),
    paymentOptions: {
        paymentMethodHandlers: [cash_payment_1.default, card_payment_1.default],
    },
    customFields: {
        Channel: [
            {
                name: 'isShopActive',
                type: 'boolean',
                defaultValue: false,
                public: false,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Shop is Active',
                    },
                ],
            },
            {
                name: 'openingTime',
                type: 'datetime',
                public: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Opening Time',
                    },
                ],
                ui: {
                    component: 'time-form-input',
                },
            },
            {
                name: 'defaultOpeningTime',
                type: 'datetime',
                public: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Opening Time',
                    },
                ],
                ui: {
                    component: 'time-form-input',
                },
            },
            {
                name: 'isOpen',
                type: 'boolean',
                defaultValue: true,
                public: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Shop is Open',
                    },
                ],
            },
            {
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Processing Time (minutes)',
                    },
                ],
                name: 'processingTime',
                type: 'int',
                defaultValue: 15,
                public: true,
            },
            {
                name: 'latitude',
                type: 'float',
                public: true,
                defaultValue: 6.906755,
            },
            {
                name: 'longitude',
                type: 'float',
                public: true,
                defaultValue: 79.861244,
            },
            {
                name: 'name',
                type: 'string',
                public: true,
                defaultValue: 'Mount Lavinia',
            },
            {
                name: 'location',
                type: 'string',
                public: true,
                defaultValue: 'https://www.google.com/maps/dir/?api=1&destination=Crepe+Runner+-+Mount+Lavinia',
            },
        ],
        Zone: [
            {
                name: 'loyaltyPointsLimit',
                type: 'int',
                public: true,
                nullable: false,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Loyalty Points Limit',
                    },
                ],
                defaultValue: 1000,
            },
            {
                name: 'loyaltyPointsPercentage',
                type: 'float',
                nullable: false,
                defaultValue: 0.1,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Loyalty Points Percentage',
                    },
                ],
            },
        ],
        GlobalSettings: [
            {
                name: 'referralLoyaltyPoints',
                type: 'int',
                public: false,
                nullable: false,
                defaultValue: 250,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Referral Loyalty Points',
                    },
                ],
            },
        ],
        OrderLine: [
            {
                name: 'isCone',
                type: 'boolean',
                nullable: true,
            },
        ],
        ProductVariant: [
            {
                name: 'pre_discount_price',
                type: 'int',
                nullable: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Pre discount price (this price will be slashed out in the UI)',
                    },
                ],
                ui: {
                    component: 'currency-form-input',
                },
            },
        ],
        Address: [
            {
                name: 'first_name',
                type: 'string',
                nullable: false,
                defaultValue: 'John',
            },
            {
                name: 'uuid',
                type: 'string',
                nullable: false,
                defaultValue: nanoid_1.nanoid(),
            },
            {
                name: 'last_name',
                type: 'string',
                nullable: false,
                defaultValue: 'Doe',
            },
            {
                name: 'email',
                type: 'string',
                nullable: false,
                defaultValue: 'johndoe@gmail.com',
            },
            {
                name: 'phone',
                type: 'string',
                nullable: false,
                defaultValue: '0771234567',
            },
        ],
        Order: [
            {
                name: 'scheduledTime',
                type: 'datetime',
                nullable: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Scheduled Time',
                    },
                ],
            },
            {
                name: 'completedTime',
                type: 'datetime',
                nullable: true,
                label: [
                    {
                        languageCode: core_1.LanguageCode.en,
                        value: 'Completed Time',
                    },
                ],
            },
            // {
            //     name: 'channel',
            //     type: 'relation',
            //     entity: Channel,
            //     // may be omitted if the entity name matches the GraphQL type name,
            //     // which is true for all built-in entities.
            //     graphQLType: 'Channel',
            //     // Whether to "eagerly" load the relation
            //     // See https://typeorm.io/#/eager-and-lazy-relations
            //     eager: true,
            // },
        ],
        Customer: [
            {
                name: 'referredBy',
                type: 'string',
                nullable: true,
                internal: true,
            },
            {
                name: 'isReferralCompleted',
                type: 'boolean',
                internal: true,
                nullable: true,
            },
            {
                name: 'referredCode',
                type: 'string',
                nullable: true,
            },
            {
                name: 'referralCode',
                type: 'string',
                readonly: true,
                public: true,
                nullable: false,
                defaultValue: nanoid_1.nanoid(6),
            },
            {
                name: 'loyaltyPoints',
                type: 'int',
                readonly: true,
                public: true,
                defaultValue: 0,
                nullable: false,
            },
            {
                name: 'dob',
                type: 'datetime',
                nullable: true,
            },
            {
                name: 'gender',
                type: 'string',
                nullable: true,
            },
        ],
        Promotion: [
            {
                name: 'image',
                type: 'relation',
                entity: core_1.Asset,
                // may be omitted if the entity name matches the GraphQL type name,
                // which is true for all built-in entities.
                graphQLType: 'Asset',
                // Whether to "eagerly" load the relation
                // See https://typeorm.io/#/eager-and-lazy-relations
                eager: true,
            },
            {
                name: 'description',
                type: 'string',
                nullable: false,
                defaultValue: '',
                ui: {
                    component: 'textarea-form-input',
                },
            },
        ],
        Facet: [
        // {
        //     name: 'color1',
        //     type: 'string',
        //     label: [{ languageCode: LanguageCode.en, value: 'Color 1' }],
        //     validate: (value: string) => {
        //         const regex: RegExp = /^#[0-9a-fA-F]{6}$/;
        //         if (!regex.test(value)) {
        //             return 'Invalid color code';
        //         }
        //     },
        // },
        // {
        //     name: 'color2',
        //     type: 'string',
        //     label: [{ languageCode: LanguageCode.en, value: 'Color 2' }],
        //     validate: (value: string) => {
        //         const regex: RegExp = /^#[0-9a-fA-F]{6}$/;
        //         if (!regex.test(value)) {
        //             return 'Invalid color code';
        //         }
        //     },
        // },
        ],
        FacetValue: [
            {
                name: 'color1',
                type: 'string',
                label: [{ languageCode: core_1.LanguageCode.en, value: 'Color 1' }],
                validate: (value) => {
                    const regex = /^#[0-9a-fA-F]{6}$/;
                    if (!regex.test(value)) {
                        return 'Invalid color code';
                    }
                },
            },
            {
                name: 'color2',
                type: 'string',
                label: [{ languageCode: core_1.LanguageCode.en, value: 'Color 2' }],
                validate: (value) => {
                    const regex = /^#[0-9a-fA-F]{6}$/;
                    if (!regex.test(value)) {
                        return 'Invalid color code';
                    }
                },
            },
        ],
    },
    // logger: new DefaultLogger({ level: LogLevel.Verbose }),
    importExportOptions: {
        importAssetsDir: path_1.default.join(__dirname, 'import-assets'),
    },
    plugins: [
        cutomer_channels_module_1.CustomerChannelsPlugin,
        payhere_listener_controller_1.RestPlugin,
        asset_server_plugin_1.AssetServerPlugin.init({
            storageStrategyFactory: () => new vendure_plugin_google_storage_assets_1.GoogleStorageStrategy({
                bucketName: 'crepe-runner-app-assets',
                /**
                 * Use to pre-generate thumbnail sized images.
                 * Thumbnails are available on product.featured_asset.thumbnail via GraphQL
                 */
                thumbnails: {
                    width: 250,
                    height: 250,
                },
                /**
                 * You can set this to 'false' to make the Vendure admin ui also consume images directly
                 * from the Google Cloud Storage CDN,
                 * instead of via the Vendure asset server
                 */
                useAssetServerForAdminUi: false,
            }),
            route: 'assets',
            assetUploadDir: '/tmp/vendure/assets',
        }),
        vendure_plugin_google_storage_assets_1.GoogleStoragePlugin,
        // AssetServerPlugin.init({
        //     route: 'assets',
        //     assetUploadDir: path.join(__dirname, 'assets'),
        // }),
        core_1.DefaultSearchPlugin.init({ bufferUpdates: true, indexStockStatus: false }),
        // BullMQJobQueuePlugin.init({}),
        core_1.DefaultJobQueuePlugin.init({}),
        // JobQueueTestPlugin.init({ queueCount: 10 }),
        // ElasticsearchPlugin.init({
        //     host: 'http://localhost',
        //     port: 9200,
        //     bufferUpdates: true,
        // }),
        email_plugin_1.EmailPlugin.init({
            handlers: email_plugin_1.defaultEmailHandlers,
            templatePath: path_1.default.join(__dirname, '../email-plugin/templates'),
            // transport: {
            //     type: 'smtp',
            //     host: 'smtp.gmail.com',
            //     port: 587,
            //     // secure:true,
            //     auth: {
            //         user: 'vikumbandara@gmail.com',
            //         pass: 'Vikumvltra31415x',
            //     },
            // },
            devMode: true,
            route: 'mailbox',
            // handlers: defaultEmailHandlers,
            // templatePath: path.join(__dirname, '../email-plugin/templates'),
            outputPath: path_1.default.join(__dirname, 'test-emails'),
            globalTemplateVars: {
                verifyEmailAddressUrl: 'http://localhost:4201/verify',
                passwordResetUrl: 'http://localhost:4201/reset-password',
                changeEmailAddressUrl: 'http://localhost:4201/change-email-address',
            },
        }),
        admin_ui_plugin_1.AdminUiPlugin.init({
            route: 'admin',
            port: 5001,
        }),
    ],
};
function getDbConfig() {
    const dbType = process.env.DB || 'mysql';
    switch (dbType) {
        case 'postgres':
            console.log('Using postgres connection');
            return {
                synchronize: true,
                type: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                username: 'admin',
                password: 'secret',
                database: 'vendure-dev',
            };
        case 'sqlite':
            console.log('Using sqlite connection');
            return {
                synchronize: false,
                type: 'better-sqlite3',
                database: path_1.default.join(__dirname, 'vendure.sqlite'),
            };
        case 'sqljs':
            console.log('Using sql.js connection');
            return {
                type: 'sqljs',
                autoSave: true,
                database: new Uint8Array([]),
                location: path_1.default.join(__dirname, 'vendure.sqlite'),
            };
        case 'mysql':
        default:
            console.log('Using mysql connection');
            return {
                // config for production
                // synchronize: false,
                // logging: ['error', 'warn'],
                // type: 'mysql',
                // host: '34.131.237.48',
                // port: 3306,
                // username: 'root',
                // password: 'root',
                // database: 'vendure-test',
                //
                // test config
                synchronize: false,
                logging: ['error', 'warn'],
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'vendure-dev',
            };
    }
}
//# sourceMappingURL=dev-config%20copy.js.map
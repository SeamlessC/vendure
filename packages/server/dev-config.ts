/* tslint:disable:no-console */
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { ADMIN_API_PATH, API_PORT, SHOP_API_PATH } from '@vendure/common/lib/shared-constants';
import {
    Asset,
    Channel,
    DefaultJobQueuePlugin,
    DefaultLogger,
    DefaultSearchPlugin,
    dummyPaymentHandler,
    LanguageCode,
    LogLevel,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { GoogleStoragePlugin, GoogleStorageStrategy } from 'vendure-plugin-google-storage-assets';

import { CustomerChannelsPlugin } from './customer-channels/cutomer-channels.module';
import { nanoid } from './nanoid';
import cardPaymentHandler from './payment-methods/card-payment';
import cashPaymentHandler from './payment-methods/cash-payment';
import { RestPlugin } from './payment-methods/payhere-listener.controller';

/**
 * Config settings used during development
 */
export const devConfig: VendureConfig = {
    apiOptions: {
        shopListQueryLimit: 1000,
        port: API_PORT,
        adminApiPath: ADMIN_API_PATH,

        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },
        adminApiDebug: false,
        shopApiPath: SHOP_API_PATH,
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },

        shopApiDebug: false,
    },

    authOptions: {
        disableAuth: false,
        tokenMethod: ['bearer', 'cookie'] as const,
        requireVerification: true,
        customPermissions: [],
        cookieOptions: {
            secret: 'abc',
        },
    },
    dbConnectionOptions: {
        synchronize: false,
        logging: false,
        migrations: [path.join(__dirname, 'migrations/*.ts')],
        ...getDbConfig(),
    },
    paymentOptions: {
        paymentMethodHandlers: [cashPaymentHandler, cardPaymentHandler],
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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
                        value: 'Shop is Open',
                    },
                ],
            },
            {
                label: [
                    {
                        languageCode: LanguageCode.en,
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
                defaultValue:
                    'https://www.google.com/maps/dir/?api=1&destination=Crepe+Runner+-+Mount+Lavinia',
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
                        languageCode: LanguageCode.en,

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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
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
                defaultValue: nanoid(),
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
                        languageCode: LanguageCode.en,
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
                        languageCode: LanguageCode.en,
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
                defaultValue: nanoid(6),
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
                entity: Asset,
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
                label: [{ languageCode: LanguageCode.en, value: 'Color 1' }],
                validate: (value: string) => {
                    const regex: RegExp = /^#[0-9a-fA-F]{6}$/;
                    if (!regex.test(value)) {
                        return 'Invalid color code';
                    }
                },
            },
            {
                name: 'color2',
                type: 'string',
                label: [{ languageCode: LanguageCode.en, value: 'Color 2' }],
                validate: (value: string) => {
                    const regex: RegExp = /^#[0-9a-fA-F]{6}$/;
                    if (!regex.test(value)) {
                        return 'Invalid color code';
                    }
                },
            },
        ],
    },
    // logger: new DefaultLogger({ level: LogLevel.Verbose }),
    importExportOptions: {
        importAssetsDir: path.join(__dirname, 'import-assets'),
    },
    plugins: [
        CustomerChannelsPlugin,
        RestPlugin,
        AssetServerPlugin.init({
            storageStrategyFactory: () =>
                new GoogleStorageStrategy({
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
        GoogleStoragePlugin,
        // AssetServerPlugin.init({
        //     route: 'assets',
        //     assetUploadDir: path.join(__dirname, 'assets'),
        // }),
        DefaultSearchPlugin.init({ bufferUpdates: true, indexStockStatus: false }),
        // BullMQJobQueuePlugin.init({}),
        DefaultJobQueuePlugin.init({}),
        // JobQueueTestPlugin.init({ queueCount: 10 }),
        // ElasticsearchPlugin.init({
        //     host: 'http://localhost',
        //     port: 9200,
        //     bufferUpdates: true,
        // }),
        EmailPlugin.init({
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../email-plugin/templates'),
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
            outputPath: path.join(__dirname, 'test-emails'),
            globalTemplateVars: {
                verifyEmailAddressUrl: 'http://localhost:4201/verify',
                passwordResetUrl: 'http://localhost:4201/reset-password',
                changeEmailAddressUrl: 'http://localhost:4201/change-email-address',
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 5001,
        }),
    ],
};

function getDbConfig(): ConnectionOptions {
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
                database: path.join(__dirname, 'vendure.sqlite'),
            };
        case 'sqljs':
            console.log('Using sql.js connection');
            return {
                type: 'sqljs',
                autoSave: true,
                database: new Uint8Array([]),
                location: path.join(__dirname, 'vendure.sqlite'),
            };
        case 'mysql':
        default:
            console.log('Using mysql connection');
            return {
                synchronize: false,
                logging: ['error', 'warn'],
                type: 'mysql',
                host: '34.131.237.48',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'vendure-test',
            };
    }
}

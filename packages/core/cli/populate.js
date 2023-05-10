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
exports.importProductsFromCsv = exports.populateCollections = exports.populateInitialData = exports.populate = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const loggerCtx = 'Populate';
async function populate(bootstrapFn, initialDataPathOrObject, productsCsvPath, channelOrToken) {
    const app = await bootstrapFn();
    if (!app) {
        throw new Error('Could not bootstrap the Vendure app');
    }
    let channel;
    const { ChannelService, Channel, Logger } = await Promise.resolve().then(() => __importStar(require('@vendure/core')));
    if (typeof channelOrToken === 'string') {
        channel = await app.get(ChannelService).getChannelFromToken(channelOrToken);
        if (!channel) {
            Logger.warn(`Warning: channel with token "${channelOrToken}" was not found. Using default Channel instead.`, loggerCtx);
        }
    }
    else if (channelOrToken instanceof Channel) {
        channel = channelOrToken;
    }
    const initialData = typeof initialDataPathOrObject === 'string'
        ? require(initialDataPathOrObject)
        : initialDataPathOrObject;
    await populateInitialData(app, initialData, channel);
    if (productsCsvPath) {
        const importResult = await importProductsFromCsv(app, productsCsvPath, initialData.defaultLanguage, channel);
        if (importResult.errors && importResult.errors.length) {
            const errorFile = path_1.default.join(process.cwd(), 'vendure-import-error.log');
            Logger.error(`${importResult.errors.length} errors encountered when importing product data. See: ${errorFile}`, loggerCtx);
            await fs_extra_1.default.writeFile(errorFile, importResult.errors.join('\n'));
        }
        Logger.info(`Imported ${importResult.imported} products`, loggerCtx);
        await populateCollections(app, initialData, channel);
    }
    Logger.info('Done!', loggerCtx);
    return app;
}
exports.populate = populate;
async function populateInitialData(app, initialData, channel) {
    const { Populator, Logger } = await Promise.resolve().then(() => __importStar(require('@vendure/core')));
    const populator = app.get(Populator);
    try {
        await populator.populateInitialData(initialData, channel);
        Logger.info(`Populated initial data`, loggerCtx);
    }
    catch (err) {
        Logger.error(err.message, loggerCtx);
    }
}
exports.populateInitialData = populateInitialData;
async function populateCollections(app, initialData, channel) {
    const { Populator, Logger } = await Promise.resolve().then(() => __importStar(require('@vendure/core')));
    const populator = app.get(Populator);
    try {
        if (initialData.collections !== undefined && initialData.collections.length) {
            await populator.populateCollections(initialData, channel);
            Logger.info(`Created ${initialData.collections.length} Collections`, loggerCtx);
        }
    }
    catch (err) {
        Logger.info(err.message, loggerCtx);
    }
}
exports.populateCollections = populateCollections;
async function importProductsFromCsv(app, productsCsvPath, languageCode, channel) {
    const { Importer, RequestContextService } = await Promise.resolve().then(() => __importStar(require('@vendure/core')));
    const importer = app.get(Importer);
    const requestContextService = app.get(RequestContextService);
    const productData = await fs_extra_1.default.readFile(productsCsvPath, 'utf-8');
    const ctx = await requestContextService.create({
        apiType: 'admin',
        languageCode,
        channelOrToken: channel,
    });
    const output = await importer.parseAndImport(productData, ctx, true).toPromise();
    return output;
}
exports.importProductsFromCsv = importProductsFromCsv;
//# sourceMappingURL=populate.js.map
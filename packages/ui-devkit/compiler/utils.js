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
exports.isSassVariableOverridesExtension = exports.isGlobalStylesExtension = exports.isStaticAssetExtension = exports.isTranslationExtension = exports.isAdminUiExtension = exports.normalizeExtensions = exports.copyStaticAsset = exports.copyUiDevkit = exports.getStaticAssetPath = exports.shouldUseYarn = exports.logger = void 0;
/* tslint:disable:no-console */
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
exports.logger = {
    log: (message) => console.log(chalk_1.default.green(message)),
    error: (message) => console.log(chalk_1.default.red(message)),
};
/**
 * Checks for the global yarn binary and returns true if found.
 */
function shouldUseYarn() {
    try {
        child_process_1.execSync('yarnpkg --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.shouldUseYarn = shouldUseYarn;
/**
 * Returns the string path of a static asset
 */
function getStaticAssetPath(staticAssetDef) {
    return typeof staticAssetDef === 'string' ? staticAssetDef : staticAssetDef.path;
}
exports.getStaticAssetPath = getStaticAssetPath;
/**
 * Copy the @vendure/ui-devkit files to the static assets dir.
 */
function copyUiDevkit(outputPath) {
    const devkitDir = path.join(outputPath, constants_1.STATIC_ASSETS_OUTPUT_DIR, 'devkit');
    fs.ensureDirSync(devkitDir);
    fs.copySync(require.resolve('@vendure/ui-devkit'), path.join(devkitDir, 'ui-devkit.js'));
}
exports.copyUiDevkit = copyUiDevkit;
/**
 * Copies over any files defined by the extensions' `staticAssets` array to the shared
 * static assets directory. When the app is built by the ng cli, this assets directory is
 * the copied over to the final static assets location (i.e. http://domain/admin/assets/)
 */
async function copyStaticAsset(outputPath, staticAssetDef) {
    const staticAssetPath = getStaticAssetPath(staticAssetDef);
    let assetOutputPath;
    const assetBasename = path.basename(staticAssetPath);
    assetOutputPath = path.join(outputPath, constants_1.STATIC_ASSETS_OUTPUT_DIR, assetBasename);
    fs.copySync(staticAssetPath, assetOutputPath);
    if (typeof staticAssetDef !== 'string') {
        // The asset is being renamed
        const newName = path.join(path.dirname(assetOutputPath), staticAssetDef.rename);
        try {
            // We use copy, remove rather than rename due to problems with the
            // EPERM error in Windows.
            await fs.copy(assetOutputPath, newName);
            await fs.remove(assetOutputPath);
        }
        catch (e) {
            exports.logger.log(e);
        }
    }
}
exports.copyStaticAsset = copyStaticAsset;
/**
 * Ensures each extension has an ID and a value for the optional properties.
 * If not defined by the user, a deterministic ID is generated
 * from a hash of the extension config.
 */
function normalizeExtensions(extensions) {
    return (extensions || []).map(e => {
        let id = e.id;
        if (!id) {
            const hash = crypto_1.createHash('sha256');
            hash.update(JSON.stringify(e));
            id = hash.digest('hex');
        }
        return { staticAssets: [], translations: {}, globalStyles: [], ...e, id };
    });
}
exports.normalizeExtensions = normalizeExtensions;
function isAdminUiExtension(input) {
    return input.hasOwnProperty('extensionPath');
}
exports.isAdminUiExtension = isAdminUiExtension;
function isTranslationExtension(input) {
    return input.hasOwnProperty('translations');
}
exports.isTranslationExtension = isTranslationExtension;
function isStaticAssetExtension(input) {
    return input.hasOwnProperty('staticAssets');
}
exports.isStaticAssetExtension = isStaticAssetExtension;
function isGlobalStylesExtension(input) {
    return input.hasOwnProperty('globalStyles');
}
exports.isGlobalStylesExtension = isGlobalStylesExtension;
function isSassVariableOverridesExtension(input) {
    return input.hasOwnProperty('sassVariableOverrides');
}
exports.isSassVariableOverridesExtension = isSassVariableOverridesExtension;
//# sourceMappingURL=utils.js.map
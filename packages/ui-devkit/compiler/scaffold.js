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
exports.copyGlobalStyleFile = exports.setupScaffold = void 0;
/* tslint:disable:no-console */
const child_process_1 = require("child_process");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
const translations_1 = require("./translations");
const utils_1 = require("./utils");
async function setupScaffold(outputPath, extensions) {
    deleteExistingExtensionModules(outputPath);
    copyAdminUiSource(outputPath);
    const adminUiExtensions = extensions.filter(utils_1.isAdminUiExtension);
    const normalizedExtensions = utils_1.normalizeExtensions(adminUiExtensions);
    await copyExtensionModules(outputPath, normalizedExtensions);
    const staticAssetExtensions = extensions.filter(utils_1.isStaticAssetExtension);
    await copyStaticAssets(outputPath, staticAssetExtensions);
    const globalStyleExtensions = extensions.filter(utils_1.isGlobalStylesExtension);
    const sassVariableOverridesExtension = extensions.find(utils_1.isSassVariableOverridesExtension);
    await addGlobalStyles(outputPath, globalStyleExtensions, sassVariableOverridesExtension);
    const allTranslationFiles = translations_1.getAllTranslationFiles(extensions.filter(utils_1.isTranslationExtension));
    await translations_1.mergeExtensionTranslations(outputPath, allTranslationFiles);
    utils_1.copyUiDevkit(outputPath);
    try {
        await checkIfNgccWasRun();
    }
    catch (e) {
        const cmd = utils_1.shouldUseYarn() ? 'yarn ngcc' : 'npx ngcc';
        utils_1.logger.log(`An error occurred when running ngcc. Try removing node_modules, re-installing, and then manually running "${cmd}" in the project root.`);
    }
}
exports.setupScaffold = setupScaffold;
/**
 * Deletes the contents of the /modules directory, which contains the plugin
 * extension modules copied over during the last compilation.
 */
function deleteExistingExtensionModules(outputPath) {
    fs.removeSync(path.join(outputPath, constants_1.MODULES_OUTPUT_DIR));
}
/**
 * Copies all files from the extensionPaths of the configured extensions into the
 * admin-ui source tree.
 */
async function copyExtensionModules(outputPath, extensions) {
    const extensionRoutesSource = generateLazyExtensionRoutes(extensions);
    fs.writeFileSync(path.join(outputPath, constants_1.EXTENSION_ROUTES_FILE), extensionRoutesSource, 'utf8');
    const sharedExtensionModulesSource = generateSharedExtensionModule(extensions);
    fs.writeFileSync(path.join(outputPath, constants_1.SHARED_EXTENSIONS_FILE), sharedExtensionModulesSource, 'utf8');
    for (const extension of extensions) {
        const dest = path.join(outputPath, constants_1.MODULES_OUTPUT_DIR, extension.id);
        fs.copySync(extension.extensionPath, dest);
    }
}
async function copyStaticAssets(outputPath, extensions) {
    for (const extension of extensions) {
        if (Array.isArray(extension.staticAssets)) {
            for (const asset of extension.staticAssets) {
                await utils_1.copyStaticAsset(outputPath, asset);
            }
        }
    }
}
async function addGlobalStyles(outputPath, globalStylesExtensions, sassVariableOverridesExtension) {
    const globalStylesDir = path.join(outputPath, 'src', constants_1.GLOBAL_STYLES_OUTPUT_DIR);
    await fs.remove(globalStylesDir);
    await fs.ensureDir(globalStylesDir);
    const imports = [];
    for (const extension of globalStylesExtensions) {
        const styleFiles = Array.isArray(extension.globalStyles)
            ? extension.globalStyles
            : [extension.globalStyles];
        for (const styleFile of styleFiles) {
            await copyGlobalStyleFile(outputPath, styleFile);
            imports.push(path.basename(styleFile, path.extname(styleFile)));
        }
    }
    let overridesImport = '';
    if (sassVariableOverridesExtension) {
        const overridesFile = sassVariableOverridesExtension.sassVariableOverrides;
        await copyGlobalStyleFile(outputPath, overridesFile);
        overridesImport = `@import "./${constants_1.GLOBAL_STYLES_OUTPUT_DIR}/${path.basename(overridesFile, path.extname(overridesFile))}";\n`;
    }
    const globalStylesSource = overridesImport +
        `@import "./styles/styles";\n` +
        imports.map(file => `@import "./${constants_1.GLOBAL_STYLES_OUTPUT_DIR}/${file}";`).join('\n');
    const globalStylesFile = path.join(outputPath, 'src', 'global-styles.scss');
    await fs.writeFile(globalStylesFile, globalStylesSource, 'utf-8');
}
async function copyGlobalStyleFile(outputPath, stylePath) {
    const globalStylesDir = path.join(outputPath, 'src', constants_1.GLOBAL_STYLES_OUTPUT_DIR);
    const fileBasename = path.basename(stylePath);
    const styleOutputPath = path.join(globalStylesDir, fileBasename);
    await fs.copyFile(stylePath, styleOutputPath);
}
exports.copyGlobalStyleFile = copyGlobalStyleFile;
function generateLazyExtensionRoutes(extensions) {
    const routes = [];
    for (const extension of extensions) {
        for (const module of extension.ngModules) {
            if (module.type === 'lazy') {
                routes.push(`  {
    path: 'extensions/${module.route}',
    loadChildren: () => import('${getModuleFilePath(extension.id, module)}').then(m => m.${module.ngModuleName}),
  }`);
            }
        }
    }
    return `export const extensionRoutes = [${routes.join(',\n')}];\n`;
}
function generateSharedExtensionModule(extensions) {
    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
${extensions
        .map(e => e.ngModules
        .filter(m => m.type === 'shared')
        .map(m => `import { ${m.ngModuleName} } from '${getModuleFilePath(e.id, m)}';\n`)
        .join(''))
        .join('')}

@NgModule({
    imports: [CommonModule, ${extensions
        .map(e => e.ngModules
        .filter(m => m.type === 'shared')
        .map(m => m.ngModuleName)
        .join(', '))
        .join(', ')}],
})
export class SharedExtensionsModule {}
`;
}
function getModuleFilePath(id, module) {
    return `./extensions/${id}/${path.basename(module.ngModuleFileName, '.ts')}`;
}
/**
 * Copy the Admin UI sources & static assets to the outputPath if it does not already
 * exists there.
 */
function copyAdminUiSource(outputPath) {
    const angularJsonFile = path.join(outputPath, 'angular.json');
    const indexFile = path.join(outputPath, '/src/index.html');
    if (fs.existsSync(angularJsonFile) && fs.existsSync(indexFile)) {
        return;
    }
    const scaffoldDir = path.join(__dirname, '../scaffold');
    const adminUiSrc = path.join(require.resolve('@vendure/admin-ui'), '../../static');
    if (!fs.existsSync(scaffoldDir)) {
        throw new Error(`Could not find the admin ui scaffold files at ${scaffoldDir}`);
    }
    if (!fs.existsSync(adminUiSrc)) {
        throw new Error(`Could not find the @vendure/admin-ui sources. Looked in ${adminUiSrc}`);
    }
    // copy scaffold
    fs.removeSync(outputPath);
    fs.ensureDirSync(outputPath);
    fs.copySync(scaffoldDir, outputPath);
    // copy source files from admin-ui package
    const outputSrc = path.join(outputPath, 'src');
    fs.ensureDirSync(outputSrc);
    fs.copySync(adminUiSrc, outputSrc);
}
/**
 * Attempts to find out it the ngcc compiler has been run on the Angular packages, and if not,
 * attemps to run it. This is done this way because attempting to run ngcc from a sub-directory
 * where the angular libs are in a higher-level node_modules folder currently results in the error
 * NG6002, see https://github.com/angular/angular/issues/35747.
 *
 * However, when ngcc is run from the root, it works.
 */
async function checkIfNgccWasRun() {
    const coreUmdFile = require.resolve('@vendure/admin-ui/core');
    if (!coreUmdFile) {
        utils_1.logger.error(`Could not resolve the "@vendure/admin-ui/core" package!`);
        return;
    }
    // ngcc creates a particular folder after it has been run once
    const ivyDir = path.join(coreUmdFile, '../..', '__ivy_ngcc__');
    if (fs.existsSync(ivyDir)) {
        return;
    }
    // Looks like ngcc has not been run, so attempt to do so.
    const rootDir = coreUmdFile.split('node_modules')[0];
    return new Promise((resolve, reject) => {
        utils_1.logger.log('Running the Angular Ivy compatibility compiler (ngcc) on Vendure Admin UI dependencies ' +
            '(this is only needed on the first run)...');
        const cmd = utils_1.shouldUseYarn() ? 'yarn' : 'npx';
        const ngccProcess = child_process_1.spawn(cmd, [
            'ngcc',
            '--properties es2015 browser module main',
            '--first-only',
            '--create-ivy-entry-points',
            '-l=error',
        ], {
            cwd: rootDir,
            shell: true,
            stdio: 'inherit',
        });
        ngccProcess.on('close', code => {
            if (code !== 0) {
                reject(code);
            }
            else {
                resolve();
            }
        });
    });
}
//# sourceMappingURL=scaffold.js.map
import { BrandingOptions, StaticAssetExtension } from './types';
/**
 * @description
 * A helper function to simplify the process of setting custom branding images.
 *
 * @example
 * ```TypeScript
 * compileUiExtensions({
 *   outputPath: path.join(__dirname, '../admin-ui'),
 *   extensions: [
 *     setBranding({
 *       smallLogoPath: path.join(__dirname, 'images/my-logo-sm.png'),
 *       largeLogoPath: path.join(__dirname, 'images/my-logo-lg.png'),
 *       faviconPath: path.join(__dirname, 'images/my-favicon.ico'),
 *     }),
 *   ],
 * });
 * ```
 *
 * @docsCategory UiDevkit
 * @docsPage helpers
 */
export declare function setBranding(options: BrandingOptions): StaticAssetExtension;

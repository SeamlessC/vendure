import { PipeTransform } from '@angular/core';
import { AssetFragment } from '../../common/generated-types';
/**
 * @description
 * Given an Asset object (an object with `preview` and optionally `focalPoint` properties), this pipe
 * returns a string with query parameters designed to work with the image resize capabilities of the
 * AssetServerPlugin.
 *
 * @example
 * ```HTML
 * <img [src]="asset | assetPreview:'tiny'" />
 * <img [src]="asset | assetPreview:150" />
 * ```
 *
 * @docsCategory pipes
 */
export declare class AssetPreviewPipe implements PipeTransform {
    transform(asset?: AssetFragment, preset?: string | number): string;
}

import { Pipe } from '@angular/core';
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
export class AssetPreviewPipe {
    transform(asset, preset = 'thumb') {
        if (!asset) {
            return '';
        }
        if (asset.preview == null || typeof asset.preview !== 'string') {
            throw new Error(`Expected an Asset, got ${JSON.stringify(asset)}`);
        }
        const fp = asset.focalPoint ? `&fpx=${asset.focalPoint.x}&fpy=${asset.focalPoint.y}` : '';
        if (Number.isNaN(Number(preset))) {
            return `${asset.preview}?preset=${preset}${fp}`;
        }
        else {
            return `${asset.preview}?w=${preset}&h=${preset}${fp}`;
        }
    }
}
AssetPreviewPipe.decorators = [
    { type: Pipe, args: [{
                name: 'assetPreview',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcHJldmlldy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvYXNzZXQtcHJldmlldy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFJSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3pCLFNBQVMsQ0FBQyxLQUFxQixFQUFFLFNBQTBCLE9BQU87UUFDOUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEU7UUFDRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxRixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLFdBQVcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ25EO2FBQU07WUFDSCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQzFEO0lBQ0wsQ0FBQzs7O1lBakJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsY0FBYzthQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXNzZXRGcmFnbWVudCB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogR2l2ZW4gYW4gQXNzZXQgb2JqZWN0IChhbiBvYmplY3Qgd2l0aCBgcHJldmlld2AgYW5kIG9wdGlvbmFsbHkgYGZvY2FsUG9pbnRgIHByb3BlcnRpZXMpLCB0aGlzIHBpcGVcbiAqIHJldHVybnMgYSBzdHJpbmcgd2l0aCBxdWVyeSBwYXJhbWV0ZXJzIGRlc2lnbmVkIHRvIHdvcmsgd2l0aCB0aGUgaW1hZ2UgcmVzaXplIGNhcGFiaWxpdGllcyBvZiB0aGVcbiAqIEFzc2V0U2VydmVyUGx1Z2luLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiA8aW1nIFtzcmNdPVwiYXNzZXQgfCBhc3NldFByZXZpZXc6J3RpbnknXCIgLz5cbiAqIDxpbWcgW3NyY109XCJhc3NldCB8IGFzc2V0UHJldmlldzoxNTBcIiAvPlxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwaXBlc1xuICovXG5AUGlwZSh7XG4gICAgbmFtZTogJ2Fzc2V0UHJldmlldycsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0UHJldmlld1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0oYXNzZXQ/OiBBc3NldEZyYWdtZW50LCBwcmVzZXQ6IHN0cmluZyB8IG51bWJlciA9ICd0aHVtYicpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWFzc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFzc2V0LnByZXZpZXcgPT0gbnVsbCB8fCB0eXBlb2YgYXNzZXQucHJldmlldyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYW4gQXNzZXQsIGdvdCAke0pTT04uc3RyaW5naWZ5KGFzc2V0KX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcCA9IGFzc2V0LmZvY2FsUG9pbnQgPyBgJmZweD0ke2Fzc2V0LmZvY2FsUG9pbnQueH0mZnB5PSR7YXNzZXQuZm9jYWxQb2ludC55fWAgOiAnJztcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihOdW1iZXIocHJlc2V0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHthc3NldC5wcmV2aWV3fT9wcmVzZXQ9JHtwcmVzZXR9JHtmcH1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2Fzc2V0LnByZXZpZXd9P3c9JHtwcmVzZXR9Jmg9JHtwcmVzZXR9JHtmcH1gO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
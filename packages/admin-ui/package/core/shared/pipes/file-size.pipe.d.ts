import { PipeTransform } from '@angular/core';
/**
 * @description
 * Formats a number into a human-readable file size string.
 *
 * @example
 * ```TypeScript
 * {{ fileSizeInBytes | filesize }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class FileSizePipe implements PipeTransform {
    transform(value: number, useSiUnits?: boolean): any;
}

import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given region.
 *
 * @example
 * ```HTML
 * {{ 'GB' | localeRegionName }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class LocaleRegionNamePipe extends LocaleBasePipe implements PipeTransform {
    constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    transform(value: any, locale?: unknown): string;
}

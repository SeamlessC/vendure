import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given ISO 4217 currency code.
 *
 * @example
 * ```HTML
 * {{ order.currencyCode | localeCurrencyName }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class LocaleCurrencyNamePipe extends LocaleBasePipe implements PipeTransform {
    constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    transform(value: any, display?: 'full' | 'symbol' | 'name', locale?: unknown): any;
}

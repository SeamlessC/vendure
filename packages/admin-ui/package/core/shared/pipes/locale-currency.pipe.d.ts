import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Formats a Vendure monetary value (in cents) into the correct format for the configured currency and display
 * locale.
 *
 * @example
 * ```HTML
 * {{ variant.priceWithTax | localeCurrency }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class LocaleCurrencyPipe extends LocaleBasePipe implements PipeTransform {
    constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    transform(value: unknown, ...args: unknown[]): string | unknown;
}

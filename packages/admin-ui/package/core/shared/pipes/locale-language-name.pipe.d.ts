import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given ISO 639-1 language code.
 *
 * @example
 * ```HTML
 * {{ 'zh_Hant' | localeLanguageName }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class LocaleLanguageNamePipe extends LocaleBasePipe implements PipeTransform {
    constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    transform(value: any, locale?: unknown): string;
}

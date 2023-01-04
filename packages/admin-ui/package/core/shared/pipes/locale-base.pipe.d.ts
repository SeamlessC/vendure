import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * Used by locale-aware pipes to handle the task of getting the active languageCode
 * of the UI and cleaning up.
 */
export declare abstract class LocaleBasePipe implements OnDestroy, PipeTransform {
    protected locale: string;
    private readonly subscription;
    protected constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    ngOnDestroy(): void;
    /**
     * Returns the active locale after attempting to ensure that the locale string
     * is valid for the Intl API.
     */
    protected getActiveLocale(localeOverride?: unknown): string;
    abstract transform(value: any, ...args: any[]): any;
}

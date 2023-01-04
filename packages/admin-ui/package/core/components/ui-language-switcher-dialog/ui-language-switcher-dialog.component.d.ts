import { OnInit } from '@angular/core';
import { CurrencyCode, LanguageCode } from '../../common/generated-types';
import { Dialog } from '../../providers/modal/modal.service';
export declare class UiLanguageSwitcherDialogComponent implements Dialog<[LanguageCode, string | undefined]>, OnInit {
    resolveWith: (result?: [LanguageCode, string | undefined]) => void;
    currentLanguage: LanguageCode;
    availableLanguages: LanguageCode[];
    currentLocale: string | undefined;
    availableLocales: string[];
    availableCurrencyCodes: CurrencyCode[];
    selectedCurrencyCode: string;
    previewLocale: string;
    readonly browserDefaultLocale: string | undefined;
    readonly now: string;
    constructor();
    ngOnInit(): void;
    updatePreviewLocale(): void;
    setLanguage(): void;
    cancel(): void;
    private createLocaleString;
}

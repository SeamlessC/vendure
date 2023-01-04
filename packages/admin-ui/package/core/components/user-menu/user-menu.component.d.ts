import { EventEmitter } from '@angular/core';
import { LanguageCode } from '../../common/generated-types';
export declare class UserMenuComponent {
    userName: string;
    availableLanguages: LanguageCode[];
    uiLanguageAndLocale: [LanguageCode, string | undefined];
    logOut: EventEmitter<void>;
    selectUiLanguage: EventEmitter<void>;
}

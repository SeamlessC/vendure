import { PipeTransform } from '@angular/core';
import { CustomFieldConfig, LanguageCode, StringFieldOption } from '../../common/generated-types';
/**
 * Displays a localized label for a CustomField or StringFieldOption, falling back to the
 * name/value if none are defined.
 */
export declare class CustomFieldLabelPipe implements PipeTransform {
    transform(value: CustomFieldConfig | StringFieldOption, uiLanguageCode: LanguageCode | null): string;
    private isCustomFieldConfig;
}

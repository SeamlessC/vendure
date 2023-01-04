import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * Uses a regular text form input. This is the default input for `string` and `localeString` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class TextFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'text-form-input'>;
    get prefix(): string | undefined;
    get suffix(): string | undefined;
}

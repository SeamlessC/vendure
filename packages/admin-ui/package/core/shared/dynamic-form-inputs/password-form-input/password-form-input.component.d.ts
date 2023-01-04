import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
/**
 * @description
 * Displays a password text input. Should be used with `string` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class PasswordFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: InputComponentConfig;
}

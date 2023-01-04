import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * Uses textarea form input. This is the default input for `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class TextareaFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'textarea-form-input'>;
    get spellcheck(): boolean;
}

import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * Uses the {@link RichTextEditorComponent} as in input for `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class RichTextFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'rich-text-form-input'>;
}

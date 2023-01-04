import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * A checkbox input. The default input component for `boolean` fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class BooleanFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'boolean-form-input'>;
}

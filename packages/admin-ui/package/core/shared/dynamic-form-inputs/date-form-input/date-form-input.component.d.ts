import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * Allows selection of a datetime. Default input for `datetime` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class DateFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'date-form-input'>;
    get min(): string | undefined;
    get max(): string | undefined;
    get yearRange(): number | undefined;
}

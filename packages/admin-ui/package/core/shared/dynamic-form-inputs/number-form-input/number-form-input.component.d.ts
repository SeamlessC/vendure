import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
/**
 * @description
 * Displays a number input. Default input for `int` and `float` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class NumberFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'number-form-input'>;
    get prefix(): string | undefined;
    get suffix(): string | undefined;
    get min(): number | undefined;
    get max(): number | undefined;
    get step(): number | undefined;
}

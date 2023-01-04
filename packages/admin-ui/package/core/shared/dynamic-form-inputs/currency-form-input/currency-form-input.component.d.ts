import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../common/component-registry-types';
import { CurrencyCode } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * An input for monetary values. Should be used with `int` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class CurrencyFormInputComponent implements FormInputComponent {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    currencyCode$: Observable<CurrencyCode>;
    config: DefaultFormComponentConfig<'currency-form-input'>;
    constructor(dataService: DataService);
}

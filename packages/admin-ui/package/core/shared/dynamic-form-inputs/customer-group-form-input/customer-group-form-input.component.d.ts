import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../common/component-registry-types';
import { GetCustomerGroups } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Allows the selection of a Customer via an autocomplete select input.
 * Should be used with `ID` type fields which represent Customer IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class CustomerGroupFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    customerGroups$: Observable<GetCustomerGroups.Items[]>;
    config: DefaultFormComponentConfig<'customer-group-form-input'>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    selectGroup(group: GetCustomerGroups.Items): void;
}

import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressFragment, CreateAddressInput, DataService, Dialog, GetAvailableCountriesQuery, OrderAddressFragment } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { Customer } from '../select-customer-dialog/select-customer-dialog.component';
export declare class SelectAddressDialogComponent implements OnInit, Dialog<CreateAddressInput> {
    private dataService;
    private formBuilder;
    resolveWith: (result?: CreateAddressInput) => void;
    availableCountries$: Observable<GetAvailableCountriesQuery['countries']['items']>;
    addresses$: Observable<AddressFragment[]>;
    customerId: string | undefined;
    currentAddress: OrderAddressFragment | undefined;
    addressForm: FormGroup;
    selectedAddress: AddressFragment | undefined;
    useExisting: boolean;
    createNew: boolean;
    constructor(dataService: DataService, formBuilder: FormBuilder);
    ngOnInit(): void;
    trackByFn(item: Customer): string;
    addressIdFn(item: AddressFragment): string;
    cancel(): void;
    select(): void;
}

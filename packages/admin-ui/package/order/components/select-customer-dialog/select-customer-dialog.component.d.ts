import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateCustomerInput, DataService, Dialog, GetCustomerListQuery } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
export declare type Customer = GetCustomerListQuery['customers']['items'][number];
export declare class SelectCustomerDialogComponent implements OnInit, Dialog<Customer | CreateCustomerInput> {
    private dataService;
    private formBuilder;
    resolveWith: (result?: Customer | CreateCustomerInput) => void;
    customerForm: FormGroup;
    customers$: Observable<Customer[]>;
    isLoading: boolean;
    input$: Subject<string>;
    selectedCustomer: Customer[];
    useExisting: boolean;
    createNew: boolean;
    constructor(dataService: DataService, formBuilder: FormBuilder);
    ngOnInit(): void;
    trackByFn(item: Customer): string;
    cancel(): void;
    select(): void;
}

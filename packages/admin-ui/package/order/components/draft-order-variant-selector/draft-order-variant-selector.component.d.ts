import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrencyCode, CustomFieldConfig, DataService, GetProductVariantQuery } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
export declare class DraftOrderVariantSelectorComponent implements OnInit {
    private dataService;
    currencyCode: CurrencyCode;
    orderLineCustomFields: CustomFieldConfig[];
    addItem: EventEmitter<{
        productVariantId: string;
        quantity: number;
        customFields: any;
    }>;
    customFieldsFormGroup: FormGroup;
    selectedVariant$: Observable<GetProductVariantQuery['productVariant']>;
    selectedVariantId$: Subject<string>;
    quantity: number;
    constructor(dataService: DataService);
    ngOnInit(): void;
    addItemClick(selectedVariant: GetProductVariantQuery['productVariant']): void;
}

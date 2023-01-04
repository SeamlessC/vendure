import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
import { GetProductVariant, ProductSelectorSearch } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Allows the selection of multiple ProductVariants via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent ProductVariant IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class ProductSelectorFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly isListInput = true;
    readonly: boolean;
    formControl: FormControl;
    config: InputComponentConfig;
    selection$: Observable<GetProductVariant.ProductVariant[]>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    addProductVariant(product: ProductSelectorSearch.Items): void;
    removeProductVariant(id: string): void;
}

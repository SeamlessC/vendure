import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
import { DataService } from '../../../data/providers/data.service';
import { ModalService } from '../../../providers/modal/modal.service';
export declare class ProductMultiSelectorFormInputComponent implements OnInit, FormInputComponent {
    private modalService;
    private dataService;
    private changeDetector;
    config: DefaultFormComponentConfig<'product-multi-form-input'>;
    formControl: FormControl;
    readonly: boolean;
    mode: 'product' | 'variant';
    readonly isListInput = true;
    static readonly id: DefaultFormComponentId;
    constructor(modalService: ModalService, dataService: DataService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    select(): void;
}

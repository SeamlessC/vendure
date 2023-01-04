import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFieldConfig, ModalService } from '@vendure/admin-ui/core';
export declare class OrderCustomFieldsCardComponent implements OnInit {
    private formBuilder;
    private modalService;
    customFieldsConfig: CustomFieldConfig[];
    customFieldValues: {
        [name: string]: any;
    };
    updateClick: EventEmitter<any>;
    customFieldForm: FormGroup;
    editable: boolean;
    constructor(formBuilder: FormBuilder, modalService: ModalService);
    ngOnInit(): void;
    onUpdateClick(): void;
    onCancelClick(): void;
}

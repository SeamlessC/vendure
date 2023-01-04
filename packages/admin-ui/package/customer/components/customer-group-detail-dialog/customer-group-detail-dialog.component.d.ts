import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateCustomerGroupInput, CustomFieldConfig, Dialog, ServerConfigService } from '@vendure/admin-ui/core';
export declare class CustomerGroupDetailDialogComponent implements Dialog<CreateCustomerGroupInput>, OnInit {
    private serverConfigService;
    private formBuilder;
    group: {
        id?: string;
        name: string;
        customFields?: {
            [name: string]: any;
        };
    };
    resolveWith: (result?: CreateCustomerGroupInput) => void;
    customFields: CustomFieldConfig[];
    form: FormGroup;
    constructor(serverConfigService: ServerConfigService, formBuilder: FormBuilder);
    ngOnInit(): void;
    cancel(): void;
    save(): void;
}

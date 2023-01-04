import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateZoneInput, CustomFieldConfig, Dialog, ServerConfigService } from '@vendure/admin-ui/core';
export declare class ZoneDetailDialogComponent implements Dialog<CreateZoneInput>, OnInit {
    private serverConfigService;
    private formBuilder;
    zone: {
        id?: string;
        name: string;
        customFields?: {
            [name: string]: any;
        };
    };
    resolveWith: (result?: CreateZoneInput) => void;
    customFields: CustomFieldConfig[];
    form: FormGroup;
    constructor(serverConfigService: ServerConfigService, formBuilder: FormBuilder);
    ngOnInit(): void;
    cancel(): void;
    save(): void;
}

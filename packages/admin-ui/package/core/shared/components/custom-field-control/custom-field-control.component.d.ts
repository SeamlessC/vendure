import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputComponentConfig } from '../../../common/component-registry-types';
import { CustomFieldConfig, CustomFieldsFragment, LanguageCode } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { CustomFieldComponentService, CustomFieldEntityName } from '../../../providers/custom-field-component/custom-field-component.service';
/**
 * This component renders the appropriate type of form input control based
 * on the "type" property of the provided CustomFieldConfig.
 */
export declare class CustomFieldControlComponent implements OnInit {
    private dataService;
    private customFieldComponentService;
    entityName: CustomFieldEntityName;
    formGroup: FormGroup;
    customField: CustomFieldsFragment;
    compact: boolean;
    showLabel: boolean;
    readonly: boolean;
    hasCustomControl: boolean;
    private customComponentPlaceholder;
    private customComponentFactory;
    uiLanguage$: Observable<LanguageCode>;
    constructor(dataService: DataService, customFieldComponentService: CustomFieldComponentService);
    ngOnInit(): void;
    getFieldDefinition(): CustomFieldConfig & {
        ui?: InputComponentConfig;
    };
}

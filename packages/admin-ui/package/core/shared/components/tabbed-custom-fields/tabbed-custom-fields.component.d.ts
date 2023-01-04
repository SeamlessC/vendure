import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomFieldConfig } from '../../../common/generated-types';
import { CustomFieldEntityName } from '../../../providers/custom-field-component/custom-field-component.service';
export declare type GroupedCustomFields = Array<{
    tabName: string;
    customFields: CustomFieldConfig[];
}>;
export declare class TabbedCustomFieldsComponent implements OnInit {
    entityName: CustomFieldEntityName;
    customFields: CustomFieldConfig[];
    customFieldsFormGroup: AbstractControl;
    readonly: boolean;
    compact: boolean;
    showLabel: boolean;
    readonly defaultTabName = "__default_tab__";
    tabbedCustomFields: GroupedCustomFields;
    ngOnInit(): void;
    customFieldIsSet(name: string): boolean;
    private groupByTabs;
}

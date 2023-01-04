import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../common/component-registry-types';
import { CustomFieldConfigFragment, LanguageCode } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Uses a select input to allow the selection of a string value. Should be used with
 * `string` type fields with options.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class SelectFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'select-form-input'> & CustomFieldConfigFragment;
    uiLanguage$: Observable<LanguageCode>;
    get options(): any;
    constructor(dataService: DataService);
    ngOnInit(): void;
    trackByFn(index: number, item: any): any;
}

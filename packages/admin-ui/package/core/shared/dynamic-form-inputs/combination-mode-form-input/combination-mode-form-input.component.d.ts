import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../common/component-registry-types';
import { ConfigurableInputComponent } from '../../components/configurable-input/configurable-input.component';
/**
 * @description
 * A special input used to display the "Combination mode" AND/OR toggle.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class CombinationModeFormInputComponent implements FormInputComponent, OnInit {
    private configurableInputComponent;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'combination-mode-form-input'>;
    selectable$: Observable<boolean>;
    constructor(configurableInputComponent: ConfigurableInputComponent);
    ngOnInit(): void;
    setCombinationModeAnd(): void;
    setCombinationModeOr(): void;
}

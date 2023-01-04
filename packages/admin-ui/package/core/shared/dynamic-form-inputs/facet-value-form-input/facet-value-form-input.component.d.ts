import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
import { FacetWithValues } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { FacetValueSeletorItem } from '../../components/facet-value-selector/facet-value-selector.component';
/**
 * @description
 * Allows the selection of multiple FacetValues via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent FacetValue IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class FacetValueFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly isListInput = true;
    readonly: boolean;
    formControl: FormControl;
    facets$: Observable<FacetWithValues.Fragment[]>;
    config: InputComponentConfig;
    constructor(dataService: DataService);
    ngOnInit(): void;
    valueTransformFn: (values: FacetValueSeletorItem[]) => string | FacetValueSeletorItem[];
}

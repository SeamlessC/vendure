import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FacetValue, FacetWithValues } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare type FacetValueSeletorItem = {
    name: string;
    facetName: string;
    id: string;
    value: FacetValue.Fragment;
};
/**
 * @description
 * A form control for selecting facet values.
 *
 * @example
 * ```HTML
 * <vdr-facet-value-selector
 *   [facets]="facets"
 *   (selectedValuesChange)="selectedValues = $event"
 * ></vdr-facet-value-selector>
 * ```
 * The `facets` input should be provided from the parent component
 * like this:
 *
 * @example
 * ```TypeScript
 * this.facets = this.dataService
 *   .facet.getAllFacets()
 *   .mapSingle(data => data.facets.items);
 * ```
 * @docsCategory components
 */
export declare class FacetValueSelectorComponent implements OnInit, ControlValueAccessor {
    private dataService;
    selectedValuesChange: EventEmitter<import("../../../common/generated-types").FacetValueFragment[]>;
    facets: FacetWithValues.Fragment[];
    readonly: boolean;
    transformControlValueAccessorValue: (value: FacetValueSeletorItem[]) => any[];
    private ngSelect;
    facetValues: FacetValueSeletorItem[];
    onChangeFn: (val: any) => void;
    onTouchFn: () => void;
    disabled: boolean;
    value: Array<string | FacetValue.Fragment>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    onChange(selected: FacetValueSeletorItem[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    writeValue(obj: string | FacetValue.Fragment[] | Array<string | number> | null): void;
    private toSelectorItem;
}

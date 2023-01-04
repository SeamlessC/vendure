import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { DataService, Dialog, FacetWithValuesFragment } from '@vendure/admin-ui/core';
import { Subscription } from 'rxjs';
interface ProductOrVariant {
    id: string;
    name: string;
    sku?: string;
    facetValues: Array<{
        id: string;
        name: string;
        code: string;
        facet: Array<{
            id: string;
            name: string;
            code: string;
        }>;
    }>;
}
export declare class BulkAddFacetValuesDialogComponent implements OnInit, OnDestroy, Dialog<FacetWithValuesFragment[]> {
    private dataService;
    private changeDetectorRef;
    resolveWith: (result?: FacetWithValuesFragment[]) => void;
    mode: 'product' | 'variant';
    ids?: string[];
    facets: FacetWithValuesFragment[];
    state: 'loading' | 'ready' | 'saving';
    selectedValues: FacetWithValuesFragment[];
    items: ProductOrVariant[];
    facetValuesRemoved: boolean;
    private subscription;
    constructor(dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    cancel(): void;
    removeFacetValue(item: ProductOrVariant, facetValueId: string): void;
    addFacetValues(): Subscription;
}
export {};

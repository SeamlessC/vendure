import { EventEmitter, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductSelectorSearch } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * A component for selecting product variants via an autocomplete-style select input.
 *
 * @example
 * ```HTML
 * <vdr-product-selector
 *   (productSelected)="selectResult($event)"></vdr-product-selector>
 * ```
 *
 * @docsCategory components
 */
export declare class ProductSelectorComponent implements OnInit {
    private dataService;
    searchInput$: Subject<string>;
    searchLoading: boolean;
    searchResults$: Observable<ProductSelectorSearch.Items[]>;
    productSelected: EventEmitter<{
        __typename?: "SearchResult" | undefined;
    } & Pick<import("../../../common/generated-types").SearchResult, "sku" | "productVariantId" | "productVariantName"> & {
        productAsset?: import("../../../common/generated-types").Maybe<{
            __typename?: "SearchResultAsset" | undefined;
        } & Pick<import("../../../common/generated-types").SearchResultAsset, "id" | "preview"> & {
            focalPoint?: import("../../../common/generated-types").Maybe<{
                __typename?: "Coordinate" | undefined;
            } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">> | undefined;
        }> | undefined;
        price: {
            __typename?: "PriceRange" | undefined;
        } | ({
            __typename?: "SinglePrice" | undefined;
        } & Pick<import("../../../common/generated-types").SinglePrice, "value">);
        priceWithTax: {
            __typename?: "PriceRange" | undefined;
        } | ({
            __typename?: "SinglePrice" | undefined;
        } & Pick<import("../../../common/generated-types").SinglePrice, "value">);
    }>;
    private ngSelect;
    constructor(dataService: DataService);
    ngOnInit(): void;
    private initSearchResults;
    selectResult(product?: ProductSelectorSearch.Items): void;
}

import { BulkAction, SearchProducts } from '@vendure/admin-ui/core';
import { ProductListComponent } from './product-list.component';
export declare const deleteProductsBulkAction: BulkAction<SearchProducts.Items, ProductListComponent>;
export declare const assignProductsToChannelBulkAction: BulkAction<SearchProducts.Items, ProductListComponent>;
export declare const removeProductsFromChannelBulkAction: BulkAction<SearchProducts.Items, ProductListComponent>;
export declare const assignFacetValuesToProductsBulkAction: BulkAction<SearchProducts.Items, ProductListComponent>;

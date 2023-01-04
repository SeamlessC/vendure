import { BulkAction, GetFacetList } from '@vendure/admin-ui/core';
import { FacetListComponent } from './facet-list.component';
export declare const deleteFacetsBulkAction: BulkAction<GetFacetList.Items, FacetListComponent>;
export declare const assignFacetsToChannelBulkAction: BulkAction<GetFacetList.Items, FacetListComponent>;
export declare const removeFacetsFromChannelBulkAction: BulkAction<GetFacetList.Items, FacetListComponent>;

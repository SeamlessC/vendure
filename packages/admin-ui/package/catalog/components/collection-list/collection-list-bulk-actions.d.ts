import { BulkAction } from '@vendure/admin-ui/core';
import { CollectionPartial } from '../collection-tree/collection-tree.component';
import { CollectionListComponent } from './collection-list.component';
export declare const deleteCollectionsBulkAction: BulkAction<CollectionPartial, CollectionListComponent>;
export declare const assignCollectionsToChannelBulkAction: BulkAction<CollectionPartial, CollectionListComponent>;
export declare const removeCollectionsFromChannelBulkAction: BulkAction<CollectionPartial, CollectionListComponent>;

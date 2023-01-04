import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collection, SelectionManager } from '@vendure/admin-ui/core';
import { RootNode } from './array-to-tree';
export declare type RearrangeEvent = {
    collectionId: string;
    parentId: string;
    index: number;
};
export declare type CollectionPartial = Pick<Collection.Fragment, 'id' | 'parent' | 'name'>;
export declare class CollectionTreeComponent implements OnChanges {
    collections: CollectionPartial[];
    activeCollectionId: string;
    expandAll: boolean;
    expandedIds: string[];
    selectionManager: SelectionManager<CollectionPartial>;
    rearrange: EventEmitter<RearrangeEvent>;
    deleteCollection: EventEmitter<string>;
    collectionTree: RootNode<CollectionPartial>;
    private allMoveListItems;
    ngOnChanges(changes: SimpleChanges): void;
    onDrop(event: CdkDragDrop<CollectionPartial | RootNode<CollectionPartial>>): void;
    onMove(event: RearrangeEvent): void;
    onDelete(id: string): void;
    getMoveListItems(collection: CollectionPartial): {
        path: string;
        id: string;
        ancestorIdPath: Set<string>;
    }[];
    calculateAllMoveListItems(): {
        path: string;
        id: string;
        ancestorIdPath: Set<string>;
    }[];
    private isRootNode;
}

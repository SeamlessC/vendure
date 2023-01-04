import { BulkAction, BulkActionLocationId } from './bulk-action-types';
export declare class BulkActionRegistryService {
    private locationBulActionMap;
    registerBulkAction(bulkAction: BulkAction): void;
    getBulkActionsForLocation(id: BulkActionLocationId): BulkAction[];
}

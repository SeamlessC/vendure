import { ChangeDetectorRef, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectionManager } from '../../../common/utilities/selection-manager';
import { DataService } from '../../../data/providers/data.service';
import { BulkActionRegistryService } from '../../../providers/bulk-action-registry/bulk-action-registry.service';
import { BulkAction, BulkActionLocationId } from '../../../providers/bulk-action-registry/bulk-action-types';
export declare class BulkActionMenuComponent<T = any> implements OnInit, OnDestroy {
    private bulkActionRegistryService;
    private injector;
    private route;
    private dataService;
    private changeDetectorRef;
    locationId: BulkActionLocationId;
    selectionManager: SelectionManager<T>;
    hostComponent: any;
    actions$: Observable<Array<BulkAction<T> & {
        display: boolean;
        translationVars: Record<string, string | number>;
    }>>;
    userPermissions: string[];
    private subscription;
    constructor(bulkActionRegistryService: BulkActionRegistryService, injector: Injector, route: ActivatedRoute, dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    hasPermissions(bulkAction: Pick<BulkAction, 'requiresPermission'>): boolean | undefined;
    actionClick(event: MouseEvent, action: BulkAction): void;
    clearSelection(): void;
}

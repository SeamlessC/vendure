import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * @description
 * A pipe which checks the provided permission against all the permissions of the current user.
 * Returns `true` if the current user has that permission.
 *
 * @example
 * ```HTML
 * <button [disabled]="!('UpdateCatalog' | hasPermission)">Save Changes</button>
 * ```
 * @docsCategory pipes
 */
export declare class HasPermissionPipe implements PipeTransform, OnDestroy {
    private dataService;
    private changeDetectorRef;
    private hasPermission;
    private currentPermissions$;
    private lastPermissions;
    private subscription;
    constructor(dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    transform(input: string | string[]): any;
    ngOnDestroy(): void;
    private checkPermissions;
    private dispose;
}

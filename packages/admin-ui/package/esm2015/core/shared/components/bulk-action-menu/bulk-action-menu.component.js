import { __awaiter } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { BulkActionRegistryService } from '../../../providers/bulk-action-registry/bulk-action-registry.service';
export class BulkActionMenuComponent {
    constructor(bulkActionRegistryService, injector, route, dataService, changeDetectorRef) {
        this.bulkActionRegistryService = bulkActionRegistryService;
        this.injector = injector;
        this.route = route;
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.userPermissions = [];
    }
    ngOnInit() {
        const actionsForLocation = this.bulkActionRegistryService.getBulkActionsForLocation(this.locationId);
        this.actions$ = this.selectionManager.selectionChanges$.pipe(switchMap(selection => {
            return Promise.all(actionsForLocation.map((action) => __awaiter(this, void 0, void 0, function* () {
                let display = true;
                let translationVars = {};
                const isVisibleFn = action.isVisible;
                const getTranslationVarsFn = action.getTranslationVars;
                const functionContext = {
                    injector: this.injector,
                    hostComponent: this.hostComponent,
                    route: this.route,
                    selection,
                };
                if (typeof isVisibleFn === 'function') {
                    display = yield isVisibleFn(functionContext);
                }
                if (typeof getTranslationVarsFn === 'function') {
                    translationVars = yield getTranslationVarsFn(functionContext);
                }
                return Object.assign(Object.assign({}, action), { display, translationVars });
            })));
        }));
        this.subscription = this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => {
            this.userPermissions = userStatus.permissions;
        })
            .subscribe();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    hasPermissions(bulkAction) {
        if (!this.userPermissions) {
            return false;
        }
        if (!bulkAction.requiresPermission) {
            return true;
        }
        if (typeof bulkAction.requiresPermission === 'string') {
            return this.userPermissions.includes(bulkAction.requiresPermission);
        }
        if (typeof bulkAction.requiresPermission === 'function') {
            return bulkAction.requiresPermission(this.userPermissions);
        }
    }
    actionClick(event, action) {
        action.onClick({
            injector: this.injector,
            event,
            route: this.route,
            selection: this.selectionManager.selection,
            hostComponent: this.hostComponent,
            clearSelection: () => this.selectionManager.clearSelection(),
        });
    }
    clearSelection() {
        this.selectionManager.clearSelection();
        this.changeDetectorRef.markForCheck();
    }
}
BulkActionMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-bulk-action-menu',
                template: "<vdr-dropdown *ngIf=\"actions$ | async as actions\">\n    <button\n        class=\"btn btn-sm btn-outline mr1\"\n        vdrDropdownTrigger\n        [disabled]=\"!selectionManager.selection?.length\"\n        [class.hidden]=\"!selectionManager.selection?.length\"\n    >\n        <clr-icon shape=\"file-group\"></clr-icon>\n        {{ 'common.with-selected' | translate: { count:selectionManager.selection.length } }}\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n        <ng-container *ngIf=\"actions.length; else noActions\">\n            <ng-container *ngFor=\"let action of actions\">\n                <button\n                    *ngIf=\"action.display\"\n                    [disabled]=\"!hasPermissions(action)\"\n                    type=\"button\"\n                    vdrDropdownItem\n                    (click)=\"actionClick($event, action)\"\n                >\n                    <clr-icon\n                        *ngIf=\"action.icon\"\n                        [attr.shape]=\"action.icon\"\n                        [ngClass]=\"action.iconClass || ''\"\n                    ></clr-icon>\n                    {{ action.label | translate: action.translationVars }}\n                </button>\n            </ng-container>\n        </ng-container>\n        <ng-template #noActions>\n            <button type=\"button\" disabled vdrDropdownItem>{{ 'common.no-bulk-actions-available' | translate }}</button>\n        </ng-template>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n<button\n    class=\"btn btn-sm btn-link\"\n    (click)=\"clearSelection()\"\n    [class.hidden]=\"!selectionManager.selection?.length\"\n>\n    <clr-icon shape=\"times\"></clr-icon>\n    {{ 'common.clear-selection' | translate }}\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex;align-items:center}button.hidden{display:none}\n"]
            },] }
];
BulkActionMenuComponent.ctorParameters = () => [
    { type: BulkActionRegistryService },
    { type: Injector },
    { type: ActivatedRoute },
    { type: DataService },
    { type: ChangeDetectorRef }
];
BulkActionMenuComponent.propDecorators = {
    locationId: [{ type: Input }],
    selectionManager: [{ type: Input }],
    hostComponent: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1hY3Rpb24tbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2J1bGstYWN0aW9uLW1lbnUvYnVsay1hY3Rpb24tbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxHQUdSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBYWpILE1BQU0sT0FBTyx1QkFBdUI7SUFXaEMsWUFDWSx5QkFBb0QsRUFDcEQsUUFBa0IsRUFDbEIsS0FBcUIsRUFDckIsV0FBd0IsRUFDeEIsaUJBQW9DO1FBSnBDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBVGhELG9CQUFlLEdBQWEsRUFBRSxDQUFDO0lBVTVCLENBQUM7SUFFSixRQUFRO1FBQ0osTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FDeEQs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LEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVpRLHlCQUF5QjtZQVg5QixRQUFRO1lBS0gsY0FBYztZQUtkLFdBQVc7WUFaaEIsaUJBQWlCOzs7eUJBMkJoQixLQUFLOytCQUNMLEtBQUs7NEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNlbGVjdGlvbk1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbGl0aWVzL3NlbGVjdGlvbi1tYW5hZ2VyJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvYnVsay1hY3Rpb24tcmVnaXN0cnkvYnVsay1hY3Rpb24tcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEJ1bGtBY3Rpb24sXG4gICAgQnVsa0FjdGlvbkZ1bmN0aW9uQ29udGV4dCxcbiAgICBCdWxrQWN0aW9uTG9jYXRpb25JZCxcbn0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL2J1bGstYWN0aW9uLXJlZ2lzdHJ5L2J1bGstYWN0aW9uLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYnVsay1hY3Rpb24tbWVudScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1bGstYWN0aW9uLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2J1bGstYWN0aW9uLW1lbnUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQnVsa0FjdGlvbk1lbnVDb21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgbG9jYXRpb25JZDogQnVsa0FjdGlvbkxvY2F0aW9uSWQ7XG4gICAgQElucHV0KCkgc2VsZWN0aW9uTWFuYWdlcjogU2VsZWN0aW9uTWFuYWdlcjxUPjtcbiAgICBASW5wdXQoKSBob3N0Q29tcG9uZW50OiBhbnk7XG4gICAgYWN0aW9ucyQ6IE9ic2VydmFibGU8XG4gICAgICAgIEFycmF5PEJ1bGtBY3Rpb248VD4gJiB7IGRpc3BsYXk6IGJvb2xlYW47IHRyYW5zbGF0aW9uVmFyczogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPiB9PlxuICAgID47XG4gICAgdXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2U6IEJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3Rpb25zRm9yTG9jYXRpb24gPSB0aGlzLmJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2UuZ2V0QnVsa0FjdGlvbnNGb3JMb2NhdGlvbih0aGlzLmxvY2F0aW9uSWQpO1xuICAgICAgICB0aGlzLmFjdGlvbnMkID0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdGlvbkNoYW5nZXMkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnNGb3JMb2NhdGlvbi5tYXAoYXN5bmMgYWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvblZhcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVmlzaWJsZUZuID0gYWN0aW9uLmlzVmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFRyYW5zbGF0aW9uVmFyc0ZuID0gYWN0aW9uLmdldFRyYW5zbGF0aW9uVmFycztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZ1bmN0aW9uQ29udGV4dDogQnVsa0FjdGlvbkZ1bmN0aW9uQ29udGV4dDxULCBhbnk+ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdG9yOiB0aGlzLmluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RDb21wb25lbnQ6IHRoaXMuaG9zdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZTogdGhpcy5yb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpc1Zpc2libGVGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBhd2FpdCBpc1Zpc2libGVGbihmdW5jdGlvbkNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBnZXRUcmFuc2xhdGlvblZhcnNGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFycyA9IGF3YWl0IGdldFRyYW5zbGF0aW9uVmFyc0ZuKGZ1bmN0aW9uQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5hY3Rpb24sIGRpc3BsYXksIHRyYW5zbGF0aW9uVmFycyB9O1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgIC51c2VyU3RhdHVzKClcbiAgICAgICAgICAgIC5tYXBTdHJlYW0oKHsgdXNlclN0YXR1cyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyUGVybWlzc2lvbnMgPSB1c2VyU3RhdHVzLnBlcm1pc3Npb25zO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaGFzUGVybWlzc2lvbnMoYnVsa0FjdGlvbjogUGljazxCdWxrQWN0aW9uLCAncmVxdWlyZXNQZXJtaXNzaW9uJz4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJQZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYnVsa0FjdGlvbi5yZXF1aXJlc1Blcm1pc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYnVsa0FjdGlvbi5yZXF1aXJlc1Blcm1pc3Npb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyUGVybWlzc2lvbnMuaW5jbHVkZXMoYnVsa0FjdGlvbi5yZXF1aXJlc1Blcm1pc3Npb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYnVsa0FjdGlvbi5yZXF1aXJlc1Blcm1pc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBidWxrQWN0aW9uLnJlcXVpcmVzUGVybWlzc2lvbih0aGlzLnVzZXJQZXJtaXNzaW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25DbGljayhldmVudDogTW91c2VFdmVudCwgYWN0aW9uOiBCdWxrQWN0aW9uKSB7XG4gICAgICAgIGFjdGlvbi5vbkNsaWNrKHtcbiAgICAgICAgICAgIGluamVjdG9yOiB0aGlzLmluamVjdG9yLFxuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICByb3V0ZTogdGhpcy5yb3V0ZSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdGlvbixcbiAgICAgICAgICAgIGhvc3RDb21wb25lbnQ6IHRoaXMuaG9zdENvbXBvbmVudCxcbiAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uOiAoKSA9PiB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuY2xlYXJTZWxlY3Rpb24oKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==
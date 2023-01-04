import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DashboardWidgetService, DataService, LocalStorageService, } from '@vendure/admin-ui/core';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { map, tap } from 'rxjs/operators';
export class DashboardComponent {
    constructor(dashboardWidgetService, localStorageService, changedDetectorRef, dataService) {
        this.dashboardWidgetService = dashboardWidgetService;
        this.localStorageService = localStorageService;
        this.changedDetectorRef = changedDetectorRef;
        this.dataService = dataService;
        this.deletionMarker = '__delete__';
    }
    ngOnInit() {
        this.availableWidgetIds$ = this.dataService.client.userStatus().stream$.pipe(map(({ userStatus }) => userStatus.permissions), map(permissions => this.dashboardWidgetService.getAvailableIds(permissions)), tap(ids => (this.widgetLayout = this.initLayout(ids))));
    }
    getClassForWidth(width) {
        switch (width) {
            case 3:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-3`;
            case 4:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-4`;
            case 6:
                return `clr-col-12 clr-col-lg-6`;
            case 8:
                return `clr-col-12 clr-col-lg-8`;
            case 12:
                return `clr-col-12`;
            default:
                assertNever(width);
        }
    }
    getSupportedWidths(config) {
        return config.supportedWidths || [3, 4, 6, 8, 12];
    }
    setWidgetWidth(widget, width) {
        widget.width = width;
        this.recalculateLayout();
    }
    trackRow(index, row) {
        const id = row.map(item => `${item.id}:${item.width}`).join('|');
        return id;
    }
    trackRowItem(index, item) {
        return item.config;
    }
    addWidget(id) {
        var _a;
        const config = this.dashboardWidgetService.getWidgetById(id);
        if (config) {
            const width = this.getSupportedWidths(config)[0];
            const widget = {
                id,
                config,
                width,
            };
            let targetRow;
            if (this.widgetLayout && this.widgetLayout.length) {
                targetRow = this.widgetLayout[this.widgetLayout.length - 1];
            }
            else {
                targetRow = [];
                (_a = this.widgetLayout) === null || _a === void 0 ? void 0 : _a.push(targetRow);
            }
            targetRow.push(widget);
            this.recalculateLayout();
        }
    }
    removeWidget(widget) {
        widget.id = this.deletionMarker;
        this.recalculateLayout();
    }
    drop(event) {
        const { currentIndex, previousIndex, previousContainer, container } = event;
        if (previousIndex === currentIndex && previousContainer.data.index === container.data.index) {
            // Nothing changed
            return;
        }
        if (this.widgetLayout) {
            const previousLayoutRow = this.widgetLayout[previousContainer.data.index];
            const newLayoutRow = this.widgetLayout[container.data.index];
            previousLayoutRow.splice(previousIndex, 1);
            newLayoutRow.splice(currentIndex, 0, event.item.data);
            this.recalculateLayout();
        }
    }
    initLayout(availableIds) {
        const savedLayoutDef = this.localStorageService.get('dashboardWidgetLayout');
        let layoutDef;
        if (savedLayoutDef) {
            // validate all the IDs from the saved layout are still available
            layoutDef = savedLayoutDef.filter(item => availableIds.includes(item.id));
        }
        return this.dashboardWidgetService.getWidgetLayout(layoutDef);
    }
    recalculateLayout() {
        if (this.widgetLayout) {
            const flattened = this.widgetLayout
                .reduce((flat, row) => [...flat, ...row], [])
                .filter(item => item.id !== this.deletionMarker);
            const newLayoutDef = flattened.map(item => ({
                id: item.id,
                width: item.width,
            }));
            this.widgetLayout = this.dashboardWidgetService.getWidgetLayout(newLayoutDef);
            this.localStorageService.set('dashboardWidgetLayout', newLayoutDef);
            setTimeout(() => this.changedDetectorRef.markForCheck());
        }
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dashboard',
                template: "<div class=\"widget-header\">\n    <vdr-dropdown>\n        <button class=\"btn btn-secondary btn-sm\" vdrDropdownTrigger>\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'dashboard.add-widget' | translate }}\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                class=\"button\"\n                vdrDropdownItem\n                *ngFor=\"let id of availableWidgetIds$ | async\"\n                (click)=\"addWidget(id)\"\n            >\n                {{ id }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</div>\n<div cdkDropListGroup>\n    <div\n        class=\"clr-row dashboard-row\"\n        *ngFor=\"let row of widgetLayout; index as rowIndex; trackBy: trackRow\"\n        cdkDropList\n        (cdkDropListDropped)=\"drop($event)\"\n        cdkDropListOrientation=\"horizontal\"\n        [cdkDropListData]=\"{ index: rowIndex }\"\n    >\n        <div\n            *ngFor=\"let widget of row; trackBy: trackRowItem\"\n            class=\"dashboard-item\"\n            [ngClass]=\"getClassForWidth(widget.width)\"\n            cdkDrag\n            [cdkDragData]=\"widget\"\n        >\n            <vdr-dashboard-widget\n                *vdrIfPermissions=\"widget.config.requiresPermissions || null\"\n                [widgetConfig]=\"widget.config\"\n            >\n                <div class=\"flex\">\n                    <div class=\"drag-handle\" cdkDragHandle>\n                        <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n                    </div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <h4 class=\"dropdown-header\">{{ 'dashboard.widget-resize' | translate }}</h4>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                [disabled]=\"width === widget.width\"\n                                *ngFor=\"let width of getSupportedWidths(widget.config)\"\n                                (click)=\"setWidgetWidth(widget, width)\"\n                            >\n                                {{ 'dashboard.widget-width' | translate: { width: width } }}\n                            </button>\n                            <div class=\"dropdown-divider\" role=\"separator\"></div>\n                            <button class=\"button\" vdrDropdownItem (click)=\"removeWidget(widget)\">\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'dashboard.remove-widget' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-dashboard-widget>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;max-width:1200px;margin:auto}.widget-header{display:flex;justify-content:flex-end}.placeholder{color:var(--color-grey-300);text-align:center}.placeholder .version{font-size:3em;margin:24px;line-height:1em}.placeholder ::ng-deep .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget{margin-bottom:24px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging,.dashboard-row.cdk-drop-list-receiving{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging .dashboard-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}\n"]
            },] }
];
DashboardComponent.ctorParameters = () => [
    { type: DashboardWidgetService },
    { type: LocalStorageService },
    { type: ChangeDetectorRef },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUVILHNCQUFzQixFQUV0QixXQUFXLEVBQ1gsbUJBQW1CLEdBR3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRMUMsTUFBTSxPQUFPLGtCQUFrQjtJQUszQixZQUNZLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsa0JBQXFDLEVBQ3JDLFdBQXdCO1FBSHhCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTm5CLG1CQUFjLEdBQUcsWUFBWSxDQUFDO0lBTzVDLENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3hFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFDL0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxF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QUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztpQkFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckQsTUFBTSxZQUFZLEdBQTJCLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQzs7O1lBOUhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsb2pHQUF5QztnQkFFekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFoQkcsc0JBQXNCO1lBR3RCLG1CQUFtQjtZQU5XLGlCQUFpQjtZQUsvQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrRHJhZ0Ryb3AgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGFzaGJvYXJkV2lkZ2V0Q29uZmlnLFxuICAgIERhc2hib2FyZFdpZGdldFNlcnZpY2UsXG4gICAgRGFzaGJvYXJkV2lkZ2V0V2lkdGgsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICBXaWRnZXRMYXlvdXQsXG4gICAgV2lkZ2V0TGF5b3V0RGVmaW5pdGlvbixcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBhc3NlcnROZXZlciB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1kYXNoYm9hcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHdpZGdldExheW91dDogV2lkZ2V0TGF5b3V0IHwgdW5kZWZpbmVkO1xuICAgIGF2YWlsYWJsZVdpZGdldElkcyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVsZXRpb25NYXJrZXIgPSAnX19kZWxldGVfXyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXNoYm9hcmRXaWRnZXRTZXJ2aWNlOiBEYXNoYm9hcmRXaWRnZXRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlZERldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkZ2V0SWRzJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVzZXJTdGF0dXMoKS5zdHJlYW0kLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHsgdXNlclN0YXR1cyB9KSA9PiB1c2VyU3RhdHVzLnBlcm1pc3Npb25zKSxcbiAgICAgICAgICAgIG1hcChwZXJtaXNzaW9ucyA9PiB0aGlzLmRhc2hib2FyZFdpZGdldFNlcnZpY2UuZ2V0QXZhaWxhYmxlSWRzKHBlcm1pc3Npb25zKSksXG4gICAgICAgICAgICB0YXAoaWRzID0+ICh0aGlzLndpZGdldExheW91dCA9IHRoaXMuaW5pdExheW91dChpZHMpKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NGb3JXaWR0aCh3aWR0aDogRGFzaGJvYXJkV2lkZ2V0V2lkdGgpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHdpZHRoKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBjbHItY29sLTEyIGNsci1jb2wtc20tNiBjbHItY29sLWxnLTNgO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgY2xyLWNvbC0xMiBjbHItY29sLXNtLTYgY2xyLWNvbC1sZy00YDtcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYGNsci1jb2wtMTIgY2xyLWNvbC1sZy02YDtcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICByZXR1cm4gYGNsci1jb2wtMTIgY2xyLWNvbC1sZy04YDtcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBjbHItY29sLTEyYDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYXNzZXJ0TmV2ZXIod2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkV2lkdGhzKGNvbmZpZzogRGFzaGJvYXJkV2lkZ2V0Q29uZmlnKTogRGFzaGJvYXJkV2lkZ2V0V2lkdGhbXSB7XG4gICAgICAgIHJldHVybiBjb25maWcuc3VwcG9ydGVkV2lkdGhzIHx8IFszLCA0LCA2LCA4LCAxMl07XG4gICAgfVxuXG4gICAgc2V0V2lkZ2V0V2lkdGgod2lkZ2V0OiBXaWRnZXRMYXlvdXRbbnVtYmVyXVtudW1iZXJdLCB3aWR0aDogRGFzaGJvYXJkV2lkZ2V0V2lkdGgpIHtcbiAgICAgICAgd2lkZ2V0LndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXlvdXQoKTtcbiAgICB9XG5cbiAgICB0cmFja1JvdyhpbmRleDogbnVtYmVyLCByb3c6IFdpZGdldExheW91dFtudW1iZXJdKSB7XG4gICAgICAgIGNvbnN0IGlkID0gcm93Lm1hcChpdGVtID0+IGAke2l0ZW0uaWR9OiR7aXRlbS53aWR0aH1gKS5qb2luKCd8Jyk7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICB0cmFja1Jvd0l0ZW0oaW5kZXg6IG51bWJlciwgaXRlbTogV2lkZ2V0TGF5b3V0W251bWJlcl1bbnVtYmVyXSkge1xuICAgICAgICByZXR1cm4gaXRlbS5jb25maWc7XG4gICAgfVxuXG4gICAgYWRkV2lkZ2V0KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5kYXNoYm9hcmRXaWRnZXRTZXJ2aWNlLmdldFdpZGdldEJ5SWQoaWQpO1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0U3VwcG9ydGVkV2lkdGhzKGNvbmZpZylbMF07XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQ6IFdpZGdldExheW91dFtudW1iZXJdW251bWJlcl0gPSB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRSb3c6IFdpZGdldExheW91dFtudW1iZXJdO1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkZ2V0TGF5b3V0ICYmIHRoaXMud2lkZ2V0TGF5b3V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFJvdyA9IHRoaXMud2lkZ2V0TGF5b3V0W3RoaXMud2lkZ2V0TGF5b3V0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRSb3cgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLndpZGdldExheW91dD8ucHVzaCh0YXJnZXRSb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0Um93LnB1c2god2lkZ2V0KTtcbiAgICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IFdpZGdldExheW91dFtudW1iZXJdW251bWJlcl0pIHtcbiAgICAgICAgd2lkZ2V0LmlkID0gdGhpcy5kZWxldGlvbk1hcmtlcjtcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxheW91dCgpO1xuICAgIH1cblxuICAgIGRyb3AoZXZlbnQ6IENka0RyYWdEcm9wPHsgaW5kZXg6IG51bWJlciB9Pikge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRJbmRleCwgcHJldmlvdXNJbmRleCwgcHJldmlvdXNDb250YWluZXIsIGNvbnRhaW5lciB9ID0gZXZlbnQ7XG4gICAgICAgIGlmIChwcmV2aW91c0luZGV4ID09PSBjdXJyZW50SW5kZXggJiYgcHJldmlvdXNDb250YWluZXIuZGF0YS5pbmRleCA9PT0gY29udGFpbmVyLmRhdGEuaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgY2hhbmdlZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpZGdldExheW91dCkge1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNMYXlvdXRSb3cgPSB0aGlzLndpZGdldExheW91dFtwcmV2aW91c0NvbnRhaW5lci5kYXRhLmluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xheW91dFJvdyA9IHRoaXMud2lkZ2V0TGF5b3V0W2NvbnRhaW5lci5kYXRhLmluZGV4XTtcblxuICAgICAgICAgICAgcHJldmlvdXNMYXlvdXRSb3cuc3BsaWNlKHByZXZpb3VzSW5kZXgsIDEpO1xuICAgICAgICAgICAgbmV3TGF5b3V0Um93LnNwbGljZShjdXJyZW50SW5kZXgsIDAsIGV2ZW50Lml0ZW0uZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRMYXlvdXQoYXZhaWxhYmxlSWRzOiBzdHJpbmdbXSk6IFdpZGdldExheW91dCB7XG4gICAgICAgIGNvbnN0IHNhdmVkTGF5b3V0RGVmID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnZGFzaGJvYXJkV2lkZ2V0TGF5b3V0Jyk7XG4gICAgICAgIGxldCBsYXlvdXREZWY6IFdpZGdldExheW91dERlZmluaXRpb24gfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzYXZlZExheW91dERlZikge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGUgYWxsIHRoZSBJRHMgZnJvbSB0aGUgc2F2ZWQgbGF5b3V0IGFyZSBzdGlsbCBhdmFpbGFibGVcbiAgICAgICAgICAgIGxheW91dERlZiA9IHNhdmVkTGF5b3V0RGVmLmZpbHRlcihpdGVtID0+IGF2YWlsYWJsZUlkcy5pbmNsdWRlcyhpdGVtLmlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGFzaGJvYXJkV2lkZ2V0U2VydmljZS5nZXRXaWRnZXRMYXlvdXQobGF5b3V0RGVmKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlY2FsY3VsYXRlTGF5b3V0KCkge1xuICAgICAgICBpZiAodGhpcy53aWRnZXRMYXlvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lZCA9IHRoaXMud2lkZ2V0TGF5b3V0XG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoZmxhdCwgcm93KSA9PiBbLi4uZmxhdCwgLi4ucm93XSwgW10pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT09IHRoaXMuZGVsZXRpb25NYXJrZXIpO1xuICAgICAgICAgICAgY29uc3QgbmV3TGF5b3V0RGVmOiBXaWRnZXRMYXlvdXREZWZpbml0aW9uID0gZmxhdHRlbmVkLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGl0ZW0ud2lkdGgsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLndpZGdldExheW91dCA9IHRoaXMuZGFzaGJvYXJkV2lkZ2V0U2VydmljZS5nZXRXaWRnZXRMYXlvdXQobmV3TGF5b3V0RGVmKTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2Rhc2hib2FyZFdpZGdldExheW91dCcsIG5ld0xheW91dERlZik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2hhbmdlZERldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
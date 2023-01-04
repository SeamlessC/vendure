import { ChangeDetectionStrategy, Component, Input, isDevMode } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
export class UiExtensionPointComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isDevMode = isDevMode();
    }
    ngOnInit() {
        this.display$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.displayUiExtensionPoints);
    }
}
UiExtensionPointComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ui-extension-point',
                template: "<div [class.highlight]=\"isDevMode && (display$ | async)\" class=\"wrapper\">\n    <vdr-dropdown *ngIf=\"isDevMode && (display$ | async)\">\n        <button class=\"btn btn-icon btn-link extension-point-info-trigger\"\n                [style.top.px]=\"topPx ?? 0\"\n                [style.left.px]=\"leftPx ?? 0\"\n                vdrDropdownTrigger>\n            <clr-icon shape=\"plugin\" class=\"\" size=\"16\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu>\n            <div class=\"extension-info\">\n                <pre *ngIf=\"api === 'actionBar'\">\naddActionBarItem({{ '{' }}\n  id: 'my-button',\n  label: 'My Action',\n  locationId: '{{ locationId }}',\n{{ '}' }})</pre>\n                <pre *ngIf=\"api === 'navMenu'\">\naddNavMenuItem({{ '{' }}\n  id: 'my-menu-item',\n  label: 'My Menu Item',\n  routerLink: ['/extensions/my-plugin'],\n  {{ '}' }},\n  '{{ locationId }}'\n)</pre>\n                <pre *ngIf=\"api === 'detailComponent'\">\nregisterCustomDetailComponent({{ '{' }}\n  locationId: '{{ locationId }}',\n  component: MyCustomComponent,\n{{ '}' }})</pre>\n            </div>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n    <ng-content></ng-content>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;display:inline-block}.wrapper{display:inline-block;height:100%}.extension-point-info-trigger{position:absolute;margin:0;padding:0;z-index:100}.extension-point-info-trigger clr-icon{color:var(--color-success-500)}.extension-info{padding:12px}pre{padding:6px;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;background-color:var(--color-grey-200)}\n"]
            },] }
];
UiExtensionPointComponent.ctorParameters = () => [
    { type: DataService }
];
UiExtensionPointComponent.propDecorators = {
    locationId: [{ type: Input }],
    topPx: [{ type: Input }],
    leftPx: [{ type: Input }],
    api: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZXh0ZW5zaW9uLXBvaW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvdWktZXh0ZW5zaW9uLXBvaW50L3VpLWV4dGVuc2lvbi1wb2ludC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBSTdGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVFuRSxNQUFNLE9BQU8seUJBQXlCO0lBT2xDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRG5DLGNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUNjLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2FBQ2xDLE9BQU8sRUFBRTthQUNULFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7OztZQW5CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsaXNDQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFQUSxXQUFXOzs7eUJBU2YsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7a0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBpc0Rldk1vZGUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVSUV4dGVuc2lvbkxvY2F0aW9uSWQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdWktZXh0ZW5zaW9uLXBvaW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdWktZXh0ZW5zaW9uLXBvaW50LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi91aS1leHRlbnNpb24tcG9pbnQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVWlFeHRlbnNpb25Qb2ludENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgbG9jYXRpb25JZDogVUlFeHRlbnNpb25Mb2NhdGlvbklkO1xuICAgIEBJbnB1dCgpIHRvcFB4OiBudW1iZXI7XG4gICAgQElucHV0KCkgbGVmdFB4OiBudW1iZXI7XG4gICAgQElucHV0KCkgYXBpOiAnYWN0aW9uQmFyJyB8ICduYXZNZW51JyB8ICdkZXRhaWxDb21wb25lbnQnO1xuICAgIGRpc3BsYXkkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHJlYWRvbmx5IGlzRGV2TW9kZSA9IGlzRGV2TW9kZSgpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGxheSQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVpU3RhdGUoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbSgoeyB1aVN0YXRlIH0pID0+IHVpU3RhdGUuZGlzcGxheVVpRXh0ZW5zaW9uUG9pbnRzKTtcbiAgICB9XG59XG4iXX0=
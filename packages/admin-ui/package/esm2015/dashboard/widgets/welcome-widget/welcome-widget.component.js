import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ADMIN_UI_VERSION, CoreModule, DataService, getAppConfig, } from '@vendure/admin-ui/core';
export class WelcomeWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.version = ADMIN_UI_VERSION;
        this.brand = getAppConfig().brand;
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
        this.hideVersion = getAppConfig().hideVersion;
    }
    ngOnInit() {
        this.administrator$ = this.dataService.administrator
            .getActiveAdministrator()
            .mapStream(data => data.activeAdministrator || null);
    }
}
WelcomeWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-welcome-widget',
                template: "<div *ngIf=\"administrator$ | async as administrator\">\n    <h4 class=\"h4\">\n        Welcome, {{ administrator.firstName }} {{ administrator.lastName }}<br />\n        <small class=\"p5\">Last login: {{ administrator.user.lastLogin | timeAgo }}</small>\n    </h4>\n\n    <p class=\"p5\" *ngIf=\"!hideVendureBranding || !hideVersion\">\n        {{ hideVendureBranding ? '' : 'Vendure' }} {{ hideVersion ? '' : ('Admin UI v' + version) }}\n    </p>\n</div>\n<div class=\"placeholder\">\n    <clr-icon shape=\"line-chart\" size=\"128\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;justify-content:space-between}.placeholder{color:var(--color-grey-200)}\n"]
            },] }
];
WelcomeWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
export class WelcomeWidgetModule {
}
WelcomeWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule],
                declarations: [WelcomeWidgetComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9kYXNoYm9hcmQvc3JjL3dpZGdldHMvd2VsY29tZS13aWRnZXQvd2VsY29tZS13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFFSCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFdBQVcsRUFFWCxZQUFZLEdBQ2YsTUFBTSx3QkFBd0IsQ0FBQztBQVNoQyxNQUFNLE9BQU8sc0JBQXNCO0lBTy9CLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTjVDLFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUUzQixVQUFLLEdBQUcsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzdCLHdCQUFtQixHQUFHLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO1FBQ3pELGdCQUFXLEdBQUcsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO0lBRU0sQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7YUFDL0Msc0JBQXNCLEVBQUU7YUFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7OztZQW5CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIseWpCQUE4QztnQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFYRyxXQUFXOztBQWdDZixNQUFNLE9BQU8sbUJBQW1COzs7WUFKL0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBOZ01vZHVsZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFkbWluaXN0cmF0b3IsXG4gICAgQURNSU5fVUlfVkVSU0lPTixcbiAgICBDb3JlTW9kdWxlLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIEdldEFjdGl2ZUFkbWluaXN0cmF0b3IsXG4gICAgZ2V0QXBwQ29uZmlnLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItd2VsY29tZS13aWRnZXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93ZWxjb21lLXdpZGdldC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2VsY29tZS13aWRnZXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgV2VsY29tZVdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdmVyc2lvbiA9IEFETUlOX1VJX1ZFUlNJT047XG4gICAgYWRtaW5pc3RyYXRvciQ6IE9ic2VydmFibGU8R2V0QWN0aXZlQWRtaW5pc3RyYXRvci5BY3RpdmVBZG1pbmlzdHJhdG9yIHwgbnVsbD47XG4gICAgYnJhbmQgPSBnZXRBcHBDb25maWcoKS5icmFuZDtcbiAgICBoaWRlVmVuZHVyZUJyYW5kaW5nID0gZ2V0QXBwQ29uZmlnKCkuaGlkZVZlbmR1cmVCcmFuZGluZztcbiAgICBoaWRlVmVyc2lvbiA9IGdldEFwcENvbmZpZygpLmhpZGVWZXJzaW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZG1pbmlzdHJhdG9yJCA9IHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvclxuICAgICAgICAgICAgLmdldEFjdGl2ZUFkbWluaXN0cmF0b3IoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuYWN0aXZlQWRtaW5pc3RyYXRvciB8fCBudWxsKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvcmVNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1dlbGNvbWVXaWRnZXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBXZWxjb21lV2lkZ2V0TW9kdWxlIHt9XG4iXX0=
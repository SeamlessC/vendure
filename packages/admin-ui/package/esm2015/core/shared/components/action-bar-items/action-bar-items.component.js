import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { NavBuilderService } from '../../../providers/nav-builder/nav-builder.service';
import { NotificationService } from '../../../providers/notification/notification.service';
export class ActionBarItemsComponent {
    constructor(navBuilderService, route, dataService, notificationService) {
        this.navBuilderService = navBuilderService;
        this.route = route;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.locationId$ = new BehaviorSubject('');
    }
    ngOnInit() {
        this.items$ = combineLatest(this.navBuilderService.actionBarConfig$, this.locationId$).pipe(map(([items, locationId]) => items.filter(config => config.locationId === locationId)));
    }
    ngOnChanges(changes) {
        if ('locationId' in changes) {
            this.locationId$.next(changes['locationId'].currentValue);
        }
    }
    handleClick(event, item) {
        if (typeof item.onClick === 'function') {
            item.onClick(event, {
                route: this.route,
                dataService: this.dataService,
                notificationService: this.notificationService,
            });
        }
    }
    getRouterLink(item) {
        return this.navBuilderService.getRouterLink(item, this.route);
    }
    getButtonStyles(item) {
        const styles = ['btn'];
        if (item.buttonStyle && item.buttonStyle === 'link') {
            styles.push('btn-link');
            return styles;
        }
        styles.push(this.getButtonColorClass(item));
        return styles;
    }
    getButtonColorClass(item) {
        switch (item.buttonColor) {
            case undefined:
            case 'primary':
                return item.buttonStyle === 'outline' ? 'btn-outline' : 'btn-primary';
            case 'success':
                return item.buttonStyle === 'outline' ? 'btn-success-outline' : 'btn-success';
            case 'warning':
                return item.buttonStyle === 'outline' ? 'btn-warning-outline' : 'btn-warning';
            default:
                assertNever(item.buttonColor);
                return '';
        }
    }
}
ActionBarItemsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar-items',
                template: "<vdr-ui-extension-point [locationId]=\"locationId\" api=\"actionBar\" [leftPx]=\"-24\" [topPx]=\"-6\">\n    <ng-container *ngFor=\"let item of items$ | async\">\n        <button\n            *vdrIfPermissions=\"item.requiresPermission\"\n            [routerLink]=\"getRouterLink(item)\"\n            [disabled]=\"item.disabled ? (item.disabled | async) : false\"\n            (click)=\"handleClick($event, item)\"\n            [ngClass]=\"getButtonStyles(item)\"\n        >\n            <clr-icon *ngIf=\"item.icon\" [attr.shape]=\"item.icon\"></clr-icon>\n            {{ item.label | translate }}\n        </button>\n    </ng-container>\n</vdr-ui-extension-point>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block;min-height:36px}\n"]
            },] }
];
ActionBarItemsComponent.ctorParameters = () => [
    { type: NavBuilderService },
    { type: ActivatedRoute },
    { type: DataService },
    { type: NotificationService }
];
ActionBarItemsComponent.propDecorators = {
    locationId: [{ type: HostBinding, args: ['attr.data-location-id',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FjdGlvbi1iYXItaXRlbXMvYWN0aW9uLWJhci1pdGVtcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssR0FJUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFrQixNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQVUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBUTNGLE1BQU0sT0FBTyx1QkFBdUI7SUFRaEMsWUFDWSxpQkFBb0MsRUFDcEMsS0FBcUIsRUFDckIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBSHhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQU41QyxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBT25ELENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3ZGLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUN6RixDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLFlBQVksSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQixFQUFFLElBQW1CO1FBQzlDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7YUFDaEQsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQW1CO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBbUI7UUFDL0IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLElBQW1CO1FBQzNDLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDVixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMxRSxLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNsRixLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNsRjtnQkFDSSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7OztZQXRFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsc3FCQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSUSxpQkFBaUI7WUFSakIsY0FBYztZQU1kLFdBQVc7WUFHWCxtQkFBbUI7Ozt5QkFTdkIsV0FBVyxTQUFDLHVCQUF1QixjQUNuQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbkJhckxvY2F0aW9uSWQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGlvbkJhckl0ZW0gfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbmF2LWJ1aWxkZXIvbmF2LWJ1aWxkZXItdHlwZXMnO1xuaW1wb3J0IHsgTmF2QnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbmF2LWJ1aWxkZXIvbmF2LWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFjdGlvbi1iYXItaXRlbXMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY3Rpb24tYmFyLWl0ZW1zLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpb24tYmFyLWl0ZW1zLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhckl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLWxvY2F0aW9uLWlkJylcbiAgICBASW5wdXQoKVxuICAgIGxvY2F0aW9uSWQ6IEFjdGlvbkJhckxvY2F0aW9uSWQ7XG5cbiAgICBpdGVtcyQ6IE9ic2VydmFibGU8QWN0aW9uQmFySXRlbVtdPjtcbiAgICBwcml2YXRlIGxvY2F0aW9uSWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5hdkJ1aWxkZXJTZXJ2aWNlOiBOYXZCdWlsZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMkID0gY29tYmluZUxhdGVzdCh0aGlzLm5hdkJ1aWxkZXJTZXJ2aWNlLmFjdGlvbkJhckNvbmZpZyQsIHRoaXMubG9jYXRpb25JZCQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtpdGVtcywgbG9jYXRpb25JZF0pID0+IGl0ZW1zLmZpbHRlcihjb25maWcgPT4gY29uZmlnLmxvY2F0aW9uSWQgPT09IGxvY2F0aW9uSWQpKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICgnbG9jYXRpb25JZCcgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbklkJC5uZXh0KGNoYW5nZXNbJ2xvY2F0aW9uSWQnXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEFjdGlvbkJhckl0ZW0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGl0ZW0ub25DbGljayhldmVudCwge1xuICAgICAgICAgICAgICAgIHJvdXRlOiB0aGlzLnJvdXRlLFxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlOiB0aGlzLmRhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2U6IHRoaXMubm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Um91dGVyTGluayhpdGVtOiBBY3Rpb25CYXJJdGVtKTogYW55W10gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2QnVpbGRlclNlcnZpY2UuZ2V0Um91dGVyTGluayhpdGVtLCB0aGlzLnJvdXRlKTtcbiAgICB9XG5cbiAgICBnZXRCdXR0b25TdHlsZXMoaXRlbTogQWN0aW9uQmFySXRlbSk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gWydidG4nXTtcbiAgICAgICAgaWYgKGl0ZW0uYnV0dG9uU3R5bGUgJiYgaXRlbS5idXR0b25TdHlsZSA9PT0gJ2xpbmsnKSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaCgnYnRuLWxpbmsnKTtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVzLnB1c2godGhpcy5nZXRCdXR0b25Db2xvckNsYXNzKGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEJ1dHRvbkNvbG9yQ2xhc3MoaXRlbTogQWN0aW9uQmFySXRlbSk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoaXRlbS5idXR0b25Db2xvcikge1xuICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICBjYXNlICdwcmltYXJ5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5idXR0b25TdHlsZSA9PT0gJ291dGxpbmUnID8gJ2J0bi1vdXRsaW5lJyA6ICdidG4tcHJpbWFyeSc7XG4gICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5idXR0b25TdHlsZSA9PT0gJ291dGxpbmUnID8gJ2J0bi1zdWNjZXNzLW91dGxpbmUnIDogJ2J0bi1zdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmJ1dHRvblN0eWxlID09PSAnb3V0bGluZScgPyAnYnRuLXdhcm5pbmctb3V0bGluZScgOiAnYnRuLXdhcm5pbmcnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhc3NlcnROZXZlcihpdGVtLmJ1dHRvbkNvbG9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
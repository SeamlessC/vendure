import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CoreModule, DataService, SharedModule, SortOrder } from '@vendure/admin-ui/core';
export class LatestOrdersWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.latestOrders$ = this.dataService.order
            .getOrders({
            take: 10,
            filter: {
                active: { eq: false },
                state: { notEq: 'Cancelled' },
            },
            sort: {
                orderPlacedAt: SortOrder.DESC,
            },
        })
            .refetchOnChannelChange()
            .mapStream(data => data.orders.items);
    }
}
LatestOrdersWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-latest-orders-widget',
                template: "<vdr-data-table [items]=\"latestOrders$ | async\">\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            {{ order.code }}\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.total | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">{{ order.orderPlacedAt | timeAgo }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"['/orders/', order.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-data-table ::ng-deep table{margin-top:0}\n"]
            },] }
];
LatestOrdersWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
export class LatestOrdersWidgetModule {
}
LatestOrdersWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule, SharedModule],
                declarations: [LatestOrdersWidgetComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0ZXN0LW9yZGVycy13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9kYXNoYm9hcmQvc3JjL3dpZGdldHMvbGF0ZXN0LW9yZGVycy13aWRnZXQvbGF0ZXN0LW9yZGVycy13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFnQixZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTeEcsTUFBTSxPQUFPLDJCQUEyQjtJQUVwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2FBQ3RDLFNBQVMsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7YUFDaEM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsYUFBYSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2FBQ2hDO1NBQ0osQ0FBQzthQUNELHNCQUFzQixFQUFFO2FBQ3hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7O1lBeEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywwNUJBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJvQixXQUFXOztBQWtDaEMsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBSnBDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO2dCQUNuQyxZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE5nTW9kdWxlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVNb2R1bGUsIERhdGFTZXJ2aWNlLCBHZXRPcmRlckxpc3QsIFNoYXJlZE1vZHVsZSwgU29ydE9yZGVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWxhdGVzdC1vcmRlcnMtd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGF0ZXN0LW9yZGVycy13aWRnZXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xhdGVzdC1vcmRlcnMtd2lkZ2V0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIExhdGVzdE9yZGVyc1dpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbGF0ZXN0T3JkZXJzJDogT2JzZXJ2YWJsZTxHZXRPcmRlckxpc3QuSXRlbXNbXT47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXRlc3RPcmRlcnMkID0gdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgLmdldE9yZGVycyh7XG4gICAgICAgICAgICAgICAgdGFrZTogMTAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogeyBlcTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHsgbm90RXE6ICdDYW5jZWxsZWQnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyUGxhY2VkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlZmV0Y2hPbkNoYW5uZWxDaGFuZ2UoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEub3JkZXJzLml0ZW1zKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvcmVNb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTGF0ZXN0T3JkZXJzV2lkZ2V0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTGF0ZXN0T3JkZXJzV2lkZ2V0TW9kdWxlIHt9XG4iXX0=
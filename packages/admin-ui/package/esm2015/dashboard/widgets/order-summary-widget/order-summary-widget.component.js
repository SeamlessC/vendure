import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CoreModule, DataService } from '@vendure/admin-ui/core';
import dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
export class OrderSummaryWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.today = new Date();
        this.yesterday = new Date(new Date().setDate(this.today.getDate() - 1));
        this.selection$ = new BehaviorSubject({
            timeframe: 'day',
            date: this.today,
        });
    }
    ngOnInit() {
        this.dateRange$ = this.selection$.pipe(distinctUntilChanged(), map(selection => {
            return {
                start: dayjs(selection.date).startOf(selection.timeframe).toDate(),
                end: dayjs(selection.date).endOf(selection.timeframe).toDate(),
            };
        }), shareReplay(1));
        const orderSummary$ = this.dateRange$.pipe(switchMap(({ start, end }) => {
            return this.dataService.order
                .getOrderSummary(start, end)
                .refetchOnChannelChange()
                .mapStream(data => data.orders);
        }), shareReplay(1));
        this.totalOrderCount$ = orderSummary$.pipe(map(res => res.totalItems));
        this.totalOrderValue$ = orderSummary$.pipe(map(res => res.items.reduce((total, order) => total + order.total, 0) / 100));
        this.currencyCode$ = this.dataService.settings
            .getActiveChannel()
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel.currencyCode || undefined);
    }
}
OrderSummaryWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-summary-widget',
                template: "<div class=\"stats\">\n    <div class=\"stat\">\n        <div class=\"stat-figure\">{{ totalOrderCount$ | async }}</div>\n        <div class=\"stat-label\">{{ 'dashboard.total-orders' | translate }}</div>\n    </div>\n    <div class=\"stat\">\n        <div class=\"stat-figure\">\n            {{ totalOrderValue$ | async | currency: (currencyCode$ | async) || undefined }}\n        </div>\n        <div class=\"stat-label\">{{ 'dashboard.total-order-value' | translate }}</div>\n    </div>\n</div>\n<div class=\"footer\">\n    <div class=\"btn-group btn-outline-primary btn-sm\" *ngIf=\"selection$ | async as selection\">\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === today\" (click)=\"selection$.next({timeframe: 'day', date: today})\">\n            {{ 'dashboard.today' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === yesterday\" (click)=\"selection$.next({timeframe: 'day', date: yesterday})\">\n            {{ 'dashboard.yesterday' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'week'\" (click)=\"selection$.next({timeframe: 'week'})\">\n            {{ 'dashboard.thisWeek' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'month'\" (click)=\"selection$.next({timeframe: 'month'})\">\n            {{ 'dashboard.thisMonth' | translate }}\n        </button>\n    </div>\n\n    <div class=\"date-range p5\" *ngIf=\"dateRange$ | async as range\">\n        {{ range.start | localeDate }} - {{ range.end | localeDate }}\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".stats{display:flex;justify-content:space-evenly}.stat{text-align:center}.stat-figure{font-size:2rem;line-height:3rem}.stat-label{text-transform:uppercase}.date-range{margin-top:0}.footer{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}\n"]
            },] }
];
OrderSummaryWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
export class OrderSummaryWidgetModule {
}
OrderSummaryWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule],
                declarations: [OrderSummaryWidgetComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc3VtbWFyeS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9kYXNoYm9hcmQvc3JjL3dpZGdldHMvb3JkZXItc3VtbWFyeS13aWRnZXQvb3JkZXItc3VtbWFyeS13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVbkYsTUFBTSxPQUFPLDJCQUEyQjtJQVlwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVg1QyxVQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBSW5FLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBd0M7WUFDcEUsU0FBUyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUc0QyxDQUFDO0lBRWhELFFBQVE7UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQyxvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDWixPQUFPO2dCQUNILEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNsRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRTthQUNqRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNqQixDQUFDO1FBQ0YsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3RDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7aUJBQ3hCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2lCQUMzQixzQkFBc0IsRUFBRTtpQkFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxFQUNGLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUMvRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDekMsZ0JBQWdCLEVBQUU7YUFDbEIsc0JBQXNCLEVBQUU7YUFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7O1lBaERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyw4bkRBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVpvQixXQUFXOztBQThEaEMsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBSnBDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgTmdNb2R1bGUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSwgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIFRpbWVmcmFtZSA9ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItb3JkZXItc3VtbWFyeS13aWRnZXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1zdW1tYXJ5LXdpZGdldC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItc3VtbWFyeS13aWRnZXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgeWVzdGVyZGF5ID0gbmV3IERhdGUobmV3IERhdGUoKS5zZXREYXRlKHRoaXMudG9kYXkuZ2V0RGF0ZSgpIC0gMSkpO1xuICAgIHRvdGFsT3JkZXJDb3VudCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICB0b3RhbE9yZGVyVmFsdWUkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgY3VycmVuY3lDb2RlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHNlbGVjdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgdGltZWZyYW1lOiBUaW1lZnJhbWU7IGRhdGU/OiBEYXRlIH0+KHtcbiAgICAgICAgdGltZWZyYW1lOiAnZGF5JyxcbiAgICAgICAgZGF0ZTogdGhpcy50b2RheSxcbiAgICB9KTtcbiAgICBkYXRlUmFuZ2UkOiBPYnNlcnZhYmxlPHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZVJhbmdlJCA9IHRoaXMuc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgIG1hcChzZWxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBkYXlqcyhzZWxlY3Rpb24uZGF0ZSkuc3RhcnRPZihzZWxlY3Rpb24udGltZWZyYW1lKS50b0RhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBkYXlqcyhzZWxlY3Rpb24uZGF0ZSkuZW5kT2Yoc2VsZWN0aW9uLnRpbWVmcmFtZSkudG9EYXRlKCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9yZGVyU3VtbWFyeSQgPSB0aGlzLmRhdGVSYW5nZSQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoeyBzdGFydCwgZW5kIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAuZ2V0T3JkZXJTdW1tYXJ5KHN0YXJ0LCBlbmQpXG4gICAgICAgICAgICAgICAgICAgIC5yZWZldGNoT25DaGFubmVsQ2hhbmdlKClcbiAgICAgICAgICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEub3JkZXJzKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudG90YWxPcmRlckNvdW50JCA9IG9yZGVyU3VtbWFyeSQucGlwZShtYXAocmVzID0+IHJlcy50b3RhbEl0ZW1zKSk7XG4gICAgICAgIHRoaXMudG90YWxPcmRlclZhbHVlJCA9IG9yZGVyU3VtbWFyeSQucGlwZShcbiAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLml0ZW1zLnJlZHVjZSgodG90YWwsIG9yZGVyKSA9PiB0b3RhbCArIG9yZGVyLnRvdGFsLCAwKSAvIDEwMCksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY3VycmVuY3lDb2RlJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5nZXRBY3RpdmVDaGFubmVsKClcbiAgICAgICAgICAgIC5yZWZldGNoT25DaGFubmVsQ2hhbmdlKClcbiAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmFjdGl2ZUNoYW5uZWwuY3VycmVuY3lDb2RlIHx8IHVuZGVmaW5lZCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb3JlTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtPcmRlclN1bW1hcnlXaWRnZXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclN1bW1hcnlXaWRnZXRNb2R1bGUge31cbiJdfQ==
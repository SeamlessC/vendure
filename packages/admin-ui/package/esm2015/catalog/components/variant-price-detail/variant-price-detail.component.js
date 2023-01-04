import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
export class VariantPriceDetailComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.priceChange$ = new BehaviorSubject(0);
        this.taxCategoryIdChange$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const taxRates$ = this.dataService.settings
            .getTaxRatesSimple(999, 0, 'cache-first')
            .mapStream(data => data.taxRates.items);
        const activeChannel$ = this.dataService.settings
            .getActiveChannel('cache-first')
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel);
        this.taxRate$ = combineLatest(activeChannel$, taxRates$, this.taxCategoryIdChange$).pipe(map(([channel, taxRates, taxCategoryId]) => {
            const defaultTaxZone = channel.defaultTaxZone;
            if (!defaultTaxZone) {
                return 0;
            }
            const applicableRate = taxRates.find(taxRate => taxRate.zone.id === defaultTaxZone.id && taxRate.category.id === taxCategoryId);
            if (!applicableRate) {
                return 0;
            }
            return applicableRate.value;
        }));
        this.grossPrice$ = combineLatest(this.taxRate$, this.priceChange$).pipe(map(([taxRate, price]) => {
            return Math.round(price * ((100 + taxRate) / 100));
        }));
    }
    ngOnChanges(changes) {
        if ('price' in changes) {
            this.priceChange$.next(changes.price.currentValue);
        }
        if ('taxCategoryId' in changes) {
            this.taxCategoryIdChange$.next(changes.taxCategoryId.currentValue);
        }
    }
}
VariantPriceDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-variant-price-detail',
                template: "<label class=\"clr-control-label\">{{ 'catalog.taxes' | translate }}</label>\n<div *ngIf=\"priceIncludesTax\" class=\"value\">\n    {{ 'catalog.price-includes-tax-at' | translate: { rate: taxRate$ | async } }}\n</div>\n<div *ngIf=\"!priceIncludesTax\" class=\"value\">\n    {{\n        'catalog.price-with-tax-in-default-zone'\n            | translate: { price: grossPrice$ | async | localeCurrency: currencyCode, rate: taxRate$ | async }\n    }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column}.value{margin-top:3px}\n"]
            },] }
];
VariantPriceDetailComponent.ctorParameters = () => [
    { type: DataService }
];
VariantPriceDetailComponent.propDecorators = {
    priceIncludesTax: [{ type: Input }],
    price: [{ type: Input }],
    currencyCode: [{ type: Input }],
    taxCategoryId: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1wcmljZS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3ZhcmlhbnQtcHJpY2UtZGV0YWlsL3ZhcmlhbnQtcHJpY2UtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUF1QixNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckMsTUFBTSxPQUFPLDJCQUEyQjtJQVlwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUhwQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlDLHlCQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRWhCLENBQUM7SUFFaEQsUUFBUTtRQUNKLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTthQUN0QyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUN4QyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTthQUMzQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7YUFDL0Isc0JBQXNCLEVBQUU7YUFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUNwRixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7WUFDRCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUNoQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLGNBQWMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssYUFBYSxDQUM1RixDQUFDO1lBRUYsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDakIsT0FBTyxDQUFDLENBQUM7YUFDWjtZQUNELE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNuRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxlQUFlLElBQUksT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7OztZQTVESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsb2RBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVRRLFdBQVc7OzsrQkFXZixLQUFLO29CQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXZhcmlhbnQtcHJpY2UtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdmFyaWFudC1wcmljZS1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3ZhcmlhbnQtcHJpY2UtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRQcmljZURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBwcmljZUluY2x1ZGVzVGF4OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHByaWNlOiBudW1iZXI7XG4gICAgQElucHV0KCkgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGF4Q2F0ZWdvcnlJZDogc3RyaW5nO1xuXG4gICAgZ3Jvc3NQcmljZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICB0YXhSYXRlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gICAgcHJpdmF0ZSBwcmljZUNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gICAgcHJpdmF0ZSB0YXhDYXRlZ29yeUlkQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCB0YXhSYXRlcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0VGF4UmF0ZXNTaW1wbGUoOTk5LCAwLCAnY2FjaGUtZmlyc3QnKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEudGF4UmF0ZXMuaXRlbXMpO1xuICAgICAgICBjb25zdCBhY3RpdmVDaGFubmVsJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5nZXRBY3RpdmVDaGFubmVsKCdjYWNoZS1maXJzdCcpXG4gICAgICAgICAgICAucmVmZXRjaE9uQ2hhbm5lbENoYW5nZSgpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5hY3RpdmVDaGFubmVsKTtcblxuICAgICAgICB0aGlzLnRheFJhdGUkID0gY29tYmluZUxhdGVzdChhY3RpdmVDaGFubmVsJCwgdGF4UmF0ZXMkLCB0aGlzLnRheENhdGVnb3J5SWRDaGFuZ2UkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbY2hhbm5lbCwgdGF4UmF0ZXMsIHRheENhdGVnb3J5SWRdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFRheFpvbmUgPSBjaGFubmVsLmRlZmF1bHRUYXhab25lO1xuICAgICAgICAgICAgICAgIGlmICghZGVmYXVsdFRheFpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGFwcGxpY2FibGVSYXRlID0gdGF4UmF0ZXMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgdGF4UmF0ZSA9PiB0YXhSYXRlLnpvbmUuaWQgPT09IGRlZmF1bHRUYXhab25lLmlkICYmIHRheFJhdGUuY2F0ZWdvcnkuaWQgPT09IHRheENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICghYXBwbGljYWJsZVJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhcHBsaWNhYmxlUmF0ZS52YWx1ZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZ3Jvc3NQcmljZSQgPSBjb21iaW5lTGF0ZXN0KHRoaXMudGF4UmF0ZSQsIHRoaXMucHJpY2VDaGFuZ2UkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbdGF4UmF0ZSwgcHJpY2VdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocHJpY2UgKiAoKDEwMCArIHRheFJhdGUpIC8gMTAwKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICgncHJpY2UnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJpY2VDaGFuZ2UkLm5leHQoY2hhbmdlcy5wcmljZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndGF4Q2F0ZWdvcnlJZCcgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy50YXhDYXRlZ29yeUlkQ2hhbmdlJC5uZXh0KGNoYW5nZXMudGF4Q2F0ZWdvcnlJZC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
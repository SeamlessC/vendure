import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, getDefaultUiLanguage, } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@vendure/admin-ui/core";
import * as i2 from "@angular/router";
export class ProductResolver extends BaseEntityResolver {
    constructor(dataService, router) {
        super(router, {
            __typename: 'Product',
            id: '',
            createdAt: '',
            updatedAt: '',
            enabled: true,
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            featuredAsset: null,
            assets: [],
            description: '',
            translations: [],
            optionGroups: [],
            facetValues: [],
            variantList: { items: [], totalItems: 0 },
            channels: [],
        }, id => dataService.product
            .getProduct(id, { take: 10 })
            .refetchOnChannelChange()
            .mapStream(data => data.product));
    }
}
ProductResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductResolver_Factory() { return new ProductResolver(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i2.Router)); }, token: ProductResolver, providedIn: "root" });
ProductResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductResolver.ctorParameters = () => [
    { type: DataService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvcHJvZHVjdC1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxvQkFBb0IsR0FFdkIsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUtoQyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxrQkFBa0Q7SUFDbkYsWUFBWSxXQUF3QixFQUFFLE1BQWM7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxTQUFzQjtZQUNsQyxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLFlBQVksRUFBRSxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLElBQUk7WUFDbkIsTUFBTSxFQUFFLEVBQUU7WUFDVixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFO1lBQ3pDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUNELFdBQVcsQ0FBQyxPQUFPO2FBQ2QsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUM1QixzQkFBc0IsRUFBRTthQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQzNDLENBQUM7SUFDTixDQUFDOzs7O1lBL0JKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBUEcsV0FBVztZQUhOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlRW50aXR5UmVzb2x2ZXIsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UsXG4gICAgR2V0UHJvZHVjdFdpdGhWYXJpYW50cyxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxHZXRQcm9kdWN0V2l0aFZhcmlhbnRzLlByb2R1Y3Q+IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9fdHlwZW5hbWU6ICdQcm9kdWN0JyBhcyAnUHJvZHVjdCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBzbHVnOiAnJyxcbiAgICAgICAgICAgICAgICBmZWF0dXJlZEFzc2V0OiBudWxsLFxuICAgICAgICAgICAgICAgIGFzc2V0czogW10sXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uczogW10sXG4gICAgICAgICAgICAgICAgb3B0aW9uR3JvdXBzOiBbXSxcbiAgICAgICAgICAgICAgICBmYWNldFZhbHVlczogW10sXG4gICAgICAgICAgICAgICAgdmFyaWFudExpc3Q6IHsgaXRlbXM6IFtdLCB0b3RhbEl0ZW1zOiAwIH0sXG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+XG4gICAgICAgICAgICAgICAgZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdChpZCwgeyB0YWtlOiAxMCB9KVxuICAgICAgICAgICAgICAgICAgICAucmVmZXRjaE9uQ2hhbm5lbENoYW5nZSgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnByb2R1Y3QpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
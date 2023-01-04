import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class TaxRateResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'TaxRate',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            value: 0,
            enabled: true,
            category: {},
            zone: {},
            customerGroup: null,
        }, id => dataService.settings.getTaxRate(id).mapStream(data => data.taxRate));
    }
}
TaxRateResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function TaxRateResolver_Factory() { return new TaxRateResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: TaxRateResolver, providedIn: "root" });
TaxRateResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
TaxRateResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LXJhdGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9wcm92aWRlcnMvcm91dGluZy90YXgtcmF0ZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFXLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFbEY7O0dBRUc7QUFJSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxrQkFBb0M7SUFDckUsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxFQUFTO1lBQ25CLElBQUksRUFBRSxFQUFTO1lBQ2YsYUFBYSxFQUFFLElBQUk7U0FDdEIsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDNUUsQ0FBQztJQUNOLENBQUM7Ozs7WUFyQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFSUSxNQUFNO1lBQ2MsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIsIERhdGFTZXJ2aWNlLCBUYXhSYXRlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGlkIGZyb20gdGhlIHBhdGggaW50byBhIEN1c3RvbWVyIGVudGl0eS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVGF4UmF0ZVJlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPFRheFJhdGUuRnJhZ21lbnQ+IHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9fdHlwZW5hbWU6ICdUYXhSYXRlJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHt9IGFzIGFueSxcbiAgICAgICAgICAgICAgICB6b25lOiB7fSBhcyBhbnksXG4gICAgICAgICAgICAgICAgY3VzdG9tZXJHcm91cDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PiBkYXRhU2VydmljZS5zZXR0aW5ncy5nZXRUYXhSYXRlKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnRheFJhdGUpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class TaxCategoryResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'TaxCategory',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            isDefault: false,
        }, id => dataService.settings.getTaxCategory(id).mapStream(data => data.taxCategory));
    }
}
TaxCategoryResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function TaxCategoryResolver_Factory() { return new TaxCategoryResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: TaxCategoryResolver, providedIn: "root" });
TaxCategoryResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
TaxCategoryResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LWNhdGVnb3J5LXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvdGF4LWNhdGVnb3J5LXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQWUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUV0Rjs7R0FFRztBQUlILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxrQkFBd0M7SUFDN0UsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLEtBQUs7U0FDbkIsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDcEYsQ0FBQztJQUNOLENBQUM7Ozs7WUFqQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFSUSxNQUFNO1lBQ2MsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIsIERhdGFTZXJ2aWNlLCBUYXhDYXRlZ29yeSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBpZCBmcm9tIHRoZSBwYXRoIGludG8gYSBDdXN0b21lciBlbnRpdHkuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRheENhdGVnb3J5UmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8VGF4Q2F0ZWdvcnkuRnJhZ21lbnQ+IHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9fdHlwZW5hbWU6ICdUYXhDYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBpc0RlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldFRheENhdGVnb3J5KGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnRheENhdGVnb3J5KSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
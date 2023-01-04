import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class PaymentMethodResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'PaymentMethod',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            code: '',
            description: '',
            enabled: true,
            checker: undefined,
            handler: undefined,
        }, id => dataService.settings.getPaymentMethod(id).mapStream(data => data.paymentMethod));
    }
}
PaymentMethodResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaymentMethodResolver_Factory() { return new PaymentMethodResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: PaymentMethodResolver, providedIn: "root" });
PaymentMethodResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PaymentMethodResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9wcm92aWRlcnMvcm91dGluZy9wYXltZW50LW1ldGhvZC1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFckQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsa0JBQTBDO0lBQ2pGLFlBQVksTUFBYyxFQUFFLFdBQXdCO1FBQ2hELEtBQUssQ0FDRCxNQUFNLEVBQ047WUFDSSxVQUFVLEVBQUUsZUFBZTtZQUMzQixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxTQUFnQjtZQUN6QixPQUFPLEVBQUUsU0FBZ0I7U0FDNUIsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUN4RixDQUFDO0lBQ04sQ0FBQzs7OztZQXJCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQVZRLE1BQU07WUFHTixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhc2VFbnRpdHlSZXNvbHZlciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgaWQgZnJvbSB0aGUgcGF0aCBpbnRvIGEgQ3VzdG9tZXIgZW50aXR5LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYXltZW50TWV0aG9kUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8UGF5bWVudE1ldGhvZC5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ1BheW1lbnRNZXRob2QnLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hlY2tlcjogdW5kZWZpbmVkIGFzIGFueSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiB1bmRlZmluZWQgYXMgYW55LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldFBheW1lbnRNZXRob2QoaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEucGF5bWVudE1ldGhvZCksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class CustomerResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Customer',
            id: '',
            createdAt: '',
            updatedAt: '',
            title: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: null,
            addresses: null,
            user: null,
        }, id => dataService.customer.getCustomer(id).mapStream(data => data.customer));
    }
}
CustomerResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomerResolver_Factory() { return new CustomerResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CustomerResolver, providedIn: "root" });
CustomerResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CustomerResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9wcm92aWRlcnMvcm91dGluZy9jdXN0b21lci1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGtCQUFxQztJQUN2RSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFVBQVU7WUFDdEIsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQzlFLENBQUM7SUFDTixDQUFDOzs7O1lBdEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBUFEsTUFBTTtZQUdOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxDdXN0b21lci5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0N1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6ICcnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLmN1c3RvbWVyLmdldEN1c3RvbWVyKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmN1c3RvbWVyKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
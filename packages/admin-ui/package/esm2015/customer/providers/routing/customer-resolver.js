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
            phoneNumber: '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9wcm92aWRlcnMvcm91dGluZy9jdXN0b21lci1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGtCQUFxQztJQUN2RSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFVBQVU7WUFDdEIsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJO1NBQ2IsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDOUUsQ0FBQztJQUNOLENBQUM7Ozs7WUF0QkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFQUSxNQUFNO1lBR04sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclJlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPEN1c3RvbWVyLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogJycsXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzczogJycsXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLmN1c3RvbWVyLmdldEN1c3RvbWVyKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmN1c3RvbWVyKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
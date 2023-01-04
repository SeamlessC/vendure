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
export class CountryResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Country',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            name: '',
            enabled: false,
            translations: [],
        }, id => dataService.settings.getCountry(id).mapStream(data => data.country));
    }
}
CountryResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CountryResolver_Factory() { return new CountryResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CountryResolver, providedIn: "root" });
CountryResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CountryResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL2NvdW50cnktcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRXJEOztHQUVHO0FBSUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsa0JBQW9DO0lBQ3JFLFlBQVksTUFBYyxFQUFFLFdBQXdCO1FBQ2hELEtBQUssQ0FDRCxNQUFNLEVBQ047WUFDSSxVQUFVLEVBQUUsU0FBUztZQUNyQixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEtBQUs7WUFDZCxZQUFZLEVBQUUsRUFBRTtTQUNuQixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUM1RSxDQUFDO0lBQ04sQ0FBQzs7OztZQW5CSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQVZRLE1BQU07WUFHTixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhc2VFbnRpdHlSZXNvbHZlciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgaWQgZnJvbSB0aGUgcGF0aCBpbnRvIGEgQ3VzdG9tZXIgZW50aXR5LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb3VudHJ5UmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8Q291bnRyeS5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0NvdW50cnknLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PiBkYXRhU2VydmljZS5zZXR0aW5ncy5nZXRDb3VudHJ5KGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmNvdW50cnkpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
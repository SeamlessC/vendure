import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class RoleResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Role',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            description: '',
            permissions: [],
            channels: [],
        }, id => dataService.administrator.getRole(id).mapStream(data => data.role));
    }
}
RoleResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function RoleResolver_Factory() { return new RoleResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: RoleResolver, providedIn: "root" });
RoleResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
RoleResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL3JvbGUtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBS3JELE1BQU0sT0FBTyxZQUFhLFNBQVEsa0JBQWlDO0lBQy9ELFlBQVksTUFBYyxFQUFFLFdBQXdCO1FBQ2hELEtBQUssQ0FDRCxNQUFNLEVBQ047WUFDSSxVQUFVLEVBQUUsTUFBZ0I7WUFDNUIsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLEVBQUU7U0FDZixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUMzRSxDQUFDO0lBQ04sQ0FBQzs7OztZQW5CSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQVBRLE1BQU07WUFHTixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhc2VFbnRpdHlSZXNvbHZlciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgUm9sZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUm9sZVJlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPFJvbGUuRnJhZ21lbnQ+IHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9fdHlwZW5hbWU6ICdSb2xlJyBhcyAnUm9sZScsXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtdLFxuICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PiBkYXRhU2VydmljZS5hZG1pbmlzdHJhdG9yLmdldFJvbGUoaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEucm9sZSksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
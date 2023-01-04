import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class AdministratorResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Administrator',
            id: '',
            createdAt: '',
            updatedAt: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            user: { roles: [] },
        }, id => dataService.administrator.getAdministrator(id).mapStream(data => data.administrator));
    }
}
AdministratorResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function AdministratorResolver_Factory() { return new AdministratorResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: AdministratorResolver, providedIn: "root" });
AdministratorResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AdministratorResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRvci1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL2FkbWluaXN0cmF0b3ItcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBS3JELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxrQkFBMEM7SUFDakYsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxlQUFrQztZQUM5QyxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixZQUFZLEVBQUUsRUFBRTtZQUNoQixTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBUztTQUM3QixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQzdGLENBQUM7SUFDTixDQUFDOzs7O1lBbkJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBUFEsTUFBTTtZQUdOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBBZG1pbmlzdHJhdG9yLCBSb2xlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbmlzdHJhdG9yUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8QWRtaW5pc3RyYXRvci5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0FkbWluaXN0cmF0b3InIGFzICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzczogJycsXG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogJycsXG4gICAgICAgICAgICAgICAgdXNlcjogeyByb2xlczogW10gfSBhcyBhbnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQgPT4gZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci5nZXRBZG1pbmlzdHJhdG9yKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmFkbWluaXN0cmF0b3IpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
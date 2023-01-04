import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { getDefaultUiLanguage } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class FacetResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Facet',
            id: '',
            createdAt: '',
            updatedAt: '',
            isPrivate: false,
            languageCode: getDefaultUiLanguage(),
            name: '',
            code: '',
            translations: [],
            values: [],
        }, (id) => dataService.facet.getFacet(id).mapStream((data) => data.facet));
    }
}
FacetResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function FacetResolver_Factory() { return new FacetResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: FacetResolver, providedIn: "root" });
FacetResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
FacetResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL2ZhY2V0LXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUtyRCxNQUFNLE9BQU8sYUFBYyxTQUFRLGtCQUE0QztJQUMzRSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLE9BQWtCO1lBQzlCLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsTUFBTSxFQUFFLEVBQUU7U0FDYixFQUNELENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDekUsQ0FBQztJQUNOLENBQUM7Ozs7WUFyQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFSUSxNQUFNO1lBSU4sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEZhY2V0V2l0aFZhbHVlcyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0UmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8RmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnRmFjZXQnIGFzICdGYWNldCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBpc1ByaXZhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbnM6IFtdLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGlkKSA9PiBkYXRhU2VydmljZS5mYWNldC5nZXRGYWNldChpZCkubWFwU3RyZWFtKChkYXRhKSA9PiBkYXRhLmZhY2V0KSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { CurrencyCode } from '@vendure/admin-ui/core';
import { getDefaultUiLanguage } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class ChannelResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Channel',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            token: '',
            pricesIncludeTax: false,
            currencyCode: CurrencyCode.USD,
            defaultLanguageCode: getDefaultUiLanguage(),
            defaultShippingZone: {},
            defaultTaxZone: {},
        }, (id) => dataService.settings.getChannel(id).mapStream((data) => data.channel));
    }
}
ChannelResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ChannelResolver_Factory() { return new ChannelResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ChannelResolver, providedIn: "root" });
ChannelResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ChannelResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL2NoYW5uZWwtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUVyRDs7R0FFRztBQUlILE1BQU0sT0FBTyxlQUFnQixTQUFRLGtCQUFvQztJQUNyRSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFNBQVM7WUFDckIsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixLQUFLLEVBQUUsRUFBRTtZQUNULGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsWUFBWSxFQUFFLFlBQVksQ0FBQyxHQUFHO1lBQzlCLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFO1lBQzNDLG1CQUFtQixFQUFFLEVBQVM7WUFDOUIsY0FBYyxFQUFFLEVBQVM7U0FDNUIsRUFDRCxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQ2hGLENBQUM7SUFDTixDQUFDOzs7O1lBdEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBWFEsTUFBTTtZQUlOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBDaGFubmVsLCBDdXJyZW5jeUNvZGUgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGdldERlZmF1bHRVaUxhbmd1YWdlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBpZCBmcm9tIHRoZSBwYXRoIGludG8gYSBDdXN0b21lciBlbnRpdHkuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWxSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxDaGFubmVsLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnQ2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgICAgICAgICB0b2tlbjogJycsXG4gICAgICAgICAgICAgICAgcHJpY2VzSW5jbHVkZVRheDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBDdXJyZW5jeUNvZGUuVVNELFxuICAgICAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGU6IGdldERlZmF1bHRVaUxhbmd1YWdlKCksXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZToge30gYXMgYW55LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUYXhab25lOiB7fSBhcyBhbnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGlkKSA9PiBkYXRhU2VydmljZS5zZXR0aW5ncy5nZXRDaGFubmVsKGlkKS5tYXBTdHJlYW0oKGRhdGEpID0+IGRhdGEuY2hhbm5lbCksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
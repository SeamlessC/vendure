import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AssetType, BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class AssetResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Asset',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            type: AssetType.IMAGE,
            fileSize: 0,
            mimeType: '',
            width: 0,
            height: 0,
            source: '',
            preview: '',
            focalPoint: null,
        }, id => dataService.product.getAsset(id).mapStream(data => data.asset));
    }
}
AssetResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function AssetResolver_Factory() { return new AssetResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: AssetResolver, providedIn: "root" });
AssetResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AssetResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL2Fzc2V0LXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBUyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGFBQWMsU0FBUSxrQkFBa0M7SUFDakUsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxPQUFnQjtZQUM1QixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSztZQUNyQixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsSUFBSTtTQUNuQixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUN2RSxDQUFDO0lBQ04sQ0FBQzs7OztZQXhCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQU5RLE1BQU07WUFFTixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldFR5cGUsIEJhc2VFbnRpdHlSZXNvbHZlciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxBc3NldC5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0Fzc2V0JyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEFzc2V0VHlwZS5JTUFHRSxcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZTogMCxcbiAgICAgICAgICAgICAgICBtaW1lVHlwZTogJycsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogJycsXG4gICAgICAgICAgICAgICAgcHJldmlldzogJycsXG4gICAgICAgICAgICAgICAgZm9jYWxQb2ludDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PiBkYXRhU2VydmljZS5wcm9kdWN0LmdldEFzc2V0KGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmFzc2V0KSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
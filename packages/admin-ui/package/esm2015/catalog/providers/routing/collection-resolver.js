import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, getDefaultUiLanguage } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class CollectionResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Collection',
            id: '',
            createdAt: '',
            updatedAt: '',
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            isPrivate: false,
            breadcrumbs: [],
            description: '',
            featuredAsset: null,
            assets: [],
            translations: [],
            filters: [],
            parent: {},
            children: null,
        }, id => dataService.collection.getCollection(id).mapStream(data => data.collection));
    }
}
CollectionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CollectionResolver_Factory() { return new CollectionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CollectionResolver, providedIn: "root" });
CollectionResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CollectionResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvY29sbGVjdGlvbi1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQWMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLM0csTUFBTSxPQUFPLGtCQUFtQixTQUFRLGtCQUF1QztJQUMzRSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFlBQTRCO1lBQ3hDLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE1BQU0sRUFBRSxFQUFFO1lBQ1YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBUztZQUNqQixRQUFRLEVBQUUsSUFBSTtTQUNqQixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUNwRixDQUFDO0lBQ04sQ0FBQzs7OztZQTNCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQUxRLE1BQU07WUFDMEIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIsIENvbGxlY3Rpb24sIERhdGFTZXJ2aWNlLCBnZXREZWZhdWx0VWlMYW5ndWFnZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8Q29sbGVjdGlvbi5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0NvbGxlY3Rpb24nIGFzICdDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBzbHVnOiAnJyxcbiAgICAgICAgICAgICAgICBpc1ByaXZhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJyZWFkY3J1bWJzOiBbXSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRBc3NldDogbnVsbCxcbiAgICAgICAgICAgICAgICBhc3NldHM6IFtdLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uczogW10sXG4gICAgICAgICAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgICAgICAgICAgcGFyZW50OiB7fSBhcyBhbnksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQgPT4gZGF0YVNlcnZpY2UuY29sbGVjdGlvbi5nZXRDb2xsZWN0aW9uKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmNvbGxlY3Rpb24pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
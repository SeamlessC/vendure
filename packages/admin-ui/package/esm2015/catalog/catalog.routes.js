import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CanDeactivateDetailGuard, createResolveData, detailBreadcrumb, } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { FacetDetailComponent } from './components/facet-detail/facet-detail.component';
import { FacetListComponent } from './components/facet-list/facet-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductOptionsEditorComponent } from './components/product-options-editor/product-options-editor.component';
import { ProductVariantsEditorComponent } from './components/product-variants-editor/product-variants-editor.component';
import { AssetResolver } from './providers/routing/asset-resolver';
import { CollectionResolver } from './providers/routing/collection-resolver';
import { FacetResolver } from './providers/routing/facet-resolver';
import { ProductResolver } from './providers/routing/product-resolver';
import { ProductVariantsResolver } from './providers/routing/product-variants-resolver';
const ɵ0 = {
    breadcrumb: _('breadcrumb.products'),
}, ɵ1 = {
    breadcrumb: productBreadcrumb,
}, ɵ2 = {
    breadcrumb: productVariantEditorBreadcrumb,
}, ɵ3 = {
    breadcrumb: productOptionsEditorBreadcrumb,
}, ɵ4 = {
    breadcrumb: _('breadcrumb.facets'),
}, ɵ5 = {
    breadcrumb: facetBreadcrumb,
}, ɵ6 = {
    breadcrumb: _('breadcrumb.collections'),
}, ɵ7 = {
    breadcrumb: collectionBreadcrumb,
}, ɵ8 = {
    breadcrumb: _('breadcrumb.assets'),
}, ɵ9 = {
    breadcrumb: assetBreadcrumb,
};
export const catalogRoutes = [
    {
        path: 'products',
        component: ProductListComponent,
        data: ɵ0,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: createResolveData(ProductResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: 'products/:id/manage-variants',
        component: ProductVariantsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: 'products/:id/options',
        component: ProductOptionsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ3,
    },
    {
        path: 'facets',
        component: FacetListComponent,
        data: ɵ4,
    },
    {
        path: 'facets/:id',
        component: FacetDetailComponent,
        resolve: createResolveData(FacetResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ5,
    },
    {
        path: 'collections',
        component: CollectionListComponent,
        data: ɵ6,
    },
    {
        path: 'collections/:id',
        component: CollectionDetailComponent,
        resolve: createResolveData(CollectionResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ7,
    },
    {
        path: 'assets',
        component: AssetListComponent,
        data: ɵ8,
    },
    {
        path: 'assets/:id',
        component: AssetDetailComponent,
        resolve: createResolveData(AssetResolver),
        data: ɵ9,
    },
];
export function productBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.products',
        getName: product => product.name,
        route: 'products',
    });
}
export function productVariantEditorBreadcrumb(data, params) {
    return data.entity.pipe(map((entity) => {
        return [
            {
                label: _('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: _('breadcrumb.manage-variants'),
                link: ['manage-variants'],
            },
        ];
    }));
}
export function productOptionsEditorBreadcrumb(data, params) {
    return data.entity.pipe(map((entity) => {
        return [
            {
                label: _('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: _('breadcrumb.product-options'),
                link: ['options'],
            },
        ];
    }));
}
export function facetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.facets',
        getName: facet => facet.name,
        route: 'facets',
    });
}
export function collectionBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.collections',
        getName: collection => collection.name,
        route: 'collections',
    });
}
export function assetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.assets',
        getName: asset => asset.name,
        route: 'assets',
    });
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NhdGFsb2cucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILHdCQUF3QixFQUV4QixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBR25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxF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bSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQXNzZXQsXG4gICAgQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkLFxuICAgIENvbGxlY3Rpb24sXG4gICAgY3JlYXRlUmVzb2x2ZURhdGEsXG4gICAgZGV0YWlsQnJlYWRjcnVtYixcbiAgICBGYWNldFdpdGhWYWx1ZXMsXG4gICAgR2V0UHJvZHVjdFdpdGhWYXJpYW50cyxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFzc2V0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Fzc2V0LWRldGFpbC9hc3NldC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hc3NldC1saXN0L2Fzc2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1kZXRhaWwvY29sbGVjdGlvbi1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGlzdC9jb2xsZWN0aW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZhY2V0LWRldGFpbC9mYWNldC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mYWNldC1saXN0L2ZhY2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC1kZXRhaWwvcHJvZHVjdC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RPcHRpb25zRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3Qtb3B0aW9ucy1lZGl0b3IvcHJvZHVjdC1vcHRpb25zLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRzRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc3NldFJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9hc3NldC1yZXNvbHZlcic7XG5pbXBvcnQgeyBDb2xsZWN0aW9uUmVzb2x2ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3V0aW5nL2NvbGxlY3Rpb24tcmVzb2x2ZXInO1xuaW1wb3J0IHsgRmFjZXRSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvZmFjZXQtcmVzb2x2ZXInO1xuaW1wb3J0IHsgUHJvZHVjdFJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9wcm9kdWN0LXJlc29sdmVyJztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50c1Jlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9wcm9kdWN0LXZhcmlhbnRzLXJlc29sdmVyJztcblxuZXhwb3J0IGNvbnN0IGNhdGFsb2dSb3V0ZXM6IFJvdXRlW10gPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAncHJvZHVjdHMnLFxuICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLnByb2R1Y3RzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdwcm9kdWN0cy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3REZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFByb2R1Y3RSZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBwcm9kdWN0QnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3Byb2R1Y3RzLzppZC9tYW5hZ2UtdmFyaWFudHMnLFxuICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RWYXJpYW50c0VkaXRvckNvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogY3JlYXRlUmVzb2x2ZURhdGEoUHJvZHVjdFZhcmlhbnRzUmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogcHJvZHVjdFZhcmlhbnRFZGl0b3JCcmVhZGNydW1iLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAncHJvZHVjdHMvOmlkL29wdGlvbnMnLFxuICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RPcHRpb25zRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShQcm9kdWN0VmFyaWFudHNSZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBwcm9kdWN0T3B0aW9uc0VkaXRvckJyZWFkY3J1bWIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdmYWNldHMnLFxuICAgICAgICBjb21wb25lbnQ6IEZhY2V0TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5mYWNldHMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2ZhY2V0cy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IEZhY2V0RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShGYWNldFJlc29sdmVyKSxcbiAgICAgICAgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IGZhY2V0QnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2NvbGxlY3Rpb25zJyxcbiAgICAgICAgY29tcG9uZW50OiBDb2xsZWN0aW9uTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5jb2xsZWN0aW9ucycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnY29sbGVjdGlvbnMvOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBDb2xsZWN0aW9uRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShDb2xsZWN0aW9uUmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogY29sbGVjdGlvbkJyZWFkY3J1bWIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdhc3NldHMnLFxuICAgICAgICBjb21wb25lbnQ6IEFzc2V0TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5hc3NldHMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2Fzc2V0cy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IEFzc2V0RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShBc3NldFJlc29sdmVyKSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogYXNzZXRCcmVhZGNydW1iLFxuICAgICAgICB9LFxuICAgIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvZHVjdEJyZWFkY3J1bWIoZGF0YTogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHJldHVybiBkZXRhaWxCcmVhZGNydW1iPEdldFByb2R1Y3RXaXRoVmFyaWFudHMuUHJvZHVjdD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5wcm9kdWN0cycsXG4gICAgICAgIGdldE5hbWU6IHByb2R1Y3QgPT4gcHJvZHVjdC5uYW1lLFxuICAgICAgICByb3V0ZTogJ3Byb2R1Y3RzJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RWYXJpYW50RWRpdG9yQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRhdGEuZW50aXR5LnBpcGUoXG4gICAgICAgIG1hcCgoZW50aXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5wcm9kdWN0cycpLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBbJy4uLycsICdwcm9kdWN0cyddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZW50aXR5Lm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWycuLi8nLCAncHJvZHVjdHMnLCBwYXJhbXMuaWQsIHsgdGFiOiAndmFyaWFudHMnIH1dLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5tYW5hZ2UtdmFyaWFudHMnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWydtYW5hZ2UtdmFyaWFudHMnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSksXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RPcHRpb25zRWRpdG9yQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRhdGEuZW50aXR5LnBpcGUoXG4gICAgICAgIG1hcCgoZW50aXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5wcm9kdWN0cycpLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBbJy4uLycsICdwcm9kdWN0cyddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZW50aXR5Lm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWycuLi8nLCAncHJvZHVjdHMnLCBwYXJhbXMuaWQsIHsgdGFiOiAndmFyaWFudHMnIH1dLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5wcm9kdWN0LW9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWydvcHRpb25zJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pLFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmYWNldEJyZWFkY3J1bWIoZGF0YTogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHJldHVybiBkZXRhaWxCcmVhZGNydW1iPEZhY2V0V2l0aFZhbHVlcy5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5mYWNldHMnLFxuICAgICAgICBnZXROYW1lOiBmYWNldCA9PiBmYWNldC5uYW1lLFxuICAgICAgICByb3V0ZTogJ2ZhY2V0cycsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0aW9uQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8Q29sbGVjdGlvbi5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5jb2xsZWN0aW9ucycsXG4gICAgICAgIGdldE5hbWU6IGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5uYW1lLFxuICAgICAgICByb3V0ZTogJ2NvbGxlY3Rpb25zJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2V0QnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8QXNzZXQuRnJhZ21lbnQ+KHtcbiAgICAgICAgZW50aXR5OiBkYXRhLmVudGl0eSxcbiAgICAgICAgaWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgYnJlYWRjcnVtYktleTogJ2JyZWFkY3J1bWIuYXNzZXRzJyxcbiAgICAgICAgZ2V0TmFtZTogYXNzZXQgPT4gYXNzZXQubmFtZSxcbiAgICAgICAgcm91dGU6ICdhc3NldHMnLFxuICAgIH0pO1xufVxuIl19
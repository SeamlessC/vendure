import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class ProductVariantsResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Product',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            optionGroups: [],
            variants: [],
        }, id => dataService.product.getProductVariantsOptions(id).mapStream(data => data.product));
    }
}
ProductVariantsResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductVariantsResolver_Factory() { return new ProductVariantsResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ProductVariantsResolver, providedIn: "root" });
ProductVariantsResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductVariantsResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvcHJvZHVjdC12YXJpYW50cy1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGtCQUFvRDtJQUM3RixZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFNBQXNCO1lBQ2xDLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7U0FDZixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQzFGLENBQUM7SUFDTixDQUFDOzs7O1lBbEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBUFEsTUFBTTtZQUdOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBHZXRQcm9kdWN0VmFyaWFudE9wdGlvbnMgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RWYXJpYW50c1Jlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucy5Qcm9kdWN0PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnUHJvZHVjdCcgYXMgJ1Byb2R1Y3QnLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgb3B0aW9uR3JvdXBzOiBbXSxcbiAgICAgICAgICAgICAgICB2YXJpYW50czogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQgPT4gZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRQcm9kdWN0VmFyaWFudHNPcHRpb25zKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnByb2R1Y3QpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
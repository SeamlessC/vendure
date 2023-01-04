import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class PromotionResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Promotion',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            enabled: false,
            conditions: [],
            actions: [],
        }, id => dataService.promotion.getPromotion(id).mapStream(data => data.promotion));
    }
}
PromotionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function PromotionResolver_Factory() { return new PromotionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: PromotionResolver, providedIn: "root" });
PromotionResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PromotionResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9uLXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9tYXJrZXRpbmcvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL3Byb21vdGlvbi1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFhLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFcEY7O0dBRUc7QUFJSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsa0JBQXNDO0lBQ3pFLFlBQVksTUFBYyxFQUFFLFdBQXdCO1FBQ2hELEtBQUssQ0FDRCxNQUFNLEVBQ047WUFDSSxVQUFVLEVBQUUsV0FBVztZQUN2QixFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxLQUFLO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ2pGLENBQUM7SUFDTixDQUFDOzs7O1lBbkJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBUlEsTUFBTTtZQUNjLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyLCBEYXRhU2VydmljZSwgUHJvbW90aW9uIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGlkIGZyb20gdGhlIHBhdGggaW50byBhIEN1c3RvbWVyIGVudGl0eS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvbW90aW9uUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8UHJvbW90aW9uLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbnM6IFtdLFxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLnByb21vdGlvbi5nZXRQcm9tb3Rpb24oaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEucHJvbW90aW9uKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
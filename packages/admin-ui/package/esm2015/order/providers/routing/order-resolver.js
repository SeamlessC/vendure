import { Injectable } from '@angular/core';
import { ActivationStart, Router, } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { EMPTY } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';
import { DraftOrderDetailComponent } from '../../components/draft-order-detail/draft-order-detail.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class OrderResolver {
    constructor(router, dataService) {
        this.router = router;
        this.dataService = dataService;
    }
    /** @internal */
    resolve(route, state) {
        const id = route.paramMap.get('id');
        // Complete the entity stream upon navigating away
        const navigateAway$ = this.router.events.pipe(filter(event => event instanceof ActivationStart));
        const stream = this.dataService.order
            .getOrder(id)
            .mapStream(data => data.order)
            .pipe(switchMap(order => {
            if ((order === null || order === void 0 ? void 0 : order.state) === 'Draft' && route.component !== DraftOrderDetailComponent) {
                // Make sure Draft orders only get displayed with the DraftOrderDetailComponent
                this.router.navigate(['/orders/draft', id]);
                return EMPTY;
            }
            else {
                return [order];
            }
        }), takeUntil(navigateAway$), filter(notNullOrUndefined), shareReplay(1));
        return stream.pipe(take(1), map(() => stream));
    }
}
OrderResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderResolver_Factory() { return new OrderResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: OrderResolver, providedIn: "root" });
OrderResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9wcm92aWRlcnMvcm91dGluZy9vcmRlci1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFSCxlQUFlLEVBRWYsTUFBTSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFdBQVcsRUFBdUIsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDOzs7O0FBRTdHOztHQUVHO0FBSUgsTUFBTSxPQUFPLGFBQWE7SUFDdEIsWUFBb0IsTUFBYyxFQUFVLFdBQXdCO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFeEUsZ0JBQWdCO0lBQ2hCLE9BQU8sQ0FDSCxLQUE2QixFQUM3QixLQUEwQjtRQUUxQixNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxrREFBa0Q7UUFDbEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBRWpHLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSzthQUNoQyxRQUFRLENBQUMsRUFBRyxDQUFDO2FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUM3QixJQUFJLENBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLE1BQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUsseUJBQXlCLEVBQUU7Z0JBQzNFLCtFQUErRTtnQkFDL0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUN4QixNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFDMUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNqQixDQUFDO1FBRU4sT0FBTyxNQUFNLENBQUMsSUFBSSxDQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQ3BCLENBQUM7SUFDTixDQUFDOzs7O1lBdENKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBZEcsTUFBTTtZQUdELFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgQWN0aXZhdGlvblN0YXJ0LFxuICAgIFJlc29sdmUsXG4gICAgUm91dGVyLFxuICAgIFJvdXRlclN0YXRlU25hcHNob3QsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEYXRhU2VydmljZSwgT3JkZXJEZXRhaWxGcmFnbWVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFmdE9yZGVyRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kcmFmdC1vcmRlci1kZXRhaWwvZHJhZnQtb3JkZXItZGV0YWlsLmNvbXBvbmVudCc7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGlkIGZyb20gdGhlIHBhdGggaW50byBhIEN1c3RvbWVyIGVudGl0eS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8T2JzZXJ2YWJsZTxPcmRlckRldGFpbEZyYWdtZW50Pj4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHJlc29sdmUoXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgICAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgICApOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8T3JkZXJEZXRhaWxGcmFnbWVudD4+IHtcbiAgICAgICAgY29uc3QgaWQgPSByb3V0ZS5wYXJhbU1hcC5nZXQoJ2lkJyk7XG5cbiAgICAgICAgLy8gQ29tcGxldGUgdGhlIGVudGl0eSBzdHJlYW0gdXBvbiBuYXZpZ2F0aW5nIGF3YXlcbiAgICAgICAgY29uc3QgbmF2aWdhdGVBd2F5JCA9IHRoaXMucm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEFjdGl2YXRpb25TdGFydCkpO1xuXG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgIC5nZXRPcmRlcihpZCEpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5vcmRlcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChvcmRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcj8uc3RhdGUgPT09ICdEcmFmdCcgJiYgcm91dGUuY29tcG9uZW50ICE9PSBEcmFmdE9yZGVyRGV0YWlsQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgRHJhZnQgb3JkZXJzIG9ubHkgZ2V0IGRpc3BsYXllZCB3aXRoIHRoZSBEcmFmdE9yZGVyRGV0YWlsQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMvZHJhZnQnLCBpZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtvcmRlcl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwobmF2aWdhdGVBd2F5JCksXG4gICAgICAgICAgICAgICAgZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBzdHJlYW0ucGlwZShcbiAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICBtYXAoKCkgPT4gc3RyZWFtKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
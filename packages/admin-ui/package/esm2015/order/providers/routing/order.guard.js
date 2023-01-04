import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@vendure/admin-ui/core";
import * as i2 from "@angular/router";
export class OrderGuard {
    constructor(dataService, router) {
        this.dataService = dataService;
        this.router = router;
    }
    canActivate(route, state) {
        const isDraft = state.url.includes('orders/draft');
        const id = route.paramMap.get('id');
        if (isDraft) {
            if (id === 'create') {
                return this.dataService.order
                    .createDraftOrder()
                    .pipe(map(({ createDraftOrder }) => this.router.parseUrl(`/orders/draft/${createDraftOrder.id}`)));
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
}
OrderGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderGuard_Factory() { return new OrderGuard(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i2.Router)); }, token: OrderGuard, providedIn: "root" });
OrderGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderGuard.ctorParameters = () => [
    { type: DataService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9wcm92aWRlcnMvcm91dGluZy9vcmRlci5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBdUMsTUFBTSxFQUFnQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsR0FBRyxFQUFtQixNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3RELE1BQU0sT0FBTyxVQUFVO0lBQ25CLFlBQW9CLFdBQXdCLEVBQVUsTUFBYztRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRXhFLFdBQVcsQ0FDUCxLQUE2QixFQUM3QixLQUEwQjtRQUUxQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7cUJBQ3hCLGdCQUFnQixFQUFFO3FCQUNsQixJQUFJLENBQ0QsR0FBRyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQy9ELENBQ0osQ0FBQzthQUNUO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7WUEzQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFOUSxXQUFXO1lBRDBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBDYW5BY3RpdmF0ZSwgUm91dGVyLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcFRvLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgICBjYW5BY3RpdmF0ZShcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICAgICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHwgUHJvbWlzZTxib29sZWFuIHwgVXJsVHJlZT4gfCBib29sZWFuIHwgVXJsVHJlZSB7XG4gICAgICAgIGNvbnN0IGlzRHJhZnQgPSBzdGF0ZS51cmwuaW5jbHVkZXMoJ29yZGVycy9kcmFmdCcpO1xuICAgICAgICBjb25zdCBpZCA9IHJvdXRlLnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKGlzRHJhZnQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRHJhZnRPcmRlcigpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKCh7IGNyZWF0ZURyYWZ0T3JkZXIgfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5wYXJzZVVybChgL29yZGVycy9kcmFmdC8ke2NyZWF0ZURyYWZ0T3JkZXIuaWR9YCksXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
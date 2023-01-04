import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { DataService, OrderDetailFragment } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class OrderResolver implements Resolve<Observable<OrderDetailFragment>> {
    private router;
    private dataService;
    constructor(router: Router, dataService: DataService);
    /** @internal */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<OrderDetailFragment>>;
}

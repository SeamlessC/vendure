import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class OrderGuard implements CanActivate {
    private dataService;
    private router;
    constructor(dataService: DataService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

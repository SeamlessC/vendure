import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { flatten } from 'lodash';
import { combineLatest as observableCombineLatest, Observable, of as observableOf, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DataService } from '../../data/providers/data.service';
/**
 * A breadcrumbs component which reads the route config and any route that has a `data.breadcrumb` property will
 * be displayed in the breadcrumb trail.
 *
 * The `breadcrumb` property can be a string or a function. If a function, it will be passed the route's `data`
 * object (which will include all resolved keys) and any route params, and should return a BreadcrumbValue.
 *
 * See the test config to get an idea of allowable configs for breadcrumbs.
 */
export class BreadcrumbComponent {
    constructor(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.destroy$ = new Subject();
        this.breadcrumbs$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroy$), startWith(true), switchMap(() => this.generateBreadcrumbs(this.route.root)));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    generateBreadcrumbs(rootRoute) {
        const breadcrumbParts = this.assembleBreadcrumbParts(rootRoute);
        const breadcrumbObservables$ = breadcrumbParts.map(({ value$, path }) => {
            return value$.pipe(map(value => {
                if (isBreadcrumbLabelLinkPair(value)) {
                    return {
                        label: value.label,
                        link: this.normalizeRelativeLinks(value.link, path),
                    };
                }
                else if (isBreadcrumbPairArray(value)) {
                    return value.map(val => ({
                        label: val.label,
                        link: this.normalizeRelativeLinks(val.link, path),
                    }));
                }
                else {
                    return {
                        label: value,
                        link: '/' + path.join('/'),
                    };
                }
            }));
        });
        return observableCombineLatest(breadcrumbObservables$).pipe(map(links => flatten(links)));
    }
    /**
     * Walks the route definition tree to assemble an array from which the breadcrumbs can be derived.
     */
    assembleBreadcrumbParts(rootRoute) {
        const breadcrumbParts = [];
        const inferredUrl = '';
        const segmentPaths = [];
        let currentRoute = rootRoute;
        do {
            const childRoutes = currentRoute.children;
            currentRoute = null;
            childRoutes.forEach((route) => {
                if (route.outlet === PRIMARY_OUTLET) {
                    const routeSnapshot = route.snapshot;
                    let breadcrumbDef = route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb'];
                    segmentPaths.push(routeSnapshot.url.map(segment => segment.path).join('/'));
                    if (breadcrumbDef) {
                        if (isBreadcrumbFunction(breadcrumbDef)) {
                            breadcrumbDef = breadcrumbDef(routeSnapshot.data, routeSnapshot.params, this.dataService);
                        }
                        const observableValue = isObservable(breadcrumbDef)
                            ? breadcrumbDef
                            : observableOf(breadcrumbDef);
                        breadcrumbParts.push({ value$: observableValue, path: segmentPaths.slice() });
                    }
                    currentRoute = route;
                }
            });
        } while (currentRoute);
        return breadcrumbParts;
    }
    /**
     * Accounts for relative routes in the link array, i.e. arrays whose first element is either:
     * * `./`   - this appends the rest of the link segments to the current active route
     * * `../`  - this removes the last segment of the current active route, and appends the link segments
     *            to the parent route.
     */
    normalizeRelativeLinks(link, segmentPaths) {
        const clone = link.slice();
        if (clone[0] === './') {
            clone[0] = segmentPaths.join('/');
        }
        if (clone[0] === '../') {
            clone[0] = segmentPaths.slice(0, -1).join('/');
        }
        return clone.filter(segment => segment !== '');
    }
}
BreadcrumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-breadcrumb',
                template: "<nav role=\"navigation\">\n    <ul class=\"breadcrumbs\">\n        <li *ngFor=\"let breadcrumb of (breadcrumbs$ | async); let isLast = last\">\n            <a [routerLink]=\"breadcrumb.link\" *ngIf=\"!isLast\">{{ breadcrumb.label | translate }}</a>\n            <ng-container *ngIf=\"isLast\">{{ breadcrumb.label | translate }}</ng-container>\n        </li>\n    </ul>\n</nav>\n",
                styles: ["@charset \"UTF-8\";:host{display:block}@media screen and (min-width: 768px){:host{padding:0 1rem}}.breadcrumbs{list-style-type:none;display:flex;overflow-x:auto;max-width:100vw;padding:0 3px}@media screen and (min-width: 768px){.breadcrumbs{padding:0}}.breadcrumbs li{font-size:16px;display:inline-block;margin-right:10px;white-space:nowrap}.breadcrumbs li:not(:last-child):after{content:\"\\203a\";top:0;color:var(--color-grey-400);margin-left:10px}\n"]
            },] }
];
BreadcrumbComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: DataService }
];
function isBreadcrumbFunction(value) {
    return typeof value === 'function';
}
function isObservable(value) {
    return value instanceof Observable;
}
function isBreadcrumbLabelLinkPair(value) {
    return value.hasOwnProperty('label') && value.hasOwnProperty('link');
}
function isBreadcrumbPairArray(value) {
    return Array.isArray(value) && isBreadcrumbLabelLinkPair(value[0]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQVEsYUFBYSxFQUFVLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxhQUFhLElBQUksdUJBQXVCLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBZWhFOzs7Ozs7OztHQVFHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUk1QixZQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QjtRQUEvRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUYzRixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUduQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxFQUMvQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4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UUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsc1lBQTBDOzthQUU3Qzs7O1lBakNxRSxNQUFNO1lBQW5FLGNBQWM7WUFLZCxXQUFXOztBQXdJcEIsU0FBUyxvQkFBb0IsQ0FBQyxLQUEyQjtJQUNyRCxPQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztBQUN2QyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsS0FBMkI7SUFDN0MsT0FBTyxLQUFLLFlBQVksVUFBVSxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQXNCO0lBQ3JELE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLEtBQXNCO0lBQ2pELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBEYXRhLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIFBSSU1BUllfT1VUTEVULCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmxhdHRlbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IGFzIG9ic2VydmFibGVDb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJTdHJpbmcgPSBzdHJpbmc7XG5leHBvcnQgaW50ZXJmYWNlIEJyZWFkY3J1bWJMYWJlbExpbmtQYWlyIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGxpbms6IGFueVtdO1xufVxuZXhwb3J0IHR5cGUgQnJlYWRjcnVtYlZhbHVlID0gQnJlYWRjcnVtYlN0cmluZyB8IEJyZWFkY3J1bWJMYWJlbExpbmtQYWlyIHwgQnJlYWRjcnVtYkxhYmVsTGlua1BhaXJbXTtcbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJGdW5jdGlvbiA9IChcbiAgICBkYXRhOiBEYXRhLFxuICAgIHBhcmFtczogUGFyYW1zLFxuICAgIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbikgPT4gQnJlYWRjcnVtYlZhbHVlIHwgT2JzZXJ2YWJsZTxCcmVhZGNydW1iVmFsdWU+O1xuZXhwb3J0IHR5cGUgQnJlYWRjcnVtYkRlZmluaXRpb24gPSBCcmVhZGNydW1iVmFsdWUgfCBCcmVhZGNydW1iRnVuY3Rpb24gfCBPYnNlcnZhYmxlPEJyZWFkY3J1bWJWYWx1ZT47XG5cbi8qKlxuICogQSBicmVhZGNydW1icyBjb21wb25lbnQgd2hpY2ggcmVhZHMgdGhlIHJvdXRlIGNvbmZpZyBhbmQgYW55IHJvdXRlIHRoYXQgaGFzIGEgYGRhdGEuYnJlYWRjcnVtYmAgcHJvcGVydHkgd2lsbFxuICogYmUgZGlzcGxheWVkIGluIHRoZSBicmVhZGNydW1iIHRyYWlsLlxuICpcbiAqIFRoZSBgYnJlYWRjcnVtYmAgcHJvcGVydHkgY2FuIGJlIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24uIElmIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgcGFzc2VkIHRoZSByb3V0ZSdzIGBkYXRhYFxuICogb2JqZWN0ICh3aGljaCB3aWxsIGluY2x1ZGUgYWxsIHJlc29sdmVkIGtleXMpIGFuZCBhbnkgcm91dGUgcGFyYW1zLCBhbmQgc2hvdWxkIHJldHVybiBhIEJyZWFkY3J1bWJWYWx1ZS5cbiAqXG4gKiBTZWUgdGhlIHRlc3QgY29uZmlnIHRvIGdldCBhbiBpZGVhIG9mIGFsbG93YWJsZSBjb25maWdzIGZvciBicmVhZGNydW1icy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYnJlYWRjcnVtYicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2JyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgYnJlYWRjcnVtYnMkOiBPYnNlcnZhYmxlPEFycmF5PHsgbGluazogc3RyaW5nIHwgYW55W107IGxhYmVsOiBzdHJpbmcgfT4+O1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMkID0gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0cnVlKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdlbmVyYXRlQnJlYWRjcnVtYnModGhpcy5yb3V0ZS5yb290KSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUJyZWFkY3J1bWJzKFxuICAgICAgICByb290Um91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICk6IE9ic2VydmFibGU8QXJyYXk8eyBsaW5rOiBBcnJheTxzdHJpbmcgfCBhbnk+OyBsYWJlbDogc3RyaW5nIH0+PiB7XG4gICAgICAgIGNvbnN0IGJyZWFkY3J1bWJQYXJ0cyA9IHRoaXMuYXNzZW1ibGVCcmVhZGNydW1iUGFydHMocm9vdFJvdXRlKTtcbiAgICAgICAgY29uc3QgYnJlYWRjcnVtYk9ic2VydmFibGVzJCA9IGJyZWFkY3J1bWJQYXJ0cy5tYXAoKHsgdmFsdWUkLCBwYXRoIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSQucGlwZShcbiAgICAgICAgICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCcmVhZGNydW1iTGFiZWxMaW5rUGFpcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHZhbHVlLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IHRoaXMubm9ybWFsaXplUmVsYXRpdmVMaW5rcyh2YWx1ZS5saW5rLCBwYXRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNCcmVhZGNydW1iUGFpckFycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2YWwgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdmFsLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IHRoaXMubm9ybWFsaXplUmVsYXRpdmVMaW5rcyh2YWwubGluaywgcGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnLycgKyBwYXRoLmpvaW4oJy8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICkgYXMgT2JzZXJ2YWJsZTxCcmVhZGNydW1iTGFiZWxMaW5rUGFpciB8IEJyZWFkY3J1bWJMYWJlbExpbmtQYWlyW10+O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZUNvbWJpbmVMYXRlc3QoYnJlYWRjcnVtYk9ic2VydmFibGVzJCkucGlwZShtYXAobGlua3MgPT4gZmxhdHRlbihsaW5rcykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYWxrcyB0aGUgcm91dGUgZGVmaW5pdGlvbiB0cmVlIHRvIGFzc2VtYmxlIGFuIGFycmF5IGZyb20gd2hpY2ggdGhlIGJyZWFkY3J1bWJzIGNhbiBiZSBkZXJpdmVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXNzZW1ibGVCcmVhZGNydW1iUGFydHMoXG4gICAgICAgIHJvb3RSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKTogQXJyYXk8eyB2YWx1ZSQ6IE9ic2VydmFibGU8QnJlYWRjcnVtYlZhbHVlPjsgcGF0aDogc3RyaW5nW10gfT4ge1xuICAgICAgICBjb25zdCBicmVhZGNydW1iUGFydHM6IEFycmF5PHsgdmFsdWUkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJWYWx1ZT47IHBhdGg6IHN0cmluZ1tdIH0+ID0gW107XG4gICAgICAgIGNvbnN0IGluZmVycmVkVXJsID0gJyc7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRQYXRoczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnRSb3V0ZTogQWN0aXZhdGVkUm91dGUgfCBudWxsID0gcm9vdFJvdXRlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFJvdXRlcyA9IGN1cnJlbnRSb3V0ZS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGN1cnJlbnRSb3V0ZSA9IG51bGw7XG4gICAgICAgICAgICBjaGlsZFJvdXRlcy5mb3JFYWNoKChyb3V0ZTogQWN0aXZhdGVkUm91dGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocm91dGUub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3V0ZVNuYXBzaG90ID0gcm91dGUuc25hcHNob3Q7XG4gICAgICAgICAgICAgICAgICAgIGxldCBicmVhZGNydW1iRGVmOiBCcmVhZGNydW1iRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZS5yb3V0ZUNvbmZpZyAmJiByb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhICYmIHJvdXRlLnJvdXRlQ29uZmlnLmRhdGFbJ2JyZWFkY3J1bWInXTtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudFBhdGhzLnB1c2gocm91dGVTbmFwc2hvdC51cmwubWFwKHNlZ21lbnQgPT4gc2VnbWVudC5wYXRoKS5qb2luKCcvJykpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChicmVhZGNydW1iRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNCcmVhZGNydW1iRnVuY3Rpb24oYnJlYWRjcnVtYkRlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iRGVmID0gYnJlYWRjcnVtYkRlZihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVTbmFwc2hvdC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZVNuYXBzaG90LnBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZVZhbHVlID0gaXNPYnNlcnZhYmxlKGJyZWFkY3J1bWJEZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBicmVhZGNydW1iRGVmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBvYnNlcnZhYmxlT2YoYnJlYWRjcnVtYkRlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iUGFydHMucHVzaCh7IHZhbHVlJDogb2JzZXJ2YWJsZVZhbHVlLCBwYXRoOiBzZWdtZW50UGF0aHMuc2xpY2UoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um91dGUgPSByb3V0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSB3aGlsZSAoY3VycmVudFJvdXRlKTtcblxuICAgICAgICByZXR1cm4gYnJlYWRjcnVtYlBhcnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjY291bnRzIGZvciByZWxhdGl2ZSByb3V0ZXMgaW4gdGhlIGxpbmsgYXJyYXksIGkuZS4gYXJyYXlzIHdob3NlIGZpcnN0IGVsZW1lbnQgaXMgZWl0aGVyOlxuICAgICAqICogYC4vYCAgIC0gdGhpcyBhcHBlbmRzIHRoZSByZXN0IG9mIHRoZSBsaW5rIHNlZ21lbnRzIHRvIHRoZSBjdXJyZW50IGFjdGl2ZSByb3V0ZVxuICAgICAqICogYC4uL2AgIC0gdGhpcyByZW1vdmVzIHRoZSBsYXN0IHNlZ21lbnQgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIHJvdXRlLCBhbmQgYXBwZW5kcyB0aGUgbGluayBzZWdtZW50c1xuICAgICAqICAgICAgICAgICAgdG8gdGhlIHBhcmVudCByb3V0ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG5vcm1hbGl6ZVJlbGF0aXZlTGlua3MobGluazogYW55W10sIHNlZ21lbnRQYXRoczogc3RyaW5nW10pOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IGNsb25lID0gbGluay5zbGljZSgpO1xuICAgICAgICBpZiAoY2xvbmVbMF0gPT09ICcuLycpIHtcbiAgICAgICAgICAgIGNsb25lWzBdID0gc2VnbWVudFBhdGhzLmpvaW4oJy8nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvbmVbMF0gPT09ICcuLi8nKSB7XG4gICAgICAgICAgICBjbG9uZVswXSA9IHNlZ21lbnRQYXRocy5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbG9uZS5maWx0ZXIoc2VnbWVudCA9PiBzZWdtZW50ICE9PSAnJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0JyZWFkY3J1bWJGdW5jdGlvbih2YWx1ZTogQnJlYWRjcnVtYkRlZmluaXRpb24pOiB2YWx1ZSBpcyBCcmVhZGNydW1iRnVuY3Rpb24ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZSh2YWx1ZTogQnJlYWRjcnVtYkRlZmluaXRpb24pOiB2YWx1ZSBpcyBPYnNlcnZhYmxlPEJyZWFkY3J1bWJWYWx1ZT4ge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGU7XG59XG5cbmZ1bmN0aW9uIGlzQnJlYWRjcnVtYkxhYmVsTGlua1BhaXIodmFsdWU6IEJyZWFkY3J1bWJWYWx1ZSk6IHZhbHVlIGlzIEJyZWFkY3J1bWJMYWJlbExpbmtQYWlyIHtcbiAgICByZXR1cm4gdmFsdWUuaGFzT3duUHJvcGVydHkoJ2xhYmVsJykgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2xpbmsnKTtcbn1cblxuZnVuY3Rpb24gaXNCcmVhZGNydW1iUGFpckFycmF5KHZhbHVlOiBCcmVhZGNydW1iVmFsdWUpOiB2YWx1ZSBpcyBCcmVhZGNydW1iTGFiZWxMaW5rUGFpcltdIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgaXNCcmVhZGNydW1iTGFiZWxMaW5rUGFpcih2YWx1ZVswXSk7XG59XG4iXX0=
import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef, } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
/**
 * @description
 * Conditionally shows/hides templates based on the current active user having the specified permission.
 * Based on the ngIf source. Also support "else" templates:
 *
 * @example
 * ```html
 * <button *vdrIfPermissions="'DeleteCatalog'; else unauthorized">Delete Product</button>
 * <ng-template #unauthorized>Not allowed!</ng-template>
 * ```
 *
 * The permission can be a single string, or an array. If an array is passed, then _all_ of the permissions
 * must match (logical AND)
 *
 * @docsCategory directives
 */
export class IfPermissionsDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService, changeDetectorRef) {
        super(_viewContainer, templateRef, permissions => {
            if (permissions == null) {
                return of(true);
            }
            else if (!permissions) {
                return of(false);
            }
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => {
                for (const permission of permissions) {
                    if (userStatus.permissions.includes(permission)) {
                        return true;
                    }
                }
                return false;
            })
                .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        });
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.permissionToCheck = ['__initial_value__'];
    }
    /**
     * The permission to check to determine whether to show the template.
     */
    set vdrIfPermissions(permission) {
        this.permissionToCheck =
            (permission && (Array.isArray(permission) ? permission : [permission])) || null;
        this.updateArgs$.next([this.permissionToCheck]);
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfPermissionsElse(templateRef) {
        this.setElseTemplate(templateRef);
        this.updateArgs$.next([this.permissionToCheck]);
    }
}
IfPermissionsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfPermissions]',
            },] }
];
IfPermissionsDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService },
    { type: ChangeDetectorRef }
];
IfPermissionsDirective.propDecorators = {
    vdrIfPermissions: [{ type: Input }],
    vdrIfPermissionsElse: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtcGVybWlzc2lvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZGlyZWN0aXZlcy9pZi1wZXJtaXNzaW9ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUNMLFdBQVcsRUFDWCxnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFJSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZUFBMkM7SUFHbkYsWUFDSSxjQUFnQyxFQUNoQyxXQUE2QixFQUNyQixXQUF3QixFQUN4QixpQkFBb0M7UUFFNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2lCQUN6QixVQUFVLEVBQUU7aUJBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO2dCQUMxQixLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtvQkFDbEMsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDN0MsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQXBCSyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTnhDLHNCQUFpQixHQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUEwQm5FLENBQUM7SUFFRDs7T0FFRztJQUNILElBQ0ksZ0JBQWdCLENBQUMsVUFBb0M7UUFDckQsSUFBSSxDQUFDLGlCQUFpQjtZQUNsQixDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNJLG9CQUFvQixDQUFDLFdBQW9DO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQWpESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7O1lBNUJHLGdCQUFnQjtZQURoQixXQUFXO1lBT04sV0FBVztZQVhoQixpQkFBaUI7OzsrQkFrRWhCLEtBQUs7bUNBVUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSWZEaXJlY3RpdmVCYXNlIH0gZnJvbSAnLi9pZi1kaXJlY3RpdmUtYmFzZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25kaXRpb25hbGx5IHNob3dzL2hpZGVzIHRlbXBsYXRlcyBiYXNlZCBvbiB0aGUgY3VycmVudCBhY3RpdmUgdXNlciBoYXZpbmcgdGhlIHNwZWNpZmllZCBwZXJtaXNzaW9uLlxuICogQmFzZWQgb24gdGhlIG5nSWYgc291cmNlLiBBbHNvIHN1cHBvcnQgXCJlbHNlXCIgdGVtcGxhdGVzOlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uICp2ZHJJZlBlcm1pc3Npb25zPVwiJ0RlbGV0ZUNhdGFsb2cnOyBlbHNlIHVuYXV0aG9yaXplZFwiPkRlbGV0ZSBQcm9kdWN0PC9idXR0b24+XG4gKiA8bmctdGVtcGxhdGUgI3VuYXV0aG9yaXplZD5Ob3QgYWxsb3dlZCE8L25nLXRlbXBsYXRlPlxuICogYGBgXG4gKlxuICogVGhlIHBlcm1pc3Npb24gY2FuIGJlIGEgc2luZ2xlIHN0cmluZywgb3IgYW4gYXJyYXkuIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgdGhlbiBfYWxsXyBvZiB0aGUgcGVybWlzc2lvbnNcbiAqIG11c3QgbWF0Y2ggKGxvZ2ljYWwgQU5EKVxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgZGlyZWN0aXZlc1xuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2ZHJJZlBlcm1pc3Npb25zXScsXG59KVxuZXhwb3J0IGNsYXNzIElmUGVybWlzc2lvbnNEaXJlY3RpdmUgZXh0ZW5kcyBJZkRpcmVjdGl2ZUJhc2U8QXJyYXk8UGVybWlzc2lvbltdIHwgbnVsbD4+IHtcbiAgICBwcml2YXRlIHBlcm1pc3Npb25Ub0NoZWNrOiBzdHJpbmdbXSB8IG51bGwgPSBbJ19faW5pdGlhbF92YWx1ZV9fJ107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKF92aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZiwgcGVybWlzc2lvbnMgPT4ge1xuICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAgICAgLm1hcFN0cmVhbSgoeyB1c2VyU3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIHBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlclN0YXR1cy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhwZXJtaXNzaW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5waXBlKHRhcCgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwZXJtaXNzaW9uIHRvIGNoZWNrIHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHNob3cgdGhlIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZkcklmUGVybWlzc2lvbnMocGVybWlzc2lvbjogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsKSB7XG4gICAgICAgIHRoaXMucGVybWlzc2lvblRvQ2hlY2sgPVxuICAgICAgICAgICAgKHBlcm1pc3Npb24gJiYgKEFycmF5LmlzQXJyYXkocGVybWlzc2lvbikgPyBwZXJtaXNzaW9uIDogW3Blcm1pc3Npb25dKSkgfHwgbnVsbDtcbiAgICAgICAgdGhpcy51cGRhdGVBcmdzJC5uZXh0KFt0aGlzLnBlcm1pc3Npb25Ub0NoZWNrIGFzIFBlcm1pc3Npb25bXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdGVtcGxhdGUgdG8gc2hvdyBpZiB0aGUgY3VycmVudCB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHNwZWNpZmllZCBwZXJtaXNzaW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZkcklmUGVybWlzc2lvbnNFbHNlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCkge1xuICAgICAgICB0aGlzLnNldEVsc2VUZW1wbGF0ZSh0ZW1wbGF0ZVJlZik7XG4gICAgICAgIHRoaXMudXBkYXRlQXJncyQubmV4dChbdGhpcy5wZXJtaXNzaW9uVG9DaGVjayBhcyBQZXJtaXNzaW9uW11dKTtcbiAgICB9XG59XG4iXX0=
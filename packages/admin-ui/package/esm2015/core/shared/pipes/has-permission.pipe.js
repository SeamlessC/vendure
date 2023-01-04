import { ChangeDetectorRef, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * @description
 * A pipe which checks the provided permission against all the permissions of the current user.
 * Returns `true` if the current user has that permission.
 *
 * @example
 * ```HTML
 * <button [disabled]="!('UpdateCatalog' | hasPermission)">Save Changes</button>
 * ```
 * @docsCategory pipes
 */
export class HasPermissionPipe {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.hasPermission = false;
        this.lastPermissions = null;
        this.currentPermissions$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.permissions);
    }
    transform(input) {
        const requiredPermissions = Array.isArray(input) ? input : [input];
        const requiredPermissionsString = requiredPermissions.join(',');
        if (this.lastPermissions !== requiredPermissionsString) {
            this.lastPermissions = requiredPermissionsString;
            this.hasPermission = false;
            this.dispose();
            this.subscription = this.currentPermissions$.subscribe(permissions => {
                this.hasPermission = this.checkPermissions(permissions, requiredPermissions);
                this.changeDetectorRef.markForCheck();
            });
        }
        return this.hasPermission;
    }
    ngOnDestroy() {
        this.dispose();
    }
    checkPermissions(userPermissions, requiredPermissions) {
        for (const perm of requiredPermissions) {
            if (userPermissions.includes(perm)) {
                return true;
            }
        }
        return false;
    }
    dispose() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
HasPermissionPipe.decorators = [
    { type: Pipe, args: [{
                name: 'hasPermission',
                pure: false,
            },] }
];
HasPermissionPipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXBlcm1pc3Npb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2hhcy1wZXJtaXNzaW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFhLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFOzs7Ozs7Ozs7O0dBVUc7QUFLSCxNQUFNLE9BQU8saUJBQWlCO0lBTTFCLFlBQW9CLFdBQXdCLEVBQVUsaUJBQW9DO1FBQXRFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUxsRixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixvQkFBZSxHQUFrQixJQUFJLENBQUM7UUFJMUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTthQUM3QyxVQUFVLEVBQUU7YUFDWixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBd0I7UUFDOUIsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsTUFBTSx5QkFBeUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLHlCQUF5QixFQUFFO1lBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcseUJBQXlCLENBQUM7WUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLGdCQUFnQixDQUFDLGVBQXlCLEVBQUUsbUJBQTZCO1FBQzdFLEtBQUssTUFBTSxJQUFJLElBQUksbUJBQW1CLEVBQUU7WUFDcEMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sT0FBTztRQUNYLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7O1lBakRKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsSUFBSSxFQUFFLEtBQUs7YUFDZDs7O1lBaEJRLFdBQVc7WUFIWCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBwaXBlIHdoaWNoIGNoZWNrcyB0aGUgcHJvdmlkZWQgcGVybWlzc2lvbiBhZ2FpbnN0IGFsbCB0aGUgcGVybWlzc2lvbnMgb2YgdGhlIGN1cnJlbnQgdXNlci5cbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBjdXJyZW50IHVzZXIgaGFzIHRoYXQgcGVybWlzc2lvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgSFRNTFxuICogPGJ1dHRvbiBbZGlzYWJsZWRdPVwiISgnVXBkYXRlQ2F0YWxvZycgfCBoYXNQZXJtaXNzaW9uKVwiPlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxuICogYGBgXG4gKiBAZG9jc0NhdGVnb3J5IHBpcGVzXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnaGFzUGVybWlzc2lvbicsXG4gICAgcHVyZTogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIEhhc1Blcm1pc3Npb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGhhc1Blcm1pc3Npb24gPSBmYWxzZTtcbiAgICBwcml2YXRlIGN1cnJlbnRQZXJtaXNzaW9ucyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICAgIHByaXZhdGUgbGFzdFBlcm1pc3Npb25zOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBlcm1pc3Npb25zJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS51c2VyU3RhdHVzLnBlcm1pc3Npb25zKTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0oaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogYW55IHtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRQZXJtaXNzaW9ucyA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuICAgICAgICBjb25zdCByZXF1aXJlZFBlcm1pc3Npb25zU3RyaW5nID0gcmVxdWlyZWRQZXJtaXNzaW9ucy5qb2luKCcsJyk7XG4gICAgICAgIGlmICh0aGlzLmxhc3RQZXJtaXNzaW9ucyAhPT0gcmVxdWlyZWRQZXJtaXNzaW9uc1N0cmluZykge1xuICAgICAgICAgICAgdGhpcy5sYXN0UGVybWlzc2lvbnMgPSByZXF1aXJlZFBlcm1pc3Npb25zU3RyaW5nO1xuICAgICAgICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jdXJyZW50UGVybWlzc2lvbnMkLnN1YnNjcmliZShwZXJtaXNzaW9ucyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uID0gdGhpcy5jaGVja1Blcm1pc3Npb25zKHBlcm1pc3Npb25zLCByZXF1aXJlZFBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrUGVybWlzc2lvbnModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgcmVxdWlyZWRQZXJtaXNzaW9uczogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBwZXJtIG9mIHJlcXVpcmVkUGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgIGlmICh1c2VyUGVybWlzc2lvbnMuaW5jbHVkZXMocGVybSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
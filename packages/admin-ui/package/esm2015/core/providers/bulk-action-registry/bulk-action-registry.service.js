import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BulkActionRegistryService {
    constructor() {
        this.locationBulActionMap = new Map();
    }
    registerBulkAction(bulkAction) {
        if (!this.locationBulActionMap.has(bulkAction.location)) {
            this.locationBulActionMap.set(bulkAction.location, new Set([bulkAction]));
        }
        else {
            // tslint:disable-next-line:no-non-null-assertion
            this.locationBulActionMap.get(bulkAction.location).add(bulkAction);
        }
    }
    getBulkActionsForLocation(id) {
        var _a, _b;
        return [...((_b = (_a = this.locationBulActionMap.get(id)) === null || _a === void 0 ? void 0 : _a.values()) !== null && _b !== void 0 ? _b : [])];
    }
}
BulkActionRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function BulkActionRegistryService_Factory() { return new BulkActionRegistryService(); }, token: BulkActionRegistryService, providedIn: "root" });
BulkActionRegistryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1hY3Rpb24tcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL2J1bGstYWN0aW9uLXJlZ2lzdHJ5L2J1bGstYWN0aW9uLXJlZ2lzdHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLHlCQUF5QjtJQUh0QztRQUlZLHlCQUFvQixHQUFHLElBQUksR0FBRyxFQUF5QyxDQUFDO0tBY25GO0lBWkcsa0JBQWtCLENBQUMsVUFBc0I7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsaURBQWlEO1lBQ2pELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxFQUF3Qjs7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFBLE1BQUEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsMENBQUUsTUFBTSxFQUFFLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OztZQWpCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJ1bGtBY3Rpb24sIEJ1bGtBY3Rpb25Mb2NhdGlvbklkIH0gZnJvbSAnLi9idWxrLWFjdGlvbi10eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2Uge1xuICAgIHByaXZhdGUgbG9jYXRpb25CdWxBY3Rpb25NYXAgPSBuZXcgTWFwPEJ1bGtBY3Rpb25Mb2NhdGlvbklkLCBTZXQ8QnVsa0FjdGlvbj4+KCk7XG5cbiAgICByZWdpc3RlckJ1bGtBY3Rpb24oYnVsa0FjdGlvbjogQnVsa0FjdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMubG9jYXRpb25CdWxBY3Rpb25NYXAuaGFzKGJ1bGtBY3Rpb24ubG9jYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uQnVsQWN0aW9uTWFwLnNldChidWxrQWN0aW9uLmxvY2F0aW9uLCBuZXcgU2V0KFtidWxrQWN0aW9uXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkJ1bEFjdGlvbk1hcC5nZXQoYnVsa0FjdGlvbi5sb2NhdGlvbikhLmFkZChidWxrQWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJ1bGtBY3Rpb25zRm9yTG9jYXRpb24oaWQ6IEJ1bGtBY3Rpb25Mb2NhdGlvbklkKTogQnVsa0FjdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIFsuLi4odGhpcy5sb2NhdGlvbkJ1bEFjdGlvbk1hcC5nZXQoaWQpPy52YWx1ZXMoKSA/PyBbXSldO1xuICAgIH1cbn1cbiJdfQ==
import { APP_INITIALIZER, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @description
 * Registers a {@link CustomDetailComponent} to be placed in a given location. This allows you
 * to embed any type of custom Angular component in the entity detail pages of the Admin UI.
 *
 * @docsCategory custom-detail-components
 */
export function registerCustomDetailComponent(config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (customDetailComponentService) => () => {
            customDetailComponentService.registerCustomDetailComponent(config);
        },
        deps: [CustomDetailComponentService],
    };
}
export class CustomDetailComponentService {
    constructor() {
        this.customDetailComponents = new Map();
    }
    registerCustomDetailComponent(config) {
        var _a;
        if (this.customDetailComponents.has(config.locationId)) {
            (_a = this.customDetailComponents.get(config.locationId)) === null || _a === void 0 ? void 0 : _a.push(config);
        }
        else {
            this.customDetailComponents.set(config.locationId, [config]);
        }
    }
    getCustomDetailComponentsFor(locationId) {
        var _a;
        return (_a = this.customDetailComponents.get(locationId)) !== null && _a !== void 0 ? _a : [];
    }
}
CustomDetailComponentService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomDetailComponentService_Factory() { return new CustomDetailComponentService(); }, token: CustomDetailComponentService, providedIn: "root" });
CustomDetailComponentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRldGFpbC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL2N1c3RvbS1kZXRhaWwtY29tcG9uZW50L2N1c3RvbS1kZXRhaWwtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7O0FBSXRFOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxNQUFtQztJQUM3RSxPQUFPO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsQ0FBQyw0QkFBMEQsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQzdFLDRCQUE0QixDQUFDLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUN2QyxDQUFDO0FBQ04sQ0FBQztBQUtELE1BQU0sT0FBTyw0QkFBNEI7SUFIekM7UUFJWSwyQkFBc0IsR0FBRyxJQUFJLEdBQUcsRUFBeUMsQ0FBQztLQWFyRjtJQVhHLDZCQUE2QixDQUFDLE1BQW1DOztRQUM3RCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BELE1BQUEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLDBDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0gsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxVQUFrQjs7UUFDM0MsT0FBTyxNQUFBLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUM3RCxDQUFDOzs7O1lBaEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgSW5qZWN0YWJsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ3VzdG9tRGV0YWlsQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi9jdXN0b20tZGV0YWlsLWNvbXBvbmVudC10eXBlcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZWdpc3RlcnMgYSB7QGxpbmsgQ3VzdG9tRGV0YWlsQ29tcG9uZW50fSB0byBiZSBwbGFjZWQgaW4gYSBnaXZlbiBsb2NhdGlvbi4gVGhpcyBhbGxvd3MgeW91XG4gKiB0byBlbWJlZCBhbnkgdHlwZSBvZiBjdXN0b20gQW5ndWxhciBjb21wb25lbnQgaW4gdGhlIGVudGl0eSBkZXRhaWwgcGFnZXMgb2YgdGhlIEFkbWluIFVJLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWRldGFpbC1jb21wb25lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckN1c3RvbURldGFpbENvbXBvbmVudChjb25maWc6IEN1c3RvbURldGFpbENvbXBvbmVudENvbmZpZyk6IFByb3ZpZGVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB1c2VGYWN0b3J5OiAoY3VzdG9tRGV0YWlsQ29tcG9uZW50U2VydmljZTogQ3VzdG9tRGV0YWlsQ29tcG9uZW50U2VydmljZSkgPT4gKCkgPT4ge1xuICAgICAgICAgICAgY3VzdG9tRGV0YWlsQ29tcG9uZW50U2VydmljZS5yZWdpc3RlckN1c3RvbURldGFpbENvbXBvbmVudChjb25maWcpO1xuICAgICAgICB9LFxuICAgICAgICBkZXBzOiBbQ3VzdG9tRGV0YWlsQ29tcG9uZW50U2VydmljZV0sXG4gICAgfTtcbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRGV0YWlsQ29tcG9uZW50U2VydmljZSB7XG4gICAgcHJpdmF0ZSBjdXN0b21EZXRhaWxDb21wb25lbnRzID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbURldGFpbENvbXBvbmVudENvbmZpZ1tdPigpO1xuXG4gICAgcmVnaXN0ZXJDdXN0b21EZXRhaWxDb21wb25lbnQoY29uZmlnOiBDdXN0b21EZXRhaWxDb21wb25lbnRDb25maWcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGV0YWlsQ29tcG9uZW50cy5oYXMoY29uZmlnLmxvY2F0aW9uSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURldGFpbENvbXBvbmVudHMuZ2V0KGNvbmZpZy5sb2NhdGlvbklkKT8ucHVzaChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21EZXRhaWxDb21wb25lbnRzLnNldChjb25maWcubG9jYXRpb25JZCwgW2NvbmZpZ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tRGV0YWlsQ29tcG9uZW50c0Zvcihsb2NhdGlvbklkOiBzdHJpbmcpOiBDdXN0b21EZXRhaWxDb21wb25lbnRDb25maWdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbURldGFpbENvbXBvbmVudHMuZ2V0KGxvY2F0aW9uSWQpID8/IFtdO1xuICAgIH1cbn1cbiJdfQ==
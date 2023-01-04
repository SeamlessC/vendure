import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ComponentRegistryService {
    constructor() {
        this.inputComponentMap = new Map();
    }
    registerInputComponent(id, component) {
        if (this.inputComponentMap.has(id)) {
            throw new Error(`Cannot register an InputComponent with the id "${id}", as one with that id already exists`);
        }
        this.inputComponentMap.set(id, component);
    }
    getInputComponent(id) {
        return this.inputComponentMap.get(id);
    }
}
ComponentRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentRegistryService_Factory() { return new ComponentRegistryService(); }, token: ComponentRegistryService, providedIn: "root" });
ComponentRegistryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3Byb3ZpZGVycy9jb21wb25lbnQtcmVnaXN0cnkvY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUSxNQUFNLGVBQWUsQ0FBQzs7QUFPakQsTUFBTSxPQUFPLHdCQUF3QjtJQUhyQztRQUlZLHNCQUFpQixHQUFHLElBQUksR0FBRyxFQUF5QyxDQUFDO0tBY2hGO0lBWkcsc0JBQXNCLENBQUMsRUFBVSxFQUFFLFNBQXdDO1FBQ3ZFLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLGtEQUFrRCxFQUFFLHVDQUF1QyxDQUM5RixDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBVTtRQUN4QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztZQWpCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCwgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50UmVnaXN0cnlTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGlucHV0Q29tcG9uZW50TWFwID0gbmV3IE1hcDxzdHJpbmcsIFR5cGU8Rm9ybUlucHV0Q29tcG9uZW50PGFueT4+PigpO1xuXG4gICAgcmVnaXN0ZXJJbnB1dENvbXBvbmVudChpZDogc3RyaW5nLCBjb21wb25lbnQ6IFR5cGU8Rm9ybUlucHV0Q29tcG9uZW50PGFueT4+KSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0Q29tcG9uZW50TWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgQ2Fubm90IHJlZ2lzdGVyIGFuIElucHV0Q29tcG9uZW50IHdpdGggdGhlIGlkIFwiJHtpZH1cIiwgYXMgb25lIHdpdGggdGhhdCBpZCBhbHJlYWR5IGV4aXN0c2AsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRDb21wb25lbnRNYXAuc2V0KGlkLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIGdldElucHV0Q29tcG9uZW50KGlkOiBzdHJpbmcpOiBUeXBlPEZvcm1JbnB1dENvbXBvbmVudDxhbnk+PiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0Q29tcG9uZW50TWFwLmdldChpZCk7XG4gICAgfVxufVxuIl19
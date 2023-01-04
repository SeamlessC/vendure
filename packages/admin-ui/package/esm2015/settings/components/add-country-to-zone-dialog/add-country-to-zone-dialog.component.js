import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
export class AddCountryToZoneDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.currentMembers = [];
        this.selectedMemberIds = [];
    }
    ngOnInit() {
        const currentMemberIds = this.currentMembers.map(m => m.id);
        this.availableCountries$ = this.dataService.settings
            .getCountries(999)
            .mapStream(data => data.countries.items)
            .pipe(map(countries => countries.filter(c => !currentMemberIds.includes(c.id))));
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedMemberIds);
    }
}
AddCountryToZoneDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-country-to-zone-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}</ng-template>\n\n<vdr-zone-member-list\n    [members]=\"availableCountries$ | async\"\n    [selectedMemberIds]=\"selectedMemberIds\"\n    (selectionChange)=\"selectedMemberIds = $event\"\n>\n</vdr-zone-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedMemberIds.length\" class=\"btn btn-primary\">\n        {{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AddCountryToZoneDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWNvdW50cnktdG8tem9uZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9hZGQtY291bnRyeS10by16b25lLWRpYWxvZy9hZGQtY291bnRyeS10by16b25lLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFvQyxNQUFNLHdCQUF3QixDQUFDO0FBRXZGLE9BQU8sRUFBVSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVE3QyxNQUFNLE9BQU8sK0JBQStCO0lBT3hDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSjVDLG1CQUFjLEdBQXVCLEVBQUUsQ0FBQztRQUV4QyxzQkFBaUIsR0FBYSxFQUFFLENBQUM7SUFFYyxDQUFDO0lBRWhELFFBQVE7UUFDSixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDL0MsWUFBWSxDQUFDLEdBQUcsQ0FBQzthQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsR0FBRztRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0MsQ0FBQzs7O1lBN0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyw4ckJBQTBEO2dCQUUxRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVRRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlLCBEaWFsb2csIEdldENvdW50cnlMaXN0LCBHZXRab25lcyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFkZC1jb3VudHJ5LXRvLXpvbmUtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWRkLWNvdW50cnktdG8tem9uZS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FkZC1jb3VudHJ5LXRvLXpvbmUtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFkZENvdW50cnlUb1pvbmVEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBEaWFsb2c8c3RyaW5nW10+LCBPbkluaXQge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0Pzogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgem9uZU5hbWU6IHN0cmluZztcbiAgICBjdXJyZW50TWVtYmVyczogR2V0Wm9uZXMuTWVtYmVyc1tdID0gW107XG4gICAgYXZhaWxhYmxlQ291bnRyaWVzJDogT2JzZXJ2YWJsZTxHZXRDb3VudHJ5TGlzdC5JdGVtc1tdPjtcbiAgICBzZWxlY3RlZE1lbWJlcklkczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNZW1iZXJJZHMgPSB0aGlzLmN1cnJlbnRNZW1iZXJzLm1hcChtID0+IG0uaWQpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNvdW50cmllcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0Q291bnRyaWVzKDk5OSlcbiAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLmNvdW50cmllcy5pdGVtcylcbiAgICAgICAgICAgIC5waXBlKG1hcChjb3VudHJpZXMgPT4gY291bnRyaWVzLmZpbHRlcihjID0+ICFjdXJyZW50TWVtYmVySWRzLmluY2x1ZGVzKGMuaWQpKSkpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIGFkZCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGVkTWVtYmVySWRzKTtcbiAgICB9XG59XG4iXX0=
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class AssetPreviewDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.assetWithTags$ = of(this.asset).pipe(mergeMap(asset => {
            if (this.hasTags(asset)) {
                return of(asset);
            }
            else {
                // tslint:disable-next-line:no-non-null-assertion
                return this.dataService.product.getAsset(asset.id).mapSingle(data => data.asset);
            }
        }));
    }
    hasTags(asset) {
        return asset.hasOwnProperty('tags');
    }
}
AssetPreviewDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        {{ asset.name }}\n    </div>\n</ng-template>\n\n<vdr-asset-preview\n    *ngIf=\"assetWithTags$ | async as assetWithTags\"\n    [asset]=\"assetWithTags\"\n    (assetChange)=\"assetChanges = $event\"\n    (editClick)=\"resolveWith()\"\n></vdr-asset-preview>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:70vh}.update-button.hidden{visibility:hidden}\n"]
            },] }
];
AssetPreviewDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcHJldmlldy1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9hc3NldC1wcmV2aWV3LWRpYWxvZy9hc3NldC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFXbkUsTUFBTSxPQUFPLDJCQUEyQjtJQUNwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFNaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0gsaURBQWlEO2dCQUNqRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO2FBQ3JGO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFTyxPQUFPLENBQUMsS0FBZ0I7UUFDNUIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsa1ZBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVZRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQXNzZXRGcmFnbWVudCwgR2V0QXNzZXQsIEdldEFzc2V0TGlzdCwgVXBkYXRlQXNzZXRJbnB1dCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuXG50eXBlIEFzc2V0TGlrZSA9IEdldEFzc2V0TGlzdC5JdGVtcyB8IEFzc2V0RnJhZ21lbnQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2V0LXByZXZpZXctZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtcHJldmlldy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0UHJldmlld0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzx2b2lkPiwgT25Jbml0IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cbiAgICBhc3NldDogQXNzZXRMaWtlO1xuICAgIGFzc2V0Q2hhbmdlcz86IFVwZGF0ZUFzc2V0SW5wdXQ7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiB2b2lkKSA9PiB2b2lkO1xuICAgIGFzc2V0V2l0aFRhZ3MkOiBPYnNlcnZhYmxlPEdldEFzc2V0LkFzc2V0PjtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFzc2V0V2l0aFRhZ3MkID0gb2YodGhpcy5hc3NldCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKGFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNUYWdzKGFzc2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYXNzZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRBc3NldChhc3NldC5pZCkubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS5hc3NldCEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzVGFncyhhc3NldDogQXNzZXRMaWtlKTogYXNzZXQgaXMgR2V0QXNzZXRMaXN0Lkl0ZW1zIHtcbiAgICAgICAgcmV0dXJuIGFzc2V0Lmhhc093blByb3BlcnR5KCd0YWdzJyk7XG4gICAgfVxufVxuIl19
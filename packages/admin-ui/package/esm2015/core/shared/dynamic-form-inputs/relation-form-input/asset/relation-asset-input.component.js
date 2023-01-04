import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { AssetPickerDialogComponent } from '../../../components/asset-picker-dialog/asset-picker-dialog.component';
import { AssetPreviewDialogComponent } from '../../../components/asset-preview-dialog/asset-preview-dialog.component';
export class RelationAssetInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
    }
    ngOnInit() {
        this.asset$ = this.formControl.valueChanges.pipe(startWith(this.formControl.value), map(asset => asset === null || asset === void 0 ? void 0 : asset.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product.getAsset(id).mapStream(data => data.asset || undefined);
            }
            else {
                return of(undefined);
            }
        }));
    }
    selectAsset() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
            locals: {
                multiSelect: false,
            },
        })
            .subscribe(result => {
            if (result && result.length) {
                this.formControl.setValue(result[0]);
                this.formControl.markAsDirty();
            }
        });
    }
    remove() {
        this.formControl.setValue(null);
        this.formControl.markAsDirty();
    }
    previewAsset(asset) {
        this.modalService
            .fromComponent(AssetPreviewDialogComponent, {
            size: 'xl',
            closable: true,
            locals: { asset },
        })
            .subscribe();
    }
}
RelationAssetInputComponent.id = 'asset-form-input';
RelationAssetInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-asset-input',
                template: "<vdr-relation-card\n    (select)=\"selectAsset()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"image\"\n    [entity]=\"asset$ | async\"\n    [selectLabel]=\"'asset.select-asset' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-asset=\"entity\">\n        <img\n            class=\"preview\"\n            [title]=\"'asset.preview' | translate\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n            (click)=\"previewAsset(asset)\"\n        />\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-asset=\"entity\">\n        <div class=\"name\" [title]=\"asset.name\">\n            {{ asset.name }}\n        </div>\n    </ng-template>\n</vdr-relation-card>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".preview{cursor:pointer}.detail{flex:1;overflow:hidden}.name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"]
            },] }
];
RelationAssetInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationAssetInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    formControl: [{ type: Input, args: ['parentFormControl',] }],
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tYXNzZXQtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9yZWxhdGlvbi1mb3JtLWlucHV0L2Fzc2V0L3JlbGF0aW9uLWFzc2V0LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUdsRixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFDbkgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFRdEgsTUFBTSxPQUFPLDJCQUEyQjtJQU9wQyxZQUFvQixZQUEwQixFQUFVLFdBQXdCO1FBQTVELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBRXBGLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDNUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxFQUFFLENBQUMsRUFDdkIsb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQzthQUMzRjtpQkFBTTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZO2FBQ1osYUFBYSxDQUFDLDBCQUEwQixFQUFFO1lBQ3ZDLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxLQUFLO2FBQ3JCO1NBQ0osQ0FBQzthQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBcUI7UUFDOUIsSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsMkJBQTJCLEVBQUU7WUFDeEMsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtTQUNwQixDQUFDO2FBQ0QsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7QUFwRGUsOEJBQUUsR0FBMkIsa0JBQWtCLENBQUM7O1lBUG5FLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxrd0JBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVRRLFlBQVk7WUFEWixXQUFXOzs7dUJBYWYsS0FBSzswQkFDTCxLQUFLLFNBQUMsbUJBQW1CO3FCQUN6QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IEdldEFzc2V0LCBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBBc3NldFBpY2tlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXNzZXQtcGlja2VyLWRpYWxvZy9hc3NldC1waWNrZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Fzc2V0LXByZXZpZXctZGlhbG9nL2Fzc2V0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXJlbGF0aW9uLWFzc2V0LWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVsYXRpb24tYXNzZXQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlbGF0aW9uLWFzc2V0LWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFJlbGF0aW9uQXNzZXRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCwgT25Jbml0IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgaWQ6IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgPSAnYXNzZXQtZm9ybS1pbnB1dCc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCdwYXJlbnRGb3JtQ29udHJvbCcpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBASW5wdXQoKSBjb25maWc6IFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWc7XG4gICAgYXNzZXQkOiBPYnNlcnZhYmxlPEdldEFzc2V0LkFzc2V0IHwgdW5kZWZpbmVkPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYXNzZXQkID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLmZvcm1Db250cm9sLnZhbHVlKSxcbiAgICAgICAgICAgIG1hcChhc3NldCA9PiBhc3NldD8uaWQpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QuZ2V0QXNzZXQoaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuYXNzZXQgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBc3NldCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEFzc2V0UGlja2VyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG5cbiAgICBwcmV2aWV3QXNzZXQoYXNzZXQ6IEdldEFzc2V0LkFzc2V0KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2FsczogeyBhc3NldCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4iXX0=
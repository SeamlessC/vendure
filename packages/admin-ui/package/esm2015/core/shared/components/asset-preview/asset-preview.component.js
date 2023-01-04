import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { ModalService } from '../../../providers/modal/modal.service';
import { NotificationService } from '../../../providers/notification/notification.service';
import { ManageTagsDialogComponent } from '../manage-tags-dialog/manage-tags-dialog.component';
export class AssetPreviewComponent {
    constructor(formBuilder, dataService, notificationService, changeDetector, modalService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.changeDetector = changeDetector;
        this.modalService = modalService;
        this.editable = false;
        this.customFields = [];
        this.assetChange = new EventEmitter();
        this.editClick = new EventEmitter();
        this.size = 'medium';
        this.width = 0;
        this.height = 0;
        this.centered = true;
        this.settingFocalPoint = false;
    }
    get fpx() {
        return this.asset.focalPoint ? this.asset.focalPoint.x : null;
    }
    get fpy() {
        return this.asset.focalPoint ? this.asset.focalPoint.y : null;
    }
    ngOnInit() {
        var _a;
        const { focalPoint } = this.asset;
        this.form = this.formBuilder.group({
            name: [this.asset.name],
            tags: [(_a = this.asset.tags) === null || _a === void 0 ? void 0 : _a.map(t => t.value)],
        });
        this.subscription = this.form.valueChanges.subscribe(value => {
            this.assetChange.emit({
                id: this.asset.id,
                name: value.name,
                tags: value.tags,
            });
        });
        this.subscription.add(fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(() => {
            this.updateDimensions();
            this.changeDetector.markForCheck();
        }));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getSourceFileName() {
        const parts = this.asset.source.split(/[\\\/]/g);
        return parts[parts.length - 1];
    }
    onImageLoad() {
        this.updateDimensions();
        this.changeDetector.markForCheck();
    }
    updateDimensions() {
        const img = this.imageElementRef.nativeElement;
        const container = this.previewDivRef.nativeElement;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const constrainToContainer = this.settingFocalPoint;
        if (constrainToContainer) {
            const controlsMarginPx = 48 * 2;
            const availableHeight = containerHeight - controlsMarginPx;
            const availableWidth = containerWidth;
            const hRatio = imgHeight / availableHeight;
            const wRatio = imgWidth / availableWidth;
            const imageExceedsAvailableDimensions = 1 < hRatio || 1 < wRatio;
            if (imageExceedsAvailableDimensions) {
                const factor = hRatio < wRatio ? wRatio : hRatio;
                this.width = Math.round(imgWidth / factor);
                this.height = Math.round(imgHeight / factor);
                this.centered = true;
                return;
            }
        }
        this.width = imgWidth;
        this.height = imgHeight;
        this.centered = imgWidth <= containerWidth && imgHeight <= containerHeight;
    }
    setFocalPointStart() {
        this.sizePriorToSettingFocalPoint = this.size;
        this.size = 'medium';
        this.settingFocalPoint = true;
        this.lastFocalPoint = this.asset.focalPoint || { x: 0.5, y: 0.5 };
        this.updateDimensions();
    }
    removeFocalPoint() {
        this.dataService.product
            .updateAsset({
            id: this.asset.id,
            focalPoint: null,
        })
            .subscribe(() => {
            this.notificationService.success(_('asset.update-focal-point-success'));
            this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: null });
            this.changeDetector.markForCheck();
        }, () => this.notificationService.error(_('asset.update-focal-point-error')));
    }
    onFocalPointChange(point) {
        this.lastFocalPoint = point;
    }
    setFocalPointCancel() {
        this.settingFocalPoint = false;
        this.lastFocalPoint = undefined;
        this.size = this.sizePriorToSettingFocalPoint;
    }
    setFocalPointEnd() {
        this.settingFocalPoint = false;
        this.size = this.sizePriorToSettingFocalPoint;
        if (this.lastFocalPoint) {
            const { x, y } = this.lastFocalPoint;
            this.lastFocalPoint = undefined;
            this.dataService.product
                .updateAsset({
                id: this.asset.id,
                focalPoint: { x, y },
            })
                .subscribe(() => {
                this.notificationService.success(_('asset.update-focal-point-success'));
                this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: { x, y } });
                this.changeDetector.markForCheck();
            }, () => this.notificationService.error(_('asset.update-focal-point-error')));
        }
    }
    manageTags() {
        this.modalService
            .fromComponent(ManageTagsDialogComponent, {
            size: 'sm',
        })
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('common.notify-updated-tags-success'));
            }
        });
    }
}
AssetPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview',
                template: "<div class=\"preview-image\" #previewDiv [class.centered]=\"centered\">\n    <div class=\"image-wrapper\">\n        <vdr-focal-point-control\n            [width]=\"width\"\n            [height]=\"height\"\n            [fpx]=\"fpx\"\n            [fpy]=\"fpy\"\n            [editable]=\"settingFocalPoint\"\n            (focalPointChange)=\"onFocalPointChange($event)\"\n        >\n            <img\n                class=\"asset-image\"\n                [src]=\"asset | assetPreview: size\"\n                [ngClass]=\"size\"\n                #imageElement\n                (load)=\"onImageLoad()\"\n            />\n        </vdr-focal-point-control>\n        <div class=\"focal-point-info\" *ngIf=\"settingFocalPoint\">\n            <button class=\"icon-button\" (click)=\"setFocalPointCancel()\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <button class=\"btn btn-primary btn-sm\" (click)=\"setFocalPointEnd()\" [disabled]=\"!lastFocalPoint\">\n                <clr-icon shape=\"crosshairs\"></clr-icon>\n                {{ 'asset.set-focal-point' | translate }}\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class=\"controls\" [class.fade]=\"settingFocalPoint\">\n    <form [formGroup]=\"form\">\n        <clr-input-container class=\"name-input\" *ngIf=\"editable\">\n            <label>{{ 'common.name' | translate }}</label>\n            <input\n                clrInput\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission) || settingFocalPoint\"\n            />\n        </clr-input-container>\n\n        <vdr-labeled-data [label]=\"'common.name' | translate\" *ngIf=\"!editable\">\n            <span class=\"elide\">\n                {{ asset.name }}\n            </span>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.source-file' | translate\">\n            <a [href]=\"asset.source\" [title]=\"asset.source\" target=\"_blank\" class=\"elide source-link\">{{\n                getSourceFileName()\n            }}</a>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.original-asset-size' | translate\">\n            {{ asset.fileSize | filesize }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.dimensions' | translate\">\n            {{ asset.width }} x {{ asset.height }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.focal-point' | translate\">\n            <span *ngIf=\"fpx\"\n                ><clr-icon shape=\"crosshairs\"></clr-icon> x: {{ fpx | number: '1.2-2' }}, y:\n                {{ fpy | number: '1.2-2' }}</span\n            >\n            <span *ngIf=\"!fpx\">{{ 'common.not-set' | translate }}</span>\n            <br />\n            <button\n                class=\"btn btn-secondary-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                (click)=\"setFocalPointStart()\"\n            >\n                <ng-container *ngIf=\"!fpx\">{{ 'asset.set-focal-point' | translate }}</ng-container>\n                <ng-container *ngIf=\"fpx\">{{ 'asset.update-focal-point' | translate }}</ng-container>\n            </button>\n            <button\n                class=\"btn btn-warning-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                *ngIf=\"!!fpx\"\n                (click)=\"removeFocalPoint()\"\n            >\n                {{ 'asset.unset-focal-point' | translate }}\n            </button>\n        </vdr-labeled-data>\n        <vdr-labeled-data [label]=\"'common.tags' | translate\">\n            <ng-container *ngIf=\"editable\">\n                <vdr-tag-selector formControlName=\"tags\"></vdr-tag-selector>\n                <button class=\"btn btn-link btn-sm\" (click)=\"manageTags()\">\n                    <clr-icon shape=\"tags\"></clr-icon>\n                    {{ 'common.manage-tags' | translate }}\n                </button>\n            </ng-container>\n            <div *ngIf=\"!editable\">\n                <vdr-chip *ngFor=\"let tag of asset.tags\" [colorFrom]=\"tag.value\">\n                    <clr-icon shape=\"tag\" class=\"mr2\"></clr-icon>\n                    {{ tag.value }}</vdr-chip\n                >\n            </div>\n        </vdr-labeled-data>\n    </form>\n    <section *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Asset\"\n            [compact]=\"true\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"customFieldsForm\"\n            [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <div class=\"flex-spacer\"></div>\n    <div class=\"preview-select\">\n        <clr-select-container>\n            <label>{{ 'asset.preview' | translate }}</label>\n            <select clrSelect name=\"options\" [(ngModel)]=\"size\" [disabled]=\"settingFocalPoint\">\n                <option value=\"tiny\">tiny</option>\n                <option value=\"thumb\">thumb</option>\n                <option value=\"small\">small</option>\n                <option value=\"medium\">medium</option>\n                <option value=\"large\">large</option>\n                <option value=\"\">full size</option>\n            </select>\n        </clr-select-container>\n        <div class=\"asset-detail\">{{ width }} x {{ height }}</div>\n    </div>\n    <vdr-asset-preview-links class=\"mb4\" [asset]=\"asset\"></vdr-asset-preview-links>\n    <div *ngIf=\"!editable\" class=\"edit-button-wrapper\">\n        <a\n            class=\"btn btn-link btn-sm\"\n            [routerLink]=\"['/catalog', 'assets', asset.id]\"\n            (click)=\"editClick.emit()\"\n        >\n            <clr-icon shape=\"edit\"></clr-icon>\n            {{ 'common.edit' | translate }}\n        </a>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;height:100%}.preview-image{width:100%;height:100%;min-height:60vh;overflow:auto;text-align:center;box-shadow:inset 0 0 5px #0000001a;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACuoAAArqAVDM774AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAK0lEQVQ4T2P4jwP8xgFGNSADqDwGIF0DlMYAUH0YYFQDMoDKYwASNfz/DwB/JvcficphowAAAABJRU5ErkJggg==);flex:1}.preview-image.centered{display:flex;align-items:center;justify-content:center}.preview-image vdr-focal-point-control{position:relative;box-shadow:0 0 10px -3px #00000026}.preview-image .image-wrapper{position:relative}.preview-image .asset-image{width:100%}.preview-image .asset-image.tiny{max-width:50px;max-height:50px}.preview-image .asset-image.thumb{max-width:150px;max-height:150px}.preview-image .asset-image.small{max-width:300px;max-height:300px}.preview-image .asset-image.medium{max-width:500px;max-height:500px}.preview-image .asset-image.large{max-width:800px;max-height:800px}.preview-image .focal-point-info{position:absolute;display:flex;right:0}.controls{display:flex;flex-direction:column;margin-left:12px;min-width:15vw;max-width:25vw;transition:opacity .3s}.controls.fade{opacity:.5}.controls .name-input{margin-bottom:24px}.controls ::ng-deep .clr-control-container{width:100%}.controls ::ng-deep .clr-control-container .clr-input{width:100%}.controls .elide{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:block}.controls .source-link{direction:rtl}.controls .preview-select{display:flex;align-items:center}.controls .preview-select clr-select-container{margin-right:12px}.edit-button-wrapper{padding-top:6px;border-top:1px solid var(--color-component-border-100);text-align:center}\n"]
            },] }
];
AssetPreviewComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DataService },
    { type: NotificationService },
    { type: ChangeDetectorRef },
    { type: ModalService }
];
AssetPreviewComponent.propDecorators = {
    asset: [{ type: Input }],
    editable: [{ type: Input }],
    customFields: [{ type: Input }],
    customFieldsForm: [{ type: Input }],
    assetChange: [{ type: Output }],
    editClick: [{ type: Output }],
    imageElementRef: [{ type: ViewChild, args: ['imageElement', { static: true },] }],
    previewDivRef: [{ type: ViewChild, args: ['previewDiv', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LXByZXZpZXcvYXNzZXQtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUUzRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQVcvRixNQUFNLE9BQU8scUJBQXFCO0lBcUI5QixZQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxjQUFpQyxFQUNqQyxZQUEwQjtRQUoxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXhCN0IsYUFB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QU0sQ0FBQyxFQUFFO1lBQ2hCLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQzthQUM3RTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBbkxKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixzNExBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQXBCUSxXQUFXO1lBTVgsV0FBVztZQUVYLG1CQUFtQjtZQWxCeEIsaUJBQWlCO1lBaUJaLFlBQVk7OztvQkFlaEIsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7K0JBQ0wsS0FBSzswQkFDTCxNQUFNO3dCQUNOLE1BQU07OEJBVU4sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7NEJBQzFDLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbmZpZywgR2V0QXNzZXQsIEdldEFzc2V0TGlzdCwgVXBkYXRlQXNzZXRJbnB1dCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9mb2NhbC1wb2ludC1jb250cm9sL2ZvY2FsLXBvaW50LWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IE1hbmFnZVRhZ3NEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9tYW5hZ2UtdGFncy1kaWFsb2cvbWFuYWdlLXRhZ3MtZGlhbG9nLmNvbXBvbmVudCc7XG5cbmV4cG9ydCB0eXBlIFByZXZpZXdQcmVzZXQgPSAndGlueScgfCAndGh1bWInIHwgJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyB8ICcnO1xudHlwZSBBc3NldExpa2UgPSBHZXRBc3NldExpc3QuSXRlbXMgfCBHZXRBc3NldC5Bc3NldDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtcHJldmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LXByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0LXByZXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGFzc2V0OiBBc3NldExpa2U7XG4gICAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW10gPSBbXTtcbiAgICBASW5wdXQoKSBjdXN0b21GaWVsZHNGb3JtOiBGb3JtR3JvdXAgfCB1bmRlZmluZWQ7XG4gICAgQE91dHB1dCgpIGFzc2V0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxPbWl0PFVwZGF0ZUFzc2V0SW5wdXQsICdmb2NhbFBvaW50Jz4+KCk7XG4gICAgQE91dHB1dCgpIGVkaXRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIHNpemU6IFByZXZpZXdQcmVzZXQgPSAnbWVkaXVtJztcbiAgICB3aWR0aCA9IDA7XG4gICAgaGVpZ2h0ID0gMDtcbiAgICBjZW50ZXJlZCA9IHRydWU7XG4gICAgc2V0dGluZ0ZvY2FsUG9pbnQgPSBmYWxzZTtcbiAgICBsYXN0Rm9jYWxQb2ludD86IFBvaW50O1xuICAgIEBWaWV3Q2hpbGQoJ2ltYWdlRWxlbWVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgaW1hZ2VFbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+O1xuICAgIEBWaWV3Q2hpbGQoJ3ByZXZpZXdEaXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHByZXZpZXdEaXZSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzaXplUHJpb3JUb1NldHRpbmdGb2NhbFBvaW50OiBQcmV2aWV3UHJlc2V0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBnZXQgZnB4KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NldC5mb2NhbFBvaW50ID8gdGhpcy5hc3NldC5mb2NhbFBvaW50LnggOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBmcHkoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2V0LmZvY2FsUG9pbnQgPyB0aGlzLmFzc2V0LmZvY2FsUG9pbnQueSA6IG51bGw7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IHsgZm9jYWxQb2ludCB9ID0gdGhpcy5hc3NldDtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBuYW1lOiBbdGhpcy5hc3NldC5uYW1lXSxcbiAgICAgICAgICAgIHRhZ3M6IFt0aGlzLmFzc2V0LnRhZ3M/Lm1hcCh0ID0+IHQudmFsdWUpXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hc3NldENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5hc3NldC5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHZhbHVlLnRhZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvdXJjZUZpbGVOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy5hc3NldC5zb3VyY2Uuc3BsaXQoL1tcXFxcXFwvXS9nKTtcbiAgICAgICAgcmV0dXJuIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIG9uSW1hZ2VMb2FkKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLmltYWdlRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnByZXZpZXdEaXZSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgaW1nV2lkdGggPSBpbWcubmF0dXJhbFdpZHRoO1xuICAgICAgICBjb25zdCBpbWdIZWlnaHQgPSBpbWcubmF0dXJhbEhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgY29uc3QgY29uc3RyYWluVG9Db250YWluZXIgPSB0aGlzLnNldHRpbmdGb2NhbFBvaW50O1xuICAgICAgICBpZiAoY29uc3RyYWluVG9Db250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xzTWFyZ2luUHggPSA0OCAqIDI7XG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgLSBjb250cm9sc01hcmdpblB4O1xuICAgICAgICAgICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSBjb250YWluZXJXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhSYXRpbyA9IGltZ0hlaWdodCAvIGF2YWlsYWJsZUhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHdSYXRpbyA9IGltZ1dpZHRoIC8gYXZhaWxhYmxlV2lkdGg7XG5cbiAgICAgICAgICAgIGNvbnN0IGltYWdlRXhjZWVkc0F2YWlsYWJsZURpbWVuc2lvbnMgPSAxIDwgaFJhdGlvIHx8IDEgPCB3UmF0aW87XG4gICAgICAgICAgICBpZiAoaW1hZ2VFeGNlZWRzQXZhaWxhYmxlRGltZW5zaW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IGhSYXRpbyA8IHdSYXRpbyA/IHdSYXRpbyA6IGhSYXRpbztcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gTWF0aC5yb3VuZChpbWdXaWR0aCAvIGZhY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLnJvdW5kKGltZ0hlaWdodCAvIGZhY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5jZW50ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkdGggPSBpbWdXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBpbWdIZWlnaHQ7XG4gICAgICAgIHRoaXMuY2VudGVyZWQgPSBpbWdXaWR0aCA8PSBjb250YWluZXJXaWR0aCAmJiBpbWdIZWlnaHQgPD0gY29udGFpbmVySGVpZ2h0O1xuICAgIH1cblxuICAgIHNldEZvY2FsUG9pbnRTdGFydCgpIHtcbiAgICAgICAgdGhpcy5zaXplUHJpb3JUb1NldHRpbmdGb2NhbFBvaW50ID0gdGhpcy5zaXplO1xuICAgICAgICB0aGlzLnNpemUgPSAnbWVkaXVtJztcbiAgICAgICAgdGhpcy5zZXR0aW5nRm9jYWxQb2ludCA9IHRydWU7XG4gICAgICAgIHRoaXMubGFzdEZvY2FsUG9pbnQgPSB0aGlzLmFzc2V0LmZvY2FsUG9pbnQgfHwgeyB4OiAwLjUsIHk6IDAuNSB9O1xuICAgICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICByZW1vdmVGb2NhbFBvaW50KCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgIC51cGRhdGVBc3NldCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuYXNzZXQuaWQsXG4gICAgICAgICAgICAgICAgZm9jYWxQb2ludDogbnVsbCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnYXNzZXQudXBkYXRlLWZvY2FsLXBvaW50LXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXQgPSB7IC4uLnRoaXMuYXNzZXQsIGZvY2FsUG9pbnQ6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdhc3NldC51cGRhdGUtZm9jYWwtcG9pbnQtZXJyb3InKSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIG9uRm9jYWxQb2ludENoYW5nZShwb2ludDogUG9pbnQpIHtcbiAgICAgICAgdGhpcy5sYXN0Rm9jYWxQb2ludCA9IHBvaW50O1xuICAgIH1cblxuICAgIHNldEZvY2FsUG9pbnRDYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ0ZvY2FsUG9pbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYXN0Rm9jYWxQb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplUHJpb3JUb1NldHRpbmdGb2NhbFBvaW50O1xuICAgIH1cblxuICAgIHNldEZvY2FsUG9pbnRFbmQoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ0ZvY2FsUG9pbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplUHJpb3JUb1NldHRpbmdGb2NhbFBvaW50O1xuICAgICAgICBpZiAodGhpcy5sYXN0Rm9jYWxQb2ludCkge1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmxhc3RGb2NhbFBvaW50O1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9jYWxQb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgIC51cGRhdGVBc3NldCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmFzc2V0LmlkLFxuICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50OiB7IHgsIHkgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2Fzc2V0LnVwZGF0ZS1mb2NhbC1wb2ludC1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldCA9IHsgLi4udGhpcy5hc3NldCwgZm9jYWxQb2ludDogeyB4LCB5IH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdhc3NldC51cGRhdGUtZm9jYWwtcG9pbnQtZXJyb3InKSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hbmFnZVRhZ3MoKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChNYW5hZ2VUYWdzRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZWQtdGFncy1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
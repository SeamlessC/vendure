import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { SelectionManager } from '../../../common/utilities/selection-manager';
import { ModalService } from '../../../providers/modal/modal.service';
import { AssetPreviewDialogComponent } from '../asset-preview-dialog/asset-preview-dialog.component';
export class AssetGalleryComponent {
    constructor(modalService) {
        this.modalService = modalService;
        /**
         * If true, allows multiple assets to be selected by ctrl+clicking.
         */
        this.multiSelect = false;
        this.canDelete = false;
        this.selectionChange = new EventEmitter();
        this.deleteAssets = new EventEmitter();
        this.selectionManager = new SelectionManager({
            multiSelect: this.multiSelect,
            itemsAreEqual: (a, b) => a.id === b.id,
            additiveMode: false,
        });
    }
    ngOnChanges(changes) {
        if (this.assets) {
            for (const asset of this.selectionManager.selection) {
                // Update any selected assets with any changes
                const match = this.assets.find(a => a.id === asset.id);
                if (match) {
                    Object.assign(asset, match);
                }
            }
        }
        if (changes['assets']) {
            this.selectionManager.setCurrentItems(this.assets);
        }
        if (changes['multiSelect']) {
            this.selectionManager.setMultiSelect(this.multiSelect);
        }
    }
    toggleSelection(asset, event) {
        this.selectionManager.toggleSelection(asset, event);
        this.selectionChange.emit(this.selectionManager.selection);
    }
    selectMultiple(assets) {
        this.selectionManager.selectMultiple(assets);
        this.selectionChange.emit(this.selectionManager.selection);
    }
    isSelected(asset) {
        return this.selectionManager.isSelected(asset);
    }
    lastSelected() {
        return this.selectionManager.lastSelected();
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
    entityInfoClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
AssetGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-gallery',
                template: "<div class=\"gallery\">\n    <div\n        class=\"card\"\n        *ngFor=\"let asset of assets\"\n        (click)=\"toggleSelection(asset, $event)\"\n        [class.selected]=\"isSelected(asset)\"\n    >\n        <div class=\"card-img\">\n            <vdr-select-toggle\n                [selected]=\"isSelected(asset)\"\n                [disabled]=\"true\"\n                [hiddenWhenOff]=\"true\"\n            ></vdr-select-toggle>\n            <img class=\"asset-thumb\" [src]=\"asset | assetPreview: 'thumb'\" />\n        </div>\n        <div class=\"detail\">\n            <vdr-entity-info\n                [entity]=\"asset\"\n                [small]=\"true\"\n                (click)=\"entityInfoClick($event)\"\n            ></vdr-entity-info>\n            <span [title]=\"asset.name\">{{ asset.name }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"info-bar\">\n    <div class=\"card\">\n        <div class=\"card-img\">\n            <div class=\"placeholder\" *ngIf=\"selectionManager.selection.length === 0\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-selection' | translate }}</div>\n            </div>\n            <img\n                class=\"preview\"\n                *ngIf=\"selectionManager.selection.length >= 1\"\n                [src]=\"lastSelected().preview + '?preset=medium'\"\n            />\n        </div>\n        <div class=\"card-block details\" *ngIf=\"selectionManager.selection.length >= 1\">\n            <div class=\"name\">{{ lastSelected().name }}</div>\n            <div>{{ 'asset.original-asset-size' | translate }}: {{ lastSelected().fileSize | filesize }}</div>\n\n            <ng-container *ngIf=\"selectionManager.selection.length === 1\">\n                <vdr-chip *ngFor=\"let tag of lastSelected().tags\" [colorFrom]=\"tag.value\"\n                    ><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag.value }}</vdr-chip\n                >\n                <div>\n                    <button (click)=\"previewAsset(lastSelected())\" class=\"btn btn-link\">\n                        <clr-icon shape=\"eye\"></clr-icon> {{ 'asset.preview' | translate }}\n                    </button>\n                </div>\n                <div>\n                    <vdr-asset-preview-links class=\"\" [asset]=\"lastSelected()\"></vdr-asset-preview-links>\n                </div>\n                <div>\n                    <a [routerLink]=\"['./', lastSelected().id]\" class=\"btn btn-link\">\n                        <clr-icon shape=\"pencil\"></clr-icon> {{ 'common.edit' | translate }}\n                    </a>\n                </div>\n            </ng-container>\n            <div *ngIf=\"canDelete\">\n                <button (click)=\"deleteAssets.emit(selectionManager.selection)\" class=\"btn btn-link\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon> {{ 'common.delete' | translate }}\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"card stack\" [class.visible]=\"selectionManager.selection.length > 1\"></div>\n    <div class=\"selection-count\" [class.visible]=\"selectionManager.selection.length > 1\">\n        {{ 'asset.assets-selected-count' | translate: { count: selectionManager.selection.length } }}\n        <ul>\n            <li *ngFor=\"let asset of selectionManager.selection\">{{ asset.name }}</li>\n        </ul>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;overflow:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,150px);grid-template-rows:repeat(auto-fill,180px);grid-gap:10px 20px;overflow-y:auto;padding-left:12px;padding-top:12px;padding-bottom:12px}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card{margin-top:0;position:relative}img.asset-thumb{aspect-ratio:1}vdr-select-toggle{position:absolute;top:-12px;left:-12px}vdr-select-toggle ::ng-deep .toggle{box-shadow:0 5px 5px -4px #000000bf}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.detail{font-size:12px;margin:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.detail vdr-entity-info{height:16px}.info-bar{width:25%;padding:0 6px;overflow-y:auto}.info-bar .card{z-index:1}.info-bar .stack{z-index:0;opacity:0;transform:perspective(500px) translateZ(0) translateY(-16px);height:16px;transition:transform .3s,opacity 0s .3s;background-color:#fff}.info-bar .stack.visible{opacity:1;transform:perspective(500px) translateZ(-44px) translateY(0);background-color:var(--color-component-bg-100);transition:transform .3s,color .3s}.info-bar .selection-count{opacity:0;position:relative;text-align:center;visibility:hidden;transition:opacity .3s,visibility 0s .3s}.info-bar .selection-count.visible{opacity:1;visibility:visible;transition:opacity .3s,visibility 0s}.info-bar .selection-count ul{text-align:left;list-style-type:none;margin-left:12px}.info-bar .selection-count ul li{font-size:12px}.info-bar .placeholder{text-align:center;color:var(--color-grey-300)}.info-bar .preview img{max-width:100%}.info-bar .details{font-size:12px;word-break:break-all}.info-bar .name{line-height:14px;font-weight:bold}\n"]
            },] }
];
AssetGalleryComponent.ctorParameters = () => [
    { type: ModalService }
];
AssetGalleryComponent.propDecorators = {
    assets: [{ type: Input }],
    multiSelect: [{ type: Input }],
    canDelete: [{ type: Input }],
    selectionChange: [{ type: Output }],
    deleteAssets: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LWdhbGxlcnkvYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBVXJHLE1BQU0sT0FBTyxxQkFBcUI7SUFnQjlCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBZDlDOztXQUVHO1FBQ00sZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNqQixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFlLENBQUM7UUFDbEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBRXpELHFCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQVk7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEMsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBRThDLENBQUM7SUFFbEQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDakQsOENBQThDO2dCQUM5QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLEtBQUssRUFBRTtvQkFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtTQUNKO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBZ0IsRUFBRSxLQUFrQjtRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFtQjtRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLENBQUMsS0FBZ0I7UUFDekIsSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsMkJBQTJCLEVBQUU7WUFDeEMsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtTQUNwQixDQUFDO2FBQ0QsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFpQjtRQUM3QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQXpFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsdzRHQUE2QztnQkFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFWUSxZQUFZOzs7cUJBWWhCLEtBQUs7MEJBSUwsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBHZXRBc3NldExpc3QgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IFNlbGVjdGlvbk1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbGl0aWVzL3NlbGVjdGlvbi1tYW5hZ2VyJztcbmltcG9ydCB7IE1vZGFsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9tb2RhbC9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEFzc2V0UHJldmlld0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2Fzc2V0LXByZXZpZXctZGlhbG9nL2Fzc2V0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5cbmV4cG9ydCB0eXBlIEFzc2V0TGlrZSA9IEdldEFzc2V0TGlzdC5JdGVtcztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtZ2FsbGVyeScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0LWdhbGxlcnkuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBhc3NldHM6IEFzc2V0TGlrZVtdO1xuICAgIC8qKlxuICAgICAqIElmIHRydWUsIGFsbG93cyBtdWx0aXBsZSBhc3NldHMgdG8gYmUgc2VsZWN0ZWQgYnkgY3RybCtjbGlja2luZy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBtdWx0aVNlbGVjdCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGNhbkRlbGV0ZSA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFzc2V0TGlrZVtdPigpO1xuICAgIEBPdXRwdXQoKSBkZWxldGVBc3NldHMgPSBuZXcgRXZlbnRFbWl0dGVyPEFzc2V0TGlrZVtdPigpO1xuXG4gICAgc2VsZWN0aW9uTWFuYWdlciA9IG5ldyBTZWxlY3Rpb25NYW5hZ2VyPEFzc2V0TGlrZT4oe1xuICAgICAgICBtdWx0aVNlbGVjdDogdGhpcy5tdWx0aVNlbGVjdCxcbiAgICAgICAgaXRlbXNBcmVFcXVhbDogKGEsIGIpID0+IGEuaWQgPT09IGIuaWQsXG4gICAgICAgIGFkZGl0aXZlTW9kZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAodGhpcy5hc3NldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzZXQgb2YgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgc2VsZWN0ZWQgYXNzZXRzIHdpdGggYW55IGNoYW5nZXNcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuYXNzZXRzLmZpbmQoYSA9PiBhLmlkID09PSBhc3NldC5pZCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXNzZXQsIG1hdGNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2Fzc2V0cyddKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2V0Q3VycmVudEl0ZW1zKHRoaXMuYXNzZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snbXVsdGlTZWxlY3QnXSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNldE11bHRpU2VsZWN0KHRoaXMubXVsdGlTZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0aW9uKGFzc2V0OiBBc3NldExpa2UsIGV2ZW50PzogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGFzc2V0LCBldmVudCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgc2VsZWN0TXVsdGlwbGUoYXNzZXRzOiBBc3NldExpa2VbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0TXVsdGlwbGUoYXNzZXRzKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKGFzc2V0OiBBc3NldExpa2UpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pc1NlbGVjdGVkKGFzc2V0KTtcbiAgICB9XG5cbiAgICBsYXN0U2VsZWN0ZWQoKTogQXNzZXRMaWtlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0U2VsZWN0ZWQoKTtcbiAgICB9XG5cbiAgICBwcmV2aWV3QXNzZXQoYXNzZXQ6IEFzc2V0TGlrZSkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQXNzZXRQcmV2aWV3RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHsgYXNzZXQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZW50aXR5SW5mb0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==
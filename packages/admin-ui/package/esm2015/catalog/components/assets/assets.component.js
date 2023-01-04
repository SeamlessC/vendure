import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { AssetPickerDialogComponent, AssetPreviewDialogComponent, ModalService, } from '@vendure/admin-ui/core';
import { unique } from '@vendure/common/lib/unique';
/**
 * A component which displays the Assets, and allows assets to be removed and
 * added, and for the featured asset to be set.
 *
 * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
 * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
 */
export class AssetsComponent {
    constructor(modalService, changeDetector) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.compact = false;
        this.change = new EventEmitter();
        this.assets = [];
    }
    set assetsSetter(val) {
        // create a new non-readonly array of assets
        this.assets = (val || []).slice();
    }
    selectAssets() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
        })
            .subscribe(result => {
            if (result && result.length) {
                this.assets = unique(this.assets.concat(result), 'id');
                if (!this.featuredAsset) {
                    this.featuredAsset = result[0];
                }
                this.emitChangeEvent(this.assets, this.featuredAsset);
                this.changeDetector.markForCheck();
            }
        });
    }
    setAsFeatured(asset) {
        this.featuredAsset = asset;
        this.emitChangeEvent(this.assets, asset);
    }
    isFeatured(asset) {
        return !!this.featuredAsset && this.featuredAsset.id === asset.id;
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
    removeAsset(asset) {
        this.assets = this.assets.filter(a => a.id !== asset.id);
        if (this.featuredAsset && this.featuredAsset.id === asset.id) {
            this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
        }
        this.emitChangeEvent(this.assets, this.featuredAsset);
    }
    emitChangeEvent(assets, featuredAsset) {
        this.change.emit({
            assets,
            featuredAsset,
        });
    }
    dropListDropped(event) {
        moveItemInArray(this.assets, event.previousContainer.data, event.container.data);
        this.emitChangeEvent(this.assets, this.featuredAsset);
    }
}
AssetsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-assets',
                template: "<div class=\"card\" *ngIf=\"!compact; else compactView\">\n    <div class=\"card-img\">\n        <div class=\"featured-asset\">\n            <img\n                *ngIf=\"featuredAsset\"\n                [src]=\"featuredAsset | assetPreview:'small'\"\n                (click)=\"previewAsset(featuredAsset)\"\n            />\n            <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-featured-asset' | translate }}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-block\"><ng-container *ngTemplateOutlet=\"assetList\"></ng-container></div>\n    <div class=\"card-footer\" *vdrIfPermissions=\"updatePermissions\">\n        <button class=\"btn\" (click)=\"selectAssets()\">\n            <clr-icon shape=\"attachment\"></clr-icon>\n            {{ 'asset.add-asset' | translate }}\n        </button>\n    </div>\n</div>\n\n<ng-template #compactView>\n    <div class=\"featured-asset compact\">\n        <img\n            *ngIf=\"featuredAsset\"\n            [src]=\"featuredAsset | assetPreview:'thumb'\"\n            (click)=\"previewAsset(featuredAsset)\"\n        />\n\n        <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\"><clr-icon shape=\"image\" size=\"150\"></clr-icon></div>\n    </div>\n    <ng-container *ngTemplateOutlet=\"assetList\"></ng-container>\n    <button\n        *vdrIfPermissions=\"updatePermissions\"\n        class=\"compact-select btn btn-icon btn-sm btn-block\"\n        [title]=\"'asset.add-asset' | translate\"\n        (click)=\"selectAssets()\"\n    >\n        <clr-icon shape=\"attachment\"></clr-icon>\n        {{ 'asset.add-asset' | translate }}\n    </button>\n</ng-template>\n\n<ng-template #assetList>\n    <div class=\"all-assets\" [class.compact]=\"compact\" cdkDropListGroup>\n        <div\n            *ngFor=\"let asset of assets; let index = index\"\n            class=\"drop-list\"\n            cdkDropList\n            cdkDropListOrientation=\"horizontal\"\n            [cdkDropListData]=\"index\"\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            (cdkDropListDropped)=\"dropListDropped($event)\"\n        >\n            <vdr-dropdown cdkDrag>\n                <div\n                    class=\"asset-thumb\"\n                    vdrDropdownTrigger\n                    [class.featured]=\"isFeatured(asset)\"\n                    [title]=\"\"\n                    tabindex=\"0\"\n                >\n                    <img [src]=\"asset | assetPreview:'tiny'\" />\n                </div>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button type=\"button\" vdrDropdownItem (click)=\"previewAsset(asset)\">\n                        {{ 'asset.preview' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        [disabled]=\"isFeatured(asset) || !(updatePermissions | hasPermission)\"\n                        vdrDropdownItem\n                        (click)=\"setAsFeatured(asset)\"\n                    >\n                        {{ 'asset.set-as-featured-asset' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"remove-asset\"\n                        vdrDropdownItem\n                        [disabled]=\"!(updatePermissions | hasPermission)\"\n                        (click)=\"removeAsset(asset)\"\n                    >\n                        {{ 'asset.remove-asset' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:340px;display:block}:host.compact{width:162px}.placeholder{text-align:center;color:var(--color-grey-300)}.featured-asset{text-align:center;background:var(--color-component-bg-200);padding:6px;cursor:pointer;border-radius:var(--border-radius-img)}.featured-asset img{border-radius:var(--border-radius-img)}.featured-asset.compact{width:100%;min-height:40px;position:relative;padding:6px}.featured-asset .compact-select{position:absolute;bottom:6px;right:6px;margin:0}.all-assets{display:flex;flex-wrap:wrap}.all-assets .drop-list{min-width:60px}.all-assets .asset-thumb{margin:3px;padding:0;border:2px solid var(--color-component-border-100);border-radius:var(--border-radius-img);cursor:pointer}.all-assets .asset-thumb img{width:50px;height:50px;border-radius:var(--border-radius-img)}.all-assets .asset-thumb.featured{border-color:var(--color-primary-500);border-radius:calc(var(--border-radius-img) + 2px)}.all-assets .remove-asset{color:var(--color-warning-500)}.all-assets.compact .drop-list{min-width:54px}.all-assets.compact .asset-thumb{margin:1px;border-width:1px}.all-assets.compact .cdk-drag-placeholder{width:50px}.all-assets.compact .cdk-drag-placeholder .asset-thumb{width:50px}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.all-assets.cdk-drop-list-dragging vdr-dropdown:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging>*:not(.cdk-drag-placeholder){display:none}\n"]
            },] }
];
AssetsComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef }
];
AssetsComponent.propDecorators = {
    assetsSetter: [{ type: Input, args: ['assets',] }],
    featuredAsset: [{ type: Input }],
    compact: [{ type: HostBinding, args: ['class.compact',] }, { type: Input }],
    change: [{ type: Output }],
    updatePermissions: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NldHMvYXNzZXRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLDJCQUEyQixFQUMzQixZQUFZLEdBRWYsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFPcEQ7Ozs7OztHQU1HO0FBT0gsTUFBTSxPQUFPLGVBQWU7SUFpQnhCLFlBQW9CLFlBQTBCLEVBQVUsY0FBaUM7UUFBckUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFSekYsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNOLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBRTVDLFdBQU0sR0FBWSxFQUFFLENBQUM7SUFLZ0UsQ0FBQztJQWhCN0YsSUFBcUIsWUFBWSxDQUFDLEdBQVk7UUFDMUMsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQWVELFlBQVk7UUFDUixJQUFJLENBQUMsWUFBWTthQUNaLGFBQWEsQ0FBQywwQkFBMEIsRUFBRTtZQUN2QyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxN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Q2RrRHJhZ0Ryb3AsIG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFzc2V0LFxuICAgIEFzc2V0UGlja2VyRGlhbG9nQ29tcG9uZW50LFxuICAgIEFzc2V0UHJldmlld0RpYWxvZ0NvbXBvbmVudCxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgUGVybWlzc2lvbixcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyB1bmlxdWUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3VuaXF1ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRDaGFuZ2Uge1xuICAgIGFzc2V0czogQXNzZXRbXTtcbiAgICBmZWF0dXJlZEFzc2V0OiBBc3NldCB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB3aGljaCBkaXNwbGF5cyB0aGUgQXNzZXRzLCBhbmQgYWxsb3dzIGFzc2V0cyB0byBiZSByZW1vdmVkIGFuZFxuICogYWRkZWQsIGFuZCBmb3IgdGhlIGZlYXR1cmVkIGFzc2V0IHRvIGJlIHNldC5cbiAqXG4gKiBOb3RlOiByYXRoZXIgY29tcGxleCBjb2RlIGZvciBkcmFnIGRyb3AgaXMgZHVlIHRvIGEgbGltaXRhdGlvbiBvZiB0aGUgZGVmYXVsdCBDREsgaW1wbGVtZW50YXRpb25cbiAqIHdoaWNoIGlzIGFkZHJlc3NlZCBieSBhIHdvcmstYXJvdW5kIGZyb20gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTMzNzIjaXNzdWVjb21tZW50LTQ4Mzk5ODM3OFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NldHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hc3NldHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0cy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldHNDb21wb25lbnQge1xuICAgIEBJbnB1dCgnYXNzZXRzJykgc2V0IGFzc2V0c1NldHRlcih2YWw6IEFzc2V0W10pIHtcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IG5vbi1yZWFkb25seSBhcnJheSBvZiBhc3NldHNcbiAgICAgICAgdGhpcy5hc3NldHMgPSAodmFsIHx8IFtdKS5zbGljZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGZlYXR1cmVkQXNzZXQ6IEFzc2V0IHwgdW5kZWZpbmVkO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuY29tcGFjdCcpXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0ID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXNzZXRDaGFuZ2U+KCk7XG5cbiAgICBwdWJsaWMgYXNzZXRzOiBBc3NldFtdID0gW107XG5cbiAgICBASW5wdXQoKVxuICAgIHVwZGF0ZVBlcm1pc3Npb25zOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFBlcm1pc3Npb24gfCBQZXJtaXNzaW9uW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHNlbGVjdEFzc2V0cygpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEFzc2V0UGlja2VyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzID0gdW5pcXVlKHRoaXMuYXNzZXRzLmNvbmNhdChyZXN1bHQpLCAnaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZlYXR1cmVkQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZWRBc3NldCA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCh0aGlzLmFzc2V0cywgdGhpcy5mZWF0dXJlZEFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBc0ZlYXR1cmVkKGFzc2V0OiBBc3NldCkge1xuICAgICAgICB0aGlzLmZlYXR1cmVkQXNzZXQgPSBhc3NldDtcbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQodGhpcy5hc3NldHMsIGFzc2V0KTtcbiAgICB9XG5cbiAgICBpc0ZlYXR1cmVkKGFzc2V0OiBBc3NldCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmZlYXR1cmVkQXNzZXQgJiYgdGhpcy5mZWF0dXJlZEFzc2V0LmlkID09PSBhc3NldC5pZDtcbiAgICB9XG5cbiAgICBwcmV2aWV3QXNzZXQoYXNzZXQ6IEFzc2V0KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2FsczogeyBhc3NldCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVBc3NldChhc3NldDogQXNzZXQpIHtcbiAgICAgICAgdGhpcy5hc3NldHMgPSB0aGlzLmFzc2V0cy5maWx0ZXIoYSA9PiBhLmlkICE9PSBhc3NldC5pZCk7XG4gICAgICAgIGlmICh0aGlzLmZlYXR1cmVkQXNzZXQgJiYgdGhpcy5mZWF0dXJlZEFzc2V0LmlkID09PSBhc3NldC5pZCkge1xuICAgICAgICAgICAgdGhpcy5mZWF0dXJlZEFzc2V0ID0gdGhpcy5hc3NldHMubGVuZ3RoID4gMCA/IHRoaXMuYXNzZXRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KHRoaXMuYXNzZXRzLCB0aGlzLmZlYXR1cmVkQXNzZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdENoYW5nZUV2ZW50KGFzc2V0czogQXNzZXRbXSwgZmVhdHVyZWRBc3NldDogQXNzZXQgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBhc3NldHMsXG4gICAgICAgICAgICBmZWF0dXJlZEFzc2V0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcm9wTGlzdERyb3BwZWQoZXZlbnQ6IENka0RyYWdEcm9wPG51bWJlcj4pIHtcbiAgICAgICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMuYXNzZXRzLCBldmVudC5wcmV2aW91c0NvbnRhaW5lci5kYXRhLCBldmVudC5jb250YWluZXIuZGF0YSk7XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KHRoaXMuYXNzZXRzLCB0aGlzLmZlYXR1cmVkQXNzZXQpO1xuICAgIH1cbn1cbiJdfQ==
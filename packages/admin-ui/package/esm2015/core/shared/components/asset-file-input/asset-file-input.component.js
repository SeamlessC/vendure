import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { ServerConfigService } from '../../../data/server-config';
/**
 * A component for selecting files to upload as new Assets.
 */
export class AssetFileInputComponent {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
        /**
         * CSS selector of the DOM element which will be masked by the file
         * drop zone. Defaults to `body`.
         */
        this.dropZoneTarget = 'body';
        this.uploading = false;
        this.selectFiles = new EventEmitter();
        this.dragging = false;
        this.overDropZone = false;
        this.dropZoneStyle = {
            'width.px': 0,
            'height.px': 0,
            'top.px': 0,
            'left.px': 0,
        };
    }
    ngOnInit() {
        this.accept = this.serverConfig.serverConfig.permittedAssetTypes.join(',');
        this.fitDropZoneToTarget();
    }
    onDragEnter() {
        this.dragging = true;
        this.fitDropZoneToTarget();
    }
    // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
    onDragLeave(event) {
        if (!event.clientX && !event.clientY) {
            this.dragging = false;
        }
    }
    /**
     * Preventing this event is required to make dropping work.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
     */
    onDragOver(event) {
        event.preventDefault();
    }
    // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
    onDrop(event) {
        event.preventDefault();
        this.dragging = false;
        this.overDropZone = false;
        const files = Array.from(event.dataTransfer ? event.dataTransfer.items : [])
            .map(i => i.getAsFile())
            .filter(notNullOrUndefined);
        this.selectFiles.emit(files);
    }
    select(event) {
        const files = event.target.files;
        if (files) {
            this.selectFiles.emit(Array.from(files));
        }
    }
    fitDropZoneToTarget() {
        const target = document.querySelector(this.dropZoneTarget);
        if (target) {
            const rect = target.getBoundingClientRect();
            this.dropZoneStyle['width.px'] = rect.width;
            this.dropZoneStyle['height.px'] = rect.height;
            this.dropZoneStyle['top.px'] = rect.top;
            this.dropZoneStyle['left.px'] = rect.left;
        }
    }
}
AssetFileInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-file-input',
                template: "<input type=\"file\" class=\"file-input\" #fileInput (change)=\"select($event)\" multiple [accept]=\"accept\" />\n<button class=\"btn btn-primary\" (click)=\"fileInput.click()\" [disabled]=\"uploading\">\n    <ng-container *ngIf=\"uploading; else selectable\">\n        <clr-spinner clrInline></clr-spinner>\n        {{ 'asset.uploading' | translate }}\n    </ng-container>\n    <ng-template #selectable>\n        <clr-icon shape=\"upload-cloud\"></clr-icon>\n        {{ 'asset.upload-assets' | translate }}\n    </ng-template>\n</button>\n<div\n    class=\"drop-zone\"\n    [ngStyle]=\"dropZoneStyle\"\n    [class.visible]=\"dragging\"\n    [class.dragging-over]=\"overDropZone\"\n    (dragenter)=\"overDropZone = true\"\n    (dragleave)=\"overDropZone = false\"\n    (dragover)=\"onDragOver($event)\"\n    (drop)=\"onDrop($event)\"\n    #dropZone\n>\n    <div class=\"drop-label\" (dragenter)=\"overDropZone = true\">\n        <clr-icon shape=\"upload-cloud\" size=\"32\"></clr-icon>\n        {{ 'catalog.drop-files-to-upload' | translate }}\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".file-input{display:none}.drop-zone{position:fixed;background-color:var(--color-primary-500);border:3px dashed var(--color-component-border-300);opacity:0;visibility:hidden;z-index:1000;transition:opacity .2s,background-color .2s,visibility 0s .2s;display:flex;align-items:center;justify-content:center}.drop-zone.visible{opacity:.3;visibility:visible;transition:opacity .2s,background-color .2s,border .2s,visibility 0s}.drop-zone .drop-label{background-color:#fffc;border-radius:3px;padding:24px;font-size:32px;pointer-events:none;opacity:.5;transition:opacity .2s}.drop-zone.dragging-over{border-color:#fff;background-color:var(--color-primary-500);opacity:.7;transition:background-color .2s,border .2s}.drop-zone.dragging-over .drop-label{opacity:1}\n"]
            },] }
];
AssetFileInputComponent.ctorParameters = () => [
    { type: ServerConfigService }
];
AssetFileInputComponent.propDecorators = {
    dropZoneTarget: [{ type: Input }],
    uploading: [{ type: Input }],
    selectFiles: [{ type: Output }],
    onDragEnter: [{ type: HostListener, args: ['document:dragenter',] }],
    onDragLeave: [{ type: HostListener, args: ['document:dragleave', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LWZpbGUtaW5wdXQvYXNzZXQtZmlsZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWxFOztHQUVHO0FBT0gsTUFBTSxPQUFPLHVCQUF1QjtJQWtCaEMsWUFBb0IsWUFBaUM7UUFBakMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBakJyRDs7O1dBR0c7UUFDTSxtQkFBYyxHQUFHLE1BQU0sQ0FBQztRQUN4QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUc7WUFDWixVQUFVLEVBQUUsQ0FBQztZQUNiLFdBQVcsRUFBRSxDQUFDO1lBQ2QsUUFBUSxFQUFFLENBQUM7WUFDWCxTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUM7SUFHc0QsQ0FBQztJQUV6RCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsa0dBQWtHO0lBRWxHLFdBQVcsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsS0FBVTtRQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxNQUFNLENBQUMsS0FBVTtRQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFtQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3pGLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN2QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVk7UUFDZixNQUFNLEtBQUssR0FBSSxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFDdkQsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRU8sbUJBQW1CO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBZ0IsQ0FBQztRQUMxRSxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM3QztJQUNMLENBQUM7OztZQWhGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMscWpDQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFWUSxtQkFBbUI7Ozs2QkFnQnZCLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxNQUFNOzBCQWtCTixZQUFZLFNBQUMsb0JBQW9COzBCQU9qQyxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuXG5pbXBvcnQgeyBTZXJ2ZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9zZXJ2ZXItY29uZmlnJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCBmb3Igc2VsZWN0aW5nIGZpbGVzIHRvIHVwbG9hZCBhcyBuZXcgQXNzZXRzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NldC1maWxlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtZmlsZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtZmlsZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldEZpbGVJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqXG4gICAgICogQ1NTIHNlbGVjdG9yIG9mIHRoZSBET00gZWxlbWVudCB3aGljaCB3aWxsIGJlIG1hc2tlZCBieSB0aGUgZmlsZVxuICAgICAqIGRyb3Agem9uZS4gRGVmYXVsdHMgdG8gYGJvZHlgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bab25lVGFyZ2V0ID0gJ2JvZHknO1xuICAgIEBJbnB1dCgpIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RGaWxlcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgb3ZlckRyb3Bab25lID0gZmFsc2U7XG4gICAgZHJvcFpvbmVTdHlsZSA9IHtcbiAgICAgICAgJ3dpZHRoLnB4JzogMCxcbiAgICAgICAgJ2hlaWdodC5weCc6IDAsXG4gICAgICAgICd0b3AucHgnOiAwLFxuICAgICAgICAnbGVmdC5weCc6IDAsXG4gICAgfTtcbiAgICBhY2NlcHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmVyQ29uZmlnOiBTZXJ2ZXJDb25maWdTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYWNjZXB0ID0gdGhpcy5zZXJ2ZXJDb25maWcuc2VydmVyQ29uZmlnLnBlcm1pdHRlZEFzc2V0VHlwZXMuam9pbignLCcpO1xuICAgICAgICB0aGlzLmZpdERyb3Bab25lVG9UYXJnZXQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpkcmFnZW50ZXInKVxuICAgIG9uRHJhZ0VudGVyKCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maXREcm9wWm9uZVRvVGFyZ2V0KCk7XG4gICAgfVxuXG4gICAgLy8gRHJhZ0V2ZW50IGlzIG5vdCBzdXBwb3J0ZWQgaW4gU2FmYXJpLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZlbmR1cmUtZWNvbW1lcmNlL3ZlbmR1cmUvcHVsbC8yODRcbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCFldmVudC5jbGllbnRYICYmICFldmVudC5jbGllbnRZKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmV2ZW50aW5nIHRoaXMgZXZlbnQgaXMgcmVxdWlyZWQgdG8gbWFrZSBkcm9wcGluZyB3b3JrLlxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTF9EcmFnX2FuZF9Ecm9wX0FQSSNEZWZpbmVfYV9kcm9wX3pvbmVcbiAgICAgKi9cbiAgICBvbkRyYWdPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBEcmFnRXZlbnQgaXMgbm90IHN1cHBvcnRlZCBpbiBTYWZhcmksIHNlZSBodHRwczovL2dpdGh1Yi5jb20vdmVuZHVyZS1lY29tbWVyY2UvdmVuZHVyZS9wdWxsLzI4NFxuICAgIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vdmVyRHJvcFpvbmUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tPERhdGFUcmFuc2Zlckl0ZW0+KGV2ZW50LmRhdGFUcmFuc2ZlciA/IGV2ZW50LmRhdGFUcmFuc2Zlci5pdGVtcyA6IFtdKVxuICAgICAgICAgICAgLm1hcChpID0+IGkuZ2V0QXNGaWxlKCkpXG4gICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RmlsZXMuZW1pdChmaWxlcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCBmaWxlcyA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuZmlsZXM7XG4gICAgICAgIGlmIChmaWxlcykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RGaWxlcy5lbWl0KEFycmF5LmZyb20oZmlsZXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZml0RHJvcFpvbmVUb1RhcmdldCgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRyb3Bab25lVGFyZ2V0KSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcFpvbmVTdHlsZVsnd2lkdGgucHgnXSA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmRyb3Bab25lU3R5bGVbJ2hlaWdodC5weCddID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmRyb3Bab25lU3R5bGVbJ3RvcC5weCddID0gcmVjdC50b3A7XG4gICAgICAgICAgICB0aGlzLmRyb3Bab25lU3R5bGVbJ2xlZnQucHgnXSA9IHJlY3QubGVmdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
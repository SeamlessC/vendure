import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ContextMenuService } from './context-menu.service';
export class ContextMenuComponent {
    constructor(overlay, viewContainerRef, contextMenuService) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.contextMenuService = contextMenuService;
        this.triggerIsHidden = new BehaviorSubject(false);
        this.onScroll = () => {
            var _a;
            if ((_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.hasAttached()) {
                this.overlayRef.updatePosition();
            }
        };
    }
    ngAfterViewInit() {
        var _a;
        this.contentArea = document.querySelector('.content-area');
        this.menuPortal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
        this.hideTrigger$ = this.triggerIsHidden.asObservable().pipe(distinctUntilChanged());
        (_a = this.contentArea) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.onScroll, { passive: true });
        this.contextMenuSub = this.contextMenuService.contextMenu$.subscribe(contextMenuConfig => {
            var _a, _b, _c;
            (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
            this.menuConfig = contextMenuConfig;
            if (contextMenuConfig) {
                this.overlayRef = this.overlay.create({
                    hasBackdrop: false,
                    positionStrategy: this.getPositionStrategy(contextMenuConfig.element),
                    maxHeight: '70vh',
                });
                this.overlayRef.attach(this.menuPortal);
                this.triggerIsHidden.next(false);
                const triggerButton = this.overlayRef.hostElement.querySelector('.context-menu-trigger');
                const editorMenu = this.editorMenuElement;
                if (triggerButton) {
                    const overlapMarginPx = 5;
                    this.hideTriggerHandler = () => {
                        if (editorMenu && triggerButton) {
                            if (triggerButton.getBoundingClientRect().top + overlapMarginPx <
                                editorMenu.getBoundingClientRect().bottom) {
                                this.triggerIsHidden.next(true);
                            }
                            else {
                                this.triggerIsHidden.next(false);
                            }
                        }
                    };
                    (_b = this.contentArea) === null || _b === void 0 ? void 0 : _b.addEventListener('scroll', this.hideTriggerHandler, { passive: true });
                    requestAnimationFrame(() => { var _a; return (_a = this.hideTriggerHandler) === null || _a === void 0 ? void 0 : _a.call(this); });
                }
            }
            else {
                if (this.hideTriggerHandler) {
                    (_c = this.contentArea) === null || _c === void 0 ? void 0 : _c.removeEventListener('scroll', this.hideTriggerHandler);
                }
            }
        });
    }
    triggerClick() {
        this.contextMenuService.setVisibility(true);
    }
    ngOnDestroy() {
        var _a, _b, _c, _d;
        (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this.contextMenuSub) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.contentArea) === null || _c === void 0 ? void 0 : _c.removeEventListener('scroll', this.onScroll);
        if (this.hideTriggerHandler) {
            (_d = this.contentArea) === null || _d === void 0 ? void 0 : _d.removeEventListener('scroll', this.hideTriggerHandler);
        }
    }
    clickItem(item) {
        item.onClick();
    }
    getPositionStrategy(element) {
        const position = {
            ['top-left']: {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            ['top-right']: {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
            ['bottom-left']: {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            ['bottom-right']: {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
        };
        const pos = position['top-left'];
        return this.overlay
            .position()
            .flexibleConnectedTo(element)
            .withPositions([pos, this.invertPosition(pos)])
            .withViewportMargin(0)
            .withLockedPosition(false)
            .withPush(false);
    }
    /** Inverts an overlay position. */
    invertPosition(pos) {
        const inverted = Object.assign({}, pos);
        inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
        inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
        return inverted;
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-context-menu',
                template: "<ng-template #contextMenu>\n    <vdr-dropdown>\n        <button class=\"context-menu-trigger\" vdrDropdownTrigger [class.hidden]=\"hideTrigger$ | async\" (click)=\"triggerClick()\">\n            <clr-icon\n                *ngIf=\"menuConfig?.iconShape as shape\"\n                [attr.shape]=\"shape\"\n                size=\"16\"\n                class=\"mr2\"\n            ></clr-icon>\n            <span class=\"title-label\">{{ menuConfig?.title }}</span>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\" customClasses=\"context-menu\">\n            <ng-container *ngFor=\"let item of menuConfig?.items\">\n                <button\n                    class=\"context-menu-item\"\n                    *ngIf=\"item.enabled && item.separator !== true\"\n                    type=\"button\"\n                    (click)=\"clickItem(item)\"\n                >\n                    <div *ngIf=\"item.iconClass\" class=\"cm-icon\" [ngClass]=\"item.iconClass\"></div>\n                    <clr-icon\n                        *ngIf=\"item.iconShape as shape\"\n                        [attr.shape]=\"shape\"\n                        size=\"16\"\n                        class=\"mr2\"\n                    ></clr-icon>\n                    {{ item.label }}\n                </button>\n                <div *ngIf=\"item.enabled && item.separator\" class=\"dropdown-divider\" role=\"separator\"></div>\n            </ng-container>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".context-menu-trigger{margin:0;display:flex;align-items:center;border:1px solid var(--color-component-border-200);font-size:90%;color:var(--color-text-200);border-radius:var(--border-radius-input);background-color:var(--color-component-bg-100)}.title-label{padding-right:15px;position:relative}.title-label:after{content:\"\";border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid currentColor;opacity:.6;position:absolute;right:4px;top:calc(50% - 2px)}.context-menu-item{display:flex;align-items:center;width:100%;text-align:start;font-size:90%;color:var(--color-text-200);background-color:var(--color-component-bg-100);cursor:pointer;border:none}.context-menu-item:hover{background-color:var(--color-component-bg-200)}::ng-deep .dropdown-menu.context-menu{padding:0;background-color:var(--color-component-bg-100)}::ng-deep .context-menu-trigger{min-height:16px}::ng-deep .context-menu-trigger.hidden{visibility:hidden}::ng-deep .cm-icon.add-column{height:14px;width:4px;border:1px solid;margin:0 6px 0 8px;position:relative}::ng-deep .cm-icon.add-column:before{content:\"+\";position:absolute;font-size:16px;line-height:14px;left:-10px}::ng-deep .cm-icon.add-row{height:4px;width:14px;border:1px solid;margin:6px 4px 2px 0;position:relative}::ng-deep .cm-icon.add-row:before{content:\"+\";position:absolute;font-size:16px;line-height:14px;left:-2px;top:-10px}\n"]
            },] }
];
ContextMenuComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: ContextMenuService }
];
ContextMenuComponent.propDecorators = {
    editorMenuElement: [{ type: Input }],
    menuTemplate: [{ type: ViewChild, args: ['contextMenu', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcmljaC10ZXh0LWVkaXRvci9wcm9zZW1pcnJvci9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLE9BQU8sRUFBZ0MsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVCxnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFzQyxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBVWhHLE1BQU0sT0FBTyxvQkFBb0I7SUFhN0IsWUFDWSxPQUFnQixFQUNoQixnQkFBa0MsRUFDbkMsa0JBQXNDO1FBRnJDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBVnpDLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFhOUQsYUFBUSxHQUFHLEdBQUcsRUFBRTs7WUFDWixJQUFJLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsV0FBVyxFQUFFLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDcEM7UUFDTCxDQUFDLENBQUM7SUFOQyxDQUFDO0lBUUosZUFBZTs7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QUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQyxPQUFPO2FBQ2QsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2FBQzVCLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2FBQ3JCLGtCQUFrQixDQUFDLEtBQUssQ0FBQzthQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELG1DQUFtQztJQUMzQixjQUFjLENBQUMsR0FBc0I7UUFDekMsTUFBTSxRQUFRLHFCQUFRLEdBQUcsQ0FBRSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRTlELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7OztZQTVJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMi9DQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUF4QjJCLE9BQU87WUFVL0IsZ0JBQWdCO1lBS3lCLGtCQUFrQjs7O2dDQVcxRCxLQUFLOzJCQUNMLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGVkUG9zaXRpb24sIE92ZXJsYXksIE92ZXJsYXlSZWYsIFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDb250ZXh0TWVudUNvbmZpZywgQ29udGV4dE1lbnVJdGVtLCBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcblxudHlwZSBEcm9wZG93blBvc2l0aW9uID0gJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jb250ZXh0LW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbnRleHQtbWVudS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgZWRpdG9yTWVudUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBAVmlld0NoaWxkKCdjb250ZXh0TWVudScsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgbWVudVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbWVudUNvbmZpZzogQ29udGV4dE1lbnVDb25maWcgfCB1bmRlZmluZWQ7XG4gICAgaGlkZVRyaWdnZXIkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHByaXZhdGUgdHJpZ2dlcklzSGlkZGVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcHJpdmF0ZSBtZW51UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxhbnk+O1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U3ViOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBjb250ZW50QXJlYTogSFRNTERpdkVsZW1lbnQgfCBudWxsO1xuICAgIHByaXZhdGUgaGlkZVRyaWdnZXJIYW5kbGVyOiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHB1YmxpYyBjb250ZXh0TWVudVNlcnZpY2U6IENvbnRleHRNZW51U2VydmljZSxcbiAgICApIHt9XG5cbiAgICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZj8uaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtYXJlYScpO1xuICAgICAgICB0aGlzLm1lbnVQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5tZW51VGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG5cbiAgICAgICAgdGhpcy5oaWRlVHJpZ2dlciQgPSB0aGlzLnRyaWdnZXJJc0hpZGRlbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgICAgICB0aGlzLmNvbnRlbnRBcmVhPy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVN1YiA9IHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmNvbnRleHRNZW51JC5zdWJzY3JpYmUoY29udGV4dE1lbnVDb25maWcgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmPy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm1lbnVDb25maWcgPSBjb250ZXh0TWVudUNvbmZpZztcbiAgICAgICAgICAgIGlmIChjb250ZXh0TWVudUNvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneShjb250ZXh0TWVudUNvbmZpZy5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLm1lbnVQb3J0YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcklzSGlkZGVuLm5leHQoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlckJ1dHRvbiA9IHRoaXMub3ZlcmxheVJlZi5ob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGV4dC1tZW51LXRyaWdnZXInKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3JNZW51ID0gdGhpcy5lZGl0b3JNZW51RWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlckJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdmVybGFwTWFyZ2luUHggPSA1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUcmlnZ2VySGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlZGl0b3JNZW51ICYmIHRyaWdnZXJCdXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgb3ZlcmxhcE1hcmdpblB4IDxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yTWVudS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VySXNIaWRkZW4ubmV4dCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJJc0hpZGRlbi5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEFyZWE/LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGlkZVRyaWdnZXJIYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmhpZGVUcmlnZ2VySGFuZGxlcj8uKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZVRyaWdnZXJIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEFyZWE/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGlkZVRyaWdnZXJIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyaWdnZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2Uuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmPy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVTdWI/LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY29udGVudEFyZWE/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgICAgICBpZiAodGhpcy5oaWRlVHJpZ2dlckhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEFyZWE/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGlkZVRyaWdnZXJIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrSXRlbShpdGVtOiBDb250ZXh0TWVudUl0ZW0pIHtcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvblN0cmF0ZWd5KGVsZW1lbnQ6IEVsZW1lbnQpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IHsgW0sgaW4gRHJvcGRvd25Qb3NpdGlvbl06IENvbm5lY3RlZFBvc2l0aW9uIH0gPSB7XG4gICAgICAgICAgICBbJ3RvcC1sZWZ0J106IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbJ3RvcC1yaWdodCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbJ2JvdHRvbS1sZWZ0J106IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbJ2JvdHRvbS1yaWdodCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25bJ3RvcC1sZWZ0J107XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVxuICAgICAgICAgICAgLnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKGVsZW1lbnQpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbcG9zLCB0aGlzLmludmVydFBvc2l0aW9uKHBvcyldKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbigwKVxuICAgICAgICAgICAgLndpdGhMb2NrZWRQb3NpdGlvbihmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUHVzaChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqIEludmVydHMgYW4gb3ZlcmxheSBwb3NpdGlvbi4gKi9cbiAgICBwcml2YXRlIGludmVydFBvc2l0aW9uKHBvczogQ29ubmVjdGVkUG9zaXRpb24pOiBDb25uZWN0ZWRQb3NpdGlvbiB7XG4gICAgICAgIGNvbnN0IGludmVydGVkID0geyAuLi5wb3MgfTtcbiAgICAgICAgaW52ZXJ0ZWQub3JpZ2luWSA9IHBvcy5vcmlnaW5ZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICAgIGludmVydGVkLm92ZXJsYXlZID0gcG9zLm92ZXJsYXlZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG5cbiAgICAgICAgcmV0dXJuIGludmVydGVkO1xuICAgIH1cbn1cbiJdfQ==
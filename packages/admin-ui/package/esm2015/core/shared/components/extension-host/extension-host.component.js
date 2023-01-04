import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ExtensionHostService } from './extension-host.service';
/**
 * This component uses an iframe to embed an external url into the Admin UI, and uses the PostMessage
 * protocol to allow cross-frame communication between the two frames.
 */
export class ExtensionHostComponent {
    constructor(route, sanitizer, extensionHostService) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.extensionHostService = extensionHostService;
        this.openInIframe = true;
        this.extensionWindowIsOpen = false;
    }
    ngOnInit() {
        const { data } = this.route.snapshot;
        if (!this.isExtensionHostConfig(data.extensionHostConfig)) {
            throw new Error(`Expected an ExtensionHostConfig object, got ${JSON.stringify(data.extensionHostConfig)}`);
        }
        this.config = data.extensionHostConfig;
        this.openInIframe = !this.config.openInNewTab;
        this.extensionUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.extensionUrl || 'about:blank');
    }
    ngAfterViewInit() {
        if (this.openInIframe) {
            const extensionWindow = this.extensionFrame.nativeElement.contentWindow;
            if (extensionWindow) {
                this.extensionHostService.init(extensionWindow, this.route.snapshot);
            }
        }
    }
    ngOnDestroy() {
        if (this.extensionWindow) {
            this.extensionWindow.close();
        }
    }
    launchExtensionWindow() {
        const extensionWindow = window.open(this.config.extensionUrl);
        if (!extensionWindow) {
            return;
        }
        this.extensionHostService.init(extensionWindow, this.route.snapshot);
        this.extensionWindowIsOpen = true;
        this.extensionWindow = extensionWindow;
        let timer;
        function pollWindowState(extwindow, onClosed) {
            if (extwindow.closed) {
                window.clearTimeout(timer);
                onClosed();
            }
            else {
                timer = window.setTimeout(() => pollWindowState(extwindow, onClosed), 250);
            }
        }
        pollWindowState(extensionWindow, () => {
            this.extensionWindowIsOpen = false;
            this.extensionHostService.destroy();
        });
    }
    isExtensionHostConfig(input) {
        return input.hasOwnProperty('extensionUrl');
    }
}
ExtensionHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-extension-host',
                template: "<ng-template [ngIf]=\"openInIframe\" [ngIfElse]=\"launchExtension\">\n    <iframe [src]=\"extensionUrl\" #extensionFrame></iframe>\n</ng-template>\n<ng-template #launchExtension>\n    <div class=\"launch-button\" [class.launched]=\"extensionWindowIsOpen\">\n        <div>\n            <button\n                class=\"btn btn-lg btn-primary\"\n                [disabled]=\"extensionWindowIsOpen\"\n                (click)=\"launchExtensionWindow()\"\n            >\n                <clr-icon shape=\"pop-out\"></clr-icon>\n                {{ 'common.launch-extension' | translate }}\n            </button>\n            <h3 class=\"window-hint\" [class.visible]=\"extensionWindowIsOpen\">\n                {{ 'common.extension-running-in-separate-window' | translate }}\n            </h3>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [ExtensionHostService],
                styles: ["iframe{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none}.launch-button{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none;padding:24px;display:flex;align-items:center;justify-content:center;transition:background-color .3s;text-align:center}.launch-button.launched{background-color:var(--color-component-bg-300)}.window-hint{visibility:hidden;opacity:0;transition:visibility .3s 0,opacity .3s}.window-hint.visible{visibility:visible;opacity:1;transition:visibility 0,opacity .3s}\n"]
            },] }
];
ExtensionHostComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: DomSanitizer },
    { type: ExtensionHostService }
];
ExtensionHostComponent.propDecorators = {
    extensionFrame: [{ type: ViewChild, args: ['extensionFrame',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLWhvc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9leHRlbnNpb24taG9zdC9leHRlbnNpb24taG9zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBSVQsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFOzs7R0FHRztBQVFILE1BQU0sT0FBTyxzQkFBc0I7SUFRL0IsWUFDWSxLQUFxQixFQUNyQixTQUF1QixFQUN2QixvQkFBMEM7UUFGMUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBVHRELGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQVMzQixDQUFDO0lBRUosUUFBUTtRQUNKLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0NBQStDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FDNUYsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksYUFBYSxDQUM1QyxDQUFDO0lBQ04sQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQ3hFLElBQUksZUFBZSxFQUFFO2dCQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0o7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtRQUNqQixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFFdkMsSUFBSSxLQUFhLENBQUM7UUFDbEIsU0FBUyxlQUFlLENBQUMsU0FBaUIsRUFBRSxRQUFvQjtZQUM1RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM5RTtRQUNMLENBQUM7UUFFRCxlQUFlLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFVO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7WUE3RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDYwQkFBOEM7Z0JBRTlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzs7YUFDcEM7OztZQWZRLGNBQWM7WUFEZCxZQUFZO1lBSVosb0JBQW9COzs7NkJBbUJ4QixTQUFTLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEV4dGVuc2lvbkhvc3RDb25maWcgfSBmcm9tICcuL2V4dGVuc2lvbi1ob3N0LWNvbmZpZyc7XG5pbXBvcnQgeyBFeHRlbnNpb25Ib3N0U2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLWhvc3Quc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgdXNlcyBhbiBpZnJhbWUgdG8gZW1iZWQgYW4gZXh0ZXJuYWwgdXJsIGludG8gdGhlIEFkbWluIFVJLCBhbmQgdXNlcyB0aGUgUG9zdE1lc3NhZ2VcbiAqIHByb3RvY29sIHRvIGFsbG93IGNyb3NzLWZyYW1lIGNvbW11bmljYXRpb24gYmV0d2VlbiB0aGUgdHdvIGZyYW1lcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZXh0ZW5zaW9uLWhvc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9leHRlbnNpb24taG9zdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXh0ZW5zaW9uLWhvc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gICAgcHJvdmlkZXJzOiBbRXh0ZW5zaW9uSG9zdFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25Ib3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIGV4dGVuc2lvblVybDogU2FmZVJlc291cmNlVXJsO1xuICAgIG9wZW5JbklmcmFtZSA9IHRydWU7XG4gICAgZXh0ZW5zaW9uV2luZG93SXNPcGVuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjb25maWc6IEV4dGVuc2lvbkhvc3RDb25maWc7XG4gICAgcHJpdmF0ZSBleHRlbnNpb25XaW5kb3c/OiBXaW5kb3c7XG4gICAgQFZpZXdDaGlsZCgnZXh0ZW5zaW9uRnJhbWUnKSBwcml2YXRlIGV4dGVuc2lvbkZyYW1lOiBFbGVtZW50UmVmPEhUTUxJRnJhbWVFbGVtZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgcHJpdmF0ZSBleHRlbnNpb25Ib3N0U2VydmljZTogRXh0ZW5zaW9uSG9zdFNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5yb3V0ZS5zbmFwc2hvdDtcbiAgICAgICAgaWYgKCF0aGlzLmlzRXh0ZW5zaW9uSG9zdENvbmZpZyhkYXRhLmV4dGVuc2lvbkhvc3RDb25maWcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEV4cGVjdGVkIGFuIEV4dGVuc2lvbkhvc3RDb25maWcgb2JqZWN0LCBnb3QgJHtKU09OLnN0cmluZ2lmeShkYXRhLmV4dGVuc2lvbkhvc3RDb25maWcpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnID0gZGF0YS5leHRlbnNpb25Ib3N0Q29uZmlnO1xuICAgICAgICB0aGlzLm9wZW5JbklmcmFtZSA9ICF0aGlzLmNvbmZpZy5vcGVuSW5OZXdUYWI7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXJsID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuZXh0ZW5zaW9uVXJsIHx8ICdhYm91dDpibGFuaycsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuSW5JZnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbldpbmRvdyA9IHRoaXMuZXh0ZW5zaW9uRnJhbWUubmF0aXZlRWxlbWVudC5jb250ZW50V2luZG93O1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbldpbmRvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uSG9zdFNlcnZpY2UuaW5pdChleHRlbnNpb25XaW5kb3csIHRoaXMucm91dGUuc25hcHNob3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV4dGVuc2lvbldpbmRvdykge1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhdW5jaEV4dGVuc2lvbldpbmRvdygpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uV2luZG93ID0gd2luZG93Lm9wZW4odGhpcy5jb25maWcuZXh0ZW5zaW9uVXJsKTtcbiAgICAgICAgaWYgKCFleHRlbnNpb25XaW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4dGVuc2lvbkhvc3RTZXJ2aWNlLmluaXQoZXh0ZW5zaW9uV2luZG93LCB0aGlzLnJvdXRlLnNuYXBzaG90KTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25XaW5kb3dJc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbldpbmRvdyA9IGV4dGVuc2lvbldpbmRvdztcblxuICAgICAgICBsZXQgdGltZXI6IG51bWJlcjtcbiAgICAgICAgZnVuY3Rpb24gcG9sbFdpbmRvd1N0YXRlKGV4dHdpbmRvdzogV2luZG93LCBvbkNsb3NlZDogKCkgPT4gdm9pZCkge1xuICAgICAgICAgICAgaWYgKGV4dHdpbmRvdy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICBvbkNsb3NlZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHBvbGxXaW5kb3dTdGF0ZShleHR3aW5kb3csIG9uQ2xvc2VkKSwgMjUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBvbGxXaW5kb3dTdGF0ZShleHRlbnNpb25XaW5kb3csICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uV2luZG93SXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmV4dGVuc2lvbkhvc3RTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0V4dGVuc2lvbkhvc3RDb25maWcoaW5wdXQ6IGFueSk6IGlucHV0IGlzIEV4dGVuc2lvbkhvc3RDb25maWcge1xuICAgICAgICByZXR1cm4gaW5wdXQuaGFzT3duUHJvcGVydHkoJ2V4dGVuc2lvblVybCcpO1xuICAgIH1cbn1cbiJdfQ==
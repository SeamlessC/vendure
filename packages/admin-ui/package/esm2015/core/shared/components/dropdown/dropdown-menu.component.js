import { Overlay, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
/**
 * A dropdown menu modelled on the Clarity Dropdown component (https://v1.clarity.design/dropdowns).
 *
 * This was created because the Clarity implementation (at this time) does not handle edge detection. Instead
 * we make use of the Angular CDK's Overlay module to manage the positioning.
 *
 * The API of this component (and its related Components & Directives) are based on the Clarity version,
 * albeit only a subset which is currently used in this application.
 */
export class DropdownMenuComponent {
    constructor(overlay, viewContainerRef, dropdown) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dropdown = dropdown;
        this.position = 'bottom-left';
    }
    ngOnInit() {
        this.dropdown.onOpenChange(isOpen => {
            if (isOpen) {
                this.overlayRef.attach(this.menuPortal);
            }
            else {
                this.overlayRef.detach();
            }
        });
    }
    ngAfterViewInit() {
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'clear-backdrop',
            positionStrategy: this.getPositionStrategy(),
            maxHeight: '70vh',
        });
        this.menuPortal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
        this.backdropClickSub = this.overlayRef.backdropClick().subscribe(() => {
            this.dropdown.toggleOpen();
        });
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        if (this.backdropClickSub) {
            this.backdropClickSub.unsubscribe();
        }
    }
    getPositionStrategy() {
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
        const pos = position[this.position];
        return this.overlay
            .position()
            .flexibleConnectedTo(this.dropdown.trigger)
            .withPositions([pos, this.invertPosition(pos)])
            .withViewportMargin(12)
            .withPush(true);
    }
    /** Inverts an overlay position. */
    invertPosition(pos) {
        const inverted = Object.assign({}, pos);
        inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
        inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
        return inverted;
    }
}
DropdownMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown-menu',
                template: `
        <ng-template #menu>
            <div class="dropdown open">
                <div class="dropdown-menu" [ngClass]="customClasses">
                    <div class="dropdown-content-wrapper">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clear-backdrop{background-color:#ff69b4}::ng-deep .dropdown-menu .dropdown-item{display:flex;align-items:center}::ng-deep .dropdown-menu .dropdown-item clr-icon{margin-right:3px}.dropdown.open>.dropdown-menu{position:relative;top:0;height:100%;overflow-y:auto}:host{opacity:1;transition:opacity .3s}\n"]
            },] }
];
DropdownMenuComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: DropdownComponent }
];
DropdownMenuComponent.propDecorators = {
    position: [{ type: Input, args: ['vdrPosition',] }],
    customClasses: [{ type: Input }],
    menuTemplate: [{ type: ViewChild, args: ['menu', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHSCxPQUFPLEdBSVYsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBR1QsS0FBSyxFQUlMLFNBQVMsRUFDVCxnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJekQ7Ozs7Ozs7O0dBUUc7QUFpQkgsTUFBTSxPQUFPLHFCQUFxQjtJQVE5QixZQUNZLE9BQWdCLEVBQ2hCLGdCQUFrQyxFQUNsQyxRQUEyQjtRQUYzQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFWVCxhQUFRLEdBQXFCLGFBQWEsQ0FBQztJQVd0RSxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxN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S0FBSyxTQUFDLGFBQWE7NEJBQ25CLEtBQUs7MkJBQ0wsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbm5lY3RlZFBvc2l0aW9uLFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheVJlZixcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRHJvcGRvd25UcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi10cmlnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcblxuZXhwb3J0IHR5cGUgRHJvcGRvd25Qb3NpdGlvbiA9ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JztcblxuLyoqXG4gKiBBIGRyb3Bkb3duIG1lbnUgbW9kZWxsZWQgb24gdGhlIENsYXJpdHkgRHJvcGRvd24gY29tcG9uZW50IChodHRwczovL3YxLmNsYXJpdHkuZGVzaWduL2Ryb3Bkb3ducykuXG4gKlxuICogVGhpcyB3YXMgY3JlYXRlZCBiZWNhdXNlIHRoZSBDbGFyaXR5IGltcGxlbWVudGF0aW9uIChhdCB0aGlzIHRpbWUpIGRvZXMgbm90IGhhbmRsZSBlZGdlIGRldGVjdGlvbi4gSW5zdGVhZFxuICogd2UgbWFrZSB1c2Ugb2YgdGhlIEFuZ3VsYXIgQ0RLJ3MgT3ZlcmxheSBtb2R1bGUgdG8gbWFuYWdlIHRoZSBwb3NpdGlvbmluZy5cbiAqXG4gKiBUaGUgQVBJIG9mIHRoaXMgY29tcG9uZW50IChhbmQgaXRzIHJlbGF0ZWQgQ29tcG9uZW50cyAmIERpcmVjdGl2ZXMpIGFyZSBiYXNlZCBvbiB0aGUgQ2xhcml0eSB2ZXJzaW9uLFxuICogYWxiZWl0IG9ubHkgYSBzdWJzZXQgd2hpY2ggaXMgY3VycmVudGx5IHVzZWQgaW4gdGhpcyBhcHBsaWNhdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZHJvcGRvd24tbWVudScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNtZW51PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIG9wZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIFtuZ0NsYXNzXT1cImN1c3RvbUNsYXNzZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24tbWVudS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCd2ZHJQb3NpdGlvbicpIHByaXZhdGUgcG9zaXRpb246IERyb3Bkb3duUG9zaXRpb24gPSAnYm90dG9tLWxlZnQnO1xuICAgIEBJbnB1dCgpIGN1c3RvbUNsYXNzZXM6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKCdtZW51JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtZW51VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgcHJpdmF0ZSBtZW51UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxhbnk+O1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIGJhY2tkcm9wQ2xpY2tTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBkcm9wZG93bjogRHJvcGRvd25Db21wb25lbnQsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ub25PcGVuQ2hhbmdlKGlzT3BlbiA9PiB7XG4gICAgICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLm1lbnVQb3J0YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjbGVhci1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tZW51UG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubWVudVRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wQ2xpY2tTdWIgPSB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnRvZ2dsZU9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3BDbGlja1N1Yikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcENsaWNrU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiB7IFtLIGluIERyb3Bkb3duUG9zaXRpb25dOiBDb25uZWN0ZWRQb3NpdGlvbiB9ID0ge1xuICAgICAgICAgICAgWyd0b3AtbGVmdCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWyd0b3AtcmlnaHQnXToge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWydib3R0b20tbGVmdCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWydib3R0b20tcmlnaHQnXToge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uW3RoaXMucG9zaXRpb25dO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmRyb3Bkb3duLnRyaWdnZXIpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbcG9zLCB0aGlzLmludmVydFBvc2l0aW9uKHBvcyldKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbigxMilcbiAgICAgICAgICAgIC53aXRoUHVzaCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgaW52ZXJ0UG9zaXRpb24ocG9zOiBDb25uZWN0ZWRQb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uIHtcbiAgICAgICAgY29uc3QgaW52ZXJ0ZWQgPSB7IC4uLnBvcyB9O1xuICAgICAgICBpbnZlcnRlZC5vcmlnaW5ZID0gcG9zLm9yaWdpblkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgaW52ZXJ0ZWQub3ZlcmxheVkgPSBwb3Mub3ZlcmxheVkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcblxuICAgICAgICByZXR1cm4gaW52ZXJ0ZWQ7XG4gICAgfVxufVxuIl19
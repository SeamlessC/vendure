import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * @description
 * A chip component for displaying a label with an optional action icon.
 *
 * @example
 * ```HTML
 * <vdr-chip [colorFrom]="item.value"
 *           icon="close"
 *           (iconClick)="clear(item)">
 * {{ item.value }}</vdr-chip>
 * ```
 * @docsCategory components
 */
export class ChipComponent {
    constructor() {
        this.invert = false;
        /**
         * @description
         * If set, the chip will have an auto-generated background
         * color based on the string value passed in.
         */
        this.colorFrom = '';
        this.iconClick = new EventEmitter();
    }
}
ChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-chip',
                template: "<div\n    class=\"wrapper\"\n    [class.with-background]=\"!invert && colorFrom\"\n    [style.backgroundColor]=\"!invert && (colorFrom | stringToColor)\"\n    [style.color]=\"invert && (colorFrom | stringToColor)\"\n    [style.borderColor]=\"invert && (colorFrom | stringToColor)\"\n    [ngClass]=\"colorType\"\n>\n    <div class=\"chip-label\"><ng-content></ng-content></div>\n    <div class=\"chip-icon\" *ngIf=\"icon\">\n        <button (click)=\"iconClick.emit($event)\">\n            <clr-icon\n                [attr.shape]=\"icon\"\n                [style.color]=\"invert && (colorFrom | stringToColor)\"\n                [class.is-inverse]=\"!invert && colorFrom\"\n            ></clr-icon>\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.wrapper{display:flex;border:1px solid var(--color-component-border-300);border-radius:3px;margin:6px}.wrapper.with-background{color:var(--color-grey-100);border-color:transparent}.wrapper.with-background .chip-label{opacity:.9}.wrapper.warning{border-color:var(--color-chip-warning-border)}.wrapper.warning .chip-label{color:var(--color-chip-warning-text);background-color:var(--color-chip-warning-bg)}.wrapper.success{border-color:var(--color-chip-success-border)}.wrapper.success .chip-label{color:var(--color-chip-success-text);background-color:var(--color-chip-success-bg)}.wrapper.error{border-color:var(--color-chip-error-border)}.wrapper.error .chip-label{color:var(--color-chip-error-text);background-color:var(--color-chip-error-bg)}.chip-label{padding:3px 6px;line-height:1em;border-radius:3px;white-space:nowrap;display:flex;align-items:center}.chip-icon{border-left:1px solid var(--color-component-border-200);padding:0 3px;line-height:1em;display:flex}.chip-icon button{cursor:pointer;background:none;margin:0;padding:0;border:none}\n"]
            },] }
];
ChipComponent.propDecorators = {
    icon: [{ type: Input }],
    invert: [{ type: Input }],
    colorFrom: [{ type: Input }],
    colorType: [{ type: Input }],
    iconClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2NoaXAvY2hpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRzs7Ozs7Ozs7Ozs7O0dBWUc7QUFPSCxNQUFNLE9BQU8sYUFBYTtJQU4xQjtRQWFhLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDeEI7Ozs7V0FJRztRQUNNLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFNZCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUN6RCxDQUFDOzs7WUExQkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQiw4dUJBQW9DO2dCQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzttQkFPSSxLQUFLO3FCQUNMLEtBQUs7d0JBTUwsS0FBSzt3QkFLTCxLQUFLO3dCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgY2hpcCBjb21wb25lbnQgZm9yIGRpc3BsYXlpbmcgYSBsYWJlbCB3aXRoIGFuIG9wdGlvbmFsIGFjdGlvbiBpY29uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiA8dmRyLWNoaXAgW2NvbG9yRnJvbV09XCJpdGVtLnZhbHVlXCJcbiAqICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICogICAgICAgICAgIChpY29uQ2xpY2spPVwiY2xlYXIoaXRlbSlcIj5cbiAqIHt7IGl0ZW0udmFsdWUgfX08L3Zkci1jaGlwPlxuICogYGBgXG4gKiBAZG9jc0NhdGVnb3J5IGNvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY2hpcCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoaXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoaXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hpcENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhlIGljb24gc2hvdWxkIGJlIHRoZSBuYW1lIG9mIG9uZSBvZiB0aGUgYXZhaWxhYmxlIENsYXJpdHkgaWNvbnM6IGh0dHBzOi8vY2xhcml0eS5kZXNpZ24vZm91bmRhdGlvbi9pY29ucy9zaGFwZXMvXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaW52ZXJ0ID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogSWYgc2V0LCB0aGUgY2hpcCB3aWxsIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgYmFja2dyb3VuZFxuICAgICAqIGNvbG9yIGJhc2VkIG9uIHRoZSBzdHJpbmcgdmFsdWUgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbG9yRnJvbSA9ICcnO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFRoZSBjb2xvciBvZiB0aGUgY2hpcCBjYW4gYWxzbyBiZSBvbmUgb2YgdGhlIHN0YW5kYXJkIHN0YXR1cyBjb2xvcnMuXG4gICAgICovXG4gICAgQElucHV0KCkgY29sb3JUeXBlOiAnZXJyb3InIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnO1xuICAgIEBPdXRwdXQoKSBpY29uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG59XG4iXX0=
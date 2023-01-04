import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A simple, stateless toggle button for indicating selection.
 */
export class SelectToggleComponent {
    constructor() {
        this.size = 'large';
        this.selected = false;
        this.hiddenWhenOff = false;
        this.disabled = false;
        this.selectedChange = new EventEmitter();
    }
}
SelectToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-toggle',
                template: "<div\n    class=\"toggle\"\n    [class.hide-when-off]=\"hiddenWhenOff\"\n    [class.disabled]=\"disabled\"\n    [class.small]=\"size === 'small'\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [class.selected]=\"selected\"\n    (keydown.enter)=\"selectedChange.emit(!selected)\"\n    (keydown.space)=\"$event.preventDefault(); selectedChange.emit(!selected)\"\n    (click)=\"selectedChange.emit(!selected)\"\n>\n    <clr-icon shape=\"check-circle\" [attr.size]=\"size === 'small' ? 24 : 32\"></clr-icon>\n</div>\n<div class=\"toggle-label\" [class.disabled]=\"disabled\" *ngIf=\"label\" (click)=\"selectedChange.emit(!selected)\">\n    {{ label }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center;justify-content:center}.toggle{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;cursor:pointer;color:var(--color-grey-300);background-color:var(--color-component-bg-100);border-radius:50%;top:-12px;left:-12px;transition:opacity .2s,color .2s}.toggle.hide-when-off{opacity:0}.toggle.small{width:24px;height:24px}.toggle:not(.disabled):hover{color:var(--color-success-400);opacity:.9}.toggle.selected{opacity:1;color:var(--color-success-500)}.toggle.selected:not(.disabled):hover{color:var(--color-success-400);opacity:.9}.toggle:focus{outline:none;box-shadow:0 0 2px 2px var(--color-primary-500)}.toggle.disabled{cursor:default}.toggle-label{flex:1;margin-left:6px;text-align:left;font-size:12px}.toggle-label:not(.disabled){cursor:pointer}\n"]
            },] }
];
SelectToggleComponent.propDecorators = {
    size: [{ type: Input }],
    selected: [{ type: Input }],
    hiddenWhenOff: [{ type: Input }],
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    selectedChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC10b2dnbGUvc2VsZWN0LXRvZ2dsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4Rzs7R0FFRztBQU9ILE1BQU0sT0FBTyxxQkFBcUI7SUFObEM7UUFPYSxTQUFJLEdBQXNCLE9BQU8sQ0FBQztRQUNsQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzNELENBQUM7OztZQWJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixpcUJBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzttQkFFSSxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7NkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBzaW1wbGUsIHN0YXRlbGVzcyB0b2dnbGUgYnV0dG9uIGZvciBpbmRpY2F0aW5nIHNlbGVjdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItc2VsZWN0LXRvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC10b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0VG9nZ2xlQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ2xhcmdlJyA9ICdsYXJnZSc7XG4gICAgQElucHV0KCkgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoaWRkZW5XaGVuT2ZmID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbn1cbiJdfQ==
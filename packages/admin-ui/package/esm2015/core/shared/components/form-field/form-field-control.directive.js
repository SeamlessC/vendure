import { Directive, ElementRef, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
// tslint:disable:directive-selector
export class FormFieldControlDirective {
    constructor(elementRef, formControlName) {
        this.elementRef = elementRef;
        this.formControlName = formControlName;
    }
    get valid() {
        return !!this.formControlName && !!this.formControlName.valid;
    }
    get touched() {
        return !!this.formControlName && !!this.formControlName.touched;
    }
    setReadOnly(value) {
        const input = this.elementRef.nativeElement;
        if (isSelectElement(input)) {
            input.disabled = value;
        }
        else {
            input.readOnly = value;
        }
    }
}
FormFieldControlDirective.decorators = [
    { type: Directive, args: [{ selector: 'input, textarea, select' },] }
];
FormFieldControlDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }] }
];
function isSelectElement(value) {
    return value.hasOwnProperty('selectedIndex');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0Msb0NBQW9DO0FBRXBDLE1BQU0sT0FBTyx5QkFBeUI7SUFDbEMsWUFDWSxVQUFvQyxFQUN6QixlQUEwQjtRQURyQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUN6QixvQkFBZSxHQUFmLGVBQWUsQ0FBVztJQUM5QyxDQUFDO0lBRUosSUFBSSxLQUFLO1FBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYztRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUMxQjthQUFNO1lBQ0gsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7WUF0QkosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFFOzs7WUFOOUIsVUFBVTtZQUNyQixTQUFTLHVCQVNULFFBQVE7O0FBcUJqQixTQUFTLGVBQWUsQ0FBQyxLQUFtQjtJQUN4QyxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxudHlwZSBJbnB1dEVsZW1lbnQgPSBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpkaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JyB9KVxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZENvbnRyb2xEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SW5wdXRFbGVtZW50PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIGZvcm1Db250cm9sTmFtZTogTmdDb250cm9sLFxuICAgICkge31cblxuICAgIGdldCB2YWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb3JtQ29udHJvbE5hbWUgJiYgISF0aGlzLmZvcm1Db250cm9sTmFtZS52YWxpZDtcbiAgICB9XG5cbiAgICBnZXQgdG91Y2hlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb3JtQ29udHJvbE5hbWUgJiYgISF0aGlzLmZvcm1Db250cm9sTmFtZS50b3VjaGVkO1xuICAgIH1cblxuICAgIHNldFJlYWRPbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChpc1NlbGVjdEVsZW1lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQucmVhZE9ubHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTZWxlY3RFbGVtZW50KHZhbHVlOiBJbnB1dEVsZW1lbnQpOiB2YWx1ZSBpcyBIVE1MU2VsZWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIHZhbHVlLmhhc093blByb3BlcnR5KCdzZWxlY3RlZEluZGV4Jyk7XG59XG4iXX0=
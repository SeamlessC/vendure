import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { RadioCardFieldsetComponent } from './radio-card-fieldset.component';
export class RadioCardComponent {
    constructor(fieldset, changeDetector) {
        this.fieldset = fieldset;
        this.changeDetector = changeDetector;
        this.idChange$ = new Subject();
        this.name = this.fieldset.groupName;
    }
    ngOnInit() {
        this.subscription = this.fieldset.selectedIdChange$.subscribe(id => {
            this.changeDetector.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isSelected(item) {
        return this.fieldset.isSelected(item);
    }
    isFocussed(item) {
        return this.fieldset.isFocussed(item);
    }
    selectChanged(item) {
        this.fieldset.selectChanged(item);
    }
    setFocussedId(item) {
        this.fieldset.setFocussedId(item);
    }
    getItemId(item) {
        return this.fieldset.idFn(item);
    }
}
RadioCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-radio-card',
                template: "<label\n    [ngClass]=\"{\n        'selected': isSelected(item),\n        'focussed': isFocussed(item)\n    }\"\n    class=\"radio-card\"\n>\n    <input\n        type=\"radio\"\n        [name]=\"name\"\n        [value]=\"getItemId(item)\"\n        class=\"hidden\"\n        (focus)=\"setFocussedId(item)\"\n        (blur)=\"setFocussedId(undefined)\"\n        (change)=\"selectChanged(item)\"\n    />\n    <vdr-select-toggle [selected]=\"isSelected(item)\" size=\"small\"></vdr-select-toggle>\n    <div class=\"content\">\n        <ng-content></ng-content>\n    </div>\n</label>\n",
                exportAs: 'VdrRadioCard',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.radio-card{background:none;position:relative;display:block;border:1px solid var(--clr-btn-default-border-color, #0072a3);border-radius:var(--clr-btn-border-radius, .15rem);padding:6px;text-align:left;margin:6px}.radio-card:hover{cursor:pointer;outline:1px solid var(--color-primary-500)}.radio-card.selected{outline:1px solid var(--color-primary-500);background-color:var(--color-primary-100)}input.hidden{visibility:hidden;position:absolute}vdr-select-toggle{position:absolute;top:3px;left:3px}.content{margin-left:24px}\n"]
            },] }
];
RadioCardComponent.ctorParameters = () => [
    { type: RadioCardFieldsetComponent },
    { type: ChangeDetectorRef }
];
RadioCardComponent.propDecorators = {
    item: [{ type: Input }],
    itemTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3JhZGlvLWNhcmQvcmFkaW8tY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsV0FBVyxHQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBUzdFLE1BQU0sT0FBTyxrQkFBa0I7SUFJM0IsWUFBb0IsUUFBb0MsRUFBVSxjQUFpQztRQUEvRSxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUUzRixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUssQ0FBQztRQUVyQyxTQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFKdUUsQ0FBQztJQU12RyxRQUFRO1FBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQU87UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFtQjtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQU87UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQS9DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZ2xCQUEwQztnQkFFMUMsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUlEsMEJBQTBCO1lBVi9CLGlCQUFpQjs7O21CQW9CaEIsS0FBSzsyQkFDTCxZQUFZLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSYWRpb0NhcmRGaWVsZHNldENvbXBvbmVudCB9IGZyb20gJy4vcmFkaW8tY2FyZC1maWVsZHNldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1yYWRpby1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8tY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmFkaW8tY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGV4cG9ydEFzOiAnVmRyUmFkaW9DYXJkJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9DYXJkQ29tcG9uZW50PFQgPSBhbnk+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGl0ZW06IFQ7XG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmllbGRzZXQ6IFJhZGlvQ2FyZEZpZWxkc2V0Q29tcG9uZW50LCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHByaXZhdGUgaWRDaGFuZ2UkID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIG5hbWUgPSB0aGlzLmZpZWxkc2V0Lmdyb3VwTmFtZTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZmllbGRzZXQuc2VsZWN0ZWRJZENoYW5nZSQuc3Vic2NyaWJlKGlkID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzZXQuaXNTZWxlY3RlZChpdGVtKTtcbiAgICB9XG5cbiAgICBpc0ZvY3Vzc2VkKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzZXQuaXNGb2N1c3NlZChpdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RDaGFuZ2VkKGl0ZW06IFQpIHtcbiAgICAgICAgdGhpcy5maWVsZHNldC5zZWxlY3RDaGFuZ2VkKGl0ZW0pO1xuICAgIH1cblxuICAgIHNldEZvY3Vzc2VkSWQoaXRlbTogVCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZpZWxkc2V0LnNldEZvY3Vzc2VkSWQoaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKGl0ZW06IFQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNldC5pZEZuKGl0ZW0pO1xuICAgIH1cbn1cbiJdfQ==
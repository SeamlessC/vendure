import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * Like the {@link FormFieldComponent} but for content which is not a form control. Used
 * to keep a consistent layout with other form fields in the form.
 */
export class FormItemComponent {
}
FormItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-form-item',
                template: "<div class=\"form-group\">\n    <label class=\"clr-control-label\">{{ label }}</label>\n    <div class=\"content\"><ng-content></ng-content></div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}:host .form-group>.content{flex:1;max-width:20rem}\n"]
            },] }
];
FormItemComponent.propDecorators = {
    label: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS1pdGVtL2Zvcm0taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUU7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsd0tBQXlDO2dCQUV6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztvQkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBMaWtlIHRoZSB7QGxpbmsgRm9ybUZpZWxkQ29tcG9uZW50fSBidXQgZm9yIGNvbnRlbnQgd2hpY2ggaXMgbm90IGEgZm9ybSBjb250cm9sLiBVc2VkXG4gKiB0byBrZWVwIGEgY29uc2lzdGVudCBsYXlvdXQgd2l0aCBvdGhlciBmb3JtIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZm9ybS1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mb3JtLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUl0ZW1Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG59XG4iXX0=
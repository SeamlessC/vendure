import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * @description
 * The default input component for `relation` type custom fields. Allows the selection
 * of a ProductVariant, Product, Customer or Asset. For other entity types, a custom
 * implementation will need to be defined. See {@link registerFormInputComponent}.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class RelationFormInputComponent {
}
RelationFormInputComponent.id = 'relation-form-input';
RelationFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-form-input',
                template: "<div [ngSwitch]=\"config.entity\">\n    <vdr-relation-asset-input\n        *ngSwitchCase=\"'Asset'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-asset-input>\n    <vdr-relation-product-input\n        *ngSwitchCase=\"'Product'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-input>\n    <vdr-relation-customer-input\n        *ngSwitchCase=\"'Customer'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-customer-input>\n    <vdr-relation-product-variant-input\n        *ngSwitchCase=\"'ProductVariant'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-variant-input>\n    <ng-template ngSwitchDefault>\n        <vdr-relation-generic-input\n            [parentFormControl]=\"formControl\"\n               [config]=\"config\"\n               [readonly]=\"readonly\"\n        ></vdr-relation-generic-input>\n    </ng-template>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;background-color:var(--color-component-bg-200);padding:3px}\n"]
            },] }
];
RelationFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL3JlbGF0aW9uLWZvcm0taW5wdXQvcmVsYXRpb24tZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPMUU7Ozs7Ozs7O0dBUUc7QUFPSCxNQUFNLE9BQU8sMEJBQTBCOztBQUNuQiw2QkFBRSxHQUEyQixxQkFBcUIsQ0FBQzs7WUFQdEUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGlxQ0FBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBkZWZhdWx0IGlucHV0IGNvbXBvbmVudCBmb3IgYHJlbGF0aW9uYCB0eXBlIGN1c3RvbSBmaWVsZHMuIEFsbG93cyB0aGUgc2VsZWN0aW9uXG4gKiBvZiBhIFByb2R1Y3RWYXJpYW50LCBQcm9kdWN0LCBDdXN0b21lciBvciBBc3NldC4gRm9yIG90aGVyIGVudGl0eSB0eXBlcywgYSBjdXN0b21cbiAqIGltcGxlbWVudGF0aW9uIHdpbGwgbmVlZCB0byBiZSBkZWZpbmVkLiBTZWUge0BsaW5rIHJlZ2lzdGVyRm9ybUlucHV0Q29tcG9uZW50fS5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcmVsYXRpb24tZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3JlbGF0aW9uLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlbGF0aW9uLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmVsYXRpb25Gb3JtSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBGb3JtSW5wdXRDb21wb25lbnQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdyZWxhdGlvbi1mb3JtLWlucHV0JztcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnO1xufVxuIl19
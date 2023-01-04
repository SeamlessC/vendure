import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
/**
 * @description
 * Structural directive that displays the given element if the Vendure instance has multiple channels
 * configured.
 *
 * @example
 * ```html
 * <div *vdrIfMultichannel class="channel-selector">
 *   <!-- ... -->
 * </ng-container>
 * ```
 *
 * @docsCategory directives
 */
export class IfMultichannelDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService) {
        super(_viewContainer, templateRef, () => {
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => 1 < userStatus.channels.length);
        });
        this.dataService = dataService;
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfMultichannelElse(templateRef) {
        this.setElseTemplate(templateRef);
    }
}
IfMultichannelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfMultichannel]',
            },] }
];
IfMultichannelDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService }
];
IfMultichannelDirective.propDecorators = {
    vdrIfMultichannelElse: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtbXVsdGljaGFubmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2RpcmVjdGl2ZXMvaWYtbXVsdGljaGFubmVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBSUgsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGVBQW1CO0lBQzVELFlBQ0ksY0FBZ0MsRUFDaEMsV0FBNkIsRUFDckIsV0FBd0I7UUFFaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2lCQUN6QixVQUFVLEVBQUU7aUJBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFOSyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQU9wQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNJLHFCQUFxQixDQUFDLFdBQW9DO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBdEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2FBQ2xDOzs7WUF0QnVDLGdCQUFnQjtZQUE3QixXQUFXO1lBRTdCLFdBQVc7OztvQ0FxQ2YsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSWZEaXJlY3RpdmVCYXNlIH0gZnJvbSAnLi9pZi1kaXJlY3RpdmUtYmFzZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IGRpc3BsYXlzIHRoZSBnaXZlbiBlbGVtZW50IGlmIHRoZSBWZW5kdXJlIGluc3RhbmNlIGhhcyBtdWx0aXBsZSBjaGFubmVsc1xuICogY29uZmlndXJlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGRpdiAqdmRySWZNdWx0aWNoYW5uZWwgY2xhc3M9XCJjaGFubmVsLXNlbGVjdG9yXCI+XG4gKiAgIDwhLS0gLi4uIC0tPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGRpcmVjdGl2ZXNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmRySWZNdWx0aWNoYW5uZWxdJyxcbn0pXG5leHBvcnQgY2xhc3MgSWZNdWx0aWNoYW5uZWxEaXJlY3RpdmUgZXh0ZW5kcyBJZkRpcmVjdGl2ZUJhc2U8W10+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX3ZpZXdDb250YWluZXIsIHRlbXBsYXRlUmVmLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAgICAgLm1hcFN0cmVhbSgoeyB1c2VyU3RhdHVzIH0pID0+IDEgPCB1c2VyU3RhdHVzLmNoYW5uZWxzLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdGVtcGxhdGUgdG8gc2hvdyBpZiB0aGUgY3VycmVudCB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHNwZWNpZmllZCBwZXJtaXNzaW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZkcklmTXVsdGljaGFubmVsRWxzZSh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRFbHNlVGVtcGxhdGUodGVtcGxhdGVSZWYpO1xuICAgIH1cbn1cbiJdfQ==
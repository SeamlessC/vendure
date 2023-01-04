import { TemplateRef, ViewContainerRef } from '@angular/core';
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
export declare class IfMultichannelDirective extends IfDirectiveBase<[]> {
    private dataService;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, dataService: DataService);
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfMultichannelElse(templateRef: TemplateRef<any> | null);
}

import { ElementRef } from '@angular/core';
/**
 * @description
 * Used for building dropdown menus.
 *
 * @example
 * ```HTML
 * <vdr-dropdown>
 *   <button class="btn btn-outline" vdrDropdownTrigger>
 *       <clr-icon shape="plus"></clr-icon>
 *       Select type
 *   </button>
 *   <vdr-dropdown-menu vdrPosition="bottom-left">
 *     <button
 *       *ngFor="let typeName of allTypes"
 *       type="button"
 *       vdrDropdownItem
 *       (click)="selectType(typeName)"
 *     >
 *       typeName
 *     </button>
 *   </vdr-dropdown-menu>
 * </vdr-dropdown>
 * ```
 * @docsCategory components
 */
export declare class DropdownComponent {
    private isOpen;
    private onOpenChangeCallbacks;
    trigger: ElementRef;
    manualToggle: boolean;
    onClick(): void;
    toggleOpen(): void;
    onOpenChange(callback: (isOpen: boolean) => void): void;
    setTriggerElement(elementRef: ElementRef): void;
}

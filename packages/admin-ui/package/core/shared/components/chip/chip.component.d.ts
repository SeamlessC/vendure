import { EventEmitter } from '@angular/core';
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
export declare class ChipComponent {
    /**
     * @description
     * The icon should be the name of one of the available Clarity icons: https://clarity.design/foundation/icons/shapes/
     *
     */
    icon: string;
    invert: boolean;
    /**
     * @description
     * If set, the chip will have an auto-generated background
     * color based on the string value passed in.
     */
    colorFrom: string;
    /**
     * @description
     * The color of the chip can also be one of the standard status colors.
     */
    colorType: 'error' | 'success' | 'warning';
    iconClick: EventEmitter<MouseEvent>;
}

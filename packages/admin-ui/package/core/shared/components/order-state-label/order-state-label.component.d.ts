/**
 * @description
 * Displays the state of an order in a colored chip.
 *
 * @example
 * ```HTML
 * <vdr-order-state-label [state]="order.state"></vdr-order-state-label>
 * ```
 * @docsCategory components
 */
export declare class OrderStateLabelComponent {
    state: string;
    get chipColorType(): "success" | "error" | "" | "warning";
}

import { OnChanges } from '@angular/core';
/**
 * @description
 * This component displays a plain JavaScript object as an expandable tree.
 *
 * @example
 * ```HTML
 * <vdr-object-tree [value]="payment.metadata"></vdr-object-tree>
 * ```
 *
 * @docsCategory components
 */
export declare class ObjectTreeComponent implements OnChanges {
    value: {
        [key: string]: any;
    } | string;
    isArrayItem: boolean;
    depth: number;
    expanded: boolean;
    valueIsArray: boolean;
    entries: Array<{
        key: string;
        value: any;
    }>;
    constructor(parent: ObjectTreeComponent);
    ngOnChanges(): void;
    isObject(value: any): boolean;
    private getEntries;
}

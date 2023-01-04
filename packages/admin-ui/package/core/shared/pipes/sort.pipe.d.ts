import { PipeTransform } from '@angular/core';
/**
 * A pipe for sorting elements of an array. Should be used with caution due to the
 * potential for perf degredation. Ideally should only be used on small arrays (< 10s of items)
 * and in components using OnPush change detection.
 */
export declare class SortPipe implements PipeTransform {
    transform<T>(value: T[] | readonly T[], orderByProp?: keyof T): T[];
}

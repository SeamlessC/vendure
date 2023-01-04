import { PipeTransform } from '@angular/core';
import { I18nService } from '../../providers/i18n/i18n.service';
/**
 * @description
 * Displays a number of milliseconds in a more human-readable format,
 * e.g. "12ms", "33s", "2:03m"
 *
 * @example
 * ```TypeScript
 * {{ timeInMs | duration }}
 * ```
 *
 * @docsCategory pipes
 */
export declare class DurationPipe implements PipeTransform {
    private i18nService;
    constructor(i18nService: I18nService);
    transform(value: number): string;
}

import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given region.
 *
 * @example
 * ```HTML
 * {{ 'GB' | localeRegionName }}
 * ```
 *
 * @docsCategory pipes
 */
export class LocaleRegionNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, locale) {
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid region code "${value}"`;
        }
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        try {
            return new DisplayNames([activeLocale.replace('_', '-')], { type: 'region' }).of(value.replace('_', '-'));
        }
        catch (e) {
            return value;
        }
    }
}
LocaleRegionNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeRegionName',
                pure: false,
            },] }
];
LocaleRegionNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLXJlZ2lvbi1uYW1lLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9waXBlcy9sb2NhbGUtcmVnaW9uLW5hbWUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRDs7Ozs7Ozs7OztHQVVHO0FBS0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGNBQWM7SUFDcEQsWUFBd0IsV0FBeUIsRUFBYyxpQkFBcUM7UUFDaEcsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxTQUFTLENBQUMsS0FBVSxFQUFFLE1BQWdCO1FBQ2xDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLHdCQUF3QixLQUFZLEdBQUcsQ0FBQztTQUNsRDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEQsMkZBQTJGO1FBQzNGLE1BQU0sWUFBWSxHQUFJLElBQVksQ0FBQyxZQUFZLENBQUM7UUFFaEQsSUFBSTtZQUNBLE9BQU8sSUFBSSxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUM1RSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDMUIsQ0FBQztTQUNMO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7OztZQTNCSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsSUFBSSxFQUFFLEtBQUs7YUFDZDs7O1lBbEJRLFdBQVcsdUJBb0JILFFBQVE7WUF0QmhCLGlCQUFpQix1QkFzQjhCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBMb2NhbGVCYXNlUGlwZSB9IGZyb20gJy4vbG9jYWxlLWJhc2UucGlwZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXNwbGF5cyBhIGh1bWFuLXJlYWRhYmxlIG5hbWUgZm9yIGEgZ2l2ZW4gcmVnaW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiB7eyAnR0InIHwgbG9jYWxlUmVnaW9uTmFtZSB9fVxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwaXBlc1xuICovXG5AUGlwZSh7XG4gICAgbmFtZTogJ2xvY2FsZVJlZ2lvbk5hbWUnLFxuICAgIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVSZWdpb25OYW1lUGlwZSBleHRlbmRzIExvY2FsZUJhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgZGF0YVNlcnZpY2U/OiBEYXRhU2VydmljZSwgQE9wdGlvbmFsKCkgY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihkYXRhU2VydmljZSwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgbG9jYWxlPzogdW5rbm93bik6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gYEludmFsaWQgcmVnaW9uIGNvZGUgXCIke3ZhbHVlIGFzIGFueX1cImA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlTG9jYWxlID0gdGhpcy5nZXRBY3RpdmVMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICAvLyBBd2FpdGluZyBUUyB0eXBlcyBmb3IgdGhpcyBBUEk6IGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9wdWxsLzQ0MDIyL2ZpbGVzXG4gICAgICAgIGNvbnN0IERpc3BsYXlOYW1lcyA9IChJbnRsIGFzIGFueSkuRGlzcGxheU5hbWVzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpc3BsYXlOYW1lcyhbYWN0aXZlTG9jYWxlLnJlcGxhY2UoJ18nLCAnLScpXSwgeyB0eXBlOiAncmVnaW9uJyB9KS5vZihcbiAgICAgICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKCdfJywgJy0nKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
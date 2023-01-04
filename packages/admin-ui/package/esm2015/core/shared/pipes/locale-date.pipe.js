import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * A replacement of the Angular DatePipe which makes use of the Intl API
 * to format dates according to the selected UI language.
 *
 * @example
 * ```HTML
 * {{ order.orderPlacedAt | localeDate }}
 * ```
 *
 * @docsCategory pipes
 */
export class LocaleDatePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [format, locale] = args;
        if (this.locale || typeof locale === 'string') {
            const activeLocale = this.getActiveLocale(locale);
            const date = value instanceof Date ? value : typeof value === 'string' ? new Date(value) : undefined;
            if (date) {
                const options = this.getOptionsForFormat(typeof format === 'string' ? format : 'medium');
                return new Intl.DateTimeFormat(activeLocale, options).format(date);
            }
        }
    }
    getOptionsForFormat(dateFormat) {
        switch (dateFormat) {
            case 'medium':
                return {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                };
            case 'mediumTime':
                return {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                };
            case 'longDate':
                return {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };
            case 'short':
                return {
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                };
            default:
                return;
        }
    }
}
LocaleDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeDate',
                pure: false,
            },] }
];
LocaleDatePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFLSCxNQUFNLE9BQU8sY0FBZSxTQUFRLGNBQWM7SUFDOUMsWUFBd0IsV0FBeUIsRUFBYyxpQkFBcUM7UUFDaEcsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxTQUFTLENBQUMsS0FBYyxFQUFFLEdBQUcsSUFBZTtRQUN4QyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsTUFBTSxJQUFJLEdBQ04sS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUYsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekYsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0RTtTQUNKO0lBQ0wsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFVBQWtCO1FBQzFDLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxPQUFPO29CQUNILEtBQUssRUFBRSxPQUFPO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLEdBQUcsRUFBRSxTQUFTO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQztZQUNOLEtBQUssWUFBWTtnQkFDYixPQUFPO29CQUNILElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQztZQUNOLEtBQUssVUFBVTtnQkFDWCxPQUFPO29CQUNILElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxNQUFNO29CQUNiLEdBQUcsRUFBRSxTQUFTO2lCQUNqQixDQUFDO1lBQ04sS0FBSyxPQUFPO2dCQUNSLE9BQU87b0JBQ0gsR0FBRyxFQUFFLFNBQVM7b0JBQ2QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsSUFBSTtpQkFDZixDQUFDO1lBQ047Z0JBQ0ksT0FBTztTQUNkO0lBQ0wsQ0FBQzs7O1lBMURKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLEtBQUs7YUFDZDs7O1lBbkJRLFdBQVcsdUJBcUJILFFBQVE7WUF2QmhCLGlCQUFpQix1QkF1QjhCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBMb2NhbGVCYXNlUGlwZSB9IGZyb20gJy4vbG9jYWxlLWJhc2UucGlwZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHJlcGxhY2VtZW50IG9mIHRoZSBBbmd1bGFyIERhdGVQaXBlIHdoaWNoIG1ha2VzIHVzZSBvZiB0aGUgSW50bCBBUElcbiAqIHRvIGZvcm1hdCBkYXRlcyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIFVJIGxhbmd1YWdlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiB7eyBvcmRlci5vcmRlclBsYWNlZEF0IHwgbG9jYWxlRGF0ZSB9fVxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwaXBlc1xuICovXG5AUGlwZSh7XG4gICAgbmFtZTogJ2xvY2FsZURhdGUnLFxuICAgIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVEYXRlUGlwZSBleHRlbmRzIExvY2FsZUJhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgZGF0YVNlcnZpY2U/OiBEYXRhU2VydmljZSwgQE9wdGlvbmFsKCkgY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihkYXRhU2VydmljZSwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0odmFsdWU6IHVua25vd24sIC4uLmFyZ3M6IHVua25vd25bXSk6IHVua25vd24ge1xuICAgICAgICBjb25zdCBbZm9ybWF0LCBsb2NhbGVdID0gYXJncztcbiAgICAgICAgaWYgKHRoaXMubG9jYWxlIHx8IHR5cGVvZiBsb2NhbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVMb2NhbGUgPSB0aGlzLmdldEFjdGl2ZUxvY2FsZShsb2NhbGUpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9XG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gbmV3IERhdGUodmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zRm9yRm9ybWF0KHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogJ21lZGl1bScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChhY3RpdmVMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3B0aW9uc0ZvckZvcm1hdChkYXRlRm9ybWF0OiBzdHJpbmcpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHN3aXRjaCAoZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgY2FzZSAnbWVkaXVtJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbWVkaXVtVGltZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbG9uZ0RhdGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3Nob3J0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
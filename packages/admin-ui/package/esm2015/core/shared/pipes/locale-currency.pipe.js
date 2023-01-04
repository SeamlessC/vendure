import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Formats a Vendure monetary value (in cents) into the correct format for the configured currency and display
 * locale.
 *
 * @example
 * ```HTML
 * {{ variant.priceWithTax | localeCurrency }}
 * ```
 *
 * @docsCategory pipes
 */
export class LocaleCurrencyPipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [currencyCode, locale] = args;
        if (typeof value === 'number' && typeof currencyCode === 'string') {
            const activeLocale = this.getActiveLocale(locale);
            const majorUnits = value / 100;
            try {
                return new Intl.NumberFormat(activeLocale, {
                    style: 'currency',
                    currency: currencyCode,
                }).format(majorUnits);
            }
            catch (e) {
                return majorUnits.toFixed(2);
            }
        }
        return value;
    }
}
LocaleCurrencyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrency',
                pure: false,
            },] }
];
LocaleCurrencyPipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWN1cnJlbmN5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9waXBlcy9sb2NhbGUtY3VycmVuY3kucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7R0FXRztBQUtILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBQ2xELFlBQXdCLFdBQXlCLEVBQWMsaUJBQXFDO1FBQ2hHLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWMsRUFBRSxHQUFHLElBQWU7UUFDeEMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO1lBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUMvQixJQUFJO2dCQUNBLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtvQkFDdkMsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFFBQVEsRUFBRSxZQUFZO2lCQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pCO1lBQUMsT0FBTyxDQUFNLEVBQUU7Z0JBQ2IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7WUF4QkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLElBQUksRUFBRSxLQUFLO2FBQ2Q7OztZQW5CUSxXQUFXLHVCQXFCSCxRQUFRO1lBdkJoQixpQkFBaUIsdUJBdUI4QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTG9jYWxlQmFzZVBpcGUgfSBmcm9tICcuL2xvY2FsZS1iYXNlLnBpcGUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogRm9ybWF0cyBhIFZlbmR1cmUgbW9uZXRhcnkgdmFsdWUgKGluIGNlbnRzKSBpbnRvIHRoZSBjb3JyZWN0IGZvcm1hdCBmb3IgdGhlIGNvbmZpZ3VyZWQgY3VycmVuY3kgYW5kIGRpc3BsYXlcbiAqIGxvY2FsZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgSFRNTFxuICoge3sgdmFyaWFudC5wcmljZVdpdGhUYXggfCBsb2NhbGVDdXJyZW5jeSB9fVxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwaXBlc1xuICovXG5AUGlwZSh7XG4gICAgbmFtZTogJ2xvY2FsZUN1cnJlbmN5JyxcbiAgICBwdXJlOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxlQ3VycmVuY3lQaXBlIGV4dGVuZHMgTG9jYWxlQmFzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTZXJ2aWNlLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtKHZhbHVlOiB1bmtub3duLCAuLi5hcmdzOiB1bmtub3duW10pOiBzdHJpbmcgfCB1bmtub3duIHtcbiAgICAgICAgY29uc3QgW2N1cnJlbmN5Q29kZSwgbG9jYWxlXSA9IGFyZ3M7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIHR5cGVvZiBjdXJyZW5jeUNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVMb2NhbGUgPSB0aGlzLmdldEFjdGl2ZUxvY2FsZShsb2NhbGUpO1xuICAgICAgICAgICAgY29uc3QgbWFqb3JVbml0cyA9IHZhbHVlIC8gMTAwO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGFjdGl2ZUxvY2FsZSwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICB9KS5mb3JtYXQobWFqb3JVbml0cyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFqb3JVbml0cy50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=
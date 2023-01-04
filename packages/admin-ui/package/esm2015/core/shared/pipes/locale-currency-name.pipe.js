import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given ISO 4217 currency code.
 *
 * @example
 * ```HTML
 * {{ order.currencyCode | localeCurrencyName }}
 * ```
 *
 * @docsCategory pipes
 */
export class LocaleCurrencyNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, display = 'full', locale) {
        var _a;
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid currencyCode "${value}"`;
        }
        let name = '';
        let symbol = '';
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        if (display === 'full' || display === 'name') {
            name = new DisplayNames([activeLocale], {
                type: 'currency',
            }).of(value);
        }
        if (display === 'full' || display === 'symbol') {
            const parts = new Intl.NumberFormat(activeLocale, {
                style: 'currency',
                currency: value,
                currencyDisplay: 'symbol',
            }).formatToParts();
            symbol = ((_a = parts.find(p => p.type === 'currency')) === null || _a === void 0 ? void 0 : _a.value) || value;
        }
        return display === 'full' ? `${name} (${symbol})` : display === 'name' ? name : symbol;
    }
}
LocaleCurrencyNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrencyName',
                pure: false,
            },] }
];
LocaleCurrencyNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWN1cnJlbmN5LW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1jdXJyZW5jeS1uYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7R0FVRztBQUtILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxjQUFjO0lBQ3RELFlBQXdCLFdBQXlCLEVBQWMsaUJBQXFDO1FBQ2hHLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQVUsRUFBRSxVQUFzQyxNQUFNLEVBQUUsTUFBZ0I7O1FBQ2hGLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLHlCQUF5QixLQUFZLEdBQUcsQ0FBQztTQUNuRDtRQUNELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxELDJGQUEyRjtRQUMzRixNQUFNLFlBQVksR0FBSSxJQUFZLENBQUMsWUFBWSxDQUFDO1FBRWhELElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzFDLElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsVUFBVTthQUNuQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDNUMsTUFBTSxLQUFLLEdBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtnQkFDaEMsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxRQUFRO2FBQzVCLENBQ0osQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVsQixNQUFNLEdBQUcsQ0FBQSxNQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQywwQ0FBRSxLQUFLLEtBQUksS0FBSyxDQUFDO1NBQ25FO1FBQ0QsT0FBTyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDM0YsQ0FBQzs7O1lBdkNKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixJQUFJLEVBQUUsS0FBSzthQUNkOzs7WUFsQlEsV0FBVyx1QkFvQkgsUUFBUTtZQXRCaEIsaUJBQWlCLHVCQXNCOEIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBPcHRpb25hbCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbmltcG9ydCB7IExvY2FsZUJhc2VQaXBlIH0gZnJvbSAnLi9sb2NhbGUtYmFzZS5waXBlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIERpc3BsYXlzIGEgaHVtYW4tcmVhZGFibGUgbmFtZSBmb3IgYSBnaXZlbiBJU08gNDIxNyBjdXJyZW5jeSBjb2RlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiB7eyBvcmRlci5jdXJyZW5jeUNvZGUgfCBsb2NhbGVDdXJyZW5jeU5hbWUgfX1cbiAqIGBgYFxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgcGlwZXNcbiAqL1xuQFBpcGUoe1xuICAgIG5hbWU6ICdsb2NhbGVDdXJyZW5jeU5hbWUnLFxuICAgIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVDdXJyZW5jeU5hbWVQaXBlIGV4dGVuZHMgTG9jYWxlQmFzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTZXJ2aWNlLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBkaXNwbGF5OiAnZnVsbCcgfCAnc3ltYm9sJyB8ICduYW1lJyA9ICdmdWxsJywgbG9jYWxlPzogdW5rbm93bik6IGFueSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gYEludmFsaWQgY3VycmVuY3lDb2RlIFwiJHt2YWx1ZSBhcyBhbnl9XCJgO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYW1lID0gJyc7XG4gICAgICAgIGxldCBzeW1ib2wgPSAnJztcbiAgICAgICAgY29uc3QgYWN0aXZlTG9jYWxlID0gdGhpcy5nZXRBY3RpdmVMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICAvLyBBd2FpdGluZyBUUyB0eXBlcyBmb3IgdGhpcyBBUEk6IGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9wdWxsLzQ0MDIyL2ZpbGVzXG4gICAgICAgIGNvbnN0IERpc3BsYXlOYW1lcyA9IChJbnRsIGFzIGFueSkuRGlzcGxheU5hbWVzO1xuXG4gICAgICAgIGlmIChkaXNwbGF5ID09PSAnZnVsbCcgfHwgZGlzcGxheSA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICBuYW1lID0gbmV3IERpc3BsYXlOYW1lcyhbYWN0aXZlTG9jYWxlXSwge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjdXJyZW5jeScsXG4gICAgICAgICAgICB9KS5vZih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXkgPT09ICdmdWxsJyB8fCBkaXNwbGF5ID09PSAnc3ltYm9sJykge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSAoXG4gICAgICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KGFjdGl2ZUxvY2FsZSwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeURpc3BsYXk6ICdzeW1ib2wnLFxuICAgICAgICAgICAgICAgIH0pIGFzIGFueVxuICAgICAgICAgICAgKS5mb3JtYXRUb1BhcnRzKCk7XG5cbiAgICAgICAgICAgIHN5bWJvbCA9IHBhcnRzLmZpbmQocCA9PiBwLnR5cGUgPT09ICdjdXJyZW5jeScpPy52YWx1ZSB8fCB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlzcGxheSA9PT0gJ2Z1bGwnID8gYCR7bmFtZX0gKCR7c3ltYm9sfSlgIDogZGlzcGxheSA9PT0gJ25hbWUnID8gbmFtZSA6IHN5bWJvbDtcbiAgICB9XG59XG4iXX0=
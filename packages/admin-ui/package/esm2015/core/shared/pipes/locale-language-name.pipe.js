import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * Displays a human-readable name for a given ISO 639-1 language code.
 *
 * @example
 * ```HTML
 * {{ 'zh_Hant' | localeLanguageName }}
 * ```
 *
 * @docsCategory pipes
 */
export class LocaleLanguageNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, locale) {
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid language code "${value}"`;
        }
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        try {
            return new DisplayNames([activeLocale.replace('_', '-')], { type: 'language' }).of(value.replace('_', '-'));
        }
        catch (e) {
            return value;
        }
    }
}
LocaleLanguageNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeLanguageName',
                pure: false,
            },] }
];
LocaleLanguageNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWxhbmd1YWdlLW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1sYW5ndWFnZS1uYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7R0FVRztBQUtILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxjQUFjO0lBQ3RELFlBQXdCLFdBQXlCLEVBQWMsaUJBQXFDO1FBQ2hHLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQVUsRUFBRSxNQUFnQjtRQUNsQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMvQixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTywwQkFBMEIsS0FBWSxHQUFHLENBQUM7U0FDcEQ7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxELDJGQUEyRjtRQUMzRixNQUFNLFlBQVksR0FBSSxJQUFZLENBQUMsWUFBWSxDQUFDO1FBRWhELElBQUk7WUFDQSxPQUFPLElBQUksWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FDOUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQzFCLENBQUM7U0FDTDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7WUEzQkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLElBQUksRUFBRSxLQUFLO2FBQ2Q7OztZQWxCUSxXQUFXLHVCQW9CSCxRQUFRO1lBdEJoQixpQkFBaUIsdUJBc0I4QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTG9jYWxlQmFzZVBpcGUgfSBmcm9tICcuL2xvY2FsZS1iYXNlLnBpcGUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogRGlzcGxheXMgYSBodW1hbi1yZWFkYWJsZSBuYW1lIGZvciBhIGdpdmVuIElTTyA2MzktMSBsYW5ndWFnZSBjb2RlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiB7eyAnemhfSGFudCcgfCBsb2NhbGVMYW5ndWFnZU5hbWUgfX1cbiAqIGBgYFxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgcGlwZXNcbiAqL1xuQFBpcGUoe1xuICAgIG5hbWU6ICdsb2NhbGVMYW5ndWFnZU5hbWUnLFxuICAgIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVMYW5ndWFnZU5hbWVQaXBlIGV4dGVuZHMgTG9jYWxlQmFzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTZXJ2aWNlLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBsb2NhbGU/OiB1bmtub3duKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBgSW52YWxpZCBsYW5ndWFnZSBjb2RlIFwiJHt2YWx1ZSBhcyBhbnl9XCJgO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxvY2FsZSA9IHRoaXMuZ2V0QWN0aXZlTG9jYWxlKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gQXdhaXRpbmcgVFMgdHlwZXMgZm9yIHRoaXMgQVBJOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC80NDAyMi9maWxlc1xuICAgICAgICBjb25zdCBEaXNwbGF5TmFtZXMgPSAoSW50bCBhcyBhbnkpLkRpc3BsYXlOYW1lcztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEaXNwbGF5TmFtZXMoW2FjdGl2ZUxvY2FsZS5yZXBsYWNlKCdfJywgJy0nKV0sIHsgdHlwZTogJ2xhbmd1YWdlJyB9KS5vZihcbiAgICAgICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKCdfJywgJy0nKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * Used by locale-aware pipes to handle the task of getting the active languageCode
 * of the UI and cleaning up.
 */
export class LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        if (dataService && changeDetectorRef) {
            this.subscription = dataService.client
                .uiState()
                .mapStream(data => data.uiState)
                .subscribe(({ language, locale }) => {
                this.locale = language.replace(/_/g, '-');
                if (locale) {
                    this.locale += `-${locale}`;
                }
                changeDetectorRef.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * Returns the active locale after attempting to ensure that the locale string
     * is valid for the Intl API.
     */
    getActiveLocale(localeOverride) {
        var _a;
        const locale = typeof localeOverride === 'string' ? localeOverride : (_a = this.locale) !== null && _a !== void 0 ? _a : 'en';
        const hyphenated = locale === null || locale === void 0 ? void 0 : locale.replace(/_/g, '-');
        // Check for a double-region string, containing 2 region codes like
        // pt-BR-BR, which is invalid. In this case, the second region is used
        // and the first region discarded. This would only ever be an issue for
        // those languages where the translation file itself encodes the region,
        // as in pt_BR & pt_PT.
        const matches = hyphenated === null || hyphenated === void 0 ? void 0 : hyphenated.match(/^([a-zA-Z_-]+)(-[A-Z][A-Z])(-[A-Z][A-z])$/);
        if (matches === null || matches === void 0 ? void 0 : matches.length) {
            const overriddenLocale = matches[1] + matches[3];
            return overriddenLocale;
        }
        else {
            return hyphenated;
        }
    }
}
LocaleBasePipe.decorators = [
    { type: Injectable }
];
LocaleBasePipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWJhc2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1iYXNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFOzs7R0FHRztBQUVILE1BQU0sT0FBZ0IsY0FBYztJQUloQyxZQUFzQixXQUF5QixFQUFFLGlCQUFxQztRQUNsRixJQUFJLFdBQVcsSUFBSSxpQkFBaUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNO2lCQUNqQyxPQUFPLEVBQUU7aUJBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDL0IsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO2lCQUMvQjtnQkFDRCxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDTyxlQUFlLENBQUMsY0FBd0I7O1FBQzlDLE1BQU0sTUFBTSxHQUFHLE9BQU8sY0FBYyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLElBQUksQ0FBQztRQUN6RixNQUFNLFVBQVUsR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5QyxtRUFBbUU7UUFDbkUsc0VBQXNFO1FBQ3RFLHVFQUF1RTtRQUN2RSx3RUFBd0U7UUFDeEUsdUJBQXVCO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUMvRSxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLEVBQUU7WUFDakIsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sZ0JBQWdCLENBQUM7U0FDM0I7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7O1lBOUNKLFVBQVU7OztZQU5GLFdBQVc7WUFIWCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIFVzZWQgYnkgbG9jYWxlLWF3YXJlIHBpcGVzIHRvIGhhbmRsZSB0aGUgdGFzayBvZiBnZXR0aW5nIHRoZSBhY3RpdmUgbGFuZ3VhZ2VDb2RlXG4gKiBvZiB0aGUgVUkgYW5kIGNsZWFuaW5nIHVwLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYWxlQmFzZVBpcGUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHByb3RlY3RlZCBsb2NhbGU6IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGRhdGFTZXJ2aWNlPzogRGF0YVNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmPzogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgaWYgKGRhdGFTZXJ2aWNlICYmIGNoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgICAgIC51aVN0YXRlKClcbiAgICAgICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS51aVN0YXRlKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHsgbGFuZ3VhZ2UsIGxvY2FsZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlID0gbGFuZ3VhZ2UucmVwbGFjZSgvXy9nLCAnLScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZSArPSBgLSR7bG9jYWxlfWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYWN0aXZlIGxvY2FsZSBhZnRlciBhdHRlbXB0aW5nIHRvIGVuc3VyZSB0aGF0IHRoZSBsb2NhbGUgc3RyaW5nXG4gICAgICogaXMgdmFsaWQgZm9yIHRoZSBJbnRsIEFQSS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0QWN0aXZlTG9jYWxlKGxvY2FsZU92ZXJyaWRlPzogdW5rbm93bik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IHR5cGVvZiBsb2NhbGVPdmVycmlkZSA9PT0gJ3N0cmluZycgPyBsb2NhbGVPdmVycmlkZSA6IHRoaXMubG9jYWxlID8/ICdlbic7XG4gICAgICAgIGNvbnN0IGh5cGhlbmF0ZWQgPSBsb2NhbGU/LnJlcGxhY2UoL18vZywgJy0nKTtcblxuICAgICAgICAvLyBDaGVjayBmb3IgYSBkb3VibGUtcmVnaW9uIHN0cmluZywgY29udGFpbmluZyAyIHJlZ2lvbiBjb2RlcyBsaWtlXG4gICAgICAgIC8vIHB0LUJSLUJSLCB3aGljaCBpcyBpbnZhbGlkLiBJbiB0aGlzIGNhc2UsIHRoZSBzZWNvbmQgcmVnaW9uIGlzIHVzZWRcbiAgICAgICAgLy8gYW5kIHRoZSBmaXJzdCByZWdpb24gZGlzY2FyZGVkLiBUaGlzIHdvdWxkIG9ubHkgZXZlciBiZSBhbiBpc3N1ZSBmb3JcbiAgICAgICAgLy8gdGhvc2UgbGFuZ3VhZ2VzIHdoZXJlIHRoZSB0cmFuc2xhdGlvbiBmaWxlIGl0c2VsZiBlbmNvZGVzIHRoZSByZWdpb24sXG4gICAgICAgIC8vIGFzIGluIHB0X0JSICYgcHRfUFQuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBoeXBoZW5hdGVkPy5tYXRjaCgvXihbYS16QS1aXy1dKykoLVtBLVpdW0EtWl0pKC1bQS1aXVtBLXpdKSQvKTtcbiAgICAgICAgaWYgKG1hdGNoZXM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgb3ZlcnJpZGRlbkxvY2FsZSA9IG1hdGNoZXNbMV0gKyBtYXRjaGVzWzNdO1xuICAgICAgICAgICAgcmV0dXJuIG92ZXJyaWRkZW5Mb2NhbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHlwaGVuYXRlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFic3RyYWN0IHRyYW5zZm9ybSh2YWx1ZTogYW55LCAuLi5hcmdzKTogYW55O1xufVxuIl19
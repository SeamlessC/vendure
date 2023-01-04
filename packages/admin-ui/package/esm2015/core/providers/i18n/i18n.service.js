import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@angular/common";
/** @dynamic */
export class I18nService {
    constructor(ngxTranslate, document) {
        this.ngxTranslate = ngxTranslate;
        this.document = document;
        this._availableLanguages = [];
    }
    get availableLanguages() {
        return [...this._availableLanguages];
    }
    /**
     * Set the default language
     */
    setDefaultLanguage(languageCode) {
        this.ngxTranslate.setDefaultLang(languageCode);
    }
    /**
     * Set the UI language
     */
    setLanguage(language) {
        var _a;
        this.ngxTranslate.use(language);
        if ((_a = this.document) === null || _a === void 0 ? void 0 : _a.documentElement) {
            this.document.documentElement.lang = language;
        }
    }
    /**
     * Set the available UI languages
     */
    setAvailableLanguages(languages) {
        this._availableLanguages = languages;
    }
    /**
     * Translate the given key.
     */
    translate(key, params) {
        return this.ngxTranslate.instant(key, params);
    }
}
I18nService.ɵprov = i0.ɵɵdefineInjectable({ factory: function I18nService_Factory() { return new I18nService(i0.ɵɵinject(i1.TranslateService), i0.ɵɵinject(i2.DOCUMENT)); }, token: I18nService, providedIn: "root" });
I18nService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
I18nService.ctorParameters = () => [
    { type: TranslateService },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9wcm92aWRlcnMvaTE4bi9pMThuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBSXZELGVBQWU7QUFJZixNQUFNLE9BQU8sV0FBVztJQU9wQixZQUFvQixZQUE4QixFQUE0QixRQUFrQjtRQUE1RSxpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU5oRyx3QkFBbUIsR0FBbUIsRUFBRSxDQUFDO0lBTTBELENBQUM7SUFKcEcsSUFBSSxrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUlEOztPQUVHO0lBQ0gsa0JBQWtCLENBQUMsWUFBMEI7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLFFBQXNCOztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsZUFBZSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBcUIsQ0FBQyxTQUF5QjtRQUMzQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxHQUFzQixFQUFFLE1BQVk7UUFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztZQXpDSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQVBRLGdCQUFnQjtZQWVtRSxRQUFRLHVCQUEzQyxNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZUNvZGUgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuLyoqIEBkeW5hbWljICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJMThuU2VydmljZSB7XG4gICAgX2F2YWlsYWJsZUxhbmd1YWdlczogTGFuZ3VhZ2VDb2RlW10gPSBbXTtcblxuICAgIGdldCBhdmFpbGFibGVMYW5ndWFnZXMoKTogTGFuZ3VhZ2VDb2RlW10ge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2F2YWlsYWJsZUxhbmd1YWdlc107XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hUcmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkZWZhdWx0IGxhbmd1YWdlXG4gICAgICovXG4gICAgc2V0RGVmYXVsdExhbmd1YWdlKGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKSB7XG4gICAgICAgIHRoaXMubmd4VHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmd1YWdlQ29kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBVSSBsYW5ndWFnZVxuICAgICAqL1xuICAgIHNldExhbmd1YWdlKGxhbmd1YWdlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ3hUcmFuc2xhdGUudXNlKGxhbmd1YWdlKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9IGxhbmd1YWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBhdmFpbGFibGUgVUkgbGFuZ3VhZ2VzXG4gICAgICovXG4gICAgc2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKGxhbmd1YWdlczogTGFuZ3VhZ2VDb2RlW10pIHtcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlTGFuZ3VhZ2VzID0gbGFuZ3VhZ2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSB0aGUgZ2l2ZW4ga2V5LlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZShrZXk6IHN0cmluZyB8IHN0cmluZ1tdLCBwYXJhbXM/OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5uZ3hUcmFuc2xhdGUuaW5zdGFudChrZXksIHBhcmFtcyk7XG4gICAgfVxufVxuIl19
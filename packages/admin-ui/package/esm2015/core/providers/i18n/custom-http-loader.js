import { map } from 'rxjs/operators';
/**
 * A loader for ngx-translate which extends the HttpLoader functionality by stripping out any
 * values which are empty strings. This means that during development, translation keys which have
 * been extracted but not yet defined will fall back to the raw key text rather than displaying nothing.
 *
 * Originally from https://github.com/ngx-translate/core/issues/662#issuecomment-377010232
 */
export class CustomHttpTranslationLoader {
    constructor(http, prefix = '/assets/i18n/', suffix = '.json') {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    getTranslation(lang) {
        return this.http
            .get(`${this.prefix}${lang}${this.suffix}`)
            .pipe(map((res) => this.process(res)));
    }
    process(object) {
        const newObject = {};
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                if (typeof value !== 'string') {
                    newObject[key] = this.process(value);
                }
                else if (typeof value === 'string' && value === '') {
                    // do not copy empty strings
                }
                else {
                    newObject[key] = object[key];
                }
            }
        }
        return newObject;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWh0dHAtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9wcm92aWRlcnMvaTE4bi9jdXN0b20taHR0cC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXJDOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTywyQkFBMkI7SUFDcEMsWUFDWSxJQUFnQixFQUNoQixTQUFpQixlQUFlLEVBQ2hDLFNBQWlCLE9BQU87UUFGeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUNqQyxDQUFDO0lBRUcsY0FBYyxDQUFDLElBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sT0FBTyxDQUFDLE1BQWtCO1FBQzlCLE1BQU0sU0FBUyxHQUFlLEVBQUUsQ0FBQztRQUVqQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QztxQkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUNsRCw0QkFBNEI7aUJBQy9CO3FCQUFNO29CQUNILFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgRGljdGlvbmFyeSA9IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBEaWN0aW9uYXJ5O1xufTtcblxuLyoqXG4gKiBBIGxvYWRlciBmb3Igbmd4LXRyYW5zbGF0ZSB3aGljaCBleHRlbmRzIHRoZSBIdHRwTG9hZGVyIGZ1bmN0aW9uYWxpdHkgYnkgc3RyaXBwaW5nIG91dCBhbnlcbiAqIHZhbHVlcyB3aGljaCBhcmUgZW1wdHkgc3RyaW5ncy4gVGhpcyBtZWFucyB0aGF0IGR1cmluZyBkZXZlbG9wbWVudCwgdHJhbnNsYXRpb24ga2V5cyB3aGljaCBoYXZlXG4gKiBiZWVuIGV4dHJhY3RlZCBidXQgbm90IHlldCBkZWZpbmVkIHdpbGwgZmFsbCBiYWNrIHRvIHRoZSByYXcga2V5IHRleHQgcmF0aGVyIHRoYW4gZGlzcGxheWluZyBub3RoaW5nLlxuICpcbiAqIE9yaWdpbmFsbHkgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbmd4LXRyYW5zbGF0ZS9jb3JlL2lzc3Vlcy82NjIjaXNzdWVjb21tZW50LTM3NzAxMDIzMlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cFRyYW5zbGF0aW9uTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsYXRlTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIHByZWZpeDogc3RyaW5nID0gJy9hc3NldHMvaTE4bi8nLFxuICAgICAgICBwcml2YXRlIHN1ZmZpeDogc3RyaW5nID0gJy5qc29uJyxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldChgJHt0aGlzLnByZWZpeH0ke2xhbmd9JHt0aGlzLnN1ZmZpeH1gKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IGFueSkgPT4gdGhpcy5wcm9jZXNzKHJlcykpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3Mob2JqZWN0OiBEaWN0aW9uYXJ5KTogRGljdGlvbmFyeSB7XG4gICAgICAgIGNvbnN0IG5ld09iamVjdDogRGljdGlvbmFyeSA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHRoaXMucHJvY2Vzcyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgY29weSBlbXB0eSBzdHJpbmdzXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqZWN0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH1cbn1cbiJdfQ==
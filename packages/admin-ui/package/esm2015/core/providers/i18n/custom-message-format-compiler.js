/* tslint:disable:no-console */
import { Injectable } from '@angular/core';
import { TranslateMessageFormatCompiler, } from 'ngx-translate-messageformat-compiler';
import * as i0 from "@angular/core";
import * as i1 from "ngx-translate-messageformat-compiler";
/**
 * Work-around for Angular 9 compat.
 * See https://github.com/lephyrus/ngx-translate-messageformat-compiler/issues/53#issuecomment-583677994
 *
 * Also logs errors which would otherwise get swallowed by ngx-translate. This is important
 * because it is quite easy to make errors in messageformat syntax, and without clear
 * error messages it's very hard to debug.
 */
export class InjectableTranslateMessageFormatCompiler extends TranslateMessageFormatCompiler {
    compileTranslations(value, lang) {
        try {
            return super.compileTranslations(value, lang);
        }
        catch (e) {
            console.error(`There was an error with the ${lang} translations:`);
            console.log(e);
            console.log(`Check the messageformat docs: https://messageformat.github.io/messageformat/page-guide`);
        }
    }
}
InjectableTranslateMessageFormatCompiler.ɵprov = i0.ɵɵdefineInjectable({ factory: function InjectableTranslateMessageFormatCompiler_Factory() { return new InjectableTranslateMessageFormatCompiler(i0.ɵɵinject(i1.MESSAGE_FORMAT_CONFIG, 8)); }, token: InjectableTranslateMessageFormatCompiler, providedIn: "root" });
InjectableTranslateMessageFormatCompiler.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1lc3NhZ2UtZm9ybWF0LWNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9wcm92aWRlcnMvaTE4bi9jdXN0b20tbWVzc2FnZS1mb3JtYXQtY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNILDhCQUE4QixHQUVqQyxNQUFNLHNDQUFzQyxDQUFDOzs7QUFFOUM7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyx3Q0FBeUMsU0FBUSw4QkFBOEI7SUFDeEYsbUJBQW1CLENBQUMsS0FBVSxFQUFFLElBQVk7UUFDeEMsSUFBSTtZQUNBLE9BQU8sS0FBSyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUNQLHdGQUF3RixDQUMzRixDQUFDO1NBQ0w7SUFDTCxDQUFDOzs7O1lBWkosVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5vLWNvbnNvbGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgVHJhbnNsYXRlTWVzc2FnZUZvcm1hdENvbXBpbGVyLFxuICAgIFRyYW5zbGF0ZU1lc3NhZ2VGb3JtYXREZWJ1Z0NvbXBpbGVyLFxufSBmcm9tICduZ3gtdHJhbnNsYXRlLW1lc3NhZ2Vmb3JtYXQtY29tcGlsZXInO1xuXG4vKipcbiAqIFdvcmstYXJvdW5kIGZvciBBbmd1bGFyIDkgY29tcGF0LlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9sZXBoeXJ1cy9uZ3gtdHJhbnNsYXRlLW1lc3NhZ2Vmb3JtYXQtY29tcGlsZXIvaXNzdWVzLzUzI2lzc3VlY29tbWVudC01ODM2Nzc5OTRcbiAqXG4gKiBBbHNvIGxvZ3MgZXJyb3JzIHdoaWNoIHdvdWxkIG90aGVyd2lzZSBnZXQgc3dhbGxvd2VkIGJ5IG5neC10cmFuc2xhdGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gKiBiZWNhdXNlIGl0IGlzIHF1aXRlIGVhc3kgdG8gbWFrZSBlcnJvcnMgaW4gbWVzc2FnZWZvcm1hdCBzeW50YXgsIGFuZCB3aXRob3V0IGNsZWFyXG4gKiBlcnJvciBtZXNzYWdlcyBpdCdzIHZlcnkgaGFyZCB0byBkZWJ1Zy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBJbmplY3RhYmxlVHJhbnNsYXRlTWVzc2FnZUZvcm1hdENvbXBpbGVyIGV4dGVuZHMgVHJhbnNsYXRlTWVzc2FnZUZvcm1hdENvbXBpbGVyIHtcbiAgICBjb21waWxlVHJhbnNsYXRpb25zKHZhbHVlOiBhbnksIGxhbmc6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuY29tcGlsZVRyYW5zbGF0aW9ucyh2YWx1ZSwgbGFuZyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHRoZSAke2xhbmd9IHRyYW5zbGF0aW9uczpgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYENoZWNrIHRoZSBtZXNzYWdlZm9ybWF0IGRvY3M6IGh0dHBzOi8vbWVzc2FnZWZvcm1hdC5naXRodWIuaW8vbWVzc2FnZWZvcm1hdC9wYWdlLWd1aWRlYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
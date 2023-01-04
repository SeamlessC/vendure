import { Component, EventEmitter, Input, Output } from '@angular/core';
export class LanguageSelectorComponent {
    constructor() {
        this.disabled = false;
        this.languageCodeChange = new EventEmitter();
    }
}
LanguageSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-language-selector',
                template: "<ng-container *ngIf=\"1 < availableLanguageCodes?.length\">\n    <vdr-dropdown>\n        <button type=\"button\" class=\"btn btn-sm\" vdrDropdownTrigger [disabled]=\"disabled\">\n            <clr-icon shape=\"world\"></clr-icon>\n            {{ 'common.language' | translate }}: {{ currentLanguageCode | localeLanguageName | uppercase }}\n            <clr-icon shape=\"caret down\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                type=\"button\"\n                *ngFor=\"let code of availableLanguageCodes\"\n                (click)=\"languageCodeChange.emit(code)\"\n                vdrDropdownItem\n            >\n                <span>{{ code | localeLanguageName }}</span> <span class=\"code ml2\">{{ code }}</span>\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                styles: [".code{color:var(--color-grey-400)}\n"]
            },] }
];
LanguageSelectorComponent.propDecorators = {
    currentLanguageCode: [{ type: Input }],
    availableLanguageCodes: [{ type: Input }],
    disabled: [{ type: Input }],
    languageCodeChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9sYW5ndWFnZS1zZWxlY3Rvci9sYW5ndWFnZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVN2RSxNQUFNLE9BQU8seUJBQXlCO0lBTHRDO1FBUWEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUNwRSxDQUFDOzs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsdzRCQUFpRDs7YUFFcEQ7OztrQ0FFSSxLQUFLO3FDQUNMLEtBQUs7dUJBQ0wsS0FBSztpQ0FDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWxhbmd1YWdlLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGFuZ3VhZ2Utc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xhbmd1YWdlLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU2VsZWN0b3JDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGN1cnJlbnRMYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZTtcbiAgICBASW5wdXQoKSBhdmFpbGFibGVMYW5ndWFnZUNvZGVzOiBMYW5ndWFnZUNvZGVbXTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBsYW5ndWFnZUNvZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPExhbmd1YWdlQ29kZT4oKTtcbn1cbiJdfQ==
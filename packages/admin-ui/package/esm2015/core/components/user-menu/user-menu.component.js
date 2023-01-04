import { Component, EventEmitter, Input, Output } from '@angular/core';
export class UserMenuComponent {
    constructor() {
        this.userName = '';
        this.availableLanguages = [];
        this.logOut = new EventEmitter();
        this.selectUiLanguage = new EventEmitter();
    }
}
UserMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-user-menu',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link trigger\" vdrDropdownTrigger>\n        <span class=\"user-name\">{{ userName }}</span>\n        <clr-icon shape=\"user\" size=\"24\"></clr-icon>\n        <clr-icon shape=\"caret down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <a [routerLink]=\"['/settings', 'profile']\" vdrDropdownItem>\n            <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon> {{ 'settings.profile' | translate }}\n        </a>\n        <ng-container *ngIf=\"1 < availableLanguages.length\">\n            <button\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"selectUiLanguage.emit()\"\n                [title]=\"'common.select-display-language' | translate\"\n            >\n                <clr-icon shape=\"language\"></clr-icon> {{ uiLanguageAndLocale?.[0] | localeLanguageName }}\n            </button>\n        </ng-container>\n        <div class=\"dropdown-item\">\n            <vdr-theme-switcher></vdr-theme-switcher>\n        </div>\n        <div class=\"dropdown-divider\"></div>\n        <button type=\"button\" vdrDropdownItem (click)=\"logOut.emit()\">\n            <clr-icon shape=\"logout\"></clr-icon> {{ 'common.log-out' | translate }}\n        </button>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.user-name{color:var(--color-grey-200);margin-right:12px}@media screen and (max-width: 768px){.user-name{display:none}}.trigger clr-icon{color:#fff}\n"]
            },] }
];
UserMenuComponent.propDecorators = {
    userName: [{ type: Input }],
    availableLanguages: [{ type: Input }],
    uiLanguageAndLocale: [{ type: Input }],
    logOut: [{ type: Output }],
    selectUiLanguage: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy91c2VyLW1lbnUvdXNlci1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3ZFLE1BQU0sT0FBTyxpQkFBaUI7SUFMOUI7UUFNYSxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsdUJBQWtCLEdBQW1CLEVBQUUsQ0FBQztRQUV2QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBQzFELENBQUM7OztZQVhBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIseTBDQUF5Qzs7YUFFNUM7Ozt1QkFFSSxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSztxQkFDTCxNQUFNOytCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZUNvZGUgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdXNlci1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdXNlci1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi91c2VyLW1lbnUuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlck1lbnVDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHVzZXJOYW1lID0gJyc7XG4gICAgQElucHV0KCkgYXZhaWxhYmxlTGFuZ3VhZ2VzOiBMYW5ndWFnZUNvZGVbXSA9IFtdO1xuICAgIEBJbnB1dCgpIHVpTGFuZ3VhZ2VBbmRMb2NhbGU6IFtMYW5ndWFnZUNvZGUsIHN0cmluZyB8IHVuZGVmaW5lZF07XG4gICAgQE91dHB1dCgpIGxvZ091dCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0VWlMYW5ndWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiJdfQ==
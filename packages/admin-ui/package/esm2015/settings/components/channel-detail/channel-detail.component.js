import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, Permission } from '@vendure/admin-ui/core';
import { CurrencyCode, } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { map, mergeMap, take } from 'rxjs/operators';
export class ChannelDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.serverConfigService = serverConfigService;
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.currencyCodes = Object.values(CurrencyCode);
        this.updatePermission = [Permission.SuperAdmin, Permission.UpdateChannel, Permission.CreateChannel];
        this.customFields = this.getCustomFieldConfig('Channel');
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            token: ['', Validators.required],
            pricesIncludeTax: [false],
            currencyCode: [''],
            defaultShippingZoneId: ['', Validators.required],
            defaultLanguageCode: [],
            defaultTaxZoneId: ['', Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.zones$ = this.dataService.settings.getZones().mapSingle(data => data.zones);
        this.availableLanguageCodes$ = this.serverConfigService.getAvailableLanguages();
    }
    ngOnDestroy() {
        this.destroy();
    }
    saveButtonEnabled() {
        return this.detailForm.dirty && this.detailForm.valid;
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            code: formValue.code,
            token: formValue.token,
            defaultLanguageCode: formValue.defaultLanguageCode,
            pricesIncludeTax: formValue.pricesIncludeTax,
            currencyCode: formValue.currencyCode,
            defaultShippingZoneId: formValue.defaultShippingZoneId,
            defaultTaxZoneId: formValue.defaultTaxZoneId,
            customFields: formValue.customFields,
        };
        this.dataService.settings
            .createChannel(input)
            .pipe(mergeMap(({ createChannel }) => this.dataService.auth.currentUser().single$.pipe(map(({ me }) => ({
            me,
            createChannel,
        })))), mergeMap(({ me, createChannel }) => 
        // tslint:disable-next-line:no-non-null-assertion
        this.dataService.client.updateUserChannels(me.channels).pipe(map(() => createChannel))))
            .subscribe(data => {
            switch (data.__typename) {
                case 'Channel':
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'Channel',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', data.id], { relativeTo: this.route });
                    break;
                case 'LanguageNotAvailableError':
                    this.notificationService.error(data.message);
                    break;
            }
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.entity$
            .pipe(take(1), mergeMap(channel => {
            const input = {
                id: channel.id,
                code: formValue.code,
                token: formValue.token,
                pricesIncludeTax: formValue.pricesIncludeTax,
                currencyCode: formValue.currencyCode,
                defaultShippingZoneId: formValue.defaultShippingZoneId,
                defaultLanguageCode: formValue.defaultLanguageCode,
                defaultTaxZoneId: formValue.defaultTaxZoneId,
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updateChannel(input);
        }))
            .subscribe(({ updateChannel }) => {
            switch (updateChannel.__typename) {
                case 'Channel':
                    this.notificationService.success(_('common.notify-update-success'), {
                        entity: 'Channel',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    break;
                case 'LanguageNotAvailableError':
                    this.notificationService.error(updateChannel.message);
            }
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            code: entity.code,
            token: entity.token || this.generateToken(),
            pricesIncludeTax: entity.pricesIncludeTax,
            currencyCode: entity.currencyCode,
            defaultShippingZoneId: entity.defaultShippingZone ? entity.defaultShippingZone.id : '',
            defaultLanguageCode: entity.defaultLanguageCode,
            defaultTaxZoneId: entity.defaultTaxZone ? entity.defaultTaxZone.id : '',
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), entity);
        }
        if (entity.code === DEFAULT_CHANNEL_CODE) {
            const codeControl = this.detailForm.get('code');
            if (codeControl) {
                codeControl.disable();
            }
        }
    }
    generateToken() {
        const randomString = () => Math.random().toString(36).substr(3, 10);
        return `${randomString()}${randomString()}`;
    }
}
ChannelDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"channel-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"['SuperAdmin', 'UpdateChannel']\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input\n            id=\"code\"\n            type=\"text\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            formControlName=\"code\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel-token' | translate\" for=\"token\">\n        <input\n            id=\"token\"\n            type=\"text\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            formControlName=\"token\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.currency' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"currencyCode\"\n            formControlName=\"currencyCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let code of currencyCodes\" [value]=\"code\">{{ code | localeCurrencyName }}</option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.default-language' | translate\" for=\"defaultLanguage\">\n        <select\n            clrSelect\n            name=\"defaultLanguageCode\"\n            formControlName=\"defaultLanguageCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let languageCode of availableLanguageCodes$ | async\" [value]=\"languageCode\">\n                {{ languageCode | localeLanguageName }} ({{ languageCode | uppercase }})\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.prices-include-tax' | translate\" for=\"pricesIncludeTax\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"pricesIncludeTax\"\n                formControlName=\"pricesIncludeTax\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.default-tax-zone' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"defaultTaxZoneId\"\n            formControlName=\"defaultTaxZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option selected value style=\"display: none\"></option>\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultTaxZoneId\"\n        clrAlertType=\"danger\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-tax-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <vdr-form-field [label]=\"'settings.default-shipping-zone' | translate\" for=\"defaultShippingZoneId\">\n        <select\n            clrSelect\n            name=\"defaultShippingZoneId\"\n            formControlName=\"defaultShippingZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option selected value style=\"display: none\"></option>\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultShippingZoneId\"\n        clrAlertType=\"warning\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-shipping-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Channel\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"channel-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-alert{max-width:30rem;margin-bottom:12px}\n"]
            },] }
];
ChannelDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9jaGFubmVsLWRldGFpbC9jaGFubmVsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFxQixVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RixPQUFPLEVBR0gsWUFBWSxHQUlmLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3JELE1BQU0sT0FBTyxzQkFDVCxTQUFRLG1CQUFxQztJQVU3QyxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNYLG1CQUF3QyxFQUMxQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUss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VyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksV0FBVyxFQUFFO2dCQUNiLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVPLGFBQWE7UUFDakIsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sR0FBRyxZQUFZLEVBQUUsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ2hELENBQUM7OztZQXpLSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsMjNLQUE4QztnQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUF2QndCLE1BQU07WUFBdEIsY0FBYztZQWNkLG1CQUFtQjtZQWhCTSxpQkFBaUI7WUFlMUMsV0FBVztZQWRYLFdBQVc7WUFhWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IEJhc2VEZXRhaWxDb21wb25lbnQsIEN1c3RvbUZpZWxkQ29uZmlnLCBQZXJtaXNzaW9uIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQge1xuICAgIENoYW5uZWwsXG4gICAgQ3JlYXRlQ2hhbm5lbElucHV0LFxuICAgIEN1cnJlbmN5Q29kZSxcbiAgICBHZXRab25lcyxcbiAgICBMYW5ndWFnZUNvZGUsXG4gICAgVXBkYXRlQ2hhbm5lbElucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGdldERlZmF1bHRVaUxhbmd1YWdlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNoYW5uZWwtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2hhbm5lbC1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoYW5uZWwtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWxEZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8Q2hhbm5lbC5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIHpvbmVzJDogT2JzZXJ2YWJsZTxHZXRab25lcy5ab25lc1tdPjtcbiAgICBkZXRhaWxGb3JtOiBGb3JtR3JvdXA7XG4gICAgY3VycmVuY3lDb2RlcyA9IE9iamVjdC52YWx1ZXMoQ3VycmVuY3lDb2RlKTtcbiAgICBhdmFpbGFibGVMYW5ndWFnZUNvZGVzJDogT2JzZXJ2YWJsZTxMYW5ndWFnZUNvZGVbXT47XG4gICAgcmVhZG9ubHkgdXBkYXRlUGVybWlzc2lvbiA9IFtQZXJtaXNzaW9uLlN1cGVyQWRtaW4sIFBlcm1pc3Npb24uVXBkYXRlQ2hhbm5lbCwgUGVybWlzc2lvbi5DcmVhdGVDaGFubmVsXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcm90ZWN0ZWQgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdDaGFubmVsJyk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgY29kZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHRva2VuOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcHJpY2VzSW5jbHVkZVRheDogW2ZhbHNlXSxcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogWycnXSxcbiAgICAgICAgICAgIGRlZmF1bHRTaGlwcGluZ1pvbmVJZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGU6IFtdLFxuICAgICAgICAgICAgZGVmYXVsdFRheFpvbmVJZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuem9uZXMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5nZXRab25lcygpLm1hcFNpbmdsZShkYXRhID0+IGRhdGEuem9uZXMpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUxhbmd1YWdlQ29kZXMkID0gdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLmdldEF2YWlsYWJsZUxhbmd1YWdlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBzYXZlQnV0dG9uRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsRm9ybS5kaXJ0eSAmJiB0aGlzLmRldGFpbEZvcm0udmFsaWQ7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgaW5wdXQ6IENyZWF0ZUNoYW5uZWxJbnB1dCA9IHtcbiAgICAgICAgICAgIGNvZGU6IGZvcm1WYWx1ZS5jb2RlLFxuICAgICAgICAgICAgdG9rZW46IGZvcm1WYWx1ZS50b2tlbixcbiAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGU6IGZvcm1WYWx1ZS5kZWZhdWx0TGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgcHJpY2VzSW5jbHVkZVRheDogZm9ybVZhbHVlLnByaWNlc0luY2x1ZGVUYXgsXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IGZvcm1WYWx1ZS5jdXJyZW5jeUNvZGUsXG4gICAgICAgICAgICBkZWZhdWx0U2hpcHBpbmdab25lSWQ6IGZvcm1WYWx1ZS5kZWZhdWx0U2hpcHBpbmdab25lSWQsXG4gICAgICAgICAgICBkZWZhdWx0VGF4Wm9uZUlkOiBmb3JtVmFsdWUuZGVmYXVsdFRheFpvbmVJZCxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogZm9ybVZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXR0aW5nc1xuICAgICAgICAgICAgLmNyZWF0ZUNoYW5uZWwoaW5wdXQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoeyBjcmVhdGVDaGFubmVsIH0pID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYXV0aC5jdXJyZW50VXNlcigpLnNpbmdsZSQucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoeyBtZSB9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoeyBtZSwgY3JlYXRlQ2hhbm5lbCB9KSA9PlxuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVwZGF0ZVVzZXJDaGFubmVscyhtZSEuY2hhbm5lbHMpLnBpcGUobWFwKCgpID0+IGNyZWF0ZUNoYW5uZWwpKSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDaGFubmVsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0NoYW5uZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsIGRhdGEuaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTGFuZ3VhZ2VOb3RBdmFpbGFibGVFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoY2hhbm5lbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNoYW5uZWwuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBmb3JtVmFsdWUuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBmb3JtVmFsdWUudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZXNJbmNsdWRlVGF4OiBmb3JtVmFsdWUucHJpY2VzSW5jbHVkZVRheCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogZm9ybVZhbHVlLmN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTaGlwcGluZ1pvbmVJZDogZm9ybVZhbHVlLmRlZmF1bHRTaGlwcGluZ1pvbmVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGU6IGZvcm1WYWx1ZS5kZWZhdWx0TGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRheFpvbmVJZDogZm9ybVZhbHVlLmRlZmF1bHRUYXhab25lSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgVXBkYXRlQ2hhbm5lbElucHV0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy51cGRhdGVDaGFubmVsKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHsgdXBkYXRlQ2hhbm5lbCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh1cGRhdGVDaGFubmVsLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ2hhbm5lbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDaGFubmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0xhbmd1YWdlTm90QXZhaWxhYmxlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHVwZGF0ZUNoYW5uZWwubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBmb3JtIHZhbHVlcyB3aGVuIHRoZSBlbnRpdHkgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IENoYW5uZWwuRnJhZ21lbnQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgIGNvZGU6IGVudGl0eS5jb2RlLFxuICAgICAgICAgICAgdG9rZW46IGVudGl0eS50b2tlbiB8fCB0aGlzLmdlbmVyYXRlVG9rZW4oKSxcbiAgICAgICAgICAgIHByaWNlc0luY2x1ZGVUYXg6IGVudGl0eS5wcmljZXNJbmNsdWRlVGF4LFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBlbnRpdHkuY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZUlkOiBlbnRpdHkuZGVmYXVsdFNoaXBwaW5nWm9uZSA/IGVudGl0eS5kZWZhdWx0U2hpcHBpbmdab25lLmlkIDogJycsXG4gICAgICAgICAgICBkZWZhdWx0TGFuZ3VhZ2VDb2RlOiBlbnRpdHkuZGVmYXVsdExhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgIGRlZmF1bHRUYXhab25lSWQ6IGVudGl0eS5kZWZhdWx0VGF4Wm9uZSA/IGVudGl0eS5kZWZhdWx0VGF4Wm9uZS5pZCA6ICcnLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXN0b21GaWVsZEZvcm1WYWx1ZXModGhpcy5jdXN0b21GaWVsZHMsIHRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnXSksIGVudGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudGl0eS5jb2RlID09PSBERUZBVUxUX0NIQU5ORUxfQ09ERSkge1xuICAgICAgICAgICAgY29uc3QgY29kZUNvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjb2RlJyk7XG4gICAgICAgICAgICBpZiAoY29kZUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICBjb2RlQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlVG9rZW4oKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZG9tU3RyaW5nID0gKCkgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDMsIDEwKTtcbiAgICAgICAgcmV0dXJuIGAke3JhbmRvbVN0cmluZygpfSR7cmFuZG9tU3RyaW5nKCl9YDtcbiAgICB9XG59XG4iXX0=
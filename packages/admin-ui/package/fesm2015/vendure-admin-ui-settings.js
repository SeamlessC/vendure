import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Output, Directive, TemplateRef, ContentChild, Injectable, NgModule } from '@angular/core';
import * as i2 from '@vendure/admin-ui/core';
import { DataService, BaseDetailComponent, Permission, ServerConfigService, NotificationService, BaseListComponent, ModalService, CurrencyCode, createUpdatedTranslatable, findTranslation, DeletionResult, LanguageCode, configurableDefinitionToInstance, toConfigurableOperationInput, getConfigArgValue, LocalStorageService, BaseEntityResolver, getDefaultUiLanguage, createResolveData, CanDeactivateDetailGuard, detailBreadcrumb, SharedModule } from '@vendure/admin-ui/core';
import { map, take, mergeMap, switchMap, startWith, tap, withLatestFrom, takeUntil, distinctUntilChanged, mapTo } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import * as i1 from '@angular/router';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CUSTOMER_ROLE_CODE, DEFAULT_CHANNEL_CODE, SUPER_ADMIN_ROLE_CODE } from '@vendure/common/lib/shared-constants';
import { EMPTY, Subject, combineLatest, of, merge } from 'rxjs';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { unique } from '@vendure/common/lib/unique';

class AddCountryToZoneDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.currentMembers = [];
        this.selectedMemberIds = [];
    }
    ngOnInit() {
        const currentMemberIds = this.currentMembers.map(m => m.id);
        this.availableCountries$ = this.dataService.settings
            .getCountries(999)
            .mapStream(data => data.countries.items)
            .pipe(map(countries => countries.filter(c => !currentMemberIds.includes(c.id))));
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedMemberIds);
    }
}
AddCountryToZoneDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-country-to-zone-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}</ng-template>\n\n<vdr-zone-member-list\n    [members]=\"availableCountries$ | async\"\n    [selectedMemberIds]=\"selectedMemberIds\"\n    (selectionChange)=\"selectedMemberIds = $event\"\n>\n</vdr-zone-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedMemberIds.length\" class=\"btn btn-primary\">\n        {{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AddCountryToZoneDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class AdminDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.selectedRoles = [];
        this.selectedRolePermissions = {};
        this.selectedChannelId = null;
        this.customFields = this.getCustomFieldConfig('Administrator');
        this.detailForm = this.formBuilder.group({
            emailAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: [''],
            roles: [[]],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    getAvailableChannels() {
        return Object.values(this.selectedRolePermissions);
    }
    ngOnInit() {
        this.init();
        this.administrator$ = this.entity$;
        this.allRoles$ = this.dataService.administrator
            .getRoles(999)
            .mapStream(item => item.roles.items.filter(i => i.code !== CUSTOMER_ROLE_CODE));
        this.dataService.client.userStatus().single$.subscribe(({ userStatus }) => {
            if (!userStatus.permissions.includes(Permission.UpdateAdministrator)) {
                const rolesSelect = this.detailForm.get('roles');
                if (rolesSelect) {
                    rolesSelect.disable();
                }
            }
        });
        this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
    }
    ngOnDestroy() {
        this.destroy();
    }
    rolesChanged(roles) {
        this.buildPermissionsMap();
    }
    getPermissionsForSelectedChannel() {
        function getActivePermissions(input) {
            return Object.entries(input)
                .filter(([permission, active]) => active)
                .map(([permission, active]) => permission);
        }
        if (this.selectedChannelId) {
            const selectedChannel = this.selectedRolePermissions[this.selectedChannelId];
            if (selectedChannel) {
                const permissionMap = this.selectedRolePermissions[this.selectedChannelId].permissions;
                return getActivePermissions(permissionMap);
            }
        }
        const channels = Object.values(this.selectedRolePermissions);
        if (0 < channels.length) {
            this.selectedChannelId = channels[0].channelId;
            return getActivePermissions(channels[0].permissions);
        }
        return [];
    }
    create() {
        const formValue = this.detailForm.value;
        const administrator = {
            emailAddress: formValue.emailAddress,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            password: formValue.password,
            customFields: formValue.customFields,
            roleIds: formValue.roles.map(role => role.id),
        };
        this.dataService.administrator.createAdministrator(administrator).subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createAdministrator.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Administrator',
            });
        });
    }
    save() {
        this.administrator$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const administrator = {
                id,
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                customFields: formValue.customFields,
                roleIds: formValue.roles.map(role => role.id),
            };
            return this.dataService.administrator.updateAdministrator(administrator);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Administrator',
            });
        });
    }
    setFormValues(administrator, languageCode) {
        this.detailForm.patchValue({
            emailAddress: administrator.emailAddress,
            firstName: administrator.firstName,
            lastName: administrator.lastName,
            roles: administrator.user.roles,
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), administrator);
        }
        const passwordControl = this.detailForm.get('password');
        if (passwordControl) {
            if (!administrator.id) {
                passwordControl.setValidators([Validators.required]);
            }
            else {
                passwordControl.setValidators([]);
            }
        }
        this.buildPermissionsMap();
    }
    buildPermissionsMap() {
        const permissionsControl = this.detailForm.get('roles');
        if (permissionsControl) {
            const roles = permissionsControl.value;
            const channelIdPermissionsMap = new Map();
            const channelIdCodeMap = new Map();
            for (const role of roles) {
                for (const channel of role.channels) {
                    const channelPermissions = channelIdPermissionsMap.get(channel.id);
                    const permissionSet = channelPermissions || new Set();
                    role.permissions.forEach(p => permissionSet.add(p));
                    channelIdPermissionsMap.set(channel.id, permissionSet);
                    channelIdCodeMap.set(channel.id, channel.code);
                }
            }
            this.selectedRolePermissions = {};
            for (const channelId of Array.from(channelIdPermissionsMap.keys())) {
                // tslint:disable-next-line:no-non-null-assertion
                const permissionSet = channelIdPermissionsMap.get(channelId);
                const permissionsHash = {};
                for (const def of this.serverConfigService.getPermissionDefinitions()) {
                    permissionsHash[def.name] = permissionSet.has(def.name);
                }
                this.selectedRolePermissions[channelId] = {
                    // tslint:disable:no-non-null-assertion
                    channelId,
                    channelCode: channelIdCodeMap.get(channelId),
                    permissions: permissionsHash,
                    // tslint:enable:no-non-null-assertion
                };
            }
        }
    }
}
AdminDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-admin-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input\n            id=\"emailAddress\"\n            type=\"text\"\n            formControlName=\"emailAddress\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input\n            id=\"firstName\"\n            type=\"text\"\n            formControlName=\"firstName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input\n            id=\"lastName\"\n            type=\"text\"\n            formControlName=\"lastName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <vdr-form-field\n        *ngIf=\"!(isNew$ | async) && ('UpdateAdministrator' | hasPermission)\"\n        [label]=\"'settings.password' | translate\"\n        for=\"password\"\n        [readOnlyToggle]=\"true\"\n    >\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Administrator\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"administrator-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n    <label class=\"clr-control-label\">{{ 'settings.roles' | translate }}</label>\n    <ng-select\n        [items]=\"allRoles$ | async\"\n        [multiple]=\"true\"\n        [hideSelected]=\"true\"\n        formControlName=\"roles\"\n        (change)=\"rolesChanged($event)\"\n        bindLabel=\"description\"\n    ></ng-select>\n\n    <ul class=\"nav\" role=\"tablist\">\n        <li role=\"presentation\" class=\"nav-item\" *ngFor=\"let channel of getAvailableChannels()\">\n            <button\n                [id]=\"channel.channelId\"\n                (click)=\"selectedChannelId = channel.channelId\"\n                class=\"btn btn-link nav-link\"\n                [class.active]=\"selectedChannelId === channel.channelId\"\n                [attr.aria-selected]=\"selectedChannelId === channel.channelId\"\n                type=\"button\"\n            >\n                {{ channel.channelCode | channelCodeToLabel | translate }}\n            </button>\n        </li>\n    </ul>\n    <vdr-permission-grid\n        [activePermissions]=\"getPermissionsForSelectedChannel()\"\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [readonly]=\"true\"\n    ></vdr-permission-grid>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AdminDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class AdministratorListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        super.setQueryFn((...args) => this.dataService.administrator.getAdministrators(...args), (data) => data.administrators);
    }
    deleteAdministrator(administrator) {
        return this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-administrator'),
            body: `${administrator.firstName} ${administrator.lastName}`,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap((res) => res ? this.dataService.administrator.deleteAdministrator(administrator.id) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Administrator',
            });
            this.refresh();
        }, (err) => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Administrator',
            });
        });
    }
}
AdministratorListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-administrator-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'admin.create-new-administrator' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'settings.first-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.last-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-administrator=\"item\">\n        <td class=\"left align-middle\">{{ administrator.firstName }}</td>\n        <td class=\"left align-middle\">{{ administrator.lastName }}</td>\n        <td class=\"left align-middle\">{{ administrator.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', administrator.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteAdministrator(administrator)\"\n                        [disabled]=\"!('DeleteAdministrator' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [""]
            },] }
];
AdministratorListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];

class ChannelDetailComponent extends BaseDetailComponent {
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
                    this.notificationService.success(marker('common.notify-create-success'), {
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
                    this.notificationService.success(marker('common.notify-update-success'), {
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

class ChannelListComponent {
    constructor(dataService, modalService, notificationService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.refresh$ = new Subject();
        this.channels$ = this.refresh$.pipe(startWith(1), switchMap(() => this.dataService.settings.getChannels().mapStream(data => data.channels)));
    }
    isDefaultChannel(channelCode) {
        return channelCode === DEFAULT_CHANNEL_CODE;
    }
    deleteChannel(id) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-channel'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.settings.deleteChannel(id) : EMPTY)), mergeMap(() => this.dataService.auth.currentUser().single$), 
        // tslint:disable-next-line:no-non-null-assertion
        mergeMap(data => this.dataService.client.updateUserChannels(data.me.channels)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Channel',
            });
            this.refresh$.next(1);
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Channel',
            });
        });
    }
}
ChannelListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"channel-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['SuperAdmin', 'CreateChannel']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-channel' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"channels$ | async\">\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-channel=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n            {{ channel.code | channelCodeToLabel | translate }}\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', channel.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger [disabled]=\"isDefaultChannel(channel.code)\">\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteChannel(channel.id)\"\n                        [disabled]=\"!(['SuperAdmin', 'DeleteChannel'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ChannelListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService }
];

class CountryDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateCountry];
        this.customFields = this.getCustomFieldConfig('Country');
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            enabled: [true],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.country$ = this.entity$;
    }
    ngOnDestroy() {
        this.destroy();
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        combineLatest(this.country$, this.languageCode$)
            .pipe(take(1), mergeMap(([country, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = createUpdatedTranslatable({
                translatable: country,
                updatedFields: formValue,
                customFieldConfig: this.customFields,
                languageCode,
                defaultTranslation: {
                    name: formValue.name,
                    languageCode,
                },
            });
            return this.dataService.settings.createCountry(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'Country',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createCountry.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Country',
            });
        });
    }
    save() {
        combineLatest(this.country$, this.languageCode$)
            .pipe(take(1), mergeMap(([country, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = createUpdatedTranslatable({
                translatable: country,
                updatedFields: formValue,
                customFieldConfig: this.customFields,
                languageCode,
                defaultTranslation: {
                    name: formValue.name,
                    languageCode,
                },
            });
            return this.dataService.settings.updateCountry(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Country',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Country',
            });
        });
    }
    setFormValues(country, languageCode) {
        const currentTranslation = findTranslation(country, languageCode);
        this.detailForm.patchValue({
            code: country.code,
            name: currentTranslation ? currentTranslation.name : '',
            enabled: country.enabled,
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), country, currentTranslation);
        }
    }
}
CountryDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-country-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"country-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                *vdrIfPermissions=\"updatePermission\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Country\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"country-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CountryDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class CountryListComponent {
    constructor(dataService, notificationService, modalService, serverConfigService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.serverConfigService = serverConfigService;
        this.searchTerm = new FormControl('');
        this.countries = [];
        this.destroy$ = new Subject();
        this.refresh$ = new Subject();
    }
    ngOnInit() {
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage);
        const countries$ = combineLatest(this.contentLanguage$, this.searchTerm.valueChanges.pipe(startWith(null))).pipe(map(([__, term]) => term), switchMap(term => this.dataService.settings.getCountries(999, 0, term).single$), tap(data => {
            this.countries = data.countries.items;
        }), map(data => data.countries.items));
        this.zones$ = this.dataService.settings.getZones().mapStream(data => data.zones);
        this.countriesWithZones$ = combineLatest(countries$, this.zones$).pipe(map(([countries, zones]) => {
            return countries.map(country => (Object.assign(Object.assign({}, country), { zones: zones.filter(z => !!z.members.find(c => c.id === country.id)) })));
        }));
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
    }
    ngOnDestroy() {
        this.destroy$.next(undefined);
        this.destroy$.complete();
    }
    setLanguage(code) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }
    deleteCountry(countryId) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-country'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.dataService.settings.deleteCountry(countryId) : EMPTY))
            .subscribe(response => {
            if (response.deleteCountry.result === DeletionResult.DELETED) {
                this.notificationService.success(marker('common.notify-delete-success'), {
                    entity: 'Country',
                });
                this.dataService.settings.getCountries(999, 0).single$.subscribe();
            }
            else {
                this.notificationService.error(response.deleteCountry.message || '');
            }
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Country',
            });
        });
    }
    isZone(input) {
        return input.hasOwnProperty('id');
    }
}
CountryListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-country-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"searchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'settings.search-country-by-name' | translate\"\n            class=\"search-input\"\n        />\n        <div>\n            <vdr-language-selector\n                [availableLanguageCodes]=\"availableLanguages$ | async\"\n                [currentLanguageCode]=\"contentLanguage$ | async\"\n                (languageCodeChange)=\"setLanguage($event)\"\n            ></vdr-language-selector>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"country-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            [routerLink]=\"['./create']\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateCountry']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-country' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"countriesWithZones$ | async\">\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.zone' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-country=\"item\">\n        <td class=\"left align-middle\">{{ country.code }}</td>\n        <td class=\"left align-middle\">{{ country.name }}</td>\n        <td class=\"left align-middle\">\n            <a\n                [routerLink]=\"['/settings', 'zones', { contents: zone.id }]\"\n                *ngFor=\"let zone of country.zones\"\n            >\n                <vdr-chip [colorFrom]=\"zone.name\">{{ zone.name }}</vdr-chip>\n            </a>\n        </td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"country.enabled\"\n                [attr.shape]=\"country.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', country.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCountry(country.id)\"\n                        vdrDropdownItem\n                        [disabled]=\"!(['DeleteSettings', 'DeleteCountry'] | hasPermission)\"\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-input{margin-top:6px;min-width:300px}\n"]
            },] }
];
CountryListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: ServerConfigService }
];

class GlobalSettingsComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.languageCodes = Object.values(LanguageCode);
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateGlobalSettings];
        this.customFields = this.getCustomFieldConfig('GlobalSettings');
        this.detailForm = this.formBuilder.group({
            availableLanguages: [''],
            trackInventory: false,
            outOfStockThreshold: [0, Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.dataService.client.userStatus().single$.subscribe(({ userStatus }) => {
            if (!userStatus.permissions.includes(Permission.UpdateSettings)) {
                const languagesSelect = this.detailForm.get('availableLanguages');
                if (languagesSelect) {
                    languagesSelect.disable();
                }
            }
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        this.dataService.settings
            .updateGlobalSettings(this.detailForm.value)
            .pipe(tap(({ updateGlobalSettings }) => {
            switch (updateGlobalSettings.__typename) {
                case 'GlobalSettings':
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success(marker('common.notify-update-success'), {
                        entity: 'Settings',
                    });
                    break;
                case 'ChannelDefaultLanguageError':
                    this.notificationService.error(updateGlobalSettings.message);
            }
        }), switchMap(() => this.serverConfigService.refreshGlobalSettings()), withLatestFrom(this.dataService.client.uiState().single$))
            .subscribe(([{ globalSettings }, { uiState }]) => {
            const availableLangs = globalSettings.availableLanguages;
            if (availableLangs.length && !availableLangs.includes(uiState.contentLanguage)) {
                this.dataService.client.setContentLanguage(availableLangs[0]).subscribe();
            }
        });
    }
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            availableLanguages: entity.availableLanguages,
            trackInventory: entity.trackInventory,
            outOfStockThreshold: entity.outOfStockThreshold,
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
        }
    }
}
GlobalSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-global-settings',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"global-settings-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            *vdrIfPermissions=\"updatePermission\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.available-languages' | translate\" for=\"availableLanguages\">\n        <ng-select\n            [items]=\"languageCodes\"\n            [addTag]=\"false\"\n            [hideSelected]=\"true\"\n            multiple=\"true\"\n            appendTo=\"body\"\n            formControlName=\"availableLanguages\"\n        >\n            <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                <span class=\"ng-value-icon left\" (click)=\"clear.call(null, item)\" aria-hidden=\"true\">\n                    \u00D7\n                </span>\n                <span class=\"ng-value-label\">{{ item | localeLanguageName }} ({{ item }})</span>\n            </ng-template>\n            <ng-template ng-option-tmp let-item=\"item\">\n                {{ item | localeLanguageName }} ({{ item }})\n            </ng-template>\n        </ng-select>\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.global-out-of-stock-threshold' | translate\"\n        for=\"outOfStockThreshold\"\n        [tooltip]=\"'settings.global-out-of-stock-threshold-tooltip' | translate\"\n    >\n        <input\n            id=\"outOfStockThreshold\"\n            type=\"number\"\n            formControlName=\"outOfStockThreshold\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.track-inventory-default' | translate\"\n        for=\"enabled\"\n        [tooltip]=\"'catalog.track-inventory-tooltip' | translate\"\n    >\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                name=\"enabled\"\n                formControlName=\"trackInventory\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"GlobalSettings\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"global-settings-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["::ng-deep ng-select .ng-value>span{margin:0!important}::ng-deep ng-select .ng-arrow-wrapper .ng-arrow{margin:0!important}::ng-deep ng-select .ng-select-container>span{margin:0!important}\n"]
            },] }
];
GlobalSettingsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class PaymentMethodDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.checkers = [];
        this.handlers = [];
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdatePaymentMethod];
        this.customFields = this.getCustomFieldConfig('PaymentMethod');
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: '',
            enabled: [true, Validators.required],
            checker: {},
            handler: {},
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        combineLatest([
            this.dataService.settings.getPaymentMethodOperations().single$,
            this.entity$.pipe(take(1)),
        ]).subscribe(([data, entity]) => {
            this.checkers = data.paymentMethodEligibilityCheckers;
            this.handlers = data.paymentMethodHandlers;
            this.changeDetector.markForCheck();
            this.selectedCheckerDefinition = data.paymentMethodEligibilityCheckers.find(c => c.code === (entity.checker && entity.checker.code));
            this.selectedHandlerDefinition = data.paymentMethodHandlers.find(c => c.code === (entity.handler && entity.handler.code));
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    configArgsIsPopulated() {
        const configArgsGroup = this.detailForm.get('configArgs');
        if (!configArgsGroup) {
            return false;
        }
        return 0 < Object.keys(configArgsGroup.controls).length;
    }
    selectChecker(checker) {
        this.selectedCheckerDefinition = checker;
        this.selectedChecker = configurableDefinitionToInstance(checker);
        const formControl = this.detailForm.get('checker');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedChecker);
        }
        this.detailForm.markAsDirty();
    }
    selectHandler(handler) {
        this.selectedHandlerDefinition = handler;
        this.selectedHandler = configurableDefinitionToInstance(handler);
        const formControl = this.detailForm.get('handler');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedHandler);
        }
        this.detailForm.markAsDirty();
    }
    removeChecker() {
        this.selectedChecker = null;
        this.detailForm.markAsDirty();
    }
    removeHandler() {
        this.selectedHandler = null;
        this.detailForm.markAsDirty();
    }
    create() {
        const selectedChecker = this.selectedChecker;
        const selectedHandler = this.selectedHandler;
        if (!selectedHandler) {
            return;
        }
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const input = {
                name: formValue.name,
                code: formValue.code,
                description: formValue.description,
                enabled: formValue.enabled,
                checker: selectedChecker
                    ? toConfigurableOperationInput(selectedChecker, formValue.checker)
                    : null,
                handler: toConfigurableOperationInput(selectedHandler, formValue.handler),
                customFields: formValue.customFields,
            };
            return this.dataService.settings.createPaymentMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createPaymentMethod.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'PaymentMethod',
            });
        });
    }
    save() {
        const selectedChecker = this.selectedChecker;
        const selectedHandler = this.selectedHandler;
        if (!selectedHandler) {
            return;
        }
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const input = {
                id,
                name: formValue.name,
                code: formValue.code,
                description: formValue.description,
                enabled: formValue.enabled,
                checker: selectedChecker
                    ? toConfigurableOperationInput(selectedChecker, formValue.checker)
                    : null,
                handler: toConfigurableOperationInput(selectedHandler, formValue.handler),
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updatePaymentMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'PaymentMethod',
            });
        });
    }
    setFormValues(paymentMethod) {
        this.detailForm.patchValue({
            name: paymentMethod.name,
            code: paymentMethod.code,
            description: paymentMethod.description,
            enabled: paymentMethod.enabled,
            checker: paymentMethod.checker || {},
            handler: paymentMethod.handler || {},
        });
        if (!this.selectedChecker) {
            this.selectedChecker = paymentMethod.checker && {
                code: paymentMethod.checker.code,
                args: paymentMethod.checker.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
        if (!this.selectedHandler) {
            this.selectedHandler = paymentMethod.handler && {
                code: paymentMethod.handler.code,
                args: paymentMethod.handler.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), paymentMethod);
        }
    }
}
PaymentMethodDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-method-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"payment-method-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            [disabled]=\"detailForm.pristine || detailForm.invalid\"\n            (click)=\"create()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.pristine || detailForm.invalid || !selectedHandler\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as paymentMethod\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            (input)=\"updateCode(paymentMethod.code, $event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"updatePermission | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-rich-text-editor\n        formControlName=\"description\"\n        [readonly]=\"!(updatePermission | hasPermission)\"\n        [label]=\"'common.description' | translate\"\n    ></vdr-rich-text-editor>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"description\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"enabled\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"PaymentMethod\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n\n    <vdr-custom-detail-component-host\n        locationId=\"payment-method-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n\n    <div class=\"clr-row mt4\">\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-eligibility-checker' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedChecker && selectedCheckerDefinition\"\n                [operation]=\"selectedChecker\"\n                [operationDefinition]=\"selectedCheckerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeChecker()\"\n                formControlName=\"checker\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedChecker || !selectedCheckerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let checker of checkers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectChecker(checker)\"\n                        >\n                            {{ checker.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-handler' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedHandler && selectedHandlerDefinition\"\n                [operation]=\"selectedHandler\"\n                [operationDefinition]=\"selectedHandlerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeHandler()\"\n                formControlName=\"handler\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedHandler || !selectedHandlerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let handler of handlers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectHandler(handler)\"\n                        >\n                            {{ handler.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PaymentMethodDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class PaymentMethodListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        super.setQueryFn((...args) => this.dataService.settings.getPaymentMethods(...args).refetchOnChannelChange(), data => data.paymentMethods);
    }
    deletePaymentMethod(paymentMethodId) {
        this.showModalAndDelete(paymentMethodId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(paymentMethodId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), 
        // Refresh the cached facets to reflect the changes
        switchMap(() => this.dataService.settings.getPaymentMethods(100).single$))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'PaymentMethod',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'PaymentMethod',
            });
        });
    }
    showModalAndDelete(paymentMethodId, message) {
        return this.modalService
            .dialog({
            title: marker('settings.confirm-delete-payment-method'),
            body: message,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => res ? this.dataService.settings.deletePaymentMethod(paymentMethodId, !!message) : EMPTY), map(res => res.deletePaymentMethod));
    }
}
PaymentMethodListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-method-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"payment-method-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreatePaymentMethod']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-payment-method' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-paymentMethod=\"item\">\n        <td class=\"left align-middle\">{{ paymentMethod.code }}</td>\n        <td class=\"left align-middle\">{{ paymentMethod.enabled }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', paymentMethod.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deletePaymentMethod(paymentMethod.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeletePaymentMethod'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PaymentMethodListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];

/**
 * A table showing and allowing the setting of all possible CRUD permissions.
 */
class PermissionGridComponent {
    constructor() {
        this.readonly = false;
        this.permissionChange = new EventEmitter();
    }
    ngOnInit() {
        this.buildGrid();
    }
    setPermission(permission, value) {
        if (!this.readonly) {
            this.permissionChange.emit({ permission, value });
        }
    }
    toggleAll(defs) {
        const value = defs.some(d => !this.activePermissions.includes(d.name));
        for (const def of defs) {
            this.permissionChange.emit({ permission: def.name, value });
        }
    }
    buildGrid() {
        var _a;
        const crudGroups = new Map();
        const nonCrud = [];
        const crudRe = /^(Create|Read|Update|Delete)([a-zA-Z]+)$/;
        for (const def of this.permissionDefinitions) {
            const isCrud = crudRe.test(def.name);
            if (isCrud) {
                const groupName = (_a = def.name.match(crudRe)) === null || _a === void 0 ? void 0 : _a[2];
                if (groupName) {
                    const existing = crudGroups.get(groupName);
                    if (existing) {
                        existing.push(def);
                    }
                    else {
                        crudGroups.set(groupName, [def]);
                    }
                }
            }
            else if (def.assignable) {
                nonCrud.push(def);
            }
        }
        this.gridData = [
            ...nonCrud.map(d => ({
                label: d.name,
                description: d.description,
                permissions: [d],
            })),
            ...Array.from(crudGroups.entries()).map(([label, defs]) => {
                return {
                    label,
                    description: this.extractCrudDescription(defs[0]),
                    permissions: defs,
                };
            }),
        ];
    }
    extractCrudDescription(def) {
        return def.description.replace(/Grants permission to [\w]+/, 'Grants permissions on');
    }
}
PermissionGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-permission-grid',
                template: "<table class=\"table\">\n    <tbody>\n        <tr *ngFor=\"let section of gridData\">\n            <td class=\"permission-group left\">\n                <div><strong>{{ section.label | translate }}</strong></div>\n                <small>{{ section.description | translate }}</small><br>\n                <button *ngIf=\"1 < section.permissions.length && !readonly\" class=\"btn btn-sm btn-link\" (click)=\"toggleAll(section.permissions)\">\n                    {{ 'common.toggle-all' | translate }}\n                </button>\n            </td>\n            <td *ngFor=\"let permission of section.permissions\" [attr.colspan]=\"section.permissions.length === 1 ? 4 : 1\">\n                <vdr-select-toggle\n                    size=\"small\"\n                    [title]=\"permission.description\"\n                    [label]=\"permission.name\"\n                    [disabled]=\"readonly\"\n                    [selected]=\"activePermissions?.includes(permission.name)\"\n                    (selectedChange)=\"setPermission(permission.name, $event)\"\n                ></vdr-select-toggle>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["td.permission-group{max-width:300px;background-color:var(--color-component-bg-200)}\n"]
            },] }
];
PermissionGridComponent.propDecorators = {
    permissionDefinitions: [{ type: Input }],
    activePermissions: [{ type: Input }],
    readonly: [{ type: Input }],
    permissionChange: [{ type: Output }]
};

class ProfileComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.customFields = this.getCustomFieldConfig('Administrator');
        this.detailForm = this.formBuilder.group({
            emailAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: [''],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    save() {
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const administrator = {
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                customFields: formValue.customFields,
            };
            return this.dataService.administrator.updateActiveAdministrator(administrator);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Administrator',
            });
        });
    }
    setFormValues(administrator, languageCode) {
        this.detailForm.patchValue({
            emailAddress: administrator.emailAddress,
            firstName: administrator.firstName,
            lastName: administrator.lastName,
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), administrator);
        }
    }
}
ProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-profile',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\"/>\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.password' | translate\" for=\"password\" [readOnlyToggle]=\"true\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\"/>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Administrator\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"administrator-profile\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ProfileComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class RoleDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            description: ['', Validators.required],
            channelIds: [],
            permissions: [],
        });
    }
    ngOnInit() {
        this.init();
        this.role$ = this.entity$;
        this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(nameValue) {
        const codeControl = this.detailForm.get(['code']);
        if (codeControl && codeControl.pristine) {
            codeControl.setValue(normalizeString(nameValue, '-'));
        }
    }
    setPermission(change) {
        const permissionsControl = this.detailForm.get('permissions');
        if (permissionsControl) {
            const currentPermissions = permissionsControl.value;
            const newValue = change.value === true
                ? unique([...currentPermissions, change.permission])
                : currentPermissions.filter(p => p !== change.permission);
            permissionsControl.setValue(newValue);
            permissionsControl.markAsDirty();
        }
    }
    create() {
        const formValue = this.detailForm.value;
        const role = formValue;
        this.dataService.administrator.createRole(role).subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), { entity: 'Role' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createRole.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Role',
            });
        });
    }
    save() {
        this.role$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const role = Object.assign({ id }, formValue);
            return this.dataService.administrator.updateRole(role);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), { entity: 'Role' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Role',
            });
        });
    }
    setFormValues(role, languageCode) {
        this.detailForm.patchValue({
            description: role.description,
            code: role.code,
            channelIds: role.channels.map(c => c.id),
            permissions: role.permissions,
        });
        // This was required to get the channel selector component to
        // correctly display its contents. A while spent debugging the root
        // cause did not yield a solution, therefore this next line.
        this.changeDetector.detectChanges();
    }
}
RoleDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-role-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.description' | translate\" for=\"description\">\n        <input\n            id=\"description\"\n            type=\"text\"\n            formControlName=\"description\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n            (input)=\"updateCode($event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"'UpdateAdministrator' | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel' | translate\">\n        <vdr-channel-assignment-control\n            formControlName=\"channelIds\"\n            [vdrDisabled]=\"!('UpdateAdministrator' | hasPermission)\"\n        ></vdr-channel-assignment-control>\n    </vdr-form-field>\n    <label>{{ 'settings.permissions' | translate }}</label>\n    <vdr-permission-grid\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [activePermissions]=\"detailForm.get('permissions')?.value\"\n        (permissionChange)=\"setPermission($event)\"\n        [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n    ></vdr-permission-grid>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
RoleDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class RoleListComponent extends BaseListComponent {
    constructor(modalService, notificationService, dataService, router, route) {
        super(router, route);
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.initialLimit = 3;
        this.displayLimit = {};
        super.setQueryFn((...args) => this.dataService.administrator.getRoles(...args), data => data.roles);
    }
    ngOnInit() {
        super.ngOnInit();
        this.visibleRoles$ = this.items$.pipe(map(roles => roles.filter(role => role.code !== CUSTOMER_ROLE_CODE)));
    }
    toggleDisplayLimit(role) {
        if (this.displayLimit[role.id] === role.permissions.length) {
            this.displayLimit[role.id] = this.initialLimit;
        }
        else {
            this.displayLimit[role.id] = role.permissions.length;
        }
    }
    isDefaultRole(role) {
        return role.code === SUPER_ADMIN_ROLE_CODE || role.code === CUSTOMER_ROLE_CODE;
    }
    deleteRole(id) {
        this.modalService
            .dialog({
            title: marker('settings.confirm-delete-role'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.administrator.deleteRole(id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Role',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Role',
            });
        });
    }
}
RoleListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-role-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-role' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"visibleRoles$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.description' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.channel' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.permissions' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-role=\"item\">\n        <td class=\"left align-middle\">{{ role.description }}</td>\n        <td class=\"left align-middle\"><span *ngIf=\"!isDefaultRole(role)\">{{ role.code }}</span></td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role)\">\n                <vdr-chip *ngFor=\"let channel of role.channels\">\n                    <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                    {{ channel.code | channelCodeToLabel | translate }}\n                </vdr-chip>\n            </ng-container>\n        </td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role); else defaultRole\">\n                <vdr-chip *ngFor=\"let permission of role.permissions |  slice: 0:displayLimit[role.id] || 3\">{{ permission }}</vdr-chip>\n                <button\n                    class=\"btn btn-sm btn-secondary btn-icon\"\n                    *ngIf=\"role.permissions.length > initialLimit\"\n                    (click)=\"toggleDisplayLimit(role)\"\n                >\n                    <ng-container *ngIf=\"(displayLimit[role.id] || 0) < role.permissions.length; else collapse\">\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ role.permissions.length - initialLimit }}\n                    </ng-container>\n                    <ng-template #collapse>\n                        <clr-icon shape=\"minus\"></clr-icon>\n                    </ng-template>\n                </button>\n            </ng-container>\n            <ng-template #defaultRole>\n                <span class=\"default-role-label\">{{ 'settings.default-role-label' | translate }}</span>\n            </ng-template>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                *ngIf=\"!isDefaultRole(role)\"\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', role.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger [disabled]=\"isDefaultRole(role)\">\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteRole(role.id)\"\n                        [disabled]=\"!('SuperAdmin' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".default-role-label{color:var(--color-grey-400)}\n"]
            },] }
];
RoleListComponent.ctorParameters = () => [
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];

class ShippingEligibilityTestResultComponent {
    constructor() {
        this.okToRun = false;
        this.testDataUpdated = false;
        this.runTest = new EventEmitter();
    }
}
ShippingEligibilityTestResultComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-eligibility-test-result',
                template: "<div class=\"test-result card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\" *ngFor=\"let quote of testResult\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-block\" *ngIf=\"testResult?.length === 0\">\n        <clr-icon shape=\"ban\" class=\"is-solid error\"></clr-icon>\n        {{ 'settings.no-eligible-shipping-methods' | translate }}\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-methods' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}clr-icon.error{color:var(--color-error-500)}\n"]
            },] }
];
ShippingEligibilityTestResultComponent.propDecorators = {
    testResult: [{ type: Input }],
    okToRun: [{ type: Input }],
    testDataUpdated: [{ type: Input }],
    currencyCode: [{ type: Input }],
    runTest: [{ type: Output }]
};

class ShippingMethodDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.checkers = [];
        this.calculators = [];
        this.fulfillmentHandlers = [];
        this.testDataUpdated = false;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateShippingMethod];
        this.fetchTestResult$ = new Subject();
        this.customFields = this.getCustomFieldConfig('ShippingMethod');
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: '',
            fulfillmentHandler: ['', Validators.required],
            checker: {},
            calculator: {},
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        combineLatest([
            this.dataService.shippingMethod.getShippingMethodOperations().single$,
            this.entity$.pipe(take(1)),
        ]).subscribe(([data, entity]) => {
            this.checkers = data.shippingEligibilityCheckers;
            this.calculators = data.shippingCalculators;
            this.fulfillmentHandlers = data.fulfillmentHandlers;
            this.changeDetector.markForCheck();
            this.selectedCheckerDefinition = data.shippingEligibilityCheckers.find(c => c.code === (entity.checker && entity.checker.code));
            this.selectedCalculatorDefinition = data.shippingCalculators.find(c => c.code === (entity.calculator && entity.calculator.code));
        });
        this.activeChannel$ = this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel);
        this.testResult$ = this.fetchTestResult$.pipe(switchMap(([address, lines]) => {
            if (!this.selectedChecker || !this.selectedCalculator) {
                return of(undefined);
            }
            const formValue = this.detailForm.value;
            const input = {
                shippingAddress: Object.assign(Object.assign({}, address), { streetLine1: 'test' }),
                lines: lines.map(l => ({ productVariantId: l.id, quantity: l.quantity })),
                checker: toConfigurableOperationInput(this.selectedChecker, formValue.checker),
                calculator: toConfigurableOperationInput(this.selectedCalculator, formValue.calculator),
            };
            return this.dataService.shippingMethod
                .testShippingMethod(input)
                .mapSingle(result => result.testShippingMethod);
        }));
        // tslint:disable:no-non-null-assertion
        merge(this.detailForm.get(['checker']).valueChanges, this.detailForm.get(['calculator']).valueChanges)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => (this.testDataUpdated = true));
        // tslint:enable:no-non-null-assertion
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    selectChecker(checker) {
        this.selectedCheckerDefinition = checker;
        this.selectedChecker = configurableDefinitionToInstance(checker);
        const formControl = this.detailForm.get('checker');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedChecker);
        }
        this.detailForm.markAsDirty();
    }
    selectCalculator(calculator) {
        this.selectedCalculatorDefinition = calculator;
        this.selectedCalculator = configurableDefinitionToInstance(calculator);
        const formControl = this.detailForm.get('calculator');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedCalculator);
        }
        this.detailForm.markAsDirty();
    }
    create() {
        const selectedChecker = this.selectedChecker;
        const selectedCalculator = this.selectedCalculator;
        if (!selectedChecker || !selectedCalculator) {
            return;
        }
        combineLatest([this.entity$, this.languageCode$])
            .pipe(take(1), mergeMap(([shippingMethod, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = Object.assign(Object.assign({}, this.getUpdatedShippingMethod(shippingMethod, this.detailForm, languageCode)), { checker: toConfigurableOperationInput(selectedChecker, formValue.checker), calculator: toConfigurableOperationInput(selectedCalculator, formValue.calculator) });
            return this.dataService.shippingMethod.createShippingMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'ShippingMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createShippingMethod.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'ShippingMethod',
            });
        });
    }
    save() {
        const selectedChecker = this.selectedChecker;
        const selectedCalculator = this.selectedCalculator;
        if (!selectedChecker || !selectedCalculator) {
            return;
        }
        combineLatest([this.entity$, this.languageCode$])
            .pipe(take(1), mergeMap(([shippingMethod, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = Object.assign(Object.assign({}, this.getUpdatedShippingMethod(shippingMethod, this.detailForm, languageCode)), { checker: toConfigurableOperationInput(selectedChecker, formValue.checker), calculator: toConfigurableOperationInput(selectedCalculator, formValue.calculator) });
            return this.dataService.shippingMethod.updateShippingMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'ShippingMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            // tslint:disable-next-line:no-console
            console.error(err);
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'ShippingMethod',
            });
        });
    }
    setTestOrderLines(event) {
        this.testOrderLines = event;
        this.testDataUpdated = true;
    }
    setTestAddress(event) {
        this.testAddress = event;
        this.testDataUpdated = true;
    }
    allTestDataPresent() {
        return !!(this.testAddress &&
            this.testOrderLines &&
            this.testOrderLines.length &&
            this.selectedChecker &&
            this.selectedCalculator);
    }
    runTest() {
        this.fetchTestResult$.next([this.testAddress, this.testOrderLines]);
        this.testDataUpdated = false;
    }
    /**
     * Given a ShippingMethod and the value of the detailForm, this method creates an updated copy which
     * can then be persisted to the API.
     */
    getUpdatedShippingMethod(shippingMethod, formGroup, languageCode) {
        const formValue = formGroup.value;
        const input = createUpdatedTranslatable({
            translatable: shippingMethod,
            updatedFields: formValue,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: shippingMethod.name || '',
                description: shippingMethod.description || '',
            },
        });
        return Object.assign(Object.assign({}, input), { fulfillmentHandler: formValue.fulfillmentHandler });
    }
    setFormValues(shippingMethod, languageCode) {
        var _a, _b, _c, _d;
        const currentTranslation = findTranslation(shippingMethod, languageCode);
        this.detailForm.patchValue({
            name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
            description: (_b = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.description) !== null && _b !== void 0 ? _b : '',
            code: shippingMethod.code,
            fulfillmentHandler: shippingMethod.fulfillmentHandlerCode,
            checker: shippingMethod.checker || {},
            calculator: shippingMethod.calculator || {},
        });
        if (!this.selectedChecker) {
            this.selectedChecker = shippingMethod.checker && {
                code: shippingMethod.checker.code,
                args: shippingMethod.checker.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
        if (!this.selectedCalculator) {
            this.selectedCalculator = shippingMethod.calculator && {
                code: (_c = shippingMethod.calculator) === null || _c === void 0 ? void 0 : _c.code,
                args: (_d = shippingMethod.calculator) === null || _d === void 0 ? void 0 : _d.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), shippingMethod, currentTranslation);
        }
    }
}
ShippingMethodDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-method-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"shipping-method-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.pristine || detailForm.invalid || !selectedChecker || !selectedCalculator\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"updatePermission\"\n                [disabled]=\"\n                    detailForm.pristine || detailForm.invalid || !selectedChecker || !selectedCalculator\n                \"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as shippingMethod\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            (input)=\"updateCode(shippingMethod.code, $event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"updatePermission | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-rich-text-editor\n        formControlName=\"description\"\n        [readonly]=\"!(updatePermission | hasPermission)\"\n        [label]=\"'common.description' | translate\"\n    ></vdr-rich-text-editor>\n    <vdr-form-field [label]=\"'settings.fulfillment-handler' | translate\" for=\"fulfillmentHandler\" class=\"mb2\">\n        <select\n            name=\"fulfillmentHandler\"\n            formControlName=\"fulfillmentHandler\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let handler of fulfillmentHandlers\" [value]=\"handler.code\">\n                {{ handler.code }}: {{ handler.description }}\n            </option>\n        </select>\n    </vdr-form-field>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"ShippingMethod\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n\n    <vdr-custom-detail-component-host\n        locationId=\"shipping-method-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n\n    <div class=\"clr-row mt4\">\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.shipping-eligibility-checker' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedChecker && selectedCheckerDefinition\"\n                [operation]=\"selectedChecker\"\n                [operationDefinition]=\"selectedCheckerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"selectedChecker = null\"\n                formControlName=\"checker\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedChecker || !selectedCheckerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let checker of checkers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectChecker(checker)\"\n                        >\n                            {{ checker.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.shipping-calculator' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedCalculator && selectedCalculatorDefinition\"\n                [operation]=\"selectedCalculator\"\n                [operationDefinition]=\"selectedCalculatorDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"selectedCalculator = null\"\n                formControlName=\"calculator\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedCalculator || !selectedCalculatorDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let calculator of calculators\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectCalculator(calculator)\"\n                        >\n                            {{ calculator.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n<div class=\"testing-tool\">\n    <clr-accordion>\n        <clr-accordion-panel>\n            <clr-accordion-title>{{ 'settings.test-shipping-method' | translate }}</clr-accordion-title>\n            <clr-accordion-content *clrIfExpanded>\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <vdr-test-order-builder\n                            (orderLinesChange)=\"setTestOrderLines($event)\"\n                        ></vdr-test-order-builder>\n                    </div>\n                    <div class=\"clr-col\">\n                        <vdr-test-address-form\n                            (addressChange)=\"setTestAddress($event)\"\n                        ></vdr-test-address-form>\n                        <vdr-shipping-method-test-result\n                            [currencyCode]=\"(activeChannel$ | async)?.currencyCode\"\n                            [okToRun]=\"allTestDataPresent() && testDataUpdated && detailForm.valid\"\n                            [testDataUpdated]=\"testDataUpdated\"\n                            [testResult]=\"testResult$ | async\"\n                            (runTest)=\"runTest()\"\n                        ></vdr-shipping-method-test-result>\n                    </div>\n                </div>\n            </clr-accordion-content>\n        </clr-accordion-panel>\n    </clr-accordion>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".testing-tool{margin-top:48px;margin-bottom:128px}.testing-tool h4{margin-bottom:12px}\n"]
            },] }
];
ShippingMethodDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class ShippingMethodListComponent extends BaseListComponent {
    constructor(modalService, notificationService, dataService, serverConfigService, router, route) {
        super(router, route);
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.serverConfigService = serverConfigService;
        this.testDataUpdated = false;
        this.fetchTestResult$ = new Subject();
        super.setQueryFn((...args) => this.dataService.shippingMethod.getShippingMethods(...args).refetchOnChannelChange(), data => data.shippingMethods);
    }
    ngOnInit() {
        super.ngOnInit();
        this.testResult$ = this.fetchTestResult$.pipe(switchMap(([address, lines]) => {
            const input = {
                shippingAddress: Object.assign(Object.assign({}, address), { streetLine1: 'test' }),
                lines: lines.map(l => ({ productVariantId: l.id, quantity: l.quantity })),
            };
            return this.dataService.shippingMethod
                .testEligibleShippingMethods(input)
                .mapSingle(result => result.testEligibleShippingMethods);
        }));
        this.activeChannel$ = this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel);
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage)
            .pipe(tap(() => this.refresh()));
    }
    deleteShippingMethod(id) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-shipping-method'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.dataService.shippingMethod.deleteShippingMethod(id) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'ShippingMethod',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'ShippingMethod',
            });
        });
    }
    setTestOrderLines(event) {
        this.testOrderLines = event;
        this.testDataUpdated = true;
    }
    setTestAddress(event) {
        this.testAddress = event;
        this.testDataUpdated = true;
    }
    allTestDataPresent() {
        return !!(this.testAddress && this.testOrderLines && this.testOrderLines.length);
    }
    runTest() {
        this.fetchTestResult$.next([this.testAddress, this.testOrderLines]);
        this.testDataUpdated = false;
    }
    setLanguage(code) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }
}
ShippingMethodListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-method-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-language-selector\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"contentLanguage$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"shipping-method-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            [routerLink]=\"['./create']\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateShippingMethod']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-shipping-method' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-shippingMethod=\"item\">\n        <td class=\"left align-middle\">{{ shippingMethod.code }}</td>\n        <td class=\"left align-middle\">{{ shippingMethod.name }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', shippingMethod.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteShippingMethod(shippingMethod.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteShippingMethod'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n\n<div class=\"testing-tool\">\n    <clr-accordion>\n        <clr-accordion-panel>\n            <clr-accordion-title>{{ 'settings.test-shipping-methods' | translate }}</clr-accordion-title>\n            <clr-accordion-content *clrIfExpanded>\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <vdr-test-order-builder\n                            (orderLinesChange)=\"setTestOrderLines($event)\"\n                        ></vdr-test-order-builder>\n                    </div>\n                    <div class=\"clr-col\">\n                        <vdr-test-address-form\n                            (addressChange)=\"setTestAddress($event)\"\n                        ></vdr-test-address-form>\n                        <vdr-shipping-eligibility-test-result\n                            [currencyCode]=\"(activeChannel$ | async)?.currencyCode\"\n                            [okToRun]=\"allTestDataPresent()\"\n                            [testDataUpdated]=\"testDataUpdated\"\n                            [testResult]=\"testResult$ | async\"\n                            (runTest)=\"runTest()\"\n                        ></vdr-shipping-eligibility-test-result>\n                    </div>\n                </div>\n            </clr-accordion-content>\n        </clr-accordion-panel>\n    </clr-accordion>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".testing-tool{margin-top:48px}\n"]
            },] }
];
ShippingMethodListComponent.ctorParameters = () => [
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: ServerConfigService },
    { type: Router },
    { type: ActivatedRoute }
];

class ShippingMethodTestResultComponent {
    constructor() {
        this.okToRun = false;
        this.testDataUpdated = false;
        this.runTest = new EventEmitter();
    }
}
ShippingMethodTestResultComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-method-test-result',
                template: "<div\n    class=\"test-result card\"\n    [ngClass]=\"{\n        success: testResult?.eligible === true,\n        error: testResult?.eligible === false,\n        unknown: !testResult\n    }\"\n>\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.eligible' | translate\">\n                <div class=\"eligible-icon\">\n                    <clr-icon\n                        shape=\"success-standard\"\n                        class=\"is-solid success\"\n                        *ngIf=\"testResult?.eligible\"\n                    ></clr-icon>\n                    <clr-icon\n                        shape=\"ban\"\n                        class=\"is-solid error\"\n                        *ngIf=\"testResult?.eligible === false\"\n                    ></clr-icon>\n                    <clr-icon shape=\"unknown-status\" *ngIf=\"!testResult\"></clr-icon>\n                </div>\n                {{ testResult?.eligible }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data\n                    [label]=\"'common.price' | translate\"\n                    *ngIf=\"testResult?.quote?.price != null\"\n                >\n                    {{ testResult.quote?.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data\n                    [label]=\"'common.price-with-tax' | translate\"\n                    *ngIf=\"testResult?.quote?.priceWithTax != null\"\n                >\n                    {{ testResult.quote?.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree\n                *ngIf=\"testResult?.quote?.metadata\"\n                [value]=\"testResult?.quote?.metadata\"\n            ></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-method' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".test-result.success .card-block{background-color:var(--color-success-100)}.test-result.error .card-block{background-color:var(--color-error-100)}.test-result.unknown .card-block{background-color:var(--color-component-bg-100)}.result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.eligible-icon{display:inline-block}.eligible-icon .success{color:var(--color-success-500)}.eligible-icon .error{color:var(--color-error-500)}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}\n"]
            },] }
];
ShippingMethodTestResultComponent.propDecorators = {
    testResult: [{ type: Input }],
    okToRun: [{ type: Input }],
    testDataUpdated: [{ type: Input }],
    currencyCode: [{ type: Input }],
    runTest: [{ type: Output }]
};

class TaxCategoryDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateTaxCategory];
        this.customFields = this.getCustomFieldConfig('TaxCategory');
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            isDefault: false,
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.taxCategory$ = this.entity$;
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
            name: formValue.name,
            isDefault: formValue.isDefault,
            customFields: formValue.customFields,
        };
        this.dataService.settings.createTaxCategory(input).subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'TaxCategory',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createTaxCategory.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'TaxCategory',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.taxCategory$
            .pipe(take(1), mergeMap(taxCategory => {
            const input = {
                id: taxCategory.id,
                name: formValue.name,
                isDefault: formValue.isDefault,
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updateTaxCategory(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'TaxCategory',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'TaxCategory',
            });
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            name: entity.name,
            isDefault: entity.isDefault,
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
        }
    }
}
TaxCategoryDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-category-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.default-tax-category' | translate\" for=\"isDefault\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"isDefault\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"isDefault\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"TaxCategory\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"tax-category-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxCategoryDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class TaxCategoryListComponent {
    constructor(dataService, notificationService, modalService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.queryResult = this.dataService.settings.getTaxCategories();
        this.taxCategories$ = this.queryResult.mapStream(data => data.taxCategories);
    }
    deleteTaxCategory(taxCategory) {
        return this.modalService
            .dialog({
            title: marker('settings.confirm-delete-tax-category'),
            body: taxCategory.name,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.settings.deleteTaxCategory(taxCategory.id) : EMPTY)), map(res => res.deleteTaxCategory))
            .subscribe(res => {
            if (res.result === DeletionResult.DELETED) {
                this.notificationService.success(marker('common.notify-delete-success'), {
                    entity: 'TaxRate',
                });
                this.queryResult.ref.refetch();
            }
            else {
                this.notificationService.error(res.message || marker('common.notify-delete-error'), {
                    entity: 'TaxRate',
                });
            }
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'TaxRate',
            });
        });
    }
}
TaxCategoryListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-category-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxCategory']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-category' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"taxCategories$ | async\">\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxCategory=\"item\">\n        <td class=\"left align-middle\">{{ taxCategory.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"taxCategory.isDefault\">{{ 'common.default-tax-category' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxCategory.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxCategory(taxCategory)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxCategory'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxCategoryListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService }
];

class TaxRateDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateTaxRate];
        this.customFields = this.getCustomFieldConfig('TaxRate');
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            enabled: [true],
            value: [0, Validators.required],
            taxCategoryId: [''],
            zoneId: [''],
            customerGroupId: [''],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.taxCategories$ = this.dataService.settings
            .getTaxCategories()
            .mapSingle(data => data.taxCategories);
        this.zones$ = this.dataService.settings.getZones().mapSingle(data => data.zones);
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
            name: formValue.name,
            enabled: formValue.enabled,
            value: formValue.value,
            categoryId: formValue.taxCategoryId,
            zoneId: formValue.zoneId,
            customerGroupId: formValue.customerGroupId,
            customFields: formValue.customFields,
        };
        this.dataService.settings.createTaxRate(input).subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createTaxRate.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'TaxRate',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.entity$
            .pipe(take(1), mergeMap(taxRate => {
            const input = {
                id: taxRate.id,
                name: formValue.name,
                enabled: formValue.enabled,
                value: formValue.value,
                categoryId: formValue.taxCategoryId,
                zoneId: formValue.zoneId,
                customerGroupId: formValue.customerGroupId,
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updateTaxRate(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'TaxRate',
            });
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            name: entity.name,
            enabled: entity.enabled,
            value: entity.value,
            taxCategoryId: entity.category ? entity.category.id : '',
            zoneId: entity.zone ? entity.zone.id : '',
            customerGroupId: entity.customerGroup ? entity.customerGroup.id : '',
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
        }
    }
}
TaxRateDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-rate-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.rate' | translate\" for=\"value\">\n        <vdr-affixed-input suffix=\"%\">\n            <input\n                id=\"value\"\n                type=\"number\"\n                step=\"0.1\"\n                formControlName=\"value\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            />\n        </vdr-affixed-input>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.tax-category' | translate\" for=\"taxCategoryId\">\n        <select\n            clrSelect\n            name=\"taxCategoryId\"\n            formControlName=\"taxCategoryId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let taxCategory of taxCategories$ | async\" [value]=\"taxCategory.id\">\n                {{ taxCategory.name }}\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.zone' | translate\" for=\"zoneId\">\n        <select\n            clrSelect\n            name=\"zoneId\"\n            formControlName=\"zoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"TaxRate\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"tax-rate-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxRateDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class TaxRateListComponent extends BaseListComponent {
    constructor(modalService, notificationService, dataService, router, route) {
        super(router, route);
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        super.setQueryFn((...args) => this.dataService.settings.getTaxRates(...args), data => data.taxRates);
    }
    deleteTaxRate(taxRate) {
        return this.modalService
            .dialog({
            title: marker('settings.confirm-delete-tax-rate'),
            body: taxRate.name,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.settings.deleteTaxRate(taxRate.id) : EMPTY)), map(res => res.deleteTaxRate))
            .subscribe(res => {
            if (res.result === DeletionResult.DELETED) {
                this.notificationService.success(marker('common.notify-delete-success'), {
                    entity: 'TaxRate',
                });
                this.refresh();
            }
            else {
                this.notificationService.error(res.message || marker('common.notify-delete-error'), {
                    entity: 'TaxRate',
                });
            }
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'TaxRate',
            });
        });
    }
}
TaxRateListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-rate-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxRate']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-rate' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-category' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.zone' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-rate' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxRate=\"item\">\n        <td class=\"left align-middle\">{{ taxRate.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.category.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.zone.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.value }}%</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxRate.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxRate(taxRate)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxRate'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxRateListComponent.ctorParameters = () => [
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];

class TestAddressFormComponent {
    constructor(formBuilder, dataService, localStorageService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.addressChange = new EventEmitter();
    }
    ngOnInit() {
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(result => result.countries.items);
        const storedValue = this.localStorageService.getForCurrentLocation('shippingTestAddress');
        const initialValue = storedValue
            ? storedValue
            : {
                city: '',
                countryCode: '',
                postalCode: '',
                province: '',
            };
        this.addressChange.emit(initialValue);
        this.form = this.formBuilder.group(initialValue);
        this.subscription = this.form.valueChanges.subscribe(value => {
            this.localStorageService.setForCurrentLocation('shippingTestAddress', value);
            this.addressChange.emit(value);
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
TestAddressFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-address-form',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-address' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <form [formGroup]=\"form\">\n            <clr-input-container>\n                <label>{{ 'customer.city' | translate }}</label>\n                <input formControlName=\"city\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.province' | translate }}</label>\n                <input formControlName=\"province\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.postal-code' | translate }}</label>\n                <input formControlName=\"postalCode\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.country' | translate }}</label>\n                <select name=\"countryCode\" formControlName=\"countryCode\" clrInput clrSelect>\n                    <option *ngFor=\"let country of availableCountries$ | async\" [value]=\"country.code\">\n                        {{ country.name }}\n                    </option>\n                </select>\n            </clr-input-container>\n        </form>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-input-container{margin-bottom:12px}\n"]
            },] }
];
TestAddressFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DataService },
    { type: LocalStorageService }
];
TestAddressFormComponent.propDecorators = {
    addressChange: [{ type: Output }]
};

class TestOrderBuilderComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.orderLinesChange = new EventEmitter();
        this.lines = [];
    }
    get subTotal() {
        return this.lines.reduce((sum, l) => sum + l.unitPriceWithTax * l.quantity, 0);
    }
    ngOnInit() {
        this.lines = this.loadFromLocalStorage();
        if (this.lines) {
            this.orderLinesChange.emit(this.lines);
        }
        this.dataService.settings.getActiveChannel('cache-first').single$.subscribe(result => {
            this.currencyCode = result.activeChannel.currencyCode;
        });
    }
    selectResult(result) {
        if (result) {
            this.addToLines(result);
        }
    }
    addToLines(result) {
        var _a, _b;
        if (!this.lines.find(l => l.id === result.productVariantId)) {
            this.lines.push({
                id: result.productVariantId,
                name: result.productVariantName,
                preview: (_b = (_a = result.productAsset) === null || _a === void 0 ? void 0 : _a.preview) !== null && _b !== void 0 ? _b : '',
                quantity: 1,
                sku: result.sku,
                unitPriceWithTax: (result.priceWithTax.__typename === 'SinglePrice' && result.priceWithTax.value) || 0,
            });
            this.persistToLocalStorage();
            this.orderLinesChange.emit(this.lines);
        }
    }
    updateQuantity() {
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    removeLine(line) {
        this.lines = this.lines.filter(l => l.id !== line.id);
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    persistToLocalStorage() {
        this.localStorageService.setForCurrentLocation('shippingTestOrder', this.lines);
    }
    loadFromLocalStorage() {
        return this.localStorageService.getForCurrentLocation('shippingTestOrder') || [];
    }
}
TestOrderBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-order-builder',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-order' | translate }}\n    </div>\n    <table class=\"order-table table\" *ngIf=\"lines.length; else emptyPlaceholder\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'order.product-name' | translate }}</th>\n                <th>{{ 'order.product-sku' | translate }}</th>\n                <th>{{ 'order.unit-price' | translate }}</th>\n                <th>{{ 'order.quantity' | translate }}</th>\n                <th>{{ 'order.total' | translate }}</th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let line of lines\" class=\"order-line\">\n            <td class=\"align-middle thumb\">\n                <img [src]=\"line.preview + '?preset=tiny'\" />\n            </td>\n            <td class=\"align-middle name\">{{ line.name }}</td>\n            <td class=\"align-middle sku\">{{ line.sku }}</td>\n            <td class=\"align-middle unit-price\">\n                {{ line.unitPriceWithTax | localeCurrency: currencyCode }}\n            </td>\n            <td class=\"align-middle quantity\">\n                <input\n                    [(ngModel)]=\"line.quantity\"\n                    (change)=\"updateQuantity()\"\n                    type=\"number\"\n                    max=\"9999\"\n                    min=\"1\"\n                />\n                <button class=\"icon-button\" (click)=\"removeLine(line)\">\n                    <clr-icon shape=\"trash\"></clr-icon>\n                </button>\n            </td>\n            <td class=\"align-middle total\">\n                {{ (line.unitPriceWithTax * line.quantity) | localeCurrency: currencyCode }}\n            </td>\n        </tr>\n        <tr class=\"sub-total\">\n            <td class=\"left\">{{ 'order.sub-total' | translate }}</td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td>{{ subTotal | localeCurrency: currencyCode }}</td>\n        </tr>\n    </table>\n\n    <ng-template #emptyPlaceholder>\n        <div class=\"card-block empty-placeholder\">\n            <div class=\"empty-text\">{{ 'settings.add-products-to-test-order' | translate }}</div>\n            <clr-icon shape=\"arrow\" dir=\"down\" size=\"96\"></clr-icon>\n        </div>\n    </ng-template>\n    <div class=\"card-block\">\n        <vdr-product-selector (productSelected)=\"selectResult($event)\"> </vdr-product-selector>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".empty-placeholder{color:var(--color-grey-400);text-align:center}.empty-text{font-size:22px}\n"]
            },] }
];
TestOrderBuilderComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];
TestOrderBuilderComponent.propDecorators = {
    orderLinesChange: [{ type: Output }]
};

class ZoneDetailDialogComponent {
    constructor(serverConfigService, formBuilder) {
        this.serverConfigService = serverConfigService;
        this.formBuilder = formBuilder;
        this.customFields = this.serverConfigService.getCustomFieldsFor('Zone');
    }
    ngOnInit() {
        var _a;
        this.form = this.formBuilder.group({
            name: [this.zone.name, Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.form.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = (_a = this.zone.customFields) === null || _a === void 0 ? void 0 : _a[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.form.value);
    }
}
ZoneDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n    <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-tabbed-custom-fields\n        entityName=\"Zone\"\n        [customFields]=\"customFields\"\n        [customFieldsFormGroup]=\"form.get('customFields')\"\n        [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n    ></vdr-tabbed-custom-fields>\n</form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"form.invalid\" class=\"btn btn-primary\">\n        <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n        <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ZoneDetailDialogComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: FormBuilder }
];

class ZoneListComponent {
    constructor(dataService, notificationService, modalService, route, router, serverConfigService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.serverConfigService = serverConfigService;
        this.selectedMemberIds = [];
    }
    ngOnInit() {
        const zonesQueryRef = this.dataService.settings.getZones().ref;
        this.zones$ = zonesQueryRef.valueChanges.pipe(map(data => data.data.zones));
        const activeZoneId$ = this.route.paramMap.pipe(map(pm => pm.get('contents')), distinctUntilChanged(), tap(() => (this.selectedMemberIds = [])));
        this.activeZone$ = combineLatest(this.zones$, activeZoneId$).pipe(map(([zones, activeZoneId]) => {
            if (activeZoneId) {
                return zones.find(z => z.id === activeZoneId);
            }
        }));
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage)
            .pipe(tap(() => zonesQueryRef.refetch()));
    }
    setLanguage(code) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }
    create() {
        this.modalService
            .fromComponent(ZoneDetailDialogComponent, { locals: { zone: { name: '' } } })
            .pipe(switchMap(result => result ? this.dataService.settings.createZone(Object.assign(Object.assign({}, result), { memberIds: [] })) : EMPTY), 
        // refresh list
        switchMap(() => this.dataService.settings.getZones().single$))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'Zone',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Zone',
            });
        });
    }
    delete(zoneId) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-zone'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.settings.deleteZone(zoneId) : EMPTY)), switchMap(result => {
            if (result.deleteZone.result === DeletionResult.DELETED) {
                // refresh list
                return this.dataService.settings
                    .getZones()
                    .mapSingle(() => ({ errorMessage: false }));
            }
            else {
                return of({ errorMessage: result.deleteZone.message });
            }
        }))
            .subscribe(result => {
            if (typeof result.errorMessage === 'string') {
                this.notificationService.error(result.errorMessage);
            }
            else {
                this.notificationService.success(marker('common.notify-delete-success'), {
                    entity: 'Zone',
                });
            }
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Zone',
            });
        });
    }
    update(zone) {
        this.modalService
            .fromComponent(ZoneDetailDialogComponent, { locals: { zone } })
            .pipe(switchMap(result => result ? this.dataService.settings.updateZone(Object.assign({ id: zone.id }, result)) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Zone',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Zone',
            });
        });
    }
    closeMembers() {
        const params = Object.assign({}, this.route.snapshot.params);
        delete params.contents;
        this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    addToZone(zone) {
        this.modalService
            .fromComponent(AddCountryToZoneDialogComponent, {
            locals: {
                zoneName: zone.name,
                currentMembers: zone.members,
            },
            size: 'md',
        })
            .pipe(switchMap(memberIds => memberIds
            ? this.dataService.settings
                .addMembersToZone(zone.id, memberIds)
                .pipe(mapTo(memberIds))
            : EMPTY))
            .subscribe({
            next: result => {
                this.notificationService.success(marker(`settings.add-countries-to-zone-success`), {
                    countryCount: result.length,
                    zoneName: zone.name,
                });
            },
            error: err => {
                this.notificationService.error(err);
            },
        });
    }
    removeFromZone(zone, memberIds) {
        this.dataService.settings.removeMembersFromZone(zone.id, memberIds).subscribe({
            complete: () => {
                this.notificationService.success(marker(`settings.remove-countries-from-zone-success`), {
                    countryCount: memberIds.length,
                    zoneName: zone.name,
                });
            },
        });
    }
}
ZoneListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n            <vdr-language-selector\n                [availableLanguageCodes]=\"availableLanguages$ | async\"\n                [currentLanguageCode]=\"contentLanguage$ | async\"\n                (languageCodeChange)=\"setLanguage($event)\"\n            ></vdr-language-selector>\n        </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"zone-list\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateZone']\"\n            (click)=\"create()\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-zone' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"zone-wrapper\">\n    <div class=\"zone-list\">\n        <table class=\"table mt0\">\n            <tbody>\n                <tr\n                    *ngFor=\"let zone of zones$ | async\"\n                    [class.active]=\"zone.id === (activeZone$ | async)?.id\"\n                >\n                    <td class=\"left align-middle\"><vdr-entity-info [entity]=\"zone\"></vdr-entity-info></td>\n                    <td class=\"left align-middle\">\n                        <vdr-chip [colorFrom]=\"zone.name\">{{ zone.name }}</vdr-chip>\n                    </td>\n                    <td class=\"text-right align-middle\">\n                        <a\n                            class=\"btn btn-link btn-sm\"\n                            [routerLink]=\"['./', { contents: zone.id }]\"\n                            queryParamsHandling=\"preserve\"\n                        >\n                            <clr-icon shape=\"view-list\"></clr-icon>\n                            {{ 'settings.view-zone-members' | translate }}\n                        </a>\n                    </td>\n                    <td class=\"align-middle\">\n                        <button class=\"btn btn-link btn-sm\" (click)=\"update(zone)\">\n                            <clr-icon shape=\"edit\"></clr-icon>\n                            {{ 'common.edit' | translate }}\n                        </button>\n                    </td>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    class=\"button\"\n                                    vdrDropdownItem\n                                    (click)=\"delete(zone.id)\"\n                                    [disabled]=\"!(['DeleteSettings', 'DeleteZone'] | hasPermission)\"\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"zone-members\" [class.expanded]=\"activeZone$ | async\">\n        <ng-container *ngIf=\"activeZone$ | async as activeZone\">\n            <vdr-zone-member-list\n                [members]=\"activeZone.members\"\n                [selectedMemberIds]=\"selectedMemberIds\"\n                (selectionChange)=\"selectedMemberIds = $event\"\n            >\n                <div *vdrZoneMemberListHeader>\n                    <div class=\"flex\">\n                        <div class=\"header-title-row\">\n                            {{ activeZone.name }} ({{ activeZone.members.length }})\n                        </div>\n                        <div class=\"flex-spacer\"></div>\n                        <button type=\"button\" class=\"close-button\" (click)=\"closeMembers()\">\n                            <clr-icon shape=\"close\"></clr-icon>\n                        </button>\n                    </div>\n                    <div class=\"controls\">\n                        <vdr-dropdown>\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-secondary btn-sm\"\n                                vdrDropdownTrigger\n                                [disabled]=\"selectedMemberIds.length === 0\"\n                            >\n                                {{ 'common.with-selected' | translate: { count: selectedMemberIds.length } }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"removeFromZone(activeZone, selectedMemberIds)\"\n                                    vdrDropdownItem\n                                    [disabled]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'settings.remove-from-zone' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                        <button class=\"btn btn-secondary btn-sm\" (click)=\"addToZone(activeZone)\">\n                            {{ 'settings.add-countries-to-zone' | translate: { zoneName: activeZone.name } }}\n                        </button>\n                    </div>\n                </div>\n                <div *vdrZoneMemberControls=\"let member = member\">\n                    <vdr-dropdown>\n                        <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                            {{ 'common.actions' | translate }}\n                            <clr-icon shape=\"caret down\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <a\n                                type=\"button\"\n                                [routerLink]=\"['/settings', 'countries', member.id]\"\n                                vdrDropdownItem\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </a>\n                            <button\n                                type=\"button\"\n                                class=\"delete-button\"\n                                (click)=\"removeFromZone(activeZone, [member.id])\"\n                                vdrDropdownItem\n                                [disabled]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'settings.remove-from-zone' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-zone-member-list>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".zone-wrapper{display:flex;height:calc(100% - 50px)}.zone-wrapper .zone-list{flex:1;overflow:auto;margin-top:0}.zone-wrapper .zone-list tr.active{background-color:var(--color-component-bg-200)}.zone-members{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.zone-members.expanded{width:40vw;visibility:visible;opacity:1;padding-left:12px}.zone-members .close-button{margin:0;background:none;border:none;cursor:pointer}.zone-members ::ng-deep table.table{margin-top:0}.zone-members ::ng-deep table.table th{top:0}.zone-members .controls{display:flex;justify-content:space-between}\n"]
            },] }
];
ZoneListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: ActivatedRoute },
    { type: Router },
    { type: ServerConfigService }
];

class ZoneMemberControlsDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ZoneMemberControlsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrZoneMemberControls]',
            },] }
];
ZoneMemberControlsDirective.ctorParameters = () => [
    { type: TemplateRef }
];

class ZoneMemberListHeaderDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ZoneMemberListHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrZoneMemberListHeader]',
            },] }
];
ZoneMemberListHeaderDirective.ctorParameters = () => [
    { type: TemplateRef }
];

class ZoneMemberListComponent {
    constructor() {
        this.members = [];
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.filterTerm = '';
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    filteredMembers() {
        if (this.filterTerm !== '') {
            const term = this.filterTerm.toLocaleLowerCase();
            return this.members.filter(m => m.name.toLocaleLowerCase().includes(term) || m.code.toLocaleLowerCase().includes(term));
        }
        else {
            return this.members;
        }
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map(v => v.id));
        }
    }
    toggleSelectMember({ item: member }) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter(id => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
ZoneMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-member-list',
                template: "<div class=\"members-header\">\n    <ng-container *ngIf=\"headerTemplate\">\n        <ng-container *ngTemplateOutlet=\"headerTemplate.templateRef\"></ng-container>\n    </ng-container>\n    <input\n        type=\"text\"\n        [placeholder]=\"'settings.filter-by-member-name' | translate\"\n        [(ngModel)]=\"filterTerm\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"filteredMembers()\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"(['UpdateSettings', 'UpdateZone'] | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-member=\"item\">\n        <td class=\"left align-middle\">{{ member.code }}</td>\n        <td class=\"left align-middle\">{{ member.name }}</td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"member.enabled\"\n                [attr.shape]=\"member.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <ng-container *ngIf=\"controlsTemplate\">\n                <ng-container\n                    *ngTemplateOutlet=\"controlsTemplate.templateRef; context: { member: member }\"\n                ></ng-container>\n            </ng-container>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".members-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:5;border-bottom:1px solid var(--color-component-border-200)}.members-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.members-header .clr-input{width:100%}\n"]
            },] }
];
ZoneMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    headerTemplate: [{ type: ContentChild, args: [ZoneMemberListHeaderDirective,] }],
    controlsTemplate: [{ type: ContentChild, args: [ZoneMemberControlsDirective,] }]
};

class AdministratorResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Administrator',
            id: '',
            createdAt: '',
            updatedAt: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            user: { roles: [] },
        }, id => dataService.administrator.getAdministrator(id).mapStream(data => data.administrator));
    }
}
AdministratorResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function AdministratorResolver_Factory() { return new AdministratorResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: AdministratorResolver, providedIn: "root" });
AdministratorResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AdministratorResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class ChannelResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Channel',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            token: '',
            pricesIncludeTax: false,
            currencyCode: CurrencyCode.USD,
            defaultLanguageCode: getDefaultUiLanguage(),
            defaultShippingZone: {},
            defaultTaxZone: {},
        }, (id) => dataService.settings.getChannel(id).mapStream((data) => data.channel));
    }
}
ChannelResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ChannelResolver_Factory() { return new ChannelResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ChannelResolver, providedIn: "root" });
ChannelResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ChannelResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class CountryResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Country',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            name: '',
            enabled: false,
            translations: [],
        }, id => dataService.settings.getCountry(id).mapStream(data => data.country));
    }
}
CountryResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CountryResolver_Factory() { return new CountryResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CountryResolver, providedIn: "root" });
CountryResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CountryResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the global settings.
 */
class GlobalSettingsResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, 
        // we will never be creating a new GlobalSettings entity, so this part is not used.
        {}, () => dataService.settings.getGlobalSettings().mapStream(data => data.globalSettings));
    }
}
GlobalSettingsResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalSettingsResolver_Factory() { return new GlobalSettingsResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: GlobalSettingsResolver, providedIn: "root" });
GlobalSettingsResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
GlobalSettingsResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class PaymentMethodResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'PaymentMethod',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            code: '',
            description: '',
            enabled: true,
            checker: undefined,
            handler: undefined,
        }, id => dataService.settings.getPaymentMethod(id).mapStream(data => data.paymentMethod));
    }
}
PaymentMethodResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaymentMethodResolver_Factory() { return new PaymentMethodResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: PaymentMethodResolver, providedIn: "root" });
PaymentMethodResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PaymentMethodResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class ProfileResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Administrator',
            id: '',
            createdAt: '',
            updatedAt: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            user: { roles: [] },
        }, id => dataService.administrator
            .getActiveAdministrator()
            .mapStream(data => data.activeAdministrator));
    }
}
ProfileResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProfileResolver_Factory() { return new ProfileResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ProfileResolver, providedIn: "root" });
ProfileResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProfileResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class RoleResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Role',
            id: '',
            createdAt: '',
            updatedAt: '',
            code: '',
            description: '',
            permissions: [],
            channels: [],
        }, id => dataService.administrator.getRole(id).mapStream(data => data.role));
    }
}
RoleResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function RoleResolver_Factory() { return new RoleResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: RoleResolver, providedIn: "root" });
RoleResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
RoleResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class ShippingMethodResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'ShippingMethod',
            createdAt: '',
            updatedAt: '',
            id: '',
            code: '',
            name: '',
            description: '',
            fulfillmentHandlerCode: undefined,
            checker: undefined,
            calculator: undefined,
            translations: [],
        }, id => dataService.shippingMethod.getShippingMethod(id).mapStream(data => data.shippingMethod));
    }
}
ShippingMethodResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ShippingMethodResolver_Factory() { return new ShippingMethodResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ShippingMethodResolver, providedIn: "root" });
ShippingMethodResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ShippingMethodResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class TaxCategoryResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'TaxCategory',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            isDefault: false,
        }, id => dataService.settings.getTaxCategory(id).mapStream(data => data.taxCategory));
    }
}
TaxCategoryResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function TaxCategoryResolver_Factory() { return new TaxCategoryResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: TaxCategoryResolver, providedIn: "root" });
TaxCategoryResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
TaxCategoryResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class TaxRateResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'TaxRate',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            value: 0,
            enabled: true,
            category: {},
            zone: {},
            customerGroup: null,
        }, id => dataService.settings.getTaxRate(id).mapStream(data => data.taxRate));
    }
}
TaxRateResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function TaxRateResolver_Factory() { return new TaxRateResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: TaxRateResolver, providedIn: "root" });
TaxRateResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
TaxRateResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

const ɵ0 = {
    breadcrumb: marker('breadcrumb.profile'),
}, ɵ1 = {
    breadcrumb: marker('breadcrumb.administrators'),
}, ɵ2 = { breadcrumb: administratorBreadcrumb }, ɵ3 = {
    breadcrumb: marker('breadcrumb.channels'),
}, ɵ4 = { breadcrumb: channelBreadcrumb }, ɵ5 = {
    breadcrumb: marker('breadcrumb.roles'),
}, ɵ6 = { breadcrumb: roleBreadcrumb }, ɵ7 = {
    breadcrumb: marker('breadcrumb.tax-categories'),
}, ɵ8 = {
    breadcrumb: taxCategoryBreadcrumb,
}, ɵ9 = {
    breadcrumb: marker('breadcrumb.tax-rates'),
}, ɵ10 = {
    breadcrumb: taxRateBreadcrumb,
}, ɵ11 = {
    breadcrumb: marker('breadcrumb.countries'),
}, ɵ12 = {
    breadcrumb: countryBreadcrumb,
}, ɵ13 = {
    breadcrumb: marker('breadcrumb.zones'),
}, ɵ14 = {
    breadcrumb: marker('breadcrumb.shipping-methods'),
}, ɵ15 = {
    breadcrumb: shippingMethodBreadcrumb,
}, ɵ16 = {
    breadcrumb: marker('breadcrumb.payment-methods'),
}, ɵ17 = {
    breadcrumb: paymentMethodBreadcrumb,
}, ɵ18 = {
    breadcrumb: marker('breadcrumb.global-settings'),
};
const settingsRoutes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: createResolveData(ProfileResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ0,
    },
    {
        path: 'administrators',
        component: AdministratorListComponent,
        data: ɵ1,
    },
    {
        path: 'administrators/:id',
        component: AdminDetailComponent,
        resolve: createResolveData(AdministratorResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: 'channels',
        component: ChannelListComponent,
        data: ɵ3,
    },
    {
        path: 'channels/:id',
        component: ChannelDetailComponent,
        resolve: createResolveData(ChannelResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ4,
    },
    {
        path: 'roles',
        component: RoleListComponent,
        data: ɵ5,
    },
    {
        path: 'roles/:id',
        component: RoleDetailComponent,
        resolve: createResolveData(RoleResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ6,
    },
    {
        path: 'tax-categories',
        component: TaxCategoryListComponent,
        data: ɵ7,
    },
    {
        path: 'tax-categories/:id',
        component: TaxCategoryDetailComponent,
        resolve: createResolveData(TaxCategoryResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ8,
    },
    {
        path: 'tax-rates',
        component: TaxRateListComponent,
        data: ɵ9,
    },
    {
        path: 'tax-rates/:id',
        component: TaxRateDetailComponent,
        resolve: createResolveData(TaxRateResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ10,
    },
    {
        path: 'countries',
        component: CountryListComponent,
        data: ɵ11,
    },
    {
        path: 'countries/:id',
        component: CountryDetailComponent,
        resolve: createResolveData(CountryResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ12,
    },
    {
        path: 'zones',
        component: ZoneListComponent,
        data: ɵ13,
    },
    {
        path: 'shipping-methods',
        component: ShippingMethodListComponent,
        data: ɵ14,
    },
    {
        path: 'shipping-methods/:id',
        component: ShippingMethodDetailComponent,
        resolve: createResolveData(ShippingMethodResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ15,
    },
    {
        path: 'payment-methods',
        component: PaymentMethodListComponent,
        data: ɵ16,
    },
    {
        path: 'payment-methods/:id',
        component: PaymentMethodDetailComponent,
        resolve: createResolveData(PaymentMethodResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ17,
    },
    {
        path: 'global-settings',
        component: GlobalSettingsComponent,
        resolve: createResolveData(GlobalSettingsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ18,
    },
];
function administratorBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.administrators',
        getName: admin => `${admin.firstName} ${admin.lastName}`,
        route: 'administrators',
    });
}
function channelBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.channels',
        getName: channel => channel.code,
        route: 'channels',
    });
}
function roleBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.roles',
        getName: role => role.description,
        route: 'roles',
    });
}
function taxCategoryBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.tax-categories',
        getName: category => category.name,
        route: 'tax-categories',
    });
}
function taxRateBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.tax-rates',
        getName: category => category.name,
        route: 'tax-rates',
    });
}
function countryBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.countries',
        getName: promotion => promotion.name,
        route: 'countries',
    });
}
function shippingMethodBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.shipping-methods',
        getName: method => method.name,
        route: 'shipping-methods',
    });
}
function paymentMethodBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.payment-methods',
        getName: method => method.code,
        route: 'payment-methods',
    });
}

class SettingsModule {
}
SettingsModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(settingsRoutes)],
                declarations: [
                    TaxCategoryListComponent,
                    TaxCategoryDetailComponent,
                    AdministratorListComponent,
                    RoleListComponent,
                    RoleDetailComponent,
                    AdminDetailComponent,
                    PermissionGridComponent,
                    CountryListComponent,
                    CountryDetailComponent,
                    TaxRateListComponent,
                    TaxRateDetailComponent,
                    ChannelListComponent,
                    ChannelDetailComponent,
                    ShippingMethodListComponent,
                    ShippingMethodDetailComponent,
                    PaymentMethodListComponent,
                    PaymentMethodDetailComponent,
                    GlobalSettingsComponent,
                    TestOrderBuilderComponent,
                    TestAddressFormComponent,
                    ShippingMethodTestResultComponent,
                    ShippingEligibilityTestResultComponent,
                    ZoneListComponent,
                    AddCountryToZoneDialogComponent,
                    ZoneMemberListComponent,
                    ZoneMemberListHeaderDirective,
                    ZoneMemberControlsDirective,
                    ZoneDetailDialogComponent,
                    ProfileComponent,
                ],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { AddCountryToZoneDialogComponent, AdminDetailComponent, AdministratorListComponent, AdministratorResolver, ChannelDetailComponent, ChannelListComponent, ChannelResolver, CountryDetailComponent, CountryListComponent, CountryResolver, GlobalSettingsComponent, GlobalSettingsResolver, PaymentMethodDetailComponent, PaymentMethodListComponent, PaymentMethodResolver, PermissionGridComponent, ProfileComponent, ProfileResolver, RoleDetailComponent, RoleListComponent, RoleResolver, SettingsModule, ShippingEligibilityTestResultComponent, ShippingMethodDetailComponent, ShippingMethodListComponent, ShippingMethodResolver, ShippingMethodTestResultComponent, TaxCategoryDetailComponent, TaxCategoryListComponent, TaxCategoryResolver, TaxRateDetailComponent, TaxRateListComponent, TaxRateResolver, TestAddressFormComponent, TestOrderBuilderComponent, ZoneDetailDialogComponent, ZoneListComponent, ZoneMemberControlsDirective, ZoneMemberListComponent, ZoneMemberListHeaderDirective, administratorBreadcrumb, channelBreadcrumb, countryBreadcrumb, paymentMethodBreadcrumb, roleBreadcrumb, settingsRoutes, shippingMethodBreadcrumb, taxCategoryBreadcrumb, taxRateBreadcrumb, ɵ0, ɵ1, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9 };
//# sourceMappingURL=vendure-admin-ui-settings.js.map

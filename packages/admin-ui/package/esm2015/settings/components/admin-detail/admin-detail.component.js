import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent } from '@vendure/admin-ui/core';
import { Permission, } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { CUSTOMER_ROLE_CODE } from '@vendure/common/lib/shared-constants';
import { mergeMap, take } from 'rxjs/operators';
export class AdminDetailComponent extends BaseDetailComponent {
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
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createAdministrator.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
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
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvYWRtaW4tZGV0YWlsL2FkbWluLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUEyQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RHLE9BQU8sRUFLSCxVQUFVLEdBSWIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWNoRCxNQUFNLE9BQU8sb0JBQ1QsU0FBUSxtQkFBbUQ7SUFnQjNELFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVB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QUFjO1lBZWQsbUJBQW1CO1lBakJNLGlCQUFpQjtZQWdCMUMsV0FBVztZQWZYLFdBQVc7WUFjWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IEJhc2VEZXRhaWxDb21wb25lbnQsIEN1c3RvbUZpZWxkQ29uZmlnLCBQZXJtaXNzaW9uRGVmaW5pdGlvbiB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBZG1pbmlzdHJhdG9yLFxuICAgIENyZWF0ZUFkbWluaXN0cmF0b3JJbnB1dCxcbiAgICBHZXRBZG1pbmlzdHJhdG9yLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBQZXJtaXNzaW9uLFxuICAgIFJvbGUsXG4gICAgUm9sZUZyYWdtZW50LFxuICAgIFVwZGF0ZUFkbWluaXN0cmF0b3JJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQ1VTVE9NRVJfUk9MRV9DT0RFIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25zQnlDaGFubmVsIHtcbiAgICBjaGFubmVsSWQ6IHN0cmluZztcbiAgICBjaGFubmVsQ29kZTogc3RyaW5nO1xuICAgIHBlcm1pc3Npb25zOiB7IFtLIGluIFBlcm1pc3Npb25dOiBib29sZWFuIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFkbWluLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FkbWluLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRtaW4tZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluRGV0YWlsQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PEdldEFkbWluaXN0cmF0b3IuQWRtaW5pc3RyYXRvcj5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGFkbWluaXN0cmF0b3IkOiBPYnNlcnZhYmxlPEdldEFkbWluaXN0cmF0b3IuQWRtaW5pc3RyYXRvcj47XG4gICAgcGVybWlzc2lvbkRlZmluaXRpb25zOiBQZXJtaXNzaW9uRGVmaW5pdGlvbltdO1xuICAgIGFsbFJvbGVzJDogT2JzZXJ2YWJsZTxSb2xlLkZyYWdtZW50W10+O1xuICAgIHNlbGVjdGVkUm9sZXM6IFJvbGUuRnJhZ21lbnRbXSA9IFtdO1xuICAgIGRldGFpbEZvcm06IEZvcm1Hcm91cDtcbiAgICBzZWxlY3RlZFJvbGVQZXJtaXNzaW9uczogeyBbY2hhbm5lbElkOiBzdHJpbmddOiBQZXJtaXNzaW9uc0J5Q2hhbm5lbCB9ID0ge30gYXMgYW55O1xuICAgIHNlbGVjdGVkQ2hhbm5lbElkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIGdldEF2YWlsYWJsZUNoYW5uZWxzKCk6IFBlcm1pc3Npb25zQnlDaGFubmVsW10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnNlbGVjdGVkUm9sZVBlcm1pc3Npb25zKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdBZG1pbmlzdHJhdG9yJyk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXNzd29yZDogWycnXSxcbiAgICAgICAgICAgIHJvbGVzOiBbW11dLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5hZG1pbmlzdHJhdG9yJCA9IHRoaXMuZW50aXR5JDtcbiAgICAgICAgdGhpcy5hbGxSb2xlcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmFkbWluaXN0cmF0b3JcbiAgICAgICAgICAgIC5nZXRSb2xlcyg5OTkpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGl0ZW0gPT4gaXRlbS5yb2xlcy5pdGVtcy5maWx0ZXIoaSA9PiBpLmNvZGUgIT09IENVU1RPTUVSX1JPTEVfQ09ERSkpO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC51c2VyU3RhdHVzKCkuc2luZ2xlJC5zdWJzY3JpYmUoKHsgdXNlclN0YXR1cyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXVzZXJTdGF0dXMucGVybWlzc2lvbnMuaW5jbHVkZXMoUGVybWlzc2lvbi5VcGRhdGVBZG1pbmlzdHJhdG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvbGVzU2VsZWN0ID0gdGhpcy5kZXRhaWxGb3JtLmdldCgncm9sZXMnKTtcbiAgICAgICAgICAgICAgICBpZiAocm9sZXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZXNTZWxlY3QuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGVybWlzc2lvbkRlZmluaXRpb25zID0gdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLmdldFBlcm1pc3Npb25EZWZpbml0aW9ucygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICByb2xlc0NoYW5nZWQocm9sZXM6IFJvbGVbXSkge1xuICAgICAgICB0aGlzLmJ1aWxkUGVybWlzc2lvbnNNYXAoKTtcbiAgICB9XG5cbiAgICBnZXRQZXJtaXNzaW9uc0ZvclNlbGVjdGVkQ2hhbm5lbCgpOiBzdHJpbmdbXSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVBlcm1pc3Npb25zKGlucHV0OiBQZXJtaXNzaW9uc0J5Q2hhbm5lbFsncGVybWlzc2lvbnMnXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhpbnB1dClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChbcGVybWlzc2lvbiwgYWN0aXZlXSkgPT4gYWN0aXZlKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtwZXJtaXNzaW9uLCBhY3RpdmVdKSA9PiBwZXJtaXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENoYW5uZWxJZCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDaGFubmVsID0gdGhpcy5zZWxlY3RlZFJvbGVQZXJtaXNzaW9uc1t0aGlzLnNlbGVjdGVkQ2hhbm5lbElkXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uTWFwID0gdGhpcy5zZWxlY3RlZFJvbGVQZXJtaXNzaW9uc1t0aGlzLnNlbGVjdGVkQ2hhbm5lbElkXS5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlUGVybWlzc2lvbnMocGVybWlzc2lvbk1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBPYmplY3QudmFsdWVzKHRoaXMuc2VsZWN0ZWRSb2xlUGVybWlzc2lvbnMpO1xuICAgICAgICBpZiAoMCA8IGNoYW5uZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5uZWxJZCA9IGNoYW5uZWxzWzBdLmNoYW5uZWxJZDtcbiAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVQZXJtaXNzaW9ucyhjaGFubmVsc1swXS5wZXJtaXNzaW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICBjb25zdCBhZG1pbmlzdHJhdG9yOiBDcmVhdGVBZG1pbmlzdHJhdG9ySW5wdXQgPSB7XG4gICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZvcm1WYWx1ZS5maXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogZm9ybVZhbHVlLmxhc3ROYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IGZvcm1WYWx1ZS5wYXNzd29yZCxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogZm9ybVZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgIHJvbGVJZHM6IGZvcm1WYWx1ZS5yb2xlcy5tYXAocm9sZSA9PiByb2xlLmlkKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZG1pbmlzdHJhdG9yLmNyZWF0ZUFkbWluaXN0cmF0b3IoYWRtaW5pc3RyYXRvcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmNyZWF0ZUFkbWluaXN0cmF0b3IuaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5hZG1pbmlzdHJhdG9yJFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoeyBpZCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRtaW5pc3RyYXRvcjogVXBkYXRlQWRtaW5pc3RyYXRvcklucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZvcm1WYWx1ZS5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogZm9ybVZhbHVlLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGZvcm1WYWx1ZS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogZm9ybVZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVJZHM6IGZvcm1WYWx1ZS5yb2xlcy5tYXAocm9sZSA9PiByb2xlLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci51cGRhdGVBZG1pbmlzdHJhdG9yKGFkbWluaXN0cmF0b3IpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhhZG1pbmlzdHJhdG9yOiBBZG1pbmlzdHJhdG9yLCBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGFkbWluaXN0cmF0b3IuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiBhZG1pbmlzdHJhdG9yLmZpcnN0TmFtZSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBhZG1pbmlzdHJhdG9yLmxhc3ROYW1lLFxuICAgICAgICAgICAgcm9sZXM6IGFkbWluaXN0cmF0b3IudXNlci5yb2xlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VzdG9tRmllbGRGb3JtVmFsdWVzKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnXSksXG4gICAgICAgICAgICAgICAgYWRtaW5pc3RyYXRvcixcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFzc3dvcmRDb250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldCgncGFzc3dvcmQnKTtcbiAgICAgICAgaWYgKHBhc3N3b3JkQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKCFhZG1pbmlzdHJhdG9yLmlkKSB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDb250cm9sLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDb250cm9sLnNldFZhbGlkYXRvcnMoW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVpbGRQZXJtaXNzaW9uc01hcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRQZXJtaXNzaW9uc01hcCgpIHtcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbnNDb250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldCgncm9sZXMnKTtcbiAgICAgICAgaWYgKHBlcm1pc3Npb25zQ29udHJvbCkge1xuICAgICAgICAgICAgY29uc3Qgcm9sZXM6IFJvbGVGcmFnbWVudFtdID0gcGVybWlzc2lvbnNDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgY2hhbm5lbElkUGVybWlzc2lvbnNNYXAgPSBuZXcgTWFwPHN0cmluZywgU2V0PFBlcm1pc3Npb24+PigpO1xuICAgICAgICAgICAgY29uc3QgY2hhbm5lbElkQ29kZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm9sZSBvZiByb2xlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBvZiByb2xlLmNoYW5uZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5uZWxQZXJtaXNzaW9ucyA9IGNoYW5uZWxJZFBlcm1pc3Npb25zTWFwLmdldChjaGFubmVsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvblNldCA9IGNoYW5uZWxQZXJtaXNzaW9ucyB8fCBuZXcgU2V0PFBlcm1pc3Npb24+KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcm9sZS5wZXJtaXNzaW9ucy5mb3JFYWNoKHAgPT4gcGVybWlzc2lvblNldC5hZGQocCkpO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsSWRQZXJtaXNzaW9uc01hcC5zZXQoY2hhbm5lbC5pZCwgcGVybWlzc2lvblNldCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZENvZGVNYXAuc2V0KGNoYW5uZWwuaWQsIGNoYW5uZWwuY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9sZVBlcm1pc3Npb25zID0ge30gYXMgYW55O1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsSWQgb2YgQXJyYXkuZnJvbShjaGFubmVsSWRQZXJtaXNzaW9uc01hcC5rZXlzKCkpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25TZXQgPSBjaGFubmVsSWRQZXJtaXNzaW9uc01hcC5nZXQoY2hhbm5lbElkKSE7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbnNIYXNoOiB7IFtLIGluIFBlcm1pc3Npb25dOiBib29sZWFuIH0gPSB7fSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLmdldFBlcm1pc3Npb25EZWZpbml0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zSGFzaFtkZWYubmFtZV0gPSBwZXJtaXNzaW9uU2V0LmhhcyhkZWYubmFtZSBhcyBQZXJtaXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvbGVQZXJtaXNzaW9uc1tjaGFubmVsSWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbElkLFxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsQ29kZTogY2hhbm5lbElkQ29kZU1hcC5nZXQoY2hhbm5lbElkKSEsXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBwZXJtaXNzaW9uc0hhc2gsXG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, configurableDefinitionToInstance, DataService, getConfigArgValue, NotificationService, Permission, ServerConfigService, toConfigurableOperationInput, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
export class PaymentMethodDetailComponent extends BaseDetailComponent {
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
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createPaymentMethod.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
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
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvcGF5bWVudC1tZXRob2QtZGV0YWlsL3BheW1lbnQtbWV0aG9kLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUVuQixnQ0FBZ0MsRUFLaEMsV0FBVyxFQUVYLGlCQUFpQixFQUNqQixtQkFBbUIsRUFFbkIsVUFBVSxFQUNWLG1CQUFtQixFQUNuQiw0QkFBNEIsR0FFL0IsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyw0QkFDVCxTQUFRLG1CQUEyQztJQWFuRCxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBRWhELEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTC9DLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBZnBELGFBQVEsR0FBc0MsRUFBRSxDQUFDO1FBQ2pELGFBQVEsR0FBc0MsRUFBRSxDQUFDO1FBS3hDLHFCQUFnQixHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQVlwRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQy9CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxJQUFJLEtBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2pGO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixhQUFhLENBQUM7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLE9BQU87WUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQ3ZFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDMUQsQ0FBQztZQUNGLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUM1RCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQzFELENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxVQUFVLENBQUMsV0FBbUIsRUFBRSxTQUFpQjtRQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLFdBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0o7SUFDTCxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBMEIsQ0FBQztRQUNuRixJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBd0M7UUFDbEQsSUFBSSxDQUFDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLGdDQUFnQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksV0FBVyxFQUFFO1lBQ2IsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzlCLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQXdDO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQ0FBZ0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLFdBQVcsRUFBRTtZQUNiLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM5QixXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2RCxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPO2FBQ1AsSUFBSSxDQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDaEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDeEMsTUFBTSxLQUFLLEdBQTZCO2dCQUNwQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDcEIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO2dCQUNsQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0JBQzFCLE9BQU8sRUFBRSxlQUFlO29CQUNwQixDQUFDLENBQUMsNEJBQTRCLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUM7b0JBQ2xFLENBQUMsQ0FBQyxJQUFJO2dCQUNWLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDekUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxZQUFZO2FBQ3ZDLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUNMO2FBQ0EsU0FBUyxDQUNOLElBQUksQ0FBQyxFQUFFO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxFQUFFLGVBQWU7YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMzRixDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLEVBQUUsZUFBZTthQUMxQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxJQUFJO1FBQ0EsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU87YUFDUCxJQUFJLENBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUN4QyxNQUFNLEtBQUssR0FBNkI7Z0JBQ3BDLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVztnQkFDbEMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dCQUMxQixPQUFPLEVBQUUsZUFBZTtvQkFDcEIsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDO29CQUNsRSxDQUFDLENBQUMsSUFBSTtnQkFDVixPQUFPLEVBQUUsNEJBQTRCLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pFLFlBQVksRUFBRSxTQUFTLENBQUMsWUFBWTthQUN2QyxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FDTDthQUNBLFNBQVMsQ0FDTixJQUFJLENBQUMsRUFBRTtZQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7Z0JBQ2hFLE1BQU0sRUFBRSxlQUFlO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLEVBQUUsZUFBZTthQUMxQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFUyxhQUFhLENBQUMsYUFBcUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDdkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtZQUN4QixXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7WUFDdEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO1lBQzlCLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxJQUFJLEVBQUU7WUFDcEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLElBQUksRUFBRTtTQUN2QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUk7Z0JBQzVDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ2hDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQ0FBTSxDQUFDLEtBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDO2FBQzNGLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSTtnQkFDNUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDaEMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlDQUFNLENBQUMsS0FBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUM7YUFDM0YsQ0FBQztTQUNMO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsd0JBQXdCLENBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUNuQyxhQUFhLENBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7OztZQXJPSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsbTVMQUFxRDtnQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUE3QndCLE1BQU07WUFBdEIsY0FBYztZQWdCbkIsbUJBQW1CO1lBbEJXLGlCQUFpQjtZQVkvQyxXQUFXO1lBWE4sV0FBVztZQWNoQixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDb25maWdBcmdEZWZpbml0aW9uLFxuICAgIGNvbmZpZ3VyYWJsZURlZmluaXRpb25Ub0luc3RhbmNlLFxuICAgIENvbmZpZ3VyYWJsZU9wZXJhdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uLFxuICAgIENyZWF0ZVBheW1lbnRNZXRob2RJbnB1dCxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBlbmNvZGVDb25maWdBcmdWYWx1ZSxcbiAgICBnZXRDb25maWdBcmdWYWx1ZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFBheW1lbnRNZXRob2QsXG4gICAgUGVybWlzc2lvbixcbiAgICBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgIHRvQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQsXG4gICAgVXBkYXRlUGF5bWVudE1ldGhvZElucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG5vcm1hbGl6ZVN0cmluZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvbm9ybWFsaXplLXN0cmluZyc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcGF5bWVudC1tZXRob2QtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF5bWVudC1tZXRob2QtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYXltZW50LW1ldGhvZC1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGF5bWVudE1ldGhvZERldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxQYXltZW50TWV0aG9kLkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICBkZXRhaWxGb3JtOiBGb3JtR3JvdXA7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGNoZWNrZXJzOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uW10gPSBbXTtcbiAgICBoYW5kbGVyczogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbltdID0gW107XG4gICAgc2VsZWN0ZWRDaGVja2VyPzogQ29uZmlndXJhYmxlT3BlcmF0aW9uIHwgbnVsbDtcbiAgICBzZWxlY3RlZENoZWNrZXJEZWZpbml0aW9uPzogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbjtcbiAgICBzZWxlY3RlZEhhbmRsZXI/OiBDb25maWd1cmFibGVPcGVyYXRpb24gfCBudWxsO1xuICAgIHNlbGVjdGVkSGFuZGxlckRlZmluaXRpb24/OiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uO1xuICAgIHJlYWRvbmx5IHVwZGF0ZVBlcm1pc3Npb24gPSBbUGVybWlzc2lvbi5VcGRhdGVTZXR0aW5ncywgUGVybWlzc2lvbi5VcGRhdGVQYXltZW50TWV0aG9kXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ1BheW1lbnRNZXRob2QnKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBjb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IFt0cnVlLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGNoZWNrZXI6IHt9LFxuICAgICAgICAgICAgaGFuZGxlcjoge30sXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMucmVkdWNlKChoYXNoLCBmaWVsZCkgPT4gKHsgLi4uaGFzaCwgW2ZpZWxkLm5hbWVdOiAnJyB9KSwge30pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MuZ2V0UGF5bWVudE1ldGhvZE9wZXJhdGlvbnMoKS5zaW5nbGUkLFxuICAgICAgICAgICAgdGhpcy5lbnRpdHkkLnBpcGUodGFrZSgxKSksXG4gICAgICAgIF0pLnN1YnNjcmliZSgoW2RhdGEsIGVudGl0eV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlcnMgPSBkYXRhLnBheW1lbnRNZXRob2RFbGlnaWJpbGl0eUNoZWNrZXJzO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVycyA9IGRhdGEucGF5bWVudE1ldGhvZEhhbmRsZXJzO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGVja2VyRGVmaW5pdGlvbiA9IGRhdGEucGF5bWVudE1ldGhvZEVsaWdpYmlsaXR5Q2hlY2tlcnMuZmluZChcbiAgICAgICAgICAgICAgICBjID0+IGMuY29kZSA9PT0gKGVudGl0eS5jaGVja2VyICYmIGVudGl0eS5jaGVja2VyLmNvZGUpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRIYW5kbGVyRGVmaW5pdGlvbiA9IGRhdGEucGF5bWVudE1ldGhvZEhhbmRsZXJzLmZpbmQoXG4gICAgICAgICAgICAgICAgYyA9PiBjLmNvZGUgPT09IChlbnRpdHkuaGFuZGxlciAmJiBlbnRpdHkuaGFuZGxlci5jb2RlKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2RlKGN1cnJlbnRDb2RlOiBzdHJpbmcsIG5hbWVWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghY3VycmVudENvZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGVDb250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldChbJ2NvZGUnXSk7XG4gICAgICAgICAgICBpZiAoY29kZUNvbnRyb2wgJiYgY29kZUNvbnRyb2wucHJpc3RpbmUpIHtcbiAgICAgICAgICAgICAgICBjb2RlQ29udHJvbC5zZXRWYWx1ZShub3JtYWxpemVTdHJpbmcobmFtZVZhbHVlLCAnLScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ0FyZ3NJc1BvcHVsYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY29uZmlnQXJnc0dyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY29uZmlnQXJncycpIGFzIEZvcm1Hcm91cCB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFjb25maWdBcmdzR3JvdXApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMCA8IE9iamVjdC5rZXlzKGNvbmZpZ0FyZ3NHcm91cC5jb250cm9scykubGVuZ3RoO1xuICAgIH1cblxuICAgIHNlbGVjdENoZWNrZXIoY2hlY2tlcjogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hlY2tlckRlZmluaXRpb24gPSBjaGVja2VyO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hlY2tlciA9IGNvbmZpZ3VyYWJsZURlZmluaXRpb25Ub0luc3RhbmNlKGNoZWNrZXIpO1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2NoZWNrZXInKTtcbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBmb3JtQ29udHJvbC5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLnBhdGNoVmFsdWUodGhpcy5zZWxlY3RlZENoZWNrZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHNlbGVjdEhhbmRsZXIoaGFuZGxlcjogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSGFuZGxlckRlZmluaXRpb24gPSBoYW5kbGVyO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSGFuZGxlciA9IGNvbmZpZ3VyYWJsZURlZmluaXRpb25Ub0luc3RhbmNlKGhhbmRsZXIpO1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2hhbmRsZXInKTtcbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBmb3JtQ29udHJvbC5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLnBhdGNoVmFsdWUodGhpcy5zZWxlY3RlZEhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUNoZWNrZXIoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGVja2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlSGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzRGlydHkoKTtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hlY2tlciA9IHRoaXMuc2VsZWN0ZWRDaGVja2VyO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEhhbmRsZXIgPSB0aGlzLnNlbGVjdGVkSGFuZGxlcjtcbiAgICAgICAgaWYgKCFzZWxlY3RlZEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgaWQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0OiBDcmVhdGVQYXltZW50TWV0aG9kSW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGZvcm1WYWx1ZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGZvcm1WYWx1ZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZvcm1WYWx1ZS5lbmFibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlcjogc2VsZWN0ZWRDaGVja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0b0NvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0KHNlbGVjdGVkQ2hlY2tlciwgZm9ybVZhbHVlLmNoZWNrZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogdG9Db25maWd1cmFibGVPcGVyYXRpb25JbnB1dChzZWxlY3RlZEhhbmRsZXIsIGZvcm1WYWx1ZS5oYW5kbGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogZm9ybVZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MuY3JlYXRlUGF5bWVudE1ldGhvZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1BheW1lbnRNZXRob2QnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgZGF0YS5jcmVhdGVQYXltZW50TWV0aG9kLmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1BheW1lbnRNZXRob2QnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZENoZWNrZXIgPSB0aGlzLnNlbGVjdGVkQ2hlY2tlcjtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRIYW5kbGVyID0gdGhpcy5zZWxlY3RlZEhhbmRsZXI7XG4gICAgICAgIGlmICghc2VsZWN0ZWRIYW5kbGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7IGlkIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dDogVXBkYXRlUGF5bWVudE1ldGhvZElucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGZvcm1WYWx1ZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGZvcm1WYWx1ZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZvcm1WYWx1ZS5lbmFibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlcjogc2VsZWN0ZWRDaGVja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0b0NvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0KHNlbGVjdGVkQ2hlY2tlciwgZm9ybVZhbHVlLmNoZWNrZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogdG9Db25maWd1cmFibGVPcGVyYXRpb25JbnB1dChzZWxlY3RlZEhhbmRsZXIsIGZvcm1WYWx1ZS5oYW5kbGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogZm9ybVZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MudXBkYXRlUGF5bWVudE1ldGhvZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1BheW1lbnRNZXRob2QnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUGF5bWVudE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKHBheW1lbnRNZXRob2Q6IFBheW1lbnRNZXRob2QuRnJhZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgbmFtZTogcGF5bWVudE1ldGhvZC5uYW1lLFxuICAgICAgICAgICAgY29kZTogcGF5bWVudE1ldGhvZC5jb2RlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHBheW1lbnRNZXRob2QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBlbmFibGVkOiBwYXltZW50TWV0aG9kLmVuYWJsZWQsXG4gICAgICAgICAgICBjaGVja2VyOiBwYXltZW50TWV0aG9kLmNoZWNrZXIgfHwge30sXG4gICAgICAgICAgICBoYW5kbGVyOiBwYXltZW50TWV0aG9kLmhhbmRsZXIgfHwge30sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRDaGVja2VyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hlY2tlciA9IHBheW1lbnRNZXRob2QuY2hlY2tlciAmJiB7XG4gICAgICAgICAgICAgICAgY29kZTogcGF5bWVudE1ldGhvZC5jaGVja2VyLmNvZGUsXG4gICAgICAgICAgICAgICAgYXJnczogcGF5bWVudE1ldGhvZC5jaGVja2VyLmFyZ3MubWFwKGEgPT4gKHsgLi4uYSwgdmFsdWU6IGdldENvbmZpZ0FyZ1ZhbHVlKGEudmFsdWUpIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEhhbmRsZXIgPSBwYXltZW50TWV0aG9kLmhhbmRsZXIgJiYge1xuICAgICAgICAgICAgICAgIGNvZGU6IHBheW1lbnRNZXRob2QuaGFuZGxlci5jb2RlLFxuICAgICAgICAgICAgICAgIGFyZ3M6IHBheW1lbnRNZXRob2QuaGFuZGxlci5hcmdzLm1hcChhID0+ICh7IC4uLmEsIHZhbHVlOiBnZXRDb25maWdBcmdWYWx1ZShhLnZhbHVlKSB9KSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VzdG9tRmllbGRGb3JtVmFsdWVzKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2N1c3RvbUZpZWxkcycpLFxuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2QsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
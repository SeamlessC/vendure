import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, createUpdatedTranslatable, DataService, DeletionResult, findTranslation, ModalService, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { combineLatest, EMPTY, forkJoin } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, take } from 'rxjs/operators';
export class FacetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateFacet];
        this.customFields = this.getCustomFieldConfig('Facet');
        this.customValueFields = this.getCustomFieldConfig('FacetValue');
        this.detailForm = this.formBuilder.group({
            facet: this.formBuilder.group({
                code: ['', Validators.required],
                name: '',
                visible: true,
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            values: this.formBuilder.array([]),
        });
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['facet', 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    updateValueCode(currentCode, nameValue, index) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['values', index, 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    customValueFieldIsSet(index, name) {
        return !!this.detailForm.get(['values', index, 'customFields', name]);
    }
    getValuesFormArray() {
        return this.detailForm.get('values');
    }
    addFacetValue() {
        const valuesFormArray = this.detailForm.get('values');
        if (valuesFormArray) {
            const valueGroup = this.formBuilder.group({
                id: '',
                name: ['', Validators.required],
                code: '',
            });
            const newValue = { name: '', code: '' };
            if (this.customValueFields.length) {
                const customValueFieldsGroup = new FormGroup({});
                newValue.customFields = {};
                for (const fieldDef of this.customValueFields) {
                    const key = fieldDef.name;
                    customValueFieldsGroup.addControl(key, new FormControl());
                }
                valueGroup.addControl('customFields', customValueFieldsGroup);
            }
            valuesFormArray.insert(valuesFormArray.length, valueGroup);
            this.values.push(newValue);
        }
    }
    create() {
        const facetForm = this.detailForm.get('facet');
        if (!facetForm || !facetForm.dirty) {
            return;
        }
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const newFacet = this.getUpdatedFacet(facet, facetForm, languageCode);
            return this.dataService.facet.createFacet(newFacet);
        }), switchMap(data => this.dataService.facet.getAllFacets().single$.pipe(mapTo(data))))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), { entity: 'Facet' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createFacet.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Facet',
            });
        });
    }
    save() {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const facetGroup = this.detailForm.get('facet');
            const updateOperations = [];
            if (facetGroup && facetGroup.dirty) {
                const newFacet = this.getUpdatedFacet(facet, facetGroup, languageCode);
                if (newFacet) {
                    updateOperations.push(this.dataService.facet.updateFacet(newFacet));
                }
            }
            const valuesArray = this.detailForm.get('values');
            if (valuesArray && valuesArray.dirty) {
                const createdValues = this.getCreatedFacetValues(facet, valuesArray, languageCode);
                if (createdValues.length) {
                    updateOperations.push(this.dataService.facet
                        .createFacetValues(createdValues)
                        .pipe(switchMap(() => this.dataService.facet.getFacet(this.id).single$)));
                }
                const updatedValues = this.getUpdatedFacetValues(facet, valuesArray, languageCode);
                if (updatedValues.length) {
                    updateOperations.push(this.dataService.facet.updateFacetValues(updatedValues));
                }
            }
            return forkJoin(updateOperations);
        }), switchMap(() => this.dataService.facet.getAllFacets().single$))
            .subscribe(() => {
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Facet' });
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Facet',
            });
        });
    }
    deleteFacetValue(facetValueId, index) {
        if (!facetValueId) {
            // deleting a newly-added (not persisted) FacetValue
            const valuesFormArray = this.detailForm.get('values');
            if (valuesFormArray) {
                valuesFormArray.removeAt(index);
            }
            this.values.splice(index, 1);
            return;
        }
        this.showModalAndDelete(facetValueId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(facetValueId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), switchMap(deleted => (deleted ? this.dataService.facet.getFacet(this.id).single$ : [])))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'FacetValue',
            });
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'FacetValue',
            });
        });
    }
    showModalAndDelete(facetValueId, message) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-facet-value'),
            body: message,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(result => result ? this.dataService.facet.deleteFacetValues([facetValueId], !!message) : EMPTY), map(result => result.deleteFacetValues[0]));
    }
    /**
     * Sets the values of the form on changes to the facet or current language.
     */
    setFormValues(facet, languageCode) {
        var _a;
        const currentTranslation = findTranslation(facet, languageCode);
        this.detailForm.patchValue({
            facet: {
                code: facet.code,
                visible: !facet.isPrivate,
                name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
            },
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['facet', 'customFields']);
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['facet', 'customFields']), facet, currentTranslation);
        }
        const currentValuesFormArray = this.detailForm.get('values');
        this.values = [...facet.values];
        facet.values.forEach((value, i) => {
            var _a, _b, _c, _d, _e;
            const valueTranslation = findTranslation(value, languageCode);
            const group = {
                id: value.id,
                code: value.code,
                name: valueTranslation ? valueTranslation.name : '',
            };
            const valueControl = currentValuesFormArray.at(i);
            if (valueControl) {
                (_a = valueControl.get('id')) === null || _a === void 0 ? void 0 : _a.setValue(group.id);
                (_b = valueControl.get('code')) === null || _b === void 0 ? void 0 : _b.setValue(group.code);
                (_c = valueControl.get('name')) === null || _c === void 0 ? void 0 : _c.setValue(group.name);
            }
            else {
                currentValuesFormArray.insert(i, this.formBuilder.group(group));
            }
            if (this.customValueFields.length) {
                let customValueFieldsGroup = this.detailForm.get(['values', i, 'customFields']);
                if (!customValueFieldsGroup) {
                    customValueFieldsGroup = new FormGroup({});
                    this.detailForm.get(['values', i]).addControl('customFields', customValueFieldsGroup);
                }
                if (customValueFieldsGroup) {
                    for (const fieldDef of this.customValueFields) {
                        const key = fieldDef.name;
                        const fieldValue = fieldDef.type === 'localeString'
                            ? (_e = (_d = valueTranslation) === null || _d === void 0 ? void 0 : _d.customFields) === null || _e === void 0 ? void 0 : _e[key]
                            : value.customFields[key];
                        const control = customValueFieldsGroup.get(key);
                        if (control) {
                            control.setValue(fieldValue);
                        }
                        else {
                            customValueFieldsGroup.addControl(key, new FormControl(fieldValue));
                        }
                    }
                }
            }
        });
    }
    /**
     * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
     * can then be persisted to the API.
     */
    getUpdatedFacet(facet, facetFormGroup, languageCode) {
        const input = createUpdatedTranslatable({
            translatable: facet,
            updatedFields: facetFormGroup.value,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: facet.name || '',
            },
        });
        input.isPrivate = !facetFormGroup.value.visible;
        return input;
    }
    /**
     * Given an array of facet values and the values from the detailForm, this method creates a new array
     * which can be persisted to the API via a createFacetValues mutation.
     */
    getCreatedFacetValues(facet, valuesFormArray, languageCode) {
        return valuesFormArray.controls
            .filter(c => !c.value.id)
            .map(c => c.value)
            .map(value => createUpdatedTranslatable({
            translatable: Object.assign(Object.assign({}, value), { translations: [] }),
            updatedFields: value,
            customFieldConfig: this.customValueFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: '',
            },
        }))
            .map(input => (Object.assign({ facetId: facet.id }, input)));
    }
    /**
     * Given an array of facet values and the values from the detailForm, this method creates a new array
     * which can be persisted to the API via an updateFacetValues mutation.
     */
    getUpdatedFacetValues(facet, valuesFormArray, languageCode) {
        const dirtyValues = facet.values.filter((v, i) => {
            const formRow = valuesFormArray.get(i.toString());
            return formRow && formRow.dirty && formRow.value.id;
        });
        const dirtyValueValues = valuesFormArray.controls
            .filter(c => c.dirty && c.value.id)
            .map(c => c.value);
        if (dirtyValues.length !== dirtyValueValues.length) {
            throw new Error(_(`error.facet-value-form-values-do-not-match`));
        }
        return dirtyValues
            .map((value, i) => {
            return createUpdatedTranslatable({
                translatable: value,
                updatedFields: dirtyValueValues[i],
                customFieldConfig: this.customValueFields,
                languageCode,
                defaultTranslation: {
                    languageCode,
                    name: '',
                },
            });
        })
            .filter(notNullOrUndefined);
    }
}
FacetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as facet\">\n    <section class=\"form-block\" formGroupName=\"facet\">\n        <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n            <clr-toggle-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    formControlName=\"visible\"\n                    id=\"visibility\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"detailForm.value.facet.visible; else private\">{{\n                        'catalog.public' | translate\n                    }}</ng-container>\n                    <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                </label>\n            </clr-toggle-wrapper>\n        </vdr-form-field>\n        <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n            <input\n                id=\"name\"\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (input)=\"updateCode(facet.code, $event.target.value)\"\n            />\n        </vdr-form-field>\n        <vdr-form-field\n            [label]=\"'common.code' | translate\"\n            for=\"code\"\n            [readOnlyToggle]=\"updatePermission | hasPermission\"\n        >\n            <input\n                id=\"code\"\n                type=\"text\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"code\"\n            />\n        </vdr-form-field>\n\n        <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n            <label>{{ 'common.custom-fields' | translate }}</label>\n            <vdr-tabbed-custom-fields\n                entityName=\"Facet\"\n                [customFields]=\"customFields\"\n                [customFieldsFormGroup]=\"detailForm.get(['facet', 'customFields'])\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            ></vdr-tabbed-custom-fields>\n        </section>\n        <vdr-custom-detail-component-host\n            locationId=\"facet-detail\"\n            [entity$]=\"entity$\"\n            [detailForm]=\"detailForm\"\n        ></vdr-custom-detail-component-host>\n    </section>\n\n    <section class=\"form-block\" *ngIf=\"!(isNew$ | async)\">\n        <label>{{ 'catalog.facet-values' | translate }}</label>\n\n        <table class=\"facet-values-list table\" formArrayName=\"values\" *ngIf=\"0 < getValuesFormArray().length\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'common.name' | translate }}</th>\n                    <th>{{ 'common.code' | translate }}</th>\n                    <ng-container *ngIf=\"customValueFields.length\">\n                        <th>{{ 'common.custom-fields' | translate }}</th>\n                    </ng-container>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr class=\"facet-value\" *ngFor=\"let value of values; let i = index\" [formGroupName]=\"i\">\n                    <td class=\"align-middle\">\n                        <vdr-entity-info [entity]=\"value\"></vdr-entity-info>\n                    </td>\n                    <td class=\"align-middle\">\n                        <input\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            (input)=\"updateValueCode(facet.values[i]?.code, $event.target.value, i)\"\n                        />\n                    </td>\n                    <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" readonly /></td>\n                    <td class=\"\" *ngIf=\"customValueFields.length\">\n                        <vdr-tabbed-custom-fields\n                            entityName=\"FacetValue\"\n                            [customFields]=\"customValueFields\"\n                            [compact]=\"true\"\n                            [customFieldsFormGroup]=\"detailForm.get(['values', i, 'customFields'])\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                        ></vdr-tabbed-custom-fields>\n                    </td>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"deleteFacetValue(facet.values[i]?.id, i)\"\n                                    [disabled]=\"!(updatePermission | hasPermission)\"\n                                    vdrDropdownItem\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <button\n                type=\"button\"\n                class=\"btn btn-secondary\"\n                *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n                (click)=\"addFacetValue()\"\n            >\n                <clr-icon shape=\"add\"></clr-icon>\n                {{ 'catalog.add-facet-value' | translate }}\n            </button>\n        </div>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visible-toggle{margin-top:-3px!important}\n"]
            },] }
];
FacetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ModalService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9mYWNldC1kZXRhaWwvZmFjZXQtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQWEsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxtQkFBbUIsRUFHbkIseUJBQXlCLEVBRXpCLFdBQVcsRUFDWCxjQUFjLEVBRWQsZUFBZSxFQUVmLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsVUFBVSxFQUNWLG1CQUFtQixHQUd0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RSxNQUFNLE9BQU8sb0JBQ1QsU0FBUSxtQkFBNkM7SUFTckQsWUFDSSxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ2hDLGNBQWlDLEVBQy9CLFdBQXdCLEVBQzFC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Q0FBQyxNQUFNLEtBQUssZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQztTQUNwRTtRQUNELE9BQU8sV0FBVzthQUNiLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNkLE9BQU8seUJBQXlCLENBQUM7Z0JBQzdCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxZQUFZO2dCQUNaLGtCQUFrQixFQUFFO29CQUNoQixZQUFZO29CQUNaLElBQUksRUFBRSxFQUFFO2lCQUNYO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBdFpKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixxMU9BQTRDO2dCQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQTlCd0IsTUFBTTtZQUF0QixjQUFjO1lBZ0JuQixtQkFBbUI7WUFsQlcsaUJBQWlCO1lBVS9DLFdBQVc7WUFUSyxXQUFXO1lBZTNCLG1CQUFtQjtZQURuQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ3JlYXRlRmFjZXRJbnB1dCxcbiAgICBDcmVhdGVGYWNldFZhbHVlSW5wdXQsXG4gICAgY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBEZWxldGlvblJlc3VsdCxcbiAgICBGYWNldFdpdGhWYWx1ZXMsXG4gICAgZmluZFRyYW5zbGF0aW9uLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBQZXJtaXNzaW9uLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlRmFjZXRJbnB1dCxcbiAgICBVcGRhdGVGYWNldFZhbHVlSW5wdXQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgbm9ybWFsaXplU3RyaW5nIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9ub3JtYWxpemUtc3RyaW5nJztcbmltcG9ydCB7IG5vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEVNUFRZLCBmb3JrSm9pbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZmFjZXQtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNldC1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXREZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8RmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgY3VzdG9tVmFsdWVGaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIHZhbHVlczogQXJyYXk8RmFjZXRXaXRoVmFsdWVzLlZhbHVlcyB8IHsgbmFtZTogc3RyaW5nOyBjb2RlOiBzdHJpbmcgfT47XG4gICAgcmVhZG9ubHkgdXBkYXRlUGVybWlzc2lvbiA9IFtQZXJtaXNzaW9uLlVwZGF0ZUNhdGFsb2csIFBlcm1pc3Npb24uVXBkYXRlRmFjZXRdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnRmFjZXQnKTtcbiAgICAgICAgdGhpcy5jdXN0b21WYWx1ZUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ0ZhY2V0VmFsdWUnKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBmYWNldDogdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICAgICAgY29kZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMucmVkdWNlKChoYXNoLCBmaWVsZCkgPT4gKHsgLi4uaGFzaCwgW2ZpZWxkLm5hbWVdOiAnJyB9KSwge30pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZhbHVlczogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbXSksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29kZShjdXJyZW50Q29kZTogc3RyaW5nLCBuYW1lVmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIWN1cnJlbnRDb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoWydmYWNldCcsICdjb2RlJ10pO1xuICAgICAgICAgICAgaWYgKGNvZGVDb250cm9sICYmIGNvZGVDb250cm9sLnByaXN0aW5lKSB7XG4gICAgICAgICAgICAgICAgY29kZUNvbnRyb2wuc2V0VmFsdWUobm9ybWFsaXplU3RyaW5nKG5hbWVWYWx1ZSwgJy0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZUNvZGUoY3VycmVudENvZGU6IHN0cmluZywgbmFtZVZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFjdXJyZW50Q29kZSkge1xuICAgICAgICAgICAgY29uc3QgY29kZUNvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsndmFsdWVzJywgaW5kZXgsICdjb2RlJ10pO1xuICAgICAgICAgICAgaWYgKGNvZGVDb250cm9sICYmIGNvZGVDb250cm9sLnByaXN0aW5lKSB7XG4gICAgICAgICAgICAgICAgY29kZUNvbnRyb2wuc2V0VmFsdWUobm9ybWFsaXplU3RyaW5nKG5hbWVWYWx1ZSwgJy0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjdXN0b21WYWx1ZUZpZWxkSXNTZXQoaW5kZXg6IG51bWJlciwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGV0YWlsRm9ybS5nZXQoWyd2YWx1ZXMnLCBpbmRleCwgJ2N1c3RvbUZpZWxkcycsIG5hbWVdKTtcbiAgICB9XG5cbiAgICBnZXRWYWx1ZXNGb3JtQXJyYXkoKTogRm9ybUFycmF5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3ZhbHVlcycpIGFzIEZvcm1BcnJheTtcbiAgICB9XG5cbiAgICBhZGRGYWNldFZhbHVlKCkge1xuICAgICAgICBjb25zdCB2YWx1ZXNGb3JtQXJyYXkgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCd2YWx1ZXMnKSBhcyBGb3JtQXJyYXkgfCBudWxsO1xuICAgICAgICBpZiAodmFsdWVzRm9ybUFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZUdyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlOiBhbnkgPSB7IG5hbWU6ICcnLCBjb2RlOiAnJyB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tVmFsdWVGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tVmFsdWVGaWVsZHNHcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLmN1c3RvbUZpZWxkcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmN1c3RvbVZhbHVlRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpZWxkRGVmLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbHVlRmllbGRzR3JvdXAuYWRkQ29udHJvbChrZXksIG5ldyBGb3JtQ29udHJvbCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZUdyb3VwLmFkZENvbnRyb2woJ2N1c3RvbUZpZWxkcycsIGN1c3RvbVZhbHVlRmllbGRzR3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVzRm9ybUFycmF5Lmluc2VydCh2YWx1ZXNGb3JtQXJyYXkubGVuZ3RoLCB2YWx1ZUdyb3VwKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2gobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBmYWNldEZvcm0gPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdmYWNldCcpO1xuICAgICAgICBpZiAoIWZhY2V0Rm9ybSB8fCAhZmFjZXRGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmVudGl0eSQsIHRoaXMubGFuZ3VhZ2VDb2RlJClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKFtmYWNldCwgbGFuZ3VhZ2VDb2RlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdGYWNldCA9IHRoaXMuZ2V0VXBkYXRlZEZhY2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNldEZvcm0gYXMgRm9ybUdyb3VwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICApIGFzIENyZWF0ZUZhY2V0SW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmNyZWF0ZUZhY2V0KG5ld0ZhY2V0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoZGF0YSA9PiB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmdldEFsbEZhY2V0cygpLnNpbmdsZSQucGlwZShtYXBUbyhkYXRhKSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7IGVudGl0eTogJ0ZhY2V0JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgZGF0YS5jcmVhdGVGYWNldC5pZF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdGYWNldCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5lbnRpdHkkLCB0aGlzLmxhbmd1YWdlQ29kZSQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChbZmFjZXQsIGxhbmd1YWdlQ29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZXRHcm91cCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2ZhY2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZU9wZXJhdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjZXRHcm91cCAmJiBmYWNldEdyb3VwLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdGYWNldCA9IHRoaXMuZ2V0VXBkYXRlZEZhY2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0R3JvdXAgYXMgRm9ybUdyb3VwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkgYXMgVXBkYXRlRmFjZXRJbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdGYWNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9wZXJhdGlvbnMucHVzaCh0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LnVwZGF0ZUZhY2V0KG5ld0ZhY2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzQXJyYXkgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCd2YWx1ZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlc0FycmF5ICYmIHZhbHVlc0FycmF5LmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVkVmFsdWVzID0gdGhpcy5nZXRDcmVhdGVkRmFjZXRWYWx1ZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzQXJyYXkgYXMgRm9ybUFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXRlZFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVPcGVyYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZmFjZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVGYWNldFZhbHVlcyhjcmVhdGVkVmFsdWVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKCgpID0+IHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQuZ2V0RmFjZXQodGhpcy5pZCkuc2luZ2xlJCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkVmFsdWVzID0gdGhpcy5nZXRVcGRhdGVkRmFjZXRWYWx1ZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzQXJyYXkgYXMgRm9ybUFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVPcGVyYXRpb25zLnB1c2godGhpcy5kYXRhU2VydmljZS5mYWNldC51cGRhdGVGYWNldFZhbHVlcyh1cGRhdGVkVmFsdWVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ya0pvaW4odXBkYXRlT3BlcmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQuZ2V0QWxsRmFjZXRzKCkuc2luZ2xlJCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwgeyBlbnRpdHk6ICdGYWNldCcgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnRmFjZXQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGVGYWNldFZhbHVlKGZhY2V0VmFsdWVJZDogc3RyaW5nIHwgdW5kZWZpbmVkLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghZmFjZXRWYWx1ZUlkKSB7XG4gICAgICAgICAgICAvLyBkZWxldGluZyBhIG5ld2x5LWFkZGVkIChub3QgcGVyc2lzdGVkKSBGYWNldFZhbHVlXG4gICAgICAgICAgICBjb25zdCB2YWx1ZXNGb3JtQXJyYXkgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCd2YWx1ZXMnKSBhcyBGb3JtQXJyYXkgfCBudWxsO1xuICAgICAgICAgICAgaWYgKHZhbHVlc0Zvcm1BcnJheSkge1xuICAgICAgICAgICAgICAgIHZhbHVlc0Zvcm1BcnJheS5yZW1vdmVBdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd01vZGFsQW5kRGVsZXRlKGZhY2V0VmFsdWVJZClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXN1bHQgPT09IERlbGV0aW9uUmVzdWx0LkRFTEVURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbdHJ1ZV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxBbmREZWxldGUoZmFjZXRWYWx1ZUlkLCByZXNwb25zZS5tZXNzYWdlIHx8ICcnKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyID0+IHIucmVzdWx0ID09PSBEZWxldGlvblJlc3VsdC5ERUxFVEVEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoZGVsZXRlZCA9PiAoZGVsZXRlZCA/IHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQuZ2V0RmFjZXQodGhpcy5pZCkuc2luZ2xlJCA6IFtdKSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdGYWNldFZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnRmFjZXRWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd01vZGFsQW5kRGVsZXRlKGZhY2V0VmFsdWVJZDogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtZmFjZXQtdmFsdWUnKSxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3VsdCA9PlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPyB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmRlbGV0ZUZhY2V0VmFsdWVzKFtmYWNldFZhbHVlSWRdLCAhIW1lc3NhZ2UpIDogRU1QVFksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtYXAocmVzdWx0ID0+IHJlc3VsdC5kZWxldGVGYWNldFZhbHVlc1swXSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBvbiBjaGFuZ2VzIHRvIHRoZSBmYWNldCBvciBjdXJyZW50IGxhbmd1YWdlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGZhY2V0OiBGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGlvbiA9IGZpbmRUcmFuc2xhdGlvbihmYWNldCwgbGFuZ3VhZ2VDb2RlKTtcblxuICAgICAgICB0aGlzLmRldGFpbEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgICAgICBmYWNldDoge1xuICAgICAgICAgICAgICAgIGNvZGU6IGZhY2V0LmNvZGUsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogIWZhY2V0LmlzUHJpdmF0ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBjdXJyZW50VHJhbnNsYXRpb24/Lm5hbWUgPz8gJycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoWydmYWNldCcsICdjdXN0b21GaWVsZHMnXSkgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXN0b21GaWVsZEZvcm1WYWx1ZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmdldChbJ2ZhY2V0JywgJ2N1c3RvbUZpZWxkcyddKSxcbiAgICAgICAgICAgICAgICBmYWNldCxcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRpb24sXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlc0Zvcm1BcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3ZhbHVlcycpIGFzIEZvcm1BcnJheTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbLi4uZmFjZXQudmFsdWVzXTtcbiAgICAgICAgZmFjZXQudmFsdWVzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZVRyYW5zbGF0aW9uID0gZmluZFRyYW5zbGF0aW9uKHZhbHVlLCBsYW5ndWFnZUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IHZhbHVlLmlkLFxuICAgICAgICAgICAgICAgIGNvZGU6IHZhbHVlLmNvZGUsXG4gICAgICAgICAgICAgICAgbmFtZTogdmFsdWVUcmFuc2xhdGlvbiA/IHZhbHVlVHJhbnNsYXRpb24ubmFtZSA6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlQ29udHJvbCA9IGN1cnJlbnRWYWx1ZXNGb3JtQXJyYXkuYXQoaSk7XG4gICAgICAgICAgICBpZiAodmFsdWVDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVDb250cm9sLmdldCgnaWQnKT8uc2V0VmFsdWUoZ3JvdXAuaWQpO1xuICAgICAgICAgICAgICAgIHZhbHVlQ29udHJvbC5nZXQoJ2NvZGUnKT8uc2V0VmFsdWUoZ3JvdXAuY29kZSk7XG4gICAgICAgICAgICAgICAgdmFsdWVDb250cm9sLmdldCgnbmFtZScpPy5zZXRWYWx1ZShncm91cC5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlc0Zvcm1BcnJheS5pbnNlcnQoaSwgdGhpcy5mb3JtQnVpbGRlci5ncm91cChncm91cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tVmFsdWVGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1c3RvbVZhbHVlRmllbGRzR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsndmFsdWVzJywgaSwgJ2N1c3RvbUZpZWxkcyddKSBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXN0b21WYWx1ZUZpZWxkc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbHVlRmllbGRzR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZGV0YWlsRm9ybS5nZXQoWyd2YWx1ZXMnLCBpXSkgYXMgRm9ybUdyb3VwKS5hZGRDb250cm9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbUZpZWxkcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21WYWx1ZUZpZWxkc0dyb3VwLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXN0b21WYWx1ZUZpZWxkc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5jdXN0b21WYWx1ZUZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRGVmLnR5cGUgPT09ICdsb2NhbGVTdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHZhbHVlVHJhbnNsYXRpb24gYXMgYW55IHwgdW5kZWZpbmVkKT8uY3VzdG9tRmllbGRzPy5ba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh2YWx1ZSBhcyBhbnkpLmN1c3RvbUZpZWxkc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbVZhbHVlRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbHVlRmllbGRzR3JvdXAuYWRkQ29udHJvbChrZXksIG5ldyBGb3JtQ29udHJvbChmaWVsZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgZmFjZXQgYW5kIHRoZSB2YWx1ZSBvZiB0aGUgZGV0YWlsRm9ybSwgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiB1cGRhdGVkIGNvcHkgb2YgdGhlIGZhY2V0IHdoaWNoXG4gICAgICogY2FuIHRoZW4gYmUgcGVyc2lzdGVkIHRvIHRoZSBBUEkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRVcGRhdGVkRmFjZXQoXG4gICAgICAgIGZhY2V0OiBGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnQsXG4gICAgICAgIGZhY2V0Rm9ybUdyb3VwOiBGb3JtR3JvdXAsXG4gICAgICAgIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlLFxuICAgICk6IENyZWF0ZUZhY2V0SW5wdXQgfCBVcGRhdGVGYWNldElucHV0IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogZmFjZXQsXG4gICAgICAgICAgICB1cGRhdGVkRmllbGRzOiBmYWNldEZvcm1Hcm91cC52YWx1ZSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkQ29uZmlnOiB0aGlzLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgIGRlZmF1bHRUcmFuc2xhdGlvbjoge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWNldC5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0LmlzUHJpdmF0ZSA9ICFmYWNldEZvcm1Hcm91cC52YWx1ZS52aXNpYmxlO1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gYXJyYXkgb2YgZmFjZXQgdmFsdWVzIGFuZCB0aGUgdmFsdWVzIGZyb20gdGhlIGRldGFpbEZvcm0sIHRoaXMgbWV0aG9kIGNyZWF0ZXMgYSBuZXcgYXJyYXlcbiAgICAgKiB3aGljaCBjYW4gYmUgcGVyc2lzdGVkIHRvIHRoZSBBUEkgdmlhIGEgY3JlYXRlRmFjZXRWYWx1ZXMgbXV0YXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRDcmVhdGVkRmFjZXRWYWx1ZXMoXG4gICAgICAgIGZhY2V0OiBGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnQsXG4gICAgICAgIHZhbHVlc0Zvcm1BcnJheTogRm9ybUFycmF5LFxuICAgICAgICBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSxcbiAgICApOiBDcmVhdGVGYWNldFZhbHVlSW5wdXRbXSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNGb3JtQXJyYXkuY29udHJvbHNcbiAgICAgICAgICAgIC5maWx0ZXIoYyA9PiAhYy52YWx1ZS5pZClcbiAgICAgICAgICAgIC5tYXAoYyA9PiBjLnZhbHVlKVxuICAgICAgICAgICAgLm1hcCh2YWx1ZSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZVVwZGF0ZWRUcmFuc2xhdGFibGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGFibGU6IHsgLi4udmFsdWUsIHRyYW5zbGF0aW9uczogW10gYXMgYW55IH0sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRGaWVsZHM6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZENvbmZpZzogdGhpcy5jdXN0b21WYWx1ZUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHJhbnNsYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLm1hcChpbnB1dCA9PiAoe1xuICAgICAgICAgICAgICAgIGZhY2V0SWQ6IGZhY2V0LmlkLFxuICAgICAgICAgICAgICAgIC4uLmlucHV0LFxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGFycmF5IG9mIGZhY2V0IHZhbHVlcyBhbmQgdGhlIHZhbHVlcyBmcm9tIHRoZSBkZXRhaWxGb3JtLCB0aGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IGFycmF5XG4gICAgICogd2hpY2ggY2FuIGJlIHBlcnNpc3RlZCB0byB0aGUgQVBJIHZpYSBhbiB1cGRhdGVGYWNldFZhbHVlcyBtdXRhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFVwZGF0ZWRGYWNldFZhbHVlcyhcbiAgICAgICAgZmFjZXQ6IEZhY2V0V2l0aFZhbHVlcy5GcmFnbWVudCxcbiAgICAgICAgdmFsdWVzRm9ybUFycmF5OiBGb3JtQXJyYXksXG4gICAgICAgIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlLFxuICAgICk6IFVwZGF0ZUZhY2V0VmFsdWVJbnB1dFtdIHtcbiAgICAgICAgY29uc3QgZGlydHlWYWx1ZXMgPSBmYWNldC52YWx1ZXMuZmlsdGVyKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3JtUm93ID0gdmFsdWVzRm9ybUFycmF5LmdldChpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1Sb3cgJiYgZm9ybVJvdy5kaXJ0eSAmJiBmb3JtUm93LnZhbHVlLmlkO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGlydHlWYWx1ZVZhbHVlcyA9IHZhbHVlc0Zvcm1BcnJheS5jb250cm9sc1xuICAgICAgICAgICAgLmZpbHRlcihjID0+IGMuZGlydHkgJiYgYy52YWx1ZS5pZClcbiAgICAgICAgICAgIC5tYXAoYyA9PiBjLnZhbHVlKTtcblxuICAgICAgICBpZiAoZGlydHlWYWx1ZXMubGVuZ3RoICE9PSBkaXJ0eVZhbHVlVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKF8oYGVycm9yLmZhY2V0LXZhbHVlLWZvcm0tdmFsdWVzLWRvLW5vdC1tYXRjaGApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlydHlWYWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVVwZGF0ZWRUcmFuc2xhdGFibGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGFibGU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRmllbGRzOiBkaXJ0eVZhbHVlVmFsdWVzW2ldLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZENvbmZpZzogdGhpcy5jdXN0b21WYWx1ZUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHJhbnNsYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG59XG4iXX0=
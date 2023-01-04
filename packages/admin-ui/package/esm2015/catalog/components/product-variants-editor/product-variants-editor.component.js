import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataService, DeletionResult, getDefaultUiLanguage, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { pick } from '@vendure/common/lib/pick';
import { generateAllCombinations, notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { unique } from '@vendure/common/lib/unique';
import { EMPTY, forkJoin, of } from 'rxjs';
import { defaultIfEmpty, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
import { ConfirmVariantDeletionDialogComponent } from '../confirm-variant-deletion-dialog/confirm-variant-deletion-dialog.component';
export class GeneratedVariant {
    constructor(config) {
        for (const key of Object.keys(config)) {
            this[key] = config[key];
        }
    }
}
export class ProductVariantsEditorComponent {
    constructor(route, dataService, productDetailService, notificationService, modalService) {
        this.route = route;
        this.dataService = dataService;
        this.productDetailService = productDetailService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.formValueChanged = false;
        this.optionsChanged = false;
        this.generatedVariants = [];
    }
    ngOnInit() {
        this.initOptionsAndVariants();
        this.languageCode =
            this.route.snapshot.paramMap.get('lang') || getDefaultUiLanguage();
        this.dataService.settings.getActiveChannel().single$.subscribe(data => {
            this.currencyCode = data.activeChannel.currencyCode;
        });
    }
    onFormChanged(variantInfo) {
        this.formValueChanged = true;
        variantInfo.enabled = true;
    }
    canDeactivate() {
        return !this.formValueChanged;
    }
    getVariantsToAdd() {
        return this.generatedVariants.filter(v => !v.existing && v.enabled);
    }
    getVariantName(variant) {
        return variant.options.length === 0
            ? _('catalog.default-variant')
            : variant.options.map(o => o.name).join(' ');
    }
    addOptionGroup() {
        this.optionGroups.push({
            isNew: true,
            locked: false,
            name: '',
            values: [],
        });
        this.optionsChanged = true;
    }
    removeOptionGroup(optionGroup) {
        const id = optionGroup.id;
        if (optionGroup.isNew) {
            this.optionGroups = this.optionGroups.filter(og => og !== optionGroup);
            this.generateVariants();
            this.optionsChanged = true;
        }
        else if (id) {
            this.modalService
                .dialog({
                title: _('catalog.confirm-delete-product-option-group'),
                translationVars: { name: optionGroup.name },
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
                .pipe(switchMap(val => {
                if (val) {
                    return this.dataService.product.removeOptionGroupFromProduct({
                        optionGroupId: id,
                        productId: this.product.id,
                    });
                }
                else {
                    return EMPTY;
                }
            }))
                .subscribe(({ removeOptionGroupFromProduct }) => {
                var _a;
                if (removeOptionGroupFromProduct.__typename === 'Product') {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'ProductOptionGroup',
                    });
                    this.initOptionsAndVariants();
                    this.optionsChanged = true;
                }
                else if (removeOptionGroupFromProduct.__typename === 'ProductOptionInUseError') {
                    this.notificationService.error((_a = removeOptionGroupFromProduct.message) !== null && _a !== void 0 ? _a : '');
                }
            });
        }
    }
    addOption(index, optionName) {
        const group = this.optionGroups[index];
        if (group) {
            group.values.push({ name: optionName, locked: false });
            this.generateVariants();
            this.optionsChanged = true;
        }
    }
    removeOption(index, { id, name }) {
        const optionGroup = this.optionGroups[index];
        if (optionGroup) {
            if (!id) {
                optionGroup.values = optionGroup.values.filter(v => v.name !== name);
                this.generateVariants();
            }
            else {
                this.modalService
                    .dialog({
                    title: _('catalog.confirm-delete-product-option'),
                    translationVars: { name },
                    buttons: [
                        { type: 'secondary', label: _('common.cancel') },
                        { type: 'danger', label: _('common.delete'), returnValue: true },
                    ],
                })
                    .pipe(switchMap(val => {
                    if (val) {
                        return this.dataService.product.deleteProductOption(id);
                    }
                    else {
                        return EMPTY;
                    }
                }))
                    .subscribe(({ deleteProductOption }) => {
                    var _a;
                    if (deleteProductOption.result === DeletionResult.DELETED) {
                        this.notificationService.success(_('common.notify-delete-success'), {
                            entity: 'ProductOption',
                        });
                        optionGroup.values = optionGroup.values.filter(v => v.id !== id);
                        this.generateVariants();
                        this.optionsChanged = true;
                    }
                    else {
                        this.notificationService.error((_a = deleteProductOption.message) !== null && _a !== void 0 ? _a : '');
                    }
                });
            }
        }
    }
    generateVariants() {
        const groups = this.optionGroups.map(g => g.values);
        const previousVariants = this.generatedVariants;
        const generatedVariantFactory = (isDefault, options, existingVariant, prototypeVariant) => {
            var _a, _b, _c, _d, _e, _f;
            const prototype = this.getVariantPrototype(options, previousVariants);
            return new GeneratedVariant({
                enabled: true,
                existing: !!existingVariant,
                productVariantId: existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.id,
                isDefault,
                options,
                price: (_b = (_a = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.price) !== null && _a !== void 0 ? _a : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.price) !== null && _b !== void 0 ? _b : prototype.price,
                sku: (_d = (_c = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.sku) !== null && _c !== void 0 ? _c : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.sku) !== null && _d !== void 0 ? _d : prototype.sku,
                stock: (_f = (_e = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.stockOnHand) !== null && _e !== void 0 ? _e : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.stockOnHand) !== null && _f !== void 0 ? _f : prototype.stock,
            });
        };
        this.generatedVariants = groups.length
            ? generateAllCombinations(groups).map(options => {
                const existingVariant = this.product.variants.find(v => this.optionsAreEqual(v.options, options));
                const prototypeVariant = this.product.variants.find(v => this.optionsAreSubset(v.options, options));
                return generatedVariantFactory(false, options, existingVariant, prototypeVariant);
            })
            : [generatedVariantFactory(true, [], this.product.variants[0])];
    }
    /**
     * Returns one of the existing variants to base the newly-generated variant's
     * details off.
     */
    getVariantPrototype(options, previousVariants) {
        const variantsWithSimilarOptions = previousVariants.filter(v => options.map(o => o.name).filter(name => v.options.map(o => o.name).includes(name)));
        if (variantsWithSimilarOptions.length) {
            return pick(previousVariants[0], ['sku', 'price', 'stock']);
        }
        return {
            sku: '',
            price: 0,
            stock: 0,
        };
    }
    deleteVariant(id, options) {
        this.modalService
            .dialog({
            title: _('catalog.confirm-delete-product-variant'),
            translationVars: { name: options.map(o => o.name).join(' ') },
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.productDetailService.deleteProductVariant(id, this.product.id) : EMPTY), switchMap(() => this.reFetchProduct(null)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'ProductVariant',
            });
            this.initOptionsAndVariants();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'ProductVariant',
            });
        });
    }
    save() {
        this.optionGroups = this.optionGroups.filter(g => g.values.length);
        const newOptionGroups = this.optionGroups
            .filter(og => og.isNew)
            .map(og => ({
            name: og.name,
            values: [],
        }));
        this.checkUniqueSkus()
            .pipe(mergeMap(() => this.confirmDeletionOfObsoleteVariants()), mergeMap(() => this.productDetailService.createProductOptionGroups(newOptionGroups, this.languageCode)), mergeMap(createdOptionGroups => this.addOptionGroupsToProduct(createdOptionGroups)), mergeMap(createdOptionGroups => this.addNewOptionsToGroups(createdOptionGroups)), mergeMap(groupsIds => this.fetchOptionGroups(groupsIds)), mergeMap(groups => this.createNewProductVariants(groups)), mergeMap(res => this.deleteObsoleteVariants(res.createProductVariants)), mergeMap(variants => this.reFetchProduct(variants)))
            .subscribe({
            next: variants => {
                this.formValueChanged = false;
                this.notificationService.success(_('catalog.created-new-variants-success'), {
                    count: variants.length,
                });
                this.initOptionsAndVariants();
                this.optionsChanged = false;
            },
        });
    }
    checkUniqueSkus() {
        const withDuplicateSkus = this.generatedVariants.filter((variant, index) => {
            return (variant.enabled &&
                this.generatedVariants.find(gv => gv.sku.trim() === variant.sku.trim() && gv !== variant));
        });
        if (withDuplicateSkus.length) {
            return this.modalService
                .dialog({
                title: _('catalog.duplicate-sku-warning'),
                body: unique(withDuplicateSkus.map(v => `${v.sku}`)).join(', '),
                buttons: [{ label: _('common.close'), returnValue: false, type: 'primary' }],
            })
                .pipe(mergeMap(res => EMPTY));
        }
        else {
            return of(true);
        }
    }
    confirmDeletionOfObsoleteVariants() {
        const obsoleteVariants = this.getObsoleteVariants();
        if (obsoleteVariants.length) {
            return this.modalService
                .fromComponent(ConfirmVariantDeletionDialogComponent, {
                locals: {
                    variants: obsoleteVariants,
                },
            })
                .pipe(mergeMap(res => {
                return res === true ? of(true) : EMPTY;
            }));
        }
        else {
            return of(true);
        }
    }
    getObsoleteVariants() {
        return this.product.variants.filter(variant => !this.generatedVariants.find(gv => gv.productVariantId === variant.id));
    }
    hasOnlyDefaultVariant(product) {
        return product.variants.length === 1 && product.optionGroups.length === 0;
    }
    addOptionGroupsToProduct(createdOptionGroups) {
        if (createdOptionGroups.length) {
            return forkJoin(createdOptionGroups.map(optionGroup => {
                return this.dataService.product.addOptionGroupToProduct({
                    productId: this.product.id,
                    optionGroupId: optionGroup.id,
                });
            })).pipe(map(() => createdOptionGroups));
        }
        else {
            return of([]);
        }
    }
    addNewOptionsToGroups(createdOptionGroups) {
        const newOptions = this.optionGroups
            .map(og => {
            const createdGroup = createdOptionGroups.find(cog => cog.name === og.name);
            const productOptionGroupId = createdGroup ? createdGroup.id : og.id;
            if (!productOptionGroupId) {
                throw new Error('Could not get a productOptionGroupId');
            }
            return og.values
                .filter(v => !v.locked)
                .map(v => ({
                productOptionGroupId,
                code: normalizeString(v.name, '-'),
                translations: [{ name: v.name, languageCode: this.languageCode }],
            }));
        })
            .reduce((flat, options) => [...flat, ...options], []);
        const allGroupIds = [
            ...createdOptionGroups.map(g => g.id),
            ...this.optionGroups.map(g => g.id).filter(notNullOrUndefined),
        ];
        if (newOptions.length) {
            return forkJoin(newOptions.map(input => this.dataService.product.addOptionToGroup(input))).pipe(map(() => allGroupIds));
        }
        else {
            return of(allGroupIds);
        }
    }
    fetchOptionGroups(groupsIds) {
        return forkJoin(groupsIds.map(id => this.dataService.product
            .getProductOptionGroup(id)
            .mapSingle(data => data.productOptionGroup)
            .pipe(filter(notNullOrUndefined)))).pipe(defaultIfEmpty([]));
    }
    createNewProductVariants(groups) {
        const options = groups
            .filter(notNullOrUndefined)
            .map(og => og.options)
            .reduce((flat, o) => [...flat, ...o], []);
        const variants = this.generatedVariants
            .filter(v => v.enabled && !v.existing)
            .map(v => {
            const optionIds = groups.map((group, index) => {
                const option = group.options.find(o => o.name === v.options[index].name);
                if (option) {
                    return option.id;
                }
                else {
                    throw new Error(`Could not find a matching option for group ${group.name}`);
                }
            });
            return {
                price: v.price,
                sku: v.sku,
                stock: v.stock,
                optionIds,
            };
        });
        return this.productDetailService.createProductVariants(this.product, variants, options, this.languageCode);
    }
    deleteObsoleteVariants(input) {
        const obsoleteVariants = this.getObsoleteVariants();
        if (obsoleteVariants.length) {
            const deleteOperations = obsoleteVariants.map(v => this.dataService.product.deleteProductVariant(v.id).pipe(map(() => input)));
            return forkJoin(...deleteOperations);
        }
        else {
            return of(input);
        }
    }
    reFetchProduct(input) {
        // Re-fetch the Product to force an update to the view.
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            return this.dataService.product.getProduct(id).single$.pipe(map(() => input));
        }
        else {
            return of(input);
        }
    }
    initOptionsAndVariants() {
        this.dataService.product
            // tslint:disable-next-line:no-non-null-assertion
            .getProductVariantsOptions(this.route.snapshot.paramMap.get('id'))
            // tslint:disable-next-line:no-non-null-assertion
            .mapSingle(({ product }) => product)
            .subscribe(p => {
            this.product = p;
            const allUsedOptionIds = p.variants.map(v => v.options.map(option => option.id)).flat();
            const allUsedOptionGroupIds = p.variants
                .map(v => v.options.map(option => option.groupId))
                .flat();
            this.optionGroups = p.optionGroups.map(og => {
                return {
                    id: og.id,
                    isNew: false,
                    name: og.name,
                    locked: allUsedOptionGroupIds.includes(og.id),
                    values: og.options.map(o => ({
                        id: o.id,
                        name: o.name,
                        locked: allUsedOptionIds.includes(o.id),
                    })),
                };
            });
            this.generateVariants();
        });
    }
    optionsAreEqual(a, b) {
        return this.toOptionString(a) === this.toOptionString(b);
    }
    optionsAreSubset(a, b) {
        return this.toOptionString(b).includes(this.toOptionString(a));
    }
    toOptionString(o) {
        return o
            .map(x => x.name)
            .sort()
            .join('|');
    }
}
ProductVariantsEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-variants-editor',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"(!formValueChanged && !optionsChanged) || getVariantsToAdd().length === 0\"\n        >\n            {{ 'common.add-new-variants' | translate: { count: getVariantsToAdd().length } }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngFor=\"let group of optionGroups; index as i\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input clrInput [(ngModel)]=\"group.name\" name=\"name\" [readonly]=\"!group.isNew\" />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [options]=\"group.values\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n            (add)=\"addOption(i, $event.name)\"\n            (remove)=\"removeOption(i, $event)\"\n        ></vdr-option-value-input>\n    </div>\n    <div>\n        <button\n            [disabled]=\"group.locked\"\n            class=\"btn btn-icon btn-danger-outline mt5\" (click)=\"removeOptionGroup(group)\">\n            <clr-icon shape=\"trash\"></clr-icon>\n        </button>\n    </div>\n</div>\n<button class=\"btn btn-primary-outline btn-sm\" (click)=\"addOptionGroup()\">\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                <th></th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let variant of generatedVariants\" [class.disabled]=\"!variant.enabled || variant.existing\">\n            <td class=\"left\">\n                <clr-checkbox-wrapper *ngIf=\"!variant.existing\">\n                    <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"variant.enabled\"\n                        name=\"enabled\"\n                        clrCheckbox\n                        (ngModelChange)=\"formValueChanged = true\"\n                    />\n                    <label>{{ 'common.create' | translate }}</label>\n                </clr-checkbox-wrapper>\n            </td>\n            <td>\n                {{ getVariantName(variant) | translate }}\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <input\n                            clrInput\n                            type=\"text\"\n                            [(ngModel)]=\"variant.sku\"\n                            [placeholder]=\"'catalog.sku' | translate\"\n                            name=\"sku\"\n                            required\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        />\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.sku }}</span>\n                </div>\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <vdr-currency-input\n                            clrInput\n                            [(ngModel)]=\"variant.price\"\n                            name=\"price\"\n                            [currencyCode]=\"currencyCode\"\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        ></vdr-currency-input>\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.price | localeCurrency: currencyCode }}</span>\n                </div>\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <input\n                            clrInput\n                            type=\"number\"\n                            [(ngModel)]=\"variant.stock\"\n                            name=\"stock\"\n                            min=\"0\"\n                            step=\"1\"\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        />\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.stock }}</span>\n                </div>\n            </td>\n            <td>\n                <vdr-dropdown *ngIf=\"variant.productVariantId as productVariantId\">\n                    <button class=\"icon-button\" vdrDropdownTrigger>\n                        <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"deleteVariant(productVariantId, variant.options)\"\n                            vdrDropdownItem\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'common.delete' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".option-groups{display:flex}.option-groups:first-of-type{margin-top:24px}.values{flex:1;margin:0 6px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}\n"]
            },] }
];
ProductVariantsEditorComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: DataService },
    { type: ProductDetailService },
    { type: NotificationService },
    { type: ModalService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFJSCxXQUFXLEVBRVgsY0FBYyxFQUNkLG9CQUFvQixFQUdwQixZQUFZLEVBQ1osbUJBQW1CLEdBRXRCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDN0YsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFFckksTUFBTSxPQUFPLGdCQUFnQjtJQVV6QixZQUFZLE1BQWlDO1FBQ3pDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztDQUNKO0FBb0JELE1BQU0sT0FBTyw4QkFBOEI7SUFTdkMsWUFDWSxLQUFxQixFQUNyQixXQUF3QixFQUN4QixvQkFBMEMsRUFDMUMsbUJBQXdDLEVBQ3hDLFlBQTBCO1FBSjFCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWJ0QyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsc0JBQWlCLEdBQXVCLEVBQUUsQ0FBQztJQVl4QyxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQWtCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUN6RixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxhQUFhLENBQUMsV0FBNkI7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDbEMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUF5QjtRQUNwQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbkIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBK0I7UUFDN0MsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUMxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjthQUFNLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFlBQVk7aUJBQ1osTUFBTSxDQUFDO2dCQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsNkNBQTZDLENBQUM7Z0JBQ3ZELGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7aUJBQ25FO2FBQ0osQ0FBQztpQkFDRCxJQUFJLENBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLElBQUksR0FBRyxFQUFFO29CQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUM7d0JBQ3pELGFBQWEsRUFBRSxFQUFFO3dCQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3FCQUM3QixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFDLENBQ0w7aUJBQ0EsU0FBUyxDQUFDLENBQUMsRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUU7O2dCQUM1QyxJQUFJLDRCQUE0QixDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7b0JBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7d0JBQ2hFLE1BQU0sRUFBRSxvQkFBb0I7cUJBQy9CLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQzlCO3FCQUFNLElBQUksNEJBQTRCLENBQUMsVUFBVSxLQUFLLHlCQUF5QixFQUFFO29CQUM5RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQUEsNEJBQTRCLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztpQkFDOUU7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhLEVBQUUsVUFBa0I7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBaUM7UUFDbkUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsV0FBVyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZO3FCQUNaLE1BQU0sQ0FBQztvQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDO29CQUNqRCxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUU7b0JBQ3pCLE9BQU8sRUFBRTt3QkFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDaEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtxQkFDbkU7aUJBQ0osQ0FBQztxQkFDRCxJQUFJLENBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNaLElBQUksR0FBRyxFQUFFO3dCQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNEO3lCQUFNO3dCQUNILE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtnQkFDTCxDQUFDLENBQUMsQ0FDTDtxQkFDQSxTQUFTLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRTs7b0JBQ25DLElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxPQUFPLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7NEJBQ2hFLE1BQU0sRUFBRSxlQUFlO3lCQUMxQixDQUFDLENBQUM7d0JBQ0gsV0FBVyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztxQkFDOUI7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxNQUFBLG1CQUFtQixDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUM7cUJBQ3JFO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ1Y7U0FDSjtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxNQUFNLHVCQUF1QixHQUFHLENBQzVCLFNBQWtCLEVBQ2xCLE9BQW9DLEVBQ3BDLGVBQW1ELEVBQ25ELGdCQUFvRCxFQUNwQyxFQUFFOztZQUNsQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdEUsT0FBTyxJQUFJLGdCQUFnQixDQUFDO2dCQUN4QixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxDQUFDLGVBQWU7Z0JBQzNCLGdCQUFnQixFQUFFLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxFQUFFO2dCQUNyQyxTQUFTO2dCQUNULE9BQU87Z0JBQ1AsS0FBSyxFQUFFLE1BQUEsTUFBQSxlQUFlLGFBQWYsZUFBZSx1QkFBZixlQUFlLENBQUUsS0FBSyxtQ0FBSSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxLQUFLLG1DQUFJLFNBQVMsQ0FBQyxLQUFLO2dCQUMzRSxHQUFHLEVBQUUsTUFBQSxNQUFBLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxHQUFHLG1DQUFJLGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLEdBQUcsbUNBQUksU0FBUyxDQUFDLEdBQUc7Z0JBQ25FLEtBQUssRUFBRSxNQUFBLE1BQUEsZUFBZSxhQUFmLGVBQWUsdUJBQWYsZUFBZSxDQUFFLFdBQVcsbUNBQUksZ0JBQWdCLGFBQWhCLGdCQUFnQix1QkFBaEIsZ0JBQWdCLENBQUUsV0FBVyxtQ0FBSSxTQUFTLENBQUMsS0FBSzthQUMxRixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE1BQU07WUFDbEMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FDM0MsQ0FBQztnQkFDRixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FDNUMsQ0FBQztnQkFDRixPQUFPLHVCQUF1QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNLLG1CQUFtQixDQUN2QixPQUFvQyxFQUNwQyxnQkFBb0M7UUFFcEMsTUFBTSwwQkFBMEIsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDckYsQ0FBQztRQUNGLElBQUksMEJBQTBCLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsT0FBTztZQUNILEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLEVBQVUsRUFBRSxPQUFvQztRQUMxRCxJQUFJLENBQUMsWUFBWTthQUNaLE1BQU0sQ0FBQztZQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsd0NBQXdDLENBQUM7WUFDbEQsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdELE9BQU8sRUFBRTtnQkFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDaEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTthQUNuRTtTQUNKLENBQUM7YUFDRCxJQUFJLENBQ0QsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQ2pCLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQ3pGLEVBQ0QsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDN0M7YUFDQSxTQUFTLENBQ04sR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxFQUFFLGdCQUFnQjthQUMzQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLEVBQUUsZ0JBQWdCO2FBQzNCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDUixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7WUFDYixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQyxDQUFDO1FBRVIsSUFBSSxDQUFDLGVBQWUsRUFBRTthQUNqQixJQUFJLENBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLEVBQ3hELFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FDVixJQUFJLENBQUMsb0JBQW9CLENBQUMseUJBQXlCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDMUYsRUFDRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQ25GLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFDaEYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQ3hELFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUN6RCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFDdkUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUN0RDthQUNBLFNBQVMsQ0FBQztZQUNQLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO29CQUN4RSxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU07aUJBQ3pCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTyxlQUFlO1FBQ25CLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN2RSxPQUFPLENBQ0gsT0FBTyxDQUFDLE9BQU87Z0JBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssT0FBTyxDQUFDLENBQzVGLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVk7aUJBQ25CLE1BQU0sQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLCtCQUErQixDQUFDO2dCQUN6QyxJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMvRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDL0UsQ0FBQztpQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRU8saUNBQWlDO1FBQ3JDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDcEQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWTtpQkFDbkIsYUFBYSxDQUFDLHFDQUFxQyxFQUFFO2dCQUNsRCxNQUFNLEVBQUU7b0JBQ0osUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7YUFDSixDQUFDO2lCQUNELElBQUksQ0FDRCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1NBQ1Q7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDL0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUNwRixDQUFDO0lBQ04sQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQXlDO1FBQ25FLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sd0JBQXdCLENBQzVCLG1CQUF3RTtRQUV4RSxJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtZQUM1QixPQUFPLFFBQVEsQ0FDWCxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7b0JBQ3BELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzFCLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBRTtpQkFDaEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQ0wsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRU8scUJBQXFCLENBQ3pCLG1CQUF3RTtRQUV4RSxNQUFNLFVBQVUsR0FBK0IsSUFBSSxDQUFDLFlBQVk7YUFDM0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ04sTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0UsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDcEUsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7YUFDM0Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyxNQUFNO2lCQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDUCxvQkFBb0I7Z0JBQ3BCLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7Z0JBQ2xDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxRCxNQUFNLFdBQVcsR0FBRztZQUNoQixHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7U0FDakUsQ0FBQztRQUVGLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDM0YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUN6QixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFNBQW1CO1FBQ3pDLE9BQU8sUUFBUSxDQUNYLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDZixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87YUFDbkIscUJBQXFCLENBQUMsRUFBRSxDQUFDO2FBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FDeEMsQ0FDSixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBNkMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLHdCQUF3QixDQUFDLE1BQStDO1FBQzVFLE1BQU0sT0FBTyxHQUFHLE1BQU07YUFDakIsTUFBTSxDQUFDLGtCQUFrQixDQUFDO2FBQzFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUI7YUFDbEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDckMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ0wsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksTUFBTSxFQUFFO29CQUNSLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQy9FO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPO2dCQUNILEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO2dCQUNkLFNBQVM7YUFDWixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FDbEQsSUFBSSxDQUFDLE9BQU8sRUFDWixRQUFRLEVBQ1IsT0FBTyxFQUNQLElBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7SUFDTixDQUFDO0lBRU8sc0JBQXNCLENBQUksS0FBUTtRQUN0QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3BELElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzdFLENBQUM7WUFDRixPQUFPLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBSSxLQUFRO1FBQzlCLHVEQUF1RDtRQUN2RCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksRUFBRSxFQUFFO1lBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsc0JBQXNCO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztZQUNwQixpREFBaUQ7YUFDaEQseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztZQUNuRSxpREFBaUQ7YUFDaEQsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBUSxDQUFDO2FBQ3BDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hGLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDLFFBQVE7aUJBQ25DLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRCxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU87b0JBQ0gsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO29CQUNULEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtvQkFDYixNQUFNLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzdDLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3pCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTt3QkFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7d0JBQ1osTUFBTSxFQUFFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUMxQyxDQUFDLENBQUM7aUJBQ04sQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8sZUFBZSxDQUFDLENBQTBCLEVBQUUsQ0FBMEI7UUFDMUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVPLGdCQUFnQixDQUFDLENBQTBCLEVBQUUsQ0FBMEI7UUFDM0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLGNBQWMsQ0FBQyxDQUEwQjtRQUM3QyxPQUFPLENBQUM7YUFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2hCLElBQUksRUFBRTthQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDOzs7WUEvZEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLDJyTEFBdUQ7Z0JBRXZELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPOzthQUNuRDs7O1lBNURRLGNBQWM7WUFNbkIsV0FBVztZQWlCTixvQkFBb0I7WUFWekIsbUJBQW1CO1lBRG5CLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwLFxuICAgIENyZWF0ZVByb2R1Y3RPcHRpb25JbnB1dCxcbiAgICBDdXJyZW5jeUNvZGUsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgRGVhY3RpdmF0ZUF3YXJlLFxuICAgIERlbGV0aW9uUmVzdWx0LFxuICAgIGdldERlZmF1bHRVaUxhbmd1YWdlLFxuICAgIEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucyxcbiAgICBMYW5ndWFnZUNvZGUsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUHJvZHVjdE9wdGlvbkdyb3VwV2l0aE9wdGlvbnNGcmFnbWVudCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBub3JtYWxpemVTdHJpbmcgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL25vcm1hbGl6ZS1zdHJpbmcnO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvcGljayc7XG5pbXBvcnQgeyBnZW5lcmF0ZUFsbENvbWJpbmF0aW9ucywgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgdW5pcXVlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi91bmlxdWUnO1xuaW1wb3J0IHsgRU1QVFksIGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVmYXVsdElmRW1wdHksIGZpbHRlciwgbWFwLCBtZXJnZU1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQcm9kdWN0RGV0YWlsU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9wcm9kdWN0LWRldGFpbC9wcm9kdWN0LWRldGFpbC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1WYXJpYW50RGVsZXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9jb25maXJtLXZhcmlhbnQtZGVsZXRpb24tZGlhbG9nL2NvbmZpcm0tdmFyaWFudC1kZWxldGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlZFZhcmlhbnQge1xuICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcbiAgICBvcHRpb25zOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgaWQ/OiBzdHJpbmcgfT47XG4gICAgcHJvZHVjdFZhcmlhbnRJZD86IHN0cmluZztcbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIGV4aXN0aW5nOiBib29sZWFuO1xuICAgIHNrdTogc3RyaW5nO1xuICAgIHByaWNlOiBudW1iZXI7XG4gICAgc3RvY2s6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogUGFydGlhbDxHZW5lcmF0ZWRWYXJpYW50Pikge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjb25maWcpKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBjb25maWdba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaW50ZXJmYWNlIE9wdGlvbkdyb3VwVWlNb2RlbCB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgaXNOZXc6IGJvb2xlYW47XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxvY2tlZDogYm9vbGVhbjtcbiAgICB2YWx1ZXM6IEFycmF5PHtcbiAgICAgICAgaWQ/OiBzdHJpbmc7XG4gICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgbG9ja2VkOiBib29sZWFuO1xuICAgIH0+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9kdWN0LXZhcmlhbnRzLWVkaXRvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXZhcmlhbnRzLWVkaXRvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZhcmlhbnRzRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEZWFjdGl2YXRlQXdhcmUge1xuICAgIGZvcm1WYWx1ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICBvcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGdlbmVyYXRlZFZhcmlhbnRzOiBHZW5lcmF0ZWRWYXJpYW50W10gPSBbXTtcbiAgICBvcHRpb25Hcm91cHM6IE9wdGlvbkdyb3VwVWlNb2RlbFtdO1xuICAgIHByb2R1Y3Q6IEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucy5Qcm9kdWN0O1xuICAgIGN1cnJlbmN5Q29kZTogQ3VycmVuY3lDb2RlO1xuICAgIHByaXZhdGUgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHByb2R1Y3REZXRhaWxTZXJ2aWNlOiBQcm9kdWN0RGV0YWlsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRPcHRpb25zQW5kVmFyaWFudHMoKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPVxuICAgICAgICAgICAgKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdsYW5nJykgYXMgTGFuZ3VhZ2VDb2RlKSB8fCBnZXREZWZhdWx0VWlMYW5ndWFnZSgpO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldEFjdGl2ZUNoYW5uZWwoKS5zaW5nbGUkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lDb2RlID0gZGF0YS5hY3RpdmVDaGFubmVsLmN1cnJlbmN5Q29kZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Gb3JtQ2hhbmdlZCh2YXJpYW50SW5mbzogR2VuZXJhdGVkVmFyaWFudCkge1xuICAgICAgICB0aGlzLmZvcm1WYWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB2YXJpYW50SW5mby5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjYW5EZWFjdGl2YXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZm9ybVZhbHVlQ2hhbmdlZDtcbiAgICB9XG5cbiAgICBnZXRWYXJpYW50c1RvQWRkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRWYXJpYW50cy5maWx0ZXIodiA9PiAhdi5leGlzdGluZyAmJiB2LmVuYWJsZWQpO1xuICAgIH1cblxuICAgIGdldFZhcmlhbnROYW1lKHZhcmlhbnQ6IEdlbmVyYXRlZFZhcmlhbnQpIHtcbiAgICAgICAgcmV0dXJuIHZhcmlhbnQub3B0aW9ucy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8gXygnY2F0YWxvZy5kZWZhdWx0LXZhcmlhbnQnKVxuICAgICAgICAgICAgOiB2YXJpYW50Lm9wdGlvbnMubWFwKG8gPT4gby5uYW1lKS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgYWRkT3B0aW9uR3JvdXAoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uR3JvdXBzLnB1c2goe1xuICAgICAgICAgICAgaXNOZXc6IHRydWUsXG4gICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlT3B0aW9uR3JvdXAob3B0aW9uR3JvdXA6IE9wdGlvbkdyb3VwVWlNb2RlbCkge1xuICAgICAgICBjb25zdCBpZCA9IG9wdGlvbkdyb3VwLmlkO1xuICAgICAgICBpZiAob3B0aW9uR3JvdXAuaXNOZXcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uR3JvdXBzID0gdGhpcy5vcHRpb25Hcm91cHMuZmlsdGVyKG9nID0+IG9nICE9PSBvcHRpb25Hcm91cCk7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlVmFyaWFudHMoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1wcm9kdWN0LW9wdGlvbi1ncm91cCcpLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvblZhcnM6IHsgbmFtZTogb3B0aW9uR3JvdXAubmFtZSB9LFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QucmVtb3ZlT3B0aW9uR3JvdXBGcm9tUHJvZHVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkdyb3VwSWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoeyByZW1vdmVPcHRpb25Hcm91cEZyb21Qcm9kdWN0IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZU9wdGlvbkdyb3VwRnJvbVByb2R1Y3QuX190eXBlbmFtZSA9PT0gJ1Byb2R1Y3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQcm9kdWN0T3B0aW9uR3JvdXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zQW5kVmFyaWFudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW92ZU9wdGlvbkdyb3VwRnJvbVByb2R1Y3QuX190eXBlbmFtZSA9PT0gJ1Byb2R1Y3RPcHRpb25JblVzZUVycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHJlbW92ZU9wdGlvbkdyb3VwRnJvbVByb2R1Y3QubWVzc2FnZSA/PyAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZE9wdGlvbihpbmRleDogbnVtYmVyLCBvcHRpb25OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLm9wdGlvbkdyb3Vwc1tpbmRleF07XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAudmFsdWVzLnB1c2goeyBuYW1lOiBvcHRpb25OYW1lLCBsb2NrZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVZhcmlhbnRzKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZU9wdGlvbihpbmRleDogbnVtYmVyLCB7IGlkLCBuYW1lIH06IHsgaWQ/OiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkdyb3VwID0gdGhpcy5vcHRpb25Hcm91cHNbaW5kZXhdO1xuICAgICAgICBpZiAob3B0aW9uR3JvdXApIHtcbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25Hcm91cC52YWx1ZXMgPSBvcHRpb25Hcm91cC52YWx1ZXMuZmlsdGVyKHYgPT4gdi5uYW1lICE9PSBuYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlVmFyaWFudHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1wcm9kdWN0LW9wdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25WYXJzOiB7IG5hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmRlbGV0ZVByb2R1Y3RPcHRpb24oaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh7IGRlbGV0ZVByb2R1Y3RPcHRpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZVByb2R1Y3RPcHRpb24ucmVzdWx0ID09PSBEZWxldGlvblJlc3VsdC5ERUxFVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb2R1Y3RPcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkdyb3VwLnZhbHVlcyA9IG9wdGlvbkdyb3VwLnZhbHVlcy5maWx0ZXIodiA9PiB2LmlkICE9PSBpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVZhcmlhbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihkZWxldGVQcm9kdWN0T3B0aW9uLm1lc3NhZ2UgPz8gJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlVmFyaWFudHMoKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMub3B0aW9uR3JvdXBzLm1hcChnID0+IGcudmFsdWVzKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNWYXJpYW50cyA9IHRoaXMuZ2VuZXJhdGVkVmFyaWFudHM7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlZFZhcmlhbnRGYWN0b3J5ID0gKFxuICAgICAgICAgICAgaXNEZWZhdWx0OiBib29sZWFuLFxuICAgICAgICAgICAgb3B0aW9uczogR2VuZXJhdGVkVmFyaWFudFsnb3B0aW9ucyddLFxuICAgICAgICAgICAgZXhpc3RpbmdWYXJpYW50PzogR2V0UHJvZHVjdFZhcmlhbnRPcHRpb25zLlZhcmlhbnRzLFxuICAgICAgICAgICAgcHJvdG90eXBlVmFyaWFudD86IEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucy5WYXJpYW50cyxcbiAgICAgICAgKTogR2VuZXJhdGVkVmFyaWFudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLmdldFZhcmlhbnRQcm90b3R5cGUob3B0aW9ucywgcHJldmlvdXNWYXJpYW50cyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlZFZhcmlhbnQoe1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZXhpc3Rpbmc6ICEhZXhpc3RpbmdWYXJpYW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50SWQ6IGV4aXN0aW5nVmFyaWFudD8uaWQsXG4gICAgICAgICAgICAgICAgaXNEZWZhdWx0LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgcHJpY2U6IGV4aXN0aW5nVmFyaWFudD8ucHJpY2UgPz8gcHJvdG90eXBlVmFyaWFudD8ucHJpY2UgPz8gcHJvdG90eXBlLnByaWNlLFxuICAgICAgICAgICAgICAgIHNrdTogZXhpc3RpbmdWYXJpYW50Py5za3UgPz8gcHJvdG90eXBlVmFyaWFudD8uc2t1ID8/IHByb3RvdHlwZS5za3UsXG4gICAgICAgICAgICAgICAgc3RvY2s6IGV4aXN0aW5nVmFyaWFudD8uc3RvY2tPbkhhbmQgPz8gcHJvdG90eXBlVmFyaWFudD8uc3RvY2tPbkhhbmQgPz8gcHJvdG90eXBlLnN0b2NrLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkVmFyaWFudHMgPSBncm91cHMubGVuZ3RoXG4gICAgICAgICAgICA/IGdlbmVyYXRlQWxsQ29tYmluYXRpb25zKGdyb3VwcykubWFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdWYXJpYW50ID0gdGhpcy5wcm9kdWN0LnZhcmlhbnRzLmZpbmQodiA9PlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0FyZUVxdWFsKHYub3B0aW9ucywgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdG90eXBlVmFyaWFudCA9IHRoaXMucHJvZHVjdC52YXJpYW50cy5maW5kKHYgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNBcmVTdWJzZXQodi5vcHRpb25zLCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVkVmFyaWFudEZhY3RvcnkoZmFsc2UsIG9wdGlvbnMsIGV4aXN0aW5nVmFyaWFudCwgcHJvdG90eXBlVmFyaWFudCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IFtnZW5lcmF0ZWRWYXJpYW50RmFjdG9yeSh0cnVlLCBbXSwgdGhpcy5wcm9kdWN0LnZhcmlhbnRzWzBdKV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBvbmUgb2YgdGhlIGV4aXN0aW5nIHZhcmlhbnRzIHRvIGJhc2UgdGhlIG5ld2x5LWdlbmVyYXRlZCB2YXJpYW50J3NcbiAgICAgKiBkZXRhaWxzIG9mZi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhcmlhbnRQcm90b3R5cGUoXG4gICAgICAgIG9wdGlvbnM6IEdlbmVyYXRlZFZhcmlhbnRbJ29wdGlvbnMnXSxcbiAgICAgICAgcHJldmlvdXNWYXJpYW50czogR2VuZXJhdGVkVmFyaWFudFtdLFxuICAgICk6IFBpY2s8R2VuZXJhdGVkVmFyaWFudCwgJ3NrdScgfCAncHJpY2UnIHwgJ3N0b2NrJz4ge1xuICAgICAgICBjb25zdCB2YXJpYW50c1dpdGhTaW1pbGFyT3B0aW9ucyA9IHByZXZpb3VzVmFyaWFudHMuZmlsdGVyKHYgPT5cbiAgICAgICAgICAgIG9wdGlvbnMubWFwKG8gPT4gby5uYW1lKS5maWx0ZXIobmFtZSA9PiB2Lm9wdGlvbnMubWFwKG8gPT4gby5uYW1lKS5pbmNsdWRlcyhuYW1lKSksXG4gICAgICAgICk7XG4gICAgICAgIGlmICh2YXJpYW50c1dpdGhTaW1pbGFyT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwaWNrKHByZXZpb3VzVmFyaWFudHNbMF0sIFsnc2t1JywgJ3ByaWNlJywgJ3N0b2NrJ10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBza3U6ICcnLFxuICAgICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgICBzdG9jazogMCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWxldGVWYXJpYW50KGlkOiBzdHJpbmcsIG9wdGlvbnM6IEdlbmVyYXRlZFZhcmlhbnRbJ29wdGlvbnMnXSkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtcHJvZHVjdC12YXJpYW50JyksXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25WYXJzOiB7IG5hbWU6IG9wdGlvbnMubWFwKG8gPT4gby5uYW1lKS5qb2luKCcgJykgfSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA/IHRoaXMucHJvZHVjdERldGFpbFNlcnZpY2UuZGVsZXRlUHJvZHVjdFZhcmlhbnQoaWQsIHRoaXMucHJvZHVjdC5pZCkgOiBFTVBUWSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnJlRmV0Y2hQcm9kdWN0KG51bGwpKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb2R1Y3RWYXJpYW50JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdE9wdGlvbnNBbmRWYXJpYW50cygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb2R1Y3RWYXJpYW50JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25Hcm91cHMgPSB0aGlzLm9wdGlvbkdyb3Vwcy5maWx0ZXIoZyA9PiBnLnZhbHVlcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBuZXdPcHRpb25Hcm91cHMgPSB0aGlzLm9wdGlvbkdyb3Vwc1xuICAgICAgICAgICAgLmZpbHRlcihvZyA9PiBvZy5pc05ldylcbiAgICAgICAgICAgIC5tYXAob2cgPT4gKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBvZy5uYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW10sXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5jaGVja1VuaXF1ZVNrdXMoKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5jb25maXJtRGVsZXRpb25PZk9ic29sZXRlVmFyaWFudHMoKSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlsU2VydmljZS5jcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXBzKG5ld09wdGlvbkdyb3VwcywgdGhpcy5sYW5ndWFnZUNvZGUpLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoY3JlYXRlZE9wdGlvbkdyb3VwcyA9PiB0aGlzLmFkZE9wdGlvbkdyb3Vwc1RvUHJvZHVjdChjcmVhdGVkT3B0aW9uR3JvdXBzKSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoY3JlYXRlZE9wdGlvbkdyb3VwcyA9PiB0aGlzLmFkZE5ld09wdGlvbnNUb0dyb3VwcyhjcmVhdGVkT3B0aW9uR3JvdXBzKSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoZ3JvdXBzSWRzID0+IHRoaXMuZmV0Y2hPcHRpb25Hcm91cHMoZ3JvdXBzSWRzKSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoZ3JvdXBzID0+IHRoaXMuY3JlYXRlTmV3UHJvZHVjdFZhcmlhbnRzKGdyb3VwcykpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKHJlcyA9PiB0aGlzLmRlbGV0ZU9ic29sZXRlVmFyaWFudHMocmVzLmNyZWF0ZVByb2R1Y3RWYXJpYW50cykpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKHZhcmlhbnRzID0+IHRoaXMucmVGZXRjaFByb2R1Y3QodmFyaWFudHMpKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IHZhcmlhbnRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtVmFsdWVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NhdGFsb2cuY3JlYXRlZC1uZXctdmFyaWFudHMtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdmFyaWFudHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9uc0FuZFZhcmlhbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja1VuaXF1ZVNrdXMoKSB7XG4gICAgICAgIGNvbnN0IHdpdGhEdXBsaWNhdGVTa3VzID0gdGhpcy5nZW5lcmF0ZWRWYXJpYW50cy5maWx0ZXIoKHZhcmlhbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHZhcmlhbnQuZW5hYmxlZCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVkVmFyaWFudHMuZmluZChndiA9PiBndi5za3UudHJpbSgpID09PSB2YXJpYW50LnNrdS50cmltKCkgJiYgZ3YgIT09IHZhcmlhbnQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHdpdGhEdXBsaWNhdGVTa3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjYXRhbG9nLmR1cGxpY2F0ZS1za3Utd2FybmluZycpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB1bmlxdWUod2l0aER1cGxpY2F0ZVNrdXMubWFwKHYgPT4gYCR7di5za3V9YCkpLmpvaW4oJywgJyksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7IGxhYmVsOiBfKCdjb21tb24uY2xvc2UnKSwgcmV0dXJuVmFsdWU6IGZhbHNlLCB0eXBlOiAncHJpbWFyeScgfV0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucGlwZShtZXJnZU1hcChyZXMgPT4gRU1QVFkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlybURlbGV0aW9uT2ZPYnNvbGV0ZVZhcmlhbnRzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYnNvbGV0ZVZhcmlhbnRzID0gdGhpcy5nZXRPYnNvbGV0ZVZhcmlhbnRzKCk7XG4gICAgICAgIGlmIChvYnNvbGV0ZVZhcmlhbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQ29uZmlybVZhcmlhbnREZWxldGlvbkRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnRzOiBvYnNvbGV0ZVZhcmlhbnRzLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzID09PSB0cnVlID8gb2YodHJ1ZSkgOiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T2Jzb2xldGVWYXJpYW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdC52YXJpYW50cy5maWx0ZXIoXG4gICAgICAgICAgICB2YXJpYW50ID0+ICF0aGlzLmdlbmVyYXRlZFZhcmlhbnRzLmZpbmQoZ3YgPT4gZ3YucHJvZHVjdFZhcmlhbnRJZCA9PT0gdmFyaWFudC5pZCksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNPbmx5RGVmYXVsdFZhcmlhbnQocHJvZHVjdDogR2V0UHJvZHVjdFZhcmlhbnRPcHRpb25zLlByb2R1Y3QpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb2R1Y3QudmFyaWFudHMubGVuZ3RoID09PSAxICYmIHByb2R1Y3Qub3B0aW9uR3JvdXBzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE9wdGlvbkdyb3Vwc1RvUHJvZHVjdChcbiAgICAgICAgY3JlYXRlZE9wdGlvbkdyb3VwczogQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwLkNyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cFtdLFxuICAgICk6IE9ic2VydmFibGU8Q3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwLkNyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cFtdPiB7XG4gICAgICAgIGlmIChjcmVhdGVkT3B0aW9uR3JvdXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRPcHRpb25Hcm91cHMubWFwKG9wdGlvbkdyb3VwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5hZGRPcHRpb25Hcm91cFRvUHJvZHVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkdyb3VwSWQ6IG9wdGlvbkdyb3VwLmlkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICkucGlwZShtYXAoKCkgPT4gY3JlYXRlZE9wdGlvbkdyb3VwcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTmV3T3B0aW9uc1RvR3JvdXBzKFxuICAgICAgICBjcmVhdGVkT3B0aW9uR3JvdXBzOiBDcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXAuQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwW10sXG4gICAgKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBuZXdPcHRpb25zOiBDcmVhdGVQcm9kdWN0T3B0aW9uSW5wdXRbXSA9IHRoaXMub3B0aW9uR3JvdXBzXG4gICAgICAgICAgICAubWFwKG9nID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVkR3JvdXAgPSBjcmVhdGVkT3B0aW9uR3JvdXBzLmZpbmQoY29nID0+IGNvZy5uYW1lID09PSBvZy5uYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0T3B0aW9uR3JvdXBJZCA9IGNyZWF0ZWRHcm91cCA/IGNyZWF0ZWRHcm91cC5pZCA6IG9nLmlkO1xuICAgICAgICAgICAgICAgIGlmICghcHJvZHVjdE9wdGlvbkdyb3VwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZ2V0IGEgcHJvZHVjdE9wdGlvbkdyb3VwSWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9nLnZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHYgPT4gIXYubG9ja2VkKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RPcHRpb25Hcm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogbm9ybWFsaXplU3RyaW5nKHYubmFtZSwgJy0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uczogW3sgbmFtZTogdi5uYW1lLCBsYW5ndWFnZUNvZGU6IHRoaXMubGFuZ3VhZ2VDb2RlIH1dLFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlZHVjZSgoZmxhdCwgb3B0aW9ucykgPT4gWy4uLmZsYXQsIC4uLm9wdGlvbnNdLCBbXSk7XG5cbiAgICAgICAgY29uc3QgYWxsR3JvdXBJZHMgPSBbXG4gICAgICAgICAgICAuLi5jcmVhdGVkT3B0aW9uR3JvdXBzLm1hcChnID0+IGcuaWQpLFxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25Hcm91cHMubWFwKGcgPT4gZy5pZCkuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCksXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKG5ld09wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ya0pvaW4obmV3T3B0aW9ucy5tYXAoaW5wdXQgPT4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmFkZE9wdGlvblRvR3JvdXAoaW5wdXQpKSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKCkgPT4gYWxsR3JvdXBJZHMpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihhbGxHcm91cElkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoT3B0aW9uR3JvdXBzKGdyb3Vwc0lkczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPFByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zRnJhZ21lbnRbXT4ge1xuICAgICAgICByZXR1cm4gZm9ya0pvaW4oXG4gICAgICAgICAgICBncm91cHNJZHMubWFwKGlkID0+XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5nZXRQcm9kdWN0T3B0aW9uR3JvdXAoaWQpXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLnByb2R1Y3RPcHRpb25Hcm91cClcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCkpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKS5waXBlKGRlZmF1bHRJZkVtcHR5KFtdIGFzIFByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zRnJhZ21lbnRbXSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTmV3UHJvZHVjdFZhcmlhbnRzKGdyb3VwczogUHJvZHVjdE9wdGlvbkdyb3VwV2l0aE9wdGlvbnNGcmFnbWVudFtdKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBncm91cHNcbiAgICAgICAgICAgIC5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKVxuICAgICAgICAgICAgLm1hcChvZyA9PiBvZy5vcHRpb25zKVxuICAgICAgICAgICAgLnJlZHVjZSgoZmxhdCwgbykgPT4gWy4uLmZsYXQsIC4uLm9dLCBbXSk7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRzID0gdGhpcy5nZW5lcmF0ZWRWYXJpYW50c1xuICAgICAgICAgICAgLmZpbHRlcih2ID0+IHYuZW5hYmxlZCAmJiAhdi5leGlzdGluZylcbiAgICAgICAgICAgIC5tYXAodiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gZ3JvdXBzLm1hcCgoZ3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGdyb3VwLm9wdGlvbnMuZmluZChvID0+IG8ubmFtZSA9PT0gdi5vcHRpb25zW2luZGV4XS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBtYXRjaGluZyBvcHRpb24gZm9yIGdyb3VwICR7Z3JvdXAubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiB2LnByaWNlLFxuICAgICAgICAgICAgICAgICAgICBza3U6IHYuc2t1LFxuICAgICAgICAgICAgICAgICAgICBzdG9jazogdi5zdG9jayxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uSWRzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERldGFpbFNlcnZpY2UuY3JlYXRlUHJvZHVjdFZhcmlhbnRzKFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0LFxuICAgICAgICAgICAgdmFyaWFudHMsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWxldGVPYnNvbGV0ZVZhcmlhbnRzPFQ+KGlucHV0OiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IG9ic29sZXRlVmFyaWFudHMgPSB0aGlzLmdldE9ic29sZXRlVmFyaWFudHMoKTtcbiAgICAgICAgaWYgKG9ic29sZXRlVmFyaWFudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVPcGVyYXRpb25zID0gb2Jzb2xldGVWYXJpYW50cy5tYXAodiA9PlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5kZWxldGVQcm9kdWN0VmFyaWFudCh2LmlkKS5waXBlKG1hcCgoKSA9PiBpbnB1dCkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbiguLi5kZWxldGVPcGVyYXRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlRmV0Y2hQcm9kdWN0PFQ+KGlucHV0OiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIC8vIFJlLWZldGNoIHRoZSBQcm9kdWN0IHRvIGZvcmNlIGFuIHVwZGF0ZSB0byB0aGUgdmlldy5cbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmdldFByb2R1Y3QoaWQpLnNpbmdsZSQucGlwZShtYXAoKCkgPT4gaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0T3B0aW9uc0FuZFZhcmlhbnRzKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIC5nZXRQcm9kdWN0VmFyaWFudHNPcHRpb25zKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdpZCcpISlcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIC5tYXBTaW5nbGUoKHsgcHJvZHVjdCB9KSA9PiBwcm9kdWN0ISlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gcDtcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxVc2VkT3B0aW9uSWRzID0gcC52YXJpYW50cy5tYXAodiA9PiB2Lm9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24uaWQpKS5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsVXNlZE9wdGlvbkdyb3VwSWRzID0gcC52YXJpYW50c1xuICAgICAgICAgICAgICAgICAgICAubWFwKHYgPT4gdi5vcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLmdyb3VwSWQpKVxuICAgICAgICAgICAgICAgICAgICAuZmxhdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uR3JvdXBzID0gcC5vcHRpb25Hcm91cHMubWFwKG9nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBvZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV3OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9nLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGFsbFVzZWRPcHRpb25Hcm91cElkcy5pbmNsdWRlcyhvZy5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IG9nLm9wdGlvbnMubWFwKG8gPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogby5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBhbGxVc2VkT3B0aW9uSWRzLmluY2x1ZGVzKG8uaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVWYXJpYW50cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQXJlRXF1YWwoYTogQXJyYXk8eyBuYW1lOiBzdHJpbmcgfT4sIGI6IEFycmF5PHsgbmFtZTogc3RyaW5nIH0+KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvT3B0aW9uU3RyaW5nKGEpID09PSB0aGlzLnRvT3B0aW9uU3RyaW5nKGIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0FyZVN1YnNldChhOiBBcnJheTx7IG5hbWU6IHN0cmluZyB9PiwgYjogQXJyYXk8eyBuYW1lOiBzdHJpbmcgfT4pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9PcHRpb25TdHJpbmcoYikuaW5jbHVkZXModGhpcy50b09wdGlvblN0cmluZyhhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b09wdGlvblN0cmluZyhvOiBBcnJheTx7IG5hbWU6IHN0cmluZyB9Pik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvXG4gICAgICAgICAgICAubWFwKHggPT4geC5uYW1lKVxuICAgICAgICAgICAgLnNvcnQoKVxuICAgICAgICAgICAgLmpvaW4oJ3wnKTtcbiAgICB9XG59XG4iXX0=
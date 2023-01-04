import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyCode, DataService, DeactivateAware, GetProductVariantOptions, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
export declare class GeneratedVariant {
    isDefault: boolean;
    options: Array<{
        name: string;
        id?: string;
    }>;
    productVariantId?: string;
    enabled: boolean;
    existing: boolean;
    sku: string;
    price: number;
    stock: number;
    constructor(config: Partial<GeneratedVariant>);
}
interface OptionGroupUiModel {
    id?: string;
    isNew: boolean;
    name: string;
    locked: boolean;
    values: Array<{
        id?: string;
        name: string;
        locked: boolean;
    }>;
}
export declare class ProductVariantsEditorComponent implements OnInit, DeactivateAware {
    private route;
    private dataService;
    private productDetailService;
    private notificationService;
    private modalService;
    formValueChanged: boolean;
    optionsChanged: boolean;
    generatedVariants: GeneratedVariant[];
    optionGroups: OptionGroupUiModel[];
    product: GetProductVariantOptions.Product;
    currencyCode: CurrencyCode;
    private languageCode;
    constructor(route: ActivatedRoute, dataService: DataService, productDetailService: ProductDetailService, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    onFormChanged(variantInfo: GeneratedVariant): void;
    canDeactivate(): boolean;
    getVariantsToAdd(): GeneratedVariant[];
    getVariantName(variant: GeneratedVariant): string;
    addOptionGroup(): void;
    removeOptionGroup(optionGroup: OptionGroupUiModel): void;
    addOption(index: number, optionName: string): void;
    removeOption(index: number, { id, name }: {
        id?: string;
        name: string;
    }): void;
    generateVariants(): void;
    /**
     * Returns one of the existing variants to base the newly-generated variant's
     * details off.
     */
    private getVariantPrototype;
    deleteVariant(id: string, options: GeneratedVariant['options']): void;
    save(): void;
    private checkUniqueSkus;
    private confirmDeletionOfObsoleteVariants;
    private getObsoleteVariants;
    private hasOnlyDefaultVariant;
    private addOptionGroupsToProduct;
    private addNewOptionsToGroups;
    private fetchOptionGroups;
    private createNewProductVariants;
    private deleteObsoleteVariants;
    private reFetchProduct;
    initOptionsAndVariants(): void;
    private optionsAreEqual;
    private optionsAreSubset;
    private toOptionString;
}
export {};

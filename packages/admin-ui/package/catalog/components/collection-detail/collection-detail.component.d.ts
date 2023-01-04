import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, BaseDetailComponent, Collection, ConfigurableOperation, ConfigurableOperationDefinition, ConfigurableOperationInput, CustomFieldConfig, DataService, LanguageCode, LocalStorageService, ModalService, NotificationService, Permission, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { CollectionContentsComponent } from '../collection-contents/collection-contents.component';
export declare class CollectionDetailComponent extends BaseDetailComponent<Collection.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    private modalService;
    private localStorageService;
    customFields: CustomFieldConfig[];
    detailForm: FormGroup;
    assetChanges: {
        assets?: Asset[];
        featuredAsset?: Asset;
    };
    filters: ConfigurableOperation[];
    allFilters: ConfigurableOperationDefinition[];
    updatedFilters$: Observable<ConfigurableOperationInput[]>;
    livePreview: boolean;
    parentId$: Observable<string | undefined>;
    readonly updatePermission: Permission[];
    private filterRemoved$;
    contentsComponent: CollectionContentsComponent;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService, modalService: ModalService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getFilterDefinition(_filter: ConfigurableOperation): ConfigurableOperationDefinition | undefined;
    assetsChanged(): boolean;
    /**
     * If creating a new Collection, automatically generate the slug based on the collection name.
     */
    updateSlug(nameValue: string): void;
    addFilter(collectionFilter: ConfigurableOperation): void;
    removeFilter(index: number): void;
    create(): void;
    save(): void;
    canDeactivate(): boolean;
    toggleLivePreview(): void;
    trackByFn(index: number, item: ConfigurableOperation): string;
    /**
     * Sets the values of the form on changes to the category or current language.
     */
    protected setFormValues(entity: Collection.Fragment, languageCode: LanguageCode): void;
    /**
     * Given a category and the value of the form, this method creates an updated copy of the category which
     * can then be persisted to the API.
     */
    private getUpdatedCollection;
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    private mapOperationsToInputs;
}

import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../data/providers/data.service';
import { ServerConfigService } from '../data/server-config';
import { DeactivateAware } from './deactivate-aware';
import { CustomFieldConfig, CustomFields, LanguageCode } from './generated-types';
import { TranslationOf } from './utilities/find-translation';
/**
 * @description
 * A base class for entity detail views. It should be used in conjunction with the
 * {@link BaseEntityResolver}.
 *
 * @example
 * ```TypeScript
 * \@Component({
 *   selector: 'app-my-entity',
 *   templateUrl: './my-entity.component.html',
 *   styleUrls: ['./my-entity.component.scss'],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class GlobalSettingsComponent extends BaseDetailComponent<MyEntity.Fragment> implements OnInit {
 *   detailForm: FormGroup;
 *
 *   constructor(
 *     router: Router,
 *     route: ActivatedRoute,
 *     serverConfigService: ServerConfigService,
 *     protected dataService: DataService,
 *     private formBuilder: FormBuilder,
 *   ) {
 *     super(route, router, serverConfigService, dataService);
 *     this.detailForm = this.formBuilder.group({
 *       name: [''],
 *     });
 *   }
 *
 *   protected setFormValues(entity: MyEntity.Fragment, languageCode: LanguageCode): void {
 *     this.detailForm.patchValue({
 *       name: entity.name,
 *     });
 *   }
 * }
 * ```
 *
 * @docsCategory list-detail-views
 */
export declare abstract class BaseDetailComponent<Entity extends {
    id: string;
    updatedAt?: string;
}> implements DeactivateAware {
    protected route: ActivatedRoute;
    protected router: Router;
    protected serverConfigService: ServerConfigService;
    protected dataService: DataService;
    entity$: Observable<Entity>;
    availableLanguages$: Observable<LanguageCode[]>;
    languageCode$: Observable<LanguageCode>;
    isNew$: Observable<boolean>;
    id: string;
    abstract detailForm: FormGroup;
    protected destroy$: Subject<void>;
    protected constructor(route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService, dataService: DataService);
    init(): void;
    destroy(): void;
    setLanguage(code: LanguageCode): void;
    canDeactivate(): boolean;
    protected abstract setFormValues(entity: Entity, languageCode: LanguageCode): void;
    protected setCustomFieldFormValues<T = Entity>(customFields: CustomFieldConfig[], formGroup: AbstractControl | null, entity: T, currentTranslation?: TranslationOf<T>): void;
    protected getCustomFieldConfig(key: Exclude<keyof CustomFields, '__typename'>): CustomFieldConfig[];
    protected setQueryParam(key: string, value: any): void;
}

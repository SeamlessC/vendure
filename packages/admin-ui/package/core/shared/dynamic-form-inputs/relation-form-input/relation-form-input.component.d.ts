import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
import { RelationCustomFieldConfig } from '../../../common/generated-types';
/**
 * @description
 * The default input component for `relation` type custom fields. Allows the selection
 * of a ProductVariant, Product, Customer or Asset. For other entity types, a custom
 * implementation will need to be defined. See {@link registerFormInputComponent}.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class RelationFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: RelationCustomFieldConfig;
}

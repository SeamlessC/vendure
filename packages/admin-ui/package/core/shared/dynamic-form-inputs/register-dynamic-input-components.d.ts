import { FactoryProvider, Type } from '@angular/core';
import { FormInputComponent } from '../../common/component-registry-types';
import { CustomFieldControl, CustomFieldEntityName } from '../../providers/custom-field-component/custom-field-component.service';
import { HtmlEditorFormInputComponent } from './code-editor-form-input/html-editor-form-input.component';
import { JsonEditorFormInputComponent } from './code-editor-form-input/json-editor-form-input.component';
import { CombinationModeFormInputComponent } from './combination-mode-form-input/combination-mode-form-input.component';
import { CurrencyFormInputComponent } from './currency-form-input/currency-form-input.component';
import { CustomerGroupFormInputComponent } from './customer-group-form-input/customer-group-form-input.component';
import { FacetValueFormInputComponent } from './facet-value-form-input/facet-value-form-input.component';
import { PasswordFormInputComponent } from './password-form-input/password-form-input.component';
import { ProductMultiSelectorFormInputComponent } from './product-multi-selector-form-input/product-multi-selector-form-input.component';
import { ProductSelectorFormInputComponent } from './product-selector-form-input/product-selector-form-input.component';
import { SelectFormInputComponent } from './select-form-input/select-form-input.component';
export declare const defaultFormInputs: (typeof HtmlEditorFormInputComponent | typeof ProductSelectorFormInputComponent | typeof CustomerGroupFormInputComponent | typeof PasswordFormInputComponent | typeof CurrencyFormInputComponent | typeof SelectFormInputComponent | typeof FacetValueFormInputComponent | typeof JsonEditorFormInputComponent | typeof ProductMultiSelectorFormInputComponent | typeof CombinationModeFormInputComponent)[];
/**
 * @description
 * Registers a custom FormInputComponent which can be used to control the argument inputs
 * of a {@link ConfigurableOperationDef} (e.g. CollectionFilter, ShippingMethod etc) or for
 * a custom field.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerFormInputComponent('my-custom-input', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 *
 * This input component can then be used in a custom field:
 *
 * @example
 * ```TypeScript
 * const config = {
 *   // ...
 *   customFields: {
 *     ProductVariant: [
 *       {
 *         name: 'rrp',
 *         type: 'int',
 *         ui: { component: 'my-custom-input' },
 *       },
 *     ]
 *   }
 * }
 * ```
 *
 * or with an argument of a {@link ConfigurableOperationDef}:
 *
 * @example
 * ```TypeScript
 * args: {
 *   rrp: { type: 'int', ui: { component: 'my-custom-input' } },
 * }
 * ```
 *
 * @docsCategory custom-input-components
 */
export declare function registerFormInputComponent(id: string, component: Type<FormInputComponent>): FactoryProvider;
/**
 * @description
 * **Deprecated** use `registerFormInputComponent()` in combination with the customField `ui` config instead.
 *
 * Registers a custom component to act as the form input control for the given custom field.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerCustomFieldComponent('Product', 'someCustomField', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 *
 * @deprecated use `registerFormInputComponent()` in combination with the customField `ui` config instead.
 *
 * @docsCategory custom-input-components
 */
export declare function registerCustomFieldComponent(entity: CustomFieldEntityName, fieldName: string, component: Type<CustomFieldControl>): FactoryProvider;
/**
 * Registers the default form input components.
 */
export declare function registerDefaultFormInputs(): FactoryProvider[];

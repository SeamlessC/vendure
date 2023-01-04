import { Provider } from '@angular/core';
import { CustomDetailComponentConfig } from './custom-detail-component-types';
/**
 * @description
 * Registers a {@link CustomDetailComponent} to be placed in a given location. This allows you
 * to embed any type of custom Angular component in the entity detail pages of the Admin UI.
 *
 * @docsCategory custom-detail-components
 */
export declare function registerCustomDetailComponent(config: CustomDetailComponentConfig): Provider;
export declare class CustomDetailComponentService {
    private customDetailComponents;
    registerCustomDetailComponent(config: CustomDetailComponentConfig): void;
    getCustomDetailComponentsFor(locationId: string): CustomDetailComponentConfig[];
}

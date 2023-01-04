import { APP_INITIALIZER, Injectable } from '@angular/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Permission } from '../../common/generated-types';
import * as i0 from "@angular/core";
/**
 * @description
 * Add a section to the main nav menu. Providing the `before` argument will
 * move the section before any existing section with the specified id. If
 * omitted (or if the id is not found) the section will be appended to the
 * existing set of sections.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuSection({
 *       id: 'reports',
 *       label: 'Reports',
 *       items: [{
 *           // ...
 *       }],
 *     },
 *     'settings'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @docsCategory nav-menu
 */
export function addNavMenuSection(config, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuSection(config, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Add a menu item to an existing section specified by `sectionId`. The id of the section
 * can be found by inspecting the DOM and finding the `data-section-id` attribute.
 * Providing the `before` argument will move the item before any existing item with the specified id.
 * If omitted (or if the name is not found) the item will be appended to the
 * end of the section.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuItem({
 *       id: 'reviews',
 *       label: 'Product Reviews',
 *       routerLink: ['/extensions/reviews'],
 *       icon: 'star',
 *     },
 *     'marketing'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ``
 *
 * @docsCategory nav-menu
 */
export function addNavMenuItem(config, sectionId, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuItem(config, sectionId, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
 * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
 * `data-location-id` attribute.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addActionBarItem({
 *      id: 'print-invoice'
 *      label: 'Print Invoice',
 *      locationId: 'order-detail',
 *      routerLink: ['/extensions/invoicing'],
 *     }),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @docsCategory action-bar
 */
export function addActionBarItem(config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addActionBarItem(config);
        },
        deps: [NavBuilderService],
    };
}
/**
 * This service is used to define the contents of configurable menus in the application.
 */
export class NavBuilderService {
    constructor() {
        this.sectionBadges = {};
        this.initialNavMenuConfig$ = new BehaviorSubject([]);
        this.addedNavMenuSections = [];
        this.addedNavMenuItems = [];
        this.addedActionBarItems = [];
        this.setupStreams();
    }
    /**
     * Used to define the initial sections and items of the main nav menu.
     */
    defineNavMenuSections(config) {
        this.initialNavMenuConfig$.next(config);
    }
    /**
     * Add a section to the main nav menu. Providing the `before` argument will
     * move the section before any existing section with the specified id. If
     * omitted (or if the id is not found) the section will be appended to the
     * existing set of sections.
     *
     * Providing the `id` of an existing section will replace that section.
     */
    addNavMenuSection(config, before) {
        this.addedNavMenuSections.push({ config, before });
    }
    /**
     * Add a menu item to an existing section specified by `sectionId`. The id of the section
     * can be found by inspecting the DOM and finding the `data-section-id` attribute.
     * Providing the `before` argument will move the item before any existing item with the specified id.
     * If omitted (or if the name is not found) the item will be appended to the
     * end of the section.
     *
     * Providing the `id` of an existing item in that section will replace
     * that item.
     */
    addNavMenuItem(config, sectionId, before) {
        this.addedNavMenuItems.push({ config, sectionId, before });
    }
    /**
     * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
     * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
     * `data-location-id` attribute.
     */
    addActionBarItem(config) {
        this.addedActionBarItems.push(Object.assign({ requiresPermission: Permission.Authenticated }, config));
    }
    getRouterLink(config, route) {
        if (typeof config.routerLink === 'function') {
            return config.routerLink(route);
        }
        if (Array.isArray(config.routerLink)) {
            return config.routerLink;
        }
        return null;
    }
    setupStreams() {
        const sectionAdditions$ = of(this.addedNavMenuSections);
        const itemAdditions$ = of(this.addedNavMenuItems);
        const combinedConfig$ = combineLatest(this.initialNavMenuConfig$, sectionAdditions$).pipe(map(([initialConfig, additions]) => {
            for (const { config, before } of additions) {
                if (!config.requiresPermission) {
                    config.requiresPermission = Permission.Authenticated;
                }
                const existingIndex = initialConfig.findIndex(c => c.id === config.id);
                if (-1 < existingIndex) {
                    initialConfig[existingIndex] = config;
                }
                const beforeIndex = initialConfig.findIndex(c => c.id === before);
                if (-1 < beforeIndex) {
                    if (-1 < existingIndex) {
                        initialConfig.splice(existingIndex, 1);
                    }
                    initialConfig.splice(beforeIndex, 0, config);
                }
                else if (existingIndex === -1) {
                    initialConfig.push(config);
                }
            }
            return initialConfig;
        }), shareReplay(1));
        this.navMenuConfig$ = combineLatest(combinedConfig$, itemAdditions$).pipe(map(([sections, additionalItems]) => {
            for (const item of additionalItems) {
                const section = sections.find(s => s.id === item.sectionId);
                if (!section) {
                    // tslint:disable-next-line:no-console
                    console.error(`Could not add menu item "${item.config.id}", section "${item.sectionId}" does not exist`);
                }
                else {
                    const { config, sectionId, before } = item;
                    const existingIndex = section.items.findIndex(i => i.id === config.id);
                    if (-1 < existingIndex) {
                        section.items[existingIndex] = config;
                    }
                    const beforeIndex = section.items.findIndex(i => i.id === before);
                    if (-1 < beforeIndex) {
                        if (-1 < existingIndex) {
                            section.items.splice(existingIndex, 1);
                        }
                        section.items.splice(beforeIndex, 0, config);
                    }
                    else if (existingIndex === -1) {
                        section.items.push(config);
                    }
                }
            }
            // Aggregate any badges defined for the nav items in each section
            for (const section of sections) {
                const itemBadgeStatuses = section.items
                    .map(i => i.statusBadge)
                    .filter(notNullOrUndefined);
                this.sectionBadges[section.id] = combineLatest(itemBadgeStatuses).pipe(map(badges => {
                    const propagatingBadges = badges.filter(b => b.propagateToSection);
                    if (propagatingBadges.length === 0) {
                        return 'none';
                    }
                    const statuses = propagatingBadges.map(b => b.type);
                    if (statuses.includes('error')) {
                        return 'error';
                    }
                    else if (statuses.includes('warning')) {
                        return 'warning';
                    }
                    else if (statuses.includes('info')) {
                        return 'info';
                    }
                    else {
                        return 'none';
                    }
                }));
            }
            return sections;
        }));
        this.actionBarConfig$ = of(this.addedActionBarItems);
    }
}
NavBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NavBuilderService_Factory() { return new NavBuilderService(); }, token: NavBuilderService, providedIn: "root" });
NavBuilderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NavBuilderService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL25hdi1idWlsZGVyL25hdi1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQVUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBc0IsRUFBRSxNQUFlO0lBQ3JFLE9BQU87UUFDSCxPQUFPLEVBQUUsZUFBZTtRQUN4QixLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxDQUFDLGlCQUFvQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDdkQsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztLQUM1QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFtQixFQUFFLFNBQWlCLEVBQUUsTUFBZTtJQUNsRixPQUFPO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsQ0FBQyxpQkFBb0Ms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QUNMLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7WUFsS0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBJbmplY3RhYmxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG5pbXBvcnQge1xuICAgIEFjdGlvbkJhckl0ZW0sXG4gICAgTmF2TWVudUJhZGdlVHlwZSxcbiAgICBOYXZNZW51SXRlbSxcbiAgICBOYXZNZW51U2VjdGlvbixcbiAgICBSb3V0ZXJMaW5rRGVmaW5pdGlvbixcbn0gZnJvbSAnLi9uYXYtYnVpbGRlci10eXBlcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgYSBzZWN0aW9uIHRvIHRoZSBtYWluIG5hdiBtZW51LiBQcm92aWRpbmcgdGhlIGBiZWZvcmVgIGFyZ3VtZW50IHdpbGxcbiAqIG1vdmUgdGhlIHNlY3Rpb24gYmVmb3JlIGFueSBleGlzdGluZyBzZWN0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBpZC4gSWZcbiAqIG9taXR0ZWQgKG9yIGlmIHRoZSBpZCBpcyBub3QgZm91bmQpIHRoZSBzZWN0aW9uIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gKiBleGlzdGluZyBzZXQgb2Ygc2VjdGlvbnMuXG4gKiBUaGlzIHNob3VsZCBiZSB1c2VkIGluIHRoZSBOZ01vZHVsZSBgcHJvdmlkZXJzYCBhcnJheSBvZiB5b3VyIHVpIGV4dGVuc2lvbiBtb2R1bGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIFxcQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIGFkZE5hdk1lbnVTZWN0aW9uKHtcbiAqICAgICAgIGlkOiAncmVwb3J0cycsXG4gKiAgICAgICBsYWJlbDogJ1JlcG9ydHMnLFxuICogICAgICAgaXRlbXM6IFt7XG4gKiAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICB9XSxcbiAqICAgICB9LFxuICogICAgICdzZXR0aW5ncycpLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeVVpRXh0ZW5zaW9uTW9kdWxlIHt9XG4gKiBgYGBcbiAqIEBkb2NzQ2F0ZWdvcnkgbmF2LW1lbnVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZE5hdk1lbnVTZWN0aW9uKGNvbmZpZzogTmF2TWVudVNlY3Rpb24sIGJlZm9yZT86IHN0cmluZyk6IFByb3ZpZGVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB1c2VGYWN0b3J5OiAobmF2QnVpbGRlclNlcnZpY2U6IE5hdkJ1aWxkZXJTZXJ2aWNlKSA9PiAoKSA9PiB7XG4gICAgICAgICAgICBuYXZCdWlsZGVyU2VydmljZS5hZGROYXZNZW51U2VjdGlvbihjb25maWcsIGJlZm9yZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlcHM6IFtOYXZCdWlsZGVyU2VydmljZV0sXG4gICAgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCBhIG1lbnUgaXRlbSB0byBhbiBleGlzdGluZyBzZWN0aW9uIHNwZWNpZmllZCBieSBgc2VjdGlvbklkYC4gVGhlIGlkIG9mIHRoZSBzZWN0aW9uXG4gKiBjYW4gYmUgZm91bmQgYnkgaW5zcGVjdGluZyB0aGUgRE9NIGFuZCBmaW5kaW5nIHRoZSBgZGF0YS1zZWN0aW9uLWlkYCBhdHRyaWJ1dGUuXG4gKiBQcm92aWRpbmcgdGhlIGBiZWZvcmVgIGFyZ3VtZW50IHdpbGwgbW92ZSB0aGUgaXRlbSBiZWZvcmUgYW55IGV4aXN0aW5nIGl0ZW0gd2l0aCB0aGUgc3BlY2lmaWVkIGlkLlxuICogSWYgb21pdHRlZCAob3IgaWYgdGhlIG5hbWUgaXMgbm90IGZvdW5kKSB0aGUgaXRlbSB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZVxuICogZW5kIG9mIHRoZSBzZWN0aW9uLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW4gdGhlIE5nTW9kdWxlIGBwcm92aWRlcnNgIGFycmF5IG9mIHlvdXIgdWkgZXh0ZW5zaW9uIG1vZHVsZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgVHlwZVNjcmlwdFxuICogXFxATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgYWRkTmF2TWVudUl0ZW0oe1xuICogICAgICAgaWQ6ICdyZXZpZXdzJyxcbiAqICAgICAgIGxhYmVsOiAnUHJvZHVjdCBSZXZpZXdzJyxcbiAqICAgICAgIHJvdXRlckxpbms6IFsnL2V4dGVuc2lvbnMvcmV2aWV3cyddLFxuICogICAgICAgaWNvbjogJ3N0YXInLFxuICogICAgIH0sXG4gKiAgICAgJ21hcmtldGluZycpLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeVVpRXh0ZW5zaW9uTW9kdWxlIHt9XG4gKiBgYFxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgbmF2LW1lbnVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZE5hdk1lbnVJdGVtKGNvbmZpZzogTmF2TWVudUl0ZW0sIHNlY3Rpb25JZDogc3RyaW5nLCBiZWZvcmU/OiBzdHJpbmcpOiBQcm92aWRlciB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgdXNlRmFjdG9yeTogKG5hdkJ1aWxkZXJTZXJ2aWNlOiBOYXZCdWlsZGVyU2VydmljZSkgPT4gKCkgPT4ge1xuICAgICAgICAgICAgbmF2QnVpbGRlclNlcnZpY2UuYWRkTmF2TWVudUl0ZW0oY29uZmlnLCBzZWN0aW9uSWQsIGJlZm9yZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlcHM6IFtOYXZCdWlsZGVyU2VydmljZV0sXG4gICAgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZHMgYSBidXR0b24gdG8gdGhlIEFjdGlvbkJhciBhdCB0aGUgdG9wIHJpZ2h0IG9mIGVhY2ggbGlzdCBvciBkZXRhaWwgdmlldy4gVGhlIGxvY2F0aW9uSWQgY2FuXG4gKiBiZSBkZXRlcm1pbmVkIGJ5IGluc3BlY3RpbmcgdGhlIERPTSBhbmQgZmluZGluZyB0aGUgPHZkci1hY3Rpb24tYmFyPiBlbGVtZW50IGFuZCBpdHNcbiAqIGBkYXRhLWxvY2F0aW9uLWlkYCBhdHRyaWJ1dGUuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgdXNlZCBpbiB0aGUgTmdNb2R1bGUgYHByb3ZpZGVyc2AgYXJyYXkgb2YgeW91ciB1aSBleHRlbnNpb24gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBcXEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBhZGRBY3Rpb25CYXJJdGVtKHtcbiAqICAgICAgaWQ6ICdwcmludC1pbnZvaWNlJ1xuICogICAgICBsYWJlbDogJ1ByaW50IEludm9pY2UnLFxuICogICAgICBsb2NhdGlvbklkOiAnb3JkZXItZGV0YWlsJyxcbiAqICAgICAgcm91dGVyTGluazogWycvZXh0ZW5zaW9ucy9pbnZvaWNpbmcnXSxcbiAqICAgICB9KSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlVaUV4dGVuc2lvbk1vZHVsZSB7fVxuICogYGBgXG4gKiBAZG9jc0NhdGVnb3J5IGFjdGlvbi1iYXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjdGlvbkJhckl0ZW0oY29uZmlnOiBBY3Rpb25CYXJJdGVtKTogUHJvdmlkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIHVzZUZhY3Rvcnk6IChuYXZCdWlsZGVyU2VydmljZTogTmF2QnVpbGRlclNlcnZpY2UpID0+ICgpID0+IHtcbiAgICAgICAgICAgIG5hdkJ1aWxkZXJTZXJ2aWNlLmFkZEFjdGlvbkJhckl0ZW0oY29uZmlnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVwczogW05hdkJ1aWxkZXJTZXJ2aWNlXSxcbiAgICB9O1xufVxuXG4vKipcbiAqIFRoaXMgc2VydmljZSBpcyB1c2VkIHRvIGRlZmluZSB0aGUgY29udGVudHMgb2YgY29uZmlndXJhYmxlIG1lbnVzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2QnVpbGRlclNlcnZpY2Uge1xuICAgIG5hdk1lbnVDb25maWckOiBPYnNlcnZhYmxlPE5hdk1lbnVTZWN0aW9uW10+O1xuICAgIGFjdGlvbkJhckNvbmZpZyQ6IE9ic2VydmFibGU8QWN0aW9uQmFySXRlbVtdPjtcbiAgICBzZWN0aW9uQmFkZ2VzOiB7IFtzZWN0aW9uSWQ6IHN0cmluZ106IE9ic2VydmFibGU8TmF2TWVudUJhZGdlVHlwZT4gfSA9IHt9O1xuXG4gICAgcHJpdmF0ZSBpbml0aWFsTmF2TWVudUNvbmZpZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5hdk1lbnVTZWN0aW9uW10+KFtdKTtcbiAgICBwcml2YXRlIGFkZGVkTmF2TWVudVNlY3Rpb25zOiBBcnJheTx7IGNvbmZpZzogTmF2TWVudVNlY3Rpb247IGJlZm9yZT86IHN0cmluZyB9PiA9IFtdO1xuICAgIHByaXZhdGUgYWRkZWROYXZNZW51SXRlbXM6IEFycmF5PHtcbiAgICAgICAgY29uZmlnOiBOYXZNZW51SXRlbTtcbiAgICAgICAgc2VjdGlvbklkOiBzdHJpbmc7XG4gICAgICAgIGJlZm9yZT86IHN0cmluZztcbiAgICB9PiA9IFtdO1xuICAgIHByaXZhdGUgYWRkZWRBY3Rpb25CYXJJdGVtczogQWN0aW9uQmFySXRlbVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXR1cFN0cmVhbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSB0aGUgaW5pdGlhbCBzZWN0aW9ucyBhbmQgaXRlbXMgb2YgdGhlIG1haW4gbmF2IG1lbnUuXG4gICAgICovXG4gICAgZGVmaW5lTmF2TWVudVNlY3Rpb25zKGNvbmZpZzogTmF2TWVudVNlY3Rpb25bXSkge1xuICAgICAgICB0aGlzLmluaXRpYWxOYXZNZW51Q29uZmlnJC5uZXh0KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc2VjdGlvbiB0byB0aGUgbWFpbiBuYXYgbWVudS4gUHJvdmlkaW5nIHRoZSBgYmVmb3JlYCBhcmd1bWVudCB3aWxsXG4gICAgICogbW92ZSB0aGUgc2VjdGlvbiBiZWZvcmUgYW55IGV4aXN0aW5nIHNlY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGlkLiBJZlxuICAgICAqIG9taXR0ZWQgKG9yIGlmIHRoZSBpZCBpcyBub3QgZm91bmQpIHRoZSBzZWN0aW9uIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZXhpc3Rpbmcgc2V0IG9mIHNlY3Rpb25zLlxuICAgICAqXG4gICAgICogUHJvdmlkaW5nIHRoZSBgaWRgIG9mIGFuIGV4aXN0aW5nIHNlY3Rpb24gd2lsbCByZXBsYWNlIHRoYXQgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBhZGROYXZNZW51U2VjdGlvbihjb25maWc6IE5hdk1lbnVTZWN0aW9uLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRlZE5hdk1lbnVTZWN0aW9ucy5wdXNoKHsgY29uZmlnLCBiZWZvcmUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbWVudSBpdGVtIHRvIGFuIGV4aXN0aW5nIHNlY3Rpb24gc3BlY2lmaWVkIGJ5IGBzZWN0aW9uSWRgLiBUaGUgaWQgb2YgdGhlIHNlY3Rpb25cbiAgICAgKiBjYW4gYmUgZm91bmQgYnkgaW5zcGVjdGluZyB0aGUgRE9NIGFuZCBmaW5kaW5nIHRoZSBgZGF0YS1zZWN0aW9uLWlkYCBhdHRyaWJ1dGUuXG4gICAgICogUHJvdmlkaW5nIHRoZSBgYmVmb3JlYCBhcmd1bWVudCB3aWxsIG1vdmUgdGhlIGl0ZW0gYmVmb3JlIGFueSBleGlzdGluZyBpdGVtIHdpdGggdGhlIHNwZWNpZmllZCBpZC5cbiAgICAgKiBJZiBvbWl0dGVkIChvciBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmQpIHRoZSBpdGVtIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZW5kIG9mIHRoZSBzZWN0aW9uLlxuICAgICAqXG4gICAgICogUHJvdmlkaW5nIHRoZSBgaWRgIG9mIGFuIGV4aXN0aW5nIGl0ZW0gaW4gdGhhdCBzZWN0aW9uIHdpbGwgcmVwbGFjZVxuICAgICAqIHRoYXQgaXRlbS5cbiAgICAgKi9cbiAgICBhZGROYXZNZW51SXRlbShjb25maWc6IE5hdk1lbnVJdGVtLCBzZWN0aW9uSWQ6IHN0cmluZywgYmVmb3JlPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkZWROYXZNZW51SXRlbXMucHVzaCh7IGNvbmZpZywgc2VjdGlvbklkLCBiZWZvcmUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGJ1dHRvbiB0byB0aGUgQWN0aW9uQmFyIGF0IHRoZSB0b3AgcmlnaHQgb2YgZWFjaCBsaXN0IG9yIGRldGFpbCB2aWV3LiBUaGUgbG9jYXRpb25JZCBjYW5cbiAgICAgKiBiZSBkZXRlcm1pbmVkIGJ5IGluc3BlY3RpbmcgdGhlIERPTSBhbmQgZmluZGluZyB0aGUgPHZkci1hY3Rpb24tYmFyPiBlbGVtZW50IGFuZCBpdHNcbiAgICAgKiBgZGF0YS1sb2NhdGlvbi1pZGAgYXR0cmlidXRlLlxuICAgICAqL1xuICAgIGFkZEFjdGlvbkJhckl0ZW0oY29uZmlnOiBBY3Rpb25CYXJJdGVtKSB7XG4gICAgICAgIHRoaXMuYWRkZWRBY3Rpb25CYXJJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogUGVybWlzc2lvbi5BdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRSb3V0ZXJMaW5rKGNvbmZpZzogeyByb3V0ZXJMaW5rPzogUm91dGVyTGlua0RlZmluaXRpb24gfSwgcm91dGU6IEFjdGl2YXRlZFJvdXRlKTogc3RyaW5nW10gfCBudWxsIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucm91dGVyTGluayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5yb3V0ZXJMaW5rKHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcucm91dGVyTGluaykpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcucm91dGVyTGluaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwU3RyZWFtcygpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbkFkZGl0aW9ucyQgPSBvZih0aGlzLmFkZGVkTmF2TWVudVNlY3Rpb25zKTtcbiAgICAgICAgY29uc3QgaXRlbUFkZGl0aW9ucyQgPSBvZih0aGlzLmFkZGVkTmF2TWVudUl0ZW1zKTtcblxuICAgICAgICBjb25zdCBjb21iaW5lZENvbmZpZyQgPSBjb21iaW5lTGF0ZXN0KHRoaXMuaW5pdGlhbE5hdk1lbnVDb25maWckLCBzZWN0aW9uQWRkaXRpb25zJCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2luaXRpYWxDb25maWcsIGFkZGl0aW9uc10pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgY29uZmlnLCBiZWZvcmUgfSBvZiBhZGRpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25maWcucmVxdWlyZXNQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcucmVxdWlyZXNQZXJtaXNzaW9uID0gUGVybWlzc2lvbi5BdXRoZW50aWNhdGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBpbml0aWFsQ29uZmlnLmZpbmRJbmRleChjID0+IGMuaWQgPT09IGNvbmZpZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSA8IGV4aXN0aW5nSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxDb25maWdbZXhpc3RpbmdJbmRleF0gPSBjb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlSW5kZXggPSBpbml0aWFsQ29uZmlnLmZpbmRJbmRleChjID0+IGMuaWQgPT09IGJlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSA8IGJlZm9yZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbENvbmZpZy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQ29uZmlnLnNwbGljZShiZWZvcmVJbmRleCwgMCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGlzdGluZ0luZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbENvbmZpZy5wdXNoKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxDb25maWc7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubmF2TWVudUNvbmZpZyQgPSBjb21iaW5lTGF0ZXN0KGNvbWJpbmVkQ29uZmlnJCwgaXRlbUFkZGl0aW9ucyQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtzZWN0aW9ucywgYWRkaXRpb25hbEl0ZW1zXSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBhZGRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHNlY3Rpb25zLmZpbmQocyA9PiBzLmlkID09PSBpdGVtLnNlY3Rpb25JZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYENvdWxkIG5vdCBhZGQgbWVudSBpdGVtIFwiJHtpdGVtLmNvbmZpZy5pZH1cIiwgc2VjdGlvbiBcIiR7aXRlbS5zZWN0aW9uSWR9XCIgZG9lcyBub3QgZXhpc3RgLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY29uZmlnLCBzZWN0aW9uSWQsIGJlZm9yZSB9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzZWN0aW9uLml0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT09IGNvbmZpZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi5pdGVtc1tleGlzdGluZ0luZGV4XSA9IGNvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZUluZGV4ID0gc2VjdGlvbi5pdGVtcy5maW5kSW5kZXgoaSA9PiBpLmlkID09PSBiZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xIDwgYmVmb3JlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24uaXRlbXMuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLml0ZW1zLnNwbGljZShiZWZvcmVJbmRleCwgMCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhpc3RpbmdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLml0ZW1zLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFnZ3JlZ2F0ZSBhbnkgYmFkZ2VzIGRlZmluZWQgZm9yIHRoZSBuYXYgaXRlbXMgaW4gZWFjaCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHNlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1CYWRnZVN0YXR1c2VzID0gc2VjdGlvbi5pdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpID0+IGkuc3RhdHVzQmFkZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbkJhZGdlc1tzZWN0aW9uLmlkXSA9IGNvbWJpbmVMYXRlc3QoaXRlbUJhZGdlU3RhdHVzZXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoYmFkZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wYWdhdGluZ0JhZGdlcyA9IGJhZGdlcy5maWx0ZXIoYiA9PiBiLnByb3BhZ2F0ZVRvU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BhZ2F0aW5nQmFkZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNlcyA9IHByb3BhZ2F0aW5nQmFkZ2VzLm1hcChiID0+IGIudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c2VzLmluY2x1ZGVzKCdlcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzZXMuaW5jbHVkZXMoJ3dhcm5pbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzZXMuaW5jbHVkZXMoJ2luZm8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2luZm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25CYXJDb25maWckID0gb2YodGhpcy5hZGRlZEFjdGlvbkJhckl0ZW1zKTtcbiAgICB9XG59XG4iXX0=
import { APP_INITIALIZER } from '@angular/core';
import { BulkActionRegistryService } from './bulk-action-registry.service';
/**
 * @description
 * Registers a custom {@link BulkAction} which can be invoked from the bulk action menu
 * of any supported list view.
 *
 * This allows you to provide custom functionality that can operate on any of the selected
 * items in the list view.
 *
 * In this example, imagine we have an integration with a 3rd-party text translation service. This
 * bulk action allows us to select multiple products from the product list view, and send them for
 * translation via a custom service which integrates with the translation service's API.
 *
 * @example
 * ```TypeScript
 * import { NgModule } from '\@angular/core';
 * import { ModalService, registerBulkAction, SharedModule } from '\@vendure/admin-ui/core';
 *
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     ProductDataTranslationService,
 *     registerBulkAction({
 *       location: 'product-list',
 *       label: 'Send to translation service',
 *       icon: 'language',
 *       onClick: ({ injector, selection }) => {
 *         const modalService = injector.get(ModalService);
 *         const translationService = injector.get(ProductDataTranslationService);
 *         modalService
 *           .dialog({
 *             title: `Send ${selection.length} products for translation?`,
 *             buttons: [
 *               { type: 'secondary', label: 'cancel' },
 *               { type: 'primary', label: 'send', returnValue: true },
 *             ],
 *           })
 *           .subscribe(response => {
 *             if (response) {
 *               translationService.sendForTranslation(selection.map(item => item.productId));
 *             }
 *           });
 *       },
 *     }),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @since 1.8.0
 * @docsCategory bulk-actions
 */
export function registerBulkAction(bulkAction) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (registry) => () => {
            registry.registerBulkAction(bulkAction);
        },
        deps: [BulkActionRegistryService],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItYnVsay1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3Byb3ZpZGVycy9idWxrLWFjdGlvbi1yZWdpc3RyeS9yZWdpc3Rlci1idWxrLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUVqRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUczRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlERztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxPQUFPO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsQ0FBQyxRQUFtQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDdEQsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztLQUNwQyxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgRmFjdG9yeVByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJ1bGtBY3Rpb25SZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL2J1bGstYWN0aW9uLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVsa0FjdGlvbiB9IGZyb20gJy4vYnVsay1hY3Rpb24tdHlwZXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogUmVnaXN0ZXJzIGEgY3VzdG9tIHtAbGluayBCdWxrQWN0aW9ufSB3aGljaCBjYW4gYmUgaW52b2tlZCBmcm9tIHRoZSBidWxrIGFjdGlvbiBtZW51XG4gKiBvZiBhbnkgc3VwcG9ydGVkIGxpc3Qgdmlldy5cbiAqXG4gKiBUaGlzIGFsbG93cyB5b3UgdG8gcHJvdmlkZSBjdXN0b20gZnVuY3Rpb25hbGl0eSB0aGF0IGNhbiBvcGVyYXRlIG9uIGFueSBvZiB0aGUgc2VsZWN0ZWRcbiAqIGl0ZW1zIGluIHRoZSBsaXN0IHZpZXcuXG4gKlxuICogSW4gdGhpcyBleGFtcGxlLCBpbWFnaW5lIHdlIGhhdmUgYW4gaW50ZWdyYXRpb24gd2l0aCBhIDNyZC1wYXJ0eSB0ZXh0IHRyYW5zbGF0aW9uIHNlcnZpY2UuIFRoaXNcbiAqIGJ1bGsgYWN0aW9uIGFsbG93cyB1cyB0byBzZWxlY3QgbXVsdGlwbGUgcHJvZHVjdHMgZnJvbSB0aGUgcHJvZHVjdCBsaXN0IHZpZXcsIGFuZCBzZW5kIHRoZW0gZm9yXG4gKiB0cmFuc2xhdGlvbiB2aWEgYSBjdXN0b20gc2VydmljZSB3aGljaCBpbnRlZ3JhdGVzIHdpdGggdGhlIHRyYW5zbGF0aW9uIHNlcnZpY2UncyBBUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIGltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnXFxAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IE1vZGFsU2VydmljZSwgcmVnaXN0ZXJCdWxrQWN0aW9uLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdcXEB2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuICpcbiAqIFxcQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIFByb2R1Y3REYXRhVHJhbnNsYXRpb25TZXJ2aWNlLFxuICogICAgIHJlZ2lzdGVyQnVsa0FjdGlvbih7XG4gKiAgICAgICBsb2NhdGlvbjogJ3Byb2R1Y3QtbGlzdCcsXG4gKiAgICAgICBsYWJlbDogJ1NlbmQgdG8gdHJhbnNsYXRpb24gc2VydmljZScsXG4gKiAgICAgICBpY29uOiAnbGFuZ3VhZ2UnLFxuICogICAgICAgb25DbGljazogKHsgaW5qZWN0b3IsIHNlbGVjdGlvbiB9KSA9PiB7XG4gKiAgICAgICAgIGNvbnN0IG1vZGFsU2VydmljZSA9IGluamVjdG9yLmdldChNb2RhbFNlcnZpY2UpO1xuICogICAgICAgICBjb25zdCB0cmFuc2xhdGlvblNlcnZpY2UgPSBpbmplY3Rvci5nZXQoUHJvZHVjdERhdGFUcmFuc2xhdGlvblNlcnZpY2UpO1xuICogICAgICAgICBtb2RhbFNlcnZpY2VcbiAqICAgICAgICAgICAuZGlhbG9nKHtcbiAqICAgICAgICAgICAgIHRpdGxlOiBgU2VuZCAke3NlbGVjdGlvbi5sZW5ndGh9IHByb2R1Y3RzIGZvciB0cmFuc2xhdGlvbj9gLFxuICogICAgICAgICAgICAgYnV0dG9uczogW1xuICogICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogJ2NhbmNlbCcgfSxcbiAqICAgICAgICAgICAgICAgeyB0eXBlOiAncHJpbWFyeScsIGxhYmVsOiAnc2VuZCcsIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gKiAgICAgICAgICAgICBdLFxuICogICAgICAgICAgIH0pXG4gKiAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gKiAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAqICAgICAgICAgICAgICAgdHJhbnNsYXRpb25TZXJ2aWNlLnNlbmRGb3JUcmFuc2xhdGlvbihzZWxlY3Rpb24ubWFwKGl0ZW0gPT4gaXRlbS5wcm9kdWN0SWQpKTtcbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICB9KTtcbiAqICAgICAgIH0sXG4gKiAgICAgfSksXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15VWlFeHRlbnNpb25Nb2R1bGUge31cbiAqIGBgYFxuICogQHNpbmNlIDEuOC4wXG4gKiBAZG9jc0NhdGVnb3J5IGJ1bGstYWN0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJCdWxrQWN0aW9uKGJ1bGtBY3Rpb246IEJ1bGtBY3Rpb24pOiBGYWN0b3J5UHJvdmlkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIHVzZUZhY3Rvcnk6IChyZWdpc3RyeTogQnVsa0FjdGlvblJlZ2lzdHJ5U2VydmljZSkgPT4gKCkgPT4ge1xuICAgICAgICAgICAgcmVnaXN0cnkucmVnaXN0ZXJCdWxrQWN0aW9uKGJ1bGtBY3Rpb24pO1xuICAgICAgICB9LFxuICAgICAgICBkZXBzOiBbQnVsa0FjdGlvblJlZ2lzdHJ5U2VydmljZV0sXG4gICAgfTtcbn1cbiJdfQ==
import { ExtensionHostConfig } from './extension-host-config';
import { ExtensionHostComponent } from './extension-host.component';
/**
 * This function is used to conveniently configure a UI extension route to
 * host an external URL from the Admin UI using the {@link ExtensionHostComponent}
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *     imports: [
 *         RouterModule.forChild([
 *             hostExternalFrame({
 *                 path: '',
 *                 breadcrumbLabel: 'Vue.js App',
 *                 extensionUrl: './assets/vue-app/index.html',
 *                 openInNewTab: false,
 *             }),
 *         ]),
 *     ],
 * })
 export class VueUiExtensionModule {}
 * ```
 */
export function hostExternalFrame(options) {
    const pathMatch = options.path === '' ? 'full' : 'prefix';
    return {
        path: options.path,
        pathMatch,
        component: ExtensionHostComponent,
        data: {
            breadcrumb: [
                {
                    label: options.breadcrumbLabel,
                    link: ['./'],
                },
            ],
            extensionHostConfig: new ExtensionHostConfig(options),
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC1leHRlcm5hbC1mcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvZXh0ZW5zaW9uLWhvc3QvaG9zdC1leHRlcm5hbC1mcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQXdCLE1BQU0seUJBQXlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFPcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQTZCO0lBQzNELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMxRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1FBQ2xCLFNBQVM7UUFDVCxTQUFTLEVBQUUsc0JBQXNCO1FBQ2pDLElBQUksRUFBRTtZQUNGLFVBQVUsRUFBRTtnQkFDUjtvQkFDSSxLQUFLLEVBQUUsT0FBTyxDQUFDLGVBQWU7b0JBQzlCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsbUJBQW1CLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7U0FDeEQ7S0FDSixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgRXh0ZW5zaW9uSG9zdENvbmZpZywgRXh0ZW5zaW9uSG9zdE9wdGlvbnMgfSBmcm9tICcuL2V4dGVuc2lvbi1ob3N0LWNvbmZpZyc7XG5pbXBvcnQgeyBFeHRlbnNpb25Ib3N0Q29tcG9uZW50IH0gZnJvbSAnLi9leHRlbnNpb24taG9zdC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVybmFsRnJhbWVPcHRpb25zIGV4dGVuZHMgRXh0ZW5zaW9uSG9zdE9wdGlvbnMge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBicmVhZGNydW1iTGFiZWw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY29udmVuaWVudGx5IGNvbmZpZ3VyZSBhIFVJIGV4dGVuc2lvbiByb3V0ZSB0b1xuICogaG9zdCBhbiBleHRlcm5hbCBVUkwgZnJvbSB0aGUgQWRtaW4gVUkgdXNpbmcgdGhlIHtAbGluayBFeHRlbnNpb25Ib3N0Q29tcG9uZW50fVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBcXEBOZ01vZHVsZSh7XG4gKiAgICAgaW1wb3J0czogW1xuICogICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICogICAgICAgICAgICAgaG9zdEV4dGVybmFsRnJhbWUoe1xuICogICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICogICAgICAgICAgICAgICAgIGJyZWFkY3J1bWJMYWJlbDogJ1Z1ZS5qcyBBcHAnLFxuICogICAgICAgICAgICAgICAgIGV4dGVuc2lvblVybDogJy4vYXNzZXRzL3Z1ZS1hcHAvaW5kZXguaHRtbCcsXG4gKiAgICAgICAgICAgICAgICAgb3BlbkluTmV3VGFiOiBmYWxzZSxcbiAqICAgICAgICAgICAgIH0pLFxuICogICAgICAgICBdKSxcbiAqICAgICBdLFxuICogfSlcbiBleHBvcnQgY2xhc3MgVnVlVWlFeHRlbnNpb25Nb2R1bGUge31cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaG9zdEV4dGVybmFsRnJhbWUob3B0aW9uczogRXh0ZXJuYWxGcmFtZU9wdGlvbnMpOiBSb3V0ZSB7XG4gICAgY29uc3QgcGF0aE1hdGNoID0gb3B0aW9ucy5wYXRoID09PSAnJyA/ICdmdWxsJyA6ICdwcmVmaXgnO1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcGF0aE1hdGNoLFxuICAgICAgICBjb21wb25lbnQ6IEV4dGVuc2lvbkhvc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBvcHRpb25zLmJyZWFkY3J1bWJMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWycuLyddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXh0ZW5zaW9uSG9zdENvbmZpZzogbmV3IEV4dGVuc2lvbkhvc3RDb25maWcob3B0aW9ucyksXG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiJdfQ==
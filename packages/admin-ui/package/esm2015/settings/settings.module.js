import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { AddCountryToZoneDialogComponent } from './components/add-country-to-zone-dialog/add-country-to-zone-dialog.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { PaymentMethodDetailComponent } from './components/payment-method-detail/payment-method-detail.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';
import { PermissionGridComponent } from './components/permission-grid/permission-grid.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ShippingEligibilityTestResultComponent } from './components/shipping-eligibility-test-result/shipping-eligibility-test-result.component';
import { ShippingMethodDetailComponent } from './components/shipping-method-detail/shipping-method-detail.component';
import { ShippingMethodListComponent } from './components/shipping-method-list/shipping-method-list.component';
import { ShippingMethodTestResultComponent } from './components/shipping-method-test-result/shipping-method-test-result.component';
import { TaxCategoryDetailComponent } from './components/tax-category-detail/tax-category-detail.component';
import { TaxCategoryListComponent } from './components/tax-category-list/tax-category-list.component';
import { TaxRateDetailComponent } from './components/tax-rate-detail/tax-rate-detail.component';
import { TaxRateListComponent } from './components/tax-rate-list/tax-rate-list.component';
import { TestAddressFormComponent } from './components/test-address-form/test-address-form.component';
import { TestOrderBuilderComponent } from './components/test-order-builder/test-order-builder.component';
import { ZoneDetailDialogComponent } from './components/zone-detail-dialog/zone-detail-dialog.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ZoneMemberControlsDirective } from './components/zone-member-list/zone-member-controls.directive';
import { ZoneMemberListHeaderDirective } from './components/zone-member-list/zone-member-list-header.directive';
import { ZoneMemberListComponent } from './components/zone-member-list/zone-member-list.component';
import { settingsRoutes } from './settings.routes';
export class SettingsModule {
}
SettingsModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(settingsRoutes)],
                declarations: [
                    TaxCategoryListComponent,
                    TaxCategoryDetailComponent,
                    AdministratorListComponent,
                    RoleListComponent,
                    RoleDetailComponent,
                    AdminDetailComponent,
                    PermissionGridComponent,
                    CountryListComponent,
                    CountryDetailComponent,
                    TaxRateListComponent,
                    TaxRateDetailComponent,
                    ChannelListComponent,
                    ChannelDetailComponent,
                    ShippingMethodListComponent,
                    ShippingMethodDetailComponent,
                    PaymentMethodListComponent,
                    PaymentMethodDetailComponent,
                    GlobalSettingsComponent,
                    TestOrderBuilderComponent,
                    TestAddressFormComponent,
                    ShippingMethodTestResultComponent,
                    ShippingEligibilityTestResultComponent,
                    ZoneListComponent,
                    AddCountryToZoneDialogComponent,
                    ZoneMemberListComponent,
                    ZoneMemberListHeaderDirective,
                    ZoneMemberControlsDirective,
                    ZoneDetailDialogComponent,
                    ProfileComponent,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvc2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSwwRkFBMEYsQ0FBQztBQUNsSixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUNySCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMvRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNuSSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMzRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFvQ25ELE1BQU0sT0FBTyxjQUFjOzs7WUFsQzFCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUQsWUFBWSxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixvQkFBb0I7b0JBQ3BCLHVCQUF1QjtvQkFDdkIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1Qix1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsd0JBQXdCO29CQUN4QixpQ0FBaUM7b0JBQ2pDLHNDQUFzQztvQkFDdEMsaUJBQWlCO29CQUNqQiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3QiwyQkFBMkI7b0JBQzNCLHlCQUF5QjtvQkFDekIsZ0JBQWdCO2lCQUNuQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuaW1wb3J0IHsgQWRkQ291bnRyeVRvWm9uZURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtY291bnRyeS10by16b25lLWRpYWxvZy9hZGQtY291bnRyeS10by16b25lLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRtaW4tZGV0YWlsL2FkbWluLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5pc3RyYXRvckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRvci1saXN0L2FkbWluaXN0cmF0b3ItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhbm5lbERldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jaGFubmVsLWRldGFpbC9jaGFubmVsLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhbm5lbExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2hhbm5lbC1saXN0L2NoYW5uZWwtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291bnRyeURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3VudHJ5LWRldGFpbC9jb3VudHJ5LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291bnRyeUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291bnRyeS1saXN0L2NvdW50cnktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2xvYmFsLXNldHRpbmdzL2dsb2JhbC1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZERldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXltZW50LW1ldGhvZC1kZXRhaWwvcGF5bWVudC1tZXRob2QtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXltZW50TWV0aG9kTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXltZW50LW1ldGhvZC1saXN0L3BheW1lbnQtbWV0aG9kLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1pc3Npb25HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Blcm1pc3Npb24tZ3JpZC9wZXJtaXNzaW9uLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2ZpbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb2xlRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JvbGUtZGV0YWlsL3JvbGUtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb2xlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yb2xlLWxpc3Qvcm9sZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGlwcGluZ0VsaWdpYmlsaXR5VGVzdFJlc3VsdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hpcHBpbmdNZXRob2REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hpcHBpbmctbWV0aG9kLWRldGFpbC9zaGlwcGluZy1tZXRob2QtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGlwcGluZ01ldGhvZExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hpcHBpbmctbWV0aG9kLWxpc3Qvc2hpcHBpbmctbWV0aG9kLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFNoaXBwaW5nTWV0aG9kVGVzdFJlc3VsdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zaGlwcGluZy1tZXRob2QtdGVzdC1yZXN1bHQvc2hpcHBpbmctbWV0aG9kLXRlc3QtcmVzdWx0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYXhDYXRlZ29yeURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXgtY2F0ZWdvcnktZGV0YWlsL3RheC1jYXRlZ29yeS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRheENhdGVnb3J5TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXgtY2F0ZWdvcnktbGlzdC90YXgtY2F0ZWdvcnktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGF4UmF0ZURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXgtcmF0ZS1kZXRhaWwvdGF4LXJhdGUtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYXhSYXRlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YXgtcmF0ZS1saXN0L3RheC1yYXRlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRlc3RBZGRyZXNzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZXN0LWFkZHJlc3MtZm9ybS90ZXN0LWFkZHJlc3MtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVzdE9yZGVyQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZXN0LW9yZGVyLWJ1aWxkZXIvdGVzdC1vcmRlci1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBab25lRGV0YWlsRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3pvbmUtZGV0YWlsLWRpYWxvZy96b25lLWRldGFpbC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFpvbmVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3pvbmUtbGlzdC96b25lLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFpvbmVNZW1iZXJDb250cm9sc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy96b25lLW1lbWJlci1saXN0L3pvbmUtbWVtYmVyLWNvbnRyb2xzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBab25lTWVtYmVyTGlzdEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy96b25lLW1lbWJlci1saXN0L3pvbmUtbWVtYmVyLWxpc3QtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBab25lTWVtYmVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy96b25lLW1lbWJlci1saXN0L3pvbmUtbWVtYmVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IHNldHRpbmdzUm91dGVzIH0gZnJvbSAnLi9zZXR0aW5ncy5yb3V0ZXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChzZXR0aW5nc1JvdXRlcyldLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUYXhDYXRlZ29yeUxpc3RDb21wb25lbnQsXG4gICAgICAgIFRheENhdGVnb3J5RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBBZG1pbmlzdHJhdG9yTGlzdENvbXBvbmVudCxcbiAgICAgICAgUm9sZUxpc3RDb21wb25lbnQsXG4gICAgICAgIFJvbGVEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIEFkbWluRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBQZXJtaXNzaW9uR3JpZENvbXBvbmVudCxcbiAgICAgICAgQ291bnRyeUxpc3RDb21wb25lbnQsXG4gICAgICAgIENvdW50cnlEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIFRheFJhdGVMaXN0Q29tcG9uZW50LFxuICAgICAgICBUYXhSYXRlRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBDaGFubmVsTGlzdENvbXBvbmVudCxcbiAgICAgICAgQ2hhbm5lbERldGFpbENvbXBvbmVudCxcbiAgICAgICAgU2hpcHBpbmdNZXRob2RMaXN0Q29tcG9uZW50LFxuICAgICAgICBTaGlwcGluZ01ldGhvZERldGFpbENvbXBvbmVudCxcbiAgICAgICAgUGF5bWVudE1ldGhvZExpc3RDb21wb25lbnQsXG4gICAgICAgIFBheW1lbnRNZXRob2REZXRhaWxDb21wb25lbnQsXG4gICAgICAgIEdsb2JhbFNldHRpbmdzQ29tcG9uZW50LFxuICAgICAgICBUZXN0T3JkZXJCdWlsZGVyQ29tcG9uZW50LFxuICAgICAgICBUZXN0QWRkcmVzc0Zvcm1Db21wb25lbnQsXG4gICAgICAgIFNoaXBwaW5nTWV0aG9kVGVzdFJlc3VsdENvbXBvbmVudCxcbiAgICAgICAgU2hpcHBpbmdFbGlnaWJpbGl0eVRlc3RSZXN1bHRDb21wb25lbnQsXG4gICAgICAgIFpvbmVMaXN0Q29tcG9uZW50LFxuICAgICAgICBBZGRDb3VudHJ5VG9ab25lRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBab25lTWVtYmVyTGlzdENvbXBvbmVudCxcbiAgICAgICAgWm9uZU1lbWJlckxpc3RIZWFkZXJEaXJlY3RpdmUsXG4gICAgICAgIFpvbmVNZW1iZXJDb250cm9sc0RpcmVjdGl2ZSxcbiAgICAgICAgWm9uZURldGFpbERpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgUHJvZmlsZUNvbXBvbmVudCxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc01vZHVsZSB7fVxuIl19
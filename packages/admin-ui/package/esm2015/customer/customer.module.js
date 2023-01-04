import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { AddCustomerToGroupDialogComponent } from './components/add-customer-to-group-dialog/add-customer-to-group-dialog.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AddressDetailDialogComponent } from './components/address-detail-dialog/address-detail-dialog.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerGroupDetailDialogComponent } from './components/customer-group-detail-dialog/customer-group-detail-dialog.component';
import { CustomerGroupListComponent } from './components/customer-group-list/customer-group-list.component';
import { CustomerGroupMemberListComponent } from './components/customer-group-member-list/customer-group-member-list.component';
import { CustomerHistoryComponent } from './components/customer-history/customer-history.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerStatusLabelComponent } from './components/customer-status-label/customer-status-label.component';
import { SelectCustomerGroupDialogComponent } from './components/select-customer-group-dialog/select-customer-group-dialog.component';
import { customerRoutes } from './customer.routes';
export class CustomerModule {
}
CustomerModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(customerRoutes)],
                declarations: [
                    CustomerListComponent,
                    CustomerDetailComponent,
                    CustomerStatusLabelComponent,
                    AddressCardComponent,
                    CustomerGroupListComponent,
                    CustomerGroupDetailDialogComponent,
                    AddCustomerToGroupDialogComponent,
                    CustomerGroupMemberListComponent,
                    SelectCustomerGroupDialogComponent,
                    CustomerHistoryComponent,
                    AddressDetailDialogComponent,
                ],
                exports: [AddressCardComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jdXN0b21lci9zcmMvY3VzdG9tZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUNySSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUN0SSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUN0SSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFtQm5ELE1BQU0sT0FBTyxjQUFjOzs7WUFqQjFCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUQsWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qiw0QkFBNEI7b0JBQzVCLG9CQUFvQjtvQkFDcEIsMEJBQTBCO29CQUMxQixrQ0FBa0M7b0JBQ2xDLGlDQUFpQztvQkFDakMsZ0NBQWdDO29CQUNoQyxrQ0FBa0M7b0JBQ2xDLHdCQUF3QjtvQkFDeEIsNEJBQTRCO2lCQUMvQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IEFkZEN1c3RvbWVyVG9Hcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtY3VzdG9tZXItdG8tZ3JvdXAtZGlhbG9nL2FkZC1jdXN0b21lci10by1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEFkZHJlc3NDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FkZHJlc3MtY2FyZC9hZGRyZXNzLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEFkZHJlc3NEZXRhaWxEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRkcmVzcy1kZXRhaWwtZGlhbG9nL2FkZHJlc3MtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY3VzdG9tZXItZGV0YWlsL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJHcm91cERldGFpbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jdXN0b21lci1ncm91cC1kZXRhaWwtZGlhbG9nL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVyR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2N1c3RvbWVyLWdyb3VwLWxpc3QvY3VzdG9tZXItZ3JvdXAtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJHcm91cE1lbWJlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY3VzdG9tZXItZ3JvdXAtbWVtYmVyLWxpc3QvY3VzdG9tZXItZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVySGlzdG9yeUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jdXN0b21lci1oaXN0b3J5L2N1c3RvbWVyLWhpc3RvcnkuY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jdXN0b21lci1saXN0L2N1c3RvbWVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVyU3RhdHVzTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY3VzdG9tZXItc3RhdHVzLWxhYmVsL2N1c3RvbWVyLXN0YXR1cy1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q3VzdG9tZXJHcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QtY3VzdG9tZXItZ3JvdXAtZGlhbG9nL3NlbGVjdC1jdXN0b21lci1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IGN1c3RvbWVyUm91dGVzIH0gZnJvbSAnLi9jdXN0b21lci5yb3V0ZXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChjdXN0b21lclJvdXRlcyldLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDdXN0b21lckxpc3RDb21wb25lbnQsXG4gICAgICAgIEN1c3RvbWVyRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBDdXN0b21lclN0YXR1c0xhYmVsQ29tcG9uZW50LFxuICAgICAgICBBZGRyZXNzQ2FyZENvbXBvbmVudCxcbiAgICAgICAgQ3VzdG9tZXJHcm91cExpc3RDb21wb25lbnQsXG4gICAgICAgIEN1c3RvbWVyR3JvdXBEZXRhaWxEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEFkZEN1c3RvbWVyVG9Hcm91cERpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgQ3VzdG9tZXJHcm91cE1lbWJlckxpc3RDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdEN1c3RvbWVyR3JvdXBEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEN1c3RvbWVySGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgQWRkcmVzc0RldGFpbERpYWxvZ0NvbXBvbmVudCxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtBZGRyZXNzQ2FyZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTW9kdWxlIHt9XG4iXX0=
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { RelationSelectorDialogComponent } from '../relation-selector-dialog/relation-selector-dialog.component';
export class RelationCustomerInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    get customer() {
        return this.parentFormControl.value;
    }
    ngOnInit() {
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.customer
                .getCustomerList(10, 0, term)
                .mapSingle(data => data.customers.items);
        }));
    }
    selectCustomer() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: _('customer.select-customer'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationCustomerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-customer-input',
                template: "<vdr-relation-card\n    (select)=\"selectCustomer()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"user\"\n    [entity]=\"customer\"\n    [selectLabel]=\"'customer.select-customer' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview>\n        <div class=\"placeholder\">\n            <clr-icon shape=\"user\" class=\"is-solid\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-c=\"entity\">\n        <div class=\"\">\n            <a [routerLink]=\"['/customer/customers', c.id]\">{{ c.firstName }} {{ c.lastName }}</a>\n        </div>\n        <div class=\"\">{{ c.emailAddress }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <b>{{ item.emailAddress }}</b>\n            {{ item.firstName }} {{ item.lastName }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
RelationCustomerInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationCustomerInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tY3VzdG9tZXItaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9yZWxhdGlvbi1mb3JtLWlucHV0L2N1c3RvbWVyL3JlbGF0aW9uLWN1c3RvbWVyLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBa0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQXdDLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUy9GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFRakgsTUFBTSxPQUFPLDhCQUE4QjtJQWV2QyxZQUFvQixZQUEwQixFQUFVLFdBQXdCO1FBQTVELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFSaEYsa0JBQWEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFPK0MsQ0FBQztJQUpwRixJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUlELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2lCQUMzQixlQUFlLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsK0JBQStCLEVBQUU7WUFDNUMsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO2dCQUNwQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNsQztTQUNKLENBQUM7YUFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7OztZQXZESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsK25DQUF1RDtnQkFFdkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSUSxZQUFZO1lBRFosV0FBVzs7O3VCQVdmLEtBQUs7Z0NBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQUVMLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgICBDdXN0b21lckZyYWdtZW50LFxuICAgIEdldEN1c3RvbWVyTGlzdCxcbiAgICBHZXRQcm9kdWN0TGlzdCxcbiAgICBHZXRQcm9kdWN0U2ltcGxlLFxuICAgIFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcsXG59IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVsYXRpb25TZWxlY3RvckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3JlbGF0aW9uLXNlbGVjdG9yLWRpYWxvZy9yZWxhdGlvbi1zZWxlY3Rvci1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcmVsYXRpb24tY3VzdG9tZXItaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZWxhdGlvbi1jdXN0b21lci1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVsYXRpb24tY3VzdG9tZXItaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmVsYXRpb25DdXN0b21lcklucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwYXJlbnRGb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgY29uZmlnOiBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnO1xuXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0b3InKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHNlYXJjaENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHJlc3VsdHMkOiBPYnNlcnZhYmxlPEdldEN1c3RvbWVyTGlzdC5JdGVtc1tdPjtcblxuICAgIGdldCBjdXN0b21lcigpOiBDdXN0b21lckZyYWdtZW50IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wudmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzJCA9IHRoaXMuc2VhcmNoVGVybSQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDdXN0b21lckxpc3QoMTAsIDAsIHRlcm0pXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLmN1c3RvbWVycy5pdGVtcyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RDdXN0b21lcigpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFJlbGF0aW9uU2VsZWN0b3JEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY3VzdG9tZXIuc2VsZWN0LWN1c3RvbWVyJyksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yVGVtcGxhdGU6IHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZvcm1Db250cm9sLnNldFZhbHVlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG59XG4iXX0=
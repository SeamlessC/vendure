import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ZoneMemberControlsDirective } from './zone-member-controls.directive';
import { ZoneMemberListHeaderDirective } from './zone-member-list-header.directive';
export class ZoneMemberListComponent {
    constructor() {
        this.members = [];
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.filterTerm = '';
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    filteredMembers() {
        if (this.filterTerm !== '') {
            const term = this.filterTerm.toLocaleLowerCase();
            return this.members.filter(m => m.name.toLocaleLowerCase().includes(term) || m.code.toLocaleLowerCase().includes(term));
        }
        else {
            return this.members;
        }
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map(v => v.id));
        }
    }
    toggleSelectMember({ item: member }) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter(id => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
ZoneMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-member-list',
                template: "<div class=\"members-header\">\n    <ng-container *ngIf=\"headerTemplate\">\n        <ng-container *ngTemplateOutlet=\"headerTemplate.templateRef\"></ng-container>\n    </ng-container>\n    <input\n        type=\"text\"\n        [placeholder]=\"'settings.filter-by-member-name' | translate\"\n        [(ngModel)]=\"filterTerm\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"filteredMembers()\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"(['UpdateSettings', 'UpdateZone'] | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-member=\"item\">\n        <td class=\"left align-middle\">{{ member.code }}</td>\n        <td class=\"left align-middle\">{{ member.name }}</td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"member.enabled\"\n                [attr.shape]=\"member.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <ng-container *ngIf=\"controlsTemplate\">\n                <ng-container\n                    *ngTemplateOutlet=\"controlsTemplate.templateRef; context: { member: member }\"\n                ></ng-container>\n            </ng-container>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".members-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:5;border-bottom:1px solid var(--color-component-border-200)}.members-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.members-header .clr-input{width:100%}\n"]
            },] }
];
ZoneMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    headerTemplate: [{ type: ContentChild, args: [ZoneMemberListHeaderDirective,] }],
    controlsTemplate: [{ type: ContentChild, args: [ZoneMemberControlsDirective,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9jb21wb25lbnRzL3pvbmUtbWVtYmVyLWxpc3Qvem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFVcEYsTUFBTSxPQUFPLHVCQUF1QjtJQU5wQztRQU9hLFlBQU8sR0FBaUIsRUFBRSxDQUFDO1FBQzNCLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFHekQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQXFDaEIscUJBQWdCLEdBQUcsQ0FBQyxNQUFrQixFQUFXLEVBQUU7WUFDL0MsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBdENHLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDOUYsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoRTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBd0I7UUFDckQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQzs7O1lBL0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxxbURBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztzQkFFSSxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsTUFBTTs2QkFDTixZQUFZLFNBQUMsNkJBQTZCOytCQUMxQyxZQUFZLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdldFpvbmVzIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IFpvbmVNZW1iZXJDb250cm9sc0RpcmVjdGl2ZSB9IGZyb20gJy4vem9uZS1tZW1iZXItY29udHJvbHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFpvbmVNZW1iZXJMaXN0SGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi96b25lLW1lbWJlci1saXN0LWhlYWRlci5kaXJlY3RpdmUnO1xuXG5leHBvcnQgdHlwZSBab25lTWVtYmVyID0geyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvZGU6IHN0cmluZyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci16b25lLW1lbWJlci1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBab25lTWVtYmVyTGlzdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgbWVtYmVyczogWm9uZU1lbWJlcltdID0gW107XG4gICAgQElucHV0KCkgc2VsZWN0ZWRNZW1iZXJJZHM6IHN0cmluZ1tdID0gW107XG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nW10+KCk7XG4gICAgQENvbnRlbnRDaGlsZChab25lTWVtYmVyTGlzdEhlYWRlckRpcmVjdGl2ZSkgaGVhZGVyVGVtcGxhdGU6IFpvbmVNZW1iZXJMaXN0SGVhZGVyRGlyZWN0aXZlO1xuICAgIEBDb250ZW50Q2hpbGQoWm9uZU1lbWJlckNvbnRyb2xzRGlyZWN0aXZlKSBjb250cm9sc1RlbXBsYXRlOiBab25lTWVtYmVyQ29udHJvbHNEaXJlY3RpdmU7XG4gICAgZmlsdGVyVGVybSA9ICcnO1xuXG4gICAgZmlsdGVyZWRNZW1iZXJzKCk6IFpvbmVNZW1iZXJbXSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclRlcm0gIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXJtID0gdGhpcy5maWx0ZXJUZXJtLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXJzLmZpbHRlcihcbiAgICAgICAgICAgICAgICBtID0+IG0ubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHRlcm0pIHx8IG0uY29kZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHRlcm0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbWJlcnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcmVBbGxTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubWVtYmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZW1iZXJJZHMubGVuZ3RoID09PSB0aGlzLm1lbWJlcnMubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5hcmVBbGxTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5tZW1iZXJzLm1hcCh2ID0+IHYuaWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdE1lbWJlcih7IGl0ZW06IG1lbWJlciB9OiB7IGl0ZW06IFpvbmVNZW1iZXIgfSkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1lbWJlcklkcy5pbmNsdWRlcyhtZW1iZXIuaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRNZW1iZXJJZHMuZmlsdGVyKGlkID0+IGlkICE9PSBtZW1iZXIuaWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoWy4uLnRoaXMuc2VsZWN0ZWRNZW1iZXJJZHMsIG1lbWJlci5pZF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNZW1iZXJTZWxlY3RlZCA9IChtZW1iZXI6IFpvbmVNZW1iZXIpOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIC0xIDwgdGhpcy5zZWxlY3RlZE1lbWJlcklkcy5pbmRleE9mKG1lbWJlci5pZCk7XG4gICAgfTtcbn1cbiJdfQ==
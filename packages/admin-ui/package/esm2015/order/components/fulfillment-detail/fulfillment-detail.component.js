import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { isObject } from '@vendure/common/lib/shared-utils';
export class FulfillmentDetailComponent {
    constructor(serverConfigService) {
        this.serverConfigService = serverConfigService;
        this.customFieldConfig = [];
        this.customFieldFormGroup = new FormGroup({});
    }
    ngOnInit() {
        this.customFieldConfig = this.serverConfigService.getCustomFieldsFor('Fulfillment');
    }
    ngOnChanges(changes) {
        this.buildCustomFieldsFormGroup();
    }
    get fulfillment() {
        return this.order.fulfillments && this.order.fulfillments.find(f => f.id === this.fulfillmentId);
    }
    get items() {
        var _a, _b;
        return ((_b = (_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.summary.map(row => {
            var _a, _b;
            return {
                name: (_b = (_a = this.order.lines.find(line => line.id === row.orderLine.id)) === null || _a === void 0 ? void 0 : _a.productVariant.name) !== null && _b !== void 0 ? _b : '',
                quantity: row.quantity,
            };
        })) !== null && _b !== void 0 ? _b : []);
    }
    buildCustomFieldsFormGroup() {
        const customFields = this.fulfillment.customFields;
        for (const fieldDef of this.serverConfigService.getCustomFieldsFor('Fulfillment')) {
            this.customFieldFormGroup.addControl(fieldDef.name, new FormControl(customFields[fieldDef.name]));
        }
    }
    customFieldIsObject(customField) {
        return Array.isArray(customField) || isObject(customField);
    }
}
FulfillmentDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-detail',
                template: "<vdr-labeled-data [label]=\"'common.created-at' | translate\">\n    {{ fulfillment?.createdAt | localeDate: 'medium' }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n    {{ fulfillment?.method }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"fulfillment?.trackingCode\" [label]=\"'order.tracking-code' | translate\">\n    {{ fulfillment?.trackingCode }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.contents' | translate\">\n    <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<ng-container *ngFor=\"let customField of customFieldConfig\">\n    <vdr-custom-field-control\n        *ngIf=\"customFieldFormGroup.get(customField.name)\"\n        [readonly]=\"true\"\n        [compact]=\"true\"\n        [customField]=\"customField\"\n        [customFieldsFormGroup]=\"customFieldFormGroup\"\n    ></vdr-custom-field-control>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FulfillmentDetailComponent.ctorParameters = () => [
    { type: ServerConfigService }
];
FulfillmentDetailComponent.propDecorators = {
    fulfillmentId: [{ type: Input }],
    order: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvZnVsZmlsbG1lbnQtZGV0YWlsL2Z1bGZpbGxtZW50LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFrQyxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVE1RCxNQUFNLE9BQU8sMEJBQTBCO0lBT25DLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSDVELHNCQUFpQixHQUF3QixFQUFFLENBQUM7UUFDNUMseUJBQW9CLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFc0IsQ0FBQztJQUVoRSxRQUFRO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRCxJQUFJLEtBQUs7O1FBQ0wsT0FBTyxDQUNILE1BQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUNoQyxPQUFPO2dCQUNILElBQUksRUFDQSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxjQUFjLENBQUMsSUFBSSxtQ0FDaEYsRUFBRTtnQkFDTixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7YUFDekIsQ0FBQztRQUNOLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsTUFBTSxZQUFZLEdBQUksSUFBSSxDQUFDLFdBQW1CLENBQUMsWUFBWSxDQUFDO1FBQzVELEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQy9FLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFvQjtRQUNwQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7OztZQWpESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsczdCQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSd0MsbUJBQW1COzs7NEJBVXZELEtBQUs7b0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29uZmlnLCBPcmRlckRldGFpbCwgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWZ1bGZpbGxtZW50LWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Z1bGZpbGxtZW50LWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZnVsZmlsbG1lbnQtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxtZW50RGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGZ1bGZpbGxtZW50SWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQ7XG5cbiAgICBjdXN0b21GaWVsZENvbmZpZzogQ3VzdG9tRmllbGRDb25maWdbXSA9IFtdO1xuICAgIGN1c3RvbUZpZWxkRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZENvbmZpZyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRDdXN0b21GaWVsZHNGb3IoJ0Z1bGZpbGxtZW50Jyk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICB0aGlzLmJ1aWxkQ3VzdG9tRmllbGRzRm9ybUdyb3VwKCk7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGZpbGxtZW50KCk6IE9yZGVyRGV0YWlsLkZ1bGZpbGxtZW50cyB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmRlci5mdWxmaWxsbWVudHMgJiYgdGhpcy5vcmRlci5mdWxmaWxsbWVudHMuZmluZChmID0+IGYuaWQgPT09IHRoaXMuZnVsZmlsbG1lbnRJZCk7XG4gICAgfVxuXG4gICAgZ2V0IGl0ZW1zKCk6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyIH0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuZnVsZmlsbG1lbnQ/LnN1bW1hcnkubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXIubGluZXMuZmluZChsaW5lID0+IGxpbmUuaWQgPT09IHJvdy5vcmRlckxpbmUuaWQpPy5wcm9kdWN0VmFyaWFudC5uYW1lID8/XG4gICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IHJvdy5xdWFudGl0eSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkgPz8gW11cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBidWlsZEN1c3RvbUZpZWxkc0Zvcm1Hcm91cCgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzID0gKHRoaXMuZnVsZmlsbG1lbnQgYXMgYW55KS5jdXN0b21GaWVsZHM7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLmdldEN1c3RvbUZpZWxkc0ZvcignRnVsZmlsbG1lbnQnKSkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZEZvcm1Hcm91cC5hZGRDb250cm9sKGZpZWxkRGVmLm5hbWUsIG5ldyBGb3JtQ29udHJvbChjdXN0b21GaWVsZHNbZmllbGREZWYubmFtZV0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNPYmplY3QoY3VzdG9tRmllbGQ6IHVua25vd24pIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY3VzdG9tRmllbGQpIHx8IGlzT2JqZWN0KGN1c3RvbUZpZWxkKTtcbiAgICB9XG59XG4iXX0=
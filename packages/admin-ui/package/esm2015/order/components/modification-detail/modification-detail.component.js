import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class ModificationDetailComponent {
    constructor() {
        this.addedItems = new Map();
        this.removedItems = new Map();
    }
    ngOnChanges() {
        const { added, removed } = this.getModifiedLines();
        this.addedItems = added;
        this.removedItems = removed;
    }
    getSurcharge(id) {
        return this.order.surcharges.find(m => m.id === id);
    }
    getAddedItems() {
        return [...this.addedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getRemovedItems() {
        return [...this.removedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getModifiedLines() {
        var _a, _b;
        const added = new Map();
        const removed = new Map();
        for (const _item of this.modification.orderItems || []) {
            const result = this.getOrderLineAndItem(_item.id);
            if (result) {
                const { line, item } = result;
                if (item.cancelled) {
                    const count = (_a = removed.get(line)) !== null && _a !== void 0 ? _a : 0;
                    removed.set(line, count + 1);
                }
                else {
                    const count = (_b = added.get(line)) !== null && _b !== void 0 ? _b : 0;
                    added.set(line, count + 1);
                }
            }
        }
        return { added, removed };
    }
    getOrderLineAndItem(itemId) {
        for (const line of this.order.lines) {
            const item = line.items.find(i => i.id === itemId);
            if (item) {
                return { line, item };
            }
        }
    }
}
ModificationDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modification-detail',
                template: "<vdr-labeled-data [label]=\"'common.ID' | translate\">{{ modification.id }}</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"modification.note\" [label]=\"'order.note' | translate\">{{\n    modification.note\n}}</vdr-labeled-data>\n<vdr-labeled-data *ngFor=\"let surcharge of modification.surcharges\" [label]=\"'order.surcharges' | translate\">\n    {{ getSurcharge(surcharge.id)?.description }}\n    {{ getSurcharge(surcharge.id)?.priceWithTax | localeCurrency: order.currencyCode }}</vdr-labeled-data\n>\n<vdr-labeled-data *ngIf=\"getAddedItems().length\" [label]=\"'order.added-items' | translate\">\n    <vdr-simple-item-list [items]=\"getAddedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"getRemovedItems().length\" [label]=\"'order.removed-items' | translate\">\n    <vdr-simple-item-list [items]=\"getRemovedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ModificationDetailComponent.propDecorators = {
    order: [{ type: Input }],
    modification: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL21vZGlmaWNhdGlvbi1kZXRhaWwvbW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBUzdGLE1BQU0sT0FBTywyQkFBMkI7SUFOeEM7UUFTWSxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDbEQsaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztJQW1EaEUsQ0FBQztJQWpERyxXQUFXO1FBQ1AsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDeEQsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGdCQUFnQjs7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDckQsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixNQUFNLEtBQUssR0FBRyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFJLENBQUMsQ0FBQztvQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoQztxQkFBTTtvQkFDSCxNQUFNLEtBQUssR0FBRyxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFJLENBQUMsQ0FBQztvQkFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjthQUNKO1NBQ0o7UUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxNQUFjO1FBQ3RDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7OztZQTVESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMscTVCQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0JBRUksS0FBSzsyQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckRldGFpbCwgT3JkZXJEZXRhaWxGcmFnbWVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1tb2RpZmljYXRpb24tZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNb2RpZmljYXRpb25EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlckRldGFpbEZyYWdtZW50O1xuICAgIEBJbnB1dCgpIG1vZGlmaWNhdGlvbjogT3JkZXJEZXRhaWwuTW9kaWZpY2F0aW9ucztcbiAgICBwcml2YXRlIGFkZGVkSXRlbXMgPSBuZXcgTWFwPE9yZGVyRGV0YWlsLkxpbmVzLCBudW1iZXI+KCk7XG4gICAgcHJpdmF0ZSByZW1vdmVkSXRlbXMgPSBuZXcgTWFwPE9yZGVyRGV0YWlsLkxpbmVzLCBudW1iZXI+KCk7XG5cbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeyBhZGRlZCwgcmVtb3ZlZCB9ID0gdGhpcy5nZXRNb2RpZmllZExpbmVzKCk7XG4gICAgICAgIHRoaXMuYWRkZWRJdGVtcyA9IGFkZGVkO1xuICAgICAgICB0aGlzLnJlbW92ZWRJdGVtcyA9IHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgZ2V0U3VyY2hhcmdlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXIuc3VyY2hhcmdlcy5maW5kKG0gPT4gbS5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIGdldEFkZGVkSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5hZGRlZEl0ZW1zLmVudHJpZXMoKV0ubWFwKChbbGluZSwgY291bnRdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBsaW5lLnByb2R1Y3RWYXJpYW50Lm5hbWUsIHF1YW50aXR5OiBjb3VudCB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRSZW1vdmVkSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5yZW1vdmVkSXRlbXMuZW50cmllcygpXS5tYXAoKFtsaW5lLCBjb3VudF0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGxpbmUucHJvZHVjdFZhcmlhbnQubmFtZSwgcXVhbnRpdHk6IGNvdW50IH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TW9kaWZpZWRMaW5lcygpIHtcbiAgICAgICAgY29uc3QgYWRkZWQgPSBuZXcgTWFwPE9yZGVyRGV0YWlsLkxpbmVzLCBudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBuZXcgTWFwPE9yZGVyRGV0YWlsLkxpbmVzLCBudW1iZXI+KCk7XG4gICAgICAgIGZvciAoY29uc3QgX2l0ZW0gb2YgdGhpcy5tb2RpZmljYXRpb24ub3JkZXJJdGVtcyB8fCBbXSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRPcmRlckxpbmVBbmRJdGVtKF9pdGVtLmlkKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxpbmUsIGl0ZW0gfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSByZW1vdmVkLmdldChsaW5lKSA/PyAwO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnNldChsaW5lLCBjb3VudCArIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gYWRkZWQuZ2V0KGxpbmUpID8/IDA7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkLnNldChsaW5lLCBjb3VudCArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBhZGRlZCwgcmVtb3ZlZCB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJMaW5lQW5kSXRlbShpdGVtSWQ6IHN0cmluZykge1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgdGhpcy5vcmRlci5saW5lcykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpbmUuaXRlbXMuZmluZChpID0+IGkuaWQgPT09IGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGxpbmUsIGl0ZW0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
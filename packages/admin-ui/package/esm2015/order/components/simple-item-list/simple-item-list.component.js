import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class SimpleItemListComponent {
}
SimpleItemListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-simple-item-list',
                template: "<div class=\"items-list\">\n    <ul>\n        <li *ngFor=\"let item of items\" [title]=\"item.name\">\n            <div class=\"quantity\">{{ item.quantity }}</div>\n            <clr-icon shape=\"times\" size=\"12\"></clr-icon>\n            {{ item.name }}\n        </li>\n    </ul>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".items-list{font-size:12px}.items-list ul{margin-top:6px;list-style-type:none;margin-left:2px}.items-list ul li{line-height:14px;text-overflow:ellipsis;overflow:hidden}.items-list .quantity{min-width:16px;display:inline-block}\n"]
            },] }
];
SimpleItemListComponent.propDecorators = {
    items: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWl0ZW0tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL3NpbXBsZS1pdGVtLWxpc3Qvc2ltcGxlLWl0ZW0tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBTm5DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxnVEFBZ0Q7Z0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zaW1wbGUtaXRlbS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2ltcGxlLWl0ZW0tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2ltcGxlLWl0ZW0tbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVJdGVtTGlzdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgaXRlbXM6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyIH0+O1xufVxuIl19
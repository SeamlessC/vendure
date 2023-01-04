import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
export class ChannelBadgeComponent {
    get isDefaultChannel() {
        return this.channelCode === DEFAULT_CHANNEL_CODE;
    }
}
ChannelBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-badge',
                template: "<clr-icon shape=\"layers\" [style.color]=\"isDefaultChannel ? '#aaa' : (channelCode | stringToColor)\"></clr-icon>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}button :host{margin-bottom:-1px}clr-icon{margin-right:6px}\n"]
            },] }
];
ChannelBadgeComponent.propDecorators = {
    channelCode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1iYWRnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2NoYW5uZWwtYmFkZ2UvY2hhbm5lbC1iYWRnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFRNUUsTUFBTSxPQUFPLHFCQUFxQjtJQUU5QixJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssb0JBQW9CLENBQUM7SUFDckQsQ0FBQzs7O1lBVkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLGdJQUE2QztnQkFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7MEJBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX0NIQU5ORUxfQ09ERSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLWNvbnN0YW50cyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNoYW5uZWwtYmFkZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaGFubmVsLWJhZGdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGFubmVsLWJhZGdlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWxCYWRnZUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgY2hhbm5lbENvZGU6IHN0cmluZztcbiAgICBnZXQgaXNEZWZhdWx0Q2hhbm5lbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbENvZGUgPT09IERFRkFVTFRfQ0hBTk5FTF9DT0RFO1xuICAgIH1cbn1cbiJdfQ==
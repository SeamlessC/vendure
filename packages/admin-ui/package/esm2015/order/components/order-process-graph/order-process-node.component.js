import { ChangeDetectionStrategy, Component, ElementRef, Input, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NODE_HEIGHT } from './constants';
export class OrderProcessNodeComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.active$ = new BehaviorSubject(false);
        this.activeTarget$ = new BehaviorSubject(false);
        this.isCancellable = false;
        // We use a class field here to prevent the
        // i18n extractor from extracting a "Cancelled" key
        this.cancelledState = 'Cancelled';
    }
    ngOnChanges(changes) {
        this.isCancellable = !!this.node.to.find((s) => s.name === 'Cancelled');
        if (changes.active) {
            this.active$.next(this.active);
        }
    }
    getPos(origin = 'top') {
        var _a, _b;
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const nodeHeight = (_b = (_a = this.elementRef.nativeElement.querySelector('.node')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
        return {
            x: 10,
            y: this.index * NODE_HEIGHT + (origin === 'bottom' ? nodeHeight : 0),
        };
    }
    getStyle() {
        const pos = this.getPos();
        return {
            'top.px': pos.y,
            'left.px': pos.x,
        };
    }
}
OrderProcessNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-node',
                template: "<div class=\"node-wrapper\" [ngStyle]=\"getStyle()\" [class.active]=\"active$ | async\">\n    <div\n        class=\"node\"\n        [class.active-target]=\"activeTarget$ | async\"\n    >\n        {{ node.name | stateI18nToken | translate }}\n    </div>\n    <div class=\"cancelled-wrapper\" *ngIf=\"isCancellable\">\n        <div class=\"cancelled-edge\">\n        </div>\n        <clr-icon shape=\"dot-circle\"></clr-icon>\n        <div class=\"cancelled-node\">\n            {{ cancelledState | stateI18nToken | translate }}\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.node-wrapper{position:absolute;z-index:1;display:flex;align-items:center}.node{display:inline-block;border:2px solid var(--color-component-border-200);border-radius:3px;padding:3px 6px;z-index:1;background-color:var(--color-component-bg-100);opacity:.7;transition:opacity .2s,background-color .2s,color .2s;cursor:default}.node.active-target{border-color:var(--color-primary-500);opacity:.9}.cancelled-wrapper{display:flex;align-items:center;color:var(--color-grey-300);transition:color .2s,opacity .2s;opacity:.7}.cancelled-edge{width:48px;height:2px;background-color:var(--color-component-bg-300);transition:background-color .2s}clr-icon{margin-left:-1px}.cancelled-node{margin-left:6px}.active .cancelled-wrapper{opacity:1}.active .node{opacity:1;background-color:var(--color-primary-600);border-color:var(--color-primary-600);color:var(--color-primary-100)}.active .cancelled-wrapper{color:var(--color-error-500)}.active .cancelled-edge{background-color:var(--color-error-500)}\n"]
            },] }
];
OrderProcessNodeComponent.ctorParameters = () => [
    { type: ElementRef }
];
OrderProcessNodeComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    active: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHJvY2Vzcy1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItcHJvY2Vzcy1ncmFwaC9vcmRlci1wcm9jZXNzLW5vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEdBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUzFDLE1BQU0sT0FBTyx5QkFBeUI7SUFXbEMsWUFBb0IsVUFBc0M7UUFBdEMsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFQMUQsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQzlDLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDcEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsMkNBQTJDO1FBQzNDLG1EQUFtRDtRQUNuRCxtQkFBYyxHQUFHLFdBQVcsQ0FBQztJQUVnQyxDQUFDO0lBRTlELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDeEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBMkIsS0FBSzs7UUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNuRSxNQUFNLFVBQVUsR0FDWixNQUFBLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxxQkFBcUIsR0FBRyxNQUFNLG1DQUFJLENBQUMsQ0FBQztRQUM5RixPQUFPO1lBQ0gsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RSxDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsT0FBTztZQUNILFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNmLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNuQixDQUFDO0lBQ04sQ0FBQzs7O1lBMUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxna0JBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWZHLFVBQVU7OzttQkFpQlQsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOT0RFX0hFSUdIVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFN0YXRlTm9kZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1wcm9jZXNzLW5vZGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1wcm9jZXNzLW5vZGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLXByb2Nlc3Mtbm9kZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclByb2Nlc3NOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBub2RlOiBTdGF0ZU5vZGU7XG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG4gICAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGFjdGl2ZVRhcmdldCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBpc0NhbmNlbGxhYmxlID0gZmFsc2U7XG4gICAgLy8gV2UgdXNlIGEgY2xhc3MgZmllbGQgaGVyZSB0byBwcmV2ZW50IHRoZVxuICAgIC8vIGkxOG4gZXh0cmFjdG9yIGZyb20gZXh0cmFjdGluZyBhIFwiQ2FuY2VsbGVkXCIga2V5XG4gICAgY2FuY2VsbGVkU3RhdGUgPSAnQ2FuY2VsbGVkJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHt9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuaXNDYW5jZWxsYWJsZSA9ICEhdGhpcy5ub2RlLnRvLmZpbmQoKHMpID0+IHMubmFtZSA9PT0gJ0NhbmNlbGxlZCcpO1xuICAgICAgICBpZiAoY2hhbmdlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuYWN0aXZlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBvcyhvcmlnaW46ICd0b3AnIHwgJ2JvdHRvbScgPSAndG9wJyk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgbm9kZUhlaWdodCA9XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZScpPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgPz8gMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IDEwLFxuICAgICAgICAgICAgeTogdGhpcy5pbmRleCAqIE5PREVfSEVJR0hUICsgKG9yaWdpbiA9PT0gJ2JvdHRvbScgPyBub2RlSGVpZ2h0IDogMCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAndG9wLnB4JzogcG9zLnksXG4gICAgICAgICAgICAnbGVmdC5weCc6IHBvcy54LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==
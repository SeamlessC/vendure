import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, ViewChildren, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NODE_HEIGHT } from './constants';
import { OrderProcessNodeComponent } from './order-process-node.component';
export class OrderProcessGraphComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.setActiveState$ = new BehaviorSubject(undefined);
        this.nodes = [];
        this.edges = [];
    }
    get outerHeight() {
        return this.nodes.length * NODE_HEIGHT;
    }
    ngOnInit() {
        this.setActiveState$.next(this.initialState);
        this.activeState$ = this.setActiveState$.pipe(debounceTime(150));
    }
    ngOnChanges(changes) {
        this.populateNodes();
    }
    ngAfterViewInit() {
        setTimeout(() => this.populateEdges());
    }
    onMouseOver(stateName) {
        this.setActiveState$.next(stateName);
    }
    onMouseOut() {
        this.setActiveState$.next(this.initialState);
    }
    getNodeFor(state) {
        if (this.nodeComponents) {
            return this.nodeComponents.find((n) => n.node.name === state);
        }
    }
    populateNodes() {
        var _a, _b;
        const stateNodeMap = new Map();
        for (const state of this.states) {
            stateNodeMap.set(state.name, {
                name: state.name,
                to: [],
            });
        }
        for (const [name, stateNode] of stateNodeMap.entries()) {
            const targets = (_b = (_a = this.states.find((s) => s.name === name)) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : [];
            for (const target of targets) {
                const targetNode = stateNodeMap.get(target);
                if (targetNode) {
                    stateNode.to.push(targetNode);
                }
            }
        }
        this.nodes = [...stateNodeMap.values()].filter((n) => n.name !== 'Cancelled');
    }
    populateEdges() {
        for (const node of this.nodes) {
            const nodeCmp = this.getNodeFor(node.name);
            let index = 0;
            for (const to of node.to) {
                const toCmp = this.getNodeFor(to.name);
                if (nodeCmp && toCmp && nodeCmp !== toCmp) {
                    this.edges.push({
                        to: toCmp,
                        from: nodeCmp,
                        index,
                    });
                    index++;
                }
            }
        }
        this.edges = [...this.edges];
        this.changeDetector.markForCheck();
    }
}
OrderProcessGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-graph',
                template: "<ng-container *ngFor=\"let state of nodes; let i = index\">\n    <vdr-order-process-node\n        [node]=\"state\"\n        [index]=\"i\"\n        [active]=\"(activeState$ | async) === state.name\"\n        (mouseenter)=\"onMouseOver(state.name)\"\n        (mouseleave)=\"onMouseOut()\"\n    ></vdr-order-process-node>\n</ng-container>\n<ng-container *ngFor=\"let edge of edges\">\n    <vdr-order-process-edge [from]=\"edge.from\" [to]=\"edge.to\" [index]=\"edge.index\"></vdr-order-process-edge>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;border:1px hotpink;margin:20px;padding:12px;position:relative}.state-row{display:flex}\n"]
            },] }
];
OrderProcessGraphComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OrderProcessGraphComponent.propDecorators = {
    states: [{ type: Input }],
    initialState: [{ type: Input }],
    nodeComponents: [{ type: ViewChildren, args: [OrderProcessNodeComponent,] }],
    outerHeight: [{ type: HostBinding, args: ['style.height.px',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHJvY2Vzcy1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL29yZGVyLXByb2Nlc3MtZ3JhcGgvb3JkZXItcHJvY2Vzcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBS0wsWUFBWSxHQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFTM0UsTUFBTSxPQUFPLDBCQUEwQjtJQVVuQyxZQUFvQixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFQckQsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsU0FBUyxDQUFDLENBQUM7UUFFckUsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFDeEIsVUFBSyxHQUE2RixFQUFFLENBQUM7SUFJN0MsQ0FBQztJQUV6RCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFF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Q0FBQztJQUN2QyxDQUFDOzs7WUF6RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLCtnQkFBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBdkJHLGlCQUFpQjs7O3FCQXlCaEIsS0FBSzsyQkFDTCxLQUFLOzZCQU1MLFlBQVksU0FBQyx5QkFBeUI7MEJBSXRDLFdBQVcsU0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyUHJvY2Vzc1N0YXRlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTk9ERV9IRUlHSFQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBPcmRlclByb2Nlc3NOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1wcm9jZXNzLW5vZGUuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXRlTm9kZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1wcm9jZXNzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItcHJvY2Vzcy1ncmFwaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItcHJvY2Vzcy1ncmFwaC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclByb2Nlc3NHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBzdGF0ZXM6IE9yZGVyUHJvY2Vzc1N0YXRlW107XG4gICAgQElucHV0KCkgaW5pdGlhbFN0YXRlPzogc3RyaW5nO1xuICAgIHNldEFjdGl2ZVN0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGFjdGl2ZVN0YXRlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIG5vZGVzOiBTdGF0ZU5vZGVbXSA9IFtdO1xuICAgIGVkZ2VzOiBBcnJheTx7IGZyb206IE9yZGVyUHJvY2Vzc05vZGVDb21wb25lbnQ7IHRvOiBPcmRlclByb2Nlc3NOb2RlQ29tcG9uZW50OyBpbmRleDogbnVtYmVyIH0+ID0gW107XG5cbiAgICBAVmlld0NoaWxkcmVuKE9yZGVyUHJvY2Vzc05vZGVDb21wb25lbnQpIG5vZGVDb21wb25lbnRzOiBRdWVyeUxpc3Q8T3JkZXJQcm9jZXNzTm9kZUNvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgICBnZXQgb3V0ZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoICogTk9ERV9IRUlHSFQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU3RhdGUkLm5leHQodGhpcy5pbml0aWFsU3RhdGUpO1xuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRlJCA9IHRoaXMuc2V0QWN0aXZlU3RhdGUkLnBpcGUoZGVib3VuY2VUaW1lKDE1MCkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU5vZGVzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucG9wdWxhdGVFZGdlcygpKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlT3ZlcihzdGF0ZU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVN0YXRlJC5uZXh0KHN0YXRlTmFtZSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU91dCgpIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVTdGF0ZSQubmV4dCh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUZvcihzdGF0ZTogc3RyaW5nKTogT3JkZXJQcm9jZXNzTm9kZUNvbXBvbmVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVDb21wb25lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlQ29tcG9uZW50cy5maW5kKChuKSA9PiBuLm5vZGUubmFtZSA9PT0gc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU5vZGVzKCkge1xuICAgICAgICBjb25zdCBzdGF0ZU5vZGVNYXAgPSBuZXcgTWFwPHN0cmluZywgU3RhdGVOb2RlPigpO1xuICAgICAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIHRoaXMuc3RhdGVzKSB7XG4gICAgICAgICAgICBzdGF0ZU5vZGVNYXAuc2V0KHN0YXRlLm5hbWUsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgICAgICAgICAgICAgIHRvOiBbXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgc3RhdGVOb2RlXSBvZiBzdGF0ZU5vZGVNYXAuZW50cmllcygpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRzID0gdGhpcy5zdGF0ZXMuZmluZCgocykgPT4gcy5uYW1lID09PSBuYW1lKT8udG8gPz8gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHN0YXRlTm9kZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5vZGUudG8ucHVzaCh0YXJnZXROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlcyA9IFsuLi5zdGF0ZU5vZGVNYXAudmFsdWVzKCldLmZpbHRlcigobikgPT4gbi5uYW1lICE9PSAnQ2FuY2VsbGVkJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZUVkZ2VzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUNtcCA9IHRoaXMuZ2V0Tm9kZUZvcihub2RlLm5hbWUpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdG8gb2Ygbm9kZS50bykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvQ21wID0gdGhpcy5nZXROb2RlRm9yKHRvLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlQ21wICYmIHRvQ21wICYmIG5vZGVDbXAgIT09IHRvQ21wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogdG9DbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBub2RlQ21wLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkZ2VzID0gWy4uLnRoaXMuZWRnZXNdO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
export class OrderProcessEdgeComponent {
    ngOnInit() {
        this.active$ = this.from.active$
            .asObservable()
            .pipe(tap((active) => this.to.activeTarget$.next(active)));
    }
    getStyle() {
        const direction = this.from.index < this.to.index ? 'down' : 'up';
        const startPos = this.from.getPos(direction === 'down' ? 'bottom' : 'top');
        const endPos = this.to.getPos(direction === 'down' ? 'top' : 'bottom');
        const dX = Math.abs(startPos.x - endPos.x);
        const dY = Math.abs(startPos.y - endPos.y);
        const length = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        return Object.assign({ 'top.px': startPos.y, 'left.px': startPos.x + (direction === 'down' ? 10 : 40) + this.index * 12, 'height.px': length, 'width.px': 1 }, (direction === 'up'
            ? {
                transform: 'rotateZ(180deg)',
                'transform-origin': 'top',
            }
            : {}));
    }
}
OrderProcessEdgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-edge',
                template: "<div\n    [attr.data-from]=\"from.node.name\"\n    [attr.data-to]=\"to.node.name\"\n    [ngStyle]=\"getStyle()\"\n    [class.active]=\"active$ | async\"\n    class=\"edge\">\n    <clr-icon shape=\"arrow\" flip=\"vertical\" class=\"arrow\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".edge{position:absolute;border:1px solid var(--color-component-border-200);background-color:var(--color-component-bg-300);opacity:.3;transition:border .2s,opacity .2s,background-color .2s}.edge.active{border-color:var(--color-primary-500);background-color:var(--color-primary-500);opacity:1}.edge.active .arrow{color:var(--color-primary-500)}.edge .arrow{position:absolute;bottom:-4px;left:-8px;color:var(--color-grey-300)}\n"]
            },] }
];
OrderProcessEdgeComponent.propDecorators = {
    from: [{ type: Input }],
    to: [{ type: Input }],
    index: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHJvY2Vzcy1lZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItcHJvY2Vzcy1ncmFwaC9vcmRlci1wcm9jZXNzLWVkZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVVyQyxNQUFNLE9BQU8seUJBQXlCO0lBTWxDLFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzthQUMzQixZQUFZLEVBQUU7YUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFBLEVBQUUsRUFBSSxDQUFDLENBQUEsR0FBRyxTQUFBLEVBQUUsRUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQzVDLHVCQUNJLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNwQixTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQzFFLFdBQVcsRUFBRSxNQUFNLEVBQ25CLFVBQVUsRUFBRSxDQUFDLElBQ1YsQ0FBQyxTQUFTLEtBQUssSUFBSTtZQUNsQixDQUFDLENBQUM7Z0JBQ0ksU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsa0JBQWtCLEVBQUUsS0FBSzthQUM1QjtZQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDWDtJQUNOLENBQUM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsZ1JBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzttQkFFSSxLQUFLO2lCQUNMLEtBQUs7b0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT3JkZXJQcm9jZXNzTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItcHJvY2Vzcy1ub2RlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLXByb2Nlc3MtZWRnZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLXByb2Nlc3MtZWRnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItcHJvY2Vzcy1lZGdlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyUHJvY2Vzc0VkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZyb206IE9yZGVyUHJvY2Vzc05vZGVDb21wb25lbnQ7XG4gICAgQElucHV0KCkgdG86IE9yZGVyUHJvY2Vzc05vZGVDb21wb25lbnQ7XG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgICBhY3RpdmUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlJCA9IHRoaXMuZnJvbS5hY3RpdmUkXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRhcCgoYWN0aXZlKSA9PiB0aGlzLnRvLmFjdGl2ZVRhcmdldCQubmV4dChhY3RpdmUpKSk7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZnJvbS5pbmRleCA8IHRoaXMudG8uaW5kZXggPyAnZG93bicgOiAndXAnO1xuICAgICAgICBjb25zdCBzdGFydFBvcyA9IHRoaXMuZnJvbS5nZXRQb3MoZGlyZWN0aW9uID09PSAnZG93bicgPyAnYm90dG9tJyA6ICd0b3AnKTtcbiAgICAgICAgY29uc3QgZW5kUG9zID0gdGhpcy50by5nZXRQb3MoZGlyZWN0aW9uID09PSAnZG93bicgPyAndG9wJyA6ICdib3R0b20nKTtcbiAgICAgICAgY29uc3QgZFggPSBNYXRoLmFicyhzdGFydFBvcy54IC0gZW5kUG9zLngpO1xuICAgICAgICBjb25zdCBkWSA9IE1hdGguYWJzKHN0YXJ0UG9zLnkgLSBlbmRQb3MueSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydChkWCAqKiAyICsgZFkgKiogMik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAndG9wLnB4Jzogc3RhcnRQb3MueSxcbiAgICAgICAgICAgICdsZWZ0LnB4Jzogc3RhcnRQb3MueCArIChkaXJlY3Rpb24gPT09ICdkb3duJyA/IDEwIDogNDApICsgdGhpcy5pbmRleCAqIDEyLFxuICAgICAgICAgICAgJ2hlaWdodC5weCc6IGxlbmd0aCxcbiAgICAgICAgICAgICd3aWR0aC5weCc6IDEsXG4gICAgICAgICAgICAuLi4oZGlyZWN0aW9uID09PSAndXAnXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlWigxODBkZWcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtLW9yaWdpbic6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==
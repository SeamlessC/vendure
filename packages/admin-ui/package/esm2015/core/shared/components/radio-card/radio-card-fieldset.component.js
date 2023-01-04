import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
export class RadioCardFieldsetComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.selectItem = new EventEmitter();
        this.groupName = 'radio-group-' + Math.random().toString(36);
        this.selectedIdChange$ = new Subject();
        this.focussedId = undefined;
        this.idChange$ = new Subject();
    }
    ngOnInit() {
        this.subscription = this.idChange$
            .pipe(throttleTime(200))
            .subscribe(item => this.selectItem.emit(item));
    }
    ngOnChanges(changes) {
        if ('selectedItemId' in changes) {
            this.selectedIdChange$.next(this.selectedItemId);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isSelected(item) {
        return this.selectedItemId === this.idFn(item);
    }
    isFocussed(item) {
        return this.focussedId === this.idFn(item);
    }
    selectChanged(item) {
        this.idChange$.next(item);
    }
    setFocussedId(item) {
        this.focussedId = item && this.idFn(item);
    }
}
RadioCardFieldsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-radio-card-fieldset',
                template: `<fieldset><ng-content></ng-content></fieldset> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["fieldset{display:flex;align-items:flex-start}\n"]
            },] }
];
RadioCardFieldsetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
RadioCardFieldsetComponent.propDecorators = {
    selectedItemId: [{ type: Input }],
    idFn: [{ type: Input }],
    selectItem: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tY2FyZC1maWVsZHNldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3JhZGlvLWNhcmQvcmFkaW8tY2FyZC1maWVsZHNldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBZ0IsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRNUQsTUFBTSxPQUFPLDBCQUEwQjtJQVVuQyxZQUFvQixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFQM0MsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFDN0MsY0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDMUMsZUFBVSxHQUF1QixTQUFTLENBQUM7UUFDbkMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7SUFHbUIsQ0FBQztJQUV6RCxRQUFRO1FBQ0osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLGdCQUFnQixJQUFJLE9BQU8sRUFBRTtZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQU87UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQU87UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQU87UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFtQjtRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7OztZQWxESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLGlEQUFpRDtnQkFFM0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFwQkcsaUJBQWlCOzs7NkJBc0JoQixLQUFLO21CQUNMLEtBQUs7eUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcmFkaW8tY2FyZC1maWVsZHNldCcsXG4gICAgdGVtcGxhdGU6IGA8ZmllbGRzZXQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZmllbGRzZXQ+IGAsXG4gICAgc3R5bGVVcmxzOiBbJ3JhZGlvLWNhcmQtZmllbGRzZXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9DYXJkRmllbGRzZXRDb21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEl0ZW1JZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGlkRm46IChpdGVtOiBUKSA9PiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG4gICAgZ3JvdXBOYW1lID0gJ3JhZGlvLWdyb3VwLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KTtcbiAgICBzZWxlY3RlZElkQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBmb2N1c3NlZElkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBpZENoYW5nZSQgPSBuZXcgU3ViamVjdDxUPigpO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuaWRDaGFuZ2UkXG4gICAgICAgICAgICAucGlwZSh0aHJvdHRsZVRpbWUoMjAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaXRlbSA9PiB0aGlzLnNlbGVjdEl0ZW0uZW1pdChpdGVtKSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoJ3NlbGVjdGVkSXRlbUlkJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWRDaGFuZ2UkLm5leHQodGhpcy5zZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbUlkID09PSB0aGlzLmlkRm4oaXRlbSk7XG4gICAgfVxuXG4gICAgaXNGb2N1c3NlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3Vzc2VkSWQgPT09IHRoaXMuaWRGbihpdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RDaGFuZ2VkKGl0ZW06IFQpIHtcbiAgICAgICAgdGhpcy5pZENoYW5nZSQubmV4dChpdGVtKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1c3NlZElkKGl0ZW06IFQgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c3NlZElkID0gaXRlbSAmJiB0aGlzLmlkRm4oaXRlbSk7XG4gICAgfVxufVxuIl19
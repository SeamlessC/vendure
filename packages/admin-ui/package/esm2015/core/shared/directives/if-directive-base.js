import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
/**
 * A base class for implementing custom *ngIf-style structural directives based on custom conditions.
 *
 * @dynamic
 */
export class IfDirectiveBase {
    constructor(_viewContainer, templateRef, updateViewFn) {
        this._viewContainer = _viewContainer;
        this.updateViewFn = updateViewFn;
        this.updateArgs$ = new BehaviorSubject([]);
        this._thenTemplateRef = null;
        this._elseTemplateRef = null;
        this._thenViewRef = null;
        this._elseViewRef = null;
        this._thenTemplateRef = templateRef;
    }
    ngOnInit() {
        this.subscription = this.updateArgs$
            .pipe(switchMap(args => this.updateViewFn(...args)))
            .subscribe(result => {
            if (result) {
                this.showThen();
            }
            else {
                this.showElse();
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    setElseTemplate(templateRef) {
        this.assertTemplate('vdrIfPermissionsElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null; // clear previous view if any.
    }
    showThen() {
        if (!this._thenViewRef) {
            this._viewContainer.clear();
            this._elseViewRef = null;
            if (this._thenTemplateRef) {
                this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
            }
        }
    }
    showElse() {
        if (!this._elseViewRef) {
            this._viewContainer.clear();
            this._thenViewRef = null;
            if (this._elseTemplateRef) {
                this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
            }
        }
    }
    assertTemplate(property, templateRef) {
        const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
        if (!isTemplateRefOrNull) {
            throw new Error(`${property} must be a TemplateRef, but received '${templateRef}'.`);
        }
    }
}
IfDirectiveBase.decorators = [
    { type: Directive }
];
IfDirectiveBase.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: Function }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZGlyZWN0aXZlLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9kaXJlY3RpdmVzL2lmLWRpcmVjdGl2ZS1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXNDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsZUFBZSxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxlQUFlO0lBUXhCLFlBQ1ksY0FBZ0MsRUFDeEMsV0FBNkIsRUFDckIsWUFBb0Q7UUFGcEQsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBRWhDLGlCQUFZLEdBQVosWUFBWSxDQUF3QztRQVZ0RCxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFPLEVBQVMsQ0FBQyxDQUFDO1FBQzVDLHFCQUFnQixHQUE0QixJQUFJLENBQUM7UUFDMUQscUJBQWdCLEdBQTRCLElBQUksQ0FBQztRQUNqRCxpQkFBWSxHQUFnQyxJQUFJLENBQUM7UUFDakQsaUJBQVksR0FBZ0MsSUFBSSxDQUFDO1FBUXJELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuRCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFUyxlQUFlLENBQUMsV0FBb0M7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsOEJBQThCO0lBQzVELENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3JGO1NBQ0o7SUFDTCxDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNyRjtTQUNKO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFnQixFQUFFLFdBQW9DO1FBQ3pFLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxRQUFRLHlDQUF5QyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQ3hGO0lBQ0wsQ0FBQzs7O1lBbEVKLFNBQVM7OztZQVQyRCxnQkFBZ0I7WUFBN0IsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIGZvciBpbXBsZW1lbnRpbmcgY3VzdG9tICpuZ0lmLXN0eWxlIHN0cnVjdHVyYWwgZGlyZWN0aXZlcyBiYXNlZCBvbiBjdXN0b20gY29uZGl0aW9ucy5cbiAqXG4gKiBAZHluYW1pY1xuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBJZkRpcmVjdGl2ZUJhc2U8QXJncyBleHRlbmRzIGFueVtdPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQXJncyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFyZ3M+KFtdIGFzIGFueSk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfdGhlblRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZWxzZVRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdGhlblZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZWxzZVZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVWaWV3Rm46ICguLi5hcmdzOiBBcmdzKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+LFxuICAgICkge1xuICAgICAgICB0aGlzLl90aGVuVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnVwZGF0ZUFyZ3MkXG4gICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAoYXJncyA9PiB0aGlzLnVwZGF0ZVZpZXdGbiguLi5hcmdzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaGVuKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RWxzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0RWxzZVRlbXBsYXRlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCkge1xuICAgICAgICB0aGlzLmFzc2VydFRlbXBsYXRlKCd2ZHJJZlBlcm1pc3Npb25zRWxzZScsIHRlbXBsYXRlUmVmKTtcbiAgICAgICAgdGhpcy5fZWxzZVRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XG4gICAgICAgIHRoaXMuX2Vsc2VWaWV3UmVmID0gbnVsbDsgLy8gY2xlYXIgcHJldmlvdXMgdmlldyBpZiBhbnkuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VGhlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90aGVuVmlld1JlZikge1xuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5fZWxzZVZpZXdSZWYgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RoZW5UZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGhlblRlbXBsYXRlUmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0Vsc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZWxzZVZpZXdSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbHNlVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbHNlVmlld1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX2Vsc2VUZW1wbGF0ZVJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzc2VydFRlbXBsYXRlKHByb3BlcnR5OiBzdHJpbmcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc1RlbXBsYXRlUmVmT3JOdWxsID0gISEoIXRlbXBsYXRlUmVmIHx8IHRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyk7XG4gICAgICAgIGlmICghaXNUZW1wbGF0ZVJlZk9yTnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Byb3BlcnR5fSBtdXN0IGJlIGEgVGVtcGxhdGVSZWYsIGJ1dCByZWNlaXZlZCAnJHt0ZW1wbGF0ZVJlZn0nLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
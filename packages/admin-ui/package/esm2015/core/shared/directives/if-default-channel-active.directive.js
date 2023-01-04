import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { tap } from 'rxjs/operators';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
export class IfDefaultChannelActiveDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService, changeDetectorRef) {
        super(_viewContainer, templateRef, () => {
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => this.defaultChannelIsActive(userStatus))
                .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        });
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfMultichannelElse(templateRef) {
        this.setElseTemplate(templateRef);
    }
    defaultChannelIsActive(userStatus) {
        const defaultChannel = userStatus.channels.find(c => c.code === DEFAULT_CHANNEL_CODE);
        return !!(defaultChannel && userStatus.activeChannelId === defaultChannel.id);
    }
}
IfDefaultChannelActiveDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfDefaultChannelActive]',
            },] }
];
IfDefaultChannelActiveDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService },
    { type: ChangeDetectorRef }
];
IfDefaultChannelActiveDirective.propDecorators = {
    vdrIfMultichannelElse: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZGVmYXVsdC1jaGFubmVsLWFjdGl2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9kaXJlY3RpdmVzL2lmLWRlZmF1bHQtY2hhbm5lbC1hY3RpdmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUt0RCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsZUFBbUI7SUFDcEUsWUFDSSxjQUFnQyxFQUNoQyxXQUE2QixFQUNyQixXQUF3QixFQUN4QixpQkFBb0M7UUFFNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2lCQUN6QixVQUFVLEVBQUU7aUJBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFSSyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBUWhELENBQUM7SUFFRDs7T0FFRztJQUNILElBQ0kscUJBQXFCLENBQUMsV0FBb0M7UUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sc0JBQXNCLENBQUMsVUFBc0I7UUFDakQsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLENBQUM7UUFFdEYsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksVUFBVSxDQUFDLGVBQWUsS0FBSyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7O1lBOUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOzs7WUFYMEQsZ0JBQWdCO1lBQTdCLFdBQVc7WUFLaEQsV0FBVztZQUxYLGlCQUFpQjs7O29DQThCckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBVc2VyU3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbmltcG9ydCB7IElmRGlyZWN0aXZlQmFzZSB9IGZyb20gJy4vaWYtZGlyZWN0aXZlLWJhc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2ZHJJZkRlZmF1bHRDaGFubmVsQWN0aXZlXScsXG59KVxuZXhwb3J0IGNsYXNzIElmRGVmYXVsdENoYW5uZWxBY3RpdmVEaXJlY3RpdmUgZXh0ZW5kcyBJZkRpcmVjdGl2ZUJhc2U8W10+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKF92aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZiwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oKHsgdXNlclN0YXR1cyB9KSA9PiB0aGlzLmRlZmF1bHRDaGFubmVsSXNBY3RpdmUodXNlclN0YXR1cykpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFwKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB0ZW1wbGF0ZSB0byBzaG93IGlmIHRoZSBjdXJyZW50IHVzZXIgZG9lcyBub3QgaGF2ZSB0aGUgc3BlY2lmaWVkIHBlcm1pc3Npb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgdmRySWZNdWx0aWNoYW5uZWxFbHNlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCkge1xuICAgICAgICB0aGlzLnNldEVsc2VUZW1wbGF0ZSh0ZW1wbGF0ZVJlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2hhbm5lbElzQWN0aXZlKHVzZXJTdGF0dXM6IFVzZXJTdGF0dXMpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENoYW5uZWwgPSB1c2VyU3RhdHVzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLmNvZGUgPT09IERFRkFVTFRfQ0hBTk5FTF9DT0RFKTtcblxuICAgICAgICByZXR1cm4gISEoZGVmYXVsdENoYW5uZWwgJiYgdXNlclN0YXR1cy5hY3RpdmVDaGFubmVsSWQgPT09IGRlZmF1bHRDaGFubmVsLmlkKTtcbiAgICB9XG59XG4iXX0=
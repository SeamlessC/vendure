import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class ChannelAssignmentControlComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.multiple = true;
        this.includeDefaultChannel = true;
        this.disableChannelIds = [];
        this.value = [];
        this.disabled = false;
    }
    ngOnInit() {
        this.channels$ = this.dataService.client.userStatus().single$.pipe(map(({ userStatus }) => userStatus.channels.filter(c => this.includeDefaultChannel ? true : c.code !== DEFAULT_CHANNEL_CODE)), tap(channels => {
            if (!this.channels) {
                this.channels = channels;
                this.mapIncomingValueToChannels(this.lastIncomingValue);
            }
            else {
                this.channels = channels;
            }
        }));
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        this.lastIncomingValue = obj;
        this.mapIncomingValueToChannels(obj);
    }
    focussed() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    channelIsDisabled(id) {
        return this.disableChannelIds.includes(id);
    }
    valueChanged(value) {
        if (Array.isArray(value)) {
            this.onChange(value.map(c => c.id));
        }
        else {
            this.onChange([value ? value.id : undefined]);
        }
    }
    compareFn(c1, c2) {
        const c1id = typeof c1 === 'string' ? c1 : c1.id;
        const c2id = typeof c2 === 'string' ? c2 : c2.id;
        return c1id === c2id;
    }
    mapIncomingValueToChannels(value) {
        var _a;
        if (Array.isArray(value)) {
            if (typeof value[0] === 'string') {
                this.value = value
                    .map(id => { var _a; return (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === id); })
                    .filter(notNullOrUndefined);
            }
            else {
                this.value = value;
            }
        }
        else {
            if (typeof value === 'string') {
                const channel = (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === value);
                if (channel) {
                    this.value = [channel];
                }
            }
            else if (value && value.id) {
                this.value = [value];
            }
        }
    }
}
ChannelAssignmentControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-assignment-control',
                template: "<ng-select\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"multiple\"\n    [ngModel]=\"value\"\n    [clearable]=\"false\"\n    [searchable]=\"false\"\n    [disabled]=\"disabled\"\n    [compareWith]=\"compareFn\"\n    (focus)=\"focussed()\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        <span class=\"channel-label\">{{ item.code | channelCodeToLabel | translate }}</span>\n    </ng-template>\n    <ng-option *ngFor=\"let item of channels$ | async\" [value]=\"item\" [disabled]=\"channelIsDisabled(item.id)\">\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        {{ item.code | channelCodeToLabel | translate }}\n    </ng-option>\n</ng-select>\n\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ChannelAssignmentControlComponent,
                        multi: true,
                    },
                ],
                styles: [":host{min-width:200px}:host.clr-input{border-bottom:none;padding:0}::ng-deep .ng-value>vdr-channel-badge,::ng-deep .ng-option>vdr-channel-badge{margin-bottom:-1px}::ng-deep .ng-value>vdr-channel-badge{margin-left:6px}.channel-label{margin-right:6px}\n"]
            },] }
];
ChannelAssignmentControlComponent.ctorParameters = () => [
    { type: DataService }
];
ChannelAssignmentControlComponent.propDecorators = {
    multiple: [{ type: Input }],
    includeDefaultChannel: [{ type: Input }],
    disableChannelIds: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1hc3NpZ25tZW50LWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbC9jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBZW5FLE1BQU0sT0FBTyxpQ0FBaUM7SUFhMUMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFabkMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0Isc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBRzFDLFVBQUssR0FBeUIsRUFBRSxDQUFDO1FBQ2pDLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFNOEIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM5RCxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFD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QUFLLENBQUM7YUFDdEI7U0FDSjthQUFNO1lBQ0gsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDekQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQjthQUNKO2lCQUFNLElBQUksS0FBSyxJQUFLLEtBQWEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFZLENBQUMsQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQzs7O1lBMUdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxxOEJBQTBEO2dCQUUxRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztnQkFDaEQsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxpQ0FBaUM7d0JBQzlDLEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKOzthQUNKOzs7WUFkUSxXQUFXOzs7dUJBZ0JmLEtBQUs7b0NBQ0wsS0FBSztnQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENoYW5uZWwsIEN1cnJlbnRVc2VyQ2hhbm5lbCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoYW5uZWwtYXNzaWdubWVudC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogQ2hhbm5lbEFzc2lnbm1lbnRDb250cm9sQ29tcG9uZW50LFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhbm5lbEFzc2lnbm1lbnRDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgbXVsdGlwbGUgPSB0cnVlO1xuICAgIEBJbnB1dCgpIGluY2x1ZGVEZWZhdWx0Q2hhbm5lbCA9IHRydWU7XG4gICAgQElucHV0KCkgZGlzYWJsZUNoYW5uZWxJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjaGFubmVscyQ6IE9ic2VydmFibGU8Q3VycmVudFVzZXJDaGFubmVsW10+O1xuICAgIHZhbHVlOiBDdXJyZW50VXNlckNoYW5uZWxbXSA9IFtdO1xuICAgIGRpc2FibGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBjaGFubmVsczogQ3VycmVudFVzZXJDaGFubmVsW10gfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBsYXN0SW5jb21pbmdWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGFubmVscyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC51c2VyU3RhdHVzKCkuc2luZ2xlJC5waXBlKFxuICAgICAgICAgICAgbWFwKCh7IHVzZXJTdGF0dXMgfSkgPT5cbiAgICAgICAgICAgICAgICB1c2VyU3RhdHVzLmNoYW5uZWxzLmZpbHRlcihjID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jbHVkZURlZmF1bHRDaGFubmVsID8gdHJ1ZSA6IGMuY29kZSAhPT0gREVGQVVMVF9DSEFOTkVMX0NPREUsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YXAoY2hhbm5lbHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGFubmVscykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5uZWxzID0gY2hhbm5lbHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwSW5jb21pbmdWYWx1ZVRvQ2hhbm5lbHModGhpcy5sYXN0SW5jb21pbmdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFubmVscyA9IGNoYW5uZWxzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogdW5rbm93bik6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3RJbmNvbWluZ1ZhbHVlID0gb2JqO1xuICAgICAgICB0aGlzLm1hcEluY29taW5nVmFsdWVUb0NoYW5uZWxzKG9iaik7XG4gICAgfVxuXG4gICAgZm9jdXNzZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5uZWxJc0Rpc2FibGVkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZUNoYW5uZWxJZHMuaW5jbHVkZXMoaWQpO1xuICAgIH1cblxuICAgIHZhbHVlQ2hhbmdlZCh2YWx1ZTogQ3VycmVudFVzZXJDaGFubmVsW10gfCBDdXJyZW50VXNlckNoYW5uZWwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLm1hcChjID0+IGMuaWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoW3ZhbHVlID8gdmFsdWUuaWQgOiB1bmRlZmluZWRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhcmVGbihjMTogQ2hhbm5lbCB8IHN0cmluZywgYzI6IENoYW5uZWwgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYzFpZCA9IHR5cGVvZiBjMSA9PT0gJ3N0cmluZycgPyBjMSA6IGMxLmlkO1xuICAgICAgICBjb25zdCBjMmlkID0gdHlwZW9mIGMyID09PSAnc3RyaW5nJyA/IGMyIDogYzIuaWQ7XG4gICAgICAgIHJldHVybiBjMWlkID09PSBjMmlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwSW5jb21pbmdWYWx1ZVRvQ2hhbm5lbHModmFsdWU6IHVua25vd24pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAubWFwKGlkID0+IHRoaXMuY2hhbm5lbHM/LmZpbmQoYyA9PiBjLmlkID09PSBpZCkpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVscz8uZmluZChjID0+IGMuaWQgPT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW2NoYW5uZWxdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgKHZhbHVlIGFzIGFueSkuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW3ZhbHVlIGFzIGFueV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
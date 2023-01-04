import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService, NotificationService } from '@vendure/admin-ui/core';
import { combineLatest } from 'rxjs';
export class AssignToChannelDialogComponent {
    // assigned by ModalService.fromComponent() call
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.selectedChannelIdControl = new FormControl();
    }
    ngOnInit() {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        const allChannels$ = this.dataService.settings.getChannels().mapSingle(data => data.channels);
        combineLatest(activeChannelId$, allChannels$).subscribe(([activeChannelId, channels]) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.currentChannel = channels.find(c => c.id === activeChannelId);
            this.availableChannels = channels;
        });
        this.selectedChannelIdControl.valueChanges.subscribe(ids => {
            this.selectChannel(ids);
        });
    }
    selectChannel(channelIds) {
        this.selectedChannel = this.availableChannels.find(c => c.id === channelIds[0]);
    }
    assign() {
        const selectedChannel = this.selectedChannel;
        if (selectedChannel) {
            this.resolveWith(selectedChannel);
        }
    }
    cancel() {
        this.resolveWith();
    }
}
AssignToChannelDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-assign-to-channel-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.assign-to-channel' | translate }}\n</ng-template>\n<clr-input-container class=\"mb4\">\n    <label>{{ 'common.channel' | translate }}</label>\n    <vdr-channel-assignment-control\n        clrInput\n        [multiple]=\"false\"\n        [includeDefaultChannel]=\"false\"\n        [formControl]=\"selectedChannelIdControl\"\n    ></vdr-channel-assignment-control>\n</clr-input-container>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-channel-assignment-control{min-width:200px}\n"]
            },] }
];
AssignToChannelDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NpZ24tdG8tY2hhbm5lbC1kaWFsb2cvYXNzaWduLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUF1QixtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFRckMsTUFBTSxPQUFPLDhCQUE4QjtJQU92QyxnREFBZ0Q7SUFFaEQsWUFBb0IsV0FBd0IsRUFBVSxtQkFBd0M7UUFBMUUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSjlGLDZCQUF3QixHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFJb0QsQ0FBQztJQUVsRyxRQUFRO1FBQ0osTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDM0MsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RixhQUFhLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNwRixpREFBaUQ7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUUsQ0FBQztZQUNwRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBb0I7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0MsSUFBSSxlQUFlLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OztZQS9DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsNmhDQUF3RDtnQkFFeEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSUSxXQUFXO1lBQXVCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSwgRGlhbG9nLCBHZXRDaGFubmVscywgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NpZ24tdG8tY2hhbm5lbC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hc3NpZ24tdG8tY2hhbm5lbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2lnbi10by1jaGFubmVsLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NpZ25Ub0NoYW5uZWxEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERpYWxvZzxHZXRDaGFubmVscy5DaGFubmVscz4ge1xuICAgIHNlbGVjdGVkQ2hhbm5lbDogR2V0Q2hhbm5lbHMuQ2hhbm5lbHMgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIGN1cnJlbnRDaGFubmVsOiBHZXRDaGFubmVscy5DaGFubmVscztcbiAgICBhdmFpbGFibGVDaGFubmVsczogR2V0Q2hhbm5lbHMuQ2hhbm5lbHNbXTtcbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IEdldENoYW5uZWxzLkNoYW5uZWxzKSA9PiB2b2lkO1xuICAgIHNlbGVjdGVkQ2hhbm5lbElkQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gICAgLy8gYXNzaWduZWQgYnkgTW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoKSBjYWxsXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNoYW5uZWxJZCQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZSgoeyB1c2VyU3RhdHVzIH0pID0+IHVzZXJTdGF0dXMuYWN0aXZlQ2hhbm5lbElkKTtcbiAgICAgICAgY29uc3QgYWxsQ2hhbm5lbHMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5nZXRDaGFubmVscygpLm1hcFNpbmdsZShkYXRhID0+IGRhdGEuY2hhbm5lbHMpO1xuXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoYWN0aXZlQ2hhbm5lbElkJCwgYWxsQ2hhbm5lbHMkKS5zdWJzY3JpYmUoKFthY3RpdmVDaGFubmVsSWQsIGNoYW5uZWxzXSkgPT4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hhbm5lbCA9IGNoYW5uZWxzLmZpbmQoYyA9PiBjLmlkID09PSBhY3RpdmVDaGFubmVsSWQpITtcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlQ2hhbm5lbHMgPSBjaGFubmVscztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5uZWxJZENvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShpZHMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RDaGFubmVsKGlkcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdENoYW5uZWwoY2hhbm5lbElkczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5uZWwgPSB0aGlzLmF2YWlsYWJsZUNoYW5uZWxzLmZpbmQoYyA9PiBjLmlkID09PSBjaGFubmVsSWRzWzBdKTtcbiAgICB9XG5cbiAgICBhc3NpZ24oKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hhbm5lbCA9IHRoaXMuc2VsZWN0ZWRDaGFubmVsO1xuICAgICAgICBpZiAoc2VsZWN0ZWRDaGFubmVsKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHNlbGVjdGVkQ2hhbm5lbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG59XG4iXX0=
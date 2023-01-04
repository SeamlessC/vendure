import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { DataService } from '../../data/providers/data.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
export class ChannelSwitcherComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.displayFilterThreshold = 10;
        this.filterControl = new FormControl('');
    }
    ngOnInit() {
        const channels$ = this.dataService.client.userStatus().mapStream(data => data.userStatus.channels);
        const filterTerm$ = this.filterControl.valueChanges.pipe(startWith(''));
        this.channels$ = combineLatest(channels$, filterTerm$).pipe(map(([channels, filterTerm]) => {
            return filterTerm
                ? channels.filter(c => c.code.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase()))
                : channels;
        }));
        this.channelCount$ = channels$.pipe(map(channels => channels.length));
        const activeChannel$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.channels.find(c => c.id === data.userStatus.activeChannelId))
            .pipe(filter(notNullOrUndefined));
        this.activeChannelCode$ = activeChannel$.pipe(map(channel => channel.code));
    }
    setActiveChannel(channelId) {
        this.dataService.client.setActiveChannel(channelId).subscribe(({ setActiveChannel }) => {
            const activeChannel = setActiveChannel.channels.find(c => c.id === channelId);
            if (activeChannel) {
                this.localStorageService.set('activeChannelToken', activeChannel.token);
            }
            this.filterControl.patchValue('');
        });
    }
}
ChannelSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-switcher',
                template: "<ng-container>\n    <vdr-dropdown>\n        <button class=\"btn btn-link active-channel\" vdrDropdownTrigger>\n            <vdr-channel-badge [channelCode]=\"activeChannelCode$ | async\"></vdr-channel-badge>\n            <span class=\"active-channel\">{{\n                activeChannelCode$ | async | channelCodeToLabel | translate\n            }}</span>\n            <span class=\"trigger\"><clr-icon shape=\"caret down\"></clr-icon></span>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <input\n                *ngIf=\"((channelCount$ | async) || 0) >= displayFilterThreshold\"\n                [formControl]=\"filterControl\"\n                type=\"text\"\n                class=\"ml2 mr2\"\n                [placeholder]=\"'common.filter' | translate\"\n            />\n            <button\n                *ngFor=\"let channel of channels$ | async\"\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"setActiveChannel(channel.id)\"\n            >\n                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                {{ channel.code | channelCodeToLabel | translate }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.active-channel{color:var(--color-grey-200)}.active-channel clr-icon{color:#fff}\n"]
            },] }
];
ChannelSwitcherComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1zd2l0Y2hlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbXBvbmVudHMvY2hhbm5lbC1zd2l0Y2hlci9jaGFubmVsLXN3aXRjaGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQVExRixNQUFNLE9BQU8sd0JBQXdCO0lBTWpDLFlBQW9CLFdBQXdCLEVBQVUsbUJBQXdDO1FBQTFFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUxyRiwyQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFHckMsa0JBQWEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU2RCxDQUFDO0lBRWxHLFFBQVE7UUFDSixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBUyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFO1lBQzNCLE9BQU8sVUFBVTtnQkFDYixDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQ3RFO2dCQUNILENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDekMsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQy9GLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRTtZQUNuRixNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUM5RSxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzRTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBMUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxteENBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJRLFdBQVc7WUFDWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ3VycmVudFVzZXJDaGFubmVsIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY2hhbm5lbC1zd2l0Y2hlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoYW5uZWwtc3dpdGNoZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoYW5uZWwtc3dpdGNoZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhbm5lbFN3aXRjaGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICByZWFkb25seSBkaXNwbGF5RmlsdGVyVGhyZXNob2xkID0gMTA7XG4gICAgY2hhbm5lbHMkOiBPYnNlcnZhYmxlPEN1cnJlbnRVc2VyQ2hhbm5lbFtdPjtcbiAgICBjaGFubmVsQ291bnQkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgZmlsdGVyQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgYWN0aXZlQ2hhbm5lbENvZGUkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBjaGFubmVscyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC51c2VyU3RhdHVzKCkubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS51c2VyU3RhdHVzLmNoYW5uZWxzKTtcbiAgICAgICAgY29uc3QgZmlsdGVyVGVybSQgPSB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGU8c3RyaW5nPihzdGFydFdpdGgoJycpKTtcbiAgICAgICAgdGhpcy5jaGFubmVscyQgPSBjb21iaW5lTGF0ZXN0KGNoYW5uZWxzJCwgZmlsdGVyVGVybSQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtjaGFubmVscywgZmlsdGVyVGVybV0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyVGVybVxuICAgICAgICAgICAgICAgICAgICA/IGNoYW5uZWxzLmZpbHRlcihjID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGMuY29kZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclRlcm0udG9Mb2NhbGVMb3dlckNhc2UoKSksXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IGNoYW5uZWxzO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hhbm5lbENvdW50JCA9IGNoYW5uZWxzJC5waXBlKG1hcChjaGFubmVscyA9PiBjaGFubmVscy5sZW5ndGgpKTtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2hhbm5lbCQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEudXNlclN0YXR1cy5jaGFubmVscy5maW5kKGMgPT4gYy5pZCA9PT0gZGF0YS51c2VyU3RhdHVzLmFjdGl2ZUNoYW5uZWxJZCkpXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKSk7XG4gICAgICAgIHRoaXMuYWN0aXZlQ2hhbm5lbENvZGUkID0gYWN0aXZlQ2hhbm5lbCQucGlwZShtYXAoY2hhbm5lbCA9PiBjaGFubmVsLmNvZGUpKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVDaGFubmVsKGNoYW5uZWxJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnNldEFjdGl2ZUNoYW5uZWwoY2hhbm5lbElkKS5zdWJzY3JpYmUoKHsgc2V0QWN0aXZlQ2hhbm5lbCB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVDaGFubmVsID0gc2V0QWN0aXZlQ2hhbm5lbC5jaGFubmVscy5maW5kKGMgPT4gYy5pZCA9PT0gY2hhbm5lbElkKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVDaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYWN0aXZlQ2hhbm5lbFRva2VuJywgYWN0aXZlQ2hhbm5lbC50b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wucGF0Y2hWYWx1ZSgnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
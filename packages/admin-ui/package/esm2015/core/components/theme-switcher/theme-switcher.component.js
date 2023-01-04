import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
export class ThemeSwitcherComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
    }
    ngOnInit() {
        this.activeTheme$ = this.dataService.client.uiState().mapStream(data => data.uiState.theme);
    }
    toggleTheme(current) {
        const newTheme = current === 'default' ? 'dark' : 'default';
        this.dataService.client.setUiTheme(newTheme).subscribe(() => {
            this.localStorageService.set('activeTheme', newTheme);
        });
    }
}
ThemeSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-theme-switcher',
                template: "<button *ngIf=\"activeTheme$ | async as activeTheme\" class=\"theme-toggle\" (click)=\"toggleTheme(activeTheme)\">\n    <span>{{ 'common.theme' | translate }}</span>\n    <div class=\"theme-icon default\" [class.active]=\"activeTheme === 'default'\">\n        <clr-icon shape=\"sun\" class=\"is-solid\"></clr-icon>\n    </div>\n    <div class=\"theme-icon dark\" [class.active]=\"activeTheme === 'dark'\">\n        <clr-icon shape=\"moon\" class=\"is-solid\"></clr-icon>\n    </div>\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex;justify-content:center;align-items:center}button.theme-toggle{position:relative;padding-left:20px;border:none;background:transparent;color:var(--clr-dropdown-item-color);cursor:pointer}.theme-icon{position:absolute;top:0px;left:6px;z-index:0;opacity:.2;color:var(--color-text-300);transition:opacity .3s,left .3s}.theme-icon.active{z-index:1;left:0px;opacity:1}.theme-icon.default.active{color:#d6ae3f}.theme-icon.dark.active{color:#ffdf3a}\n"]
            },] }
];
ThemeSwitcherComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtc3dpdGNoZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyL3RoZW1lLXN3aXRjaGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdsRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFRMUYsTUFBTSxPQUFPLHNCQUFzQjtJQUcvQixZQUFvQixXQUF3QixFQUFVLG1CQUF3QztRQUExRSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDO0lBRWxHLFFBQVE7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFlO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBcEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QiwyZkFBOEM7Z0JBRTlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUlEsV0FBVztZQUNYLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXRoZW1lLXN3aXRjaGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGhlbWUtc3dpdGNoZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RoZW1lLXN3aXRjaGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRoZW1lU3dpdGNoZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGFjdGl2ZVRoZW1lJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZVRoZW1lJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVpU3RhdGUoKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnVpU3RhdGUudGhlbWUpO1xuICAgIH1cblxuICAgIHRvZ2dsZVRoZW1lKGN1cnJlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBuZXdUaGVtZSA9IGN1cnJlbnQgPT09ICdkZWZhdWx0JyA/ICdkYXJrJyA6ICdkZWZhdWx0JztcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jbGllbnQuc2V0VWlUaGVtZShuZXdUaGVtZSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2FjdGl2ZVRoZW1lJywgbmV3VGhlbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
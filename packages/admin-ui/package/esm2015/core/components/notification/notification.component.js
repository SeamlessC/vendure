import { Component, HostListener, ViewChild } from '@angular/core';
export class NotificationComponent {
    constructor() {
        this.offsetTop = 0;
        this.message = '';
        this.translationVars = {};
        this.type = 'info';
        this.isVisible = true;
        this.onClickFn = () => {
            /* */
        };
    }
    registerOnClickFn(fn) {
        this.onClickFn = fn;
    }
    onClick() {
        if (this.isVisible) {
            this.onClickFn();
        }
    }
    /**
     * Fade out the toast. When promise resolves, toast is invisible and
     * can be removed.
     */
    fadeOut() {
        this.isVisible = false;
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    /**
     * Returns the height of the toast element in px.
     */
    getHeight() {
        if (!this.wrapper) {
            return 0;
        }
        const el = this.wrapper.nativeElement;
        return el.getBoundingClientRect().height;
    }
    getIcon() {
        switch (this.type) {
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check-circle';
            case 'error':
                return 'exclamation-circle';
            case 'warning':
                return 'exclamation-triangle';
        }
    }
    stringifyMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        else {
            return JSON.stringify(message, null, 2);
        }
    }
}
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-notification',
                template: "<div\n    class=\"notification-wrapper\"\n    #wrapper\n    [style.top.px]=\"offsetTop\"\n    [ngClass]=\"{\n        visible: isVisible,\n        info: type === 'info',\n        success: type === 'success',\n        error: type === 'error',\n        warning: type === 'warning'\n    }\"\n>\n    <clr-icon [attr.shape]=\"getIcon()\" size=\"24\"></clr-icon>\n    {{ stringifyMessage(message) | translate: translationVars }}\n</div>\n",
                styles: ["@keyframes fadeIn{0%{opacity:0}to{opacity:.95}}:host{position:relative;z-index:1050}:host>.notification-wrapper{display:block;position:fixed;z-index:1001;top:0;right:10px;border-radius:3px;max-width:98vw;word-wrap:break-word;padding:10px;background-color:var(--color-grey-500);color:#fff;transition:opacity 1s,top .3s;opacity:0;white-space:pre-line}:host>.notification-wrapper.success{background-color:var(--color-success-500)}:host>.notification-wrapper.error{background-color:var(--color-error-500)}:host>.notification-wrapper.warning{background-color:var(--color-warning-500)}:host>.notification-wrapper.info{background-color:var(--color-secondary-500)}:host>.notification-wrapper.visible{opacity:.95;animation:fadeIn .3s .3s backwards}\n"]
            },] }
];
NotificationComponent.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTL0UsTUFBTSxPQUFPLHFCQUFxQjtJQUxsQztRQU9JLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isb0JBQWUsR0FBdUMsRUFBRSxDQUFDO1FBQ3pELFNBQUksR0FBcUIsTUFBTSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDVCxjQUFTLEdBQWUsR0FBRyxFQUFFO1lBQ2pDLEtBQUs7UUFDVCxDQUFDLENBQUE7SUFxREwsQ0FBQztJQW5ERyxpQkFBaUIsQ0FBQyxFQUFjO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFHRCxPQUFPO1FBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsTUFBTSxFQUFFLEdBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ25ELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPO1FBQ0gsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxNQUFNO2dCQUNQLE9BQU8sYUFBYSxDQUFDO1lBQ3pCLEtBQUssU0FBUztnQkFDVixPQUFPLGNBQWMsQ0FBQztZQUMxQixLQUFLLE9BQU87Z0JBQ1IsT0FBTyxvQkFBb0IsQ0FBQztZQUNoQyxLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxzQkFBc0IsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUM3QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLE9BQU8sQ0FBQztTQUNsQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDOzs7WUFsRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDJiQUE0Qzs7YUFFL0M7OztzQkFFSSxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtzQkFjckMsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItbm90aWZpY2F0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9ub3RpZmljYXRpb24uY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IHtcbiAgICBAVmlld0NoaWxkKCd3cmFwcGVyJywgeyBzdGF0aWM6IHRydWUgfSkgd3JhcHBlcjogRWxlbWVudFJlZjtcbiAgICBvZmZzZXRUb3AgPSAwO1xuICAgIG1lc3NhZ2UgPSAnJztcbiAgICB0cmFuc2xhdGlvblZhcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0gPSB7fTtcbiAgICB0eXBlOiBOb3RpZmljYXRpb25UeXBlID0gJ2luZm8nO1xuICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgcHJpdmF0ZSBvbkNsaWNrRm46ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgICAgIC8qICovXG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNsaWNrRm4oZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrRm4gPSBmbjtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgb25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tGbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmFkZSBvdXQgdGhlIHRvYXN0LiBXaGVuIHByb21pc2UgcmVzb2x2ZXMsIHRvYXN0IGlzIGludmlzaWJsZSBhbmRcbiAgICAgKiBjYW4gYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBmYWRlT3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgdG9hc3QgZWxlbWVudCBpbiBweC5cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLndyYXBwZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgICAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIH1cblxuICAgIGdldEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjaGVjay1jaXJjbGUnO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXhjbGFtYXRpb24tY2lyY2xlJztcbiAgICAgICAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXhjbGFtYXRpb24tdHJpYW5nbGUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RyaW5naWZ5TWVzc2FnZShtZXNzYWdlOiB1bmtub3duKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UsIG51bGwsIDIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
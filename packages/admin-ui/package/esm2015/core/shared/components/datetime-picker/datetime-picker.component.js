import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs/operators';
import { dayOfWeekIndex, weekDayNames } from './constants';
import { DatetimePickerService } from './datetime-picker.service';
/**
 * @description
 * A form input for selecting datetime values.
 *
 * @example
 * ```HTML
 * <vdr-datetime-picker [(ngModel)]="startDate"></vdr-datetime-picker>
 * ```
 *
 * @docsCategory components
 */
export class DatetimePickerComponent {
    constructor(changeDetectorRef, datetimePickerService) {
        this.changeDetectorRef = changeDetectorRef;
        this.datetimePickerService = datetimePickerService;
        /**
         * @description
         * The day that the week should start with in the calendar view.
         */
        this.weekStartDay = 'mon';
        /**
         * @description
         * The granularity of the minutes time picker
         */
        this.timeGranularityInterval = 5;
        /**
         * @description
         * The minimum date as an ISO string
         */
        this.min = null;
        /**
         * @description
         * The maximum date as an ISO string
         */
        this.max = null;
        /**
         * @description
         * Sets the readonly state
         */
        this.readonly = false;
        this.disabled = false;
        this.weekdays = [];
    }
    ngOnInit() {
        this.datetimePickerService.setWeekStartingDay(this.weekStartDay);
        this.datetimePickerService.setMin(this.min);
        this.datetimePickerService.setMax(this.max);
        this.populateYearsSelection();
        this.populateWeekdays();
        this.populateHours();
        this.populateMinutes();
        this.calendarView$ = this.datetimePickerService.calendarView$;
        this.current$ = this.datetimePickerService.viewing$.pipe(map(date => ({
            date,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })));
        this.selected$ = this.datetimePickerService.selected$;
        this.selectedHours$ = this.selected$.pipe(map(date => date && date.getHours()));
        this.selectedMinutes$ = this.selected$.pipe(map(date => date && date.getMinutes()));
        this.subscription = this.datetimePickerService.selected$.subscribe(val => {
            if (this.onChange) {
                this.onChange(val == null ? val : val.toISOString());
            }
        });
    }
    ngAfterViewInit() {
        this.dropdownComponent.onOpenChange(isOpen => {
            if (isOpen) {
                this.calendarTable.nativeElement.focus();
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(value) {
        this.datetimePickerService.selectDatetime(value);
    }
    prevMonth() {
        this.datetimePickerService.viewPrevMonth();
    }
    nextMonth() {
        this.datetimePickerService.viewNextMonth();
    }
    selectToday() {
        this.datetimePickerService.selectToday();
    }
    setYear(event) {
        const target = event.target;
        this.datetimePickerService.viewYear(parseInt(target.value, 10));
    }
    setMonth(event) {
        const target = event.target;
        this.datetimePickerService.viewMonth(parseInt(target.value, 10));
    }
    selectDay(day) {
        if (day.disabled) {
            return;
        }
        day.select();
    }
    clearValue() {
        this.datetimePickerService.selectDatetime(null);
    }
    handleCalendarKeydown(event) {
        switch (event.key) {
            case 'ArrowDown':
                return this.datetimePickerService.viewJumpDown();
            case 'ArrowUp':
                return this.datetimePickerService.viewJumpUp();
            case 'ArrowRight':
                return this.datetimePickerService.viewJumpRight();
            case 'ArrowLeft':
                return this.datetimePickerService.viewJumpLeft();
            case 'Enter':
                return this.datetimePickerService.selectViewed();
        }
    }
    setHour(event) {
        const target = event.target;
        this.datetimePickerService.selectHour(parseInt(target.value, 10));
    }
    setMinute(event) {
        const target = event.target;
        this.datetimePickerService.selectMinute(parseInt(target.value, 10));
    }
    closeDatepicker() {
        this.dropdownComponent.toggleOpen();
        this.datetimeInput.nativeElement.focus();
    }
    populateYearsSelection() {
        var _a;
        const yearRange = (_a = this.yearRange) !== null && _a !== void 0 ? _a : 10;
        const currentYear = new Date().getFullYear();
        const min = (this.min && new Date(this.min).getFullYear()) || currentYear - yearRange;
        const max = (this.max && new Date(this.max).getFullYear()) || currentYear + yearRange;
        const spread = max - min + 1;
        this.years = Array.from({ length: spread }).map((_, i) => min + i);
    }
    populateWeekdays() {
        const weekStartDayIndex = dayOfWeekIndex[this.weekStartDay];
        for (let i = 0; i < 7; i++) {
            this.weekdays.push(weekDayNames[(i + weekStartDayIndex + 0) % 7]);
        }
    }
    populateHours() {
        this.hours = Array.from({ length: 24 }).map((_, i) => i);
    }
    populateMinutes() {
        const minutes = [];
        for (let i = 0; i < 60; i += this.timeGranularityInterval) {
            minutes.push(i);
        }
        this.minutes = minutes;
    }
}
DatetimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-datetime-picker',
                template: "<div class=\"input-wrapper\">\n    <input\n        readonly\n        [ngModel]=\"selected$ | async | localeDate: 'medium'\"\n        class=\"selected-datetime\"\n        (keydown.enter)=\"dropdownComponent.toggleOpen()\"\n        (keydown.space)=\"dropdownComponent.toggleOpen()\"\n        #datetimeInput\n    />\n    <button class=\"clear-value-button btn\" [class.visible]=\"!disabled && !readonly && (selected$ | async)\" (click)=\"clearValue()\">\n        <clr-icon shape=\"times\"></clr-icon>\n    </button>\n</div>\n<vdr-dropdown #dropdownComponent>\n    <button class=\"btn btn-outline calendar-button\" vdrDropdownTrigger [disabled]=\"readonly || disabled\">\n        <clr-icon shape=\"calendar\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"datetime-picker\" *ngIf=\"current$ | async as currentView\" (keydown.escape)=\"closeDatepicker()\">\n            <div class=\"controls\">\n                <div class=\"selects\">\n                    <div class=\"month-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.month\"\n                            (change)=\"setMonth($event)\"\n                        >\n                            <option [value]=\"1\">{{ 'datetime.month-jan' | translate }}</option>\n                            <option [value]=\"2\">{{ 'datetime.month-feb' | translate }}</option>\n                            <option [value]=\"3\">{{ 'datetime.month-mar' | translate }}</option>\n                            <option [value]=\"4\">{{ 'datetime.month-apr' | translate }}</option>\n                            <option [value]=\"5\">{{ 'datetime.month-may' | translate }}</option>\n                            <option [value]=\"6\">{{ 'datetime.month-jun' | translate }}</option>\n                            <option [value]=\"7\">{{ 'datetime.month-jul' | translate }}</option>\n                            <option [value]=\"8\">{{ 'datetime.month-aug' | translate }}</option>\n                            <option [value]=\"9\">{{ 'datetime.month-sep' | translate }}</option>\n                            <option [value]=\"10\">{{ 'datetime.month-oct' | translate }}</option>\n                            <option [value]=\"11\">{{ 'datetime.month-nov' | translate }}</option>\n                            <option [value]=\"12\">{{ 'datetime.month-dec' | translate }}</option>\n                        </select>\n                    </div>\n                    <div class=\"year-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.year\"\n                            (change)=\"setYear($event)\"\n                        >\n                            <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"control-buttons\">\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"prevMonth()\"\n                        [title]=\"'common.view-previous-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"left\"></clr-icon>\n                    </button>\n                    <button class=\"btn btn-link btn-sm\" (click)=\"selectToday()\" [title]=\"'common.select-today' | translate\">\n                        <clr-icon shape=\"event\"></clr-icon>\n                    </button>\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"nextMonth()\"\n                        [title]=\"'common.view-next-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"right\"></clr-icon>\n                    </button>\n                </div>\n            </div>\n            <table class=\"calendar-table\" #calendarTable tabindex=\"0\" (keydown)=\"handleCalendarKeydown($event)\">\n                <thead>\n                <tr>\n                    <td *ngFor=\"let weekdayName of weekdays\">\n                        {{ weekdayName | translate }}\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let week of calendarView$ | async\">\n                    <td\n                        *ngFor=\"let day of week\"\n                        class=\"day-cell\"\n                        [class.selected]=\"day.selected\"\n                        [class.today]=\"day.isToday\"\n                        [class.viewing]=\"day.isViewing\"\n                        [class.current-month]=\"day.inCurrentMonth\"\n                        [class.disabled]=\"day.disabled\"\n                        (keydown.enter)=\"selectDay(day)\"\n                        (click)=\"selectDay(day)\"\n                    >\n                        {{ day.dayOfMonth }}\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n            <div class=\"time-picker\">\n                <span class=\"flex-spacer\"> {{ 'datetime.time' | translate }}: </span>\n                <select clrSelect name=\"hour\" [ngModel]=\"selectedHours$ | async\" (change)=\"setHour($event)\">\n                    <option *ngFor=\"let hour of hours\" [value]=\"hour\">{{ hour | number: '2.0-0' }}</option>\n                </select>\n                <span>:</span>\n                <select\n                    clrSelect\n                    name=\"hour\"\n                    [ngModel]=\"selectedMinutes$ | async\"\n                    (change)=\"setMinute($event)\"\n                >\n                    <option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{\n                        minute | number: '2.0-0'\n                        }}</option>\n                </select>\n            </div>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    DatetimePickerService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: DatetimePickerComponent,
                        multi: true,
                    },
                ],
                styles: [":host{display:flex;width:100%}.input-wrapper{flex:1;display:flex}input.selected-datetime{flex:1;border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none!important}.clear-value-button{margin:0;border-radius:0;border-left:none;border-color:var(--color-component-border-200);background-color:#fff;color:var(--color-grey-500);display:none}.clear-value-button.visible{display:block}.calendar-button{margin:0;border-top-left-radius:0;border-bottom-left-radius:0}.datetime-picker{margin:0 12px}table.calendar-table{padding:6px}table.calendar-table:focus{outline:1px solid var(--color-primary-500);box-shadow:0 0 1px 2px var(--color-primary-100)}table.calendar-table td{width:24px;text-align:center;border:1px solid transparent;-webkit-user-select:none;user-select:none}table.calendar-table .day-cell{background-color:var(--color-component-bg-200);color:var(--color-grey-500);cursor:pointer;transition:background-color .1s}table.calendar-table .day-cell.current-month{background-color:#fff;color:var(--color-grey-800)}table.calendar-table .day-cell.selected{background-color:var(--color-primary-500);color:#fff}table.calendar-table .day-cell.viewing:not(.selected){background-color:var(--color-primary-200)}table.calendar-table .day-cell.today{border:1px solid var(--color-component-border-300)}table.calendar-table .day-cell:hover:not(.selected):not(.disabled){background-color:var(--color-primary-100)}table.calendar-table .day-cell.disabled{cursor:default;color:var(--color-grey-300)}.selects{display:flex;justify-content:space-between;margin-bottom:12px}.control-buttons{display:flex}.time-picker{display:flex;align-items:baseline;margin-top:12px}\n"]
            },] }
];
DatetimePickerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatetimePickerService }
];
DatetimePickerComponent.propDecorators = {
    yearRange: [{ type: Input }],
    weekStartDay: [{ type: Input }],
    timeGranularityInterval: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    readonly: [{ type: Input }],
    dropdownComponent: [{ type: ViewChild, args: ['dropdownComponent', { static: true },] }],
    datetimeInput: [{ type: ViewChild, args: ['datetimeInput', { static: true },] }],
    calendarTable: [{ type: ViewChild, args: ['calendarTable',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvZGF0ZXRpbWUtcGlja2VyL2RhdGV0aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULEtBQUssRUFHTCxTQUFTLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxHQUFHLEVBQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUkxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVNsRTs7Ozs7Ozs7OztHQVVHO0FBZUgsTUFBTSxPQUFPLHVCQUF1QjtJQW9EaEMsWUFDWSxpQkFBb0MsRUFDcEMscUJBQTRDO1FBRDVDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQTlDeEQ7OztXQUdHO1FBQ00saUJBQVksR0FBYyxLQUFLLENBQUM7UUFDekM7OztXQUdHO1FBQ00sNEJBQXVCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDOzs7V0FHRztRQUNNLFFBQUcsR0FBa0IsSUFBSSxDQUFDO1FBQ25DOzs7V0FHRztRQUNNLFFBQUcsR0FBa0IsSUFBSSxDQUFDO1FBQ25DOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFNMUIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9qQixhQUFRLEdBQWEsRUFBRSxDQUFDO0lBVXJCLENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLHFCQUFx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QUFFLHFCQUFxQjtnQkFDL0IsODlMQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUCxxQkFBcUI7b0JBQ3JCO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSx1QkFBdUI7d0JBQ3BDLEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKOzthQUNKOzs7WUFoREcsaUJBQWlCO1lBZVoscUJBQXFCOzs7d0JBeUN6QixLQUFLOzJCQUtMLEtBQUs7c0NBS0wsS0FBSztrQkFLTCxLQUFLO2tCQUtMLEtBQUs7dUJBS0wsS0FBSztnQ0FFTCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzRCQUMvQyxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs0QkFDM0MsU0FBUyxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuLi9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBkYXlPZldlZWtJbmRleCwgd2Vla0RheU5hbWVzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRGF0ZXRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9kYXRldGltZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcsIERheUNlbGwsIERheU9mV2VlayB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBDdXJyZW50VmlldyA9IHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgZm9ybSBpbnB1dCBmb3Igc2VsZWN0aW5nIGRhdGV0aW1lIHZhbHVlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgSFRNTFxuICogPHZkci1kYXRldGltZS1waWNrZXIgWyhuZ01vZGVsKV09XCJzdGFydERhdGVcIj48L3Zkci1kYXRldGltZS1waWNrZXI+XG4gKiBgYGBcbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGNvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZGF0ZXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRldGltZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRGF0ZXRpbWVQaWNrZXJTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBEYXRldGltZVBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGV0aW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgcmFuZ2UgYWJvdmUgYW5kIGJlbG93IHRoZSBjdXJyZW50IHllYXIgd2hpY2ggaXMgc2VsZWN0YWJsZSBmcm9tXG4gICAgICogdGhlIHllYXIgc2VsZWN0IGNvbnRyb2wuIElmIGEgbWluIG9yIG1heCB2YWx1ZSBpcyBzZXQsIHRoZXNlIHdpbGxcbiAgICAgKiBvdmVycmlkZSB0aGUgeWVhclJhbmdlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHllYXJSYW5nZTtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgZGF5IHRoYXQgdGhlIHdlZWsgc2hvdWxkIHN0YXJ0IHdpdGggaW4gdGhlIGNhbGVuZGFyIHZpZXcuXG4gICAgICovXG4gICAgQElucHV0KCkgd2Vla1N0YXJ0RGF5OiBEYXlPZldlZWsgPSAnbW9uJztcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgZ3JhbnVsYXJpdHkgb2YgdGhlIG1pbnV0ZXMgdGltZSBwaWNrZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0aW1lR3JhbnVsYXJpdHlJbnRlcnZhbCA9IDU7XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhlIG1pbmltdW0gZGF0ZSBhcyBhbiBJU08gc3RyaW5nXG4gICAgICovXG4gICAgQElucHV0KCkgbWluOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBUaGUgbWF4aW11bSBkYXRlIGFzIGFuIElTTyBzdHJpbmdcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFNldHMgdGhlIHJlYWRvbmx5IHN0YXRlXG4gICAgICovXG4gICAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duQ29tcG9uZW50JywgeyBzdGF0aWM6IHRydWUgfSkgZHJvcGRvd25Db21wb25lbnQ6IERyb3Bkb3duQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2RhdGV0aW1lSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBkYXRldGltZUlucHV0OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICAgIEBWaWV3Q2hpbGQoJ2NhbGVuZGFyVGFibGUnKSBjYWxlbmRhclRhYmxlOiBFbGVtZW50UmVmPEhUTUxUYWJsZUVsZW1lbnQ+O1xuXG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBjYWxlbmRhclZpZXckOiBPYnNlcnZhYmxlPENhbGVuZGFyVmlldz47XG4gICAgY3VycmVudCQ6IE9ic2VydmFibGU8Q3VycmVudFZpZXc+O1xuICAgIHNlbGVjdGVkJDogT2JzZXJ2YWJsZTxEYXRlIHwgbnVsbD47XG4gICAgc2VsZWN0ZWRIb3VycyQ6IE9ic2VydmFibGU8bnVtYmVyIHwgbnVsbD47XG4gICAgc2VsZWN0ZWRNaW51dGVzJDogT2JzZXJ2YWJsZTxudW1iZXIgfCBudWxsPjtcbiAgICB5ZWFyczogbnVtYmVyW107XG4gICAgd2Vla2RheXM6IHN0cmluZ1tdID0gW107XG4gICAgaG91cnM6IG51bWJlcltdO1xuICAgIG1pbnV0ZXM6IG51bWJlcltdO1xuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2g6ICgpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBkYXRldGltZVBpY2tlclNlcnZpY2U6IERhdGV0aW1lUGlja2VyU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2V0V2Vla1N0YXJ0aW5nRGF5KHRoaXMud2Vla1N0YXJ0RGF5KTtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2V0TWluKHRoaXMubWluKTtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2V0TWF4KHRoaXMubWF4KTtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJzU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucG9wdWxhdGVXZWVrZGF5cygpO1xuICAgICAgICB0aGlzLnBvcHVsYXRlSG91cnMoKTtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1pbnV0ZXMoKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhclZpZXckID0gdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2UuY2FsZW5kYXJWaWV3JDtcbiAgICAgICAgdGhpcy5jdXJyZW50JCA9IHRoaXMuZGF0ZXRpbWVQaWNrZXJTZXJ2aWNlLnZpZXdpbmckLnBpcGUoXG4gICAgICAgICAgICBtYXAoZGF0ZSA9PiAoe1xuICAgICAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkJCA9IHRoaXMuZGF0ZXRpbWVQaWNrZXJTZXJ2aWNlLnNlbGVjdGVkJDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXJzJCA9IHRoaXMuc2VsZWN0ZWQkLnBpcGUobWFwKGRhdGUgPT4gZGF0ZSAmJiBkYXRlLmdldEhvdXJzKCkpKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1pbnV0ZXMkID0gdGhpcy5zZWxlY3RlZCQucGlwZShtYXAoZGF0ZSA9PiBkYXRlICYmIGRhdGUuZ2V0TWludXRlcygpKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2VsZWN0ZWQkLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCA9PSBudWxsID8gdmFsIDogdmFsLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25Db21wb25lbnQub25PcGVuQ2hhbmdlKGlzT3BlbiA9PiB7XG4gICAgICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhclRhYmxlLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS5zZWxlY3REYXRldGltZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJldk1vbnRoKCkge1xuICAgICAgICB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS52aWV3UHJldk1vbnRoKCk7XG4gICAgfVxuXG4gICAgbmV4dE1vbnRoKCkge1xuICAgICAgICB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS52aWV3TmV4dE1vbnRoKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0VG9kYXkoKSB7XG4gICAgICAgIHRoaXMuZGF0ZXRpbWVQaWNrZXJTZXJ2aWNlLnNlbGVjdFRvZGF5KCk7XG4gICAgfVxuXG4gICAgc2V0WWVhcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS52aWV3WWVhcihwYXJzZUludCh0YXJnZXQudmFsdWUsIDEwKSk7XG4gICAgfVxuXG4gICAgc2V0TW9udGgoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uudmlld01vbnRoKHBhcnNlSW50KHRhcmdldC52YWx1ZSwgMTApKTtcbiAgICB9XG5cbiAgICBzZWxlY3REYXkoZGF5OiBEYXlDZWxsKSB7XG4gICAgICAgIGlmIChkYXkuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXkuc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF0ZXRpbWUobnVsbCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS52aWV3SnVtcERvd24oKTtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS52aWV3SnVtcFVwKCk7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uudmlld0p1bXBSaWdodCgpO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uudmlld0p1bXBMZWZ0KCk7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXRpbWVQaWNrZXJTZXJ2aWNlLnNlbGVjdFZpZXdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SG91cihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmRhdGV0aW1lUGlja2VyU2VydmljZS5zZWxlY3RIb3VyKHBhcnNlSW50KHRhcmdldC52YWx1ZSwgMTApKTtcbiAgICB9XG5cbiAgICBzZXRNaW51dGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICAgICAgdGhpcy5kYXRldGltZVBpY2tlclNlcnZpY2Uuc2VsZWN0TWludXRlKHBhcnNlSW50KHRhcmdldC52YWx1ZSwgMTApKTtcbiAgICB9XG5cbiAgICBjbG9zZURhdGVwaWNrZXIoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25Db21wb25lbnQudG9nZ2xlT3BlbigpO1xuICAgICAgICB0aGlzLmRhdGV0aW1lSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVZZWFyc1NlbGVjdGlvbigpIHtcbiAgICAgICAgY29uc3QgeWVhclJhbmdlID0gdGhpcy55ZWFyUmFuZ2UgPz8gMTA7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBjb25zdCBtaW4gPSAodGhpcy5taW4gJiYgbmV3IERhdGUodGhpcy5taW4pLmdldEZ1bGxZZWFyKCkpIHx8IGN1cnJlbnRZZWFyIC0geWVhclJhbmdlO1xuICAgICAgICBjb25zdCBtYXggPSAodGhpcy5tYXggJiYgbmV3IERhdGUodGhpcy5tYXgpLmdldEZ1bGxZZWFyKCkpIHx8IGN1cnJlbnRZZWFyICsgeWVhclJhbmdlO1xuICAgICAgICBjb25zdCBzcHJlYWQgPSBtYXggLSBtaW4gKyAxO1xuICAgICAgICB0aGlzLnllYXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogc3ByZWFkIH0pLm1hcCgoXywgaSkgPT4gbWluICsgaSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZVdlZWtkYXlzKCkge1xuICAgICAgICBjb25zdCB3ZWVrU3RhcnREYXlJbmRleCA9IGRheU9mV2Vla0luZGV4W3RoaXMud2Vla1N0YXJ0RGF5XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMud2Vla2RheXMucHVzaCh3ZWVrRGF5TmFtZXNbKGkgKyB3ZWVrU3RhcnREYXlJbmRleCArIDApICUgN10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZUhvdXJzKCkge1xuICAgICAgICB0aGlzLmhvdXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjQgfSkubWFwKChfLCBpKSA9PiBpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlTWludXRlcygpIHtcbiAgICAgICAgY29uc3QgbWludXRlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSArPSB0aGlzLnRpbWVHcmFudWxhcml0eUludGVydmFsKSB7XG4gICAgICAgICAgICBtaW51dGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB9XG59XG4iXX0=
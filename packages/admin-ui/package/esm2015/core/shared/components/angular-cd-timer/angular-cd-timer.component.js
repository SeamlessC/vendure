import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, } from '@angular/core';
import dayjs from 'dayjs';
export class CdTimerComponent {
    constructor(elt, renderer) {
        this.elt = elt;
        this.renderer = renderer;
        this.onStart = new EventEmitter();
        this.onStop = new EventEmitter();
        this.onTick = new EventEmitter();
        this.onComplete = new EventEmitter();
        // Initialization
        this.autoStart = true;
        this.startTime = 0;
        this.endTime = 0;
        this.timeoutId = null;
        this.countdown = true;
        this.format = 'default';
    }
    ngAfterViewInit() {
        const ngContentNode = this.elt.nativeElement.lastChild; // Get last child, defined by user or span
        this.ngContentSchema = ngContentNode ? ngContentNode.nodeValue : '';
        if (this.autoStart === undefined || this.autoStart === true) {
            const fifteen = 60 * this.processingTime;
            const dayPlacedTime = dayjs(this.placedTime);
            const scheduledTime = this.scheduledTime ? dayjs(this.scheduledTime) : undefined;
            const diffFromScheduledTime = scheduledTime === null || scheduledTime === void 0 ? void 0 : scheduledTime.diff(Date.now(), 'seconds');
            const diffFromNow = dayPlacedTime.diff(Date.now(), 'seconds');
            // console.log(dayPlacedTime);
            const diff = diffFromScheduledTime !== null && diffFromScheduledTime !== void 0 ? diffFromScheduledTime : fifteen + diffFromNow;
            console.log(diff);
            if (diff < 0 || isNaN(diff)) {
                this.startTime = 0;
                this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', 'Time up');
            }
            else {
                this.startTime = diff;
                this.start();
            }
        }
    }
    ngOnDestroy() {
        this.resetTimeout();
    }
    /**
     * Start the timer
     */
    start() {
        this.initVar();
        this.resetTimeout();
        this.computeTimeUnits();
        this.startTickCount();
        this.onStart.emit(this);
    }
    /**
     * Resume the timer
     */
    resume() {
        this.resetTimeout();
        this.startTickCount();
    }
    /**
     * Stop the timer
     */
    stop() {
        this.clear();
        this.onStop.emit(this);
    }
    /**
     * Reset the timer
     */
    reset() {
        this.initVar();
        this.resetTimeout();
        this.clear();
        this.computeTimeUnits();
        this.renderText();
    }
    /**
     * Get the time information
     * @returns TimeInterface
     */
    get() {
        return {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours,
            days: this.days,
            timer: this.timeoutId,
            tick_count: this.tickCounter,
        };
    }
    /**
     * Initialize variable before start
     */
    initVar() {
        this.startTime = this.startTime || 0;
        this.endTime = this.endTime || 0;
        this.countdown = this.countdown || false;
        this.tickCounter = this.startTime;
        // Disable countdown if start time not defined
        if (this.countdown && this.startTime === 0) {
            this.countdown = false;
        }
        // Determine auto format
        if (!this.format) {
            this.format = this.ngContentSchema.length > 5 ? 'user' : 'default';
        }
    }
    /**
     * Reset timeout
     */
    resetTimeout() {
        if (this.timeoutId) {
            clearInterval(this.timeoutId);
        }
    }
    /**
     * Render the time to DOM
     */
    renderText() {
        let outputText;
        if (this.format === 'user') {
            // User presentation
            const items = {
                seconds: this.seconds,
                minutes: this.minutes,
                hours: this.hours,
                days: this.days,
            };
            outputText = this.ngContentSchema;
            for (const key of Object.keys(items)) {
                outputText = outputText.replace('[' + key + ']', items[key].toString());
            }
        }
        else if (this.format === 'intelli') {
            // Intelli presentation
            outputText = '';
            if (this.days > 0) {
                outputText += this.days.toString() + 'day' + (this.days > 1 ? 's' : '') + ' ';
            }
            if (this.hours > 0 || this.days > 0) {
                outputText += this.hours.toString() + 'h ';
            }
            if ((this.minutes > 0 || this.hours > 0) && this.days === 0) {
                outputText += this.minutes.toString().padStart(2, '0') + 'min ';
            }
            if (this.hours === 0 && this.days === 0) {
                outputText += this.seconds.toString().padStart(2, '0') + 's';
            }
        }
        else if (this.format === 'hms') {
            // Hms presentation
            outputText = this.hours.toString().padStart(2, '0') + ':';
            outputText += this.minutes.toString().padStart(2, '0') + ':';
            outputText += this.seconds.toString().padStart(2, '0');
        }
        else if (this.format === 'ms') {
            // ms presentation
            outputText = '';
            if (this.hours > 0) {
                outputText = this.hours.toString().padStart(2, '0') + ':';
            }
            outputText += this.minutes.toString().padStart(2, '0') + ':';
            outputText += this.seconds.toString().padStart(2, '0');
        }
        else {
            // Default presentation
            outputText = this.days.toString() + 'd ';
            outputText += this.hours.toString() + 'h ';
            outputText += this.minutes.toString() + 'm ';
            outputText += this.seconds.toString() + 's';
        }
        this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', outputText);
    }
    clear() {
        this.resetTimeout();
        this.timeoutId = null;
    }
    /**
     * Compute each unit (seconds, minutes, hours, days) for further manipulation
     * @protected
     */
    computeTimeUnits() {
        if (!this.maxTimeUnit || this.maxTimeUnit === 'day') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor((this.tickCounter / 3600) % 24);
            this.days = Math.floor(this.tickCounter / 3600 / 24);
        }
        else if (this.maxTimeUnit === 'second') {
            this.seconds = this.tickCounter;
            this.minutes = 0;
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'minute') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor(this.tickCounter / 60);
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'hour') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor(this.tickCounter / 3600);
            this.days = 0;
        }
        if (this.tickCounter === 0) {
            this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', 'Time up');
        }
        else {
            this.renderText();
        }
    }
    /**
     * Start tick count, base of this component
     * @protected
     */
    startTickCount() {
        const that = this;
        that.timeoutId = setInterval(() => {
            let counter;
            if (that.countdown) {
                // Compute finish counter for countdown
                counter = that.tickCounter;
                if (that.startTime > that.endTime) {
                    counter = that.tickCounter - that.endTime - 1;
                }
            }
            else {
                // Compute finish counter for timer
                counter = that.tickCounter - that.startTime;
                if (that.endTime > that.startTime) {
                    counter = that.endTime - that.tickCounter - 1;
                }
            }
            that.computeTimeUnits();
            const timer = {
                seconds: that.seconds,
                minutes: that.minutes,
                hours: that.hours,
                days: that.days,
                timer: that.timeoutId,
                tick_count: that.tickCounter,
            };
            that.onTick.emit(timer);
            if (counter < 0) {
                that.stop();
                that.onComplete.emit(that);
                return;
            }
            if (that.countdown) {
                that.tickCounter--;
            }
            else {
                that.tickCounter++;
            }
        }, 1000); // Each seconds
    }
}
CdTimerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-cd-timer',
                template: ' <ng-content></ng-content>'
            },] }
];
CdTimerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
CdTimerComponent.propDecorators = {
    scheduledTime: [{ type: Input }],
    startTime: [{ type: Input }],
    endTime: [{ type: Input }],
    processingTime: [{ type: Input }],
    countdown: [{ type: Input }],
    autoStart: [{ type: Input }],
    maxTimeUnit: [{ type: Input }],
    placedTime: [{ type: Input }],
    format: [{ type: Input }],
    onStart: [{ type: Output }],
    onStop: [{ type: Output }],
    onTick: [{ type: Output }],
    onComplete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jZC10aW1lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FuZ3VsYXItY2QtdGltZXIvYW5ndWxhci1jZC10aW1lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQVExQixNQUFNLE9BQU8sZ0JBQWdCO0lBd0J6QixZQUFvQixHQUFlLEVBQVUsUUFBbUI7UUFBNUMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFMdEQsWUFBTyxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUMvRSxXQUFNLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQzlFLFdBQU0sR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDeEUsZUFBVSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUd4RixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDWCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQywwQ0FB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QUFTO2dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDL0IsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhCLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRVosSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QjtRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7SUFDN0IsQ0FBQzs7O1lBeFNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLDRCQUE0QjthQUN6Qzs7O1lBZEcsVUFBVTtZQUtWLFNBQVM7Ozs0QkFvQlIsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7NkJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07eUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcblxuaW1wb3J0IHsgVGltZUludGVyZmFjZSB9IGZyb20gJy4vYW5ndWxhci1jZC10aW1lci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jZC10aW1lcicsXG4gICAgdGVtcGxhdGU6ICcgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIENkVGltZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgdGltZW91dElkOiBhbnk7XG4gICAgcHJpdmF0ZSB0aWNrQ291bnRlcjogbnVtYmVyO1xuICAgIHByaXZhdGUgbmdDb250ZW50U2NoZW1hOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIHNlY29uZHM6IG51bWJlcjtcbiAgICBwcml2YXRlIG1pbnV0ZXM6IG51bWJlcjtcbiAgICBwcml2YXRlIGhvdXJzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkYXlzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzY2hlZHVsZWRUaW1lPzogRGF0ZTtcbiAgICBASW5wdXQoKSBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBASW5wdXQoKSBlbmRUaW1lOiBudW1iZXI7XG4gICAgQElucHV0KCkgcHJvY2Vzc2luZ1RpbWU6IG51bWJlcjtcbiAgICBASW5wdXQoKSBjb3VudGRvd246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXV0b1N0YXJ0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG1heFRpbWVVbml0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGxhY2VkVGltZTogRGF0ZTtcbiAgICBASW5wdXQoKSBmb3JtYXQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25TdGFydDogRXZlbnRFbWl0dGVyPENkVGltZXJDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDZFRpbWVyQ29tcG9uZW50PigpO1xuICAgIEBPdXRwdXQoKSBvblN0b3A6IEV2ZW50RW1pdHRlcjxDZFRpbWVyQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2RUaW1lckNvbXBvbmVudD4oKTtcbiAgICBAT3V0cHV0KCkgb25UaWNrOiBFdmVudEVtaXR0ZXI8VGltZUludGVyZmFjZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVJbnRlcmZhY2U+KCk7XG4gICAgQE91dHB1dCgpIG9uQ29tcGxldGU6IEV2ZW50RW1pdHRlcjxDZFRpbWVyQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2RUaW1lckNvbXBvbmVudD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWx0OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6YXRpb25cbiAgICAgICAgdGhpcy5hdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuZW5kVGltZSA9IDA7XG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvcm1hdCA9ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGNvbnN0IG5nQ29udGVudE5vZGUgPSB0aGlzLmVsdC5uYXRpdmVFbGVtZW50Lmxhc3RDaGlsZDsgLy8gR2V0IGxhc3QgY2hpbGQsIGRlZmluZWQgYnkgdXNlciBvciBzcGFuXG4gICAgICAgIHRoaXMubmdDb250ZW50U2NoZW1hID0gbmdDb250ZW50Tm9kZSA/IG5nQ29udGVudE5vZGUubm9kZVZhbHVlIDogJyc7XG4gICAgICAgIGlmICh0aGlzLmF1dG9TdGFydCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuYXV0b1N0YXJ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBmaWZ0ZWVuID0gNjAgKiB0aGlzLnByb2Nlc3NpbmdUaW1lO1xuICAgICAgICAgICAgY29uc3QgZGF5UGxhY2VkVGltZSA9IGRheWpzKHRoaXMucGxhY2VkVGltZSk7XG4gICAgICAgICAgICBjb25zdCBzY2hlZHVsZWRUaW1lID0gdGhpcy5zY2hlZHVsZWRUaW1lID8gZGF5anModGhpcy5zY2hlZHVsZWRUaW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGRpZmZGcm9tU2NoZWR1bGVkVGltZSA9IHNjaGVkdWxlZFRpbWU/LmRpZmYoRGF0ZS5ub3coKSwgJ3NlY29uZHMnKTtcbiAgICAgICAgICAgIGNvbnN0IGRpZmZGcm9tTm93ID0gZGF5UGxhY2VkVGltZS5kaWZmKERhdGUubm93KCksICdzZWNvbmRzJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXlQbGFjZWRUaW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBkaWZmRnJvbVNjaGVkdWxlZFRpbWUgPz8gZmlmdGVlbiArIGRpZmZGcm9tTm93O1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGlmZik7XG4gICAgICAgICAgICBpZiAoZGlmZiA8IDAgfHwgaXNOYU4oZGlmZikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsdC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJ1RpbWUgdXAnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBkaWZmO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHRoZSB0aW1lclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0VmFyKCk7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuY29tcHV0ZVRpbWVVbml0cygpO1xuICAgICAgICB0aGlzLnN0YXJ0VGlja0NvdW50KCk7XG5cbiAgICAgICAgdGhpcy5vblN0YXJ0LmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzdW1lIHRoZSB0aW1lclxuICAgICAqL1xuICAgIHB1YmxpYyByZXN1bWUoKSB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgdGhpcy5zdGFydFRpY2tDb3VudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdGhlIHRpbWVyXG4gICAgICovXG4gICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLm9uU3RvcC5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSB0aW1lclxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5pbml0VmFyKCk7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb21wdXRlVGltZVVuaXRzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSBpbmZvcm1hdGlvblxuICAgICAqIEByZXR1cm5zIFRpbWVJbnRlcmZhY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxuICAgICAgICAgICAgbWludXRlczogdGhpcy5taW51dGVzLFxuICAgICAgICAgICAgaG91cnM6IHRoaXMuaG91cnMsXG4gICAgICAgICAgICBkYXlzOiB0aGlzLmRheXMsXG4gICAgICAgICAgICB0aW1lcjogdGhpcy50aW1lb3V0SWQsXG4gICAgICAgICAgICB0aWNrX2NvdW50OiB0aGlzLnRpY2tDb3VudGVyLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdmFyaWFibGUgYmVmb3JlIHN0YXJ0XG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0VmFyKCkge1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lIHx8IDA7XG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZSB8fCAwO1xuICAgICAgICB0aGlzLmNvdW50ZG93biA9IHRoaXMuY291bnRkb3duIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy5zdGFydFRpbWU7XG5cbiAgICAgICAgLy8gRGlzYWJsZSBjb3VudGRvd24gaWYgc3RhcnQgdGltZSBub3QgZGVmaW5lZFxuICAgICAgICBpZiAodGhpcy5jb3VudGRvd24gJiYgdGhpcy5zdGFydFRpbWUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRkb3duID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgYXV0byBmb3JtYXRcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXQgPSB0aGlzLm5nQ29udGVudFNjaGVtYS5sZW5ndGggPiA1ID8gJ3VzZXInIDogJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGltZW91dFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXRUaW1lb3V0KCkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSB0aW1lIHRvIERPTVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVuZGVyVGV4dCgpIHtcbiAgICAgICAgbGV0IG91dHB1dFRleHQ7XG4gICAgICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICAvLyBVc2VyIHByZXNlbnRhdGlvblxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxuICAgICAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMubWludXRlcyxcbiAgICAgICAgICAgICAgICBob3VyczogdGhpcy5ob3VycyxcbiAgICAgICAgICAgICAgICBkYXlzOiB0aGlzLmRheXMsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBvdXRwdXRUZXh0ID0gdGhpcy5uZ0NvbnRlbnRTY2hlbWE7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGl0ZW1zKSkge1xuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgPSBvdXRwdXRUZXh0LnJlcGxhY2UoJ1snICsga2V5ICsgJ10nLCAoaXRlbXMgYXMgYW55KVtrZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybWF0ID09PSAnaW50ZWxsaScpIHtcbiAgICAgICAgICAgIC8vIEludGVsbGkgcHJlc2VudGF0aW9uXG4gICAgICAgICAgICBvdXRwdXRUZXh0ID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXlzID4gMCkge1xuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5kYXlzLnRvU3RyaW5nKCkgKyAnZGF5JyArICh0aGlzLmRheXMgPiAxID8gJ3MnIDogJycpICsgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaG91cnMgPiAwIHx8IHRoaXMuZGF5cyA+IDApIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ICs9IHRoaXMuaG91cnMudG9TdHJpbmcoKSArICdoICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMubWludXRlcyA+IDAgfHwgdGhpcy5ob3VycyA+IDApICYmIHRoaXMuZGF5cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5taW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSArICdtaW4gJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJzID09PSAwICYmIHRoaXMuZGF5cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5zZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSArICdzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1hdCA9PT0gJ2htcycpIHtcbiAgICAgICAgICAgIC8vIEhtcyBwcmVzZW50YXRpb25cbiAgICAgICAgICAgIG91dHB1dFRleHQgPSB0aGlzLmhvdXJzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSArICc6JztcbiAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5taW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSArICc6JztcbiAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5zZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1hdCA9PT0gJ21zJykge1xuICAgICAgICAgICAgLy8gbXMgcHJlc2VudGF0aW9uXG4gICAgICAgICAgICBvdXRwdXRUZXh0ID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VycyA+IDApIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gdGhpcy5ob3Vycy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJykgKyAnOic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXRUZXh0ICs9IHRoaXMubWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJykgKyAnOic7XG4gICAgICAgICAgICBvdXRwdXRUZXh0ICs9IHRoaXMuc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBEZWZhdWx0IHByZXNlbnRhdGlvblxuICAgICAgICAgICAgb3V0cHV0VGV4dCA9IHRoaXMuZGF5cy50b1N0cmluZygpICsgJ2QgJztcbiAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5ob3Vycy50b1N0cmluZygpICsgJ2ggJztcbiAgICAgICAgICAgIG91dHB1dFRleHQgKz0gdGhpcy5taW51dGVzLnRvU3RyaW5nKCkgKyAnbSAnO1xuICAgICAgICAgICAgb3V0cHV0VGV4dCArPSB0aGlzLnNlY29uZHMudG9TdHJpbmcoKSArICdzJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbHQubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIG91dHB1dFRleHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGVhY2ggdW5pdCAoc2Vjb25kcywgbWludXRlcywgaG91cnMsIGRheXMpIGZvciBmdXJ0aGVyIG1hbmlwdWxhdGlvblxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29tcHV0ZVRpbWVVbml0cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1heFRpbWVVbml0IHx8IHRoaXMubWF4VGltZVVuaXQgPT09ICdkYXknKSB7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSBNYXRoLmZsb29yKHRoaXMudGlja0NvdW50ZXIgJSA2MCk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aGlzLnRpY2tDb3VudGVyIC8gNjApICUgNjApO1xuICAgICAgICAgICAgdGhpcy5ob3VycyA9IE1hdGguZmxvb3IoKHRoaXMudGlja0NvdW50ZXIgLyAzNjAwKSAlIDI0KTtcbiAgICAgICAgICAgIHRoaXMuZGF5cyA9IE1hdGguZmxvb3IodGhpcy50aWNrQ291bnRlciAvIDM2MDAgLyAyNCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhUaW1lVW5pdCA9PT0gJ3NlY29uZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMudGlja0NvdW50ZXI7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSAwO1xuICAgICAgICAgICAgdGhpcy5ob3VycyA9IDA7XG4gICAgICAgICAgICB0aGlzLmRheXMgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWF4VGltZVVuaXQgPT09ICdtaW51dGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSBNYXRoLmZsb29yKHRoaXMudGlja0NvdW50ZXIgJSA2MCk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKHRoaXMudGlja0NvdW50ZXIgLyA2MCk7XG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGF5cyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhUaW1lVW5pdCA9PT0gJ2hvdXInKSB7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSBNYXRoLmZsb29yKHRoaXMudGlja0NvdW50ZXIgJSA2MCk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aGlzLnRpY2tDb3VudGVyIC8gNjApICUgNjApO1xuICAgICAgICAgICAgdGhpcy5ob3VycyA9IE1hdGguZmxvb3IodGhpcy50aWNrQ291bnRlciAvIDM2MDApO1xuICAgICAgICAgICAgdGhpcy5kYXlzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aWNrQ291bnRlciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsdC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJ1RpbWUgdXAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdGljayBjb3VudCwgYmFzZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhcnRUaWNrQ291bnQoKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIHRoYXQudGltZW91dElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvdW50ZXI7XG4gICAgICAgICAgICBpZiAodGhhdC5jb3VudGRvd24pIHtcbiAgICAgICAgICAgICAgICAvLyBDb21wdXRlIGZpbmlzaCBjb3VudGVyIGZvciBjb3VudGRvd25cbiAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhhdC50aWNrQ291bnRlcjtcblxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnN0YXJ0VGltZSA+IHRoYXQuZW5kVGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhhdC50aWNrQ291bnRlciAtIHRoYXQuZW5kVGltZSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDb21wdXRlIGZpbmlzaCBjb3VudGVyIGZvciB0aW1lclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSB0aGF0LnRpY2tDb3VudGVyIC0gdGhhdC5zdGFydFRpbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhhdC5lbmRUaW1lID4gdGhhdC5zdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciA9IHRoYXQuZW5kVGltZSAtIHRoYXQudGlja0NvdW50ZXIgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhhdC5jb21wdXRlVGltZVVuaXRzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVyOiBUaW1lSW50ZXJmYWNlID0ge1xuICAgICAgICAgICAgICAgIHNlY29uZHM6IHRoYXQuc2Vjb25kcyxcbiAgICAgICAgICAgICAgICBtaW51dGVzOiB0aGF0Lm1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgaG91cnM6IHRoYXQuaG91cnMsXG4gICAgICAgICAgICAgICAgZGF5czogdGhhdC5kYXlzLFxuICAgICAgICAgICAgICAgIHRpbWVyOiB0aGF0LnRpbWVvdXRJZCxcbiAgICAgICAgICAgICAgICB0aWNrX2NvdW50OiB0aGF0LnRpY2tDb3VudGVyLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhhdC5vblRpY2suZW1pdCh0aW1lcik7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgdGhhdC5vbkNvbXBsZXRlLmVtaXQodGhhdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhhdC5jb3VudGRvd24pIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRpY2tDb3VudGVyLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoYXQudGlja0NvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7IC8vIEVhY2ggc2Vjb25kc1xuICAgIH1cbn1cbiJdfQ==
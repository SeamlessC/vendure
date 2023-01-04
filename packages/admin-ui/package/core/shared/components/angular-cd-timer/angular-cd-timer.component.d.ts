import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { TimeInterface } from './angular-cd-timer.interface';
export declare class CdTimerComponent implements AfterViewInit, OnDestroy {
    private elt;
    private renderer;
    private timeoutId;
    private tickCounter;
    private ngContentSchema;
    private seconds;
    private minutes;
    private hours;
    private days;
    scheduledTime?: Date;
    startTime: number;
    endTime: number;
    processingTime: number;
    countdown: boolean;
    autoStart: boolean;
    maxTimeUnit: string;
    placedTime: Date;
    format: string;
    onStart: EventEmitter<CdTimerComponent>;
    onStop: EventEmitter<CdTimerComponent>;
    onTick: EventEmitter<TimeInterface>;
    onComplete: EventEmitter<CdTimerComponent>;
    constructor(elt: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Start the timer
     */
    start(): void;
    /**
     * Resume the timer
     */
    resume(): void;
    /**
     * Stop the timer
     */
    stop(): void;
    /**
     * Reset the timer
     */
    reset(): void;
    /**
     * Get the time information
     * @returns TimeInterface
     */
    get(): {
        seconds: number;
        minutes: number;
        hours: number;
        days: number;
        timer: any;
        tick_count: number;
    };
    /**
     * Initialize variable before start
     */
    private initVar;
    /**
     * Reset timeout
     */
    private resetTimeout;
    /**
     * Render the time to DOM
     */
    private renderText;
    private clear;
    /**
     * Compute each unit (seconds, minutes, hours, days) for further manipulation
     * @protected
     */
    protected computeTimeUnits(): void;
    /**
     * Start tick count, base of this component
     * @protected
     */
    protected startTickCount(): void;
}

import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * A form input control which displays currency in decimal format, whilst working
 * with the integer cent value in the background.
 *
 * @example
 * ```HTML
 * <vdr-currency-input
 *     [(ngModel)]="entityPrice"
 *     [currencyCode]="currencyCode"
 * ></vdr-currency-input>
 * ```
 *
 * @docsCategory components
 */
export declare class CurrencyInputComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    private dataService;
    private changeDetectorRef;
    disabled: boolean;
    readonly: boolean;
    value: number;
    currencyCode: string;
    valueChange: EventEmitter<any>;
    prefix$: Observable<string>;
    suffix$: Observable<string>;
    hasFractionPart: boolean;
    onChange: (val: any) => void;
    onTouch: () => void;
    _inputValue: string;
    private currencyCode$;
    private subscription;
    constructor(dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(value: string): void;
    onFocus(): void;
    writeValue(value: any): void;
    private toNumericString;
}

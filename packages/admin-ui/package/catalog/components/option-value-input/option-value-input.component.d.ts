import { ChangeDetectorRef, ElementRef, EventEmitter, Provider, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const OPTION_VALUE_INPUT_VALUE_ACCESSOR: Provider;
interface Option {
    id?: string;
    name: string;
    locked: boolean;
}
export declare class OptionValueInputComponent implements ControlValueAccessor {
    private changeDetector;
    groupName: string;
    textArea: ElementRef<HTMLTextAreaElement>;
    nameInputs: QueryList<ElementRef>;
    options: Option[];
    add: EventEmitter<Option>;
    remove: EventEmitter<Option>;
    edit: EventEmitter<{
        index: number;
        option: Option;
    }>;
    disabled: boolean;
    input: string;
    isFocussed: boolean;
    lastSelected: boolean;
    formValue: Option[];
    editingIndex: number;
    onChangeFn: (value: any) => void;
    onTouchFn: (value: any) => void;
    get optionValues(): Option[];
    constructor(changeDetector: ChangeDetectorRef);
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: any): void;
    focus(): void;
    editName(index: number, event: MouseEvent): void;
    updateOption(index: number, event: InputEvent): void;
    removeOption(option: Option): void;
    handleKey(event: KeyboardEvent): void;
    handleBlur(): void;
    private addOptionValue;
    private parseInputIntoOptions;
    private removeLastOption;
}
export {};

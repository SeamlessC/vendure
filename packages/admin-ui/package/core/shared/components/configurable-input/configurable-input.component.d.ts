import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigArg, ConfigArgDefinition, ConfigurableOperation, ConfigurableOperationDefinition } from '../../../common/generated-types';
/**
 * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
 */
export declare class ConfigurableInputComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
    operation?: ConfigurableOperation;
    operationDefinition?: ConfigurableOperationDefinition;
    readonly: boolean;
    removable: boolean;
    position: number;
    remove: EventEmitter<ConfigurableOperation>;
    argValues: {
        [name: string]: any;
    };
    onChange: (val: any) => void;
    onTouch: () => void;
    form: FormGroup;
    positionChange$: Observable<number>;
    private positionChangeSubject;
    private subscription;
    interpolateDescription(): string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    trackByName(index: number, arg: ConfigArg): string;
    getArgDef(arg: ConfigArg): ConfigArgDefinition | undefined;
    private createForm;
    validate(c: AbstractControl): ValidationErrors | null;
}

import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { DefaultFormComponentConfig } from '@vendure/common/lib/shared-types';
import { CodeJar } from 'codejar';
import { FormInputComponent } from '../../../common/component-registry-types';
export interface CodeEditorConfig {
    validator: ValidatorFn;
    getErrorMessage: (content: string) => string | undefined;
    highlight: (content: string, errorPos: number | undefined) => string;
}
export declare abstract class BaseCodeEditorFormInputComponent implements FormInputComponent, AfterViewInit {
    protected changeDetector: ChangeDetectorRef;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'json-editor-form-input'>;
    isValid: boolean;
    errorMessage: string | undefined;
    private editorElementRef;
    jar: CodeJar;
    private highlight;
    private getErrorMessage;
    protected constructor(changeDetector: ChangeDetectorRef);
    get height(): string | undefined;
    configure(config: CodeEditorConfig): void;
    ngAfterViewInit(): void;
    protected getErrorPos(errorMessage: string | undefined): number | undefined;
}

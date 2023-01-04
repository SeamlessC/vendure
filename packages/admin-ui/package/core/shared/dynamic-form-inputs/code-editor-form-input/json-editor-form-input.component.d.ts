import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
import { BaseCodeEditorFormInputComponent } from './base-code-editor-form-input.component';
export declare function jsonValidator(): ValidatorFn;
/**
 * @description
 * A JSON editor input with syntax highlighting and error detection. Works well
 * with `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export declare class JsonEditorFormInputComponent extends BaseCodeEditorFormInputComponent implements FormInputComponent, AfterViewInit, OnInit {
    protected changeDetector: ChangeDetectorRef;
    static readonly id: DefaultFormComponentId;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
}

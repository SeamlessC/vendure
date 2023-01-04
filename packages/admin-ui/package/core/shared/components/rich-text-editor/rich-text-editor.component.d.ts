import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ContextMenuService } from './prosemirror/context-menu/context-menu.service';
import { ProsemirrorService } from './prosemirror/prosemirror.service';
/**
 * @description
 * A rich text (HTML) editor based on Prosemirror (https://prosemirror.net/)
 *
 * @example
 * ```HTML
 * <vdr-rich-text-editor
 *     [(ngModel)]="description"
 *     label="Description"
 * ></vdr-rich-text-editor>
 * ```
 *
 * @docsCategory components
 */
export declare class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private changeDetector;
    private prosemirrorService;
    private viewContainerRef;
    contextMenuService: ContextMenuService;
    label: string;
    set readonly(value: any);
    _readonly: boolean;
    onChange: (val: any) => void;
    onTouch: () => void;
    private value;
    private editorEl;
    constructor(changeDetector: ChangeDetectorRef, prosemirrorService: ProsemirrorService, viewContainerRef: ViewContainerRef, contextMenuService: ContextMenuService);
    get menuElement(): HTMLDivElement | null;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
}

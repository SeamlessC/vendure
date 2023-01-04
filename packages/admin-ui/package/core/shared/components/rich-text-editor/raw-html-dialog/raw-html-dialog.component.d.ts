import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigArgDefinition } from '../../../../common/generated-types';
import { Dialog } from '../../../../providers/modal/modal.service';
export declare class RawHtmlDialogComponent implements OnInit, Dialog<string> {
    html: string;
    formControl: FormControl;
    config: ConfigArgDefinition;
    resolveWith: (html: string | undefined) => void;
    ngOnInit(): void;
    process(str: string): string;
    /**
     * Taken from https://stackoverflow.com/a/26361620/772859
     */
    format(node: Element, level?: number): Element;
    cancel(): void;
    select(): void;
}

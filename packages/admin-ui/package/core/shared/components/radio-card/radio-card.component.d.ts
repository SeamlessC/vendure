import { ChangeDetectorRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { RadioCardFieldsetComponent } from './radio-card-fieldset.component';
export declare class RadioCardComponent<T = any> implements OnInit, OnDestroy {
    private fieldset;
    private changeDetector;
    item: T;
    itemTemplate: TemplateRef<T>;
    constructor(fieldset: RadioCardFieldsetComponent, changeDetector: ChangeDetectorRef);
    private idChange$;
    private subscription;
    name: string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    isSelected(item: T): boolean;
    isFocussed(item: T): boolean;
    selectChanged(item: T): void;
    setFocussedId(item: T | undefined): void;
    getItemId(item: T): string;
}

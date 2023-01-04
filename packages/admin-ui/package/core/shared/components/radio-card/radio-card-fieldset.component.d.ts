import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
export declare class RadioCardFieldsetComponent<T = any> implements OnInit, OnChanges, OnDestroy {
    private changeDetector;
    selectedItemId: string;
    idFn: (item: T) => string;
    selectItem: EventEmitter<T>;
    groupName: string;
    selectedIdChange$: Subject<string>;
    focussedId: string | undefined;
    private idChange$;
    private subscription;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    isSelected(item: T): boolean;
    isFocussed(item: T): boolean;
    selectChanged(item: T): void;
    setFocussedId(item: T | undefined): void;
}

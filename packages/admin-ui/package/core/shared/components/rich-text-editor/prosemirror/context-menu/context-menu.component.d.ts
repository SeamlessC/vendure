import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextMenuConfig, ContextMenuItem, ContextMenuService } from './context-menu.service';
export declare class ContextMenuComponent implements AfterViewInit, OnDestroy {
    private overlay;
    private viewContainerRef;
    contextMenuService: ContextMenuService;
    editorMenuElement: HTMLElement | null | undefined;
    private menuTemplate;
    menuConfig: ContextMenuConfig | undefined;
    hideTrigger$: Observable<boolean>;
    private triggerIsHidden;
    private menuPortal;
    private overlayRef;
    private contextMenuSub;
    private contentArea;
    private hideTriggerHandler;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, contextMenuService: ContextMenuService);
    onScroll: () => void;
    ngAfterViewInit(): void;
    triggerClick(): void;
    ngOnDestroy(): void;
    clickItem(item: ContextMenuItem): void;
    private getPositionStrategy;
    /** Inverts an overlay position. */
    private invertPosition;
}

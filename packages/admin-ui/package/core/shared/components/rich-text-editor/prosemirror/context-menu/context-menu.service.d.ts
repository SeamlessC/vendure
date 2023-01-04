import { Observable } from 'rxjs';
export interface ContextMenuConfig {
    ref: any;
    iconShape?: string;
    title: string;
    element: Element;
    coords: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    items: ContextMenuItem[];
}
export interface ContextMenuItem {
    separator?: boolean;
    iconClass?: string;
    iconShape?: string;
    label: string;
    enabled: boolean;
    onClick: () => void;
}
export declare class ContextMenuService {
    contextMenu$: Observable<ContextMenuConfig | undefined>;
    private menuIsVisible$;
    private setContextMenuConfig$;
    constructor();
    setVisibility(isVisible: boolean): void;
    setContextMenu(config: ContextMenuConfig): void;
    clearContextMenu(): void;
}

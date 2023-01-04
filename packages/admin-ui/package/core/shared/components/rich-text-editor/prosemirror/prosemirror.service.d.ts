import { Injector } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Observable } from 'rxjs';
import { ContextMenuService } from './context-menu/context-menu.service';
export interface CreateEditorViewOptions {
    onTextInput: (content: string) => void;
    element: HTMLElement;
    isReadOnly: () => boolean;
}
export declare class ProsemirrorService {
    private injector;
    private contextMenuService;
    editorView: EditorView;
    private mySchema;
    private enabled;
    constructor(injector: Injector, contextMenuService: ContextMenuService);
    contextMenuItems$: Observable<string>;
    createEditorView(options: CreateEditorViewOptions): void;
    update(text: string): void;
    destroy(): void;
    setEnabled(enabled: boolean): void;
    private getStateFromText;
    private getTextFromState;
    private configurePlugins;
}

import { MenuItem } from 'prosemirror-menu';
import { NodeType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ModalService } from '../../../../../providers/modal/modal.service';
import { ContextMenuService } from '../context-menu/context-menu.service';
export declare function insertImageItem(nodeType: NodeType, modalService: ModalService): MenuItem;
export declare const imageContextMenuPlugin: (contextMenuService: ContextMenuService, modalService: ModalService) => Plugin<any>;

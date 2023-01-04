import { Schema } from 'prosemirror-model';
export interface SetupOptions {
    schema: Schema;
    mapKeys?: Keymap;
    menuBar?: boolean;
    history?: boolean;
    floatingMenu?: boolean;
}
export declare type Keymap = Record<string, string | false>;

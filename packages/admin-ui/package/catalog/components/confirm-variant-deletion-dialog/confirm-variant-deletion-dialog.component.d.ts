import { Dialog, GetProductVariantOptions } from '@vendure/admin-ui/core';
export declare class ConfirmVariantDeletionDialogComponent implements Dialog<boolean> {
    resolveWith: (result?: boolean) => void;
    variants: GetProductVariantOptions.Variants[];
    confirm(): void;
    cancel(): void;
}

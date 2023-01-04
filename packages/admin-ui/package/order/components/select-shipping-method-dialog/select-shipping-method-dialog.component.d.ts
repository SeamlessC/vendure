import { OnInit } from '@angular/core';
import { CurrencyCode, Dialog, DraftOrderEligibleShippingMethodsQuery } from '@vendure/admin-ui/core';
declare type ShippingMethodQuote = DraftOrderEligibleShippingMethodsQuery['eligibleShippingMethodsForDraftOrder'][number];
export declare class SelectShippingMethodDialogComponent implements OnInit, Dialog<string> {
    resolveWith: (result?: string) => void;
    eligibleShippingMethods: ShippingMethodQuote[];
    currentSelectionId: string;
    currencyCode: CurrencyCode;
    selectedMethod: ShippingMethodQuote | undefined;
    constructor();
    ngOnInit(): void;
    methodIdFn(item: ShippingMethodQuote): string;
    cancel(): void;
    select(): void;
}
export {};

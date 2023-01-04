import { EventEmitter } from '@angular/core';
import { GetOrderHistory, HistoryEntry, HistoryEntryType, OrderDetail, OrderDetailFragment, TimelineDisplayType } from '@vendure/admin-ui/core';
export declare class OrderHistoryComponent {
    order: OrderDetailFragment;
    history: GetOrderHistory.Items[];
    addNote: EventEmitter<{
        note: string;
        isPublic: boolean;
    }>;
    updateNote: EventEmitter<HistoryEntry>;
    deleteNote: EventEmitter<HistoryEntry>;
    note: string;
    noteIsPrivate: boolean;
    expanded: boolean;
    readonly type: typeof HistoryEntryType;
    getDisplayType(entry: GetOrderHistory.Items): TimelineDisplayType;
    getTimelineIcon(entry: GetOrderHistory.Items): string[] | "note" | "ban" | "credit-card" | "pencil" | "truck" | undefined;
    isFeatured(entry: GetOrderHistory.Items): boolean;
    getFulfillment(entry: GetOrderHistory.Items): OrderDetail.Fulfillments | undefined;
    getPayment(entry: GetOrderHistory.Items): OrderDetail.Payments | undefined;
    getCancelledItems(entry: GetOrderHistory.Items): Array<{
        name: string;
        quantity: number;
    }>;
    getModification(id: string): ({
        __typename?: "OrderModification" | undefined;
    } & Pick<import("@vendure/admin-ui/core").OrderModification, "id" | "createdAt" | "isSettled" | "priceChange" | "note"> & {
        payment?: import("@vendure/admin-ui/core").Maybe<{
            __typename?: "Payment" | undefined;
        } & Pick<import("@vendure/admin-ui/core").Payment, "id" | "amount">> | undefined;
        orderItems?: import("@vendure/admin-ui/core").Maybe<({
            __typename?: "OrderItem" | undefined;
        } & Pick<import("@vendure/admin-ui/core").OrderItem, "id">)[]> | undefined;
        refund?: import("@vendure/admin-ui/core").Maybe<{
            __typename?: "Refund" | undefined;
        } & Pick<import("@vendure/admin-ui/core").Refund, "id" | "total" | "paymentId">> | undefined;
        surcharges?: import("@vendure/admin-ui/core").Maybe<({
            __typename?: "Surcharge" | undefined;
        } & Pick<import("@vendure/admin-ui/core").Surcharge, "id">)[]> | undefined;
    }) | undefined;
    getName(entry: GetOrderHistory.Items): string;
    addNoteToOrder(): void;
}

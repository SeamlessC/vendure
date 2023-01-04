import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, OrderDetail, OrderDetailFragment } from '@vendure/admin-ui/core';
export declare class OrderTableComponent implements OnInit {
    order: OrderDetail.Fragment;
    orderLineCustomFields: CustomFieldConfig[];
    isDraft: boolean;
    adjust: EventEmitter<{
        lineId: string;
        quantity: number;
    }>;
    remove: EventEmitter<{
        lineId: string;
    }>;
    orderLineCustomFieldsVisible: boolean;
    customFieldsForLine: {
        [lineId: string]: Array<{
            config: CustomFieldConfig;
            formGroup: FormGroup;
            value: any;
        }>;
    };
    get visibleOrderLineCustomFields(): CustomFieldConfig[];
    get showElided(): boolean;
    ngOnInit(): void;
    draftInputBlur(line: OrderDetailFragment['lines'][number], quantity: number): void;
    toggleOrderLineCustomFields(): void;
    getLineDiscounts(line: OrderDetail.Lines): ({
        __typename?: "Discount" | undefined;
    } & {
        __typename?: "Discount" | undefined;
    } & Pick<import("@vendure/admin-ui/core").Discount, "description" | "adjustmentSource" | "amount" | "amountWithTax" | "type">)[];
    private getLineCustomFields;
    getPromotionLink(promotion: OrderDetail.Discounts): any[];
    getCouponCodeForAdjustment(order: OrderDetail.Fragment, promotionAdjustment: OrderDetail.Discounts): string | undefined;
    getShippingNames(order: OrderDetail.Fragment): string;
}

import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, DataService, DraftOrderEligibleShippingMethodsQuery, ModalService, NotificationService, Order, OrderDetail, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
import { OrderTransitionService } from '../../providers/order-transition.service';
export declare class DraftOrderDetailComponent extends BaseDetailComponent<OrderDetail.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private notificationService;
    private modalService;
    private orderTransitionService;
    detailForm: FormGroup;
    eligibleShippingMethods$: Observable<DraftOrderEligibleShippingMethodsQuery['eligibleShippingMethodsForDraftOrder']>;
    nextStates$: Observable<string[]>;
    fetchHistory: Subject<void>;
    customFields: CustomFieldConfig[];
    orderLineCustomFields: CustomFieldConfig[];
    displayCouponCodeInput: boolean;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, notificationService: NotificationService, modalService: ModalService, orderTransitionService: OrderTransitionService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    addItemToOrder(event: {
        productVariantId: string;
        quantity: number;
        customFields: any;
    }): void;
    adjustOrderLine(event: {
        lineId: string;
        quantity: number;
    }): void;
    removeOrderLine(event: {
        lineId: string;
    }): void;
    getOrderAddressLines(orderAddress?: {
        [key: string]: string;
    }): string[];
    setCustomer(): void;
    setShippingAddress(): void;
    setBillingAddress(): void;
    applyCouponCode(couponCode: string): void;
    removeCouponCode(couponCode: string): void;
    setShippingMethod(): void;
    updateCustomFields(customFieldsValue: any): void;
    deleteOrder(): void;
    completeOrder(): void;
    private hasId;
    protected setFormValues(entity: Order.Fragment): void;
}

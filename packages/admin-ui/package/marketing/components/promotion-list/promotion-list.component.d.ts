import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetPromotionList } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare type PromotionSearchForm = {
    name: string;
    couponCode: string;
};
export declare class PromotionListComponent extends BaseListComponent<GetPromotionList.Query, GetPromotionList.Items> implements OnInit {
    private dataService;
    private notificationService;
    private modalService;
    searchForm: FormGroup;
    constructor(dataService: DataService, router: Router, route: ActivatedRoute, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    deletePromotion(promotionId: string): void;
    private createQueryOptions;
}

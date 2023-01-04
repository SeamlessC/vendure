import { OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetOrderList, LocalStorageService, ModalService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
import { Order } from '@vendure/common/lib/generated-types';
import { Observable } from 'rxjs';
interface OrderFilterConfig {
    active?: boolean;
    states?: string[];
}
interface FilterPreset {
    name: string;
    label: string;
    config: OrderFilterConfig;
}
export declare class OrderListComponent extends BaseListComponent<GetOrderList.Query, GetOrderList.Items> implements OnInit, OnDestroy {
    private serverConfigService;
    private dataService;
    private localStorageService;
    private modalService;
    private notificationService;
    itemList: GetOrderList.Items[];
    audioElem: HTMLAudioElement;
    refreshInterval: any;
    processingTime: number;
    audioOn: boolean;
    searchControl: FormControl;
    searchOrderCodeControl: FormControl;
    searchLastNameControl: FormControl;
    customFilterForm: FormGroup;
    orderStates: string[];
    filterPresets: FilterPreset[];
    activePreset$: Observable<string>;
    canCreateDraftOrder: boolean;
    constructor(serverConfigService: ServerConfigService, dataService: DataService, localStorageService: LocalStorageService, router: Router, route: ActivatedRoute, modalService: ModalService, notificationService: NotificationService);
    ngOnInit(): Promise<void>;
    toggleAudio(): void;
    playAudio(): void;
    formatTime(date: Date): string;
    formatDate(date: Date): string;
    getNextState(order: Order, buttonText?: boolean): "Completed" | "Processing" | "Ready For Pickup" | "ReadyForPickup" | "Delivering" | "Collect Cash";
    toNextState(order: Order): import("rxjs").Subscription;
    selectFilterPreset(presetName: string): void;
    applyCustomFilters(): void;
    private createQueryOptions;
    getShippingNames(order: Order): string;
    ngOnDestroy(): void;
}
export {};

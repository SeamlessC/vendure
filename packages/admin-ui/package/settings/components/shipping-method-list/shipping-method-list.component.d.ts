import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetActiveChannel, GetShippingMethodList, LanguageCode, ModalService, NotificationService, ServerConfigService, ShippingMethodQuote } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { TestAddress } from '../test-address-form/test-address-form.component';
import { TestOrderLine } from '../test-order-builder/test-order-builder.component';
export declare class ShippingMethodListComponent extends BaseListComponent<GetShippingMethodList.Query, GetShippingMethodList.Items> implements OnInit {
    private modalService;
    private notificationService;
    private dataService;
    private serverConfigService;
    activeChannel$: Observable<GetActiveChannel.ActiveChannel>;
    testAddress: TestAddress;
    testOrderLines: TestOrderLine[];
    testDataUpdated: boolean;
    testResult$: Observable<ShippingMethodQuote[] | undefined>;
    availableLanguages$: Observable<LanguageCode[]>;
    contentLanguage$: Observable<LanguageCode>;
    private fetchTestResult$;
    constructor(modalService: ModalService, notificationService: NotificationService, dataService: DataService, serverConfigService: ServerConfigService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    deleteShippingMethod(id: string): void;
    setTestOrderLines(event: TestOrderLine[]): void;
    setTestAddress(event: TestAddress): void;
    allTestDataPresent(): boolean;
    runTest(): void;
    setLanguage(code: LanguageCode): void;
}

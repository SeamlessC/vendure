import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, OrderDetail, ServerConfigService } from '@vendure/admin-ui/core';
export declare class FulfillmentDetailComponent implements OnInit, OnChanges {
    private serverConfigService;
    fulfillmentId: string;
    order: OrderDetail.Fragment;
    customFieldConfig: CustomFieldConfig[];
    customFieldFormGroup: FormGroup;
    constructor(serverConfigService: ServerConfigService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    get fulfillment(): OrderDetail.Fulfillments | undefined | null;
    get items(): Array<{
        name: string;
        quantity: number;
    }>;
    buildCustomFieldsFormGroup(): void;
    customFieldIsObject(customField: unknown): boolean;
}

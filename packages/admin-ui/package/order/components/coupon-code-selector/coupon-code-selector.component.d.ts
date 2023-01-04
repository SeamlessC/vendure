import { OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
export declare class CouponCodeSelectorComponent implements OnInit {
    private dataService;
    couponCodes: string[];
    control: FormControl | undefined;
    addCouponCode: EventEmitter<string>;
    removeCouponCode: EventEmitter<string>;
    availableCouponCodes$: Observable<Array<{
        code: string;
        promotionName: string;
    }>>;
    couponCodeInput$: Subject<string>;
    constructor(dataService: DataService);
    ngOnInit(): void;
}

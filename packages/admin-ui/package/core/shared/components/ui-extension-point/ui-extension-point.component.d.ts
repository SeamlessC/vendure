import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIExtensionLocationId } from '../../../common/component-registry-types';
import { DataService } from '../../../data/providers/data.service';
export declare class UiExtensionPointComponent implements OnInit {
    private dataService;
    locationId: UIExtensionLocationId;
    topPx: number;
    leftPx: number;
    api: 'actionBar' | 'navMenu' | 'detailComponent';
    display$: Observable<boolean>;
    readonly isDevMode: boolean;
    constructor(dataService: DataService);
    ngOnInit(): void;
}

import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetFacetList, LanguageCode, ModalService, NotificationService, SelectionManager, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class FacetListComponent extends BaseListComponent<GetFacetList.Query, GetFacetList.Items> implements OnInit {
    private dataService;
    private modalService;
    private notificationService;
    private serverConfigService;
    filterTermControl: FormControl;
    availableLanguages$: Observable<LanguageCode[]>;
    contentLanguage$: Observable<LanguageCode>;
    readonly initialLimit = 3;
    displayLimit: {
        [id: string]: number;
    };
    selectionManager: SelectionManager<GetFacetList.Items>;
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService, serverConfigService: ServerConfigService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    toggleDisplayLimit(facet: GetFacetList.Items): void;
    deleteFacet(facetValueId: string): void;
    setLanguage(code: LanguageCode): void;
    private showModalAndDelete;
}

import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService, GetCountryList, GetZones, LanguageCode, ModalService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class CountryListComponent implements OnInit, OnDestroy {
    private dataService;
    private notificationService;
    private modalService;
    private serverConfigService;
    searchTerm: FormControl;
    countriesWithZones$: Observable<Array<GetCountryList.Items & {
        zones: GetZones.Zones[];
    }>>;
    zones$: Observable<GetZones.Zones[]>;
    availableLanguages$: Observable<LanguageCode[]>;
    contentLanguage$: Observable<LanguageCode>;
    private countries;
    private destroy$;
    private refresh$;
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService, serverConfigService: ServerConfigService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setLanguage(code: LanguageCode): void;
    deleteCountry(countryId: string): void;
    private isZone;
}

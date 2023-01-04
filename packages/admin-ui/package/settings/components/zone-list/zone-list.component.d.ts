import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, GetZones, LanguageCode, ModalService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class ZoneListComponent implements OnInit {
    private dataService;
    private notificationService;
    private modalService;
    private route;
    private router;
    private serverConfigService;
    activeZone$: Observable<GetZones.Zones | undefined>;
    zones$: Observable<GetZones.Zones[]>;
    members$: Observable<GetZones.Members[]>;
    availableLanguages$: Observable<LanguageCode[]>;
    contentLanguage$: Observable<LanguageCode>;
    selectedMemberIds: string[];
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService, route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService);
    ngOnInit(): void;
    setLanguage(code: LanguageCode): void;
    create(): void;
    delete(zoneId: string): void;
    update(zone: GetZones.Zones): void;
    closeMembers(): void;
    addToZone(zone: GetZones.Zones): void;
    removeFromZone(zone: GetZones.Zones, memberIds: string[]): void;
}

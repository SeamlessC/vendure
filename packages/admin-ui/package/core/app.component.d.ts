import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data/providers/data.service';
import { ServerConfigService } from './data/server-config';
import { LocalStorageService } from './providers/local-storage/local-storage.service';
export declare class AppComponent implements OnInit {
    private dataService;
    private serverConfigService;
    private localStorageService;
    private document?;
    loading$: Observable<boolean>;
    private _document?;
    constructor(dataService: DataService, serverConfigService: ServerConfigService, localStorageService: LocalStorageService, document?: any);
    ngOnInit(): void;
    handleGlobalHotkeys(event: KeyboardEvent): void;
}

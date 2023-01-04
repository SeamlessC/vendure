import { Router } from '@angular/router';
import { BaseEntityResolver, Collection, DataService } from '@vendure/admin-ui/core';
export declare class CollectionResolver extends BaseEntityResolver<Collection.Fragment> {
    constructor(router: Router, dataService: DataService);
}

import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, GetProductWithVariants } from '@vendure/admin-ui/core';
export declare class ProductResolver extends BaseEntityResolver<GetProductWithVariants.Product> {
    constructor(dataService: DataService, router: Router);
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService, } from '@vendure/admin-ui/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
export class DraftOrderVariantSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.addItem = new EventEmitter();
        this.customFieldsFormGroup = new FormGroup({});
        this.selectedVariantId$ = new Subject();
        this.quantity = 1;
    }
    ngOnInit() {
        this.selectedVariant$ = this.selectedVariantId$.pipe(switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductVariant(id)
                    .mapSingle(({ productVariant }) => productVariant);
            }
            else {
                return [undefined];
            }
        }));
        for (const customField of this.orderLineCustomFields) {
            this.customFieldsFormGroup.addControl(customField.name, new FormControl(''));
        }
    }
    addItemClick(selectedVariant) {
        if (selectedVariant) {
            this.addItem.emit({
                productVariantId: selectedVariant.id,
                quantity: this.quantity,
                customFields: this.orderLineCustomFields.length
                    ? this.customFieldsFormGroup.value
                    : undefined,
            });
            this.selectedVariantId$.next(undefined);
            this.customFieldsFormGroup.reset();
        }
    }
}
DraftOrderVariantSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-draft-order-variant-selector',
                template: "<div class=\"card\">\n    <div class=\"card-block\">\n        <h4 class=\"card-title\">{{ 'order.add-item-to-order' | translate }}</h4>\n        <vdr-product-selector\n            (productSelected)=\"selectedVariantId$.next($event.productVariantId)\"\n        ></vdr-product-selector>\n    </div>\n    <div class=\"card-block\" *ngIf=\"selectedVariant$ | async as selectedVariant\">\n        <div class=\"variant-details\">\n            <img class=\"mr2\" [src]=\"selectedVariant.featuredAsset || selectedVariant.product.featuredAsset | assetPreview: 32\">\n            <div class=\"details\">\n                <div>{{ selectedVariant?.name }}</div>\n                <div class=\"small\">{{ selectedVariant?.sku }}</div>\n            </div>\n            <div class=\"details ml4\">\n                <div class=\"small\">\n                    {{ 'catalog.stock-on-hand' | translate }}: {{ selectedVariant.stockOnHand }}\n                </div>\n                <div class=\"small\">\n                    {{ 'catalog.stock-allocated' | translate }}: {{ selectedVariant.stockAllocated }}\n                </div>\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"details\">\n                <div>{{ selectedVariant?.priceWithTax | localeCurrency: currencyCode }}</div>\n                <div class=\"small\" [title]=\"'order.net-price' | translate\">\n                    {{ selectedVariant?.price | localeCurrency: currencyCode }}\n                </div>\n            </div>\n            <div>\n                <input [disabled]=\"!selectedVariant\" type=\"number\" min=\"0\" [(ngModel)]=\"quantity\" />\n            </div>\n            <button\n                [disabled]=\"!selectedVariant\"\n                class=\"btn btn-small btn-primary\"\n                (click)=\"addItemClick(selectedVariant)\"\n            >\n                {{ 'order.add-item-to-order' | translate }}\n            </button>\n        </div>\n        <ng-container *ngIf=\"orderLineCustomFields.length\">\n            <div class=\"custom-field\" *ngFor=\"let field of orderLineCustomFields\">\n                <vdr-custom-field-control\n                    [compact]=\"true\"\n                    [readonly]=\"false\"\n                    [customField]=\"field\"\n                    [customFieldsFormGroup]=\"customFieldsFormGroup\"\n                ></vdr-custom-field-control>\n            </div>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".variant-details{display:flex;align-items:center}.variant-details img{border-radius:var(--border-radius-img);width:32px;height:32px}.variant-details .details{font-size:.65rem;line-height:.7rem}.variant-details input{width:48px;margin:0 6px}.variant-details .small{font-size:11px;color:var(--color-text-300)}\n"]
            },] }
];
DraftOrderVariantSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
DraftOrderVariantSelectorComponent.propDecorators = {
    currencyCode: [{ type: Input }],
    orderLineCustomFields: [{ type: Input }],
    addItem: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZnQtb3JkZXItdmFyaWFudC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2RyYWZ0LW9yZGVyLXZhcmlhbnQtc2VsZWN0b3IvZHJhZnQtb3JkZXItdmFyaWFudC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFHSCxXQUFXLEdBSWQsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzQyxNQUFNLE9BQU8sa0NBQWtDO0lBUTNDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGxDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBcUUsQ0FBQztRQUMxRywwQkFBcUIsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUxQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQzNDLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFDa0MsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQ2hELFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxFQUFFO2dCQUNKLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO3FCQUMxQixpQkFBaUIsQ0FBQyxFQUFFLENBQUM7cUJBQ3JCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFEO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN0QjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNsRCxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsZUFBeUQ7UUFDbEUsSUFBSSxlQUFlLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLEVBQUU7Z0JBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNO29CQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7b0JBQ2xDLENBQUMsQ0FBQyxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQzs7O1lBN0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1Qyw0NkVBQTREO2dCQUU1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWJHLFdBQVc7OzsyQkFlVixLQUFLO29DQUNMLEtBQUs7c0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDdXJyZW5jeUNvZGUsXG4gICAgQ3VzdG9tRmllbGRDb25maWcsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgR2V0UHJvZHVjdFZhcmlhbnQsXG4gICAgR2V0UHJvZHVjdFZhcmlhbnRRdWVyeSxcbiAgICBQcm9kdWN0U2VsZWN0b3JTZWFyY2hRdWVyeSxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWRyYWZ0LW9yZGVyLXZhcmlhbnQtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kcmFmdC1vcmRlci12YXJpYW50LXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kcmFmdC1vcmRlci12YXJpYW50LXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERyYWZ0T3JkZXJWYXJpYW50U2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5Q29kZTogQ3VycmVuY3lDb2RlO1xuICAgIEBJbnB1dCgpIG9yZGVyTGluZUN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBAT3V0cHV0KCkgYWRkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBwcm9kdWN0VmFyaWFudElkOiBzdHJpbmc7IHF1YW50aXR5OiBudW1iZXI7IGN1c3RvbUZpZWxkczogYW55IH0+KCk7XG4gICAgY3VzdG9tRmllbGRzRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgc2VsZWN0ZWRWYXJpYW50JDogT2JzZXJ2YWJsZTxHZXRQcm9kdWN0VmFyaWFudFF1ZXJ5Wydwcm9kdWN0VmFyaWFudCddPjtcbiAgICBzZWxlY3RlZFZhcmlhbnRJZCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgcXVhbnRpdHkgPSAxO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYXJpYW50JCA9IHRoaXMuc2VsZWN0ZWRWYXJpYW50SWQkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoaWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdFZhcmlhbnQoaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKCh7IHByb2R1Y3RWYXJpYW50IH0pID0+IHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3VuZGVmaW5lZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIGZvciAoY29uc3QgY3VzdG9tRmllbGQgb2YgdGhpcy5vcmRlckxpbmVDdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzRm9ybUdyb3VwLmFkZENvbnRyb2woY3VzdG9tRmllbGQubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRJdGVtQ2xpY2soc2VsZWN0ZWRWYXJpYW50OiBHZXRQcm9kdWN0VmFyaWFudFF1ZXJ5Wydwcm9kdWN0VmFyaWFudCddKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZFZhcmlhbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbS5lbWl0KHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudElkOiBzZWxlY3RlZFZhcmlhbnQuaWQsXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLm9yZGVyTGluZUN1c3RvbUZpZWxkcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmN1c3RvbUZpZWxkc0Zvcm1Hcm91cC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhcmlhbnRJZCQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHNGb3JtR3JvdXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
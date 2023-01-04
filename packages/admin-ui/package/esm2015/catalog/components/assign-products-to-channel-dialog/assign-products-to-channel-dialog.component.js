import { __awaiter } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { combineLatest, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export class AssignProductsToChannelDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.priceFactorControl = new FormControl(1);
        this.selectedChannelIdControl = new FormControl();
    }
    get isProductVariantMode() {
        return this.productVariantIds != null;
    }
    ngOnInit() {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        const allChannels$ = this.dataService.settings.getChannels().mapSingle(data => data.channels);
        combineLatest(activeChannelId$, allChannels$).subscribe(([activeChannelId, channels]) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.currentChannel = channels.find(c => c.id === activeChannelId);
            this.availableChannels = channels;
        });
        this.selectedChannelIdControl.valueChanges.subscribe(ids => {
            this.selectChannel(ids);
        });
        this.variantsPreview$ = combineLatest(from(this.getTopVariants(10)), this.priceFactorControl.valueChanges.pipe(startWith(1))).pipe(map(([variants, factor]) => {
            return variants.map(v => ({
                id: v.id,
                name: v.name,
                price: v.price,
                pricePreview: v.price * +factor,
            }));
        }));
    }
    selectChannel(channelIds) {
        this.selectedChannel = this.availableChannels.find(c => c.id === channelIds[0]);
    }
    assign() {
        const selectedChannel = this.selectedChannel;
        if (selectedChannel) {
            if (!this.isProductVariantMode) {
                this.dataService.product
                    .assignProductsToChannel({
                    channelId: selectedChannel.id,
                    productIds: this.productIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(_('catalog.assign-product-to-channel-success'), {
                        channel: selectedChannel.code,
                        count: this.productIds.length,
                    });
                    this.resolveWith(true);
                });
            }
            else if (this.productVariantIds) {
                this.dataService.product
                    .assignVariantsToChannel({
                    channelId: selectedChannel.id,
                    productVariantIds: this.productVariantIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(_('catalog.assign-variant-to-channel-success'), {
                        channel: selectedChannel.code,
                        // tslint:disable-next-line:no-non-null-assertion
                        count: this.productVariantIds.length,
                    });
                    this.resolveWith(true);
                });
            }
        }
    }
    cancel() {
        this.resolveWith();
    }
    getTopVariants(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const variants = [];
            for (let i = 0; i < this.productIds.length && variants.length < take; i++) {
                const productVariants = yield this.dataService.product
                    .getProduct(this.productIds[i], { take: this.isProductVariantMode ? undefined : take })
                    .mapSingle(({ product }) => {
                    const _variants = product ? product.variantList.items : [];
                    return _variants.filter(v => { var _a; return this.isProductVariantMode ? (_a = this.productVariantIds) === null || _a === void 0 ? void 0 : _a.includes(v.id) : true; });
                })
                    .toPromise();
                variants.push(...(productVariants || []));
            }
            return variants.slice(0, take);
        });
    }
}
AssignProductsToChannelDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-assign-products-to-channel-dialog',
                template: "<ng-template vdrDialogTitle>\n    <ng-container *ngIf=\"isProductVariantMode; else productModeTitle\">{{\n        'catalog.assign-variants-to-channel' | translate\n    }}</ng-container>\n    <ng-template #productModeTitle>{{ 'catalog.assign-products-to-channel' | translate }}</ng-template>\n</ng-template>\n\n<div class=\"flex\">\n    <clr-input-container>\n        <label>{{ 'common.channel' | translate }}</label>\n        <vdr-channel-assignment-control\n            clrInput\n            [multiple]=\"false\"\n            [includeDefaultChannel]=\"false\"\n            [disableChannelIds]=\"currentChannelIds\"\n            [formControl]=\"selectedChannelIdControl\"\n        ></vdr-channel-assignment-control>\n    </clr-input-container>\n    <div class=\"flex-spacer\"></div>\n    <clr-input-container>\n        <label>{{ 'catalog.price-conversion-factor' | translate }}</label>\n        <input clrInput type=\"number\" min=\"0\" max=\"99999\" [formControl]=\"priceFactorControl\" />\n    </clr-input-container>\n</div>\n\n<div class=\"channel-price-preview\">\n    <label class=\"clr-control-label\">{{ 'catalog.channel-price-preview' | translate }}</label>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.name' | translate }}</th>\n                <th>\n                    {{\n                        'catalog.price-in-channel'\n                            | translate: { channel: currentChannel?.code | channelCodeToLabel | translate }\n                    }}\n                </th>\n                <th>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n                        {{ 'catalog.price-in-channel' | translate: { channel: selectedChannel?.code } }}\n                    </ng-template>\n                    <ng-template #noSelection>\n                        {{ 'catalog.no-channel-selected' | translate }}\n                    </ng-template>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let row of variantsPreview$ | async\">\n                <td>{{ row.name }}</td>\n                <td>{{ row.price | localeCurrency: currentChannel?.currencyCode }}</td>\n                <td>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noChannelSelected\">\n                        {{ row.pricePreview | localeCurrency: selectedChannel?.currencyCode }}\n                    </ng-template>\n                    <ng-template #noChannelSelected> - </ng-template>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-channel-assignment-control{min-width:200px}.channel-price-preview{margin-top:24px}.channel-price-preview table.table{margin-top:6px}\n"]
            },] }
];
AssignProductsToChannelDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NpZ24tcHJvZHVjdHMtdG8tY2hhbm5lbC1kaWFsb2cvYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzRCxNQUFNLE9BQU8sc0NBQXNDO0lBa0IvQyxZQUFvQixXQUF3QixFQUFVLG1CQUF3QztRQUExRSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFaOUYsdUJBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQVdvRCxDQUFDO0lBSmxHLElBQUksb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBSUQsUUFBUTtRQUNKLE1BQU0sZ0JBQWdCLEdB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QUFFLENBQUM7cUJBQ3RGLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtvQkFDdkIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMzRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FDeEIsT0FBQSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQUEsSUFBSSxDQUFDLGlCQUFpQiwwQ0FBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsRUFBQSxDQUM1RSxDQUFDO2dCQUNOLENBQUMsQ0FBQztxQkFDRCxTQUFTLEVBQUUsQ0FBQztnQkFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0M7WUFDRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTs7O1lBckhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCwrcUdBQWlFO2dCQUVqRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVZRLFdBQVc7WUFEWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgR2V0Q2hhbm5lbHMsIFByb2R1Y3RWYXJpYW50RnJhZ21lbnQgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2lnbi1wcm9kdWN0cy10by1jaGFubmVsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2lnbi1wcm9kdWN0cy10by1jaGFubmVsLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2lnblByb2R1Y3RzVG9DaGFubmVsRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8YW55PiB7XG4gICAgc2VsZWN0ZWRDaGFubmVsOiBHZXRDaGFubmVscy5DaGFubmVscyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgY3VycmVudENoYW5uZWw6IEdldENoYW5uZWxzLkNoYW5uZWxzO1xuICAgIGF2YWlsYWJsZUNoYW5uZWxzOiBHZXRDaGFubmVscy5DaGFubmVsc1tdO1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICAgIHZhcmlhbnRzUHJldmlldyQ6IE9ic2VydmFibGU8QXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHByaWNlOiBudW1iZXI7IHByaWNlUHJldmlldzogbnVtYmVyIH0+PjtcbiAgICBwcmljZUZhY3RvckNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woMSk7XG4gICAgc2VsZWN0ZWRDaGFubmVsSWRDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgICAvLyBhc3NpZ25lZCBieSBNb2RhbFNlcnZpY2UuZnJvbUNvbXBvbmVudCgpIGNhbGxcbiAgICBwcm9kdWN0SWRzOiBzdHJpbmdbXTtcbiAgICBwcm9kdWN0VmFyaWFudElkczogc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gICAgY3VycmVudENoYW5uZWxJZHM6IHN0cmluZ1tdO1xuXG4gICAgZ2V0IGlzUHJvZHVjdFZhcmlhbnRNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0VmFyaWFudElkcyAhPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2hhbm5lbElkJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAubWFwU2luZ2xlKCh7IHVzZXJTdGF0dXMgfSkgPT4gdXNlclN0YXR1cy5hY3RpdmVDaGFubmVsSWQpO1xuICAgICAgICBjb25zdCBhbGxDaGFubmVscyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldENoYW5uZWxzKCkubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS5jaGFubmVscyk7XG5cbiAgICAgICAgY29tYmluZUxhdGVzdChhY3RpdmVDaGFubmVsSWQkLCBhbGxDaGFubmVscyQpLnN1YnNjcmliZSgoW2FjdGl2ZUNoYW5uZWxJZCwgY2hhbm5lbHNdKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDaGFubmVsID0gY2hhbm5lbHMuZmluZChjID0+IGMuaWQgPT09IGFjdGl2ZUNoYW5uZWxJZCkhO1xuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVDaGFubmVscyA9IGNoYW5uZWxzO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbm5lbElkQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGlkcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdENoYW5uZWwoaWRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52YXJpYW50c1ByZXZpZXckID0gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgIGZyb20odGhpcy5nZXRUb3BWYXJpYW50cygxMCkpLFxuICAgICAgICAgICAgdGhpcy5wcmljZUZhY3RvckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKDEpKSxcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbdmFyaWFudHMsIGZhY3Rvcl0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyaWFudHMubWFwKHYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHYuaWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHYubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHYucHJpY2UsXG4gICAgICAgICAgICAgICAgICAgIHByaWNlUHJldmlldzogdi5wcmljZSAqICtmYWN0b3IsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q2hhbm5lbChjaGFubmVsSWRzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbm5lbCA9IHRoaXMuYXZhaWxhYmxlQ2hhbm5lbHMuZmluZChjID0+IGMuaWQgPT09IGNoYW5uZWxJZHNbMF0pO1xuICAgIH1cblxuICAgIGFzc2lnbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDaGFubmVsID0gdGhpcy5zZWxlY3RlZENoYW5uZWw7XG4gICAgICAgIGlmIChzZWxlY3RlZENoYW5uZWwpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Byb2R1Y3RWYXJpYW50TW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduUHJvZHVjdHNUb0NoYW5uZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbElkOiBzZWxlY3RlZENoYW5uZWwuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWRzOiB0aGlzLnByb2R1Y3RJZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZUZhY3RvcjogK3RoaXMucHJpY2VGYWN0b3JDb250cm9sLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NhdGFsb2cuYXNzaWduLXByb2R1Y3QtdG8tY2hhbm5lbC1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBzZWxlY3RlZENoYW5uZWwuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9kdWN0SWRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvZHVjdFZhcmlhbnRJZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnblZhcmlhbnRzVG9DaGFubmVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZDogc2VsZWN0ZWRDaGFubmVsLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZHM6IHRoaXMucHJvZHVjdFZhcmlhbnRJZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZUZhY3RvcjogK3RoaXMucHJpY2VGYWN0b3JDb250cm9sLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NhdGFsb2cuYXNzaWduLXZhcmlhbnQtdG8tY2hhbm5lbC1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBzZWxlY3RlZENoYW5uZWwuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMucHJvZHVjdFZhcmlhbnRJZHMhLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldFRvcFZhcmlhbnRzKHRha2U6IG51bWJlcik6IFByb21pc2U8UHJvZHVjdFZhcmlhbnRGcmFnbWVudFtdPiB7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRzOiBQcm9kdWN0VmFyaWFudEZyYWdtZW50W10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvZHVjdElkcy5sZW5ndGggJiYgdmFyaWFudHMubGVuZ3RoIDwgdGFrZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHMgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdCh0aGlzLnByb2R1Y3RJZHNbaV0sIHsgdGFrZTogdGhpcy5pc1Byb2R1Y3RWYXJpYW50TW9kZSA/IHVuZGVmaW5lZCA6IHRha2UgfSlcbiAgICAgICAgICAgICAgICAubWFwU2luZ2xlKCh7IHByb2R1Y3QgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdmFyaWFudHMgPSBwcm9kdWN0ID8gcHJvZHVjdC52YXJpYW50TGlzdC5pdGVtcyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZhcmlhbnRzLmZpbHRlcih2ID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUHJvZHVjdFZhcmlhbnRNb2RlID8gdGhpcy5wcm9kdWN0VmFyaWFudElkcz8uaW5jbHVkZXModi5pZCkgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgdmFyaWFudHMucHVzaCguLi4ocHJvZHVjdFZhcmlhbnRzIHx8IFtdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhbnRzLnNsaWNlKDAsIHRha2UpO1xuICAgIH1cbn1cbiJdfQ==
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, } from '@vendure/admin-ui/core';
import { DataService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
export class AssetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, notificationService, dataService, formBuilder) {
        super(route, router, serverConfigService, dataService);
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.detailForm = new FormGroup({});
        this.customFields = this.getCustomFieldConfig('Asset');
    }
    ngOnInit() {
        this.detailForm = new FormGroup({
            name: new FormControl(''),
            tags: new FormControl([]),
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    onAssetChange(event) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(event.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(event.tags);
        this.detailForm.markAsDirty();
    }
    save() {
        this.dataService.product
            .updateAsset({
            id: this.id,
            name: this.detailForm.value.name,
            tags: this.detailForm.value.tags,
            customFields: this.detailForm.value.customFields,
        })
            .subscribe(() => {
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Asset' });
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Asset',
            });
        });
    }
    setFormValues(entity, languageCode) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(entity.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(entity.tags);
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), entity);
        }
    }
}
AssetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-detail\"></vdr-action-bar-items>\n        <button\n            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateAsset']\"\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<vdr-asset-preview\n    [asset]=\"entity$ | async\"\n    [editable]=\"true\"\n    [customFields]=\"customFields\"\n    [customFieldsForm]=\"detailForm.get('customFields')\"\n    (assetChange)=\"onAssetChange($event)\"\n></vdr-asset-preview>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:100%}\n"]
            },] }
];
AssetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: NotificationService },
    { type: DataService },
    { type: FormBuilder }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NldC1kZXRhaWwvYXNzZXQtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILG1CQUFtQixHQUl0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVEvRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsbUJBQW1DO0lBSXpFLFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxtQkFBd0MsRUFDdEMsV0FBd0IsRUFDMUIsV0FBd0I7UUFFaEMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFKL0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVRwQyxlQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFZM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FB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dCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQXNzZXQsXG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBHZXRBc3NldCxcbiAgICBMYW5ndWFnZUNvZGUsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2UsIFNlcnZlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hc3NldC1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXREZXRhaWxDb21wb25lbnQgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PEdldEFzc2V0LkFzc2V0PiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBkZXRhaWxGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdBc3NldCcpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gICAgICAgICAgICB0YWdzOiBuZXcgRm9ybUNvbnRyb2woW10pLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgb25Bc3NldENoYW5nZShldmVudDogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHRhZ3M6IHN0cmluZ1tdIH0pIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmdldCgnbmFtZScpPy5zZXRWYWx1ZShldmVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmdldCgndGFncycpPy5zZXRWYWx1ZShldmVudC50YWdzKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZGV0YWlsRm9ybS52YWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHRoaXMuZGV0YWlsRm9ybS52YWx1ZS50YWdzLFxuICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5kZXRhaWxGb3JtLnZhbHVlLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7IGVudGl0eTogJ0Fzc2V0JyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBc3NldCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGVudGl0eTogR2V0QXNzZXQuQXNzZXQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5nZXQoJ25hbWUnKT8uc2V0VmFsdWUoZW50aXR5Lm5hbWUpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0uZ2V0KCd0YWdzJyk/LnNldFZhbHVlKGVudGl0eS50YWdzKTtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXN0b21GaWVsZEZvcm1WYWx1ZXModGhpcy5jdXN0b21GaWVsZHMsIHRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnXSksIGVudGl0eSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
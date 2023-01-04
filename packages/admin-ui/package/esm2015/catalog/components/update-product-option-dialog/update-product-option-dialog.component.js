import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createUpdatedTranslatable } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
export class UpdateProductOptionDialogComponent {
    constructor() {
        this.updateVariantName = true;
        this.codeInputTouched = false;
    }
    ngOnInit() {
        var _a;
        const currentTranslation = this.productOption.translations.find(t => t.languageCode === this.activeLanguage);
        this.name = (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '';
        this.code = this.productOption.code;
        this.customFieldsForm = new FormGroup({});
        if (this.customFields) {
            const cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? cfCurrentTranslation[key]
                    : this.productOption.customFields[key];
                this.customFieldsForm.addControl(fieldDef.name, new FormControl(value));
            }
        }
    }
    update() {
        const result = createUpdatedTranslatable({
            translatable: this.productOption,
            languageCode: this.activeLanguage,
            updatedFields: {
                code: this.code,
                name: this.name,
                customFields: this.customFieldsForm.value,
            },
            customFieldConfig: this.customFields,
            defaultTranslation: {
                languageCode: this.activeLanguage,
                name: '',
            },
        });
        this.resolveWith(Object.assign(Object.assign({}, result), { autoUpdate: this.updateVariantName }));
    }
    cancel() {
        this.resolveWith();
    }
    updateCode(nameValue) {
        if (!this.codeInputTouched && !this.productOption.code) {
            this.code = normalizeString(nameValue, '-');
        }
    }
}
UpdateProductOptionDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-update-product-option-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'catalog.update-product-option' | translate }}</ng-template>\n<vdr-form-field [label]=\"'catalog.option-name' | translate\" for=\"name\">\n    <input\n        id=\"name\"\n        type=\"text\"\n        #nameInput=\"ngModel\"\n        [(ngModel)]=\"name\"\n        required\n        (input)=\"updateCode($event.target.value)\"\n    />\n</vdr-form-field>\n<vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n    <input id=\"code\" type=\"text\" #codeInput=\"ngModel\" required [(ngModel)]=\"code\" pattern=\"[a-z0-9_-]+\" />\n</vdr-form-field>\n<clr-checkbox-wrapper>\n    <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"updateVariantName\" />\n    <label>{{ 'catalog.auto-update-option-variant-name' | translate }}</label>\n</clr-checkbox-wrapper>\n<section *ngIf=\"customFields.length\">\n    <label>{{ 'common.custom-fields' | translate }}</label>\n    <vdr-tabbed-custom-fields\n        entityName=\"ProductOption\"\n        [customFields]=\"customFields\"\n        [customFieldsFormGroup]=\"customFieldsForm\"\n        [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n    ></vdr-tabbed-custom-fields>\n</section>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"update()\"\n        [disabled]=\"\n            nameInput.invalid ||\n            codeInput.invalid ||\n            (nameInput.pristine && codeInput.pristine && customFieldsForm.pristine)\n        \"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.update-product-option' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvdXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy91cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPeEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBUXZFLE1BQU0sT0FBTyxrQ0FBa0M7SUFOL0M7UUFTSSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFPekIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBb0Q3QixDQUFDO0lBakRHLFFBQVE7O1FBQ0osTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsY0FBYyxDQUM5QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFBLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLElBQUksbUNBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixNQUFNLG9CQUFvQixHQUN0QixDQUFDLGtCQUFrQixJQUFLLGtCQUEwQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzRSxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sS0FBSyxHQUNQLFFBQVEsQ0FBQyxJQUFJLEtBQUssY0FBYztvQkFDNUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztvQkFDM0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFxQixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDM0U7U0FDSjtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxNQUFNLEdBQUcseUJBQXlCLENBQUM7WUFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYztZQUNqQyxhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7YUFDNUM7WUFDRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNwQyxrQkFBa0IsRUFBRTtnQkFDaEIsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNqQyxJQUFJLEVBQUUsRUFBRTthQUNYO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsaUNBQU0sTUFBTSxLQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUcsQ0FBQztJQUN4RSxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsVUFBVSxDQUFDLFNBQWlCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDOzs7WUFuRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLG1zREFBNEQ7Z0JBRTVELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ3VzdG9tRmllbGRDb25maWcsXG4gICAgTGFuZ3VhZ2VDb2RlLFxuICAgIFByb2R1Y3RWYXJpYW50LFxuICAgIFVwZGF0ZVByb2R1Y3RPcHRpb25JbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG5vcm1hbGl6ZVN0cmluZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvbm9ybWFsaXplLXN0cmluZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXVwZGF0ZS1wcm9kdWN0LW9wdGlvbi1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi91cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi91cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2R1Y3RPcHRpb25EaWFsb2dDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIERpYWxvZzxVcGRhdGVQcm9kdWN0T3B0aW9uSW5wdXQgJiB7IGF1dG9VcGRhdGU6IGJvb2xlYW4gfT4sIE9uSW5pdCB7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBVcGRhdGVQcm9kdWN0T3B0aW9uSW5wdXQgJiB7IGF1dG9VcGRhdGU6IGJvb2xlYW4gfSkgPT4gdm9pZDtcbiAgICB1cGRhdGVWYXJpYW50TmFtZSA9IHRydWU7XG4gICAgLy8gUHJvdmlkZWQgYnkgY2FsbGVyXG4gICAgcHJvZHVjdE9wdGlvbjogUHJvZHVjdFZhcmlhbnQuT3B0aW9ucztcbiAgICBhY3RpdmVMYW5ndWFnZTogTGFuZ3VhZ2VDb2RlO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGNvZGVJbnB1dFRvdWNoZWQgPSBmYWxzZTtcbiAgICBjdXN0b21GaWVsZHNGb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRyYW5zbGF0aW9uID0gdGhpcy5wcm9kdWN0T3B0aW9uLnRyYW5zbGF0aW9ucy5maW5kKFxuICAgICAgICAgICAgdCA9PiB0Lmxhbmd1YWdlQ29kZSA9PT0gdGhpcy5hY3RpdmVMYW5ndWFnZSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5uYW1lID0gY3VycmVudFRyYW5zbGF0aW9uPy5uYW1lID8/ICcnO1xuICAgICAgICB0aGlzLmNvZGUgPSB0aGlzLnByb2R1Y3RPcHRpb24uY29kZTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHNGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgY29uc3QgY2ZDdXJyZW50VHJhbnNsYXRpb24gPVxuICAgICAgICAgICAgICAgIChjdXJyZW50VHJhbnNsYXRpb24gJiYgKGN1cnJlbnRUcmFuc2xhdGlvbiBhcyBhbnkpLmN1c3RvbUZpZWxkcykgfHwge307XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5jdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmaWVsZERlZi5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgZmllbGREZWYudHlwZSA9PT0gJ2xvY2FsZVN0cmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgID8gY2ZDdXJyZW50VHJhbnNsYXRpb25ba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5wcm9kdWN0T3B0aW9uIGFzIGFueSkuY3VzdG9tRmllbGRzW2tleV07XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHNGb3JtLmFkZENvbnRyb2woZmllbGREZWYubmFtZSwgbmV3IEZvcm1Db250cm9sKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNyZWF0ZVVwZGF0ZWRUcmFuc2xhdGFibGUoe1xuICAgICAgICAgICAgdHJhbnNsYXRhYmxlOiB0aGlzLnByb2R1Y3RPcHRpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGU6IHRoaXMuYWN0aXZlTGFuZ3VhZ2UsXG4gICAgICAgICAgICB1cGRhdGVkRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuY3VzdG9tRmllbGRzRm9ybS52YWx1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXN0b21GaWVsZENvbmZpZzogdGhpcy5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICBkZWZhdWx0VHJhbnNsYXRpb246IHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGU6IHRoaXMuYWN0aXZlTGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh7IC4uLnJlc3VsdCwgYXV0b1VwZGF0ZTogdGhpcy51cGRhdGVWYXJpYW50TmFtZSB9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2RlKG5hbWVWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2RlSW5wdXRUb3VjaGVkICYmICF0aGlzLnByb2R1Y3RPcHRpb24uY29kZSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlID0gbm9ybWFsaXplU3RyaW5nKG5hbWVWYWx1ZSwgJy0nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
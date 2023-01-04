import { ChangeDetectionStrategy, Component } from '@angular/core';
export class EditNoteDialogComponent {
    constructor() {
        this.displayPrivacyControls = true;
        this.noteIsPrivate = true;
        this.note = '';
    }
    confirm() {
        this.resolveWith({
            note: this.note,
            isPrivate: this.noteIsPrivate,
        });
    }
    cancel() {
        this.resolveWith();
    }
}
EditNoteDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-edit-note-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'common.edit-note' | translate }}\n</ng-template>\n\n<textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n<div class=\"visibility-select\" *ngIf=\"displayPrivacyControls\">\n    <clr-checkbox-wrapper>\n        <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"noteIsPrivate\" />\n        <label>{{ 'order.note-is-private' | translate }}</label>\n    </clr-checkbox-wrapper>\n    <span *ngIf=\"noteIsPrivate\" class=\"private\">\n        {{ 'order.note-only-visible-to-administrators' | translate }}\n    </span>\n    <span *ngIf=\"!noteIsPrivate\" class=\"public\">\n        {{ 'order.note-visible-to-customer' | translate }}\n    </span>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"confirm()\" class=\"btn btn-primary\" [disabled]=\"note.length === 0\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visibility-select{display:flex;justify-content:space-between;align-items:baseline}.visibility-select .public{color:var(--color-warning-500)}.visibility-select .private{color:var(--color-success-500)}textarea.note{width:100%;height:72px;border-radius:3px;margin-right:6px}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ub3RlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2VkaXQtbm90ZS1kaWFsb2cvZWRpdC1ub3RlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVUzRSxNQUFNLE9BQU8sdUJBQXVCO0lBTnBDO1FBT0ksMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFhZCxDQUFDO0lBVkcsT0FBTztRQUNILElBQUksQ0FBQyxXQUFXLENBQUM7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDaEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxtaENBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1lZGl0LW5vdGUtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZWRpdC1ub3RlLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZWRpdC1ub3RlLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzx7IG5vdGU6IHN0cmluZzsgaXNQcml2YXRlPzogYm9vbGVhbiB9PiB7XG4gICAgZGlzcGxheVByaXZhY3lDb250cm9scyA9IHRydWU7XG4gICAgbm90ZUlzUHJpdmF0ZSA9IHRydWU7XG4gICAgbm90ZSA9ICcnO1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogeyBub3RlOiBzdHJpbmc7IGlzUHJpdmF0ZT86IGJvb2xlYW4gfSkgPT4gdm9pZDtcblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoe1xuICAgICAgICAgICAgbm90ZTogdGhpcy5ub3RlLFxuICAgICAgICAgICAgaXNQcml2YXRlOiB0aGlzLm5vdGVJc1ByaXZhdGUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cbn1cbiJdfQ==
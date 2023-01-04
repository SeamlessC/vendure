import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class LinkDialogComponent {
    ngOnInit() {
        this.form = new FormGroup({
            href: new FormControl(this.existing ? this.existing.href : '', Validators.required),
            title: new FormControl(this.existing ? this.existing.title : ''),
        });
    }
    remove() {
        this.resolveWith({
            title: '',
            href: '',
        });
    }
    select() {
        this.resolveWith(this.form.value);
    }
}
LinkDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-link-dialog',
                template: "<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'editor.link-href' | translate\" for=\"href\">\n        <input id=\"href\" type=\"text\" formControlName=\"href\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'editor.link-title' | translate\" for=\"title\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"remove()\" *ngIf=\"existing\">\n        <clr-icon shape=\"unlink\"></clr-icon> {{ 'editor.remove-link' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid\">\n        {{ 'editor.set-link' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9yaWNoLXRleHQtZWRpdG9yL2xpbmstZGlhbG9nL2xpbmstZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZXBFLE1BQU0sT0FBTyxtQkFBbUI7SUFNNUIsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDdEIsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuRixLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNuRSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix5eUJBQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3Byb3ZpZGVycy9tb2RhbC9tb2RhbC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBMaW5rQXR0cnMge1xuICAgIGhyZWY6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1saW5rLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpbmstZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saW5rLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMaW5rRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8TGlua0F0dHJzPiB7XG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBMaW5rQXR0cnMpID0+IHZvaWQ7XG4gICAgZXhpc3Rpbmc/OiBMaW5rQXR0cnM7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICBocmVmOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5leGlzdGluZyA/IHRoaXMuZXhpc3RpbmcuaHJlZiA6ICcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgICAgICAgIHRpdGxlOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5leGlzdGluZyA/IHRoaXMuZXhpc3RpbmcudGl0bGUgOiAnJyksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh7XG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBocmVmOiAnJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxufVxuIl19
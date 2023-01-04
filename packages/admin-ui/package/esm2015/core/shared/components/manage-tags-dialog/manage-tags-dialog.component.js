import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../data/providers/data.service';
export class ManageTagsDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.toDelete = [];
        this.toUpdate = [];
    }
    ngOnInit() {
        this.allTags$ = this.dataService.product.getTagList().mapStream(data => data.tags.items);
    }
    toggleDelete(id) {
        const marked = this.markedAsDeleted(id);
        if (marked) {
            this.toDelete = this.toDelete.filter(_id => _id !== id);
        }
        else {
            this.toDelete.push(id);
        }
    }
    markedAsDeleted(id) {
        return this.toDelete.includes(id);
    }
    updateTagValue(id, value) {
        const exists = this.toUpdate.find(i => i.id === id);
        if (exists) {
            exists.value = value;
        }
        else {
            this.toUpdate.push({ id, value });
        }
    }
    saveChanges() {
        const operations = [];
        for (const id of this.toDelete) {
            operations.push(this.dataService.product.deleteTag(id));
        }
        for (const item of this.toUpdate) {
            if (!this.toDelete.includes(item.id)) {
                operations.push(this.dataService.product.updateTag(item));
            }
        }
        return forkJoin(operations).subscribe(() => this.resolveWith(true));
    }
}
ManageTagsDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-manage-tags-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span>{{ 'common.manage-tags' | translate }}</span>\n</ng-template>\n<p class=\"mt0 mb4\">{{ 'common.manage-tags-description' | translate }}</p>\n<ul class=\"tag-list\" *ngFor=\"let tag of allTags$ | async\">\n    <li class=\"mb2 p1\" [class.to-delete]=\"markedAsDeleted(tag.id)\">\n        <clr-icon shape=\"tag\" class=\"is-solid mr2\" [style.color]=\"tag.value | stringToColor\"></clr-icon>\n        <input type=\"text\" (input)=\"updateTagValue(tag.id, $event.target.value)\" [value]=\"tag.value\" />\n        <button class=\"icon-button\" (click)=\"toggleDelete(tag.id)\">\n            <clr-icon shape=\"trash\" class=\"is-danger\" [class.is-solid]=\"markedAsDeleted(tag.id)\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"resolveWith(false)\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button\n        type=\"submit\"\n        (click)=\"saveChanges()\"\n        class=\"btn btn-primary\"\n        [disabled]=\"!toUpdate.length && !toDelete.length\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".tag-list{list-style-type:none}.tag-list li{display:flex;align-items:center}.tag-list li input{max-width:170px}.tag-list li.to-delete{opacity:.7;background-color:var(--color-component-bg-300)}.tag-list li.to-delete input{background-color:transparent!important}\n"]
            },] }
];
ManageTagsDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLXRhZ3MtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvbWFuYWdlLXRhZ3MtZGlhbG9nL21hbmFnZS10YWdzLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVNuRSxNQUFNLE9BQU8seUJBQXlCO0lBTWxDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSDVDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUF5QyxFQUFFLENBQUM7SUFFTCxDQUFDO0lBRWhELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELFlBQVksQ0FBQyxFQUFVO1FBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBVTtRQUN0QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxjQUFjLENBQUMsRUFBVSxFQUFFLEtBQWE7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU0sVUFBVSxHQUEyQixFQUFFLENBQUM7UUFDOUMsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM3RDtTQUNKO1FBQ0QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHVyQ0FBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUlEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgR2V0VGFnTGlzdCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1tYW5hZ2UtdGFncy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtdGFncy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS10YWdzLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYW5hZ2VUYWdzRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRGlhbG9nPGJvb2xlYW4+LCBPbkluaXQge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0OiBib29sZWFuIHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xuICAgIGFsbFRhZ3MkOiBPYnNlcnZhYmxlPEdldFRhZ0xpc3QuSXRlbXNbXT47XG4gICAgdG9EZWxldGU6IHN0cmluZ1tdID0gW107XG4gICAgdG9VcGRhdGU6IEFycmF5PHsgaWQ6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbGxUYWdzJCA9IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRUYWdMaXN0KCkubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS50YWdzLml0ZW1zKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEZWxldGUoaWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBtYXJrZWQgPSB0aGlzLm1hcmtlZEFzRGVsZXRlZChpZCk7XG4gICAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG9EZWxldGUgPSB0aGlzLnRvRGVsZXRlLmZpbHRlcihfaWQgPT4gX2lkICE9PSBpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvRGVsZXRlLnB1c2goaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya2VkQXNEZWxldGVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EZWxldGUuaW5jbHVkZXMoaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRhZ1ZhbHVlKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZXhpc3RzID0gdGhpcy50b1VwZGF0ZS5maW5kKGkgPT4gaS5pZCA9PT0gaWQpO1xuICAgICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgICAgICBleGlzdHMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9VcGRhdGUucHVzaCh7IGlkLCB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVDaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2YgdGhpcy50b0RlbGV0ZSkge1xuICAgICAgICAgICAgb3BlcmF0aW9ucy5wdXNoKHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5kZWxldGVUYWcoaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy50b1VwZGF0ZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRvRGVsZXRlLmluY2x1ZGVzKGl0ZW0uaWQpKSB7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5wdXNoKHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC51cGRhdGVUYWcoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JrSm9pbihvcGVyYXRpb25zKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNvbHZlV2l0aCh0cnVlKSk7XG4gICAgfVxufVxuIl19
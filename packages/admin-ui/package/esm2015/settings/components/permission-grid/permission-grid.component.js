import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A table showing and allowing the setting of all possible CRUD permissions.
 */
export class PermissionGridComponent {
    constructor() {
        this.readonly = false;
        this.permissionChange = new EventEmitter();
    }
    ngOnInit() {
        this.buildGrid();
    }
    setPermission(permission, value) {
        if (!this.readonly) {
            this.permissionChange.emit({ permission, value });
        }
    }
    toggleAll(defs) {
        const value = defs.some(d => !this.activePermissions.includes(d.name));
        for (const def of defs) {
            this.permissionChange.emit({ permission: def.name, value });
        }
    }
    buildGrid() {
        var _a;
        const crudGroups = new Map();
        const nonCrud = [];
        const crudRe = /^(Create|Read|Update|Delete)([a-zA-Z]+)$/;
        for (const def of this.permissionDefinitions) {
            const isCrud = crudRe.test(def.name);
            if (isCrud) {
                const groupName = (_a = def.name.match(crudRe)) === null || _a === void 0 ? void 0 : _a[2];
                if (groupName) {
                    const existing = crudGroups.get(groupName);
                    if (existing) {
                        existing.push(def);
                    }
                    else {
                        crudGroups.set(groupName, [def]);
                    }
                }
            }
            else if (def.assignable) {
                nonCrud.push(def);
            }
        }
        this.gridData = [
            ...nonCrud.map(d => ({
                label: d.name,
                description: d.description,
                permissions: [d],
            })),
            ...Array.from(crudGroups.entries()).map(([label, defs]) => {
                return {
                    label,
                    description: this.extractCrudDescription(defs[0]),
                    permissions: defs,
                };
            }),
        ];
    }
    extractCrudDescription(def) {
        return def.description.replace(/Grants permission to [\w]+/, 'Grants permissions on');
    }
}
PermissionGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-permission-grid',
                template: "<table class=\"table\">\n    <tbody>\n        <tr *ngFor=\"let section of gridData\">\n            <td class=\"permission-group left\">\n                <div><strong>{{ section.label | translate }}</strong></div>\n                <small>{{ section.description | translate }}</small><br>\n                <button *ngIf=\"1 < section.permissions.length && !readonly\" class=\"btn btn-sm btn-link\" (click)=\"toggleAll(section.permissions)\">\n                    {{ 'common.toggle-all' | translate }}\n                </button>\n            </td>\n            <td *ngFor=\"let permission of section.permissions\" [attr.colspan]=\"section.permissions.length === 1 ? 4 : 1\">\n                <vdr-select-toggle\n                    size=\"small\"\n                    [title]=\"permission.description\"\n                    [label]=\"permission.name\"\n                    [disabled]=\"readonly\"\n                    [selected]=\"activePermissions?.includes(permission.name)\"\n                    (selectedChange)=\"setPermission(permission.name, $event)\"\n                ></vdr-select-toggle>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["td.permission-group{max-width:300px;background-color:var(--color-component-bg-200)}\n"]
            },] }
];
PermissionGridComponent.propDecorators = {
    permissionDefinitions: [{ type: Input }],
    activePermissions: [{ type: Input }],
    readonly: [{ type: Input }],
    permissionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvcGVybWlzc2lvbi1ncmlkL3Blcm1pc3Npb24tZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVV4Rzs7R0FFRztBQU9ILE1BQU0sT0FBTyx1QkFBdUI7SUFOcEM7UUFTYSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUEwQyxDQUFDO0lBMkQ1RixDQUFDO0lBeERHLFFBQVE7UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFrQixFQUFFLEtBQWM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUE0QjtRQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVPLFNBQVM7O1FBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRywwQ0FBMEMsQ0FBQztRQUMxRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLFNBQVMsR0FBRyxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQywwQ0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxRQUFRLEVBQUU7d0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdEI7eUJBQU07d0JBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNwQztpQkFDSjthQUNKO2lCQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDYixXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7Z0JBQzFCLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNuQixDQUFDLENBQUM7WUFDSCxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDdEQsT0FBTztvQkFDSCxLQUFLO29CQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxXQUFXLEVBQUUsSUFBSTtpQkFDcEIsQ0FBQztZQUNOLENBQUMsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sc0JBQXNCLENBQUMsR0FBeUI7UUFDcEQsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzFGLENBQUM7OztZQXBFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsOG9DQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0NBRUksS0FBSztnQ0FDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGVmaW5pdGlvbiB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25HcmlkUm93IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EZWZpbml0aW9uW107XG59XG5cbi8qKlxuICogQSB0YWJsZSBzaG93aW5nIGFuZCBhbGxvd2luZyB0aGUgc2V0dGluZyBvZiBhbGwgcG9zc2libGUgQ1JVRCBwZXJtaXNzaW9ucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcGVybWlzc2lvbi1ncmlkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGVybWlzc2lvbi1ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wZXJtaXNzaW9uLWdyaWQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHBlcm1pc3Npb25EZWZpbml0aW9uczogUGVybWlzc2lvbkRlZmluaXRpb25bXTtcbiAgICBASW5wdXQoKSBhY3RpdmVQZXJtaXNzaW9uczogc3RyaW5nW107XG4gICAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcGVybWlzc2lvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBwZXJtaXNzaW9uOiBzdHJpbmc7IHZhbHVlOiBib29sZWFuIH0+KCk7XG4gICAgZ3JpZERhdGE6IFBlcm1pc3Npb25HcmlkUm93W107XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5idWlsZEdyaWQoKTtcbiAgICB9XG5cbiAgICBzZXRQZXJtaXNzaW9uKHBlcm1pc3Npb246IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25DaGFuZ2UuZW1pdCh7IHBlcm1pc3Npb24sIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlQWxsKGRlZnM6IFBlcm1pc3Npb25EZWZpbml0aW9uW10pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkZWZzLnNvbWUoZCA9PiAhdGhpcy5hY3RpdmVQZXJtaXNzaW9ucy5pbmNsdWRlcyhkLm5hbWUpKTtcbiAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgZGVmcykge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uQ2hhbmdlLmVtaXQoeyBwZXJtaXNzaW9uOiBkZWYubmFtZSwgdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkR3JpZCgpIHtcbiAgICAgICAgY29uc3QgY3J1ZEdyb3VwcyA9IG5ldyBNYXA8c3RyaW5nLCBQZXJtaXNzaW9uRGVmaW5pdGlvbltdPigpO1xuICAgICAgICBjb25zdCBub25DcnVkOiBQZXJtaXNzaW9uRGVmaW5pdGlvbltdID0gW107XG4gICAgICAgIGNvbnN0IGNydWRSZSA9IC9eKENyZWF0ZXxSZWFkfFVwZGF0ZXxEZWxldGUpKFthLXpBLVpdKykkLztcbiAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgdGhpcy5wZXJtaXNzaW9uRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ3J1ZCA9IGNydWRSZS50ZXN0KGRlZi5uYW1lKTtcbiAgICAgICAgICAgIGlmIChpc0NydWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cE5hbWUgPSBkZWYubmFtZS5tYXRjaChjcnVkUmUpPy5bMl07XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGNydWRHcm91cHMuZ2V0KGdyb3VwTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcucHVzaChkZWYpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3J1ZEdyb3Vwcy5zZXQoZ3JvdXBOYW1lLCBbZGVmXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlZi5hc3NpZ25hYmxlKSB7XG4gICAgICAgICAgICAgICAgbm9uQ3J1ZC5wdXNoKGRlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmlkRGF0YSA9IFtcbiAgICAgICAgICAgIC4uLm5vbkNydWQubWFwKGQgPT4gKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogZC5uYW1lLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbZF0sXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAuLi5BcnJheS5mcm9tKGNydWRHcm91cHMuZW50cmllcygpKS5tYXAoKFtsYWJlbCwgZGVmc10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZXh0cmFjdENydWREZXNjcmlwdGlvbihkZWZzWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6IGRlZnMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXh0cmFjdENydWREZXNjcmlwdGlvbihkZWY6IFBlcm1pc3Npb25EZWZpbml0aW9uKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlZi5kZXNjcmlwdGlvbi5yZXBsYWNlKC9HcmFudHMgcGVybWlzc2lvbiB0byBbXFx3XSsvLCAnR3JhbnRzIHBlcm1pc3Npb25zIG9uJyk7XG4gICAgfVxufVxuIl19
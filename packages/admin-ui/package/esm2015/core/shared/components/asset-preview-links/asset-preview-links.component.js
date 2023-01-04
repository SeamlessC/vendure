import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class AssetPreviewLinksComponent {
    constructor() {
        this.sizes = ['tiny', 'thumb', 'small', 'medium', 'large', 'full'];
    }
}
AssetPreviewLinksComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview-links',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link\" vdrDropdownTrigger>\n        <clr-icon shape=\"link\"></clr-icon> {{ 'catalog.asset-preview-links' | translate }}<clr-icon shape=\"caret\" dir=\"down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n        <a\n            *ngFor=\"let size of sizes\"\n            [href]=\"asset | assetPreview: size\"\n            [title]=\"asset | assetPreview: size\"\n            target=\"_blank\"\n            class=\"asset-preview-link\"\n            vdrDropdownItem\n        >\n            <vdr-chip><clr-icon shape=\"link\"></clr-icon> {{ 'asset.preview' | translate }}: {{ size }}</vdr-chip>\n        </a>\n    </vdr-dropdown-menu></vdr-dropdown\n>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".asset-preview-link{font-size:12px}\n"]
            },] }
];
AssetPreviewLinksComponent.propDecorators = {
    asset: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcHJldmlldy1saW5rcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LXByZXZpZXctbGlua3MvYXNzZXQtcHJldmlldy1saW5rcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVMUUsTUFBTSxPQUFPLDBCQUEwQjtJQU52QztRQVFJLFVBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBVEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLG91QkFBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBc3NldExpa2UgfSBmcm9tICcuLi9hc3NldC1nYWxsZXJ5L2Fzc2V0LWdhbGxlcnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtcHJldmlldy1saW5rcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LXByZXZpZXctbGlua3MuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0LXByZXZpZXctbGlua3MuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRQcmV2aWV3TGlua3NDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGFzc2V0OiBBc3NldExpa2U7XG4gICAgc2l6ZXMgPSBbJ3RpbnknLCAndGh1bWInLCAnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJywgJ2Z1bGwnXTtcbn1cbiJdfQ==
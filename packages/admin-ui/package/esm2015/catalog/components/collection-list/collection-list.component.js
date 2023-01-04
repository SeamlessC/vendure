import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataService, ModalService, NotificationService, SelectionManager, ServerConfigService, } from '@vendure/admin-ui/core';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, takeUntil, tap, } from 'rxjs/operators';
export class CollectionListComponent {
    constructor(dataService, notificationService, modalService, router, route, serverConfigService, changeDetectorRef) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.router = router;
        this.route = route;
        this.serverConfigService = serverConfigService;
        this.changeDetectorRef = changeDetectorRef;
        this.filterTermControl = new FormControl('');
        this.expandAll = false;
        this.expandedIds = [];
        this.destroy$ = new Subject();
        this.selectionManager = new SelectionManager({
            additiveMode: true,
            multiSelect: true,
            itemsAreEqual: (a, b) => a.id === b.id,
        });
    }
    ngOnInit() {
        var _a, _b;
        this.queryResult = this.dataService.collection.getCollections(1000, 0).refetchOnChannelChange();
        this.items$ = this.queryResult
            .mapStream(data => data.collections.items)
            .pipe(tap(items => this.selectionManager.setCurrentItems(items)), shareReplay(1));
        this.activeCollectionId$ = this.route.paramMap.pipe(map(pm => pm.get('contents')), distinctUntilChanged());
        this.expandedIds = (_b = (_a = this.route.snapshot.queryParamMap.get('expanded')) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
        this.expandAll = this.route.snapshot.queryParamMap.get('expanded') === 'all';
        this.activeCollectionTitle$ = combineLatest(this.activeCollectionId$, this.items$).pipe(map(([id, collections]) => {
            if (id) {
                const match = collections.find(c => c.id === id);
                return match ? match.name : '';
            }
            return '';
        }));
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage)
            .pipe(tap(() => this.refresh()));
        this.filterTermControl.valueChanges
            .pipe(debounceTime(250), takeUntil(this.destroy$))
            .subscribe(term => {
            this.router.navigate(['./'], {
                queryParams: {
                    q: term || undefined,
                },
                queryParamsHandling: 'merge',
                relativeTo: this.route,
            });
        });
        this.route.queryParamMap
            .pipe(map(qpm => qpm.get('q')), distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
        this.filterTermControl.patchValue(this.route.snapshot.queryParamMap.get('q'));
    }
    ngOnDestroy() {
        this.queryResult.completed$.next();
        this.destroy$.next(undefined);
        this.destroy$.complete();
    }
    toggleExpandAll() {
        this.router.navigate(['./'], {
            queryParams: {
                expanded: this.expandAll ? 'all' : undefined,
            },
            queryParamsHandling: 'merge',
            relativeTo: this.route,
        });
    }
    onRearrange(event) {
        this.dataService.collection.moveCollection([event]).subscribe({
            next: () => {
                this.notificationService.success(_('common.notify-saved-changes'));
                this.refresh();
            },
            error: err => {
                this.notificationService.error(_('common.notify-save-changes-error'));
            },
        });
    }
    deleteCollection(id) {
        this.items$
            .pipe(take(1), map(items => -1 < items.findIndex(i => i.parent && i.parent.id === id)), switchMap(hasChildren => {
            return this.modalService.dialog({
                title: _('catalog.confirm-delete-collection'),
                body: hasChildren
                    ? _('catalog.confirm-delete-collection-and-children-body')
                    : undefined,
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            });
        }), switchMap(response => (response ? this.dataService.collection.deleteCollection(id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Collection',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Collection',
            });
        });
    }
    closeContents() {
        const params = Object.assign({}, this.route.snapshot.params);
        delete params.contents;
        this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    setLanguage(code) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }
    refresh() {
        const filterTerm = this.route.snapshot.queryParamMap.get('q');
        this.queryResult.ref.refetch({
            options: Object.assign({ skip: 0, take: 1000 }, (filterTerm
                ? {
                    filter: {
                        name: {
                            contains: filterTerm,
                        },
                    },
                }
                : {})),
        });
    }
}
CollectionListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"\">\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"filterTermControl\"\n                [placeholder]=\"'catalog.filter-by-name' | translate\"\n                class=\"clr-input search-input\"\n            />\n            <div class=\"flex center\">\n                <clr-toggle-wrapper\n                    class=\"expand-all-toggle mt2\"\n                >\n                    <input type=\"checkbox\" clrToggle [(ngModel)]=\"expandAll\" (change)=\"toggleExpandAll()\" />\n                    <label>\n                        {{ 'catalog.expand-all-collections' | translate }}\n                    </label>\n                </clr-toggle-wrapper>\n                <vdr-language-selector\n                    class=\"mt2\"\n                    [availableLanguageCodes]=\"availableLanguages$ | async\"\n                    [currentLanguageCode]=\"contentLanguage$ | async\"\n                    (languageCodeChange)=\"setLanguage($event)\"\n                ></vdr-language-selector>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\"\n            [routerLink]=\"['./create']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-collection' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"bulk-select-controls\">\n    <input\n        type=\"checkbox\"\n        clrCheckbox\n        [checked]=\"selectionManager.areAllCurrentItemsSelected()\"\n        (click)=\"selectionManager.toggleSelectAll()\"\n    />\n    <vdr-bulk-action-menu\n        class=\"ml2\"\n        locationId=\"collection-list\"\n        [hostComponent]=\"this\"\n        [selectionManager]=\"selectionManager\"\n    ></vdr-bulk-action-menu>\n</div>\n<div class=\"collection-wrapper\">\n    <vdr-collection-tree\n        [collections]=\"items$ | async\"\n        [activeCollectionId]=\"activeCollectionId$ | async\"\n        [expandAll]=\"expandAll\"\n        [expandedIds]=\"expandedIds\"\n        [selectionManager]=\"selectionManager\"\n        (rearrange)=\"onRearrange($event)\"\n        (deleteCollection)=\"deleteCollection($event)\"\n    ></vdr-collection-tree>\n\n    <div class=\"collection-contents\" [class.expanded]=\"activeCollectionId$ | async\">\n        <vdr-collection-contents [collectionId]=\"activeCollectionId$ | async\">\n            <ng-template let-count>\n                <div class=\"collection-title\">\n                    {{ activeCollectionTitle$ | async }} ({{\n                        'common.results-count' | translate: { count: count }\n                    }})\n                </div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeContents()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </ng-template>\n        </vdr-collection-contents>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;flex-direction:column}.bulk-select-controls{min-height:36px;padding-left:14px;display:flex;align-items:center;border-bottom:1px solid var(--color-component-border-200)}.expand-all-toggle{display:block}.collection-wrapper{display:flex;height:calc(100% - 50px)}.collection-wrapper vdr-collection-tree{flex:1;height:100%;overflow:auto}.collection-wrapper .collection-contents{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.collection-wrapper .collection-contents.expanded{width:30vw;visibility:visible;opacity:1;padding-left:12px}.collection-wrapper .collection-contents .close-button{margin:0;background:none;border:none;cursor:pointer}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}\n"]
            },] }
];
CollectionListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aW9uLWxpc3QvY29sbGVjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxXQUFXLEVBR1gsWUFBWSxFQUNaLG1CQUFtQixFQUVuQixnQkFBZ0IsRUFDaEIsbUJBQW1CLEdBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFDSCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixTQUFTLEVBQ1QsR0FBRyxHQUNOLE1BQU0sZ0JBQWdCLENBQUM7QUFVeEIsTUFBTSxPQUFPLHVCQUF1QjtJQWFoQyxZQUNZLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxZQUEwQixFQUMxQixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ3hDLGlCQUFvQztRQU5wQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENB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RCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBa0I7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUN6QixPQUFPLGtCQUNILElBQUksRUFBRSxDQUFDLEVBQ1AsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLFVBQVU7Z0JBQ1YsQ0FBQyxDQUFDO29CQUNJLE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUU7NEJBQ0YsUUFBUSxFQUFFLFVBQVU7eUJBQ3ZCO3FCQUNKO2lCQUNKO2dCQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDWjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQWhMSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMG9HQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUE1QkcsV0FBVztZQUlYLG1CQUFtQjtZQURuQixZQUFZO1lBTlMsTUFBTTtZQUF0QixjQUFjO1lBVW5CLG1CQUFtQjtZQVpXLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgRGF0YVNlcnZpY2UsXG4gICAgR2V0Q29sbGVjdGlvbkxpc3QsXG4gICAgTGFuZ3VhZ2VDb2RlLFxuICAgIE1vZGFsU2VydmljZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFF1ZXJ5UmVzdWx0LFxuICAgIFNlbGVjdGlvbk1hbmFnZXIsXG4gICAgU2VydmVyQ29uZmlnU2VydmljZSxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBFTVBUWSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBkZWJvdW5jZVRpbWUsXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gICAgbWFwLFxuICAgIHNoYXJlUmVwbGF5LFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlLFxuICAgIHRha2VVbnRpbCxcbiAgICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvblBhcnRpYWwsIFJlYXJyYW5nZUV2ZW50IH0gZnJvbSAnLi4vY29sbGVjdGlvbi10cmVlL2NvbGxlY3Rpb24tdHJlZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jb2xsZWN0aW9uLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb2xsZWN0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbGxlY3Rpb24tbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBmaWx0ZXJUZXJtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgYWN0aXZlQ29sbGVjdGlvbklkJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgICBhY3RpdmVDb2xsZWN0aW9uVGl0bGUkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gICAgaXRlbXMkOiBPYnNlcnZhYmxlPEdldENvbGxlY3Rpb25MaXN0Lkl0ZW1zW10+O1xuICAgIGF2YWlsYWJsZUxhbmd1YWdlcyQ6IE9ic2VydmFibGU8TGFuZ3VhZ2VDb2RlW10+O1xuICAgIGNvbnRlbnRMYW5ndWFnZSQ6IE9ic2VydmFibGU8TGFuZ3VhZ2VDb2RlPjtcbiAgICBleHBhbmRBbGwgPSBmYWxzZTtcbiAgICBleHBhbmRlZElkczogc3RyaW5nW10gPSBbXTtcbiAgICBzZWxlY3Rpb25NYW5hZ2VyOiBTZWxlY3Rpb25NYW5hZ2VyPENvbGxlY3Rpb25QYXJ0aWFsPjtcbiAgICBwcml2YXRlIHF1ZXJ5UmVzdWx0OiBRdWVyeVJlc3VsdDxhbnk+O1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIgPSBuZXcgU2VsZWN0aW9uTWFuYWdlcih7XG4gICAgICAgICAgICBhZGRpdGl2ZU1vZGU6IHRydWUsXG4gICAgICAgICAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zQXJlRXF1YWw6IChhLCBiKSA9PiBhLmlkID09PSBiLmlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5xdWVyeVJlc3VsdCA9IHRoaXMuZGF0YVNlcnZpY2UuY29sbGVjdGlvbi5nZXRDb2xsZWN0aW9ucygxMDAwLCAwKS5yZWZldGNoT25DaGFubmVsQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuaXRlbXMkID0gdGhpcy5xdWVyeVJlc3VsdFxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuY29sbGVjdGlvbnMuaXRlbXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoaXRlbXMgPT4gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNldEN1cnJlbnRJdGVtcyhpdGVtcykpLFxuICAgICAgICAgICAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uSWQkID0gdGhpcy5yb3V0ZS5wYXJhbU1hcC5waXBlKFxuICAgICAgICAgICAgbWFwKHBtID0+IHBtLmdldCgnY29udGVudHMnKSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmV4cGFuZGVkSWRzID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldCgnZXhwYW5kZWQnKT8uc3BsaXQoJywnKSA/PyBbXTtcbiAgICAgICAgdGhpcy5leHBhbmRBbGwgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXAuZ2V0KCdleHBhbmRlZCcpID09PSAnYWxsJztcblxuICAgICAgICB0aGlzLmFjdGl2ZUNvbGxlY3Rpb25UaXRsZSQgPSBjb21iaW5lTGF0ZXN0KHRoaXMuYWN0aXZlQ29sbGVjdGlvbklkJCwgdGhpcy5pdGVtcyQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtpZCwgY29sbGVjdGlvbnNdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gY29sbGVjdGlvbnMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2gubmFtZSA6ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVMYW5ndWFnZXMkID0gdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLmdldEF2YWlsYWJsZUxhbmd1YWdlcygpO1xuICAgICAgICB0aGlzLmNvbnRlbnRMYW5ndWFnZSQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVpU3RhdGUoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbSgoeyB1aVN0YXRlIH0pID0+IHVpU3RhdGUuY29udGVudExhbmd1YWdlKVxuICAgICAgICAgICAgLnBpcGUodGFwKCgpID0+IHRoaXMucmVmcmVzaCgpKSk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJUZXJtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgyNTApLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRlcm0gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcTogdGVybSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6ICdtZXJnZScsXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXBcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChxcG0gPT4gcXBtLmdldCgncScpKSxcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgICAgICB0aGlzLmZpbHRlclRlcm1Db250cm9sLnBhdGNoVmFsdWUodGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldCgncScpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5xdWVyeVJlc3VsdC5jb21wbGV0ZWQkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVFeHBhbmRBbGwoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogdGhpcy5leHBhbmRBbGwgPyAnYWxsJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiAnbWVyZ2UnLFxuICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25SZWFycmFuZ2UoZXZlbnQ6IFJlYXJyYW5nZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY29sbGVjdGlvbi5tb3ZlQ29sbGVjdGlvbihbZXZlbnRdKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktc2F2ZWQtY2hhbmdlcycpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1zYXZlLWNoYW5nZXMtZXJyb3InKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDb2xsZWN0aW9uKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pdGVtcyRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IC0xIDwgaXRlbXMuZmluZEluZGV4KGkgPT4gaS5wYXJlbnQgJiYgaS5wYXJlbnQuaWQgPT09IGlkKSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGhhc0NoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1jb2xsZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBoYXNDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1jb2xsZWN0aW9uLWFuZC1jaGlsZHJlbi1ib2R5JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiAocmVzcG9uc2UgPyB0aGlzLmRhdGFTZXJ2aWNlLmNvbGxlY3Rpb24uZGVsZXRlQ29sbGVjdGlvbihpZCkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgY2xvc2VDb250ZW50cygpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0geyAuLi50aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtcyB9O1xuICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRlbnRzO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJywgcGFyYW1zXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtc0hhbmRsaW5nOiAncHJlc2VydmUnIH0pO1xuICAgIH1cblxuICAgIHNldExhbmd1YWdlKGNvZGU6IExhbmd1YWdlQ29kZSkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC5zZXRDb250ZW50TGFuZ3VhZ2UoY29kZSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyVGVybSA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoJ3EnKTtcbiAgICAgICAgdGhpcy5xdWVyeVJlc3VsdC5yZWYucmVmZXRjaCh7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2tpcDogMCxcbiAgICAgICAgICAgICAgICB0YWtlOiAxMDAwLFxuICAgICAgICAgICAgICAgIC4uLihmaWx0ZXJUZXJtXG4gICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluczogZmlsdGVyVGVybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
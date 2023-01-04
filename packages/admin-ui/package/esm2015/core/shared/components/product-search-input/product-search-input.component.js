import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { SingleSearchSelectionModelFactory } from '../../../common/single-search-selection-model';
const ɵ0 = SingleSearchSelectionModelFactory;
export class ProductSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.facetValueChange = new EventEmitter();
        this.lastTerm = '';
        this.lastFacetValueIds = [];
        this.filterFacetResults = (term, item) => {
            if (!this.isFacetValueItem(item)) {
                return false;
            }
            const cix = term.indexOf(':');
            const facetName = cix > -1 ? term.toLowerCase().slice(0, cix) : null;
            const facetVal = cix > -1 ? term.toLowerCase().slice(cix + 1) : term.toLowerCase();
            if (facetName) {
                return (item.facetValue.facet.name.toLowerCase().includes(facetName) &&
                    item.facetValue.name.toLocaleLowerCase().includes(facetVal));
            }
            return (item.facetValue.name.toLowerCase().includes(term.toLowerCase()) ||
                item.facetValue.facet.name.toLowerCase().includes(term.toLowerCase()));
        };
        this.isFacetValueItem = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('facetValue');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isFacetValueItem(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setFacetValues(ids) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isFacetValueItem(item.value) && !ids.includes(item.value.facetValue.id)) {
                this.selectComponent.unselect(item);
            }
        });
        ids.map(id => {
            return items === null || items === void 0 ? void 0 : items.find(item => this.isFacetValueItem(item) && item.facetValue.id === id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isFacetValueItem(val)) {
                    return val.facetValue.id === item.facetValue.id;
                }
                return false;
            });
            if (!isSelected) {
                this.selectComponent.select({ label: '', value: item });
            }
        });
    }
    onSelectChange(selectedItems) {
        if (!Array.isArray(selectedItems)) {
            selectedItems = [selectedItems];
        }
        const searchTermItem = selectedItems.find(item => !this.isFacetValueItem(item));
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const facetValueIds = selectedItems.filter(this.isFacetValueItem).map(i => i.facetValue.id);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastFacetValueIds.join(',') !== facetValueIds.join(',')) {
            this.facetValueChange.emit(facetValueIds);
            this.lastFacetValueIds = facetValueIds;
        }
    }
    addTagFn(item) {
        return { label: item };
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
}
ProductSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-product-name-or-code' | translate\"\n    [items]=\"facetValueResults\"\n    [searchFn]=\"filterFacetResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip\n                [facetValue]=\"item.facetValue\"\n                [removable]=\"true\"\n                (remove)=\"clear(item)\"\n            ></vdr-facet-value-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.facetValue\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip [facetValue]=\"item.facetValue\" [removable]=\"false\"></vdr-facet-value-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                styles: [":host{margin-top:6px;display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
ProductSearchInputComponent.propDecorators = {
    facetValueResults: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    facetValueChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWFyY2gtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9wcm9kdWN0LXNlYXJjaC1pbnB1dC9wcm9kdWN0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFxQix1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO1dBT3BDLGlDQUFpQztBQUUvRixNQUFNLE9BQU8sMkJBQTJCO0lBUHhDO1FBU2MscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5QyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRWxELGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUF3Q3pDLHVCQUFrQixHQUFHLENBQUMsSUFBWSxFQUFFLElBQW9ELEVBQUUsRUFBRTtZQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFB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Z0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7U0FDOUI7UUFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVM7UUFDZCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBc0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBdEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywyakRBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxJQUFtQyxFQUFFLENBQUM7O2FBQ2pHOzs7Z0NBRUksS0FBSzsrQkFDTCxNQUFNOytCQUNOLE1BQU07OEJBQ04sU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCwgU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBub3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5cbmltcG9ydCB7IFNlYXJjaFByb2R1Y3RzIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBTaW5nbGVTZWFyY2hTZWxlY3Rpb25Nb2RlbEZhY3RvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vc2luZ2xlLXNlYXJjaC1zZWxlY3Rpb24tbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9kdWN0LXNlYXJjaC1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3Qtc2VhcmNoLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlksIHVzZVZhbHVlOiBTaW5nbGVTZWFyY2hTZWxlY3Rpb25Nb2RlbEZhY3RvcnkgfV0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZWFyY2hJbnB1dENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgZmFjZXRWYWx1ZVJlc3VsdHM6IFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzW107XG4gICAgQE91dHB1dCgpIHNlYXJjaFRlcm1DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgZmFjZXRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nW10+KCk7XG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0Q29tcG9uZW50JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBzZWxlY3RDb21wb25lbnQ6IE5nU2VsZWN0Q29tcG9uZW50O1xuICAgIHByaXZhdGUgbGFzdFRlcm0gPSAnJztcbiAgICBwcml2YXRlIGxhc3RGYWNldFZhbHVlSWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgc2V0U2VhcmNoVGVybSh0ZXJtOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgICAgIGlmICh0ZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3QoeyBsYWJlbDogdGVybSwgdmFsdWU6IHsgbGFiZWw6IHRlcm0gfSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUZXJtID0gdGhpcy5zZWxlY3RDb21wb25lbnQuc2VsZWN0ZWRJdGVtcy5maW5kKGkgPT4gIXRoaXMuaXNGYWNldFZhbHVlSXRlbShpLnZhbHVlKSk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRlcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC51bnNlbGVjdChjdXJyZW50VGVybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGYWNldFZhbHVlcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zZWxlY3RDb21wb25lbnQuaXRlbXM7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNGYWNldFZhbHVlSXRlbShpdGVtLnZhbHVlKSAmJiAhaWRzLmluY2x1ZGVzKGl0ZW0udmFsdWUuZmFjZXRWYWx1ZS5pZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC51bnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWRzLm1hcChpZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM/LmZpbmQoaXRlbSA9PiB0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkgJiYgaXRlbS5mYWNldFZhbHVlLmlkID09PSBpZCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZClcbiAgICAgICAgICAgIC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3RlZEl0ZW1zLmZpbmQoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0odmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5mYWNldFZhbHVlLmlkID09PSBpdGVtLmZhY2V0VmFsdWUuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3QoeyBsYWJlbDogJycsIHZhbHVlOiBpdGVtIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlckZhY2V0UmVzdWx0cyA9ICh0ZXJtOiBzdHJpbmcsIGl0ZW06IFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzIHwgeyBsYWJlbDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNpeCA9IHRlcm0uaW5kZXhPZignOicpO1xuICAgICAgICBjb25zdCBmYWNldE5hbWUgPSBjaXggPiAtMSA/IHRlcm0udG9Mb3dlckNhc2UoKS5zbGljZSgwLCBjaXgpIDogbnVsbDtcbiAgICAgICAgY29uc3QgZmFjZXRWYWwgPSBjaXggPiAtMSA/IHRlcm0udG9Mb3dlckNhc2UoKS5zbGljZShjaXggKyAxKSA6IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoZmFjZXROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGl0ZW0uZmFjZXRWYWx1ZS5mYWNldC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmFjZXROYW1lKSAmJlxuICAgICAgICAgICAgICAgIGl0ZW0uZmFjZXRWYWx1ZS5uYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmFjZXRWYWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGl0ZW0uZmFjZXRWYWx1ZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICAgICAgaXRlbS5mYWNldFZhbHVlLmZhY2V0Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIG9uU2VsZWN0Q2hhbmdlKHNlbGVjdGVkSXRlbXM6IEFycmF5PFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzIHwgeyBsYWJlbDogc3RyaW5nIH0+KSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW1zKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFtzZWxlY3RlZEl0ZW1zXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtSXRlbSA9IHNlbGVjdGVkSXRlbXMuZmluZChpdGVtID0+ICF0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkpIGFzXG4gICAgICAgICAgICB8IHsgbGFiZWw6IHN0cmluZyB9XG4gICAgICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaFRlcm1JdGVtID8gc2VhcmNoVGVybUl0ZW0ubGFiZWwgOiAnJztcblxuICAgICAgICBjb25zdCBmYWNldFZhbHVlSWRzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIodGhpcy5pc0ZhY2V0VmFsdWVJdGVtKS5tYXAoaSA9PiBpLmZhY2V0VmFsdWUuaWQpO1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtICE9PSB0aGlzLmxhc3RUZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdChzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhc3RGYWNldFZhbHVlSWRzLmpvaW4oJywnKSAhPT0gZmFjZXRWYWx1ZUlkcy5qb2luKCcsJykpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZXRWYWx1ZUNoYW5nZS5lbWl0KGZhY2V0VmFsdWVJZHMpO1xuICAgICAgICAgICAgdGhpcy5sYXN0RmFjZXRWYWx1ZUlkcyA9IGZhY2V0VmFsdWVJZHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRUYWdGbihpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGl0ZW0gfTtcbiAgICB9XG5cbiAgICBpc1NlYXJjaEhlYWRlclNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RDb21wb25lbnQuaXRlbXNMaXN0Lm1hcmtlZEluZGV4ID09PSAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmFjZXRWYWx1ZUl0ZW0gPSAoaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyBTZWFyY2hQcm9kdWN0cy5GYWNldFZhbHVlcyA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmICEhaW5wdXQgJiYgaW5wdXQuaGFzT3duUHJvcGVydHkoJ2ZhY2V0VmFsdWUnKTtcbiAgICB9O1xufVxuIl19
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { SingleSearchSelectionModelFactory } from '../../../common/single-search-selection-model';
const ɵ0 = SingleSearchSelectionModelFactory;
export class AssetSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.tagsChange = new EventEmitter();
        this.lastTerm = '';
        this.lastTagIds = [];
        this.filterTagResults = (term, item) => {
            if (!this.isTag(item)) {
                return false;
            }
            return item.value.toLowerCase().startsWith(term.toLowerCase());
        };
        this.isTag = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('value');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isTag(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setTags(tags) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isTag(item.value) && !tags.map(t => t.id).includes(item.id)) {
                this.selectComponent.unselect(item);
            }
        });
        tags.map(tag => {
            return items === null || items === void 0 ? void 0 : items.find(item => this.isTag(item) && item.id === tag.id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isTag(val)) {
                    return val.id === item.id;
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
        const searchTermItems = selectedItems.filter(item => !this.isTag(item));
        if (1 < searchTermItems.length) {
            for (let i = 0; i < searchTermItems.length - 1; i++) {
                // this.selectComponent.unselect(searchTermItems[i] as any);
            }
        }
        const searchTermItem = searchTermItems[searchTermItems.length - 1];
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const tags = selectedItems.filter(this.isTag);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastTagIds.join(',') !== tags.map(t => t.id).join(',')) {
            this.tagsChange.emit(tags);
            this.lastTagIds = tags.map(t => t.id);
        }
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
    addTagFn(item) {
        return { label: item };
    }
}
AssetSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-asset-name-or-tag' | translate\"\n    [items]=\"tags\"\n    [searchFn]=\"filterTagResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\" icon=\"close\" (iconClick)=\"clear(item)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.value\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label || item }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                styles: [":host{display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
AssetSearchInputComponent.propDecorators = {
    tags: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    tagsChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtc2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvYXNzZXQtc2VhcmNoLWlucHV0L2Fzc2V0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFxQix1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO1dBT3BDLGlDQUFpQztBQUUvRixNQUFNLE9BQU8seUJBQXlCO0lBUHRDO1FBU2MscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5QyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFakQsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGVBQVUsR0FBYSxFQUFFLENBQUM7UUF3Q2xDLHFCQUFnQixHQUFHLENBQUMsSUFBWSxFQUFFLElBQW9ELEVBQUUsRUFBRTtZQUN0RixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQztRQXNDTSxVQUFLLEdBQUcsQ0FBQyxLQUFjLEVBQXdCLEVBQUU7WUFDckQsT0FBTyxPQUFPLEtBQUssS0FBSyxR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QUksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTlGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsZ2hEQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsSUFBbUMsRUFBRSxDQUFDOzthQUNqRzs7O21CQUVJLEtBQUs7K0JBQ0wsTUFBTTt5QkFDTixNQUFNOzhCQUNOLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTZWxlY3RDb21wb25lbnQsIFNFTEVDVElPTl9NT0RFTF9GQUNUT1JZIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuXG5pbXBvcnQgeyBTZWFyY2hQcm9kdWN0cywgVGFnRnJhZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IFNpbmdsZVNlYXJjaFNlbGVjdGlvbk1vZGVsRmFjdG9yeSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9zaW5nbGUtc2VhcmNoLXNlbGVjdGlvbi1tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2V0LXNlYXJjaC1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtc2VhcmNoLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBTRUxFQ1RJT05fTU9ERUxfRkFDVE9SWSwgdXNlVmFsdWU6IFNpbmdsZVNlYXJjaFNlbGVjdGlvbk1vZGVsRmFjdG9yeSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRTZWFyY2hJbnB1dENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdGFnczogVGFnRnJhZ21lbnRbXTtcbiAgICBAT3V0cHV0KCkgc2VhcmNoVGVybUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSB0YWdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdGcmFnbWVudFtdPigpO1xuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdENvbXBvbmVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgc2VsZWN0Q29tcG9uZW50OiBOZ1NlbGVjdENvbXBvbmVudDtcbiAgICBwcml2YXRlIGxhc3RUZXJtID0gJyc7XG4gICAgcHJpdmF0ZSBsYXN0VGFnSWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgc2V0U2VhcmNoVGVybSh0ZXJtOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgICAgIGlmICh0ZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3QoeyBsYWJlbDogdGVybSwgdmFsdWU6IHsgbGFiZWw6IHRlcm0gfSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUZXJtID0gdGhpcy5zZWxlY3RDb21wb25lbnQuc2VsZWN0ZWRJdGVtcy5maW5kKGkgPT4gIXRoaXMuaXNUYWcoaS52YWx1ZSkpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXJtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQudW5zZWxlY3QoY3VycmVudFRlcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGFncyh0YWdzOiBUYWdGcmFnbWVudFtdKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zZWxlY3RDb21wb25lbnQuaXRlbXM7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUYWcoaXRlbS52YWx1ZSkgJiYgIXRhZ3MubWFwKHQgPT4gdC5pZCkuaW5jbHVkZXMoaXRlbS5pZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC51bnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcz8uZmluZChpdGVtID0+IHRoaXMuaXNUYWcoaXRlbSkgJiYgaXRlbS5pZCA9PT0gdGFnLmlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKVxuICAgICAgICAgICAgLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0Q29tcG9uZW50LnNlbGVjdGVkSXRlbXMuZmluZChpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gaS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUYWcodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5pZCA9PT0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50LnNlbGVjdCh7IGxhYmVsOiAnJywgdmFsdWU6IGl0ZW0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyVGFnUmVzdWx0cyA9ICh0ZXJtOiBzdHJpbmcsIGl0ZW06IFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzIHwgeyBsYWJlbDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVGFnKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuICAgIG9uU2VsZWN0Q2hhbmdlKHNlbGVjdGVkSXRlbXM6IEFycmF5PFRhZ0ZyYWdtZW50IHwgeyBsYWJlbDogc3RyaW5nIH0+KSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW1zKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFtzZWxlY3RlZEl0ZW1zXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1JdGVtcyA9IHNlbGVjdGVkSXRlbXMuZmlsdGVyKGl0ZW0gPT4gIXRoaXMuaXNUYWcoaXRlbSkpO1xuICAgICAgICBpZiAoMSA8IHNlYXJjaFRlcm1JdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoVGVybUl0ZW1zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0Q29tcG9uZW50LnVuc2VsZWN0KHNlYXJjaFRlcm1JdGVtc1tpXSBhcyBhbnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybUl0ZW0gPSBzZWFyY2hUZXJtSXRlbXNbc2VhcmNoVGVybUl0ZW1zLmxlbmd0aCAtIDFdIGFzIHsgbGFiZWw6IHN0cmluZyB9IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtSXRlbSA/IHNlYXJjaFRlcm1JdGVtLmxhYmVsIDogJyc7XG5cbiAgICAgICAgY29uc3QgdGFncyA9IHNlbGVjdGVkSXRlbXMuZmlsdGVyKHRoaXMuaXNUYWcpO1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtICE9PSB0aGlzLmxhc3RUZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdChzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhc3RUYWdJZHMuam9pbignLCcpICE9PSB0YWdzLm1hcCh0ID0+IHQuaWQpLmpvaW4oJywnKSkge1xuICAgICAgICAgICAgdGhpcy50YWdzQ2hhbmdlLmVtaXQodGFncyk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUYWdJZHMgPSB0YWdzLm1hcCh0ID0+IHQuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWFyY2hIZWFkZXJTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0Q29tcG9uZW50Lml0ZW1zTGlzdC5tYXJrZWRJbmRleCA9PT0gLTE7XG4gICAgfVxuXG4gICAgYWRkVGFnRm4oaXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBpdGVtIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RhZyA9IChpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIFRhZ0ZyYWdtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgISFpbnB1dCAmJiBpbnB1dC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKTtcbiAgICB9O1xufVxuIl19
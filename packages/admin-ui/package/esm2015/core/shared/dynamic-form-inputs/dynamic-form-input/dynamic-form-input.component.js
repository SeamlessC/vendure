import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewChildren, ViewContainerRef, } from '@angular/core';
import { FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { simpleDeepClone } from '@vendure/common/lib/simple-deep-clone';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { getConfigArgValue } from '../../../common/utilities/configurable-operation-utils';
import { ComponentRegistryService } from '../../../providers/component-registry/component-registry.service';
/**
 * A host component which delegates to an instance or list of FormInputComponent components.
 */
export class DynamicFormInputComponent {
    constructor(componentRegistryService, componentFactoryResolver, changeDetectorRef, injector) {
        this.componentRegistryService = componentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.injector = injector;
        this.renderAsList = false;
        this.listItems = [];
        this.listId = 1;
        this.listFormArray = new FormArray([]);
        this.renderList$ = new Subject();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        const componentId = this.getInputComponentConfig(this.def).component;
        const componentType = this.componentRegistryService.getInputComponent(componentId);
        if (componentType) {
            this.componentType = componentType;
        }
        else {
            // tslint:disable-next-line:no-console
            console.error(`No form input component registered with the id "${componentId}". Using the default input instead.`);
            const defaultComponentType = this.componentRegistryService.getInputComponent(this.getInputComponentConfig(Object.assign(Object.assign({}, this.def), { ui: undefined })).component);
            if (defaultComponentType) {
                this.componentType = defaultComponentType;
            }
        }
    }
    ngAfterViewInit() {
        var _a;
        if (this.componentType) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
            // create a temp instance to check the value of `isListInput`
            const cmpRef = factory.create(this.injector);
            const isListInputComponent = (_a = cmpRef.instance.isListInput) !== null && _a !== void 0 ? _a : false;
            cmpRef.destroy();
            if (this.def.list === false && isListInputComponent) {
                throw new Error(`The ${this.componentType.name} component is a list input, but the definition for ${this.def.name} does not expect a list`);
            }
            this.renderAsList = this.def.list && !isListInputComponent;
            if (!this.renderAsList) {
                this.singleComponentRef = this.renderInputComponent(factory, this.singleViewContainer, this.control);
            }
            else {
                let formArraySub;
                const renderListInputs = (viewContainerRefs) => {
                    if (viewContainerRefs.length) {
                        if (formArraySub) {
                            formArraySub.unsubscribe();
                        }
                        this.listFormArray = new FormArray([]);
                        this.listItems.forEach(i => { var _a; return (_a = i.componentRef) === null || _a === void 0 ? void 0 : _a.destroy(); });
                        viewContainerRefs.forEach((ref, i) => {
                            var _a;
                            const listItem = (_a = this.listItems) === null || _a === void 0 ? void 0 : _a[i];
                            if (listItem) {
                                this.listFormArray.push(listItem.control);
                                listItem.componentRef = this.renderInputComponent(factory, ref, listItem.control);
                            }
                        });
                        formArraySub = this.listFormArray.valueChanges
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(val => {
                            this.control.markAsTouched();
                            this.control.markAsDirty();
                            this.onChange(val);
                            this.control.patchValue(val, { emitEvent: false });
                        });
                        setTimeout(() => this.changeDetectorRef.markForCheck());
                    }
                };
                // initial render
                this.listItemContainers.changes
                    .pipe(take(1))
                    .subscribe(val => renderListInputs(this.listItemContainers));
                // render on changes to the list
                this.renderList$
                    .pipe(switchMap(() => this.listItemContainers.changes.pipe(take(1))), takeUntil(this.destroy$))
                    .subscribe(() => {
                    renderListInputs(this.listItemContainers);
                });
            }
        }
        setTimeout(() => this.changeDetectorRef.markForCheck());
    }
    ngOnChanges(changes) {
        if (this.listItems) {
            for (const item of this.listItems) {
                if (item.componentRef) {
                    this.updateBindings(changes, item.componentRef);
                }
            }
        }
        if (this.singleComponentRef) {
            this.updateBindings(changes, this.singleComponentRef);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateBindings(changes, componentRef) {
        if ('def' in changes) {
            componentRef.instance.config = simpleDeepClone(this.def);
        }
        if ('readonly' in changes) {
            componentRef.instance.readonly = this.readonly;
        }
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
    trackById(index, item) {
        return item.id;
    }
    addListItem() {
        var _a;
        if (!this.listItems) {
            this.listItems = [];
        }
        this.listItems.push({
            id: this.listId++,
            control: new FormControl((_a = this.def.defaultValue) !== null && _a !== void 0 ? _a : null),
        });
        this.renderList$.next();
    }
    moveListItem(event) {
        if (this.listItems) {
            moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
            this.listFormArray.removeAt(event.previousIndex);
            this.listFormArray.insert(event.currentIndex, event.item.data.control);
            this.renderList$.next();
        }
    }
    removeListItem(item) {
        var _a;
        if (this.listItems) {
            const index = this.listItems.findIndex(i => i === item);
            (_a = item.componentRef) === null || _a === void 0 ? void 0 : _a.destroy();
            this.listFormArray.removeAt(index);
            this.listItems = this.listItems.filter(i => i !== item);
            this.renderList$.next();
        }
    }
    renderInputComponent(factory, viewContainerRef, formControl) {
        const componentRef = viewContainerRef.createComponent(factory);
        const { instance } = componentRef;
        instance.config = simpleDeepClone(this.def);
        instance.formControl = formControl;
        instance.readonly = this.readonly;
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
        return componentRef;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            if (obj.length === this.listItems.length) {
                obj.forEach((value, index) => {
                    var _a;
                    const control = (_a = this.listItems[index]) === null || _a === void 0 ? void 0 : _a.control;
                    control.patchValue(getConfigArgValue(value), { emitEvent: false });
                });
            }
            else {
                this.listItems = obj.map(value => ({
                    id: this.listId++,
                    control: new FormControl(getConfigArgValue(value)),
                }));
                this.renderList$.next();
            }
        }
        else {
            this.listItems = [];
            this.renderList$.next();
        }
        this.changeDetectorRef.markForCheck();
    }
    getInputComponentConfig(argDef) {
        var _a;
        if (this.hasUiConfig(argDef) && argDef.ui.component) {
            return argDef.ui;
        }
        const type = argDef === null || argDef === void 0 ? void 0 : argDef.type;
        switch (type) {
            case 'string':
            case 'localeString': {
                const hasOptions = !!(this.isConfigArgDef(argDef) && ((_a = argDef.ui) === null || _a === void 0 ? void 0 : _a.options)) ||
                    !!argDef.options;
                if (hasOptions) {
                    return { component: 'select-form-input' };
                }
                else {
                    return { component: 'text-form-input' };
                }
            }
            case 'text': {
                return { component: 'textarea-form-input' };
            }
            case 'int':
            case 'float':
                return { component: 'number-form-input' };
            case 'boolean':
                return { component: 'boolean-form-input' };
            case 'datetime':
                return { component: 'date-form-input' };
            case 'ID':
                return { component: 'text-form-input' };
            case 'relation':
                return { component: 'relation-form-input' };
            default:
                assertNever(type);
        }
    }
    isConfigArgDef(def) {
        var _a;
        return ((_a = def) === null || _a === void 0 ? void 0 : _a.__typename) === 'ConfigArgDefinition';
    }
    hasUiConfig(def) {
        var _a, _b;
        return typeof def === 'object' && typeof ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.component) === 'string';
    }
}
DynamicFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dynamic-form-input',
                template: "<ng-container *ngIf=\"!renderAsList; else list\">\n    <ng-container #single></ng-container>\n</ng-container>\n<ng-template #list>\n    <div class=\"list-container\" cdkDropList (cdkDropListDropped)=\"moveListItem($event)\">\n        <div\n            class=\"list-item-row\"\n            *ngFor=\"let item of listItems; trackBy: trackById\"\n            cdkDrag\n            [cdkDragData]=\"item\"\n        >\n            <ng-container #listItem></ng-container>\n            <button\n                class=\"btn btn-link btn-sm btn-warning\"\n                *ngIf=\"!readonly\"\n                (click)=\"removeListItem(item)\"\n                [title]=\"'common.remove-item-from-list' | translate\"\n            >\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"drag-handle\" cdkDragHandle [class.hidden]=\"readonly\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n        </div>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"addListItem()\" *ngIf=\"!readonly\">\n            <clr-icon shape=\"plus\"></clr-icon> {{ 'common.add-item-to-list' | translate }}\n        </button>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: DynamicFormInputComponent,
                        multi: true,
                    },
                ],
                styles: [":host{flex:1}.list-container{border:1px solid var(--color-component-border-200);border-radius:3px;padding:12px}.list-item-row{font-size:13px;display:flex;align-items:center;margin:3px 0}.drag-placeholder{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{font-size:13px;background-color:var(--color-component-bg-100);opacity:.8;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.drag-handle.hidden{display:none}.cdk-drag-placeholder{opacity:.1}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging .list-item-row:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}\n"]
            },] }
];
DynamicFormInputComponent.ctorParameters = () => [
    { type: ComponentRegistryService },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: Injector }
];
DynamicFormInputComponent.propDecorators = {
    def: [{ type: Input }],
    readonly: [{ type: Input }],
    control: [{ type: Input }],
    singleViewContainer: [{ type: ViewChild, args: ['single', { read: ViewContainerRef },] }],
    listItemContainers: [{ type: ViewChildren, args: ['listItem', { read: ViewContainerRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvZHluYW1pYy1mb3JtLWlucHV0L2R5bmFtaWMtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCx3QkFBd0IsRUFFeEIsUUFBUSxFQUNSLEtBQUssRUFPTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLFNBQVMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBUTVHOztHQUVHO0FBY0gsTUFBTSxPQUFPLHlCQUF5QjtJQW1CbEMsWUFDWSx3QkFBa0QsRUFDbEQsd0JBQWtELEVBQ2xELGlCQUFvQyxFQUNwQyxRQUFrQjtRQUhsQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFD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VUFBVTtnQkFDWCxPQUFPLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLENBQUM7WUFDaEQ7Z0JBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxHQUE0Qzs7UUFDL0QsT0FBTyxDQUFBLE1BQUMsR0FBMkIsMENBQUUsVUFBVSxNQUFLLHFCQUFxQixDQUFDO0lBQzlFLENBQUM7SUFFTyxXQUFXLENBQUMsR0FBWTs7UUFDNUIsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFBLE1BQUEsTUFBQyxHQUFXLDBDQUFFLEVBQUUsMENBQUUsU0FBUyxDQUFBLEtBQUssUUFBUSxDQUFDO0lBQ3RGLENBQUM7OztZQTNSSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsdXdDQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUseUJBQXlCO3dCQUN0QyxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjs7YUFDSjs7O1lBdkJRLHdCQUF3QjtZQXpCN0Isd0JBQXdCO1lBSHhCLGlCQUFpQjtZQUtqQixRQUFROzs7a0JBa0RQLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO2tDQUNMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7aUNBQzlDLFlBQVksU0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdHJpbmdDdXN0b21GaWVsZENvbmZpZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IENvbmZpZ0FyZ1R5cGUsIEN1c3RvbUZpZWxkVHlwZSwgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgc2ltcGxlRGVlcENsb25lIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaW1wbGUtZGVlcC1jbG9uZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IENvbmZpZ0FyZ0RlZmluaXRpb24sIEN1c3RvbUZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBnZXRDb25maWdBcmdWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvY29uZmlndXJhYmxlLW9wZXJhdGlvbi11dGlscyc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvY29tcG9uZW50LXJlZ2lzdHJ5L2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcblxudHlwZSBJbnB1dExpc3RJdGVtID0ge1xuICAgIGlkOiBudW1iZXI7XG4gICAgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPEZvcm1JbnB1dENvbXBvbmVudD47XG4gICAgY29udHJvbDogRm9ybUNvbnRyb2w7XG59O1xuXG4vKipcbiAqIEEgaG9zdCBjb21wb25lbnQgd2hpY2ggZGVsZWdhdGVzIHRvIGFuIGluc3RhbmNlIG9yIGxpc3Qgb2YgRm9ybUlucHV0Q29tcG9uZW50IGNvbXBvbmVudHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWR5bmFtaWMtZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHluYW1pYy1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IER5bmFtaWNGb3JtSW5wdXRDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUlucHV0Q29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3Nvclxue1xuICAgIEBJbnB1dCgpIGRlZjogQ29uZmlnQXJnRGVmaW5pdGlvbiB8IEN1c3RvbUZpZWxkQ29uZmlnO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIEBWaWV3Q2hpbGQoJ3NpbmdsZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBzaW5nbGVWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuICAgIEBWaWV3Q2hpbGRyZW4oJ2xpc3RJdGVtJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGxpc3RJdGVtQ29udGFpbmVyczogUXVlcnlMaXN0PFZpZXdDb250YWluZXJSZWY+O1xuICAgIHJlbmRlckFzTGlzdCA9IGZhbHNlO1xuICAgIGxpc3RJdGVtczogSW5wdXRMaXN0SXRlbVtdID0gW107XG4gICAgcHJpdmF0ZSBzaW5nbGVDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxGb3JtSW5wdXRDb21wb25lbnQ+O1xuICAgIHByaXZhdGUgbGlzdElkID0gMTtcbiAgICBwcml2YXRlIGxpc3RGb3JtQXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICBwcml2YXRlIGNvbXBvbmVudFR5cGU6IFR5cGU8Rm9ybUlucHV0Q29tcG9uZW50PjtcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsOiBhbnkpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBvblRvdWNoOiAoKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcmVuZGVyTGlzdCQgPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50UmVnaXN0cnlTZXJ2aWNlOiBDb21wb25lbnRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50SWQgPSB0aGlzLmdldElucHV0Q29tcG9uZW50Q29uZmlnKHRoaXMuZGVmKS5jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPSB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5U2VydmljZS5nZXRJbnB1dENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gICAgICAgIGlmIChjb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vIGZvcm0gaW5wdXQgY29tcG9uZW50IHJlZ2lzdGVyZWQgd2l0aCB0aGUgaWQgXCIke2NvbXBvbmVudElkfVwiLiBVc2luZyB0aGUgZGVmYXVsdCBpbnB1dCBpbnN0ZWFkLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdENvbXBvbmVudFR5cGUgPSB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5U2VydmljZS5nZXRJbnB1dENvbXBvbmVudChcbiAgICAgICAgICAgICAgICB0aGlzLmdldElucHV0Q29tcG9uZW50Q29uZmlnKHsgLi4udGhpcy5kZWYsIHVpOiB1bmRlZmluZWQgfSBhcyBhbnkpLmNvbXBvbmVudCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdENvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBkZWZhdWx0Q29tcG9uZW50VHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50VHlwZSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHRlbXAgaW5zdGFuY2UgdG8gY2hlY2sgdGhlIHZhbHVlIG9mIGBpc0xpc3RJbnB1dGBcbiAgICAgICAgICAgIGNvbnN0IGNtcFJlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgaXNMaXN0SW5wdXRDb21wb25lbnQgPSBjbXBSZWYuaW5zdGFuY2UuaXNMaXN0SW5wdXQgPz8gZmFsc2U7XG4gICAgICAgICAgICBjbXBSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWYubGlzdCA9PT0gZmFsc2UgJiYgaXNMaXN0SW5wdXRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIGBUaGUgJHt0aGlzLmNvbXBvbmVudFR5cGUubmFtZX0gY29tcG9uZW50IGlzIGEgbGlzdCBpbnB1dCwgYnV0IHRoZSBkZWZpbml0aW9uIGZvciAke3RoaXMuZGVmLm5hbWV9IGRvZXMgbm90IGV4cGVjdCBhIGxpc3RgLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlckFzTGlzdCA9IHRoaXMuZGVmLmxpc3QgJiYgIWlzTGlzdElucHV0Q29tcG9uZW50O1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlbmRlckFzTGlzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2luZ2xlQ29tcG9uZW50UmVmID0gdGhpcy5yZW5kZXJJbnB1dENvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVWaWV3Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvcm1BcnJheVN1YjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlckxpc3RJbnB1dHMgPSAodmlld0NvbnRhaW5lclJlZnM6IFF1ZXJ5TGlzdDxWaWV3Q29udGFpbmVyUmVmPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlld0NvbnRhaW5lclJlZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybUFycmF5U3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUFycmF5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RGb3JtQXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goaSA9PiBpLmNvbXBvbmVudFJlZj8uZGVzdHJveSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWZzLmZvckVhY2goKHJlZiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5saXN0SXRlbXM/LltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5LnB1c2gobGlzdEl0ZW0uY29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNvbXBvbmVudFJlZiA9IHRoaXMucmVuZGVySW5wdXRDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUFycmF5U3ViID0gdGhpcy5saXN0Rm9ybUFycmF5LnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5wYXRjaFZhbHVlKHZhbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1Db250YWluZXJzLmNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh2YWwgPT4gcmVuZGVyTGlzdElucHV0cyh0aGlzLmxpc3RJdGVtQ29udGFpbmVycykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVyIG9uIGNoYW5nZXMgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3QkXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubGlzdEl0ZW1Db250YWluZXJzLmNoYW5nZXMucGlwZSh0YWtlKDEpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJMaXN0SW5wdXRzKHRoaXMubGlzdEl0ZW1Db250YWluZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMubGlzdEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmluZGluZ3MoY2hhbmdlcywgaXRlbS5jb21wb25lbnRSZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaW5nbGVDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQmluZGluZ3MoY2hhbmdlcywgdGhpcy5zaW5nbGVDb21wb25lbnRSZWYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVCaW5kaW5ncyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzLCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxGb3JtSW5wdXRDb21wb25lbnQ+KSB7XG4gICAgICAgIGlmICgnZGVmJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY29uZmlnID0gc2ltcGxlRGVlcENsb25lKHRoaXMuZGVmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3JlYWRvbmx5JyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiB7IGlkOiBudW1iZXIgfSkge1xuICAgICAgICByZXR1cm4gaXRlbS5pZDtcbiAgICB9XG5cbiAgICBhZGRMaXN0SXRlbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmxpc3RJZCsrLFxuICAgICAgICAgICAgY29udHJvbDogbmV3IEZvcm1Db250cm9sKCh0aGlzLmRlZiBhcyBDb25maWdBcmdEZWZpbml0aW9uKS5kZWZhdWx0VmFsdWUgPz8gbnVsbCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICB9XG5cbiAgICBtb3ZlTGlzdEl0ZW0oZXZlbnQ6IENka0RyYWdEcm9wPElucHV0TGlzdEl0ZW0+KSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMubGlzdEl0ZW1zLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5LnJlbW92ZUF0KGV2ZW50LnByZXZpb3VzSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5Lmluc2VydChldmVudC5jdXJyZW50SW5kZXgsIGV2ZW50Lml0ZW0uZGF0YS5jb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdCQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGlzdEl0ZW0oaXRlbTogSW5wdXRMaXN0SXRlbSkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0SXRlbXMuZmluZEluZGV4KGkgPT4gaSA9PT0gaXRlbSk7XG4gICAgICAgICAgICBpdGVtLmNvbXBvbmVudFJlZj8uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zID0gdGhpcy5saXN0SXRlbXMuZmlsdGVyKGkgPT4gaSAhPT0gaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVySW5wdXRDb21wb25lbnQoXG4gICAgICAgIGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Rm9ybUlucHV0Q29tcG9uZW50PixcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sLFxuICAgICkge1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gY29tcG9uZW50UmVmO1xuICAgICAgICBpbnN0YW5jZS5jb25maWcgPSBzaW1wbGVEZWVwQ2xvbmUodGhpcy5kZWYpO1xuICAgICAgICBpbnN0YW5jZS5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICBpbnN0YW5jZS5yZWFkb25seSA9IHRoaXMucmVhZG9ubHk7XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIGlmIChvYmoubGVuZ3RoID09PSB0aGlzLmxpc3RJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmouZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmxpc3RJdGVtc1tpbmRleF0/LmNvbnRyb2w7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZShnZXRDb25maWdBcmdWYWx1ZSh2YWx1ZSksIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMgPSBvYmoubWFwKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5saXN0SWQrKyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sOiBuZXcgRm9ybUNvbnRyb2woZ2V0Q29uZmlnQXJnVmFsdWUodmFsdWUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgSW5wdXRMaXN0SXRlbSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5wdXRDb21wb25lbnRDb25maWcoYXJnRGVmOiBDb25maWdBcmdEZWZpbml0aW9uIHwgQ3VzdG9tRmllbGRDb25maWcpOiB7XG4gICAgICAgIGNvbXBvbmVudDogRGVmYXVsdEZvcm1Db21wb25lbnRJZDtcbiAgICB9IHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVWlDb25maWcoYXJnRGVmKSAmJiBhcmdEZWYudWkuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnRGVmLnVpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR5cGUgPSBhcmdEZWY/LnR5cGUgYXMgQ29uZmlnQXJnVHlwZSB8IEN1c3RvbUZpZWxkVHlwZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgY2FzZSAnbG9jYWxlU3RyaW5nJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc09wdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAhISh0aGlzLmlzQ29uZmlnQXJnRGVmKGFyZ0RlZikgJiYgYXJnRGVmLnVpPy5vcHRpb25zKSB8fFxuICAgICAgICAgICAgICAgICAgICAhIShhcmdEZWYgYXMgU3RyaW5nQ3VzdG9tRmllbGRDb25maWcpLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnc2VsZWN0LWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAndGV4dC1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAndGV4dGFyZWEtZm9ybS1pbnB1dCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnbnVtYmVyLWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb21wb25lbnQ6ICdib29sZWFuLWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnZGF0ZS1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgY2FzZSAnSUQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudDogJ3RleHQtZm9ybS1pbnB1dCcgfTtcbiAgICAgICAgICAgIGNhc2UgJ3JlbGF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb21wb25lbnQ6ICdyZWxhdGlvbi1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhc3NlcnROZXZlcih0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb25maWdBcmdEZWYoZGVmOiBDb25maWdBcmdEZWZpbml0aW9uIHwgQ3VzdG9tRmllbGRDb25maWcpOiBkZWYgaXMgQ29uZmlnQXJnRGVmaW5pdGlvbiB7XG4gICAgICAgIHJldHVybiAoZGVmIGFzIENvbmZpZ0FyZ0RlZmluaXRpb24pPy5fX3R5cGVuYW1lID09PSAnQ29uZmlnQXJnRGVmaW5pdGlvbic7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNVaUNvbmZpZyhkZWY6IHVua25vd24pOiBkZWYgaXMgeyB1aTogeyBjb21wb25lbnQ6IHN0cmluZyB9IH0ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIChkZWYgYXMgYW55KT8udWk/LmNvbXBvbmVudCA9PT0gJ3N0cmluZyc7XG4gICAgfVxufVxuIl19
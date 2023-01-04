import { __awaiter } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, LocalStorageService, LogicalOperator, ModalService, NotificationService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import dayjs from 'dayjs';
import { EMPTY, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, } from 'rxjs/operators';
export class OrderListComponent extends BaseListComponent {
    constructor(serverConfigService, dataService, localStorageService, router, route, modalService, notificationService) {
        var _a;
        super(router, route);
        this.serverConfigService = serverConfigService;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.itemList = [];
        this.audioOn = false;
        this.searchControl = new FormControl('');
        this.searchOrderCodeControl = new FormControl('');
        this.searchLastNameControl = new FormControl('');
        this.orderStates = this.serverConfigService.getOrderProcessStates().map(item => item.name);
        this.filterPresets = [
            {
                name: 'open',
                label: _('order.filter-preset-open'),
                config: {
                    active: false,
                    states: this.orderStates.filter(s => s !== 'Completed' && s !== 'Cancelled' && s !== 'Draft'),
                },
            },
            {
                name: 'completed',
                label: _('order.filter-preset-completed'),
                config: {
                    states: ['Completed', 'Cancelled'],
                },
            },
            {
                name: 'active',
                label: _('order.filter-preset-active'),
                config: {
                    active: true,
                },
            },
            {
                name: 'draft',
                label: _('order.filter-preset-draft'),
                config: {
                    active: false,
                    states: ['Draft'],
                },
            },
        ];
        this.canCreateDraftOrder = false;
        super.setQueryFn(
        // tslint:disable-next-line:no-shadowed-variable
        (take, skip) => this.dataService.order.getOrders({ take, skip }).refetchOnChannelChange(), data => data.orders, 
        // tslint:disable-next-line:no-shadowed-variable
        (skip, take) => this.createQueryOptions(skip, take, this.searchControl.value, this.route.snapshot.queryParamMap.get('filter') || 'open'));
        const lastFilters = this.localStorageService.get('orderListLastCustomFilters');
        if (lastFilters) {
            this.setQueryParam(lastFilters, { replaceUrl: true });
        }
        this.canCreateDraftOrder = !!((_a = this.serverConfigService
            .getOrderProcessStates()
            .find(state => state.name === 'Created')) === null || _a === void 0 ? void 0 : _a.to.includes('Draft'));
        if (!this.canCreateDraftOrder) {
            this.filterPresets = this.filterPresets.filter(p => p.name !== 'draft');
        }
    }
    ngOnInit() {
        const _super = Object.create(null, {
            ngOnInit: { get: () => super.ngOnInit }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.ngOnInit.call(this);
            this.activePreset$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('filter') || 'open'), distinctUntilChanged());
            this.dataService.settings.getActiveChannel().single$.subscribe(channel => {
                this.processingTime = channel.activeChannel['customFields']['processingTime'];
            });
            const searchTerms$ = merge(this.searchControl.valueChanges).pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250));
            merge(searchTerms$, this.route.queryParamMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(val => {
                this.refresh();
            });
            const queryParamMap = this.route.snapshot.queryParamMap;
            this.customFilterForm = new FormGroup({
                states: new FormControl((_a = queryParamMap.getAll('states')) !== null && _a !== void 0 ? _a : []),
                placedAtStart: new FormControl(queryParamMap.get('placedAtStart')),
                placedAtEnd: new FormControl(queryParamMap.get('placedAtEnd')),
            });
            this.setItemsPerPage(50); // default to 50
            this.refreshInterval = setInterval(() => {
                // const currentList = await this.items$.toPromise();
                this.refresh();
                // const newList = await this.items$.toPromise();
                // console.log(newList.length, currentList.length);
            }, 15000);
            this.audioElem = document.getElementById('audio_player');
            this.audioElem.muted = true;
            this.audioElem.addEventListener('play', () => {
                this.audioOn = true;
                this.audioElem.addEventListener('ended', () => {
                    this.audioOn = true;
                    this.audioElem.muted = false;
                });
            }, { once: true });
            this.audioElem.play().then(() => {
                this.audioOn = true;
            });
            this.items$.subscribe(value => {
                if (this.itemList.length !== 0 && this.itemList.length < value.length) {
                    this.playAudio();
                }
                this.itemList = value;
                // console.log(previousValue?.length, currentValue?.length);
                /** Do something */
            });
        });
    }
    toggleAudio() {
        if (!this.audioOn) {
            this.audioElem.play();
        }
        else {
            this.audioOn = !this.audioOn;
            this.audioElem.muted = !this.audioOn;
        }
    }
    playAudio() {
        var _a;
        (_a = this.audioElem) === null || _a === void 0 ? void 0 : _a.play();
    }
    formatTime(date) {
        return dayjs(date).format('hh:mm A');
    }
    formatDate(date) {
        return dayjs(date).format('DD/MMM');
    }
    getNextState(order, buttonText = false) {
        var _a;
        const authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(p => p.state === 'Authorized' && p.method === 'cash')[0];
        if (order.state === 'PaymentSettled' || order.state === 'PaymentAuthorized') {
            return 'Processing';
        }
        if (order.state === 'Processing') {
            return buttonText ? 'Ready For Pickup' : 'ReadyForPickup';
        }
        if (order.state === 'ReadyForPickup') {
            if (order.shippingLines[0].shippingMethod.code === 'delivery') {
                return 'Delivering';
            }
            if (authorizedCashPayment) {
                return buttonText ? 'Collect Cash' : 'Completed';
            }
            else {
                return 'Completed';
            }
        }
        if (order.state === 'Delivering') {
            if (authorizedCashPayment) {
                return buttonText ? 'Collect Cash' : 'Completed';
            }
            else {
                return 'Completed';
            }
        }
        return 'Processing';
    }
    toNextState(order) {
        return this.modalService
            .dialog({
            title: `Proceed to ${this.getNextState(order, true)}?`,
            body: `Are you sure you want to proceed to '${this.getNextState(order, true)}'?`,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'primary', label: 'Confirm', returnValue: true },
            ],
        })
            .pipe(switchMap((res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (res) {
                if (this.getNextState(order) === 'Completed') {
                    const authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(p => p.state === 'Authorized' && p.method === 'cash')[0];
                    if (authorizedCashPayment) {
                        const output = yield this.dataService.order
                            .settlePayment(authorizedCashPayment === null || authorizedCashPayment === void 0 ? void 0 : authorizedCashPayment.id.toString())
                            .toPromise();
                    }
                }
                yield this.dataService.order
                    .transitionToState(order.id.toString(), this.getNextState(order))
                    .toPromise();
                return true;
            }
            return EMPTY;
        })))
            .subscribe(() => {
            this.notificationService.success('Successfully Updated Order State');
            this.refresh();
        }, err => {
            this.notificationService.error('Error Updating Order State');
        });
    }
    selectFilterPreset(presetName) {
        var _a;
        const lastCustomFilters = (_a = this.localStorageService.get('orderListLastCustomFilters')) !== null && _a !== void 0 ? _a : {};
        const emptyCustomFilters = { states: undefined, placedAtStart: undefined, placedAtEnd: undefined };
        const filters = presetName === 'custom' ? lastCustomFilters : emptyCustomFilters;
        this.setQueryParam(Object.assign({ filter: presetName, page: 1 }, filters), { replaceUrl: true });
    }
    applyCustomFilters() {
        const formValue = this.customFilterForm.value;
        const customFilters = {
            states: formValue.states,
            placedAtStart: formValue.placedAtStart,
            placedAtEnd: formValue.placedAtEnd,
        };
        this.setQueryParam(Object.assign({ filter: 'custom' }, customFilters));
        this.customFilterForm.markAsPristine();
        this.localStorageService.set('orderListLastCustomFilters', customFilters);
    }
    createQueryOptions(
    // tslint:disable-next-line:no-shadowed-variable
    skip, take, searchTerm, activeFilterPreset) {
        var _a;
        const filterConfig = this.filterPresets.find(p => p.name === activeFilterPreset);
        // tslint:disable-next-line:no-shadowed-variable
        let filter = {};
        let filterOperator = LogicalOperator.AND;
        if (filterConfig) {
            if (filterConfig.config.active != null) {
                filter.active = {
                    eq: filterConfig.config.active,
                };
            }
            if (filterConfig.config.states) {
                filter.state = {
                    in: filterConfig.config.states,
                };
            }
        }
        else if (activeFilterPreset === 'custom') {
            const queryParams = this.route.snapshot.queryParamMap;
            const states = (_a = queryParams.getAll('states')) !== null && _a !== void 0 ? _a : [];
            const placedAtStart = queryParams.get('placedAtStart');
            const placedAtEnd = queryParams.get('placedAtEnd');
            if (states.length) {
                filter.state = {
                    in: states,
                };
            }
            if (placedAtStart && placedAtEnd) {
                filter.orderPlacedAt = {
                    between: {
                        start: placedAtStart,
                        end: placedAtEnd,
                    },
                };
            }
            else if (placedAtStart) {
                filter.orderPlacedAt = {
                    after: placedAtStart,
                };
            }
            else if (placedAtEnd) {
                filter.orderPlacedAt = {
                    before: placedAtEnd,
                };
            }
        }
        if (searchTerm) {
            filter = {
                customerLastName: {
                    contains: searchTerm,
                },
                transactionId: {
                    contains: searchTerm,
                },
                code: {
                    contains: searchTerm,
                },
            };
            filterOperator = LogicalOperator.OR;
        }
        return {
            options: {
                skip,
                take,
                filter: Object.assign({}, (filter !== null && filter !== void 0 ? filter : {})),
                sort: {
                    updatedAt: SortOrder.DESC,
                },
                filterOperator,
            },
        };
    }
    getShippingNames(order) {
        if (order.shippingLines.length) {
            return order.shippingLines.map(shippingLine => shippingLine.shippingMethod.name).join(', ');
        }
        else {
            return '';
        }
    }
    ngOnDestroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
}
OrderListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-list',
                template: "<audio src=\"assets/notification.mp3\" id=\"audio_player\"></audio>\n<clr-toggle-wrapper>\n    <input\n        id=\"audioToggle\"\n        type=\"checkbox\"\n        (change)=\"toggleAudio()\"\n        [checked]=\"audioOn\"\n        clrToggle\n        name=\"enabled\"\n    />\n    <label class=\"visible-toggle\"> <span>Play Notification Sound</span></label></clr-toggle-wrapper\n>\n<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"search-form\">\n            <div\n                class=\"filter-presets btn-group btn-outline-primary\"\n                *ngIf=\"activePreset$ | async as activePreset\"\n            >\n                <button\n                    class=\"btn\"\n                    *ngFor=\"let preset of filterPresets\"\n                    [class.btn-primary]=\"activePreset === preset.name\"\n                    (click)=\"selectFilterPreset(preset.name)\"\n                >\n                    {{ preset.label | translate }}\n                </button>\n                <button\n                    class=\"btn\"\n                    [class.btn-primary]=\"activePreset === 'custom'\"\n                    (click)=\"selectFilterPreset('custom')\"\n                >\n                    {{ 'order.filter-custom' | translate }}\n                    <clr-icon shape=\"angle down\"></clr-icon>\n                </button>\n            </div>\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"searchControl\"\n                [placeholder]=\"'order.search-by-order-filters' | translate\"\n                class=\"search-input\"\n            />\n        </div>\n        <div class=\"custom-filters\" [class.expanded]=\"(activePreset$ | async) === 'custom'\">\n            <form [formGroup]=\"customFilterForm\">\n                <div class=\"flex align-center\">\n                    <ng-select\n                        [items]=\"orderStates\"\n                        appendTo=\"body\"\n                        [addTag]=\"false\"\n                        [multiple]=\"true\"\n                        formControlName=\"states\"\n                        [placeholder]=\"'state.all-orders' | translate\"\n                        [clearable]=\"true\"\n                        [searchable]=\"false\"\n                    >\n                        <ng-template ng-option-tmp let-item=\"item\">{{\n                            item | stateI18nToken | translate\n                        }}</ng-template>\n                        <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                            <span class=\"ng-value-label\"> {{ item | stateI18nToken | translate }}</span>\n                            <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\"\n                                >\u00D7</span\n                            >\n                        </ng-template>\n                    </ng-select>\n                    <button\n                        class=\"btn btn-secondary\"\n                        [disabled]=\"customFilterForm.pristine\"\n                        (click)=\"applyCustomFilters()\"\n                    >\n                        {{ 'order.apply-filters' | translate }}\n                        <clr-icon shape=\"filter\"></clr-icon>\n                    </button>\n                </div>\n                <div class=\"flex\">\n                    <div>\n                        <label>{{ 'order.placed-at-start' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtStart\"></vdr-datetime-picker>\n                    </div>\n                    <div>\n                        <label>{{ 'order.placed-at-end' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtEnd\"></vdr-datetime-picker>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-list\"></vdr-action-bar-items>\n        <ng-container *ngIf=\"canCreateDraftOrder\">\n            <a\n                class=\"btn btn-primary mt1\"\n                *vdrIfPermissions=\"['CreateOrder']\"\n                [routerLink]=\"['./draft/create']\"\n            >\n                <clr-icon shape=\"plus\"></clr-icon>\n                {{ 'catalog.create-draft-order' | translate }}\n            </a>\n        </ng-container>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [customRowHeight]=\"5\"\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.customer' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.placed-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.time-left' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.shipping' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-order-label [order]=\"order\"></vdr-order-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.totalWithTax | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">\n            {{ formatTime(order.orderPlacedAt) }}<br />{{ formatDate(order.orderPlacedAt) }}\n        </td>\n        <td class=\"left align-middle\" style=\"font-size: 16px\">\n            <vdr-cd-timer\n                [autoStart]\n                [scheduledTime]=\"order.customFields.scheduledTime\"\n                [processingTime]=\"processingTime\"\n                [placedTime]=\"order.orderPlacedAt\"\n                format=\"ms\"\n                maxTimeUnit=\"hour\"\n            ></vdr-cd-timer>\n        </td>\n        <td class=\"left align-middle\">{{ getShippingNames(order) }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                [large]=\"true\"\n                *ngIf=\"order.nextStates.length > 0\"\n                iconShape=\"step-forward-2\"\n                [label]=\"getNextState(order, true)\"\n                (click)=\"toNextState(order)\"\n            ></vdr-table-row-action>\n            <!-- <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"\n                    order.state === 'Modifying'\n                        ? ['./', order.id, 'modify']\n                        : order.state === 'Draft'\n                        ? ['./draft', order.id]\n                        : ['./', order.id]\n                \"\n            ></vdr-table-row-action> -->\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-form{display:flex;flex-direction:column;align-items:baseline;width:100%;max-width:100vw;margin-bottom:6px}.filter-presets{max-width:90vw;overflow-x:auto}.search-input{margin-top:6px;min-width:300px}.custom-filters{overflow:hidden;max-height:0;padding-bottom:6px}.custom-filters.expanded{max-height:initial}.custom-filters>form{display:flex;flex-direction:column;align-items:center}.custom-filters>form>div{width:100%}ng-select{flex:1;min-width:200px;height:36px}ng-select ::ng-deep .ng-select-container{height:36px}tbody tr{height:5rem!important}\n"]
            },] }
];
OrderListComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: DataService },
    { type: LocalStorageService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL29yZGVyLWxpc3Qvb3JkZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsV0FBVyxFQUVYLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsWUFBWSxFQUNaLG1CQUFtQixFQUluQixtQkFBbUIsRUFDbkIsU0FBUyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFDSCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBR0gsU0FBUyxFQUNULFNBQVMsR0FDWixNQUFNLGdCQUFnQixDQUFDO0FBbUJ4QixNQUFNLE9BQU8sa0JBQ1QsU0FBUSxpQkFBeUQ7SUFpRGpFLFlBQ1ksbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUNoRCxNQUFjLEVBQ2QsS0FBcUIsRUFDYixZQUEwQixFQUMxQixtQkFBd0M7O1FBRWhELEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFSYix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGdC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UUFBUSxFQUFFLFVBQVU7aUJBQ3ZCO2FBQ0osQ0FBQztZQUNGLGNBQWMsR0FBRyxlQUFlLENBQUMsRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osTUFBTSxvQkFDQyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2lCQUM1QjtnQkFDRCxjQUFjO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFZO1FBQ3pCLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9GO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7OztZQTFXSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsOHdPQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFqQ0csbUJBQW1CO1lBVG5CLFdBQVc7WUFFWCxtQkFBbUI7WUFORSxNQUFNO1lBQXRCLGNBQWM7WUFRbkIsWUFBWTtZQUNaLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VMaXN0Q29tcG9uZW50LFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIEdldE9yZGVyTGlzdCxcbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgIExvZ2ljYWxPcGVyYXRvcixcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBPcmRlckRhdGFTZXJ2aWNlLFxuICAgIE9yZGVySXRlbSxcbiAgICBPcmRlckxpc3RPcHRpb25zLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBkZWJvdW5jZVRpbWUsXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBwYWlyd2lzZSxcbiAgICBzdGFydFdpdGgsXG4gICAgc3dpdGNoTWFwLFxuICAgIHRha2VVbnRpbCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgT3JkZXJGaWx0ZXJDb25maWcge1xuICAgIGFjdGl2ZT86IGJvb2xlYW47XG4gICAgc3RhdGVzPzogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBGaWx0ZXJQcmVzZXQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGNvbmZpZzogT3JkZXJGaWx0ZXJDb25maWc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcmRlci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyTGlzdENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZUxpc3RDb21wb25lbnQ8R2V0T3JkZXJMaXN0LlF1ZXJ5LCBHZXRPcmRlckxpc3QuSXRlbXM+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIGl0ZW1MaXN0OiBHZXRPcmRlckxpc3QuSXRlbXNbXSA9IFtdO1xuICAgIGF1ZGlvRWxlbTogSFRNTEF1ZGlvRWxlbWVudDtcbiAgICByZWZyZXNoSW50ZXJ2YWw6IGFueTtcbiAgICBwcm9jZXNzaW5nVGltZTogbnVtYmVyO1xuICAgIGF1ZGlvT24gPSBmYWxzZTtcbiAgICBzZWFyY2hDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBzZWFyY2hPcmRlckNvZGVDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBzZWFyY2hMYXN0TmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIGN1c3RvbUZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgICBvcmRlclN0YXRlcyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRPcmRlclByb2Nlc3NTdGF0ZXMoKS5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpO1xuICAgIGZpbHRlclByZXNldHM6IEZpbHRlclByZXNldFtdID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnb3BlbicsIC8vIGhhdmUgdGhpcyBzaG93IGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIGxhYmVsOiBfKCdvcmRlci5maWx0ZXItcHJlc2V0LW9wZW4nKSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGVzOiB0aGlzLm9yZGVyU3RhdGVzLmZpbHRlcihzID0+IHMgIT09ICdDb21wbGV0ZWQnICYmIHMgIT09ICdDYW5jZWxsZWQnICYmIHMgIT09ICdEcmFmdCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY29tcGxldGVkJyxcbiAgICAgICAgICAgIGxhYmVsOiBfKCdvcmRlci5maWx0ZXItcHJlc2V0LWNvbXBsZXRlZCcpLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgc3RhdGVzOiBbJ0NvbXBsZXRlZCcsICdDYW5jZWxsZWQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdhY3RpdmUnLFxuICAgICAgICAgICAgbGFiZWw6IF8oJ29yZGVyLmZpbHRlci1wcmVzZXQtYWN0aXZlJyksXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZHJhZnQnLFxuICAgICAgICAgICAgbGFiZWw6IF8oJ29yZGVyLmZpbHRlci1wcmVzZXQtZHJhZnQnKSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhdGVzOiBbJ0RyYWZ0J10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIF07XG4gICAgYWN0aXZlUHJlc2V0JDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIGNhbkNyZWF0ZURyYWZ0T3JkZXIgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGVyLCByb3V0ZSk7XG4gICAgICAgIHN1cGVyLnNldFF1ZXJ5Rm4oXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICAgICAgICAgICh0YWtlLCBza2lwKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmdldE9yZGVycyh7IHRha2UsIHNraXAgfSkucmVmZXRjaE9uQ2hhbm5lbENoYW5nZSgpLFxuICAgICAgICAgICAgZGF0YSA9PiBkYXRhLm9yZGVycyxcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICAgICAgKHNraXAsIHRha2UpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVRdWVyeU9wdGlvbnMoXG4gICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29udHJvbC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldCgnZmlsdGVyJykgfHwgJ29wZW4nLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxhc3RGaWx0ZXJzID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnb3JkZXJMaXN0TGFzdEN1c3RvbUZpbHRlcnMnKTtcbiAgICAgICAgaWYgKGxhc3RGaWx0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0obGFzdEZpbHRlcnMsIHsgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbkNyZWF0ZURyYWZ0T3JkZXIgPSAhIXRoaXMuc2VydmVyQ29uZmlnU2VydmljZVxuICAgICAgICAgICAgLmdldE9yZGVyUHJvY2Vzc1N0YXRlcygpXG4gICAgICAgICAgICAuZmluZChzdGF0ZSA9PiBzdGF0ZS5uYW1lID09PSAnQ3JlYXRlZCcpXG4gICAgICAgICAgICA/LnRvLmluY2x1ZGVzKCdEcmFmdCcpO1xuICAgICAgICBpZiAoIXRoaXMuY2FuQ3JlYXRlRHJhZnRPcmRlcikge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJQcmVzZXRzID0gdGhpcy5maWx0ZXJQcmVzZXRzLmZpbHRlcihwID0+IHAubmFtZSAhPT0gJ2RyYWZ0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmVQcmVzZXQkID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtTWFwLnBpcGUoXG4gICAgICAgICAgICBtYXAocXBtID0+IHFwbS5nZXQoJ2ZpbHRlcicpIHx8ICdvcGVuJyksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldEFjdGl2ZUNoYW5uZWwoKS5zaW5nbGUkLnN1YnNjcmliZShjaGFubmVsID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZ1RpbWUgPSAoY2hhbm5lbC5hY3RpdmVDaGFubmVsIGFzIGFueSlbJ2N1c3RvbUZpZWxkcyddWydwcm9jZXNzaW5nVGltZSddO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybXMkID0gbWVyZ2UodGhpcy5zZWFyY2hDb250cm9sLnZhbHVlQ2hhbmdlcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiAyIDwgdmFsdWUubGVuZ3RoIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCksXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjUwKSxcbiAgICAgICAgKTtcbiAgICAgICAgbWVyZ2Uoc2VhcmNoVGVybXMkLCB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXApXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtTWFwID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwO1xuICAgICAgICB0aGlzLmN1c3RvbUZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgICAgIHN0YXRlczogbmV3IEZvcm1Db250cm9sKHF1ZXJ5UGFyYW1NYXAuZ2V0QWxsKCdzdGF0ZXMnKSA/PyBbXSksXG4gICAgICAgICAgICBwbGFjZWRBdFN0YXJ0OiBuZXcgRm9ybUNvbnRyb2wocXVlcnlQYXJhbU1hcC5nZXQoJ3BsYWNlZEF0U3RhcnQnKSksXG4gICAgICAgICAgICBwbGFjZWRBdEVuZDogbmV3IEZvcm1Db250cm9sKHF1ZXJ5UGFyYW1NYXAuZ2V0KCdwbGFjZWRBdEVuZCcpKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0SXRlbXNQZXJQYWdlKDUwKTsgLy8gZGVmYXVsdCB0byA1MFxuICAgICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IGN1cnJlbnRMaXN0ID0gYXdhaXQgdGhpcy5pdGVtcyQudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IG5ld0xpc3QgPSBhd2FpdCB0aGlzLml0ZW1zJC50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0xpc3QubGVuZ3RoLCBjdXJyZW50TGlzdC5sZW5ndGgpO1xuICAgICAgICB9LCAxNTAwMCk7XG5cbiAgICAgICAgdGhpcy5hdWRpb0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW9fcGxheWVyJykgYXMgSFRNTEF1ZGlvRWxlbWVudDtcbiAgICAgICAgdGhpcy5hdWRpb0VsZW0ubXV0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1ZGlvRWxlbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXknLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9PbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW0hLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvT24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvRWxlbSEubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IG9uY2U6IHRydWUgfSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmF1ZGlvRWxlbS5wbGF5KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvT24gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pdGVtcyQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1MaXN0Lmxlbmd0aCAhPT0gMCAmJiB0aGlzLml0ZW1MaXN0Lmxlbmd0aCA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLml0ZW1MaXN0ID0gdmFsdWU7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcmV2aW91c1ZhbHVlPy5sZW5ndGgsIGN1cnJlbnRWYWx1ZT8ubGVuZ3RoKTtcbiAgICAgICAgICAgIC8qKiBEbyBzb21ldGhpbmcgKi9cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMucmVmcmVzaEludGVydmFsKCk7XG4gICAgfVxuICAgIHRvZ2dsZUF1ZGlvKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXVkaW9Pbikge1xuICAgICAgICAgICAgdGhpcy5hdWRpb0VsZW0ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdWRpb09uID0gIXRoaXMuYXVkaW9PbjtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9FbGVtIS5tdXRlZCA9ICF0aGlzLmF1ZGlvT247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheUF1ZGlvKCkge1xuICAgICAgICB0aGlzLmF1ZGlvRWxlbT8ucGxheSgpO1xuICAgIH1cbiAgICBmb3JtYXRUaW1lKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdCgnaGg6bW0gQScpO1xuICAgIH1cbiAgICBmb3JtYXREYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRheWpzKGRhdGUpLmZvcm1hdCgnREQvTU1NJyk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFN0YXRlKG9yZGVyOiBPcmRlciwgYnV0dG9uVGV4dDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGF1dGhvcml6ZWRDYXNoUGF5bWVudCA9IG9yZGVyLnBheW1lbnRzPy5maWx0ZXIoXG4gICAgICAgICAgICBwID0+IHAuc3RhdGUgPT09ICdBdXRob3JpemVkJyAmJiBwLm1ldGhvZCA9PT0gJ2Nhc2gnLFxuICAgICAgICApWzBdO1xuICAgICAgICBpZiAob3JkZXIuc3RhdGUgPT09ICdQYXltZW50U2V0dGxlZCcgfHwgb3JkZXIuc3RhdGUgPT09ICdQYXltZW50QXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnUHJvY2Vzc2luZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyLnN0YXRlID09PSAnUHJvY2Vzc2luZycpIHtcbiAgICAgICAgICAgIHJldHVybiBidXR0b25UZXh0ID8gJ1JlYWR5IEZvciBQaWNrdXAnIDogJ1JlYWR5Rm9yUGlja3VwJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIuc3RhdGUgPT09ICdSZWFkeUZvclBpY2t1cCcpIHtcbiAgICAgICAgICAgIGlmIChvcmRlci5zaGlwcGluZ0xpbmVzWzBdLnNoaXBwaW5nTWV0aG9kLmNvZGUgPT09ICdkZWxpdmVyeScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0RlbGl2ZXJpbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF1dGhvcml6ZWRDYXNoUGF5bWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b25UZXh0ID8gJ0NvbGxlY3QgQ2FzaCcgOiAnQ29tcGxldGVkJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdDb21wbGV0ZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcmRlci5zdGF0ZSA9PT0gJ0RlbGl2ZXJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoYXV0aG9yaXplZENhc2hQYXltZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvblRleHQgPyAnQ29sbGVjdCBDYXNoJyA6ICdDb21wbGV0ZWQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0NvbXBsZXRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ1Byb2Nlc3NpbmcnO1xuICAgIH1cblxuICAgIHRvTmV4dFN0YXRlKG9yZGVyOiBPcmRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBgUHJvY2VlZCB0byAke3RoaXMuZ2V0TmV4dFN0YXRlKG9yZGVyLCB0cnVlKX0/YCxcbiAgICAgICAgICAgICAgICBib2R5OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHByb2NlZWQgdG8gJyR7dGhpcy5nZXROZXh0U3RhdGUob3JkZXIsIHRydWUpfSc/YCxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAncHJpbWFyeScsIGxhYmVsOiAnQ29uZmlybScsIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFN0YXRlKG9yZGVyKSA9PT0gJ0NvbXBsZXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdXRob3JpemVkQ2FzaFBheW1lbnQgPSBvcmRlci5wYXltZW50cz8uZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0+IHAuc3RhdGUgPT09ICdBdXRob3JpemVkJyAmJiBwLm1ldGhvZCA9PT0gJ2Nhc2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dGhvcml6ZWRDYXNoUGF5bWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0dGxlUGF5bWVudChhdXRob3JpemVkQ2FzaFBheW1lbnQ/LmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uVG9TdGF0ZShvcmRlci5pZC50b1N0cmluZygpLCB0aGlzLmdldE5leHRTdGF0ZShvcmRlcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdTdWNjZXNzZnVsbHkgVXBkYXRlZCBPcmRlciBTdGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcignRXJyb3IgVXBkYXRpbmcgT3JkZXIgU3RhdGUnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXJQcmVzZXQocHJlc2V0TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGxhc3RDdXN0b21GaWx0ZXJzID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnb3JkZXJMaXN0TGFzdEN1c3RvbUZpbHRlcnMnKSA/PyB7fTtcbiAgICAgICAgY29uc3QgZW1wdHlDdXN0b21GaWx0ZXJzID0geyBzdGF0ZXM6IHVuZGVmaW5lZCwgcGxhY2VkQXRTdGFydDogdW5kZWZpbmVkLCBwbGFjZWRBdEVuZDogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBwcmVzZXROYW1lID09PSAnY3VzdG9tJyA/IGxhc3RDdXN0b21GaWx0ZXJzIDogZW1wdHlDdXN0b21GaWx0ZXJzO1xuICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBwcmVzZXROYW1lLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgLi4uZmlsdGVycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHJlcGxhY2VVcmw6IHRydWUgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhcHBseUN1c3RvbUZpbHRlcnMoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuY3VzdG9tRmlsdGVyRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgY3VzdG9tRmlsdGVycyA9IHtcbiAgICAgICAgICAgIHN0YXRlczogZm9ybVZhbHVlLnN0YXRlcyxcbiAgICAgICAgICAgIHBsYWNlZEF0U3RhcnQ6IGZvcm1WYWx1ZS5wbGFjZWRBdFN0YXJ0LFxuICAgICAgICAgICAgcGxhY2VkQXRFbmQ6IGZvcm1WYWx1ZS5wbGFjZWRBdEVuZCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRRdWVyeVBhcmFtKHtcbiAgICAgICAgICAgIGZpbHRlcjogJ2N1c3RvbScsXG4gICAgICAgICAgICAuLi5jdXN0b21GaWx0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWx0ZXJGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ29yZGVyTGlzdExhc3RDdXN0b21GaWx0ZXJzJywgY3VzdG9tRmlsdGVycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVRdWVyeU9wdGlvbnMoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICBza2lwOiBudW1iZXIsXG4gICAgICAgIHRha2U6IG51bWJlcixcbiAgICAgICAgc2VhcmNoVGVybTogc3RyaW5nLFxuICAgICAgICBhY3RpdmVGaWx0ZXJQcmVzZXQ/OiBzdHJpbmcsXG4gICAgKTogeyBvcHRpb25zOiBPcmRlckxpc3RPcHRpb25zIH0ge1xuICAgICAgICBjb25zdCBmaWx0ZXJDb25maWcgPSB0aGlzLmZpbHRlclByZXNldHMuZmluZChwID0+IHAubmFtZSA9PT0gYWN0aXZlRmlsdGVyUHJlc2V0KTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXNoYWRvd2VkLXZhcmlhYmxlXG4gICAgICAgIGxldCBmaWx0ZXI6IGFueSA9IHt9O1xuICAgICAgICBsZXQgZmlsdGVyT3BlcmF0b3I6IExvZ2ljYWxPcGVyYXRvciA9IExvZ2ljYWxPcGVyYXRvci5BTkQ7XG4gICAgICAgIGlmIChmaWx0ZXJDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJDb25maWcuY29uZmlnLmFjdGl2ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmFjdGl2ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXE6IGZpbHRlckNvbmZpZy5jb25maWcuYWN0aXZlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsdGVyQ29uZmlnLmNvbmZpZy5zdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluOiBmaWx0ZXJDb25maWcuY29uZmlnLnN0YXRlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUZpbHRlclByZXNldCA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwO1xuICAgICAgICAgICAgY29uc3Qgc3RhdGVzID0gcXVlcnlQYXJhbXMuZ2V0QWxsKCdzdGF0ZXMnKSA/PyBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlZEF0U3RhcnQgPSBxdWVyeVBhcmFtcy5nZXQoJ3BsYWNlZEF0U3RhcnQnKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlZEF0RW5kID0gcXVlcnlQYXJhbXMuZ2V0KCdwbGFjZWRBdEVuZCcpO1xuICAgICAgICAgICAgaWYgKHN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluOiBzdGF0ZXMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZWRBdFN0YXJ0ICYmIHBsYWNlZEF0RW5kKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLm9yZGVyUGxhY2VkQXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJldHdlZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwbGFjZWRBdFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBwbGFjZWRBdEVuZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWRBdFN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLm9yZGVyUGxhY2VkQXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFmdGVyOiBwbGFjZWRBdFN0YXJ0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZEF0RW5kKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLm9yZGVyUGxhY2VkQXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZTogcGxhY2VkQXRFbmQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgICAgICAgZmlsdGVyID0ge1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyTGFzdE5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHNlYXJjaFRlcm0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiBzZWFyY2hUZXJtLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29kZToge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluczogc2VhcmNoVGVybSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpbHRlck9wZXJhdG9yID0gTG9naWNhbE9wZXJhdG9yLk9SO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICB0YWtlLFxuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICAuLi4oZmlsdGVyID8/IHt9KSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBTb3J0T3JkZXIuREVTQyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlck9wZXJhdG9yLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRTaGlwcGluZ05hbWVzKG9yZGVyOiBPcmRlcikge1xuICAgICAgICBpZiAob3JkZXIuc2hpcHBpbmdMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmRlci5zaGlwcGluZ0xpbmVzLm1hcChzaGlwcGluZ0xpbmUgPT4gc2hpcHBpbmdMaW5lLnNoaXBwaW5nTWV0aG9kLm5hbWUpLmpvaW4oJywgJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaEludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaEludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
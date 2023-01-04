import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { DashboardWidgetService, LocalStorageService, DataService, SortOrder, CoreModule, SharedModule, ADMIN_UI_VERSION, getAppConfig, Permission } from '@vendure/admin-ui/core';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { map, tap, distinctUntilChanged, shareReplay, switchMap } from 'rxjs/operators';
import { __awaiter } from 'tslib';
import { RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

class DashboardComponent {
    constructor(dashboardWidgetService, localStorageService, changedDetectorRef, dataService) {
        this.dashboardWidgetService = dashboardWidgetService;
        this.localStorageService = localStorageService;
        this.changedDetectorRef = changedDetectorRef;
        this.dataService = dataService;
        this.deletionMarker = '__delete__';
    }
    ngOnInit() {
        this.availableWidgetIds$ = this.dataService.client.userStatus().stream$.pipe(map(({ userStatus }) => userStatus.permissions), map(permissions => this.dashboardWidgetService.getAvailableIds(permissions)), tap(ids => (this.widgetLayout = this.initLayout(ids))));
    }
    getClassForWidth(width) {
        switch (width) {
            case 3:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-3`;
            case 4:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-4`;
            case 6:
                return `clr-col-12 clr-col-lg-6`;
            case 8:
                return `clr-col-12 clr-col-lg-8`;
            case 12:
                return `clr-col-12`;
            default:
                assertNever(width);
        }
    }
    getSupportedWidths(config) {
        return config.supportedWidths || [3, 4, 6, 8, 12];
    }
    setWidgetWidth(widget, width) {
        widget.width = width;
        this.recalculateLayout();
    }
    trackRow(index, row) {
        const id = row.map(item => `${item.id}:${item.width}`).join('|');
        return id;
    }
    trackRowItem(index, item) {
        return item.config;
    }
    addWidget(id) {
        var _a;
        const config = this.dashboardWidgetService.getWidgetById(id);
        if (config) {
            const width = this.getSupportedWidths(config)[0];
            const widget = {
                id,
                config,
                width,
            };
            let targetRow;
            if (this.widgetLayout && this.widgetLayout.length) {
                targetRow = this.widgetLayout[this.widgetLayout.length - 1];
            }
            else {
                targetRow = [];
                (_a = this.widgetLayout) === null || _a === void 0 ? void 0 : _a.push(targetRow);
            }
            targetRow.push(widget);
            this.recalculateLayout();
        }
    }
    removeWidget(widget) {
        widget.id = this.deletionMarker;
        this.recalculateLayout();
    }
    drop(event) {
        const { currentIndex, previousIndex, previousContainer, container } = event;
        if (previousIndex === currentIndex && previousContainer.data.index === container.data.index) {
            // Nothing changed
            return;
        }
        if (this.widgetLayout) {
            const previousLayoutRow = this.widgetLayout[previousContainer.data.index];
            const newLayoutRow = this.widgetLayout[container.data.index];
            previousLayoutRow.splice(previousIndex, 1);
            newLayoutRow.splice(currentIndex, 0, event.item.data);
            this.recalculateLayout();
        }
    }
    initLayout(availableIds) {
        const savedLayoutDef = this.localStorageService.get('dashboardWidgetLayout');
        let layoutDef;
        if (savedLayoutDef) {
            // validate all the IDs from the saved layout are still available
            layoutDef = savedLayoutDef.filter(item => availableIds.includes(item.id));
        }
        return this.dashboardWidgetService.getWidgetLayout(layoutDef);
    }
    recalculateLayout() {
        if (this.widgetLayout) {
            const flattened = this.widgetLayout
                .reduce((flat, row) => [...flat, ...row], [])
                .filter(item => item.id !== this.deletionMarker);
            const newLayoutDef = flattened.map(item => ({
                id: item.id,
                width: item.width,
            }));
            this.widgetLayout = this.dashboardWidgetService.getWidgetLayout(newLayoutDef);
            this.localStorageService.set('dashboardWidgetLayout', newLayoutDef);
            setTimeout(() => this.changedDetectorRef.markForCheck());
        }
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dashboard',
                template: "<div class=\"widget-header\">\n    <vdr-dropdown>\n        <button class=\"btn btn-secondary btn-sm\" vdrDropdownTrigger>\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'dashboard.add-widget' | translate }}\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                class=\"button\"\n                vdrDropdownItem\n                *ngFor=\"let id of availableWidgetIds$ | async\"\n                (click)=\"addWidget(id)\"\n            >\n                {{ id }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</div>\n<div cdkDropListGroup>\n    <div\n        class=\"clr-row dashboard-row\"\n        *ngFor=\"let row of widgetLayout; index as rowIndex; trackBy: trackRow\"\n        cdkDropList\n        (cdkDropListDropped)=\"drop($event)\"\n        cdkDropListOrientation=\"horizontal\"\n        [cdkDropListData]=\"{ index: rowIndex }\"\n    >\n        <div\n            *ngFor=\"let widget of row; trackBy: trackRowItem\"\n            class=\"dashboard-item\"\n            [ngClass]=\"getClassForWidth(widget.width)\"\n            cdkDrag\n            [cdkDragData]=\"widget\"\n        >\n            <vdr-dashboard-widget\n                *vdrIfPermissions=\"widget.config.requiresPermissions || null\"\n                [widgetConfig]=\"widget.config\"\n            >\n                <div class=\"flex\">\n                    <div class=\"drag-handle\" cdkDragHandle>\n                        <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n                    </div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <h4 class=\"dropdown-header\">{{ 'dashboard.widget-resize' | translate }}</h4>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                [disabled]=\"width === widget.width\"\n                                *ngFor=\"let width of getSupportedWidths(widget.config)\"\n                                (click)=\"setWidgetWidth(widget, width)\"\n                            >\n                                {{ 'dashboard.widget-width' | translate: { width: width } }}\n                            </button>\n                            <div class=\"dropdown-divider\" role=\"separator\"></div>\n                            <button class=\"button\" vdrDropdownItem (click)=\"removeWidget(widget)\">\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'dashboard.remove-widget' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-dashboard-widget>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;max-width:1200px;margin:auto}.widget-header{display:flex;justify-content:flex-end}.placeholder{color:var(--color-grey-300);text-align:center}.placeholder .version{font-size:3em;margin:24px;line-height:1em}.placeholder ::ng-deep .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget{margin-bottom:24px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging,.dashboard-row.cdk-drop-list-receiving{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging .dashboard-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}\n"]
            },] }
];
DashboardComponent.ctorParameters = () => [
    { type: DashboardWidgetService },
    { type: LocalStorageService },
    { type: ChangeDetectorRef },
    { type: DataService }
];

class DashboardWidgetComponent {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngAfterViewInit() {
        this.loadWidget();
    }
    loadWidget() {
        return __awaiter(this, void 0, void 0, function* () {
            const loadComponentResult = this.widgetConfig.loadComponent();
            const componentType = loadComponentResult instanceof Promise ? yield loadComponentResult : loadComponentResult;
            this.componentRef = this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(componentType));
            this.componentRef.changeDetectorRef.detectChanges();
        });
    }
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
DashboardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dashboard-widget',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        <div class=\"title\">\n            <ng-container *ngIf=\"widgetConfig.title as title\">{{ title | translate }}</ng-container>\n        </div>\n        <div class=\"controls\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <ng-template #portal></ng-template>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.card{margin-top:0;min-height:200px}.card-header{display:flex;justify-content:space-between}\n"]
            },] }
];
DashboardWidgetComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
DashboardWidgetComponent.propDecorators = {
    widgetConfig: [{ type: Input }],
    portal: [{ type: ViewChild, args: ['portal', { read: ViewContainerRef },] }]
};

const dashboardRoutes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
    },
];

class LatestOrdersWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.latestOrders$ = this.dataService.order
            .getOrders({
            take: 10,
            filter: {
                active: { eq: false },
                state: { notEq: 'Cancelled' },
            },
            sort: {
                orderPlacedAt: SortOrder.DESC,
            },
        })
            .refetchOnChannelChange()
            .mapStream(data => data.orders.items);
    }
}
LatestOrdersWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-latest-orders-widget',
                template: "<vdr-data-table [items]=\"latestOrders$ | async\">\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            {{ order.code }}\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.total | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">{{ order.orderPlacedAt | timeAgo }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"['/orders/', order.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-data-table ::ng-deep table{margin-top:0}\n"]
            },] }
];
LatestOrdersWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
class LatestOrdersWidgetModule {
}
LatestOrdersWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule, SharedModule],
                declarations: [LatestOrdersWidgetComponent],
            },] }
];

class OrderSummaryWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.today = new Date();
        this.yesterday = new Date(new Date().setDate(this.today.getDate() - 1));
        this.selection$ = new BehaviorSubject({
            timeframe: 'day',
            date: this.today,
        });
    }
    ngOnInit() {
        this.dateRange$ = this.selection$.pipe(distinctUntilChanged(), map(selection => {
            return {
                start: dayjs(selection.date).startOf(selection.timeframe).toDate(),
                end: dayjs(selection.date).endOf(selection.timeframe).toDate(),
            };
        }), shareReplay(1));
        const orderSummary$ = this.dateRange$.pipe(switchMap(({ start, end }) => {
            return this.dataService.order
                .getOrderSummary(start, end)
                .refetchOnChannelChange()
                .mapStream(data => data.orders);
        }), shareReplay(1));
        this.totalOrderCount$ = orderSummary$.pipe(map(res => res.totalItems));
        this.totalOrderValue$ = orderSummary$.pipe(map(res => res.items.reduce((total, order) => total + order.total, 0) / 100));
        this.currencyCode$ = this.dataService.settings
            .getActiveChannel()
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel.currencyCode || undefined);
    }
}
OrderSummaryWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-summary-widget',
                template: "<div class=\"stats\">\n    <div class=\"stat\">\n        <div class=\"stat-figure\">{{ totalOrderCount$ | async }}</div>\n        <div class=\"stat-label\">{{ 'dashboard.total-orders' | translate }}</div>\n    </div>\n    <div class=\"stat\">\n        <div class=\"stat-figure\">\n            {{ totalOrderValue$ | async | currency: (currencyCode$ | async) || undefined }}\n        </div>\n        <div class=\"stat-label\">{{ 'dashboard.total-order-value' | translate }}</div>\n    </div>\n</div>\n<div class=\"footer\">\n    <div class=\"btn-group btn-outline-primary btn-sm\" *ngIf=\"selection$ | async as selection\">\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === today\" (click)=\"selection$.next({timeframe: 'day', date: today})\">\n            {{ 'dashboard.today' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === yesterday\" (click)=\"selection$.next({timeframe: 'day', date: yesterday})\">\n            {{ 'dashboard.yesterday' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'week'\" (click)=\"selection$.next({timeframe: 'week'})\">\n            {{ 'dashboard.thisWeek' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'month'\" (click)=\"selection$.next({timeframe: 'month'})\">\n            {{ 'dashboard.thisMonth' | translate }}\n        </button>\n    </div>\n\n    <div class=\"date-range p5\" *ngIf=\"dateRange$ | async as range\">\n        {{ range.start | localeDate }} - {{ range.end | localeDate }}\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".stats{display:flex;justify-content:space-evenly}.stat{text-align:center}.stat-figure{font-size:2rem;line-height:3rem}.stat-label{text-transform:uppercase}.date-range{margin-top:0}.footer{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}\n"]
            },] }
];
OrderSummaryWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
class OrderSummaryWidgetModule {
}
OrderSummaryWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule],
                declarations: [OrderSummaryWidgetComponent],
            },] }
];

class TestWidgetComponent {
}
TestWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-widget',
                template: "<p>This is a test widget!</p>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
class TestWidgetModule {
}
TestWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TestWidgetComponent],
            },] }
];

class WelcomeWidgetComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.version = ADMIN_UI_VERSION;
        this.brand = getAppConfig().brand;
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
        this.hideVersion = getAppConfig().hideVersion;
    }
    ngOnInit() {
        this.administrator$ = this.dataService.administrator
            .getActiveAdministrator()
            .mapStream(data => data.activeAdministrator || null);
    }
}
WelcomeWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-welcome-widget',
                template: "<div *ngIf=\"administrator$ | async as administrator\">\n    <h4 class=\"h4\">\n        Welcome, {{ administrator.firstName }} {{ administrator.lastName }}<br />\n        <small class=\"p5\">Last login: {{ administrator.user.lastLogin | timeAgo }}</small>\n    </h4>\n\n    <p class=\"p5\" *ngIf=\"!hideVendureBranding || !hideVersion\">\n        {{ hideVendureBranding ? '' : 'Vendure' }} {{ hideVersion ? '' : ('Admin UI v' + version) }}\n    </p>\n</div>\n<div class=\"placeholder\">\n    <clr-icon shape=\"line-chart\" size=\"128\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;justify-content:space-between}.placeholder{color:var(--color-grey-200)}\n"]
            },] }
];
WelcomeWidgetComponent.ctorParameters = () => [
    { type: DataService }
];
class WelcomeWidgetModule {
}
WelcomeWidgetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CoreModule],
                declarations: [WelcomeWidgetComponent],
            },] }
];

const DEFAULT_DASHBOARD_WIDGET_LAYOUT = [
    { id: 'welcome', width: 12 },
    { id: 'orderSummary', width: 6 },
    { id: 'latestOrders', width: 6 },
];
const ɵ0 = () => WelcomeWidgetComponent, ɵ1 = () => OrderSummaryWidgetComponent, ɵ2 = () => LatestOrdersWidgetComponent, ɵ3 = () => TestWidgetComponent;
const DEFAULT_WIDGETS = {
    welcome: {
        loadComponent: ɵ0,
    },
    orderSummary: {
        title: marker('dashboard.orders-summary'),
        loadComponent: ɵ1,
        requiresPermissions: [Permission.ReadOrder],
    },
    latestOrders: {
        title: marker('dashboard.latest-orders'),
        loadComponent: ɵ2,
        supportedWidths: [6, 8, 12],
        requiresPermissions: [Permission.ReadOrder],
    },
    testWidget: {
        title: 'Test Widget',
        loadComponent: ɵ3,
    },
};

class DashboardModule {
    constructor(dashboardWidgetService) {
        Object.entries(DEFAULT_WIDGETS).map(([id, config]) => {
            if (!dashboardWidgetService.getWidgetById(id)) {
                dashboardWidgetService.registerWidget(id, config);
            }
        });
        if (dashboardWidgetService.getDefaultLayout().length === 0) {
            dashboardWidgetService.setDefaultLayout(DEFAULT_DASHBOARD_WIDGET_LAYOUT);
        }
    }
}
DashboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(dashboardRoutes)],
                declarations: [DashboardComponent, DashboardWidgetComponent],
            },] }
];
DashboardModule.ctorParameters = () => [
    { type: DashboardWidgetService }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_DASHBOARD_WIDGET_LAYOUT, DEFAULT_WIDGETS, DashboardComponent, DashboardModule, DashboardWidgetComponent, LatestOrdersWidgetComponent, LatestOrdersWidgetModule, OrderSummaryWidgetComponent, OrderSummaryWidgetModule, TestWidgetComponent, TestWidgetModule, WelcomeWidgetComponent, WelcomeWidgetModule, dashboardRoutes, ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=vendure-admin-ui-dashboard.js.map

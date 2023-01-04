(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@vendure/admin-ui/core'), require('@biesbjerg/ngx-translate-extract-marker'), require('rxjs'), require('rxjs/operators'), require('@angular/router'), require('@vendure/common/lib/pick'), require('apollo-angular'), require('@vendure/common/lib/shared-utils'), require('@vendure/common/lib/simple-deep-clone'), require('dayjs')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/order', ['exports', '@angular/core', '@angular/forms', '@vendure/admin-ui/core', '@biesbjerg/ngx-translate-extract-marker', 'rxjs', 'rxjs/operators', '@angular/router', '@vendure/common/lib/pick', 'apollo-angular', '@vendure/common/lib/shared-utils', '@vendure/common/lib/simple-deep-clone', 'dayjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].order = {}), global.ng.core, global.ng.forms, global.vendure['admin-ui'].core, global.ngxTranslateExtractMarker, global.rxjs, global.rxjs.operators, global.ng.router, global.pick, global.apolloAngular, global.sharedUtils, global.simpleDeepClone, global.dayjs));
}(this, (function (exports, i0, forms, i1, ngxTranslateExtractMarker, rxjs, operators, i1$1, pick, apolloAngular, sharedUtils, simpleDeepClone, dayjs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

    var AddManualPaymentDialogComponent = /** @class */ (function () {
        function AddManualPaymentDialogComponent(dataService) {
            this.dataService = dataService;
            this.form = new forms.FormGroup({
                method: new forms.FormControl('', forms.Validators.required),
                transactionId: new forms.FormControl('', forms.Validators.required),
            });
        }
        AddManualPaymentDialogComponent.prototype.ngOnInit = function () {
            this.paymentMethods$ = this.dataService.settings
                .getPaymentMethods(999)
                .mapSingle(function (data) { return data.paymentMethods.items; });
        };
        AddManualPaymentDialogComponent.prototype.submit = function () {
            var formValue = this.form.value;
            this.resolveWith({
                method: formValue.method,
                transactionId: formValue.transactionId,
            });
        };
        AddManualPaymentDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return AddManualPaymentDialogComponent;
    }());
    AddManualPaymentDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-add-manual-payment-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.add-payment-to-order' | translate }}</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'order.payment-method' | translate\" for=\"method\">\n        <ng-select\n            [items]=\"paymentMethods$ | async\"\n            bindLabel=\"code\"\n            autofocus\n            bindValue=\"code\"\n            [addTag]=\"true\"\n            formControlName=\"method\"\n        ></ng-select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'order.transaction-id' | translate\" for=\"transactionId\">\n        <input id=\"transactionId\" type=\"text\" formControlName=\"transactionId\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || form.pristine\">\n        {{ 'order.add-payment' | translate }}  ({{ outstandingAmount | localeCurrency: currencyCode }})\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".ng-select{min-width:100%}\n"]
                },] }
    ];
    AddManualPaymentDialogComponent.ctorParameters = function () { return [
        { type: i1.DataService }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var CancelOrderDialogComponent = /** @class */ (function () {
        function CancelOrderDialogComponent(i18nService) {
            var _this = this;
            var _a;
            this.i18nService = i18nService;
            this.cancelAll = true;
            this.lineQuantities = {};
            this.reasons = (_a = i1.getAppConfig().cancellationReasons) !== null && _a !== void 0 ? _a : [
                ngxTranslateExtractMarker.marker('order.cancel-reason-customer-request'),
                ngxTranslateExtractMarker.marker('order.cancel-reason-not-available'),
            ];
            this.reasons = this.reasons.map(function (r) { return _this.i18nService.translate(r); });
        }
        Object.defineProperty(CancelOrderDialogComponent.prototype, "selectionCount", {
            get: function () {
                return Object.values(this.lineQuantities).reduce(function (sum, n) { return sum + n; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        CancelOrderDialogComponent.prototype.ngOnInit = function () {
            this.lineQuantities = this.order.lines.reduce(function (result, line) {
                var _b;
                return Object.assign(Object.assign({}, result), (_b = {}, _b[line.id] = line.quantity, _b));
            }, {});
        };
        CancelOrderDialogComponent.prototype.radioChanged = function () {
            var e_1, _b, e_2, _c;
            if (this.cancelAll) {
                try {
                    for (var _d = __values(this.order.lines), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var line = _e.value;
                        this.lineQuantities[line.id] = line.quantity;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                try {
                    for (var _f = __values(this.order.lines), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var line = _g.value;
                        this.lineQuantities[line.id] = 0;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        CancelOrderDialogComponent.prototype.checkIfAllSelected = function () {
            var e_3, _b;
            var _a;
            var _loop_1 = function (lineId, quantity) {
                var quantityInOrder = (_a = this_1.order.lines.find(function (line) { return line.id === lineId; })) === null || _a === void 0 ? void 0 : _a.quantity;
                if (quantityInOrder && quantity < quantityInOrder) {
                    return { value: void 0 };
                }
            };
            var this_1 = this;
            try {
                for (var _c = __values(Object.entries(this.lineQuantities)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), lineId = _e[0], quantity = _e[1];
                    var state_1 = _loop_1(lineId, quantity);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // If we got here, all of the selected quantities are equal to the order
            // line quantities, i.e. everything is selected.
            this.cancelAll = true;
        };
        CancelOrderDialogComponent.prototype.select = function () {
            this.resolveWith({
                orderId: this.order.id,
                lines: this.getLineInputs(),
                reason: this.reason,
                cancelShipping: this.cancelAll,
            });
        };
        CancelOrderDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        CancelOrderDialogComponent.prototype.getLineInputs = function () {
            if (this.order.active) {
                return;
            }
            return Object.entries(this.lineQuantities)
                .map(function (_b) {
                var _c = __read(_b, 2), orderLineId = _c[0], quantity = _c[1];
                return ({
                    orderLineId: orderLineId,
                    quantity: quantity,
                });
            })
                .filter(function (l) { return 0 < l.quantity; });
        };
        return CancelOrderDialogComponent;
    }());
    CancelOrderDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-cancel-order-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.cancel-order' | translate }}</ng-template>\n\n<div class=\"fulfillment-wrapper\">\n    <div class=\"order-lines\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.unit-price' | translate }}</th>\n                    <th>{{ 'order.cancel' | translate }}</th>\n                </tr>\n            </thead>\n            <tr\n                *ngFor=\"let line of order.lines\"\n                class=\"order-line\"\n                [class.is-disabled]=\"cancelAll\"\n                [class.is-cancelled]=\"line.quantity === 0\"\n            >\n                <td class=\"align-middle thumb\">\n                    <img [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">{{ line.quantity }}</td>\n                <td class=\"align-middle quantity\">\n                    {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                </td>\n                <td class=\"align-middle fulfil\">\n                    <input\n                        *ngIf=\"line.quantity > 0 && !order.active; else nonEditable\"\n                        [(ngModel)]=\"lineQuantities[line.id]\"\n                        (input)=\"checkIfAllSelected()\"\n                        [disabled]=\"cancelAll\"\n                        type=\"number\"\n                        [max]=\"line.quantity\"\n                        min=\"0\"\n                    />\n                    <ng-template #nonEditable>{{ line.quantity }}</ng-template>\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"cancellation-details\">\n        <ng-container *ngIf=\"order.active !== true\">\n            <clr-radio-wrapper>\n                <input\n                    type=\"radio\"\n                    clrRadio\n                    [value]=\"true\"\n                    [(ngModel)]=\"cancelAll\"\n                    name=\"options\"\n                    (ngModelChange)=\"radioChanged()\"\n                />\n                <label>{{ 'order.cancel-entire-order' | translate }}</label>\n            </clr-radio-wrapper>\n            <clr-radio-wrapper>\n                <input\n                    type=\"radio\"\n                    clrRadio\n                    [value]=\"false\"\n                    [(ngModel)]=\"cancelAll\"\n                    name=\"options\"\n                    (ngModelChange)=\"radioChanged()\"\n                />\n                <label>{{ 'order.cancel-specified-items' | translate }}</label>\n            </clr-radio-wrapper>\n        </ng-container>\n        <label class=\"clr-control-label\">{{ 'order.cancellation-reason' | translate }}</label>\n        <ng-select\n            [items]=\"reasons\"\n            bindLabel=\"name\"\n            autofocus\n            bindValue=\"id\"\n            [addTag]=\"true\"\n            [(ngModel)]=\"reason\"\n        ></ng-select>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"!reason || (!order.active && selectionCount === 0)\"\n        class=\"btn btn-primary\"\n    >\n        <ng-container *ngIf=\"!order.active\">\n            {{ 'order.cancel-selected-items' | translate }}\n        </ng-container>\n        <ng-container *ngIf=\"order.active\">\n            {{ 'order.cancel-order' | translate }}\n        </ng-container>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:flex;min-height:64vh}.fulfillment-wrapper{flex:1}@media screen and (min-width: 768px){.fulfillment-wrapper{display:flex;flex-direction:row}}@media screen and (min-width: 768px){.fulfillment-wrapper .cancellation-details{margin-top:0;margin-left:24px;width:250px}}.fulfillment-wrapper .order-lines{flex:1;overflow-y:auto}.fulfillment-wrapper .order-lines table{margin-top:0}.fulfillment-wrapper tr.ignore{color:var(--color-grey-300)}.fulfillment-wrapper .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.fulfillment-wrapper .is-disabled td,.fulfillment-wrapper .is-disabled td input{background-color:var(--color-component-bg-200)}\n"]
                },] }
    ];
    CancelOrderDialogComponent.ctorParameters = function () { return [
        { type: i1.I18nService }
    ]; };

    var CouponCodeSelectorComponent = /** @class */ (function () {
        function CouponCodeSelectorComponent(dataService) {
            this.dataService = dataService;
            this.addCouponCode = new i0.EventEmitter();
            this.removeCouponCode = new i0.EventEmitter();
            this.couponCodeInput$ = new rxjs.Subject();
        }
        CouponCodeSelectorComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.availableCouponCodes$ = rxjs.concat(this.couponCodeInput$.pipe(operators.distinctUntilChanged(), operators.switchMap(function (term) { return _this.dataService.promotion.getPromotions(10, 0, {
                couponCode: { contains: term },
            }).single$; }), operators.map(function (_b) {
                var promotions = _b.promotions;
                // tslint:disable-next-line:no-non-null-assertion
                return promotions.items.map(function (p) { return ({ code: p.couponCode, promotionName: p.name }); });
            }), operators.startWith([])));
            if (!this.control) {
                this.control = new forms.FormControl((_a = this.couponCodes) !== null && _a !== void 0 ? _a : []);
            }
        };
        return CouponCodeSelectorComponent;
    }());
    CouponCodeSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-coupon-code-selector',
                    template: "<ng-select\n    [items]=\"availableCouponCodes$ | async\"\n    appendTo=\"body\"\n    bindLabel=\"code\"\n    bindValue=\"code\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    [hideSelected]=\"true\"\n    [minTermLength]=\"2\"\n    typeToSearchText=\"\"\n    [typeahead]=\"couponCodeInput$\"\n    [formControl]=\"control\"\n    (add)=\"addCouponCode.emit($event.code)\"\n    (remove)=\"removeCouponCode.emit($event.value?.code)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip>{{ item.code }}</vdr-chip>\n        {{ item.promotionName }}\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CouponCodeSelectorComponent.ctorParameters = function () { return [
        { type: i1.DataService }
    ]; };
    CouponCodeSelectorComponent.propDecorators = {
        couponCodes: [{ type: i0.Input }],
        control: [{ type: i0.Input }],
        addCouponCode: [{ type: i0.Output }],
        removeCouponCode: [{ type: i0.Output }]
    };

    var OrderStateSelectDialogComponent = /** @class */ (function () {
        function OrderStateSelectDialogComponent() {
            this.nextStates = [];
            this.message = '';
            this.selectedState = '';
        }
        OrderStateSelectDialogComponent.prototype.select = function () {
            if (this.selectedState) {
                this.resolveWith(this.selectedState);
            }
        };
        OrderStateSelectDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return OrderStateSelectDialogComponent;
    }());
    OrderStateSelectDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-state-select-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.select-state' | translate }}</ng-template>\n<p>{{ message | translate }}</p>\n<clr-select-container>\n    <select clrSelect name=\"state\" [(ngModel)]=\"selectedState\">\n        <option *ngFor=\"let state of nextStates\" [value]=\"state\">\n            {{ state | stateI18nToken | translate }}\n        </option>\n    </select>\n</clr-select-container>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" *ngIf=\"cancellable\" (click)=\"cancel()\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"!selectedState\">\n        {{ 'order.transition-to-state' | translate: { state: (selectedState | stateI18nToken | translate) } }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var OrderTransitionService = /** @class */ (function () {
        function OrderTransitionService(dataService, modalService, notificationService, i18nService) {
            this.dataService = dataService;
            this.modalService = modalService;
            this.notificationService = notificationService;
            this.i18nService = i18nService;
        }
        /**
         * Attempts to transition the Order to the last state it was in before it was transitioned
         * to the "Modifying" state. If this fails, a manual prompt is used.
         */
        OrderTransitionService.prototype.transitionToPreModifyingState = function (orderId, nextStates) {
            var _this = this;
            return this.getPreModifyingState(orderId).pipe(operators.switchMap(function (state) {
                var manualTransitionOptions = {
                    orderId: orderId,
                    nextStates: nextStates,
                    message: _this.i18nService.translate(ngxTranslateExtractMarker.marker('order.unable-to-transition-to-state-try-another'), { state: state }),
                    cancellable: false,
                    retry: 10,
                };
                if (state) {
                    return _this.transitionToStateOrThrow(orderId, state).pipe(operators.catchError(function (err) { return _this.manuallyTransitionToState(manualTransitionOptions); }));
                }
                else {
                    return _this.manuallyTransitionToState(manualTransitionOptions);
                }
            }));
        };
        /**
         * Displays a modal for manually selecting the next state.
         */
        OrderTransitionService.prototype.manuallyTransitionToState = function (options) {
            var _this = this;
            return this.modalService
                .fromComponent(OrderStateSelectDialogComponent, {
                locals: {
                    nextStates: options.nextStates,
                    cancellable: options.cancellable,
                    message: options.message,
                },
                closable: false,
                size: 'md',
            })
                .pipe(operators.switchMap(function (result) {
                if (result) {
                    return _this.transitionToStateOrThrow(options.orderId, result);
                }
                else {
                    if (!options.cancellable) {
                        throw new Error("An order state must be selected");
                    }
                    else {
                        return rxjs.EMPTY;
                    }
                }
            }), operators.retryWhen(function (errors) { return errors.pipe(operators.delay(2000), operators.take(options.retry)); }));
        };
        /**
         * Attempts to get the last state the Order was in before it was transitioned
         * to the "Modifying" state.
         */
        OrderTransitionService.prototype.getPreModifyingState = function (orderId) {
            return this.dataService.order
                .getOrderHistory(orderId, {
                filter: {
                    type: {
                        eq: i1.HistoryEntryType.ORDER_STATE_TRANSITION,
                    },
                },
                sort: {
                    createdAt: i1.SortOrder.DESC,
                },
            })
                .mapSingle(function (result) { return result.order; })
                .pipe(operators.map(function (result) {
                var item = result === null || result === void 0 ? void 0 : result.history.items.find(function (i) { return i.data.to === 'Modifying'; });
                if (item) {
                    return item.data.from;
                }
                else {
                    return;
                }
            }));
        };
        OrderTransitionService.prototype.transitionToStateOrThrow = function (orderId, state) {
            var _this = this;
            return this.dataService.order.transitionToState(orderId, state).pipe(operators.map(function (_a) {
                var transitionOrderToState = _a.transitionOrderToState;
                switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                    case 'Order':
                        return transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.state;
                    case 'OrderStateTransitionError':
                        _this.notificationService.error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
                        throw new Error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
                }
            }));
        };
        return OrderTransitionService;
    }());
    OrderTransitionService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function OrderTransitionService_Factory() { return new OrderTransitionService(i0__namespace.ɵɵinject(i1__namespace.DataService), i0__namespace.ɵɵinject(i1__namespace.ModalService), i0__namespace.ɵɵinject(i1__namespace.NotificationService), i0__namespace.ɵɵinject(i1__namespace.I18nService)); }, token: OrderTransitionService, providedIn: "root" });
    OrderTransitionService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    OrderTransitionService.ctorParameters = function () { return [
        { type: i1.DataService },
        { type: i1.ModalService },
        { type: i1.NotificationService },
        { type: i1.I18nService }
    ]; };

    var GET_CUSTOMER_ADDRESSES = apolloAngular.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query GetCustomerAddresses($customerId: ID!) {\n        customer(id: $customerId) {\n            id\n            addresses {\n                ...Address\n            }\n        }\n    }\n    ", "\n"], ["\n    query GetCustomerAddresses($customerId: ID!) {\n        customer(id: $customerId) {\n            id\n            addresses {\n                ...Address\n            }\n        }\n    }\n    ", "\n"])), i1.ADDRESS_FRAGMENT);
    var templateObject_1;

    var SelectAddressDialogComponent = /** @class */ (function () {
        function SelectAddressDialogComponent(dataService, formBuilder) {
            this.dataService = dataService;
            this.formBuilder = formBuilder;
            this.useExisting = true;
            this.createNew = false;
        }
        SelectAddressDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            this.addressForm = this.formBuilder.group({
                fullName: [(_b = (_a = this.currentAddress) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : ''],
                company: [(_d = (_c = this.currentAddress) === null || _c === void 0 ? void 0 : _c.company) !== null && _d !== void 0 ? _d : ''],
                streetLine1: [(_f = (_e = this.currentAddress) === null || _e === void 0 ? void 0 : _e.streetLine1) !== null && _f !== void 0 ? _f : '', forms.Validators.required],
                streetLine2: [(_h = (_g = this.currentAddress) === null || _g === void 0 ? void 0 : _g.streetLine2) !== null && _h !== void 0 ? _h : ''],
                city: [(_k = (_j = this.currentAddress) === null || _j === void 0 ? void 0 : _j.city) !== null && _k !== void 0 ? _k : '', forms.Validators.required],
                province: [(_m = (_l = this.currentAddress) === null || _l === void 0 ? void 0 : _l.province) !== null && _m !== void 0 ? _m : ''],
                postalCode: [(_p = (_o = this.currentAddress) === null || _o === void 0 ? void 0 : _o.postalCode) !== null && _p !== void 0 ? _p : '', forms.Validators.required],
                countryCode: [(_r = (_q = this.currentAddress) === null || _q === void 0 ? void 0 : _q.countryCode) !== null && _r !== void 0 ? _r : '', forms.Validators.required],
                phoneNumber: [(_t = (_s = this.currentAddress) === null || _s === void 0 ? void 0 : _s.phoneNumber) !== null && _t !== void 0 ? _t : ''],
            });
            this.useExisting = !!this.customerId;
            this.addresses$ = this.customerId
                ? this.dataService
                    .query(GET_CUSTOMER_ADDRESSES, { customerId: this.customerId })
                    .mapSingle(function (_u) {
                    var customer = _u.customer;
                    var _a;
                    return (_a = customer === null || customer === void 0 ? void 0 : customer.addresses) !== null && _a !== void 0 ? _a : [];
                })
                    .pipe(operators.tap(function (addresses) {
                    if (_this.currentAddress) {
                        _this.selectedAddress = addresses.find(function (a) {
                            var _a, _b;
                            return a.streetLine1 === ((_a = _this.currentAddress) === null || _a === void 0 ? void 0 : _a.streetLine1) &&
                                a.postalCode === ((_b = _this.currentAddress) === null || _b === void 0 ? void 0 : _b.postalCode);
                        });
                    }
                    if (addresses.length === 0) {
                        _this.createNew = true;
                        _this.useExisting = false;
                    }
                }))
                : rxjs.of([]);
            this.availableCountries$ = this.dataService.settings
                .getAvailableCountries()
                .mapSingle(function (_u) {
                var countries = _u.countries;
                return countries.items;
            });
        };
        SelectAddressDialogComponent.prototype.trackByFn = function (item) {
            return item.id;
        };
        SelectAddressDialogComponent.prototype.addressIdFn = function (item) {
            return item.streetLine1 + item.postalCode;
        };
        SelectAddressDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        SelectAddressDialogComponent.prototype.select = function () {
            if (this.useExisting && this.selectedAddress) {
                this.resolveWith(Object.assign(Object.assign({}, pick.pick(this.selectedAddress, [
                    'fullName',
                    'company',
                    'streetLine1',
                    'streetLine2',
                    'city',
                    'province',
                    'phoneNumber',
                    'postalCode',
                ])), { countryCode: this.selectedAddress.country.code }));
            }
            if (this.createNew && this.addressForm.valid) {
                var formValue = this.addressForm.value;
                this.resolveWith(formValue);
            }
        };
        return SelectAddressDialogComponent;
    }());
    SelectAddressDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-address-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.select-address' | translate }}</ng-template>\n\n<clr-tabs *ngIf=\"addresses$ | async as addresses\">\n    <clr-tab *ngIf=\"customerId && addresses.length\">\n        <button clrTabLink>{{ 'order.existing-address' | translate }}</button>\n        <ng-template [(clrIfActive)]=\"useExisting\">\n            <clr-tab-content>\n                <vdr-radio-card-fieldset\n                    class=\"block mt4\"\n                    [idFn]=\"addressIdFn\"\n                    [selectedItemId]=\"selectedAddress && addressIdFn(selectedAddress)\"\n                    (selectItem)=\"selectedAddress = $event\"\n                >\n                    <vdr-radio-card *ngFor=\"let address of addresses\" [item]=\"address\">\n                        <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n                    </vdr-radio-card>\n                </vdr-radio-card-fieldset>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n    <clr-tab>\n        <button clrTabLink>{{ 'customer.create-new-address' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"createNew\">\n            <clr-tab-content>\n                <vdr-address-form\n                    [formGroup]=\"addressForm\"\n                    [availableCountries]=\"availableCountries$ | async\"\n                ></vdr-address-form>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n</clr-tabs>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"(useExisting && !selectedAddress) || (createNew && addressForm.invalid)\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    SelectAddressDialogComponent.ctorParameters = function () { return [
        { type: i1.DataService },
        { type: forms.FormBuilder }
    ]; };

    var SelectCustomerDialogComponent = /** @class */ (function () {
        function SelectCustomerDialogComponent(dataService, formBuilder) {
            this.dataService = dataService;
            this.formBuilder = formBuilder;
            this.isLoading = false;
            this.input$ = new rxjs.Subject();
            this.selectedCustomer = [];
            this.useExisting = true;
            this.createNew = false;
            this.customerForm = this.formBuilder.group({
                title: '',
                firstName: ['', forms.Validators.required],
                lastName: ['', forms.Validators.required],
                phoneNumber: '',
                emailAddress: ['', [forms.Validators.required, forms.Validators.email]],
            });
        }
        SelectCustomerDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.customers$ = rxjs.concat(rxjs.of([]), // default items
            this.input$.pipe(operators.debounceTime(200), operators.distinctUntilChanged(), operators.tap(function () { return (_this.isLoading = true); }), operators.switchMap(function (term) { return _this.dataService.customer
                .getCustomerList(10, 0, term)
                .mapStream(function (_a) {
                var customers = _a.customers;
                return customers.items;
            })
                .pipe(operators.catchError(function () { return rxjs.of([]); }), // empty list on error
            operators.tap(function () { return (_this.isLoading = false); })); })));
        };
        SelectCustomerDialogComponent.prototype.trackByFn = function (item) {
            return item.id;
        };
        SelectCustomerDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        SelectCustomerDialogComponent.prototype.select = function () {
            if (this.useExisting && this.selectedCustomer.length === 1) {
                this.resolveWith(this.selectedCustomer[0]);
            }
            if (this.createNew && this.customerForm.valid) {
                var formValue = this.customerForm.value;
                this.resolveWith(formValue);
            }
        };
        return SelectCustomerDialogComponent;
    }());
    SelectCustomerDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-customer-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.set-customer-for-order' | translate }}</ng-template>\n\n<clr-tabs>\n    <clr-tab>\n        <button clrTabLink>{{ 'order.existing-customer' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"useExisting\">\n            <clr-tab-content>\n                <ng-select\n                    [items]=\"customers$ | async\"\n                    appendTo=\"body\"\n                    bindLabel=\"name\"\n                    [addTag]=\"false\"\n                    [multiple]=\"true\"\n                    [hideSelected]=\"true\"\n                    [trackByFn]=\"trackByFn\"\n                    [minTermLength]=\"2\"\n                    [loading]=\"isLoading\"\n                    [typeahead]=\"input$\"\n                    [(ngModel)]=\"selectedCustomer\"\n                    class=\"mt4\"\n                >\n                    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                        <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon\n                        ><span class=\"ml2 mr2\">{{ item.firstName }} {{ item.lastName }}</span>\n                        <vdr-chip>{{ item.emailAddress }}</vdr-chip>\n                    </ng-template>\n                    <ng-template ng-option-tmp let-item=\"item\">\n                        <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon\n                        ><span class=\"ml2 mr2\">{{ item.firstName }} {{ item.lastName }}</span>\n                        <vdr-chip>{{ item.emailAddress }}</vdr-chip>\n                    </ng-template>\n                </ng-select>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n    <clr-tab>\n        <button clrTabLink>{{ 'customer.create-new-customer' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"createNew\">\n            <clr-tab-content>\n                <form [formGroup]=\"customerForm\">\n                <vdr-form-field [label]=\"'customer.title' | translate\" for=\"title\">\n                    <input id=\"title\" type=\"text\" formControlName=\"title\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.first-name' | translate\" for=\"firstName\">\n                    <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.last-name' | translate\" for=\"lastName\">\n                    <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.email-address' | translate\" for=\"emailAddress\">\n                    <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.phone-number' | translate\" for=\"phoneNumber\">\n                    <input id=\"phoneNumber\" type=\"text\" formControlName=\"phoneNumber\" />\n                </vdr-form-field>\n                </form>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n</clr-tabs>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"(useExisting && selectedCustomer.length === 0) || (createNew && customerForm.invalid)\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    SelectCustomerDialogComponent.ctorParameters = function () { return [
        { type: i1.DataService },
        { type: forms.FormBuilder }
    ]; };

    var SelectShippingMethodDialogComponent = /** @class */ (function () {
        function SelectShippingMethodDialogComponent() {
        }
        SelectShippingMethodDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.currentSelectionId) {
                this.selectedMethod = this.eligibleShippingMethods.find(function (m) { return m.id === _this.currentSelectionId; });
            }
        };
        SelectShippingMethodDialogComponent.prototype.methodIdFn = function (item) {
            return item.id;
        };
        SelectShippingMethodDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        SelectShippingMethodDialogComponent.prototype.select = function () {
            if (this.selectedMethod) {
                this.resolveWith(this.selectedMethod.id);
            }
        };
        return SelectShippingMethodDialogComponent;
    }());
    SelectShippingMethodDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-shipping-method-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.select-shipping-method' | translate }}</ng-template>\n<vdr-radio-card-fieldset\n    [idFn]=\"methodIdFn\"\n    [selectedItemId]=\"selectedMethod?.id\"\n    (selectItem)=\"selectedMethod = $event\"\n>\n    <vdr-radio-card *ngFor=\"let quote of eligibleShippingMethods\" [item]=\"quote\">\n        <div class=\"result-details\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </vdr-radio-card>\n</vdr-radio-card-fieldset>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"!selectedMethod\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    SelectShippingMethodDialogComponent.ctorParameters = function () { return []; };

    var DraftOrderDetailComponent = /** @class */ (function (_super) {
        __extends(DraftOrderDetailComponent, _super);
        function DraftOrderDetailComponent(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.orderTransitionService = orderTransitionService;
            _this.detailForm = new forms.FormGroup({});
            _this.fetchHistory = new rxjs.Subject();
            _this.displayCouponCodeInput = false;
            return _this;
        }
        DraftOrderDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
            this.eligibleShippingMethods$ = this.entity$.pipe(operators.switchMap(function (order) { return _this.dataService.order
                .getDraftOrderEligibleShippingMethods(order.id)
                .mapSingle(function (_c) {
                var eligibleShippingMethodsForDraftOrder = _c.eligibleShippingMethodsForDraftOrder;
                return eligibleShippingMethodsForDraftOrder;
            }); }));
            this.customFields = this.getCustomFieldConfig('Order');
            this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
        };
        DraftOrderDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        DraftOrderDetailComponent.prototype.addItemToOrder = function (event) {
            var _this = this;
            this.dataService.order.addItemToDraftOrder(this.id, event).subscribe(function (result) {
                if (result.addItemToDraftOrder.__typename !== 'Order') {
                    _this.notificationService.error(result.addItemToDraftOrder.message);
                }
            });
        };
        DraftOrderDetailComponent.prototype.adjustOrderLine = function (event) {
            var _this = this;
            this.dataService.order
                .adjustDraftOrderLine(this.id, { orderLineId: event.lineId, quantity: event.quantity })
                .subscribe(function (result) {
                if (result.adjustDraftOrderLine.__typename !== 'Order') {
                    _this.notificationService.error(result.adjustDraftOrderLine.message);
                }
            });
        };
        DraftOrderDetailComponent.prototype.removeOrderLine = function (event) {
            var _this = this;
            this.dataService.order.removeDraftOrderLine(this.id, event.lineId).subscribe(function (result) {
                if (result.removeDraftOrderLine.__typename !== 'Order') {
                    _this.notificationService.error(result.removeDraftOrderLine.message);
                }
            });
        };
        DraftOrderDetailComponent.prototype.getOrderAddressLines = function (orderAddress) {
            if (!orderAddress) {
                return [];
            }
            return Object.values(orderAddress)
                .filter(function (val) { return val !== 'OrderAddress'; })
                .filter(function (line) { return !!line; });
        };
        DraftOrderDetailComponent.prototype.setCustomer = function () {
            var _this = this;
            this.modalService.fromComponent(SelectCustomerDialogComponent).subscribe(function (result) {
                if (_this.hasId(result)) {
                    _this.dataService.order
                        .setCustomerForDraftOrder(_this.id, { customerId: result.id })
                        .subscribe();
                }
                else if (result) {
                    _this.dataService.order.setCustomerForDraftOrder(_this.id, { input: result }).subscribe();
                }
            });
        };
        DraftOrderDetailComponent.prototype.setShippingAddress = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.switchMap(function (order) {
                var _a, _b;
                return _this.modalService.fromComponent(SelectAddressDialogComponent, {
                    locals: {
                        customerId: (_a = order.customer) === null || _a === void 0 ? void 0 : _a.id,
                        currentAddress: (_b = order.shippingAddress) !== null && _b !== void 0 ? _b : undefined,
                    },
                });
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.dataService.order.setDraftOrderShippingAddress(_this.id, result).subscribe();
                }
            });
        };
        DraftOrderDetailComponent.prototype.setBillingAddress = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.switchMap(function (order) {
                var _a, _b;
                return _this.modalService.fromComponent(SelectAddressDialogComponent, {
                    locals: {
                        customerId: (_a = order.customer) === null || _a === void 0 ? void 0 : _a.id,
                        currentAddress: (_b = order.billingAddress) !== null && _b !== void 0 ? _b : undefined,
                    },
                });
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.dataService.order.setDraftOrderBillingAddress(_this.id, result).subscribe();
                }
            });
        };
        DraftOrderDetailComponent.prototype.applyCouponCode = function (couponCode) {
            this.dataService.order.applyCouponCodeToDraftOrder(this.id, couponCode).subscribe();
        };
        DraftOrderDetailComponent.prototype.removeCouponCode = function (couponCode) {
            this.dataService.order.removeCouponCodeFromDraftOrder(this.id, couponCode).subscribe();
        };
        DraftOrderDetailComponent.prototype.setShippingMethod = function () {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.eligibleShippingMethods$)
                .pipe(operators.take(1), operators.switchMap(function (_c) {
                var _d = __read(_c, 2), order = _d[0], methods = _d[1];
                var _a, _b;
                return _this.modalService.fromComponent(SelectShippingMethodDialogComponent, {
                    locals: {
                        eligibleShippingMethods: methods,
                        currencyCode: order.currencyCode,
                        currentSelectionId: (_b = (_a = order.shippingLines) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.shippingMethod.id,
                    },
                });
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.dataService.order.setDraftOrderShippingMethod(_this.id, result).subscribe();
                }
            });
        };
        DraftOrderDetailComponent.prototype.updateCustomFields = function (customFieldsValue) {
            this.dataService.order
                .updateOrderCustomFields({
                id: this.id,
                customFields: customFieldsValue,
            })
                .subscribe();
        };
        DraftOrderDetailComponent.prototype.deleteOrder = function () {
            var _this = this;
            this.dataService.order.deleteDraftOrder(this.id).subscribe(function (_c) {
                var deleteDraftOrder = _c.deleteDraftOrder;
                if (deleteDraftOrder.result === i1.DeletionResult.DELETED) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'Order',
                    });
                    _this.router.navigate(['/orders']);
                }
                else if (deleteDraftOrder.message) {
                    _this.notificationService.error(deleteDraftOrder.message);
                }
            });
        };
        DraftOrderDetailComponent.prototype.completeOrder = function () {
            var _this = this;
            this.dataService.order
                .transitionToState(this.id, 'ArrangingPayment')
                .subscribe(function (_c) {
                var transitionOrderToState = _c.transitionOrderToState;
                if ((transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) === 'Order') {
                    _this.router.navigate(['/orders', _this.id]);
                }
                else if ((transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) === 'OrderStateTransitionError') {
                    _this.notificationService.error(transitionOrderToState.transitionError);
                }
            });
        };
        DraftOrderDetailComponent.prototype.hasId = function (input) {
            return typeof input === 'object' && !!input.id;
        };
        DraftOrderDetailComponent.prototype.setFormValues = function (entity) {
            // empty
        };
        return DraftOrderDetailComponent;
    }(i1.BaseDetailComponent));
    DraftOrderDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-draft-order-detail',
                    template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"completeOrder()\"\n            [disabled]=\"!order.customer || !order.lines.length || !order.shippingLines.length\"\n        >\n            <clr-icon shape=\"check\"></clr-icon>\n            {{ 'order.complete-draft-order' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"deleteOrder()\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                    {{ 'order.delete-draft-order' | translate }}\n                </button>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <vdr-draft-order-variant-selector\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n                [currencyCode]=\"order.currencyCode\"\n                (addItem)=\"addItemToOrder($event)\"\n            ></vdr-draft-order-variant-selector>\n            <vdr-order-table\n                [order]=\"order\"\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n                [isDraft]=\"true\"\n                (adjust)=\"adjustOrderLine($event)\"\n                (remove)=\"removeOrderLine($event)\"\n            ></vdr-order-table>\n            <div class=\"flex\">\n                <button\n                    *ngIf=\"order.couponCodes.length === 0 && !displayCouponCodeInput\"\n                    class=\"btn btn-link btn-sm mr2\"\n                    (click)=\"displayCouponCodeInput = !displayCouponCodeInput\"\n                >\n                    {{ 'order.set-coupon-codes' | translate }}\n                </button>\n                <div *ngIf=\"order.couponCodes.length || displayCouponCodeInput\">\n                    <label>{{ 'order.set-coupon-codes' | translate }}</label>\n                    <vdr-coupon-code-selector\n                        [couponCodes]=\"order.couponCodes\"\n                        (addCouponCode)=\"applyCouponCode($event)\"\n                        (removeCouponCode)=\"removeCouponCode($event)\"\n                    ></vdr-coupon-code-selector>\n                </div>\n            </div>\n            <ng-container *ngIf=\"order.taxSummary.length\">\n                <h4>{{ 'order.tax-summary' | translate }}</h4>\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            <th>{{ 'common.description' | translate }}</th>\n                            <th>{{ 'order.tax-rate' | translate }}</th>\n                            <th>{{ 'order.tax-base' | translate }}</th>\n                            <th>{{ 'order.tax-total' | translate }}</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let row of order.taxSummary\">\n                            <td>{{ row.description }}</td>\n                            <td>{{ row.taxRate / 100 | percent }}</td>\n                            <td>{{ row.taxBase | localeCurrency: order.currencyCode }}</td>\n                            <td>{{ row.taxTotal | localeCurrency: order.currencyCode }}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </ng-container>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <clr-icon *ngIf=\"!order.customer\" shape=\"unknown-status\" class=\"is-warning\"></clr-icon>\n                    <clr-icon *ngIf=\"order.customer\" shape=\"check\" class=\"is-success\"></clr-icon>\n                    {{ 'order.customer' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-customer-label\n                            class=\"block mb2\"\n                            *ngIf=\"order.customer\"\n                            [customer]=\"order.customer\"\n                        ></vdr-customer-label>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setCustomer()\">\n                            {{ 'order.set-customer-for-order' | translate }}\n                        </button>\n                    </div>\n                </div>\n                <div class=\"card-block\">\n                    <h4 class=\"card-title\">\n                        <clr-icon\n                            *ngIf=\"!order.billingAddress.streetLine1\"\n                            shape=\"unknown-status\"\n                            class=\"is-warning\"\n                        ></clr-icon>\n                        <clr-icon\n                            *ngIf=\"order.billingAddress.streetLine1\"\n                            shape=\"check\"\n                            class=\"is-success\"\n                        ></clr-icon>\n                        {{ 'order.billing-address' | translate }}\n                    </h4>\n                    <div class=\"card-text\">\n                        <vdr-formatted-address\n                            class=\"block mb2\"\n                            *ngIf=\"order.billingAddress\"\n                            [address]=\"order.billingAddress\"\n                        ></vdr-formatted-address>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setBillingAddress()\">\n                            {{ 'order.set-billing-address' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <clr-icon\n                        *ngIf=\"!order.shippingAddress.streetLine1 || !order.shippingLines.length\"\n                        shape=\"unknown-status\"\n                        class=\"is-warning\"\n                    ></clr-icon>\n                    <clr-icon\n                        *ngIf=\"order.shippingAddress.streetLine1 && order.shippingLines.length\"\n                        shape=\"check\"\n                        class=\"is-success\"\n                    ></clr-icon>\n                    {{ 'order.shipping' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-formatted-address\n                            class=\"block mb2\"\n                            *ngIf=\"order.shippingAddress\"\n                            [address]=\"order.shippingAddress\"\n                        ></vdr-formatted-address>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setShippingAddress()\">\n                            {{ 'order.set-shipping-address' | translate }}\n                        </button>\n                    </div>\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <div *ngFor=\"let shippingLine of order.shippingLines\">\n                            {{ shippingLine.shippingMethod.name }}\n                        </div>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setShippingMethod()\">\n                            {{ 'order.set-shipping-method' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <vdr-order-custom-fields-card\n                [customFieldsConfig]=\"customFields\"\n                [customFieldValues]=\"order.customFields\"\n                (updateClick)=\"updateCustomFields($event)\"\n            ></vdr-order-custom-fields-card>\n        </div>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    DraftOrderDetailComponent.ctorParameters = function () { return [
        { type: i1$1.Router },
        { type: i1$1.ActivatedRoute },
        { type: i1.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i1.DataService },
        { type: i1.NotificationService },
        { type: i1.ModalService },
        { type: OrderTransitionService }
    ]; };

    var DraftOrderVariantSelectorComponent = /** @class */ (function () {
        function DraftOrderVariantSelectorComponent(dataService) {
            this.dataService = dataService;
            this.addItem = new i0.EventEmitter();
            this.customFieldsFormGroup = new forms.FormGroup({});
            this.selectedVariantId$ = new rxjs.Subject();
            this.quantity = 1;
        }
        DraftOrderVariantSelectorComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            var _this = this;
            this.selectedVariant$ = this.selectedVariantId$.pipe(operators.switchMap(function (id) {
                if (id) {
                    return _this.dataService.product
                        .getProductVariant(id)
                        .mapSingle(function (_a) {
                        var productVariant = _a.productVariant;
                        return productVariant;
                    });
                }
                else {
                    return [undefined];
                }
            }));
            try {
                for (var _b = __values(this.orderLineCustomFields), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var customField = _c.value;
                    this.customFieldsFormGroup.addControl(customField.name, new forms.FormControl(''));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        DraftOrderVariantSelectorComponent.prototype.addItemClick = function (selectedVariant) {
            if (selectedVariant) {
                this.addItem.emit({
                    productVariantId: selectedVariant.id,
                    quantity: this.quantity,
                    customFields: this.orderLineCustomFields.length
                        ? this.customFieldsFormGroup.value
                        : undefined,
                });
                this.selectedVariantId$.next(undefined);
                this.customFieldsFormGroup.reset();
            }
        };
        return DraftOrderVariantSelectorComponent;
    }());
    DraftOrderVariantSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-draft-order-variant-selector',
                    template: "<div class=\"card\">\n    <div class=\"card-block\">\n        <h4 class=\"card-title\">{{ 'order.add-item-to-order' | translate }}</h4>\n        <vdr-product-selector\n            (productSelected)=\"selectedVariantId$.next($event.productVariantId)\"\n        ></vdr-product-selector>\n    </div>\n    <div class=\"card-block\" *ngIf=\"selectedVariant$ | async as selectedVariant\">\n        <div class=\"variant-details\">\n            <img class=\"mr2\" [src]=\"selectedVariant.featuredAsset || selectedVariant.product.featuredAsset | assetPreview: 32\">\n            <div class=\"details\">\n                <div>{{ selectedVariant?.name }}</div>\n                <div class=\"small\">{{ selectedVariant?.sku }}</div>\n            </div>\n            <div class=\"details ml4\">\n                <div class=\"small\">\n                    {{ 'catalog.stock-on-hand' | translate }}: {{ selectedVariant.stockOnHand }}\n                </div>\n                <div class=\"small\">\n                    {{ 'catalog.stock-allocated' | translate }}: {{ selectedVariant.stockAllocated }}\n                </div>\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"details\">\n                <div>{{ selectedVariant?.priceWithTax | localeCurrency: currencyCode }}</div>\n                <div class=\"small\" [title]=\"'order.net-price' | translate\">\n                    {{ selectedVariant?.price | localeCurrency: currencyCode }}\n                </div>\n            </div>\n            <div>\n                <input [disabled]=\"!selectedVariant\" type=\"number\" min=\"0\" [(ngModel)]=\"quantity\" />\n            </div>\n            <button\n                [disabled]=\"!selectedVariant\"\n                class=\"btn btn-small btn-primary\"\n                (click)=\"addItemClick(selectedVariant)\"\n            >\n                {{ 'order.add-item-to-order' | translate }}\n            </button>\n        </div>\n        <ng-container *ngIf=\"orderLineCustomFields.length\">\n            <div class=\"custom-field\" *ngFor=\"let field of orderLineCustomFields\">\n                <vdr-custom-field-control\n                    [compact]=\"true\"\n                    [readonly]=\"false\"\n                    [customField]=\"field\"\n                    [customFieldsFormGroup]=\"customFieldsFormGroup\"\n                ></vdr-custom-field-control>\n            </div>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".variant-details{display:flex;align-items:center}.variant-details img{border-radius:var(--border-radius-img);width:32px;height:32px}.variant-details .details{font-size:.65rem;line-height:.7rem}.variant-details input{width:48px;margin:0 6px}.variant-details .small{font-size:11px;color:var(--color-text-300)}\n"]
                },] }
    ];
    DraftOrderVariantSelectorComponent.ctorParameters = function () { return [
        { type: i1.DataService }
    ]; };
    DraftOrderVariantSelectorComponent.propDecorators = {
        currencyCode: [{ type: i0.Input }],
        orderLineCustomFields: [{ type: i0.Input }],
        addItem: [{ type: i0.Output }]
    };

    var FulfillOrderDialogComponent = /** @class */ (function () {
        function FulfillOrderDialogComponent(dataService, changeDetector) {
            this.dataService = dataService;
            this.changeDetector = changeDetector;
            this.fulfillmentHandlerControl = new forms.FormControl();
            this.fulfillmentQuantities = {};
        }
        FulfillOrderDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.settings.getGlobalSettings().single$.subscribe(function (_c) {
                var globalSettings = _c.globalSettings;
                _this.fulfillmentQuantities = _this.order.lines.reduce(function (result, line) {
                    var _c;
                    var fulfillCount = _this.getFulfillableCount(line, globalSettings.trackInventory);
                    return Object.assign(Object.assign({}, result), (_c = {}, _c[line.id] = { fulfillCount: fulfillCount, max: fulfillCount }, _c));
                }, {});
                _this.changeDetector.markForCheck();
            });
            this.dataService.shippingMethod
                .getShippingMethodOperations()
                .mapSingle(function (data) { return data.fulfillmentHandlers; })
                .subscribe(function (handlers) {
                _this.fulfillmentHandlerDef =
                    handlers.find(function (h) { var _a, _b; return h.code === ((_b = (_a = _this.order.shippingLines[0]) === null || _a === void 0 ? void 0 : _a.shippingMethod) === null || _b === void 0 ? void 0 : _b.fulfillmentHandlerCode); }) || handlers[0];
                _this.fulfillmentHandler = i1.configurableDefinitionToInstance(_this.fulfillmentHandlerDef);
                _this.fulfillmentHandlerControl.patchValue(_this.fulfillmentHandler);
                _this.changeDetector.markForCheck();
            });
        };
        FulfillOrderDialogComponent.prototype.getFulfillableCount = function (line, globalTrackInventory) {
            var _c = line.productVariant, trackInventory = _c.trackInventory, stockOnHand = _c.stockOnHand;
            var effectiveTracInventory = trackInventory === i1.GlobalFlag.INHERIT ? globalTrackInventory : trackInventory === i1.GlobalFlag.TRUE;
            var unfulfilledCount = this.getUnfulfilledCount(line);
            return effectiveTracInventory ? Math.min(unfulfilledCount, stockOnHand) : unfulfilledCount;
        };
        FulfillOrderDialogComponent.prototype.getUnfulfilledCount = function (line) {
            var _a, _b;
            var fulfilled = (_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.map(function (f) { return f.summary; }).flat().filter(function (row) { return row.orderLine.id === line.id; }).reduce(function (sum, row) { return sum + row.quantity; }, 0)) !== null && _b !== void 0 ? _b : 0;
            return line.quantity - fulfilled;
        };
        FulfillOrderDialogComponent.prototype.canSubmit = function () {
            var totalCount = Object.values(this.fulfillmentQuantities).reduce(function (total, _c) {
                var fulfillCount = _c.fulfillCount;
                return total + fulfillCount;
            }, 0);
            var formIsValid = i1.configurableOperationValueIsValid(this.fulfillmentHandlerDef, this.fulfillmentHandlerControl.value) && this.fulfillmentHandlerControl.valid;
            return formIsValid && 0 < totalCount;
        };
        FulfillOrderDialogComponent.prototype.select = function () {
            var lines = Object.entries(this.fulfillmentQuantities).map(function (_c) {
                var _d = __read(_c, 2), orderLineId = _d[0], fulfillCount = _d[1].fulfillCount;
                return ({
                    orderLineId: orderLineId,
                    quantity: fulfillCount,
                });
            });
            this.resolveWith({
                lines: lines,
                handler: i1.toConfigurableOperationInput(this.fulfillmentHandler, this.fulfillmentHandlerControl.value),
            });
        };
        FulfillOrderDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return FulfillOrderDialogComponent;
    }());
    FulfillOrderDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-fulfill-order-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.fulfill-order' | translate }}</ng-template>\n\n<div class=\"fulfillment-wrapper\">\n    <div class=\"order-table\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.unfulfilled' | translate }}</th>\n                    <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                    <th>{{ 'order.fulfill' | translate }}</th>\n                </tr>\n            </thead>\n            <tr\n                *ngFor=\"let line of order.lines\"\n                class=\"order-line\"\n                [class.ignore]=\"getUnfulfilledCount(line) === 0\"\n            >\n                <td class=\"align-middle thumb\">\n                    <img *ngIf=\"line.featuredAsset\" [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">{{ getUnfulfilledCount(line) }}</td>\n                <td class=\"align-middle quantity\">{{ line.productVariant.stockOnHand }}</td>\n                <td class=\"align-middle fulfil\">\n                    <input\n                        *ngIf=\"fulfillmentQuantities[line.id]\"\n                        [disabled]=\"getUnfulfilledCount(line) === 0\"\n                        [(ngModel)]=\"fulfillmentQuantities[line.id].fulfillCount\"\n                        type=\"number\"\n                        [max]=\"fulfillmentQuantities[line.id].max\"\n                        min=\"0\"\n                    />\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"shipping-details\">\n        <vdr-formatted-address [address]=\"order.shippingAddress\"></vdr-formatted-address>\n        <h6>{{ 'order.shipping-method' | translate }}</h6>\n        {{ order.shippingLines[0]?.shippingMethod?.name }}\n        <strong>{{ order.shipping | localeCurrency: order.currencyCode }}</strong>\n        <vdr-configurable-input\n            [operationDefinition]=\"fulfillmentHandlerDef\"\n            [operation]=\"fulfillmentHandler\"\n            [formControl]=\"fulfillmentHandlerControl\"\n            [removable]=\"false\"\n        ></vdr-configurable-input>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" [disabled]=\"!canSubmit()\" class=\"btn btn-primary\">\n        {{ 'order.create-fulfillment' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:flex;min-height:64vh}.fulfillment-wrapper{flex:1}@media screen and (min-width: 768px){.fulfillment-wrapper{display:flex;flex-direction:row}}.fulfillment-wrapper .shipping-details{margin-top:24px}@media screen and (min-width: 768px){.fulfillment-wrapper .shipping-details{margin-top:0;margin-left:24px;width:250px}}.fulfillment-wrapper .shipping-details clr-input-container{margin-top:24px}.fulfillment-wrapper .order-table{flex:1;overflow-y:auto}.fulfillment-wrapper .order-table table{margin-top:0}.fulfillment-wrapper tr.ignore{color:var(--color-grey-300)}\n"]
                },] }
    ];
    FulfillOrderDialogComponent.ctorParameters = function () { return [
        { type: i1.DataService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var FulfillmentCardComponent = /** @class */ (function () {
        function FulfillmentCardComponent() {
            this.transitionState = new i0.EventEmitter();
        }
        FulfillmentCardComponent.prototype.nextSuggestedState = function () {
            var _a;
            if (!this.fulfillment) {
                return;
            }
            var nextStates = this.fulfillment.nextStates;
            var namedStateOrDefault = function (targetState) { return nextStates.includes(targetState) ? targetState : nextStates[0]; };
            switch ((_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.state) {
                case 'Pending':
                    return namedStateOrDefault('Shipped');
                case 'Shipped':
                    return namedStateOrDefault('Delivered');
                default:
                    return nextStates.find(function (s) { return s !== 'Cancelled'; });
            }
        };
        FulfillmentCardComponent.prototype.nextOtherStates = function () {
            if (!this.fulfillment) {
                return [];
            }
            var suggested = this.nextSuggestedState();
            return this.fulfillment.nextStates.filter(function (s) { return s !== suggested; });
        };
        return FulfillmentCardComponent;
    }());
    FulfillmentCardComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-fulfillment-card',
                    template: "<div class=\"card\">\n    <div class=\"card-header fulfillment-header\">\n        <div>{{ 'order.fulfillment' | translate }}</div>\n        <div class=\"fulfillment-state\">\n            <vdr-fulfillment-state-label [state]=\"fulfillment?.state\"></vdr-fulfillment-state-label>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <vdr-fulfillment-detail\n            *ngIf=\"!!fulfillment\"\n            [fulfillmentId]=\"fulfillment?.id\"\n            [order]=\"order\"\n        ></vdr-fulfillment-detail>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"fulfillment?.nextStates.length\">\n        <ng-container *ngIf=\"nextSuggestedState() as suggestedState\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"transitionState.emit(suggestedState)\">\n                {{ 'order.set-fulfillment-state' | translate: { state: (suggestedState | stateI18nToken | translate) } }}\n            </button>\n        </ng-container>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngFor=\"let nextState of nextOtherStates()\">\n                    <button\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionState.emit(nextState)\"\n                    >\n                        <ng-container *ngIf=\"nextState !== 'Cancelled'; else cancel\">\n                            <clr-icon shape=\"step-forward-2\"></clr-icon>\n                            {{ 'order.transition-to-state' | translate: { state: (nextState | stateI18nToken | translate) } }}\n                        </ng-container>\n                        <ng-template #cancel>\n                            <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                            {{ 'order.cancel-fulfillment' | translate }}\n                        </ng-template>\n                    </button>\n                </ng-container>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".fulfillment-header{display:flex;justify-content:space-between;align-items:center}.card-footer{display:flex;align-items:center;justify-content:flex-end}\n"]
                },] }
    ];
    FulfillmentCardComponent.propDecorators = {
        fulfillment: [{ type: i0.Input }],
        order: [{ type: i0.Input }],
        transitionState: [{ type: i0.Output }]
    };

    var FulfillmentDetailComponent = /** @class */ (function () {
        function FulfillmentDetailComponent(serverConfigService) {
            this.serverConfigService = serverConfigService;
            this.customFieldConfig = [];
            this.customFieldFormGroup = new forms.FormGroup({});
        }
        FulfillmentDetailComponent.prototype.ngOnInit = function () {
            this.customFieldConfig = this.serverConfigService.getCustomFieldsFor('Fulfillment');
        };
        FulfillmentDetailComponent.prototype.ngOnChanges = function (changes) {
            this.buildCustomFieldsFormGroup();
        };
        Object.defineProperty(FulfillmentDetailComponent.prototype, "fulfillment", {
            get: function () {
                var _this = this;
                return this.order.fulfillments && this.order.fulfillments.find(function (f) { return f.id === _this.fulfillmentId; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FulfillmentDetailComponent.prototype, "items", {
            get: function () {
                var _this = this;
                var _a, _b;
                return ((_b = (_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.summary.map(function (row) {
                    var _a, _b;
                    return {
                        name: (_b = (_a = _this.order.lines.find(function (line) { return line.id === row.orderLine.id; })) === null || _a === void 0 ? void 0 : _a.productVariant.name) !== null && _b !== void 0 ? _b : '',
                        quantity: row.quantity,
                    };
                })) !== null && _b !== void 0 ? _b : []);
            },
            enumerable: false,
            configurable: true
        });
        FulfillmentDetailComponent.prototype.buildCustomFieldsFormGroup = function () {
            var e_1, _c;
            var customFields = this.fulfillment.customFields;
            try {
                for (var _d = __values(this.serverConfigService.getCustomFieldsFor('Fulfillment')), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var fieldDef = _e.value;
                    this.customFieldFormGroup.addControl(fieldDef.name, new forms.FormControl(customFields[fieldDef.name]));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        FulfillmentDetailComponent.prototype.customFieldIsObject = function (customField) {
            return Array.isArray(customField) || sharedUtils.isObject(customField);
        };
        return FulfillmentDetailComponent;
    }());
    FulfillmentDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-fulfillment-detail',
                    template: "<vdr-labeled-data [label]=\"'common.created-at' | translate\">\n    {{ fulfillment?.createdAt | localeDate: 'medium' }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n    {{ fulfillment?.method }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"fulfillment?.trackingCode\" [label]=\"'order.tracking-code' | translate\">\n    {{ fulfillment?.trackingCode }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.contents' | translate\">\n    <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<ng-container *ngFor=\"let customField of customFieldConfig\">\n    <vdr-custom-field-control\n        *ngIf=\"customFieldFormGroup.get(customField.name)\"\n        [readonly]=\"true\"\n        [compact]=\"true\"\n        [customField]=\"customField\"\n        [customFieldsFormGroup]=\"customFieldFormGroup\"\n    ></vdr-custom-field-control>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    FulfillmentDetailComponent.ctorParameters = function () { return [
        { type: i1.ServerConfigService }
    ]; };
    FulfillmentDetailComponent.propDecorators = {
        fulfillmentId: [{ type: i0.Input }],
        order: [{ type: i0.Input }]
    };

    var FulfillmentStateLabelComponent = /** @class */ (function () {
        function FulfillmentStateLabelComponent() {
        }
        Object.defineProperty(FulfillmentStateLabelComponent.prototype, "chipColorType", {
            get: function () {
                switch (this.state) {
                    case 'Pending':
                    case 'Shipped':
                        return 'warning';
                    case 'Delivered':
                        return 'success';
                    case 'Cancelled':
                        return 'error';
                }
            },
            enumerable: false,
            configurable: true
        });
        return FulfillmentStateLabelComponent;
    }());
    FulfillmentStateLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-fulfillment-state-label',
                    template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Delivered'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{font-size:14px}\n"]
                },] }
    ];
    FulfillmentStateLabelComponent.propDecorators = {
        state: [{ type: i0.Input }]
    };

    var LineFulfillmentComponent = /** @class */ (function () {
        function LineFulfillmentComponent() {
            this.fulfilledCount = 0;
            this.fulfillments = [];
        }
        LineFulfillmentComponent.prototype.ngOnChanges = function (changes) {
            if (this.line) {
                this.fulfilledCount = this.getDeliveredCount(this.line);
                this.fulfillmentStatus = this.getFulfillmentStatus(this.fulfilledCount, this.line.items.length);
                this.fulfillments = this.getFulfillments(this.line);
            }
        };
        /**
         * Returns the number of items in an OrderLine which are fulfilled.
         */
        LineFulfillmentComponent.prototype.getDeliveredCount = function (line) {
            var _a, _b;
            return ((_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.reduce(function (sum, fulfillment) { var _a, _b; return sum + ((_b = (_a = fulfillment.summary.find(function (s) { return s.orderLine.id === line.id; })) === null || _a === void 0 ? void 0 : _a.quantity) !== null && _b !== void 0 ? _b : 0); }, 0)) !== null && _b !== void 0 ? _b : 0);
        };
        LineFulfillmentComponent.prototype.getFulfillmentStatus = function (fulfilledCount, lineQuantity) {
            if (fulfilledCount === lineQuantity) {
                return 'full';
            }
            if (0 < fulfilledCount && fulfilledCount < lineQuantity) {
                return 'partial';
            }
            return 'none';
        };
        LineFulfillmentComponent.prototype.getFulfillments = function (line) {
            var _a, _b;
            return ((_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.map(function (fulfillment) {
                var _a;
                var summaryLine = fulfillment.summary.find(function (s) { return s.orderLine.id === line.id; });
                return {
                    count: (_a = summaryLine === null || summaryLine === void 0 ? void 0 : summaryLine.quantity) !== null && _a !== void 0 ? _a : 0,
                    fulfillment: fulfillment,
                };
            })) !== null && _b !== void 0 ? _b : []);
        };
        return LineFulfillmentComponent;
    }());
    LineFulfillmentComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-line-fulfillment',
                    template: "<vdr-dropdown class=\"search-settings-menu\" *ngIf=\"fulfilledCount || orderState === 'PartiallyDelivered'\">\n    <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n        <clr-icon *ngIf=\"fulfillmentStatus === 'full'\" class=\"item-fulfilled\" shape=\"check-circle\"></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'partial'\"\n            class=\"item-partially-fulfilled\"\n            shape=\"check-circle\"\n        ></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'none'\"\n            class=\"item-not-fulfilled\"\n            shape=\"exclamation-circle\"\n        ></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'full'\">\n            {{ 'order.line-fulfillment-all' | translate }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'partial'\">\n            {{\n                'order.line-fulfillment-partial' | translate: { total: line.quantity, count: fulfilledCount }\n            }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'none'\">\n            {{ 'order.line-fulfillment-none' | translate }}\n        </label>\n        <div class=\"fulfillment-detail\" *ngFor=\"let item of fulfillments\">\n            <div class=\"fulfillment-title\">\n                {{ 'order.fulfillment' | translate }} #{{ item.fulfillment.id }} ({{\n                    'order.item-count' | translate: { count: item.count }\n                }})\n            </div>\n            <vdr-labeled-data [label]=\"'common.created-at' | translate\">\n                {{ item.fulfillment.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n                {{ item.fulfillment.method }}\n            </vdr-labeled-data>\n            <vdr-labeled-data\n                *ngIf=\"item.fulfillment.trackingCode\"\n                [label]=\"'order.tracking-code' | translate\"\n            >\n                {{ item.fulfillment.trackingCode }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".item-fulfilled{color:var(--color-success-500)}.item-partially-fulfilled{color:var(--color-warning-500)}.item-not-fulfilled{color:var(--color-error-500)}.fulfillment-detail{margin:6px 12px}.fulfillment-detail:not(:last-of-type){border-bottom:1px dashed var(--color-component-border-200)}\n"]
                },] }
    ];
    LineFulfillmentComponent.propDecorators = {
        line: [{ type: i0.Input }],
        orderState: [{ type: i0.Input }]
    };

    var LineRefundsComponent = /** @class */ (function () {
        function LineRefundsComponent() {
        }
        LineRefundsComponent.prototype.getRefundedCount = function () {
            var _a, _b;
            var refunds = (_b = (_a = this.payments) === null || _a === void 0 ? void 0 : _a.reduce(function (all, payment) { return __spreadArray(__spreadArray([], __read(all)), __read(payment.refunds)); }, [])) !== null && _b !== void 0 ? _b : [];
            return this.line.items.filter(function (i) {
                if (i.refundId === null && !i.cancelled) {
                    return false;
                }
                if (i.refundId) {
                    var refund = refunds.find(function (r) { return r.id === i.refundId; });
                    if ((refund === null || refund === void 0 ? void 0 : refund.state) === 'Failed') {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }).length;
        };
        return LineRefundsComponent;
    }());
    LineRefundsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-line-refunds',
                    template: "<span *ngIf=\"getRefundedCount()\" [title]=\"'order.refunded-count' | translate: { count: getRefundedCount() }\">\n    <clr-icon shape=\"redo\" class=\"is-solid\" dir=\"down\"></clr-icon>\n</span>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{color:var(--color-error-500)}\n"]
                },] }
    ];
    LineRefundsComponent.propDecorators = {
        line: [{ type: i0.Input }],
        payments: [{ type: i0.Input }]
    };

    var ModificationDetailComponent = /** @class */ (function () {
        function ModificationDetailComponent() {
            this.addedItems = new Map();
            this.removedItems = new Map();
        }
        ModificationDetailComponent.prototype.ngOnChanges = function () {
            var _c = this.getModifiedLines(), added = _c.added, removed = _c.removed;
            this.addedItems = added;
            this.removedItems = removed;
        };
        ModificationDetailComponent.prototype.getSurcharge = function (id) {
            return this.order.surcharges.find(function (m) { return m.id === id; });
        };
        ModificationDetailComponent.prototype.getAddedItems = function () {
            return __spreadArray([], __read(this.addedItems.entries())).map(function (_c) {
                var _d = __read(_c, 2), line = _d[0], count = _d[1];
                return { name: line.productVariant.name, quantity: count };
            });
        };
        ModificationDetailComponent.prototype.getRemovedItems = function () {
            return __spreadArray([], __read(this.removedItems.entries())).map(function (_c) {
                var _d = __read(_c, 2), line = _d[0], count = _d[1];
                return { name: line.productVariant.name, quantity: count };
            });
        };
        ModificationDetailComponent.prototype.getModifiedLines = function () {
            var e_1, _c;
            var _a, _b;
            var added = new Map();
            var removed = new Map();
            try {
                for (var _d = __values(this.modification.orderItems || []), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _item = _e.value;
                    var result = this.getOrderLineAndItem(_item.id);
                    if (result) {
                        var line = result.line, item = result.item;
                        if (item.cancelled) {
                            var count = (_a = removed.get(line)) !== null && _a !== void 0 ? _a : 0;
                            removed.set(line, count + 1);
                        }
                        else {
                            var count = (_b = added.get(line)) !== null && _b !== void 0 ? _b : 0;
                            added.set(line, count + 1);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return { added: added, removed: removed };
        };
        ModificationDetailComponent.prototype.getOrderLineAndItem = function (itemId) {
            var e_2, _c;
            try {
                for (var _d = __values(this.order.lines), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var line = _e.value;
                    var item = line.items.find(function (i) { return i.id === itemId; });
                    if (item) {
                        return { line: line, item: item };
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return ModificationDetailComponent;
    }());
    ModificationDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-modification-detail',
                    template: "<vdr-labeled-data [label]=\"'common.ID' | translate\">{{ modification.id }}</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"modification.note\" [label]=\"'order.note' | translate\">{{\n    modification.note\n}}</vdr-labeled-data>\n<vdr-labeled-data *ngFor=\"let surcharge of modification.surcharges\" [label]=\"'order.surcharges' | translate\">\n    {{ getSurcharge(surcharge.id)?.description }}\n    {{ getSurcharge(surcharge.id)?.priceWithTax | localeCurrency: order.currencyCode }}</vdr-labeled-data\n>\n<vdr-labeled-data *ngIf=\"getAddedItems().length\" [label]=\"'order.added-items' | translate\">\n    <vdr-simple-item-list [items]=\"getAddedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"getRemovedItems().length\" [label]=\"'order.removed-items' | translate\">\n    <vdr-simple-item-list [items]=\"getRemovedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ModificationDetailComponent.propDecorators = {
        order: [{ type: i0.Input }],
        modification: [{ type: i0.Input }]
    };

    var OrderCustomFieldsCardComponent = /** @class */ (function () {
        function OrderCustomFieldsCardComponent(formBuilder, modalService) {
            this.formBuilder = formBuilder;
            this.modalService = modalService;
            this.customFieldsConfig = [];
            this.customFieldValues = {};
            this.updateClick = new i0.EventEmitter();
            this.editable = false;
        }
        OrderCustomFieldsCardComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            this.customFieldForm = this.formBuilder.group({});
            try {
                for (var _b = __values(this.customFieldsConfig), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var field = _c.value;
                    this.customFieldForm.addControl(field.name, this.formBuilder.control(this.customFieldValues[field.name]));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        OrderCustomFieldsCardComponent.prototype.onUpdateClick = function () {
            this.updateClick.emit(this.customFieldForm.value);
            this.customFieldForm.markAsPristine();
            this.editable = false;
        };
        OrderCustomFieldsCardComponent.prototype.onCancelClick = function () {
            var _this = this;
            if (this.customFieldForm.dirty) {
                this.modalService
                    .dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.confirm-cancel'),
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.keep-editing') },
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('common.discard-changes'), returnValue: true },
                    ],
                })
                    .subscribe(function (result) {
                    if (result) {
                        _this.customFieldForm.reset();
                        _this.customFieldForm.markAsPristine();
                        _this.editable = false;
                    }
                });
            }
            else {
                this.editable = false;
            }
        };
        return OrderCustomFieldsCardComponent;
    }());
    OrderCustomFieldsCardComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-custom-fields-card',
                    template: "<div class=\"card\" *ngIf=\"customFieldsConfig.length\">\n    <div class=\"card-header\">\n        {{ 'common.custom-fields' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text custom-field-form\" [class.editable]=\"editable\">\n            <vdr-tabbed-custom-fields\n                entityName=\"Order\"\n                [customFields]=\"customFieldsConfig\"\n                [customFieldsFormGroup]=\"customFieldForm\"\n                [readonly]=\"!editable\"\n                [compact]=\"true\"\n            ></vdr-tabbed-custom-fields>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-sm btn-secondary\" (click)=\"editable = true\" *ngIf=\"!editable\">\n            <clr-icon shape=\"pencil\"></clr-icon>\n            {{ 'common.edit' | translate }}\n        </button>\n        <button\n            class=\"btn btn-sm btn-primary\"\n            (click)=\"onUpdateClick()\"\n            *ngIf=\"editable\"\n            [disabled]=\"customFieldForm.pristine || customFieldForm.invalid\"\n        >\n            <clr-icon shape=\"check\"></clr-icon>\n            {{ 'common.update' | translate }}\n        </button>\n        <button\n            class=\"btn btn-sm btn-secondary\"\n            (click)=\"onCancelClick()\"\n            *ngIf=\"editable\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.cancel' | translate }}\n        </button>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["vdr-custom-field-control{margin-bottom:6px;display:block}.custom-field-form ::ng-deep .clr-control-label{color:var(--color-grey-400)}.custom-field-form.editable ::ng-deep .clr-control-label{color:inherit}\n"]
                },] }
    ];
    OrderCustomFieldsCardComponent.ctorParameters = function () { return [
        { type: forms.FormBuilder },
        { type: i1.ModalService }
    ]; };
    OrderCustomFieldsCardComponent.propDecorators = {
        customFieldsConfig: [{ type: i0.Input }],
        customFieldValues: [{ type: i0.Input }],
        updateClick: [{ type: i0.Output }]
    };

    var OrderProcessGraphDialogComponent = /** @class */ (function () {
        function OrderProcessGraphDialogComponent(serverConfigService) {
            this.serverConfigService = serverConfigService;
            this.states = [];
        }
        OrderProcessGraphDialogComponent.prototype.ngOnInit = function () {
            this.states = this.serverConfigService.getOrderProcessStates();
        };
        return OrderProcessGraphDialogComponent;
    }());
    OrderProcessGraphDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-process-graph-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.order-state-diagram' | translate }}</ng-template>\n\n<vdr-order-process-graph [states]=\"states\" [initialState]=\"activeState\"></vdr-order-process-graph>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    OrderProcessGraphDialogComponent.ctorParameters = function () { return [
        { type: i1.ServerConfigService }
    ]; };

    var RefundOrderDialogComponent = /** @class */ (function () {
        function RefundOrderDialogComponent(i18nService) {
            var _this = this;
            var _a;
            this.i18nService = i18nService;
            this.lineQuantities = {};
            this.refundShipping = false;
            this.adjustment = 0;
            this.reasons = (_a = i1.getAppConfig().cancellationReasons) !== null && _a !== void 0 ? _a : [
                ngxTranslateExtractMarker.marker('order.refund-reason-customer-request'),
                ngxTranslateExtractMarker.marker('order.refund-reason-not-available'),
            ];
            this.reasons = this.reasons.map(function (r) { return _this.i18nService.translate(r); });
        }
        Object.defineProperty(RefundOrderDialogComponent.prototype, "refundTotal", {
            get: function () {
                var _this = this;
                var itemTotal = this.order.lines.reduce(function (total, line) {
                    var lineRef = _this.lineQuantities[line.id];
                    var refundCount = (lineRef.refund && lineRef.quantity) || 0;
                    return total + line.proratedUnitPriceWithTax * refundCount;
                }, 0);
                return itemTotal + (this.refundShipping ? this.order.shippingWithTax : 0) + this.adjustment;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RefundOrderDialogComponent.prototype, "settledPaymentsTotal", {
            get: function () {
                return this.settledPayments
                    .map(function (payment) {
                    var paymentTotal = payment.amount;
                    var alreadyRefundedTotal = sharedUtils.summate(payment.refunds.filter(function (r) { return r.state !== 'Failed'; }), 'total');
                    return paymentTotal - alreadyRefundedTotal;
                })
                    .reduce(function (sum, amount) { return sum + amount; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        RefundOrderDialogComponent.prototype.lineCanBeRefundedOrCancelled = function (line) {
            var _a, _b;
            var refunds = (_b = (_a = this.order.payments) === null || _a === void 0 ? void 0 : _a.reduce(function (all, payment) { return __spreadArray(__spreadArray([], __read(all)), __read(payment.refunds)); }, [])) !== null && _b !== void 0 ? _b : [];
            var refundable = line.items.filter(function (i) {
                if (i.cancelled) {
                    return false;
                }
                if (i.refundId == null) {
                    return true;
                }
                var refund = refunds.find(function (r) { return r.id === i.refundId; });
                return (refund === null || refund === void 0 ? void 0 : refund.state) === 'Failed';
            });
            return 0 < refundable.length;
        };
        RefundOrderDialogComponent.prototype.ngOnInit = function () {
            this.lineQuantities = this.order.lines.reduce(function (result, line) {
                var _c;
                return Object.assign(Object.assign({}, result), (_c = {}, _c[line.id] = {
                    quantity: 0,
                    refund: false,
                    cancel: false,
                }, _c));
            }, {});
            this.settledPayments = (this.order.payments || []).filter(function (p) { return p.state === 'Settled'; });
            if (this.settledPayments.length) {
                this.selectedPayment = this.settledPayments[0];
            }
        };
        RefundOrderDialogComponent.prototype.handleZeroQuantity = function (line) {
            if ((line === null || line === void 0 ? void 0 : line.quantity) === 0) {
                line.cancel = false;
                line.refund = false;
            }
        };
        RefundOrderDialogComponent.prototype.isRefunding = function () {
            var result = Object.values(this.lineQuantities).reduce(function (isRefunding, line) {
                return isRefunding || (0 < line.quantity && line.refund);
            }, false);
            return result;
        };
        RefundOrderDialogComponent.prototype.isCancelling = function () {
            var result = Object.values(this.lineQuantities).reduce(function (isCancelling, line) {
                return isCancelling || (0 < line.quantity && line.cancel);
            }, false);
            return result;
        };
        RefundOrderDialogComponent.prototype.canSubmit = function () {
            if (this.isRefunding()) {
                return !!(this.selectedPayment &&
                    this.reason &&
                    0 < this.refundTotal &&
                    this.refundTotal <= this.settledPaymentsTotal);
            }
            else if (this.isCancelling()) {
                return !!this.reason;
            }
            return false;
        };
        RefundOrderDialogComponent.prototype.select = function () {
            var payment = this.selectedPayment;
            if (payment) {
                var refundLines = this.getOrderLineInput(function (line) { return line.refund; });
                var cancelLines = this.getOrderLineInput(function (line) { return line.cancel; });
                this.resolveWith({
                    refund: {
                        lines: refundLines,
                        reason: this.reason,
                        shipping: this.refundShipping ? this.order.shippingWithTax : 0,
                        adjustment: this.adjustment,
                        paymentId: payment.id,
                    },
                    cancel: {
                        lines: cancelLines,
                        orderId: this.order.id,
                        reason: this.reason,
                        cancelShipping: this.refundShipping,
                    },
                });
            }
        };
        RefundOrderDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        RefundOrderDialogComponent.prototype.getOrderLineInput = function (filterFn) {
            return Object.entries(this.lineQuantities)
                .filter(function (_c) {
                var _d = __read(_c, 2), orderLineId = _d[0], line = _d[1];
                return 0 < line.quantity && filterFn(line);
            })
                .map(function (_c) {
                var _d = __read(_c, 2), orderLineId = _d[0], line = _d[1];
                return ({
                    orderLineId: orderLineId,
                    quantity: line.quantity,
                });
            });
        };
        return RefundOrderDialogComponent;
    }());
    RefundOrderDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-refund-order-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.refund-and-cancel-order' | translate }}</ng-template>\n\n<div class=\"refund-wrapper\">\n    <div class=\"order-table\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.unit-price' | translate }}</th>\n                    <th>{{ 'order.prorated-unit-price' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.refund' | translate }}</th>\n                    <th>{{ 'order.cancel' | translate }}</th>\n                </tr>\n            </thead>\n            <tr *ngFor=\"let line of order.lines\" class=\"order-line\">\n                <td class=\"align-middle thumb\">\n                    <img [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">\n                    {{ line.quantity }}\n                    <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                </td>\n                <td class=\"align-middle quantity\">\n                    {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                </td>\n                <td class=\"align-middle quantity\">\n                    <div class=\"prorated-wrapper\">\n                        {{ line.proratedUnitPriceWithTax | localeCurrency: order.currencyCode }}\n                        <ng-container *ngIf=\"line.discounts as discounts\">\n                            <vdr-dropdown *ngIf=\"discounts.length\">\n                                <div class=\"promotions-label\" vdrDropdownTrigger>\n                                    <button class=\"icon-button\"><clr-icon shape=\"info\"></clr-icon></button>\n                                </div>\n                                <vdr-dropdown-menu>\n                                    <div class=\"line-promotion\" *ngFor=\"let discount of discounts\">\n                                        {{ discount.description }}\n                                        <div class=\"promotion-amount\">\n                                            {{\n                                                discount.amount / 100 / line.quantity\n                                                    | number: '1.0-2'\n                                                    | currency: order.currencyCode\n                                            }}\n                                        </div>\n                                    </div>\n                                </vdr-dropdown-menu>\n                            </vdr-dropdown>\n                        </ng-container>\n                    </div>\n                </td>\n                <td class=\"align-middle quantity-col\">\n                    <input\n                        *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                        [(ngModel)]=\"lineQuantities[line.id].quantity\"\n                        type=\"number\"\n                        [max]=\"line.quantity\"\n                        min=\"0\"\n                        (input)=\"handleZeroQuantity(lineQuantities[line.id])\"\n                    />\n                </td>\n                <td class=\"align-middle\">\n                    <div class=\"cancel-checkbox-wrapper\">\n                        <input\n                            type=\"checkbox\"\n                            *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                            clrCheckbox\n                            [disabled]=\"0 === lineQuantities[line.id].quantity\"\n                            [(ngModel)]=\"lineQuantities[line.id].refund\"\n                        />\n                    </div>\n                </td>\n                <td class=\"align-middle\">\n                    <div class=\"cancel-checkbox-wrapper\">\n                        <input\n                            type=\"checkbox\"\n                            *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                            clrCheckbox\n                            [disabled]=\"0 === lineQuantities[line.id].quantity\"\n                            [(ngModel)]=\"lineQuantities[line.id].cancel\"\n                        />\n                    </div>\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"refund-details mt4\" [class.faded]=\"!isRefunding() && !isCancelling()\">\n        <div>\n            <label class=\"clr-control-label\">{{ 'order.refund-cancellation-reason' | translate }}</label>\n            <ng-select\n                [disabled]=\"!isRefunding() && !isCancelling()\"\n                [items]=\"reasons\"\n                bindLabel=\"name\"\n                autofocus\n                [placeholder]=\"'order.refund-cancellation-reason-required' | translate\"\n                bindValue=\"id\"\n                [addTag]=\"true\"\n                [(ngModel)]=\"reason\"\n            ></ng-select>\n        </div>\n\n        <div>\n            <clr-select-container>\n                <label>{{ 'order.payment-to-refund' | translate }}</label>\n                <select clrSelect name=\"options\" [(ngModel)]=\"selectedPayment\" [disabled]=\"!isRefunding()\">\n                    <option\n                        *ngFor=\"let payment of settledPayments\"\n                        [ngValue]=\"payment\"\n                        [disabled]=\"payment.state !== 'Settled'\"\n                    >\n                        #{{ payment.id }} {{ payment.method }}:\n                        {{ payment.amount | localeCurrency: order.currencyCode }}\n                    </option>\n                </select>\n            </clr-select-container>\n\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"refundShipping\" [disabled]=\"!isRefunding()\" />\n                <label>\n                    {{ 'order.refund-shipping' | translate }} ({{\n                        order.shippingWithTax | localeCurrency: order.currencyCode\n                    }})\n                </label>\n            </clr-checkbox-wrapper>\n            <clr-input-container>\n                <label>{{ 'order.refund-adjustment' | translate }}</label>\n                <vdr-currency-input\n                    clrInput\n                    [disabled]=\"!isRefunding()\"\n                    [currencyCode]=\"order.currencyCode\"\n                    [(ngModel)]=\"adjustment\"\n                ></vdr-currency-input>\n            </clr-input-container>\n            <div class=\"totals\" [class.disabled]=\"!isRefunding()\">\n                <div class=\"order-total\">\n                    {{ 'order.payment-amount' | translate }}:\n                    {{ selectedPayment.amount | localeCurrency: order.currencyCode }}\n                </div>\n                <div class=\"refund-total\">\n                    {{ 'order.refund-total' | translate }}:\n                    {{ refundTotal | localeCurrency: order.currencyCode }}\n                </div>\n                <div class=\"refund-total-error\" *ngIf=\"refundTotal < 0 || settledPaymentsTotal < refundTotal\">\n                    {{\n                        'order.refund-total-error'\n                            | translate\n                                : {\n                                      min: 0 | currency: order.currencyCode,\n                                      max: settledPaymentsTotal | localeCurrency: order.currencyCode\n                                  }\n                    }}\n                </div>\n                <div class=\"refund-total-warning\" *ngIf=\"selectedPayment.amount < refundTotal\">\n                    {{ 'order.refund-total-warning' | translate }}\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" [disabled]=\"!canSubmit()\" class=\"btn btn-primary\">\n        <ng-container *ngIf=\"isRefunding(); else cancelling\">\n            {{\n                'order.refund-with-amount'\n                    | translate: { amount: refundTotal | localeCurrency: order.currencyCode }\n            }}\n        </ng-container>\n        <ng-template #cancelling>\n            {{ 'order.cancel-selected-items' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:flex;min-height:64vh}.refund-wrapper{flex:1;flex-direction:column}.refund-wrapper .order-table{flex:1;overflow-y:auto}.refund-wrapper .order-table table{margin-top:0}.refund-wrapper tr.ignore{color:var(--color-grey-300)}.quantity-col{background-color:var(--color-warning-100)}.cancel-checkbox-wrapper{display:flex;align-items:center;justify-content:center}clr-checkbox-wrapper{margin-top:12px;margin-bottom:12px;display:block}.refund-details{display:flex;justify-content:space-between}.refund-details.faded{opacity:.5}.totals{margin-top:48px}.totals .refund-total{font-size:18px}.totals .refund-total-error{color:var(--color-error-500)}.totals .refund-total-warning{color:var(--color-warning-600);max-width:250px}.totals.disabled{color:var(--color-grey-300)}.prorated-wrapper{display:flex;justify-content:center}.line-promotion{display:flex;justify-content:space-between;font-size:12px;padding:3px 6px}.line-promotion .promotion-amount{margin-left:12px}\n"]
                },] }
    ];
    RefundOrderDialogComponent.ctorParameters = function () { return [
        { type: i1.I18nService }
    ]; };

    var SettleRefundDialogComponent = /** @class */ (function () {
        function SettleRefundDialogComponent() {
            this.transactionId = '';
        }
        SettleRefundDialogComponent.prototype.submit = function () {
            this.resolveWith(this.transactionId);
        };
        SettleRefundDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return SettleRefundDialogComponent;
    }());
    SettleRefundDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-settle-refund-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.settle-refund' | translate }}</ng-template>\n<p class=\"instruction\">\n    {{ 'order.settle-refund-manual-instructions' | translate: { method: refund.method } }}\n</p>\n<clr-input-container>\n    <label>{{ 'order.transaction-id' | translate }}</label>\n    <input clrInput name=\"transactionId\" [(ngModel)]=\"transactionId\" />\n</clr-input-container>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"!transactionId\" class=\"btn btn-primary\">\n        {{ 'order.settle-refund' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{padding-bottom:32px}.instruction{margin-top:0;margin-bottom:24px}\n"]
                },] }
    ];

    var OrderDetailComponent = /** @class */ (function (_super) {
        __extends(OrderDetailComponent, _super);
        function OrderDetailComponent(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.orderTransitionService = orderTransitionService;
            _this.detailForm = new forms.FormGroup({});
            _this.fetchHistory = new rxjs.Subject();
            _this.defaultStates = [
                'AddingItems',
                'ArrangingPayment',
                'PaymentAuthorized',
                'PaymentSettled',
                'PartiallyShipped',
                'Shipped',
                'PartiallyDelivered',
                'Delivered',
                'Cancelled',
                'Modifying',
                'ArrangingAdditionalPayment',
            ];
            return _this;
        }
        OrderDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.entity$.pipe(operators.take(1)).subscribe(function (order) {
                if (order.state === 'Modifying') {
                    _this.router.navigate(['./', 'modify'], { relativeTo: _this.route });
                }
            });
            this.customFields = this.getCustomFieldConfig('Order');
            this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
            this.history$ = this.fetchHistory.pipe(operators.startWith(null), operators.switchMap(function () {
                return _this.dataService.order
                    .getOrderHistory(_this.id, {
                    sort: {
                        createdAt: i1.SortOrder.DESC,
                    },
                })
                    .mapStream(function (data) { var _a; return (_a = data.order) === null || _a === void 0 ? void 0 : _a.history.items; });
            }));
            this.nextStates$ = this.entity$.pipe(operators.map(function (order) {
                var isInCustomState = !_this.defaultStates.includes(order.state);
                return isInCustomState
                    ? order.nextStates
                    : order.nextStates.filter(function (s) { return !_this.defaultStates.includes(s); });
            }));
        };
        OrderDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        OrderDetailComponent.prototype.openStateDiagram = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.switchMap(function (order) { return _this.modalService.fromComponent(OrderProcessGraphDialogComponent, {
                closable: true,
                locals: {
                    activeState: order.state,
                },
            }); }))
                .subscribe();
        };
        OrderDetailComponent.prototype.transitionToState = function (state) {
            var _this = this;
            this.dataService.order.transitionToState(this.id, state).subscribe(function (_d) {
                var transitionOrderToState = _d.transitionOrderToState;
                switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                    case 'Order':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('order.transitioned-to-state-success'), { state: state });
                        _this.fetchHistory.next();
                        break;
                    case 'OrderStateTransitionError':
                        _this.notificationService.error(transitionOrderToState.transitionError);
                }
            });
        };
        OrderDetailComponent.prototype.manuallyTransitionToState = function (order) {
            this.orderTransitionService
                .manuallyTransitionToState({
                orderId: order.id,
                nextStates: order.nextStates,
                cancellable: true,
                message: ngxTranslateExtractMarker.marker('order.manually-transition-to-state-message'),
                retry: 0,
            })
                .subscribe();
        };
        OrderDetailComponent.prototype.transitionToModifying = function () {
            var _this = this;
            this.dataService.order
                .transitionToState(this.id, 'Modifying')
                .subscribe(function (_d) {
                var transitionOrderToState = _d.transitionOrderToState;
                switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                    case 'Order':
                        _this.router.navigate(['./modify'], { relativeTo: _this.route });
                        break;
                    case 'OrderStateTransitionError':
                        _this.notificationService.error(transitionOrderToState.transitionError);
                }
            });
        };
        OrderDetailComponent.prototype.updateCustomFields = function (customFieldsValue) {
            var _this = this;
            this.dataService.order
                .updateOrderCustomFields({
                id: this.id,
                customFields: customFieldsValue,
            })
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Order' });
            });
        };
        OrderDetailComponent.prototype.getOrderAddressLines = function (orderAddress) {
            if (!orderAddress) {
                return [];
            }
            return Object.values(orderAddress)
                .filter(function (val) { return val !== 'OrderAddress'; })
                .filter(function (line) { return !!line; });
        };
        OrderDetailComponent.prototype.settlePayment = function (payment) {
            var _this = this;
            this.dataService.order.settlePayment(payment.id).subscribe(function (_d) {
                var settlePayment = _d.settlePayment;
                switch (settlePayment.__typename) {
                    case 'Payment':
                        if (settlePayment.state === 'Settled') {
                            _this.notificationService.success(ngxTranslateExtractMarker.marker('order.settle-payment-success'));
                        }
                        else {
                            _this.notificationService.error(ngxTranslateExtractMarker.marker('order.settle-payment-error'));
                        }
                        _this.dataService.order.getOrder(_this.id).single$.subscribe();
                        _this.fetchHistory.next();
                        break;
                    case 'OrderStateTransitionError':
                    case 'PaymentStateTransitionError':
                    case 'SettlePaymentError':
                        _this.notificationService.error(settlePayment.message);
                }
            });
        };
        OrderDetailComponent.prototype.transitionPaymentState = function (_d) {
            var _this = this;
            var payment = _d.payment, state = _d.state;
            if (state === 'Cancelled') {
                this.dataService.order.cancelPayment(payment.id).subscribe(function (_d) {
                    var cancelPayment = _d.cancelPayment;
                    switch (cancelPayment.__typename) {
                        case 'Payment':
                            _this.notificationService.success(ngxTranslateExtractMarker.marker('order.transitioned-payment-to-state-success'), {
                                state: state,
                            });
                            _this.dataService.order.getOrder(_this.id).single$.subscribe();
                            _this.fetchHistory.next();
                            break;
                        case 'PaymentStateTransitionError':
                            _this.notificationService.error(cancelPayment.transitionError);
                            break;
                        case 'CancelPaymentError':
                            _this.notificationService.error(cancelPayment.paymentErrorMessage);
                            break;
                    }
                });
            }
            else {
                this.dataService.order
                    .transitionPaymentToState(payment.id, state)
                    .subscribe(function (_d) {
                    var transitionPaymentToState = _d.transitionPaymentToState;
                    switch (transitionPaymentToState.__typename) {
                        case 'Payment':
                            _this.notificationService.success(ngxTranslateExtractMarker.marker('order.transitioned-payment-to-state-success'), {
                                state: state,
                            });
                            _this.dataService.order.getOrder(_this.id).single$.subscribe();
                            _this.fetchHistory.next();
                            break;
                        case 'PaymentStateTransitionError':
                            _this.notificationService.error(transitionPaymentToState.message);
                            break;
                    }
                });
            }
        };
        OrderDetailComponent.prototype.canAddFulfillment = function (order) {
            var e_1, _d;
            var _a;
            var allFulfillmentSummaryRows = ((_a = order.fulfillments) !== null && _a !== void 0 ? _a : []).reduce(function (all, fulfillment) { return __spreadArray(__spreadArray([], __read(all)), __read(fulfillment.summary)); }, []);
            var allItemsFulfilled = true;
            var _loop_1 = function (line) {
                var totalFulfilledCount = allFulfillmentSummaryRows
                    .filter(function (row) { return row.orderLine.id === line.id; })
                    .reduce(function (sum, row) { return sum + row.quantity; }, 0);
                if (totalFulfilledCount < line.quantity) {
                    allItemsFulfilled = false;
                }
            };
            try {
                for (var _e = __values(order.lines), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var line = _f.value;
                    _loop_1(line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return (!allItemsFulfilled &&
                !this.hasUnsettledModifications(order) &&
                this.outstandingPaymentAmount(order) === 0 &&
                (order.nextStates.includes('Shipped') ||
                    order.nextStates.includes('PartiallyShipped') ||
                    order.nextStates.includes('Delivered')));
        };
        OrderDetailComponent.prototype.hasUnsettledModifications = function (order) {
            return 0 < order.modifications.filter(function (m) { return !m.isSettled; }).length;
        };
        OrderDetailComponent.prototype.getOutstandingModificationAmount = function (order) {
            return sharedUtils.summate(order.modifications.filter(function (m) { return !m.isSettled; }), 'priceChange');
        };
        OrderDetailComponent.prototype.outstandingPaymentAmount = function (order) {
            var e_2, _d;
            var _a, _b, _c;
            var paymentIsValid = function (p) { return p.state !== 'Cancelled' && p.state !== 'Declined' && p.state !== 'Error'; };
            var amountCovered = 0;
            try {
                for (var _e = __values((_b = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(paymentIsValid)) !== null && _b !== void 0 ? _b : []), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var payment = _f.value;
                    var refunds = (_c = payment.refunds.filter(function (r) { return r.state !== 'Failed'; })) !== null && _c !== void 0 ? _c : [];
                    var refundsTotal = sharedUtils.summate(refunds, 'total');
                    amountCovered += payment.amount - refundsTotal;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return order.totalWithTax - amountCovered;
        };
        OrderDetailComponent.prototype.addManualPayment = function (order) {
            var _this = this;
            var priorState = order.state;
            this.modalService
                .fromComponent(AddManualPaymentDialogComponent, {
                closable: true,
                locals: {
                    outstandingAmount: this.outstandingPaymentAmount(order),
                    currencyCode: order.currencyCode,
                },
            })
                .pipe(operators.switchMap(function (result) {
                if (result) {
                    return _this.dataService.order.addManualPaymentToOrder({
                        orderId: _this.id,
                        transactionId: result.transactionId,
                        method: result.method,
                        metadata: result.metadata || {},
                    });
                }
                else {
                    return rxjs.EMPTY;
                }
            }), operators.switchMap(function (_d) {
                var addManualPaymentToOrder = _d.addManualPaymentToOrder;
                switch (addManualPaymentToOrder.__typename) {
                    case 'Order':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('order.add-payment-to-order-success'));
                        if (priorState === 'ArrangingAdditionalPayment') {
                            return _this.orderTransitionService.transitionToPreModifyingState(order.id, order.nextStates);
                        }
                        else {
                            return _this.dataService.order
                                .transitionToState(_this.id, 'PaymentSettled')
                                .pipe(operators.mapTo('PaymentSettled'));
                        }
                    case 'ManualPaymentStateError':
                        _this.notificationService.error(addManualPaymentToOrder.message);
                        return rxjs.EMPTY;
                    default:
                        return rxjs.EMPTY;
                }
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.refetchOrder({ result: result });
                }
            });
        };
        OrderDetailComponent.prototype.fulfillOrder = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.switchMap(function (order) {
                return _this.modalService.fromComponent(FulfillOrderDialogComponent, {
                    size: 'xl',
                    locals: {
                        order: order,
                    },
                });
            }), operators.switchMap(function (input) {
                if (input) {
                    return _this.dataService.order.createFulfillment(input);
                }
                else {
                    return rxjs.of(undefined);
                }
            }), operators.switchMap(function (result) { return _this.refetchOrder(result).pipe(operators.mapTo(result)); }))
                .subscribe(function (result) {
                if (result) {
                    var addFulfillmentToOrder = result.addFulfillmentToOrder;
                    switch (addFulfillmentToOrder.__typename) {
                        case 'Fulfillment':
                            _this.notificationService.success(ngxTranslateExtractMarker.marker('order.create-fulfillment-success'));
                            break;
                        case 'EmptyOrderLineSelectionError':
                        case 'InsufficientStockOnHandError':
                        case 'ItemsAlreadyFulfilledError':
                        case 'InvalidFulfillmentHandlerError':
                            _this.notificationService.error(addFulfillmentToOrder.message);
                            break;
                        case 'FulfillmentStateTransitionError':
                            _this.notificationService.error(addFulfillmentToOrder.transitionError);
                            break;
                        case 'CreateFulfillmentError':
                            _this.notificationService.error(addFulfillmentToOrder.fulfillmentHandlerError);
                            break;
                        case undefined:
                            _this.notificationService.error(JSON.stringify(addFulfillmentToOrder));
                            break;
                        default:
                            sharedUtils.assertNever(addFulfillmentToOrder);
                    }
                }
            });
        };
        OrderDetailComponent.prototype.transitionFulfillment = function (id, state) {
            var _this = this;
            this.dataService.order
                .transitionFulfillmentToState(id, state)
                .pipe(operators.switchMap(function (result) { return _this.refetchOrder(result); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('order.successfully-updated-fulfillment'));
            });
        };
        OrderDetailComponent.prototype.cancelOrRefund = function (order) {
            var isRefundable = this.orderHasSettledPayments(order);
            if (order.state === 'PaymentAuthorized' || order.active === true || !isRefundable) {
                this.cancelOrder(order);
            }
            else {
                this.refundOrder(order);
            }
        };
        OrderDetailComponent.prototype.settleRefund = function (refund) {
            var _this = this;
            this.modalService
                .fromComponent(SettleRefundDialogComponent, {
                size: 'md',
                locals: {
                    refund: refund,
                },
            })
                .pipe(operators.switchMap(function (transactionId) {
                if (transactionId) {
                    return _this.dataService.order.settleRefund({
                        transactionId: transactionId,
                        id: refund.id,
                    }, _this.id);
                }
                else {
                    return rxjs.of(undefined);
                }
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('order.settle-refund-success'));
                }
            });
        };
        OrderDetailComponent.prototype.addNote = function (event) {
            var _this = this;
            var note = event.note, isPublic = event.isPublic;
            this.dataService.order
                .addNoteToOrder({
                id: this.id,
                note: note,
                isPublic: isPublic,
            })
                .pipe(operators.switchMap(function (result) { return _this.refetchOrder(result); }))
                .subscribe(function (result) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Note',
                });
            });
        };
        OrderDetailComponent.prototype.updateNote = function (entry) {
            var _this = this;
            this.modalService
                .fromComponent(i1.EditNoteDialogComponent, {
                closable: true,
                locals: {
                    displayPrivacyControls: true,
                    note: entry.data.note,
                    noteIsPrivate: !entry.isPublic,
                },
            })
                .pipe(operators.switchMap(function (result) {
                if (result) {
                    return _this.dataService.order.updateOrderNote({
                        noteId: entry.id,
                        isPublic: !result.isPrivate,
                        note: result.note,
                    });
                }
                else {
                    return rxjs.EMPTY;
                }
            }))
                .subscribe(function (result) {
                _this.fetchHistory.next();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Note',
                });
            });
        };
        OrderDetailComponent.prototype.deleteNote = function (entry) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('common.confirm-delete-note'),
                body: entry.data.note,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.order.deleteOrderNote(entry.id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.fetchHistory.next();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Note',
                });
            });
        };
        OrderDetailComponent.prototype.orderHasSettledPayments = function (order) {
            var _a;
            return !!((_a = order.payments) === null || _a === void 0 ? void 0 : _a.find(function (p) { return p.state === 'Settled'; }));
        };
        OrderDetailComponent.prototype.cancelOrder = function (order) {
            var _this = this;
            this.modalService
                .fromComponent(CancelOrderDialogComponent, {
                size: 'xl',
                locals: {
                    order: order,
                },
            })
                .pipe(operators.switchMap(function (input) {
                if (input) {
                    return _this.dataService.order.cancelOrder(input);
                }
                else {
                    return rxjs.of(undefined);
                }
            }), operators.switchMap(function (result) { return _this.refetchOrder(result); }))
                .subscribe(function (result) {
                if (result) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('order.cancelled-order-success'));
                }
            });
        };
        OrderDetailComponent.prototype.refundOrder = function (order) {
            var _this = this;
            this.modalService
                .fromComponent(RefundOrderDialogComponent, {
                size: 'xl',
                locals: {
                    order: order,
                },
            })
                .pipe(operators.switchMap(function (input) {
                var _a;
                if (!input) {
                    return rxjs.of(undefined);
                }
                if ((_a = input.cancel.lines) === null || _a === void 0 ? void 0 : _a.length) {
                    return _this.dataService.order.cancelOrder(input.cancel).pipe(operators.map(function (res) {
                        var result = res.cancelOrder;
                        switch (result.__typename) {
                            case 'Order':
                                _this.refetchOrder(result).subscribe();
                                _this.notificationService.success(ngxTranslateExtractMarker.marker('order.cancelled-order-success'));
                                return input;
                            case 'CancelActiveOrderError':
                            case 'QuantityTooGreatError':
                            case 'MultipleOrderError':
                            case 'OrderStateTransitionError':
                            case 'EmptyOrderLineSelectionError':
                                _this.notificationService.error(result.message);
                                return undefined;
                        }
                    }));
                }
                else {
                    return [input];
                }
            }), operators.switchMap(function (input) {
                if (!input) {
                    return rxjs.of(undefined);
                }
                if (input.refund.lines.length) {
                    return _this.dataService.order
                        .refundOrder(input.refund)
                        .pipe(operators.map(function (res) { return res.refundOrder; }));
                }
                else {
                    return [undefined];
                }
            }))
                .subscribe(function (result) {
                if (result) {
                    switch (result.__typename) {
                        case 'Refund':
                            _this.refetchOrder(result).subscribe();
                            if (result.state === 'Failed') {
                                _this.notificationService.error(ngxTranslateExtractMarker.marker('order.refund-order-failed'));
                            }
                            else {
                                _this.notificationService.success(ngxTranslateExtractMarker.marker('order.refund-order-success'));
                            }
                            break;
                        case 'AlreadyRefundedError':
                        case 'NothingToRefundError':
                        case 'PaymentOrderMismatchError':
                        case 'RefundOrderStateError':
                        case 'RefundStateTransitionError':
                            _this.notificationService.error(result.message);
                            break;
                    }
                }
            });
        };
        OrderDetailComponent.prototype.refetchOrder = function (result) {
            this.fetchHistory.next();
            if (result) {
                return this.dataService.order.getOrder(this.id).single$;
            }
            else {
                return rxjs.of(undefined);
            }
        };
        OrderDetailComponent.prototype.setFormValues = function (entity) {
            // empty
        };
        return OrderDetailComponent;
    }(i1.BaseDetailComponent));
    OrderDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-detail',
                    template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\">\n                <button\n                    class=\"icon-button\"\n                    (click)=\"openStateDiagram()\"\n                    [title]=\"'order.order-state-diagram' | translate\"\n                >\n                    <clr-icon shape=\"list\"></clr-icon>\n                </button>\n            </vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"\n                (order.state === 'ArrangingPayment' || order.state === 'ArrangingAdditionalPayment') &&\n                (hasUnsettledModifications(order) || 0 < outstandingPaymentAmount(order))\n            \"\n            (click)=\"addManualPayment(order)\"\n        >\n            {{ 'order.add-payment-to-order' | translate }}\n            ({{ outstandingPaymentAmount(order) | localeCurrency: order.currencyCode }})\n        </button>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"\n                order.active === false &&\n                order.state !== 'ArrangingAdditionalPayment' &&\n                order.state !== 'ArrangingPayment' &&\n                0 < outstandingPaymentAmount(order)\n            \"\n            (click)=\"transitionToState('ArrangingAdditionalPayment')\"\n        >\n            {{ 'order.arrange-additional-payment' | translate }}\n        </button>\n        <button class=\"btn btn-primary\" (click)=\"fulfillOrder()\" [disabled]=\"!canAddFulfillment(order)\">\n            {{ 'order.fulfill-order' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngIf=\"order.nextStates.includes('Modifying')\">\n                    <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"transitionToModifying()\">\n                        <clr-icon shape=\"pencil\"></clr-icon>\n                        {{ 'order.modify-order' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                </ng-container>\n                <button\n                    type=\"button\"\n                    class=\"btn\"\n                    vdrDropdownItem\n                    *ngIf=\"order.nextStates.includes('Cancelled')\"\n                    (click)=\"cancelOrRefund(order)\"\n                >\n                    <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                    <ng-container *ngIf=\"orderHasSettledPayments(order); else cancelOnly\">\n                        {{ 'order.refund-and-cancel-order' | translate }}\n                    </ng-container>\n                    <ng-template #cancelOnly>\n                        {{ 'order.cancel-order' | translate }}\n                    </ng-template>\n                </button>\n\n                <ng-container *ngIf=\"(nextStates$ | async)?.length\">\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        *ngFor=\"let nextState of nextStates$ | async\"\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionToState(nextState)\"\n                    >\n                        <clr-icon shape=\"step-forward-2\"></clr-icon>\n                        {{\n                            'order.transition-to-state'\n                                | translate: { state: (nextState | stateI18nToken | translate) }\n                        }}\n                    </button>\n                </ng-container>\n                <div class=\"dropdown-divider\"></div>\n                <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"manuallyTransitionToState(order)\">\n                    <clr-icon shape=\"step-forward-2\" class=\"is-warning\"></clr-icon>\n                    {{ 'order.manually-transition-to-state' | translate }}\n                </button>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <vdr-order-table\n                [order]=\"order\"\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n            ></vdr-order-table>\n            <h4>{{ 'order.tax-summary' | translate }}</h4>\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th>{{ 'common.description' | translate }}</th>\n                        <th>{{ 'order.tax-rate' | translate }}</th>\n                        <th>{{ 'order.tax-base' | translate }}</th>\n                        <th>{{ 'order.tax-total' | translate }}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of order.taxSummary\">\n                        <td>{{ row.description }}</td>\n                        <td>{{ row.taxRate / 100 | percent }}</td>\n                        <td>{{ row.taxBase | localeCurrency: order.currencyCode }}</td>\n                        <td>{{ row.taxTotal | localeCurrency: order.currencyCode }}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <vdr-custom-detail-component-host\n                locationId=\"order-detail\"\n                [entity$]=\"entity$\"\n                [detailForm]=\"detailForm\"\n            ></vdr-custom-detail-component-host>\n\n            <vdr-order-history\n                [order]=\"order\"\n                [history]=\"history$ | async\"\n                (addNote)=\"addNote($event)\"\n                (updateNote)=\"updateNote($event)\"\n                (deleteNote)=\"deleteNote($event)\"\n            ></vdr-order-history>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <vdr-order-custom-fields-card\n                [customFieldsConfig]=\"customFields\"\n                [customFieldValues]=\"order.customFields\"\n                (updateClick)=\"updateCustomFields($event)\"\n            ></vdr-order-custom-fields-card>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    {{ 'order.customer' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n                        <h6 *ngIf=\"getOrderAddressLines(order.shippingAddress).length\">\n                            {{ 'order.shipping-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.shippingAddress\"></vdr-formatted-address>\n                        <h6 *ngIf=\"getOrderAddressLines(order.billingAddress).length\">\n                            {{ 'order.billing-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.billingAddress\"></vdr-formatted-address>\n                    </div>\n                </div>\n            </div>\n            <ng-container *ngIf=\"order.payments && order.payments.length\">\n                <vdr-order-payment-card\n                    *ngFor=\"let payment of order.payments\"\n                    [currencyCode]=\"order.currencyCode\"\n                    [payment]=\"payment\"\n                    (settlePayment)=\"settlePayment($event)\"\n                    (transitionPaymentState)=\"transitionPaymentState($event)\"\n                    (settleRefund)=\"settleRefund($event)\"\n                ></vdr-order-payment-card>\n            </ng-container>\n            <ng-container *ngFor=\"let fulfillment of order.fulfillments\">\n                <vdr-fulfillment-card\n                    [fulfillment]=\"fulfillment\"\n                    [order]=\"order\"\n                    (transitionState)=\"transitionFulfillment(fulfillment.id, $event)\"\n                ></vdr-fulfillment-card>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".shipping-address{list-style-type:none;line-height:1.3em}.order-cards h6{margin-top:6px;color:var(--color-text-200)}\n"]
                },] }
    ];
    OrderDetailComponent.ctorParameters = function () { return [
        { type: i1$1.Router },
        { type: i1$1.ActivatedRoute },
        { type: i1.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i1.DataService },
        { type: i1.NotificationService },
        { type: i1.ModalService },
        { type: OrderTransitionService }
    ]; };

    exports.OrderEditResultType = void 0;
    (function (OrderEditResultType) {
        OrderEditResultType[OrderEditResultType["Refund"] = 0] = "Refund";
        OrderEditResultType[OrderEditResultType["Payment"] = 1] = "Payment";
        OrderEditResultType[OrderEditResultType["PriceUnchanged"] = 2] = "PriceUnchanged";
        OrderEditResultType[OrderEditResultType["Cancel"] = 3] = "Cancel";
    })(exports.OrderEditResultType || (exports.OrderEditResultType = {}));
    var OrderEditsPreviewDialogComponent = /** @class */ (function () {
        function OrderEditsPreviewDialogComponent() {
        }
        Object.defineProperty(OrderEditsPreviewDialogComponent.prototype, "priceDifference", {
            get: function () {
                return this.order.totalWithTax - this.originalTotalWithTax;
            },
            enumerable: false,
            configurable: true
        });
        OrderEditsPreviewDialogComponent.prototype.ngOnInit = function () {
            this.refundNote = this.modifyOrderInput.note || '';
        };
        OrderEditsPreviewDialogComponent.prototype.cancel = function () {
            this.resolveWith({
                result: exports.OrderEditResultType.Cancel,
            });
        };
        OrderEditsPreviewDialogComponent.prototype.submit = function () {
            if (0 < this.priceDifference) {
                this.resolveWith({
                    result: exports.OrderEditResultType.Payment,
                });
            }
            else if (this.priceDifference < 0) {
                this.resolveWith({
                    result: exports.OrderEditResultType.Refund,
                    // tslint:disable-next-line:no-non-null-assertion
                    refundPaymentId: this.selectedPayment.id,
                    refundNote: this.refundNote,
                });
            }
            else {
                this.resolveWith({
                    result: exports.OrderEditResultType.PriceUnchanged,
                });
            }
        };
        return OrderEditsPreviewDialogComponent;
    }());
    OrderEditsPreviewDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-edits-preview-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'order.confirm-modifications' | translate }}</ng-template>\n<vdr-order-table [order]=\"order\" [orderLineCustomFields]=\"orderLineCustomFields\"></vdr-order-table>\n\n<h4 class=\"h4\">\n    {{ 'order.modify-order-price-difference' | translate }}:\n    <strong>{{ priceDifference | localeCurrency: order.currencyCode }}</strong>\n</h4>\n<div *ngIf=\"priceDifference < 0\">\n<clr-select-container>\n    <label>{{ 'order.payment-to-refund' | translate }}</label>\n    <select clrSelect name=\"options\" [(ngModel)]=\"selectedPayment\">\n        <option\n            *ngFor=\"let payment of order.payments\"\n            [ngValue]=\"payment\"\n        >\n            #{{ payment.id }} {{ payment.method }}:\n            {{ payment.amount | localeCurrency: order.currencyCode }}\n        </option>\n    </select>\n</clr-select-container>\n    <label class=\"clr-control-label\">{{ 'order.refund-cancellation-reason' | translate }}</label>\n    <textarea [(ngModel)]=\"refundNote\" name=\"refundNote\" clrTextarea required></textarea>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"priceDifference < 0 && !selectedPayment\" class=\"btn btn-primary\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var OrderEditorComponent = /** @class */ (function (_super) {
        __extends(OrderEditorComponent, _super);
        function OrderEditorComponent(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.orderTransitionService = orderTransitionService;
            _this.detailForm = new forms.FormGroup({});
            _this.couponCodesControl = new forms.FormControl();
            _this.modifyOrderInput = {
                dryRun: true,
                orderId: '',
                addItems: [],
                adjustOrderLines: [],
                surcharges: [],
                note: '',
                updateShippingAddress: {},
                updateBillingAddress: {},
            };
            _this.note = '';
            _this.recalculateShipping = true;
            _this.addedVariants = new Map();
            return _this;
        }
        Object.defineProperty(OrderEditorComponent.prototype, "addedLines", {
            get: function () {
                var _this = this;
                var getSinglePriceValue = function (price) { return price.__typename === 'SinglePrice' ? price.value : 0; };
                return (this.modifyOrderInput.addItems || [])
                    .map(function (row) {
                    var variantInfo = _this.addedVariants.get(row.productVariantId);
                    if (variantInfo) {
                        return Object.assign(Object.assign({}, variantInfo), { price: getSinglePriceValue(variantInfo.price), priceWithTax: getSinglePriceValue(variantInfo.priceWithTax), quantity: row.quantity });
                    }
                })
                    .filter(sharedUtils.notNullOrUndefined);
            },
            enumerable: false,
            configurable: true
        });
        OrderEditorComponent.prototype.ngOnInit = function () {
            var e_1, _u;
            var _this = this;
            this.init();
            this.dataService.promotion.getPromotions();
            this.addressCustomFields = this.getCustomFieldConfig('Address');
            this.modifyOrderInput.orderId = this.route.snapshot.paramMap.get('id');
            this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
            this.entity$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (order) {
                var e_2, _u;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                if (order.couponCodes.length) {
                    _this.couponCodesControl.setValue(order.couponCodes);
                }
                _this.surchargeForm = new forms.FormGroup({
                    description: new forms.FormControl('', forms.Validators.required),
                    sku: new forms.FormControl(''),
                    price: new forms.FormControl(0, forms.Validators.required),
                    priceIncludesTax: new forms.FormControl(true),
                    taxRate: new forms.FormControl(0),
                    taxDescription: new forms.FormControl(''),
                });
                if (!_this.shippingAddressForm) {
                    _this.shippingAddressForm = new forms.FormGroup({
                        fullName: new forms.FormControl((_a = order.shippingAddress) === null || _a === void 0 ? void 0 : _a.fullName),
                        company: new forms.FormControl((_b = order.shippingAddress) === null || _b === void 0 ? void 0 : _b.company),
                        streetLine1: new forms.FormControl((_c = order.shippingAddress) === null || _c === void 0 ? void 0 : _c.streetLine1),
                        streetLine2: new forms.FormControl((_d = order.shippingAddress) === null || _d === void 0 ? void 0 : _d.streetLine2),
                        city: new forms.FormControl((_e = order.shippingAddress) === null || _e === void 0 ? void 0 : _e.city),
                        province: new forms.FormControl((_f = order.shippingAddress) === null || _f === void 0 ? void 0 : _f.province),
                        postalCode: new forms.FormControl((_g = order.shippingAddress) === null || _g === void 0 ? void 0 : _g.postalCode),
                        countryCode: new forms.FormControl((_h = order.shippingAddress) === null || _h === void 0 ? void 0 : _h.countryCode),
                        phoneNumber: new forms.FormControl((_j = order.shippingAddress) === null || _j === void 0 ? void 0 : _j.phoneNumber),
                    });
                    _this.addAddressCustomFieldsFormGroup(_this.shippingAddressForm, order.shippingAddress);
                }
                if (!_this.billingAddressForm) {
                    _this.billingAddressForm = new forms.FormGroup({
                        fullName: new forms.FormControl((_k = order.billingAddress) === null || _k === void 0 ? void 0 : _k.fullName),
                        company: new forms.FormControl((_l = order.billingAddress) === null || _l === void 0 ? void 0 : _l.company),
                        streetLine1: new forms.FormControl((_m = order.billingAddress) === null || _m === void 0 ? void 0 : _m.streetLine1),
                        streetLine2: new forms.FormControl((_o = order.billingAddress) === null || _o === void 0 ? void 0 : _o.streetLine2),
                        city: new forms.FormControl((_p = order.billingAddress) === null || _p === void 0 ? void 0 : _p.city),
                        province: new forms.FormControl((_q = order.billingAddress) === null || _q === void 0 ? void 0 : _q.province),
                        postalCode: new forms.FormControl((_r = order.billingAddress) === null || _r === void 0 ? void 0 : _r.postalCode),
                        countryCode: new forms.FormControl((_s = order.billingAddress) === null || _s === void 0 ? void 0 : _s.countryCode),
                        phoneNumber: new forms.FormControl((_t = order.billingAddress) === null || _t === void 0 ? void 0 : _t.phoneNumber),
                    });
                    _this.addAddressCustomFieldsFormGroup(_this.billingAddressForm, order.billingAddress);
                }
                _this.orderLineCustomFieldsFormArray = new forms.FormArray([]);
                var _loop_1 = function (line) {
                    var e_3, _x;
                    var formGroup = new forms.FormGroup({});
                    try {
                        for (var _y = (e_3 = void 0, __values(_this.orderLineCustomFields)), _z = _y.next(); !_z.done; _z = _y.next()) {
                            var name = _z.value.name;
                            formGroup.addControl(name, new forms.FormControl(line.customFields[name]));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_z && !_z.done && (_x = _y.return)) _x.call(_y);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    formGroup.valueChanges.pipe(operators.takeUntil(_this.destroy$)).subscribe(function (value) {
                        var modifyRow = _this.modifyOrderInput.adjustOrderLines.find(function (l) { return l.orderLineId === line.id; });
                        if (!modifyRow) {
                            modifyRow = {
                                orderLineId: line.id,
                                quantity: line.quantity,
                            };
                            _this.modifyOrderInput.adjustOrderLines.push(modifyRow);
                        }
                        if (_this.orderLineCustomFields.length) {
                            modifyRow.customFields = value;
                        }
                    });
                    _this.orderLineCustomFieldsFormArray.push(formGroup);
                };
                try {
                    for (var _v = __values(order.lines), _w = _v.next(); !_w.done; _w = _v.next()) {
                        var line = _w.value;
                        _loop_1(line);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_w && !_w.done && (_u = _v.return)) _u.call(_v);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
            this.addItemCustomFieldsFormArray = new forms.FormArray([]);
            this.addItemCustomFieldsForm = new forms.FormGroup({});
            try {
                for (var _v = __values(this.orderLineCustomFields), _w = _v.next(); !_w.done; _w = _v.next()) {
                    var customField = _w.value;
                    this.addItemCustomFieldsForm.addControl(customField.name, new forms.FormControl());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_w && !_w.done && (_u = _v.return)) _u.call(_v);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.availableCountries$ = this.dataService.settings
                .getAvailableCountries()
                .mapSingle(function (result) { return result.countries.items; })
                .pipe(operators.shareReplay(1));
            this.dataService.order
                .getOrderHistory(this.id, {
                take: 1,
                sort: {
                    createdAt: i1.SortOrder.DESC,
                },
                filter: { type: { eq: i1.HistoryEntryType.ORDER_STATE_TRANSITION } },
            })
                .single$.subscribe(function (_u) {
                var order = _u.order;
                _this.previousState = order === null || order === void 0 ? void 0 : order.history.items[0].data.from;
            });
        };
        OrderEditorComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        OrderEditorComponent.prototype.transitionToPriorState = function (order) {
            var _this = this;
            this.orderTransitionService
                .transitionToPreModifyingState(order.id, order.nextStates)
                .subscribe(function (result) {
                _this.router.navigate(['..'], { relativeTo: _this.route });
            });
        };
        OrderEditorComponent.prototype.canPreviewChanges = function () {
            var _u = this.modifyOrderInput, addItems = _u.addItems, adjustOrderLines = _u.adjustOrderLines, surcharges = _u.surcharges;
            return (!!(addItems === null || addItems === void 0 ? void 0 : addItems.length) ||
                !!(surcharges === null || surcharges === void 0 ? void 0 : surcharges.length) ||
                !!(adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.length) ||
                (this.shippingAddressForm.dirty && this.shippingAddressForm.valid) ||
                (this.billingAddressForm.dirty && this.billingAddressForm.valid) ||
                this.couponCodesControl.dirty);
        };
        OrderEditorComponent.prototype.isLineModified = function (line) {
            var _a;
            return !!((_a = this.modifyOrderInput.adjustOrderLines) === null || _a === void 0 ? void 0 : _a.find(function (l) { return l.orderLineId === line.id && l.quantity !== line.quantity; }));
        };
        OrderEditorComponent.prototype.updateLineQuantity = function (line, quantity) {
            var adjustOrderLines = this.modifyOrderInput.adjustOrderLines;
            var row = adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.find(function (l) { return l.orderLineId === line.id; });
            if (row && +quantity === line.quantity) {
                // Remove the modification if the quantity is the same as
                // the original order
                adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.splice(adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.indexOf(row), 1);
            }
            if (!row) {
                row = { orderLineId: line.id, quantity: +quantity };
                adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.push(row);
            }
            row.quantity = +quantity;
        };
        OrderEditorComponent.prototype.updateAddedItemQuantity = function (item, quantity) {
            var _a;
            var row = (_a = this.modifyOrderInput.addItems) === null || _a === void 0 ? void 0 : _a.find(function (l) { return l.productVariantId === item.productVariantId; });
            if (row) {
                row.quantity = +quantity;
            }
        };
        OrderEditorComponent.prototype.trackByProductVariantId = function (index, item) {
            return item.productVariantId;
        };
        OrderEditorComponent.prototype.getSelectedItemPrice = function (result) {
            switch (result === null || result === void 0 ? void 0 : result.priceWithTax.__typename) {
                case 'SinglePrice':
                    return result.priceWithTax.value;
                default:
                    return 0;
            }
        };
        OrderEditorComponent.prototype.addItemToOrder = function (result) {
            var e_4, _u;
            var _this = this;
            var _a, _b;
            if (!result) {
                return;
            }
            var customFields = this.orderLineCustomFields.length
                ? this.addItemCustomFieldsForm.value
                : undefined;
            var row = (_a = this.modifyOrderInput.addItems) === null || _a === void 0 ? void 0 : _a.find(function (l) { return _this.isMatchingAddItemRow(l, result, customFields); });
            if (!row) {
                row = { productVariantId: result.productVariantId, quantity: 1 };
                if (customFields) {
                    row.customFields = customFields;
                }
                (_b = this.modifyOrderInput.addItems) === null || _b === void 0 ? void 0 : _b.push(row);
            }
            else {
                row.quantity++;
            }
            if (customFields) {
                var formGroup = new forms.FormGroup({});
                try {
                    for (var _v = __values(Object.entries(customFields)), _w = _v.next(); !_w.done; _w = _v.next()) {
                        var _x = __read(_w.value, 2), key = _x[0], value = _x[1];
                        formGroup.addControl(key, new forms.FormControl(value));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_w && !_w.done && (_u = _v.return)) _u.call(_v);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                this.addItemCustomFieldsFormArray.push(formGroup);
                formGroup.valueChanges.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    if (row) {
                        row.customFields = value;
                    }
                });
            }
            this.addItemCustomFieldsForm.reset({});
            this.addItemSelectedVariant = undefined;
            this.addedVariants.set(result.productVariantId, result);
        };
        OrderEditorComponent.prototype.isMatchingAddItemRow = function (row, result, customFields) {
            return (row.productVariantId === result.productVariantId &&
                JSON.stringify(row.customFields) === JSON.stringify(customFields));
        };
        OrderEditorComponent.prototype.removeAddedItem = function (index) {
            this.modifyOrderInput.addItems.splice(index, 1);
            if (-1 < index) {
                this.addItemCustomFieldsFormArray.removeAt(index);
            }
        };
        OrderEditorComponent.prototype.getSurchargePrices = function (surcharge) {
            var priceWithTax = surcharge.priceIncludesTax
                ? surcharge.price
                : Math.round(surcharge.price * ((100 + (surcharge.taxRate || 0)) / 100));
            var price = surcharge.priceIncludesTax
                ? Math.round(surcharge.price / ((100 + (surcharge.taxRate || 0)) / 100))
                : surcharge.price;
            return {
                price: price,
                priceWithTax: priceWithTax,
            };
        };
        OrderEditorComponent.prototype.addSurcharge = function (value) {
            var _a;
            (_a = this.modifyOrderInput.surcharges) === null || _a === void 0 ? void 0 : _a.push(value);
            this.surchargeForm.reset({
                price: 0,
                priceIncludesTax: true,
                taxRate: 0,
            });
        };
        OrderEditorComponent.prototype.removeSurcharge = function (index) {
            var _a;
            (_a = this.modifyOrderInput.surcharges) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
        };
        OrderEditorComponent.prototype.previewAndModify = function (order) {
            var _this = this;
            var _a;
            var modifyOrderInput = Object.assign(Object.assign({}, this.modifyOrderInput), { adjustOrderLines: this.modifyOrderInput.adjustOrderLines.map(function (line) {
                    return i1.transformRelationCustomFieldInputs(simpleDeepClone.simpleDeepClone(line), _this.orderLineCustomFields);
                }) });
            var input = Object.assign(Object.assign(Object.assign(Object.assign({}, modifyOrderInput), (this.billingAddressForm.dirty ? { updateBillingAddress: this.billingAddressForm.value } : {})), (this.shippingAddressForm.dirty
                ? { updateShippingAddress: this.shippingAddressForm.value }
                : {})), { dryRun: true, couponCodes: this.couponCodesControl.dirty ? this.couponCodesControl.value : undefined, note: (_a = this.note) !== null && _a !== void 0 ? _a : '', options: {
                    recalculateShipping: this.recalculateShipping,
                } });
            var originalTotalWithTax = order.totalWithTax;
            this.dataService.order
                .modifyOrder(input)
                .pipe(operators.switchMap(function (_u) {
                var modifyOrder = _u.modifyOrder;
                switch (modifyOrder.__typename) {
                    case 'Order':
                        return _this.modalService.fromComponent(OrderEditsPreviewDialogComponent, {
                            size: 'xl',
                            closable: false,
                            locals: {
                                originalTotalWithTax: originalTotalWithTax,
                                order: modifyOrder,
                                orderLineCustomFields: _this.orderLineCustomFields,
                                modifyOrderInput: input,
                            },
                        });
                    case 'InsufficientStockError':
                    case 'NegativeQuantityError':
                    case 'NoChangesSpecifiedError':
                    case 'OrderLimitError':
                    case 'OrderModificationStateError':
                    case 'PaymentMethodMissingError':
                    case 'RefundPaymentIdMissingError':
                    case 'CouponCodeLimitError':
                    case 'CouponCodeExpiredError':
                    case 'CouponCodeInvalidError': {
                        _this.notificationService.error(modifyOrder.message);
                        return rxjs.of(false);
                    }
                    case null:
                    case undefined:
                        return rxjs.of(false);
                    default:
                        sharedUtils.assertNever(modifyOrder);
                }
            }), operators.switchMap(function (result) {
                if (!result || result.result === exports.OrderEditResultType.Cancel) {
                    // re-fetch so that the preview values get overwritten in the cache.
                    return _this.dataService.order.getOrder(_this.id).mapSingle(function () { return false; });
                }
                else {
                    // Do the modification
                    var wetRunInput = Object.assign(Object.assign({}, input), { dryRun: false });
                    if (result.result === exports.OrderEditResultType.Refund) {
                        wetRunInput.refund = {
                            paymentId: result.refundPaymentId,
                            reason: result.refundNote,
                        };
                    }
                    return _this.dataService.order.modifyOrder(wetRunInput).pipe(operators.switchMap(function (_u) {
                        var modifyOrder = _u.modifyOrder;
                        if (modifyOrder.__typename === 'Order') {
                            var priceDelta = modifyOrder.totalWithTax - originalTotalWithTax;
                            var nextState = 0 < priceDelta ? 'ArrangingAdditionalPayment' : _this.previousState;
                            return _this.dataService.order
                                .transitionToState(order.id, nextState)
                                .pipe(operators.mapTo(true));
                        }
                        else {
                            _this.notificationService.error(modifyOrder.message);
                            return rxjs.EMPTY;
                        }
                    }));
                }
            }))
                .subscribe(function (result) {
                if (result) {
                    _this.router.navigate(['../'], { relativeTo: _this.route });
                }
            });
        };
        OrderEditorComponent.prototype.addAddressCustomFieldsFormGroup = function (parentFormGroup, address) {
            var e_5, _u;
            var _a;
            if (address && this.addressCustomFields.length) {
                var addressCustomFieldsFormGroup = new forms.FormGroup({});
                try {
                    for (var _v = __values(this.addressCustomFields), _w = _v.next(); !_w.done; _w = _v.next()) {
                        var customFieldDef = _w.value;
                        var name = customFieldDef.name;
                        var value = (_a = address.customFields) === null || _a === void 0 ? void 0 : _a[name];
                        addressCustomFieldsFormGroup.addControl(name, new forms.FormControl(value));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_w && !_w.done && (_u = _v.return)) _u.call(_v);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                parentFormGroup.addControl('customFields', addressCustomFieldsFormGroup);
            }
        };
        OrderEditorComponent.prototype.setFormValues = function (entity, languageCode) {
            /* not used */
        };
        return OrderEditorComponent;
    }(i1.BaseDetailComponent));
    OrderEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-editor',
                    template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <button class=\"btn btn-secondary\" (click)=\"transitionToPriorState(order)\">\n            {{ 'order.cancel-modification' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <table class=\"order-table table\">\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th>{{ 'order.product-name' | translate }}</th>\n                        <th>{{ 'order.product-sku' | translate }}</th>\n                        <th>{{ 'order.unit-price' | translate }}</th>\n                        <th>{{ 'order.quantity' | translate }}</th>\n                        <th *ngIf=\"orderLineCustomFields.length\">{{ 'common.custom-fields' | translate }}</th>\n                        <th>{{ 'order.total' | translate }}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr\n                        *ngFor=\"let line of order.lines; let i = index\"\n                        class=\"order-line\"\n                        [class.is-cancelled]=\"line.quantity === 0\"\n                        [class.modified]=\"isLineModified(line)\"\n                    >\n                        <td class=\"align-middle thumb\">\n                            <img\n                                *ngIf=\"line.featuredAsset\"\n                                [src]=\"line.featuredAsset | assetPreview: 'tiny'\"\n                            />\n                        </td>\n                        <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                        <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                        <td class=\"align-middle unit-price\">\n                            {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ line.unitPrice | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                        <td class=\"align-middle quantity\">\n                            <input\n                                type=\"number\"\n                                min=\"0\"\n                                [value]=\"line.quantity\"\n                                (input)=\"updateLineQuantity(line, $event.target.value)\"\n                            />\n                            <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                            <vdr-line-fulfillment\n                                [line]=\"line\"\n                                [orderState]=\"order.state\"\n                            ></vdr-line-fulfillment>\n                        </td>\n                        <td *ngIf=\"orderLineCustomFields.length\" class=\"order-line-custom-field align-middle\">\n                            <vdr-tabbed-custom-fields\n                                entityName=\"OrderLine\"\n                                [customFields]=\"orderLineCustomFields\"\n                                [customFieldsFormGroup]=\"orderLineCustomFieldsFormArray.get([i])\"\n                                [compact]=\"true\"\n                            ></vdr-tabbed-custom-fields>\n                        </td>\n                        <td class=\"align-middle total\">\n                            {{ line.linePriceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ line.linePrice | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr\n                        *ngFor=\"let addedLine of addedLines; trackBy: trackByProductVariantId; let i = index\"\n                        class=\"modified\"\n                    >\n                        <td class=\"align-middle thumb\">\n                            <img\n                                *ngIf=\"addedLine.productAsset\"\n                                [src]=\"addedLine.productAsset | assetPreview: 'tiny'\"\n                            />\n                        </td>\n                        <td class=\"align-middle name\">{{ addedLine.productVariantName }}</td>\n                        <td class=\"align-middle sku\">{{ addedLine.sku }}</td>\n                        <td class=\"align-middle unit-price\">\n                            {{ addedLine.priceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ addedLine.price | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                        <td class=\"align-middle quantity\">\n                            <input\n                                type=\"number\"\n                                min=\"0\"\n                                [value]=\"addedLine.quantity\"\n                                (input)=\"updateAddedItemQuantity(addedLine, $event.target.value)\"\n                            />\n                            <button class=\"icon-button\" (click)=\"removeAddedItem(i)\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </td>\n                        <td *ngIf=\"orderLineCustomFields.length\" class=\"order-line-custom-field align-middle\">\n                            <ng-container *ngFor=\"let customField of orderLineCustomFields\">\n                                <vdr-custom-field-control\n                                    [customField]=\"customField\"\n                                    [customFieldsFormGroup]=\"addItemCustomFieldsFormArray.get([i])\"\n                                    entityName=\"OrderLine\"\n                                    [compact]=\"true\"\n                                ></vdr-custom-field-control>\n                            </ng-container>\n                        </td>\n                        <td class=\"align-middle total\">\n                            {{\n                                (addedLine.priceWithTax * addedLine.quantity) / 100\n                                    | currency: order.currencyCode\n                            }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{\n                                    (addedLine.price * addedLine.quantity) / 100\n                                        | currency: order.currencyCode\n                                }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr class=\"surcharge\" *ngFor=\"let surcharge of order.surcharges\">\n                        <td class=\"align-middle name left\" colspan=\"2\">{{ surcharge.description }}</td>\n                        <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n                        <td class=\"align-middle\"></td>\n                        <td></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"align-middle total\">\n                            {{ surcharge.priceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ surcharge.price | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr\n                        class=\"surcharge modified\"\n                        *ngFor=\"let surcharge of modifyOrderInput.surcharges; let i = index\"\n                    >\n                        <td class=\"align-middle name left\" colspan=\"2\">\n                            {{ surcharge.description }}\n                            <button class=\"icon-button\" (click)=\"removeSurcharge(i)\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </td>\n                        <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n                        <td class=\"align-middle\"></td>\n                        <td></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"align-middle total\">\n                            <ng-container *ngIf=\"getSurchargePrices(surcharge) as surchargePrice\">\n                                {{ surchargePrice.priceWithTax | localeCurrency: order.currencyCode }}\n                                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                    {{ surchargePrice.price | localeCurrency: order.currencyCode }}\n                                </div>\n                            </ng-container>\n                        </td>\n                    </tr>\n                    <tr class=\"shipping\">\n                        <td class=\"left clr-align-middle\">{{ 'order.shipping' | translate }}</td>\n                        <td class=\"clr-align-middle\">{{ order.shippingLines[0]?.shippingMethod?.name }}</td>\n                        <td colspan=\"3\"></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"clr-align-middle\">\n                            {{ order.shippingWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ order.shipping | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <h4 class=\"mb2\">{{ 'order.modifications' | translate }}</h4>\n            <clr-accordion>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.add-item-to-order' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-product-selector class=\"mb4\" (productSelected)=\"addItemSelectedVariant = $event\">\n                        </vdr-product-selector>\n                        <div *ngIf=\"addItemSelectedVariant\" class=\"flex mb4\">\n                            <img\n                                *ngIf=\"addItemSelectedVariant.productAsset as asset\"\n                                [src]=\"asset | assetPreview: 'tiny'\"\n                                class=\"mr4\"\n                            />\n                            <div>\n                                <strong class=\"mr4\">{{ addItemSelectedVariant.productVariantName }}</strong>\n                                <small>{{ addItemSelectedVariant.sku }}</small>\n                                <div>\n                                    {{\n                                        getSelectedItemPrice(addItemSelectedVariant)\n                                            | localeCurrency: order.currencyCode\n                                    }}\n                                </div>\n                            </div>\n                        </div>\n                        <ng-container *ngFor=\"let customField of orderLineCustomFields\">\n                            <vdr-custom-field-control\n                                [readonly]=\"!addItemSelectedVariant\"\n                                [customField]=\"customField\"\n                                [customFieldsFormGroup]=\"addItemCustomFieldsForm\"\n                                entityName=\"OrderLine\"\n                                [compact]=\"true\"\n                            ></vdr-custom-field-control>\n                        </ng-container>\n                        <button\n                            class=\"btn btn-secondary\"\n                            [disabled]=\"!addItemSelectedVariant || addItemCustomFieldsForm.invalid\"\n                            (click)=\"addItemToOrder(addItemSelectedVariant)\"\n                        >\n                            {{ 'order.add-item-to-order' | translate }}\n                        </button>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.set-coupon-codes' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-coupon-code-selector\n                            [control]=\"couponCodesControl\"\n                        ></vdr-coupon-code-selector>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.add-surcharge' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <form [formGroup]=\"surchargeForm\" (submit)=\"addSurcharge(surchargeForm.value)\">\n                            <vdr-form-field [label]=\"'common.description' | translate\" for=\"description\"\n                                ><input id=\"description\" type=\"text\" formControlName=\"description\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'order.product-sku' | translate\" for=\"sku\"\n                                ><input id=\"sku\" type=\"text\" formControlName=\"sku\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'common.price' | translate\" for=\"price\">\n                                <vdr-currency-input\n                                    [currencyCode]=\"order.currencyCode\"\n                                    id=\"price\"\n                                    formControlName=\"price\"\n                                ></vdr-currency-input>\n                            </vdr-form-field>\n                            <vdr-form-field\n                                [label]=\"\n                                    'catalog.price-includes-tax-at'\n                                        | translate: { rate: surchargeForm.get('taxRate')?.value }\n                                \"\n                                for=\"priceIncludesTax\"\n                                ><input\n                                    id=\"priceIncludesTax\"\n                                    type=\"checkbox\"\n                                    clrCheckbox\n                                    formControlName=\"priceIncludesTax\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'order.tax-rate' | translate\" for=\"taxRate\">\n                                <vdr-affixed-input suffix=\"%\"\n                                    ><input\n                                        id=\"taxRate\"\n                                        type=\"number\"\n                                        min=\"0\"\n                                        max=\"100\"\n                                        formControlName=\"taxRate\"\n                                /></vdr-affixed-input>\n                            </vdr-form-field>\n                            <vdr-form-field [label]=\"'order.tax-description' | translate\" for=\"taxDescription\"\n                                ><input id=\"taxDescription\" type=\"text\" formControlName=\"taxDescription\"\n                            /></vdr-form-field>\n                            <button\n                                class=\"btn btn-secondary\"\n                                [disabled]=\"\n                                    surchargeForm.invalid ||\n                                    surchargeForm.pristine ||\n                                    surchargeForm.get('price')?.value === 0\n                                \"\n                            >\n                                {{ 'order.add-surcharge' | translate }}\n                            </button>\n                        </form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.edit-shipping-address' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-address-form\n                            [formGroup]=\"shippingAddressForm\"\n                            [availableCountries]=\"availableCountries$ | async\"\n                            [customFields]=\"addressCustomFields\"\n                        ></vdr-address-form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.edit-billing-address' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-address-form\n                            [formGroup]=\"billingAddressForm\"\n                            [availableCountries]=\"availableCountries$ | async\"\n                            [customFields]=\"addressCustomFields\"\n                        ></vdr-address-form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n            </clr-accordion>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    {{ 'order.modification-summary' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <ul>\n                        <li *ngIf=\"modifyOrderInput.addItems?.length\">\n                            {{\n                                'order.modification-adding-items'\n                                    | translate: { count: modifyOrderInput.addItems?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"modifyOrderInput.adjustOrderLines?.length\">\n                            {{\n                                'order.modification-adjusting-lines'\n                                    | translate: { count: modifyOrderInput.adjustOrderLines?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"modifyOrderInput.surcharges?.length\">\n                            {{\n                                'order.modification-adding-surcharges'\n                                    | translate: { count: modifyOrderInput.surcharges?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"shippingAddressForm.dirty\">\n                            {{ 'order.modification-updating-shipping-address' | translate }}\n                        </li>\n                        <li *ngIf=\"billingAddressForm.dirty\">\n                            {{ 'order.modification-updating-billing-address' | translate }}\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"card-block\">\n                    <label class=\"clr-control-label\">{{ 'order.note' | translate }}</label>\n                    <textarea [(ngModel)]=\"note\" name=\"note\" clrTextarea required></textarea>\n                    <clr-checkbox-wrapper class=\"\">\n                        <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"recalculateShipping\" />\n                        <label>{{ 'order.modification-recalculate-shipping' | translate }}</label>\n                    </clr-checkbox-wrapper>\n                </div>\n                <div class=\"card-footer\">\n                    <button\n                        class=\"btn btn-primary\"\n                        [disabled]=\"!canPreviewChanges()\"\n                        (click)=\"previewAndModify(order)\"\n                    >\n                        {{ 'order.preview-changes' | translate }}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".order-table .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.order-table .sub-total td{border-top:1px dashed var(--color-component-border-200)}.order-table .total td{font-weight:bold;border-top:1px dashed var(--color-component-border-200)}.order-table td.custom-fields-row{border-top-style:dashed;border-top-color:var(--color-grey-200)}.order-table img{border-radius:var(--border-radius-img)}.order-table .order-line-custom-fields{display:flex;flex-wrap:wrap}.order-table .order-line-custom-fields .custom-field{text-align:start;max-width:200px;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;margin-right:18px}.order-table .draft-qty{max-width:48px}.order-table .order-line-custom-field{background-color:var(--color-component-bg-100)}.order-table .order-line-custom-field .custom-field-ellipsis{color:var(--color-text-300)}.order-table .net-price{font-size:11px;color:var(--color-text-300)}.order-table .promotions-label{-webkit-text-decoration:underline dotted var(--color-text-200);text-decoration:underline dotted var(--color-text-200);font-size:11px;margin-top:6px;cursor:pointer;text-transform:lowercase}.order-table .thumb img{width:50px;height:50px}.order-table tr.modified td{background-color:var(--color-warning-100)}.order-table .order-line-custom-field{text-align:start}\n"]
                },] }
    ];
    OrderEditorComponent.ctorParameters = function () { return [
        { type: i1$1.Router },
        { type: i1$1.ActivatedRoute },
        { type: i1.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i1.DataService },
        { type: i1.NotificationService },
        { type: i1.ModalService },
        { type: OrderTransitionService }
    ]; };

    var OrderHistoryComponent = /** @class */ (function () {
        function OrderHistoryComponent() {
            this.addNote = new i0.EventEmitter();
            this.updateNote = new i0.EventEmitter();
            this.deleteNote = new i0.EventEmitter();
            this.note = '';
            this.noteIsPrivate = true;
            this.expanded = false;
            this.type = i1.HistoryEntryType;
        }
        OrderHistoryComponent.prototype.getDisplayType = function (entry) {
            if (entry.type === i1.HistoryEntryType.ORDER_STATE_TRANSITION) {
                if (entry.data.to === 'Delivered') {
                    return 'success';
                }
                if (entry.data.to === 'Cancelled') {
                    return 'error';
                }
            }
            if (entry.type === i1.HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) {
                if (entry.data.to === 'Delivered') {
                    return 'success';
                }
            }
            if (entry.type === i1.HistoryEntryType.ORDER_PAYMENT_TRANSITION) {
                if (entry.data.to === 'Declined' || entry.data.to === 'Cancelled') {
                    return 'error';
                }
            }
            if (entry.type === i1.HistoryEntryType.ORDER_CANCELLATION) {
                return 'error';
            }
            if (entry.type === i1.HistoryEntryType.ORDER_REFUND_TRANSITION) {
                return 'warning';
            }
            return 'default';
        };
        OrderHistoryComponent.prototype.getTimelineIcon = function (entry) {
            if (entry.type === i1.HistoryEntryType.ORDER_STATE_TRANSITION) {
                if (entry.data.to === 'Delivered') {
                    return ['success-standard', 'is-solid'];
                }
                if (entry.data.to === 'Cancelled') {
                    return 'ban';
                }
            }
            if (entry.type === i1.HistoryEntryType.ORDER_PAYMENT_TRANSITION) {
                if (entry.data.to === 'Settled') {
                    return 'credit-card';
                }
            }
            if (entry.type === i1.HistoryEntryType.ORDER_NOTE) {
                return 'note';
            }
            if (entry.type === i1.HistoryEntryType.ORDER_MODIFIED) {
                return 'pencil';
            }
            if (entry.type === i1.HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) {
                if (entry.data.to === 'Shipped') {
                    return 'truck';
                }
                if (entry.data.to === 'Delivered') {
                    return 'truck';
                }
            }
        };
        OrderHistoryComponent.prototype.isFeatured = function (entry) {
            switch (entry.type) {
                case i1.HistoryEntryType.ORDER_STATE_TRANSITION: {
                    return (entry.data.to === 'Delivered' ||
                        entry.data.to === 'Cancelled' ||
                        entry.data.to === 'Settled');
                }
                case i1.HistoryEntryType.ORDER_PAYMENT_TRANSITION:
                    return entry.data.to === 'Settled' || entry.data.to === 'Cancelled';
                case i1.HistoryEntryType.ORDER_FULFILLMENT_TRANSITION:
                    return entry.data.to === 'Delivered' || entry.data.to === 'Shipped';
                case i1.HistoryEntryType.ORDER_NOTE:
                case i1.HistoryEntryType.ORDER_MODIFIED:
                    return true;
                default:
                    return false;
            }
        };
        OrderHistoryComponent.prototype.getFulfillment = function (entry) {
            if ((entry.type === i1.HistoryEntryType.ORDER_FULFILLMENT ||
                entry.type === i1.HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) &&
                this.order.fulfillments) {
                return this.order.fulfillments.find(function (f) { return f.id === entry.data.fulfillmentId; });
            }
        };
        OrderHistoryComponent.prototype.getPayment = function (entry) {
            if (entry.type === i1.HistoryEntryType.ORDER_PAYMENT_TRANSITION && this.order.payments) {
                return this.order.payments.find(function (p) { return p.id === entry.data.paymentId; });
            }
        };
        OrderHistoryComponent.prototype.getCancelledItems = function (entry) {
            var e_1, _a, e_2, _b;
            var itemMap = new Map();
            var cancelledItemIds = entry.data.orderItemIds;
            try {
                for (var _c = __values(this.order.lines), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var line = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(line.items)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var item = _f.value;
                            if (cancelledItemIds.includes(item.id)) {
                                var count = itemMap.get(line.productVariant.name);
                                if (count != null) {
                                    itemMap.set(line.productVariant.name, count + 1);
                                }
                                else {
                                    itemMap.set(line.productVariant.name, 1);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Array.from(itemMap.entries()).map(function (_a) {
                var _b = __read(_a, 2), name = _b[0], quantity = _b[1];
                return ({ name: name, quantity: quantity });
            });
        };
        OrderHistoryComponent.prototype.getModification = function (id) {
            return this.order.modifications.find(function (m) { return m.id === id; });
        };
        OrderHistoryComponent.prototype.getName = function (entry) {
            var administrator = entry.administrator;
            if (administrator) {
                return administrator.firstName + " " + administrator.lastName;
            }
            else {
                var customer = this.order.customer;
                if (customer) {
                    return customer.firstName + " " + customer.lastName;
                }
            }
            return '';
        };
        OrderHistoryComponent.prototype.addNoteToOrder = function () {
            this.addNote.emit({ note: this.note, isPublic: !this.noteIsPrivate });
            this.note = '';
            this.noteIsPrivate = true;
        };
        return OrderHistoryComponent;
    }());
    OrderHistoryComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-history',
                    template: "<h4>{{ 'order.order-history' | translate }}</h4>\n<div class=\"entry-list\" [class.expanded]=\"expanded\">\n    <vdr-timeline-entry iconShape=\"note\" displayType=\"muted\" [featured]=\"true\">\n        <div class=\"note-entry\">\n            <textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n            <button class=\"btn btn-secondary\" [disabled]=\"!note\" (click)=\"addNoteToOrder()\">\n                {{ 'common.add-note' | translate }}\n            </button>\n        </div>\n        <div class=\"visibility-select\">\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"noteIsPrivate\" />\n                <label>{{ 'order.note-is-private' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <span *ngIf=\"noteIsPrivate\" class=\"private\">\n                {{ 'order.note-only-visible-to-administrators' | translate }}\n            </span>\n            <span *ngIf=\"!noteIsPrivate\" class=\"public\">\n                {{ 'order.note-visible-to-customer' | translate }}\n            </span>\n        </div>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry\n        *ngFor=\"let entry of history\"\n        [displayType]=\"getDisplayType(entry)\"\n        [iconShape]=\"getTimelineIcon(entry)\"\n        [createdAt]=\"entry.createdAt\"\n        [name]=\"getName(entry)\"\n        [featured]=\"isFeatured(entry)\"\n        [collapsed]=\"!expanded && !isFeatured(entry)\"\n        (expandClick)=\"expanded = !expanded\"\n    >\n        <ng-container [ngSwitch]=\"entry.type\">\n            <ng-container *ngSwitchCase=\"type.ORDER_STATE_TRANSITION\">\n                <div class=\"title\" *ngIf=\"entry.data.to === 'Delivered'\">\n                    {{ 'order.history-order-fulfilled' | translate }}\n                </div>\n                <div class=\"title\" *ngIf=\"entry.data.to === 'Cancelled'\">\n                    {{ 'order.history-order-cancelled' | translate }}\n                </div>\n                <ng-template [ngIf]=\"entry.data.to !== 'Cancelled' && entry.data.to !== 'Delivered'\">\n                    {{\n                        'order.history-order-transition'\n                            | translate: { from: entry.data.from, to: entry.data.to }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_MODIFIED\">\n                <div class=\"title\">\n                    {{ 'order.history-order-modified' | translate }}\n                </div>\n                <ng-container *ngIf=\"getModification(entry.data.modificationId) as modification\">\n                    {{ 'order.modify-order-price-difference' | translate }}:\n                    <strong>{{ modification.priceChange | localeCurrency: order.currencyCode }}</strong>\n                    <vdr-chip colorType=\"success\" *ngIf=\"modification.isSettled\">{{\n                        'order.modification-settled' | translate\n                    }}</vdr-chip>\n                    <vdr-chip colorType=\"error\" *ngIf=\"!modification.isSettled\">{{\n                        'order.modification-not-settled' | translate\n                    }}</vdr-chip>\n                    <vdr-history-entry-detail>\n                        <vdr-modification-detail\n                            [order]=\"order\"\n                            [modification]=\"modification\"\n                        ></vdr-modification-detail>\n                    </vdr-history-entry-detail>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_PAYMENT_TRANSITION\">\n                <ng-container *ngIf=\"entry.data.to === 'Settled'; else regularPaymentTransition\">\n                    <div class=\"title\">\n                        {{ 'order.history-payment-settled' | translate }}\n                    </div>\n                    {{ 'order.transaction-id' | translate }}: {{ getPayment(entry)?.transactionId }}\n                    <vdr-history-entry-detail *ngIf=\"getPayment(entry) as payment\">\n                        <vdr-payment-detail\n                            [payment]=\"payment\"\n                            [currencyCode]=\"order.currencyCode\"\n                        ></vdr-payment-detail>\n                    </vdr-history-entry-detail>\n                </ng-container>\n                <ng-template #regularPaymentTransition>\n                    {{\n                        'order.history-payment-transition'\n                            | translate\n                                : {\n                                      from: entry.data.from,\n                                      to: entry.data.to,\n                                      id: getPayment(entry)?.transactionId\n                                  }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_REFUND_TRANSITION\">\n                {{\n                    'order.history-refund-transition'\n                        | translate: { from: entry.data.from, to: entry.data.to, id: entry.data.refundId }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_CANCELLATION\">\n                {{ 'order.history-items-cancelled' | translate: { count: entry.data.orderItemIds.length } }}\n                <vdr-history-entry-detail *ngIf=\"getCancelledItems(entry) as items\">\n                    <vdr-labeled-data [label]=\"'order.cancellation-reason' | translate\">\n                        {{ entry.data.reason }}\n                    </vdr-labeled-data>\n                    <vdr-labeled-data [label]=\"'order.contents' | translate\">\n                        <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n                    </vdr-labeled-data>\n                    <vdr-labeled-data [label]=\"'order.shipping-cancelled' | translate\">\n                        {{ entry.data.shippingCancelled }}\n                    </vdr-labeled-data>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_FULFILLMENT\">\n                {{ 'order.history-fulfillment-created' | translate }}\n                <vdr-history-entry-detail *ngIf=\"getFulfillment(entry) as fulfillment\">\n                    <vdr-fulfillment-detail\n                        [fulfillmentId]=\"fulfillment.id\"\n                        [order]=\"order\"\n                    ></vdr-fulfillment-detail>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_FULFILLMENT_TRANSITION\">\n                <ng-container *ngIf=\"entry.data.to === 'Delivered'\">\n                    <div class=\"title\">\n                        {{ 'order.history-fulfillment-delivered' | translate }}\n                    </div>\n                    {{ 'order.tracking-code' | translate }}: {{ getFulfillment(entry)?.trackingCode }}\n                </ng-container>\n                <ng-container *ngIf=\"entry.data.to === 'Shipped'\">\n                    <div class=\"title\">\n                        {{ 'order.history-fulfillment-shipped' | translate }}\n                    </div>\n                    {{ 'order.tracking-code' | translate }}: {{ getFulfillment(entry)?.trackingCode }}\n                </ng-container>\n                <ng-container *ngIf=\"entry.data.to !== 'Delivered' && entry.data.to !== 'Shipped'\">\n                    {{\n                        'order.history-fulfillment-transition'\n                            | translate: { from: entry.data.from, to: entry.data.to }\n                    }}\n                </ng-container>\n                <vdr-history-entry-detail *ngIf=\"getFulfillment(entry) as fulfillment\">\n                    <vdr-fulfillment-detail\n                        [fulfillmentId]=\"fulfillment.id\"\n                        [order]=\"order\"\n                    ></vdr-fulfillment-detail>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_NOTE\">\n                <div class=\"flex\">\n                    <div class=\"note-text\">\n                        <span *ngIf=\"entry.isPublic\" class=\"note-visibility public\">{{\n                            'common.public' | translate\n                        }}</span>\n                        <span *ngIf=\"!entry.isPublic\" class=\"note-visibility private\">{{\n                            'common.private' | translate\n                        }}</span>\n                        {{ entry.data.note }}\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"updateNote.emit(entry)\"\n                                [disabled]=\"!('UpdateOrder' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </button>\n                            <div class=\"dropdown-divider\"></div>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"deleteNote.emit(entry)\"\n                                [disabled]=\"!('UpdateOrder' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_COUPON_APPLIED\">\n                {{ 'order.history-coupon-code-applied' | translate }}:\n                <vdr-chip>\n                    <a [routerLink]=\"['/marketing', 'promotions', entry.data.promotionId]\">{{\n                        entry.data.couponCode\n                    }}</a>\n                </vdr-chip>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_COUPON_REMOVED\">\n                {{ 'order.history-coupon-code-removed' | translate }}:\n                <vdr-chip\n                    ><span class=\"cancelled-coupon-code\">{{ entry.data.couponCode }}</span></vdr-chip\n                >\n            </ng-container>\n        </ng-container>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry [isLast]=\"true\" [createdAt]=\"order.createdAt\" [featured]=\"true\">\n        <div class=\"title\">\n            {{ 'order.history-order-created' | translate }}\n        </div>\n    </vdr-timeline-entry>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{margin-top:48px;display:block}.entry-list{margin-top:24px;margin-left:24px;margin-right:12px}.note-entry{display:flex;align-items:center}.note-entry .note{flex:1}.note-entry button{margin:0}.visibility-select{display:flex;justify-content:space-between;align-items:baseline}.visibility-select .public{color:var(--color-warning-500)}.visibility-select .private{color:var(--color-success-500)}textarea.note{flex:1;height:36px;border-radius:3px;margin-right:6px}.note-text{color:var(--color-grey-800);white-space:pre-wrap}.cancelled-coupon-code{text-decoration:line-through}.note-visibility{text-transform:lowercase}.note-visibility.public{color:var(--color-warning-500)}.note-visibility.private{color:var(--color-success-500)}\n"]
                },] }
    ];
    OrderHistoryComponent.propDecorators = {
        order: [{ type: i0.Input }],
        history: [{ type: i0.Input }],
        addNote: [{ type: i0.Output }],
        updateNote: [{ type: i0.Output }],
        deleteNote: [{ type: i0.Output }]
    };

    var OrderListComponent = /** @class */ (function (_super_1) {
        __extends(OrderListComponent, _super_1);
        function OrderListComponent(serverConfigService, dataService, localStorageService, router, route, modalService, notificationService) {
            var _this = this;
            var _a;
            _this = _super_1.call(this, router, route) || this;
            _this.serverConfigService = serverConfigService;
            _this.dataService = dataService;
            _this.localStorageService = localStorageService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.itemList = [];
            _this.audioOn = false;
            _this.searchControl = new forms.FormControl('');
            _this.searchOrderCodeControl = new forms.FormControl('');
            _this.searchLastNameControl = new forms.FormControl('');
            _this.orderStates = _this.serverConfigService.getOrderProcessStates().map(function (item) { return item.name; });
            _this.filterPresets = [
                {
                    name: 'open',
                    label: ngxTranslateExtractMarker.marker('order.filter-preset-open'),
                    config: {
                        active: false,
                        states: _this.orderStates.filter(function (s) { return s !== 'Completed' && s !== 'Cancelled' && s !== 'Draft'; }),
                    },
                },
                {
                    name: 'completed',
                    label: ngxTranslateExtractMarker.marker('order.filter-preset-completed'),
                    config: {
                        states: ['Completed', 'Cancelled'],
                    },
                },
                {
                    name: 'active',
                    label: ngxTranslateExtractMarker.marker('order.filter-preset-active'),
                    config: {
                        active: true,
                    },
                },
                {
                    name: 'draft',
                    label: ngxTranslateExtractMarker.marker('order.filter-preset-draft'),
                    config: {
                        active: false,
                        states: ['Draft'],
                    },
                },
            ];
            _this.canCreateDraftOrder = false;
            _super_1.prototype.setQueryFn.call(_this, 
            // tslint:disable-next-line:no-shadowed-variable
            function (take, skip) { return _this.dataService.order.getOrders({ take: take, skip: skip }).refetchOnChannelChange(); }, function (data) { return data.orders; }, 
            // tslint:disable-next-line:no-shadowed-variable
            function (skip, take) { return _this.createQueryOptions(skip, take, _this.searchControl.value, _this.route.snapshot.queryParamMap.get('filter') || 'open'); });
            var lastFilters = _this.localStorageService.get('orderListLastCustomFilters');
            if (lastFilters) {
                _this.setQueryParam(lastFilters, { replaceUrl: true });
            }
            _this.canCreateDraftOrder = !!((_a = _this.serverConfigService
                .getOrderProcessStates()
                .find(function (state) { return state.name === 'Created'; })) === null || _a === void 0 ? void 0 : _a.to.includes('Draft'));
            if (!_this.canCreateDraftOrder) {
                _this.filterPresets = _this.filterPresets.filter(function (p) { return p.name !== 'draft'; });
            }
            return _this;
        }
        OrderListComponent.prototype.ngOnInit = function () {
            var _super = Object.create(null, {
                ngOnInit: { get: function () { return _super_1.prototype.ngOnInit; } }
            });
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var searchTerms$, queryParamMap;
                var _this = this;
                return __generator(this, function (_b) {
                    _super.ngOnInit.call(this);
                    this.activePreset$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.get('filter') || 'open'; }), operators.distinctUntilChanged());
                    this.dataService.settings.getActiveChannel().single$.subscribe(function (channel) {
                        _this.processingTime = channel.activeChannel['customFields']['processingTime'];
                    });
                    searchTerms$ = rxjs.merge(this.searchControl.valueChanges).pipe(operators.filter(function (value) { return 2 < value.length || value.length === 0; }), operators.debounceTime(250));
                    rxjs.merge(searchTerms$, this.route.queryParamMap)
                        .pipe(operators.takeUntil(this.destroy$))
                        .subscribe(function (val) {
                        _this.refresh();
                    });
                    queryParamMap = this.route.snapshot.queryParamMap;
                    this.customFilterForm = new forms.FormGroup({
                        states: new forms.FormControl((_a = queryParamMap.getAll('states')) !== null && _a !== void 0 ? _a : []),
                        placedAtStart: new forms.FormControl(queryParamMap.get('placedAtStart')),
                        placedAtEnd: new forms.FormControl(queryParamMap.get('placedAtEnd')),
                    });
                    this.setItemsPerPage(50); // default to 50
                    this.refreshInterval = setInterval(function () {
                        // const currentList = await this.items$.toPromise();
                        _this.refresh();
                        // const newList = await this.items$.toPromise();
                        // console.log(newList.length, currentList.length);
                    }, 15000);
                    this.audioElem = document.getElementById('audio_player');
                    this.audioElem.muted = true;
                    this.audioElem.addEventListener('play', function () {
                        _this.audioOn = true;
                        _this.audioElem.addEventListener('ended', function () {
                            _this.audioOn = true;
                            _this.audioElem.muted = false;
                        });
                    }, { once: true });
                    this.audioElem.play().then(function () {
                        _this.audioOn = true;
                    });
                    this.items$.subscribe(function (value) {
                        if (_this.itemList.length !== 0 && _this.itemList.length < value.length) {
                            _this.playAudio();
                        }
                        _this.itemList = value;
                        // console.log(previousValue?.length, currentValue?.length);
                        /** Do something */
                    });
                    return [2 /*return*/];
                });
            });
        };
        OrderListComponent.prototype.toggleAudio = function () {
            if (!this.audioOn) {
                this.audioElem.play();
            }
            else {
                this.audioOn = !this.audioOn;
                this.audioElem.muted = !this.audioOn;
            }
        };
        OrderListComponent.prototype.playAudio = function () {
            var _a;
            (_a = this.audioElem) === null || _a === void 0 ? void 0 : _a.play();
        };
        OrderListComponent.prototype.formatTime = function (date) {
            return dayjs__default['default'](date).format('hh:mm A');
        };
        OrderListComponent.prototype.formatDate = function (date) {
            return dayjs__default['default'](date).format('DD/MMM');
        };
        OrderListComponent.prototype.getNextState = function (order, buttonText) {
            if (buttonText === void 0) { buttonText = false; }
            var _a;
            var authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return p.state === 'Authorized' && p.method === 'cash'; })[0];
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
        };
        OrderListComponent.prototype.toNextState = function (order) {
            var _this = this;
            return this.modalService
                .dialog({
                title: "Proceed to " + this.getNextState(order, true) + "?",
                body: "Are you sure you want to proceed to '" + this.getNextState(order, true) + "'?",
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'primary', label: 'Confirm', returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, authorizedCashPayment, output;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!res) return [3 /*break*/, 4];
                            if (!(this.getNextState(order) === 'Completed')) return [3 /*break*/, 2];
                            authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(function (p) { return p.state === 'Authorized' && p.method === 'cash'; })[0];
                            if (!authorizedCashPayment) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.dataService.order
                                    .settlePayment(authorizedCashPayment === null || authorizedCashPayment === void 0 ? void 0 : authorizedCashPayment.id.toString())
                                    .toPromise()];
                        case 1:
                            output = _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.dataService.order
                                .transitionToState(order.id.toString(), this.getNextState(order))
                                .toPromise()];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 4: return [2 /*return*/, rxjs.EMPTY];
                    }
                });
            }); }))
                .subscribe(function () {
                _this.notificationService.success('Successfully Updated Order State');
                _this.refresh();
            }, function (err) {
                _this.notificationService.error('Error Updating Order State');
            });
        };
        OrderListComponent.prototype.selectFilterPreset = function (presetName) {
            var _a;
            var lastCustomFilters = (_a = this.localStorageService.get('orderListLastCustomFilters')) !== null && _a !== void 0 ? _a : {};
            var emptyCustomFilters = { states: undefined, placedAtStart: undefined, placedAtEnd: undefined };
            var filters = presetName === 'custom' ? lastCustomFilters : emptyCustomFilters;
            this.setQueryParam(Object.assign({ filter: presetName, page: 1 }, filters), { replaceUrl: true });
        };
        OrderListComponent.prototype.applyCustomFilters = function () {
            var formValue = this.customFilterForm.value;
            var customFilters = {
                states: formValue.states,
                placedAtStart: formValue.placedAtStart,
                placedAtEnd: formValue.placedAtEnd,
            };
            this.setQueryParam(Object.assign({ filter: 'custom' }, customFilters));
            this.customFilterForm.markAsPristine();
            this.localStorageService.set('orderListLastCustomFilters', customFilters);
        };
        OrderListComponent.prototype.createQueryOptions = function (
        // tslint:disable-next-line:no-shadowed-variable
        skip, take, searchTerm, activeFilterPreset) {
            var _a;
            var filterConfig = this.filterPresets.find(function (p) { return p.name === activeFilterPreset; });
            // tslint:disable-next-line:no-shadowed-variable
            var filter = {};
            var filterOperator = i1.LogicalOperator.AND;
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
                var queryParams = this.route.snapshot.queryParamMap;
                var states = (_a = queryParams.getAll('states')) !== null && _a !== void 0 ? _a : [];
                var placedAtStart = queryParams.get('placedAtStart');
                var placedAtEnd = queryParams.get('placedAtEnd');
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
                filterOperator = i1.LogicalOperator.OR;
            }
            return {
                options: {
                    skip: skip,
                    take: take,
                    filter: Object.assign({}, (filter !== null && filter !== void 0 ? filter : {})),
                    sort: {
                        updatedAt: i1.SortOrder.DESC,
                    },
                    filterOperator: filterOperator,
                },
            };
        };
        OrderListComponent.prototype.getShippingNames = function (order) {
            if (order.shippingLines.length) {
                return order.shippingLines.map(function (shippingLine) { return shippingLine.shippingMethod.name; }).join(', ');
            }
            else {
                return '';
            }
        };
        OrderListComponent.prototype.ngOnDestroy = function () {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }
        };
        return OrderListComponent;
    }(i1.BaseListComponent));
    OrderListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-list',
                    template: "<audio src=\"assets/notification.mp3\" id=\"audio_player\"></audio>\n<clr-toggle-wrapper>\n    <input\n        id=\"audioToggle\"\n        type=\"checkbox\"\n        (change)=\"toggleAudio()\"\n        [checked]=\"audioOn\"\n        clrToggle\n        name=\"enabled\"\n    />\n    <label class=\"visible-toggle\"> <span>Play Notification Sound</span></label></clr-toggle-wrapper\n>\n<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"search-form\">\n            <div\n                class=\"filter-presets btn-group btn-outline-primary\"\n                *ngIf=\"activePreset$ | async as activePreset\"\n            >\n                <button\n                    class=\"btn\"\n                    *ngFor=\"let preset of filterPresets\"\n                    [class.btn-primary]=\"activePreset === preset.name\"\n                    (click)=\"selectFilterPreset(preset.name)\"\n                >\n                    {{ preset.label | translate }}\n                </button>\n                <button\n                    class=\"btn\"\n                    [class.btn-primary]=\"activePreset === 'custom'\"\n                    (click)=\"selectFilterPreset('custom')\"\n                >\n                    {{ 'order.filter-custom' | translate }}\n                    <clr-icon shape=\"angle down\"></clr-icon>\n                </button>\n            </div>\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"searchControl\"\n                [placeholder]=\"'order.search-by-order-filters' | translate\"\n                class=\"search-input\"\n            />\n        </div>\n        <div class=\"custom-filters\" [class.expanded]=\"(activePreset$ | async) === 'custom'\">\n            <form [formGroup]=\"customFilterForm\">\n                <div class=\"flex align-center\">\n                    <ng-select\n                        [items]=\"orderStates\"\n                        appendTo=\"body\"\n                        [addTag]=\"false\"\n                        [multiple]=\"true\"\n                        formControlName=\"states\"\n                        [placeholder]=\"'state.all-orders' | translate\"\n                        [clearable]=\"true\"\n                        [searchable]=\"false\"\n                    >\n                        <ng-template ng-option-tmp let-item=\"item\">{{\n                            item | stateI18nToken | translate\n                        }}</ng-template>\n                        <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                            <span class=\"ng-value-label\"> {{ item | stateI18nToken | translate }}</span>\n                            <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\"\n                                >\u00D7</span\n                            >\n                        </ng-template>\n                    </ng-select>\n                    <button\n                        class=\"btn btn-secondary\"\n                        [disabled]=\"customFilterForm.pristine\"\n                        (click)=\"applyCustomFilters()\"\n                    >\n                        {{ 'order.apply-filters' | translate }}\n                        <clr-icon shape=\"filter\"></clr-icon>\n                    </button>\n                </div>\n                <div class=\"flex\">\n                    <div>\n                        <label>{{ 'order.placed-at-start' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtStart\"></vdr-datetime-picker>\n                    </div>\n                    <div>\n                        <label>{{ 'order.placed-at-end' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtEnd\"></vdr-datetime-picker>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-list\"></vdr-action-bar-items>\n        <ng-container *ngIf=\"canCreateDraftOrder\">\n            <a\n                class=\"btn btn-primary mt1\"\n                *vdrIfPermissions=\"['CreateOrder']\"\n                [routerLink]=\"['./draft/create']\"\n            >\n                <clr-icon shape=\"plus\"></clr-icon>\n                {{ 'catalog.create-draft-order' | translate }}\n            </a>\n        </ng-container>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [customRowHeight]=\"5\"\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.customer' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.placed-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.time-left' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.shipping' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-order-label [order]=\"order\"></vdr-order-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.totalWithTax | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">\n            {{ formatTime(order.orderPlacedAt) }}<br />{{ formatDate(order.orderPlacedAt) }}\n        </td>\n        <td class=\"left align-middle\" style=\"font-size: 16px\">\n            <vdr-cd-timer\n                [autoStart]\n                [scheduledTime]=\"order.customFields.scheduledTime\"\n                [processingTime]=\"processingTime\"\n                [placedTime]=\"order.orderPlacedAt\"\n                format=\"ms\"\n                maxTimeUnit=\"hour\"\n            ></vdr-cd-timer>\n        </td>\n        <td class=\"left align-middle\">{{ getShippingNames(order) }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                [large]=\"true\"\n                *ngIf=\"order.nextStates.length > 0\"\n                iconShape=\"step-forward-2\"\n                [label]=\"getNextState(order, true)\"\n                (click)=\"toNextState(order)\"\n            ></vdr-table-row-action>\n            <!-- <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"\n                    order.state === 'Modifying'\n                        ? ['./', order.id, 'modify']\n                        : order.state === 'Draft'\n                        ? ['./draft', order.id]\n                        : ['./', order.id]\n                \"\n            ></vdr-table-row-action> -->\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".search-form{display:flex;flex-direction:column;align-items:baseline;width:100%;max-width:100vw;margin-bottom:6px}.filter-presets{max-width:90vw;overflow-x:auto}.search-input{margin-top:6px;min-width:300px}.custom-filters{overflow:hidden;max-height:0;padding-bottom:6px}.custom-filters.expanded{max-height:initial}.custom-filters>form{display:flex;flex-direction:column;align-items:center}.custom-filters>form>div{width:100%}ng-select{flex:1;min-width:200px;height:36px}ng-select ::ng-deep .ng-select-container{height:36px}tbody tr{height:5rem!important}\n"]
                },] }
    ];
    OrderListComponent.ctorParameters = function () { return [
        { type: i1.ServerConfigService },
        { type: i1.DataService },
        { type: i1.LocalStorageService },
        { type: i1$1.Router },
        { type: i1$1.ActivatedRoute },
        { type: i1.ModalService },
        { type: i1.NotificationService }
    ]; };

    var OrderPaymentCardComponent = /** @class */ (function () {
        function OrderPaymentCardComponent() {
            this.settlePayment = new i0.EventEmitter();
            this.transitionPaymentState = new i0.EventEmitter();
            this.settleRefund = new i0.EventEmitter();
        }
        OrderPaymentCardComponent.prototype.refundHasMetadata = function (refund) {
            return !!refund && Object.keys(refund.metadata).length > 0;
        };
        OrderPaymentCardComponent.prototype.nextOtherStates = function () {
            if (!this.payment) {
                return [];
            }
            return this.payment.nextStates.filter(function (s) { return s !== 'Settled' && s !== 'Error'; });
        };
        return OrderPaymentCardComponent;
    }());
    OrderPaymentCardComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-payment-card',
                    template: "<div class=\"card\">\n    <div class=\"card-header payment-header\">\n        <div>\n            {{ 'order.payment' | translate }}\n            <ng-container *ngIf=\"payment.transactionId\">#{{ payment.transactionId }}</ng-container>\n        </div>\n        <div class=\"payment-state\">\n            <vdr-payment-state-label [state]=\"payment.state\"></vdr-payment-state-label>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <vdr-payment-detail [payment]=\"payment\" [currencyCode]=\"currencyCode\"></vdr-payment-detail>\n    </div>\n    <ng-container *ngFor=\"let refund of payment.refunds\">\n        <div class=\"card-header payment-header\">\n            <clr-icon shape=\"redo\" class=\"refund-icon\" dir=\"down\"></clr-icon>\n            {{ 'order.refund' | translate }} #{{ refund.id }}\n            <div class=\"clr-flex-fill\"></div>\n            <vdr-refund-state-label [state]=\"refund.state\"></vdr-refund-state-label>\n        </div>\n        <div class=\"card-block\">\n            <vdr-labeled-data [label]=\"'common.created-at' | translate\">\n                {{ refund.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-total' | translate\">\n                {{ refund.total | localeCurrency: currencyCode }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.transaction-id' | translate\" *ngIf=\"refund.transactionId\">\n                {{ refund.transactionId }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-reason' | translate\" *ngIf=\"refund.reason\">\n                {{ refund.reason }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-metadata' | translate\" *ngIf=\"refundHasMetadata(refund)\">\n                <vdr-object-tree [value]=\"refund.metadata\"></vdr-object-tree>\n            </vdr-labeled-data>\n        </div>\n        <div class=\"card-footer\" *ngIf=\"refund.state === 'Pending'\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"settleRefund.emit(refund)\">\n                {{ 'order.settle-refund' | translate }}\n            </button>\n        </div>\n    </ng-container>\n    <div class=\"card-footer\" *ngIf=\"payment.nextStates.length\">\n        <button\n            class=\"btn btn-sm btn-primary\"\n            *ngIf=\"payment.nextStates.includes('Settled')\"\n            (click)=\"settlePayment.emit(payment)\"\n        >\n            {{ 'order.settle-payment' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngFor=\"let nextState of nextOtherStates()\">\n                    <button\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionPaymentState.emit({ payment: payment, state: nextState })\"\n                    >\n                        <ng-container *ngIf=\"nextState !== 'Cancelled'; else cancel\">\n                            <clr-icon shape=\"step-forward-2\"></clr-icon>\n                            {{\n                                'order.transition-to-state'\n                                    | translate: { state: (nextState | stateI18nToken | translate) }\n                            }}\n                        </ng-container>\n                        <ng-template #cancel>\n                            <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                            {{ 'order.cancel-payment' | translate }}\n                        </ng-template>\n                    </button>\n                </ng-container>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".payment-header{display:flex;justify-content:space-between;align-items:center}.refund-icon{margin-right:6px;color:var(--color-grey-400)}.card-footer{display:flex;align-items:center;justify-content:flex-end}\n"]
                },] }
    ];
    OrderPaymentCardComponent.propDecorators = {
        payment: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        settlePayment: [{ type: i0.Output }],
        transitionPaymentState: [{ type: i0.Output }],
        settleRefund: [{ type: i0.Output }]
    };

    var NODE_HEIGHT = 72;

    var OrderProcessEdgeComponent = /** @class */ (function () {
        function OrderProcessEdgeComponent() {
        }
        OrderProcessEdgeComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.active$ = this.from.active$
                .asObservable()
                .pipe(operators.tap(function (active) { return _this.to.activeTarget$.next(active); }));
        };
        OrderProcessEdgeComponent.prototype.getStyle = function () {
            var direction = this.from.index < this.to.index ? 'down' : 'up';
            var startPos = this.from.getPos(direction === 'down' ? 'bottom' : 'top');
            var endPos = this.to.getPos(direction === 'down' ? 'top' : 'bottom');
            var dX = Math.abs(startPos.x - endPos.x);
            var dY = Math.abs(startPos.y - endPos.y);
            var length = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            return Object.assign({ 'top.px': startPos.y, 'left.px': startPos.x + (direction === 'down' ? 10 : 40) + this.index * 12, 'height.px': length, 'width.px': 1 }, (direction === 'up'
                ? {
                    transform: 'rotateZ(180deg)',
                    'transform-origin': 'top',
                }
                : {}));
        };
        return OrderProcessEdgeComponent;
    }());
    OrderProcessEdgeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-process-edge',
                    template: "<div\n    [attr.data-from]=\"from.node.name\"\n    [attr.data-to]=\"to.node.name\"\n    [ngStyle]=\"getStyle()\"\n    [class.active]=\"active$ | async\"\n    class=\"edge\">\n    <clr-icon shape=\"arrow\" flip=\"vertical\" class=\"arrow\"></clr-icon>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".edge{position:absolute;border:1px solid var(--color-component-border-200);background-color:var(--color-component-bg-300);opacity:.3;transition:border .2s,opacity .2s,background-color .2s}.edge.active{border-color:var(--color-primary-500);background-color:var(--color-primary-500);opacity:1}.edge.active .arrow{color:var(--color-primary-500)}.edge .arrow{position:absolute;bottom:-4px;left:-8px;color:var(--color-grey-300)}\n"]
                },] }
    ];
    OrderProcessEdgeComponent.propDecorators = {
        from: [{ type: i0.Input }],
        to: [{ type: i0.Input }],
        index: [{ type: i0.Input }]
    };

    var OrderProcessNodeComponent = /** @class */ (function () {
        function OrderProcessNodeComponent(elementRef) {
            this.elementRef = elementRef;
            this.active$ = new rxjs.BehaviorSubject(false);
            this.activeTarget$ = new rxjs.BehaviorSubject(false);
            this.isCancellable = false;
            // We use a class field here to prevent the
            // i18n extractor from extracting a "Cancelled" key
            this.cancelledState = 'Cancelled';
        }
        OrderProcessNodeComponent.prototype.ngOnChanges = function (changes) {
            this.isCancellable = !!this.node.to.find(function (s) { return s.name === 'Cancelled'; });
            if (changes.active) {
                this.active$.next(this.active);
            }
        };
        OrderProcessNodeComponent.prototype.getPos = function (origin) {
            if (origin === void 0) { origin = 'top'; }
            var _a, _b;
            var rect = this.elementRef.nativeElement.getBoundingClientRect();
            var nodeHeight = (_b = (_a = this.elementRef.nativeElement.querySelector('.node')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
            return {
                x: 10,
                y: this.index * NODE_HEIGHT + (origin === 'bottom' ? nodeHeight : 0),
            };
        };
        OrderProcessNodeComponent.prototype.getStyle = function () {
            var pos = this.getPos();
            return {
                'top.px': pos.y,
                'left.px': pos.x,
            };
        };
        return OrderProcessNodeComponent;
    }());
    OrderProcessNodeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-process-node',
                    template: "<div class=\"node-wrapper\" [ngStyle]=\"getStyle()\" [class.active]=\"active$ | async\">\n    <div\n        class=\"node\"\n        [class.active-target]=\"activeTarget$ | async\"\n    >\n        {{ node.name | stateI18nToken | translate }}\n    </div>\n    <div class=\"cancelled-wrapper\" *ngIf=\"isCancellable\">\n        <div class=\"cancelled-edge\">\n        </div>\n        <clr-icon shape=\"dot-circle\"></clr-icon>\n        <div class=\"cancelled-node\">\n            {{ cancelledState | stateI18nToken | translate }}\n        </div>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.node-wrapper{position:absolute;z-index:1;display:flex;align-items:center}.node{display:inline-block;border:2px solid var(--color-component-border-200);border-radius:3px;padding:3px 6px;z-index:1;background-color:var(--color-component-bg-100);opacity:.7;transition:opacity .2s,background-color .2s,color .2s;cursor:default}.node.active-target{border-color:var(--color-primary-500);opacity:.9}.cancelled-wrapper{display:flex;align-items:center;color:var(--color-grey-300);transition:color .2s,opacity .2s;opacity:.7}.cancelled-edge{width:48px;height:2px;background-color:var(--color-component-bg-300);transition:background-color .2s}clr-icon{margin-left:-1px}.cancelled-node{margin-left:6px}.active .cancelled-wrapper{opacity:1}.active .node{opacity:1;background-color:var(--color-primary-600);border-color:var(--color-primary-600);color:var(--color-primary-100)}.active .cancelled-wrapper{color:var(--color-error-500)}.active .cancelled-edge{background-color:var(--color-error-500)}\n"]
                },] }
    ];
    OrderProcessNodeComponent.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    OrderProcessNodeComponent.propDecorators = {
        node: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        active: [{ type: i0.Input }]
    };

    var OrderProcessGraphComponent = /** @class */ (function () {
        function OrderProcessGraphComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.setActiveState$ = new rxjs.BehaviorSubject(undefined);
            this.nodes = [];
            this.edges = [];
        }
        Object.defineProperty(OrderProcessGraphComponent.prototype, "outerHeight", {
            get: function () {
                return this.nodes.length * NODE_HEIGHT;
            },
            enumerable: false,
            configurable: true
        });
        OrderProcessGraphComponent.prototype.ngOnInit = function () {
            this.setActiveState$.next(this.initialState);
            this.activeState$ = this.setActiveState$.pipe(operators.debounceTime(150));
        };
        OrderProcessGraphComponent.prototype.ngOnChanges = function (changes) {
            this.populateNodes();
        };
        OrderProcessGraphComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.populateEdges(); });
        };
        OrderProcessGraphComponent.prototype.onMouseOver = function (stateName) {
            this.setActiveState$.next(stateName);
        };
        OrderProcessGraphComponent.prototype.onMouseOut = function () {
            this.setActiveState$.next(this.initialState);
        };
        OrderProcessGraphComponent.prototype.getNodeFor = function (state) {
            if (this.nodeComponents) {
                return this.nodeComponents.find(function (n) { return n.node.name === state; });
            }
        };
        OrderProcessGraphComponent.prototype.populateNodes = function () {
            var e_1, _c, e_2, _d;
            var _a, _b;
            var stateNodeMap = new Map();
            try {
                for (var _e = __values(this.states), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var state = _f.value;
                    stateNodeMap.set(state.name, {
                        name: state.name,
                        to: [],
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var _loop_1 = function (name, stateNode) {
                var e_3, _k;
                var targets = (_b = (_a = this_1.states.find(function (s) { return s.name === name; })) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : [];
                try {
                    for (var targets_1 = (e_3 = void 0, __values(targets)), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
                        var target = targets_1_1.value;
                        var targetNode = stateNodeMap.get(target);
                        if (targetNode) {
                            stateNode.to.push(targetNode);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (targets_1_1 && !targets_1_1.done && (_k = targets_1.return)) _k.call(targets_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            };
            var this_1 = this;
            try {
                for (var _g = __values(stateNodeMap.entries()), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var _j = __read(_h.value, 2), name = _j[0], stateNode = _j[1];
                    _loop_1(name, stateNode);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.nodes = __spreadArray([], __read(stateNodeMap.values())).filter(function (n) { return n.name !== 'Cancelled'; });
        };
        OrderProcessGraphComponent.prototype.populateEdges = function () {
            var e_4, _c, e_5, _d;
            try {
                for (var _e = __values(this.nodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var node = _f.value;
                    var nodeCmp = this.getNodeFor(node.name);
                    var index = 0;
                    try {
                        for (var _g = (e_5 = void 0, __values(node.to)), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var to = _h.value;
                            var toCmp = this.getNodeFor(to.name);
                            if (nodeCmp && toCmp && nodeCmp !== toCmp) {
                                this.edges.push({
                                    to: toCmp,
                                    from: nodeCmp,
                                    index: index,
                                });
                                index++;
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.edges = __spreadArray([], __read(this.edges));
            this.changeDetector.markForCheck();
        };
        return OrderProcessGraphComponent;
    }());
    OrderProcessGraphComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-process-graph',
                    template: "<ng-container *ngFor=\"let state of nodes; let i = index\">\n    <vdr-order-process-node\n        [node]=\"state\"\n        [index]=\"i\"\n        [active]=\"(activeState$ | async) === state.name\"\n        (mouseenter)=\"onMouseOver(state.name)\"\n        (mouseleave)=\"onMouseOut()\"\n    ></vdr-order-process-node>\n</ng-container>\n<ng-container *ngFor=\"let edge of edges\">\n    <vdr-order-process-edge [from]=\"edge.from\" [to]=\"edge.to\" [index]=\"edge.index\"></vdr-order-process-edge>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;border:1px hotpink;margin:20px;padding:12px;position:relative}.state-row{display:flex}\n"]
                },] }
    ];
    OrderProcessGraphComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    OrderProcessGraphComponent.propDecorators = {
        states: [{ type: i0.Input }],
        initialState: [{ type: i0.Input }],
        nodeComponents: [{ type: i0.ViewChildren, args: [OrderProcessNodeComponent,] }],
        outerHeight: [{ type: i0.HostBinding, args: ['style.height.px',] }]
    };

    var OrderTableComponent = /** @class */ (function () {
        function OrderTableComponent() {
            this.isDraft = false;
            this.adjust = new i0.EventEmitter();
            this.remove = new i0.EventEmitter();
            this.orderLineCustomFieldsVisible = false;
            this.customFieldsForLine = {};
        }
        Object.defineProperty(OrderTableComponent.prototype, "visibleOrderLineCustomFields", {
            get: function () {
                return this.orderLineCustomFieldsVisible ? this.orderLineCustomFields : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderTableComponent.prototype, "showElided", {
            get: function () {
                return !this.orderLineCustomFieldsVisible && 0 < this.orderLineCustomFields.length;
            },
            enumerable: false,
            configurable: true
        });
        OrderTableComponent.prototype.ngOnInit = function () {
            this.orderLineCustomFieldsVisible = this.orderLineCustomFields.length < 2;
            this.getLineCustomFields();
        };
        OrderTableComponent.prototype.draftInputBlur = function (line, quantity) {
            if (line.quantity !== quantity) {
                this.adjust.emit({ lineId: line.id, quantity: quantity });
            }
        };
        OrderTableComponent.prototype.toggleOrderLineCustomFields = function () {
            this.orderLineCustomFieldsVisible = !this.orderLineCustomFieldsVisible;
        };
        OrderTableComponent.prototype.getLineDiscounts = function (line) {
            return line.discounts.filter(function (a) { return a.type === i1.AdjustmentType.PROMOTION; });
        };
        OrderTableComponent.prototype.getLineCustomFields = function () {
            var e_1, _a;
            var _this = this;
            var _loop_1 = function (line) {
                var formGroup = new forms.FormGroup({});
                var result = this_1.orderLineCustomFields
                    .map(function (config) {
                    var value = line.customFields[config.name];
                    formGroup.addControl(config.name, new forms.FormControl(value));
                    return {
                        config: config,
                        formGroup: formGroup,
                        value: value,
                    };
                })
                    .filter(function (field) {
                    return _this.orderLineCustomFieldsVisible ? true : field.value != null;
                });
                this_1.customFieldsForLine[line.id] = result;
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.order.lines), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var line = _c.value;
                    _loop_1(line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        OrderTableComponent.prototype.getPromotionLink = function (promotion) {
            var id = promotion.adjustmentSource.split(':')[1];
            return ['/marketing', 'promotions', id];
        };
        OrderTableComponent.prototype.getCouponCodeForAdjustment = function (order, promotionAdjustment) {
            var id = promotionAdjustment.adjustmentSource.split(':')[1];
            var promotion = order.promotions.find(function (p) { return p.id === id; });
            if (promotion) {
                return promotion.couponCode || undefined;
            }
        };
        OrderTableComponent.prototype.getShippingNames = function (order) {
            if (order.shippingLines.length) {
                return order.shippingLines.map(function (shippingLine) { return shippingLine.shippingMethod.name; }).join(', ');
            }
            else {
                return '';
            }
        };
        return OrderTableComponent;
    }());
    OrderTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-table',
                    template: "<table class=\"order-table table\">\n    <thead>\n        <tr>\n            <th></th>\n            <th>{{ 'order.product-name' | translate }}</th>\n            <th>{{ 'order.product-sku' | translate }}</th>\n            <th>Is Cone</th>\n            <th>{{ 'order.quantity' | translate }}</th>\n            <th>{{ 'order.total' | translate }}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <ng-container *ngFor=\"let line of order.lines\">\n            <tr class=\"order-line\" [class.is-cancelled]=\"line.quantity === 0\">\n                <td class=\"align-middle thumb\">\n                    <img *ngIf=\"line.featuredAsset\" [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle unit-price\">\n                    {{ line.customFields.isCone ? 'Yes' : 'No' }}\n                    <!-- <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ line.unitPrice | localeCurrency: order.currencyCode }}\n                    </div> -->\n                </td>\n                <td class=\"align-middle quantity\">\n                    <ng-container *ngIf=\"!isDraft; else draft\">\n                        {{ line.quantity }}\n                    </ng-container>\n                    <ng-template #draft>\n                        <div class=\"flex\">\n                            <input\n                                class=\"draft-qty\"\n                                type=\"number\"\n                                min=\"0\"\n                                #qtyInput\n                                [value]=\"line.quantity\"\n                                (blur)=\"draftInputBlur(line, qtyInput.valueAsNumber)\"\n                            />\n                            <button class=\"icon-button\" (click)=\"remove.emit({ lineId: line.id })\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </div>\n                    </ng-template>\n                    <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                    <vdr-line-fulfillment [line]=\"line\" [orderState]=\"order.state\"></vdr-line-fulfillment>\n                </td>\n                <td class=\"align-middle total\">\n                    {{ line.linePriceWithTax | localeCurrency: order.currencyCode }}\n                    <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ line.linePrice | localeCurrency: order.currencyCode }}\n                    </div>\n\n                    <ng-container *ngIf=\"getLineDiscounts(line) as discounts\">\n                        <vdr-dropdown *ngIf=\"discounts.length\">\n                            <div class=\"promotions-label\" vdrDropdownTrigger>\n                                {{ 'order.promotions-applied' | translate }}\n                            </div>\n                            <vdr-dropdown-menu>\n                                <div class=\"line-promotion\" *ngFor=\"let discount of discounts\">\n                                    <a class=\"promotion-name\" [routerLink]=\"getPromotionLink(discount)\">{{\n                                        discount.description\n                                    }}</a>\n                                    <div class=\"promotion-amount\">\n                                        {{ discount.amountWithTax | localeCurrency: order.currencyCode }}\n                                        <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                            {{ discount.amount | localeCurrency: order.currencyCode }}\n                                        </div>\n                                    </div>\n                                </div>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </ng-container>\n                </td>\n            </tr>\n            <!-- <ng-container *ngIf=\"customFieldsForLine[line.id] as customFields\">\n                <tr *ngIf=\"customFields.length\">\n                    <td colspan=\"6\" class=\"custom-fields-row\">\n                        <div class=\"order-line-custom-fields\">\n                            <div class=\"custom-field\" *ngFor=\"let field of customFields\">\n                                <vdr-custom-field-control\n                                    [compact]=\"true\"\n                                    [readonly]=\"true\"\n                                    [customField]=\"field.config\"\n                                    [customFieldsFormGroup]=\"field.formGroup\"\n                                ></vdr-custom-field-control>\n                            </div>\n                        </div>\n                    </td>\n                </tr>\n            </ng-container> -->\n        </ng-container>\n        <tr class=\"surcharge\" *ngFor=\"let surcharge of order.surcharges\">\n            <td class=\"align-middle name left\" colspan=\"2\">{{ surcharge.description }}</td>\n            <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n            <td class=\"align-middle\" colspan=\"2\"></td>\n            <td class=\"align-middle total\">\n                {{ surcharge.priceWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ surcharge.price | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <ng-container *ngFor=\"let discount of order.discounts\">\n            <tr class=\"order-adjustment\" *ngIf=\"discount.type !== 'OTHER'\">\n                <td colspan=\"5\" class=\"left clr-align-middle\">\n                    <a [routerLink]=\"getPromotionLink(discount)\">{{ discount.description }}</a>\n                    <vdr-chip *ngIf=\"getCouponCodeForAdjustment(order, discount) as couponCode\">{{\n                        couponCode\n                    }}</vdr-chip>\n                </td>\n                <td class=\"clr-align-middle\">\n                    {{ discount.amountWithTax | localeCurrency: order.currencyCode }}\n                    <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ discount.amount | localeCurrency: order.currencyCode }}\n                    </div>\n                </td>\n            </tr>\n        </ng-container>\n        <tr class=\"sub-total\">\n            <td class=\"left clr-align-middle\">{{ 'order.sub-total' | translate }}</td>\n            <td colspan=\"4\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.subTotalWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.subTotal | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <tr class=\"shipping\">\n            <td class=\"left clr-align-middle\">{{ 'order.shipping' | translate }}</td>\n            <td class=\"clr-align-middle\">{{ getShippingNames(order) }}</td>\n            <td colspan=\"3\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.shippingWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.shipping | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <tr class=\"total\">\n            <td class=\"left clr-align-middle\">{{ 'order.total' | translate }}</td>\n            <td colspan=\"4\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.totalWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.total | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".order-table .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.order-table .sub-total td{border-top:1px dashed var(--color-component-border-200)}.order-table .total td{font-weight:bold;border-top:1px dashed var(--color-component-border-200)}.order-table td.custom-fields-row{border-top-style:dashed;border-top-color:var(--color-grey-200)}.order-table img{border-radius:var(--border-radius-img)}.order-table .order-line-custom-fields{display:flex;flex-wrap:wrap}.order-table .order-line-custom-fields .custom-field{text-align:start;max-width:200px;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;margin-right:18px}.order-table .draft-qty{max-width:48px}.order-table .order-line-custom-field{background-color:var(--color-component-bg-100)}.order-table .order-line-custom-field .custom-field-ellipsis{color:var(--color-text-300)}.order-table .net-price{font-size:11px;color:var(--color-text-300)}.order-table .promotions-label{-webkit-text-decoration:underline dotted var(--color-text-200);text-decoration:underline dotted var(--color-text-200);font-size:11px;margin-top:6px;cursor:pointer;text-transform:lowercase}.order-table .thumb img{width:50px;height:50px}::ng-deep .line-promotion{display:flex;justify-content:space-between;padding:6px 12px}::ng-deep .line-promotion .promotion-amount{margin-left:12px}::ng-deep .line-promotion .net-price{font-size:11px;color:var(--color-text-300)}\n"]
                },] }
    ];
    OrderTableComponent.propDecorators = {
        order: [{ type: i0.Input }],
        orderLineCustomFields: [{ type: i0.Input }],
        isDraft: [{ type: i0.Input }],
        adjust: [{ type: i0.Output }],
        remove: [{ type: i0.Output }]
    };

    var PaymentDetailComponent = /** @class */ (function () {
        function PaymentDetailComponent() {
        }
        return PaymentDetailComponent;
    }());
    PaymentDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-payment-detail',
                    template: "<vdr-labeled-data [label]=\"'order.payment-method' | translate\">\n    {{ payment.method }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.amount' | translate\">\n    {{ payment.amount | localeCurrency: currencyCode }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.errorMessage\" [label]=\"'order.error-message' | translate\">\n    {{ payment.errorMessage }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.transactionId\" [label]=\"'order.transaction-id' | translate\">\n    {{ payment.transactionId }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.payment-metadata' | translate\">\n    <vdr-object-tree [value]=\"payment.metadata\"></vdr-object-tree>\n</vdr-labeled-data>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    PaymentDetailComponent.propDecorators = {
        payment: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }]
    };

    var PaymentStateLabelComponent = /** @class */ (function () {
        function PaymentStateLabelComponent() {
        }
        Object.defineProperty(PaymentStateLabelComponent.prototype, "chipColorType", {
            get: function () {
                switch (this.state) {
                    case 'Authorized':
                        return 'warning';
                    case 'Settled':
                        return 'success';
                    case 'Declined':
                    case 'Cancelled':
                        return 'error';
                }
            },
            enumerable: false,
            configurable: true
        });
        return PaymentStateLabelComponent;
    }());
    PaymentStateLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-payment-state-label',
                    template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{font-size:14px}\n"]
                },] }
    ];
    PaymentStateLabelComponent.propDecorators = {
        state: [{ type: i0.Input }]
    };

    var RefundStateLabelComponent = /** @class */ (function () {
        function RefundStateLabelComponent() {
        }
        Object.defineProperty(RefundStateLabelComponent.prototype, "chipColorType", {
            get: function () {
                switch (this.state) {
                    case 'Pending':
                        return 'warning';
                    case 'Settled':
                        return 'success';
                    case 'Failed':
                        return 'error';
                }
            },
            enumerable: false,
            configurable: true
        });
        return RefundStateLabelComponent;
    }());
    RefundStateLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-refund-state-label',
                    template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{font-size:14px}\n"]
                },] }
    ];
    RefundStateLabelComponent.propDecorators = {
        state: [{ type: i0.Input }]
    };

    var SimpleItemListComponent = /** @class */ (function () {
        function SimpleItemListComponent() {
        }
        return SimpleItemListComponent;
    }());
    SimpleItemListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-simple-item-list',
                    template: "<div class=\"items-list\">\n    <ul>\n        <li *ngFor=\"let item of items\" [title]=\"item.name\">\n            <div class=\"quantity\">{{ item.quantity }}</div>\n            <clr-icon shape=\"times\" size=\"12\"></clr-icon>\n            {{ item.name }}\n        </li>\n    </ul>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".items-list{font-size:12px}.items-list ul{margin-top:6px;list-style-type:none;margin-left:2px}.items-list ul li{line-height:14px;text-overflow:ellipsis;overflow:hidden}.items-list .quantity{min-width:16px;display:inline-block}\n"]
                },] }
    ];
    SimpleItemListComponent.propDecorators = {
        items: [{ type: i0.Input }]
    };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var OrderResolver = /** @class */ (function () {
        function OrderResolver(router, dataService) {
            this.router = router;
            this.dataService = dataService;
        }
        /** @internal */
        OrderResolver.prototype.resolve = function (route, state) {
            var _this = this;
            var id = route.paramMap.get('id');
            // Complete the entity stream upon navigating away
            var navigateAway$ = this.router.events.pipe(operators.filter(function (event) { return event instanceof i1$1.ActivationStart; }));
            var stream = this.dataService.order
                .getOrder(id)
                .mapStream(function (data) { return data.order; })
                .pipe(operators.switchMap(function (order) {
                if ((order === null || order === void 0 ? void 0 : order.state) === 'Draft' && route.component !== DraftOrderDetailComponent) {
                    // Make sure Draft orders only get displayed with the DraftOrderDetailComponent
                    _this.router.navigate(['/orders/draft', id]);
                    return rxjs.EMPTY;
                }
                else {
                    return [order];
                }
            }), operators.takeUntil(navigateAway$), operators.filter(sharedUtils.notNullOrUndefined), operators.shareReplay(1));
            return stream.pipe(operators.take(1), operators.map(function () { return stream; }));
        };
        return OrderResolver;
    }());
    OrderResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function OrderResolver_Factory() { return new OrderResolver(i0__namespace.ɵɵinject(i1__namespace$1.Router), i0__namespace.ɵɵinject(i1__namespace.DataService)); }, token: OrderResolver, providedIn: "root" });
    OrderResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    OrderResolver.ctorParameters = function () { return [
        { type: i1$1.Router },
        { type: i1.DataService }
    ]; };

    var OrderGuard = /** @class */ (function () {
        function OrderGuard(dataService, router) {
            this.dataService = dataService;
            this.router = router;
        }
        OrderGuard.prototype.canActivate = function (route, state) {
            var _this = this;
            var isDraft = state.url.includes('orders/draft');
            var id = route.paramMap.get('id');
            if (isDraft) {
                if (id === 'create') {
                    return this.dataService.order
                        .createDraftOrder()
                        .pipe(operators.map(function (_a) {
                        var createDraftOrder = _a.createDraftOrder;
                        return _this.router.parseUrl("/orders/draft/" + createDraftOrder.id);
                    }));
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        };
        return OrderGuard;
    }());
    OrderGuard.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function OrderGuard_Factory() { return new OrderGuard(i0__namespace.ɵɵinject(i1__namespace.DataService), i0__namespace.ɵɵinject(i1__namespace$1.Router)); }, token: OrderGuard, providedIn: "root" });
    OrderGuard.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    OrderGuard.ctorParameters = function () { return [
        { type: i1.DataService },
        { type: i1$1.Router }
    ]; };

    var ɵ0 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.orders'),
    }, ɵ1 = {
        breadcrumb: orderBreadcrumb,
    }, ɵ2 = {
        breadcrumb: orderBreadcrumb,
    }, ɵ3 = {
        breadcrumb: modifyingOrderBreadcrumb,
    };
    var orderRoutes = [
        {
            path: '',
            component: OrderListComponent,
            data: ɵ0,
        },
        {
            path: 'draft/:id',
            component: DraftOrderDetailComponent,
            resolve: {
                entity: OrderResolver,
            },
            canActivate: [OrderGuard],
            canDeactivate: [i1.CanDeactivateDetailGuard],
            data: ɵ1,
        },
        {
            path: ':id',
            component: OrderDetailComponent,
            resolve: {
                entity: OrderResolver,
            },
            canActivate: [OrderGuard],
            canDeactivate: [i1.CanDeactivateDetailGuard],
            data: ɵ2,
        },
        {
            path: ':id/modify',
            component: OrderEditorComponent,
            resolve: {
                entity: OrderResolver,
            },
            // canDeactivate: [CanDeactivateDetailGuard],
            data: ɵ3,
        },
    ];
    function orderBreadcrumb(data, params) {
        return i1.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.orders',
            getName: function (order) { return order.code; },
            route: '',
        });
    }
    function modifyingOrderBreadcrumb(data, params) {
        return orderBreadcrumb(data, params).pipe(operators.map(function (breadcrumbs) {
            var modifiedBreadcrumbs = breadcrumbs.slice();
            modifiedBreadcrumbs[0].link[0] = '../';
            modifiedBreadcrumbs[1].link[0] = '../orders';
            return modifiedBreadcrumbs.concat({ label: ngxTranslateExtractMarker.marker('breadcrumb.modifying'), link: [''] });
        }));
    }

    var OrderModule = /** @class */ (function () {
        function OrderModule() {
        }
        return OrderModule;
    }());
    OrderModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i1.SharedModule, i1$1.RouterModule.forChild(orderRoutes)],
                    declarations: [
                        OrderListComponent,
                        OrderDetailComponent,
                        FulfillOrderDialogComponent,
                        LineFulfillmentComponent,
                        RefundOrderDialogComponent,
                        CancelOrderDialogComponent,
                        PaymentStateLabelComponent,
                        LineRefundsComponent,
                        OrderPaymentCardComponent,
                        RefundStateLabelComponent,
                        SettleRefundDialogComponent,
                        OrderHistoryComponent,
                        FulfillmentDetailComponent,
                        PaymentDetailComponent,
                        SimpleItemListComponent,
                        OrderCustomFieldsCardComponent,
                        OrderProcessGraphComponent,
                        OrderProcessNodeComponent,
                        OrderProcessEdgeComponent,
                        OrderProcessGraphDialogComponent,
                        FulfillmentStateLabelComponent,
                        FulfillmentCardComponent,
                        OrderEditorComponent,
                        OrderTableComponent,
                        OrderEditsPreviewDialogComponent,
                        ModificationDetailComponent,
                        AddManualPaymentDialogComponent,
                        OrderStateSelectDialogComponent,
                        DraftOrderDetailComponent,
                        DraftOrderVariantSelectorComponent,
                        SelectCustomerDialogComponent,
                        SelectAddressDialogComponent,
                        CouponCodeSelectorComponent,
                        SelectShippingMethodDialogComponent,
                    ],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddManualPaymentDialogComponent = AddManualPaymentDialogComponent;
    exports.CancelOrderDialogComponent = CancelOrderDialogComponent;
    exports.CouponCodeSelectorComponent = CouponCodeSelectorComponent;
    exports.DraftOrderDetailComponent = DraftOrderDetailComponent;
    exports.DraftOrderVariantSelectorComponent = DraftOrderVariantSelectorComponent;
    exports.FulfillOrderDialogComponent = FulfillOrderDialogComponent;
    exports.FulfillmentCardComponent = FulfillmentCardComponent;
    exports.FulfillmentDetailComponent = FulfillmentDetailComponent;
    exports.FulfillmentStateLabelComponent = FulfillmentStateLabelComponent;
    exports.GET_CUSTOMER_ADDRESSES = GET_CUSTOMER_ADDRESSES;
    exports.LineFulfillmentComponent = LineFulfillmentComponent;
    exports.LineRefundsComponent = LineRefundsComponent;
    exports.ModificationDetailComponent = ModificationDetailComponent;
    exports.NODE_HEIGHT = NODE_HEIGHT;
    exports.OrderCustomFieldsCardComponent = OrderCustomFieldsCardComponent;
    exports.OrderDetailComponent = OrderDetailComponent;
    exports.OrderEditorComponent = OrderEditorComponent;
    exports.OrderEditsPreviewDialogComponent = OrderEditsPreviewDialogComponent;
    exports.OrderGuard = OrderGuard;
    exports.OrderHistoryComponent = OrderHistoryComponent;
    exports.OrderListComponent = OrderListComponent;
    exports.OrderModule = OrderModule;
    exports.OrderPaymentCardComponent = OrderPaymentCardComponent;
    exports.OrderProcessEdgeComponent = OrderProcessEdgeComponent;
    exports.OrderProcessGraphComponent = OrderProcessGraphComponent;
    exports.OrderProcessGraphDialogComponent = OrderProcessGraphDialogComponent;
    exports.OrderProcessNodeComponent = OrderProcessNodeComponent;
    exports.OrderResolver = OrderResolver;
    exports.OrderStateSelectDialogComponent = OrderStateSelectDialogComponent;
    exports.OrderTableComponent = OrderTableComponent;
    exports.OrderTransitionService = OrderTransitionService;
    exports.PaymentDetailComponent = PaymentDetailComponent;
    exports.PaymentStateLabelComponent = PaymentStateLabelComponent;
    exports.RefundOrderDialogComponent = RefundOrderDialogComponent;
    exports.RefundStateLabelComponent = RefundStateLabelComponent;
    exports.SelectAddressDialogComponent = SelectAddressDialogComponent;
    exports.SelectCustomerDialogComponent = SelectCustomerDialogComponent;
    exports.SelectShippingMethodDialogComponent = SelectShippingMethodDialogComponent;
    exports.SettleRefundDialogComponent = SettleRefundDialogComponent;
    exports.SimpleItemListComponent = SimpleItemListComponent;
    exports.modifyingOrderBreadcrumb = modifyingOrderBreadcrumb;
    exports.orderBreadcrumb = orderBreadcrumb;
    exports.orderRoutes = orderRoutes;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-order.umd.js.map

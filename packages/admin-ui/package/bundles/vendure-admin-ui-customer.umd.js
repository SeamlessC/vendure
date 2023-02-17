(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@vendure/admin-ui/core'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/router'), require('@biesbjerg/ngx-translate-extract-marker'), require('@vendure/common/lib/shared-utils'), require('@vendure/common/lib/generated-shop-types')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/customer', ['exports', '@angular/core', '@vendure/admin-ui/core', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/router', '@biesbjerg/ngx-translate-extract-marker', '@vendure/common/lib/shared-utils', '@vendure/common/lib/generated-shop-types'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].customer = {}), global.ng.core, global.vendure['admin-ui'].core, global.rxjs, global.rxjs.operators, global.ng.forms, global.ng.router, global.ngxTranslateExtractMarker, global.sharedUtils, global.generatedShopTypes));
}(this, (function (exports, i0, i2, rxjs, operators, forms, i1, ngxTranslateExtractMarker, sharedUtils, generatedShopTypes) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var AddCustomerToGroupDialogComponent = /** @class */ (function () {
        function AddCustomerToGroupDialogComponent(dataService) {
            this.dataService = dataService;
            this.selectedCustomerIds = [];
            this.fetchGroupMembers$ = new rxjs.BehaviorSubject({
                skip: 0,
                take: 10,
                filterTerm: '',
            });
        }
        AddCustomerToGroupDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var customerResult$ = this.fetchGroupMembers$.pipe(operators.switchMap(function (_a) {
                var skip = _a.skip, take = _a.take, filterTerm = _a.filterTerm;
                return _this.dataService.customer
                    .getCustomerList(take, skip, filterTerm)
                    .mapStream(function (res) { return res.customers; });
            }));
            this.customers$ = customerResult$.pipe(operators.map(function (res) { return res.items; }));
            this.customersTotal$ = customerResult$.pipe(operators.map(function (res) { return res.totalItems; }));
        };
        AddCustomerToGroupDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AddCustomerToGroupDialogComponent.prototype.add = function () {
            this.resolveWith(this.selectedCustomerIds);
        };
        return AddCustomerToGroupDialogComponent;
    }());
    AddCustomerToGroupDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-add-customer-to-group-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customers-to-group-with-name' | translate: {groupName: group.name} }}\n</ng-template>\n\n<vdr-customer-group-member-list\n    [members]=\"customers$ | async\"\n    [totalItems]=\"customersTotal$ | async\"\n    [route]=\"route\"\n    [selectedMemberIds]=\"selectedCustomerIds\"\n    (fetchParamsChange)=\"fetchGroupMembers$.next($event)\"\n    (selectionChange)=\"selectedCustomerIds = $event\"\n>\n\n</vdr-customer-group-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedCustomerIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customers-to-group-with-count' | translate: {count: selectedCustomerIds.length} }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    AddCustomerToGroupDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };

    var AddressDetailDialogComponent = /** @class */ (function () {
        function AddressDetailDialogComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.availableCountries = [];
        }
        AddressDetailDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.addressForm.valueChanges.subscribe(function () { return _this.changeDetector.markForCheck(); });
        };
        AddressDetailDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AddressDetailDialogComponent.prototype.save = function () {
            this.resolveWith(this.addressForm);
        };
        return AddressDetailDialogComponent;
    }());
    AddressDetailDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-address-detail-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"addressForm.get('streetLine1')?.value as streetLine1\">{{ streetLine1 }},</span>\n    <span *ngIf=\"addressForm.get('countryCode')?.value as countryCode\"> {{ countryCode }}</span>\n</ng-template>\n\n<vdr-address-form\n    [formGroup]=\"addressForm\"\n    [availableCountries]=\"availableCountries\"\n    [customFields]=\"customFields\"\n></vdr-address-form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"save()\"\n        [disabled]=\"!addressForm.valid || !addressForm.touched\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["clr-input-container{margin-bottom:12px}\n"]
                },] }
    ];
    AddressDetailDialogComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };

    var AddressCardComponent = /** @class */ (function () {
        function AddressCardComponent(modalService, changeDetector) {
            this.modalService = modalService;
            this.changeDetector = changeDetector;
            this.availableCountries = [];
            this.editable = true;
            this.setAsDefaultShipping = new i0.EventEmitter();
            this.setAsDefaultBilling = new i0.EventEmitter();
            this.deleteAddress = new i0.EventEmitter();
            this.dataDependenciesPopulated = new rxjs.BehaviorSubject(false);
        }
        AddressCardComponent.prototype.ngOnInit = function () {
            var _this = this;
            var streetLine1 = this.addressForm.get('streetLine1');
            // Make the address dialog display automatically if there is no address line
            // as is the case when adding a new address.
            if (!streetLine1.value) {
                this.dataDependenciesPopulated
                    .pipe(operators.filter(function (value) { return value; }), operators.take(1))
                    .subscribe(function () {
                    _this.editAddress();
                });
            }
        };
        AddressCardComponent.prototype.ngOnChanges = function (changes) {
            if (this.customFields != null && this.availableCountries != null) {
                this.dataDependenciesPopulated.next(true);
            }
        };
        AddressCardComponent.prototype.getCountryName = function (countryCode) {
            if (!this.availableCountries) {
                return '';
            }
            var match = this.availableCountries.find(function (c) { return c.code === countryCode; });
            return match ? match.name : '';
        };
        AddressCardComponent.prototype.setAsDefaultBillingAddress = function () {
            this.setAsDefaultBilling.emit(this.addressForm.value.id);
            this.addressForm.markAsDirty();
        };
        AddressCardComponent.prototype.setAsDefaultShippingAddress = function () {
            this.setAsDefaultShipping.emit(this.addressForm.value.id);
            this.addressForm.markAsDirty();
        };
        AddressCardComponent.prototype.delete = function () {
            this.deleteAddress.emit(this.addressForm.value.id);
            this.addressForm.markAsDirty();
        };
        AddressCardComponent.prototype.editAddress = function () {
            var _this = this;
            this.modalService
                .fromComponent(AddressDetailDialogComponent, {
                locals: {
                    addressForm: this.addressForm,
                    customFields: this.customFields,
                    availableCountries: this.availableCountries,
                },
                size: 'md',
                closable: true,
            })
                .subscribe(function () {
                _this.changeDetector.markForCheck();
            });
        };
        return AddressCardComponent;
    }());
    AddressCardComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-address-card',
                    template: "<div class=\"card\" *ngIf=\"addressForm.value as address\">\n    <div class=\"card-header\">\n        <div class=\"address-title\">\n            <span class=\"street-line\" *ngIf=\"address.streetLine1\">{{ address.streetLine1 }},</span>\n            {{ address.countryCode }}\n        </div>\n        <div class=\"default-controls\">\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultShipping\">\n                <clr-icon shape=\"truck\"></clr-icon>\n                {{ 'customer.default-shipping-address' | translate }}\n            </vdr-chip>\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultBilling\">\n                <clr-icon shape=\"credit-card\"></clr-icon>\n                {{ 'customer.default-billing-address' | translate }}\n            </vdr-chip>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text\">\n            <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <vdr-entity-info [entity]=\"address\"></vdr-entity-info>\n        <ng-container *ngIf=\"editable\">\n            <button class=\"btn btn-sm btn-link\" (click)=\"editAddress()\">\n                {{ 'common.edit' | translate }}\n            </button>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger>\n                    {{ 'common.more' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultShipping\"\n                        (click)=\"setAsDefaultShippingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-shipping-address' | translate }}\n                    </button>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultBilling\"\n                        (click)=\"setAsDefaultBillingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-billing-address' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"delete()\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;max-width:360px}clr-input-container{margin-bottom:12px}.defaul-controls{display:flex}.is-default{margin:0;color:var(--color-success-500)}\n"]
                },] }
    ];
    AddressCardComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i0.ChangeDetectorRef }
    ]; };
    AddressCardComponent.propDecorators = {
        addressForm: [{ type: i0.Input }],
        customFields: [{ type: i0.Input }],
        availableCountries: [{ type: i0.Input }],
        isDefaultBilling: [{ type: i0.Input }],
        isDefaultShipping: [{ type: i0.Input }],
        editable: [{ type: i0.Input }],
        setAsDefaultShipping: [{ type: i0.Output }],
        setAsDefaultBilling: [{ type: i0.Output }],
        deleteAddress: [{ type: i0.Output }]
    };

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

    var SelectCustomerGroupDialogComponent = /** @class */ (function () {
        function SelectCustomerGroupDialogComponent(dataService) {
            this.dataService = dataService;
            this.selectedGroupIds = [];
        }
        SelectCustomerGroupDialogComponent.prototype.ngOnInit = function () {
            this.groups$ = this.dataService.customer
                .getCustomerGroupList()
                .mapStream(function (res) { return res.customerGroups.items; });
        };
        SelectCustomerGroupDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        SelectCustomerGroupDialogComponent.prototype.add = function () {
            this.resolveWith(this.selectedGroupIds);
        };
        return SelectCustomerGroupDialogComponent;
    }());
    SelectCustomerGroupDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-customer-group-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customer-to-group' | translate }}\n</ng-template>\n\n<ng-select\n    [items]=\"groups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    bindValue=\"id\"\n    [(ngModel)]=\"selectedGroupIds\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedGroupIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customer-to-groups-with-count' | translate: {count: selectedGroupIds.length} }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    SelectCustomerGroupDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };

    var CustomerDetailComponent = /** @class */ (function (_super) {
        __extends(CustomerDetailComponent, _super);
        function CustomerDetailComponent(route, router, serverConfigService, changeDetector, formBuilder, dataService, modalService, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.formBuilder = formBuilder;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.fetchHistory = new rxjs.Subject();
            _this.addressesToDeleteIds = new Set();
            _this.addressDefaultsUpdated = false;
            _this.ordersPerPage = 10;
            _this.currentOrdersPage = 1;
            _this.orderListUpdates$ = new rxjs.Subject();
            _this.customFields = _this.getCustomFieldConfig('Customer');
            _this.addressCustomFields = _this.getCustomFieldConfig('Address');
            _this.detailForm = _this.formBuilder.group({
                customer: _this.formBuilder.group({
                    title: '',
                    firstName: ['', forms.Validators.required],
                    lastName: ['', forms.Validators.required],
                    phoneNumber: '',
                    emailAddress: ['', [forms.Validators.required, forms.Validators.email]],
                    password: '',
                    customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                        var _c;
                        return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                    }, {})),
                }),
                addresses: new forms.FormArray([]),
            });
            return _this;
        }
        CustomerDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.availableCountries$ = this.dataService.settings
                .getAvailableCountries()
                .mapSingle(function (result) { return result.countries.items; })
                .pipe(operators.shareReplay(1));
            var customerWithUpdates$ = this.entity$.pipe(operators.merge(this.orderListUpdates$));
            this.orders$ = customerWithUpdates$.pipe(operators.map(function (customer) { return customer.orders.items; }));
            this.ordersCount$ = this.entity$.pipe(operators.map(function (customer) { return customer.orders.totalItems; }));
            this.history$ = this.fetchHistory.pipe(operators.startWith(null), operators.switchMap(function () {
                return _this.dataService.customer
                    .getCustomerHistory(_this.id, {
                    sort: {
                        createdAt: i2.SortOrder.DESC,
                    },
                })
                    .mapStream(function (data) { var _a; return (_a = data.customer) === null || _a === void 0 ? void 0 : _a.history.items; });
            }));
        };
        CustomerDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
            this.orderListUpdates$.complete();
        };
        CustomerDetailComponent.prototype.getAddressFormControls = function () {
            var formArray = this.detailForm.get(['addresses']);
            return formArray.controls;
        };
        CustomerDetailComponent.prototype.setDefaultBillingAddressId = function (id) {
            this.defaultBillingAddressId = id;
            this.addressDefaultsUpdated = true;
        };
        CustomerDetailComponent.prototype.setDefaultShippingAddressId = function (id) {
            this.defaultShippingAddressId = id;
            this.addressDefaultsUpdated = true;
        };
        CustomerDetailComponent.prototype.toggleDeleteAddress = function (id) {
            if (this.addressesToDeleteIds.has(id)) {
                this.addressesToDeleteIds.delete(id);
            }
            else {
                this.addressesToDeleteIds.add(id);
            }
        };
        CustomerDetailComponent.prototype.addAddress = function () {
            var e_1, _c;
            var addressFormArray = this.detailForm.get('addresses');
            var newAddress = this.formBuilder.group({
                fullName: '',
                company: '',
                streetLine1: ['', forms.Validators.required],
                streetLine2: '',
                city: '',
                province: '',
                postalCode: '',
                countryCode: ['', forms.Validators.required],
                phoneNumber: '',
                defaultShippingAddress: false,
                defaultBillingAddress: false,
            });
            if (this.addressCustomFields.length) {
                var customFieldsGroup = this.formBuilder.group({});
                try {
                    for (var _d = __values(this.addressCustomFields), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fieldDef = _e.value;
                        customFieldsGroup.addControl(fieldDef.name, new forms.FormControl(''));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                newAddress.addControl('customFields', customFieldsGroup);
            }
            addressFormArray.push(newAddress);
        };
        CustomerDetailComponent.prototype.setOrderItemsPerPage = function (itemsPerPage) {
            this.ordersPerPage = +itemsPerPage;
            this.fetchOrdersList();
        };
        CustomerDetailComponent.prototype.setOrderCurrentPage = function (page) {
            this.currentOrdersPage = +page;
            this.fetchOrdersList();
        };
        CustomerDetailComponent.prototype.create = function () {
            var _this = this;
            var _a;
            var customerForm = this.detailForm.get('customer');
            if (!customerForm) {
                return;
            }
            var formValue = customerForm.value;
            var customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
            var customer = {
                title: formValue.title,
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                phoneNumber: formValue.phoneNumber,
                customFields: customFields,
            };
            this.dataService.customer
                .createCustomer(customer, formValue.password)
                .subscribe(function (_c) {
                var createCustomer = _c.createCustomer;
                switch (createCustomer.__typename) {
                    case 'Customer':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                            entity: 'Customer',
                        });
                        if (createCustomer.emailAddress && !formValue.password) {
                            _this.notificationService.notify({
                                message: ngxTranslateExtractMarker.marker('customer.email-verification-sent'),
                                translationVars: { emailAddress: formValue.emailAddress },
                                type: 'info',
                                duration: 10000,
                            });
                        }
                        _this.detailForm.markAsPristine();
                        _this.addressDefaultsUpdated = false;
                        _this.changeDetector.markForCheck();
                        _this.router.navigate(['../', createCustomer.id], { relativeTo: _this.route });
                        break;
                    case 'EmailAddressConflictError':
                        _this.notificationService.error(createCustomer.message);
                }
            });
        };
        CustomerDetailComponent.prototype.save = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var e_2, _d;
                var id = _c.id;
                var _a;
                var saveOperations = [];
                var customerForm = _this.detailForm.get('customer');
                if (customerForm && customerForm.dirty) {
                    var formValue = customerForm.value;
                    var customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
                    var customer = {
                        id: id,
                        title: formValue.title,
                        emailAddress: formValue.emailAddress,
                        firstName: formValue.firstName,
                        lastName: formValue.lastName,
                        phoneNumber: formValue.phoneNumber,
                        customFields: customFields,
                    };
                    saveOperations.push(_this.dataService.customer
                        .updateCustomer(customer)
                        .pipe(operators.map(function (res) { return res.updateCustomer; })));
                }
                var addressFormArray = _this.detailForm.get('addresses');
                if ((addressFormArray && addressFormArray.dirty) || _this.addressDefaultsUpdated) {
                    try {
                        for (var _e = __values(addressFormArray.controls), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var addressControl = _f.value;
                            if (addressControl.dirty || _this.addressDefaultsUpdated) {
                                var address = addressControl.value;
                                var input = {
                                    fullName: address.fullName,
                                    company: address.company,
                                    streetLine1: address.streetLine1,
                                    streetLine2: address.streetLine2,
                                    city: address.city,
                                    province: address.province,
                                    postalCode: address.postalCode,
                                    countryCode: address.countryCode,
                                    phoneNumber: address.phoneNumber,
                                    defaultShippingAddress: _this.defaultShippingAddressId === address.id,
                                    defaultBillingAddress: _this.defaultBillingAddressId === address.id,
                                    customFields: address.customFields,
                                };
                                if (!address.id) {
                                    saveOperations.push(_this.dataService.customer
                                        .createCustomerAddress(id, input)
                                        .pipe(operators.map(function (res) { return res.createCustomerAddress; })));
                                }
                                else {
                                    if (_this.addressesToDeleteIds.has(address.id)) {
                                        saveOperations.push(_this.dataService.customer
                                            .deleteCustomerAddress(address.id)
                                            .pipe(operators.map(function (res) { return res.deleteCustomerAddress; })));
                                    }
                                    else {
                                        saveOperations.push(_this.dataService.customer
                                            .updateCustomerAddress(Object.assign(Object.assign({}, input), { id: address.id }))
                                            .pipe(operators.map(function (res) { return res.updateCustomerAddress; })));
                                    }
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                return rxjs.forkJoin(saveOperations);
            }))
                .subscribe(function (data) {
                var e_3, _c;
                var notified = false;
                try {
                    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                        var result = data_1_1.value;
                        switch (result.__typename) {
                            case 'Customer':
                            case 'Address':
                            case 'Success':
                                if (!notified) {
                                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                                        entity: 'Customer',
                                    });
                                    notified = true;
                                    _this.detailForm.markAsPristine();
                                    _this.addressDefaultsUpdated = false;
                                    _this.changeDetector.markForCheck();
                                    _this.fetchHistory.next();
                                    _this.dataService.customer.getCustomer(_this.id).single$.subscribe();
                                }
                                break;
                            case 'EmailAddressConflictError':
                                _this.notificationService.error(result.message);
                                break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_c = data_1.return)) _c.call(data_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Customer',
                });
            });
        };
        CustomerDetailComponent.prototype.addToGroup = function () {
            var _this = this;
            this.modalService
                .fromComponent(SelectCustomerGroupDialogComponent, {
                size: 'md',
            })
                .pipe(operators.switchMap(function (groupIds) { return (groupIds ? rxjs.from(groupIds) : rxjs.EMPTY); }), operators.concatMap(function (groupId) { return _this.dataService.customer.addCustomersToGroup(groupId, [_this.id]); }))
                .subscribe({
                next: function (res) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker("customer.add-customers-to-group-success"), {
                        customerCount: 1,
                        groupName: res.addCustomersToGroup.name,
                    });
                },
                complete: function () {
                    _this.dataService.customer.getCustomer(_this.id, { take: 0 }).single$.subscribe();
                    _this.fetchHistory.next();
                },
            });
        };
        CustomerDetailComponent.prototype.removeFromGroup = function (group) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('customer.confirm-remove-customer-from-group'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response
                ? _this.dataService.customer.removeCustomersFromGroup(group.id, [_this.id])
                : rxjs.EMPTY; }), operators.switchMap(function () { return _this.dataService.customer.getCustomer(_this.id, { take: 0 }).single$; }))
                .subscribe(function (result) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker("customer.remove-customers-from-group-success"), {
                    customerCount: 1,
                    groupName: group.name,
                });
                _this.fetchHistory.next();
            });
        };
        CustomerDetailComponent.prototype.addNoteToCustomer = function (_c) {
            var _this = this;
            var note = _c.note;
            this.dataService.customer.addNoteToCustomer(this.id, note).subscribe(function () {
                _this.fetchHistory.next();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Note',
                });
            });
        };
        CustomerDetailComponent.prototype.updateNote = function (entry) {
            var _this = this;
            this.modalService
                .fromComponent(i2.EditNoteDialogComponent, {
                closable: true,
                locals: {
                    displayPrivacyControls: false,
                    note: entry.data.note,
                },
            })
                .pipe(operators.switchMap(function (result) {
                if (result) {
                    return _this.dataService.customer.updateCustomerNote({
                        noteId: entry.id,
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
        CustomerDetailComponent.prototype.deleteNote = function (entry) {
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
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.customer.deleteCustomerNote(entry.id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.fetchHistory.next();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Note',
                });
            });
        };
        CustomerDetailComponent.prototype.setFormValues = function (entity) {
            var e_4, _c, e_5, _d;
            var _a;
            var customerGroup = this.detailForm.get('customer');
            if (customerGroup) {
                customerGroup.patchValue({
                    title: entity.title,
                    firstName: entity.firstName,
                    lastName: entity.lastName,
                    phoneNumber: entity.phoneNumber,
                    emailAddress: entity.emailAddress,
                });
            }
            if (entity.addresses) {
                var addressesArray = new forms.FormArray([]);
                try {
                    for (var _e = __values(entity.addresses), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var address = _f.value;
                        var _b = address, customFields = _b.customFields, rest = __rest(_b, ["customFields"]);
                        var addressGroup = this.formBuilder.group(Object.assign(Object.assign({}, rest), { countryCode: address.country.code }));
                        addressesArray.push(addressGroup);
                        if (address.defaultShippingAddress) {
                            this.defaultShippingAddressId = address.id;
                        }
                        if (address.defaultBillingAddress) {
                            this.defaultBillingAddressId = address.id;
                        }
                        if (this.addressCustomFields.length) {
                            var customFieldsGroup = this.formBuilder.group({});
                            try {
                                for (var _g = (e_5 = void 0, __values(this.addressCustomFields)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                    var fieldDef = _h.value;
                                    var key = fieldDef.name;
                                    var value = (_a = address.customFields) === null || _a === void 0 ? void 0 : _a[key];
                                    var control = new forms.FormControl(value);
                                    customFieldsGroup.addControl(key, control);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            addressGroup.addControl('customFields', customFieldsGroup);
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
                this.detailForm.setControl('addresses', addressesArray);
            }
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customer', 'customFields']), entity);
            }
            this.changeDetector.markForCheck();
        };
        /**
         * Refetch the customer with the current order list settings.
         */
        CustomerDetailComponent.prototype.fetchOrdersList = function () {
            var _this = this;
            this.dataService.customer
                .getCustomer(this.id, {
                take: this.ordersPerPage,
                skip: (this.currentOrdersPage - 1) * this.ordersPerPage,
            })
                .single$.pipe(operators.map(function (data) { return data.customer; }), operators.filter(sharedUtils.notNullOrUndefined))
                .subscribe(function (result) { return _this.orderListUpdates$.next(result); });
        };
        return CustomerDetailComponent;
    }(i2.BaseDetailComponent));
    CustomerDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-customer-status-label [customer]=\"entity$ | async\"></vdr-customer-status-label>\n            <div\n                class=\"last-login\"\n                *ngIf=\"(entity$ | async)?.user?.lastLogin as lastLogin\"\n                [title]=\"lastLogin | localeDate: 'medium'\"\n            >\n                {{ 'customer.last-login' | translate }}: {{ lastLogin | timeAgo }}\n            </div>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"'UpdateCustomer'\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm.get('customer')\">\n    <vdr-form-field [label]=\"'customer.title' | translate\" for=\"title\" [readOnlyToggle]=\"!(isNew$ | async)\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.first-name' | translate\"\n        for=\"firstName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.last-name' | translate\"\n        for=\"lastName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.email-address' | translate\"\n        for=\"emailAddress\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.phone-number' | translate\"\n        for=\"phoneNumber\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"phoneNumber\" type=\"text\" formControlName=\"phoneNumber\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'customer.password' | translate\" for=\"password\" *ngIf=\"isNew$ | async\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Customer\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get(['customer', 'customFields'])\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"customer-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n\n<div class=\"groups\" *ngIf=\"(entity$ | async)?.groups as groups\">\n    <label class=\"clr-control-label\">{{ 'customer.customer-groups' | translate }}</label>\n    <ng-container *ngIf=\"groups.length; else noGroups\">\n        <vdr-chip\n            *ngFor=\"let group of groups\"\n            [colorFrom]=\"group.id\"\n            icon=\"times\"\n            (iconClick)=\"removeFromGroup(group)\"\n            >{{ group.name }}</vdr-chip\n        >\n    </ng-container>\n    <ng-template #noGroups>\n        {{ 'customer.not-a-member-of-any-groups' | translate }}\n    </ng-template>\n    <div>\n        <button\n            class=\"btn btn-sm btn-secondary\"\n            (click)=\"addToGroup()\"\n            *vdrIfPermissions=\"'UpdateCustomerGroup'\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.add-customer-to-group' | translate }}\n        </button>\n    </div>\n</div>\n\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-4\">\n        <h3>{{ 'customer.addresses' | translate }}</h3>\n        <vdr-address-card\n            *ngFor=\"let addressForm of getAddressFormControls()\"\n            [class.to-delete]=\"addressesToDeleteIds.has(addressForm.value.id)\"\n            [availableCountries]=\"availableCountries$ | async\"\n            [isDefaultBilling]=\"defaultBillingAddressId === addressForm.value.id\"\n            [isDefaultShipping]=\"defaultShippingAddressId === addressForm.value.id\"\n            [addressForm]=\"addressForm\"\n            [customFields]=\"addressCustomFields\"\n            [editable]=\"(['UpdateCustomer'] | hasPermission) && !addressesToDeleteIds.has(addressForm.value.id)\"\n            (setAsDefaultBilling)=\"setDefaultBillingAddressId($event)\"\n            (setAsDefaultShipping)=\"setDefaultShippingAddressId($event)\"\n            (deleteAddress)=\"toggleDeleteAddress($event)\"\n        ></vdr-address-card>\n        <button class=\"btn btn-secondary\" (click)=\"addAddress()\" *vdrIfPermissions=\"'UpdateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-address' | translate }}\n        </button>\n    </div>\n    <div class=\"clr-col-md-8\">\n        <h3>{{ 'customer.orders' | translate }}</h3>\n        <vdr-data-table\n            [items]=\"orders$ | async\"\n            [itemsPerPage]=\"ordersPerPage\"\n            [totalItems]=\"ordersCount$ | async\"\n            [currentPage]=\"currentOrdersPage\"\n            [emptyStateLabel]=\"'customer.no-orders-placed' | translate\"\n            (itemsPerPageChange)=\"setOrderItemsPerPage($event)\"\n            (pageChange)=\"setOrderCurrentPage($event)\"\n        >\n            <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'common.updated-at' | translate }}</vdr-dt-column>\n            <vdr-dt-column></vdr-dt-column>\n            <ng-template let-order=\"item\">\n                <td class=\"left\">{{ order.code }}</td>\n                <td class=\"left\">{{ order.state }}</td>\n                <td class=\"left\">{{ order.totalWithTax | localeCurrency: order.currencyCode }}</td>\n                <td class=\"left\">{{ order.updatedAt | localeDate: 'medium' }}</td>\n                <td class=\"right\">\n                    <vdr-table-row-action\n                        iconShape=\"shopping-cart\"\n                        [label]=\"'common.open' | translate\"\n                        [linkTo]=\"['/orders/', order.id]\"\n                    ></vdr-table-row-action>\n                </td>\n            </ng-template>\n        </vdr-data-table>\n    </div>\n</div>\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-6\">\n        <vdr-customer-history\n            [customer]=\"entity$ | async\"\n            [history]=\"history$ | async\"\n            (addNote)=\"addNoteToCustomer($event)\"\n            (updateNote)=\"updateNote($event)\"\n            (deleteNote)=\"deleteNote($event)\"\n        ></vdr-customer-history>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".last-login{margin-left:6px;color:var(--color-grey-500)}.to-delete{opacity:.5}\n"]
                },] }
    ];
    CustomerDetailComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: forms.FormBuilder },
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService }
    ]; };

    var CustomerGroupDetailDialogComponent = /** @class */ (function () {
        function CustomerGroupDetailDialogComponent(serverConfigService, formBuilder) {
            this.serverConfigService = serverConfigService;
            this.formBuilder = formBuilder;
            this.customFields = this.serverConfigService.getCustomFieldsFor('CustomerGroup');
        }
        CustomerGroupDetailDialogComponent.prototype.ngOnInit = function () {
            var e_1, _b;
            var _a;
            this.form = this.formBuilder.group({
                name: [this.group.name, forms.Validators.required],
                customFields: this.formBuilder.group(this.customFields.reduce(function (hash, field) {
                    var _b;
                    return (Object.assign(Object.assign({}, hash), (_b = {}, _b[field.name] = '', _b)));
                }, {})),
            });
            if (this.customFields.length) {
                var customFieldsGroup = this.form.get('customFields');
                try {
                    for (var _c = __values(this.customFields), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var fieldDef = _d.value;
                        var key = fieldDef.name;
                        var value = (_a = this.group.customFields) === null || _a === void 0 ? void 0 : _a[key];
                        var control = customFieldsGroup.get(key);
                        if (control) {
                            control.patchValue(value);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        CustomerGroupDetailDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        CustomerGroupDetailDialogComponent.prototype.save = function () {
            this.resolveWith(this.form.value);
        };
        return CustomerGroupDetailDialogComponent;
    }());
    CustomerGroupDetailDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-group-detail-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n    <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(['CreateCustomerGroup', 'UpdateCustomerGroup'] | hasPermission)\"\n        />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"CustomerGroup\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"form.get('customFields')\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\n        <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n        <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CustomerGroupDetailDialogComponent.ctorParameters = function () { return [
        { type: i2.ServerConfigService },
        { type: forms.FormBuilder }
    ]; };

    var CustomerGroupListComponent = /** @class */ (function (_super) {
        __extends(CustomerGroupListComponent, _super);
        function CustomerGroupListComponent(dataService, notificationService, modalService, route, router) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.route = route;
            _this.router = router;
            _this.searchTerm = new forms.FormControl('');
            _this.selectedCustomerIds = [];
            _this.fetchGroupMembers$ = new rxjs.BehaviorSubject({
                skip: 0,
                take: 0,
                filterTerm: '',
            });
            _this.refreshActiveGroupMembers$ = new rxjs.BehaviorSubject(undefined);
            _super.prototype.setQueryFn.call(_this, function () {
                var _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_b = _this.dataService.customer).getCustomerGroupList.apply(_b, __spreadArray([], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.customerGroups; }, function (skip, take) { return ({
                options: {
                    skip: skip,
                    take: take,
                    filter: {
                        name: { contains: _this.searchTerm.value },
                    },
                },
            }); });
            return _this;
        }
        CustomerGroupListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.searchTerm.valueChanges
                .pipe(operators.filter(function (value) { return 2 < value.length || value.length === 0; }), operators.debounceTime(250), operators.takeUntil(this.destroy$))
                .subscribe(function () { return _this.refresh(); });
            var activeGroupId$ = this.route.paramMap.pipe(operators.map(function (pm) { return pm.get('contents'); }), operators.distinctUntilChanged(), operators.tap(function () { return (_this.selectedCustomerIds = []); }));
            this.listIsEmpty$ = this.items$.pipe(operators.map(function (groups) { return groups.length === 0; }));
            this.activeGroup$ = rxjs.combineLatest(this.items$, activeGroupId$).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), groups = _c[0], activeGroupId = _c[1];
                if (activeGroupId) {
                    return groups.find(function (g) { return g.id === activeGroupId; });
                }
            }), operators.tap(function (val) { return (_this.activeGroupId = val === null || val === void 0 ? void 0 : val.id); }));
            var membersResult$ = rxjs.combineLatest(this.activeGroup$, this.fetchGroupMembers$, this.refreshActiveGroupMembers$).pipe(operators.switchMap(function (_b) {
                var _c = __read(_b, 2), activeGroup = _c[0], _d = _c[1], skip = _d.skip, take = _d.take, filterTerm = _d.filterTerm;
                if (activeGroup) {
                    return _this.dataService.customer
                        .getCustomerGroupWithCustomers(activeGroup.id, {
                        skip: skip,
                        take: take,
                        filter: {
                            emailAddress: {
                                contains: filterTerm,
                            },
                        },
                    })
                        .mapStream(function (res) { var _a; return (_a = res.customerGroup) === null || _a === void 0 ? void 0 : _a.customers; });
                }
                else {
                    return rxjs.of(undefined);
                }
            }));
            this.members$ = membersResult$.pipe(operators.map(function (res) { var _a; return (_a = res === null || res === void 0 ? void 0 : res.items) !== null && _a !== void 0 ? _a : []; }));
            this.membersTotal$ = membersResult$.pipe(operators.map(function (res) { var _a; return (_a = res === null || res === void 0 ? void 0 : res.totalItems) !== null && _a !== void 0 ? _a : 0; }));
        };
        CustomerGroupListComponent.prototype.create = function () {
            var _this = this;
            this.modalService
                .fromComponent(CustomerGroupDetailDialogComponent, { locals: { group: { name: '' } } })
                .pipe(operators.switchMap(function (result) { return result
                ? _this.dataService.customer.createCustomerGroup(Object.assign(Object.assign({}, result), { customerIds: [] }))
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.refresh();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'CustomerGroup',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'CustomerGroup',
                });
            });
        };
        CustomerGroupListComponent.prototype.delete = function (groupId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('customer.confirm-delete-customer-group'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.dataService.customer.deleteCustomerGroup(groupId) : rxjs.EMPTY; }), operators.switchMap(function (result) {
                if (result.deleteCustomerGroup.result === i2.DeletionResult.DELETED) {
                    // refresh list
                    return _this.dataService.customer
                        .getCustomerGroupList()
                        .mapSingle(function () { return ({ errorMessage: false }); });
                }
                else {
                    return rxjs.of({ errorMessage: result.deleteCustomerGroup.message });
                }
            }))
                .subscribe(function (result) {
                if (typeof result.errorMessage === 'string') {
                    _this.notificationService.error(result.errorMessage);
                }
                else {
                    _this.refresh();
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'CustomerGroup',
                    });
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'CustomerGroup',
                });
            });
        };
        CustomerGroupListComponent.prototype.update = function (group) {
            var _this = this;
            this.modalService
                .fromComponent(CustomerGroupDetailDialogComponent, { locals: { group: group } })
                .pipe(operators.switchMap(function (result) { return result
                ? _this.dataService.customer.updateCustomerGroup(Object.assign({ id: group.id }, result))
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.refresh();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'CustomerGroup',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'CustomerGroup',
                });
            });
        };
        CustomerGroupListComponent.prototype.closeMembers = function () {
            var params = Object.assign({}, this.route.snapshot.params);
            delete params.contents;
            this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
        };
        CustomerGroupListComponent.prototype.addToGroup = function (group) {
            var _this = this;
            this.modalService
                .fromComponent(AddCustomerToGroupDialogComponent, {
                locals: {
                    group: group,
                    route: this.route,
                },
                size: 'md',
                verticalAlign: 'top',
            })
                .pipe(operators.switchMap(function (customerIds) { return customerIds
                ? _this.dataService.customer
                    .addCustomersToGroup(group.id, customerIds)
                    .pipe(operators.mapTo(customerIds))
                : rxjs.EMPTY; }))
                .subscribe({
                next: function (result) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker("customer.add-customers-to-group-success"), {
                        customerCount: result.length,
                        groupName: group.name,
                    });
                    _this.refreshActiveGroupMembers$.next();
                    _this.selectedCustomerIds = [];
                },
            });
        };
        CustomerGroupListComponent.prototype.removeFromGroup = function (group, customerIds) {
            var _this = this;
            this.dataService.customer.removeCustomersFromGroup(group.id, customerIds).subscribe({
                complete: function () {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker("customer.remove-customers-from-group-success"), {
                        customerCount: customerIds.length,
                        groupName: group.name,
                    });
                    _this.refreshActiveGroupMembers$.next();
                    _this.selectedCustomerIds = [];
                },
            });
        };
        return CustomerGroupListComponent;
    }(i2.BaseListComponent));
    CustomerGroupListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-group-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'customer.search-by-group-name' | translate\"\n            class=\"search-input\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-group-list\"></vdr-action-bar-items>\n        <button class=\"btn btn-primary\" *vdrIfPermissions=\"'CreateCustomerGroup'\" (click)=\"create()\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer-group' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"group-wrapper\">\n    <div class=\"group-list\">\n        <vdr-data-table\n            [class.expanded]=\"activeGroup$ | async\"\n            [items]=\"items$ | async\"\n            [itemsPerPage]=\"itemsPerPage$ | async\"\n            [totalItems]=\"totalItems$ | async\"\n            [currentPage]=\"currentPage$ | async\"\n            (pageChange)=\"setPageNumber($event)\"\n            (itemsPerPageChange)=\"setItemsPerPage($event)\"\n        >\n            <ng-template let-group=\"item\">\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <vdr-entity-info [entity]=\"group\"></vdr-entity-info>\n                </td>\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <vdr-chip [colorFrom]=\"group.id\">{{ group.name }}</vdr-chip>\n                </td>\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <a\n                        class=\"btn btn-link btn-sm\"\n                        [routerLink]=\"['./', { contents: group.id }]\"\n                        queryParamsHandling=\"preserve\"\n                    >\n                        <clr-icon shape=\"view-list\"></clr-icon>\n                        {{ 'customer.view-group-members' | translate }}\n                    </a>\n                </td>\n                <td class=\"right align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <button class=\"btn btn-link btn-sm\" (click)=\"update(group)\">\n                        <clr-icon shape=\"edit\"></clr-icon>\n                        {{ 'common.edit' | translate }}\n                    </button>\n                </td>\n                <td [class.active]=\"group.id === activeGroupId\" class=\"align-middle\">\n                    <vdr-dropdown>\n                        <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                            {{ 'common.actions' | translate }}\n                            <clr-icon shape=\"caret down\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"delete(group.id)\"\n                                [disabled]=\"!('DeleteCustomerGroup' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </td>\n            </ng-template>\n        </vdr-data-table>\n    </div>\n    <ng-template #emptyPlaceholder>\n        <vdr-empty-placeholder></vdr-empty-placeholder>\n    </ng-template>\n    <div class=\"group-members\" [class.expanded]=\"activeGroup$ | async\">\n        <ng-container *ngIf=\"activeGroup$ | async as activeGroup\">\n            <div class=\"flex\">\n                <div class=\"header-title-row\">{{ activeGroup.name }} ({{ membersTotal$ | async }})</div>\n                <div class=\"flex-spacer\"></div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeMembers()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"controls\">\n                <vdr-dropdown>\n                    <button\n                        type=\"button\"\n                        class=\"btn btn-secondary btn-sm\"\n                        vdrDropdownTrigger\n                        [disabled]=\"selectedCustomerIds.length === 0\"\n                    >\n                        {{ 'common.with-selected' | translate: { count: selectedCustomerIds.length } }}\n                        <clr-icon shape=\"caret down\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"removeFromGroup(activeGroup, selectedCustomerIds)\"\n                            vdrDropdownItem\n                            [disabled]=\"!('UpdateCustomerGroup' | hasPermission)\"\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'customer.remove-from-group' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n                <button class=\"btn btn-secondary btn-sm\" (click)=\"addToGroup(activeGroup)\">\n                    {{ 'customer.add-customers-to-group' | translate: { groupName: activeGroup.name } }}\n                </button>\n            </div>\n            <vdr-customer-group-member-list\n                [members]=\"members$ | async\"\n                [route]=\"route\"\n                [totalItems]=\"membersTotal$ | async\"\n                [selectedMemberIds]=\"selectedCustomerIds\"\n                (selectionChange)=\"selectedCustomerIds = $event\"\n                (fetchParamsChange)=\"fetchGroupMembers$.next($event)\"\n            ></vdr-customer-group-member-list>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".group-wrapper{display:flex;height:calc(100% - 50px)}.group-wrapper .group-list{flex:1;overflow:auto;margin-top:0}.group-wrapper .group-list .active{background-color:var(--clr-global-selection-color)}.group-wrapper .group-list.expanded{width:calc(100% - 40vw)}vdr-data-table ::ng-deep table{margin-top:0}.group-members{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.group-members.expanded{width:40vw;visibility:visible;opacity:1;padding-left:12px}.group-members .close-button{margin:0;background:none;border:none;cursor:pointer}.group-members ::ng-deep table.table{margin-top:0}.group-members ::ng-deep table.table th{top:0}.group-members .controls{display:flex;justify-content:space-between}vdr-empty-placeholder{flex:1}\n"]
                },] }
    ];
    CustomerGroupListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i1.ActivatedRoute },
        { type: i1.Router }
    ]; };

    var CustomerGroupMemberListComponent = /** @class */ (function () {
        function CustomerGroupMemberListComponent(router, dataService) {
            var _this = this;
            this.router = router;
            this.dataService = dataService;
            this.selectedMemberIds = [];
            this.selectionChange = new i0.EventEmitter();
            this.fetchParamsChange = new i0.EventEmitter();
            this.filterTermControl = new forms.FormControl('');
            this.refresh$ = new rxjs.BehaviorSubject(true);
            this.destroy$ = new rxjs.Subject();
            this.isMemberSelected = function (member) {
                return -1 < _this.selectedMemberIds.indexOf(member.id);
            };
        }
        CustomerGroupMemberListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.membersCurrentPage$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('membersPage'); }), operators.map(function (page) { return (!page ? 1 : +page); }), operators.startWith(1), operators.distinctUntilChanged());
            this.membersItemsPerPage$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('membersPerPage'); }), operators.map(function (perPage) { return (!perPage ? 10 : +perPage); }), operators.startWith(10), operators.distinctUntilChanged());
            var filterTerm$ = this.filterTermControl.valueChanges.pipe(operators.debounceTime(250), operators.tap(function () { return _this.setContentsPageNumber(1); }), operators.startWith(''));
            rxjs.combineLatest(this.membersCurrentPage$, this.membersItemsPerPage$, filterTerm$, this.refresh$)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), currentPage = _b[0], itemsPerPage = _b[1], filterTerm = _b[2];
                var take = itemsPerPage;
                var skip = (currentPage - 1) * itemsPerPage;
                _this.fetchParamsChange.emit({
                    filterTerm: filterTerm,
                    skip: skip,
                    take: take,
                });
            });
        };
        CustomerGroupMemberListComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        CustomerGroupMemberListComponent.prototype.setContentsPageNumber = function (page) {
            this.setParam('membersPage', page);
        };
        CustomerGroupMemberListComponent.prototype.setContentsItemsPerPage = function (perPage) {
            this.setParam('membersPerPage', perPage);
        };
        CustomerGroupMemberListComponent.prototype.refresh = function () {
            this.refresh$.next(true);
        };
        CustomerGroupMemberListComponent.prototype.setParam = function (key, value) {
            var _a;
            this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), (_a = {}, _a[key] = value, _a))], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
            });
        };
        CustomerGroupMemberListComponent.prototype.areAllSelected = function () {
            if (this.members) {
                return this.selectedMemberIds.length === this.members.length;
            }
            else {
                return false;
            }
        };
        CustomerGroupMemberListComponent.prototype.toggleSelectAll = function () {
            if (this.areAllSelected()) {
                this.selectionChange.emit([]);
            }
            else {
                this.selectionChange.emit(this.members.map(function (v) { return v.id; }));
            }
        };
        CustomerGroupMemberListComponent.prototype.toggleSelectMember = function (_a) {
            var member = _a.item;
            if (this.selectedMemberIds.includes(member.id)) {
                this.selectionChange.emit(this.selectedMemberIds.filter(function (id) { return id !== member.id; }));
            }
            else {
                this.selectionChange.emit(__spreadArray(__spreadArray([], __read(this.selectedMemberIds)), [member.id]));
            }
        };
        return CustomerGroupMemberListComponent;
    }());
    CustomerGroupMemberListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-group-member-list',
                    template: "<input\n    type=\"text\"\n    name=\"searchTerm\"\n    [formControl]=\"filterTermControl\"\n    [placeholder]=\"'customer.search-customers-by-email' | translate\"\n    class=\"search-input\"\n/>\n\n<vdr-data-table\n    [items]=\"members\"\n    [itemsPerPage]=\"membersItemsPerPage$ | async\"\n    [totalItems]=\"totalItems\"\n    [currentPage]=\"membersCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"('UpdateCustomerGroup' | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/customer', 'customers', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CustomerGroupMemberListComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };
    CustomerGroupMemberListComponent.propDecorators = {
        members: [{ type: i0.Input }],
        totalItems: [{ type: i0.Input }],
        route: [{ type: i0.Input }],
        selectedMemberIds: [{ type: i0.Input }],
        selectionChange: [{ type: i0.Output }],
        fetchParamsChange: [{ type: i0.Output }]
    };

    var CustomerHistoryComponent = /** @class */ (function () {
        function CustomerHistoryComponent() {
            this.addNote = new i0.EventEmitter();
            this.updateNote = new i0.EventEmitter();
            this.deleteNote = new i0.EventEmitter();
            this.note = '';
            this.type = i2.HistoryEntryType;
        }
        CustomerHistoryComponent.prototype.getDisplayType = function (entry) {
            switch (entry.type) {
                case i2.HistoryEntryType.CUSTOMER_VERIFIED:
                case i2.HistoryEntryType.CUSTOMER_EMAIL_UPDATE_VERIFIED:
                case i2.HistoryEntryType.CUSTOMER_PASSWORD_RESET_VERIFIED:
                    return 'success';
                case i2.HistoryEntryType.CUSTOMER_REGISTERED:
                    return 'muted';
                case i2.HistoryEntryType.CUSTOMER_REMOVED_FROM_GROUP:
                    return 'error';
                default:
                    return 'default';
            }
        };
        CustomerHistoryComponent.prototype.getTimelineIcon = function (entry) {
            switch (entry.type) {
                case i2.HistoryEntryType.CUSTOMER_REGISTERED:
                    return 'user';
                case i2.HistoryEntryType.CUSTOMER_VERIFIED:
                    return ['assign-user', 'is-solid'];
                case i2.HistoryEntryType.CUSTOMER_NOTE:
                    return 'note';
                case i2.HistoryEntryType.CUSTOMER_ADDED_TO_GROUP:
                case i2.HistoryEntryType.CUSTOMER_REMOVED_FROM_GROUP:
                    return 'users';
            }
        };
        CustomerHistoryComponent.prototype.isFeatured = function (entry) {
            switch (entry.type) {
                case i2.HistoryEntryType.CUSTOMER_REGISTERED:
                case i2.HistoryEntryType.CUSTOMER_VERIFIED:
                    return true;
                default:
                    return false;
            }
        };
        CustomerHistoryComponent.prototype.getName = function (entry) {
            var administrator = entry.administrator;
            if (administrator) {
                return administrator.firstName + " " + administrator.lastName;
            }
            else {
                return this.customer.firstName + " " + this.customer.lastName;
            }
        };
        CustomerHistoryComponent.prototype.addNoteToCustomer = function () {
            this.addNote.emit({ note: this.note });
            this.note = '';
        };
        return CustomerHistoryComponent;
    }());
    CustomerHistoryComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-history',
                    template: "<h4>{{ 'customer.customer-history' | translate }}</h4>\n<div class=\"entry-list\">\n    <vdr-timeline-entry iconShape=\"note\" displayType=\"muted\" *vdrIfPermissions=\"'UpdateCustomer'\">\n        <div class=\"note-entry\">\n            <textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n            <button class=\"btn btn-secondary\" [disabled]=\"!note\" (click)=\"addNoteToCustomer()\">\n                {{ 'order.add-note' | translate }}\n            </button>\n        </div>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry\n        *ngFor=\"let entry of history\"\n        [displayType]=\"getDisplayType(entry)\"\n        [iconShape]=\"getTimelineIcon(entry)\"\n        [createdAt]=\"entry.createdAt\"\n        [name]=\"getName(entry)\"\n        [featured]=\"isFeatured(entry)\"\n    >\n        <ng-container [ngSwitch]=\"entry.type\">\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_REGISTERED\">\n                <div class=\"title\">\n                    {{ 'customer.history-customer-registered' | translate }}\n                </div>\n                <ng-container *ngIf=\"entry.data.strategy === 'native'; else namedStrategy\">\n                    {{ 'customer.history-using-native-auth-strategy' | translate }}\n                </ng-container>\n                <ng-template #namedStrategy>\n                    {{\n                    'customer.history-using-external-auth-strategy'\n                        | translate: { strategy: entry.data.strategy }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_VERIFIED\">\n                <div class=\"title\">\n                    {{ 'customer.history-customer-verified' | translate }}\n                </div>\n                <ng-container *ngIf=\"entry.data.strategy === 'native'; else namedStrategy\">\n                    {{ 'customer.history-using-native-auth-strategy' | translate }}\n                </ng-container>\n                <ng-template #namedStrategy>\n                    {{\n                        'customer.history-using-external-auth-strategy'\n                            | translate: { strategy: entry.data.strategy }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_DETAIL_UPDATED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-detail-updated' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-object-tree [value]=\"entry.data.input\"></vdr-object-tree>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDED_TO_GROUP\">\n                {{\n                    'customer.history-customer-added-to-group'\n                        | translate: { groupName: entry.data.groupName }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_REMOVED_FROM_GROUP\">\n                {{\n                    'customer.history-customer-removed-from-group'\n                        | translate: { groupName: entry.data.groupName }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_CREATED\">\n                {{ 'customer.history-customer-address-created' | translate }}\n                <div class=\"flex\">\n                    <div class=\"address-string\">{{ entry.data.address }}</div>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_UPDATED\">\n                {{ 'customer.history-customer-address-updated' | translate }}\n                <div class=\"flex\">\n                    <div class=\"address-string\">{{ entry.data.address }}</div>\n                    <vdr-history-entry-detail>\n                        <vdr-object-tree [value]=\"entry.data.input\"></vdr-object-tree>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_DELETED\">\n                {{ 'customer.history-customer-address-deleted' | translate }}\n                <div class=\"address-string\">{{ entry.data.address }}</div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_UPDATED\">\n                {{ 'customer.history-customer-password-updated' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_RESET_REQUESTED\">\n                {{ 'customer.history-customer-password-reset-requested' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_RESET_VERIFIED\">\n                {{ 'customer.history-customer-password-reset-verified' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_EMAIL_UPDATE_REQUESTED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-email-update-requested' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-labeled-data [label]=\"'customer.old-email-address' | translate\">{{\n                            entry.data.oldEmailAddress\n                        }}</vdr-labeled-data>\n                        <vdr-labeled-data [label]=\"'customer.new-email-address' | translate\">{{\n                            entry.data.newEmailAddress\n                        }}</vdr-labeled-data>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_EMAIL_UPDATE_VERIFIED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-email-update-verified' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-labeled-data [label]=\"'customer.old-email-address' | translate\">{{\n                            entry.data.oldEmailAddress\n                        }}</vdr-labeled-data>\n                        <vdr-labeled-data [label]=\"'customer.new-email-address' | translate\">{{\n                            entry.data.newEmailAddress\n                        }}</vdr-labeled-data>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_NOTE\">\n                <div class=\"flex\">\n                    <div class=\"note-text\">\n                        {{ entry.data.note }}\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"updateNote.emit(entry)\"\n                                [disabled]=\"!('UpdateCustomer' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </button>\n                            <div class=\"dropdown-divider\"></div>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"deleteNote.emit(entry)\"\n                                [disabled]=\"!('UpdateCustomer' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </ng-container>\n        </ng-container>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry [isLast]=\"true\"></vdr-timeline-entry>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".entry-list{margin-top:24px;margin-left:24px;margin-right:12px}.note-entry{display:flex;align-items:center}.note-entry .note{flex:1}.note-entry button{margin:0}textarea.note{flex:1;height:36px;border-radius:3px;margin-right:6px}.note-text{color:var(--color-text-100);white-space:pre-wrap}.address-string{font-size:smaller;color:var(--color-text-200)}\n"]
                },] }
    ];
    CustomerHistoryComponent.propDecorators = {
        customer: [{ type: i0.Input }],
        history: [{ type: i0.Input }],
        addNote: [{ type: i0.Output }],
        updateNote: [{ type: i0.Output }],
        deleteNote: [{ type: i0.Output }]
    };

    var CustomerListComponent = /** @class */ (function (_super) {
        __extends(CustomerListComponent, _super);
        function CustomerListComponent(dataService, router, route, modalService, notificationService) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.searchTerm = new forms.FormControl('');
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.customer).getCustomerList.apply(_a, __spreadArray([], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.customers; }, function (skip, take) { return ({
                options: {
                    skip: skip,
                    take: take,
                    filter: {
                        emailAddress: {
                            contains: _this.searchTerm.value,
                        },
                        lastName: {
                            contains: _this.searchTerm.value,
                        },
                        postalCode: {
                            contains: _this.searchTerm.value,
                        },
                    },
                    filterOperator: i2.LogicalOperator.OR,
                    sort: {
                        createdAt: generatedShopTypes.SortOrder.DESC,
                    },
                },
            }); });
            return _this;
        }
        CustomerListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.searchTerm.valueChanges
                .pipe(operators.filter(function (value) { return 2 < value.length || value.length === 0; }), operators.debounceTime(250), operators.takeUntil(this.destroy$))
                .subscribe(function () { return _this.refresh(); });
        };
        CustomerListComponent.prototype.deleteCustomer = function (customer) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-customer'),
                body: customer.firstName + " " + customer.lastName,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.customer.deleteCustomer(customer.id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Customer',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Customer',
                });
            });
        };
        return CustomerListComponent;
    }(i2.BaseListComponent));
    CustomerListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'customer.search-customers-by-email-last-name-postal-code' | translate\"\n            class=\"search-input\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'customer.customer-type' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"left align-middle\">\n            <vdr-customer-status-label [customer]=\"customer\"></vdr-customer-status-label>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCustomer(customer)\"\n                        [disabled]=\"!('DeleteCustomer' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: [".search-input{margin-top:6px;min-width:300px}\n"]
                },] }
    ];
    CustomerListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ModalService },
        { type: i2.NotificationService }
    ]; };

    var CustomerStatusLabelComponent = /** @class */ (function () {
        function CustomerStatusLabelComponent() {
        }
        return CustomerStatusLabelComponent;
    }());
    CustomerStatusLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-status-label',
                    template: "<vdr-chip *ngIf=\"customer.user?.id\">\n    <ng-container *ngIf=\"customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"verified-user-icon\"></clr-icon>\n        {{ 'customer.verified' | translate }}\n    </ng-container>\n    <ng-container *ngIf=\"!customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"registered-user-icon\"></clr-icon>\n        {{ 'customer.registered' | translate }}\n    </ng-container>\n</vdr-chip>\n<vdr-chip *ngIf=\"!customer.user?.id\">{{ 'customer.guest' | translate }}</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".registered-user-icon{color:var(--color-grey-300)}.verified-user-icon{color:var(--color-success-500)}\n"]
                },] }
    ];
    CustomerStatusLabelComponent.propDecorators = {
        customer: [{ type: i0.Input }]
    };

    var CustomerResolver = /** @class */ (function (_super) {
        __extends(CustomerResolver, _super);
        function CustomerResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Customer',
                id: '',
                createdAt: '',
                updatedAt: '',
                title: '',
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                addresses: null,
                user: null,
            }, function (id) { return dataService.customer.getCustomer(id).mapStream(function (data) { return data.customer; }); }) || this;
        }
        return CustomerResolver;
    }(i2.BaseEntityResolver));
    CustomerResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function CustomerResolver_Factory() { return new CustomerResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: CustomerResolver, providedIn: "root" });
    CustomerResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CustomerResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ɵ0 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.customers'),
    }, ɵ1 = {
        breadcrumb: customerBreadcrumb,
    }, ɵ2 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.customer-groups'),
    };
    var customerRoutes = [
        {
            path: 'customers',
            component: CustomerListComponent,
            pathMatch: '',
            data: ɵ0,
        },
        {
            path: 'customers/:id',
            component: CustomerDetailComponent,
            resolve: i2.createResolveData(CustomerResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ1,
        },
        {
            path: 'groups',
            component: CustomerGroupListComponent,
            data: ɵ2,
        },
    ];
    function customerBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.customers',
            getName: function (customer) { return customer.firstName + " " + customer.lastName; },
            route: 'customers',
        });
    }

    var CustomerModule = /** @class */ (function () {
        function CustomerModule() {
        }
        return CustomerModule;
    }());
    CustomerModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(customerRoutes)],
                    declarations: [
                        CustomerListComponent,
                        CustomerDetailComponent,
                        CustomerStatusLabelComponent,
                        AddressCardComponent,
                        CustomerGroupListComponent,
                        CustomerGroupDetailDialogComponent,
                        AddCustomerToGroupDialogComponent,
                        CustomerGroupMemberListComponent,
                        SelectCustomerGroupDialogComponent,
                        CustomerHistoryComponent,
                        AddressDetailDialogComponent,
                    ],
                    exports: [AddressCardComponent],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddCustomerToGroupDialogComponent = AddCustomerToGroupDialogComponent;
    exports.AddressCardComponent = AddressCardComponent;
    exports.AddressDetailDialogComponent = AddressDetailDialogComponent;
    exports.CustomerDetailComponent = CustomerDetailComponent;
    exports.CustomerGroupDetailDialogComponent = CustomerGroupDetailDialogComponent;
    exports.CustomerGroupListComponent = CustomerGroupListComponent;
    exports.CustomerGroupMemberListComponent = CustomerGroupMemberListComponent;
    exports.CustomerHistoryComponent = CustomerHistoryComponent;
    exports.CustomerListComponent = CustomerListComponent;
    exports.CustomerModule = CustomerModule;
    exports.CustomerResolver = CustomerResolver;
    exports.CustomerStatusLabelComponent = CustomerStatusLabelComponent;
    exports.SelectCustomerGroupDialogComponent = SelectCustomerGroupDialogComponent;
    exports.customerBreadcrumb = customerBreadcrumb;
    exports.customerRoutes = customerRoutes;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-customer.umd.js.map

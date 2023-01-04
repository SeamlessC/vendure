(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@vendure/admin-ui/core'), require('rxjs/operators'), require('@angular/forms'), require('@angular/router'), require('@biesbjerg/ngx-translate-extract-marker'), require('@vendure/common/lib/shared-constants'), require('rxjs'), require('@vendure/common/lib/normalize-string'), require('@vendure/common/lib/unique')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/settings', ['exports', '@angular/core', '@vendure/admin-ui/core', 'rxjs/operators', '@angular/forms', '@angular/router', '@biesbjerg/ngx-translate-extract-marker', '@vendure/common/lib/shared-constants', 'rxjs', '@vendure/common/lib/normalize-string', '@vendure/common/lib/unique'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].settings = {}), global.ng.core, global.vendure['admin-ui'].core, global.rxjs.operators, global.ng.forms, global.ng.router, global.ngxTranslateExtractMarker, global.sharedConstants, global.rxjs, global.normalizeString, global.unique));
}(this, (function (exports, i0, i2, operators, forms, i1, ngxTranslateExtractMarker, sharedConstants, rxjs, normalizeString, unique) { 'use strict';

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

    var AddCountryToZoneDialogComponent = /** @class */ (function () {
        function AddCountryToZoneDialogComponent(dataService) {
            this.dataService = dataService;
            this.currentMembers = [];
            this.selectedMemberIds = [];
        }
        AddCountryToZoneDialogComponent.prototype.ngOnInit = function () {
            var currentMemberIds = this.currentMembers.map(function (m) { return m.id; });
            this.availableCountries$ = this.dataService.settings
                .getCountries(999)
                .mapStream(function (data) { return data.countries.items; })
                .pipe(operators.map(function (countries) { return countries.filter(function (c) { return !currentMemberIds.includes(c.id); }); }));
        };
        AddCountryToZoneDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AddCountryToZoneDialogComponent.prototype.add = function () {
            this.resolveWith(this.selectedMemberIds);
        };
        return AddCountryToZoneDialogComponent;
    }());
    AddCountryToZoneDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-add-country-to-zone-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}</ng-template>\n\n<vdr-zone-member-list\n    [members]=\"availableCountries$ | async\"\n    [selectedMemberIds]=\"selectedMemberIds\"\n    (selectionChange)=\"selectedMemberIds = $event\"\n>\n</vdr-zone-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedMemberIds.length\" class=\"btn btn-primary\">\n        {{ 'settings.add-countries-to-zone' | translate: { zoneName: zoneName } }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    AddCountryToZoneDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService }
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

    var AdminDetailComponent = /** @class */ (function (_super) {
        __extends(AdminDetailComponent, _super);
        function AdminDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.selectedRoles = [];
            _this.selectedRolePermissions = {};
            _this.selectedChannelId = null;
            _this.customFields = _this.getCustomFieldConfig('Administrator');
            _this.detailForm = _this.formBuilder.group({
                emailAddress: ['', forms.Validators.required],
                firstName: ['', forms.Validators.required],
                lastName: ['', forms.Validators.required],
                password: [''],
                roles: [[]],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        AdminDetailComponent.prototype.getAvailableChannels = function () {
            return Object.values(this.selectedRolePermissions);
        };
        AdminDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.administrator$ = this.entity$;
            this.allRoles$ = this.dataService.administrator
                .getRoles(999)
                .mapStream(function (item) { return item.roles.items.filter(function (i) { return i.code !== sharedConstants.CUSTOMER_ROLE_CODE; }); });
            this.dataService.client.userStatus().single$.subscribe(function (_a) {
                var userStatus = _a.userStatus;
                if (!userStatus.permissions.includes(i2.Permission.UpdateAdministrator)) {
                    var rolesSelect = _this.detailForm.get('roles');
                    if (rolesSelect) {
                        rolesSelect.disable();
                    }
                }
            });
            this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
        };
        AdminDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        AdminDetailComponent.prototype.rolesChanged = function (roles) {
            this.buildPermissionsMap();
        };
        AdminDetailComponent.prototype.getPermissionsForSelectedChannel = function () {
            function getActivePermissions(input) {
                return Object.entries(input)
                    .filter(function (_a) {
                    var _b = __read(_a, 2), permission = _b[0], active = _b[1];
                    return active;
                })
                    .map(function (_a) {
                    var _b = __read(_a, 2), permission = _b[0], active = _b[1];
                    return permission;
                });
            }
            if (this.selectedChannelId) {
                var selectedChannel = this.selectedRolePermissions[this.selectedChannelId];
                if (selectedChannel) {
                    var permissionMap = this.selectedRolePermissions[this.selectedChannelId].permissions;
                    return getActivePermissions(permissionMap);
                }
            }
            var channels = Object.values(this.selectedRolePermissions);
            if (0 < channels.length) {
                this.selectedChannelId = channels[0].channelId;
                return getActivePermissions(channels[0].permissions);
            }
            return [];
        };
        AdminDetailComponent.prototype.create = function () {
            var _this = this;
            var formValue = this.detailForm.value;
            var administrator = {
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                customFields: formValue.customFields,
                roleIds: formValue.roles.map(function (role) { return role.id; }),
            };
            this.dataService.administrator.createAdministrator(administrator).subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Administrator',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createAdministrator.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Administrator',
                });
            });
        };
        AdminDetailComponent.prototype.save = function () {
            var _this = this;
            this.administrator$
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var id = _a.id;
                var formValue = _this.detailForm.value;
                var administrator = {
                    id: id,
                    emailAddress: formValue.emailAddress,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    password: formValue.password,
                    customFields: formValue.customFields,
                    roleIds: formValue.roles.map(function (role) { return role.id; }),
                };
                return _this.dataService.administrator.updateAdministrator(administrator);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Administrator',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Administrator',
                });
            });
        };
        AdminDetailComponent.prototype.setFormValues = function (administrator, languageCode) {
            this.detailForm.patchValue({
                emailAddress: administrator.emailAddress,
                firstName: administrator.firstName,
                lastName: administrator.lastName,
                roles: administrator.user.roles,
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), administrator);
            }
            var passwordControl = this.detailForm.get('password');
            if (passwordControl) {
                if (!administrator.id) {
                    passwordControl.setValidators([forms.Validators.required]);
                }
                else {
                    passwordControl.setValidators([]);
                }
            }
            this.buildPermissionsMap();
        };
        AdminDetailComponent.prototype.buildPermissionsMap = function () {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            var permissionsControl = this.detailForm.get('roles');
            if (permissionsControl) {
                var roles = permissionsControl.value;
                var channelIdPermissionsMap = new Map();
                var channelIdCodeMap = new Map();
                try {
                    for (var roles_1 = __values(roles), roles_1_1 = roles_1.next(); !roles_1_1.done; roles_1_1 = roles_1.next()) {
                        var role = roles_1_1.value;
                        var _loop_1 = function (channel) {
                            var channelPermissions = channelIdPermissionsMap.get(channel.id);
                            var permissionSet = channelPermissions || new Set();
                            role.permissions.forEach(function (p) { return permissionSet.add(p); });
                            channelIdPermissionsMap.set(channel.id, permissionSet);
                            channelIdCodeMap.set(channel.id, channel.code);
                        };
                        try {
                            for (var _e = (e_2 = void 0, __values(role.channels)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var channel = _f.value;
                                _loop_1(channel);
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
                        if (roles_1_1 && !roles_1_1.done && (_a = roles_1.return)) _a.call(roles_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.selectedRolePermissions = {};
                try {
                    for (var _g = __values(Array.from(channelIdPermissionsMap.keys())), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var channelId = _h.value;
                        // tslint:disable-next-line:no-non-null-assertion
                        var permissionSet = channelIdPermissionsMap.get(channelId);
                        var permissionsHash = {};
                        try {
                            for (var _j = (e_4 = void 0, __values(this.serverConfigService.getPermissionDefinitions())), _k = _j.next(); !_k.done; _k = _j.next()) {
                                var def = _k.value;
                                permissionsHash[def.name] = permissionSet.has(def.name);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        this.selectedRolePermissions[channelId] = {
                            // tslint:disable:no-non-null-assertion
                            channelId: channelId,
                            channelCode: channelIdCodeMap.get(channelId),
                            permissions: permissionsHash,
                            // tslint:enable:no-non-null-assertion
                        };
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        return AdminDetailComponent;
    }(i2.BaseDetailComponent));
    AdminDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-admin-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input\n            id=\"emailAddress\"\n            type=\"text\"\n            formControlName=\"emailAddress\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input\n            id=\"firstName\"\n            type=\"text\"\n            formControlName=\"firstName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input\n            id=\"lastName\"\n            type=\"text\"\n            formControlName=\"lastName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <vdr-form-field\n        *ngIf=\"!(isNew$ | async) && ('UpdateAdministrator' | hasPermission)\"\n        [label]=\"'settings.password' | translate\"\n        for=\"password\"\n        [readOnlyToggle]=\"true\"\n    >\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Administrator\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"administrator-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n    <label class=\"clr-control-label\">{{ 'settings.roles' | translate }}</label>\n    <ng-select\n        [items]=\"allRoles$ | async\"\n        [multiple]=\"true\"\n        [hideSelected]=\"true\"\n        formControlName=\"roles\"\n        (change)=\"rolesChanged($event)\"\n        bindLabel=\"description\"\n    ></ng-select>\n\n    <ul class=\"nav\" role=\"tablist\">\n        <li role=\"presentation\" class=\"nav-item\" *ngFor=\"let channel of getAvailableChannels()\">\n            <button\n                [id]=\"channel.channelId\"\n                (click)=\"selectedChannelId = channel.channelId\"\n                class=\"btn btn-link nav-link\"\n                [class.active]=\"selectedChannelId === channel.channelId\"\n                [attr.aria-selected]=\"selectedChannelId === channel.channelId\"\n                type=\"button\"\n            >\n                {{ channel.channelCode | channelCodeToLabel | translate }}\n            </button>\n        </li>\n    </ul>\n    <vdr-permission-grid\n        [activePermissions]=\"getPermissionsForSelectedChannel()\"\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [readonly]=\"true\"\n    ></vdr-permission-grid>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    AdminDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var AdministratorListComponent = /** @class */ (function (_super) {
        __extends(AdministratorListComponent, _super);
        function AdministratorListComponent(dataService, router, route, modalService, notificationService) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.administrator).getAdministrators.apply(_a, __spreadArray([], __read(args)));
            }, function (data) { return data.administrators; });
            return _this;
        }
        AdministratorListComponent.prototype.deleteAdministrator = function (administrator) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-administrator'),
                body: administrator.firstName + " " + administrator.lastName,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return res ? _this.dataService.administrator.deleteAdministrator(administrator.id) : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Administrator',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Administrator',
                });
            });
        };
        return AdministratorListComponent;
    }(i2.BaseListComponent));
    AdministratorListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-administrator-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'admin.create-new-administrator' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'settings.first-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.last-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-administrator=\"item\">\n        <td class=\"left align-middle\">{{ administrator.firstName }}</td>\n        <td class=\"left align-middle\">{{ administrator.lastName }}</td>\n        <td class=\"left align-middle\">{{ administrator.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', administrator.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteAdministrator(administrator)\"\n                        [disabled]=\"!('DeleteAdministrator' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: [""]
                },] }
    ];
    AdministratorListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ModalService },
        { type: i2.NotificationService }
    ]; };

    var ChannelDetailComponent = /** @class */ (function (_super) {
        __extends(ChannelDetailComponent, _super);
        function ChannelDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.serverConfigService = serverConfigService;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.currencyCodes = Object.values(i2.CurrencyCode);
            _this.updatePermission = [i2.Permission.SuperAdmin, i2.Permission.UpdateChannel, i2.Permission.CreateChannel];
            _this.customFields = _this.getCustomFieldConfig('Channel');
            _this.detailForm = _this.formBuilder.group({
                code: ['', forms.Validators.required],
                token: ['', forms.Validators.required],
                pricesIncludeTax: [false],
                currencyCode: [''],
                defaultShippingZoneId: ['', forms.Validators.required],
                defaultLanguageCode: [],
                defaultTaxZoneId: ['', forms.Validators.required],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        ChannelDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.zones$ = this.dataService.settings.getZones().mapSingle(function (data) { return data.zones; });
            this.availableLanguageCodes$ = this.serverConfigService.getAvailableLanguages();
        };
        ChannelDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ChannelDetailComponent.prototype.saveButtonEnabled = function () {
            return this.detailForm.dirty && this.detailForm.valid;
        };
        ChannelDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            var input = {
                code: formValue.code,
                token: formValue.token,
                defaultLanguageCode: formValue.defaultLanguageCode,
                pricesIncludeTax: formValue.pricesIncludeTax,
                currencyCode: formValue.currencyCode,
                defaultShippingZoneId: formValue.defaultShippingZoneId,
                defaultTaxZoneId: formValue.defaultTaxZoneId,
                customFields: formValue.customFields,
            };
            this.dataService.settings
                .createChannel(input)
                .pipe(operators.mergeMap(function (_a) {
                var createChannel = _a.createChannel;
                return _this.dataService.auth.currentUser().single$.pipe(operators.map(function (_a) {
                    var me = _a.me;
                    return ({
                        me: me,
                        createChannel: createChannel,
                    });
                }));
            }), operators.mergeMap(function (_a) {
                var me = _a.me, createChannel = _a.createChannel;
                // tslint:disable-next-line:no-non-null-assertion
                return _this.dataService.client.updateUserChannels(me.channels).pipe(operators.map(function () { return createChannel; }));
            }))
                .subscribe(function (data) {
                switch (data.__typename) {
                    case 'Channel':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                            entity: 'Channel',
                        });
                        _this.detailForm.markAsPristine();
                        _this.changeDetector.markForCheck();
                        _this.router.navigate(['../', data.id], { relativeTo: _this.route });
                        break;
                    case 'LanguageNotAvailableError':
                        _this.notificationService.error(data.message);
                        break;
                }
            });
        };
        ChannelDetailComponent.prototype.save = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (channel) {
                var input = {
                    id: channel.id,
                    code: formValue.code,
                    token: formValue.token,
                    pricesIncludeTax: formValue.pricesIncludeTax,
                    currencyCode: formValue.currencyCode,
                    defaultShippingZoneId: formValue.defaultShippingZoneId,
                    defaultLanguageCode: formValue.defaultLanguageCode,
                    defaultTaxZoneId: formValue.defaultTaxZoneId,
                    customFields: formValue.customFields,
                };
                return _this.dataService.settings.updateChannel(input);
            }))
                .subscribe(function (_a) {
                var updateChannel = _a.updateChannel;
                switch (updateChannel.__typename) {
                    case 'Channel':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                            entity: 'Channel',
                        });
                        _this.detailForm.markAsPristine();
                        _this.changeDetector.markForCheck();
                        break;
                    case 'LanguageNotAvailableError':
                        _this.notificationService.error(updateChannel.message);
                }
            });
        };
        /**
         * Update the form values when the entity changes.
         */
        ChannelDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            this.detailForm.patchValue({
                code: entity.code,
                token: entity.token || this.generateToken(),
                pricesIncludeTax: entity.pricesIncludeTax,
                currencyCode: entity.currencyCode,
                defaultShippingZoneId: entity.defaultShippingZone ? entity.defaultShippingZone.id : '',
                defaultLanguageCode: entity.defaultLanguageCode,
                defaultTaxZoneId: entity.defaultTaxZone ? entity.defaultTaxZone.id : '',
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), entity);
            }
            if (entity.code === sharedConstants.DEFAULT_CHANNEL_CODE) {
                var codeControl = this.detailForm.get('code');
                if (codeControl) {
                    codeControl.disable();
                }
            }
        };
        ChannelDetailComponent.prototype.generateToken = function () {
            var randomString = function () { return Math.random().toString(36).substr(3, 10); };
            return "" + randomString() + randomString();
        };
        return ChannelDetailComponent;
    }(i2.BaseDetailComponent));
    ChannelDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-channel-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"channel-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"['SuperAdmin', 'UpdateChannel']\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input\n            id=\"code\"\n            type=\"text\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            formControlName=\"code\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel-token' | translate\" for=\"token\">\n        <input\n            id=\"token\"\n            type=\"text\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            formControlName=\"token\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.currency' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"currencyCode\"\n            formControlName=\"currencyCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let code of currencyCodes\" [value]=\"code\">{{ code | localeCurrencyName }}</option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.default-language' | translate\" for=\"defaultLanguage\">\n        <select\n            clrSelect\n            name=\"defaultLanguageCode\"\n            formControlName=\"defaultLanguageCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let languageCode of availableLanguageCodes$ | async\" [value]=\"languageCode\">\n                {{ languageCode | localeLanguageName }} ({{ languageCode | uppercase }})\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.prices-include-tax' | translate\" for=\"pricesIncludeTax\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"pricesIncludeTax\"\n                formControlName=\"pricesIncludeTax\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.default-tax-zone' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"defaultTaxZoneId\"\n            formControlName=\"defaultTaxZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option selected value style=\"display: none\"></option>\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultTaxZoneId\"\n        clrAlertType=\"danger\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-tax-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <vdr-form-field [label]=\"'settings.default-shipping-zone' | translate\" for=\"defaultShippingZoneId\">\n        <select\n            clrSelect\n            name=\"defaultShippingZoneId\"\n            formControlName=\"defaultShippingZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option selected value style=\"display: none\"></option>\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultShippingZoneId\"\n        clrAlertType=\"warning\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-shipping-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Channel\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"channel-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["clr-alert{max-width:30rem;margin-bottom:12px}\n"]
                },] }
    ];
    ChannelDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var ChannelListComponent = /** @class */ (function () {
        function ChannelListComponent(dataService, modalService, notificationService) {
            var _this = this;
            this.dataService = dataService;
            this.modalService = modalService;
            this.notificationService = notificationService;
            this.refresh$ = new rxjs.Subject();
            this.channels$ = this.refresh$.pipe(operators.startWith(1), operators.switchMap(function () { return _this.dataService.settings.getChannels().mapStream(function (data) { return data.channels; }); }));
        }
        ChannelListComponent.prototype.isDefaultChannel = function (channelCode) {
            return channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
        };
        ChannelListComponent.prototype.deleteChannel = function (id) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-channel'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return (response ? _this.dataService.settings.deleteChannel(id) : rxjs.EMPTY); }), operators.mergeMap(function () { return _this.dataService.auth.currentUser().single$; }), 
            // tslint:disable-next-line:no-non-null-assertion
            operators.mergeMap(function (data) { return _this.dataService.client.updateUserChannels(data.me.channels); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Channel',
                });
                _this.refresh$.next(1);
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Channel',
                });
            });
        };
        return ChannelListComponent;
    }());
    ChannelListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-channel-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"channel-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['SuperAdmin', 'CreateChannel']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-channel' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"channels$ | async\">\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-channel=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n            {{ channel.code | channelCodeToLabel | translate }}\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', channel.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger [disabled]=\"isDefaultChannel(channel.code)\">\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteChannel(channel.id)\"\n                        [disabled]=\"!(['SuperAdmin', 'DeleteChannel'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ChannelListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService }
    ]; };

    var CountryDetailComponent = /** @class */ (function (_super) {
        __extends(CountryDetailComponent, _super);
        function CountryDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdateCountry];
            _this.customFields = _this.getCustomFieldConfig('Country');
            _this.detailForm = _this.formBuilder.group({
                code: ['', forms.Validators.required],
                name: ['', forms.Validators.required],
                enabled: [true],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        CountryDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.country$ = this.entity$;
        };
        CountryDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        CountryDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            rxjs.combineLatest(this.country$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), country = _b[0], languageCode = _b[1];
                var formValue = _this.detailForm.value;
                var input = i2.createUpdatedTranslatable({
                    translatable: country,
                    updatedFields: formValue,
                    customFieldConfig: _this.customFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        name: formValue.name,
                        languageCode: languageCode,
                    },
                });
                return _this.dataService.settings.createCountry(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Country',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createCountry.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Country',
                });
            });
        };
        CountryDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.country$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), country = _b[0], languageCode = _b[1];
                var formValue = _this.detailForm.value;
                var input = i2.createUpdatedTranslatable({
                    translatable: country,
                    updatedFields: formValue,
                    customFieldConfig: _this.customFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        name: formValue.name,
                        languageCode: languageCode,
                    },
                });
                return _this.dataService.settings.updateCountry(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Country',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Country',
                });
            });
        };
        CountryDetailComponent.prototype.setFormValues = function (country, languageCode) {
            var currentTranslation = i2.findTranslation(country, languageCode);
            this.detailForm.patchValue({
                code: country.code,
                name: currentTranslation ? currentTranslation.name : '',
                enabled: country.enabled,
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), country, currentTranslation);
            }
        };
        return CountryDetailComponent;
    }(i2.BaseDetailComponent));
    CountryDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-country-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"country-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                *vdrIfPermissions=\"updatePermission\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Country\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"country-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CountryDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var CountryListComponent = /** @class */ (function () {
        function CountryListComponent(dataService, notificationService, modalService, serverConfigService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.serverConfigService = serverConfigService;
            this.searchTerm = new forms.FormControl('');
            this.countries = [];
            this.destroy$ = new rxjs.Subject();
            this.refresh$ = new rxjs.Subject();
        }
        CountryListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_a) {
                var uiState = _a.uiState;
                return uiState.contentLanguage;
            });
            var countries$ = rxjs.combineLatest(this.contentLanguage$, this.searchTerm.valueChanges.pipe(operators.startWith(null))).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), __ = _b[0], term = _b[1];
                return term;
            }), operators.switchMap(function (term) { return _this.dataService.settings.getCountries(999, 0, term).single$; }), operators.tap(function (data) {
                _this.countries = data.countries.items;
            }), operators.map(function (data) { return data.countries.items; }));
            this.zones$ = this.dataService.settings.getZones().mapStream(function (data) { return data.zones; });
            this.countriesWithZones$ = rxjs.combineLatest(countries$, this.zones$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), countries = _b[0], zones = _b[1];
                return countries.map(function (country) { return (Object.assign(Object.assign({}, country), { zones: zones.filter(function (z) { return !!z.members.find(function (c) { return c.id === country.id; }); }) })); });
            }));
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        };
        CountryListComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next(undefined);
            this.destroy$.complete();
        };
        CountryListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        CountryListComponent.prototype.deleteCountry = function (countryId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-country'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.dataService.settings.deleteCountry(countryId) : rxjs.EMPTY; }))
                .subscribe(function (response) {
                if (response.deleteCountry.result === i2.DeletionResult.DELETED) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'Country',
                    });
                    _this.dataService.settings.getCountries(999, 0).single$.subscribe();
                }
                else {
                    _this.notificationService.error(response.deleteCountry.message || '');
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Country',
                });
            });
        };
        CountryListComponent.prototype.isZone = function (input) {
            return input.hasOwnProperty('id');
        };
        return CountryListComponent;
    }());
    CountryListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-country-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"searchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'settings.search-country-by-name' | translate\"\n            class=\"search-input\"\n        />\n        <div>\n            <vdr-language-selector\n                [availableLanguageCodes]=\"availableLanguages$ | async\"\n                [currentLanguageCode]=\"contentLanguage$ | async\"\n                (languageCodeChange)=\"setLanguage($event)\"\n            ></vdr-language-selector>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"country-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            [routerLink]=\"['./create']\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateCountry']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-country' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"countriesWithZones$ | async\">\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.zone' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-country=\"item\">\n        <td class=\"left align-middle\">{{ country.code }}</td>\n        <td class=\"left align-middle\">{{ country.name }}</td>\n        <td class=\"left align-middle\">\n            <a\n                [routerLink]=\"['/settings', 'zones', { contents: zone.id }]\"\n                *ngFor=\"let zone of country.zones\"\n            >\n                <vdr-chip [colorFrom]=\"zone.name\">{{ zone.name }}</vdr-chip>\n            </a>\n        </td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"country.enabled\"\n                [attr.shape]=\"country.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', country.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCountry(country.id)\"\n                        vdrDropdownItem\n                        [disabled]=\"!(['DeleteSettings', 'DeleteCountry'] | hasPermission)\"\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".search-input{margin-top:6px;min-width:300px}\n"]
                },] }
    ];
    CountryListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i2.ServerConfigService }
    ]; };

    var GlobalSettingsComponent = /** @class */ (function (_super) {
        __extends(GlobalSettingsComponent, _super);
        function GlobalSettingsComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.languageCodes = Object.values(i2.LanguageCode);
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdateGlobalSettings];
            _this.customFields = _this.getCustomFieldConfig('GlobalSettings');
            _this.detailForm = _this.formBuilder.group({
                availableLanguages: [''],
                trackInventory: false,
                outOfStockThreshold: [0, forms.Validators.required],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        GlobalSettingsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.dataService.client.userStatus().single$.subscribe(function (_a) {
                var userStatus = _a.userStatus;
                if (!userStatus.permissions.includes(i2.Permission.UpdateSettings)) {
                    var languagesSelect = _this.detailForm.get('availableLanguages');
                    if (languagesSelect) {
                        languagesSelect.disable();
                    }
                }
            });
        };
        GlobalSettingsComponent.prototype.save = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            this.dataService.settings
                .updateGlobalSettings(this.detailForm.value)
                .pipe(operators.tap(function (_a) {
                var updateGlobalSettings = _a.updateGlobalSettings;
                switch (updateGlobalSettings.__typename) {
                    case 'GlobalSettings':
                        _this.detailForm.markAsPristine();
                        _this.changeDetector.markForCheck();
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                            entity: 'Settings',
                        });
                        break;
                    case 'ChannelDefaultLanguageError':
                        _this.notificationService.error(updateGlobalSettings.message);
                }
            }), operators.switchMap(function () { return _this.serverConfigService.refreshGlobalSettings(); }), operators.withLatestFrom(this.dataService.client.uiState().single$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), globalSettings = _b[0].globalSettings, uiState = _b[1].uiState;
                var availableLangs = globalSettings.availableLanguages;
                if (availableLangs.length && !availableLangs.includes(uiState.contentLanguage)) {
                    _this.dataService.client.setContentLanguage(availableLangs[0]).subscribe();
                }
            });
        };
        GlobalSettingsComponent.prototype.setFormValues = function (entity, languageCode) {
            this.detailForm.patchValue({
                availableLanguages: entity.availableLanguages,
                trackInventory: entity.trackInventory,
                outOfStockThreshold: entity.outOfStockThreshold,
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
            }
        };
        return GlobalSettingsComponent;
    }(i2.BaseDetailComponent));
    GlobalSettingsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-global-settings',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"global-settings-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            *vdrIfPermissions=\"updatePermission\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.available-languages' | translate\" for=\"availableLanguages\">\n        <ng-select\n            [items]=\"languageCodes\"\n            [addTag]=\"false\"\n            [hideSelected]=\"true\"\n            multiple=\"true\"\n            appendTo=\"body\"\n            formControlName=\"availableLanguages\"\n        >\n            <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                <span class=\"ng-value-icon left\" (click)=\"clear.call(null, item)\" aria-hidden=\"true\">\n                    \u00D7\n                </span>\n                <span class=\"ng-value-label\">{{ item | localeLanguageName }} ({{ item }})</span>\n            </ng-template>\n            <ng-template ng-option-tmp let-item=\"item\">\n                {{ item | localeLanguageName }} ({{ item }})\n            </ng-template>\n        </ng-select>\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.global-out-of-stock-threshold' | translate\"\n        for=\"outOfStockThreshold\"\n        [tooltip]=\"'settings.global-out-of-stock-threshold-tooltip' | translate\"\n    >\n        <input\n            id=\"outOfStockThreshold\"\n            type=\"number\"\n            formControlName=\"outOfStockThreshold\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.track-inventory-default' | translate\"\n        for=\"enabled\"\n        [tooltip]=\"'catalog.track-inventory-tooltip' | translate\"\n    >\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                name=\"enabled\"\n                formControlName=\"trackInventory\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"GlobalSettings\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"global-settings-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["::ng-deep ng-select .ng-value>span{margin:0!important}::ng-deep ng-select .ng-arrow-wrapper .ng-arrow{margin:0!important}::ng-deep ng-select .ng-select-container>span{margin:0!important}\n"]
                },] }
    ];
    GlobalSettingsComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var PaymentMethodDetailComponent = /** @class */ (function (_super) {
        __extends(PaymentMethodDetailComponent, _super);
        function PaymentMethodDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.checkers = [];
            _this.handlers = [];
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdatePaymentMethod];
            _this.customFields = _this.getCustomFieldConfig('PaymentMethod');
            _this.detailForm = _this.formBuilder.group({
                code: ['', forms.Validators.required],
                name: ['', forms.Validators.required],
                description: '',
                enabled: [true, forms.Validators.required],
                checker: {},
                handler: {},
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        PaymentMethodDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            rxjs.combineLatest([
                this.dataService.settings.getPaymentMethodOperations().single$,
                this.entity$.pipe(operators.take(1)),
            ]).subscribe(function (_a) {
                var _b = __read(_a, 2), data = _b[0], entity = _b[1];
                _this.checkers = data.paymentMethodEligibilityCheckers;
                _this.handlers = data.paymentMethodHandlers;
                _this.changeDetector.markForCheck();
                _this.selectedCheckerDefinition = data.paymentMethodEligibilityCheckers.find(function (c) { return c.code === (entity.checker && entity.checker.code); });
                _this.selectedHandlerDefinition = data.paymentMethodHandlers.find(function (c) { return c.code === (entity.handler && entity.handler.code); });
            });
        };
        PaymentMethodDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        PaymentMethodDetailComponent.prototype.updateCode = function (currentCode, nameValue) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        PaymentMethodDetailComponent.prototype.configArgsIsPopulated = function () {
            var configArgsGroup = this.detailForm.get('configArgs');
            if (!configArgsGroup) {
                return false;
            }
            return 0 < Object.keys(configArgsGroup.controls).length;
        };
        PaymentMethodDetailComponent.prototype.selectChecker = function (checker) {
            this.selectedCheckerDefinition = checker;
            this.selectedChecker = i2.configurableDefinitionToInstance(checker);
            var formControl = this.detailForm.get('checker');
            if (formControl) {
                formControl.clearValidators();
                formControl.updateValueAndValidity({ onlySelf: true });
                formControl.patchValue(this.selectedChecker);
            }
            this.detailForm.markAsDirty();
        };
        PaymentMethodDetailComponent.prototype.selectHandler = function (handler) {
            this.selectedHandlerDefinition = handler;
            this.selectedHandler = i2.configurableDefinitionToInstance(handler);
            var formControl = this.detailForm.get('handler');
            if (formControl) {
                formControl.clearValidators();
                formControl.updateValueAndValidity({ onlySelf: true });
                formControl.patchValue(this.selectedHandler);
            }
            this.detailForm.markAsDirty();
        };
        PaymentMethodDetailComponent.prototype.removeChecker = function () {
            this.selectedChecker = null;
            this.detailForm.markAsDirty();
        };
        PaymentMethodDetailComponent.prototype.removeHandler = function () {
            this.selectedHandler = null;
            this.detailForm.markAsDirty();
        };
        PaymentMethodDetailComponent.prototype.create = function () {
            var _this = this;
            var selectedChecker = this.selectedChecker;
            var selectedHandler = this.selectedHandler;
            if (!selectedHandler) {
                return;
            }
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var id = _a.id;
                var formValue = _this.detailForm.value;
                var input = {
                    name: formValue.name,
                    code: formValue.code,
                    description: formValue.description,
                    enabled: formValue.enabled,
                    checker: selectedChecker
                        ? i2.toConfigurableOperationInput(selectedChecker, formValue.checker)
                        : null,
                    handler: i2.toConfigurableOperationInput(selectedHandler, formValue.handler),
                    customFields: formValue.customFields,
                };
                return _this.dataService.settings.createPaymentMethod(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'PaymentMethod',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createPaymentMethod.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'PaymentMethod',
                });
            });
        };
        PaymentMethodDetailComponent.prototype.save = function () {
            var _this = this;
            var selectedChecker = this.selectedChecker;
            var selectedHandler = this.selectedHandler;
            if (!selectedHandler) {
                return;
            }
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var id = _a.id;
                var formValue = _this.detailForm.value;
                var input = {
                    id: id,
                    name: formValue.name,
                    code: formValue.code,
                    description: formValue.description,
                    enabled: formValue.enabled,
                    checker: selectedChecker
                        ? i2.toConfigurableOperationInput(selectedChecker, formValue.checker)
                        : null,
                    handler: i2.toConfigurableOperationInput(selectedHandler, formValue.handler),
                    customFields: formValue.customFields,
                };
                return _this.dataService.settings.updatePaymentMethod(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'PaymentMethod',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'PaymentMethod',
                });
            });
        };
        PaymentMethodDetailComponent.prototype.setFormValues = function (paymentMethod) {
            this.detailForm.patchValue({
                name: paymentMethod.name,
                code: paymentMethod.code,
                description: paymentMethod.description,
                enabled: paymentMethod.enabled,
                checker: paymentMethod.checker || {},
                handler: paymentMethod.handler || {},
            });
            if (!this.selectedChecker) {
                this.selectedChecker = paymentMethod.checker && {
                    code: paymentMethod.checker.code,
                    args: paymentMethod.checker.args.map(function (a) { return (Object.assign(Object.assign({}, a), { value: i2.getConfigArgValue(a.value) })); }),
                };
            }
            if (!this.selectedHandler) {
                this.selectedHandler = paymentMethod.handler && {
                    code: paymentMethod.handler.code,
                    args: paymentMethod.handler.args.map(function (a) { return (Object.assign(Object.assign({}, a), { value: i2.getConfigArgValue(a.value) })); }),
                };
            }
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), paymentMethod);
            }
        };
        return PaymentMethodDetailComponent;
    }(i2.BaseDetailComponent));
    PaymentMethodDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-payment-method-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"payment-method-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            [disabled]=\"detailForm.pristine || detailForm.invalid\"\n            (click)=\"create()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.pristine || detailForm.invalid || !selectedHandler\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as paymentMethod\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            (input)=\"updateCode(paymentMethod.code, $event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"updatePermission | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-rich-text-editor\n        formControlName=\"description\"\n        [readonly]=\"!(updatePermission | hasPermission)\"\n        [label]=\"'common.description' | translate\"\n    ></vdr-rich-text-editor>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"description\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"enabled\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"PaymentMethod\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n\n    <vdr-custom-detail-component-host\n        locationId=\"payment-method-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n\n    <div class=\"clr-row mt4\">\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-eligibility-checker' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedChecker && selectedCheckerDefinition\"\n                [operation]=\"selectedChecker\"\n                [operationDefinition]=\"selectedCheckerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeChecker()\"\n                formControlName=\"checker\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedChecker || !selectedCheckerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let checker of checkers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectChecker(checker)\"\n                        >\n                            {{ checker.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-handler' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedHandler && selectedHandlerDefinition\"\n                [operation]=\"selectedHandler\"\n                [operationDefinition]=\"selectedHandlerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeHandler()\"\n                formControlName=\"handler\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedHandler || !selectedHandlerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let handler of handlers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectHandler(handler)\"\n                        >\n                            {{ handler.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    PaymentMethodDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var PaymentMethodListComponent = /** @class */ (function (_super) {
        __extends(PaymentMethodListComponent, _super);
        function PaymentMethodListComponent(dataService, router, route, modalService, notificationService) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.settings).getPaymentMethods.apply(_a, __spreadArray([], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.paymentMethods; });
            return _this;
        }
        PaymentMethodListComponent.prototype.deletePaymentMethod = function (paymentMethodId) {
            var _this = this;
            this.showModalAndDelete(paymentMethodId)
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(paymentMethodId, response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }), 
            // Refresh the cached facets to reflect the changes
            operators.switchMap(function () { return _this.dataService.settings.getPaymentMethods(100).single$; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'PaymentMethod',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'PaymentMethod',
                });
            });
        };
        PaymentMethodListComponent.prototype.showModalAndDelete = function (paymentMethodId, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('settings.confirm-delete-payment-method'),
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return res ? _this.dataService.settings.deletePaymentMethod(paymentMethodId, !!message) : rxjs.EMPTY; }), operators.map(function (res) { return res.deletePaymentMethod; }));
        };
        return PaymentMethodListComponent;
    }(i2.BaseListComponent));
    PaymentMethodListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-payment-method-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"payment-method-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreatePaymentMethod']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-payment-method' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-paymentMethod=\"item\">\n        <td class=\"left align-middle\">{{ paymentMethod.code }}</td>\n        <td class=\"left align-middle\">{{ paymentMethod.enabled }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', paymentMethod.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deletePaymentMethod(paymentMethod.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeletePaymentMethod'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    PaymentMethodListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ModalService },
        { type: i2.NotificationService }
    ]; };

    /**
     * A table showing and allowing the setting of all possible CRUD permissions.
     */
    var PermissionGridComponent = /** @class */ (function () {
        function PermissionGridComponent() {
            this.readonly = false;
            this.permissionChange = new i0.EventEmitter();
        }
        PermissionGridComponent.prototype.ngOnInit = function () {
            this.buildGrid();
        };
        PermissionGridComponent.prototype.setPermission = function (permission, value) {
            if (!this.readonly) {
                this.permissionChange.emit({ permission: permission, value: value });
            }
        };
        PermissionGridComponent.prototype.toggleAll = function (defs) {
            var e_1, _b;
            var _this = this;
            var value = defs.some(function (d) { return !_this.activePermissions.includes(d.name); });
            try {
                for (var defs_1 = __values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                    var def = defs_1_1.value;
                    this.permissionChange.emit({ permission: def.name, value: value });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (defs_1_1 && !defs_1_1.done && (_b = defs_1.return)) _b.call(defs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PermissionGridComponent.prototype.buildGrid = function () {
            var e_2, _b;
            var _this = this;
            var _a;
            var crudGroups = new Map();
            var nonCrud = [];
            var crudRe = /^(Create|Read|Update|Delete)([a-zA-Z]+)$/;
            try {
                for (var _c = __values(this.permissionDefinitions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var def = _d.value;
                    var isCrud = crudRe.test(def.name);
                    if (isCrud) {
                        var groupName = (_a = def.name.match(crudRe)) === null || _a === void 0 ? void 0 : _a[2];
                        if (groupName) {
                            var existing = crudGroups.get(groupName);
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
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.gridData = __spreadArray(__spreadArray([], __read(nonCrud.map(function (d) { return ({
                label: d.name,
                description: d.description,
                permissions: [d],
            }); }))), __read(Array.from(crudGroups.entries()).map(function (_b) {
                var _c = __read(_b, 2), label = _c[0], defs = _c[1];
                return {
                    label: label,
                    description: _this.extractCrudDescription(defs[0]),
                    permissions: defs,
                };
            })));
        };
        PermissionGridComponent.prototype.extractCrudDescription = function (def) {
            return def.description.replace(/Grants permission to [\w]+/, 'Grants permissions on');
        };
        return PermissionGridComponent;
    }());
    PermissionGridComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-permission-grid',
                    template: "<table class=\"table\">\n    <tbody>\n        <tr *ngFor=\"let section of gridData\">\n            <td class=\"permission-group left\">\n                <div><strong>{{ section.label | translate }}</strong></div>\n                <small>{{ section.description | translate }}</small><br>\n                <button *ngIf=\"1 < section.permissions.length && !readonly\" class=\"btn btn-sm btn-link\" (click)=\"toggleAll(section.permissions)\">\n                    {{ 'common.toggle-all' | translate }}\n                </button>\n            </td>\n            <td *ngFor=\"let permission of section.permissions\" [attr.colspan]=\"section.permissions.length === 1 ? 4 : 1\">\n                <vdr-select-toggle\n                    size=\"small\"\n                    [title]=\"permission.description\"\n                    [label]=\"permission.name\"\n                    [disabled]=\"readonly\"\n                    [selected]=\"activePermissions?.includes(permission.name)\"\n                    (selectedChange)=\"setPermission(permission.name, $event)\"\n                ></vdr-select-toggle>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["td.permission-group{max-width:300px;background-color:var(--color-component-bg-200)}\n"]
                },] }
    ];
    PermissionGridComponent.propDecorators = {
        permissionDefinitions: [{ type: i0.Input }],
        activePermissions: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        permissionChange: [{ type: i0.Output }]
    };

    var ProfileComponent = /** @class */ (function (_super) {
        __extends(ProfileComponent, _super);
        function ProfileComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.customFields = _this.getCustomFieldConfig('Administrator');
            _this.detailForm = _this.formBuilder.group({
                emailAddress: ['', forms.Validators.required],
                firstName: ['', forms.Validators.required],
                lastName: ['', forms.Validators.required],
                password: [''],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        ProfileComponent.prototype.ngOnInit = function () {
            this.init();
        };
        ProfileComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ProfileComponent.prototype.save = function () {
            var _this = this;
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var id = _a.id;
                var formValue = _this.detailForm.value;
                var administrator = {
                    emailAddress: formValue.emailAddress,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    password: formValue.password,
                    customFields: formValue.customFields,
                };
                return _this.dataService.administrator.updateActiveAdministrator(administrator);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Administrator',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Administrator',
                });
            });
        };
        ProfileComponent.prototype.setFormValues = function (administrator, languageCode) {
            this.detailForm.patchValue({
                emailAddress: administrator.emailAddress,
                firstName: administrator.firstName,
                lastName: administrator.lastName,
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), administrator);
            }
        };
        return ProfileComponent;
    }(i2.BaseDetailComponent));
    ProfileComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-profile',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\"/>\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\"/>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.password' | translate\" for=\"password\" [readOnlyToggle]=\"true\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\"/>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Administrator\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"administrator-profile\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ProfileComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var RoleDetailComponent = /** @class */ (function (_super) {
        __extends(RoleDetailComponent, _super);
        function RoleDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.detailForm = _this.formBuilder.group({
                code: ['', forms.Validators.required],
                description: ['', forms.Validators.required],
                channelIds: [],
                permissions: [],
            });
            return _this;
        }
        RoleDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.role$ = this.entity$;
            this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
        };
        RoleDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        RoleDetailComponent.prototype.updateCode = function (nameValue) {
            var codeControl = this.detailForm.get(['code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
            }
        };
        RoleDetailComponent.prototype.setPermission = function (change) {
            var permissionsControl = this.detailForm.get('permissions');
            if (permissionsControl) {
                var currentPermissions = permissionsControl.value;
                var newValue = change.value === true
                    ? unique.unique(__spreadArray(__spreadArray([], __read(currentPermissions)), [change.permission]))
                    : currentPermissions.filter(function (p) { return p !== change.permission; });
                permissionsControl.setValue(newValue);
                permissionsControl.markAsDirty();
            }
        };
        RoleDetailComponent.prototype.create = function () {
            var _this = this;
            var formValue = this.detailForm.value;
            var role = formValue;
            this.dataService.administrator.createRole(role).subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), { entity: 'Role' });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createRole.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Role',
                });
            });
        };
        RoleDetailComponent.prototype.save = function () {
            var _this = this;
            this.role$
                .pipe(operators.take(1), operators.mergeMap(function (_a) {
                var id = _a.id;
                var formValue = _this.detailForm.value;
                var role = Object.assign({ id: id }, formValue);
                return _this.dataService.administrator.updateRole(role);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Role' });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Role',
                });
            });
        };
        RoleDetailComponent.prototype.setFormValues = function (role, languageCode) {
            this.detailForm.patchValue({
                description: role.description,
                code: role.code,
                channelIds: role.channels.map(function (c) { return c.id; }),
                permissions: role.permissions,
            });
            // This was required to get the channel selector component to
            // correctly display its contents. A while spent debugging the root
            // cause did not yield a solution, therefore this next line.
            this.changeDetector.detectChanges();
        };
        return RoleDetailComponent;
    }(i2.BaseDetailComponent));
    RoleDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-role-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.description' | translate\" for=\"description\">\n        <input\n            id=\"description\"\n            type=\"text\"\n            formControlName=\"description\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n            (input)=\"updateCode($event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"'UpdateAdministrator' | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel' | translate\">\n        <vdr-channel-assignment-control\n            formControlName=\"channelIds\"\n            [vdrDisabled]=\"!('UpdateAdministrator' | hasPermission)\"\n        ></vdr-channel-assignment-control>\n    </vdr-form-field>\n    <label>{{ 'settings.permissions' | translate }}</label>\n    <vdr-permission-grid\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [activePermissions]=\"detailForm.get('permissions')?.value\"\n        (permissionChange)=\"setPermission($event)\"\n        [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n    ></vdr-permission-grid>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    RoleDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var RoleListComponent = /** @class */ (function (_super) {
        __extends(RoleListComponent, _super);
        function RoleListComponent(modalService, notificationService, dataService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.initialLimit = 3;
            _this.displayLimit = {};
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.administrator).getRoles.apply(_a, __spreadArray([], __read(args)));
            }, function (data) { return data.roles; });
            return _this;
        }
        RoleListComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.visibleRoles$ = this.items$.pipe(operators.map(function (roles) { return roles.filter(function (role) { return role.code !== sharedConstants.CUSTOMER_ROLE_CODE; }); }));
        };
        RoleListComponent.prototype.toggleDisplayLimit = function (role) {
            if (this.displayLimit[role.id] === role.permissions.length) {
                this.displayLimit[role.id] = this.initialLimit;
            }
            else {
                this.displayLimit[role.id] = role.permissions.length;
            }
        };
        RoleListComponent.prototype.isDefaultRole = function (role) {
            return role.code === sharedConstants.SUPER_ADMIN_ROLE_CODE || role.code === sharedConstants.CUSTOMER_ROLE_CODE;
        };
        RoleListComponent.prototype.deleteRole = function (id) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('settings.confirm-delete-role'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return (response ? _this.dataService.administrator.deleteRole(id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Role',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Role',
                });
            });
        };
        return RoleListComponent;
    }(i2.BaseListComponent));
    RoleListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-role-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-role' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"visibleRoles$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.description' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.channel' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.permissions' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-role=\"item\">\n        <td class=\"left align-middle\">{{ role.description }}</td>\n        <td class=\"left align-middle\"><span *ngIf=\"!isDefaultRole(role)\">{{ role.code }}</span></td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role)\">\n                <vdr-chip *ngFor=\"let channel of role.channels\">\n                    <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                    {{ channel.code | channelCodeToLabel | translate }}\n                </vdr-chip>\n            </ng-container>\n        </td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role); else defaultRole\">\n                <vdr-chip *ngFor=\"let permission of role.permissions |  slice: 0:displayLimit[role.id] || 3\">{{ permission }}</vdr-chip>\n                <button\n                    class=\"btn btn-sm btn-secondary btn-icon\"\n                    *ngIf=\"role.permissions.length > initialLimit\"\n                    (click)=\"toggleDisplayLimit(role)\"\n                >\n                    <ng-container *ngIf=\"(displayLimit[role.id] || 0) < role.permissions.length; else collapse\">\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ role.permissions.length - initialLimit }}\n                    </ng-container>\n                    <ng-template #collapse>\n                        <clr-icon shape=\"minus\"></clr-icon>\n                    </ng-template>\n                </button>\n            </ng-container>\n            <ng-template #defaultRole>\n                <span class=\"default-role-label\">{{ 'settings.default-role-label' | translate }}</span>\n            </ng-template>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                *ngIf=\"!isDefaultRole(role)\"\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', role.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger [disabled]=\"isDefaultRole(role)\">\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteRole(role.id)\"\n                        [disabled]=\"!('SuperAdmin' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".default-role-label{color:var(--color-grey-400)}\n"]
                },] }
    ];
    RoleListComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var ShippingEligibilityTestResultComponent = /** @class */ (function () {
        function ShippingEligibilityTestResultComponent() {
            this.okToRun = false;
            this.testDataUpdated = false;
            this.runTest = new i0.EventEmitter();
        }
        return ShippingEligibilityTestResultComponent;
    }());
    ShippingEligibilityTestResultComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-shipping-eligibility-test-result',
                    template: "<div class=\"test-result card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\" *ngFor=\"let quote of testResult\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-block\" *ngIf=\"testResult?.length === 0\">\n        <clr-icon shape=\"ban\" class=\"is-solid error\"></clr-icon>\n        {{ 'settings.no-eligible-shipping-methods' | translate }}\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-methods' | translate }}\n        </button>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}clr-icon.error{color:var(--color-error-500)}\n"]
                },] }
    ];
    ShippingEligibilityTestResultComponent.propDecorators = {
        testResult: [{ type: i0.Input }],
        okToRun: [{ type: i0.Input }],
        testDataUpdated: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        runTest: [{ type: i0.Output }]
    };

    var ShippingMethodDetailComponent = /** @class */ (function (_super) {
        __extends(ShippingMethodDetailComponent, _super);
        function ShippingMethodDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.checkers = [];
            _this.calculators = [];
            _this.fulfillmentHandlers = [];
            _this.testDataUpdated = false;
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdateShippingMethod];
            _this.fetchTestResult$ = new rxjs.Subject();
            _this.customFields = _this.getCustomFieldConfig('ShippingMethod');
            _this.detailForm = _this.formBuilder.group({
                code: ['', forms.Validators.required],
                name: ['', forms.Validators.required],
                description: '',
                fulfillmentHandler: ['', forms.Validators.required],
                checker: {},
                calculator: {},
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _e;
                    return (Object.assign(Object.assign({}, hash), (_e = {}, _e[field.name] = '', _e)));
                }, {})),
            });
            return _this;
        }
        ShippingMethodDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            rxjs.combineLatest([
                this.dataService.shippingMethod.getShippingMethodOperations().single$,
                this.entity$.pipe(operators.take(1)),
            ]).subscribe(function (_e) {
                var _f = __read(_e, 2), data = _f[0], entity = _f[1];
                _this.checkers = data.shippingEligibilityCheckers;
                _this.calculators = data.shippingCalculators;
                _this.fulfillmentHandlers = data.fulfillmentHandlers;
                _this.changeDetector.markForCheck();
                _this.selectedCheckerDefinition = data.shippingEligibilityCheckers.find(function (c) { return c.code === (entity.checker && entity.checker.code); });
                _this.selectedCalculatorDefinition = data.shippingCalculators.find(function (c) { return c.code === (entity.calculator && entity.calculator.code); });
            });
            this.activeChannel$ = this.dataService.settings
                .getActiveChannel()
                .mapStream(function (data) { return data.activeChannel; });
            this.testResult$ = this.fetchTestResult$.pipe(operators.switchMap(function (_e) {
                var _f = __read(_e, 2), address = _f[0], lines = _f[1];
                if (!_this.selectedChecker || !_this.selectedCalculator) {
                    return rxjs.of(undefined);
                }
                var formValue = _this.detailForm.value;
                var input = {
                    shippingAddress: Object.assign(Object.assign({}, address), { streetLine1: 'test' }),
                    lines: lines.map(function (l) { return ({ productVariantId: l.id, quantity: l.quantity }); }),
                    checker: i2.toConfigurableOperationInput(_this.selectedChecker, formValue.checker),
                    calculator: i2.toConfigurableOperationInput(_this.selectedCalculator, formValue.calculator),
                };
                return _this.dataService.shippingMethod
                    .testShippingMethod(input)
                    .mapSingle(function (result) { return result.testShippingMethod; });
            }));
            // tslint:disable:no-non-null-assertion
            rxjs.merge(this.detailForm.get(['checker']).valueChanges, this.detailForm.get(['calculator']).valueChanges)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () { return (_this.testDataUpdated = true); });
            // tslint:enable:no-non-null-assertion
        };
        ShippingMethodDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ShippingMethodDetailComponent.prototype.updateCode = function (currentCode, nameValue) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        ShippingMethodDetailComponent.prototype.selectChecker = function (checker) {
            this.selectedCheckerDefinition = checker;
            this.selectedChecker = i2.configurableDefinitionToInstance(checker);
            var formControl = this.detailForm.get('checker');
            if (formControl) {
                formControl.clearValidators();
                formControl.updateValueAndValidity({ onlySelf: true });
                formControl.patchValue(this.selectedChecker);
            }
            this.detailForm.markAsDirty();
        };
        ShippingMethodDetailComponent.prototype.selectCalculator = function (calculator) {
            this.selectedCalculatorDefinition = calculator;
            this.selectedCalculator = i2.configurableDefinitionToInstance(calculator);
            var formControl = this.detailForm.get('calculator');
            if (formControl) {
                formControl.clearValidators();
                formControl.updateValueAndValidity({ onlySelf: true });
                formControl.patchValue(this.selectedCalculator);
            }
            this.detailForm.markAsDirty();
        };
        ShippingMethodDetailComponent.prototype.create = function () {
            var _this = this;
            var selectedChecker = this.selectedChecker;
            var selectedCalculator = this.selectedCalculator;
            if (!selectedChecker || !selectedCalculator) {
                return;
            }
            rxjs.combineLatest([this.entity$, this.languageCode$])
                .pipe(operators.take(1), operators.mergeMap(function (_e) {
                var _f = __read(_e, 2), shippingMethod = _f[0], languageCode = _f[1];
                var formValue = _this.detailForm.value;
                var input = Object.assign(Object.assign({}, _this.getUpdatedShippingMethod(shippingMethod, _this.detailForm, languageCode)), { checker: i2.toConfigurableOperationInput(selectedChecker, formValue.checker), calculator: i2.toConfigurableOperationInput(selectedCalculator, formValue.calculator) });
                return _this.dataService.shippingMethod.createShippingMethod(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'ShippingMethod',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createShippingMethod.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'ShippingMethod',
                });
            });
        };
        ShippingMethodDetailComponent.prototype.save = function () {
            var _this = this;
            var selectedChecker = this.selectedChecker;
            var selectedCalculator = this.selectedCalculator;
            if (!selectedChecker || !selectedCalculator) {
                return;
            }
            rxjs.combineLatest([this.entity$, this.languageCode$])
                .pipe(operators.take(1), operators.mergeMap(function (_e) {
                var _f = __read(_e, 2), shippingMethod = _f[0], languageCode = _f[1];
                var formValue = _this.detailForm.value;
                var input = Object.assign(Object.assign({}, _this.getUpdatedShippingMethod(shippingMethod, _this.detailForm, languageCode)), { checker: i2.toConfigurableOperationInput(selectedChecker, formValue.checker), calculator: i2.toConfigurableOperationInput(selectedCalculator, formValue.calculator) });
                return _this.dataService.shippingMethod.updateShippingMethod(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'ShippingMethod',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                // tslint:disable-next-line:no-console
                console.error(err);
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'ShippingMethod',
                });
            });
        };
        ShippingMethodDetailComponent.prototype.setTestOrderLines = function (event) {
            this.testOrderLines = event;
            this.testDataUpdated = true;
        };
        ShippingMethodDetailComponent.prototype.setTestAddress = function (event) {
            this.testAddress = event;
            this.testDataUpdated = true;
        };
        ShippingMethodDetailComponent.prototype.allTestDataPresent = function () {
            return !!(this.testAddress &&
                this.testOrderLines &&
                this.testOrderLines.length &&
                this.selectedChecker &&
                this.selectedCalculator);
        };
        ShippingMethodDetailComponent.prototype.runTest = function () {
            this.fetchTestResult$.next([this.testAddress, this.testOrderLines]);
            this.testDataUpdated = false;
        };
        /**
         * Given a ShippingMethod and the value of the detailForm, this method creates an updated copy which
         * can then be persisted to the API.
         */
        ShippingMethodDetailComponent.prototype.getUpdatedShippingMethod = function (shippingMethod, formGroup, languageCode) {
            var formValue = formGroup.value;
            var input = i2.createUpdatedTranslatable({
                translatable: shippingMethod,
                updatedFields: formValue,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: shippingMethod.name || '',
                    description: shippingMethod.description || '',
                },
            });
            return Object.assign(Object.assign({}, input), { fulfillmentHandler: formValue.fulfillmentHandler });
        };
        ShippingMethodDetailComponent.prototype.setFormValues = function (shippingMethod, languageCode) {
            var _a, _b, _c, _d;
            var currentTranslation = i2.findTranslation(shippingMethod, languageCode);
            this.detailForm.patchValue({
                name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
                description: (_b = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.description) !== null && _b !== void 0 ? _b : '',
                code: shippingMethod.code,
                fulfillmentHandler: shippingMethod.fulfillmentHandlerCode,
                checker: shippingMethod.checker || {},
                calculator: shippingMethod.calculator || {},
            });
            if (!this.selectedChecker) {
                this.selectedChecker = shippingMethod.checker && {
                    code: shippingMethod.checker.code,
                    args: shippingMethod.checker.args.map(function (a) { return (Object.assign(Object.assign({}, a), { value: i2.getConfigArgValue(a.value) })); }),
                };
            }
            if (!this.selectedCalculator) {
                this.selectedCalculator = shippingMethod.calculator && {
                    code: (_c = shippingMethod.calculator) === null || _c === void 0 ? void 0 : _c.code,
                    args: (_d = shippingMethod.calculator) === null || _d === void 0 ? void 0 : _d.args.map(function (a) { return (Object.assign(Object.assign({}, a), { value: i2.getConfigArgValue(a.value) })); }),
                };
            }
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), shippingMethod, currentTranslation);
            }
        };
        return ShippingMethodDetailComponent;
    }(i2.BaseDetailComponent));
    ShippingMethodDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-shipping-method-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"shipping-method-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.pristine || detailForm.invalid || !selectedChecker || !selectedCalculator\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"updatePermission\"\n                [disabled]=\"\n                    detailForm.pristine || detailForm.invalid || !selectedChecker || !selectedCalculator\n                \"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as shippingMethod\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            (input)=\"updateCode(shippingMethod.code, $event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"updatePermission | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-rich-text-editor\n        formControlName=\"description\"\n        [readonly]=\"!(updatePermission | hasPermission)\"\n        [label]=\"'common.description' | translate\"\n    ></vdr-rich-text-editor>\n    <vdr-form-field [label]=\"'settings.fulfillment-handler' | translate\" for=\"fulfillmentHandler\" class=\"mb2\">\n        <select\n            name=\"fulfillmentHandler\"\n            formControlName=\"fulfillmentHandler\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let handler of fulfillmentHandlers\" [value]=\"handler.code\">\n                {{ handler.code }}: {{ handler.description }}\n            </option>\n        </select>\n    </vdr-form-field>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"ShippingMethod\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n\n    <vdr-custom-detail-component-host\n        locationId=\"shipping-method-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n\n    <div class=\"clr-row mt4\">\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.shipping-eligibility-checker' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedChecker && selectedCheckerDefinition\"\n                [operation]=\"selectedChecker\"\n                [operationDefinition]=\"selectedCheckerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"selectedChecker = null\"\n                formControlName=\"checker\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedChecker || !selectedCheckerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let checker of checkers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectChecker(checker)\"\n                        >\n                            {{ checker.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.shipping-calculator' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedCalculator && selectedCalculatorDefinition\"\n                [operation]=\"selectedCalculator\"\n                [operationDefinition]=\"selectedCalculatorDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"selectedCalculator = null\"\n                formControlName=\"calculator\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedCalculator || !selectedCalculatorDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let calculator of calculators\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectCalculator(calculator)\"\n                        >\n                            {{ calculator.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n<div class=\"testing-tool\">\n    <clr-accordion>\n        <clr-accordion-panel>\n            <clr-accordion-title>{{ 'settings.test-shipping-method' | translate }}</clr-accordion-title>\n            <clr-accordion-content *clrIfExpanded>\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <vdr-test-order-builder\n                            (orderLinesChange)=\"setTestOrderLines($event)\"\n                        ></vdr-test-order-builder>\n                    </div>\n                    <div class=\"clr-col\">\n                        <vdr-test-address-form\n                            (addressChange)=\"setTestAddress($event)\"\n                        ></vdr-test-address-form>\n                        <vdr-shipping-method-test-result\n                            [currencyCode]=\"(activeChannel$ | async)?.currencyCode\"\n                            [okToRun]=\"allTestDataPresent() && testDataUpdated && detailForm.valid\"\n                            [testDataUpdated]=\"testDataUpdated\"\n                            [testResult]=\"testResult$ | async\"\n                            (runTest)=\"runTest()\"\n                        ></vdr-shipping-method-test-result>\n                    </div>\n                </div>\n            </clr-accordion-content>\n        </clr-accordion-panel>\n    </clr-accordion>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".testing-tool{margin-top:48px;margin-bottom:128px}.testing-tool h4{margin-bottom:12px}\n"]
                },] }
    ];
    ShippingMethodDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var ShippingMethodListComponent = /** @class */ (function (_super) {
        __extends(ShippingMethodListComponent, _super);
        function ShippingMethodListComponent(modalService, notificationService, dataService, serverConfigService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.serverConfigService = serverConfigService;
            _this.testDataUpdated = false;
            _this.fetchTestResult$ = new rxjs.Subject();
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.shippingMethod).getShippingMethods.apply(_a, __spreadArray([], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.shippingMethods; });
            return _this;
        }
        ShippingMethodListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.testResult$ = this.fetchTestResult$.pipe(operators.switchMap(function (_a) {
                var _b = __read(_a, 2), address = _b[0], lines = _b[1];
                var input = {
                    shippingAddress: Object.assign(Object.assign({}, address), { streetLine1: 'test' }),
                    lines: lines.map(function (l) { return ({ productVariantId: l.id, quantity: l.quantity }); }),
                };
                return _this.dataService.shippingMethod
                    .testEligibleShippingMethods(input)
                    .mapSingle(function (result) { return result.testEligibleShippingMethods; });
            }));
            this.activeChannel$ = this.dataService.settings
                .getActiveChannel()
                .mapStream(function (data) { return data.activeChannel; });
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_a) {
                var uiState = _a.uiState;
                return uiState.contentLanguage;
            })
                .pipe(operators.tap(function () { return _this.refresh(); }));
        };
        ShippingMethodListComponent.prototype.deleteShippingMethod = function (id) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-shipping-method'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.dataService.shippingMethod.deleteShippingMethod(id) : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'ShippingMethod',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'ShippingMethod',
                });
            });
        };
        ShippingMethodListComponent.prototype.setTestOrderLines = function (event) {
            this.testOrderLines = event;
            this.testDataUpdated = true;
        };
        ShippingMethodListComponent.prototype.setTestAddress = function (event) {
            this.testAddress = event;
            this.testDataUpdated = true;
        };
        ShippingMethodListComponent.prototype.allTestDataPresent = function () {
            return !!(this.testAddress && this.testOrderLines && this.testOrderLines.length);
        };
        ShippingMethodListComponent.prototype.runTest = function () {
            this.fetchTestResult$.next([this.testAddress, this.testOrderLines]);
            this.testDataUpdated = false;
        };
        ShippingMethodListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        return ShippingMethodListComponent;
    }(i2.BaseListComponent));
    ShippingMethodListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-shipping-method-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-language-selector\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"contentLanguage$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"shipping-method-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            [routerLink]=\"['./create']\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateShippingMethod']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-shipping-method' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-shippingMethod=\"item\">\n        <td class=\"left align-middle\">{{ shippingMethod.code }}</td>\n        <td class=\"left align-middle\">{{ shippingMethod.name }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', shippingMethod.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteShippingMethod(shippingMethod.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteShippingMethod'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n\n<div class=\"testing-tool\">\n    <clr-accordion>\n        <clr-accordion-panel>\n            <clr-accordion-title>{{ 'settings.test-shipping-methods' | translate }}</clr-accordion-title>\n            <clr-accordion-content *clrIfExpanded>\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <vdr-test-order-builder\n                            (orderLinesChange)=\"setTestOrderLines($event)\"\n                        ></vdr-test-order-builder>\n                    </div>\n                    <div class=\"clr-col\">\n                        <vdr-test-address-form\n                            (addressChange)=\"setTestAddress($event)\"\n                        ></vdr-test-address-form>\n                        <vdr-shipping-eligibility-test-result\n                            [currencyCode]=\"(activeChannel$ | async)?.currencyCode\"\n                            [okToRun]=\"allTestDataPresent()\"\n                            [testDataUpdated]=\"testDataUpdated\"\n                            [testResult]=\"testResult$ | async\"\n                            (runTest)=\"runTest()\"\n                        ></vdr-shipping-eligibility-test-result>\n                    </div>\n                </div>\n            </clr-accordion-content>\n        </clr-accordion-panel>\n    </clr-accordion>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".testing-tool{margin-top:48px}\n"]
                },] }
    ];
    ShippingMethodListComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: i2.ServerConfigService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var ShippingMethodTestResultComponent = /** @class */ (function () {
        function ShippingMethodTestResultComponent() {
            this.okToRun = false;
            this.testDataUpdated = false;
            this.runTest = new i0.EventEmitter();
        }
        return ShippingMethodTestResultComponent;
    }());
    ShippingMethodTestResultComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-shipping-method-test-result',
                    template: "<div\n    class=\"test-result card\"\n    [ngClass]=\"{\n        success: testResult?.eligible === true,\n        error: testResult?.eligible === false,\n        unknown: !testResult\n    }\"\n>\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.eligible' | translate\">\n                <div class=\"eligible-icon\">\n                    <clr-icon\n                        shape=\"success-standard\"\n                        class=\"is-solid success\"\n                        *ngIf=\"testResult?.eligible\"\n                    ></clr-icon>\n                    <clr-icon\n                        shape=\"ban\"\n                        class=\"is-solid error\"\n                        *ngIf=\"testResult?.eligible === false\"\n                    ></clr-icon>\n                    <clr-icon shape=\"unknown-status\" *ngIf=\"!testResult\"></clr-icon>\n                </div>\n                {{ testResult?.eligible }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data\n                    [label]=\"'common.price' | translate\"\n                    *ngIf=\"testResult?.quote?.price != null\"\n                >\n                    {{ testResult.quote?.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data\n                    [label]=\"'common.price-with-tax' | translate\"\n                    *ngIf=\"testResult?.quote?.priceWithTax != null\"\n                >\n                    {{ testResult.quote?.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree\n                *ngIf=\"testResult?.quote?.metadata\"\n                [value]=\"testResult?.quote?.metadata\"\n            ></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-method' | translate }}\n        </button>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".test-result.success .card-block{background-color:var(--color-success-100)}.test-result.error .card-block{background-color:var(--color-error-100)}.test-result.unknown .card-block{background-color:var(--color-component-bg-100)}.result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.eligible-icon{display:inline-block}.eligible-icon .success{color:var(--color-success-500)}.eligible-icon .error{color:var(--color-error-500)}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}\n"]
                },] }
    ];
    ShippingMethodTestResultComponent.propDecorators = {
        testResult: [{ type: i0.Input }],
        okToRun: [{ type: i0.Input }],
        testDataUpdated: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        runTest: [{ type: i0.Output }]
    };

    var TaxCategoryDetailComponent = /** @class */ (function (_super) {
        __extends(TaxCategoryDetailComponent, _super);
        function TaxCategoryDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdateTaxCategory];
            _this.customFields = _this.getCustomFieldConfig('TaxCategory');
            _this.detailForm = _this.formBuilder.group({
                name: ['', forms.Validators.required],
                isDefault: false,
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        TaxCategoryDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.taxCategory$ = this.entity$;
        };
        TaxCategoryDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        TaxCategoryDetailComponent.prototype.saveButtonEnabled = function () {
            return this.detailForm.dirty && this.detailForm.valid;
        };
        TaxCategoryDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            var input = {
                name: formValue.name,
                isDefault: formValue.isDefault,
                customFields: formValue.customFields,
            };
            this.dataService.settings.createTaxCategory(input).subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'TaxCategory',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createTaxCategory.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'TaxCategory',
                });
            });
        };
        TaxCategoryDetailComponent.prototype.save = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            this.taxCategory$
                .pipe(operators.take(1), operators.mergeMap(function (taxCategory) {
                var input = {
                    id: taxCategory.id,
                    name: formValue.name,
                    isDefault: formValue.isDefault,
                    customFields: formValue.customFields,
                };
                return _this.dataService.settings.updateTaxCategory(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'TaxCategory',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'TaxCategory',
                });
            });
        };
        /**
         * Update the form values when the entity changes.
         */
        TaxCategoryDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            this.detailForm.patchValue({
                name: entity.name,
                isDefault: entity.isDefault,
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
            }
        };
        return TaxCategoryDetailComponent;
    }(i2.BaseDetailComponent));
    TaxCategoryDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-tax-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-category-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.default-tax-category' | translate\" for=\"isDefault\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"isDefault\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"isDefault\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"TaxCategory\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"tax-category-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    TaxCategoryDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var TaxCategoryListComponent = /** @class */ (function () {
        function TaxCategoryListComponent(dataService, notificationService, modalService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.queryResult = this.dataService.settings.getTaxCategories();
            this.taxCategories$ = this.queryResult.mapStream(function (data) { return data.taxCategories; });
        }
        TaxCategoryListComponent.prototype.deleteTaxCategory = function (taxCategory) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('settings.confirm-delete-tax-category'),
                body: taxCategory.name,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.settings.deleteTaxCategory(taxCategory.id) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteTaxCategory; }))
                .subscribe(function (res) {
                if (res.result === i2.DeletionResult.DELETED) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'TaxRate',
                    });
                    _this.queryResult.ref.refetch();
                }
                else {
                    _this.notificationService.error(res.message || ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                        entity: 'TaxRate',
                    });
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'TaxRate',
                });
            });
        };
        return TaxCategoryListComponent;
    }());
    TaxCategoryListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-tax-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-category-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxCategory']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-category' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"taxCategories$ | async\">\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxCategory=\"item\">\n        <td class=\"left align-middle\">{{ taxCategory.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"taxCategory.isDefault\">{{ 'common.default-tax-category' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxCategory.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxCategory(taxCategory)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxCategory'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    TaxCategoryListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    var TaxRateDetailComponent = /** @class */ (function (_super) {
        __extends(TaxRateDetailComponent, _super);
        function TaxRateDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.updatePermission = [i2.Permission.UpdateSettings, i2.Permission.UpdateTaxRate];
            _this.customFields = _this.getCustomFieldConfig('TaxRate');
            _this.detailForm = _this.formBuilder.group({
                name: ['', forms.Validators.required],
                enabled: [true],
                value: [0, forms.Validators.required],
                taxCategoryId: [''],
                zoneId: [''],
                customerGroupId: [''],
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _a;
                    return (Object.assign(Object.assign({}, hash), (_a = {}, _a[field.name] = '', _a)));
                }, {})),
            });
            return _this;
        }
        TaxRateDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.taxCategories$ = this.dataService.settings
                .getTaxCategories()
                .mapSingle(function (data) { return data.taxCategories; });
            this.zones$ = this.dataService.settings.getZones().mapSingle(function (data) { return data.zones; });
        };
        TaxRateDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        TaxRateDetailComponent.prototype.saveButtonEnabled = function () {
            return this.detailForm.dirty && this.detailForm.valid;
        };
        TaxRateDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            var input = {
                name: formValue.name,
                enabled: formValue.enabled,
                value: formValue.value,
                categoryId: formValue.taxCategoryId,
                zoneId: formValue.zoneId,
                customerGroupId: formValue.customerGroupId,
                customFields: formValue.customFields,
            };
            this.dataService.settings.createTaxRate(input).subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'TaxRate',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createTaxRate.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'TaxRate',
                });
            });
        };
        TaxRateDetailComponent.prototype.save = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            this.entity$
                .pipe(operators.take(1), operators.mergeMap(function (taxRate) {
                var input = {
                    id: taxRate.id,
                    name: formValue.name,
                    enabled: formValue.enabled,
                    value: formValue.value,
                    categoryId: formValue.taxCategoryId,
                    zoneId: formValue.zoneId,
                    customerGroupId: formValue.customerGroupId,
                    customFields: formValue.customFields,
                };
                return _this.dataService.settings.updateTaxRate(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'TaxRate',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'TaxRate',
                });
            });
        };
        /**
         * Update the form values when the entity changes.
         */
        TaxRateDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            this.detailForm.patchValue({
                name: entity.name,
                enabled: entity.enabled,
                value: entity.value,
                taxCategoryId: entity.category ? entity.category.id : '',
                zoneId: entity.zone ? entity.zone.id : '',
                customerGroupId: entity.customerGroup ? entity.customerGroup.id : '',
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
            }
        };
        return TaxRateDetailComponent;
    }(i2.BaseDetailComponent));
    TaxRateDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-tax-rate-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.rate' | translate\" for=\"value\">\n        <vdr-affixed-input suffix=\"%\">\n            <input\n                id=\"value\"\n                type=\"number\"\n                step=\"0.1\"\n                formControlName=\"value\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            />\n        </vdr-affixed-input>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.tax-category' | translate\" for=\"taxCategoryId\">\n        <select\n            clrSelect\n            name=\"taxCategoryId\"\n            formControlName=\"taxCategoryId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let taxCategory of taxCategories$ | async\" [value]=\"taxCategory.id\">\n                {{ taxCategory.name }}\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.zone' | translate\" for=\"zoneId\">\n        <select\n            clrSelect\n            name=\"zoneId\"\n            formControlName=\"zoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"TaxRate\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"tax-rate-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    TaxRateDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var TaxRateListComponent = /** @class */ (function (_super) {
        __extends(TaxRateListComponent, _super);
        function TaxRateListComponent(modalService, notificationService, dataService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.settings).getTaxRates.apply(_a, __spreadArray([], __read(args)));
            }, function (data) { return data.taxRates; });
            return _this;
        }
        TaxRateListComponent.prototype.deleteTaxRate = function (taxRate) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('settings.confirm-delete-tax-rate'),
                body: taxRate.name,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.settings.deleteTaxRate(taxRate.id) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteTaxRate; }))
                .subscribe(function (res) {
                if (res.result === i2.DeletionResult.DELETED) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'TaxRate',
                    });
                    _this.refresh();
                }
                else {
                    _this.notificationService.error(res.message || ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                        entity: 'TaxRate',
                    });
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'TaxRate',
                });
            });
        };
        return TaxRateListComponent;
    }(i2.BaseListComponent));
    TaxRateListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-tax-rate-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxRate']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-rate' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-category' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.zone' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-rate' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxRate=\"item\">\n        <td class=\"left align-middle\">{{ taxRate.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.category.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.zone.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.value }}%</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxRate.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxRate(taxRate)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxRate'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    TaxRateListComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var TestAddressFormComponent = /** @class */ (function () {
        function TestAddressFormComponent(formBuilder, dataService, localStorageService) {
            this.formBuilder = formBuilder;
            this.dataService = dataService;
            this.localStorageService = localStorageService;
            this.addressChange = new i0.EventEmitter();
        }
        TestAddressFormComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.availableCountries$ = this.dataService.settings
                .getAvailableCountries()
                .mapSingle(function (result) { return result.countries.items; });
            var storedValue = this.localStorageService.getForCurrentLocation('shippingTestAddress');
            var initialValue = storedValue
                ? storedValue
                : {
                    city: '',
                    countryCode: '',
                    postalCode: '',
                    province: '',
                };
            this.addressChange.emit(initialValue);
            this.form = this.formBuilder.group(initialValue);
            this.subscription = this.form.valueChanges.subscribe(function (value) {
                _this.localStorageService.setForCurrentLocation('shippingTestAddress', value);
                _this.addressChange.emit(value);
            });
        };
        TestAddressFormComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TestAddressFormComponent;
    }());
    TestAddressFormComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-test-address-form',
                    template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-address' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <form [formGroup]=\"form\">\n            <clr-input-container>\n                <label>{{ 'customer.city' | translate }}</label>\n                <input formControlName=\"city\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.province' | translate }}</label>\n                <input formControlName=\"province\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.postal-code' | translate }}</label>\n                <input formControlName=\"postalCode\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.country' | translate }}</label>\n                <select name=\"countryCode\" formControlName=\"countryCode\" clrInput clrSelect>\n                    <option *ngFor=\"let country of availableCountries$ | async\" [value]=\"country.code\">\n                        {{ country.name }}\n                    </option>\n                </select>\n            </clr-input-container>\n        </form>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["clr-input-container{margin-bottom:12px}\n"]
                },] }
    ];
    TestAddressFormComponent.ctorParameters = function () { return [
        { type: forms.FormBuilder },
        { type: i2.DataService },
        { type: i2.LocalStorageService }
    ]; };
    TestAddressFormComponent.propDecorators = {
        addressChange: [{ type: i0.Output }]
    };

    var TestOrderBuilderComponent = /** @class */ (function () {
        function TestOrderBuilderComponent(dataService, localStorageService) {
            this.dataService = dataService;
            this.localStorageService = localStorageService;
            this.orderLinesChange = new i0.EventEmitter();
            this.lines = [];
        }
        Object.defineProperty(TestOrderBuilderComponent.prototype, "subTotal", {
            get: function () {
                return this.lines.reduce(function (sum, l) { return sum + l.unitPriceWithTax * l.quantity; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        TestOrderBuilderComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.lines = this.loadFromLocalStorage();
            if (this.lines) {
                this.orderLinesChange.emit(this.lines);
            }
            this.dataService.settings.getActiveChannel('cache-first').single$.subscribe(function (result) {
                _this.currencyCode = result.activeChannel.currencyCode;
            });
        };
        TestOrderBuilderComponent.prototype.selectResult = function (result) {
            if (result) {
                this.addToLines(result);
            }
        };
        TestOrderBuilderComponent.prototype.addToLines = function (result) {
            var _a, _b;
            if (!this.lines.find(function (l) { return l.id === result.productVariantId; })) {
                this.lines.push({
                    id: result.productVariantId,
                    name: result.productVariantName,
                    preview: (_b = (_a = result.productAsset) === null || _a === void 0 ? void 0 : _a.preview) !== null && _b !== void 0 ? _b : '',
                    quantity: 1,
                    sku: result.sku,
                    unitPriceWithTax: (result.priceWithTax.__typename === 'SinglePrice' && result.priceWithTax.value) || 0,
                });
                this.persistToLocalStorage();
                this.orderLinesChange.emit(this.lines);
            }
        };
        TestOrderBuilderComponent.prototype.updateQuantity = function () {
            this.persistToLocalStorage();
            this.orderLinesChange.emit(this.lines);
        };
        TestOrderBuilderComponent.prototype.removeLine = function (line) {
            this.lines = this.lines.filter(function (l) { return l.id !== line.id; });
            this.persistToLocalStorage();
            this.orderLinesChange.emit(this.lines);
        };
        TestOrderBuilderComponent.prototype.persistToLocalStorage = function () {
            this.localStorageService.setForCurrentLocation('shippingTestOrder', this.lines);
        };
        TestOrderBuilderComponent.prototype.loadFromLocalStorage = function () {
            return this.localStorageService.getForCurrentLocation('shippingTestOrder') || [];
        };
        return TestOrderBuilderComponent;
    }());
    TestOrderBuilderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-test-order-builder',
                    template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-order' | translate }}\n    </div>\n    <table class=\"order-table table\" *ngIf=\"lines.length; else emptyPlaceholder\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'order.product-name' | translate }}</th>\n                <th>{{ 'order.product-sku' | translate }}</th>\n                <th>{{ 'order.unit-price' | translate }}</th>\n                <th>{{ 'order.quantity' | translate }}</th>\n                <th>{{ 'order.total' | translate }}</th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let line of lines\" class=\"order-line\">\n            <td class=\"align-middle thumb\">\n                <img [src]=\"line.preview + '?preset=tiny'\" />\n            </td>\n            <td class=\"align-middle name\">{{ line.name }}</td>\n            <td class=\"align-middle sku\">{{ line.sku }}</td>\n            <td class=\"align-middle unit-price\">\n                {{ line.unitPriceWithTax | localeCurrency: currencyCode }}\n            </td>\n            <td class=\"align-middle quantity\">\n                <input\n                    [(ngModel)]=\"line.quantity\"\n                    (change)=\"updateQuantity()\"\n                    type=\"number\"\n                    max=\"9999\"\n                    min=\"1\"\n                />\n                <button class=\"icon-button\" (click)=\"removeLine(line)\">\n                    <clr-icon shape=\"trash\"></clr-icon>\n                </button>\n            </td>\n            <td class=\"align-middle total\">\n                {{ (line.unitPriceWithTax * line.quantity) | localeCurrency: currencyCode }}\n            </td>\n        </tr>\n        <tr class=\"sub-total\">\n            <td class=\"left\">{{ 'order.sub-total' | translate }}</td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td>{{ subTotal | localeCurrency: currencyCode }}</td>\n        </tr>\n    </table>\n\n    <ng-template #emptyPlaceholder>\n        <div class=\"card-block empty-placeholder\">\n            <div class=\"empty-text\">{{ 'settings.add-products-to-test-order' | translate }}</div>\n            <clr-icon shape=\"arrow\" dir=\"down\" size=\"96\"></clr-icon>\n        </div>\n    </ng-template>\n    <div class=\"card-block\">\n        <vdr-product-selector (productSelected)=\"selectResult($event)\"> </vdr-product-selector>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".empty-placeholder{color:var(--color-grey-400);text-align:center}.empty-text{font-size:22px}\n"]
                },] }
    ];
    TestOrderBuilderComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.LocalStorageService }
    ]; };
    TestOrderBuilderComponent.propDecorators = {
        orderLinesChange: [{ type: i0.Output }]
    };

    var ZoneDetailDialogComponent = /** @class */ (function () {
        function ZoneDetailDialogComponent(serverConfigService, formBuilder) {
            this.serverConfigService = serverConfigService;
            this.formBuilder = formBuilder;
            this.customFields = this.serverConfigService.getCustomFieldsFor('Zone');
        }
        ZoneDetailDialogComponent.prototype.ngOnInit = function () {
            var e_1, _b;
            var _a;
            this.form = this.formBuilder.group({
                name: [this.zone.name, forms.Validators.required],
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
                        var value = (_a = this.zone.customFields) === null || _a === void 0 ? void 0 : _a[key];
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
        ZoneDetailDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        ZoneDetailDialogComponent.prototype.save = function () {
            this.resolveWith(this.form.value);
        };
        return ZoneDetailDialogComponent;
    }());
    ZoneDetailDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-zone-detail-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n    <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-tabbed-custom-fields\n        entityName=\"Zone\"\n        [customFields]=\"customFields\"\n        [customFieldsFormGroup]=\"form.get('customFields')\"\n        [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n    ></vdr-tabbed-custom-fields>\n</form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"form.invalid\" class=\"btn btn-primary\">\n        <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n        <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ZoneDetailDialogComponent.ctorParameters = function () { return [
        { type: i2.ServerConfigService },
        { type: forms.FormBuilder }
    ]; };

    var ZoneListComponent = /** @class */ (function () {
        function ZoneListComponent(dataService, notificationService, modalService, route, router, serverConfigService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.route = route;
            this.router = router;
            this.serverConfigService = serverConfigService;
            this.selectedMemberIds = [];
        }
        ZoneListComponent.prototype.ngOnInit = function () {
            var _this = this;
            var zonesQueryRef = this.dataService.settings.getZones().ref;
            this.zones$ = zonesQueryRef.valueChanges.pipe(operators.map(function (data) { return data.data.zones; }));
            var activeZoneId$ = this.route.paramMap.pipe(operators.map(function (pm) { return pm.get('contents'); }), operators.distinctUntilChanged(), operators.tap(function () { return (_this.selectedMemberIds = []); }));
            this.activeZone$ = rxjs.combineLatest(this.zones$, activeZoneId$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), zones = _b[0], activeZoneId = _b[1];
                if (activeZoneId) {
                    return zones.find(function (z) { return z.id === activeZoneId; });
                }
            }));
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_a) {
                var uiState = _a.uiState;
                return uiState.contentLanguage;
            })
                .pipe(operators.tap(function () { return zonesQueryRef.refetch(); }));
        };
        ZoneListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        ZoneListComponent.prototype.create = function () {
            var _this = this;
            this.modalService
                .fromComponent(ZoneDetailDialogComponent, { locals: { zone: { name: '' } } })
                .pipe(operators.switchMap(function (result) { return result ? _this.dataService.settings.createZone(Object.assign(Object.assign({}, result), { memberIds: [] })) : rxjs.EMPTY; }), 
            // refresh list
            operators.switchMap(function () { return _this.dataService.settings.getZones().single$; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Zone',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Zone',
                });
            });
        };
        ZoneListComponent.prototype.delete = function (zoneId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-zone'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return (response ? _this.dataService.settings.deleteZone(zoneId) : rxjs.EMPTY); }), operators.switchMap(function (result) {
                if (result.deleteZone.result === i2.DeletionResult.DELETED) {
                    // refresh list
                    return _this.dataService.settings
                        .getZones()
                        .mapSingle(function () { return ({ errorMessage: false }); });
                }
                else {
                    return rxjs.of({ errorMessage: result.deleteZone.message });
                }
            }))
                .subscribe(function (result) {
                if (typeof result.errorMessage === 'string') {
                    _this.notificationService.error(result.errorMessage);
                }
                else {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                        entity: 'Zone',
                    });
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Zone',
                });
            });
        };
        ZoneListComponent.prototype.update = function (zone) {
            var _this = this;
            this.modalService
                .fromComponent(ZoneDetailDialogComponent, { locals: { zone: zone } })
                .pipe(operators.switchMap(function (result) { return result ? _this.dataService.settings.updateZone(Object.assign({ id: zone.id }, result)) : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Zone',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Zone',
                });
            });
        };
        ZoneListComponent.prototype.closeMembers = function () {
            var params = Object.assign({}, this.route.snapshot.params);
            delete params.contents;
            this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
        };
        ZoneListComponent.prototype.addToZone = function (zone) {
            var _this = this;
            this.modalService
                .fromComponent(AddCountryToZoneDialogComponent, {
                locals: {
                    zoneName: zone.name,
                    currentMembers: zone.members,
                },
                size: 'md',
            })
                .pipe(operators.switchMap(function (memberIds) { return memberIds
                ? _this.dataService.settings
                    .addMembersToZone(zone.id, memberIds)
                    .pipe(operators.mapTo(memberIds))
                : rxjs.EMPTY; }))
                .subscribe({
                next: function (result) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker("settings.add-countries-to-zone-success"), {
                        countryCount: result.length,
                        zoneName: zone.name,
                    });
                },
                error: function (err) {
                    _this.notificationService.error(err);
                },
            });
        };
        ZoneListComponent.prototype.removeFromZone = function (zone, memberIds) {
            var _this = this;
            this.dataService.settings.removeMembersFromZone(zone.id, memberIds).subscribe({
                complete: function () {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker("settings.remove-countries-from-zone-success"), {
                        countryCount: memberIds.length,
                        zoneName: zone.name,
                    });
                },
            });
        };
        return ZoneListComponent;
    }());
    ZoneListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-zone-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n            <vdr-language-selector\n                [availableLanguageCodes]=\"availableLanguages$ | async\"\n                [currentLanguageCode]=\"contentLanguage$ | async\"\n                (languageCodeChange)=\"setLanguage($event)\"\n            ></vdr-language-selector>\n        </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"zone-list\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateSettings', 'CreateZone']\"\n            (click)=\"create()\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-zone' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"zone-wrapper\">\n    <div class=\"zone-list\">\n        <table class=\"table mt0\">\n            <tbody>\n                <tr\n                    *ngFor=\"let zone of zones$ | async\"\n                    [class.active]=\"zone.id === (activeZone$ | async)?.id\"\n                >\n                    <td class=\"left align-middle\"><vdr-entity-info [entity]=\"zone\"></vdr-entity-info></td>\n                    <td class=\"left align-middle\">\n                        <vdr-chip [colorFrom]=\"zone.name\">{{ zone.name }}</vdr-chip>\n                    </td>\n                    <td class=\"text-right align-middle\">\n                        <a\n                            class=\"btn btn-link btn-sm\"\n                            [routerLink]=\"['./', { contents: zone.id }]\"\n                            queryParamsHandling=\"preserve\"\n                        >\n                            <clr-icon shape=\"view-list\"></clr-icon>\n                            {{ 'settings.view-zone-members' | translate }}\n                        </a>\n                    </td>\n                    <td class=\"align-middle\">\n                        <button class=\"btn btn-link btn-sm\" (click)=\"update(zone)\">\n                            <clr-icon shape=\"edit\"></clr-icon>\n                            {{ 'common.edit' | translate }}\n                        </button>\n                    </td>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    class=\"button\"\n                                    vdrDropdownItem\n                                    (click)=\"delete(zone.id)\"\n                                    [disabled]=\"!(['DeleteSettings', 'DeleteZone'] | hasPermission)\"\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"zone-members\" [class.expanded]=\"activeZone$ | async\">\n        <ng-container *ngIf=\"activeZone$ | async as activeZone\">\n            <vdr-zone-member-list\n                [members]=\"activeZone.members\"\n                [selectedMemberIds]=\"selectedMemberIds\"\n                (selectionChange)=\"selectedMemberIds = $event\"\n            >\n                <div *vdrZoneMemberListHeader>\n                    <div class=\"flex\">\n                        <div class=\"header-title-row\">\n                            {{ activeZone.name }} ({{ activeZone.members.length }})\n                        </div>\n                        <div class=\"flex-spacer\"></div>\n                        <button type=\"button\" class=\"close-button\" (click)=\"closeMembers()\">\n                            <clr-icon shape=\"close\"></clr-icon>\n                        </button>\n                    </div>\n                    <div class=\"controls\">\n                        <vdr-dropdown>\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-secondary btn-sm\"\n                                vdrDropdownTrigger\n                                [disabled]=\"selectedMemberIds.length === 0\"\n                            >\n                                {{ 'common.with-selected' | translate: { count: selectedMemberIds.length } }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"removeFromZone(activeZone, selectedMemberIds)\"\n                                    vdrDropdownItem\n                                    [disabled]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'settings.remove-from-zone' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                        <button class=\"btn btn-secondary btn-sm\" (click)=\"addToZone(activeZone)\">\n                            {{ 'settings.add-countries-to-zone' | translate: { zoneName: activeZone.name } }}\n                        </button>\n                    </div>\n                </div>\n                <div *vdrZoneMemberControls=\"let member = member\">\n                    <vdr-dropdown>\n                        <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                            {{ 'common.actions' | translate }}\n                            <clr-icon shape=\"caret down\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <a\n                                type=\"button\"\n                                [routerLink]=\"['/settings', 'countries', member.id]\"\n                                vdrDropdownItem\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </a>\n                            <button\n                                type=\"button\"\n                                class=\"delete-button\"\n                                (click)=\"removeFromZone(activeZone, [member.id])\"\n                                vdrDropdownItem\n                                [disabled]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'settings.remove-from-zone' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-zone-member-list>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".zone-wrapper{display:flex;height:calc(100% - 50px)}.zone-wrapper .zone-list{flex:1;overflow:auto;margin-top:0}.zone-wrapper .zone-list tr.active{background-color:var(--color-component-bg-200)}.zone-members{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.zone-members.expanded{width:40vw;visibility:visible;opacity:1;padding-left:12px}.zone-members .close-button{margin:0;background:none;border:none;cursor:pointer}.zone-members ::ng-deep table.table{margin-top:0}.zone-members ::ng-deep table.table th{top:0}.zone-members .controls{display:flex;justify-content:space-between}\n"]
                },] }
    ];
    ZoneListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.ServerConfigService }
    ]; };

    var ZoneMemberControlsDirective = /** @class */ (function () {
        function ZoneMemberControlsDirective(templateRef) {
            this.templateRef = templateRef;
        }
        return ZoneMemberControlsDirective;
    }());
    ZoneMemberControlsDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrZoneMemberControls]',
                },] }
    ];
    ZoneMemberControlsDirective.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };

    var ZoneMemberListHeaderDirective = /** @class */ (function () {
        function ZoneMemberListHeaderDirective(templateRef) {
            this.templateRef = templateRef;
        }
        return ZoneMemberListHeaderDirective;
    }());
    ZoneMemberListHeaderDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrZoneMemberListHeader]',
                },] }
    ];
    ZoneMemberListHeaderDirective.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };

    var ZoneMemberListComponent = /** @class */ (function () {
        function ZoneMemberListComponent() {
            var _this = this;
            this.members = [];
            this.selectedMemberIds = [];
            this.selectionChange = new i0.EventEmitter();
            this.filterTerm = '';
            this.isMemberSelected = function (member) {
                return -1 < _this.selectedMemberIds.indexOf(member.id);
            };
        }
        ZoneMemberListComponent.prototype.filteredMembers = function () {
            if (this.filterTerm !== '') {
                var term_1 = this.filterTerm.toLocaleLowerCase();
                return this.members.filter(function (m) { return m.name.toLocaleLowerCase().includes(term_1) || m.code.toLocaleLowerCase().includes(term_1); });
            }
            else {
                return this.members;
            }
        };
        ZoneMemberListComponent.prototype.areAllSelected = function () {
            if (this.members) {
                return this.selectedMemberIds.length === this.members.length;
            }
            else {
                return false;
            }
        };
        ZoneMemberListComponent.prototype.toggleSelectAll = function () {
            if (this.areAllSelected()) {
                this.selectionChange.emit([]);
            }
            else {
                this.selectionChange.emit(this.members.map(function (v) { return v.id; }));
            }
        };
        ZoneMemberListComponent.prototype.toggleSelectMember = function (_a) {
            var member = _a.item;
            if (this.selectedMemberIds.includes(member.id)) {
                this.selectionChange.emit(this.selectedMemberIds.filter(function (id) { return id !== member.id; }));
            }
            else {
                this.selectionChange.emit(__spreadArray(__spreadArray([], __read(this.selectedMemberIds)), [member.id]));
            }
        };
        return ZoneMemberListComponent;
    }());
    ZoneMemberListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-zone-member-list',
                    template: "<div class=\"members-header\">\n    <ng-container *ngIf=\"headerTemplate\">\n        <ng-container *ngTemplateOutlet=\"headerTemplate.templateRef\"></ng-container>\n    </ng-container>\n    <input\n        type=\"text\"\n        [placeholder]=\"'settings.filter-by-member-name' | translate\"\n        [(ngModel)]=\"filterTerm\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"filteredMembers()\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"(['UpdateSettings', 'UpdateZone'] | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-member=\"item\">\n        <td class=\"left align-middle\">{{ member.code }}</td>\n        <td class=\"left align-middle\">{{ member.name }}</td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"member.enabled\"\n                [attr.shape]=\"member.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <ng-container *ngIf=\"controlsTemplate\">\n                <ng-container\n                    *ngTemplateOutlet=\"controlsTemplate.templateRef; context: { member: member }\"\n                ></ng-container>\n            </ng-container>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".members-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:5;border-bottom:1px solid var(--color-component-border-200)}.members-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.members-header .clr-input{width:100%}\n"]
                },] }
    ];
    ZoneMemberListComponent.propDecorators = {
        members: [{ type: i0.Input }],
        selectedMemberIds: [{ type: i0.Input }],
        selectionChange: [{ type: i0.Output }],
        headerTemplate: [{ type: i0.ContentChild, args: [ZoneMemberListHeaderDirective,] }],
        controlsTemplate: [{ type: i0.ContentChild, args: [ZoneMemberControlsDirective,] }]
    };

    var AdministratorResolver = /** @class */ (function (_super) {
        __extends(AdministratorResolver, _super);
        function AdministratorResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Administrator',
                id: '',
                createdAt: '',
                updatedAt: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                user: { roles: [] },
            }, function (id) { return dataService.administrator.getAdministrator(id).mapStream(function (data) { return data.administrator; }); }) || this;
        }
        return AdministratorResolver;
    }(i2.BaseEntityResolver));
    AdministratorResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AdministratorResolver_Factory() { return new AdministratorResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: AdministratorResolver, providedIn: "root" });
    AdministratorResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    AdministratorResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var ChannelResolver = /** @class */ (function (_super) {
        __extends(ChannelResolver, _super);
        function ChannelResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Channel',
                id: '',
                createdAt: '',
                updatedAt: '',
                code: '',
                token: '',
                pricesIncludeTax: false,
                currencyCode: i2.CurrencyCode.USD,
                defaultLanguageCode: i2.getDefaultUiLanguage(),
                defaultShippingZone: {},
                defaultTaxZone: {},
            }, function (id) { return dataService.settings.getChannel(id).mapStream(function (data) { return data.channel; }); }) || this;
        }
        return ChannelResolver;
    }(i2.BaseEntityResolver));
    ChannelResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ChannelResolver_Factory() { return new ChannelResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: ChannelResolver, providedIn: "root" });
    ChannelResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ChannelResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var CountryResolver = /** @class */ (function (_super) {
        __extends(CountryResolver, _super);
        function CountryResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Country',
                id: '',
                createdAt: '',
                updatedAt: '',
                code: '',
                name: '',
                enabled: false,
                translations: [],
            }, function (id) { return dataService.settings.getCountry(id).mapStream(function (data) { return data.country; }); }) || this;
        }
        return CountryResolver;
    }(i2.BaseEntityResolver));
    CountryResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function CountryResolver_Factory() { return new CountryResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: CountryResolver, providedIn: "root" });
    CountryResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CountryResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the global settings.
     */
    var GlobalSettingsResolver = /** @class */ (function (_super) {
        __extends(GlobalSettingsResolver, _super);
        function GlobalSettingsResolver(router, dataService) {
            return _super.call(this, router, 
            // we will never be creating a new GlobalSettings entity, so this part is not used.
            {}, function () { return dataService.settings.getGlobalSettings().mapStream(function (data) { return data.globalSettings; }); }) || this;
        }
        return GlobalSettingsResolver;
    }(i2.BaseEntityResolver));
    GlobalSettingsResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function GlobalSettingsResolver_Factory() { return new GlobalSettingsResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: GlobalSettingsResolver, providedIn: "root" });
    GlobalSettingsResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    GlobalSettingsResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var PaymentMethodResolver = /** @class */ (function (_super) {
        __extends(PaymentMethodResolver, _super);
        function PaymentMethodResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'PaymentMethod',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                code: '',
                description: '',
                enabled: true,
                checker: undefined,
                handler: undefined,
            }, function (id) { return dataService.settings.getPaymentMethod(id).mapStream(function (data) { return data.paymentMethod; }); }) || this;
        }
        return PaymentMethodResolver;
    }(i2.BaseEntityResolver));
    PaymentMethodResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function PaymentMethodResolver_Factory() { return new PaymentMethodResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: PaymentMethodResolver, providedIn: "root" });
    PaymentMethodResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    PaymentMethodResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ProfileResolver = /** @class */ (function (_super) {
        __extends(ProfileResolver, _super);
        function ProfileResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Administrator',
                id: '',
                createdAt: '',
                updatedAt: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                user: { roles: [] },
            }, function (id) { return dataService.administrator
                .getActiveAdministrator()
                .mapStream(function (data) { return data.activeAdministrator; }); }) || this;
        }
        return ProfileResolver;
    }(i2.BaseEntityResolver));
    ProfileResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ProfileResolver_Factory() { return new ProfileResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: ProfileResolver, providedIn: "root" });
    ProfileResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProfileResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var RoleResolver = /** @class */ (function (_super) {
        __extends(RoleResolver, _super);
        function RoleResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Role',
                id: '',
                createdAt: '',
                updatedAt: '',
                code: '',
                description: '',
                permissions: [],
                channels: [],
            }, function (id) { return dataService.administrator.getRole(id).mapStream(function (data) { return data.role; }); }) || this;
        }
        return RoleResolver;
    }(i2.BaseEntityResolver));
    RoleResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function RoleResolver_Factory() { return new RoleResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: RoleResolver, providedIn: "root" });
    RoleResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    RoleResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var ShippingMethodResolver = /** @class */ (function (_super) {
        __extends(ShippingMethodResolver, _super);
        function ShippingMethodResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'ShippingMethod',
                createdAt: '',
                updatedAt: '',
                id: '',
                code: '',
                name: '',
                description: '',
                fulfillmentHandlerCode: undefined,
                checker: undefined,
                calculator: undefined,
                translations: [],
            }, function (id) { return dataService.shippingMethod.getShippingMethod(id).mapStream(function (data) { return data.shippingMethod; }); }) || this;
        }
        return ShippingMethodResolver;
    }(i2.BaseEntityResolver));
    ShippingMethodResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ShippingMethodResolver_Factory() { return new ShippingMethodResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: ShippingMethodResolver, providedIn: "root" });
    ShippingMethodResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ShippingMethodResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var TaxCategoryResolver = /** @class */ (function (_super) {
        __extends(TaxCategoryResolver, _super);
        function TaxCategoryResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'TaxCategory',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                isDefault: false,
            }, function (id) { return dataService.settings.getTaxCategory(id).mapStream(function (data) { return data.taxCategory; }); }) || this;
        }
        return TaxCategoryResolver;
    }(i2.BaseEntityResolver));
    TaxCategoryResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function TaxCategoryResolver_Factory() { return new TaxCategoryResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: TaxCategoryResolver, providedIn: "root" });
    TaxCategoryResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    TaxCategoryResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var TaxRateResolver = /** @class */ (function (_super) {
        __extends(TaxRateResolver, _super);
        function TaxRateResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'TaxRate',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                value: 0,
                enabled: true,
                category: {},
                zone: {},
                customerGroup: null,
            }, function (id) { return dataService.settings.getTaxRate(id).mapStream(function (data) { return data.taxRate; }); }) || this;
        }
        return TaxRateResolver;
    }(i2.BaseEntityResolver));
    TaxRateResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function TaxRateResolver_Factory() { return new TaxRateResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: TaxRateResolver, providedIn: "root" });
    TaxRateResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    TaxRateResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ɵ0 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.profile'),
    }, ɵ1 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.administrators'),
    }, ɵ2 = { breadcrumb: administratorBreadcrumb }, ɵ3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.channels'),
    }, ɵ4 = { breadcrumb: channelBreadcrumb }, ɵ5 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.roles'),
    }, ɵ6 = { breadcrumb: roleBreadcrumb }, ɵ7 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.tax-categories'),
    }, ɵ8 = {
        breadcrumb: taxCategoryBreadcrumb,
    }, ɵ9 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.tax-rates'),
    }, ɵ10 = {
        breadcrumb: taxRateBreadcrumb,
    }, ɵ11 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.countries'),
    }, ɵ12 = {
        breadcrumb: countryBreadcrumb,
    }, ɵ13 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.zones'),
    }, ɵ14 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.shipping-methods'),
    }, ɵ15 = {
        breadcrumb: shippingMethodBreadcrumb,
    }, ɵ16 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.payment-methods'),
    }, ɵ17 = {
        breadcrumb: paymentMethodBreadcrumb,
    }, ɵ18 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.global-settings'),
    };
    var settingsRoutes = [
        {
            path: 'profile',
            component: ProfileComponent,
            resolve: i2.createResolveData(ProfileResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ0,
        },
        {
            path: 'administrators',
            component: AdministratorListComponent,
            data: ɵ1,
        },
        {
            path: 'administrators/:id',
            component: AdminDetailComponent,
            resolve: i2.createResolveData(AdministratorResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ2,
        },
        {
            path: 'channels',
            component: ChannelListComponent,
            data: ɵ3,
        },
        {
            path: 'channels/:id',
            component: ChannelDetailComponent,
            resolve: i2.createResolveData(ChannelResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ4,
        },
        {
            path: 'roles',
            component: RoleListComponent,
            data: ɵ5,
        },
        {
            path: 'roles/:id',
            component: RoleDetailComponent,
            resolve: i2.createResolveData(RoleResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ6,
        },
        {
            path: 'tax-categories',
            component: TaxCategoryListComponent,
            data: ɵ7,
        },
        {
            path: 'tax-categories/:id',
            component: TaxCategoryDetailComponent,
            resolve: i2.createResolveData(TaxCategoryResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ8,
        },
        {
            path: 'tax-rates',
            component: TaxRateListComponent,
            data: ɵ9,
        },
        {
            path: 'tax-rates/:id',
            component: TaxRateDetailComponent,
            resolve: i2.createResolveData(TaxRateResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ10,
        },
        {
            path: 'countries',
            component: CountryListComponent,
            data: ɵ11,
        },
        {
            path: 'countries/:id',
            component: CountryDetailComponent,
            resolve: i2.createResolveData(CountryResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ12,
        },
        {
            path: 'zones',
            component: ZoneListComponent,
            data: ɵ13,
        },
        {
            path: 'shipping-methods',
            component: ShippingMethodListComponent,
            data: ɵ14,
        },
        {
            path: 'shipping-methods/:id',
            component: ShippingMethodDetailComponent,
            resolve: i2.createResolveData(ShippingMethodResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ15,
        },
        {
            path: 'payment-methods',
            component: PaymentMethodListComponent,
            data: ɵ16,
        },
        {
            path: 'payment-methods/:id',
            component: PaymentMethodDetailComponent,
            resolve: i2.createResolveData(PaymentMethodResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ17,
        },
        {
            path: 'global-settings',
            component: GlobalSettingsComponent,
            resolve: i2.createResolveData(GlobalSettingsResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ18,
        },
    ];
    function administratorBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.administrators',
            getName: function (admin) { return admin.firstName + " " + admin.lastName; },
            route: 'administrators',
        });
    }
    function channelBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.channels',
            getName: function (channel) { return channel.code; },
            route: 'channels',
        });
    }
    function roleBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.roles',
            getName: function (role) { return role.description; },
            route: 'roles',
        });
    }
    function taxCategoryBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.tax-categories',
            getName: function (category) { return category.name; },
            route: 'tax-categories',
        });
    }
    function taxRateBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.tax-rates',
            getName: function (category) { return category.name; },
            route: 'tax-rates',
        });
    }
    function countryBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.countries',
            getName: function (promotion) { return promotion.name; },
            route: 'countries',
        });
    }
    function shippingMethodBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.shipping-methods',
            getName: function (method) { return method.name; },
            route: 'shipping-methods',
        });
    }
    function paymentMethodBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.payment-methods',
            getName: function (method) { return method.code; },
            route: 'payment-methods',
        });
    }

    var SettingsModule = /** @class */ (function () {
        function SettingsModule() {
        }
        return SettingsModule;
    }());
    SettingsModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(settingsRoutes)],
                    declarations: [
                        TaxCategoryListComponent,
                        TaxCategoryDetailComponent,
                        AdministratorListComponent,
                        RoleListComponent,
                        RoleDetailComponent,
                        AdminDetailComponent,
                        PermissionGridComponent,
                        CountryListComponent,
                        CountryDetailComponent,
                        TaxRateListComponent,
                        TaxRateDetailComponent,
                        ChannelListComponent,
                        ChannelDetailComponent,
                        ShippingMethodListComponent,
                        ShippingMethodDetailComponent,
                        PaymentMethodListComponent,
                        PaymentMethodDetailComponent,
                        GlobalSettingsComponent,
                        TestOrderBuilderComponent,
                        TestAddressFormComponent,
                        ShippingMethodTestResultComponent,
                        ShippingEligibilityTestResultComponent,
                        ZoneListComponent,
                        AddCountryToZoneDialogComponent,
                        ZoneMemberListComponent,
                        ZoneMemberListHeaderDirective,
                        ZoneMemberControlsDirective,
                        ZoneDetailDialogComponent,
                        ProfileComponent,
                    ],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddCountryToZoneDialogComponent = AddCountryToZoneDialogComponent;
    exports.AdminDetailComponent = AdminDetailComponent;
    exports.AdministratorListComponent = AdministratorListComponent;
    exports.AdministratorResolver = AdministratorResolver;
    exports.ChannelDetailComponent = ChannelDetailComponent;
    exports.ChannelListComponent = ChannelListComponent;
    exports.ChannelResolver = ChannelResolver;
    exports.CountryDetailComponent = CountryDetailComponent;
    exports.CountryListComponent = CountryListComponent;
    exports.CountryResolver = CountryResolver;
    exports.GlobalSettingsComponent = GlobalSettingsComponent;
    exports.GlobalSettingsResolver = GlobalSettingsResolver;
    exports.PaymentMethodDetailComponent = PaymentMethodDetailComponent;
    exports.PaymentMethodListComponent = PaymentMethodListComponent;
    exports.PaymentMethodResolver = PaymentMethodResolver;
    exports.PermissionGridComponent = PermissionGridComponent;
    exports.ProfileComponent = ProfileComponent;
    exports.ProfileResolver = ProfileResolver;
    exports.RoleDetailComponent = RoleDetailComponent;
    exports.RoleListComponent = RoleListComponent;
    exports.RoleResolver = RoleResolver;
    exports.SettingsModule = SettingsModule;
    exports.ShippingEligibilityTestResultComponent = ShippingEligibilityTestResultComponent;
    exports.ShippingMethodDetailComponent = ShippingMethodDetailComponent;
    exports.ShippingMethodListComponent = ShippingMethodListComponent;
    exports.ShippingMethodResolver = ShippingMethodResolver;
    exports.ShippingMethodTestResultComponent = ShippingMethodTestResultComponent;
    exports.TaxCategoryDetailComponent = TaxCategoryDetailComponent;
    exports.TaxCategoryListComponent = TaxCategoryListComponent;
    exports.TaxCategoryResolver = TaxCategoryResolver;
    exports.TaxRateDetailComponent = TaxRateDetailComponent;
    exports.TaxRateListComponent = TaxRateListComponent;
    exports.TaxRateResolver = TaxRateResolver;
    exports.TestAddressFormComponent = TestAddressFormComponent;
    exports.TestOrderBuilderComponent = TestOrderBuilderComponent;
    exports.ZoneDetailDialogComponent = ZoneDetailDialogComponent;
    exports.ZoneListComponent = ZoneListComponent;
    exports.ZoneMemberControlsDirective = ZoneMemberControlsDirective;
    exports.ZoneMemberListComponent = ZoneMemberListComponent;
    exports.ZoneMemberListHeaderDirective = ZoneMemberListHeaderDirective;
    exports.administratorBreadcrumb = administratorBreadcrumb;
    exports.channelBreadcrumb = channelBreadcrumb;
    exports.countryBreadcrumb = countryBreadcrumb;
    exports.paymentMethodBreadcrumb = paymentMethodBreadcrumb;
    exports.roleBreadcrumb = roleBreadcrumb;
    exports.settingsRoutes = settingsRoutes;
    exports.shippingMethodBreadcrumb = shippingMethodBreadcrumb;
    exports.taxCategoryBreadcrumb = taxCategoryBreadcrumb;
    exports.taxRateBreadcrumb = taxRateBreadcrumb;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ10 = ɵ10;
    exports.ɵ11 = ɵ11;
    exports.ɵ12 = ɵ12;
    exports.ɵ13 = ɵ13;
    exports.ɵ14 = ɵ14;
    exports.ɵ15 = ɵ15;
    exports.ɵ16 = ɵ16;
    exports.ɵ17 = ɵ17;
    exports.ɵ18 = ɵ18;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;
    exports.ɵ4 = ɵ4;
    exports.ɵ5 = ɵ5;
    exports.ɵ6 = ɵ6;
    exports.ɵ7 = ɵ7;
    exports.ɵ8 = ɵ8;
    exports.ɵ9 = ɵ9;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-settings.umd.js.map

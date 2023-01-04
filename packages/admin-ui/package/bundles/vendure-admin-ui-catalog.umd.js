(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@vendure/admin-ui/core'), require('@biesbjerg/ngx-translate-extract-marker'), require('rxjs/operators'), require('@angular/forms'), require('rxjs'), require('@vendure/common/lib/normalize-string'), require('@vendure/common/lib/shared-utils'), require('@vendure/common/lib/generated-shop-types'), require('@angular/common'), require('@vendure/common/lib/shared-constants'), require('@vendure/common/lib/unique'), require('@vendure/common/lib/pick'), require('@angular/cdk/drag-drop'), require('apollo-angular')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/catalog', ['exports', '@angular/core', '@angular/router', '@vendure/admin-ui/core', '@biesbjerg/ngx-translate-extract-marker', 'rxjs/operators', '@angular/forms', 'rxjs', '@vendure/common/lib/normalize-string', '@vendure/common/lib/shared-utils', '@vendure/common/lib/generated-shop-types', '@angular/common', '@vendure/common/lib/shared-constants', '@vendure/common/lib/unique', '@vendure/common/lib/pick', '@angular/cdk/drag-drop', 'apollo-angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].catalog = {}), global.ng.core, global.ng.router, global.vendure['admin-ui'].core, global.ngxTranslateExtractMarker, global.rxjs.operators, global.ng.forms, global.rxjs, global.normalizeString, global.sharedUtils, global.generatedShopTypes, global.ng.common, global.sharedConstants, global.unique, global.pick, global.ng.cdk.dragDrop, global.apolloAngular));
}(this, (function (exports, i0, i1, i2, ngxTranslateExtractMarker, operators, forms, rxjs, normalizeString, sharedUtils, generatedShopTypes, common, sharedConstants, unique, pick, dragDrop, apolloAngular) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

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

    var AssetDetailComponent = /** @class */ (function (_super) {
        __extends(AssetDetailComponent, _super);
        function AssetDetailComponent(router, route, serverConfigService, notificationService, dataService, formBuilder) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.detailForm = new forms.FormGroup({});
            _this.customFields = _this.getCustomFieldConfig('Asset');
            return _this;
        }
        AssetDetailComponent.prototype.ngOnInit = function () {
            this.detailForm = new forms.FormGroup({
                name: new forms.FormControl(''),
                tags: new forms.FormControl([]),
                customFields: this.formBuilder.group(this.customFields.reduce(function (hash, field) {
                    var _c;
                    return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                }, {})),
            });
            this.init();
        };
        AssetDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        AssetDetailComponent.prototype.onAssetChange = function (event) {
            var _a, _b;
            (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(event.name);
            (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(event.tags);
            this.detailForm.markAsDirty();
        };
        AssetDetailComponent.prototype.save = function () {
            var _this = this;
            this.dataService.product
                .updateAsset({
                id: this.id,
                name: this.detailForm.value.name,
                tags: this.detailForm.value.tags,
                customFields: this.detailForm.value.customFields,
            })
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Asset' });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Asset',
                });
            });
        };
        AssetDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            var _a, _b;
            (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(entity.name);
            (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(entity.tags);
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), entity);
            }
        };
        return AssetDetailComponent;
    }(i2.BaseDetailComponent));
    AssetDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-detail\"></vdr-action-bar-items>\n        <button\n            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateAsset']\"\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<vdr-asset-preview\n    [asset]=\"entity$ | async\"\n    [editable]=\"true\"\n    [customFields]=\"customFields\"\n    [customFieldsForm]=\"detailForm.get('customFields')\"\n    (assetChange)=\"onAssetChange($event)\"\n></vdr-asset-preview>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column;height:100%}\n"]
                },] }
    ];
    AssetDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: forms.FormBuilder }
    ]; };

    var AssetListComponent = /** @class */ (function (_super) {
        __extends(AssetListComponent, _super);
        function AssetListComponent(notificationService, modalService, dataService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.dataService = dataService;
            _this.searchTerm$ = new rxjs.BehaviorSubject(undefined);
            _this.filterByTags$ = new rxjs.BehaviorSubject(undefined);
            _this.uploading = false;
            _super.prototype.setQueryFn.call(_this, function () {
                var _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_b = _this.dataService.product).getAssetList.apply(_b, __spreadArray([], __read(args)));
            }, function (data) { return data.assets; }, function (skip, take) {
                var _a;
                var searchTerm = _this.searchTerm$.value;
                var tags = (_a = _this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(function (t) { return t.value; });
                return {
                    options: Object.assign(Object.assign({ skip: skip, take: take }, (searchTerm
                        ? {
                            filter: {
                                name: { contains: searchTerm },
                            },
                        }
                        : {})), { sort: {
                            createdAt: i2.SortOrder.DESC,
                        }, tags: tags, tagsOperator: i2.LogicalOperator.AND }),
                };
            }, { take: 25, skip: 0 });
            return _this;
        }
        AssetListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.paginationConfig$ = rxjs.combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(operators.map(function (_b) {
                var _c = __read(_b, 3), itemsPerPage = _c[0], currentPage = _c[1], totalItems = _c[2];
                return ({ itemsPerPage: itemsPerPage, currentPage: currentPage, totalItems: totalItems });
            }));
            this.searchTerm$.pipe(operators.debounceTime(250), operators.takeUntil(this.destroy$)).subscribe(function () { return _this.refresh(); });
            this.filterByTags$.pipe(operators.takeUntil(this.destroy$)).subscribe(function () { return _this.refresh(); });
            this.allTags$ = this.dataService.product.getTagList().mapStream(function (data) { return data.tags.items; });
        };
        AssetListComponent.prototype.filesSelected = function (files) {
            var _this = this;
            if (files.length) {
                this.uploading = true;
                this.dataService.product
                    .createAssets(files)
                    .pipe(operators.finalize(function () { return (_this.uploading = false); }))
                    .subscribe(function (_b) {
                    var e_1, _c;
                    var createAssets = _b.createAssets;
                    var successCount = 0;
                    try {
                        for (var createAssets_1 = __values(createAssets), createAssets_1_1 = createAssets_1.next(); !createAssets_1_1.done; createAssets_1_1 = createAssets_1.next()) {
                            var result = createAssets_1_1.value;
                            switch (result.__typename) {
                                case 'Asset':
                                    successCount++;
                                    break;
                                case 'MimeTypeError':
                                    _this.notificationService.error(result.message);
                                    break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (createAssets_1_1 && !createAssets_1_1.done && (_c = createAssets_1.return)) _c.call(createAssets_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (0 < successCount) {
                        _super.prototype.refresh.call(_this);
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('asset.notify-create-assets-success'), {
                            count: successCount,
                        });
                    }
                });
            }
        };
        AssetListComponent.prototype.deleteAssets = function (assets) {
            var _this = this;
            this.showModalAndDelete(assets.map(function (a) { return a.id; }))
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(assets.map(function (a) { return a.id; }), response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Assets',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Assets',
                });
            });
        };
        AssetListComponent.prototype.showModalAndDelete = function (assetIds, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-assets'),
                translationVars: {
                    count: assetIds.length,
                },
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.product.deleteAssets(assetIds, !!message) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteAssets; }));
        };
        return AssetListComponent;
    }(i2.BaseListComponent));
    AssetListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <vdr-asset-search-input\n            class=\"pr4 mt1\"\n            [tags]=\"allTags$ | async\"\n            (searchTermChange)=\"searchTerm$.next($event)\"\n            (tagsChange)=\"filterByTags$.next($event)\"\n        ></vdr-asset-search-input>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-list\"></vdr-action-bar-items>\n        <vdr-asset-file-input\n            (selectFiles)=\"filesSelected($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".content-area\"\n        ></vdr-asset-file-input>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-asset-gallery\n    [assets]=\"(items$ | async)! | paginate: (paginationConfig$ | async) || {}\"\n    [multiSelect]=\"true\"\n    [canDelete]=\"['DeleteCatalog', 'DeleteAsset'] | hasPermission\"\n    (deleteAssets)=\"deleteAssets($event)\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"currentPage$ | async\"\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        [totalItems]=\"totalItems$ | async\"\n        (pageChange)=\"setPageNumber($event)\"\n    ></vdr-pagination-controls>\n</div>\n",
                    styles: [":host{display:flex;flex-direction:column;height:100%}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}.search-input{margin-top:6px;min-width:300px}\n"]
                },] }
    ];
    AssetListComponent.ctorParameters = function () { return [
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var CollectionDetailComponent = /** @class */ (function (_super) {
        __extends(CollectionDetailComponent, _super);
        function CollectionDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService, localStorageService) {
            var _this = this;
            var _a;
            _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.localStorageService = localStorageService;
            _this.assetChanges = {};
            _this.filters = [];
            _this.allFilters = [];
            _this.livePreview = false;
            _this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateCollection];
            _this.filterRemoved$ = new rxjs.Subject();
            _this.customFields = _this.getCustomFieldConfig('Collection');
            _this.detailForm = _this.formBuilder.group({
                name: ['', forms.Validators.required],
                slug: ['', i2.unicodePatternValidator(/^[\p{Letter}0-9_-]+$/)],
                description: '',
                visible: false,
                filters: _this.formBuilder.array([]),
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _c;
                    return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                }, {})),
            });
            _this.livePreview = (_a = _this.localStorageService.get('livePreviewCollectionContents')) !== null && _a !== void 0 ? _a : false;
            return _this;
        }
        CollectionDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.dataService.collection.getCollectionFilters().single$.subscribe(function (res) {
                _this.allFilters = res.collectionFilters;
            });
            var filtersFormArray = this.detailForm.get('filters');
            this.updatedFilters$ = rxjs.merge(filtersFormArray.statusChanges, this.filterRemoved$).pipe(operators.debounceTime(200), operators.filter(function () { return filtersFormArray.touched; }), operators.map(function () { return _this.mapOperationsToInputs(_this.filters, filtersFormArray.value).filter(function (_filter) {
                var e_1, _c;
                try {
                    // ensure all the arguments have valid values. E.g. a newly-added
                    // filter will not yet have valid values
                    for (var _d = __values(_filter.arguments), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var arg = _e.value;
                        if (arg.value === '') {
                            return false;
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
                return true;
            }); }));
            this.parentId$ = this.route.paramMap.pipe(operators.map(function (pm) { return pm.get('parentId') || undefined; }), operators.switchMap(function (parentId) {
                if (parentId) {
                    return rxjs.of(parentId);
                }
                else {
                    return _this.entity$.pipe(operators.map(function (collection) { var _a; return (_a = collection.parent) === null || _a === void 0 ? void 0 : _a.id; }));
                }
            }));
        };
        CollectionDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        CollectionDetailComponent.prototype.getFilterDefinition = function (_filter) {
            return this.allFilters.find(function (f) { return f.code === _filter.code; });
        };
        CollectionDetailComponent.prototype.assetsChanged = function () {
            return !!Object.values(this.assetChanges).length;
        };
        /**
         * If creating a new Collection, automatically generate the slug based on the collection name.
         */
        CollectionDetailComponent.prototype.updateSlug = function (nameValue) {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), entity = _d[0], languageCode = _d[1];
                var slugControl = _this.detailForm.get(['slug']);
                var currentTranslation = i2.findTranslation(entity, languageCode);
                var currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
                if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                    slugControl.setValue(normalizeString.normalizeString("" + nameValue, '-'));
                }
            });
        };
        CollectionDetailComponent.prototype.addFilter = function (collectionFilter) {
            var filtersArray = this.detailForm.get('filters');
            var argsHash = collectionFilter.args.reduce(function (output, arg) {
                var _c;
                return (Object.assign(Object.assign({}, output), (_c = {}, _c[arg.name] = i2.getConfigArgValue(arg.value), _c)));
            }, {});
            filtersArray.push(this.formBuilder.control({
                code: collectionFilter.code,
                args: argsHash,
            }));
            this.filters.push({
                code: collectionFilter.code,
                args: collectionFilter.args.map(function (a) { return ({ name: a.name, value: i2.getConfigArgValue(a.value) }); }),
            });
        };
        CollectionDetailComponent.prototype.removeFilter = function (index) {
            var filtersArray = this.detailForm.get('filters');
            if (index !== -1) {
                filtersArray.removeAt(index);
                filtersArray.markAsDirty();
                filtersArray.markAsTouched();
                this.filters.splice(index, 1);
                this.filterRemoved$.next();
            }
        };
        CollectionDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), category = _d[0], languageCode = _d[1];
                var input = _this.getUpdatedCollection(category, _this.detailForm, languageCode);
                var parentId = _this.route.snapshot.paramMap.get('parentId');
                if (parentId) {
                    input.parentId = parentId;
                }
                return _this.dataService.collection.createCollection(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Collection',
                });
                _this.assetChanges = {};
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createCollection.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), category = _d[0], languageCode = _d[1];
                var input = _this.getUpdatedCollection(category, _this.detailForm, languageCode);
                return _this.dataService.collection.updateCollection(input);
            }))
                .subscribe(function () {
                _this.assetChanges = {};
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Collection',
                });
                _this.contentsComponent.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionDetailComponent.prototype.canDeactivate = function () {
            return _super.prototype.canDeactivate.call(this) && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
        };
        CollectionDetailComponent.prototype.toggleLivePreview = function () {
            this.livePreview = !this.livePreview;
            this.localStorageService.set('livePreviewCollectionContents', this.livePreview);
        };
        CollectionDetailComponent.prototype.trackByFn = function (index, item) {
            return JSON.stringify(item);
        };
        /**
         * Sets the values of the form on changes to the category or current language.
         */
        CollectionDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            var _this = this;
            var currentTranslation = i2.findTranslation(entity, languageCode);
            this.detailForm.patchValue({
                name: currentTranslation ? currentTranslation.name : '',
                slug: currentTranslation ? currentTranslation.slug : '',
                description: currentTranslation ? currentTranslation.description : '',
                visible: !entity.isPrivate,
            });
            var formArray = this.detailForm.get('filters');
            if (formArray.length !== entity.filters.length) {
                formArray.clear();
                this.filters = [];
                entity.filters.forEach(function (f) { return _this.addFilter(f); });
            }
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customFields']), entity, currentTranslation);
            }
        };
        /**
         * Given a category and the value of the form, this method creates an updated copy of the category which
         * can then be persisted to the API.
         */
        CollectionDetailComponent.prototype.getUpdatedCollection = function (category, form, languageCode) {
            var _a, _b;
            var updatedCategory = i2.createUpdatedTranslatable({
                translatable: category,
                updatedFields: form.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: category.name || '',
                    slug: category.slug || '',
                    description: category.description || '',
                },
            });
            return Object.assign(Object.assign({}, updatedCategory), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(function (a) { return a.id; }), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, isPrivate: !form.value.visible, filters: this.mapOperationsToInputs(this.filters, this.detailForm.value.filters) });
        };
        /**
         * Maps an array of conditions or actions to the input format expected by the GraphQL API.
         */
        CollectionDetailComponent.prototype.mapOperationsToInputs = function (operations, formValueOperations) {
            return operations.map(function (o, i) {
                return {
                    code: o.code,
                    arguments: Object.entries(formValueOperations[i].args).map(function (_c, j) {
                        var _d = __read(_c, 2), name = _d[0], value = _d[1];
                        return {
                            name: name,
                            value: i2.encodeConfigArgValue(value),
                        };
                    }),
                };
            });
        };
        return CollectionDetailComponent;
    }(i2.BaseDetailComponent));
    CollectionDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"(detailForm.invalid || detailForm.pristine) && !assetsChanged()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as collection\">\n\n    <nav role=\"navigation\">\n        <ul class=\"collection-breadcrumbs\">\n            <li *ngFor=\"let breadcrumb of collection.breadcrumbs; let isFirst = first; let isLast = last\">\n                <a [routerLink]=\"['/catalog/collections']\" *ngIf=\"isFirst\">{{ 'catalog.root-collection' | translate }}</a>\n                <a [routerLink]=\"['/catalog/collections', breadcrumb.id]\" *ngIf=\"!isFirst && !isLast\">{{ breadcrumb.name | translate }}</a>\n                <ng-container *ngIf=\"isLast\">{{ breadcrumb.name | translate }}</ng-container>\n            </li>\n        </ul>\n    </nav>\n    <div class=\"clr-row\">\n        <div class=\"clr-col\">\n            <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n                <clr-toggle-wrapper>\n                    <input\n                        type=\"checkbox\"\n                        clrToggle\n                        formControlName=\"visible\"\n                        id=\"visibility\"\n                        [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    />\n                    <label class=\"visible-toggle\">\n                        <ng-container *ngIf=\"detailForm.value.visible; else private\">{{\n                            'catalog.public' | translate\n                            }}</ng-container>\n                        <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                    </label>\n                </clr-toggle-wrapper>\n            </vdr-form-field>\n            <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n                <input\n                    id=\"name\"\n                    type=\"text\"\n                    formControlName=\"name\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                    (input)=\"updateSlug($event.target.value)\"\n                />\n            </vdr-form-field>\n            <vdr-form-field\n                [label]=\"'catalog.slug' | translate\"\n                for=\"slug\"\n                [errors]=\"{ pattern: ('catalog.slug-pattern-error' | translate) }\"\n            >\n                <input\n                    id=\"slug\"\n                    type=\"text\"\n                    formControlName=\"slug\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                />\n            </vdr-form-field>\n            <vdr-rich-text-editor\n                formControlName=\"description\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                [label]=\"'common.description' | translate\"\n            ></vdr-rich-text-editor>\n\n            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                <label>{{ 'common.custom-fields' | translate }}</label>\n                <vdr-tabbed-custom-fields\n                    entityName=\"Collection\"\n                    [customFields]=\"customFields\"\n                    [customFieldsFormGroup]=\"detailForm.get(['customFields'])\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                ></vdr-tabbed-custom-fields>\n            </section>\n            <vdr-custom-detail-component-host\n                locationId=\"collection-detail\"\n                [entity$]=\"entity$\"\n                [detailForm]=\"detailForm\"\n            ></vdr-custom-detail-component-host>\n        </div>\n        <div class=\"clr-col-md-auto\">\n            <vdr-assets\n                [assets]=\"collection.assets\"\n                [featuredAsset]=\"collection.featuredAsset\"\n                [updatePermissions]=\"updatePermission\"\n                (change)=\"assetChanges = $event\"\n            ></vdr-assets>\n        </div>\n    </div>\n    <div class=\"clr-row\" formArrayName=\"filters\">\n        <div class=\"clr-col\">\n            <label>{{ 'catalog.filters' | translate }}</label>\n            <ng-container *ngFor=\"let filter of filters; index as i; trackBy:trackByFn\">\n                <vdr-configurable-input\n                    (remove)=\"removeFilter(i)\"\n                    [position]=\"i\"\n                    [operation]=\"filter\"\n                    [operationDefinition]=\"getFilterDefinition(filter)\"\n                    [formControlName]=\"i\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div *vdrIfPermissions=\"updatePermission\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let filter of allFilters\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addFilter(filter)\"\n                        >\n                            {{ filter.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <vdr-collection-contents\n                [collectionId]=\"id\"\n                [parentId]=\"parentId$ | async\"\n                [updatedFilters]=\"updatedFilters$ | async\"\n                [previewUpdatedFilters]=\"livePreview\"\n                #collectionContents\n            >\n                <ng-template let-count>\n                    <div class=\"contents-title\">\n                        {{ 'catalog.collection-contents' | translate }} ({{\n                        'common.results-count' | translate: {count: count}\n                        }})\n                    </div>\n                    <clr-checkbox-wrapper [class.disabled]=\"detailForm.get('filters')?.pristine\">\n                        <input\n                            type=\"checkbox\"\n                            clrCheckbox\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            [disabled]=\"detailForm.get('filters')?.pristine\"\n                            [ngModel]=\"livePreview\"\n                            (ngModelChange)=\"toggleLivePreview()\"\n                        />\n                        <label>{{ 'catalog.live-preview-contents' | translate }}</label>\n                    </clr-checkbox-wrapper>\n                </ng-template>\n            </vdr-collection-contents>\n        </div>\n    </div>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["@charset \"UTF-8\";.visible-toggle{margin-top:-3px!important}clr-checkbox-wrapper{transition:opacity .3s}clr-checkbox-wrapper.disabled{opacity:.5}.collection-breadcrumbs{list-style-type:none;background-color:var(--color-component-bg-200);padding:2px 6px;margin-bottom:6px;border-radius:var(--clr-global-borderradius)}.collection-breadcrumbs li{font-size:.65rem;display:inline-block;margin-right:10px}.collection-breadcrumbs li:not(:last-child):after{content:\"\\203a\";top:0;color:var(--color-grey-400);margin-left:10px}\n"]
                },] }
    ];
    CollectionDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i2.LocalStorageService }
    ]; };
    CollectionDetailComponent.propDecorators = {
        contentsComponent: [{ type: i0.ViewChild, args: ['collectionContents',] }]
    };

    var CollectionListComponent = /** @class */ (function () {
        function CollectionListComponent(dataService, notificationService, modalService, router, route, serverConfigService, changeDetectorRef) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.router = router;
            this.route = route;
            this.serverConfigService = serverConfigService;
            this.changeDetectorRef = changeDetectorRef;
            this.filterTermControl = new forms.FormControl('');
            this.expandAll = false;
            this.expandedIds = [];
            this.destroy$ = new rxjs.Subject();
            this.selectionManager = new i2.SelectionManager({
                additiveMode: true,
                multiSelect: true,
                itemsAreEqual: function (a, b) { return a.id === b.id; },
            });
        }
        CollectionListComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b;
            this.queryResult = this.dataService.collection.getCollections(1000, 0).refetchOnChannelChange();
            this.items$ = this.queryResult
                .mapStream(function (data) { return data.collections.items; })
                .pipe(operators.tap(function (items) { return _this.selectionManager.setCurrentItems(items); }), operators.shareReplay(1));
            this.activeCollectionId$ = this.route.paramMap.pipe(operators.map(function (pm) { return pm.get('contents'); }), operators.distinctUntilChanged());
            this.expandedIds = (_b = (_a = this.route.snapshot.queryParamMap.get('expanded')) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
            this.expandAll = this.route.snapshot.queryParamMap.get('expanded') === 'all';
            this.activeCollectionTitle$ = rxjs.combineLatest(this.activeCollectionId$, this.items$).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), id = _d[0], collections = _d[1];
                if (id) {
                    var match = collections.find(function (c) { return c.id === id; });
                    return match ? match.name : '';
                }
                return '';
            }));
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_c) {
                var uiState = _c.uiState;
                return uiState.contentLanguage;
            })
                .pipe(operators.tap(function () { return _this.refresh(); }));
            this.filterTermControl.valueChanges
                .pipe(operators.debounceTime(250), operators.takeUntil(this.destroy$))
                .subscribe(function (term) {
                _this.router.navigate(['./'], {
                    queryParams: {
                        q: term || undefined,
                    },
                    queryParamsHandling: 'merge',
                    relativeTo: _this.route,
                });
            });
            this.route.queryParamMap
                .pipe(operators.map(function (qpm) { return qpm.get('q'); }), operators.distinctUntilChanged(), operators.takeUntil(this.destroy$))
                .subscribe(function () { return _this.refresh(); });
            this.filterTermControl.patchValue(this.route.snapshot.queryParamMap.get('q'));
        };
        CollectionListComponent.prototype.ngOnDestroy = function () {
            this.queryResult.completed$.next();
            this.destroy$.next(undefined);
            this.destroy$.complete();
        };
        CollectionListComponent.prototype.toggleExpandAll = function () {
            this.router.navigate(['./'], {
                queryParams: {
                    expanded: this.expandAll ? 'all' : undefined,
                },
                queryParamsHandling: 'merge',
                relativeTo: this.route,
            });
        };
        CollectionListComponent.prototype.onRearrange = function (event) {
            var _this = this;
            this.dataService.collection.moveCollection([event]).subscribe({
                next: function () {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-saved-changes'));
                    _this.refresh();
                },
                error: function (err) {
                    _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-save-changes-error'));
                },
            });
        };
        CollectionListComponent.prototype.deleteCollection = function (id) {
            var _this = this;
            this.items$
                .pipe(operators.take(1), operators.map(function (items) { return -1 < items.findIndex(function (i) { return i.parent && i.parent.id === id; }); }), operators.switchMap(function (hasChildren) {
                return _this.modalService.dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-collection'),
                    body: hasChildren
                        ? ngxTranslateExtractMarker.marker('catalog.confirm-delete-collection-and-children-body')
                        : undefined,
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                    ],
                });
            }), operators.switchMap(function (response) { return (response ? _this.dataService.collection.deleteCollection(id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Collection',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionListComponent.prototype.closeContents = function () {
            var params = Object.assign({}, this.route.snapshot.params);
            delete params.contents;
            this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
        };
        CollectionListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        CollectionListComponent.prototype.refresh = function () {
            var filterTerm = this.route.snapshot.queryParamMap.get('q');
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
        };
        return CollectionListComponent;
    }());
    CollectionListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"\">\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"filterTermControl\"\n                [placeholder]=\"'catalog.filter-by-name' | translate\"\n                class=\"clr-input search-input\"\n            />\n            <div class=\"flex center\">\n                <clr-toggle-wrapper\n                    class=\"expand-all-toggle mt2\"\n                >\n                    <input type=\"checkbox\" clrToggle [(ngModel)]=\"expandAll\" (change)=\"toggleExpandAll()\" />\n                    <label>\n                        {{ 'catalog.expand-all-collections' | translate }}\n                    </label>\n                </clr-toggle-wrapper>\n                <vdr-language-selector\n                    class=\"mt2\"\n                    [availableLanguageCodes]=\"availableLanguages$ | async\"\n                    [currentLanguageCode]=\"contentLanguage$ | async\"\n                    (languageCodeChange)=\"setLanguage($event)\"\n                ></vdr-language-selector>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\"\n            [routerLink]=\"['./create']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-collection' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"bulk-select-controls\">\n    <input\n        type=\"checkbox\"\n        clrCheckbox\n        [checked]=\"selectionManager.areAllCurrentItemsSelected()\"\n        (click)=\"selectionManager.toggleSelectAll()\"\n    />\n    <vdr-bulk-action-menu\n        class=\"ml2\"\n        locationId=\"collection-list\"\n        [hostComponent]=\"this\"\n        [selectionManager]=\"selectionManager\"\n    ></vdr-bulk-action-menu>\n</div>\n<div class=\"collection-wrapper\">\n    <vdr-collection-tree\n        [collections]=\"items$ | async\"\n        [activeCollectionId]=\"activeCollectionId$ | async\"\n        [expandAll]=\"expandAll\"\n        [expandedIds]=\"expandedIds\"\n        [selectionManager]=\"selectionManager\"\n        (rearrange)=\"onRearrange($event)\"\n        (deleteCollection)=\"deleteCollection($event)\"\n    ></vdr-collection-tree>\n\n    <div class=\"collection-contents\" [class.expanded]=\"activeCollectionId$ | async\">\n        <vdr-collection-contents [collectionId]=\"activeCollectionId$ | async\">\n            <ng-template let-count>\n                <div class=\"collection-title\">\n                    {{ activeCollectionTitle$ | async }} ({{\n                        'common.results-count' | translate: { count: count }\n                    }})\n                </div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeContents()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </ng-template>\n        </vdr-collection-contents>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:flex;flex-direction:column}.bulk-select-controls{min-height:36px;padding-left:14px;display:flex;align-items:center;border-bottom:1px solid var(--color-component-border-200)}.expand-all-toggle{display:block}.collection-wrapper{display:flex;height:calc(100% - 50px)}.collection-wrapper vdr-collection-tree{flex:1;height:100%;overflow:auto}.collection-wrapper .collection-contents{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.collection-wrapper .collection-contents.expanded{width:30vw;visibility:visible;opacity:1;padding-left:12px}.collection-wrapper .collection-contents .close-button{margin:0;background:none;border:none;cursor:pointer}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}\n"]
                },] }
    ];
    CollectionListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var FacetDetailComponent = /** @class */ (function (_super) {
        __extends(FacetDetailComponent, _super);
        function FacetDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateFacet];
            _this.customFields = _this.getCustomFieldConfig('Facet');
            _this.customValueFields = _this.getCustomFieldConfig('FacetValue');
            _this.detailForm = _this.formBuilder.group({
                facet: _this.formBuilder.group({
                    code: ['', forms.Validators.required],
                    name: '',
                    visible: true,
                    customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                        var _f;
                        return (Object.assign(Object.assign({}, hash), (_f = {}, _f[field.name] = '', _f)));
                    }, {})),
                }),
                values: _this.formBuilder.array([]),
            });
            return _this;
        }
        FacetDetailComponent.prototype.ngOnInit = function () {
            this.init();
        };
        FacetDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        FacetDetailComponent.prototype.updateCode = function (currentCode, nameValue) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['facet', 'code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        FacetDetailComponent.prototype.updateValueCode = function (currentCode, nameValue, index) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['values', index, 'code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        FacetDetailComponent.prototype.customValueFieldIsSet = function (index, name) {
            return !!this.detailForm.get(['values', index, 'customFields', name]);
        };
        FacetDetailComponent.prototype.getValuesFormArray = function () {
            return this.detailForm.get('values');
        };
        FacetDetailComponent.prototype.addFacetValue = function () {
            var e_1, _f;
            var valuesFormArray = this.detailForm.get('values');
            if (valuesFormArray) {
                var valueGroup = this.formBuilder.group({
                    id: '',
                    name: ['', forms.Validators.required],
                    code: '',
                });
                var newValue = { name: '', code: '' };
                if (this.customValueFields.length) {
                    var customValueFieldsGroup = new forms.FormGroup({});
                    newValue.customFields = {};
                    try {
                        for (var _g = __values(this.customValueFields), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var fieldDef = _h.value;
                            var key = fieldDef.name;
                            customValueFieldsGroup.addControl(key, new forms.FormControl());
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_f = _g.return)) _f.call(_g);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    valueGroup.addControl('customFields', customValueFieldsGroup);
                }
                valuesFormArray.insert(valuesFormArray.length, valueGroup);
                this.values.push(newValue);
            }
        };
        FacetDetailComponent.prototype.create = function () {
            var _this = this;
            var facetForm = this.detailForm.get('facet');
            if (!facetForm || !facetForm.dirty) {
                return;
            }
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_f) {
                var _g = __read(_f, 2), facet = _g[0], languageCode = _g[1];
                var newFacet = _this.getUpdatedFacet(facet, facetForm, languageCode);
                return _this.dataService.facet.createFacet(newFacet);
            }), operators.switchMap(function (data) { return _this.dataService.facet.getAllFacets().single$.pipe(operators.mapTo(data)); }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), { entity: 'Facet' });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createFacet.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Facet',
                });
            });
        };
        FacetDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_f) {
                var _g = __read(_f, 2), facet = _g[0], languageCode = _g[1];
                var facetGroup = _this.detailForm.get('facet');
                var updateOperations = [];
                if (facetGroup && facetGroup.dirty) {
                    var newFacet = _this.getUpdatedFacet(facet, facetGroup, languageCode);
                    if (newFacet) {
                        updateOperations.push(_this.dataService.facet.updateFacet(newFacet));
                    }
                }
                var valuesArray = _this.detailForm.get('values');
                if (valuesArray && valuesArray.dirty) {
                    var createdValues = _this.getCreatedFacetValues(facet, valuesArray, languageCode);
                    if (createdValues.length) {
                        updateOperations.push(_this.dataService.facet
                            .createFacetValues(createdValues)
                            .pipe(operators.switchMap(function () { return _this.dataService.facet.getFacet(_this.id).single$; })));
                    }
                    var updatedValues = _this.getUpdatedFacetValues(facet, valuesArray, languageCode);
                    if (updatedValues.length) {
                        updateOperations.push(_this.dataService.facet.updateFacetValues(updatedValues));
                    }
                }
                return rxjs.forkJoin(updateOperations);
            }), operators.switchMap(function () { return _this.dataService.facet.getAllFacets().single$; }))
                .subscribe(function () {
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Facet' });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Facet',
                });
            });
        };
        FacetDetailComponent.prototype.deleteFacetValue = function (facetValueId, index) {
            var _this = this;
            if (!facetValueId) {
                // deleting a newly-added (not persisted) FacetValue
                var valuesFormArray = this.detailForm.get('values');
                if (valuesFormArray) {
                    valuesFormArray.removeAt(index);
                }
                this.values.splice(index, 1);
                return;
            }
            this.showModalAndDelete(facetValueId)
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(facetValueId, response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }), operators.switchMap(function (deleted) { return (deleted ? _this.dataService.facet.getFacet(_this.id).single$ : []); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'FacetValue',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'FacetValue',
                });
            });
        };
        FacetDetailComponent.prototype.showModalAndDelete = function (facetValueId, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-facet-value'),
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (result) { return result ? _this.dataService.facet.deleteFacetValues([facetValueId], !!message) : rxjs.EMPTY; }), operators.map(function (result) { return result.deleteFacetValues[0]; }));
        };
        /**
         * Sets the values of the form on changes to the facet or current language.
         */
        FacetDetailComponent.prototype.setFormValues = function (facet, languageCode) {
            var _this = this;
            var _a;
            var currentTranslation = i2.findTranslation(facet, languageCode);
            this.detailForm.patchValue({
                facet: {
                    code: facet.code,
                    visible: !facet.isPrivate,
                    name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
                },
            });
            if (this.customFields.length) {
                var customFieldsGroup = this.detailForm.get(['facet', 'customFields']);
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['facet', 'customFields']), facet, currentTranslation);
            }
            var currentValuesFormArray = this.detailForm.get('values');
            this.values = __spreadArray([], __read(facet.values));
            facet.values.forEach(function (value, i) {
                var e_2, _f;
                var _a, _b, _c, _d, _e;
                var valueTranslation = i2.findTranslation(value, languageCode);
                var group = {
                    id: value.id,
                    code: value.code,
                    name: valueTranslation ? valueTranslation.name : '',
                };
                var valueControl = currentValuesFormArray.at(i);
                if (valueControl) {
                    (_a = valueControl.get('id')) === null || _a === void 0 ? void 0 : _a.setValue(group.id);
                    (_b = valueControl.get('code')) === null || _b === void 0 ? void 0 : _b.setValue(group.code);
                    (_c = valueControl.get('name')) === null || _c === void 0 ? void 0 : _c.setValue(group.name);
                }
                else {
                    currentValuesFormArray.insert(i, _this.formBuilder.group(group));
                }
                if (_this.customValueFields.length) {
                    var customValueFieldsGroup = _this.detailForm.get(['values', i, 'customFields']);
                    if (!customValueFieldsGroup) {
                        customValueFieldsGroup = new forms.FormGroup({});
                        _this.detailForm.get(['values', i]).addControl('customFields', customValueFieldsGroup);
                    }
                    if (customValueFieldsGroup) {
                        try {
                            for (var _g = __values(_this.customValueFields), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var fieldDef = _h.value;
                                var key = fieldDef.name;
                                var fieldValue = fieldDef.type === 'localeString'
                                    ? (_e = (_d = valueTranslation) === null || _d === void 0 ? void 0 : _d.customFields) === null || _e === void 0 ? void 0 : _e[key]
                                    : value.customFields[key];
                                var control = customValueFieldsGroup.get(key);
                                if (control) {
                                    control.setValue(fieldValue);
                                }
                                else {
                                    customValueFieldsGroup.addControl(key, new forms.FormControl(fieldValue));
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_f = _g.return)) _f.call(_g);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            });
        };
        /**
         * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
         * can then be persisted to the API.
         */
        FacetDetailComponent.prototype.getUpdatedFacet = function (facet, facetFormGroup, languageCode) {
            var input = i2.createUpdatedTranslatable({
                translatable: facet,
                updatedFields: facetFormGroup.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: facet.name || '',
                },
            });
            input.isPrivate = !facetFormGroup.value.visible;
            return input;
        };
        /**
         * Given an array of facet values and the values from the detailForm, this method creates a new array
         * which can be persisted to the API via a createFacetValues mutation.
         */
        FacetDetailComponent.prototype.getCreatedFacetValues = function (facet, valuesFormArray, languageCode) {
            var _this = this;
            return valuesFormArray.controls
                .filter(function (c) { return !c.value.id; })
                .map(function (c) { return c.value; })
                .map(function (value) { return i2.createUpdatedTranslatable({
                translatable: Object.assign(Object.assign({}, value), { translations: [] }),
                updatedFields: value,
                customFieldConfig: _this.customValueFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: '',
                },
            }); })
                .map(function (input) { return (Object.assign({ facetId: facet.id }, input)); });
        };
        /**
         * Given an array of facet values and the values from the detailForm, this method creates a new array
         * which can be persisted to the API via an updateFacetValues mutation.
         */
        FacetDetailComponent.prototype.getUpdatedFacetValues = function (facet, valuesFormArray, languageCode) {
            var _this = this;
            var dirtyValues = facet.values.filter(function (v, i) {
                var formRow = valuesFormArray.get(i.toString());
                return formRow && formRow.dirty && formRow.value.id;
            });
            var dirtyValueValues = valuesFormArray.controls
                .filter(function (c) { return c.dirty && c.value.id; })
                .map(function (c) { return c.value; });
            if (dirtyValues.length !== dirtyValueValues.length) {
                throw new Error(ngxTranslateExtractMarker.marker("error.facet-value-form-values-do-not-match"));
            }
            return dirtyValues
                .map(function (value, i) {
                return i2.createUpdatedTranslatable({
                    translatable: value,
                    updatedFields: dirtyValueValues[i],
                    customFieldConfig: _this.customValueFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        languageCode: languageCode,
                        name: '',
                    },
                });
            })
                .filter(sharedUtils.notNullOrUndefined);
        };
        return FacetDetailComponent;
    }(i2.BaseDetailComponent));
    FacetDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as facet\">\n    <section class=\"form-block\" formGroupName=\"facet\">\n        <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n            <clr-toggle-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    formControlName=\"visible\"\n                    id=\"visibility\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"detailForm.value.facet.visible; else private\">{{\n                        'catalog.public' | translate\n                    }}</ng-container>\n                    <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                </label>\n            </clr-toggle-wrapper>\n        </vdr-form-field>\n        <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n            <input\n                id=\"name\"\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (input)=\"updateCode(facet.code, $event.target.value)\"\n            />\n        </vdr-form-field>\n        <vdr-form-field\n            [label]=\"'common.code' | translate\"\n            for=\"code\"\n            [readOnlyToggle]=\"updatePermission | hasPermission\"\n        >\n            <input\n                id=\"code\"\n                type=\"text\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"code\"\n            />\n        </vdr-form-field>\n\n        <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n            <label>{{ 'common.custom-fields' | translate }}</label>\n            <vdr-tabbed-custom-fields\n                entityName=\"Facet\"\n                [customFields]=\"customFields\"\n                [customFieldsFormGroup]=\"detailForm.get(['facet', 'customFields'])\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            ></vdr-tabbed-custom-fields>\n        </section>\n        <vdr-custom-detail-component-host\n            locationId=\"facet-detail\"\n            [entity$]=\"entity$\"\n            [detailForm]=\"detailForm\"\n        ></vdr-custom-detail-component-host>\n    </section>\n\n    <section class=\"form-block\" *ngIf=\"!(isNew$ | async)\">\n        <label>{{ 'catalog.facet-values' | translate }}</label>\n\n        <table class=\"facet-values-list table\" formArrayName=\"values\" *ngIf=\"0 < getValuesFormArray().length\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'common.name' | translate }}</th>\n                    <th>{{ 'common.code' | translate }}</th>\n                    <ng-container *ngIf=\"customValueFields.length\">\n                        <th>{{ 'common.custom-fields' | translate }}</th>\n                    </ng-container>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr class=\"facet-value\" *ngFor=\"let value of values; let i = index\" [formGroupName]=\"i\">\n                    <td class=\"align-middle\">\n                        <vdr-entity-info [entity]=\"value\"></vdr-entity-info>\n                    </td>\n                    <td class=\"align-middle\">\n                        <input\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            (input)=\"updateValueCode(facet.values[i]?.code, $event.target.value, i)\"\n                        />\n                    </td>\n                    <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" readonly /></td>\n                    <td class=\"\" *ngIf=\"customValueFields.length\">\n                        <vdr-tabbed-custom-fields\n                            entityName=\"FacetValue\"\n                            [customFields]=\"customValueFields\"\n                            [compact]=\"true\"\n                            [customFieldsFormGroup]=\"detailForm.get(['values', i, 'customFields'])\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                        ></vdr-tabbed-custom-fields>\n                    </td>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"deleteFacetValue(facet.values[i]?.id, i)\"\n                                    [disabled]=\"!(updatePermission | hasPermission)\"\n                                    vdrDropdownItem\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <button\n                type=\"button\"\n                class=\"btn btn-secondary\"\n                *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n                (click)=\"addFacetValue()\"\n            >\n                <clr-icon shape=\"add\"></clr-icon>\n                {{ 'catalog.add-facet-value' | translate }}\n            </button>\n        </div>\n    </section>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".visible-toggle{margin-top:-3px!important}\n"]
                },] }
    ];
    FacetDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    var FacetListComponent = /** @class */ (function (_super) {
        __extends(FacetListComponent, _super);
        function FacetListComponent(dataService, modalService, notificationService, serverConfigService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.serverConfigService = serverConfigService;
            _this.filterTermControl = new forms.FormControl('');
            _this.initialLimit = 3;
            _this.displayLimit = {};
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.facet).getFacets.apply(_a, __spreadArray([], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.facets; }, function (skip, take) { return ({
                options: {
                    skip: skip,
                    take: take,
                    filter: {
                        name: {
                            contains: _this.filterTermControl.value,
                        },
                    },
                    sort: {
                        createdAt: generatedShopTypes.SortOrder.DESC,
                    },
                },
            }); });
            _this.selectionManager = new i2.SelectionManager({
                multiSelect: true,
                itemsAreEqual: function (a, b) { return a.id === b.id; },
                additiveMode: true,
            });
            return _this;
        }
        FacetListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_a) {
                var uiState = _a.uiState;
                return uiState.contentLanguage;
            })
                .pipe(operators.tap(function () { return _this.refresh(); }));
            this.filterTermControl.valueChanges
                .pipe(operators.filter(function (value) { return 2 <= value.length || value.length === 0; }), operators.debounceTime(250), operators.takeUntil(this.destroy$))
                .subscribe(function () { return _this.refresh(); });
        };
        FacetListComponent.prototype.toggleDisplayLimit = function (facet) {
            if (this.displayLimit[facet.id] === facet.values.length) {
                this.displayLimit[facet.id] = this.initialLimit;
            }
            else {
                this.displayLimit[facet.id] = facet.values.length;
            }
        };
        FacetListComponent.prototype.deleteFacet = function (facetValueId) {
            var _this = this;
            this.showModalAndDelete(facetValueId)
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(facetValueId, response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }), 
            // Refresh the cached facets to reflect the changes
            operators.switchMap(function () { return _this.dataService.facet.getAllFacets().single$; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'FacetValue',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'FacetValue',
                });
            });
        };
        FacetListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        FacetListComponent.prototype.showModalAndDelete = function (facetId, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-facet'),
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    {
                        type: 'danger',
                        label: message ? ngxTranslateExtractMarker.marker('common.force-delete') : ngxTranslateExtractMarker.marker('common.delete'),
                        returnValue: true,
                    },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.facet.deleteFacet(facetId, !!message) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteFacet; }));
        };
        return FacetListComponent;
    }(i2.BaseListComponent));
    FacetListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"\">\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"filterTermControl\"\n                [placeholder]=\"'catalog.filter-by-name' | translate\"\n                class=\"clr-input search-input\"\n            />\n            <div>\n                <vdr-language-selector\n                    [availableLanguageCodes]=\"availableLanguages$ | async\"\n                    [currentLanguageCode]=\"contentLanguage$ | async\"\n                    (languageCodeChange)=\"setLanguage($event)\"\n                ></vdr-language-selector>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n            [routerLink]=\"['./create']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-facet' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    [selectionManager]=\"selectionManager\"\n>\n    <vdr-bulk-action-menu\n        locationId=\"facet-list\"\n        [hostComponent]=\"this\"\n        [selectionManager]=\"selectionManager\"\n    ></vdr-bulk-action-menu>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'catalog.values' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.visibility' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-facet=\"item\">\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.code }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.name }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-facet-value-chip\n                *ngFor=\"let value of facet.values | slice: 0:displayLimit[facet.id] || 3\"\n                [facetValue]=\"value\"\n                [removable]=\"false\"\n                [displayFacetName]=\"false\"\n            ></vdr-facet-value-chip>\n            <button\n                class=\"btn btn-sm btn-secondary btn-icon\"\n                *ngIf=\"facet.values.length > initialLimit\"\n                (click)=\"toggleDisplayLimit(facet)\"\n            >\n                <ng-container *ngIf=\"(displayLimit[facet.id] || 0) < facet.values.length; else collapse\">\n                    <clr-icon shape=\"plus\"></clr-icon>\n                    {{ facet.values.length - initialLimit }}\n                </ng-container>\n                <ng-template #collapse>\n                    <clr-icon shape=\"minus\"></clr-icon>\n                </ng-template>\n            </button>\n        </td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-chip>\n                <ng-container *ngIf=\"!facet.isPrivate; else private\">{{\n                    'catalog.public' | translate\n                }}</ng-container>\n                <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n            </vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', facet.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteFacet(facet.id)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteFacet'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: ["td.private{background-color:var(--color-component-bg-200)}\n"]
                },] }
    ];
    FacetListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.ServerConfigService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    /**
     * @description
     * Like String.prototype.replace(), but replaces the last instance
     * rather than the first.
     */
    function replaceLast(target, search, replace) {
        if (!target) {
            return '';
        }
        var lastIndex = target.lastIndexOf(search);
        if (lastIndex === -1) {
            return target;
        }
        var head = target.substr(0, lastIndex);
        var tail = target.substr(lastIndex).replace(search, replace);
        return head + tail;
    }

    /**
     * Handles the logic for making the API calls to perform CRUD operations on a Product and its related
     * entities. This logic was extracted out of the component because it became too large and hard to follow.
     */
    var ProductDetailService = /** @class */ (function () {
        function ProductDetailService(dataService) {
            this.dataService = dataService;
        }
        ProductDetailService.prototype.getFacets = function () {
            return this.dataService.facet.getAllFacets().mapSingle(function (data) { return data.facets.items; });
        };
        ProductDetailService.prototype.getTaxCategories = function () {
            return this.dataService.settings
                .getTaxCategories()
                .mapSingle(function (data) { return data.taxCategories; })
                .pipe(operators.shareReplay(1));
        };
        ProductDetailService.prototype.createProductWithVariants = function (input, createVariantsConfig, languageCode) {
            var _this = this;
            var createProduct$ = this.dataService.product.createProduct(input);
            var nonEmptyOptionGroups = createVariantsConfig.groups.filter(function (g) { return 0 < g.values.length; });
            var createOptionGroups$ = this.createProductOptionGroups(nonEmptyOptionGroups, languageCode);
            return rxjs.forkJoin(createProduct$, createOptionGroups$).pipe(operators.mergeMap(function (_e) {
                var _f = __read(_e, 2), createProduct = _f[0].createProduct, optionGroups = _f[1];
                var addOptionsToProduct$ = optionGroups.length
                    ? rxjs.forkJoin(optionGroups.map(function (optionGroup) {
                        return _this.dataService.product.addOptionGroupToProduct({
                            productId: createProduct.id,
                            optionGroupId: optionGroup.id,
                        });
                    }))
                    : rxjs.of([]);
                return addOptionsToProduct$.pipe(operators.map(function () {
                    return { createProduct: createProduct, optionGroups: optionGroups };
                }));
            }), operators.mergeMap(function (_e) {
                var createProduct = _e.createProduct, optionGroups = _e.optionGroups;
                var variants = createVariantsConfig.variants.map(function (v) {
                    var optionIds = optionGroups.length
                        ? v.optionValues.map(function (optionName, index) {
                            var option = optionGroups[index].options.find(function (o) { return o.name === optionName; });
                            if (!option) {
                                throw new Error("Could not find a matching ProductOption \"" + optionName + "\" when creating variant");
                            }
                            return option.id;
                        })
                        : [];
                    return Object.assign(Object.assign({}, v), { optionIds: optionIds });
                });
                var options = optionGroups.map(function (og) { return og.options; }).reduce(function (flat, o) { return __spreadArray(__spreadArray([], __read(flat)), __read(o)); }, []);
                return _this.createProductVariants(createProduct, variants, options, languageCode);
            }));
        };
        ProductDetailService.prototype.createProductOptionGroups = function (groups, languageCode) {
            var _this = this;
            return groups.length
                ? rxjs.forkJoin(groups.map(function (c) {
                    return _this.dataService.product
                        .createProductOptionGroups({
                        code: normalizeString.normalizeString(c.name, '-'),
                        translations: [{ languageCode: languageCode, name: c.name }],
                        options: c.values.map(function (v) { return ({
                            code: normalizeString.normalizeString(v, '-'),
                            translations: [{ languageCode: languageCode, name: v }],
                        }); }),
                    })
                        .pipe(operators.map(function (data) { return data.createProductOptionGroup; }));
                }))
                : rxjs.of([]);
        };
        ProductDetailService.prototype.createProductVariants = function (product, variantData, options, languageCode) {
            var variants = variantData.map(function (v) {
                var name = options.length
                    ? product.name + " " + v.optionIds
                        .map(function (id) { return options.find(function (o) { return o.id === id; }); })
                        .filter(sharedUtils.notNullOrUndefined)
                        .map(function (o) { return o.name; })
                        .join(' ')
                    : product.name;
                return {
                    productId: product.id,
                    price: v.price,
                    sku: v.sku,
                    stockOnHand: v.stock,
                    translations: [
                        {
                            languageCode: languageCode,
                            name: name,
                        },
                    ],
                    optionIds: v.optionIds,
                };
            });
            return this.dataService.product.createProductVariants(variants).pipe(operators.map(function (_e) {
                var createProductVariants = _e.createProductVariants;
                return ({
                    createProductVariants: createProductVariants,
                    productId: product.id,
                });
            }));
        };
        ProductDetailService.prototype.updateProduct = function (updateOptions) {
            var _this = this;
            var product = updateOptions.product, languageCode = updateOptions.languageCode, autoUpdate = updateOptions.autoUpdate, productInput = updateOptions.productInput, variantsInput = updateOptions.variantsInput;
            var updateOperations = [];
            var updateVariantsInput = variantsInput || [];
            var variants$ = autoUpdate
                ? this.dataService.product
                    .getProductVariants({}, product.id)
                    .mapSingle(function (_e) {
                    var productVariants = _e.productVariants;
                    return productVariants.items;
                })
                : rxjs.of([]);
            return variants$.pipe(operators.mergeMap(function (variants) {
                var e_1, _e;
                var _a, _b, _c, _d;
                if (productInput) {
                    updateOperations.push(_this.dataService.product.updateProduct(productInput));
                    var productOldName = (_b = (_a = i2.findTranslation(product, languageCode)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                    var productNewName = (_c = i2.findTranslation(productInput, languageCode)) === null || _c === void 0 ? void 0 : _c.name;
                    if (productNewName && productOldName !== productNewName && autoUpdate) {
                        var _loop_1 = function (variant) {
                            var currentVariantName = ((_d = i2.findTranslation(variant, languageCode)) === null || _d === void 0 ? void 0 : _d.name) || '';
                            var variantInput = void 0;
                            var existingVariantInput = updateVariantsInput.find(function (i) { return i.id === variant.id; });
                            if (existingVariantInput) {
                                variantInput = existingVariantInput;
                            }
                            else {
                                variantInput = {
                                    id: variant.id,
                                    translations: [{ languageCode: languageCode, name: currentVariantName }],
                                };
                                updateVariantsInput.push(variantInput);
                            }
                            var variantTranslation = i2.findTranslation(variantInput, languageCode);
                            if (variantTranslation) {
                                if (variantTranslation.name) {
                                    variantTranslation.name = replaceLast(variantTranslation.name, productOldName, productNewName);
                                }
                                else {
                                    // The variant translation was falsy, which occurs
                                    // when defining the product name for a new translation
                                    // language that had not yet been defined.
                                    variantTranslation.name = __spreadArray([
                                        productNewName
                                    ], __read(variant.options.map(function (o) { return o.name; }))).join(' ');
                                }
                            }
                        };
                        try {
                            for (var variants_1 = __values(variants), variants_1_1 = variants_1.next(); !variants_1_1.done; variants_1_1 = variants_1.next()) {
                                var variant = variants_1_1.value;
                                _loop_1(variant);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (variants_1_1 && !variants_1_1.done && (_e = variants_1.return)) _e.call(variants_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                if (updateVariantsInput.length) {
                    updateOperations.push(_this.dataService.product.updateProductVariants(updateVariantsInput));
                }
                return rxjs.forkJoin(updateOperations);
            }));
        };
        ProductDetailService.prototype.updateProductOption = function (input, product, languageCode) {
            var _this = this;
            var variants$ = input.autoUpdate
                ? this.dataService.product
                    .getProductVariants({}, product.id)
                    .mapSingle(function (_e) {
                    var productVariants = _e.productVariants;
                    return productVariants.items;
                })
                : rxjs.of([]);
            return variants$.pipe(operators.mergeMap(function (variants) {
                var e_2, _e;
                var _a, _b, _c;
                var updateProductVariantNames$ = rxjs.of([]);
                if (input.autoUpdate) {
                    // Update any ProductVariants' names which include the option name
                    var oldOptionName = void 0;
                    var newOptionName = (_a = i2.findTranslation(input, languageCode)) === null || _a === void 0 ? void 0 : _a.name;
                    if (!newOptionName) {
                        updateProductVariantNames$ = rxjs.of([]);
                    }
                    var variantsToUpdate = [];
                    try {
                        for (var variants_2 = __values(variants), variants_2_1 = variants_2.next(); !variants_2_1.done; variants_2_1 = variants_2.next()) {
                            var variant = variants_2_1.value;
                            if (variant.options.map(function (o) { return o.id; }).includes(input.id)) {
                                if (!oldOptionName) {
                                    oldOptionName = (_b = i2.findTranslation(variant.options.find(function (o) { return o.id === input.id; }), languageCode)) === null || _b === void 0 ? void 0 : _b.name;
                                }
                                var variantName = ((_c = i2.findTranslation(variant, languageCode)) === null || _c === void 0 ? void 0 : _c.name) || '';
                                if (oldOptionName && newOptionName && variantName.includes(oldOptionName)) {
                                    variantsToUpdate.push({
                                        id: variant.id,
                                        translations: [
                                            {
                                                languageCode: languageCode,
                                                name: replaceLast(variantName, oldOptionName, newOptionName),
                                            },
                                        ],
                                    });
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (variants_2_1 && !variants_2_1.done && (_e = variants_2.return)) _e.call(variants_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (variantsToUpdate.length) {
                        updateProductVariantNames$ =
                            _this.dataService.product.updateProductVariants(variantsToUpdate);
                    }
                }
                return _this.dataService.product
                    .updateProductOption(input)
                    .pipe(operators.mergeMap(function () { return updateProductVariantNames$; }));
            }));
        };
        ProductDetailService.prototype.deleteProductVariant = function (id, productId) {
            var _this = this;
            return this.dataService.product.deleteProductVariant(id).pipe(operators.switchMap(function (result) {
                if (result.deleteProductVariant.result === i2.DeletionResult.DELETED) {
                    return _this.dataService.product.getProduct(productId).single$;
                }
                else {
                    return rxjs.throwError(result.deleteProductVariant.message);
                }
            }));
        };
        return ProductDetailService;
    }());
    ProductDetailService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ProductDetailService_Factory() { return new ProductDetailService(i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: ProductDetailService, providedIn: "root" });
    ProductDetailService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductDetailService.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };

    var ApplyFacetDialogComponent = /** @class */ (function () {
        function ApplyFacetDialogComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.selectedValues = [];
        }
        ApplyFacetDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.selector.focus(); }, 0);
        };
        ApplyFacetDialogComponent.prototype.selectValues = function () {
            this.resolveWith(this.selectedValues);
        };
        ApplyFacetDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return ApplyFacetDialogComponent;
    }());
    ApplyFacetDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-apply-facet-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'catalog.add-facets' | translate }}</ng-template>\n\n<vdr-facet-value-selector\n    [facets]=\"facets\"\n    (selectedValuesChange)=\"selectedValues = $event\"\n></vdr-facet-value-selector>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"selectValues()\"\n        [disabled]=\"selectedValues.length === 0\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.add-facets' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ApplyFacetDialogComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    ApplyFacetDialogComponent.propDecorators = {
        selector: [{ type: i0.ViewChild, args: [i2.FacetValueSelectorComponent,] }]
    };

    var AssignProductsToChannelDialogComponent = /** @class */ (function () {
        function AssignProductsToChannelDialogComponent(dataService, notificationService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.priceFactorControl = new forms.FormControl(1);
            this.selectedChannelIdControl = new forms.FormControl();
        }
        Object.defineProperty(AssignProductsToChannelDialogComponent.prototype, "isProductVariantMode", {
            get: function () {
                return this.productVariantIds != null;
            },
            enumerable: false,
            configurable: true
        });
        AssignProductsToChannelDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var activeChannelId$ = this.dataService.client
                .userStatus()
                .mapSingle(function (_b) {
                var userStatus = _b.userStatus;
                return userStatus.activeChannelId;
            });
            var allChannels$ = this.dataService.settings.getChannels().mapSingle(function (data) { return data.channels; });
            rxjs.combineLatest(activeChannelId$, allChannels$).subscribe(function (_b) {
                var _c = __read(_b, 2), activeChannelId = _c[0], channels = _c[1];
                // tslint:disable-next-line:no-non-null-assertion
                _this.currentChannel = channels.find(function (c) { return c.id === activeChannelId; });
                _this.availableChannels = channels;
            });
            this.selectedChannelIdControl.valueChanges.subscribe(function (ids) {
                _this.selectChannel(ids);
            });
            this.variantsPreview$ = rxjs.combineLatest(rxjs.from(this.getTopVariants(10)), this.priceFactorControl.valueChanges.pipe(operators.startWith(1))).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), variants = _c[0], factor = _c[1];
                return variants.map(function (v) { return ({
                    id: v.id,
                    name: v.name,
                    price: v.price,
                    pricePreview: v.price * +factor,
                }); });
            }));
        };
        AssignProductsToChannelDialogComponent.prototype.selectChannel = function (channelIds) {
            this.selectedChannel = this.availableChannels.find(function (c) { return c.id === channelIds[0]; });
        };
        AssignProductsToChannelDialogComponent.prototype.assign = function () {
            var _this = this;
            var selectedChannel = this.selectedChannel;
            if (selectedChannel) {
                if (!this.isProductVariantMode) {
                    this.dataService.product
                        .assignProductsToChannel({
                        channelId: selectedChannel.id,
                        productIds: this.productIds,
                        priceFactor: +this.priceFactorControl.value,
                    })
                        .subscribe(function () {
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-product-to-channel-success'), {
                            channel: selectedChannel.code,
                            count: _this.productIds.length,
                        });
                        _this.resolveWith(true);
                    });
                }
                else if (this.productVariantIds) {
                    this.dataService.product
                        .assignVariantsToChannel({
                        channelId: selectedChannel.id,
                        productVariantIds: this.productVariantIds,
                        priceFactor: +this.priceFactorControl.value,
                    })
                        .subscribe(function () {
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-variant-to-channel-success'), {
                            channel: selectedChannel.code,
                            // tslint:disable-next-line:no-non-null-assertion
                            count: _this.productVariantIds.length,
                        });
                        _this.resolveWith(true);
                    });
                }
            }
        };
        AssignProductsToChannelDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AssignProductsToChannelDialogComponent.prototype.getTopVariants = function (take) {
            return __awaiter(this, void 0, void 0, function () {
                var variants, i, productVariants;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            variants = [];
                            i = 0;
                            _b.label = 1;
                        case 1:
                            if (!(i < this.productIds.length && variants.length < take)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.dataService.product
                                    .getProduct(this.productIds[i], { take: this.isProductVariantMode ? undefined : take })
                                    .mapSingle(function (_b) {
                                    var product = _b.product;
                                    var _variants = product ? product.variantList.items : [];
                                    return _variants.filter(function (v) { var _a; return _this.isProductVariantMode ? (_a = _this.productVariantIds) === null || _a === void 0 ? void 0 : _a.includes(v.id) : true; });
                                })
                                    .toPromise()];
                        case 2:
                            productVariants = _b.sent();
                            variants.push.apply(variants, __spreadArray([], __read((productVariants || []))));
                            _b.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, variants.slice(0, take)];
                    }
                });
            });
        };
        return AssignProductsToChannelDialogComponent;
    }());
    AssignProductsToChannelDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-assign-products-to-channel-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <ng-container *ngIf=\"isProductVariantMode; else productModeTitle\">{{\n        'catalog.assign-variants-to-channel' | translate\n    }}</ng-container>\n    <ng-template #productModeTitle>{{ 'catalog.assign-products-to-channel' | translate }}</ng-template>\n</ng-template>\n\n<div class=\"flex\">\n    <clr-input-container>\n        <label>{{ 'common.channel' | translate }}</label>\n        <vdr-channel-assignment-control\n            clrInput\n            [multiple]=\"false\"\n            [includeDefaultChannel]=\"false\"\n            [disableChannelIds]=\"currentChannelIds\"\n            [formControl]=\"selectedChannelIdControl\"\n        ></vdr-channel-assignment-control>\n    </clr-input-container>\n    <div class=\"flex-spacer\"></div>\n    <clr-input-container>\n        <label>{{ 'catalog.price-conversion-factor' | translate }}</label>\n        <input clrInput type=\"number\" min=\"0\" max=\"99999\" [formControl]=\"priceFactorControl\" />\n    </clr-input-container>\n</div>\n\n<div class=\"channel-price-preview\">\n    <label class=\"clr-control-label\">{{ 'catalog.channel-price-preview' | translate }}</label>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.name' | translate }}</th>\n                <th>\n                    {{\n                        'catalog.price-in-channel'\n                            | translate: { channel: currentChannel?.code | channelCodeToLabel | translate }\n                    }}\n                </th>\n                <th>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n                        {{ 'catalog.price-in-channel' | translate: { channel: selectedChannel?.code } }}\n                    </ng-template>\n                    <ng-template #noSelection>\n                        {{ 'catalog.no-channel-selected' | translate }}\n                    </ng-template>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let row of variantsPreview$ | async\">\n                <td>{{ row.name }}</td>\n                <td>{{ row.price | localeCurrency: currentChannel?.currencyCode }}</td>\n                <td>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noChannelSelected\">\n                        {{ row.pricePreview | localeCurrency: selectedChannel?.currencyCode }}\n                    </ng-template>\n                    <ng-template #noChannelSelected> - </ng-template>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["vdr-channel-assignment-control{min-width:200px}.channel-price-preview{margin-top:24px}.channel-price-preview table.table{margin-top:6px}\n"]
                },] }
    ];
    AssignProductsToChannelDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService }
    ]; };

    var ProductDetailComponent = /** @class */ (function (_super) {
        __extends(ProductDetailComponent, _super);
        function ProductDetailComponent(route, router, serverConfigService, productDetailService, formBuilder, modalService, notificationService, dataService, location, changeDetector) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.productDetailService = productDetailService;
            _this.formBuilder = formBuilder;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.location = location;
            _this.changeDetector = changeDetector;
            _this.filterInput = new forms.FormControl('');
            _this.assetChanges = {};
            _this.variantAssetChanges = {};
            _this.variantFacetValueChanges = {};
            _this.currentPage$ = new rxjs.BehaviorSubject(1);
            _this.itemsPerPage$ = new rxjs.BehaviorSubject(10);
            _this.selectedVariantIds = [];
            _this.variantDisplayMode = 'card';
            _this.createVariantsConfig = { groups: [], variants: [] };
            // Used to store all ProductVariants which have been loaded.
            // It is needed when saving changes to variants.
            _this.productVariantMap = new Map();
            _this.updatePermissions = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
            _this.customFields = _this.getCustomFieldConfig('Product');
            _this.customVariantFields = _this.getCustomFieldConfig('ProductVariant');
            _this.customOptionGroupFields = _this.getCustomFieldConfig('ProductOptionGroup');
            _this.customOptionFields = _this.getCustomFieldConfig('ProductOption');
            _this.detailForm = _this.formBuilder.group({
                product: _this.formBuilder.group({
                    enabled: true,
                    name: ['', forms.Validators.required],
                    autoUpdateVariantNames: true,
                    slug: ['', i2.unicodePatternValidator(/^[\p{Letter}0-9_-]+$/)],
                    description: '',
                    facetValueIds: [[]],
                    customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                        var _c;
                        return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                    }, {})),
                }),
                variants: _this.formBuilder.array([]),
            });
            return _this;
        }
        ProductDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.product$ = this.entity$;
            this.totalItems$ = this.product$.pipe(operators.map(function (product) { return product.variantList.totalItems; }));
            this.paginationConfig$ = rxjs.combineLatest(this.totalItems$, this.itemsPerPage$, this.currentPage$).pipe(operators.map(function (_c) {
                var _d = __read(_c, 3), totalItems = _d[0], itemsPerPage = _d[1], currentPage = _d[2];
                return ({
                    totalItems: totalItems,
                    itemsPerPage: itemsPerPage,
                    currentPage: currentPage,
                });
            }));
            var variants$ = this.product$.pipe(operators.map(function (product) { return product.variantList.items; }));
            var filterTerm$ = this.filterInput.valueChanges.pipe(operators.startWith(''), operators.debounceTime(200), operators.shareReplay());
            var initialVariants$ = this.product$.pipe(operators.map(function (p) { return p.variantList.items; }));
            var updatedVariants$ = rxjs.combineLatest(filterTerm$, this.currentPage$, this.itemsPerPage$).pipe(operators.skipUntil(initialVariants$), operators.skip(1), operators.switchMap(function (_c) {
                var _d = __read(_c, 3), term = _d[0], currentPage = _d[1], itemsPerPage = _d[2];
                return _this.dataService.product
                    .getProductVariants(Object.assign(Object.assign({ skip: (currentPage - 1) * itemsPerPage, take: itemsPerPage }, (term
                    ? { filter: { name: { contains: term }, sku: { contains: term } } }
                    : {})), { filterOperator: i2.LogicalOperator.OR }), _this.id)
                    .mapStream(function (_c) {
                    var productVariants = _c.productVariants;
                    return productVariants.items;
                });
            }), operators.shareReplay({ bufferSize: 1, refCount: true }));
            this.variants$ = rxjs.merge(initialVariants$, updatedVariants$).pipe(operators.tap(function (variants) {
                var e_1, _c;
                try {
                    for (var variants_1 = __values(variants), variants_1_1 = variants_1.next(); !variants_1_1.done; variants_1_1 = variants_1.next()) {
                        var variant = variants_1_1.value;
                        _this.productVariantMap.set(variant.id, variant);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (variants_1_1 && !variants_1_1.done && (_c = variants_1.return)) _c.call(variants_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }));
            this.taxCategories$ = this.productDetailService.getTaxCategories().pipe(operators.takeUntil(this.destroy$));
            this.activeTab$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('tab'); }));
            rxjs.combineLatest(updatedVariants$, this.languageCode$)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), variants = _d[0], languageCode = _d[1];
                _this.buildVariantFormArray(variants, languageCode);
            });
            // FacetValues are provided initially by the nested array of the
            // Product entity, but once a fetch to get all Facets is made (as when
            // opening the FacetValue selector modal), then these additional values
            // are concatenated onto the initial array.
            this.facets$ = this.productDetailService.getFacets();
            var productFacetValues$ = this.product$.pipe(operators.map(function (product) { return product.facetValues; }));
            var allFacetValues$ = this.facets$.pipe(operators.map(i2.flattenFacetValues));
            var productGroup = this.getProductFormGroup();
            var formFacetValueIdChanges$ = productGroup.valueChanges.pipe(operators.map(function (val) { return val.facetValueIds; }), operators.distinctUntilChanged());
            var formChangeFacetValues$ = rxjs.combineLatest(formFacetValueIdChanges$, productFacetValues$, allFacetValues$).pipe(operators.map(function (_c) {
                var _d = __read(_c, 3), ids = _d[0], productFacetValues = _d[1], allFacetValues = _d[2];
                var combined = __spreadArray(__spreadArray([], __read(productFacetValues)), __read(allFacetValues));
                return ids.map(function (id) { return combined.find(function (fv) { return fv.id === id; }); }).filter(sharedUtils.notNullOrUndefined);
            }));
            this.facetValues$ = rxjs.merge(productFacetValues$, formChangeFacetValues$);
            this.productChannels$ = this.product$.pipe(operators.map(function (p) { return p.channels; }));
            this.channelPriceIncludesTax$ = this.dataService.settings
                .getActiveChannel('cache-first')
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.activeChannel.pricesIncludeTax; })
                .pipe(operators.shareReplay(1));
        };
        ProductDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ProductDetailComponent.prototype.navigateToTab = function (tabName) {
            this.location.replaceState(this.router
                .createUrlTree(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { tab: tabName })], {
                queryParamsHandling: 'merge',
                relativeTo: this.route,
            })
                .toString());
        };
        ProductDetailComponent.prototype.isDefaultChannel = function (channelCode) {
            return channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
        };
        ProductDetailComponent.prototype.setPage = function (page) {
            this.currentPage$.next(page);
        };
        ProductDetailComponent.prototype.setItemsPerPage = function (value) {
            this.itemsPerPage$.next(+value);
            this.currentPage$.next(1);
        };
        ProductDetailComponent.prototype.assignToChannel = function () {
            var _this = this;
            this.productChannels$
                .pipe(operators.take(1), operators.switchMap(function (channels) {
                return _this.modalService.fromComponent(AssignProductsToChannelDialogComponent, {
                    size: 'lg',
                    locals: {
                        productIds: [_this.id],
                        currentChannelIds: channels.map(function (c) { return c.id; }),
                    },
                });
            }))
                .subscribe();
        };
        ProductDetailComponent.prototype.removeFromChannel = function (channelId) {
            var _this = this;
            rxjs.from(i2.getChannelCodeFromUserStatus(this.dataService, channelId))
                .pipe(operators.switchMap(function (_c) {
                var channelCode = _c.channelCode;
                return _this.modalService.dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.remove-product-from-channel'),
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        {
                            type: 'danger',
                            label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
                            translationVars: { channelCode: channelCode },
                            returnValue: true,
                        },
                    ],
                });
            }), operators.switchMap(function (response) { return response
                ? _this.dataService.product.removeProductsFromChannel({
                    channelId: channelId,
                    productIds: [_this.id],
                })
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-product-from-channel-success'));
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.notify-remove-product-from-channel-error'));
            });
        };
        ProductDetailComponent.prototype.assignVariantToChannel = function (variant) {
            return this.modalService
                .fromComponent(AssignProductsToChannelDialogComponent, {
                size: 'lg',
                locals: {
                    productIds: [this.id],
                    productVariantIds: [variant.id],
                    currentChannelIds: variant.channels.map(function (c) { return c.id; }),
                },
            })
                .subscribe();
        };
        ProductDetailComponent.prototype.removeVariantFromChannel = function (_c) {
            var _this = this;
            var channelId = _c.channelId, variant = _c.variant;
            rxjs.from(i2.getChannelCodeFromUserStatus(this.dataService, channelId))
                .pipe(operators.switchMap(function (_c) {
                var channelCode = _c.channelCode;
                return _this.modalService.dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.remove-product-variant-from-channel'),
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        {
                            type: 'danger',
                            label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
                            translationVars: { channelCode: channelCode },
                            returnValue: true,
                        },
                    ],
                });
            }), operators.switchMap(function (response) { return response
                ? _this.dataService.product.removeVariantsFromChannel({
                    channelId: channelId,
                    productVariantIds: [variant.id],
                })
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-variant-from-channel-success'));
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.notify-remove-variant-from-channel-error'));
            });
        };
        ProductDetailComponent.prototype.assetsChanged = function () {
            return !!Object.values(this.assetChanges).length;
        };
        ProductDetailComponent.prototype.variantAssetsChanged = function () {
            return !!Object.keys(this.variantAssetChanges).length;
        };
        ProductDetailComponent.prototype.variantAssetChange = function (event) {
            this.variantAssetChanges[event.variantId] = event;
        };
        /**
         * If creating a new product, automatically generate the slug based on the product name.
         */
        ProductDetailComponent.prototype.updateSlug = function (nameValue) {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), entity = _d[0], languageCode = _d[1];
                var slugControl = _this.detailForm.get(['product', 'slug']);
                var currentTranslation = i2.findTranslation(entity, languageCode);
                var currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
                if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                    slugControl.setValue(normalizeString.normalizeString("" + nameValue, '-'));
                }
            });
        };
        ProductDetailComponent.prototype.selectProductFacetValue = function () {
            var _this = this;
            this.displayFacetValueModal().subscribe(function (facetValueIds) {
                if (facetValueIds) {
                    var productGroup = _this.getProductFormGroup();
                    var currentFacetValueIds = productGroup.value.facetValueIds;
                    productGroup.patchValue({
                        facetValueIds: unique.unique(__spreadArray(__spreadArray([], __read(currentFacetValueIds)), __read(facetValueIds))),
                    });
                    productGroup.markAsDirty();
                }
            });
        };
        ProductDetailComponent.prototype.updateProductOption = function (input) {
            var _this = this;
            rxjs.combineLatest(this.product$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), product = _d[0], languageCode = _d[1];
                return _this.productDetailService.updateProductOption(input, product, languageCode);
            }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'ProductOption',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'ProductOption',
                });
            });
        };
        ProductDetailComponent.prototype.removeProductFacetValue = function (facetValueId) {
            var productGroup = this.getProductFormGroup();
            var currentFacetValueIds = productGroup.value.facetValueIds;
            productGroup.patchValue({
                facetValueIds: currentFacetValueIds.filter(function (id) { return id !== facetValueId; }),
            });
            productGroup.markAsDirty();
        };
        /**
         * Opens a dialog to select FacetValues to apply to the select ProductVariants.
         */
        ProductDetailComponent.prototype.selectVariantFacetValue = function (selectedVariantIds) {
            var _this = this;
            this.displayFacetValueModal()
                .pipe(operators.withLatestFrom(this.variants$))
                .subscribe(function (_c) {
                var e_2, _d;
                var _e = __read(_c, 2), facetValueIds = _e[0], variants = _e[1];
                if (facetValueIds) {
                    var _loop_1 = function (variantId) {
                        var index = variants.findIndex(function (v) { return v.id === variantId; });
                        var variant = variants[index];
                        var existingFacetValueIds = variant ? variant.facetValues.map(function (fv) { return fv.id; }) : [];
                        var variantFormGroup = _this.detailForm.get('variants').controls.find(function (c) { return c.value.id === variantId; });
                        if (variantFormGroup) {
                            var uniqueFacetValueIds = unique.unique(__spreadArray(__spreadArray([], __read(existingFacetValueIds)), __read(facetValueIds)));
                            variantFormGroup.patchValue({
                                facetValueIds: uniqueFacetValueIds,
                            });
                            variantFormGroup.markAsDirty();
                            _this.variantFacetValueChanges[variantId] = uniqueFacetValueIds;
                        }
                    };
                    try {
                        for (var selectedVariantIds_1 = __values(selectedVariantIds), selectedVariantIds_1_1 = selectedVariantIds_1.next(); !selectedVariantIds_1_1.done; selectedVariantIds_1_1 = selectedVariantIds_1.next()) {
                            var variantId = selectedVariantIds_1_1.value;
                            _loop_1(variantId);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (selectedVariantIds_1_1 && !selectedVariantIds_1_1.done && (_d = selectedVariantIds_1.return)) _d.call(selectedVariantIds_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    _this.changeDetector.markForCheck();
                }
            });
        };
        ProductDetailComponent.prototype.variantsToCreateAreValid = function () {
            return (0 < this.createVariantsConfig.variants.length &&
                this.createVariantsConfig.variants.every(function (v) {
                    return v.sku !== '';
                }));
        };
        ProductDetailComponent.prototype.displayFacetValueModal = function () {
            var _this = this;
            return this.productDetailService.getFacets().pipe(operators.mergeMap(function (facets) { return _this.modalService.fromComponent(ApplyFacetDialogComponent, {
                size: 'md',
                closable: true,
                locals: { facets: facets },
            }); }), operators.map(function (facetValues) { return facetValues && facetValues.map(function (v) { return v.id; }); }));
        };
        ProductDetailComponent.prototype.create = function () {
            var _this = this;
            var productGroup = this.getProductFormGroup();
            if (!productGroup.dirty) {
                return;
            }
            rxjs.combineLatest(this.product$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), product = _d[0], languageCode = _d[1];
                var newProduct = _this.getUpdatedProduct(product, productGroup, languageCode);
                return _this.productDetailService.createProductWithVariants(newProduct, _this.createVariantsConfig, languageCode);
            }))
                .subscribe(function (_c) {
                var createProductVariants = _c.createProductVariants, productId = _c.productId;
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Product',
                });
                _this.assetChanges = {};
                _this.variantAssetChanges = {};
                _this.detailForm.markAsPristine();
                _this.router.navigate(['../', productId], { relativeTo: _this.route });
            }, function (err) {
                // tslint:disable-next-line:no-console
                console.error(err);
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Product',
                });
            });
        };
        ProductDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.product$, this.languageCode$, this.channelPriceIncludesTax$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 3), product = _d[0], languageCode = _d[1], priceIncludesTax = _d[2];
                var _a, _b;
                var productGroup = _this.getProductFormGroup();
                var productInput;
                var variantsInput;
                if (productGroup.dirty || _this.assetsChanged()) {
                    productInput = _this.getUpdatedProduct(product, productGroup, languageCode);
                }
                var variantsArray = _this.detailForm.get('variants');
                if ((variantsArray && variantsArray.dirty) || _this.variantAssetsChanged()) {
                    variantsInput = _this.getUpdatedProductVariants(product, variantsArray, languageCode, priceIncludesTax);
                }
                return _this.productDetailService.updateProduct({
                    product: product,
                    languageCode: languageCode,
                    autoUpdate: (_b = (_a = _this.detailForm.get(['product', 'autoUpdateVariantNames'])) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : false,
                    productInput: productInput,
                    variantsInput: variantsInput,
                });
            }))
                .subscribe(function (result) {
                _this.updateSlugAfterSave(result);
                _this.detailForm.markAsPristine();
                _this.assetChanges = {};
                _this.variantAssetChanges = {};
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Product',
                });
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Product',
                });
            });
        };
        ProductDetailComponent.prototype.canDeactivate = function () {
            return _super.prototype.canDeactivate.call(this) && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
        };
        /**
         * Sets the values of the form on changes to the product or current language.
         */
        ProductDetailComponent.prototype.setFormValues = function (product, languageCode) {
            var currentTranslation = i2.findTranslation(product, languageCode);
            this.detailForm.patchValue({
                product: {
                    enabled: product.enabled,
                    name: currentTranslation ? currentTranslation.name : '',
                    slug: currentTranslation ? currentTranslation.slug : '',
                    description: currentTranslation ? currentTranslation.description : '',
                    facetValueIds: product.facetValues.map(function (fv) { return fv.id; }),
                },
            });
            if (this.customFields.length) {
                this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['product', 'customFields']), product, currentTranslation);
            }
            this.buildVariantFormArray(product.variantList.items, languageCode);
        };
        ProductDetailComponent.prototype.buildVariantFormArray = function (variants, languageCode) {
            var _this = this;
            var variantsFormArray = this.detailForm.get('variants');
            variants.forEach(function (variant, i) {
                var variantTranslation = i2.findTranslation(variant, languageCode);
                var pendingFacetValueChanges = _this.variantFacetValueChanges[variant.id];
                var facetValueIds = pendingFacetValueChanges
                    ? pendingFacetValueChanges
                    : variant.facetValues.map(function (fv) { return fv.id; });
                var group = {
                    id: variant.id,
                    enabled: variant.enabled,
                    sku: variant.sku,
                    name: variantTranslation ? variantTranslation.name : '',
                    price: variant.price,
                    priceWithTax: variant.priceWithTax,
                    taxCategoryId: variant.taxCategory.id,
                    stockOnHand: variant.stockOnHand,
                    useGlobalOutOfStockThreshold: variant.useGlobalOutOfStockThreshold,
                    outOfStockThreshold: variant.outOfStockThreshold,
                    trackInventory: variant.trackInventory,
                    facetValueIds: facetValueIds,
                };
                var variantFormGroup = variantsFormArray.controls.find(function (c) { return c.value.id === variant.id; });
                if (variantFormGroup) {
                    if (variantFormGroup.pristine) {
                        variantFormGroup.patchValue(group);
                    }
                }
                else {
                    variantFormGroup = _this.formBuilder.group(Object.assign(Object.assign({}, group), { facetValueIds: _this.formBuilder.control(facetValueIds) }));
                    variantsFormArray.insert(i, variantFormGroup);
                }
                if (_this.customVariantFields.length) {
                    var customFieldsGroup = variantFormGroup.get(['customFields']);
                    if (!customFieldsGroup) {
                        customFieldsGroup = _this.formBuilder.group(_this.customVariantFields.reduce(function (hash, field) {
                            var _c;
                            return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                        }, {}));
                        variantFormGroup.addControl('customFields', customFieldsGroup);
                    }
                    _this.setCustomFieldFormValues(_this.customVariantFields, customFieldsGroup, variant, variantTranslation);
                }
            });
        };
        /**
         * Given a product and the value of the detailForm, this method creates an updated copy of the product which
         * can then be persisted to the API.
         */
        ProductDetailComponent.prototype.getUpdatedProduct = function (product, productFormGroup, languageCode) {
            var _a, _b;
            var updatedProduct = i2.createUpdatedTranslatable({
                translatable: product,
                updatedFields: productFormGroup.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: product.name || '',
                    slug: product.slug || '',
                    description: product.description || '',
                },
            });
            return Object.assign(Object.assign({}, updatedProduct), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(function (a) { return a.id; }), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, facetValueIds: productFormGroup.value.facetValueIds });
        };
        /**
         * Given an array of product variants and the values from the detailForm, this method creates an new array
         * which can be persisted to the API.
         */
        ProductDetailComponent.prototype.getUpdatedProductVariants = function (product, variantsFormArray, languageCode, priceIncludesTax) {
            var _this = this;
            var dirtyFormControls = variantsFormArray.controls.filter(function (c) { return c.dirty; });
            var dirtyVariants = dirtyFormControls
                .map(function (c) { return _this.productVariantMap.get(c.value.id); })
                .filter(sharedUtils.notNullOrUndefined);
            var dirtyVariantValues = dirtyFormControls.map(function (c) { return c.value; });
            if (dirtyVariants.length !== dirtyVariantValues.length) {
                throw new Error(ngxTranslateExtractMarker.marker("error.product-variant-form-values-do-not-match"));
            }
            return dirtyVariants
                .map(function (variant, i) {
                var _a, _b;
                var formValue = dirtyVariantValues.find(function (value) { return value.id === variant.id; });
                var result = i2.createUpdatedTranslatable({
                    translatable: variant,
                    updatedFields: formValue,
                    customFieldConfig: _this.customVariantFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        languageCode: languageCode,
                        name: '',
                    },
                });
                result.taxCategoryId = formValue.taxCategoryId;
                result.facetValueIds = formValue.facetValueIds;
                result.price = priceIncludesTax ? formValue.priceWithTax : formValue.price;
                var assetChanges = _this.variantAssetChanges[variant.id];
                if (assetChanges) {
                    result.featuredAssetId = (_a = assetChanges.featuredAsset) === null || _a === void 0 ? void 0 : _a.id;
                    result.assetIds = (_b = assetChanges.assets) === null || _b === void 0 ? void 0 : _b.map(function (a) { return a.id; });
                }
                return result;
            })
                .filter(sharedUtils.notNullOrUndefined);
        };
        ProductDetailComponent.prototype.getProductFormGroup = function () {
            return this.detailForm.get('product');
        };
        /**
         * The server may alter the slug value in order to normalize and ensure uniqueness upon saving.
         */
        ProductDetailComponent.prototype.updateSlugAfterSave = function (results) {
            var firstResult = results[0];
            var slugControl = this.detailForm.get(['product', 'slug']);
            function isUpdateMutation(input) {
                return input.hasOwnProperty('updateProduct');
            }
            if (slugControl && isUpdateMutation(firstResult)) {
                slugControl.setValue(firstResult.updateProduct.slug, { emitEvent: false });
            }
        };
        return ProductDetailComponent;
    }(i2.BaseDetailComponent));
    ProductDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-flex-row\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\">\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    name=\"enabled\"\n                    [formControl]=\"detailForm.get(['product', 'enabled'])\"\n                />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine || !variantsToCreateAreValid()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"\n                    (detailForm.invalid || detailForm.pristine) && !assetsChanged() && !variantAssetsChanged()\n                \"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"product$ | async as product\">\n    <button type=\"submit\" hidden x-data=\"prevents enter key from triggering other buttons\"></button>\n    <clr-tabs>\n        <clr-tab>\n            <button clrTabLink (click)=\"navigateToTab('details')\">\n                {{ 'catalog.product-details' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'details'\">\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <section class=\"form-block\" formGroupName=\"product\">\n                            <ng-container *ngIf=\"!(isNew$ | async)\">\n                                <ng-container *vdrIfMultichannel>\n                                    <vdr-form-item\n                                        [label]=\"'common.channels' | translate\"\n                                        *vdrIfDefaultChannelActive\n                                    >\n                                        <div class=\"flex channel-assignment\">\n                                            <ng-container *ngFor=\"let channel of productChannels$ | async\">\n                                                <vdr-chip\n                                                    *ngIf=\"!isDefaultChannel(channel.code)\"\n                                                    icon=\"times-circle\"\n                                                    (iconClick)=\"removeFromChannel(channel.id)\"\n                                                >\n                                                    <vdr-channel-badge\n                                                        [channelCode]=\"channel.code\"\n                                                    ></vdr-channel-badge>\n                                                    {{ channel.code | channelCodeToLabel }}\n                                                </vdr-chip>\n                                            </ng-container>\n                                            <button class=\"btn btn-sm\" (click)=\"assignToChannel()\">\n                                                <clr-icon shape=\"layers\"></clr-icon>\n                                                {{ 'catalog.assign-to-channel' | translate }}\n                                            </button>\n                                        </div>\n                                    </vdr-form-item>\n                                </ng-container>\n                            </ng-container>\n                            <vdr-form-field [label]=\"'catalog.product-name' | translate\" for=\"name\">\n                                <input\n                                    id=\"name\"\n                                    type=\"text\"\n                                    formControlName=\"name\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    (input)=\"updateSlug($event.target.value)\"\n                                />\n                            </vdr-form-field>\n                            <div\n                                class=\"auto-rename-wrapper\"\n                                [class.visible]=\"\n                                    (isNew$ | async) === false && detailForm.get(['product', 'name'])?.dirty\n                                \"\n                            >\n                                <clr-checkbox-wrapper>\n                                    <input\n                                        clrCheckbox\n                                        type=\"checkbox\"\n                                        id=\"auto-update\"\n                                        formControlName=\"autoUpdateVariantNames\"\n                                    />\n                                    <label>{{\n                                        'catalog.auto-update-product-variant-name' | translate\n                                    }}</label>\n                                </clr-checkbox-wrapper>\n                            </div>\n                            <vdr-form-field\n                                [label]=\"'catalog.slug' | translate\"\n                                for=\"slug\"\n                                [errors]=\"{ pattern: 'catalog.slug-pattern-error' | translate }\"\n                            >\n                                <input\n                                    id=\"slug\"\n                                    type=\"text\"\n                                    formControlName=\"slug\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                />\n                            </vdr-form-field>\n                            <vdr-form-field\n                                [label]=\"'common.description' | translate\"\n                                for=\"description\"\n                                [errors]=\"{ pattern: 'catalog.description-pattern-error' | translate }\"\n                            >\n                                <textarea\n                                    rows=\"9\"\n                                    id=\"slug\"\n                                    type=\"text\"\n                                    formControlName=\"description\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                ></textarea>\n                            </vdr-form-field>\n\n                            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                <label>{{ 'common.custom-fields' | translate }}</label>\n                                <vdr-tabbed-custom-fields\n                                    entityName=\"Product\"\n                                    [customFields]=\"customFields\"\n                                    [customFieldsFormGroup]=\"detailForm.get(['product', 'customFields'])\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                ></vdr-tabbed-custom-fields>\n                            </section>\n                            <vdr-custom-detail-component-host\n                                locationId=\"product-detail\"\n                                [entity$]=\"entity$\"\n                                [detailForm]=\"detailForm\"\n                            ></vdr-custom-detail-component-host>\n                        </section>\n                    </div>\n                    <div class=\"clr-col-md-auto\">\n                        <vdr-assets\n                            [assets]=\"assetChanges.assets || product.assets\"\n                            [featuredAsset]=\"assetChanges.featuredAsset || product.featuredAsset\"\n                            [updatePermissions]=\"updatePermissions\"\n                            (change)=\"assetChanges = $event\"\n                        ></vdr-assets>\n                        <div class=\"facets\">\n                            <vdr-facet-value-chip\n                                *ngFor=\"let facetValue of facetValues$ | async\"\n                                [facetValue]=\"facetValue\"\n                                [removable]=\"['UpdateCatalog', 'UpdateProduct'] | hasPermission\"\n                                (remove)=\"removeProductFacetValue(facetValue.id)\"\n                            ></vdr-facet-value-chip>\n                            <button\n                                class=\"btn btn-sm btn-secondary\"\n                                *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                                (click)=\"selectProductFacetValue()\"\n                            >\n                                <clr-icon shape=\"plus\"></clr-icon>\n                                {{ 'catalog.add-facets' | translate }}\n                            </button>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"isNew$ | async\">\n                    <h4>{{ 'catalog.product-variants' | translate }}</h4>\n                    <vdr-generate-product-variants\n                        (variantsChange)=\"createVariantsConfig = $event\"\n                    ></vdr-generate-product-variants>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n        <clr-tab *ngIf=\"!(isNew$ | async)\">\n            <button clrTabLink (click)=\"navigateToTab('variants')\">\n                {{ 'catalog.product-variants' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'variants'\">\n                <section class=\"form-block\">\n                    <div class=\"view-mode\">\n                        <div class=\"btn-group\">\n                            <button\n                                class=\"btn btn-secondary-outline\"\n                                (click)=\"variantDisplayMode = 'card'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'card'\"\n                            >\n                                <clr-icon shape=\"list\"></clr-icon>\n                                <span class=\"full-label\">{{\n                                    'catalog.display-variant-cards' | translate\n                                }}</span>\n                            </button>\n                            <button\n                                class=\"btn\"\n                                (click)=\"variantDisplayMode = 'table'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'table'\"\n                            >\n                                <clr-icon shape=\"table\"></clr-icon>\n                                <span class=\"full-label\">{{\n                                    'catalog.display-variant-table' | translate\n                                }}</span>\n                            </button>\n                        </div>\n                        <div class=\"variant-filter\">\n                            <input\n                                [formControl]=\"filterInput\"\n                                [placeholder]=\"'catalog.filter-by-name-or-sku' | translate\"\n                            />\n                            <button class=\"icon-button\" (click)=\"filterInput.setValue('')\">\n                                <clr-icon shape=\"times\"></clr-icon>\n                            </button>\n                        </div>\n                        <div class=\"flex-spacer\"></div>\n                        <a\n                            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                            [routerLink]=\"['./', 'manage-variants']\"\n                            class=\"btn btn-secondary edit-variants-btn mb0 mr0\"\n                        >\n                            <clr-icon shape=\"add-text\"></clr-icon>\n                            {{ 'catalog.manage-variants' | translate }}\n                        </a>\n                    </div>\n\n                    <div class=\"pagination-row mt4\" *ngIf=\"10 < (paginationConfig$ | async)?.totalItems\">\n                        <vdr-items-per-page-controls\n                            [itemsPerPage]=\"itemsPerPage$ | async\"\n                            (itemsPerPageChange)=\"setItemsPerPage($event)\"\n                        ></vdr-items-per-page-controls>\n\n                        <vdr-pagination-controls\n                            [id]=\"(paginationConfig$ | async)?.id\"\n                            [currentPage]=\"currentPage$ | async\"\n                            [itemsPerPage]=\"itemsPerPage$ | async\"\n                            (pageChange)=\"setPage($event)\"\n                        ></vdr-pagination-controls>\n                    </div>\n\n                    <vdr-product-variants-table\n                        *ngIf=\"variantDisplayMode === 'table'\"\n                        [variants]=\"variants$ | async\"\n                        [paginationConfig]=\"paginationConfig$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                    ></vdr-product-variants-table>\n                    <vdr-product-variants-list\n                        *ngIf=\"variantDisplayMode === 'card'\"\n                        [variants]=\"variants$ | async\"\n                        [paginationConfig]=\"paginationConfig$ | async\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [facets]=\"facets$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [taxCategories]=\"taxCategories$ | async\"\n                        [customFields]=\"customVariantFields\"\n                        [customOptionFields]=\"customOptionFields\"\n                        [activeLanguage]=\"languageCode$ | async\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                        (assignToChannel)=\"assignVariantToChannel($event)\"\n                        (removeFromChannel)=\"removeVariantFromChannel($event)\"\n                        (assetChange)=\"variantAssetChange($event)\"\n                        (updateProductOption)=\"updateProductOption($event)\"\n                        (selectionChange)=\"selectedVariantIds = $event\"\n                        (selectFacetValueClick)=\"selectVariantFacetValue($event)\"\n                    ></vdr-product-variants-list>\n                </section>\n                <div class=\"pagination-row mt4\" *ngIf=\"10 < (paginationConfig$ | async)?.totalItems\">\n                    <vdr-items-per-page-controls\n                        [itemsPerPage]=\"itemsPerPage$ | async\"\n                        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n                    ></vdr-items-per-page-controls>\n\n                    <vdr-pagination-controls\n                        [id]=\"(paginationConfig$ | async)?.id\"\n                        [currentPage]=\"currentPage$ | async\"\n                        [itemsPerPage]=\"itemsPerPage$ | async\"\n                        (pageChange)=\"setPage($event)\"\n                    ></vdr-pagination-controls>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n    </clr-tabs>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host ::ng-deep trix-toolbar{top:24px}textarea{width:100%}.facets{margin-top:12px;display:flex;flex-wrap:wrap;align-items:center}@media screen and (min-width: 768px){.facets{max-width:340px}}vdr-action-bar clr-toggle-wrapper{margin-top:12px}.variant-filter{flex:1;display:flex}.variant-filter input{flex:1;max-width:initial;border-radius:3px 0 0 3px!important}.variant-filter .icon-button{border:1px solid var(--color-component-border-300);background-color:var(--color-component-bg-100);border-radius:0 3px 3px 0;border-left:none}.group-name{padding-right:6px}.view-mode{display:flex;flex-direction:column;justify-content:space-between}@media screen and (min-width: 768px){.view-mode{flex-direction:row}}.edit-variants-btn{margin-top:0}.channel-assignment{flex-wrap:wrap;max-height:144px;overflow-y:auto}.auto-rename-wrapper{overflow:hidden;max-height:0;padding-left:9.5rem;margin-bottom:0;transition:max-height .2s,margin-bottom .2s}.auto-rename-wrapper.visible{max-height:24px;margin-bottom:12px}.pagination-row{display:flex;align-items:baseline;justify-content:space-between}\n"]
                },] }
    ];
    ProductDetailComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.ServerConfigService },
        { type: ProductDetailService },
        { type: forms.FormBuilder },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: common.Location },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ProductListComponent = /** @class */ (function (_super) {
        __extends(ProductListComponent, _super);
        function ProductListComponent(dataService, modalService, notificationService, jobQueueService, serverConfigService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.jobQueueService = jobQueueService;
            _this.serverConfigService = serverConfigService;
            _this.searchTerm = '';
            _this.facetValueIds = [];
            _this.groupByProduct = true;
            _this.pendingSearchIndexUpdates = 0;
            _this.route.queryParamMap
                .pipe(operators.map(function (qpm) { return qpm.get('q'); }), operators.takeUntil(_this.destroy$))
                .subscribe(function (term) {
                _this.searchTerm = term || '';
                if (_this.productSearchInput) {
                    _this.productSearchInput.setSearchTerm(term);
                }
            });
            _this.selectedFacetValueIds$ = _this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.getAll('fvids'); }));
            _this.selectedFacetValueIds$.pipe(operators.takeUntil(_this.destroy$)).subscribe(function (ids) {
                _this.facetValueIds = ids;
                if (_this.productSearchInput) {
                    _this.productSearchInput.setFacetValues(ids);
                }
            });
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.product).searchProducts.apply(_a, __spreadArray([_this.searchTerm], __read(args))).refetchOnChannelChange();
            }, function (data) { return data.search; }, 
            // tslint:disable-next-line:no-shadowed-variable
            function (skip, take) { return ({
                input: {
                    skip: skip,
                    take: take,
                    term: _this.searchTerm,
                    facetValueIds: _this.facetValueIds,
                    facetValueOperator: i2.LogicalOperator.AND,
                    groupByProduct: _this.groupByProduct,
                },
            }); });
            _this.selectionManager = new i2.SelectionManager({
                multiSelect: true,
                itemsAreEqual: function (a, b) { return _this.groupByProduct ? a.productId === b.productId : a.productVariantId === b.productVariantId; },
                additiveMode: true,
            });
            return _this;
        }
        ProductListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.facetValues$ = this.result$.pipe(operators.map(function (data) { return data.search.facetValues; }));
            this.facetValues$
                .pipe(operators.take(1), operators.delay(100), operators.withLatestFrom(this.selectedFacetValueIds$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), __ = _b[0], ids = _b[1];
                _this.productSearchInput.setFacetValues(ids);
            });
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            this.contentLanguage$ = this.dataService.client
                .uiState()
                .mapStream(function (_a) {
                var uiState = _a.uiState;
                return uiState.contentLanguage;
            })
                .pipe(operators.tap(function () { return _this.refresh(); }));
            this.dataService.product
                .getPendingSearchIndexUpdates()
                .mapSingle(function (_a) {
                var pendingSearchIndexUpdates = _a.pendingSearchIndexUpdates;
                return pendingSearchIndexUpdates;
            })
                .subscribe(function (value) { return (_this.pendingSearchIndexUpdates = value); });
        };
        ProductListComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.productSearchInput && this.searchTerm) {
                setTimeout(function () { return _this.productSearchInput.setSearchTerm(_this.searchTerm); });
            }
        };
        ProductListComponent.prototype.setSearchTerm = function (term) {
            this.searchTerm = term;
            this.setQueryParam({ q: term || null, page: 1 });
            this.refresh();
        };
        ProductListComponent.prototype.setFacetValueIds = function (ids) {
            this.facetValueIds = ids;
            this.setQueryParam({ fvids: ids, page: 1 });
            this.refresh();
        };
        ProductListComponent.prototype.rebuildSearchIndex = function () {
            var _this = this;
            this.dataService.product.reindex().subscribe(function (_a) {
                var reindex = _a.reindex;
                _this.notificationService.info(ngxTranslateExtractMarker.marker('catalog.reindexing'));
                _this.jobQueueService.addJob(reindex.id, function (job) {
                    if (job.state === i2.JobState.COMPLETED) {
                        var time = new Intl.NumberFormat().format(job.duration || 0);
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.reindex-successful'), {
                            count: job.result.indexedItemCount,
                            time: time,
                        });
                        _this.refresh();
                    }
                    else {
                        _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.reindex-error'));
                    }
                });
            });
        };
        ProductListComponent.prototype.runPendingSearchIndexUpdates = function () {
            var _this = this;
            this.dataService.product.runPendingSearchIndexUpdates().subscribe(function (value) {
                _this.notificationService.info(ngxTranslateExtractMarker.marker('catalog.running-search-index-updates'), {
                    count: _this.pendingSearchIndexUpdates,
                });
                _this.pendingSearchIndexUpdates = 0;
            });
        };
        ProductListComponent.prototype.deleteProduct = function (productId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return (response ? _this.dataService.product.deleteProduct(productId) : rxjs.EMPTY); }), 
            // Short delay to allow the product to be removed from the search index before
            // refreshing.
            operators.delay(500))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Product',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Product',
                });
            });
        };
        ProductListComponent.prototype.setLanguage = function (code) {
            this.dataService.client.setContentLanguage(code).subscribe();
        };
        return ProductListComponent;
    }(i2.BaseListComponent));
    ProductListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-products-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <div class=\"search-form\">\n            <vdr-product-search-input\n                #productSearchInputComponent\n                [facetValueResults]=\"facetValues$ | async\"\n                (searchTermChange)=\"setSearchTerm($event)\"\n                (facetValueChange)=\"setFacetValueIds($event)\"\n            ></vdr-product-search-input>\n            <vdr-dropdown class=\"search-settings-menu mr3\">\n                <button\n                    type=\"button\"\n                    class=\"icon-button search-index-button\"\n                    [title]=\"\n                        (pendingSearchIndexUpdates\n                            ? 'catalog.pending-search-index-updates'\n                            : 'catalog.search-index-controls'\n                        ) | translate\n                    \"\n                    vdrDropdownTrigger\n                >\n                    <clr-icon shape=\"cog\"></clr-icon>\n                    <vdr-status-badge *ngIf=\"pendingSearchIndexUpdates\" type=\"warning\"></vdr-status-badge>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <h4 class=\"dropdown-header\">{{ 'catalog.search-index-controls' | translate }}</h4>\n                    <ng-container *ngIf=\"pendingSearchIndexUpdates\">\n                        <button\n                            type=\"button\"\n                            class=\"run-updates-button\"\n                            vdrDropdownItem\n                            (click)=\"runPendingSearchIndexUpdates()\"\n                            [disabled]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                        >\n                            <vdr-status-badge type=\"warning\"></vdr-status-badge>\n                            {{\n                                'catalog.run-pending-search-index-updates'\n                                    | translate: { count: pendingSearchIndexUpdates }\n                            }}\n                        </button>\n                        <div class=\"dropdown-divider\"></div>\n                    </ng-container>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        (click)=\"rebuildSearchIndex()\"\n                        [disabled]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                    >\n                        {{ 'catalog.rebuild-search-index' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <div class=\"flex wrap\">\n            <clr-toggle-wrapper class=\"mt2\">\n                <input type=\"checkbox\" clrToggle [(ngModel)]=\"groupByProduct\" (ngModelChange)=\"refresh()\" />\n                <label>\n                    {{ 'catalog.group-by-product' | translate }}\n                </label>\n            </clr-toggle-wrapper>\n            <vdr-language-selector\n                [availableLanguageCodes]=\"availableLanguages$ | async\"\n                [currentLanguageCode]=\"contentLanguage$ | async\"\n                (languageCodeChange)=\"setLanguage($event)\"\n            ></vdr-language-selector>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            [routerLink]=\"['./create']\"\n            *vdrIfPermissions=\"['CreateCatalog', 'CreateProduct']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-product' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    [selectionManager]=\"selectionManager\"\n>\n    <vdr-bulk-action-menu\n        locationId=\"product-list\"\n        [hostComponent]=\"this\"\n        [selectionManager]=\"selectionManager\"\n    ></vdr-bulk-action-menu>\n    <vdr-dt-column> </vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-result=\"item\">\n        <td class=\"left align-middle image-col\" [class.disabled]=\"!result.enabled\">\n            <div class=\"image-placeholder\">\n                <img\n                    *ngIf=\"\n                        groupByProduct\n                            ? result.productAsset\n                            : result.productVariantAsset || result.productAsset as asset;\n                        else imagePlaceholder\n                    \"\n                    [src]=\"asset | assetPreview: 'tiny'\"\n                />\n                <ng-template #imagePlaceholder>\n                    <div class=\"placeholder\">\n                        <clr-icon shape=\"image\" size=\"48\"></clr-icon>\n                    </div>\n                </ng-template>\n            </div>\n        </td>\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            <div>{{ groupByProduct ? result.productName : result.productVariantName }}</div>\n            <div *ngIf=\"!groupByProduct\" class=\"sku\">{{ result.sku }}</div>\n        </td>\n        <td class=\"align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-chip *ngIf=\"!result.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-table-row-action\n                class=\"edit-button\"\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', result.productId]\"\n            ></vdr-table-row-action>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteProduct(result.productId)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteProduct'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: [".image-col{width:70px}.image-placeholder{width:50px;height:50px;background-color:var(--color-component-bg-200)}.image-placeholder img{border-radius:var(--border-radius-img)}.image-placeholder .placeholder{text-align:center;color:var(--color-grey-300)}.search-form{display:flex;align-items:center;width:100%}vdr-product-search-input{min-width:300px}@media screen and (max-width: 768px){vdr-product-search-input{min-width:100px}}.search-settings-menu{margin:0 12px}td.disabled{background-color:var(--color-component-bg-200)}.search-index-button{position:relative}.search-index-button vdr-status-badge{right:0;top:0}.run-updates-button{position:relative}.run-updates-button vdr-status-badge{left:10px;top:10px}.edit-button{margin-right:24px}.sku{color:var(--color-text-300)}\n"]
                },] }
    ];
    ProductListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.JobQueueService },
        { type: i2.ServerConfigService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };
    ProductListComponent.propDecorators = {
        productSearchInput: [{ type: i0.ViewChild, args: ['productSearchInputComponent', { static: true },] }]
    };

    var ProductOptionsEditorComponent = /** @class */ (function (_super) {
        __extends(ProductOptionsEditorComponent, _super);
        function ProductOptionsEditorComponent(route, router, serverConfigService, dataService, productDetailService, formBuilder, changeDetector, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.route = route;
            _this.router = router;
            _this.serverConfigService = serverConfigService;
            _this.dataService = dataService;
            _this.productDetailService = productDetailService;
            _this.formBuilder = formBuilder;
            _this.changeDetector = changeDetector;
            _this.notificationService = notificationService;
            _this.autoUpdateVariantNames = true;
            _this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
            _this.optionGroupCustomFields = _this.getCustomFieldConfig('ProductOptionGroup');
            _this.optionCustomFields = _this.getCustomFieldConfig('ProductOption');
            return _this;
        }
        ProductOptionsEditorComponent.prototype.ngOnInit = function () {
            this.optionGroups$ = this.route.snapshot.data.entity.pipe(operators.map(function (product) { return product.optionGroups; }));
            this.detailForm = new forms.FormGroup({
                optionGroups: new forms.FormArray([]),
            });
            _super.prototype.init.call(this);
        };
        ProductOptionsEditorComponent.prototype.getOptionGroups = function () {
            var optionGroups = this.detailForm.get('optionGroups');
            return optionGroups.controls;
        };
        ProductOptionsEditorComponent.prototype.getOptions = function (optionGroup) {
            var options = optionGroup.get('options');
            return options.controls;
        };
        ProductOptionsEditorComponent.prototype.save = function () {
            var _this = this;
            if (this.detailForm.invalid || this.detailForm.pristine) {
                return;
            }
            // tslint:disable-next-line:no-non-null-assertion
            var $product = this.dataService.product.getProduct(this.id).mapSingle(function (data) { return data.product; });
            rxjs.combineLatest(this.entity$, this.languageCode$, $product)
                .pipe(operators.take(1), operators.mergeMap(function (_f) {
                var e_1, _g;
                var _h = __read(_f, 3), optionGroups = _h[0].optionGroups, languageCode = _h[1], product = _h[2];
                var _a, _b, _c, _d, _e;
                var updateOperations = [];
                var _loop_1 = function (optionGroupForm) {
                    var e_2, _l;
                    if (((_a = optionGroupForm.get('name')) === null || _a === void 0 ? void 0 : _a.dirty) || ((_b = optionGroupForm.get('code')) === null || _b === void 0 ? void 0 : _b.dirty)) {
                        var optionGroupEntity = optionGroups.find(function (og) { return og.id === optionGroupForm.value.id; });
                        if (optionGroupEntity) {
                            var input = _this.getUpdatedOptionGroup(optionGroupEntity, optionGroupForm, languageCode);
                            updateOperations.push(_this.dataService.product.updateProductOptionGroup(input));
                        }
                    }
                    var _loop_2 = function (optionForm) {
                        if (((_c = optionForm.get('name')) === null || _c === void 0 ? void 0 : _c.dirty) || ((_d = optionForm.get('code')) === null || _d === void 0 ? void 0 : _d.dirty)) {
                            var optionGroup = (_e = optionGroups
                                .find(function (og) { return og.id === optionGroupForm.value.id; })) === null || _e === void 0 ? void 0 : _e.options.find(function (o) { return o.id === optionForm.value.id; });
                            if (optionGroup) {
                                var input = _this.getUpdatedOption(optionGroup, optionForm, languageCode);
                                updateOperations.push(_this.productDetailService.updateProductOption(Object.assign(Object.assign({}, input), { autoUpdate: _this.autoUpdateVariantNames }), product, languageCode));
                            }
                        }
                    };
                    try {
                        for (var _m = (e_2 = void 0, __values(_this.getOptions(optionGroupForm))), _o = _m.next(); !_o.done; _o = _m.next()) {
                            var optionForm = _o.value;
                            _loop_2(optionForm);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_o && !_o.done && (_l = _m.return)) _l.call(_m);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                };
                try {
                    for (var _j = __values(_this.getOptionGroups()), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var optionGroupForm = _k.value;
                        _loop_1(optionGroupForm);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_g = _j.return)) _g.call(_j);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return rxjs.forkJoin(updateOperations);
            }))
                .subscribe(function () {
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'ProductOptionGroup',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'ProductOptionGroup',
                });
            });
        };
        ProductOptionsEditorComponent.prototype.getUpdatedOptionGroup = function (optionGroup, optionGroupFormGroup, languageCode) {
            var input = i2.createUpdatedTranslatable({
                translatable: optionGroup,
                updatedFields: optionGroupFormGroup.value,
                customFieldConfig: this.optionGroupCustomFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: optionGroup.name || '',
                },
            });
            return input;
        };
        ProductOptionsEditorComponent.prototype.getUpdatedOption = function (option, optionFormGroup, languageCode) {
            var input = i2.createUpdatedTranslatable({
                translatable: option,
                updatedFields: optionFormGroup.value,
                customFieldConfig: this.optionGroupCustomFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: option.name || '',
                },
            });
            return input;
        };
        ProductOptionsEditorComponent.prototype.setFormValues = function (entity, languageCode) {
            var e_3, _f, e_4, _g;
            var groupsFormArray = new forms.FormArray([]);
            try {
                for (var _h = __values(entity.optionGroups), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var optionGroup = _j.value;
                    var groupTranslation = i2.findTranslation(optionGroup, languageCode);
                    var group = {
                        id: optionGroup.id,
                        createdAt: optionGroup.createdAt,
                        updatedAt: optionGroup.updatedAt,
                        code: optionGroup.code,
                        name: groupTranslation ? groupTranslation.name : '',
                    };
                    var optionsFormArray = new forms.FormArray([]);
                    try {
                        for (var _k = (e_4 = void 0, __values(optionGroup.options)), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var option = _l.value;
                            var optionTranslation = i2.findTranslation(option, languageCode);
                            var optionControl = this.formBuilder.group({
                                id: option.id,
                                createdAt: option.createdAt,
                                updatedAt: option.updatedAt,
                                code: option.code,
                                name: optionTranslation ? optionTranslation.name : '',
                            });
                            optionsFormArray.push(optionControl);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_g = _k.return)) _g.call(_k);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    var groupControl = this.formBuilder.group(group);
                    groupControl.addControl('options', optionsFormArray);
                    groupsFormArray.push(groupControl);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_f = _h.return)) _f.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.detailForm.setControl('optionGroups', groupsFormArray);
        };
        return ProductOptionsEditorComponent;
    }(i2.BaseDetailComponent));
    ProductOptionsEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-options-editor',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-language-selector\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <div class=\"flex center\">\n            <div class=\"mr2\">\n                <clr-checkbox-wrapper>\n                    <input\n                        clrCheckbox\n                        type=\"checkbox\"\n                        id=\"auto-update\"\n                        [(ngModel)]=\"autoUpdateVariantNames\"\n                    />\n                    <label>{{ 'catalog.auto-update-product-variant-name' | translate }}</label>\n                </clr-checkbox-wrapper>\n            </div>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.pristine || detailForm.invalid\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </div>\n    </vdr-ab-right>\n</vdr-action-bar>\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"optionGroups$ | async as optionGroups\">\n    <div formGroupName=\"optionGroups\" class=\"clr-row\">\n        <div class=\"clr-col-12 clr-col-xl-6\" *ngFor=\"let optionGroup of getOptionGroups(); index as i\">\n            <section class=\"card\" [formArrayName]=\"i\">\n                <div class=\"card-header option-group-header\">\n                    <vdr-entity-info [entity]=\"optionGroup.value\"></vdr-entity-info>\n                    <div class=\"ml2\">{{ optionGroup.value.code }}</div>\n                </div>\n                <div class=\"card-block\">\n                    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n                        <input\n                            [id]=\"'name-' + i\"\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                        />\n                    </vdr-form-field>\n                    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n                        <input\n                            [id]=\"'code-' + i\"\n                            type=\"text\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            formControlName=\"code\"\n                        />\n                    </vdr-form-field>\n                </div>\n                <section class=\"card-block\">\n                    <table class=\"facet-values-list table mt2 mb4\" formGroupName=\"options\">\n                        <thead>\n                            <tr>\n                                <th></th>\n                                <th>{{ 'common.name' | translate }}</th>\n                                <th>{{ 'common.code' | translate }}</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                class=\"facet-value\"\n                                *ngFor=\"let option of getOptions(optionGroup); let i = index\"\n                                [formGroupName]=\"i\"\n                            >\n                                <td class=\"align-middle\">\n                                    <vdr-entity-info [entity]=\"option.value\"></vdr-entity-info>\n                                </td>\n                                <td class=\"align-middle\">\n                                    <input\n                                        type=\"text\"\n                                        formControlName=\"name\"\n                                        [readonly]=\"!(updatePermission | hasPermission)\"\n                                    />\n                                </td>\n                                <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" /></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </section>\n            </section>\n        </div>\n    </div>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".option-group-header{display:flex;align-items:baseline}\n"]
                },] }
    ];
    ProductOptionsEditorComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.ServerConfigService },
        { type: i2.DataService },
        { type: ProductDetailService },
        { type: forms.FormBuilder },
        { type: i0.ChangeDetectorRef },
        { type: i2.NotificationService }
    ]; };

    var ConfirmVariantDeletionDialogComponent = /** @class */ (function () {
        function ConfirmVariantDeletionDialogComponent() {
            this.variants = [];
        }
        ConfirmVariantDeletionDialogComponent.prototype.confirm = function () {
            this.resolveWith(true);
        };
        ConfirmVariantDeletionDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return ConfirmVariantDeletionDialogComponent;
    }());
    ConfirmVariantDeletionDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-confirm-variant-deletion-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.confirm-deletion-of-unused-variants-title' | translate }}\n</ng-template>\n{{ 'catalog.confirm-deletion-of-unused-variants-body' | translate }}\n<ul>\n    <li *ngFor=\"let variant of variants\">{{ variant.name }} ({{ variant.sku }})</li>\n</ul>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"confirm()\" class=\"btn btn-primary\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var GeneratedVariant = /** @class */ (function () {
        function GeneratedVariant(config) {
            var e_1, _g;
            try {
                for (var _h = __values(Object.keys(config)), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var key = _j.value;
                    this[key] = config[key];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_g = _h.return)) _g.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return GeneratedVariant;
    }());
    var ProductVariantsEditorComponent = /** @class */ (function () {
        function ProductVariantsEditorComponent(route, dataService, productDetailService, notificationService, modalService) {
            this.route = route;
            this.dataService = dataService;
            this.productDetailService = productDetailService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.formValueChanged = false;
            this.optionsChanged = false;
            this.generatedVariants = [];
        }
        ProductVariantsEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.initOptionsAndVariants();
            this.languageCode =
                this.route.snapshot.paramMap.get('lang') || i2.getDefaultUiLanguage();
            this.dataService.settings.getActiveChannel().single$.subscribe(function (data) {
                _this.currencyCode = data.activeChannel.currencyCode;
            });
        };
        ProductVariantsEditorComponent.prototype.onFormChanged = function (variantInfo) {
            this.formValueChanged = true;
            variantInfo.enabled = true;
        };
        ProductVariantsEditorComponent.prototype.canDeactivate = function () {
            return !this.formValueChanged;
        };
        ProductVariantsEditorComponent.prototype.getVariantsToAdd = function () {
            return this.generatedVariants.filter(function (v) { return !v.existing && v.enabled; });
        };
        ProductVariantsEditorComponent.prototype.getVariantName = function (variant) {
            return variant.options.length === 0
                ? ngxTranslateExtractMarker.marker('catalog.default-variant')
                : variant.options.map(function (o) { return o.name; }).join(' ');
        };
        ProductVariantsEditorComponent.prototype.addOptionGroup = function () {
            this.optionGroups.push({
                isNew: true,
                locked: false,
                name: '',
                values: [],
            });
            this.optionsChanged = true;
        };
        ProductVariantsEditorComponent.prototype.removeOptionGroup = function (optionGroup) {
            var _this = this;
            var id = optionGroup.id;
            if (optionGroup.isNew) {
                this.optionGroups = this.optionGroups.filter(function (og) { return og !== optionGroup; });
                this.generateVariants();
                this.optionsChanged = true;
            }
            else if (id) {
                this.modalService
                    .dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product-option-group'),
                    translationVars: { name: optionGroup.name },
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                    ],
                })
                    .pipe(operators.switchMap(function (val) {
                    if (val) {
                        return _this.dataService.product.removeOptionGroupFromProduct({
                            optionGroupId: id,
                            productId: _this.product.id,
                        });
                    }
                    else {
                        return rxjs.EMPTY;
                    }
                }))
                    .subscribe(function (_g) {
                    var removeOptionGroupFromProduct = _g.removeOptionGroupFromProduct;
                    var _a;
                    if (removeOptionGroupFromProduct.__typename === 'Product') {
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                            entity: 'ProductOptionGroup',
                        });
                        _this.initOptionsAndVariants();
                        _this.optionsChanged = true;
                    }
                    else if (removeOptionGroupFromProduct.__typename === 'ProductOptionInUseError') {
                        _this.notificationService.error((_a = removeOptionGroupFromProduct.message) !== null && _a !== void 0 ? _a : '');
                    }
                });
            }
        };
        ProductVariantsEditorComponent.prototype.addOption = function (index, optionName) {
            var group = this.optionGroups[index];
            if (group) {
                group.values.push({ name: optionName, locked: false });
                this.generateVariants();
                this.optionsChanged = true;
            }
        };
        ProductVariantsEditorComponent.prototype.removeOption = function (index, _g) {
            var _this = this;
            var id = _g.id, name = _g.name;
            var optionGroup = this.optionGroups[index];
            if (optionGroup) {
                if (!id) {
                    optionGroup.values = optionGroup.values.filter(function (v) { return v.name !== name; });
                    this.generateVariants();
                }
                else {
                    this.modalService
                        .dialog({
                        title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product-option'),
                        translationVars: { name: name },
                        buttons: [
                            { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                            { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                        ],
                    })
                        .pipe(operators.switchMap(function (val) {
                        if (val) {
                            return _this.dataService.product.deleteProductOption(id);
                        }
                        else {
                            return rxjs.EMPTY;
                        }
                    }))
                        .subscribe(function (_g) {
                        var deleteProductOption = _g.deleteProductOption;
                        var _a;
                        if (deleteProductOption.result === i2.DeletionResult.DELETED) {
                            _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                                entity: 'ProductOption',
                            });
                            optionGroup.values = optionGroup.values.filter(function (v) { return v.id !== id; });
                            _this.generateVariants();
                            _this.optionsChanged = true;
                        }
                        else {
                            _this.notificationService.error((_a = deleteProductOption.message) !== null && _a !== void 0 ? _a : '');
                        }
                    });
                }
            }
        };
        ProductVariantsEditorComponent.prototype.generateVariants = function () {
            var _this = this;
            var groups = this.optionGroups.map(function (g) { return g.values; });
            var previousVariants = this.generatedVariants;
            var generatedVariantFactory = function (isDefault, options, existingVariant, prototypeVariant) {
                var _a, _b, _c, _d, _e, _f;
                var prototype = _this.getVariantPrototype(options, previousVariants);
                return new GeneratedVariant({
                    enabled: true,
                    existing: !!existingVariant,
                    productVariantId: existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.id,
                    isDefault: isDefault,
                    options: options,
                    price: (_b = (_a = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.price) !== null && _a !== void 0 ? _a : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.price) !== null && _b !== void 0 ? _b : prototype.price,
                    sku: (_d = (_c = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.sku) !== null && _c !== void 0 ? _c : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.sku) !== null && _d !== void 0 ? _d : prototype.sku,
                    stock: (_f = (_e = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.stockOnHand) !== null && _e !== void 0 ? _e : prototypeVariant === null || prototypeVariant === void 0 ? void 0 : prototypeVariant.stockOnHand) !== null && _f !== void 0 ? _f : prototype.stock,
                });
            };
            this.generatedVariants = groups.length
                ? sharedUtils.generateAllCombinations(groups).map(function (options) {
                    var existingVariant = _this.product.variants.find(function (v) { return _this.optionsAreEqual(v.options, options); });
                    var prototypeVariant = _this.product.variants.find(function (v) { return _this.optionsAreSubset(v.options, options); });
                    return generatedVariantFactory(false, options, existingVariant, prototypeVariant);
                })
                : [generatedVariantFactory(true, [], this.product.variants[0])];
        };
        /**
         * Returns one of the existing variants to base the newly-generated variant's
         * details off.
         */
        ProductVariantsEditorComponent.prototype.getVariantPrototype = function (options, previousVariants) {
            var variantsWithSimilarOptions = previousVariants.filter(function (v) { return options.map(function (o) { return o.name; }).filter(function (name) { return v.options.map(function (o) { return o.name; }).includes(name); }); });
            if (variantsWithSimilarOptions.length) {
                return pick.pick(previousVariants[0], ['sku', 'price', 'stock']);
            }
            return {
                sku: '',
                price: 0,
                stock: 0,
            };
        };
        ProductVariantsEditorComponent.prototype.deleteVariant = function (id, options) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product-variant'),
                translationVars: { name: options.map(function (o) { return o.name; }).join(' ') },
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.productDetailService.deleteProductVariant(id, _this.product.id) : rxjs.EMPTY; }), operators.switchMap(function () { return _this.reFetchProduct(null); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'ProductVariant',
                });
                _this.initOptionsAndVariants();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'ProductVariant',
                });
            });
        };
        ProductVariantsEditorComponent.prototype.save = function () {
            var _this = this;
            this.optionGroups = this.optionGroups.filter(function (g) { return g.values.length; });
            var newOptionGroups = this.optionGroups
                .filter(function (og) { return og.isNew; })
                .map(function (og) { return ({
                name: og.name,
                values: [],
            }); });
            this.checkUniqueSkus()
                .pipe(operators.mergeMap(function () { return _this.confirmDeletionOfObsoleteVariants(); }), operators.mergeMap(function () { return _this.productDetailService.createProductOptionGroups(newOptionGroups, _this.languageCode); }), operators.mergeMap(function (createdOptionGroups) { return _this.addOptionGroupsToProduct(createdOptionGroups); }), operators.mergeMap(function (createdOptionGroups) { return _this.addNewOptionsToGroups(createdOptionGroups); }), operators.mergeMap(function (groupsIds) { return _this.fetchOptionGroups(groupsIds); }), operators.mergeMap(function (groups) { return _this.createNewProductVariants(groups); }), operators.mergeMap(function (res) { return _this.deleteObsoleteVariants(res.createProductVariants); }), operators.mergeMap(function (variants) { return _this.reFetchProduct(variants); }))
                .subscribe({
                next: function (variants) {
                    _this.formValueChanged = false;
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.created-new-variants-success'), {
                        count: variants.length,
                    });
                    _this.initOptionsAndVariants();
                    _this.optionsChanged = false;
                },
            });
        };
        ProductVariantsEditorComponent.prototype.checkUniqueSkus = function () {
            var _this = this;
            var withDuplicateSkus = this.generatedVariants.filter(function (variant, index) {
                return (variant.enabled &&
                    _this.generatedVariants.find(function (gv) { return gv.sku.trim() === variant.sku.trim() && gv !== variant; }));
            });
            if (withDuplicateSkus.length) {
                return this.modalService
                    .dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.duplicate-sku-warning'),
                    body: unique.unique(withDuplicateSkus.map(function (v) { return "" + v.sku; })).join(', '),
                    buttons: [{ label: ngxTranslateExtractMarker.marker('common.close'), returnValue: false, type: 'primary' }],
                })
                    .pipe(operators.mergeMap(function (res) { return rxjs.EMPTY; }));
            }
            else {
                return rxjs.of(true);
            }
        };
        ProductVariantsEditorComponent.prototype.confirmDeletionOfObsoleteVariants = function () {
            var obsoleteVariants = this.getObsoleteVariants();
            if (obsoleteVariants.length) {
                return this.modalService
                    .fromComponent(ConfirmVariantDeletionDialogComponent, {
                    locals: {
                        variants: obsoleteVariants,
                    },
                })
                    .pipe(operators.mergeMap(function (res) {
                    return res === true ? rxjs.of(true) : rxjs.EMPTY;
                }));
            }
            else {
                return rxjs.of(true);
            }
        };
        ProductVariantsEditorComponent.prototype.getObsoleteVariants = function () {
            var _this = this;
            return this.product.variants.filter(function (variant) { return !_this.generatedVariants.find(function (gv) { return gv.productVariantId === variant.id; }); });
        };
        ProductVariantsEditorComponent.prototype.hasOnlyDefaultVariant = function (product) {
            return product.variants.length === 1 && product.optionGroups.length === 0;
        };
        ProductVariantsEditorComponent.prototype.addOptionGroupsToProduct = function (createdOptionGroups) {
            var _this = this;
            if (createdOptionGroups.length) {
                return rxjs.forkJoin(createdOptionGroups.map(function (optionGroup) {
                    return _this.dataService.product.addOptionGroupToProduct({
                        productId: _this.product.id,
                        optionGroupId: optionGroup.id,
                    });
                })).pipe(operators.map(function () { return createdOptionGroups; }));
            }
            else {
                return rxjs.of([]);
            }
        };
        ProductVariantsEditorComponent.prototype.addNewOptionsToGroups = function (createdOptionGroups) {
            var _this = this;
            var newOptions = this.optionGroups
                .map(function (og) {
                var createdGroup = createdOptionGroups.find(function (cog) { return cog.name === og.name; });
                var productOptionGroupId = createdGroup ? createdGroup.id : og.id;
                if (!productOptionGroupId) {
                    throw new Error('Could not get a productOptionGroupId');
                }
                return og.values
                    .filter(function (v) { return !v.locked; })
                    .map(function (v) { return ({
                    productOptionGroupId: productOptionGroupId,
                    code: normalizeString.normalizeString(v.name, '-'),
                    translations: [{ name: v.name, languageCode: _this.languageCode }],
                }); });
            })
                .reduce(function (flat, options) { return __spreadArray(__spreadArray([], __read(flat)), __read(options)); }, []);
            var allGroupIds = __spreadArray(__spreadArray([], __read(createdOptionGroups.map(function (g) { return g.id; }))), __read(this.optionGroups.map(function (g) { return g.id; }).filter(sharedUtils.notNullOrUndefined)));
            if (newOptions.length) {
                return rxjs.forkJoin(newOptions.map(function (input) { return _this.dataService.product.addOptionToGroup(input); })).pipe(operators.map(function () { return allGroupIds; }));
            }
            else {
                return rxjs.of(allGroupIds);
            }
        };
        ProductVariantsEditorComponent.prototype.fetchOptionGroups = function (groupsIds) {
            var _this = this;
            return rxjs.forkJoin(groupsIds.map(function (id) { return _this.dataService.product
                .getProductOptionGroup(id)
                .mapSingle(function (data) { return data.productOptionGroup; })
                .pipe(operators.filter(sharedUtils.notNullOrUndefined)); })).pipe(operators.defaultIfEmpty([]));
        };
        ProductVariantsEditorComponent.prototype.createNewProductVariants = function (groups) {
            var options = groups
                .filter(sharedUtils.notNullOrUndefined)
                .map(function (og) { return og.options; })
                .reduce(function (flat, o) { return __spreadArray(__spreadArray([], __read(flat)), __read(o)); }, []);
            var variants = this.generatedVariants
                .filter(function (v) { return v.enabled && !v.existing; })
                .map(function (v) {
                var optionIds = groups.map(function (group, index) {
                    var option = group.options.find(function (o) { return o.name === v.options[index].name; });
                    if (option) {
                        return option.id;
                    }
                    else {
                        throw new Error("Could not find a matching option for group " + group.name);
                    }
                });
                return {
                    price: v.price,
                    sku: v.sku,
                    stock: v.stock,
                    optionIds: optionIds,
                };
            });
            return this.productDetailService.createProductVariants(this.product, variants, options, this.languageCode);
        };
        ProductVariantsEditorComponent.prototype.deleteObsoleteVariants = function (input) {
            var _this = this;
            var obsoleteVariants = this.getObsoleteVariants();
            if (obsoleteVariants.length) {
                var deleteOperations = obsoleteVariants.map(function (v) { return _this.dataService.product.deleteProductVariant(v.id).pipe(operators.map(function () { return input; })); });
                return rxjs.forkJoin.apply(void 0, __spreadArray([], __read(deleteOperations)));
            }
            else {
                return rxjs.of(input);
            }
        };
        ProductVariantsEditorComponent.prototype.reFetchProduct = function (input) {
            // Re-fetch the Product to force an update to the view.
            var id = this.route.snapshot.paramMap.get('id');
            if (id) {
                return this.dataService.product.getProduct(id).single$.pipe(operators.map(function () { return input; }));
            }
            else {
                return rxjs.of(input);
            }
        };
        ProductVariantsEditorComponent.prototype.initOptionsAndVariants = function () {
            var _this = this;
            this.dataService.product
                // tslint:disable-next-line:no-non-null-assertion
                .getProductVariantsOptions(this.route.snapshot.paramMap.get('id'))
                // tslint:disable-next-line:no-non-null-assertion
                .mapSingle(function (_g) {
                var product = _g.product;
                return product;
            })
                .subscribe(function (p) {
                _this.product = p;
                var allUsedOptionIds = p.variants.map(function (v) { return v.options.map(function (option) { return option.id; }); }).flat();
                var allUsedOptionGroupIds = p.variants
                    .map(function (v) { return v.options.map(function (option) { return option.groupId; }); })
                    .flat();
                _this.optionGroups = p.optionGroups.map(function (og) {
                    return {
                        id: og.id,
                        isNew: false,
                        name: og.name,
                        locked: allUsedOptionGroupIds.includes(og.id),
                        values: og.options.map(function (o) { return ({
                            id: o.id,
                            name: o.name,
                            locked: allUsedOptionIds.includes(o.id),
                        }); }),
                    };
                });
                _this.generateVariants();
            });
        };
        ProductVariantsEditorComponent.prototype.optionsAreEqual = function (a, b) {
            return this.toOptionString(a) === this.toOptionString(b);
        };
        ProductVariantsEditorComponent.prototype.optionsAreSubset = function (a, b) {
            return this.toOptionString(b).includes(this.toOptionString(a));
        };
        ProductVariantsEditorComponent.prototype.toOptionString = function (o) {
            return o
                .map(function (x) { return x.name; })
                .sort()
                .join('|');
        };
        return ProductVariantsEditorComponent;
    }());
    ProductVariantsEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-editor',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"(!formValueChanged && !optionsChanged) || getVariantsToAdd().length === 0\"\n        >\n            {{ 'common.add-new-variants' | translate: { count: getVariantsToAdd().length } }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngFor=\"let group of optionGroups; index as i\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input clrInput [(ngModel)]=\"group.name\" name=\"name\" [readonly]=\"!group.isNew\" />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [options]=\"group.values\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n            (add)=\"addOption(i, $event.name)\"\n            (remove)=\"removeOption(i, $event)\"\n        ></vdr-option-value-input>\n    </div>\n    <div>\n        <button\n            [disabled]=\"group.locked\"\n            class=\"btn btn-icon btn-danger-outline mt5\" (click)=\"removeOptionGroup(group)\">\n            <clr-icon shape=\"trash\"></clr-icon>\n        </button>\n    </div>\n</div>\n<button class=\"btn btn-primary-outline btn-sm\" (click)=\"addOptionGroup()\">\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                <th></th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let variant of generatedVariants\" [class.disabled]=\"!variant.enabled || variant.existing\">\n            <td class=\"left\">\n                <clr-checkbox-wrapper *ngIf=\"!variant.existing\">\n                    <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"variant.enabled\"\n                        name=\"enabled\"\n                        clrCheckbox\n                        (ngModelChange)=\"formValueChanged = true\"\n                    />\n                    <label>{{ 'common.create' | translate }}</label>\n                </clr-checkbox-wrapper>\n            </td>\n            <td>\n                {{ getVariantName(variant) | translate }}\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <input\n                            clrInput\n                            type=\"text\"\n                            [(ngModel)]=\"variant.sku\"\n                            [placeholder]=\"'catalog.sku' | translate\"\n                            name=\"sku\"\n                            required\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        />\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.sku }}</span>\n                </div>\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <vdr-currency-input\n                            clrInput\n                            [(ngModel)]=\"variant.price\"\n                            name=\"price\"\n                            [currencyCode]=\"currencyCode\"\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        ></vdr-currency-input>\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.price | localeCurrency: currencyCode }}</span>\n                </div>\n            </td>\n            <td>\n                <div class=\"flex center\">\n                    <clr-input-container *ngIf=\"!variant.existing\">\n                        <input\n                            clrInput\n                            type=\"number\"\n                            [(ngModel)]=\"variant.stock\"\n                            name=\"stock\"\n                            min=\"0\"\n                            step=\"1\"\n                            (ngModelChange)=\"onFormChanged(variant)\"\n                        />\n                    </clr-input-container>\n                    <span *ngIf=\"variant.existing\">{{ variant.stock }}</span>\n                </div>\n            </td>\n            <td>\n                <vdr-dropdown *ngIf=\"variant.productVariantId as productVariantId\">\n                    <button class=\"icon-button\" vdrDropdownTrigger>\n                        <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"deleteVariant(productVariantId, variant.options)\"\n                            vdrDropdownItem\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'common.delete' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    styles: [".option-groups{display:flex}.option-groups:first-of-type{margin-top:24px}.values{flex:1;margin:0 6px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}\n"]
                },] }
    ];
    ProductVariantsEditorComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i2.DataService },
        { type: ProductDetailService },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    var AssetResolver = /** @class */ (function (_super) {
        __extends(AssetResolver, _super);
        function AssetResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Asset',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                type: i2.AssetType.IMAGE,
                fileSize: 0,
                mimeType: '',
                width: 0,
                height: 0,
                source: '',
                preview: '',
                focalPoint: null,
            }, function (id) { return dataService.product.getAsset(id).mapStream(function (data) { return data.asset; }); }) || this;
        }
        return AssetResolver;
    }(i2.BaseEntityResolver));
    AssetResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AssetResolver_Factory() { return new AssetResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: AssetResolver, providedIn: "root" });
    AssetResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    AssetResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var CollectionResolver = /** @class */ (function (_super) {
        __extends(CollectionResolver, _super);
        function CollectionResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Collection',
                id: '',
                createdAt: '',
                updatedAt: '',
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                slug: '',
                isPrivate: false,
                breadcrumbs: [],
                description: '',
                featuredAsset: null,
                assets: [],
                translations: [],
                filters: [],
                parent: {},
                children: null,
            }, function (id) { return dataService.collection.getCollection(id).mapStream(function (data) { return data.collection; }); }) || this;
        }
        return CollectionResolver;
    }(i2.BaseEntityResolver));
    CollectionResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function CollectionResolver_Factory() { return new CollectionResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: CollectionResolver, providedIn: "root" });
    CollectionResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CollectionResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var FacetResolver = /** @class */ (function (_super) {
        __extends(FacetResolver, _super);
        function FacetResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Facet',
                id: '',
                createdAt: '',
                updatedAt: '',
                isPrivate: false,
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                code: '',
                translations: [],
                values: [],
            }, function (id) { return dataService.facet.getFacet(id).mapStream(function (data) { return data.facet; }); }) || this;
        }
        return FacetResolver;
    }(i2.BaseEntityResolver));
    FacetResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function FacetResolver_Factory() { return new FacetResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: FacetResolver, providedIn: "root" });
    FacetResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    FacetResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ProductResolver = /** @class */ (function (_super) {
        __extends(ProductResolver, _super);
        function ProductResolver(dataService, router) {
            return _super.call(this, router, {
                __typename: 'Product',
                id: '',
                createdAt: '',
                updatedAt: '',
                enabled: true,
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                slug: '',
                featuredAsset: null,
                assets: [],
                description: '',
                translations: [],
                optionGroups: [],
                facetValues: [],
                variantList: { items: [], totalItems: 0 },
                channels: [],
            }, function (id) { return dataService.product
                .getProduct(id, { take: 10 })
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.product; }); }) || this;
        }
        return ProductResolver;
    }(i2.BaseEntityResolver));
    ProductResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ProductResolver_Factory() { return new ProductResolver(i0__namespace.ɵɵinject(i2__namespace.DataService), i0__namespace.ɵɵinject(i1__namespace.Router)); }, token: ProductResolver, providedIn: "root" });
    ProductResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductResolver.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router }
    ]; };

    var ProductVariantsResolver = /** @class */ (function (_super) {
        __extends(ProductVariantsResolver, _super);
        function ProductVariantsResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Product',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                optionGroups: [],
                variants: [],
            }, function (id) { return dataService.product.getProductVariantsOptions(id).mapStream(function (data) { return data.product; }); }) || this;
        }
        return ProductVariantsResolver;
    }(i2.BaseEntityResolver));
    ProductVariantsResolver.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ProductVariantsResolver_Factory() { return new ProductVariantsResolver(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.DataService)); }, token: ProductVariantsResolver, providedIn: "root" });
    ProductVariantsResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductVariantsResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ɵ0$3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.products'),
    }, ɵ1$3 = {
        breadcrumb: productBreadcrumb,
    }, ɵ2$3 = {
        breadcrumb: productVariantEditorBreadcrumb,
    }, ɵ3$3 = {
        breadcrumb: productOptionsEditorBreadcrumb,
    }, ɵ4$3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.facets'),
    }, ɵ5$3 = {
        breadcrumb: facetBreadcrumb,
    }, ɵ6$3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.collections'),
    }, ɵ7$3 = {
        breadcrumb: collectionBreadcrumb,
    }, ɵ8$3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.assets'),
    }, ɵ9$1 = {
        breadcrumb: assetBreadcrumb,
    };
    var catalogRoutes = [
        {
            path: 'products',
            component: ProductListComponent,
            data: ɵ0$3,
        },
        {
            path: 'products/:id',
            component: ProductDetailComponent,
            resolve: i2.createResolveData(ProductResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ1$3,
        },
        {
            path: 'products/:id/manage-variants',
            component: ProductVariantsEditorComponent,
            resolve: i2.createResolveData(ProductVariantsResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ2$3,
        },
        {
            path: 'products/:id/options',
            component: ProductOptionsEditorComponent,
            resolve: i2.createResolveData(ProductVariantsResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ3$3,
        },
        {
            path: 'facets',
            component: FacetListComponent,
            data: ɵ4$3,
        },
        {
            path: 'facets/:id',
            component: FacetDetailComponent,
            resolve: i2.createResolveData(FacetResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ5$3,
        },
        {
            path: 'collections',
            component: CollectionListComponent,
            data: ɵ6$3,
        },
        {
            path: 'collections/:id',
            component: CollectionDetailComponent,
            resolve: i2.createResolveData(CollectionResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ7$3,
        },
        {
            path: 'assets',
            component: AssetListComponent,
            data: ɵ8$3,
        },
        {
            path: 'assets/:id',
            component: AssetDetailComponent,
            resolve: i2.createResolveData(AssetResolver),
            data: ɵ9$1,
        },
    ];
    function productBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.products',
            getName: function (product) { return product.name; },
            route: 'products',
        });
    }
    function productVariantEditorBreadcrumb(data, params) {
        return data.entity.pipe(operators.map(function (entity) {
            return [
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.products'),
                    link: ['../', 'products'],
                },
                {
                    label: "" + entity.name,
                    link: ['../', 'products', params.id, { tab: 'variants' }],
                },
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.manage-variants'),
                    link: ['manage-variants'],
                },
            ];
        }));
    }
    function productOptionsEditorBreadcrumb(data, params) {
        return data.entity.pipe(operators.map(function (entity) {
            return [
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.products'),
                    link: ['../', 'products'],
                },
                {
                    label: "" + entity.name,
                    link: ['../', 'products', params.id, { tab: 'variants' }],
                },
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.product-options'),
                    link: ['options'],
                },
            ];
        }));
    }
    function facetBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.facets',
            getName: function (facet) { return facet.name; },
            route: 'facets',
        });
    }
    function collectionBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.collections',
            getName: function (collection) { return collection.name; },
            route: 'collections',
        });
    }
    function assetBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.assets',
            getName: function (asset) { return asset.name; },
            route: 'assets',
        });
    }

    /**
     * A component which displays the Assets, and allows assets to be removed and
     * added, and for the featured asset to be set.
     *
     * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
     * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
     */
    var AssetsComponent = /** @class */ (function () {
        function AssetsComponent(modalService, changeDetector) {
            this.modalService = modalService;
            this.changeDetector = changeDetector;
            this.compact = false;
            this.change = new i0.EventEmitter();
            this.assets = [];
        }
        Object.defineProperty(AssetsComponent.prototype, "assetsSetter", {
            set: function (val) {
                // create a new non-readonly array of assets
                this.assets = (val || []).slice();
            },
            enumerable: false,
            configurable: true
        });
        AssetsComponent.prototype.selectAssets = function () {
            var _this = this;
            this.modalService
                .fromComponent(i2.AssetPickerDialogComponent, {
                size: 'xl',
            })
                .subscribe(function (result) {
                if (result && result.length) {
                    _this.assets = unique.unique(_this.assets.concat(result), 'id');
                    if (!_this.featuredAsset) {
                        _this.featuredAsset = result[0];
                    }
                    _this.emitChangeEvent(_this.assets, _this.featuredAsset);
                    _this.changeDetector.markForCheck();
                }
            });
        };
        AssetsComponent.prototype.setAsFeatured = function (asset) {
            this.featuredAsset = asset;
            this.emitChangeEvent(this.assets, asset);
        };
        AssetsComponent.prototype.isFeatured = function (asset) {
            return !!this.featuredAsset && this.featuredAsset.id === asset.id;
        };
        AssetsComponent.prototype.previewAsset = function (asset) {
            this.modalService
                .fromComponent(i2.AssetPreviewDialogComponent, {
                size: 'xl',
                closable: true,
                locals: { asset: asset },
            })
                .subscribe();
        };
        AssetsComponent.prototype.removeAsset = function (asset) {
            this.assets = this.assets.filter(function (a) { return a.id !== asset.id; });
            if (this.featuredAsset && this.featuredAsset.id === asset.id) {
                this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
            }
            this.emitChangeEvent(this.assets, this.featuredAsset);
        };
        AssetsComponent.prototype.emitChangeEvent = function (assets, featuredAsset) {
            this.change.emit({
                assets: assets,
                featuredAsset: featuredAsset,
            });
        };
        AssetsComponent.prototype.dropListDropped = function (event) {
            dragDrop.moveItemInArray(this.assets, event.previousContainer.data, event.container.data);
            this.emitChangeEvent(this.assets, this.featuredAsset);
        };
        return AssetsComponent;
    }());
    AssetsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-assets',
                    template: "<div class=\"card\" *ngIf=\"!compact; else compactView\">\n    <div class=\"card-img\">\n        <div class=\"featured-asset\">\n            <img\n                *ngIf=\"featuredAsset\"\n                [src]=\"featuredAsset | assetPreview:'small'\"\n                (click)=\"previewAsset(featuredAsset)\"\n            />\n            <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-featured-asset' | translate }}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-block\"><ng-container *ngTemplateOutlet=\"assetList\"></ng-container></div>\n    <div class=\"card-footer\" *vdrIfPermissions=\"updatePermissions\">\n        <button class=\"btn\" (click)=\"selectAssets()\">\n            <clr-icon shape=\"attachment\"></clr-icon>\n            {{ 'asset.add-asset' | translate }}\n        </button>\n    </div>\n</div>\n\n<ng-template #compactView>\n    <div class=\"featured-asset compact\">\n        <img\n            *ngIf=\"featuredAsset\"\n            [src]=\"featuredAsset | assetPreview:'thumb'\"\n            (click)=\"previewAsset(featuredAsset)\"\n        />\n\n        <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\"><clr-icon shape=\"image\" size=\"150\"></clr-icon></div>\n    </div>\n    <ng-container *ngTemplateOutlet=\"assetList\"></ng-container>\n    <button\n        *vdrIfPermissions=\"updatePermissions\"\n        class=\"compact-select btn btn-icon btn-sm btn-block\"\n        [title]=\"'asset.add-asset' | translate\"\n        (click)=\"selectAssets()\"\n    >\n        <clr-icon shape=\"attachment\"></clr-icon>\n        {{ 'asset.add-asset' | translate }}\n    </button>\n</ng-template>\n\n<ng-template #assetList>\n    <div class=\"all-assets\" [class.compact]=\"compact\" cdkDropListGroup>\n        <div\n            *ngFor=\"let asset of assets; let index = index\"\n            class=\"drop-list\"\n            cdkDropList\n            cdkDropListOrientation=\"horizontal\"\n            [cdkDropListData]=\"index\"\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            (cdkDropListDropped)=\"dropListDropped($event)\"\n        >\n            <vdr-dropdown cdkDrag>\n                <div\n                    class=\"asset-thumb\"\n                    vdrDropdownTrigger\n                    [class.featured]=\"isFeatured(asset)\"\n                    [title]=\"\"\n                    tabindex=\"0\"\n                >\n                    <img [src]=\"asset | assetPreview:'tiny'\" />\n                </div>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button type=\"button\" vdrDropdownItem (click)=\"previewAsset(asset)\">\n                        {{ 'asset.preview' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        [disabled]=\"isFeatured(asset) || !(updatePermissions | hasPermission)\"\n                        vdrDropdownItem\n                        (click)=\"setAsFeatured(asset)\"\n                    >\n                        {{ 'asset.set-as-featured-asset' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"remove-asset\"\n                        vdrDropdownItem\n                        [disabled]=\"!(updatePermissions | hasPermission)\"\n                        (click)=\"removeAsset(asset)\"\n                    >\n                        {{ 'asset.remove-asset' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n    </div>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{width:340px;display:block}:host.compact{width:162px}.placeholder{text-align:center;color:var(--color-grey-300)}.featured-asset{text-align:center;background:var(--color-component-bg-200);padding:6px;cursor:pointer;border-radius:var(--border-radius-img)}.featured-asset img{border-radius:var(--border-radius-img)}.featured-asset.compact{width:100%;min-height:40px;position:relative;padding:6px}.featured-asset .compact-select{position:absolute;bottom:6px;right:6px;margin:0}.all-assets{display:flex;flex-wrap:wrap}.all-assets .drop-list{min-width:60px}.all-assets .asset-thumb{margin:3px;padding:0;border:2px solid var(--color-component-border-100);border-radius:var(--border-radius-img);cursor:pointer}.all-assets .asset-thumb img{width:50px;height:50px;border-radius:var(--border-radius-img)}.all-assets .asset-thumb.featured{border-color:var(--color-primary-500);border-radius:calc(var(--border-radius-img) + 2px)}.all-assets .remove-asset{color:var(--color-warning-500)}.all-assets.compact .drop-list{min-width:54px}.all-assets.compact .asset-thumb{margin:1px;border-width:1px}.all-assets.compact .cdk-drag-placeholder{width:50px}.all-assets.compact .cdk-drag-placeholder .asset-thumb{width:50px}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.all-assets.cdk-drop-list-dragging vdr-dropdown:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging>*:not(.cdk-drag-placeholder){display:none}\n"]
                },] }
    ];
    AssetsComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i0.ChangeDetectorRef }
    ]; };
    AssetsComponent.propDecorators = {
        assetsSetter: [{ type: i0.Input, args: ['assets',] }],
        featuredAsset: [{ type: i0.Input }],
        compact: [{ type: i0.HostBinding, args: ['class.compact',] }, { type: i0.Input }],
        change: [{ type: i0.Output }],
        updatePermissions: [{ type: i0.Input }]
    };

    var AssignToChannelDialogComponent = /** @class */ (function () {
        // assigned by ModalService.fromComponent() call
        function AssignToChannelDialogComponent(dataService, notificationService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.selectedChannelIdControl = new forms.FormControl();
        }
        AssignToChannelDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var activeChannelId$ = this.dataService.client
                .userStatus()
                .mapSingle(function (_a) {
                var userStatus = _a.userStatus;
                return userStatus.activeChannelId;
            });
            var allChannels$ = this.dataService.settings.getChannels().mapSingle(function (data) { return data.channels; });
            rxjs.combineLatest(activeChannelId$, allChannels$).subscribe(function (_a) {
                var _b = __read(_a, 2), activeChannelId = _b[0], channels = _b[1];
                // tslint:disable-next-line:no-non-null-assertion
                _this.currentChannel = channels.find(function (c) { return c.id === activeChannelId; });
                _this.availableChannels = channels;
            });
            this.selectedChannelIdControl.valueChanges.subscribe(function (ids) {
                _this.selectChannel(ids);
            });
        };
        AssignToChannelDialogComponent.prototype.selectChannel = function (channelIds) {
            this.selectedChannel = this.availableChannels.find(function (c) { return c.id === channelIds[0]; });
        };
        AssignToChannelDialogComponent.prototype.assign = function () {
            var selectedChannel = this.selectedChannel;
            if (selectedChannel) {
                this.resolveWith(selectedChannel);
            }
        };
        AssignToChannelDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return AssignToChannelDialogComponent;
    }());
    AssignToChannelDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-assign-to-channel-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.assign-to-channel' | translate }}\n</ng-template>\n<clr-input-container class=\"mb4\">\n    <label>{{ 'common.channel' | translate }}</label>\n    <vdr-channel-assignment-control\n        clrInput\n        [multiple]=\"false\"\n        [includeDefaultChannel]=\"false\"\n        [formControl]=\"selectedChannelIdControl\"\n    ></vdr-channel-assignment-control>\n</clr-input-container>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["vdr-channel-assignment-control{min-width:200px}\n"]
                },] }
    ];
    AssignToChannelDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService }
    ]; };

    var GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS = apolloAngular.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query GetProductsWithFacetValuesByIds($ids: [String!]!) {\n        products(options: { filter: { id: { in: $ids } } }) {\n            items {\n                id\n                name\n                facetValues {\n                    id\n                    name\n                    code\n                    facet {\n                        id\n                        name\n                        code\n                    }\n                }\n            }\n        }\n    }\n"], ["\n    query GetProductsWithFacetValuesByIds($ids: [String!]!) {\n        products(options: { filter: { id: { in: $ids } } }) {\n            items {\n                id\n                name\n                facetValues {\n                    id\n                    name\n                    code\n                    facet {\n                        id\n                        name\n                        code\n                    }\n                }\n            }\n        }\n    }\n"])));
    var GET_VARIANTS_WITH_FACET_VALUES_BY_IDS = apolloAngular.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query GetVariantsWithFacetValuesByIds($ids: [String!]!) {\n        productVariants(options: { filter: { id: { in: $ids } } }) {\n            items {\n                id\n                name\n                sku\n                facetValues {\n                    id\n                    name\n                    code\n                    facet {\n                        id\n                        name\n                        code\n                    }\n                }\n            }\n        }\n    }\n"], ["\n    query GetVariantsWithFacetValuesByIds($ids: [String!]!) {\n        productVariants(options: { filter: { id: { in: $ids } } }) {\n            items {\n                id\n                name\n                sku\n                facetValues {\n                    id\n                    name\n                    code\n                    facet {\n                        id\n                        name\n                        code\n                    }\n                }\n            }\n        }\n    }\n"])));
    var UPDATE_PRODUCTS_BULK = apolloAngular.gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation UpdateProductsBulk($input: [UpdateProductInput!]!) {\n        updateProducts(input: $input) {\n            id\n            name\n            facetValues {\n                id\n                name\n                code\n            }\n        }\n    }\n"], ["\n    mutation UpdateProductsBulk($input: [UpdateProductInput!]!) {\n        updateProducts(input: $input) {\n            id\n            name\n            facetValues {\n                id\n                name\n                code\n            }\n        }\n    }\n"])));
    var UPDATE_VARIANTS_BULK = apolloAngular.gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    mutation UpdateVariantsBulk($input: [UpdateProductVariantInput!]!) {\n        updateProductVariants(input: $input) {\n            id\n            name\n            facetValues {\n                id\n                name\n                code\n            }\n        }\n    }\n"], ["\n    mutation UpdateVariantsBulk($input: [UpdateProductVariantInput!]!) {\n        updateProductVariants(input: $input) {\n            id\n            name\n            facetValues {\n                id\n                name\n                code\n            }\n        }\n    }\n"])));
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

    var BulkAddFacetValuesDialogComponent = /** @class */ (function () {
        function BulkAddFacetValuesDialogComponent(dataService, changeDetectorRef) {
            this.dataService = dataService;
            this.changeDetectorRef = changeDetectorRef;
            /* provided by call to ModalService */
            this.mode = 'product';
            this.facets = [];
            this.state = 'loading';
            this.selectedValues = [];
            this.items = [];
            this.facetValuesRemoved = false;
        }
        BulkAddFacetValuesDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b;
            var fetchData$ = this.mode === 'product'
                ? this.dataService
                    .query(GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS, {
                    ids: (_a = this.ids) !== null && _a !== void 0 ? _a : [],
                })
                    .mapSingle(function (_c) {
                    var products = _c.products;
                    return products.items.map(function (p) { return (Object.assign(Object.assign({}, p), { facetValues: __spreadArray([], __read(p.facetValues)) })); });
                })
                : this.dataService
                    .query(GET_VARIANTS_WITH_FACET_VALUES_BY_IDS, {
                    ids: (_b = this.ids) !== null && _b !== void 0 ? _b : [],
                })
                    .mapSingle(function (_c) {
                    var productVariants = _c.productVariants;
                    return productVariants.items.map(function (p) { return (Object.assign(Object.assign({}, p), { facetValues: __spreadArray([], __read(p.facetValues)) })); });
                });
            this.subscription = fetchData$.subscribe({
                next: function (items) {
                    _this.items = items;
                    _this.state = 'ready';
                    _this.changeDetectorRef.markForCheck();
                },
            });
        };
        BulkAddFacetValuesDialogComponent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        BulkAddFacetValuesDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        BulkAddFacetValuesDialogComponent.prototype.removeFacetValue = function (item, facetValueId) {
            item.facetValues = item.facetValues.filter(function (fv) { return fv.id !== facetValueId; });
            this.facetValuesRemoved = true;
        };
        BulkAddFacetValuesDialogComponent.prototype.addFacetValues = function () {
            var _this = this;
            var _a, _b;
            var selectedFacetValueIds = this.selectedValues.map(function (sv) { return sv.id; });
            this.state = 'saving';
            var save$ = this.mode === 'product'
                ? this.dataService.mutate(UPDATE_PRODUCTS_BULK, {
                    input: (_a = this.items) === null || _a === void 0 ? void 0 : _a.map(function (product) { return ({
                        id: product.id,
                        facetValueIds: unique.unique(__spreadArray(__spreadArray([], __read(product.facetValues.map(function (fv) { return fv.id; }))), __read(selectedFacetValueIds))),
                    }); }),
                })
                : this.dataService.mutate(UPDATE_VARIANTS_BULK, {
                    input: (_b = this.items) === null || _b === void 0 ? void 0 : _b.map(function (product) { return ({
                        id: product.id,
                        facetValueIds: unique.unique(__spreadArray(__spreadArray([], __read(product.facetValues.map(function (fv) { return fv.id; }))), __read(selectedFacetValueIds))),
                    }); }),
                });
            return save$.subscribe(function (result) {
                _this.resolveWith(_this.selectedValues);
            });
        };
        return BulkAddFacetValuesDialogComponent;
    }());
    BulkAddFacetValuesDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-bulk-add-facet-values-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.edit-facet-values' | translate }}\n</ng-template>\n\n<div class=\"flex\">\n    <div class=\"flex center\">\n        <div class=\"mr2\">\n            {{ 'catalog.add-facet-value' | translate }}\n        </div>\n        <vdr-facet-value-selector\n            [facets]=\"facets\"\n            (selectedValuesChange)=\"selectedValues = $event\"\n        ></vdr-facet-value-selector>\n    </div>\n</div>\n\n<table class=\"table\" *ngIf=\"state !== 'loading'; else placeholder\">\n    <tbody>\n        <tr *ngFor=\"let item of items\">\n            <td class=\"left align-middle\">\n                <div>{{ item.name }}</div>\n                <div *ngIf=\"item.sku\" class=\"sku\">{{ item.sku }}</div>\n            </td>\n            <td class=\"left\">\n                <vdr-facet-value-chip\n                    *ngFor=\"let facetValue of item.facetValues\"\n                    [facetValue]=\"facetValue\"\n                    (remove)=\"removeFacetValue(item, facetValue.id)\"\n                ></vdr-facet-value-chip>\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n<ng-template #placeholder>\n    <div class=\"loading\">\n    <clr-spinner></clr-spinner>\n    </div>\n</ng-template>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"addFacetValues()\"\n        [disabled]=\"selectedValues.length === 0 && facetValuesRemoved === false\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".loading{min-height:25vh;display:flex;justify-content:center;align-items:center}.sku{color:var(--color-text-300)}\n"]
                },] }
    ];
    BulkAddFacetValuesDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var CollectionContentsComponent = /** @class */ (function () {
        function CollectionContentsComponent(route, router, dataService) {
            this.route = route;
            this.router = router;
            this.dataService = dataService;
            this.previewUpdatedFilters = false;
            this.filterTermControl = new forms.FormControl('');
            this.isLoading = false;
            this.collectionIdChange$ = new rxjs.BehaviorSubject('');
            this.parentIdChange$ = new rxjs.BehaviorSubject('');
            this.filterChanges$ = new rxjs.BehaviorSubject([]);
            this.refresh$ = new rxjs.BehaviorSubject(true);
            this.destroy$ = new rxjs.Subject();
        }
        CollectionContentsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.contentsCurrentPage$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.get('contentsPage'); }), operators.map(function (page) { return (!page ? 1 : +page); }), operators.startWith(1), operators.distinctUntilChanged());
            this.contentsItemsPerPage$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.get('contentsPerPage'); }), operators.map(function (perPage) { return (!perPage ? 10 : +perPage); }), operators.startWith(10), operators.distinctUntilChanged());
            var filterTerm$ = this.filterTermControl.valueChanges.pipe(operators.debounceTime(250), operators.tap(function () { return _this.setContentsPageNumber(1); }), operators.startWith(''));
            var filterChanges$ = this.filterChanges$.asObservable().pipe(operators.filter(function () { return _this.previewUpdatedFilters; }), operators.tap(function () { return _this.setContentsPageNumber(1); }), operators.startWith([]));
            var fetchUpdate$ = rxjs.combineLatest(this.collectionIdChange$, this.parentIdChange$, this.contentsCurrentPage$, this.contentsItemsPerPage$, filterTerm$, filterChanges$, this.refresh$);
            var collection$ = fetchUpdate$.pipe(operators.takeUntil(this.destroy$), operators.tap(function () { return (_this.isLoading = true); }), operators.debounceTime(50), operators.switchMap(function (_b) {
                var _c = __read(_b, 6), id = _c[0], parentId = _c[1], currentPage = _c[2], itemsPerPage = _c[3], filterTerm = _c[4], filters = _c[5];
                var take = itemsPerPage;
                var skip = (currentPage - 1) * itemsPerPage;
                if (filters.length && _this.previewUpdatedFilters) {
                    var filterClause = filterTerm
                        ? { name: { contains: filterTerm } }
                        : undefined;
                    return _this.dataService.collection
                        .previewCollectionVariants({
                        parentId: parentId,
                        filters: filters,
                    }, {
                        take: take,
                        skip: skip,
                        filter: filterClause,
                    })
                        .mapSingle(function (data) { return data.previewCollectionVariants; })
                        .pipe(operators.catchError(function () { return rxjs.of({ items: [], totalItems: 0 }); }));
                }
                else if (id) {
                    return _this.dataService.collection
                        .getCollectionContents(id, take, skip, filterTerm)
                        .mapSingle(function (data) { var _a; return (_a = data.collection) === null || _a === void 0 ? void 0 : _a.productVariants; });
                }
                else {
                    return rxjs.of(null);
                }
            }), operators.tap(function () { return (_this.isLoading = false); }), operators.finalize(function () { return (_this.isLoading = false); }));
            this.contents$ = collection$.pipe(operators.map(function (result) { return (result ? result.items : []); }));
            this.contentsTotalItems$ = collection$.pipe(operators.map(function (result) { return (result ? result.totalItems : 0); }));
        };
        CollectionContentsComponent.prototype.ngOnChanges = function (changes) {
            if ('collectionId' in changes) {
                this.collectionIdChange$.next(changes.collectionId.currentValue);
            }
            if ('parentId' in changes) {
                this.parentIdChange$.next(changes.parentId.currentValue);
            }
            if ('updatedFilters' in changes) {
                if (this.updatedFilters) {
                    this.filterChanges$.next(this.updatedFilters);
                }
            }
        };
        CollectionContentsComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        CollectionContentsComponent.prototype.setContentsPageNumber = function (page) {
            this.setParam('contentsPage', page);
        };
        CollectionContentsComponent.prototype.setContentsItemsPerPage = function (perPage) {
            this.setParam('contentsPerPage', perPage);
        };
        CollectionContentsComponent.prototype.refresh = function () {
            this.refresh$.next(true);
        };
        CollectionContentsComponent.prototype.setParam = function (key, value) {
            var _b;
            this.router.navigate(['./'], {
                relativeTo: this.route,
                queryParams: (_b = {},
                    _b[key] = value,
                    _b),
                queryParamsHandling: 'merge',
                replaceUrl: true,
            });
        };
        return CollectionContentsComponent;
    }());
    CollectionContentsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-contents',
                    template: "<div class=\"contents-header\">\n    <div class=\"header-title-row\">\n        <ng-container\n            *ngTemplateOutlet=\"headerTemplate; context: { $implicit: contentsTotalItems$ | async }\"\n        ></ng-container>\n    </div>\n    <input\n        type=\"text\"\n        [placeholder]=\"'catalog.filter-by-name' | translate\"\n        [formControl]=\"filterTermControl\"\n    />\n</div>\n<div class=\"table-wrapper\">\n    <div class=\"progress loop\" [class.visible]=\"isLoading\"></div>\n    <vdr-data-table\n        [class.loading]=\"isLoading\"\n        [items]=\"contents$ | async\"\n        [itemsPerPage]=\"contentsItemsPerPage$ | async\"\n        [totalItems]=\"contentsTotalItems$ | async\"\n        [currentPage]=\"contentsCurrentPage$ | async\"\n        (pageChange)=\"setContentsPageNumber($event)\"\n        (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    >\n        <ng-template let-variant=\"item\">\n            <td class=\"left align-middle\">{{ variant.name }}</td>\n            <td class=\"left align-middle\"><small class=\"sku\">{{ variant.sku }}</small></td>\n            <td class=\"right align-middle\">\n                <vdr-table-row-action\n                    iconShape=\"edit\"\n                    [label]=\"'common.edit' | translate\"\n                    [linkTo]=\"['/catalog/products', variant.productId, { tab: 'variants' }]\"\n                ></vdr-table-row-action>\n            </td>\n        </ng-template>\n    </vdr-data-table>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".contents-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:1;border-bottom:1px solid var(--color-component-border-200)}.contents-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.contents-header .clr-input{width:100%}:host{display:block}:host ::ng-deep table{margin-top:-1px}vdr-data-table{opacity:1;transition:opacity .3s}vdr-data-table.loading{opacity:.5}.table-wrapper{position:relative}.progress{position:absolute;top:0;left:0;overflow:hidden;height:6px;opacity:0;transition:opacity .1s}.progress.visible{opacity:1}.sku{color:var(--color-text-200)}\n"]
                },] }
    ];
    CollectionContentsComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.DataService }
    ]; };
    CollectionContentsComponent.propDecorators = {
        collectionId: [{ type: i0.Input }],
        parentId: [{ type: i0.Input }],
        updatedFilters: [{ type: i0.Input }],
        previewUpdatedFilters: [{ type: i0.Input }],
        headerTemplate: [{ type: i0.ContentChild, args: [i0.TemplateRef, { static: true },] }]
    };

    var ɵ0$2 = function (userPermissions) { return userPermissions.includes(i2.Permission.DeleteCollection) ||
        userPermissions.includes(i2.Permission.DeleteCatalog); }, ɵ1$2 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        modalService
            .dialog({
            title: ngxTranslateExtractMarker.marker('catalog.confirm-bulk-delete-collections'),
            translationVars: {
                count: selection.length,
            },
            buttons: [
                { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(operators.switchMap(function (response) { return response
            ? dataService.collection.deleteCollections(unique.unique(selection.map(function (c) { return c.id; })))
            : rxjs.EMPTY; }))
            .subscribe(function (result) {
            var e_1, _a;
            var deleted = 0;
            var errors = [];
            try {
                for (var _b = __values(result.deleteCollections), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.result === i2.DeletionResult.DELETED) {
                        deleted++;
                    }
                    else if (item.message) {
                        errors.push(item.message);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (0 < deleted) {
                notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-bulk-delete-collections-success'), {
                    count: deleted,
                });
            }
            if (0 < errors.length) {
                notificationService.error(errors.join('\n'));
            }
            hostComponent.refresh();
            clearSelection();
        });
    };
    var deleteCollectionsBulkAction = {
        location: 'collection-list',
        label: ngxTranslateExtractMarker.marker('common.delete'),
        icon: 'trash',
        iconClass: 'is-danger',
        requiresPermission: ɵ0$2,
        onClick: ɵ1$2,
    };
    var ɵ2$2 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateCatalog) ||
        userPermissions.includes(i2.Permission.UpdateProduct); }, ɵ3$2 = function (_a) {
        var injector = _a.injector;
        return i2.isMultiChannel(injector.get(i2.DataService));
    }, ɵ4$2 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        modalService
            .fromComponent(AssignToChannelDialogComponent, {
            size: 'md',
            locals: {},
        })
            .pipe(operators.switchMap(function (result) {
            if (result) {
                return dataService.collection
                    .assignCollectionsToChannel({
                    collectionIds: selection.map(function (c) { return c.id; }),
                    channelId: result.id,
                })
                    .pipe(operators.mapTo(result));
            }
            else {
                return rxjs.EMPTY;
            }
        }))
            .subscribe(function (result) {
            notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-collections-to-channel-success'), {
                count: selection.length,
                channelCode: result.code,
            });
            clearSelection();
        });
    };
    var assignCollectionsToChannelBulkAction = {
        location: 'collection-list',
        label: ngxTranslateExtractMarker.marker('catalog.assign-to-channel'),
        icon: 'layers',
        requiresPermission: ɵ2$2,
        isVisible: ɵ3$2,
        onClick: ɵ4$2,
    };
    var ɵ5$2 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateChannel) ||
        userPermissions.includes(i2.Permission.UpdateProduct); }, ɵ6$2 = function (_a) {
        var injector = _a.injector;
        return i2.getChannelCodeFromUserStatus(injector.get(i2.DataService));
    }, ɵ7$2 = function (_a) {
        var injector = _a.injector;
        return i2.currentChannelIsNotDefault(injector.get(i2.DataService));
    }, ɵ8$2 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        var activeChannelId$ = dataService.client
            .userStatus()
            .mapSingle(function (_a) {
            var userStatus = _a.userStatus;
            return userStatus.activeChannelId;
        });
        rxjs.from(i2.getChannelCodeFromUserStatus(injector.get(i2.DataService)))
            .pipe(operators.switchMap(function (_a) {
            var channelCode = _a.channelCode;
            return modalService.dialog({
                title: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
                translationVars: {
                    channelCode: channelCode,
                },
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    {
                        type: 'danger',
                        label: ngxTranslateExtractMarker.marker('common.remove'),
                        returnValue: true,
                    },
                ],
            });
        }), operators.switchMap(function (res) { return res
            ? activeChannelId$.pipe(operators.switchMap(function (activeChannelId) { return activeChannelId
                ? dataService.collection.removeCollectionsFromChannel({
                    channelId: activeChannelId,
                    collectionIds: selection.map(function (c) { return c.id; }),
                })
                : rxjs.EMPTY; }), operators.mapTo(true))
            : rxjs.of(false); }))
            .subscribe(function (removed) {
            if (removed) {
                clearSelection();
                notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-collections-from-channel-success'), {
                    count: selection.length,
                });
                hostComponent.refresh();
            }
        });
    };
    var removeCollectionsFromChannelBulkAction = {
        location: 'collection-list',
        label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
        requiresPermission: ɵ5$2,
        getTranslationVars: ɵ6$2,
        icon: 'layers',
        iconClass: 'is-warning',
        isVisible: ɵ7$2,
        onClick: ɵ8$2,
    };

    /**
     * Builds a tree from an array of nodes which have a parent.
     * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
     */
    function arrayToTree(nodes, currentState, expandedIds) {
        var e_1, _c, e_2, _d;
        if (expandedIds === void 0) { expandedIds = []; }
        var _a, _b;
        var topLevelNodes = [];
        var mappedArr = {};
        var currentStateMap = treeToMap(currentState);
        try {
            // First map the nodes of the array to an object -> create a hash table.
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                mappedArr[node.id] = Object.assign(Object.assign({}, node), { children: [] });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_c = nodes_1.return)) _c.call(nodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(nodes.map(function (n) { return n.id; })), _f = _e.next(); !_f.done; _f = _e.next()) {
                var id = _f.value;
                if (mappedArr.hasOwnProperty(id)) {
                    var mappedElem = mappedArr[id];
                    mappedElem.expanded = (_b = (_a = currentStateMap.get(id)) === null || _a === void 0 ? void 0 : _a.expanded) !== null && _b !== void 0 ? _b : expandedIds.includes(id);
                    var parent = mappedElem.parent;
                    if (!parent) {
                        continue;
                    }
                    // If the element is not at the root level, add it to its parent array of children.
                    var parentIsRoot = !mappedArr[parent.id];
                    if (!parentIsRoot) {
                        if (mappedArr[parent.id]) {
                            mappedArr[parent.id].children.push(mappedElem);
                        }
                        else {
                            mappedArr[parent.id] = { children: [mappedElem] };
                        }
                    }
                    else {
                        topLevelNodes.push(mappedElem);
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
        // tslint:disable-next-line:no-non-null-assertion
        var rootId = topLevelNodes.length ? topLevelNodes[0].parent.id : undefined;
        return { id: rootId, children: topLevelNodes };
    }
    /**
     * Converts an existing tree (as generated by the arrayToTree function) into a flat
     * Map. This is used to persist certain states (e.g. `expanded`) when re-building the
     * tree.
     */
    function treeToMap(tree) {
        var nodeMap = new Map();
        function visit(node) {
            nodeMap.set(node.id, node);
            node.children.forEach(visit);
        }
        if (tree) {
            visit(tree);
        }
        return nodeMap;
    }

    var CollectionTreeComponent = /** @class */ (function () {
        function CollectionTreeComponent() {
            this.expandAll = false;
            this.expandedIds = [];
            this.rearrange = new i0.EventEmitter();
            this.deleteCollection = new i0.EventEmitter();
            this.allMoveListItems = [];
        }
        CollectionTreeComponent.prototype.ngOnChanges = function (changes) {
            if ('collections' in changes && this.collections) {
                this.collectionTree = arrayToTree(this.collections, this.collectionTree, this.expandedIds);
                this.allMoveListItems = [];
            }
        };
        CollectionTreeComponent.prototype.onDrop = function (event) {
            var item = event.item.data;
            var newParent = event.container.data;
            var newParentId = newParent.id;
            if (newParentId == null) {
                throw new Error("Could not determine the ID of the root Collection");
            }
            this.rearrange.emit({
                collectionId: item.id,
                parentId: newParentId,
                index: event.currentIndex,
            });
        };
        CollectionTreeComponent.prototype.onMove = function (event) {
            this.rearrange.emit(event);
        };
        CollectionTreeComponent.prototype.onDelete = function (id) {
            this.deleteCollection.emit(id);
        };
        CollectionTreeComponent.prototype.getMoveListItems = function (collection) {
            if (this.allMoveListItems.length === 0) {
                this.allMoveListItems = this.calculateAllMoveListItems();
            }
            return this.allMoveListItems.filter(function (item) {
                var _a;
                return item.id !== collection.id &&
                    !item.ancestorIdPath.has(collection.id) &&
                    item.id !== ((_a = collection.parent) === null || _a === void 0 ? void 0 : _a.id);
            });
        };
        CollectionTreeComponent.prototype.calculateAllMoveListItems = function () {
            var visit = function (node, parentPath, ancestorIdPath, output) {
                var path = parentPath.concat(node.name);
                output.push({ path: path.slice(1).join(' / ') || 'root', id: node.id, ancestorIdPath: ancestorIdPath });
                node.children.forEach(function (child) { return visit(child, path, new Set(__spreadArray(__spreadArray([], __read(ancestorIdPath)), [node.id])), output); });
                return output;
            };
            return visit(this.collectionTree, [], new Set(), []);
        };
        CollectionTreeComponent.prototype.isRootNode = function (node) {
            return !node.hasOwnProperty('parent');
        };
        return CollectionTreeComponent;
    }());
    CollectionTreeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-tree',
                    template: "<vdr-collection-tree-node\n    *ngIf=\"collectionTree\"\n    cdkDropListGroup\n    [expandAll]=\"expandAll\"\n    [collectionTree]=\"collectionTree\"\n    [selectionManager]=\"selectionManager\"\n    [activeCollectionId]=\"activeCollectionId\"\n></vdr-collection-tree-node>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CollectionTreeComponent.propDecorators = {
        collections: [{ type: i0.Input }],
        activeCollectionId: [{ type: i0.Input }],
        expandAll: [{ type: i0.Input }],
        expandedIds: [{ type: i0.Input }],
        selectionManager: [{ type: i0.Input }],
        rearrange: [{ type: i0.Output }],
        deleteCollection: [{ type: i0.Output }]
    };

    var CollectionTreeNodeComponent = /** @class */ (function () {
        function CollectionTreeNodeComponent(parent, root, dataService, router, route, changeDetectorRef) {
            this.parent = parent;
            this.root = root;
            this.dataService = dataService;
            this.router = router;
            this.route = route;
            this.changeDetectorRef = changeDetectorRef;
            this.depth = 0;
            this.expandAll = false;
            this.moveListItems = [];
            if (parent) {
                this.depth = parent.depth + 1;
            }
        }
        CollectionTreeNodeComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.parentName = this.collectionTree.name || '<root>';
            var permissions$ = this.dataService.client
                .userStatus()
                .mapStream(function (data) { return data.userStatus.permissions; })
                .pipe(operators.shareReplay(1));
            this.hasUpdatePermission$ = permissions$.pipe(operators.map(function (perms) { return perms.includes(i2.Permission.UpdateCatalog) || perms.includes(i2.Permission.UpdateCollection); }));
            this.hasDeletePermission$ = permissions$.pipe(operators.map(function (perms) { return perms.includes(i2.Permission.DeleteCatalog) || perms.includes(i2.Permission.DeleteCollection); }));
            this.subscription = (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.selectionChanges$.subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        CollectionTreeNodeComponent.prototype.ngOnChanges = function (changes) {
            var expandAllChange = changes['expandAll'];
            if (expandAllChange) {
                if (expandAllChange.previousValue === true && expandAllChange.currentValue === false) {
                    this.collectionTree.children.forEach(function (c) { return (c.expanded = false); });
                }
            }
        };
        CollectionTreeNodeComponent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        CollectionTreeNodeComponent.prototype.trackByFn = function (index, item) {
            return item.id;
        };
        CollectionTreeNodeComponent.prototype.toggleExpanded = function (collection) {
            var _a, _b;
            collection.expanded = !collection.expanded;
            var expandedIds = (_b = (_a = this.route.snapshot.queryParamMap.get('expanded')) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
            if (collection.expanded) {
                expandedIds.push(collection.id);
            }
            else {
                expandedIds = expandedIds.filter(function (id) { return id !== collection.id; });
            }
            this.router.navigate(['./'], {
                queryParams: {
                    expanded: expandedIds.filter(function (id) { return !!id; }).join(','),
                },
                queryParamsHandling: 'merge',
                relativeTo: this.route,
            });
        };
        CollectionTreeNodeComponent.prototype.getMoveListItems = function (collection) {
            this.moveListItems = this.root.getMoveListItems(collection);
        };
        CollectionTreeNodeComponent.prototype.move = function (collection, parentId) {
            this.root.onMove({
                index: 0,
                parentId: parentId,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.moveUp = function (collection, currentIndex) {
            if (!collection.parent) {
                return;
            }
            this.root.onMove({
                index: currentIndex - 1,
                parentId: collection.parent.id,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.moveDown = function (collection, currentIndex) {
            if (!collection.parent) {
                return;
            }
            this.root.onMove({
                index: currentIndex + 1,
                parentId: collection.parent.id,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.drop = function (event) {
            dragDrop.moveItemInArray(this.collectionTree.children, event.previousIndex, event.currentIndex);
            this.root.onDrop(event);
        };
        CollectionTreeNodeComponent.prototype.delete = function (id) {
            this.root.onDelete(id);
        };
        return CollectionTreeNodeComponent;
    }());
    CollectionTreeNodeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-tree-node',
                    template: "<div\n    cdkDropList\n    class=\"tree-node\"\n    #dropList\n    [cdkDropListData]=\"collectionTree\"\n    [cdkDropListDisabled]=\"!(hasUpdatePermission$ | async)\"\n    (cdkDropListDropped)=\"drop($event)\"\n>\n    <div\n        class=\"collection\"\n        [class.private]=\"collection.isPrivate\"\n        *ngFor=\"let collection of collectionTree.children; index as i; trackBy: trackByFn\"\n        cdkDrag\n        [cdkDragData]=\"collection\"\n    >\n        <div\n            class=\"collection-detail\"\n            [ngClass]=\"'depth-' + depth\"\n            [class.active]=\"collection.id === activeCollectionId\"\n        >\n            <div>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    [checked]=\"selectionManager.isSelected(collection)\"\n                    (click)=\"selectionManager.toggleSelection(collection, $event)\"\n                />\n            </div>\n            <div class=\"name\">\n                <button\n                    class=\"icon-button folder-button\"\n                    [disabled]=\"expandAll\"\n                    *ngIf=\"collection.children?.length; else folderSpacer\"\n                    (click)=\"toggleExpanded(collection)\"\n                >\n                    <clr-icon shape=\"folder\" *ngIf=\"!collection.expanded && !expandAll\"></clr-icon>\n                    <clr-icon shape=\"folder-open\" *ngIf=\"collection.expanded || expandAll\"></clr-icon>\n                </button>\n                <ng-template #folderSpacer>\n                    <div class=\"folder-button-spacer\"></div>\n                </ng-template>\n                {{ collection.name }}\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <vdr-chip *ngIf=\"collection.isPrivate\">{{ 'catalog.private' | translate }}</vdr-chip>\n            <a\n                class=\"btn btn-link btn-sm\"\n                [routerLink]=\"['./', { contents: collection.id }]\"\n                queryParamsHandling=\"preserve\"\n            >\n                <clr-icon shape=\"view-list\"></clr-icon>\n                {{ 'catalog.view-contents' | translate }}\n            </a>\n            <a class=\"btn btn-link btn-sm\" [routerLink]=\"['/catalog/collections/', collection.id]\">\n                <clr-icon shape=\"edit\"></clr-icon>\n                {{ 'common.edit' | translate }}\n            </a>\n            <div class=\"drag-handle\" cdkDragHandle *vdrIfPermissions=\"['UpdateCatalog', 'UpdateCollection']\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n            <vdr-dropdown>\n                <button class=\"icon-button\" vdrDropdownTrigger (click)=\"getMoveListItems(collection)\">\n                    <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <a\n                        class=\"dropdown-item\"\n                        [routerLink]=\"['./', 'create', { parentId: collection.id }]\"\n                        *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\"\n                    >\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'catalog.create-new-collection' | translate }}\n                    </a>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"i === 0 || !(hasUpdatePermission$ | async)\"\n                        (click)=\"moveUp(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret up\"></clr-icon>\n                        {{ 'catalog.move-up' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"\n                            i === collectionTree.children.length - 1 || !(hasUpdatePermission$ | async)\n                        \"\n                        (click)=\"moveDown(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret down\"></clr-icon>\n                        {{ 'catalog.move-down' | translate }}\n                    </button>\n                    <h4 class=\"dropdown-header\">{{ 'catalog.move-to' | translate }}</h4>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        *ngFor=\"let item of moveListItems\"\n                        (click)=\"move(collection, item.id)\"\n                        [disabled]=\"!(hasUpdatePermission$ | async)\"\n                    >\n                        <div class=\"move-to-item\">\n                            <div class=\"move-icon\">\n                                <clr-icon shape=\"child-arrow\"></clr-icon>\n                            </div>\n                            <div class=\"path\">\n                                {{ item.path }}\n                            </div>\n                        </div>\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        class=\"button\"\n                        vdrDropdownItem\n                        (click)=\"delete(collection.id)\"\n                        [disabled]=\"!(hasDeletePermission$ | async)\"\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <vdr-collection-tree-node\n            *ngIf=\"collection.expanded || expandAll\"\n            [expandAll]=\"expandAll\"\n            [collectionTree]=\"collection\"\n            [activeCollectionId]=\"activeCollectionId\"\n            [selectionManager]=\"selectionManager\"\n        ></vdr-collection-tree-node>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.collection{background-color:var(--clr-table-bgcolor);border-radius:var(--clr-global-borderradius);font-size:.65rem;transition:transform .25s cubic-bezier(0,0,.2,1);margin-bottom:2px;border-left:2px solid transparent;transition:border-left-color .2s}.collection.private{background-color:var(--color-component-bg-200)}.collection .collection-detail{padding:6px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--color-component-border-100)}.collection .collection-detail.active{background-color:var(--clr-global-selection-color)}.collection .collection-detail.depth-1{padding-left:36px}.collection .collection-detail.depth-2{padding-left:60px}.collection .collection-detail.depth-3{padding-left:84px}.collection .collection-detail.depth-4{padding-left:108px}.collection .collection-detail .folder-button-spacer{display:inline-block;width:28px}.tree-node{display:block;background-color:var(--clr-table-bgcolor);border-radius:var(--clr-global-borderradius);overflow:hidden}.tree-node.cdk-drop-list-dragging>.collection{border-left-color:var(--color-primary-300)}.drag-placeholder{min-height:120px;background-color:var(--color-component-bg-300);transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-list.cdk-drop-list-dragging .tree-node:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}.move-to-item{display:flex;white-space:normal;align-items:baseline}.move-to-item .move-icon{flex:none;margin-right:3px}.move-to-item .path{line-height:18px}\n"]
                },] }
    ];
    CollectionTreeNodeComponent.ctorParameters = function () { return [
        { type: CollectionTreeNodeComponent, decorators: [{ type: i0.SkipSelf }, { type: i0.Optional }] },
        { type: CollectionTreeComponent },
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i0.ChangeDetectorRef }
    ]; };
    CollectionTreeNodeComponent.propDecorators = {
        collectionTree: [{ type: i0.Input }],
        activeCollectionId: [{ type: i0.Input }],
        expandAll: [{ type: i0.Input }],
        selectionManager: [{ type: i0.Input }]
    };

    var ɵ0$1 = function (userPermissions) { return userPermissions.includes(i2.Permission.DeleteFacet) ||
        userPermissions.includes(i2.Permission.DeleteCatalog); }, ɵ1$1 = function (_b) {
        var injector = _b.injector, selection = _b.selection, hostComponent = _b.hostComponent, clearSelection = _b.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        function showModalAndDelete(facetIds, message) {
            return modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-bulk-delete-facets'),
                translationVars: {
                    count: selection.length,
                },
                size: message ? 'lg' : 'md',
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    {
                        type: 'danger',
                        label: message ? ngxTranslateExtractMarker.marker('common.force-delete') : ngxTranslateExtractMarker.marker('common.delete'),
                        returnValue: true,
                    },
                ],
            })
                .pipe(operators.switchMap(function (res) { return res
                ? dataService.facet
                    .deleteFacets(facetIds, !!message)
                    .pipe(operators.map(function (res2) { return res2.deleteFacets; }))
                : rxjs.of([]); }));
        }
        showModalAndDelete(unique.unique(selection.map(function (f) { return f.id; })))
            .pipe(operators.switchMap(function (result) {
            var e_1, _b;
            var _a;
            var deletedCount = 0;
            var errors = [];
            var errorIds = [];
            var i = 0;
            try {
                for (var result_1 = __values(result), result_1_1 = result_1.next(); !result_1_1.done; result_1_1 = result_1.next()) {
                    var item = result_1_1.value;
                    if (item.result === i2.DeletionResult.DELETED) {
                        deletedCount++;
                    }
                    else if (item.message) {
                        errors.push(item.message);
                        errorIds.push((_a = selection[i]) === null || _a === void 0 ? void 0 : _a.id);
                    }
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (result_1_1 && !result_1_1.done && (_b = result_1.return)) _b.call(result_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (0 < errorIds.length) {
                return showModalAndDelete(errorIds, errors.join('\n')).pipe(operators.map(function (result2) {
                    var deletedCount2 = result2.filter(function (r) { return r.result === i2.DeletionResult.DELETED; }).length;
                    return deletedCount + deletedCount2;
                }));
            }
            else {
                return rxjs.of(deletedCount);
            }
        }))
            .subscribe(function (deletedCount) {
            if (deletedCount) {
                hostComponent.refresh();
                clearSelection();
                notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-bulk-delete-facets-success'), {
                    count: deletedCount,
                });
            }
        });
    };
    var deleteFacetsBulkAction = {
        location: 'facet-list',
        label: ngxTranslateExtractMarker.marker('common.delete'),
        icon: 'trash',
        iconClass: 'is-danger',
        requiresPermission: ɵ0$1,
        onClick: ɵ1$1,
    };
    var ɵ2$1 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateFacet) ||
        userPermissions.includes(i2.Permission.UpdateCatalog); }, ɵ3$1 = function (_b) {
        var injector = _b.injector;
        return i2.isMultiChannel(injector.get(i2.DataService));
    }, ɵ4$1 = function (_b) {
        var injector = _b.injector, selection = _b.selection, hostComponent = _b.hostComponent, clearSelection = _b.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        modalService
            .fromComponent(AssignToChannelDialogComponent, {
            size: 'md',
            locals: {},
        })
            .pipe(operators.switchMap(function (result) {
            if (result) {
                return dataService.facet
                    .assignFacetsToChannel({
                    facetIds: selection.map(function (f) { return f.id; }),
                    channelId: result.id,
                })
                    .pipe(operators.mapTo(result));
            }
            else {
                return rxjs.EMPTY;
            }
        }))
            .subscribe(function (result) {
            notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-facets-to-channel-success'), {
                count: selection.length,
                channelCode: result.code,
            });
            clearSelection();
        });
    };
    var assignFacetsToChannelBulkAction = {
        location: 'facet-list',
        label: ngxTranslateExtractMarker.marker('catalog.assign-to-channel'),
        icon: 'layers',
        requiresPermission: ɵ2$1,
        isVisible: ɵ3$1,
        onClick: ɵ4$1,
    };
    var ɵ5$1 = function (_b) {
        var injector = _b.injector;
        return i2.getChannelCodeFromUserStatus(injector.get(i2.DataService));
    }, ɵ6$1 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateFacet) ||
        userPermissions.includes(i2.Permission.UpdateCatalog); }, ɵ7$1 = function (_b) {
        var injector = _b.injector;
        return i2.currentChannelIsNotDefault(injector.get(i2.DataService));
    }, ɵ8$1 = function (_b) {
        var injector = _b.injector, selection = _b.selection, hostComponent = _b.hostComponent, clearSelection = _b.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        var activeChannelId$ = dataService.client
            .userStatus()
            .mapSingle(function (_b) {
            var userStatus = _b.userStatus;
            return userStatus.activeChannelId;
        });
        function showModalAndDelete(facetIds, message) {
            return modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
                translationVars: {
                    count: selection.length,
                },
                size: message ? 'lg' : 'md',
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    {
                        type: 'danger',
                        label: message ? ngxTranslateExtractMarker.marker('common.force-remove') : ngxTranslateExtractMarker.marker('common.remove'),
                        returnValue: true,
                    },
                ],
            })
                .pipe(operators.switchMap(function (res) { return res
                ? activeChannelId$.pipe(operators.switchMap(function (activeChannelId) { return activeChannelId
                    ? dataService.facet.removeFacetsFromChannel({
                        channelId: activeChannelId,
                        facetIds: facetIds,
                        force: !!message,
                    })
                    : rxjs.EMPTY; }), operators.map(function (res2) { return res2.removeFacetsFromChannel; }))
                : rxjs.EMPTY; }));
        }
        showModalAndDelete(unique.unique(selection.map(function (f) { return f.id; })))
            .pipe(operators.switchMap(function (result) {
            var e_2, _b;
            var _a;
            var removedCount = selection.length;
            var errors = [];
            var errorIds = [];
            var i = 0;
            try {
                for (var result_2 = __values(result), result_2_1 = result_2.next(); !result_2_1.done; result_2_1 = result_2.next()) {
                    var item = result_2_1.value;
                    if (item.__typename === 'FacetInUseError') {
                        errors.push(item.message);
                        errorIds.push((_a = selection[i]) === null || _a === void 0 ? void 0 : _a.id);
                        removedCount--;
                    }
                    i++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (result_2_1 && !result_2_1.done && (_b = result_2.return)) _b.call(result_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (0 < errorIds.length) {
                return showModalAndDelete(errorIds, errors.join('\n')).pipe(operators.map(function (result2) {
                    var notRemovedCount = result2.filter(function (r) { return r.__typename === 'FacetInUseError'; }).length;
                    return selection.length - notRemovedCount;
                }));
            }
            else {
                return rxjs.of(removedCount);
            }
        }), operators.switchMap(function (removedCount) { return removedCount
            ? i2.getChannelCodeFromUserStatus(dataService).then(function (_b) {
                var channelCode = _b.channelCode;
                return ({
                    channelCode: channelCode,
                    removedCount: removedCount,
                });
            })
            : rxjs.EMPTY; }))
            .subscribe(function (_b) {
            var removedCount = _b.removedCount, channelCode = _b.channelCode;
            if (removedCount) {
                hostComponent.refresh();
                clearSelection();
                notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-facets-from-channel-success'), {
                    count: removedCount,
                    channelCode: channelCode,
                });
            }
        });
    };
    var removeFacetsFromChannelBulkAction = {
        location: 'facet-list',
        label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
        getTranslationVars: ɵ5$1,
        icon: 'layers',
        iconClass: 'is-warning',
        requiresPermission: ɵ6$1,
        isVisible: ɵ7$1,
        onClick: ɵ8$1,
    };

    var DEFAULT_VARIANT_CODE = '__DEFAULT_VARIANT__';
    var GenerateProductVariantsComponent = /** @class */ (function () {
        function GenerateProductVariantsComponent(dataService) {
            this.dataService = dataService;
            this.variantsChange = new i0.EventEmitter();
            this.optionGroups = [];
            this.variantFormValues = {};
        }
        GenerateProductVariantsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.settings.getActiveChannel().single$.subscribe(function (data) {
                _this.currencyCode = data.activeChannel.currencyCode;
            });
            this.generateVariants();
        };
        GenerateProductVariantsComponent.prototype.addOption = function () {
            var _this = this;
            this.optionGroups.push({ name: '', values: [] });
            var index = this.optionGroups.length - 1;
            setTimeout(function () {
                var _a;
                var input = (_a = _this.groupNameInputs.get(index)) === null || _a === void 0 ? void 0 : _a.nativeElement;
                input === null || input === void 0 ? void 0 : input.focus();
            });
        };
        GenerateProductVariantsComponent.prototype.removeOption = function (name) {
            this.optionGroups = this.optionGroups.filter(function (g) { return g.name !== name; });
            this.generateVariants();
        };
        GenerateProductVariantsComponent.prototype.generateVariants = function () {
            var _this = this;
            var totalValuesCount = this.optionGroups.reduce(function (sum, group) { return sum + group.values.length; }, 0);
            var groups = totalValuesCount
                ? this.optionGroups.map(function (g) { return g.values.map(function (v) { return v.name; }); })
                : [[DEFAULT_VARIANT_CODE]];
            this.variants = sharedUtils.generateAllCombinations(groups).map(function (values) { return ({ id: values.join('|'), values: values }); });
            this.variants.forEach(function (variant) {
                if (!_this.variantFormValues[variant.id]) {
                    _this.variantFormValues[variant.id] = {
                        optionValues: variant.values,
                        enabled: true,
                        price: _this.copyFromDefault(variant.id, 'price', 0),
                        sku: _this.copyFromDefault(variant.id, 'sku', ''),
                        stock: _this.copyFromDefault(variant.id, 'stock', 0),
                    };
                }
            });
            this.onFormChange();
        };
        GenerateProductVariantsComponent.prototype.trackByFn = function (index, variant) {
            return variant.values.join('|');
        };
        GenerateProductVariantsComponent.prototype.handleEnter = function (event, optionValueInputComponent) {
            event.preventDefault();
            event.stopPropagation();
            optionValueInputComponent.focus();
        };
        GenerateProductVariantsComponent.prototype.onFormChange = function () {
            var _this = this;
            var variantsToCreate = this.variants.map(function (v) { return _this.variantFormValues[v.id]; }).filter(function (v) { return v.enabled; });
            this.variantsChange.emit({
                groups: this.optionGroups.map(function (og) { return ({ name: og.name, values: og.values.map(function (v) { return v.name; }) }); }),
                variants: variantsToCreate,
            });
        };
        GenerateProductVariantsComponent.prototype.copyFromDefault = function (variantId, prop, value) {
            return variantId !== DEFAULT_VARIANT_CODE
                ? this.variantFormValues[DEFAULT_VARIANT_CODE][prop]
                : value;
        };
        return GenerateProductVariantsComponent;
    }());
    GenerateProductVariantsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-generate-product-variants',
                    template: "<div *ngFor=\"let group of optionGroups\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input\n            #optionGroupName\n            placeholder=\"e.g. Size\"\n            clrInput\n            [(ngModel)]=\"group.name\"\n            name=\"name\"\n            required\n            (keydown.enter)=\"handleEnter($event, optionValueInputComponent)\"\n        />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [(ngModel)]=\"group.values\"\n            (ngModelChange)=\"generateVariants()\"\n            (edit)=\"generateVariants()\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n        ></vdr-option-value-input>\n    </div>\n    <div class=\"remove-group\">\n        <button\n            class=\"btn btn-icon btn-warning-outline\"\n            [title]=\"'catalog.remove-option' | translate\"\n            (click)=\"removeOption(group.name)\"\n        >\n            <clr-icon shape=\"trash\"></clr-icon>\n        </button>\n    </div>\n</div>\n<button class=\"btn btn-primary-outline btn-sm\" (click)=\"addOption()\">\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th *ngIf=\"1 < variants.length\">{{ 'common.create' | translate }}</th>\n                <th *ngIf=\"1 < variants.length\">{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n            </tr>\n        </thead>\n        <tr\n            *ngFor=\"let variant of variants; trackBy: trackByFn\"\n            [class.disabled]=\"!variantFormValues[variant.id].enabled\"\n        >\n            <td *ngIf=\"1 < variants.length\">\n                <input\n                    type=\"checkbox\"\n                    (change)=\"onFormChange()\"\n                    [(ngModel)]=\"variantFormValues[variant.id].enabled\"\n                    clrCheckbox\n                />\n            </td>\n            <td *ngIf=\"1 < variants.length\">\n                {{ variant.values.join(' ') }}\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        (change)=\"onFormChange()\"\n                        [(ngModel)]=\"variantFormValues[variant.id].sku\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <vdr-currency-input\n                        clrInput\n                        [(ngModel)]=\"variantFormValues[variant.id].price\"\n                        (ngModelChange)=\"onFormChange()\"\n                        [currencyCode]=\"currencyCode\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"number\"\n                        [(ngModel)]=\"variantFormValues[variant.id].stock\"\n                        (change)=\"onFormChange()\"\n                        min=\"0\"\n                        step=\"1\"\n                    />\n                </clr-input-container>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                    styles: [":host{display:block;margin-bottom:120px}.option-groups{display:flex}.values{flex:1;margin:0 6px}.remove-group{padding-top:18px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}\n"]
                },] }
    ];
    GenerateProductVariantsComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };
    GenerateProductVariantsComponent.propDecorators = {
        variantsChange: [{ type: i0.Output }],
        groupNameInputs: [{ type: i0.ViewChildren, args: ['optionGroupName', { read: i0.ElementRef },] }]
    };

    var OPTION_VALUE_INPUT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return OptionValueInputComponent; }),
        multi: true,
    };
    var OptionValueInputComponent = /** @class */ (function () {
        function OptionValueInputComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.groupName = '';
            this.add = new i0.EventEmitter();
            this.remove = new i0.EventEmitter();
            this.edit = new i0.EventEmitter();
            this.disabled = false;
            this.input = '';
            this.isFocussed = false;
            this.lastSelected = false;
            this.editingIndex = -1;
        }
        Object.defineProperty(OptionValueInputComponent.prototype, "optionValues", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.formValue) !== null && _a !== void 0 ? _a : this.options) !== null && _b !== void 0 ? _b : [];
            },
            enumerable: false,
            configurable: true
        });
        OptionValueInputComponent.prototype.registerOnChange = function (fn) {
            this.onChangeFn = fn;
        };
        OptionValueInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchFn = fn;
        };
        OptionValueInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.changeDetector.markForCheck();
        };
        OptionValueInputComponent.prototype.writeValue = function (obj) {
            this.formValue = obj || [];
        };
        OptionValueInputComponent.prototype.focus = function () {
            this.textArea.nativeElement.focus();
        };
        OptionValueInputComponent.prototype.editName = function (index, event) {
            var _a;
            var optionValue = this.optionValues[index];
            if (!optionValue.locked && !optionValue.id) {
                event.cancelBubble = true;
                this.editingIndex = index;
                var input_1 = (_a = this.nameInputs.get(index)) === null || _a === void 0 ? void 0 : _a.nativeElement;
                setTimeout(function () { return input_1 === null || input_1 === void 0 ? void 0 : input_1.focus(); });
            }
        };
        OptionValueInputComponent.prototype.updateOption = function (index, event) {
            var optionValue = this.optionValues[index];
            var newName = event.target.value;
            if (optionValue) {
                if (newName) {
                    optionValue.name = newName;
                    this.edit.emit({ index: index, option: optionValue });
                }
                this.editingIndex = -1;
            }
        };
        OptionValueInputComponent.prototype.removeOption = function (option) {
            var _a;
            if (!option.locked) {
                if (this.formValue) {
                    this.formValue = (_a = this.formValue) === null || _a === void 0 ? void 0 : _a.filter(function (o) { return o.name !== option.name; });
                    this.onChangeFn(this.formValue);
                }
                else {
                    this.remove.emit(option);
                }
            }
        };
        OptionValueInputComponent.prototype.handleKey = function (event) {
            switch (event.key) {
                case ',':
                case 'Enter':
                    this.addOptionValue();
                    event.preventDefault();
                    break;
                case 'Backspace':
                    if (this.lastSelected) {
                        this.removeLastOption();
                        this.lastSelected = false;
                    }
                    else if (this.input === '') {
                        this.lastSelected = true;
                    }
                    break;
                default:
                    this.lastSelected = false;
            }
        };
        OptionValueInputComponent.prototype.handleBlur = function () {
            this.isFocussed = false;
            this.addOptionValue();
        };
        OptionValueInputComponent.prototype.addOptionValue = function () {
            var e_1, _c;
            var _this = this;
            var options = this.parseInputIntoOptions(this.input).filter(function (option) {
                var _a;
                // do not add an option with the same name
                // as an existing option
                var existing = (_a = _this.options) !== null && _a !== void 0 ? _a : _this.formValue;
                return !(existing === null || existing === void 0 ? void 0 : existing.find(function (o) { return (o === null || o === void 0 ? void 0 : o.name) === option.name; }));
            });
            if (!this.formValue && this.options) {
                try {
                    for (var options_1 = __values(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
                        var option = options_1_1.value;
                        this.add.emit(option);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (options_1_1 && !options_1_1.done && (_c = options_1.return)) _c.call(options_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                this.formValue = unique.unique(__spreadArray(__spreadArray([], __read(this.formValue)), __read(options)));
                this.onChangeFn(this.formValue);
            }
            this.input = '';
        };
        OptionValueInputComponent.prototype.parseInputIntoOptions = function (input) {
            return input
                .split(/[,\n]/)
                .map(function (s) { return s.trim(); })
                .filter(function (s) { return s !== ''; })
                .map(function (s) { return ({ name: s, locked: false }); });
        };
        OptionValueInputComponent.prototype.removeLastOption = function () {
            if (this.optionValues.length) {
                var option = this.optionValues[this.optionValues.length - 1];
                this.removeOption(option);
            }
        };
        return OptionValueInputComponent;
    }());
    OptionValueInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-option-value-input',
                    template: "<div class=\"input-wrapper\" [class.focus]=\"isFocussed\" (click)=\"textArea.focus()\">\n    <div class=\"chips\" *ngIf=\"0 < optionValues.length\">\n        <vdr-chip\n            *ngFor=\"let option of optionValues; last as isLast; index as i\"\n            [icon]=\"option.locked ? 'lock' : 'times'\"\n            [class.selected]=\"isLast && lastSelected\"\n            [class.locked]=\"option.locked\"\n            [colorFrom]=\"groupName\"\n            (iconClick)=\"removeOption(option)\"\n        >\n            <span [hidden]=\"editingIndex !== i\">\n                <input\n                    #editNameInput\n                    type=\"text\"\n                    [ngModel]=\"option.name\"\n                    (blur)=\"updateOption(i, $event)\"\n                    (click)=\"$event.cancelBubble = true\"\n                />\n            </span>\n            <span\n                class=\"option-name\"\n                [class.editable]=\"!option.locked && !option.id\"\n                (click)=\"editName(i, $event)\" [hidden]=\"editingIndex === i\">{{ option.name }}</span>\n        </vdr-chip>\n    </div>\n    <textarea\n        #textArea\n        (keyup)=\"handleKey($event)\"\n        (focus)=\"isFocussed = true\"\n        (blur)=\"handleBlur()\"\n        [(ngModel)]=\"input\"\n        [disabled]=\"disabled\"\n    ></textarea>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    providers: [OPTION_VALUE_INPUT_VALUE_ACCESSOR],
                    styles: [".input-wrapper{background-color:#fff;border-radius:3px!important;border:1px solid var(--color-grey-300)!important;cursor:text}.input-wrapper.focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}.input-wrapper .chips{padding:5px}.input-wrapper textarea{border:none;width:100%;height:24px;margin-top:3px;padding:0 6px}.input-wrapper textarea:focus{outline:none}.input-wrapper textarea:disabled{background-color:var(--color-component-bg-100)}vdr-chip ::ng-deep .wrapper{margin:0 3px}vdr-chip.locked{opacity:.8}vdr-chip.selected ::ng-deep .wrapper{border-color:var(--color-warning-500)!important;box-shadow:0 0 1px 1px var(--color-warning-400);opacity:.6}vdr-chip .option-name.editable:hover{outline:1px solid var(--color-component-bg-300);outline-offset:1px;border-radius:1px}vdr-chip input{padding:0!important;margin-top:-2px;margin-bottom:-2px}\n"]
                },] }
    ];
    OptionValueInputComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    OptionValueInputComponent.propDecorators = {
        groupName: [{ type: i0.Input }],
        textArea: [{ type: i0.ViewChild, args: ['textArea', { static: true },] }],
        nameInputs: [{ type: i0.ViewChildren, args: ['editNameInput', { read: i0.ElementRef },] }],
        options: [{ type: i0.Input }],
        add: [{ type: i0.Output }],
        remove: [{ type: i0.Output }],
        edit: [{ type: i0.Output }],
        disabled: [{ type: i0.Input }]
    };

    var ɵ0 = function (userPermissions) { return userPermissions.includes(i2.Permission.DeleteProduct) ||
        userPermissions.includes(i2.Permission.DeleteCatalog); }, ɵ1 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        modalService
            .dialog({
            title: ngxTranslateExtractMarker.marker('catalog.confirm-bulk-delete-products'),
            translationVars: {
                count: selection.length,
            },
            buttons: [
                { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(operators.switchMap(function (response) { return response
            ? dataService.product.deleteProducts(unique.unique(selection.map(function (p) { return p.productId; })))
            : rxjs.EMPTY; }))
            .subscribe(function (result) {
            var e_1, _a;
            var deleted = 0;
            var errors = [];
            try {
                for (var _b = __values(result.deleteProducts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.result === i2.DeletionResult.DELETED) {
                        deleted++;
                    }
                    else if (item.message) {
                        errors.push(item.message);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (0 < deleted) {
                notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-bulk-delete-products-success'), {
                    count: deleted,
                });
            }
            if (0 < errors.length) {
                notificationService.error(errors.join('\n'));
            }
            hostComponent.refresh();
            clearSelection();
        });
    };
    var deleteProductsBulkAction = {
        location: 'product-list',
        label: ngxTranslateExtractMarker.marker('common.delete'),
        icon: 'trash',
        iconClass: 'is-danger',
        requiresPermission: ɵ0,
        onClick: ɵ1,
    };
    var ɵ2 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateCatalog) ||
        userPermissions.includes(i2.Permission.UpdateProduct); }, ɵ3 = function (_a) {
        var injector = _a.injector;
        return i2.isMultiChannel(injector.get(i2.DataService));
    }, ɵ4 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        modalService
            .fromComponent(AssignProductsToChannelDialogComponent, {
            size: 'lg',
            locals: {
                productIds: unique.unique(selection.map(function (p) { return p.productId; })),
                currentChannelIds: [],
            },
        })
            .subscribe(function (result) {
            if (result) {
                clearSelection();
            }
        });
    };
    var assignProductsToChannelBulkAction = {
        location: 'product-list',
        label: ngxTranslateExtractMarker.marker('catalog.assign-to-channel'),
        icon: 'layers',
        requiresPermission: ɵ2,
        isVisible: ɵ3,
        onClick: ɵ4,
    };
    var ɵ5 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateChannel) ||
        userPermissions.includes(i2.Permission.UpdateProduct); }, ɵ6 = function (_a) {
        var injector = _a.injector;
        return i2.getChannelCodeFromUserStatus(injector.get(i2.DataService));
    }, ɵ7 = function (_a) {
        var injector = _a.injector;
        return i2.currentChannelIsNotDefault(injector.get(i2.DataService));
    }, ɵ8 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        var activeChannelId$ = dataService.client
            .userStatus()
            .mapSingle(function (_a) {
            var userStatus = _a.userStatus;
            return userStatus.activeChannelId;
        });
        rxjs.from(i2.getChannelCodeFromUserStatus(injector.get(i2.DataService)))
            .pipe(operators.switchMap(function (_a) {
            var channelCode = _a.channelCode;
            return modalService.dialog({
                title: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
                translationVars: {
                    channelCode: channelCode,
                },
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    {
                        type: 'danger',
                        label: ngxTranslateExtractMarker.marker('common.remove'),
                        returnValue: true,
                    },
                ],
            });
        }), operators.switchMap(function (res) { return res
            ? activeChannelId$.pipe(operators.switchMap(function (activeChannelId) { return activeChannelId
                ? dataService.product.removeProductsFromChannel({
                    channelId: activeChannelId,
                    productIds: selection.map(function (p) { return p.productId; }),
                })
                : rxjs.EMPTY; }), operators.mapTo(true))
            : rxjs.of(false); }))
            .subscribe(function (removed) {
            if (removed) {
                clearSelection();
                notificationService.success(ngxTranslateExtractMarker.marker('common.notify-remove-products-from-channel-success'), {
                    count: selection.length,
                });
                setTimeout(function () { return hostComponent.refresh(); }, 1000);
            }
        });
    };
    var removeProductsFromChannelBulkAction = {
        location: 'product-list',
        label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'),
        requiresPermission: ɵ5,
        getTranslationVars: ɵ6,
        icon: 'layers',
        iconClass: 'is-warning',
        isVisible: ɵ7,
        onClick: ɵ8,
    };
    var ɵ9 = function (userPermissions) { return userPermissions.includes(i2.Permission.UpdateCatalog) ||
        userPermissions.includes(i2.Permission.UpdateProduct); }, ɵ10 = function (_a) {
        var injector = _a.injector, selection = _a.selection, hostComponent = _a.hostComponent, clearSelection = _a.clearSelection;
        var modalService = injector.get(i2.ModalService);
        var dataService = injector.get(i2.DataService);
        var notificationService = injector.get(i2.NotificationService);
        var mode = hostComponent.groupByProduct ? 'product' : 'variant';
        var ids = mode === 'product'
            ? unique.unique(selection.map(function (p) { return p.productId; }))
            : unique.unique(selection.map(function (p) { return p.productVariantId; }));
        return dataService.facet
            .getAllFacets()
            .mapSingle(function (data) { return data.facets.items; })
            .pipe(operators.switchMap(function (facets) { return modalService.fromComponent(BulkAddFacetValuesDialogComponent, {
            size: 'xl',
            locals: {
                facets: facets,
                mode: mode,
                ids: ids,
            },
        }); }))
            .subscribe(function (result) {
            if (result) {
                notificationService.success(ngxTranslateExtractMarker.marker('common.notify-bulk-update-success'), {
                    count: selection.length,
                    entity: mode === 'product' ? 'Products' : 'ProductVariants',
                });
                clearSelection();
            }
        });
    };
    var assignFacetValuesToProductsBulkAction = {
        location: 'product-list',
        label: ngxTranslateExtractMarker.marker('catalog.edit-facet-values'),
        icon: 'tag',
        requiresPermission: ɵ9,
        onClick: ɵ10,
    };

    var UpdateProductOptionDialogComponent = /** @class */ (function () {
        function UpdateProductOptionDialogComponent() {
            this.updateVariantName = true;
            this.codeInputTouched = false;
        }
        UpdateProductOptionDialogComponent.prototype.ngOnInit = function () {
            var e_1, _b;
            var _this = this;
            var _a;
            var currentTranslation = this.productOption.translations.find(function (t) { return t.languageCode === _this.activeLanguage; });
            this.name = (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '';
            this.code = this.productOption.code;
            this.customFieldsForm = new forms.FormGroup({});
            if (this.customFields) {
                var cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
                try {
                    for (var _c = __values(this.customFields), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var fieldDef = _d.value;
                        var key = fieldDef.name;
                        var value = fieldDef.type === 'localeString'
                            ? cfCurrentTranslation[key]
                            : this.productOption.customFields[key];
                        this.customFieldsForm.addControl(fieldDef.name, new forms.FormControl(value));
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
        UpdateProductOptionDialogComponent.prototype.update = function () {
            var result = i2.createUpdatedTranslatable({
                translatable: this.productOption,
                languageCode: this.activeLanguage,
                updatedFields: {
                    code: this.code,
                    name: this.name,
                    customFields: this.customFieldsForm.value,
                },
                customFieldConfig: this.customFields,
                defaultTranslation: {
                    languageCode: this.activeLanguage,
                    name: '',
                },
            });
            this.resolveWith(Object.assign(Object.assign({}, result), { autoUpdate: this.updateVariantName }));
        };
        UpdateProductOptionDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        UpdateProductOptionDialogComponent.prototype.updateCode = function (nameValue) {
            if (!this.codeInputTouched && !this.productOption.code) {
                this.code = normalizeString.normalizeString(nameValue, '-');
            }
        };
        return UpdateProductOptionDialogComponent;
    }());
    UpdateProductOptionDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-update-product-option-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'catalog.update-product-option' | translate }}</ng-template>\n<vdr-form-field [label]=\"'catalog.option-name' | translate\" for=\"name\">\n    <input\n        id=\"name\"\n        type=\"text\"\n        #nameInput=\"ngModel\"\n        [(ngModel)]=\"name\"\n        required\n        (input)=\"updateCode($event.target.value)\"\n    />\n</vdr-form-field>\n<vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n    <input id=\"code\" type=\"text\" #codeInput=\"ngModel\" required [(ngModel)]=\"code\" pattern=\"[a-z0-9_-]+\" />\n</vdr-form-field>\n<clr-checkbox-wrapper>\n    <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"updateVariantName\" />\n    <label>{{ 'catalog.auto-update-option-variant-name' | translate }}</label>\n</clr-checkbox-wrapper>\n<section *ngIf=\"customFields.length\">\n    <label>{{ 'common.custom-fields' | translate }}</label>\n    <vdr-tabbed-custom-fields\n        entityName=\"ProductOption\"\n        [customFields]=\"customFields\"\n        [customFieldsFormGroup]=\"customFieldsForm\"\n        [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n    ></vdr-tabbed-custom-fields>\n</section>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"update()\"\n        [disabled]=\"\n            nameInput.invalid ||\n            codeInput.invalid ||\n            (nameInput.pristine && codeInput.pristine && customFieldsForm.pristine)\n        \"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.update-product-option' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var ProductVariantsListComponent = /** @class */ (function () {
        function ProductVariantsListComponent(changeDetector, modalService, dataService) {
            this.changeDetector = changeDetector;
            this.modalService = modalService;
            this.dataService = dataService;
            this.assignToChannel = new i0.EventEmitter();
            this.removeFromChannel = new i0.EventEmitter();
            this.assetChange = new i0.EventEmitter();
            this.selectionChange = new i0.EventEmitter();
            this.selectFacetValueClick = new i0.EventEmitter();
            this.updateProductOption = new i0.EventEmitter();
            this.selectedVariantIds = [];
            this.formGroupMap = new Map();
            this.GlobalFlag = i2.GlobalFlag;
            this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
        }
        ProductVariantsListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.settings.getGlobalSettings('cache-first').single$.subscribe(function (_c) {
                var globalSettings = _c.globalSettings;
                _this.globalTrackInventory = globalSettings.trackInventory;
                _this.globalOutOfStockThreshold = globalSettings.outOfStockThreshold;
                _this.changeDetector.markForCheck();
            });
            this.subscription = this.formArray.valueChanges.subscribe(function () { return _this.changeDetector.markForCheck(); });
            this.subscription.add(this.formArray.valueChanges
                .pipe(operators.map(function (value) { return value.length; }), operators.debounceTime(1), operators.distinctUntilChanged())
                .subscribe(function () {
                _this.buildFormGroupMap();
            }));
            this.buildFormGroupMap();
        };
        ProductVariantsListComponent.prototype.ngOnChanges = function (changes) {
            if ('facets' in changes && !!changes['facets'].currentValue) {
                this.facetValues = i2.flattenFacetValues(this.facets);
            }
        };
        ProductVariantsListComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ProductVariantsListComponent.prototype.isDefaultChannel = function (channelCode) {
            return channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
        };
        ProductVariantsListComponent.prototype.trackById = function (index, item) {
            return item.id;
        };
        ProductVariantsListComponent.prototype.inventoryIsNotTracked = function (formGroup) {
            var _a;
            var trackInventory = (_a = formGroup.get('trackInventory')) === null || _a === void 0 ? void 0 : _a.value;
            return (trackInventory === i2.GlobalFlag.FALSE ||
                (trackInventory === i2.GlobalFlag.INHERIT && this.globalTrackInventory === false));
        };
        ProductVariantsListComponent.prototype.getTaxCategoryName = function (group) {
            var control = group.get(['taxCategoryId']);
            if (control && this.taxCategories) {
                var match = this.taxCategories.find(function (t) { return t.id === control.value; });
                return match ? match.name : '';
            }
            return '';
        };
        ProductVariantsListComponent.prototype.getStockOnHandMinValue = function (variant) {
            var _a, _b;
            var effectiveOutOfStockThreshold = ((_a = variant.get('useGlobalOutOfStockThreshold')) === null || _a === void 0 ? void 0 : _a.value)
                ? this.globalOutOfStockThreshold
                : (_b = variant.get('outOfStockThreshold')) === null || _b === void 0 ? void 0 : _b.value;
            return effectiveOutOfStockThreshold;
        };
        ProductVariantsListComponent.prototype.getSaleableStockLevel = function (variant) {
            var effectiveOutOfStockThreshold = variant.useGlobalOutOfStockThreshold
                ? this.globalOutOfStockThreshold
                : variant.outOfStockThreshold;
            return variant.stockOnHand - variant.stockAllocated - effectiveOutOfStockThreshold;
        };
        ProductVariantsListComponent.prototype.areAllSelected = function () {
            return !!this.variants && this.selectedVariantIds.length === this.variants.length;
        };
        ProductVariantsListComponent.prototype.onAssetChange = function (variantId, event) {
            this.assetChange.emit(Object.assign({ variantId: variantId }, event));
            var index = this.variants.findIndex(function (v) { return v.id === variantId; });
            this.formArray.at(index).markAsDirty();
        };
        ProductVariantsListComponent.prototype.toggleSelectAll = function () {
            if (this.areAllSelected()) {
                this.selectedVariantIds = [];
            }
            else {
                this.selectedVariantIds = this.variants.map(function (v) { return v.id; });
            }
            this.selectionChange.emit(this.selectedVariantIds);
        };
        ProductVariantsListComponent.prototype.toggleSelectVariant = function (variantId) {
            var index = this.selectedVariantIds.indexOf(variantId);
            if (-1 < index) {
                this.selectedVariantIds.splice(index, 1);
            }
            else {
                this.selectedVariantIds.push(variantId);
            }
            this.selectionChange.emit(this.selectedVariantIds);
        };
        ProductVariantsListComponent.prototype.optionGroupName = function (optionGroupId) {
            var _this = this;
            var _a;
            var group = this.optionGroups.find(function (g) { return g.id === optionGroupId; });
            if (group) {
                var translation = (_a = group === null || group === void 0 ? void 0 : group.translations.find(function (t) { return t.languageCode === _this.activeLanguage; })) !== null && _a !== void 0 ? _a : group.translations[0];
                return translation.name;
            }
        };
        ProductVariantsListComponent.prototype.optionName = function (option) {
            var _this = this;
            var _a;
            var translation = (_a = option.translations.find(function (t) { return t.languageCode === _this.activeLanguage; })) !== null && _a !== void 0 ? _a : option.translations[0];
            return translation.name;
        };
        ProductVariantsListComponent.prototype.pendingFacetValues = function (variant) {
            var _this = this;
            if (this.facets) {
                var formFacetValueIds = this.getFacetValueIds(variant.id);
                var variantFacetValueIds_1 = variant.facetValues.map(function (fv) { return fv.id; });
                return formFacetValueIds
                    .filter(function (x) { return !variantFacetValueIds_1.includes(x); })
                    .map(function (id) { return _this.facetValues.find(function (fv) { return fv.id === id; }); })
                    .filter(sharedUtils.notNullOrUndefined);
            }
            else {
                return [];
            }
        };
        ProductVariantsListComponent.prototype.existingFacetValues = function (variant) {
            var formFacetValueIds = this.getFacetValueIds(variant.id);
            var intersection = __spreadArray([], __read(formFacetValueIds)).filter(function (x) { return variant.facetValues.map(function (fv) { return fv.id; }).includes(x); });
            return intersection
                .map(function (id) { return variant.facetValues.find(function (fv) { return fv.id === id; }); })
                .filter(sharedUtils.notNullOrUndefined);
        };
        ProductVariantsListComponent.prototype.removeFacetValue = function (variant, facetValueId) {
            var formGroup = this.formGroupMap.get(variant.id);
            if (formGroup) {
                var newValue = formGroup.value.facetValueIds.filter(function (id) { return id !== facetValueId; });
                formGroup.patchValue({
                    facetValueIds: newValue,
                });
                formGroup.markAsDirty();
            }
        };
        ProductVariantsListComponent.prototype.isVariantSelected = function (variantId) {
            return -1 < this.selectedVariantIds.indexOf(variantId);
        };
        ProductVariantsListComponent.prototype.editOption = function (option) {
            var _this = this;
            this.modalService
                .fromComponent(UpdateProductOptionDialogComponent, {
                size: 'md',
                locals: {
                    productOption: option,
                    activeLanguage: this.activeLanguage,
                    customFields: this.customOptionFields,
                },
            })
                .subscribe(function (result) {
                if (result) {
                    _this.updateProductOption.emit(result);
                }
            });
        };
        ProductVariantsListComponent.prototype.buildFormGroupMap = function () {
            var e_1, _c;
            this.formGroupMap.clear();
            try {
                for (var _d = __values(this.formArray.controls), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var controlGroup = _e.value;
                    this.formGroupMap.set(controlGroup.value.id, controlGroup);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.changeDetector.markForCheck();
        };
        ProductVariantsListComponent.prototype.getFacetValueIds = function (id) {
            var _a;
            var formValue = (_a = this.formGroupMap.get(id)) === null || _a === void 0 ? void 0 : _a.value;
            return formValue.facetValueIds;
        };
        return ProductVariantsListComponent;
    }());
    ProductVariantsListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-list',
                    template: "<div class=\"variants-list\">\n    <div\n        class=\"variant-container card\"\n        *ngFor=\"\n            let variant of variants | paginate: paginationConfig || { itemsPerPage: 10, currentPage: 1 };\n            trackBy: trackById;\n            let i = index\n        \"\n        [class.disabled]=\"!formGroupMap.get(variant.id)?.get('enabled')?.value\"\n    >\n        <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n            <div class=\"card-block header-row\">\n                <div class=\"details\">\n                    <vdr-title-input class=\"sku\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"sku\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'catalog.sku' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                    <vdr-title-input class=\"name\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"name\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'common.name' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                </div>\n                <div class=\"right-controls\">\n                    <clr-toggle-wrapper *vdrIfPermissions=\"updatePermission\">\n                        <input type=\"checkbox\" clrToggle name=\"enabled\" formControlName=\"enabled\" />\n                        <label>{{ 'common.enabled' | translate }}</label>\n                    </clr-toggle-wrapper>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"variant-body\">\n                    <div class=\"assets\">\n                        <vdr-assets\n                            [compact]=\"true\"\n                            [assets]=\"pendingAssetChanges[variant.id]?.assets || variant.assets\"\n                            [featuredAsset]=\"\n                                pendingAssetChanges[variant.id]?.featuredAsset || variant.featuredAsset\n                            \"\n                            [updatePermissions]=\"updatePermission\"\n                            (change)=\"onAssetChange(variant.id, $event)\"\n                        ></vdr-assets>\n                    </div>\n                    <div class=\"variant-form-inputs\">\n                        <div class=\"standard-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <div class=\"tax-category\">\n                                    <clr-select-container\n                                        *vdrIfPermissions=\"updatePermission; else taxCategoryLabel\"\n                                    >\n                                        <label>{{ 'catalog.tax-category' | translate }}</label>\n                                        <select clrSelect name=\"options\" formControlName=\"taxCategoryId\">\n                                            <option\n                                                *ngFor=\"let taxCategory of taxCategories\"\n                                                [value]=\"taxCategory.id\"\n                                            >\n                                                {{ taxCategory.name }}\n                                            </option>\n                                        </select>\n                                    </clr-select-container>\n                                    <ng-template #taxCategoryLabel>\n                                        <label class=\"clr-control-label\">{{\n                                            'catalog.tax-category' | translate\n                                        }}</label>\n                                        <div class=\"tax-category-label\">\n                                            {{ getTaxCategoryName(formGroup) }}\n                                        </div>\n                                    </ng-template>\n                                </div>\n                                <div class=\"price\">\n                                    <clr-input-container>\n                                        <label>{{ 'catalog.price' | translate }}</label>\n                                        <vdr-currency-input\n                                            *ngIf=\"!channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"price\"\n                                        ></vdr-currency-input>\n                                        <vdr-currency-input\n                                            *ngIf=\"channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"priceWithTax\"\n                                        ></vdr-currency-input>\n                                    </clr-input-container>\n                                </div>\n                                <vdr-variant-price-detail\n                                    [price]=\"formGroup.get('price')!.value\"\n                                    [currencyCode]=\"variant.currencyCode\"\n                                    [priceIncludesTax]=\"channelPriceIncludesTax\"\n                                    [taxCategoryId]=\"formGroup.get('taxCategoryId')!.value\"\n                                ></vdr-variant-price-detail>\n                            </div>\n                            <div class=\"variant-form-input-row\">\n                                <clr-select-container *vdrIfPermissions=\"updatePermission\">\n                                    <label\n                                        >{{ 'catalog.track-inventory' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.track-inventory-tooltip' | translate\"\n                                        ></vdr-help-tooltip>\n                                    </label>\n                                    <select clrSelect name=\"options\" formControlName=\"trackInventory\">\n                                        <option [value]=\"GlobalFlag.TRUE\">\n                                            {{ 'catalog.track-inventory-true' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.FALSE\">\n                                            {{ 'catalog.track-inventory-false' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.INHERIT\">\n                                            {{ 'catalog.track-inventory-inherit' | translate }}\n                                        </option>\n                                    </select>\n                                </clr-select-container>\n                                <clr-input-container>\n                                    <label\n                                        >{{ 'catalog.stock-on-hand' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-on-hand-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <input\n                                        [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                        clrInput\n                                        type=\"number\"\n                                        [min]=\"getStockOnHandMinValue(formGroup)\"\n                                        step=\"1\"\n                                        formControlName=\"stockOnHand\"\n                                        [readonly]=\"!(updatePermission | hasPermission)\"\n                                        [vdrDisabled]=\"inventoryIsNotTracked(formGroup)\"\n                                    />\n                                </clr-input-container>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-allocated' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-allocated-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ variant.stockAllocated }}\n                                    </div>\n                                </div>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-saleable' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-saleable-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ getSaleableStockLevel(variant) }}\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"variant-form-input-row\">\n                                <div\n                                    class=\"out-of-stock-threshold-wrapper\"\n                                    [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                >\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.out-of-stock-threshold' | translate\n                                        }}<vdr-help-tooltip\n                                            [content]=\"'catalog.out-of-stock-threshold-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"flex\">\n                                        <clr-input-container>\n                                            <input\n                                                clrInput\n                                                type=\"number\"\n                                                [formControl]=\"formGroup.get('outOfStockThreshold')\"\n                                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                                [vdrDisabled]=\"\n                                                    formGroup.get('useGlobalOutOfStockThreshold')?.value !==\n                                                        false || inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                        </clr-input-container>\n                                        <clr-toggle-wrapper>\n                                            <input\n                                                type=\"checkbox\"\n                                                clrToggle\n                                                name=\"useGlobalOutOfStockThreshold\"\n                                                formControlName=\"useGlobalOutOfStockThreshold\"\n                                                [vdrDisabled]=\"\n                                                    !(updatePermission | hasPermission) ||\n                                                    inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                            <label\n                                                >{{ 'catalog.use-global-value' | translate }} ({{\n                                                    globalOutOfStockThreshold\n                                                }})</label\n                                            >\n                                        </clr-toggle-wrapper>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"custom-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                    <vdr-tabbed-custom-fields\n                                        entityName=\"ProductVariant\"\n                                        [customFields]=\"customFields\"\n                                        [compact]=\"true\"\n                                        [customFieldsFormGroup]=\"formGroup.get('customFields')\"\n                                        [readonly]=\"!(updatePermission | hasPermission)\"\n                                    ></vdr-tabbed-custom-fields>\n                                </section>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"options-facets\">\n                    <vdr-entity-info [entity]=\"variant\"></vdr-entity-info>\n                    <div *ngIf=\"variant.options.length\">\n                        <div class=\"options\">\n                            <vdr-chip\n                                *ngFor=\"let option of variant.options | sort: 'groupId'\"\n                                [colorFrom]=\"optionGroupName(option.groupId)\"\n                                [invert]=\"true\"\n                                (iconClick)=\"editOption(option)\"\n                                [icon]=\"(updatePermission | hasPermission) && 'pencil'\"\n                            >\n                                <span class=\"option-group-name\">{{ optionGroupName(option.groupId) }}</span>\n                                {{ optionName(option) }}\n                            </vdr-chip>\n                            <a [routerLink]=\"['./', 'options']\" class=\"btn btn-link btn-sm\"\n                                >{{ 'catalog.edit-options' | translate }}...</a\n                            >\n                        </div>\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <div class=\"facets\">\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of existingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of pendingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <button\n                            *vdrIfPermissions=\"updatePermission\"\n                            class=\"btn btn-sm btn-secondary\"\n                            (click)=\"selectFacetValueClick.emit([variant.id])\"\n                        >\n                            <clr-icon shape=\"plus\"></clr-icon>\n                            {{ 'catalog.add-facets' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <ng-container *vdrIfMultichannel>\n                <div class=\"card-block\" *vdrIfDefaultChannelActive>\n                    <div class=\"flex channel-assignment\">\n                        <ng-container *ngFor=\"let channel of variant.channels\">\n                            <vdr-chip\n                                *ngIf=\"!isDefaultChannel(channel.code)\"\n                                icon=\"times-circle\"\n                                [title]=\"'catalog.remove-from-channel' | translate: { channelCode: channel.code }\"\n                                (iconClick)=\"\n                                    removeFromChannel.emit({ channelId: channel.id, variant: variant })\n                                \"\n                            >\n                                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                                {{ channel.code | channelCodeToLabel }}\n                            </vdr-chip>\n                        </ng-container>\n                        <button class=\"btn btn-sm\" (click)=\"assignToChannel.emit(variant)\">\n                            <clr-icon shape=\"layers\"></clr-icon>\n                            {{ 'catalog.assign-to-channel' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </ng-container>\n        </ng-container>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".with-selected{display:flex;min-height:52px;align-items:center;border:1px solid var(--color-component-border-100);border-radius:3px;padding:6px 18px}.with-selected vdr-select-toggle{margin-right:12px}.with-selected>label{margin-right:12px}.variant-container{transition:background-color .2s;min-height:330px}.variant-container.disabled{background-color:var(--color-component-bg-200)}.variant-container .header-row{display:flex;align-items:center;flex-wrap:wrap}.variant-container .variant-body{display:flex;flex-direction:column}@media screen and (min-width: 768px){.variant-container .variant-body{flex-direction:row}}.variant-container .details{display:flex;flex-direction:column;flex:1;margin-right:12px}@media screen and (min-width: 768px){.variant-container .details{flex-direction:row;height:36px}}.variant-container .details .name{flex:1}.variant-container .details .name ::ng-deep .clr-control-container{width:100%}.variant-container .details .name ::ng-deep .clr-control-container input.clr-input{min-width:100%}.variant-container .details .sku{width:160px;margin-right:20px;flex:0}.variant-container .details ::ng-deep .name input{min-width:300px}.variant-container .right-controls{display:flex}.variant-container .tax-category-label{margin-top:3px}.variant-container .variant-form-inputs{flex:1;display:flex;flex-direction:column}@media screen and (min-width: 768px){.variant-container .variant-form-inputs{flex-direction:row}}.variant-container .variant-form-input-row{display:flex;flex-wrap:wrap}@media screen and (min-width: 768px){.variant-container .variant-form-input-row{margin:0 6px 8px 24px}}.variant-container .variant-form-input-row>*{margin-right:24px;margin-bottom:24px}.variant-container .track-inventory-toggle{margin-top:22px}.variant-container .clr-form-control{margin-top:0}.variant-container .facets{display:flex;flex-wrap:wrap;align-items:center}.variant-container .pricing{display:flex}.variant-container .pricing>div{margin-right:12px}.variant-container .option-group-name{color:var(--color-text-200);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}.variant-container .options-facets{display:flex;color:var(--color-grey-400)}.variant-container ::ng-deep .clr-control-container{width:100%}.channel-assignment{justify-content:flex-end;flex-wrap:wrap;max-height:110px;overflow-y:auto}.channel-assignment .btn{margin:6px 12px 6px 0}.out-of-stock-threshold-wrapper{display:flex;flex-direction:column}.out-of-stock-threshold-wrapper clr-toggle-wrapper{margin-left:24px}.inventory-untracked{opacity:.5}\n"]
                },] }
    ];
    ProductVariantsListComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i2.ModalService },
        { type: i2.DataService }
    ]; };
    ProductVariantsListComponent.propDecorators = {
        formArray: [{ type: i0.Input, args: ['productVariantsFormArray',] }],
        variants: [{ type: i0.Input }],
        paginationConfig: [{ type: i0.Input }],
        channelPriceIncludesTax: [{ type: i0.Input }],
        taxCategories: [{ type: i0.Input }],
        facets: [{ type: i0.Input }],
        optionGroups: [{ type: i0.Input }],
        customFields: [{ type: i0.Input }],
        customOptionFields: [{ type: i0.Input }],
        activeLanguage: [{ type: i0.Input }],
        pendingAssetChanges: [{ type: i0.Input }],
        assignToChannel: [{ type: i0.Output }],
        removeFromChannel: [{ type: i0.Output }],
        assetChange: [{ type: i0.Output }],
        selectionChange: [{ type: i0.Output }],
        selectFacetValueClick: [{ type: i0.Output }],
        updateProductOption: [{ type: i0.Output }]
    };

    var ProductVariantsTableComponent = /** @class */ (function () {
        function ProductVariantsTableComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.formGroupMap = new Map();
            this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
        }
        ProductVariantsTableComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.formArray.valueChanges
                .pipe(operators.map(function (value) { return value.length; }), operators.debounceTime(1), operators.distinctUntilChanged())
                .subscribe(function () {
                _this.buildFormGroupMap();
            });
            this.buildFormGroupMap();
        };
        ProductVariantsTableComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ProductVariantsTableComponent.prototype.trackByFn = function (index, item) {
            if (item.id != null) {
                return item.id;
            }
            else {
                return index;
            }
        };
        ProductVariantsTableComponent.prototype.getFeaturedAsset = function (variant) {
            var _a;
            return ((_a = this.pendingAssetChanges[variant.id]) === null || _a === void 0 ? void 0 : _a.featuredAsset) || variant.featuredAsset;
        };
        ProductVariantsTableComponent.prototype.optionGroupName = function (optionGroupId) {
            var group = this.optionGroups.find(function (g) { return g.id === optionGroupId; });
            return group && group.name;
        };
        ProductVariantsTableComponent.prototype.buildFormGroupMap = function () {
            var e_1, _b;
            this.formGroupMap.clear();
            try {
                for (var _c = __values(this.formArray.controls), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var controlGroup = _d.value;
                    this.formGroupMap.set(controlGroup.value.id, controlGroup);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.changeDetector.markForCheck();
        };
        return ProductVariantsTableComponent;
    }());
    ProductVariantsTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-table',
                    template: "<table class=\"table\">\n    <thead>\n        <tr>\n            <th></th>\n            <th>{{ 'common.name' | translate }}</th>\n            <th>{{ 'catalog.sku' | translate }}</th>\n            <ng-container *ngFor=\"let optionGroup of optionGroups | sort: 'id'\">\n                <th>{{ optionGroup.name }}</th>\n            </ng-container>\n            <th>{{ 'catalog.price' | translate }}</th>\n            <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n            <th>{{ 'common.enabled' | translate }}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let variant of variants | paginate: paginationConfig; index as i; trackBy: trackByFn\">\n            <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n                <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <div class=\"card-img\">\n                        <div class=\"featured-asset\">\n                            <img\n                                *ngIf=\"getFeaturedAsset(variant) as featuredAsset; else placeholder\"\n                                [src]=\"featuredAsset | assetPreview: 'tiny'\"\n                            />\n                            <ng-template #placeholder>\n                                <div class=\"placeholder\">\n                                    <clr-icon shape=\"image\" size=\"48\"></clr-icon>\n                                </div>\n                            </ng-template>\n                        </div>\n                    </div>\n                </td>\n                <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <clr-input-container>\n                        <input\n                            clrInput\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            [placeholder]=\"'common.name' | translate\"\n                        />\n                    </clr-input-container>\n                </td>\n                <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <clr-input-container>\n                        <input\n                            clrInput\n                            type=\"text\"\n                            formControlName=\"sku\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            [placeholder]=\"'catalog.sku' | translate\"\n                        />\n                    </clr-input-container>\n                </td>\n                <ng-container *ngFor=\"let option of variant.options | sort: 'groupId'\">\n                    <td\n                        class=\"left align-middle\"\n                        [class.disabled]=\"!formGroup.get('enabled')!.value\"\n                        [style.color]=\"optionGroupName(option.groupId) | stringToColor\"\n                    >\n                        {{ option.name }}\n                    </td>\n                </ng-container>\n                <td class=\"left align-middle price\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <clr-input-container>\n                        <vdr-currency-input\n                            *ngIf=\"!channelPriceIncludesTax\"\n                            clrInput\n                            [currencyCode]=\"variant.currencyCode\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            formControlName=\"price\"\n                        ></vdr-currency-input>\n                        <vdr-currency-input\n                            *ngIf=\"channelPriceIncludesTax\"\n                            clrInput\n                            [currencyCode]=\"variant.currencyCode\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            formControlName=\"priceWithTax\"\n                        ></vdr-currency-input>\n                    </clr-input-container>\n                </td>\n                <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <clr-input-container>\n                        <input\n                            clrInput\n                            type=\"number\"\n                            min=\"0\"\n                            step=\"1\"\n                            formControlName=\"stockOnHand\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                        />\n                    </clr-input-container>\n                </td>\n                <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                    <clr-toggle-wrapper>\n                        <input\n                            type=\"checkbox\"\n                            clrToggle\n                            name=\"enabled\"\n                            formControlName=\"enabled\"\n                            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                        />\n                    </clr-toggle-wrapper>\n                </td>\n            </ng-container>\n        </tr>\n    </tbody>\n</table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".placeholder{color:var(--color-grey-300)}.stock input,.price input{max-width:96px}td{transition:background-color .2s}td.disabled{background-color:var(--color-component-bg-200)}\n"]
                },] }
    ];
    ProductVariantsTableComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    ProductVariantsTableComponent.propDecorators = {
        formArray: [{ type: i0.Input, args: ['productVariantsFormArray',] }],
        variants: [{ type: i0.Input }],
        paginationConfig: [{ type: i0.Input }],
        channelPriceIncludesTax: [{ type: i0.Input }],
        optionGroups: [{ type: i0.Input }],
        pendingAssetChanges: [{ type: i0.Input }]
    };

    var VariantPriceDetailComponent = /** @class */ (function () {
        function VariantPriceDetailComponent(dataService) {
            this.dataService = dataService;
            this.priceChange$ = new rxjs.BehaviorSubject(0);
            this.taxCategoryIdChange$ = new rxjs.BehaviorSubject('');
        }
        VariantPriceDetailComponent.prototype.ngOnInit = function () {
            var taxRates$ = this.dataService.settings
                .getTaxRatesSimple(999, 0, 'cache-first')
                .mapStream(function (data) { return data.taxRates.items; });
            var activeChannel$ = this.dataService.settings
                .getActiveChannel('cache-first')
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.activeChannel; });
            this.taxRate$ = rxjs.combineLatest(activeChannel$, taxRates$, this.taxCategoryIdChange$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 3), channel = _b[0], taxRates = _b[1], taxCategoryId = _b[2];
                var defaultTaxZone = channel.defaultTaxZone;
                if (!defaultTaxZone) {
                    return 0;
                }
                var applicableRate = taxRates.find(function (taxRate) { return taxRate.zone.id === defaultTaxZone.id && taxRate.category.id === taxCategoryId; });
                if (!applicableRate) {
                    return 0;
                }
                return applicableRate.value;
            }));
            this.grossPrice$ = rxjs.combineLatest(this.taxRate$, this.priceChange$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), taxRate = _b[0], price = _b[1];
                return Math.round(price * ((100 + taxRate) / 100));
            }));
        };
        VariantPriceDetailComponent.prototype.ngOnChanges = function (changes) {
            if ('price' in changes) {
                this.priceChange$.next(changes.price.currentValue);
            }
            if ('taxCategoryId' in changes) {
                this.taxCategoryIdChange$.next(changes.taxCategoryId.currentValue);
            }
        };
        return VariantPriceDetailComponent;
    }());
    VariantPriceDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-variant-price-detail',
                    template: "<label class=\"clr-control-label\">{{ 'catalog.taxes' | translate }}</label>\n<div *ngIf=\"priceIncludesTax\" class=\"value\">\n    {{ 'catalog.price-includes-tax-at' | translate: { rate: taxRate$ | async } }}\n</div>\n<div *ngIf=\"!priceIncludesTax\" class=\"value\">\n    {{\n        'catalog.price-with-tax-in-default-zone'\n            | translate: { price: grossPrice$ | async | localeCurrency: currencyCode, rate: taxRate$ | async }\n    }}\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column}.value{margin-top:3px}\n"]
                },] }
    ];
    VariantPriceDetailComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };
    VariantPriceDetailComponent.propDecorators = {
        priceIncludesTax: [{ type: i0.Input }],
        price: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        taxCategoryId: [{ type: i0.Input }]
    };

    var CATALOG_COMPONENTS = [
        ProductListComponent,
        ProductDetailComponent,
        FacetListComponent,
        FacetDetailComponent,
        GenerateProductVariantsComponent,
        ProductVariantsListComponent,
        ApplyFacetDialogComponent,
        AssetListComponent,
        AssetsComponent,
        VariantPriceDetailComponent,
        CollectionListComponent,
        CollectionDetailComponent,
        CollectionTreeComponent,
        CollectionTreeNodeComponent,
        CollectionContentsComponent,
        ProductVariantsTableComponent,
        OptionValueInputComponent,
        UpdateProductOptionDialogComponent,
        ProductVariantsEditorComponent,
        AssignProductsToChannelDialogComponent,
        AssetDetailComponent,
        ConfirmVariantDeletionDialogComponent,
        ProductOptionsEditorComponent,
        BulkAddFacetValuesDialogComponent,
        AssignToChannelDialogComponent,
    ];
    var CatalogModule = /** @class */ (function () {
        function CatalogModule(bulkActionRegistryService) {
            this.bulkActionRegistryService = bulkActionRegistryService;
            bulkActionRegistryService.registerBulkAction(assignFacetValuesToProductsBulkAction);
            bulkActionRegistryService.registerBulkAction(assignProductsToChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(removeProductsFromChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(deleteProductsBulkAction);
            bulkActionRegistryService.registerBulkAction(assignFacetsToChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(removeFacetsFromChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(deleteFacetsBulkAction);
            bulkActionRegistryService.registerBulkAction(assignCollectionsToChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(removeCollectionsFromChannelBulkAction);
            bulkActionRegistryService.registerBulkAction(deleteCollectionsBulkAction);
        }
        return CatalogModule;
    }());
    CatalogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(catalogRoutes)],
                    exports: __spreadArray([], __read(CATALOG_COMPONENTS)),
                    declarations: __spreadArray([], __read(CATALOG_COMPONENTS)),
                },] }
    ];
    CatalogModule.ctorParameters = function () { return [
        { type: i2.BulkActionRegistryService }
    ]; };

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ApplyFacetDialogComponent = ApplyFacetDialogComponent;
    exports.AssetDetailComponent = AssetDetailComponent;
    exports.AssetListComponent = AssetListComponent;
    exports.AssetResolver = AssetResolver;
    exports.AssetsComponent = AssetsComponent;
    exports.AssignProductsToChannelDialogComponent = AssignProductsToChannelDialogComponent;
    exports.AssignToChannelDialogComponent = AssignToChannelDialogComponent;
    exports.BulkAddFacetValuesDialogComponent = BulkAddFacetValuesDialogComponent;
    exports.CatalogModule = CatalogModule;
    exports.CollectionContentsComponent = CollectionContentsComponent;
    exports.CollectionDetailComponent = CollectionDetailComponent;
    exports.CollectionListComponent = CollectionListComponent;
    exports.CollectionResolver = CollectionResolver;
    exports.CollectionTreeComponent = CollectionTreeComponent;
    exports.CollectionTreeNodeComponent = CollectionTreeNodeComponent;
    exports.ConfirmVariantDeletionDialogComponent = ConfirmVariantDeletionDialogComponent;
    exports.FacetDetailComponent = FacetDetailComponent;
    exports.FacetListComponent = FacetListComponent;
    exports.FacetResolver = FacetResolver;
    exports.GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS = GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS;
    exports.GET_VARIANTS_WITH_FACET_VALUES_BY_IDS = GET_VARIANTS_WITH_FACET_VALUES_BY_IDS;
    exports.GenerateProductVariantsComponent = GenerateProductVariantsComponent;
    exports.GeneratedVariant = GeneratedVariant;
    exports.OPTION_VALUE_INPUT_VALUE_ACCESSOR = OPTION_VALUE_INPUT_VALUE_ACCESSOR;
    exports.OptionValueInputComponent = OptionValueInputComponent;
    exports.ProductDetailComponent = ProductDetailComponent;
    exports.ProductDetailService = ProductDetailService;
    exports.ProductListComponent = ProductListComponent;
    exports.ProductOptionsEditorComponent = ProductOptionsEditorComponent;
    exports.ProductResolver = ProductResolver;
    exports.ProductVariantsEditorComponent = ProductVariantsEditorComponent;
    exports.ProductVariantsListComponent = ProductVariantsListComponent;
    exports.ProductVariantsResolver = ProductVariantsResolver;
    exports.ProductVariantsTableComponent = ProductVariantsTableComponent;
    exports.UPDATE_PRODUCTS_BULK = UPDATE_PRODUCTS_BULK;
    exports.UPDATE_VARIANTS_BULK = UPDATE_VARIANTS_BULK;
    exports.UpdateProductOptionDialogComponent = UpdateProductOptionDialogComponent;
    exports.VariantPriceDetailComponent = VariantPriceDetailComponent;
    exports.arrayToTree = arrayToTree;
    exports.assetBreadcrumb = assetBreadcrumb;
    exports.assignCollectionsToChannelBulkAction = assignCollectionsToChannelBulkAction;
    exports.assignFacetValuesToProductsBulkAction = assignFacetValuesToProductsBulkAction;
    exports.assignFacetsToChannelBulkAction = assignFacetsToChannelBulkAction;
    exports.assignProductsToChannelBulkAction = assignProductsToChannelBulkAction;
    exports.catalogRoutes = catalogRoutes;
    exports.collectionBreadcrumb = collectionBreadcrumb;
    exports.deleteCollectionsBulkAction = deleteCollectionsBulkAction;
    exports.deleteFacetsBulkAction = deleteFacetsBulkAction;
    exports.deleteProductsBulkAction = deleteProductsBulkAction;
    exports.facetBreadcrumb = facetBreadcrumb;
    exports.productBreadcrumb = productBreadcrumb;
    exports.productOptionsEditorBreadcrumb = productOptionsEditorBreadcrumb;
    exports.productVariantEditorBreadcrumb = productVariantEditorBreadcrumb;
    exports.removeCollectionsFromChannelBulkAction = removeCollectionsFromChannelBulkAction;
    exports.removeFacetsFromChannelBulkAction = removeFacetsFromChannelBulkAction;
    exports.removeProductsFromChannelBulkAction = removeProductsFromChannelBulkAction;
    exports.replaceLast = replaceLast;
    exports.ɵ10 = ɵ10;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-catalog.umd.js.map

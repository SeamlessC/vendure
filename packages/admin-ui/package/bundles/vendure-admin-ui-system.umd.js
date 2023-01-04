(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@vendure/admin-ui/core'), require('@angular/forms'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('@biesbjerg/ngx-translate-extract-marker')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/system', ['exports', '@angular/core', '@vendure/admin-ui/core', '@angular/forms', '@angular/router', 'rxjs', 'rxjs/operators', '@biesbjerg/ngx-translate-extract-marker'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].system = {}), global.ng.core, global.vendure['admin-ui'].core, global.ng.forms, global.ng.router, global.rxjs, global.rxjs.operators, global.ngxTranslateExtractMarker));
}(this, (function (exports, core, core$1, forms, router, rxjs, operators, ngxTranslateExtractMarker) { 'use strict';

    var HealthCheckComponent = /** @class */ (function () {
        function HealthCheckComponent(healthCheckService) {
            this.healthCheckService = healthCheckService;
        }
        return HealthCheckComponent;
    }());
    HealthCheckComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-health-check',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"system-status-header\" *ngIf=\"healthCheckService.status$ | async as status\">\n            <div class=\"status-icon\">\n                <clr-icon\n                    [attr.shape]=\"status === 'ok' ? 'check-circle' : 'exclamation-circle'\"\n                    [ngClass]=\"{ 'is-success': status === 'ok', 'is-danger': status !== 'ok' }\"\n                    size=\"48\"\n                ></clr-icon>\n            </div>\n            <div class=\"status-detail\">\n                <ng-container *ngIf=\"status === 'ok'; else error\">\n                    {{ 'system.health-all-systems-up' | translate }}\n                </ng-container>\n                <ng-template #error>\n                    {{ 'system.health-error' | translate }}\n                </ng-template>\n                <div class=\"last-checked\">\n                    {{ 'system.health-last-checked' | translate }}:\n                    {{ healthCheckService.lastCheck$ | async | localeDate: 'mediumTime' }}\n                </div>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"system-status\"></vdr-action-bar-items>\n        <button class=\"btn btn-secondary\" (click)=\"healthCheckService.refresh()\">\n            <clr-icon shape=\"refresh\"></clr-icon> {{ 'system.health-refresh' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<table class=\"table\">\n    <thead>\n        <tr>\n            <th class=\"left\">\n                {{ 'common.name' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-status' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-message' | translate }}\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of healthCheckService.details$ | async\">\n            <td class=\"align-middle left\">{{ row.key }}</td>\n            <td class=\"align-middle left\">\n                <vdr-chip [colorType]=\"row.result.status === 'up' ? 'success' : 'error'\">\n                    <ng-container *ngIf=\"row.result.status === 'up'; else down\">\n                        <clr-icon shape=\"check-circle\"></clr-icon>\n                        {{ 'system.health-status-up' | translate }}\n                    </ng-container>\n                    <ng-template #down>\n                        <clr-icon shape=\"exclamation-circle\"></clr-icon>\n                        {{ 'system.health-status-down' | translate }}\n                    </ng-template>\n                </vdr-chip>\n            </td>\n            <td class=\"align-middle left\">{{ row.result.message }}</td>\n        </tr>\n    </tbody>\n</table>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".system-status-header{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header .status-detail{font-weight:bold;margin-right:6px}.system-status-header .last-checked{font-weight:normal;color:var(--color-grey-500)}\n"]
                },] }
    ];
    HealthCheckComponent.ctorParameters = function () { return [
        { type: core$1.HealthCheckService }
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

    var JobListComponent = /** @class */ (function (_super) {
        __extends(JobListComponent, _super);
        function JobListComponent(dataService, modalService, notificationService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.liveUpdate = new forms.FormControl(true);
            _this.hideSettled = new forms.FormControl(true);
            _this.queueFilter = new forms.FormControl('all');
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.settings).getAllJobs.apply(_a, __spreadArray([], __read(args)));
            }, function (data) { return data.jobs; }, function (skip, take) {
                var queueFilter = _this.queueFilter.value === 'all' ? null : { queueName: { eq: _this.queueFilter.value } };
                var hideSettled = _this.hideSettled.value;
                return {
                    options: {
                        skip: skip,
                        take: take,
                        filter: Object.assign(Object.assign({}, queueFilter), (hideSettled ? { isSettled: { eq: false } } : {})),
                        sort: {
                            createdAt: core$1.SortOrder.DESC,
                        },
                    },
                };
            });
            return _this;
        }
        JobListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            rxjs.timer(5000, 2000)
                .pipe(operators.takeUntil(this.destroy$), operators.filter(function () { return _this.liveUpdate.value; }))
                .subscribe(function () {
                _this.refresh();
            });
            this.queues$ = this.dataService.settings
                .getJobQueues()
                .mapStream(function (res) { return res.jobQueues; })
                .pipe(operators.map(function (queues) {
                return __spreadArray([{ name: 'all', running: true }], __read(queues));
            }));
        };
        JobListComponent.prototype.hasResult = function (job) {
            var result = job.result;
            if (result == null) {
                return false;
            }
            if (typeof result === 'object') {
                return Object.keys(result).length > 0;
            }
            return true;
        };
        JobListComponent.prototype.cancelJob = function (id) {
            var _this = this;
            this.dataService.settings.cancelJob(id).subscribe(function () { return _this.refresh(); });
        };
        return JobListComponent;
    }(core$1.BaseListComponent));
    JobListComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-job-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <clr-checkbox-container>\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [formControl]=\"liveUpdate\" name=\"live-update\"/>\n                <label>{{ 'common.live-update' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <clr-checkbox-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    [formControl]=\"hideSettled\"\n                    name=\"hide-settled\"\n                    (change)=\"refresh()\"\n                />\n                <label>{{ 'system.hide-settled-jobs' | translate }}</label>\n            </clr-checkbox-wrapper>\n        </clr-checkbox-container>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <ng-select\n            [addTag]=\"false\"\n            [items]=\"queues$ | async\"\n            [hideSelected]=\"true\"\n            [multiple]=\"false\"\n            [markFirst]=\"false\"\n            [clearable]=\"false\"\n            [searchable]=\"false\"\n            bindValue=\"name\"\n            [formControl]=\"queueFilter\"\n            (change)=\"refresh()\"\n        >\n            <ng-template ng-label-tmp ng-option-tmp let-item=\"item\">\n                <ng-container *ngIf=\"item.name === 'all'; else others\">\n                    {{ 'system.all-job-queues' | translate }}\n                </ng-container>\n                <ng-template #others>\n                    <vdr-chip [colorFrom]=\"item.name\">{{ item.name }}</vdr-chip>\n                </ng-template>\n            </ng-template>\n        </ng-select>\n        <vdr-action-bar-items locationId=\"job-list\"></vdr-action-bar-items>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-queue-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.created-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-duration' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-result' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-job=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-entity-info [entity]=\"job\"></vdr-entity-info>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-dropdown *ngIf=\"job.data\">\n                <button\n                    class=\"btn btn-link btn-icon\"\n                    vdrDropdownTrigger\n                    [title]=\"'system.job-data' | translate\"\n                >\n                    <clr-icon shape=\"details\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        <vdr-object-tree [value]=\"job.data\"></vdr-object-tree>\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n            <vdr-chip [colorFrom]=\"job.queueName\">{{ job.queueName }}</vdr-chip>\n        </td>\n\n        <td class=\"left align-middle\">{{ job.createdAt | timeAgo }}</td>\n        <td class=\"left align-middle\">\n            <vdr-job-state-label [job]=\"job\"></vdr-job-state-label>\n            <div *ngIf=\"job.state === 'FAILED'\" class=\"retry-info\">\n                after {{ job.attempts }} attempts\n            </div>\n            <div *ngIf=\"job.state === 'RUNNING' || job.state === 'RETRYING'\"  class=\"retry-info\">\n                attempting {{ job.attempts + 1 }} of {{ job.retries }}\n            </div>\n        </td>\n        <td class=\"left align-middle\">{{ job.duration | duration }}</td>\n        <td class=\"left align-middle\">\n            <vdr-dropdown *ngIf=\"hasResult(job)\">\n                <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"details\"></clr-icon>\n                    {{ 'system.job-result' | translate }}\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        <vdr-object-tree [value]=\"job.result\"></vdr-object-tree>\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n            <vdr-dropdown *ngIf=\"job.error\">\n                <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"exclamation-circle\"></clr-icon>\n                    {{ 'system.job-error' | translate }}\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        {{ job.error }}\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown *ngIf=\"!job.isSettled && job.state !== 'FAILED'\">\n                <button class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"cancelJob(job.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteSystem'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"ban\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.cancel' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".result-detail{margin:0 12px}.retry-info{margin-left:6px;color:var(--color-grey-400)}\n"]
                },] }
    ];
    JobListComponent.ctorParameters = function () { return [
        { type: core$1.DataService },
        { type: core$1.ModalService },
        { type: core$1.NotificationService },
        { type: router.Router },
        { type: router.ActivatedRoute }
    ]; };

    var JobStateLabelComponent = /** @class */ (function () {
        function JobStateLabelComponent() {
        }
        Object.defineProperty(JobStateLabelComponent.prototype, "iconShape", {
            get: function () {
                switch (this.job.state) {
                    case core$1.JobState.COMPLETED:
                        return 'check-circle';
                    case core$1.JobState.FAILED:
                        return 'exclamation-circle';
                    case core$1.JobState.CANCELLED:
                        return 'ban';
                    case core$1.JobState.PENDING:
                    case core$1.JobState.RETRYING:
                        return 'hourglass';
                    case core$1.JobState.RUNNING:
                        return 'sync';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JobStateLabelComponent.prototype, "colorType", {
            get: function () {
                switch (this.job.state) {
                    case core$1.JobState.COMPLETED:
                        return 'success';
                    case core$1.JobState.FAILED:
                    case core$1.JobState.CANCELLED:
                        return 'error';
                    case core$1.JobState.PENDING:
                    case core$1.JobState.RETRYING:
                        return '';
                    case core$1.JobState.RUNNING:
                        return 'warning';
                }
            },
            enumerable: false,
            configurable: true
        });
        return JobStateLabelComponent;
    }());
    JobStateLabelComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-job-state-label',
                    template: "<vdr-chip [colorType]=\"colorType\">\n    <clr-icon [attr.shape]=\"iconShape\" class=\"mr1\"></clr-icon>\n    {{ job.state | titlecase }}\n    <span *ngIf=\"job.state === 'RUNNING'\" class=\"progress\">\n        {{ (job.progress / 100) | percent }}\n    </span>\n</vdr-chip>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".progress{margin-left:3px}clr-icon{min-width:12px}\n"]
                },] }
    ];
    JobStateLabelComponent.propDecorators = {
        job: [{ type: core.Input }]
    };

    var ɵ0 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.job-queue'),
    }, ɵ1 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.system-status'),
    };
    var systemRoutes = [
        {
            path: 'jobs',
            component: JobListComponent,
            data: ɵ0,
        },
        {
            path: 'system-status',
            component: HealthCheckComponent,
            data: ɵ1,
        },
    ];

    var SystemModule = /** @class */ (function () {
        function SystemModule() {
        }
        return SystemModule;
    }());
    SystemModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [HealthCheckComponent, JobListComponent, JobStateLabelComponent],
                    imports: [core$1.SharedModule, router.RouterModule.forChild(systemRoutes)],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.HealthCheckComponent = HealthCheckComponent;
    exports.JobListComponent = JobListComponent;
    exports.JobStateLabelComponent = JobStateLabelComponent;
    exports.SystemModule = SystemModule;
    exports.systemRoutes = systemRoutes;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-system.umd.js.map

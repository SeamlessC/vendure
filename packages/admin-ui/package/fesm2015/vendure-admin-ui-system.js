import { Component, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { HealthCheckService, BaseListComponent, SortOrder, DataService, ModalService, NotificationService, JobState, SharedModule } from '@vendure/admin-ui/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { timer } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

class HealthCheckComponent {
    constructor(healthCheckService) {
        this.healthCheckService = healthCheckService;
    }
}
HealthCheckComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-health-check',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"system-status-header\" *ngIf=\"healthCheckService.status$ | async as status\">\n            <div class=\"status-icon\">\n                <clr-icon\n                    [attr.shape]=\"status === 'ok' ? 'check-circle' : 'exclamation-circle'\"\n                    [ngClass]=\"{ 'is-success': status === 'ok', 'is-danger': status !== 'ok' }\"\n                    size=\"48\"\n                ></clr-icon>\n            </div>\n            <div class=\"status-detail\">\n                <ng-container *ngIf=\"status === 'ok'; else error\">\n                    {{ 'system.health-all-systems-up' | translate }}\n                </ng-container>\n                <ng-template #error>\n                    {{ 'system.health-error' | translate }}\n                </ng-template>\n                <div class=\"last-checked\">\n                    {{ 'system.health-last-checked' | translate }}:\n                    {{ healthCheckService.lastCheck$ | async | localeDate: 'mediumTime' }}\n                </div>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"system-status\"></vdr-action-bar-items>\n        <button class=\"btn btn-secondary\" (click)=\"healthCheckService.refresh()\">\n            <clr-icon shape=\"refresh\"></clr-icon> {{ 'system.health-refresh' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<table class=\"table\">\n    <thead>\n        <tr>\n            <th class=\"left\">\n                {{ 'common.name' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-status' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-message' | translate }}\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of healthCheckService.details$ | async\">\n            <td class=\"align-middle left\">{{ row.key }}</td>\n            <td class=\"align-middle left\">\n                <vdr-chip [colorType]=\"row.result.status === 'up' ? 'success' : 'error'\">\n                    <ng-container *ngIf=\"row.result.status === 'up'; else down\">\n                        <clr-icon shape=\"check-circle\"></clr-icon>\n                        {{ 'system.health-status-up' | translate }}\n                    </ng-container>\n                    <ng-template #down>\n                        <clr-icon shape=\"exclamation-circle\"></clr-icon>\n                        {{ 'system.health-status-down' | translate }}\n                    </ng-template>\n                </vdr-chip>\n            </td>\n            <td class=\"align-middle left\">{{ row.result.message }}</td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".system-status-header{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header .status-detail{font-weight:bold;margin-right:6px}.system-status-header .last-checked{font-weight:normal;color:var(--color-grey-500)}\n"]
            },] }
];
HealthCheckComponent.ctorParameters = () => [
    { type: HealthCheckService }
];

class JobListComponent extends BaseListComponent {
    constructor(dataService, modalService, notificationService, router, route) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.liveUpdate = new FormControl(true);
        this.hideSettled = new FormControl(true);
        this.queueFilter = new FormControl('all');
        super.setQueryFn((...args) => this.dataService.settings.getAllJobs(...args), data => data.jobs, (skip, take) => {
            const queueFilter = this.queueFilter.value === 'all' ? null : { queueName: { eq: this.queueFilter.value } };
            const hideSettled = this.hideSettled.value;
            return {
                options: {
                    skip,
                    take,
                    filter: Object.assign(Object.assign({}, queueFilter), (hideSettled ? { isSettled: { eq: false } } : {})),
                    sort: {
                        createdAt: SortOrder.DESC,
                    },
                },
            };
        });
    }
    ngOnInit() {
        super.ngOnInit();
        timer(5000, 2000)
            .pipe(takeUntil(this.destroy$), filter(() => this.liveUpdate.value))
            .subscribe(() => {
            this.refresh();
        });
        this.queues$ = this.dataService.settings
            .getJobQueues()
            .mapStream(res => res.jobQueues)
            .pipe(map(queues => {
            return [{ name: 'all', running: true }, ...queues];
        }));
    }
    hasResult(job) {
        const result = job.result;
        if (result == null) {
            return false;
        }
        if (typeof result === 'object') {
            return Object.keys(result).length > 0;
        }
        return true;
    }
    cancelJob(id) {
        this.dataService.settings.cancelJob(id).subscribe(() => this.refresh());
    }
}
JobListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-job-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <clr-checkbox-container>\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [formControl]=\"liveUpdate\" name=\"live-update\"/>\n                <label>{{ 'common.live-update' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <clr-checkbox-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    [formControl]=\"hideSettled\"\n                    name=\"hide-settled\"\n                    (change)=\"refresh()\"\n                />\n                <label>{{ 'system.hide-settled-jobs' | translate }}</label>\n            </clr-checkbox-wrapper>\n        </clr-checkbox-container>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <ng-select\n            [addTag]=\"false\"\n            [items]=\"queues$ | async\"\n            [hideSelected]=\"true\"\n            [multiple]=\"false\"\n            [markFirst]=\"false\"\n            [clearable]=\"false\"\n            [searchable]=\"false\"\n            bindValue=\"name\"\n            [formControl]=\"queueFilter\"\n            (change)=\"refresh()\"\n        >\n            <ng-template ng-label-tmp ng-option-tmp let-item=\"item\">\n                <ng-container *ngIf=\"item.name === 'all'; else others\">\n                    {{ 'system.all-job-queues' | translate }}\n                </ng-container>\n                <ng-template #others>\n                    <vdr-chip [colorFrom]=\"item.name\">{{ item.name }}</vdr-chip>\n                </ng-template>\n            </ng-template>\n        </ng-select>\n        <vdr-action-bar-items locationId=\"job-list\"></vdr-action-bar-items>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-queue-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.created-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-duration' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'system.job-result' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-job=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-entity-info [entity]=\"job\"></vdr-entity-info>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-dropdown *ngIf=\"job.data\">\n                <button\n                    class=\"btn btn-link btn-icon\"\n                    vdrDropdownTrigger\n                    [title]=\"'system.job-data' | translate\"\n                >\n                    <clr-icon shape=\"details\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        <vdr-object-tree [value]=\"job.data\"></vdr-object-tree>\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n            <vdr-chip [colorFrom]=\"job.queueName\">{{ job.queueName }}</vdr-chip>\n        </td>\n\n        <td class=\"left align-middle\">{{ job.createdAt | timeAgo }}</td>\n        <td class=\"left align-middle\">\n            <vdr-job-state-label [job]=\"job\"></vdr-job-state-label>\n            <div *ngIf=\"job.state === 'FAILED'\" class=\"retry-info\">\n                after {{ job.attempts }} attempts\n            </div>\n            <div *ngIf=\"job.state === 'RUNNING' || job.state === 'RETRYING'\"  class=\"retry-info\">\n                attempting {{ job.attempts + 1 }} of {{ job.retries }}\n            </div>\n        </td>\n        <td class=\"left align-middle\">{{ job.duration | duration }}</td>\n        <td class=\"left align-middle\">\n            <vdr-dropdown *ngIf=\"hasResult(job)\">\n                <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"details\"></clr-icon>\n                    {{ 'system.job-result' | translate }}\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        <vdr-object-tree [value]=\"job.result\"></vdr-object-tree>\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n            <vdr-dropdown *ngIf=\"job.error\">\n                <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"exclamation-circle\"></clr-icon>\n                    {{ 'system.job-error' | translate }}\n                </button>\n                <vdr-dropdown-menu>\n                    <div class=\"result-detail\">\n                        {{ job.error }}\n                    </div>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown *ngIf=\"!job.isSettled && job.state !== 'FAILED'\">\n                <button class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"cancelJob(job.id)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteSystem'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"ban\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.cancel' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".result-detail{margin:0 12px}.retry-info{margin-left:6px;color:var(--color-grey-400)}\n"]
            },] }
];
JobListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];

class JobStateLabelComponent {
    get iconShape() {
        switch (this.job.state) {
            case JobState.COMPLETED:
                return 'check-circle';
            case JobState.FAILED:
                return 'exclamation-circle';
            case JobState.CANCELLED:
                return 'ban';
            case JobState.PENDING:
            case JobState.RETRYING:
                return 'hourglass';
            case JobState.RUNNING:
                return 'sync';
        }
    }
    get colorType() {
        switch (this.job.state) {
            case JobState.COMPLETED:
                return 'success';
            case JobState.FAILED:
            case JobState.CANCELLED:
                return 'error';
            case JobState.PENDING:
            case JobState.RETRYING:
                return '';
            case JobState.RUNNING:
                return 'warning';
        }
    }
}
JobStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-job-state-label',
                template: "<vdr-chip [colorType]=\"colorType\">\n    <clr-icon [attr.shape]=\"iconShape\" class=\"mr1\"></clr-icon>\n    {{ job.state | titlecase }}\n    <span *ngIf=\"job.state === 'RUNNING'\" class=\"progress\">\n        {{ (job.progress / 100) | percent }}\n    </span>\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".progress{margin-left:3px}clr-icon{min-width:12px}\n"]
            },] }
];
JobStateLabelComponent.propDecorators = {
    job: [{ type: Input }]
};

const ɵ0 = {
    breadcrumb: marker('breadcrumb.job-queue'),
}, ɵ1 = {
    breadcrumb: marker('breadcrumb.system-status'),
};
const systemRoutes = [
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

class SystemModule {
}
SystemModule.decorators = [
    { type: NgModule, args: [{
                declarations: [HealthCheckComponent, JobListComponent, JobStateLabelComponent],
                imports: [SharedModule, RouterModule.forChild(systemRoutes)],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { HealthCheckComponent, JobListComponent, JobStateLabelComponent, SystemModule, systemRoutes, ɵ0, ɵ1 };
//# sourceMappingURL=vendure-admin-ui-system.js.map

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ServerConfigService, } from '@vendure/admin-ui/core';
export class OrderProcessGraphDialogComponent {
    constructor(serverConfigService) {
        this.serverConfigService = serverConfigService;
        this.states = [];
    }
    ngOnInit() {
        this.states = this.serverConfigService.getOrderProcessStates();
    }
}
OrderProcessGraphDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-graph-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.order-state-diagram' | translate }}</ng-template>\n\n<vdr-order-process-graph [states]=\"states\" [initialState]=\"activeState\"></vdr-order-process-graph>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
OrderProcessGraphDialogComponent.ctorParameters = () => [
    { type: ServerConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHJvY2Vzcy1ncmFwaC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9vcmRlci1wcm9jZXNzLWdyYXBoLWRpYWxvZy9vcmRlci1wcm9jZXNzLWdyYXBoLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBS0gsbUJBQW1CLEdBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFTaEMsTUFBTSxPQUFPLGdDQUFnQztJQUd6QyxZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUQ1RCxXQUFNLEdBQXdCLEVBQUUsQ0FBQztJQUM4QixDQUFDO0lBRWhFLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ25FLENBQUM7OztZQWJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQywrTUFBMEQ7Z0JBRTFELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBVEcsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbmNlbE9yZGVySW5wdXQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgRGlhbG9nLFxuICAgIE9yZGVyUHJvY2Vzc1N0YXRlLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1wcm9jZXNzLWdyYXBoLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLXByb2Nlc3MtZ3JhcGgtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcmRlci1wcm9jZXNzLWdyYXBoLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclByb2Nlc3NHcmFwaERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRGlhbG9nPHZvaWQ+IHtcbiAgICBhY3RpdmVTdGF0ZTogc3RyaW5nO1xuICAgIHN0YXRlczogT3JkZXJQcm9jZXNzU3RhdGVbXSA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRPcmRlclByb2Nlc3NTdGF0ZXMoKTtcbiAgICB9XG5cbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdDogdm9pZCB8IHVuZGVmaW5lZCkgPT4gdm9pZDtcbn1cbiJdfQ==
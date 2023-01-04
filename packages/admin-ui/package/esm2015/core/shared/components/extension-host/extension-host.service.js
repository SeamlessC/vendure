import { Injectable } from '@angular/core';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { parse } from 'graphql';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { NotificationService } from '../../../providers/notification/notification.service';
export class ExtensionHostService {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.cancellationMessage$ = new Subject();
        this.destroyMessage$ = new Subject();
        this.handleMessage = (message) => {
            const { data, origin } = message;
            if (this.isExtensionMessage(data)) {
                const cancellation$ = this.cancellationMessage$.pipe(filter(requestId => requestId === data.requestId));
                const end$ = merge(cancellation$, this.destroyMessage$);
                switch (data.type) {
                    case 'cancellation': {
                        this.cancellationMessage$.next(data.requestId);
                        break;
                    }
                    case 'destroy': {
                        this.destroyMessage$.next();
                        break;
                    }
                    case 'active-route': {
                        const routeData = {
                            url: window.location.href,
                            origin: window.location.origin,
                            pathname: window.location.pathname,
                            params: this.routeSnapshot.params,
                            queryParams: this.routeSnapshot.queryParams,
                            fragment: this.routeSnapshot.fragment,
                        };
                        this.sendMessage({ data: routeData, error: false, complete: false, requestId: data.requestId }, origin);
                        this.sendMessage({ data: null, error: false, complete: true, requestId: data.requestId }, origin);
                        break;
                    }
                    case 'graphql-query': {
                        const { document, variables, fetchPolicy } = data.data;
                        this.dataService
                            .query(parse(document), variables, fetchPolicy)
                            .stream$.pipe(takeUntil(end$))
                            .subscribe(this.createObserver(data.requestId, origin));
                        break;
                    }
                    case 'graphql-mutation': {
                        const { document, variables } = data.data;
                        this.dataService
                            .mutate(parse(document), variables)
                            .pipe(takeUntil(end$))
                            .subscribe(this.createObserver(data.requestId, origin));
                        break;
                    }
                    case 'notification': {
                        this.notificationService.notify(data.data);
                        break;
                    }
                    default:
                        assertNever(data);
                }
            }
        };
    }
    init(extensionWindow, routeSnapshot) {
        this.extensionWindow = extensionWindow;
        this.routeSnapshot = routeSnapshot;
        window.addEventListener('message', this.handleMessage);
    }
    destroy() {
        window.removeEventListener('message', this.handleMessage);
        this.destroyMessage$.next();
    }
    ngOnDestroy() {
        this.destroy();
    }
    createObserver(requestId, origin) {
        return {
            next: data => this.sendMessage({ data, error: false, complete: false, requestId }, origin),
            error: err => this.sendMessage({ data: err, error: true, complete: false, requestId }, origin),
            complete: () => this.sendMessage({ data: null, error: false, complete: true, requestId }, origin),
        };
    }
    sendMessage(response, origin) {
        this.extensionWindow.postMessage(response, origin);
    }
    isExtensionMessage(input) {
        return (input.hasOwnProperty('type') && input.hasOwnProperty('data') && input.hasOwnProperty('requestId'));
    }
}
ExtensionHostService.decorators = [
    { type: Injectable }
];
ExtensionHostService.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLWhvc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvZXh0ZW5zaW9uLWhvc3QvZXh0ZW5zaW9uLWhvc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQVksT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBRzNGLE1BQU0sT0FBTyxvQkFBb0I7SUFNN0IsWUFBb0IsV0FBd0IsRUFBVSxtQkFBd0M7UUFBMUUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSHRGLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDN0Msb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBbUJ0QyxrQkFBYSxHQUFHLENBQUMsT0FBdUMsRUFBRSxFQUFFO1lBQ2hFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUNoRCxNQUFNLENBQUMs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Q0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ2pDLE9BQU8sQ0FDSCxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FDcEcsQ0FBQztJQUNOLENBQUM7OztZQXJHSixVQUFVOzs7WUFIRixXQUFXO1lBQ1gsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZlUm91dGVEYXRhLCBFeHRlbnNpb25NZXNzYWdlLCBNZXNzYWdlUmVzcG9uc2UgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL2V4dGVuc2lvbi1ob3N0LXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvbkhvc3RTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGV4dGVuc2lvbldpbmRvdzogV2luZG93O1xuICAgIHByaXZhdGUgcm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgICBwcml2YXRlIGNhbmNlbGxhdGlvbk1lc3NhZ2UkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgZGVzdHJveU1lc3NhZ2UkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XG5cbiAgICBpbml0KGV4dGVuc2lvbldpbmRvdzogV2luZG93LCByb3V0ZVNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uV2luZG93ID0gZXh0ZW5zaW9uV2luZG93O1xuICAgICAgICB0aGlzLnJvdXRlU25hcHNob3QgPSByb3V0ZVNuYXBzaG90O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaGFuZGxlTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmRlc3Ryb3lNZXNzYWdlJC5uZXh0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTWVzc2FnZSA9IChtZXNzYWdlOiBNZXNzYWdlRXZlbnQ8RXh0ZW5zaW9uTWVzc2FnZT4pID0+IHtcbiAgICAgICAgY29uc3QgeyBkYXRhLCBvcmlnaW4gfSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmICh0aGlzLmlzRXh0ZW5zaW9uTWVzc2FnZShkYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsbGF0aW9uJCA9IHRoaXMuY2FuY2VsbGF0aW9uTWVzc2FnZSQucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocmVxdWVzdElkID0+IHJlcXVlc3RJZCA9PT0gZGF0YS5yZXF1ZXN0SWQpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCQgPSBtZXJnZShjYW5jZWxsYXRpb24kLCB0aGlzLmRlc3Ryb3lNZXNzYWdlJCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxhdGlvbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsYXRpb25NZXNzYWdlJC5uZXh0KGRhdGEucmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rlc3Ryb3knOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveU1lc3NhZ2UkLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2FjdGl2ZS1yb3V0ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm91dGVEYXRhOiBBY3RpdmVSb3V0ZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5yb3V0ZVNuYXBzaG90LnBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnJvdXRlU25hcHNob3QucXVlcnlQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogdGhpcy5yb3V0ZVNuYXBzaG90LmZyYWdtZW50LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBkYXRhOiByb3V0ZURhdGEsIGVycm9yOiBmYWxzZSwgY29tcGxldGU6IGZhbHNlLCByZXF1ZXN0SWQ6IGRhdGEucmVxdWVzdElkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IG51bGwsIGVycm9yOiBmYWxzZSwgY29tcGxldGU6IHRydWUsIHJlcXVlc3RJZDogZGF0YS5yZXF1ZXN0SWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyYXBocWwtcXVlcnknOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9jdW1lbnQsIHZhcmlhYmxlcywgZmV0Y2hQb2xpY3kgfSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5KHBhcnNlKGRvY3VtZW50KSwgdmFyaWFibGVzLCBmZXRjaFBvbGljeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJlYW0kLnBpcGUodGFrZVVudGlsKGVuZCQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmNyZWF0ZU9ic2VydmVyKGRhdGEucmVxdWVzdElkLCBvcmlnaW4pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyYXBocWwtbXV0YXRpb24nOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9jdW1lbnQsIHZhcmlhYmxlcyB9ID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAubXV0YXRlKHBhcnNlKGRvY3VtZW50KSwgdmFyaWFibGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGVuZCQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmNyZWF0ZU9ic2VydmVyKGRhdGEucmVxdWVzdElkLCBvcmlnaW4pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmeShkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0TmV2ZXIoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVPYnNlcnZlcihyZXF1ZXN0SWQ6IHN0cmluZywgb3JpZ2luOiBzdHJpbmcpOiBPYnNlcnZlcjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6IGRhdGEgPT4gdGhpcy5zZW5kTWVzc2FnZSh7IGRhdGEsIGVycm9yOiBmYWxzZSwgY29tcGxldGU6IGZhbHNlLCByZXF1ZXN0SWQgfSwgb3JpZ2luKSxcbiAgICAgICAgICAgIGVycm9yOiBlcnIgPT4gdGhpcy5zZW5kTWVzc2FnZSh7IGRhdGE6IGVyciwgZXJyb3I6IHRydWUsIGNvbXBsZXRlOiBmYWxzZSwgcmVxdWVzdElkIH0sIG9yaWdpbiksXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4gdGhpcy5zZW5kTWVzc2FnZSh7IGRhdGE6IG51bGwsIGVycm9yOiBmYWxzZSwgY29tcGxldGU6IHRydWUsIHJlcXVlc3RJZCB9LCBvcmlnaW4pLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UocmVzcG9uc2U6IE1lc3NhZ2VSZXNwb25zZSwgb3JpZ2luOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25XaW5kb3cucG9zdE1lc3NhZ2UocmVzcG9uc2UsIG9yaWdpbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0V4dGVuc2lvbk1lc3NhZ2UoaW5wdXQ6IGFueSk6IGlucHV0IGlzIEV4dGVuc2lvbk1lc3NhZ2Uge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaW5wdXQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJiBpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpICYmIGlucHV0Lmhhc093blByb3BlcnR5KCdyZXF1ZXN0SWQnKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
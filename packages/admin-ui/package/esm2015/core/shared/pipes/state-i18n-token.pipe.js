import { Pipe } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
export class StateI18nTokenPipe {
    constructor() {
        this.stateI18nTokens = {
            Created: _('state.created'),
            Draft: _('state.draft'),
            AddingItems: _('state.adding-items'),
            ArrangingPayment: _('state.arranging-payment'),
            PaymentAuthorized: _('state.payment-authorized'),
            PaymentSettled: _('state.payment-settled'),
            PartiallyShipped: _('state.partially-shipped'),
            Shipped: _('state.shipped'),
            PartiallyDelivered: _('state.partially-delivered'),
            Authorized: _('state.authorized'),
            Delivered: _('state.delivered'),
            Cancelled: _('state.cancelled'),
            Pending: _('state.pending'),
            Settled: _('state.settled'),
            Failed: _('state.failed'),
            Error: _('state.error'),
            Declined: _('state.declined'),
            Modifying: _('state.modifying'),
            ArrangingAdditionalPayment: _('state.arranging-additional-payment'),
            Received: _('state.received'),
            Processing: _('state.processing'),
            ReadyToDeliver: _('state.readytodeliver'),
            Finished: _('state.finished'),
        };
    }
    transform(value) {
        if (typeof value === 'string' && value.length) {
            const defaultStateToken = this.stateI18nTokens[value];
            if (defaultStateToken) {
                return defaultStateToken;
            }
            return ('state.' +
                value
                    .replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/ +/g, '-')
                    .toLowerCase());
        }
        return value;
    }
}
StateI18nTokenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stateI18nToken',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtaTE4bi10b2tlbi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvc3RhdGUtaTE4bi10b2tlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFLdEUsTUFBTSxPQUFPLGtCQUFrQjtJQUgvQjtRQUlxQixvQkFBZSxHQUFHO1lBQy9CLE9BQU8sRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO1lBQzNCLEtBQUssRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3ZCLFdBQVcsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUM7WUFDcEMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDO1lBQzlDLGlCQUFpQixFQUFFLENBQUMsQ0FBQywwQkFBMEIsQ0FBQztZQUNoRCxjQUFjLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1lBQzFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQztZQUMzQixrQkFBa0IsRUFBRSxDQUFDLENBQUMsMkJBQTJCLENBQUM7WUFDbEQsVUFBVSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQy9CLFNBQVMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDM0IsT0FBTyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDM0IsTUFBTSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDdkIsUUFBUSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QixTQUFTLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQy9CLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQztZQUNuRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLFVBQVUsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUM7WUFDakMsY0FBYyxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztZQUN6QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1NBQ2hDLENBQUM7SUFlTixDQUFDO0lBZEcsU0FBUyxDQUFvQixLQUFRO1FBQ2pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQVksQ0FBQyxDQUFDO1lBQzdELElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLE9BQU8saUJBQWlCLENBQUM7YUFDNUI7WUFDRCxPQUFPLENBQUMsUUFBUTtnQkFDWixLQUFLO3FCQUNBLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUM7cUJBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO3FCQUNuQixXQUFXLEVBQUUsQ0FBUSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBMUNKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3N0YXRlSTE4blRva2VuJyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhdGVJMThuVG9rZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdGF0ZUkxOG5Ub2tlbnMgPSB7XG4gICAgICAgIENyZWF0ZWQ6IF8oJ3N0YXRlLmNyZWF0ZWQnKSxcbiAgICAgICAgRHJhZnQ6IF8oJ3N0YXRlLmRyYWZ0JyksXG4gICAgICAgIEFkZGluZ0l0ZW1zOiBfKCdzdGF0ZS5hZGRpbmctaXRlbXMnKSxcbiAgICAgICAgQXJyYW5naW5nUGF5bWVudDogXygnc3RhdGUuYXJyYW5naW5nLXBheW1lbnQnKSxcbiAgICAgICAgUGF5bWVudEF1dGhvcml6ZWQ6IF8oJ3N0YXRlLnBheW1lbnQtYXV0aG9yaXplZCcpLFxuICAgICAgICBQYXltZW50U2V0dGxlZDogXygnc3RhdGUucGF5bWVudC1zZXR0bGVkJyksXG4gICAgICAgIFBhcnRpYWxseVNoaXBwZWQ6IF8oJ3N0YXRlLnBhcnRpYWxseS1zaGlwcGVkJyksXG4gICAgICAgIFNoaXBwZWQ6IF8oJ3N0YXRlLnNoaXBwZWQnKSxcbiAgICAgICAgUGFydGlhbGx5RGVsaXZlcmVkOiBfKCdzdGF0ZS5wYXJ0aWFsbHktZGVsaXZlcmVkJyksXG4gICAgICAgIEF1dGhvcml6ZWQ6IF8oJ3N0YXRlLmF1dGhvcml6ZWQnKSxcbiAgICAgICAgRGVsaXZlcmVkOiBfKCdzdGF0ZS5kZWxpdmVyZWQnKSxcbiAgICAgICAgQ2FuY2VsbGVkOiBfKCdzdGF0ZS5jYW5jZWxsZWQnKSxcbiAgICAgICAgUGVuZGluZzogXygnc3RhdGUucGVuZGluZycpLFxuICAgICAgICBTZXR0bGVkOiBfKCdzdGF0ZS5zZXR0bGVkJyksXG4gICAgICAgIEZhaWxlZDogXygnc3RhdGUuZmFpbGVkJyksXG4gICAgICAgIEVycm9yOiBfKCdzdGF0ZS5lcnJvcicpLFxuICAgICAgICBEZWNsaW5lZDogXygnc3RhdGUuZGVjbGluZWQnKSxcbiAgICAgICAgTW9kaWZ5aW5nOiBfKCdzdGF0ZS5tb2RpZnlpbmcnKSxcbiAgICAgICAgQXJyYW5naW5nQWRkaXRpb25hbFBheW1lbnQ6IF8oJ3N0YXRlLmFycmFuZ2luZy1hZGRpdGlvbmFsLXBheW1lbnQnKSxcbiAgICAgICAgUmVjZWl2ZWQ6IF8oJ3N0YXRlLnJlY2VpdmVkJyksXG4gICAgICAgIFByb2Nlc3Npbmc6IF8oJ3N0YXRlLnByb2Nlc3NpbmcnKSxcbiAgICAgICAgUmVhZHlUb0RlbGl2ZXI6IF8oJ3N0YXRlLnJlYWR5dG9kZWxpdmVyJyksXG4gICAgICAgIEZpbmlzaGVkOiBfKCdzdGF0ZS5maW5pc2hlZCcpLFxuICAgIH07XG4gICAgdHJhbnNmb3JtPFQgZXh0ZW5kcyB1bmtub3duPih2YWx1ZTogVCk6IFQge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdGF0ZVRva2VuID0gdGhpcy5zdGF0ZUkxOG5Ub2tlbnNbdmFsdWUgYXMgYW55XTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0U3RhdGVUb2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0U3RhdGVUb2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoJ3N0YXRlLicgK1xuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICsvZywgJy0nKVxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSkgYXMgYW55O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=
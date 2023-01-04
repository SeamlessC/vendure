import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { simpleDeepClone } from '@vendure/common/lib/simple-deep-clone';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { QueryResult } from '../query-result';
import { ServerConfigService } from '../server-config';
import { addCustomFields } from '../utils/add-custom-fields';
import { isEntityCreateOrUpdateMutation, removeReadonlyCustomFields, } from '../utils/remove-readonly-custom-fields';
import { transformRelationCustomFieldInputs } from '../utils/transform-relation-custom-field-inputs';
export class BaseDataService {
    constructor(apollo, httpClient, localStorageService, serverConfigService) {
        this.apollo = apollo;
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.serverConfigService = serverConfigService;
    }
    get customFields() {
        return this.serverConfigService.serverConfig.customFieldConfig || {};
    }
    /**
     * Performs a GraphQL watch query
     */
    query(query, variables, fetchPolicy = 'cache-and-network') {
        const withCustomFields = addCustomFields(query, this.customFields);
        const queryRef = this.apollo.watchQuery({
            query: withCustomFields,
            variables,
            fetchPolicy,
        });
        const queryResult = new QueryResult(queryRef, this.apollo);
        return queryResult;
    }
    /**
     * Performs a GraphQL mutation
     */
    mutate(mutation, variables, update) {
        const withCustomFields = addCustomFields(mutation, this.customFields);
        const withoutReadonlyFields = this.prepareCustomFields(mutation, variables);
        return this.apollo
            .mutate({
            mutation: withCustomFields,
            variables: withoutReadonlyFields,
            update,
        })
            .pipe(map(result => result.data));
    }
    prepareCustomFields(mutation, variables) {
        const entity = isEntityCreateOrUpdateMutation(mutation);
        if (entity) {
            const customFieldConfig = this.customFields[entity];
            if (variables && customFieldConfig) {
                let variablesClone = simpleDeepClone(variables);
                variablesClone = removeReadonlyCustomFields(variablesClone, customFieldConfig);
                variablesClone = transformRelationCustomFieldInputs(variablesClone, customFieldConfig);
                return variablesClone;
            }
        }
        return variables;
    }
}
BaseDataService.decorators = [
    { type: Injectable }
];
BaseDataService.ctorParameters = () => [
    { type: Apollo },
    { type: HttpClient },
    { type: LocalStorageService },
    { type: ServerConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvcHJvdmlkZXJzL2Jhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUNILDhCQUE4QixFQUM5QiwwQkFBMEIsR0FDN0IsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUdyRyxNQUFNLE9BQU8sZUFBZTtJQUN4QixZQUNZLE1BQWMsRUFDZCxVQUFzQixFQUN0QixtQkFBd0MsRUFDeEMsbUJBQXdDO1FBSHhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUNqRCxDQUFDO0lBRUosSUFBWSxZQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7SUFDekUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUNELEtBQW1CLEVBQ25CLFNBQWEsRUFDYixjQUFxQyxtQkFBbUI7UUFFeEQsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBTztZQUMxQyxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLFNBQVM7WUFDVCxXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQVMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQ0YsUUFBc0IsRUFDdEIsU0FBYSxFQUNiLE1BQTZCO1FBRTdCLE1BQU0sZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEUsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTVFLE9BQU8sSUFBSSxDQUFDLE1BQU07YUFDYixNQUFNLENBQU87WUFDVixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxxQkFBcUI7WUFDaEMsTUFBTTtTQUNULENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLG1CQUFtQixDQUFJLFFBQXNCLEVBQUUsU0FBWTtRQUMvRCxNQUFNLE1BQU0sR0FBRyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLFNBQVMsSUFBSSxpQkFBaUIsRUFBRTtnQkFDaEMsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLFNBQWdCLENBQUMsQ0FBQztnQkFDdkQsY0FBYyxHQUFHLDBCQUEwQixDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMvRSxjQUFjLEdBQUcsa0NBQWtDLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3ZGLE9BQU8sY0FBYyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOzs7WUEvREosVUFBVTs7O1lBaEJGLE1BQU07WUFKTixVQUFVO1lBVVYsbUJBQW1CO1lBRW5CLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhUHJveHksIE11dGF0aW9uVXBkYXRlckZuLCBXYXRjaFF1ZXJ5RmV0Y2hQb2xpY3kgfSBmcm9tICdAYXBvbGxvL2NsaWVudC9jb3JlJztcbmltcG9ydCB7IHNpbXBsZURlZXBDbG9uZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2ltcGxlLWRlZXAtY2xvbmUnO1xuaW1wb3J0IHsgQXBvbGxvIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgRG9jdW1lbnROb2RlIH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZS9hc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDdXN0b21GaWVsZHMgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlcnlSZXN1bHQgfSBmcm9tICcuLi9xdWVyeS1yZXN1bHQnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL3NlcnZlci1jb25maWcnO1xuaW1wb3J0IHsgYWRkQ3VzdG9tRmllbGRzIH0gZnJvbSAnLi4vdXRpbHMvYWRkLWN1c3RvbS1maWVsZHMnO1xuaW1wb3J0IHtcbiAgICBpc0VudGl0eUNyZWF0ZU9yVXBkYXRlTXV0YXRpb24sXG4gICAgcmVtb3ZlUmVhZG9ubHlDdXN0b21GaWVsZHMsXG59IGZyb20gJy4uL3V0aWxzL3JlbW92ZS1yZWFkb25seS1jdXN0b20tZmllbGRzJztcbmltcG9ydCB7IHRyYW5zZm9ybVJlbGF0aW9uQ3VzdG9tRmllbGRJbnB1dHMgfSBmcm9tICcuLi91dGlscy90cmFuc2Zvcm0tcmVsYXRpb24tY3VzdG9tLWZpZWxkLWlucHV0cyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNlRGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwb2xsbzogQXBvbGxvLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICkge31cblxuICAgIHByaXZhdGUgZ2V0IGN1c3RvbUZpZWxkcygpOiBDdXN0b21GaWVsZHMge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJDb25maWdTZXJ2aWNlLnNlcnZlckNvbmZpZy5jdXN0b21GaWVsZENvbmZpZyB8fCB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIEdyYXBoUUwgd2F0Y2ggcXVlcnlcbiAgICAgKi9cbiAgICBxdWVyeTxULCBWID0gUmVjb3JkPHN0cmluZywgYW55Pj4oXG4gICAgICAgIHF1ZXJ5OiBEb2N1bWVudE5vZGUsXG4gICAgICAgIHZhcmlhYmxlcz86IFYsXG4gICAgICAgIGZldGNoUG9saWN5OiBXYXRjaFF1ZXJ5RmV0Y2hQb2xpY3kgPSAnY2FjaGUtYW5kLW5ldHdvcmsnLFxuICAgICk6IFF1ZXJ5UmVzdWx0PFQsIFY+IHtcbiAgICAgICAgY29uc3Qgd2l0aEN1c3RvbUZpZWxkcyA9IGFkZEN1c3RvbUZpZWxkcyhxdWVyeSwgdGhpcy5jdXN0b21GaWVsZHMpO1xuICAgICAgICBjb25zdCBxdWVyeVJlZiA9IHRoaXMuYXBvbGxvLndhdGNoUXVlcnk8VCwgVj4oe1xuICAgICAgICAgICAgcXVlcnk6IHdpdGhDdXN0b21GaWVsZHMsXG4gICAgICAgICAgICB2YXJpYWJsZXMsXG4gICAgICAgICAgICBmZXRjaFBvbGljeSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0ID0gbmV3IFF1ZXJ5UmVzdWx0PFQsIGFueT4ocXVlcnlSZWYsIHRoaXMuYXBvbGxvKTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgR3JhcGhRTCBtdXRhdGlvblxuICAgICAqL1xuICAgIG11dGF0ZTxULCBWID0gUmVjb3JkPHN0cmluZywgYW55Pj4oXG4gICAgICAgIG11dGF0aW9uOiBEb2N1bWVudE5vZGUsXG4gICAgICAgIHZhcmlhYmxlcz86IFYsXG4gICAgICAgIHVwZGF0ZT86IE11dGF0aW9uVXBkYXRlckZuPFQ+LFxuICAgICk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBjb25zdCB3aXRoQ3VzdG9tRmllbGRzID0gYWRkQ3VzdG9tRmllbGRzKG11dGF0aW9uLCB0aGlzLmN1c3RvbUZpZWxkcyk7XG4gICAgICAgIGNvbnN0IHdpdGhvdXRSZWFkb25seUZpZWxkcyA9IHRoaXMucHJlcGFyZUN1c3RvbUZpZWxkcyhtdXRhdGlvbiwgdmFyaWFibGVzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcG9sbG9cbiAgICAgICAgICAgIC5tdXRhdGU8VCwgVj4oe1xuICAgICAgICAgICAgICAgIG11dGF0aW9uOiB3aXRoQ3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogd2l0aG91dFJlYWRvbmx5RmllbGRzLFxuICAgICAgICAgICAgICAgIHVwZGF0ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzdWx0ID0+IHJlc3VsdC5kYXRhIGFzIFQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDdXN0b21GaWVsZHM8Vj4obXV0YXRpb246IERvY3VtZW50Tm9kZSwgdmFyaWFibGVzOiBWKTogViB7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IGlzRW50aXR5Q3JlYXRlT3JVcGRhdGVNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgIGlmIChlbnRpdHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkQ29uZmlnID0gdGhpcy5jdXN0b21GaWVsZHNbZW50aXR5XTtcbiAgICAgICAgICAgIGlmICh2YXJpYWJsZXMgJiYgY3VzdG9tRmllbGRDb25maWcpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVzQ2xvbmUgPSBzaW1wbGVEZWVwQ2xvbmUodmFyaWFibGVzIGFzIGFueSk7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVzQ2xvbmUgPSByZW1vdmVSZWFkb25seUN1c3RvbUZpZWxkcyh2YXJpYWJsZXNDbG9uZSwgY3VzdG9tRmllbGRDb25maWcpO1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlc0Nsb25lID0gdHJhbnNmb3JtUmVsYXRpb25DdXN0b21GaWVsZElucHV0cyh2YXJpYWJsZXNDbG9uZSwgY3VzdG9tRmllbGRDb25maWcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJpYWJsZXNDbG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFyaWFibGVzO1xuICAgIH1cbn1cbiJdfQ==
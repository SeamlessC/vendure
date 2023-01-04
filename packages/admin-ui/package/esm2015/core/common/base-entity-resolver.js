import { ActivationStart, } from '@angular/router';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { of } from 'rxjs';
import { filter, map, shareReplay, take, takeUntil } from 'rxjs/operators';
export function createResolveData(resolver) {
    return {
        entity: resolver,
    };
}
/**
 * @description
 * A base resolver for an entity detail route. Resolves to an observable of the given entity, or a "blank"
 * version if the route id equals "create". Should be used together with details views which extend the
 * {@link BaseDetailComponent}.
 *
 * @example
 * ```TypeScript
 * \@Injectable({
 *   providedIn: 'root',
 * })
 * export class MyEntityResolver extends BaseEntityResolver<MyEntity.Fragment> {
 *   constructor(router: Router, dataService: DataService) {
 *     super(
 *       router,
 *       {
 *         __typename: 'MyEntity',
 *         id: '',
 *         createdAt: '',
 *         updatedAt: '',
 *         name: '',
 *       },
 *       id => dataService.query(GET_MY_ENTITY, { id }).mapStream(data => data.myEntity),
 *     );
 *   }
 * }
 * ```
 *
 * @docsCategory list-detail-views
 */
export class BaseEntityResolver {
    constructor(router, emptyEntity, entityStream) {
        this.router = router;
        this.emptyEntity = emptyEntity;
        this.entityStream = entityStream;
    }
    /** @internal */
    resolve(route, state) {
        const id = route.paramMap.get('id');
        // Complete the entity stream upon navigating away
        const navigateAway$ = this.router.events.pipe(filter(event => event instanceof ActivationStart));
        if (id === 'create') {
            return of(of(this.emptyEntity));
        }
        else {
            const stream = this.entityStream(id || '').pipe(takeUntil(navigateAway$), filter(notNullOrUndefined), shareReplay(1));
            return stream.pipe(take(1), map(() => stream));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1lbnRpdHktcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbW1vbi9iYXNlLWVudGl0eS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsZUFBZSxHQUtsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0zRSxNQUFNLFVBQVUsaUJBQWlCLENBQzdCLFFBQWlCO0lBRWpCLE9BQU87UUFDSCxNQUFNLEVBQUUsUUFBUTtLQUNuQixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFDM0IsWUFDYyxNQUFjLEVBQ1AsV0FBYyxFQUN2QixZQUE4RDtRQUY1RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ1AsZ0JBQVcsR0FBWCxXQUFXLENBQUc7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWtEO0lBQ3ZFLENBQUM7SUFFSixnQkFBZ0I7SUFDaEIsT0FBTyxDQUFDLEtBQTZCLEVBQUUsS0FBMEI7UUFDN0QsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsa0RBQWtEO1FBQ2xELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQztRQUVqRyxJQUFJLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFDeEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQzFCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDakIsQ0FBQztZQUVGLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUNwQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgQWN0aXZhdGlvblN0YXJ0LFxuICAgIFJlc29sdmUsXG4gICAgUmVzb2x2ZURhdGEsXG4gICAgUm91dGVyLFxuICAgIFJvdXRlclN0YXRlU25hcHNob3QsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVJlc29sdmVEYXRhPFI+IGV4dGVuZHMgUmVzb2x2ZURhdGEge1xuICAgIGVudGl0eTogVHlwZTxCYXNlRW50aXR5UmVzb2x2ZXI8Uj4+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVzb2x2ZURhdGE8VCBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxSPiwgUj4oXG4gICAgcmVzb2x2ZXI6IFR5cGU8VD4sXG4pOiBFbnRpdHlSZXNvbHZlRGF0YTxSPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW50aXR5OiByZXNvbHZlcixcbiAgICB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBiYXNlIHJlc29sdmVyIGZvciBhbiBlbnRpdHkgZGV0YWlsIHJvdXRlLiBSZXNvbHZlcyB0byBhbiBvYnNlcnZhYmxlIG9mIHRoZSBnaXZlbiBlbnRpdHksIG9yIGEgXCJibGFua1wiXG4gKiB2ZXJzaW9uIGlmIHRoZSByb3V0ZSBpZCBlcXVhbHMgXCJjcmVhdGVcIi4gU2hvdWxkIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBkZXRhaWxzIHZpZXdzIHdoaWNoIGV4dGVuZCB0aGVcbiAqIHtAbGluayBCYXNlRGV0YWlsQ29tcG9uZW50fS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgVHlwZVNjcmlwdFxuICogXFxASW5qZWN0YWJsZSh7XG4gKiAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlFbnRpdHlSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxNeUVudGl0eS5GcmFnbWVudD4ge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gKiAgICAgc3VwZXIoXG4gKiAgICAgICByb3V0ZXIsXG4gKiAgICAgICB7XG4gKiAgICAgICAgIF9fdHlwZW5hbWU6ICdNeUVudGl0eScsXG4gKiAgICAgICAgIGlkOiAnJyxcbiAqICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAqICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAqICAgICAgICAgbmFtZTogJycsXG4gKiAgICAgICB9LFxuICogICAgICAgaWQgPT4gZGF0YVNlcnZpY2UucXVlcnkoR0VUX01ZX0VOVElUWSwgeyBpZCB9KS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLm15RW50aXR5KSxcbiAqICAgICApO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGxpc3QtZGV0YWlsLXZpZXdzXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlRW50aXR5UmVzb2x2ZXI8VD4gaW1wbGVtZW50cyBSZXNvbHZlPE9ic2VydmFibGU8VD4+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVtcHR5RW50aXR5OiBULFxuICAgICAgICBwcml2YXRlIGVudGl0eVN0cmVhbTogKGlkOiBzdHJpbmcpID0+IE9ic2VydmFibGU8VCB8IG51bGwgfCB1bmRlZmluZWQ+LFxuICAgICkge31cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4ge1xuICAgICAgICBjb25zdCBpZCA9IHJvdXRlLnBhcmFtTWFwLmdldCgnaWQnKTtcblxuICAgICAgICAvLyBDb21wbGV0ZSB0aGUgZW50aXR5IHN0cmVhbSB1cG9uIG5hdmlnYXRpbmcgYXdheVxuICAgICAgICBjb25zdCBuYXZpZ2F0ZUF3YXkkID0gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgQWN0aXZhdGlvblN0YXJ0KSk7XG5cbiAgICAgICAgaWYgKGlkID09PSAnY3JlYXRlJykge1xuICAgICAgICAgICAgcmV0dXJuIG9mKG9mKHRoaXMuZW1wdHlFbnRpdHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuZW50aXR5U3RyZWFtKGlkIHx8ICcnKS5waXBlKFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbChuYXZpZ2F0ZUF3YXkkKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJlYW0ucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiBzdHJlYW0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
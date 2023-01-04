import { ActivatedRouteSnapshot, Resolve, ResolveData, Router, RouterStateSnapshot } from '@angular/router';
import { Type } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
export interface EntityResolveData<R> extends ResolveData {
    entity: Type<BaseEntityResolver<R>>;
}
export declare function createResolveData<T extends BaseEntityResolver<R>, R>(resolver: Type<T>): EntityResolveData<R>;
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
export declare class BaseEntityResolver<T> implements Resolve<Observable<T>> {
    protected router: Router;
    private readonly emptyEntity;
    private entityStream;
    constructor(router: Router, emptyEntity: T, entityStream: (id: string) => Observable<T | null | undefined>);
    /** @internal */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<T>>;
}

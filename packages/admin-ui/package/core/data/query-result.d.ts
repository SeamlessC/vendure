import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
/**
 * @description
 * This class wraps the Apollo Angular QueryRef object and exposes some getters
 * for convenience.
 *
 * @docsCategory providers
 * @docsPage DataService
 */
export declare class QueryResult<T, V = Record<string, any>> {
    private queryRef;
    private apollo;
    constructor(queryRef: QueryRef<T, V>, apollo: Apollo);
    completed$: Subject<unknown>;
    private valueChanges;
    /**
     * @description
     * Re-fetch this query whenever the active Channel changes.
     */
    refetchOnChannelChange(): QueryResult<T, V>;
    /**
     * @description
     * Returns an Observable which emits a single result and then completes.
     */
    get single$(): Observable<T>;
    /**
     * @description
     * Returns an Observable which emits until unsubscribed.
     */
    get stream$(): Observable<T>;
    get ref(): QueryRef<T, V>;
    /**
     * @description
     * Returns a single-result Observable after applying the map function.
     */
    mapSingle<R>(mapFn: (item: T) => R): Observable<R>;
    /**
     * @description
     * Returns a multiple-result Observable after applying the map function.
     */
    mapStream<R>(mapFn: (item: T) => R): Observable<R>;
}

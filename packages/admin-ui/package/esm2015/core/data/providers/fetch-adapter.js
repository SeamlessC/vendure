import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * An adapter that allows the Angular HttpClient to be used as a replacement for the global `fetch` function.
 * This is used to supply a custom fetch function to the apollo-upload-client whilst also allowing the
 * use of Angular's http infrastructure such as interceptors.
 */
export class FetchAdapter {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.fetch = (input, init) => {
            const url = typeof input === 'string' ? input : input.url;
            const method = typeof input === 'string' ? (init.method ? init.method : 'GET') : input.method;
            return this.httpClient
                .request(method, url, {
                body: init.body,
                headers: init.headers,
                observe: 'response',
                responseType: 'json',
                withCredentials: true,
            })
                .toPromise()
                .then(result => {
                return new Response(JSON.stringify(result.body), {
                    status: result.status,
                    statusText: result.statusText,
                });
            });
        };
    }
}
FetchAdapter.decorators = [
    { type: Injectable }
];
FetchAdapter.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9wcm92aWRlcnMvZmV0Y2gtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUUxQyxVQUFLLEdBQUcsQ0FBQyxLQUF1QixFQUFFLElBQWlCLEVBQXFCLEVBQUU7WUFDdEUsTUFBTSxHQUFHLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDMUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBRTlGLE9BQU8sSUFBSSxDQUFDLFVBQVU7aUJBQ2pCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFjO2dCQUM1QixPQUFPLEVBQUUsVUFBVTtnQkFDbkIsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLGVBQWUsRUFBRSxJQUFJO2FBQ3hCLENBQUM7aUJBQ0QsU0FBUyxFQUFFO2lCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDWCxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07b0JBQ3JCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtpQkFDaEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7SUFyQjJDLENBQUM7OztZQUZqRCxVQUFVOzs7WUFSRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBbiBhZGFwdGVyIHRoYXQgYWxsb3dzIHRoZSBBbmd1bGFyIEh0dHBDbGllbnQgdG8gYmUgdXNlZCBhcyBhIHJlcGxhY2VtZW50IGZvciB0aGUgZ2xvYmFsIGBmZXRjaGAgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIHVzZWQgdG8gc3VwcGx5IGEgY3VzdG9tIGZldGNoIGZ1bmN0aW9uIHRvIHRoZSBhcG9sbG8tdXBsb2FkLWNsaWVudCB3aGlsc3QgYWxzbyBhbGxvd2luZyB0aGVcbiAqIHVzZSBvZiBBbmd1bGFyJ3MgaHR0cCBpbmZyYXN0cnVjdHVyZSBzdWNoIGFzIGludGVyY2VwdG9ycy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZldGNoQWRhcHRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7fVxuXG4gICAgZmV0Y2ggPSAoaW5wdXQ6IFJlcXVlc3QgfCBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0KTogUHJvbWlzZTxSZXNwb25zZT4gPT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gaW5wdXQgOiBpbnB1dC51cmw7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyAoaW5pdC5tZXRob2QgPyBpbml0Lm1ldGhvZCA6ICdHRVQnKSA6IGlucHV0Lm1ldGhvZDtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAucmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IGluaXQuYm9keSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBpbml0LmhlYWRlcnMgYXMgYW55LFxuICAgICAgICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5ib2R5KSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3VsdC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn1cbiJdfQ==
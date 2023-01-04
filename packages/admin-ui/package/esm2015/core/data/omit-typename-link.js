import { ApolloLink } from '@apollo/client/core';
import { omit } from '@vendure/common/lib/omit';
/**
 * The "__typename" property added by Apollo Client causes errors when posting the entity
 * back in a mutation. Therefore this link will remove all such keys before the object
 * reaches the API layer.
 *
 * See: https://github.com/apollographql/apollo-client/issues/1913#issuecomment-393721604
 */
export class OmitTypenameLink extends ApolloLink {
    constructor() {
        super((operation, forward) => {
            if (operation.variables) {
                operation.variables = omit(operation.variables, ['__typename'], true);
            }
            return forward ? forward(operation) : null;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21pdC10eXBlbmFtZS1saW5rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL29taXQtdHlwZW5hbWUtbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhEOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3pCLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDckIsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBvbGxvTGluayB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvb21pdCc7XG5cbi8qKlxuICogVGhlIFwiX190eXBlbmFtZVwiIHByb3BlcnR5IGFkZGVkIGJ5IEFwb2xsbyBDbGllbnQgY2F1c2VzIGVycm9ycyB3aGVuIHBvc3RpbmcgdGhlIGVudGl0eVxuICogYmFjayBpbiBhIG11dGF0aW9uLiBUaGVyZWZvcmUgdGhpcyBsaW5rIHdpbGwgcmVtb3ZlIGFsbCBzdWNoIGtleXMgYmVmb3JlIHRoZSBvYmplY3RcbiAqIHJlYWNoZXMgdGhlIEFQSSBsYXllci5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcG9sbG9ncmFwaHFsL2Fwb2xsby1jbGllbnQvaXNzdWVzLzE5MTMjaXNzdWVjb21tZW50LTM5MzcyMTYwNFxuICovXG5leHBvcnQgY2xhc3MgT21pdFR5cGVuYW1lTGluayBleHRlbmRzIEFwb2xsb0xpbmsge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigob3BlcmF0aW9uLCBmb3J3YXJkKSA9PiB7XG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uLnZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbi52YXJpYWJsZXMgPSBvbWl0KG9wZXJhdGlvbi52YXJpYWJsZXMsIFsnX190eXBlbmFtZSddLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvcndhcmQgPyBmb3J3YXJkKG9wZXJhdGlvbikgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
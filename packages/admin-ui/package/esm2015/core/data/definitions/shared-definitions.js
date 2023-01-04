import { gql } from 'apollo-angular';
export const CONFIGURABLE_OPERATION_FRAGMENT = gql `
    fragment ConfigurableOperation on ConfigurableOperation {
        args {
            name
            value
        }
        code
    }
`;
export const CONFIGURABLE_OPERATION_DEF_FRAGMENT = gql `
    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {
        args {
            name
            type
            required
            defaultValue
            list
            ui
            label
            description
        }
        code
        description
    }
`;
export const ERROR_RESULT_FRAGMENT = gql `
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLWRlZmluaXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL2RlZmluaXRpb25zL3NoYXJlZC1kZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7OztDQVFqRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Q0FlckQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Q0FLdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQ29uZmlndXJhYmxlT3BlcmF0aW9uIG9uIENvbmZpZ3VyYWJsZU9wZXJhdGlvbiB7XG4gICAgICAgIGFyZ3Mge1xuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgfVxuICAgICAgICBjb2RlXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSQUJMRV9PUEVSQVRJT05fREVGX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZiBvbiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uIHtcbiAgICAgICAgYXJncyB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB0eXBlXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICBsaXN0XG4gICAgICAgICAgICB1aVxuICAgICAgICAgICAgbGFiZWxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgIH1cbiAgICAgICAgY29kZVxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9SRVNVTFRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRXJyb3JSZXN1bHQgb24gRXJyb3JSZXN1bHQge1xuICAgICAgICBlcnJvckNvZGVcbiAgICAgICAgbWVzc2FnZVxuICAgIH1cbmA7XG4iXX0=
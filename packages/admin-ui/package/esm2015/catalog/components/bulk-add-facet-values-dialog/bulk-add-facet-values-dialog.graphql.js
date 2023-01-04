import { gql } from 'apollo-angular';
export const GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS = gql `
    query GetProductsWithFacetValuesByIds($ids: [String!]!) {
        products(options: { filter: { id: { in: $ids } } }) {
            items {
                id
                name
                facetValues {
                    id
                    name
                    code
                    facet {
                        id
                        name
                        code
                    }
                }
            }
        }
    }
`;
export const GET_VARIANTS_WITH_FACET_VALUES_BY_IDS = gql `
    query GetVariantsWithFacetValuesByIds($ids: [String!]!) {
        productVariants(options: { filter: { id: { in: $ids } } }) {
            items {
                id
                name
                sku
                facetValues {
                    id
                    name
                    code
                    facet {
                        id
                        name
                        code
                    }
                }
            }
        }
    }
`;
export const UPDATE_PRODUCTS_BULK = gql `
    mutation UpdateProductsBulk($input: [UpdateProductInput!]!) {
        updateProducts(input: $input) {
            id
            name
            facetValues {
                id
                name
                code
            }
        }
    }
`;
export const UPDATE_VARIANTS_BULK = gql `
    mutation UpdateVariantsBulk($input: [UpdateProductVariantInput!]!) {
        updateProductVariants(input: $input) {
            id
            name
            facetValues {
                id
                name
                code
            }
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1hZGQtZmFjZXQtdmFsdWVzLWRpYWxvZy5ncmFwaHFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL2J1bGstYWRkLWZhY2V0LXZhbHVlcy1kaWFsb2cvYnVsay1hZGQtZmFjZXQtdmFsdWVzLWRpYWxvZy5ncmFwaHFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQnZELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0J2RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Q0FZdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWXRDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVFNfV0lUSF9GQUNFVF9WQUxVRVNfQllfSURTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RzV2l0aEZhY2V0VmFsdWVzQnlJZHMoJGlkczogW1N0cmluZyFdISkge1xuICAgICAgICBwcm9kdWN0cyhvcHRpb25zOiB7IGZpbHRlcjogeyBpZDogeyBpbjogJGlkcyB9IH0gfSkge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGZhY2V0VmFsdWVzIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgICAgIGZhY2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1ZBUklBTlRTX1dJVEhfRkFDRVRfVkFMVUVTX0JZX0lEUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRWYXJpYW50c1dpdGhGYWNldFZhbHVlc0J5SWRzKCRpZHM6IFtTdHJpbmchXSEpIHtcbiAgICAgICAgcHJvZHVjdFZhcmlhbnRzKG9wdGlvbnM6IHsgZmlsdGVyOiB7IGlkOiB7IGluOiAkaWRzIH0gfSB9KSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgc2t1XG4gICAgICAgICAgICAgICAgZmFjZXRWYWx1ZXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgZmFjZXQge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfUFJPRFVDVFNfQlVMSyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVQcm9kdWN0c0J1bGsoJGlucHV0OiBbVXBkYXRlUHJvZHVjdElucHV0IV0hKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3RzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBmYWNldFZhbHVlcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9WQVJJQU5UU19CVUxLID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVZhcmlhbnRzQnVsaygkaW5wdXQ6IFtVcGRhdGVQcm9kdWN0VmFyaWFudElucHV0IV0hKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3RWYXJpYW50cyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgZmFjZXRWYWx1ZXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG4iXX0=
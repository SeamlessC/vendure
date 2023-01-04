import { gql } from 'apollo-angular';
export const FACET_VALUE_FRAGMENT = gql `
    fragment FacetValue on FacetValue {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            languageCode
            name
        }
        facet {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
export const FACET_WITH_VALUES_FRAGMENT = gql `
    fragment FacetWithValues on Facet {
        id
        createdAt
        updatedAt
        languageCode
        isPrivate
        code
        name
        translations {
            id
            languageCode
            name
        }
        values {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
export const CREATE_FACET = gql `
    mutation CreateFacet($input: CreateFacetInput!) {
        createFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
export const UPDATE_FACET = gql `
    mutation UpdateFacet($input: UpdateFacetInput!) {
        updateFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
export const DELETE_FACET = gql `
    mutation DeleteFacet($id: ID!, $force: Boolean) {
        deleteFacet(id: $id, force: $force) {
            result
            message
        }
    }
`;
export const DELETE_FACETS = gql `
    mutation DeleteFacets($ids: [ID!]!, $force: Boolean) {
        deleteFacets(ids: $ids, force: $force) {
            result
            message
        }
    }
`;
export const CREATE_FACET_VALUES = gql `
    mutation CreateFacetValues($input: [CreateFacetValueInput!]!) {
        createFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
export const UPDATE_FACET_VALUES = gql `
    mutation UpdateFacetValues($input: [UpdateFacetValueInput!]!) {
        updateFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
export const DELETE_FACET_VALUES = gql `
    mutation DeleteFacetValues($ids: [ID!]!, $force: Boolean) {
        deleteFacetValues(ids: $ids, force: $force) {
            result
            message
        }
    }
`;
export const GET_FACET_LIST = gql `
    query GetFacetList($options: FacetListOptions) {
        facets(options: $options) {
            items {
                ...FacetWithValues
            }
            totalItems
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
export const GET_FACET_WITH_VALUES = gql `
    query GetFacetWithValues($id: ID!) {
        facet(id: $id) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
export const ASSIGN_FACETS_TO_CHANNEL = gql `
    mutation AssignFacetsToChannel($input: AssignFacetsToChannelInput!) {
        assignFacetsToChannel(input: $input) {
            id
        }
    }
`;
export const REMOVE_FACETS_FROM_CHANNEL = gql `
    mutation RemoveFacetsFromChannel($input: RemoveFacetsFromChannelInput!) {
        removeFacetsFromChannel(input: $input) {
            ... on Facet {
                id
            }
            ... on FacetInUseError {
                errorCode
                message
                variantCount
                productCount
            }
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvZmFjZXQtZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQnRDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWtCdkMsb0JBQW9CO0NBQ3pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNekIsMEJBQTBCO0NBQy9CLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNekIsMEJBQTBCO0NBQy9CLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBTzlCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBTy9CLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1oQyxvQkFBb0I7Q0FDekIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTWhDLG9CQUFvQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT3JDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7TUFTM0IsMEJBQTBCO0NBQy9CLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1sQywwQkFBMEI7Q0FDL0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTs7Ozs7O0NBTTFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7O0NBYzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBGQUNFVF9WQUxVRV9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBGYWNldFZhbHVlIG9uIEZhY2V0VmFsdWUge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBjb2RlXG4gICAgICAgIG5hbWVcbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBmYWNldCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBGQUNFVF9XSVRIX1ZBTFVFU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBGYWNldFdpdGhWYWx1ZXMgb24gRmFjZXQge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBpc1ByaXZhdGVcbiAgICAgICAgY29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzIHtcbiAgICAgICAgICAgIC4uLkZhY2V0VmFsdWVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0ZBQ0VUX1ZBTFVFX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9GQUNFVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVGYWNldCgkaW5wdXQ6IENyZWF0ZUZhY2V0SW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUZhY2V0KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkZhY2V0V2l0aFZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7RkFDRVRfV0lUSF9WQUxVRVNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZBQ0VUID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUZhY2V0KCRpbnB1dDogVXBkYXRlRmFjZXRJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlRmFjZXQoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uRmFjZXRXaXRoVmFsdWVzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtGQUNFVF9XSVRIX1ZBTFVFU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfRkFDRVQgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlRmFjZXQoJGlkOiBJRCEsICRmb3JjZTogQm9vbGVhbikge1xuICAgICAgICBkZWxldGVGYWNldChpZDogJGlkLCBmb3JjZTogJGZvcmNlKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfRkFDRVRTID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUZhY2V0cygkaWRzOiBbSUQhXSEsICRmb3JjZTogQm9vbGVhbikge1xuICAgICAgICBkZWxldGVGYWNldHMoaWRzOiAkaWRzLCBmb3JjZTogJGZvcmNlKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfRkFDRVRfVkFMVUVTID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUZhY2V0VmFsdWVzKCRpbnB1dDogW0NyZWF0ZUZhY2V0VmFsdWVJbnB1dCFdISkge1xuICAgICAgICBjcmVhdGVGYWNldFZhbHVlcyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5GYWNldFZhbHVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtGQUNFVF9WQUxVRV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfRkFDRVRfVkFMVUVTID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUZhY2V0VmFsdWVzKCRpbnB1dDogW1VwZGF0ZUZhY2V0VmFsdWVJbnB1dCFdISkge1xuICAgICAgICB1cGRhdGVGYWNldFZhbHVlcyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5GYWNldFZhbHVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtGQUNFVF9WQUxVRV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfRkFDRVRfVkFMVUVTID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUZhY2V0VmFsdWVzKCRpZHM6IFtJRCFdISwgJGZvcmNlOiBCb29sZWFuKSB7XG4gICAgICAgIGRlbGV0ZUZhY2V0VmFsdWVzKGlkczogJGlkcywgZm9yY2U6ICRmb3JjZSkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0ZBQ0VUX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0RmFjZXRMaXN0KCRvcHRpb25zOiBGYWNldExpc3RPcHRpb25zKSB7XG4gICAgICAgIGZhY2V0cyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLkZhY2V0V2l0aFZhbHVlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7RkFDRVRfV0lUSF9WQUxVRVNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0ZBQ0VUX1dJVEhfVkFMVUVTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEZhY2V0V2l0aFZhbHVlcygkaWQ6IElEISkge1xuICAgICAgICBmYWNldChpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5GYWNldFdpdGhWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0ZBQ0VUX1dJVEhfVkFMVUVTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEFTU0lHTl9GQUNFVFNfVE9fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBc3NpZ25GYWNldHNUb0NoYW5uZWwoJGlucHV0OiBBc3NpZ25GYWNldHNUb0NoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgYXNzaWduRmFjZXRzVG9DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX0ZBQ0VUU19GUk9NX0NIQU5ORUwgPSBncWxgXG4gICAgbXV0YXRpb24gUmVtb3ZlRmFjZXRzRnJvbUNoYW5uZWwoJGlucHV0OiBSZW1vdmVGYWNldHNGcm9tQ2hhbm5lbElucHV0ISkge1xuICAgICAgICByZW1vdmVGYWNldHNGcm9tQ2hhbm5lbChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi4gb24gRmFjZXQge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi4gb24gRmFjZXRJblVzZUVycm9yIHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGVcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdmFyaWFudENvdW50XG4gICAgICAgICAgICAgICAgcHJvZHVjdENvdW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuIl19
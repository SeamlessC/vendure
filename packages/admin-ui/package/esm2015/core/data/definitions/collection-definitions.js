import { gql } from 'apollo-angular';
import { ASSET_FRAGMENT } from './product-definitions';
import { CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT } from './shared-definitions';
export const GET_COLLECTION_FILTERS = gql `
    query GetCollectionFilters {
        collectionFilters {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
export const COLLECTION_FRAGMENT = gql `
    fragment Collection on Collection {
        id
        createdAt
        updatedAt
        name
        slug
        description
        isPrivate
        languageCode
        breadcrumbs {
            id
            name
            slug
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        filters {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        parent {
            id
            name
        }
        children {
            id
            name
        }
    }
    ${ASSET_FRAGMENT}
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
export const GET_COLLECTION_LIST = gql `
    query GetCollectionList($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                description
                isPrivate
                featuredAsset {
                    ...Asset
                }
                parent {
                    id
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
`;
export const GET_COLLECTION = gql `
    query GetCollection($id: ID!) {
        collection(id: $id) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const CREATE_COLLECTION = gql `
    mutation CreateCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const UPDATE_COLLECTION = gql `
    mutation UpdateCollection($input: UpdateCollectionInput!) {
        updateCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const MOVE_COLLECTION = gql `
    mutation MoveCollection($input: MoveCollectionInput!) {
        moveCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const DELETE_COLLECTION = gql `
    mutation DeleteCollection($id: ID!) {
        deleteCollection(id: $id) {
            result
            message
        }
    }
`;
export const DELETE_COLLECTIONS = gql `
    mutation DeleteCollections($ids: [ID!]!) {
        deleteCollections(ids: $ids) {
            result
            message
        }
    }
`;
export const GET_COLLECTION_CONTENTS = gql `
    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {
        collection(id: $id) {
            id
            name
            productVariants(options: $options) {
                items {
                    id
                    productId
                    name
                    sku
                }
                totalItems
            }
        }
    }
`;
export const PREVIEW_COLLECTION_CONTENTS = gql `
    query PreviewCollectionContents(
        $input: PreviewCollectionVariantsInput!
        $options: ProductVariantListOptions
    ) {
        previewCollectionVariants(input: $input, options: $options) {
            items {
                id
                productId
                name
                sku
            }
            totalItems
        }
    }
`;
export const ASSIGN_COLLECTIONS_TO_CHANNEL = gql `
    mutation AssignCollectionsToChannel($input: AssignCollectionsToChannelInput!) {
        assignCollectionsToChannel(input: $input) {
            id
            name
        }
    }
`;
export const REMOVE_COLLECTIONS_FROM_CHANNEL = gql `
    mutation RemoveCollectionsFromChannel($input: RemoveCollectionsFromChannelInput!) {
        removeCollectionsFromChannel(input: $input) {
            id
            name
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9jb2xsZWN0aW9uLWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUcsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNbkMsbUNBQW1DO0NBQ3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF3Q2hDLGNBQWM7TUFDZCwrQkFBK0I7Q0FDcEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CaEMsY0FBYztDQUNuQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTTNCLG1CQUFtQjtDQUN4QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNOUIsbUJBQW1CO0NBQ3hCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU05QixtQkFBbUI7Q0FDeEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU01QixtQkFBbUI7Q0FDeEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU9uQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT3BDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQnpDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7OztDQWU3QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBTy9DLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuaW1wb3J0IHsgQVNTRVRfRlJBR01FTlQgfSBmcm9tICcuL3Byb2R1Y3QtZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgQ09ORklHVVJBQkxFX09QRVJBVElPTl9ERUZfRlJBR01FTlQsIENPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlQgfSBmcm9tICcuL3NoYXJlZC1kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ09MTEVDVElPTl9GSUxURVJTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENvbGxlY3Rpb25GaWx0ZXJzIHtcbiAgICAgICAgY29sbGVjdGlvbkZpbHRlcnMge1xuICAgICAgICAgICAgLi4uQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0RFRl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDT0xMRUNUSU9OX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IENvbGxlY3Rpb24gb24gQ29sbGVjdGlvbiB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgbmFtZVxuICAgICAgICBzbHVnXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgIGlzUHJpdmF0ZVxuICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgYnJlYWRjcnVtYnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHNsdWdcbiAgICAgICAgfVxuICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXRzIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgZmlsdGVycyB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25cbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdGlvbnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgc2x1Z1xuICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG4gICAgJHtDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DT0xMRUNUSU9OX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0Q29sbGVjdGlvbkxpc3QoJG9wdGlvbnM6IENvbGxlY3Rpb25MaXN0T3B0aW9ucykge1xuICAgICAgICBjb2xsZWN0aW9ucyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNsdWdcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgIGlzUHJpdmF0ZVxuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FTU0VUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DT0xMRUNUSU9OID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENvbGxlY3Rpb24oJGlkOiBJRCEpIHtcbiAgICAgICAgY29sbGVjdGlvbihpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Db2xsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT0xMRUNUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9DT0xMRUNUSU9OID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUNvbGxlY3Rpb24oJGlucHV0OiBDcmVhdGVDb2xsZWN0aW9uSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUNvbGxlY3Rpb24oaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ29sbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09MTEVDVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ09MTEVDVElPTiA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDb2xsZWN0aW9uKCRpbnB1dDogVXBkYXRlQ29sbGVjdGlvbklucHV0ISkge1xuICAgICAgICB1cGRhdGVDb2xsZWN0aW9uKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkNvbGxlY3Rpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTExFQ1RJT05fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgTU9WRV9DT0xMRUNUSU9OID0gZ3FsYFxuICAgIG11dGF0aW9uIE1vdmVDb2xsZWN0aW9uKCRpbnB1dDogTW92ZUNvbGxlY3Rpb25JbnB1dCEpIHtcbiAgICAgICAgbW92ZUNvbGxlY3Rpb24oaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ29sbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09MTEVDVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfQ09MTEVDVElPTiA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVDb2xsZWN0aW9uKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUNvbGxlY3Rpb24oaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NPTExFQ1RJT05TID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUNvbGxlY3Rpb25zKCRpZHM6IFtJRCFdISkge1xuICAgICAgICBkZWxldGVDb2xsZWN0aW9ucyhpZHM6ICRpZHMpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DT0xMRUNUSU9OX0NPTlRFTlRTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENvbGxlY3Rpb25Db250ZW50cygkaWQ6IElEISwgJG9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY29sbGVjdGlvbihpZDogJGlkKSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWRcbiAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICBza3VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBSRVZJRVdfQ09MTEVDVElPTl9DT05URU5UUyA9IGdxbGBcbiAgICBxdWVyeSBQcmV2aWV3Q29sbGVjdGlvbkNvbnRlbnRzKFxuICAgICAgICAkaW5wdXQ6IFByZXZpZXdDb2xsZWN0aW9uVmFyaWFudHNJbnB1dCFcbiAgICAgICAgJG9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgcHJldmlld0NvbGxlY3Rpb25WYXJpYW50cyhpbnB1dDogJGlucHV0LCBvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEFTU0lHTl9DT0xMRUNUSU9OU19UT19DSEFOTkVMID0gZ3FsYFxuICAgIG11dGF0aW9uIEFzc2lnbkNvbGxlY3Rpb25zVG9DaGFubmVsKCRpbnB1dDogQXNzaWduQ29sbGVjdGlvbnNUb0NoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgYXNzaWduQ29sbGVjdGlvbnNUb0NoYW5uZWwoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRU1PVkVfQ09MTEVDVElPTlNfRlJPTV9DSEFOTkVMID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlbW92ZUNvbGxlY3Rpb25zRnJvbUNoYW5uZWwoJGlucHV0OiBSZW1vdmVDb2xsZWN0aW9uc0Zyb21DaGFubmVsSW5wdXQhKSB7XG4gICAgICAgIHJlbW92ZUNvbGxlY3Rpb25zRnJvbUNoYW5uZWwoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG4iXX0=
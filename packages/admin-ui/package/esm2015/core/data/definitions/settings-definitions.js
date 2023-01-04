import { gql } from 'apollo-angular';
import { CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT, ERROR_RESULT_FRAGMENT, } from './shared-definitions';
export const COUNTRY_FRAGMENT = gql `
    fragment Country on Country {
        id
        createdAt
        updatedAt
        code
        name
        enabled
        translations {
            id
            languageCode
            name
        }
    }
`;
export const GET_COUNTRY_LIST = gql `
    query GetCountryList($options: CountryListOptions) {
        countries(options: $options) {
            items {
                id
                code
                name
                enabled
            }
            totalItems
        }
    }
`;
export const GET_AVAILABLE_COUNTRIES = gql `
    query GetAvailableCountries {
        countries(options: { filter: { enabled: { eq: true } } }) {
            items {
                id
                code
                name
                enabled
            }
        }
    }
`;
export const GET_COUNTRY = gql `
    query GetCountry($id: ID!) {
        country(id: $id) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const CREATE_COUNTRY = gql `
    mutation CreateCountry($input: CreateCountryInput!) {
        createCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const UPDATE_COUNTRY = gql `
    mutation UpdateCountry($input: UpdateCountryInput!) {
        updateCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const DELETE_COUNTRY = gql `
    mutation DeleteCountry($id: ID!) {
        deleteCountry(id: $id) {
            result
            message
        }
    }
`;
export const ZONE_FRAGMENT = gql `
    fragment Zone on Zone {
        id
        createdAt
        updatedAt
        name
        members {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const GET_ZONES = gql `
    query GetZones {
        zones {
            ...Zone
            members {
                createdAt
                updatedAt
                id
                name
                code
                enabled
            }
        }
    }
    ${ZONE_FRAGMENT}
`;
export const GET_ZONE = gql `
    query GetZone($id: ID!) {
        zone(id: $id) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const CREATE_ZONE = gql `
    mutation CreateZone($input: CreateZoneInput!) {
        createZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const UPDATE_ZONE = gql `
    mutation UpdateZone($input: UpdateZoneInput!) {
        updateZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const DELETE_ZONE = gql `
    mutation DeleteZone($id: ID!) {
        deleteZone(id: $id) {
            message
            result
        }
    }
`;
export const ADD_MEMBERS_TO_ZONE = gql `
    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {
        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const REMOVE_MEMBERS_FROM_ZONE = gql `
    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {
        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const TAX_CATEGORY_FRAGMENT = gql `
    fragment TaxCategory on TaxCategory {
        id
        createdAt
        updatedAt
        name
        isDefault
    }
`;
export const GET_TAX_CATEGORIES = gql `
    query GetTaxCategories {
        taxCategories {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const GET_TAX_CATEGORY = gql `
    query GetTaxCategory($id: ID!) {
        taxCategory(id: $id) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const CREATE_TAX_CATEGORY = gql `
    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {
        createTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const UPDATE_TAX_CATEGORY = gql `
    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {
        updateTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const DELETE_TAX_CATEGORY = gql `
    mutation DeleteTaxCategory($id: ID!) {
        deleteTaxCategory(id: $id) {
            result
            message
        }
    }
`;
export const TAX_RATE_FRAGMENT = gql `
    fragment TaxRate on TaxRate {
        id
        createdAt
        updatedAt
        name
        enabled
        value
        category {
            id
            name
        }
        zone {
            id
            name
        }
        customerGroup {
            id
            name
        }
    }
`;
export const GET_TAX_RATE_LIST = gql `
    query GetTaxRateList($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                ...TaxRate
            }
            totalItems
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const GET_TAX_RATE_LIST_SIMPLE = gql `
    query GetTaxRateListSimple($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                id
                createdAt
                updatedAt
                name
                enabled
                value
                category {
                    id
                    name
                }
                zone {
                    id
                    name
                }
            }
            totalItems
        }
    }
`;
export const GET_TAX_RATE = gql `
    query GetTaxRate($id: ID!) {
        taxRate(id: $id) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const CREATE_TAX_RATE = gql `
    mutation CreateTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const UPDATE_TAX_RATE = gql `
    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {
        updateTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const DELETE_TAX_RATE = gql `
    mutation DeleteTaxRate($id: ID!) {
        deleteTaxRate(id: $id) {
            result
            message
        }
    }
`;
export const CHANNEL_FRAGMENT = gql `
    fragment Channel on Channel {
        id
        createdAt
        updatedAt
        code
        token
        pricesIncludeTax
        currencyCode
        defaultLanguageCode
        defaultShippingZone {
            id
            name
        }
        defaultTaxZone {
            id
            name
        }
        customFields {
            isOpen
        }
    }
`;
export const GET_CHANNELS = gql `
    query GetChannels {
        channels {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const GET_CHANNEL = gql `
    query GetChannel($id: ID!) {
        channel(id: $id) {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const GET_ACTIVE_CHANNEL = gql `
    query GetActiveChannel {
        activeChannel {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const CREATE_CHANNEL = gql `
    mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_CHANNEL = gql `
    mutation UpdateChannel($input: UpdateChannelInput!) {
        updateChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const DELETE_CHANNEL = gql `
    mutation DeleteChannel($id: ID!) {
        deleteChannel(id: $id) {
            result
            message
        }
    }
`;
export const PAYMENT_METHOD_FRAGMENT = gql `
    fragment PaymentMethod on PaymentMethod {
        id
        createdAt
        updatedAt
        name
        code
        description
        enabled
        checker {
            ...ConfigurableOperation
        }
        handler {
            ...ConfigurableOperation
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
export const GET_PAYMENT_METHOD_LIST = gql `
    query GetPaymentMethodList($options: PaymentMethodListOptions!) {
        paymentMethods(options: $options) {
            items {
                ...PaymentMethod
            }
            totalItems
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const GET_PAYMENT_METHOD_OPERATIONS = gql `
    query GetPaymentMethodOperations {
        paymentMethodEligibilityCheckers {
            ...ConfigurableOperationDef
        }
        paymentMethodHandlers {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
export const GET_PAYMENT_METHOD = gql `
    query GetPaymentMethod($id: ID!) {
        paymentMethod(id: $id) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const CREATE_PAYMENT_METHOD = gql `
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
        createPaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const UPDATE_PAYMENT_METHOD = gql `
    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {
        updatePaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const DELETE_PAYMENT_METHOD = gql `
    mutation DeletePaymentMethod($id: ID!, $force: Boolean) {
        deletePaymentMethod(id: $id, force: $force) {
            result
            message
        }
    }
`;
export const GLOBAL_SETTINGS_FRAGMENT = gql `
    fragment GlobalSettings on GlobalSettings {
        id
        availableLanguages
        trackInventory
        outOfStockThreshold
        serverConfig {
            permissions {
                name
                description
                assignable
            }
            orderProcess {
                name
            }
        }
    }
`;
export const GET_GLOBAL_SETTINGS = gql `
    query GetGlobalSettings {
        globalSettings {
            ...GlobalSettings
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
`;
export const UPDATE_GLOBAL_SETTINGS = gql `
    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {
        updateGlobalSettings(input: $input) {
            ...GlobalSettings
            ...ErrorResult
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CUSTOM_FIELD_CONFIG_FRAGMENT = gql `
    fragment CustomFieldConfig on CustomField {
        name
        type
        list
        description {
            languageCode
            value
        }
        label {
            languageCode
            value
        }
        readonly
        nullable
        ui
    }
`;
export const STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment StringCustomField on StringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
        options {
            label {
                languageCode
                value
            }
            value
        }
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const LOCALE_STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const TEXT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment TextCustomField on TextCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const BOOLEAN_CUSTOM_FIELD_FRAGMENT = gql `
    fragment BooleanCustomField on BooleanCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const INT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment IntCustomField on IntCustomFieldConfig {
        ...CustomFieldConfig
        intMin: min
        intMax: max
        intStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const FLOAT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment FloatCustomField on FloatCustomFieldConfig {
        ...CustomFieldConfig
        floatMin: min
        floatMax: max
        floatStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const DATE_TIME_CUSTOM_FIELD_FRAGMENT = gql `
    fragment DateTimeCustomField on DateTimeCustomFieldConfig {
        ...CustomFieldConfig
        datetimeMin: min
        datetimeMax: max
        datetimeStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const RELATION_CUSTOM_FIELD_FRAGMENT = gql `
    fragment RelationCustomField on RelationCustomFieldConfig {
        ...CustomFieldConfig
        entity
        scalarFields
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const ALL_CUSTOM_FIELDS_FRAGMENT = gql `
    fragment CustomFields on CustomField {
        ... on StringCustomFieldConfig {
            ...StringCustomField
        }
        ... on LocaleStringCustomFieldConfig {
            ...LocaleStringCustomField
        }
        ... on TextCustomFieldConfig {
            ...TextCustomField
        }
        ... on BooleanCustomFieldConfig {
            ...BooleanCustomField
        }
        ... on IntCustomFieldConfig {
            ...IntCustomField
        }
        ... on FloatCustomFieldConfig {
            ...FloatCustomField
        }
        ... on DateTimeCustomFieldConfig {
            ...DateTimeCustomField
        }
        ... on RelationCustomFieldConfig {
            ...RelationCustomField
        }
    }
    ${STRING_CUSTOM_FIELD_FRAGMENT}
    ${LOCALE_STRING_CUSTOM_FIELD_FRAGMENT}
    ${TEXT_CUSTOM_FIELD_FRAGMENT}
    ${BOOLEAN_CUSTOM_FIELD_FRAGMENT}
    ${INT_CUSTOM_FIELD_FRAGMENT}
    ${FLOAT_CUSTOM_FIELD_FRAGMENT}
    ${DATE_TIME_CUSTOM_FIELD_FRAGMENT}
    ${RELATION_CUSTOM_FIELD_FRAGMENT}
`;
export const GET_SERVER_CONFIG = gql `
    query GetServerConfig {
        globalSettings {
            id
            serverConfig {
                orderProcess {
                    name
                    to
                }
                permittedAssetTypes
                permissions {
                    name
                    description
                    assignable
                }
                customFieldConfig {
                    Address {
                        ...CustomFields
                    }
                    Administrator {
                        ...CustomFields
                    }
                    Asset {
                        ...CustomFields
                    }
                    Channel {
                        ...CustomFields
                    }
                    Collection {
                        ...CustomFields
                    }
                    Country {
                        ...CustomFields
                    }
                    Customer {
                        ...CustomFields
                    }
                    CustomerGroup {
                        ...CustomFields
                    }
                    Facet {
                        ...CustomFields
                    }
                    FacetValue {
                        ...CustomFields
                    }
                    Fulfillment {
                        ...CustomFields
                    }
                    GlobalSettings {
                        ...CustomFields
                    }
                    Order {
                        ...CustomFields
                    }
                    OrderLine {
                        ...CustomFields
                    }
                    PaymentMethod {
                        ...CustomFields
                    }
                    Product {
                        ...CustomFields
                    }
                    ProductOption {
                        ...CustomFields
                    }
                    ProductOptionGroup {
                        ...CustomFields
                    }
                    ProductVariant {
                        ...CustomFields
                    }
                    Promotion {
                        ...CustomFields
                    }
                    ShippingMethod {
                        ...CustomFields
                    }
                    TaxCategory {
                        ...CustomFields
                    }
                    TaxRate {
                        ...CustomFields
                    }
                    User {
                        ...CustomFields
                    }
                    Zone {
                        ...CustomFields
                    }
                }
            }
        }
    }
    ${ALL_CUSTOM_FIELDS_FRAGMENT}
`;
export const JOB_INFO_FRAGMENT = gql `
    fragment JobInfo on Job {
        id
        createdAt
        startedAt
        settledAt
        queueName
        state
        isSettled
        progress
        duration
        data
        result
        error
        retries
        attempts
    }
`;
export const GET_JOB_INFO = gql `
    query GetJobInfo($id: ID!) {
        job(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOBS_LIST = gql `
    query GetAllJobs($options: JobListOptions) {
        jobs(options: $options) {
            items {
                ...JobInfo
            }
            totalItems
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOBS_BY_ID = gql `
    query GetJobsById($ids: [ID!]!) {
        jobsById(jobIds: $ids) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOB_QUEUE_LIST = gql `
    query GetJobQueueList {
        jobQueues {
            name
            running
        }
    }
`;
export const CANCEL_JOB = gql `
    mutation CancelJob($id: ID!) {
        cancelJob(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const REINDEX = gql `
    mutation Reindex {
        reindex {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_PENDING_SEARCH_INDEX_UPDATES = gql `
    query GetPendingSearchIndexUpdates {
        pendingSearchIndexUpdates
    }
`;
export const RUN_PENDING_SEARCH_INDEX_UPDATES = gql `
    mutation RunPendingSearchIndexUpdates {
        runPendingSearchIndexUpdates {
            success
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvc2V0dGluZ3MtZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQ0FBbUMsRUFDbkMsK0JBQStCLEVBQy9CLHFCQUFxQixHQUN4QixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Q0FjbEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWWxDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3pDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNeEIsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNM0IsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNM0IsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT2hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O01BVTFCLGdCQUFnQjtDQUNyQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7TUFjdEIsYUFBYTtDQUNsQixDQUFDO0FBRUYsTUFB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R0FBRyxDQUFBOzs7Ozs7TUFNekIsaUJBQWlCO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7TUFTMUIsaUJBQWlCO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNM0IsaUJBQWlCO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPcEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU12QixpQkFBaUI7Q0FDdEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1wQixpQkFBaUI7Q0FDdEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLEdBQUcsQ0FBQTs7OztDQUlsRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0NBQWdDLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Q0FNbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuaW1wb3J0IHtcbiAgICBDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0RFRl9GUkFHTUVOVCxcbiAgICBDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0ZSQUdNRU5ULFxuICAgIEVSUk9SX1JFU1VMVF9GUkFHTUVOVCxcbn0gZnJvbSAnLi9zaGFyZWQtZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgQ09VTlRSWV9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDb3VudHJ5IG9uIENvdW50cnkge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGNvZGVcbiAgICAgICAgbmFtZVxuICAgICAgICBlbmFibGVkXG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NPVU5UUllfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRDb3VudHJ5TGlzdCgkb3B0aW9uczogQ291bnRyeUxpc3RPcHRpb25zKSB7XG4gICAgICAgIGNvdW50cmllcyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0FWQUlMQUJMRV9DT1VOVFJJRVMgPSBncWxgXG4gICAgcXVlcnkgR2V0QXZhaWxhYmxlQ291bnRyaWVzIHtcbiAgICAgICAgY291bnRyaWVzKG9wdGlvbnM6IHsgZmlsdGVyOiB7IGVuYWJsZWQ6IHsgZXE6IHRydWUgfSB9IH0pIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgZW5hYmxlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJZID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENvdW50cnkoJGlkOiBJRCEpIHtcbiAgICAgICAgY291bnRyeShpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Db3VudHJ5XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT1VOVFJZX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9DT1VOVFJZID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUNvdW50cnkoJGlucHV0OiBDcmVhdGVDb3VudHJ5SW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUNvdW50cnkoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ291bnRyeVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09VTlRSWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ09VTlRSWSA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDb3VudHJ5KCRpbnB1dDogVXBkYXRlQ291bnRyeUlucHV0ISkge1xuICAgICAgICB1cGRhdGVDb3VudHJ5KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkNvdW50cnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPVU5UUllfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NPVU5UUlkgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlQ291bnRyeSgkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVDb3VudHJ5KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFpPTkVfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgWm9uZSBvbiBab25lIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBuYW1lXG4gICAgICAgIG1lbWJlcnMge1xuICAgICAgICAgICAgLi4uQ291bnRyeVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09VTlRSWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfWk9ORVMgPSBncWxgXG4gICAgcXVlcnkgR2V0Wm9uZXMge1xuICAgICAgICB6b25lcyB7XG4gICAgICAgICAgICAuLi5ab25lXG4gICAgICAgICAgICBtZW1iZXJzIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgZW5hYmxlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Wk9ORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfWk9ORSA9IGdxbGBcbiAgICBxdWVyeSBHZXRab25lKCRpZDogSUQhKSB7XG4gICAgICAgIHpvbmUoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uWm9uZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Wk9ORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfWk9ORSA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVab25lKCRpbnB1dDogQ3JlYXRlWm9uZUlucHV0ISkge1xuICAgICAgICBjcmVhdGVab25lKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlpvbmVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1pPTkVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1pPTkUgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlWm9uZSgkaW5wdXQ6IFVwZGF0ZVpvbmVJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlWm9uZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5ab25lXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtaT05FX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9aT05FID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVpvbmUoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlWm9uZShpZDogJGlkKSB7XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfTUVNQkVSU19UT19aT05FID0gZ3FsYFxuICAgIG11dGF0aW9uIEFkZE1lbWJlcnNUb1pvbmUoJHpvbmVJZDogSUQhLCAkbWVtYmVySWRzOiBbSUQhXSEpIHtcbiAgICAgICAgYWRkTWVtYmVyc1RvWm9uZSh6b25lSWQ6ICR6b25lSWQsIG1lbWJlcklkczogJG1lbWJlcklkcykge1xuICAgICAgICAgICAgLi4uWm9uZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Wk9ORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRU1PVkVfTUVNQkVSU19GUk9NX1pPTkUgPSBncWxgXG4gICAgbXV0YXRpb24gUmVtb3ZlTWVtYmVyc0Zyb21ab25lKCR6b25lSWQ6IElEISwgJG1lbWJlcklkczogW0lEIV0hKSB7XG4gICAgICAgIHJlbW92ZU1lbWJlcnNGcm9tWm9uZSh6b25lSWQ6ICR6b25lSWQsIG1lbWJlcklkczogJG1lbWJlcklkcykge1xuICAgICAgICAgICAgLi4uWm9uZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Wk9ORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUQVhfQ0FURUdPUllfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgVGF4Q2F0ZWdvcnkgb24gVGF4Q2F0ZWdvcnkge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgaXNEZWZhdWx0XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9UQVhfQ0FURUdPUklFUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRUYXhDYXRlZ29yaWVzIHtcbiAgICAgICAgdGF4Q2F0ZWdvcmllcyB7XG4gICAgICAgICAgICAuLi5UYXhDYXRlZ29yeVxuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFYX0NBVEVHT1JZX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9UQVhfQ0FURUdPUlkgPSBncWxgXG4gICAgcXVlcnkgR2V0VGF4Q2F0ZWdvcnkoJGlkOiBJRCEpIHtcbiAgICAgICAgdGF4Q2F0ZWdvcnkoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uVGF4Q2F0ZWdvcnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBWF9DQVRFR09SWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfVEFYX0NBVEVHT1JZID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVRheENhdGVnb3J5KCRpbnB1dDogQ3JlYXRlVGF4Q2F0ZWdvcnlJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlVGF4Q2F0ZWdvcnkoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uVGF4Q2F0ZWdvcnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBWF9DQVRFR09SWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfVEFYX0NBVEVHT1JZID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVRheENhdGVnb3J5KCRpbnB1dDogVXBkYXRlVGF4Q2F0ZWdvcnlJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlVGF4Q2F0ZWdvcnkoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uVGF4Q2F0ZWdvcnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBWF9DQVRFR09SWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfVEFYX0NBVEVHT1JZID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVRheENhdGVnb3J5KCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZVRheENhdGVnb3J5KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRBWF9SQVRFX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFRheFJhdGUgb24gVGF4UmF0ZSB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgbmFtZVxuICAgICAgICBlbmFibGVkXG4gICAgICAgIHZhbHVlXG4gICAgICAgIGNhdGVnb3J5IHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICAgICAgem9uZSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIGN1c3RvbWVyR3JvdXAge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVEFYX1JBVEVfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRUYXhSYXRlTGlzdCgkb3B0aW9uczogVGF4UmF0ZUxpc3RPcHRpb25zKSB7XG4gICAgICAgIHRheFJhdGVzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgLi4uVGF4UmF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFYX1JBVEVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1RBWF9SQVRFX0xJU1RfU0lNUExFID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFRheFJhdGVMaXN0U2ltcGxlKCRvcHRpb25zOiBUYXhSYXRlTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgdGF4UmF0ZXMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICBjYXRlZ29yeSB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgem9uZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1RBWF9SQVRFID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFRheFJhdGUoJGlkOiBJRCEpIHtcbiAgICAgICAgdGF4UmF0ZShpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5UYXhSYXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfUkFURV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfVEFYX1JBVEUgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlVGF4UmF0ZSgkaW5wdXQ6IENyZWF0ZVRheFJhdGVJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlVGF4UmF0ZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5UYXhSYXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfUkFURV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfVEFYX1JBVEUgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlVGF4UmF0ZSgkaW5wdXQ6IFVwZGF0ZVRheFJhdGVJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlVGF4UmF0ZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5UYXhSYXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfUkFURV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfVEFYX1JBVEUgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlVGF4UmF0ZSgkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVUYXhSYXRlKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQ2hhbm5lbCBvbiBDaGFubmVsIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBjb2RlXG4gICAgICAgIHRva2VuXG4gICAgICAgIHByaWNlc0luY2x1ZGVUYXhcbiAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGVcbiAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHRUYXhab25lIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICAgICAgY3VzdG9tRmllbGRzIHtcbiAgICAgICAgICAgIGlzT3BlblxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DSEFOTkVMUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRDaGFubmVscyB7XG4gICAgICAgIGNoYW5uZWxzIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NIQU5ORUwgPSBncWxgXG4gICAgcXVlcnkgR2V0Q2hhbm5lbCgkaWQ6IElEISkge1xuICAgICAgICBjaGFubmVsKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0FDVElWRV9DSEFOTkVMID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEFjdGl2ZUNoYW5uZWwge1xuICAgICAgICBhY3RpdmVDaGFubmVsIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0NIQU5ORUwgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQ2hhbm5lbCgkaW5wdXQ6IENyZWF0ZUNoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQ2hhbm5lbChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5DaGFubmVsXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q0hBTk5FTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDaGFubmVsKCRpbnB1dDogVXBkYXRlQ2hhbm5lbElucHV0ISkge1xuICAgICAgICB1cGRhdGVDaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDSEFOTkVMX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9DSEFOTkVMID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUNoYW5uZWwoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlQ2hhbm5lbChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQQVlNRU5UX01FVEhPRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBQYXltZW50TWV0aG9kIG9uIFBheW1lbnRNZXRob2Qge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgY29kZVxuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBlbmFibGVkXG4gICAgICAgIGNoZWNrZXIge1xuICAgICAgICAgICAgLi4uQ29uZmlndXJhYmxlT3BlcmF0aW9uXG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlciB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BBWU1FTlRfTUVUSE9EX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0UGF5bWVudE1ldGhvZExpc3QoJG9wdGlvbnM6IFBheW1lbnRNZXRob2RMaXN0T3B0aW9ucyEpIHtcbiAgICAgICAgcGF5bWVudE1ldGhvZHMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5QYXltZW50TWV0aG9kXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQQVlNRU5UX01FVEhPRF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUEFZTUVOVF9NRVRIT0RfT1BFUkFUSU9OUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRQYXltZW50TWV0aG9kT3BlcmF0aW9ucyB7XG4gICAgICAgIHBheW1lbnRNZXRob2RFbGlnaWJpbGl0eUNoZWNrZXJzIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZlxuICAgICAgICB9XG4gICAgICAgIHBheW1lbnRNZXRob2RIYW5kbGVycyB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25EZWZcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTkZJR1VSQUJMRV9PUEVSQVRJT05fREVGX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QQVlNRU5UX01FVEhPRCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQYXltZW50TWV0aG9kKCRpZDogSUQhKSB7XG4gICAgICAgIHBheW1lbnRNZXRob2QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVBheW1lbnRNZXRob2QoJGlucHV0OiBDcmVhdGVQYXltZW50TWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVBheW1lbnRNZXRob2QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVBheW1lbnRNZXRob2QoJGlucHV0OiBVcGRhdGVQYXltZW50TWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVBheW1lbnRNZXRob2QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVBheW1lbnRNZXRob2QoJGlkOiBJRCEsICRmb3JjZTogQm9vbGVhbikge1xuICAgICAgICBkZWxldGVQYXltZW50TWV0aG9kKGlkOiAkaWQsIGZvcmNlOiAkZm9yY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdMT0JBTF9TRVRUSU5HU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBHbG9iYWxTZXR0aW5ncyBvbiBHbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgIGlkXG4gICAgICAgIGF2YWlsYWJsZUxhbmd1YWdlc1xuICAgICAgICB0cmFja0ludmVudG9yeVxuICAgICAgICBvdXRPZlN0b2NrVGhyZXNob2xkXG4gICAgICAgIHNlcnZlckNvbmZpZyB7XG4gICAgICAgICAgICBwZXJtaXNzaW9ucyB7XG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgYXNzaWduYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJQcm9jZXNzIHtcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0dMT0JBTF9TRVRUSU5HUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRHbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgIGdsb2JhbFNldHRpbmdzIHtcbiAgICAgICAgICAgIC4uLkdsb2JhbFNldHRpbmdzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtHTE9CQUxfU0VUVElOR1NfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0dMT0JBTF9TRVRUSU5HUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVHbG9iYWxTZXR0aW5ncygkaW5wdXQ6IFVwZGF0ZUdsb2JhbFNldHRpbmdzSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUdsb2JhbFNldHRpbmdzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkdsb2JhbFNldHRpbmdzXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7R0xPQkFMX1NFVFRJTkdTX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQ3VzdG9tRmllbGRDb25maWcgb24gQ3VzdG9tRmllbGQge1xuICAgICAgICBuYW1lXG4gICAgICAgIHR5cGVcbiAgICAgICAgbGlzdFxuICAgICAgICBkZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJlYWRvbmx5XG4gICAgICAgIG51bGxhYmxlXG4gICAgICAgIHVpXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNUUklOR19DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgU3RyaW5nQ3VzdG9tRmllbGQgb24gU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBwYXR0ZXJuXG4gICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgTE9DQUxFX1NUUklOR19DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGQgb24gTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBwYXR0ZXJuXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgVEVYVF9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgVGV4dEN1c3RvbUZpZWxkIG9uIFRleHRDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIC4uLkN1c3RvbUZpZWxkQ29uZmlnXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgQk9PTEVBTl9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQm9vbGVhbkN1c3RvbUZpZWxkIG9uIEJvb2xlYW5DdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIC4uLkN1c3RvbUZpZWxkQ29uZmlnXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgSU5UX0NVU1RPTV9GSUVMRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBJbnRDdXN0b21GaWVsZCBvbiBJbnRDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIC4uLkN1c3RvbUZpZWxkQ29uZmlnXG4gICAgICAgIGludE1pbjogbWluXG4gICAgICAgIGludE1heDogbWF4XG4gICAgICAgIGludFN0ZXA6IHN0ZXBcbiAgICB9XG4gICAgJHtDVVNUT01fRklFTERfQ09ORklHX0ZSQUdNRU5UfVxuYDtcbmV4cG9ydCBjb25zdCBGTE9BVF9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRmxvYXRDdXN0b21GaWVsZCBvbiBGbG9hdEN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgLi4uQ3VzdG9tRmllbGRDb25maWdcbiAgICAgICAgZmxvYXRNaW46IG1pblxuICAgICAgICBmbG9hdE1heDogbWF4XG4gICAgICAgIGZsb2F0U3RlcDogc3RlcFxuICAgIH1cbiAgICAke0NVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlR9XG5gO1xuZXhwb3J0IGNvbnN0IERBVEVfVElNRV9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRGF0ZVRpbWVDdXN0b21GaWVsZCBvbiBEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgLi4uQ3VzdG9tRmllbGRDb25maWdcbiAgICAgICAgZGF0ZXRpbWVNaW46IG1pblxuICAgICAgICBkYXRldGltZU1heDogbWF4XG4gICAgICAgIGRhdGV0aW1lU3RlcDogc3RlcFxuICAgIH1cbiAgICAke0NVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlR9XG5gO1xuZXhwb3J0IGNvbnN0IFJFTEFUSU9OX0NVU1RPTV9GSUVMRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBSZWxhdGlvbkN1c3RvbUZpZWxkIG9uIFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBlbnRpdHlcbiAgICAgICAgc2NhbGFyRmllbGRzXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBTExfQ1VTVE9NX0ZJRUxEU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDdXN0b21GaWVsZHMgb24gQ3VzdG9tRmllbGQge1xuICAgICAgICAuLi4gb24gU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uU3RyaW5nQ3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gVGV4dEN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgICAgIC4uLlRleHRDdXN0b21GaWVsZFxuICAgICAgICB9XG4gICAgICAgIC4uLiBvbiBCb29sZWFuQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uQm9vbGVhbkN1c3RvbUZpZWxkXG4gICAgICAgIH1cbiAgICAgICAgLi4uIG9uIEludEN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgICAgIC4uLkludEN1c3RvbUZpZWxkXG4gICAgICAgIH1cbiAgICAgICAgLi4uIG9uIEZsb2F0Q3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uRmxvYXRDdXN0b21GaWVsZFxuICAgICAgICB9XG4gICAgICAgIC4uLiBvbiBEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgICAgIC4uLkRhdGVUaW1lQ3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgICAgICAuLi5SZWxhdGlvbkN1c3RvbUZpZWxkXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtTVFJJTkdfQ1VTVE9NX0ZJRUxEX0ZSQUdNRU5UfVxuICAgICR7TE9DQUxFX1NUUklOR19DVVNUT01fRklFTERfRlJBR01FTlR9XG4gICAgJHtURVhUX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbiAgICAke0JPT0xFQU5fQ1VTVE9NX0ZJRUxEX0ZSQUdNRU5UfVxuICAgICR7SU5UX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbiAgICAke0ZMT0FUX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbiAgICAke0RBVEVfVElNRV9DVVNUT01fRklFTERfRlJBR01FTlR9XG4gICAgJHtSRUxBVElPTl9DVVNUT01fRklFTERfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1NFUlZFUl9DT05GSUcgPSBncWxgXG4gICAgcXVlcnkgR2V0U2VydmVyQ29uZmlnIHtcbiAgICAgICAgZ2xvYmFsU2V0dGluZ3Mge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIHNlcnZlckNvbmZpZyB7XG4gICAgICAgICAgICAgICAgb3JkZXJQcm9jZXNzIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICB0b1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwZXJtaXR0ZWRBc3NldFR5cGVzXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnMge1xuICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbmFibGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgICAgICAgICBBZGRyZXNzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEFkbWluaXN0cmF0b3Ige1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ2hhbm5lbCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBDb2xsZWN0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIENvdW50cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXJHcm91cCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBGYWNldCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBGYWNldFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEZ1bGZpbGxtZW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbFNldHRpbmdzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9yZGVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9yZGVyTGluZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBQYXltZW50TWV0aG9kIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFByb2R1Y3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgUHJvZHVjdE9wdGlvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBQcm9kdWN0T3B0aW9uR3JvdXAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgUHJvZHVjdFZhcmlhbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgUHJvbW90aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFNoaXBwaW5nTWV0aG9kIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFRheENhdGVnb3J5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFRheFJhdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgVXNlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBab25lIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7QUxMX0NVU1RPTV9GSUVMRFNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgSk9CX0lORk9fRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgSm9iSW5mbyBvbiBKb2Ige1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgc3RhcnRlZEF0XG4gICAgICAgIHNldHRsZWRBdFxuICAgICAgICBxdWV1ZU5hbWVcbiAgICAgICAgc3RhdGVcbiAgICAgICAgaXNTZXR0bGVkXG4gICAgICAgIHByb2dyZXNzXG4gICAgICAgIGR1cmF0aW9uXG4gICAgICAgIGRhdGFcbiAgICAgICAgcmVzdWx0XG4gICAgICAgIGVycm9yXG4gICAgICAgIHJldHJpZXNcbiAgICAgICAgYXR0ZW1wdHNcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0pPQl9JTkZPID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEpvYkluZm8oJGlkOiBJRCEpIHtcbiAgICAgICAgam9iKGpvYklkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkpvYkluZm9cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0pPQl9JTkZPX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9KT0JTX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0QWxsSm9icygkb3B0aW9uczogSm9iTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgam9icyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLkpvYkluZm9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0pPQl9JTkZPX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9KT0JTX0JZX0lEID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEpvYnNCeUlkKCRpZHM6IFtJRCFdISkge1xuICAgICAgICBqb2JzQnlJZChqb2JJZHM6ICRpZHMpIHtcbiAgICAgICAgICAgIC4uLkpvYkluZm9cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0pPQl9JTkZPX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9KT0JfUVVFVUVfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRKb2JRdWV1ZUxpc3Qge1xuICAgICAgICBqb2JRdWV1ZXMge1xuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgcnVubmluZ1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENBTkNFTF9KT0IgPSBncWxgXG4gICAgbXV0YXRpb24gQ2FuY2VsSm9iKCRpZDogSUQhKSB7XG4gICAgICAgIGNhbmNlbEpvYihqb2JJZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Kb2JJbmZvXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtKT0JfSU5GT19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRUlOREVYID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlaW5kZXgge1xuICAgICAgICByZWluZGV4IHtcbiAgICAgICAgICAgIC4uLkpvYkluZm9cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0pPQl9JTkZPX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QRU5ESU5HX1NFQVJDSF9JTkRFWF9VUERBVEVTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFBlbmRpbmdTZWFyY2hJbmRleFVwZGF0ZXMge1xuICAgICAgICBwZW5kaW5nU2VhcmNoSW5kZXhVcGRhdGVzXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFJVTl9QRU5ESU5HX1NFQVJDSF9JTkRFWF9VUERBVEVTID0gZ3FsYFxuICAgIG11dGF0aW9uIFJ1blBlbmRpbmdTZWFyY2hJbmRleFVwZGF0ZXMge1xuICAgICAgICBydW5QZW5kaW5nU2VhcmNoSW5kZXhVcGRhdGVzIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgIH1cbmA7XG4iXX0=
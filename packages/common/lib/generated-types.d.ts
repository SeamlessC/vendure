export declare type Maybe<T> = T;
export declare type Exact<
    T extends {
        [key: string]: unknown;
    },
> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    {
        [SubKey in K]?: Maybe<T[SubKey]>;
    };
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    {
        [SubKey in K]: Maybe<T[SubKey]>;
    };
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string | number;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};
export declare type AddFulfillmentToOrderResult =
    | Fulfillment
    | EmptyOrderLineSelectionError
    | ItemsAlreadyFulfilledError
    | InsufficientStockOnHandError
    | InvalidFulfillmentHandlerError
    | FulfillmentStateTransitionError
    | CreateFulfillmentError;
export declare type AddItemInput = {
    productVariantId: Scalars['ID'];
    quantity: Scalars['Int'];
    customFields?: Maybe<OrderLineCustomFieldsInput>;
};
export declare type AddItemToDraftOrderInput = {
    productVariantId: Scalars['ID'];
    quantity: Scalars['Int'];
    customFields?: Maybe<OrderLineCustomFieldsInput>;
};
export declare type AddManualPaymentToOrderResult = Order | ManualPaymentStateError;
export declare type AddNoteToCustomerInput = {
    id: Scalars['ID'];
    note: Scalars['String'];
    isPublic: Scalars['Boolean'];
};
export declare type AddNoteToOrderInput = {
    id: Scalars['ID'];
    note: Scalars['String'];
    isPublic: Scalars['Boolean'];
};
export declare type Address = Node & {
    __typename?: 'Address';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    fullName?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    streetLine1: Scalars['String'];
    streetLine2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    country: Country;
    phoneNumber?: Maybe<Scalars['String']>;
    defaultShippingAddress?: Maybe<Scalars['Boolean']>;
    defaultBillingAddress?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<AddressCustomFields>;
};
export declare type AddressCustomFields = {
    __typename?: 'AddressCustomFields';
    first_name?: Maybe<Scalars['String']>;
    uuid?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
};
export declare type AdjustDraftOrderLineInput = {
    orderLineId: Scalars['ID'];
    quantity: Scalars['Int'];
    customFields?: Maybe<OrderLineCustomFieldsInput>;
};
export declare type AdjustOrderLineInput = {
    orderLineId: Scalars['ID'];
    quantity: Scalars['Int'];
    customFields?: Maybe<OrderLineCustomFieldsInput>;
};
export declare type Adjustment = {
    __typename?: 'Adjustment';
    adjustmentSource: Scalars['String'];
    type: AdjustmentType;
    description: Scalars['String'];
    amount: Scalars['Int'];
};
export declare enum AdjustmentType {
    PROMOTION = 'PROMOTION',
    DISTRIBUTED_ORDER_PROMOTION = 'DISTRIBUTED_ORDER_PROMOTION',
    OTHER = 'OTHER',
}
export declare type Administrator = Node & {
    __typename?: 'Administrator';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    emailAddress: Scalars['String'];
    user: User;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type AdministratorFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    firstName?: Maybe<StringOperators>;
    lastName?: Maybe<StringOperators>;
    emailAddress?: Maybe<StringOperators>;
};
export declare type AdministratorList = PaginatedList & {
    __typename?: 'AdministratorList';
    items: Administrator[];
    totalItems: Scalars['Int'];
};
export declare type AdministratorListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<AdministratorSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<AdministratorFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type AdministratorPaymentInput = {
    paymentMethod?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['JSON']>;
};
export declare type AdministratorRefundInput = {
    paymentId: Scalars['ID'];
    reason?: Maybe<Scalars['String']>;
};
export declare type AdministratorSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    firstName?: Maybe<SortOrder>;
    lastName?: Maybe<SortOrder>;
    emailAddress?: Maybe<SortOrder>;
};
export declare type Allocation = Node &
    StockMovement & {
        __typename?: 'Allocation';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
        orderLine: OrderLine;
    };
/** Returned if an attempting to refund an OrderItem which has already been refunded */
export declare type AlreadyRefundedError = ErrorResult & {
    __typename?: 'AlreadyRefundedError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    refundId: Scalars['ID'];
};
export declare type ApplyCouponCodeResult =
    | Order
    | CouponCodeExpiredError
    | CouponCodeInvalidError
    | CouponCodeLimitError;
export declare type Asset = Node & {
    __typename?: 'Asset';
    tags: Tag[];
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    type: AssetType;
    fileSize: Scalars['Int'];
    mimeType: Scalars['String'];
    width: Scalars['Int'];
    height: Scalars['Int'];
    source: Scalars['String'];
    preview: Scalars['String'];
    focalPoint?: Maybe<Coordinate>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type AssetFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    name?: Maybe<StringOperators>;
    type?: Maybe<StringOperators>;
    fileSize?: Maybe<NumberOperators>;
    mimeType?: Maybe<StringOperators>;
    width?: Maybe<NumberOperators>;
    height?: Maybe<NumberOperators>;
    source?: Maybe<StringOperators>;
    preview?: Maybe<StringOperators>;
};
export declare type AssetList = PaginatedList & {
    __typename?: 'AssetList';
    items: Asset[];
    totalItems: Scalars['Int'];
};
export declare type AssetListOptions = {
    tags?: Maybe<Array<Scalars['String']>>;
    tagsOperator?: Maybe<LogicalOperator>;
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<AssetSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<AssetFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type AssetSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    fileSize?: Maybe<SortOrder>;
    mimeType?: Maybe<SortOrder>;
    width?: Maybe<SortOrder>;
    height?: Maybe<SortOrder>;
    source?: Maybe<SortOrder>;
    preview?: Maybe<SortOrder>;
};
export declare enum AssetType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    BINARY = 'BINARY',
}
export declare type AssignAssetsToChannelInput = {
    assetIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type AssignCollectionsToChannelInput = {
    collectionIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type AssignFacetsToChannelInput = {
    facetIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type AssignProductVariantsToChannelInput = {
    productVariantIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
    priceFactor?: Maybe<Scalars['Float']>;
};
export declare type AssignProductsToChannelInput = {
    productIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
    priceFactor?: Maybe<Scalars['Float']>;
};
export declare type AssignPromotionsToChannelInput = {
    promotionIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type AuthenticationInput = {
    native?: Maybe<NativeAuthInput>;
};
export declare type AuthenticationMethod = Node & {
    __typename?: 'AuthenticationMethod';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    strategy: Scalars['String'];
};
export declare type AuthenticationResult = CurrentUser | InvalidCredentialsError;
export declare type BooleanCustomFieldConfig = CustomField & {
    __typename?: 'BooleanCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    ui?: Maybe<Scalars['JSON']>;
};
/** Operators for filtering on a list of Boolean fields */
export declare type BooleanListOperators = {
    inList: Scalars['Boolean'];
};
/** Operators for filtering on a Boolean field */
export declare type BooleanOperators = {
    eq?: Maybe<Scalars['Boolean']>;
};
/** Returned if an attempting to cancel lines from an Order which is still active */
export declare type CancelActiveOrderError = ErrorResult & {
    __typename?: 'CancelActiveOrderError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    orderState: Scalars['String'];
};
export declare type CancelOrderInput = {
    /** The id of the order to be cancelled */
    orderId: Scalars['ID'];
    /** Optionally specify which OrderLines to cancel. If not provided, all OrderLines will be cancelled */
    lines?: Maybe<OrderLineInput[]>;
    /** Specify whether the shipping charges should also be cancelled. Defaults to false */
    cancelShipping?: Maybe<Scalars['Boolean']>;
    reason?: Maybe<Scalars['String']>;
};
export declare type CancelOrderResult =
    | Order
    | EmptyOrderLineSelectionError
    | QuantityTooGreatError
    | MultipleOrderError
    | CancelActiveOrderError
    | OrderStateTransitionError;
/** Returned if the Payment cancellation fails */
export declare type CancelPaymentError = ErrorResult & {
    __typename?: 'CancelPaymentError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    paymentErrorMessage: Scalars['String'];
};
export declare type CancelPaymentResult = Payment | CancelPaymentError | PaymentStateTransitionError;
export declare type Cancellation = Node &
    StockMovement & {
        __typename?: 'Cancellation';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
        orderLine: OrderLine;
    };
export declare type Channel = Node & {
    __typename?: 'Channel';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    code: Scalars['String'];
    token: Scalars['String'];
    defaultTaxZone?: Maybe<Zone>;
    defaultShippingZone?: Maybe<Zone>;
    defaultLanguageCode: LanguageCode;
    currencyCode: CurrencyCode;
    pricesIncludeTax: Scalars['Boolean'];
    customFields?: Maybe<ChannelCustomFields>;
};
export declare type ChannelCustomFields = {
    __typename?: 'ChannelCustomFields';
    openingTime?: Maybe<Scalars['DateTime']>;
    isOpen?: Maybe<Scalars['Boolean']>;
    processingTime?: Maybe<Scalars['Int']>;
    latitude?: Maybe<Scalars['Float']>;
    longitude?: Maybe<Scalars['Float']>;
    name?: Maybe<Scalars['String']>;
    location?: Maybe<Scalars['String']>;
};
/**
 * Returned when the default LanguageCode of a Channel is no longer found in the `availableLanguages`
 * of the GlobalSettings
 */
export declare type ChannelDefaultLanguageError = ErrorResult & {
    __typename?: 'ChannelDefaultLanguageError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    language: Scalars['String'];
    channelCode: Scalars['String'];
};
export declare type Collection = Node & {
    __typename?: 'Collection';
    isPrivate: Scalars['Boolean'];
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode?: Maybe<LanguageCode>;
    name: Scalars['String'];
    slug: Scalars['String'];
    breadcrumbs: CollectionBreadcrumb[];
    position: Scalars['Int'];
    description: Scalars['String'];
    featuredAsset?: Maybe<Asset>;
    assets: Asset[];
    parent?: Maybe<Collection>;
    children?: Maybe<Collection[]>;
    filters: ConfigurableOperation[];
    translations: CollectionTranslation[];
    productVariants: ProductVariantList;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CollectionProductVariantsArgs = {
    options?: Maybe<ProductVariantListOptions>;
};
export declare type CollectionBreadcrumb = {
    __typename?: 'CollectionBreadcrumb';
    id: Scalars['ID'];
    name: Scalars['String'];
    slug: Scalars['String'];
};
export declare type CollectionFilterParameter = {
    isPrivate?: Maybe<BooleanOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    slug?: Maybe<StringOperators>;
    position?: Maybe<NumberOperators>;
    description?: Maybe<StringOperators>;
};
export declare type CollectionList = PaginatedList & {
    __typename?: 'CollectionList';
    items: Collection[];
    totalItems: Scalars['Int'];
};
export declare type CollectionListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<CollectionSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<CollectionFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export declare type CollectionResult = {
    __typename?: 'CollectionResult';
    collection: Collection;
    count: Scalars['Int'];
};
export declare type CollectionSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    slug?: Maybe<SortOrder>;
    position?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
};
export declare type CollectionTranslation = {
    __typename?: 'CollectionTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
    slug: Scalars['String'];
    description: Scalars['String'];
};
export declare type ConfigArg = {
    __typename?: 'ConfigArg';
    name: Scalars['String'];
    value: Scalars['String'];
};
export declare type ConfigArgDefinition = {
    __typename?: 'ConfigArgDefinition';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    required: Scalars['Boolean'];
    defaultValue?: Maybe<Scalars['JSON']>;
    label?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type ConfigArgInput = {
    name: Scalars['String'];
    /** A JSON stringified representation of the actual value */
    value: Scalars['String'];
};
export declare type ConfigurableOperation = {
    __typename?: 'ConfigurableOperation';
    code: Scalars['String'];
    args: ConfigArg[];
};
export declare type ConfigurableOperationDefinition = {
    __typename?: 'ConfigurableOperationDefinition';
    code: Scalars['String'];
    args: ConfigArgDefinition[];
    description: Scalars['String'];
};
export declare type ConfigurableOperationInput = {
    code: Scalars['String'];
    arguments: ConfigArgInput[];
};
export declare type Coordinate = {
    __typename?: 'Coordinate';
    x: Scalars['Float'];
    y: Scalars['Float'];
};
export declare type CoordinateInput = {
    x: Scalars['Float'];
    y: Scalars['Float'];
};
export declare type Country = Node & {
    __typename?: 'Country';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    translations: CountryTranslation[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CountryFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    code?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    enabled?: Maybe<BooleanOperators>;
};
export declare type CountryList = PaginatedList & {
    __typename?: 'CountryList';
    items: Country[];
    totalItems: Scalars['Int'];
};
export declare type CountryListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<CountrySortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<CountryFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type CountrySortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
};
export declare type CountryTranslation = {
    __typename?: 'CountryTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type CountryTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
/** Returned if the provided coupon code is invalid */
export declare type CouponCodeExpiredError = ErrorResult & {
    __typename?: 'CouponCodeExpiredError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    couponCode: Scalars['String'];
};
/** Returned if the provided coupon code is invalid */
export declare type CouponCodeInvalidError = ErrorResult & {
    __typename?: 'CouponCodeInvalidError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    couponCode: Scalars['String'];
};
/** Returned if the provided coupon code is invalid */
export declare type CouponCodeLimitError = ErrorResult & {
    __typename?: 'CouponCodeLimitError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    couponCode: Scalars['String'];
    limit: Scalars['Int'];
};
export declare type CreateAddressCustomFieldsInput = {
    first_name?: Maybe<Scalars['String']>;
    uuid?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
};
export declare type CreateAddressInput = {
    fullName?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    streetLine1: Scalars['String'];
    streetLine2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    countryCode: Scalars['String'];
    phoneNumber?: Maybe<Scalars['String']>;
    defaultShippingAddress?: Maybe<Scalars['Boolean']>;
    defaultBillingAddress?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<CreateAddressCustomFieldsInput>;
};
export declare type CreateAdministratorInput = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    emailAddress: Scalars['String'];
    password: Scalars['String'];
    roleIds: Array<Scalars['ID']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateAssetInput = {
    file: Scalars['Upload'];
    tags?: Maybe<Array<Scalars['String']>>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateAssetResult = Asset | MimeTypeError;
export declare type CreateChannelCustomFieldsInput = {
    openingTime?: Maybe<Scalars['DateTime']>;
    isOpen?: Maybe<Scalars['Boolean']>;
    processingTime?: Maybe<Scalars['Int']>;
    latitude?: Maybe<Scalars['Float']>;
    longitude?: Maybe<Scalars['Float']>;
    name?: Maybe<Scalars['String']>;
    location?: Maybe<Scalars['String']>;
};
export declare type CreateChannelInput = {
    code: Scalars['String'];
    token: Scalars['String'];
    defaultLanguageCode: LanguageCode;
    pricesIncludeTax: Scalars['Boolean'];
    currencyCode: CurrencyCode;
    defaultTaxZoneId: Scalars['ID'];
    defaultShippingZoneId: Scalars['ID'];
    customFields?: Maybe<CreateChannelCustomFieldsInput>;
};
export declare type CreateChannelResult = Channel | LanguageNotAvailableError;
export declare type CreateCollectionInput = {
    isPrivate?: Maybe<Scalars['Boolean']>;
    featuredAssetId?: Maybe<Scalars['ID']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    parentId?: Maybe<Scalars['ID']>;
    filters: ConfigurableOperationInput[];
    translations: CreateCollectionTranslationInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateCollectionTranslationInput = {
    languageCode: LanguageCode;
    name: Scalars['String'];
    slug: Scalars['String'];
    description: Scalars['String'];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateCountryInput = {
    code: Scalars['String'];
    translations: CountryTranslationInput[];
    enabled: Scalars['Boolean'];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateCustomerCustomFieldsInput = {
    referredCode?: Maybe<Scalars['String']>;
    dob?: Maybe<Scalars['DateTime']>;
    gender?: Maybe<Scalars['String']>;
};
export declare type CreateCustomerGroupInput = {
    name: Scalars['String'];
    customerIds?: Maybe<Array<Scalars['ID']>>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateCustomerInput = {
    title?: Maybe<Scalars['String']>;
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    phoneNumber: Scalars['String'];
    emailAddress: Scalars['String'];
    customFields?: Maybe<CreateCustomerCustomFieldsInput>;
};
export declare type CreateCustomerResult = Customer | EmailAddressConflictError;
export declare type CreateFacetInput = {
    code: Scalars['String'];
    isPrivate: Scalars['Boolean'];
    translations: FacetTranslationInput[];
    values?: Maybe<CreateFacetValueWithFacetInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateFacetValueCustomFieldsInput = {
    color1?: Maybe<Scalars['String']>;
    color2?: Maybe<Scalars['String']>;
};
export declare type CreateFacetValueInput = {
    facetId: Scalars['ID'];
    code: Scalars['String'];
    translations: FacetValueTranslationInput[];
    customFields?: Maybe<CreateFacetValueCustomFieldsInput>;
};
export declare type CreateFacetValueWithFacetInput = {
    code: Scalars['String'];
    translations: FacetValueTranslationInput[];
};
/** Returned if an error is thrown in a FulfillmentHandler's createFulfillment method */
export declare type CreateFulfillmentError = ErrorResult & {
    __typename?: 'CreateFulfillmentError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    fulfillmentHandlerError: Scalars['String'];
};
export declare type CreateGroupOptionInput = {
    code: Scalars['String'];
    translations: ProductOptionGroupTranslationInput[];
};
export declare type CreatePaymentMethodInput = {
    name: Scalars['String'];
    code: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    enabled: Scalars['Boolean'];
    checker?: Maybe<ConfigurableOperationInput>;
    handler: ConfigurableOperationInput;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateProductInput = {
    featuredAssetId?: Maybe<Scalars['ID']>;
    enabled?: Maybe<Scalars['Boolean']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    facetValueIds?: Maybe<Array<Scalars['ID']>>;
    translations: ProductTranslationInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateProductOptionGroupInput = {
    code: Scalars['String'];
    translations: ProductOptionGroupTranslationInput[];
    options: CreateGroupOptionInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateProductOptionInput = {
    productOptionGroupId: Scalars['ID'];
    code: Scalars['String'];
    translations: ProductOptionGroupTranslationInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateProductVariantCustomFieldsInput = {
    pre_discount_price?: Maybe<Scalars['Int']>;
};
export declare type CreateProductVariantInput = {
    productId: Scalars['ID'];
    translations: ProductVariantTranslationInput[];
    facetValueIds?: Maybe<Array<Scalars['ID']>>;
    sku: Scalars['String'];
    price?: Maybe<Scalars['Int']>;
    taxCategoryId?: Maybe<Scalars['ID']>;
    optionIds?: Maybe<Array<Scalars['ID']>>;
    featuredAssetId?: Maybe<Scalars['ID']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    stockOnHand?: Maybe<Scalars['Int']>;
    outOfStockThreshold?: Maybe<Scalars['Int']>;
    useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
    trackInventory?: Maybe<GlobalFlag>;
    customFields?: Maybe<CreateProductVariantCustomFieldsInput>;
};
export declare type CreateProductVariantOptionInput = {
    optionGroupId: Scalars['ID'];
    code: Scalars['String'];
    translations: ProductOptionTranslationInput[];
};
export declare type CreatePromotionCustomFieldsInput = {
    imageId?: Maybe<Scalars['ID']>;
    description?: Maybe<Scalars['String']>;
};
export declare type CreatePromotionInput = {
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    startsAt?: Maybe<Scalars['DateTime']>;
    endsAt?: Maybe<Scalars['DateTime']>;
    couponCode?: Maybe<Scalars['String']>;
    perCustomerUsageLimit?: Maybe<Scalars['Int']>;
    conditions: ConfigurableOperationInput[];
    actions: ConfigurableOperationInput[];
    customFields?: Maybe<CreatePromotionCustomFieldsInput>;
};
export declare type CreatePromotionResult = Promotion | MissingConditionsError;
export declare type CreateRoleInput = {
    code: Scalars['String'];
    description: Scalars['String'];
    permissions: Permission[];
    channelIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type CreateShippingMethodInput = {
    code: Scalars['String'];
    fulfillmentHandler: Scalars['String'];
    checker: ConfigurableOperationInput;
    calculator: ConfigurableOperationInput;
    translations: ShippingMethodTranslationInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateTagInput = {
    value: Scalars['String'];
};
export declare type CreateTaxCategoryInput = {
    name: Scalars['String'];
    isDefault?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateTaxRateInput = {
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    value: Scalars['Float'];
    categoryId: Scalars['ID'];
    zoneId: Scalars['ID'];
    customerGroupId?: Maybe<Scalars['ID']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CreateZoneCustomFieldsInput = {
    loyaltyPointsLimit?: Maybe<Scalars['Int']>;
    loyaltyPointsPercentage?: Maybe<Scalars['Float']>;
};
export declare type CreateZoneInput = {
    name: Scalars['String'];
    memberIds?: Maybe<Array<Scalars['ID']>>;
    customFields?: Maybe<CreateZoneCustomFieldsInput>;
};
/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export declare enum CurrencyCode {
    /** United Arab Emirates dirham */
    AED = 'AED',
    /** Afghan afghani */
    AFN = 'AFN',
    /** Albanian lek */
    ALL = 'ALL',
    /** Armenian dram */
    AMD = 'AMD',
    /** Netherlands Antillean guilder */
    ANG = 'ANG',
    /** Angolan kwanza */
    AOA = 'AOA',
    /** Argentine peso */
    ARS = 'ARS',
    /** Australian dollar */
    AUD = 'AUD',
    /** Aruban florin */
    AWG = 'AWG',
    /** Azerbaijani manat */
    AZN = 'AZN',
    /** Bosnia and Herzegovina convertible mark */
    BAM = 'BAM',
    /** Barbados dollar */
    BBD = 'BBD',
    /** Bangladeshi taka */
    BDT = 'BDT',
    /** Bulgarian lev */
    BGN = 'BGN',
    /** Bahraini dinar */
    BHD = 'BHD',
    /** Burundian franc */
    BIF = 'BIF',
    /** Bermudian dollar */
    BMD = 'BMD',
    /** Brunei dollar */
    BND = 'BND',
    /** Boliviano */
    BOB = 'BOB',
    /** Brazilian real */
    BRL = 'BRL',
    /** Bahamian dollar */
    BSD = 'BSD',
    /** Bhutanese ngultrum */
    BTN = 'BTN',
    /** Botswana pula */
    BWP = 'BWP',
    /** Belarusian ruble */
    BYN = 'BYN',
    /** Belize dollar */
    BZD = 'BZD',
    /** Canadian dollar */
    CAD = 'CAD',
    /** Congolese franc */
    CDF = 'CDF',
    /** Swiss franc */
    CHF = 'CHF',
    /** Chilean peso */
    CLP = 'CLP',
    /** Renminbi (Chinese) yuan */
    CNY = 'CNY',
    /** Colombian peso */
    COP = 'COP',
    /** Costa Rican colon */
    CRC = 'CRC',
    /** Cuban convertible peso */
    CUC = 'CUC',
    /** Cuban peso */
    CUP = 'CUP',
    /** Cape Verde escudo */
    CVE = 'CVE',
    /** Czech koruna */
    CZK = 'CZK',
    /** Djiboutian franc */
    DJF = 'DJF',
    /** Danish krone */
    DKK = 'DKK',
    /** Dominican peso */
    DOP = 'DOP',
    /** Algerian dinar */
    DZD = 'DZD',
    /** Egyptian pound */
    EGP = 'EGP',
    /** Eritrean nakfa */
    ERN = 'ERN',
    /** Ethiopian birr */
    ETB = 'ETB',
    /** Euro */
    EUR = 'EUR',
    /** Fiji dollar */
    FJD = 'FJD',
    /** Falkland Islands pound */
    FKP = 'FKP',
    /** Pound sterling */
    GBP = 'GBP',
    /** Georgian lari */
    GEL = 'GEL',
    /** Ghanaian cedi */
    GHS = 'GHS',
    /** Gibraltar pound */
    GIP = 'GIP',
    /** Gambian dalasi */
    GMD = 'GMD',
    /** Guinean franc */
    GNF = 'GNF',
    /** Guatemalan quetzal */
    GTQ = 'GTQ',
    /** Guyanese dollar */
    GYD = 'GYD',
    /** Hong Kong dollar */
    HKD = 'HKD',
    /** Honduran lempira */
    HNL = 'HNL',
    /** Croatian kuna */
    HRK = 'HRK',
    /** Haitian gourde */
    HTG = 'HTG',
    /** Hungarian forint */
    HUF = 'HUF',
    /** Indonesian rupiah */
    IDR = 'IDR',
    /** Israeli new shekel */
    ILS = 'ILS',
    /** Indian rupee */
    INR = 'INR',
    /** Iraqi dinar */
    IQD = 'IQD',
    /** Iranian rial */
    IRR = 'IRR',
    /** Icelandic króna */
    ISK = 'ISK',
    /** Jamaican dollar */
    JMD = 'JMD',
    /** Jordanian dinar */
    JOD = 'JOD',
    /** Japanese yen */
    JPY = 'JPY',
    /** Kenyan shilling */
    KES = 'KES',
    /** Kyrgyzstani som */
    KGS = 'KGS',
    /** Cambodian riel */
    KHR = 'KHR',
    /** Comoro franc */
    KMF = 'KMF',
    /** North Korean won */
    KPW = 'KPW',
    /** South Korean won */
    KRW = 'KRW',
    /** Kuwaiti dinar */
    KWD = 'KWD',
    /** Cayman Islands dollar */
    KYD = 'KYD',
    /** Kazakhstani tenge */
    KZT = 'KZT',
    /** Lao kip */
    LAK = 'LAK',
    /** Lebanese pound */
    LBP = 'LBP',
    /** Sri Lankan rupee */
    LKR = 'LKR',
    /** Liberian dollar */
    LRD = 'LRD',
    /** Lesotho loti */
    LSL = 'LSL',
    /** Libyan dinar */
    LYD = 'LYD',
    /** Moroccan dirham */
    MAD = 'MAD',
    /** Moldovan leu */
    MDL = 'MDL',
    /** Malagasy ariary */
    MGA = 'MGA',
    /** Macedonian denar */
    MKD = 'MKD',
    /** Myanmar kyat */
    MMK = 'MMK',
    /** Mongolian tögrög */
    MNT = 'MNT',
    /** Macanese pataca */
    MOP = 'MOP',
    /** Mauritanian ouguiya */
    MRU = 'MRU',
    /** Mauritian rupee */
    MUR = 'MUR',
    /** Maldivian rufiyaa */
    MVR = 'MVR',
    /** Malawian kwacha */
    MWK = 'MWK',
    /** Mexican peso */
    MXN = 'MXN',
    /** Malaysian ringgit */
    MYR = 'MYR',
    /** Mozambican metical */
    MZN = 'MZN',
    /** Namibian dollar */
    NAD = 'NAD',
    /** Nigerian naira */
    NGN = 'NGN',
    /** Nicaraguan córdoba */
    NIO = 'NIO',
    /** Norwegian krone */
    NOK = 'NOK',
    /** Nepalese rupee */
    NPR = 'NPR',
    /** New Zealand dollar */
    NZD = 'NZD',
    /** Omani rial */
    OMR = 'OMR',
    /** Panamanian balboa */
    PAB = 'PAB',
    /** Peruvian sol */
    PEN = 'PEN',
    /** Papua New Guinean kina */
    PGK = 'PGK',
    /** Philippine peso */
    PHP = 'PHP',
    /** Pakistani rupee */
    PKR = 'PKR',
    /** Polish złoty */
    PLN = 'PLN',
    /** Paraguayan guaraní */
    PYG = 'PYG',
    /** Qatari riyal */
    QAR = 'QAR',
    /** Romanian leu */
    RON = 'RON',
    /** Serbian dinar */
    RSD = 'RSD',
    /** Russian ruble */
    RUB = 'RUB',
    /** Rwandan franc */
    RWF = 'RWF',
    /** Saudi riyal */
    SAR = 'SAR',
    /** Solomon Islands dollar */
    SBD = 'SBD',
    /** Seychelles rupee */
    SCR = 'SCR',
    /** Sudanese pound */
    SDG = 'SDG',
    /** Swedish krona/kronor */
    SEK = 'SEK',
    /** Singapore dollar */
    SGD = 'SGD',
    /** Saint Helena pound */
    SHP = 'SHP',
    /** Sierra Leonean leone */
    SLL = 'SLL',
    /** Somali shilling */
    SOS = 'SOS',
    /** Surinamese dollar */
    SRD = 'SRD',
    /** South Sudanese pound */
    SSP = 'SSP',
    /** São Tomé and Príncipe dobra */
    STN = 'STN',
    /** Salvadoran colón */
    SVC = 'SVC',
    /** Syrian pound */
    SYP = 'SYP',
    /** Swazi lilangeni */
    SZL = 'SZL',
    /** Thai baht */
    THB = 'THB',
    /** Tajikistani somoni */
    TJS = 'TJS',
    /** Turkmenistan manat */
    TMT = 'TMT',
    /** Tunisian dinar */
    TND = 'TND',
    /** Tongan paʻanga */
    TOP = 'TOP',
    /** Turkish lira */
    TRY = 'TRY',
    /** Trinidad and Tobago dollar */
    TTD = 'TTD',
    /** New Taiwan dollar */
    TWD = 'TWD',
    /** Tanzanian shilling */
    TZS = 'TZS',
    /** Ukrainian hryvnia */
    UAH = 'UAH',
    /** Ugandan shilling */
    UGX = 'UGX',
    /** United States dollar */
    USD = 'USD',
    /** Uruguayan peso */
    UYU = 'UYU',
    /** Uzbekistan som */
    UZS = 'UZS',
    /** Venezuelan bolívar soberano */
    VES = 'VES',
    /** Vietnamese đồng */
    VND = 'VND',
    /** Vanuatu vatu */
    VUV = 'VUV',
    /** Samoan tala */
    WST = 'WST',
    /** CFA franc BEAC */
    XAF = 'XAF',
    /** East Caribbean dollar */
    XCD = 'XCD',
    /** CFA franc BCEAO */
    XOF = 'XOF',
    /** CFP franc (franc Pacifique) */
    XPF = 'XPF',
    /** Yemeni rial */
    YER = 'YER',
    /** South African rand */
    ZAR = 'ZAR',
    /** Zambian kwacha */
    ZMW = 'ZMW',
    /** Zimbabwean dollar */
    ZWL = 'ZWL',
}
export declare type CurrentUser = {
    __typename?: 'CurrentUser';
    id: Scalars['ID'];
    identifier: Scalars['String'];
    channels: CurrentUserChannel[];
};
export declare type CurrentUserChannel = {
    __typename?: 'CurrentUserChannel';
    id: Scalars['ID'];
    token: Scalars['String'];
    code: Scalars['String'];
    permissions: Permission[];
};
export declare type CustomField = {
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type CustomFieldConfig =
    | StringCustomFieldConfig
    | LocaleStringCustomFieldConfig
    | IntCustomFieldConfig
    | FloatCustomFieldConfig
    | BooleanCustomFieldConfig
    | DateTimeCustomFieldConfig
    | RelationCustomFieldConfig
    | TextCustomFieldConfig;
export declare type CustomFields = {
    __typename?: 'CustomFields';
    Address: CustomFieldConfig[];
    Administrator: CustomFieldConfig[];
    Asset: CustomFieldConfig[];
    Channel: CustomFieldConfig[];
    Collection: CustomFieldConfig[];
    Country: CustomFieldConfig[];
    Customer: CustomFieldConfig[];
    CustomerGroup: CustomFieldConfig[];
    Facet: CustomFieldConfig[];
    FacetValue: CustomFieldConfig[];
    Fulfillment: CustomFieldConfig[];
    GlobalSettings: CustomFieldConfig[];
    Order: CustomFieldConfig[];
    OrderLine: CustomFieldConfig[];
    PaymentMethod: CustomFieldConfig[];
    Product: CustomFieldConfig[];
    ProductOption: CustomFieldConfig[];
    ProductOptionGroup: CustomFieldConfig[];
    ProductVariant: CustomFieldConfig[];
    Promotion: CustomFieldConfig[];
    ShippingMethod: CustomFieldConfig[];
    TaxCategory: CustomFieldConfig[];
    TaxRate: CustomFieldConfig[];
    User: CustomFieldConfig[];
    Zone: CustomFieldConfig[];
};
export declare type Customer = Node & {
    __typename?: 'Customer';
    groups: CustomerGroup[];
    history: HistoryEntryList;
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    title?: Maybe<Scalars['String']>;
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    phoneNumber: Scalars['String'];
    emailAddress: Scalars['String'];
    addresses?: Maybe<Address[]>;
    orders: OrderList;
    user?: Maybe<User>;
    customFields?: Maybe<CustomerCustomFields>;
};
export declare type CustomerHistoryArgs = {
    options?: Maybe<HistoryEntryListOptions>;
};
export declare type CustomerOrdersArgs = {
    options?: Maybe<OrderListOptions>;
};
export declare type CustomerCustomFields = {
    __typename?: 'CustomerCustomFields';
    referredCode?: Maybe<Scalars['String']>;
    referralCode?: Maybe<Scalars['String']>;
    loyaltyPoints?: Maybe<Scalars['Int']>;
    dob?: Maybe<Scalars['DateTime']>;
    gender?: Maybe<Scalars['String']>;
};
export declare type CustomerFilterParameter = {
    postalCode?: Maybe<StringOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    title?: Maybe<StringOperators>;
    firstName?: Maybe<StringOperators>;
    lastName?: Maybe<StringOperators>;
    phoneNumber?: Maybe<StringOperators>;
    emailAddress?: Maybe<StringOperators>;
    referredCode?: Maybe<StringOperators>;
    referralCode?: Maybe<StringOperators>;
    loyaltyPoints?: Maybe<NumberOperators>;
    dob?: Maybe<DateOperators>;
    gender?: Maybe<StringOperators>;
};
export declare type CustomerGroup = Node & {
    __typename?: 'CustomerGroup';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    customers: CustomerList;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type CustomerGroupCustomersArgs = {
    options?: Maybe<CustomerListOptions>;
};
export declare type CustomerGroupFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    name?: Maybe<StringOperators>;
};
export declare type CustomerGroupList = PaginatedList & {
    __typename?: 'CustomerGroupList';
    items: CustomerGroup[];
    totalItems: Scalars['Int'];
};
export declare type CustomerGroupListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<CustomerGroupSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<CustomerGroupFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type CustomerGroupSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
};
export declare type CustomerList = PaginatedList & {
    __typename?: 'CustomerList';
    items: Customer[];
    totalItems: Scalars['Int'];
};
export declare type CustomerListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<CustomerSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<CustomerFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type CustomerSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    title?: Maybe<SortOrder>;
    firstName?: Maybe<SortOrder>;
    lastName?: Maybe<SortOrder>;
    phoneNumber?: Maybe<SortOrder>;
    emailAddress?: Maybe<SortOrder>;
    referredCode?: Maybe<SortOrder>;
    referralCode?: Maybe<SortOrder>;
    loyaltyPoints?: Maybe<SortOrder>;
    dob?: Maybe<SortOrder>;
    gender?: Maybe<SortOrder>;
};
/** Operators for filtering on a list of Date fields */
export declare type DateListOperators = {
    inList: Scalars['DateTime'];
};
/** Operators for filtering on a DateTime field */
export declare type DateOperators = {
    eq?: Maybe<Scalars['DateTime']>;
    before?: Maybe<Scalars['DateTime']>;
    after?: Maybe<Scalars['DateTime']>;
    between?: Maybe<DateRange>;
};
export declare type DateRange = {
    start: Scalars['DateTime'];
    end: Scalars['DateTime'];
};
/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export declare type DateTimeCustomFieldConfig = CustomField & {
    __typename?: 'DateTimeCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    min?: Maybe<Scalars['String']>;
    max?: Maybe<Scalars['String']>;
    step?: Maybe<Scalars['Int']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type DeleteAssetInput = {
    assetId: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
    deleteFromAllChannels?: Maybe<Scalars['Boolean']>;
};
export declare type DeleteAssetsInput = {
    assetIds: Array<Scalars['ID']>;
    force?: Maybe<Scalars['Boolean']>;
    deleteFromAllChannels?: Maybe<Scalars['Boolean']>;
};
export declare type DeletionResponse = {
    __typename?: 'DeletionResponse';
    result: DeletionResult;
    message?: Maybe<Scalars['String']>;
};
export declare enum DeletionResult {
    /** The entity was successfully deleted */
    DELETED = 'DELETED',
    /** Deletion did not take place, reason given in message */
    NOT_DELETED = 'NOT_DELETED',
}
export declare type Discount = {
    __typename?: 'Discount';
    adjustmentSource: Scalars['String'];
    type: AdjustmentType;
    description: Scalars['String'];
    amount: Scalars['Int'];
    amountWithTax: Scalars['Int'];
};
/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export declare type EmailAddressConflictError = ErrorResult & {
    __typename?: 'EmailAddressConflictError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned if no OrderLines have been specified for the operation */
export declare type EmptyOrderLineSelectionError = ErrorResult & {
    __typename?: 'EmptyOrderLineSelectionError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare enum ErrorCode {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    MIME_TYPE_ERROR = 'MIME_TYPE_ERROR',
    LANGUAGE_NOT_AVAILABLE_ERROR = 'LANGUAGE_NOT_AVAILABLE_ERROR',
    FACET_IN_USE_ERROR = 'FACET_IN_USE_ERROR',
    CHANNEL_DEFAULT_LANGUAGE_ERROR = 'CHANNEL_DEFAULT_LANGUAGE_ERROR',
    SETTLE_PAYMENT_ERROR = 'SETTLE_PAYMENT_ERROR',
    CANCEL_PAYMENT_ERROR = 'CANCEL_PAYMENT_ERROR',
    EMPTY_ORDER_LINE_SELECTION_ERROR = 'EMPTY_ORDER_LINE_SELECTION_ERROR',
    ITEMS_ALREADY_FULFILLED_ERROR = 'ITEMS_ALREADY_FULFILLED_ERROR',
    INVALID_FULFILLMENT_HANDLER_ERROR = 'INVALID_FULFILLMENT_HANDLER_ERROR',
    CREATE_FULFILLMENT_ERROR = 'CREATE_FULFILLMENT_ERROR',
    INSUFFICIENT_STOCK_ON_HAND_ERROR = 'INSUFFICIENT_STOCK_ON_HAND_ERROR',
    MULTIPLE_ORDER_ERROR = 'MULTIPLE_ORDER_ERROR',
    CANCEL_ACTIVE_ORDER_ERROR = 'CANCEL_ACTIVE_ORDER_ERROR',
    PAYMENT_ORDER_MISMATCH_ERROR = 'PAYMENT_ORDER_MISMATCH_ERROR',
    REFUND_ORDER_STATE_ERROR = 'REFUND_ORDER_STATE_ERROR',
    NOTHING_TO_REFUND_ERROR = 'NOTHING_TO_REFUND_ERROR',
    ALREADY_REFUNDED_ERROR = 'ALREADY_REFUNDED_ERROR',
    QUANTITY_TOO_GREAT_ERROR = 'QUANTITY_TOO_GREAT_ERROR',
    REFUND_STATE_TRANSITION_ERROR = 'REFUND_STATE_TRANSITION_ERROR',
    PAYMENT_STATE_TRANSITION_ERROR = 'PAYMENT_STATE_TRANSITION_ERROR',
    FULFILLMENT_STATE_TRANSITION_ERROR = 'FULFILLMENT_STATE_TRANSITION_ERROR',
    ORDER_MODIFICATION_STATE_ERROR = 'ORDER_MODIFICATION_STATE_ERROR',
    NO_CHANGES_SPECIFIED_ERROR = 'NO_CHANGES_SPECIFIED_ERROR',
    PAYMENT_METHOD_MISSING_ERROR = 'PAYMENT_METHOD_MISSING_ERROR',
    REFUND_PAYMENT_ID_MISSING_ERROR = 'REFUND_PAYMENT_ID_MISSING_ERROR',
    MANUAL_PAYMENT_STATE_ERROR = 'MANUAL_PAYMENT_STATE_ERROR',
    PRODUCT_OPTION_IN_USE_ERROR = 'PRODUCT_OPTION_IN_USE_ERROR',
    MISSING_CONDITIONS_ERROR = 'MISSING_CONDITIONS_ERROR',
    NATIVE_AUTH_STRATEGY_ERROR = 'NATIVE_AUTH_STRATEGY_ERROR',
    INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
    ORDER_STATE_TRANSITION_ERROR = 'ORDER_STATE_TRANSITION_ERROR',
    EMAIL_ADDRESS_CONFLICT_ERROR = 'EMAIL_ADDRESS_CONFLICT_ERROR',
    ORDER_LIMIT_ERROR = 'ORDER_LIMIT_ERROR',
    NEGATIVE_QUANTITY_ERROR = 'NEGATIVE_QUANTITY_ERROR',
    INSUFFICIENT_STOCK_ERROR = 'INSUFFICIENT_STOCK_ERROR',
    COUPON_CODE_INVALID_ERROR = 'COUPON_CODE_INVALID_ERROR',
    COUPON_CODE_EXPIRED_ERROR = 'COUPON_CODE_EXPIRED_ERROR',
    COUPON_CODE_LIMIT_ERROR = 'COUPON_CODE_LIMIT_ERROR',
    ORDER_MODIFICATION_ERROR = 'ORDER_MODIFICATION_ERROR',
    INELIGIBLE_SHIPPING_METHOD_ERROR = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
    NO_ACTIVE_ORDER_ERROR = 'NO_ACTIVE_ORDER_ERROR',
    SHOP_CLOSED_ERROR = 'SHOP_CLOSED_ERROR',
}
export declare type ErrorResult = {
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type Facet = Node & {
    __typename?: 'Facet';
    isPrivate: Scalars['Boolean'];
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
    code: Scalars['String'];
    values: FacetValue[];
    translations: FacetTranslation[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type FacetFilterParameter = {
    isPrivate?: Maybe<BooleanOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    code?: Maybe<StringOperators>;
};
export declare type FacetInUseError = ErrorResult & {
    __typename?: 'FacetInUseError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    facetCode: Scalars['String'];
    productCount: Scalars['Int'];
    variantCount: Scalars['Int'];
};
export declare type FacetList = PaginatedList & {
    __typename?: 'FacetList';
    items: Facet[];
    totalItems: Scalars['Int'];
};
export declare type FacetListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<FacetSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<FacetFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type FacetSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
};
export declare type FacetTranslation = {
    __typename?: 'FacetTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type FacetTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type FacetValue = Node & {
    __typename?: 'FacetValue';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    facet: Facet;
    name: Scalars['String'];
    code: Scalars['String'];
    translations: FacetValueTranslation[];
    customFields?: Maybe<FacetValueCustomFields>;
};
export declare type FacetValueCustomFields = {
    __typename?: 'FacetValueCustomFields';
    color1?: Maybe<Scalars['String']>;
    color2?: Maybe<Scalars['String']>;
};
/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export declare type FacetValueFilterInput = {
    and?: Maybe<Scalars['ID']>;
    or?: Maybe<Array<Scalars['ID']>>;
};
/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export declare type FacetValueResult = {
    __typename?: 'FacetValueResult';
    facetValue: FacetValue;
    count: Scalars['Int'];
};
export declare type FacetValueTranslation = {
    __typename?: 'FacetValueTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type FacetValueTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type FloatCustomFieldConfig = CustomField & {
    __typename?: 'FloatCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    min?: Maybe<Scalars['Float']>;
    max?: Maybe<Scalars['Float']>;
    step?: Maybe<Scalars['Float']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type FulfillOrderInput = {
    lines: OrderLineInput[];
    handler: ConfigurableOperationInput;
};
export declare type Fulfillment = Node & {
    __typename?: 'Fulfillment';
    nextStates: Array<Scalars['String']>;
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    orderItems: OrderItem[];
    summary: FulfillmentLineSummary[];
    state: Scalars['String'];
    method: Scalars['String'];
    trackingCode?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type FulfillmentLineSummary = {
    __typename?: 'FulfillmentLineSummary';
    orderLine: OrderLine;
    quantity: Scalars['Int'];
};
/** Returned when there is an error in transitioning the Fulfillment state */
export declare type FulfillmentStateTransitionError = ErrorResult & {
    __typename?: 'FulfillmentStateTransitionError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
};
export declare enum GlobalFlag {
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    INHERIT = 'INHERIT',
}
export declare type GlobalSettings = {
    __typename?: 'GlobalSettings';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    availableLanguages: LanguageCode[];
    trackInventory: Scalars['Boolean'];
    outOfStockThreshold: Scalars['Int'];
    serverConfig: ServerConfig;
    customFields?: Maybe<GlobalSettingsCustomFields>;
};
export declare type GlobalSettingsCustomFields = {
    __typename?: 'GlobalSettingsCustomFields';
    referralLoyaltyPoints?: Maybe<Scalars['Int']>;
};
export declare type HistoryEntry = Node & {
    __typename?: 'HistoryEntry';
    isPublic: Scalars['Boolean'];
    administrator?: Maybe<Administrator>;
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    type: HistoryEntryType;
    data: Scalars['JSON'];
};
export declare type HistoryEntryFilterParameter = {
    isPublic?: Maybe<BooleanOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    type?: Maybe<StringOperators>;
};
export declare type HistoryEntryList = PaginatedList & {
    __typename?: 'HistoryEntryList';
    items: HistoryEntry[];
    totalItems: Scalars['Int'];
};
export declare type HistoryEntryListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<HistoryEntrySortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<HistoryEntryFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type HistoryEntrySortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare enum HistoryEntryType {
    CUSTOMER_REGISTERED = 'CUSTOMER_REGISTERED',
    CUSTOMER_VERIFIED = 'CUSTOMER_VERIFIED',
    CUSTOMER_DETAIL_UPDATED = 'CUSTOMER_DETAIL_UPDATED',
    CUSTOMER_ADDED_TO_GROUP = 'CUSTOMER_ADDED_TO_GROUP',
    CUSTOMER_REMOVED_FROM_GROUP = 'CUSTOMER_REMOVED_FROM_GROUP',
    CUSTOMER_ADDRESS_CREATED = 'CUSTOMER_ADDRESS_CREATED',
    CUSTOMER_ADDRESS_UPDATED = 'CUSTOMER_ADDRESS_UPDATED',
    CUSTOMER_ADDRESS_DELETED = 'CUSTOMER_ADDRESS_DELETED',
    CUSTOMER_PASSWORD_UPDATED = 'CUSTOMER_PASSWORD_UPDATED',
    CUSTOMER_PASSWORD_RESET_REQUESTED = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
    CUSTOMER_PASSWORD_RESET_VERIFIED = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
    CUSTOMER_EMAIL_UPDATE_REQUESTED = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
    CUSTOMER_EMAIL_UPDATE_VERIFIED = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
    CUSTOMER_NOTE = 'CUSTOMER_NOTE',
    ORDER_STATE_TRANSITION = 'ORDER_STATE_TRANSITION',
    ORDER_PAYMENT_TRANSITION = 'ORDER_PAYMENT_TRANSITION',
    ORDER_FULFILLMENT = 'ORDER_FULFILLMENT',
    ORDER_CANCELLATION = 'ORDER_CANCELLATION',
    ORDER_REFUND_TRANSITION = 'ORDER_REFUND_TRANSITION',
    ORDER_FULFILLMENT_TRANSITION = 'ORDER_FULFILLMENT_TRANSITION',
    ORDER_NOTE = 'ORDER_NOTE',
    ORDER_COUPON_APPLIED = 'ORDER_COUPON_APPLIED',
    ORDER_COUPON_REMOVED = 'ORDER_COUPON_REMOVED',
    ORDER_MODIFIED = 'ORDER_MODIFIED',
}
/** Operators for filtering on a list of ID fields */
export declare type IdListOperators = {
    inList: Scalars['ID'];
};
/** Operators for filtering on an ID field */
export declare type IdOperators = {
    eq?: Maybe<Scalars['String']>;
    notEq?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    notIn?: Maybe<Array<Scalars['String']>>;
};
export declare type ImportInfo = {
    __typename?: 'ImportInfo';
    errors?: Maybe<Array<Scalars['String']>>;
    processed: Scalars['Int'];
    imported: Scalars['Int'];
};
/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export declare type IneligibleShippingMethodError = ErrorResult & {
    __typename?: 'IneligibleShippingMethodError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned when attempting to add more items to the Order than are available */
export declare type InsufficientStockError = ErrorResult & {
    __typename?: 'InsufficientStockError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    quantityAvailable: Scalars['Int'];
    order: Order;
};
/**
 * Returned if attempting to create a Fulfillment when there is insufficient
 * stockOnHand of a ProductVariant to satisfy the requested quantity.
 */
export declare type InsufficientStockOnHandError = ErrorResult & {
    __typename?: 'InsufficientStockOnHandError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    productVariantId: Scalars['ID'];
    productVariantName: Scalars['String'];
    stockOnHand: Scalars['Int'];
};
export declare type IntCustomFieldConfig = CustomField & {
    __typename?: 'IntCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    min?: Maybe<Scalars['Int']>;
    max?: Maybe<Scalars['Int']>;
    step?: Maybe<Scalars['Int']>;
    ui?: Maybe<Scalars['JSON']>;
};
/** Returned if the user authentication credentials are not valid */
export declare type InvalidCredentialsError = ErrorResult & {
    __typename?: 'InvalidCredentialsError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    authenticationError: Scalars['String'];
};
/** Returned if the specified FulfillmentHandler code is not valid */
export declare type InvalidFulfillmentHandlerError = ErrorResult & {
    __typename?: 'InvalidFulfillmentHandlerError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned if the specified items are already part of a Fulfillment */
export declare type ItemsAlreadyFulfilledError = ErrorResult & {
    __typename?: 'ItemsAlreadyFulfilledError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type Job = Node & {
    __typename?: 'Job';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    startedAt?: Maybe<Scalars['DateTime']>;
    settledAt?: Maybe<Scalars['DateTime']>;
    queueName: Scalars['String'];
    state: JobState;
    progress: Scalars['Float'];
    data?: Maybe<Scalars['JSON']>;
    result?: Maybe<Scalars['JSON']>;
    error?: Maybe<Scalars['JSON']>;
    isSettled: Scalars['Boolean'];
    duration: Scalars['Int'];
    retries: Scalars['Int'];
    attempts: Scalars['Int'];
};
export declare type JobBufferSize = {
    __typename?: 'JobBufferSize';
    bufferId: Scalars['String'];
    size: Scalars['Int'];
};
export declare type JobFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    startedAt?: Maybe<DateOperators>;
    settledAt?: Maybe<DateOperators>;
    queueName?: Maybe<StringOperators>;
    state?: Maybe<StringOperators>;
    progress?: Maybe<NumberOperators>;
    isSettled?: Maybe<BooleanOperators>;
    duration?: Maybe<NumberOperators>;
    retries?: Maybe<NumberOperators>;
    attempts?: Maybe<NumberOperators>;
};
export declare type JobList = PaginatedList & {
    __typename?: 'JobList';
    items: Job[];
    totalItems: Scalars['Int'];
};
export declare type JobListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<JobSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<JobFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type JobQueue = {
    __typename?: 'JobQueue';
    name: Scalars['String'];
    running: Scalars['Boolean'];
};
export declare type JobSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    startedAt?: Maybe<SortOrder>;
    settledAt?: Maybe<SortOrder>;
    queueName?: Maybe<SortOrder>;
    progress?: Maybe<SortOrder>;
    duration?: Maybe<SortOrder>;
    retries?: Maybe<SortOrder>;
    attempts?: Maybe<SortOrder>;
};
/**
 * @description
 * The state of a Job in the JobQueue
 *
 * @docsCategory common
 */
export declare enum JobState {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    RETRYING = 'RETRYING',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
}
/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export declare enum LanguageCode {
    /** Afrikaans */
    af = 'af',
    /** Akan */
    ak = 'ak',
    /** Albanian */
    sq = 'sq',
    /** Amharic */
    am = 'am',
    /** Arabic */
    ar = 'ar',
    /** Armenian */
    hy = 'hy',
    /** Azerbaijani */
    az = 'az',
    /** Bambara */
    bm = 'bm',
    /** Bangla */
    bn = 'bn',
    /** Basque */
    eu = 'eu',
    /** Belarusian */
    be = 'be',
    /** Bosnian */
    bs = 'bs',
    /** Breton */
    br = 'br',
    /** Bulgarian */
    bg = 'bg',
    /** Burmese */
    my = 'my',
    /** Catalan */
    ca = 'ca',
    /** Chechen */
    ce = 'ce',
    /** Chinese */
    zh = 'zh',
    /** Simplified Chinese */
    zh_Hans = 'zh_Hans',
    /** Traditional Chinese */
    zh_Hant = 'zh_Hant',
    /** Church Slavic */
    cu = 'cu',
    /** Cornish */
    kw = 'kw',
    /** Corsican */
    co = 'co',
    /** Croatian */
    hr = 'hr',
    /** Czech */
    cs = 'cs',
    /** Danish */
    da = 'da',
    /** Dutch */
    nl = 'nl',
    /** Flemish */
    nl_BE = 'nl_BE',
    /** Dzongkha */
    dz = 'dz',
    /** English */
    en = 'en',
    /** Australian English */
    en_AU = 'en_AU',
    /** Canadian English */
    en_CA = 'en_CA',
    /** British English */
    en_GB = 'en_GB',
    /** American English */
    en_US = 'en_US',
    /** Esperanto */
    eo = 'eo',
    /** Estonian */
    et = 'et',
    /** Ewe */
    ee = 'ee',
    /** Faroese */
    fo = 'fo',
    /** Finnish */
    fi = 'fi',
    /** French */
    fr = 'fr',
    /** Canadian French */
    fr_CA = 'fr_CA',
    /** Swiss French */
    fr_CH = 'fr_CH',
    /** Fulah */
    ff = 'ff',
    /** Galician */
    gl = 'gl',
    /** Ganda */
    lg = 'lg',
    /** Georgian */
    ka = 'ka',
    /** German */
    de = 'de',
    /** Austrian German */
    de_AT = 'de_AT',
    /** Swiss High German */
    de_CH = 'de_CH',
    /** Greek */
    el = 'el',
    /** Gujarati */
    gu = 'gu',
    /** Haitian Creole */
    ht = 'ht',
    /** Hausa */
    ha = 'ha',
    /** Hebrew */
    he = 'he',
    /** Hindi */
    hi = 'hi',
    /** Hungarian */
    hu = 'hu',
    /** Igbo */
    ig = 'ig',
    /** Indonesian */
    id = 'id',
    /** Interlingua */
    ia = 'ia',
    /** Irish */
    ga = 'ga',
    /** Italian */
    it = 'it',
    /** Japanese */
    ja = 'ja',
    /** Javanese */
    jv = 'jv',
    /** Kalaallisut */
    kl = 'kl',
    /** Kannada */
    kn = 'kn',
    /** Kashmiri */
    ks = 'ks',
    /** Kazakh */
    kk = 'kk',
    /** Khmer */
    km = 'km',
    /** Kikuyu */
    ki = 'ki',
    /** Kinyarwanda */
    rw = 'rw',
    /** Korean */
    ko = 'ko',
    /** Kurdish */
    ku = 'ku',
    /** Kyrgyz */
    ky = 'ky',
    /** Lao */
    lo = 'lo',
    /** Latin */
    la = 'la',
    /** Latvian */
    lv = 'lv',
    /** Lingala */
    ln = 'ln',
    /** Lithuanian */
    lt = 'lt',
    /** Luba-Katanga */
    lu = 'lu',
    /** Luxembourgish */
    lb = 'lb',
    /** Macedonian */
    mk = 'mk',
    /** Malagasy */
    mg = 'mg',
    /** Malay */
    ms = 'ms',
    /** Malayalam */
    ml = 'ml',
    /** Maltese */
    mt = 'mt',
    /** Manx */
    gv = 'gv',
    /** Maori */
    mi = 'mi',
    /** Marathi */
    mr = 'mr',
    /** Mongolian */
    mn = 'mn',
    /** Nepali */
    ne = 'ne',
    /** North Ndebele */
    nd = 'nd',
    /** Northern Sami */
    se = 'se',
    /** Norwegian Bokmål */
    nb = 'nb',
    /** Norwegian Nynorsk */
    nn = 'nn',
    /** Nyanja */
    ny = 'ny',
    /** Odia */
    or = 'or',
    /** Oromo */
    om = 'om',
    /** Ossetic */
    os = 'os',
    /** Pashto */
    ps = 'ps',
    /** Persian */
    fa = 'fa',
    /** Dari */
    fa_AF = 'fa_AF',
    /** Polish */
    pl = 'pl',
    /** Portuguese */
    pt = 'pt',
    /** Brazilian Portuguese */
    pt_BR = 'pt_BR',
    /** European Portuguese */
    pt_PT = 'pt_PT',
    /** Punjabi */
    pa = 'pa',
    /** Quechua */
    qu = 'qu',
    /** Romanian */
    ro = 'ro',
    /** Moldavian */
    ro_MD = 'ro_MD',
    /** Romansh */
    rm = 'rm',
    /** Rundi */
    rn = 'rn',
    /** Russian */
    ru = 'ru',
    /** Samoan */
    sm = 'sm',
    /** Sango */
    sg = 'sg',
    /** Sanskrit */
    sa = 'sa',
    /** Scottish Gaelic */
    gd = 'gd',
    /** Serbian */
    sr = 'sr',
    /** Shona */
    sn = 'sn',
    /** Sichuan Yi */
    ii = 'ii',
    /** Sindhi */
    sd = 'sd',
    /** Sinhala */
    si = 'si',
    /** Slovak */
    sk = 'sk',
    /** Slovenian */
    sl = 'sl',
    /** Somali */
    so = 'so',
    /** Southern Sotho */
    st = 'st',
    /** Spanish */
    es = 'es',
    /** European Spanish */
    es_ES = 'es_ES',
    /** Mexican Spanish */
    es_MX = 'es_MX',
    /** Sundanese */
    su = 'su',
    /** Swahili */
    sw = 'sw',
    /** Congo Swahili */
    sw_CD = 'sw_CD',
    /** Swedish */
    sv = 'sv',
    /** Tajik */
    tg = 'tg',
    /** Tamil */
    ta = 'ta',
    /** Tatar */
    tt = 'tt',
    /** Telugu */
    te = 'te',
    /** Thai */
    th = 'th',
    /** Tibetan */
    bo = 'bo',
    /** Tigrinya */
    ti = 'ti',
    /** Tongan */
    to = 'to',
    /** Turkish */
    tr = 'tr',
    /** Turkmen */
    tk = 'tk',
    /** Ukrainian */
    uk = 'uk',
    /** Urdu */
    ur = 'ur',
    /** Uyghur */
    ug = 'ug',
    /** Uzbek */
    uz = 'uz',
    /** Vietnamese */
    vi = 'vi',
    /** Volapük */
    vo = 'vo',
    /** Welsh */
    cy = 'cy',
    /** Western Frisian */
    fy = 'fy',
    /** Wolof */
    wo = 'wo',
    /** Xhosa */
    xh = 'xh',
    /** Yiddish */
    yi = 'yi',
    /** Yoruba */
    yo = 'yo',
    /** Zulu */
    zu = 'zu',
}
/** Returned if attempting to set a Channel's defaultLanguageCode to a language which is not enabled in GlobalSettings */
export declare type LanguageNotAvailableError = ErrorResult & {
    __typename?: 'LanguageNotAvailableError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    languageCode: Scalars['String'];
};
export declare type LocaleStringCustomFieldConfig = CustomField & {
    __typename?: 'LocaleStringCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    length?: Maybe<Scalars['Int']>;
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    pattern?: Maybe<Scalars['String']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type LocalizedString = {
    __typename?: 'LocalizedString';
    languageCode: LanguageCode;
    value: Scalars['String'];
};
export declare enum LogicalOperator {
    AND = 'AND',
    OR = 'OR',
}
export declare type ManualPaymentInput = {
    orderId: Scalars['ID'];
    method: Scalars['String'];
    transactionId?: Maybe<Scalars['String']>;
    metadata?: Maybe<Scalars['JSON']>;
};
/**
 * Returned when a call to addManualPaymentToOrder is made but the Order
 * is not in the required state.
 */
export declare type ManualPaymentStateError = ErrorResult & {
    __typename?: 'ManualPaymentStateError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type MimeTypeError = ErrorResult & {
    __typename?: 'MimeTypeError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    fileName: Scalars['String'];
    mimeType: Scalars['String'];
};
/** Returned if a PromotionCondition has neither a couponCode nor any conditions set */
export declare type MissingConditionsError = ErrorResult & {
    __typename?: 'MissingConditionsError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type ModifyOrderInput = {
    dryRun: Scalars['Boolean'];
    orderId: Scalars['ID'];
    addItems?: Maybe<AddItemInput[]>;
    adjustOrderLines?: Maybe<AdjustOrderLineInput[]>;
    surcharges?: Maybe<SurchargeInput[]>;
    updateShippingAddress?: Maybe<UpdateOrderAddressInput>;
    updateBillingAddress?: Maybe<UpdateOrderAddressInput>;
    note?: Maybe<Scalars['String']>;
    refund?: Maybe<AdministratorRefundInput>;
    options?: Maybe<ModifyOrderOptions>;
    couponCodes?: Maybe<Array<Scalars['String']>>;
    customFields?: Maybe<UpdateOrderCustomFieldsInput>;
};
export declare type ModifyOrderOptions = {
    freezePromotions?: Maybe<Scalars['Boolean']>;
    recalculateShipping?: Maybe<Scalars['Boolean']>;
};
export declare type ModifyOrderResult =
    | Order
    | NoChangesSpecifiedError
    | OrderModificationStateError
    | PaymentMethodMissingError
    | RefundPaymentIdMissingError
    | OrderLimitError
    | NegativeQuantityError
    | InsufficientStockError
    | CouponCodeExpiredError
    | CouponCodeInvalidError
    | CouponCodeLimitError;
export declare type MoveCollectionInput = {
    collectionId: Scalars['ID'];
    parentId: Scalars['ID'];
    index: Scalars['Int'];
};
/** Returned if an operation has specified OrderLines from multiple Orders */
export declare type MultipleOrderError = ErrorResult & {
    __typename?: 'MultipleOrderError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type Mutation = {
    __typename?: 'Mutation';
    /** Create a new Administrator */
    createAdministrator: Administrator;
    /** Update an existing Administrator */
    updateAdministrator: Administrator;
    /** Update the active (currently logged-in) Administrator */
    updateActiveAdministrator: Administrator;
    /** Delete an Administrator */
    deleteAdministrator: DeletionResponse;
    /** Assign a Role to an Administrator */
    assignRoleToAdministrator: Administrator;
    /** Create a new Asset */
    createAssets: CreateAssetResult[];
    /** Update an existing Asset */
    updateAsset: Asset;
    /** Delete an Asset */
    deleteAsset: DeletionResponse;
    /** Delete multiple Assets */
    deleteAssets: DeletionResponse;
    /** Assign assets to channel */
    assignAssetsToChannel: Asset[];
    /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
    login: NativeAuthenticationResult;
    /** Authenticates the user using a named authentication strategy */
    authenticate: AuthenticationResult;
    logout: Success;
    /** Create a new Channel */
    createChannel: CreateChannelResult;
    /** Update an existing Channel */
    updateChannel: UpdateChannelResult;
    /** Delete a Channel */
    deleteChannel: DeletionResponse;
    /** Create a new Collection */
    createCollection: Collection;
    /** Update an existing Collection */
    updateCollection: Collection;
    /** Delete a Collection and all of its descendants */
    deleteCollection: DeletionResponse;
    /** Delete multiple Collections and all of their descendants */
    deleteCollections: DeletionResponse[];
    /** Move a Collection to a different parent or index */
    moveCollection: Collection;
    /** Assigns Collections to the specified Channel */
    assignCollectionsToChannel: Collection[];
    /** Removes Collections from the specified Channel */
    removeCollectionsFromChannel: Collection[];
    /** Create a new Country */
    createCountry: Country;
    /** Update an existing Country */
    updateCountry: Country;
    /** Delete a Country */
    deleteCountry: DeletionResponse;
    /** Create a new CustomerGroup */
    createCustomerGroup: CustomerGroup;
    /** Update an existing CustomerGroup */
    updateCustomerGroup: CustomerGroup;
    /** Delete a CustomerGroup */
    deleteCustomerGroup: DeletionResponse;
    /** Add Customers to a CustomerGroup */
    addCustomersToGroup: CustomerGroup;
    /** Remove Customers from a CustomerGroup */
    removeCustomersFromGroup: CustomerGroup;
    /** Create a new Customer. If a password is provided, a new User will also be created an linked to the Customer. */
    createCustomer: CreateCustomerResult;
    /** Update an existing Customer */
    updateCustomer: UpdateCustomerResult;
    /** Delete a Customer */
    deleteCustomer: DeletionResponse;
    /** Create a new Address and associate it with the Customer specified by customerId */
    createCustomerAddress: Address;
    /** Update an existing Address */
    updateCustomerAddress: Address;
    /** Update an existing Address */
    deleteCustomerAddress: Success;
    addNoteToCustomer: Customer;
    updateCustomerNote: HistoryEntry;
    deleteCustomerNote: DeletionResponse;
    /** Create a new Facet */
    createFacet: Facet;
    /** Update an existing Facet */
    updateFacet: Facet;
    /** Delete an existing Facet */
    deleteFacet: DeletionResponse;
    /** Delete multiple existing Facets */
    deleteFacets: DeletionResponse[];
    /** Create one or more FacetValues */
    createFacetValues: FacetValue[];
    /** Update one or more FacetValues */
    updateFacetValues: FacetValue[];
    /** Delete one or more FacetValues */
    deleteFacetValues: DeletionResponse[];
    /** Assigns Facets to the specified Channel */
    assignFacetsToChannel: Facet[];
    /** Removes Facets from the specified Channel */
    removeFacetsFromChannel: RemoveFacetFromChannelResult[];
    updateGlobalSettings: UpdateGlobalSettingsResult;
    importProducts?: Maybe<ImportInfo>;
    /** Remove all settled jobs in the given queues older than the given date. Returns the number of jobs deleted. */
    removeSettledJobs: Scalars['Int'];
    cancelJob: Job;
    flushBufferedJobs: Success;
    settlePayment: SettlePaymentResult;
    cancelPayment: CancelPaymentResult;
    addFulfillmentToOrder: AddFulfillmentToOrderResult;
    cancelOrder: CancelOrderResult;
    refundOrder: RefundOrderResult;
    settleRefund: SettleRefundResult;
    addNoteToOrder: Order;
    updateOrderNote: HistoryEntry;
    deleteOrderNote: DeletionResponse;
    transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
    transitionFulfillmentToState: TransitionFulfillmentToStateResult;
    transitionPaymentToState: TransitionPaymentToStateResult;
    setOrderCustomFields?: Maybe<Order>;
    /**
     * Allows an Order to be modified after it has been completed by the Customer. The Order must first
     * be in the `Modifying` state.
     */
    modifyOrder: ModifyOrderResult;
    /**
     * Used to manually create a new Payment against an Order.
     * This can be used by an Administrator when an Order is in the ArrangingPayment state.
     *
     * It is also used when a completed Order
     * has been modified (using `modifyOrder`) and the price has increased. The extra payment
     * can then be manually arranged by the administrator, and the details used to create a new
     * Payment.
     */
    addManualPaymentToOrder: AddManualPaymentToOrderResult;
    /** Creates a draft Order */
    createDraftOrder: Order;
    /** Deletes a draft Order */
    deleteDraftOrder: DeletionResponse;
    /** Adds an item to the draft Order. */
    addItemToDraftOrder: UpdateOrderItemsResult;
    /** Adjusts a draft OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
    adjustDraftOrderLine: UpdateOrderItemsResult;
    /** Remove an OrderLine from the draft Order */
    removeDraftOrderLine: RemoveOrderItemsResult;
    setCustomerForDraftOrder: SetCustomerForDraftOrderResult;
    /** Sets the shipping address for a draft Order */
    setDraftOrderShippingAddress: Order;
    /** Sets the billing address for a draft Order */
    setDraftOrderBillingAddress: Order;
    /** Allows any custom fields to be set for the active order */
    setDraftOrderCustomFields: Order;
    /** Applies the given coupon code to the draft Order */
    applyCouponCodeToDraftOrder: ApplyCouponCodeResult;
    /** Removes the given coupon code from the draft Order */
    removeCouponCodeFromDraftOrder?: Maybe<Order>;
    /** Sets the shipping method by id, which can be obtained with the `eligibleShippingMethodsForDraftOrder` query */
    setDraftOrderShippingMethod: SetOrderShippingMethodResult;
    /** Create existing PaymentMethod */
    createPaymentMethod: PaymentMethod;
    /** Update an existing PaymentMethod */
    updatePaymentMethod: PaymentMethod;
    /** Delete a PaymentMethod */
    deletePaymentMethod: DeletionResponse;
    /** Create a new ProductOptionGroup */
    createProductOptionGroup: ProductOptionGroup;
    /** Update an existing ProductOptionGroup */
    updateProductOptionGroup: ProductOptionGroup;
    /** Create a new ProductOption within a ProductOptionGroup */
    createProductOption: ProductOption;
    /** Create a new ProductOption within a ProductOptionGroup */
    updateProductOption: ProductOption;
    /** Delete a ProductOption */
    deleteProductOption: DeletionResponse;
    reindex: Job;
    runPendingSearchIndexUpdates: Success;
    /** Create a new Product */
    createProduct: Product;
    /** Update an existing Product */
    updateProduct: Product;
    /** Update multiple existing Products */
    updateProducts: Product[];
    /** Delete a Product */
    deleteProduct: DeletionResponse;
    /** Delete multiple Products */
    deleteProducts: DeletionResponse[];
    /** Add an OptionGroup to a Product */
    addOptionGroupToProduct: Product;
    /** Remove an OptionGroup from a Product */
    removeOptionGroupFromProduct: RemoveOptionGroupFromProductResult;
    /** Create a set of ProductVariants based on the OptionGroups assigned to the given Product */
    createProductVariants: Array<Maybe<ProductVariant>>;
    /** Update existing ProductVariants */
    updateProductVariants: Array<Maybe<ProductVariant>>;
    /** Delete a ProductVariant */
    deleteProductVariant: DeletionResponse;
    /** Delete multiple ProductVariants */
    deleteProductVariants: DeletionResponse[];
    /** Assigns all ProductVariants of Product to the specified Channel */
    assignProductsToChannel: Product[];
    /** Removes all ProductVariants of Product from the specified Channel */
    removeProductsFromChannel: Product[];
    /** Assigns ProductVariants to the specified Channel */
    assignProductVariantsToChannel: ProductVariant[];
    /** Removes ProductVariants from the specified Channel */
    removeProductVariantsFromChannel: ProductVariant[];
    createPromotion: CreatePromotionResult;
    updatePromotion: UpdatePromotionResult;
    deletePromotion: DeletionResponse;
    /** Assigns Promotions to the specified Channel */
    assignPromotionsToChannel: Promotion[];
    /** Removes Promotions from the specified Channel */
    removePromotionsFromChannel: Promotion[];
    /** Create a new Role */
    createRole: Role;
    /** Update an existing Role */
    updateRole: Role;
    /** Delete an existing Role */
    deleteRole: DeletionResponse;
    /** Create a new ShippingMethod */
    createShippingMethod: ShippingMethod;
    /** Update an existing ShippingMethod */
    updateShippingMethod: ShippingMethod;
    /** Delete a ShippingMethod */
    deleteShippingMethod: DeletionResponse;
    /** Create a new Tag */
    createTag: Tag;
    /** Update an existing Tag */
    updateTag: Tag;
    /** Delete an existing Tag */
    deleteTag: DeletionResponse;
    /** Create a new TaxCategory */
    createTaxCategory: TaxCategory;
    /** Update an existing TaxCategory */
    updateTaxCategory: TaxCategory;
    /** Deletes a TaxCategory */
    deleteTaxCategory: DeletionResponse;
    /** Create a new TaxRate */
    createTaxRate: TaxRate;
    /** Update an existing TaxRate */
    updateTaxRate: TaxRate;
    /** Delete a TaxRate */
    deleteTaxRate: DeletionResponse;
    /** Create a new Zone */
    createZone: Zone;
    /** Update an existing Zone */
    updateZone: Zone;
    /** Delete a Zone */
    deleteZone: DeletionResponse;
    /** Add members to a Zone */
    addMembersToZone: Zone;
    /** Remove members from a Zone */
    removeMembersFromZone: Zone;
};
export declare type MutationCreateAdministratorArgs = {
    input: CreateAdministratorInput;
};
export declare type MutationUpdateAdministratorArgs = {
    input: UpdateAdministratorInput;
};
export declare type MutationUpdateActiveAdministratorArgs = {
    input: UpdateActiveAdministratorInput;
};
export declare type MutationDeleteAdministratorArgs = {
    id: Scalars['ID'];
};
export declare type MutationAssignRoleToAdministratorArgs = {
    administratorId: Scalars['ID'];
    roleId: Scalars['ID'];
};
export declare type MutationCreateAssetsArgs = {
    input: CreateAssetInput[];
};
export declare type MutationUpdateAssetArgs = {
    input: UpdateAssetInput;
};
export declare type MutationDeleteAssetArgs = {
    input: DeleteAssetInput;
};
export declare type MutationDeleteAssetsArgs = {
    input: DeleteAssetsInput;
};
export declare type MutationAssignAssetsToChannelArgs = {
    input: AssignAssetsToChannelInput;
};
export declare type MutationLoginArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
    rememberMe?: Maybe<Scalars['Boolean']>;
};
export declare type MutationAuthenticateArgs = {
    input: AuthenticationInput;
    rememberMe?: Maybe<Scalars['Boolean']>;
};
export declare type MutationCreateChannelArgs = {
    input: CreateChannelInput;
};
export declare type MutationUpdateChannelArgs = {
    input: UpdateChannelInput;
};
export declare type MutationDeleteChannelArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateCollectionArgs = {
    input: CreateCollectionInput;
};
export declare type MutationUpdateCollectionArgs = {
    input: UpdateCollectionInput;
};
export declare type MutationDeleteCollectionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCollectionsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationMoveCollectionArgs = {
    input: MoveCollectionInput;
};
export declare type MutationAssignCollectionsToChannelArgs = {
    input: AssignCollectionsToChannelInput;
};
export declare type MutationRemoveCollectionsFromChannelArgs = {
    input: RemoveCollectionsFromChannelInput;
};
export declare type MutationCreateCountryArgs = {
    input: CreateCountryInput;
};
export declare type MutationUpdateCountryArgs = {
    input: UpdateCountryInput;
};
export declare type MutationDeleteCountryArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateCustomerGroupArgs = {
    input: CreateCustomerGroupInput;
};
export declare type MutationUpdateCustomerGroupArgs = {
    input: UpdateCustomerGroupInput;
};
export declare type MutationDeleteCustomerGroupArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddCustomersToGroupArgs = {
    customerGroupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']>;
};
export declare type MutationRemoveCustomersFromGroupArgs = {
    customerGroupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']>;
};
export declare type MutationCreateCustomerArgs = {
    input: CreateCustomerInput;
    password?: Maybe<Scalars['String']>;
};
export declare type MutationUpdateCustomerArgs = {
    input: UpdateCustomerInput;
};
export declare type MutationDeleteCustomerArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateCustomerAddressArgs = {
    customerId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationUpdateCustomerAddressArgs = {
    input: UpdateAddressInput;
};
export declare type MutationDeleteCustomerAddressArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddNoteToCustomerArgs = {
    input: AddNoteToCustomerInput;
};
export declare type MutationUpdateCustomerNoteArgs = {
    input: UpdateCustomerNoteInput;
};
export declare type MutationDeleteCustomerNoteArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateFacetArgs = {
    input: CreateFacetInput;
};
export declare type MutationUpdateFacetArgs = {
    input: UpdateFacetInput;
};
export declare type MutationDeleteFacetArgs = {
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDeleteFacetsArgs = {
    ids: Array<Scalars['ID']>;
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationCreateFacetValuesArgs = {
    input: CreateFacetValueInput[];
};
export declare type MutationUpdateFacetValuesArgs = {
    input: UpdateFacetValueInput[];
};
export declare type MutationDeleteFacetValuesArgs = {
    ids: Array<Scalars['ID']>;
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationAssignFacetsToChannelArgs = {
    input: AssignFacetsToChannelInput;
};
export declare type MutationRemoveFacetsFromChannelArgs = {
    input: RemoveFacetsFromChannelInput;
};
export declare type MutationUpdateGlobalSettingsArgs = {
    input: UpdateGlobalSettingsInput;
};
export declare type MutationImportProductsArgs = {
    csvFile: Scalars['Upload'];
};
export declare type MutationRemoveSettledJobsArgs = {
    queueNames?: Maybe<Array<Scalars['String']>>;
    olderThan?: Maybe<Scalars['DateTime']>;
};
export declare type MutationCancelJobArgs = {
    jobId: Scalars['ID'];
};
export declare type MutationFlushBufferedJobsArgs = {
    bufferIds?: Maybe<Array<Scalars['String']>>;
};
export declare type MutationSettlePaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationCancelPaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddFulfillmentToOrderArgs = {
    input: FulfillOrderInput;
};
export declare type MutationCancelOrderArgs = {
    input: CancelOrderInput;
};
export declare type MutationRefundOrderArgs = {
    input: RefundOrderInput;
};
export declare type MutationSettleRefundArgs = {
    input: SettleRefundInput;
};
export declare type MutationAddNoteToOrderArgs = {
    input: AddNoteToOrderInput;
};
export declare type MutationUpdateOrderNoteArgs = {
    input: UpdateOrderNoteInput;
};
export declare type MutationDeleteOrderNoteArgs = {
    id: Scalars['ID'];
};
export declare type MutationTransitionOrderToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationTransitionFulfillmentToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationTransitionPaymentToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationSetOrderCustomFieldsArgs = {
    input: UpdateOrderInput;
};
export declare type MutationModifyOrderArgs = {
    input: ModifyOrderInput;
};
export declare type MutationAddManualPaymentToOrderArgs = {
    input: ManualPaymentInput;
};
export declare type MutationDeleteDraftOrderArgs = {
    orderId: Scalars['ID'];
};
export declare type MutationAddItemToDraftOrderArgs = {
    orderId: Scalars['ID'];
    input: AddItemToDraftOrderInput;
};
export declare type MutationAdjustDraftOrderLineArgs = {
    orderId: Scalars['ID'];
    input: AdjustDraftOrderLineInput;
};
export declare type MutationRemoveDraftOrderLineArgs = {
    orderId: Scalars['ID'];
    orderLineId: Scalars['ID'];
};
export declare type MutationSetCustomerForDraftOrderArgs = {
    orderId: Scalars['ID'];
    customerId?: Maybe<Scalars['ID']>;
    input?: Maybe<CreateCustomerInput>;
};
export declare type MutationSetDraftOrderShippingAddressArgs = {
    orderId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationSetDraftOrderBillingAddressArgs = {
    orderId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationSetDraftOrderCustomFieldsArgs = {
    orderId: Scalars['ID'];
    input: UpdateOrderInput;
};
export declare type MutationApplyCouponCodeToDraftOrderArgs = {
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
};
export declare type MutationRemoveCouponCodeFromDraftOrderArgs = {
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
};
export declare type MutationSetDraftOrderShippingMethodArgs = {
    orderId: Scalars['ID'];
    shippingMethodId: Scalars['ID'];
};
export declare type MutationCreatePaymentMethodArgs = {
    input: CreatePaymentMethodInput;
};
export declare type MutationUpdatePaymentMethodArgs = {
    input: UpdatePaymentMethodInput;
};
export declare type MutationDeletePaymentMethodArgs = {
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationCreateProductOptionGroupArgs = {
    input: CreateProductOptionGroupInput;
};
export declare type MutationUpdateProductOptionGroupArgs = {
    input: UpdateProductOptionGroupInput;
};
export declare type MutationCreateProductOptionArgs = {
    input: CreateProductOptionInput;
};
export declare type MutationUpdateProductOptionArgs = {
    input: UpdateProductOptionInput;
};
export declare type MutationDeleteProductOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateProductArgs = {
    input: CreateProductInput;
};
export declare type MutationUpdateProductArgs = {
    input: UpdateProductInput;
};
export declare type MutationUpdateProductsArgs = {
    input: UpdateProductInput[];
};
export declare type MutationDeleteProductArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProductsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationAddOptionGroupToProductArgs = {
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
};
export declare type MutationRemoveOptionGroupFromProductArgs = {
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
};
export declare type MutationCreateProductVariantsArgs = {
    input: CreateProductVariantInput[];
};
export declare type MutationUpdateProductVariantsArgs = {
    input: UpdateProductVariantInput[];
};
export declare type MutationDeleteProductVariantArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProductVariantsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationAssignProductsToChannelArgs = {
    input: AssignProductsToChannelInput;
};
export declare type MutationRemoveProductsFromChannelArgs = {
    input: RemoveProductsFromChannelInput;
};
export declare type MutationAssignProductVariantsToChannelArgs = {
    input: AssignProductVariantsToChannelInput;
};
export declare type MutationRemoveProductVariantsFromChannelArgs = {
    input: RemoveProductVariantsFromChannelInput;
};
export declare type MutationCreatePromotionArgs = {
    input: CreatePromotionInput;
};
export declare type MutationUpdatePromotionArgs = {
    input: UpdatePromotionInput;
};
export declare type MutationDeletePromotionArgs = {
    id: Scalars['ID'];
};
export declare type MutationAssignPromotionsToChannelArgs = {
    input: AssignPromotionsToChannelInput;
};
export declare type MutationRemovePromotionsFromChannelArgs = {
    input: RemovePromotionsFromChannelInput;
};
export declare type MutationCreateRoleArgs = {
    input: CreateRoleInput;
};
export declare type MutationUpdateRoleArgs = {
    input: UpdateRoleInput;
};
export declare type MutationDeleteRoleArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateShippingMethodArgs = {
    input: CreateShippingMethodInput;
};
export declare type MutationUpdateShippingMethodArgs = {
    input: UpdateShippingMethodInput;
};
export declare type MutationDeleteShippingMethodArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateTagArgs = {
    input: CreateTagInput;
};
export declare type MutationUpdateTagArgs = {
    input: UpdateTagInput;
};
export declare type MutationDeleteTagArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateTaxCategoryArgs = {
    input: CreateTaxCategoryInput;
};
export declare type MutationUpdateTaxCategoryArgs = {
    input: UpdateTaxCategoryInput;
};
export declare type MutationDeleteTaxCategoryArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateTaxRateArgs = {
    input: CreateTaxRateInput;
};
export declare type MutationUpdateTaxRateArgs = {
    input: UpdateTaxRateInput;
};
export declare type MutationDeleteTaxRateArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateZoneArgs = {
    input: CreateZoneInput;
};
export declare type MutationUpdateZoneArgs = {
    input: UpdateZoneInput;
};
export declare type MutationDeleteZoneArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddMembersToZoneArgs = {
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']>;
};
export declare type MutationRemoveMembersFromZoneArgs = {
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']>;
};
export declare type NativeAuthInput = {
    username: Scalars['String'];
    password: Scalars['String'];
};
/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export declare type NativeAuthStrategyError = ErrorResult & {
    __typename?: 'NativeAuthStrategyError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type NativeAuthenticationResult =
    | CurrentUser
    | InvalidCredentialsError
    | NativeAuthStrategyError;
/** Returned when attempting to set a negative OrderLine quantity. */
export declare type NegativeQuantityError = ErrorResult & {
    __typename?: 'NegativeQuantityError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export declare type NoActiveOrderError = ErrorResult & {
    __typename?: 'NoActiveOrderError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned when a call to modifyOrder fails to specify any changes */
export declare type NoChangesSpecifiedError = ErrorResult & {
    __typename?: 'NoChangesSpecifiedError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type Node = {
    id: Scalars['ID'];
};
/** Returned if an attempting to refund an Order but neither items nor shipping refund was specified */
export declare type NothingToRefundError = ErrorResult & {
    __typename?: 'NothingToRefundError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Operators for filtering on a list of Number fields */
export declare type NumberListOperators = {
    inList: Scalars['Float'];
};
/** Operators for filtering on a Int or Float field */
export declare type NumberOperators = {
    eq?: Maybe<Scalars['Float']>;
    lt?: Maybe<Scalars['Float']>;
    lte?: Maybe<Scalars['Float']>;
    gt?: Maybe<Scalars['Float']>;
    gte?: Maybe<Scalars['Float']>;
    between?: Maybe<NumberRange>;
};
export declare type NumberRange = {
    start: Scalars['Float'];
    end: Scalars['Float'];
};
export declare type Order = Node & {
    __typename?: 'Order';
    nextStates: Array<Scalars['String']>;
    modifications: OrderModification[];
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    /**
     * The date & time that the Order was placed, i.e. the Customer
     * completed the checkout and the Order is no longer "active"
     */
    orderPlacedAt?: Maybe<Scalars['DateTime']>;
    finalChannel?: Maybe<Channel>;
    /** A unique code for the Order */
    code: Scalars['String'];
    state: Scalars['String'];
    /** An order is active as long as the payment process has not been completed */
    active: Scalars['Boolean'];
    customer?: Maybe<Customer>;
    shippingAddress?: Maybe<OrderAddress>;
    billingAddress?: Maybe<OrderAddress>;
    lines: OrderLine[];
    /**
     * Surcharges are arbitrary modifications to the Order total which are neither
     * ProductVariants nor discounts resulting from applied Promotions. For example,
     * one-off discounts based on customer interaction, or surcharges based on payment
     * methods.
     */
    surcharges: Surcharge[];
    discounts: Discount[];
    /** An array of all coupon codes applied to the Order */
    couponCodes: Array<Scalars['String']>;
    /** Promotions applied to the order. Only gets populated after the payment process has completed. */
    promotions: Promotion[];
    payments?: Maybe<Payment[]>;
    fulfillments?: Maybe<Fulfillment[]>;
    totalQuantity: Scalars['Int'];
    /**
     * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
     * discounts which have been prorated (proportionally distributed) amongst the OrderItems.
     * To get a total of all OrderLines which does not account for prorated discounts, use the
     * sum of `OrderLine.discountedLinePrice` values.
     */
    subTotal: Scalars['Int'];
    /** Same as subTotal, but inclusive of tax */
    subTotalWithTax: Scalars['Int'];
    currencyCode: CurrencyCode;
    shippingLines: ShippingLine[];
    shipping: Scalars['Int'];
    shippingWithTax: Scalars['Int'];
    /** Equal to subTotal plus shipping */
    total: Scalars['Int'];
    /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
    totalWithTax: Scalars['Int'];
    /** A summary of the taxes being applied to this Order */
    taxSummary: OrderTaxSummary[];
    history: HistoryEntryList;
    customFields?: Maybe<OrderCustomFields>;
};
export declare type OrderHistoryArgs = {
    options?: Maybe<HistoryEntryListOptions>;
};
export declare type OrderAddress = {
    __typename?: 'OrderAddress';
    fullName?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    streetLine1?: Maybe<Scalars['String']>;
    streetLine2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    countryCode?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    customFields?: Maybe<AddressCustomFields>;
};
export declare type OrderCustomFields = {
    __typename?: 'OrderCustomFields';
    scheduledTime?: Maybe<Scalars['DateTime']>;
    completedTime?: Maybe<Scalars['DateTime']>;
};
export declare type OrderFilterParameter = {
    customerLastName?: Maybe<StringOperators>;
    transactionId?: Maybe<StringOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    orderPlacedAt?: Maybe<DateOperators>;
    code?: Maybe<StringOperators>;
    state?: Maybe<StringOperators>;
    active?: Maybe<BooleanOperators>;
    totalQuantity?: Maybe<NumberOperators>;
    subTotal?: Maybe<NumberOperators>;
    subTotalWithTax?: Maybe<NumberOperators>;
    currencyCode?: Maybe<StringOperators>;
    shipping?: Maybe<NumberOperators>;
    shippingWithTax?: Maybe<NumberOperators>;
    total?: Maybe<NumberOperators>;
    totalWithTax?: Maybe<NumberOperators>;
    scheduledTime?: Maybe<DateOperators>;
    completedTime?: Maybe<DateOperators>;
};
export declare type OrderItem = Node & {
    __typename?: 'OrderItem';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    cancelled: Scalars['Boolean'];
    /** The price of a single unit, excluding tax and discounts */
    unitPrice: Scalars['Int'];
    /** The price of a single unit, including tax but excluding discounts */
    unitPriceWithTax: Scalars['Int'];
    /**
     * The price of a single unit including discounts, excluding tax.
     *
     * If Order-level discounts have been applied, this will not be the
     * actual taxable unit price (see `proratedUnitPrice`), but is generally the
     * correct price to display to customers to avoid confusion
     * about the internal handling of distributed Order-level discounts.
     */
    discountedUnitPrice: Scalars['Int'];
    /** The price of a single unit including discounts and tax */
    discountedUnitPriceWithTax: Scalars['Int'];
    /**
     * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
     * and refund calculations.
     */
    proratedUnitPrice: Scalars['Int'];
    /** The proratedUnitPrice including tax */
    proratedUnitPriceWithTax: Scalars['Int'];
    unitTax: Scalars['Int'];
    taxRate: Scalars['Float'];
    adjustments: Adjustment[];
    taxLines: TaxLine[];
    fulfillment?: Maybe<Fulfillment>;
    refundId?: Maybe<Scalars['ID']>;
};
/** Returned when the maximum order size limit has been reached. */
export declare type OrderLimitError = ErrorResult & {
    __typename?: 'OrderLimitError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    maxItems: Scalars['Int'];
};
export declare type OrderLine = Node & {
    __typename?: 'OrderLine';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    productVariant: ProductVariant;
    featuredAsset?: Maybe<Asset>;
    /** The price of a single unit, excluding tax and discounts */
    unitPrice: Scalars['Int'];
    /** The price of a single unit, including tax but excluding discounts */
    unitPriceWithTax: Scalars['Int'];
    /** Non-zero if the unitPrice has changed since it was initially added to Order */
    unitPriceChangeSinceAdded: Scalars['Int'];
    /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
    unitPriceWithTaxChangeSinceAdded: Scalars['Int'];
    /**
     * The price of a single unit including discounts, excluding tax.
     *
     * If Order-level discounts have been applied, this will not be the
     * actual taxable unit price (see `proratedUnitPrice`), but is generally the
     * correct price to display to customers to avoid confusion
     * about the internal handling of distributed Order-level discounts.
     */
    discountedUnitPrice: Scalars['Int'];
    /** The price of a single unit including discounts and tax */
    discountedUnitPriceWithTax: Scalars['Int'];
    /**
     * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
     * and refund calculations.
     */
    proratedUnitPrice: Scalars['Int'];
    /** The proratedUnitPrice including tax */
    proratedUnitPriceWithTax: Scalars['Int'];
    quantity: Scalars['Int'];
    items: OrderItem[];
    taxRate: Scalars['Float'];
    /** The total price of the line excluding tax and discounts. */
    linePrice: Scalars['Int'];
    /** The total price of the line including tax but excluding discounts. */
    linePriceWithTax: Scalars['Int'];
    /** The price of the line including discounts, excluding tax */
    discountedLinePrice: Scalars['Int'];
    /** The price of the line including discounts and tax */
    discountedLinePriceWithTax: Scalars['Int'];
    /**
     * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
     * and refund calculations.
     */
    proratedLinePrice: Scalars['Int'];
    /** The proratedLinePrice including tax */
    proratedLinePriceWithTax: Scalars['Int'];
    /** The total tax on this line */
    lineTax: Scalars['Int'];
    discounts: Discount[];
    taxLines: TaxLine[];
    order: Order;
    fulfillments?: Maybe<Fulfillment[]>;
    customFields?: Maybe<OrderLineCustomFields>;
};
export declare type OrderLineCustomFields = {
    __typename?: 'OrderLineCustomFields';
    isCone?: Maybe<Scalars['Boolean']>;
};
export declare type OrderLineCustomFieldsInput = {
    isCone?: Maybe<Scalars['Boolean']>;
};
export declare type OrderLineInput = {
    orderLineId: Scalars['ID'];
    quantity: Scalars['Int'];
};
export declare type OrderList = PaginatedList & {
    __typename?: 'OrderList';
    items: Order[];
    totalItems: Scalars['Int'];
};
export declare type OrderListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<OrderSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<OrderFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type OrderModification = Node & {
    __typename?: 'OrderModification';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    priceChange: Scalars['Int'];
    note: Scalars['String'];
    orderItems?: Maybe<OrderItem[]>;
    surcharges?: Maybe<Surcharge[]>;
    payment?: Maybe<Payment>;
    refund?: Maybe<Refund>;
    isSettled: Scalars['Boolean'];
};
/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export declare type OrderModificationError = ErrorResult & {
    __typename?: 'OrderModificationError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned when attempting to modify the contents of an Order that is not in the `Modifying` state. */
export declare type OrderModificationStateError = ErrorResult & {
    __typename?: 'OrderModificationStateError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type OrderProcessState = {
    __typename?: 'OrderProcessState';
    name: Scalars['String'];
    to: Array<Scalars['String']>;
};
export declare type OrderSortParameter = {
    customerLastName?: Maybe<SortOrder>;
    transactionId?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    orderPlacedAt?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
    state?: Maybe<SortOrder>;
    totalQuantity?: Maybe<SortOrder>;
    subTotal?: Maybe<SortOrder>;
    subTotalWithTax?: Maybe<SortOrder>;
    shipping?: Maybe<SortOrder>;
    shippingWithTax?: Maybe<SortOrder>;
    total?: Maybe<SortOrder>;
    totalWithTax?: Maybe<SortOrder>;
    scheduledTime?: Maybe<SortOrder>;
    completedTime?: Maybe<SortOrder>;
};
/** Returned if there is an error in transitioning the Order state */
export declare type OrderStateTransitionError = ErrorResult & {
    __typename?: 'OrderStateTransitionError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
};
/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export declare type OrderTaxSummary = {
    __typename?: 'OrderTaxSummary';
    /** A description of this tax */
    description: Scalars['String'];
    /** The taxRate as a percentage */
    taxRate: Scalars['Float'];
    /** The total net price or OrderItems to which this taxRate applies */
    taxBase: Scalars['Int'];
    /** The total tax being applied to the Order at this taxRate */
    taxTotal: Scalars['Int'];
};
export declare type PaginatedList = {
    items: Node[];
    totalItems: Scalars['Int'];
};
export declare type Payment = Node & {
    __typename?: 'Payment';
    nextStates: Array<Scalars['String']>;
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    method: Scalars['String'];
    amount: Scalars['Int'];
    state: Scalars['String'];
    transactionId?: Maybe<Scalars['String']>;
    errorMessage?: Maybe<Scalars['String']>;
    refunds: Refund[];
    metadata?: Maybe<Scalars['JSON']>;
};
export declare type PaymentMethod = Node & {
    __typename?: 'PaymentMethod';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    code: Scalars['String'];
    description: Scalars['String'];
    enabled: Scalars['Boolean'];
    checker?: Maybe<ConfigurableOperation>;
    handler: ConfigurableOperation;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type PaymentMethodFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    name?: Maybe<StringOperators>;
    code?: Maybe<StringOperators>;
    description?: Maybe<StringOperators>;
    enabled?: Maybe<BooleanOperators>;
};
export declare type PaymentMethodList = PaginatedList & {
    __typename?: 'PaymentMethodList';
    items: PaymentMethod[];
    totalItems: Scalars['Int'];
};
export declare type PaymentMethodListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<PaymentMethodSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<PaymentMethodFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
/**
 * Returned when a call to modifyOrder fails to include a paymentMethod even
 * though the price has increased as a result of the changes.
 */
export declare type PaymentMethodMissingError = ErrorResult & {
    __typename?: 'PaymentMethodMissingError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type PaymentMethodQuote = {
    __typename?: 'PaymentMethodQuote';
    id: Scalars['ID'];
    code: Scalars['String'];
    name: Scalars['String'];
    description: Scalars['String'];
    isEligible: Scalars['Boolean'];
    eligibilityMessage?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type PaymentMethodSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
};
/** Returned if an attempting to refund a Payment against OrderLines from a different Order */
export declare type PaymentOrderMismatchError = ErrorResult & {
    __typename?: 'PaymentOrderMismatchError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned when there is an error in transitioning the Payment state */
export declare type PaymentStateTransitionError = ErrorResult & {
    __typename?: 'PaymentStateTransitionError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
};
/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export declare enum Permission {
    /** Authenticated means simply that the user is logged in */
    Authenticated = 'Authenticated',
    /** SuperAdmin has unrestricted access to all operations */
    SuperAdmin = 'SuperAdmin',
    /** Owner means the user owns this entity, e.g. a Customer's own Order */
    Owner = 'Owner',
    /** Public means any unauthenticated user may perform the operation */
    Public = 'Public',
    /** Grants permission to update GlobalSettings */
    UpdateGlobalSettings = 'UpdateGlobalSettings',
    /** Grants permission to create Products, Facets, Assets, Collections */
    CreateCatalog = 'CreateCatalog',
    /** Grants permission to read Products, Facets, Assets, Collections */
    ReadCatalog = 'ReadCatalog',
    /** Grants permission to update Products, Facets, Assets, Collections */
    UpdateCatalog = 'UpdateCatalog',
    /** Grants permission to delete Products, Facets, Assets, Collections */
    DeleteCatalog = 'DeleteCatalog',
    /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    CreateSettings = 'CreateSettings',
    /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    ReadSettings = 'ReadSettings',
    /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    UpdateSettings = 'UpdateSettings',
    /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    DeleteSettings = 'DeleteSettings',
    /** Grants permission to create Administrator */
    CreateAdministrator = 'CreateAdministrator',
    /** Grants permission to read Administrator */
    ReadAdministrator = 'ReadAdministrator',
    /** Grants permission to update Administrator */
    UpdateAdministrator = 'UpdateAdministrator',
    /** Grants permission to delete Administrator */
    DeleteAdministrator = 'DeleteAdministrator',
    /** Grants permission to create Asset */
    CreateAsset = 'CreateAsset',
    /** Grants permission to read Asset */
    ReadAsset = 'ReadAsset',
    /** Grants permission to update Asset */
    UpdateAsset = 'UpdateAsset',
    /** Grants permission to delete Asset */
    DeleteAsset = 'DeleteAsset',
    /** Grants permission to create Channel */
    CreateChannel = 'CreateChannel',
    /** Grants permission to read Channel */
    ReadChannel = 'ReadChannel',
    /** Grants permission to update Channel */
    UpdateChannel = 'UpdateChannel',
    /** Grants permission to delete Channel */
    DeleteChannel = 'DeleteChannel',
    /** Grants permission to create Collection */
    CreateCollection = 'CreateCollection',
    /** Grants permission to read Collection */
    ReadCollection = 'ReadCollection',
    /** Grants permission to update Collection */
    UpdateCollection = 'UpdateCollection',
    /** Grants permission to delete Collection */
    DeleteCollection = 'DeleteCollection',
    /** Grants permission to create Country */
    CreateCountry = 'CreateCountry',
    /** Grants permission to read Country */
    ReadCountry = 'ReadCountry',
    /** Grants permission to update Country */
    UpdateCountry = 'UpdateCountry',
    /** Grants permission to delete Country */
    DeleteCountry = 'DeleteCountry',
    /** Grants permission to create Customer */
    CreateCustomer = 'CreateCustomer',
    /** Grants permission to read Customer */
    ReadCustomer = 'ReadCustomer',
    /** Grants permission to update Customer */
    UpdateCustomer = 'UpdateCustomer',
    /** Grants permission to delete Customer */
    DeleteCustomer = 'DeleteCustomer',
    /** Grants permission to create CustomerGroup */
    CreateCustomerGroup = 'CreateCustomerGroup',
    /** Grants permission to read CustomerGroup */
    ReadCustomerGroup = 'ReadCustomerGroup',
    /** Grants permission to update CustomerGroup */
    UpdateCustomerGroup = 'UpdateCustomerGroup',
    /** Grants permission to delete CustomerGroup */
    DeleteCustomerGroup = 'DeleteCustomerGroup',
    /** Grants permission to create Facet */
    CreateFacet = 'CreateFacet',
    /** Grants permission to read Facet */
    ReadFacet = 'ReadFacet',
    /** Grants permission to update Facet */
    UpdateFacet = 'UpdateFacet',
    /** Grants permission to delete Facet */
    DeleteFacet = 'DeleteFacet',
    /** Grants permission to create Order */
    CreateOrder = 'CreateOrder',
    /** Grants permission to read Order */
    ReadOrder = 'ReadOrder',
    /** Grants permission to update Order */
    UpdateOrder = 'UpdateOrder',
    /** Grants permission to delete Order */
    DeleteOrder = 'DeleteOrder',
    /** Grants permission to create PaymentMethod */
    CreatePaymentMethod = 'CreatePaymentMethod',
    /** Grants permission to read PaymentMethod */
    ReadPaymentMethod = 'ReadPaymentMethod',
    /** Grants permission to update PaymentMethod */
    UpdatePaymentMethod = 'UpdatePaymentMethod',
    /** Grants permission to delete PaymentMethod */
    DeletePaymentMethod = 'DeletePaymentMethod',
    /** Grants permission to create Product */
    CreateProduct = 'CreateProduct',
    /** Grants permission to read Product */
    ReadProduct = 'ReadProduct',
    /** Grants permission to update Product */
    UpdateProduct = 'UpdateProduct',
    /** Grants permission to delete Product */
    DeleteProduct = 'DeleteProduct',
    /** Grants permission to create Promotion */
    CreatePromotion = 'CreatePromotion',
    /** Grants permission to read Promotion */
    ReadPromotion = 'ReadPromotion',
    /** Grants permission to update Promotion */
    UpdatePromotion = 'UpdatePromotion',
    /** Grants permission to delete Promotion */
    DeletePromotion = 'DeletePromotion',
    /** Grants permission to create ShippingMethod */
    CreateShippingMethod = 'CreateShippingMethod',
    /** Grants permission to read ShippingMethod */
    ReadShippingMethod = 'ReadShippingMethod',
    /** Grants permission to update ShippingMethod */
    UpdateShippingMethod = 'UpdateShippingMethod',
    /** Grants permission to delete ShippingMethod */
    DeleteShippingMethod = 'DeleteShippingMethod',
    /** Grants permission to create Tag */
    CreateTag = 'CreateTag',
    /** Grants permission to read Tag */
    ReadTag = 'ReadTag',
    /** Grants permission to update Tag */
    UpdateTag = 'UpdateTag',
    /** Grants permission to delete Tag */
    DeleteTag = 'DeleteTag',
    /** Grants permission to create TaxCategory */
    CreateTaxCategory = 'CreateTaxCategory',
    /** Grants permission to read TaxCategory */
    ReadTaxCategory = 'ReadTaxCategory',
    /** Grants permission to update TaxCategory */
    UpdateTaxCategory = 'UpdateTaxCategory',
    /** Grants permission to delete TaxCategory */
    DeleteTaxCategory = 'DeleteTaxCategory',
    /** Grants permission to create TaxRate */
    CreateTaxRate = 'CreateTaxRate',
    /** Grants permission to read TaxRate */
    ReadTaxRate = 'ReadTaxRate',
    /** Grants permission to update TaxRate */
    UpdateTaxRate = 'UpdateTaxRate',
    /** Grants permission to delete TaxRate */
    DeleteTaxRate = 'DeleteTaxRate',
    /** Grants permission to create System */
    CreateSystem = 'CreateSystem',
    /** Grants permission to read System */
    ReadSystem = 'ReadSystem',
    /** Grants permission to update System */
    UpdateSystem = 'UpdateSystem',
    /** Grants permission to delete System */
    DeleteSystem = 'DeleteSystem',
    /** Grants permission to create Zone */
    CreateZone = 'CreateZone',
    /** Grants permission to read Zone */
    ReadZone = 'ReadZone',
    /** Grants permission to update Zone */
    UpdateZone = 'UpdateZone',
    /** Grants permission to delete Zone */
    DeleteZone = 'DeleteZone',
}
export declare type PermissionDefinition = {
    __typename?: 'PermissionDefinition';
    name: Scalars['String'];
    description: Scalars['String'];
    assignable: Scalars['Boolean'];
};
export declare type PreviewCollectionVariantsInput = {
    parentId?: Maybe<Scalars['ID']>;
    filters: ConfigurableOperationInput[];
};
/** The price range where the result has more than one price */
export declare type PriceRange = {
    __typename?: 'PriceRange';
    min: Scalars['Int'];
    max: Scalars['Int'];
};
export declare type Product = Node & {
    __typename?: 'Product';
    enabled: Scalars['Boolean'];
    channels: Channel[];
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
    slug: Scalars['String'];
    description: Scalars['String'];
    featuredAsset?: Maybe<Asset>;
    assets: Asset[];
    /** Returns all ProductVariants */
    variants: ProductVariant[];
    /** Returns a paginated, sortable, filterable list of ProductVariants */
    variantList: ProductVariantList;
    optionGroups: ProductOptionGroup[];
    facetValues: FacetValue[];
    translations: ProductTranslation[];
    collections: Collection[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductVariantListArgs = {
    options?: Maybe<ProductVariantListOptions>;
};
export declare type ProductFilterParameter = {
    enabled?: Maybe<BooleanOperators>;
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    slug?: Maybe<StringOperators>;
    description?: Maybe<StringOperators>;
};
export declare type ProductList = PaginatedList & {
    __typename?: 'ProductList';
    items: Product[];
    totalItems: Scalars['Int'];
};
export declare type ProductListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<ProductSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<ProductFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type ProductOption = Node & {
    __typename?: 'ProductOption';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    name: Scalars['String'];
    groupId: Scalars['ID'];
    group: ProductOptionGroup;
    translations: ProductOptionTranslation[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductOptionGroup = Node & {
    __typename?: 'ProductOptionGroup';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    name: Scalars['String'];
    options: ProductOption[];
    translations: ProductOptionGroupTranslation[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductOptionGroupTranslation = {
    __typename?: 'ProductOptionGroupTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type ProductOptionGroupTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductOptionInUseError = ErrorResult & {
    __typename?: 'ProductOptionInUseError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    optionGroupCode: Scalars['String'];
    productVariantCount: Scalars['Int'];
};
export declare type ProductOptionTranslation = {
    __typename?: 'ProductOptionTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type ProductOptionTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    slug?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
};
export declare type ProductTranslation = {
    __typename?: 'ProductTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
    slug: Scalars['String'];
    description: Scalars['String'];
};
export declare type ProductTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ProductVariant = Node & {
    __typename?: 'ProductVariant';
    enabled: Scalars['Boolean'];
    trackInventory: GlobalFlag;
    stockOnHand: Scalars['Int'];
    stockAllocated: Scalars['Int'];
    outOfStockThreshold: Scalars['Int'];
    useGlobalOutOfStockThreshold: Scalars['Boolean'];
    stockMovements: StockMovementList;
    channels: Channel[];
    id: Scalars['ID'];
    product: Product;
    productId: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    sku: Scalars['String'];
    name: Scalars['String'];
    featuredAsset?: Maybe<Asset>;
    assets: Asset[];
    price: Scalars['Int'];
    currencyCode: CurrencyCode;
    priceWithTax: Scalars['Int'];
    stockLevel: Scalars['String'];
    taxRateApplied: TaxRate;
    taxCategory: TaxCategory;
    options: ProductOption[];
    facetValues: FacetValue[];
    translations: ProductVariantTranslation[];
    customFields?: Maybe<ProductVariantCustomFields>;
};
export declare type ProductVariantStockMovementsArgs = {
    options?: Maybe<StockMovementListOptions>;
};
export declare type ProductVariantCustomFields = {
    __typename?: 'ProductVariantCustomFields';
    pre_discount_price?: Maybe<Scalars['Int']>;
};
export declare type ProductVariantFilterParameter = {
    enabled?: Maybe<BooleanOperators>;
    trackInventory?: Maybe<StringOperators>;
    stockOnHand?: Maybe<NumberOperators>;
    stockAllocated?: Maybe<NumberOperators>;
    outOfStockThreshold?: Maybe<NumberOperators>;
    useGlobalOutOfStockThreshold?: Maybe<BooleanOperators>;
    id?: Maybe<IdOperators>;
    productId?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    sku?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    price?: Maybe<NumberOperators>;
    currencyCode?: Maybe<StringOperators>;
    priceWithTax?: Maybe<NumberOperators>;
    stockLevel?: Maybe<StringOperators>;
    pre_discount_price?: Maybe<NumberOperators>;
};
export declare type ProductVariantList = PaginatedList & {
    __typename?: 'ProductVariantList';
    items: ProductVariant[];
    totalItems: Scalars['Int'];
};
export declare type ProductVariantListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<ProductVariantSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<ProductVariantFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type ProductVariantSortParameter = {
    stockOnHand?: Maybe<SortOrder>;
    stockAllocated?: Maybe<SortOrder>;
    outOfStockThreshold?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    productId?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    sku?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    price?: Maybe<SortOrder>;
    priceWithTax?: Maybe<SortOrder>;
    stockLevel?: Maybe<SortOrder>;
    pre_discount_price?: Maybe<SortOrder>;
};
export declare type ProductVariantTranslation = {
    __typename?: 'ProductVariantTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
};
export declare type ProductVariantTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type Promotion = Node & {
    __typename?: 'Promotion';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    startsAt?: Maybe<Scalars['DateTime']>;
    endsAt?: Maybe<Scalars['DateTime']>;
    couponCode?: Maybe<Scalars['String']>;
    perCustomerUsageLimit?: Maybe<Scalars['Int']>;
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    conditions: ConfigurableOperation[];
    actions: ConfigurableOperation[];
    customFields?: Maybe<PromotionCustomFields>;
};
export declare type PromotionCustomFields = {
    __typename?: 'PromotionCustomFields';
    image?: Maybe<Asset>;
    description?: Maybe<Scalars['String']>;
};
export declare type PromotionFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    startsAt?: Maybe<DateOperators>;
    endsAt?: Maybe<DateOperators>;
    couponCode?: Maybe<StringOperators>;
    perCustomerUsageLimit?: Maybe<NumberOperators>;
    name?: Maybe<StringOperators>;
    enabled?: Maybe<BooleanOperators>;
    description?: Maybe<StringOperators>;
};
export declare type PromotionList = PaginatedList & {
    __typename?: 'PromotionList';
    items: Promotion[];
    totalItems: Scalars['Int'];
};
export declare type PromotionListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<PromotionSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<PromotionFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type PromotionSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    startsAt?: Maybe<SortOrder>;
    endsAt?: Maybe<SortOrder>;
    couponCode?: Maybe<SortOrder>;
    perCustomerUsageLimit?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    image?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
};
/** Returned if the specified quantity of an OrderLine is greater than the number of items in that line */
export declare type QuantityTooGreatError = ErrorResult & {
    __typename?: 'QuantityTooGreatError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
export declare type Query = {
    __typename?: 'Query';
    administrators: AdministratorList;
    administrator?: Maybe<Administrator>;
    activeAdministrator?: Maybe<Administrator>;
    /** Get a list of Assets */
    assets: AssetList;
    /** Get a single Asset by id */
    asset?: Maybe<Asset>;
    me?: Maybe<CurrentUser>;
    channels: Channel[];
    channel?: Maybe<Channel>;
    activeChannel: Channel;
    collections: CollectionList;
    /** Get a Collection either by id or slug. If neither id nor slug is specified, an error will result. */
    collection?: Maybe<Collection>;
    collectionFilters: ConfigurableOperationDefinition[];
    /** Used for real-time previews of the contents of a Collection */
    previewCollectionVariants: ProductVariantList;
    countries: CountryList;
    country?: Maybe<Country>;
    customerGroups: CustomerGroupList;
    customerGroup?: Maybe<CustomerGroup>;
    customers: CustomerList;
    customer?: Maybe<Customer>;
    facets: FacetList;
    facet?: Maybe<Facet>;
    globalSettings: GlobalSettings;
    job?: Maybe<Job>;
    jobs: JobList;
    jobsById: Job[];
    jobQueues: JobQueue[];
    jobBufferSize: JobBufferSize[];
    order?: Maybe<Order>;
    orders: OrderList;
    /** Returns a list of eligible shipping methods for the draft Order */
    eligibleShippingMethodsForDraftOrder: ShippingMethodQuote[];
    paymentMethods: PaymentMethodList;
    paymentMethod?: Maybe<PaymentMethod>;
    paymentMethodEligibilityCheckers: ConfigurableOperationDefinition[];
    paymentMethodHandlers: ConfigurableOperationDefinition[];
    productOptionGroups: ProductOptionGroup[];
    productOptionGroup?: Maybe<ProductOptionGroup>;
    search: SearchResponse;
    pendingSearchIndexUpdates: Scalars['Int'];
    /** List Products */
    products: ProductList;
    /** Get a Product either by id or slug. If neither id nor slug is specified, an error will result. */
    product?: Maybe<Product>;
    /** List ProductVariants either all or for the specific product. */
    productVariants: ProductVariantList;
    /** Get a ProductVariant by id */
    productVariant?: Maybe<ProductVariant>;
    promotion?: Maybe<Promotion>;
    promotions: PromotionList;
    promotionConditions: ConfigurableOperationDefinition[];
    promotionActions: ConfigurableOperationDefinition[];
    roles: RoleList;
    role?: Maybe<Role>;
    shippingMethods: ShippingMethodList;
    shippingMethod?: Maybe<ShippingMethod>;
    shippingEligibilityCheckers: ConfigurableOperationDefinition[];
    shippingCalculators: ConfigurableOperationDefinition[];
    fulfillmentHandlers: ConfigurableOperationDefinition[];
    testShippingMethod: TestShippingMethodResult;
    testEligibleShippingMethods: ShippingMethodQuote[];
    tag: Tag;
    tags: TagList;
    taxCategories: TaxCategory[];
    taxCategory?: Maybe<TaxCategory>;
    taxRates: TaxRateList;
    taxRate?: Maybe<TaxRate>;
    zones: Zone[];
    zone?: Maybe<Zone>;
};
export declare type QueryAdministratorsArgs = {
    options?: Maybe<AdministratorListOptions>;
};
export declare type QueryAdministratorArgs = {
    id: Scalars['ID'];
};
export declare type QueryAssetsArgs = {
    options?: Maybe<AssetListOptions>;
};
export declare type QueryAssetArgs = {
    id: Scalars['ID'];
};
export declare type QueryChannelArgs = {
    id: Scalars['ID'];
};
export declare type QueryCollectionsArgs = {
    options?: Maybe<CollectionListOptions>;
};
export declare type QueryCollectionArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
};
export declare type QueryPreviewCollectionVariantsArgs = {
    input: PreviewCollectionVariantsInput;
    options?: Maybe<ProductVariantListOptions>;
};
export declare type QueryCountriesArgs = {
    options?: Maybe<CountryListOptions>;
};
export declare type QueryCountryArgs = {
    id: Scalars['ID'];
};
export declare type QueryCustomerGroupsArgs = {
    options?: Maybe<CustomerGroupListOptions>;
};
export declare type QueryCustomerGroupArgs = {
    id: Scalars['ID'];
};
export declare type QueryCustomersArgs = {
    options?: Maybe<CustomerListOptions>;
};
export declare type QueryCustomerArgs = {
    id: Scalars['ID'];
};
export declare type QueryFacetsArgs = {
    options?: Maybe<FacetListOptions>;
};
export declare type QueryFacetArgs = {
    id: Scalars['ID'];
};
export declare type QueryJobArgs = {
    jobId: Scalars['ID'];
};
export declare type QueryJobsArgs = {
    options?: Maybe<JobListOptions>;
};
export declare type QueryJobsByIdArgs = {
    jobIds: Array<Scalars['ID']>;
};
export declare type QueryJobBufferSizeArgs = {
    bufferIds?: Maybe<Array<Scalars['String']>>;
};
export declare type QueryOrderArgs = {
    id: Scalars['ID'];
};
export declare type QueryOrdersArgs = {
    options?: Maybe<OrderListOptions>;
};
export declare type QueryEligibleShippingMethodsForDraftOrderArgs = {
    orderId: Scalars['ID'];
};
export declare type QueryPaymentMethodsArgs = {
    options?: Maybe<PaymentMethodListOptions>;
};
export declare type QueryPaymentMethodArgs = {
    id: Scalars['ID'];
};
export declare type QueryProductOptionGroupsArgs = {
    filterTerm?: Maybe<Scalars['String']>;
};
export declare type QueryProductOptionGroupArgs = {
    id: Scalars['ID'];
};
export declare type QuerySearchArgs = {
    input: SearchInput;
};
export declare type QueryProductsArgs = {
    options?: Maybe<ProductListOptions>;
};
export declare type QueryProductArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
};
export declare type QueryProductVariantsArgs = {
    options?: Maybe<ProductVariantListOptions>;
    productId?: Maybe<Scalars['ID']>;
};
export declare type QueryProductVariantArgs = {
    id: Scalars['ID'];
};
export declare type QueryPromotionArgs = {
    id: Scalars['ID'];
};
export declare type QueryPromotionsArgs = {
    options?: Maybe<PromotionListOptions>;
};
export declare type QueryRolesArgs = {
    options?: Maybe<RoleListOptions>;
};
export declare type QueryRoleArgs = {
    id: Scalars['ID'];
};
export declare type QueryShippingMethodsArgs = {
    options?: Maybe<ShippingMethodListOptions>;
};
export declare type QueryShippingMethodArgs = {
    id: Scalars['ID'];
};
export declare type QueryTestShippingMethodArgs = {
    input: TestShippingMethodInput;
};
export declare type QueryTestEligibleShippingMethodsArgs = {
    input: TestEligibleShippingMethodsInput;
};
export declare type QueryTagArgs = {
    id: Scalars['ID'];
};
export declare type QueryTagsArgs = {
    options?: Maybe<TagListOptions>;
};
export declare type QueryTaxCategoryArgs = {
    id: Scalars['ID'];
};
export declare type QueryTaxRatesArgs = {
    options?: Maybe<TaxRateListOptions>;
};
export declare type QueryTaxRateArgs = {
    id: Scalars['ID'];
};
export declare type QueryZoneArgs = {
    id: Scalars['ID'];
};
export declare type Refund = Node & {
    __typename?: 'Refund';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    items: Scalars['Int'];
    shipping: Scalars['Int'];
    adjustment: Scalars['Int'];
    total: Scalars['Int'];
    method?: Maybe<Scalars['String']>;
    state: Scalars['String'];
    transactionId?: Maybe<Scalars['String']>;
    reason?: Maybe<Scalars['String']>;
    orderItems: OrderItem[];
    paymentId: Scalars['ID'];
    metadata?: Maybe<Scalars['JSON']>;
};
export declare type RefundOrderInput = {
    lines: OrderLineInput[];
    shipping: Scalars['Int'];
    adjustment: Scalars['Int'];
    paymentId: Scalars['ID'];
    reason?: Maybe<Scalars['String']>;
};
export declare type RefundOrderResult =
    | Refund
    | QuantityTooGreatError
    | NothingToRefundError
    | OrderStateTransitionError
    | MultipleOrderError
    | PaymentOrderMismatchError
    | RefundOrderStateError
    | AlreadyRefundedError
    | RefundStateTransitionError;
/** Returned if an attempting to refund an Order which is not in the expected state */
export declare type RefundOrderStateError = ErrorResult & {
    __typename?: 'RefundOrderStateError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    orderState: Scalars['String'];
};
/**
 * Returned when a call to modifyOrder fails to include a refundPaymentId even
 * though the price has decreased as a result of the changes.
 */
export declare type RefundPaymentIdMissingError = ErrorResult & {
    __typename?: 'RefundPaymentIdMissingError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** Returned when there is an error in transitioning the Refund state */
export declare type RefundStateTransitionError = ErrorResult & {
    __typename?: 'RefundStateTransitionError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
};
export declare type RelationCustomFieldConfig = CustomField & {
    __typename?: 'RelationCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    entity: Scalars['String'];
    scalarFields: Array<Scalars['String']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type Release = Node &
    StockMovement & {
        __typename?: 'Release';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
        orderItem: OrderItem;
    };
export declare type RemoveCollectionsFromChannelInput = {
    collectionIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type RemoveFacetFromChannelResult = Facet | FacetInUseError;
export declare type RemoveFacetsFromChannelInput = {
    facetIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
};
export declare type RemoveOptionGroupFromProductResult = Product | ProductOptionInUseError;
export declare type RemoveOrderItemsResult = Order | OrderModificationError;
export declare type RemoveProductVariantsFromChannelInput = {
    productVariantIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type RemoveProductsFromChannelInput = {
    productIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type RemovePromotionsFromChannelInput = {
    promotionIds: Array<Scalars['ID']>;
    channelId: Scalars['ID'];
};
export declare type Return = Node &
    StockMovement & {
        __typename?: 'Return';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
        orderItem: OrderItem;
    };
export declare type Role = Node & {
    __typename?: 'Role';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    code: Scalars['String'];
    description: Scalars['String'];
    permissions: Permission[];
    channels: Channel[];
};
export declare type RoleFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    code?: Maybe<StringOperators>;
    description?: Maybe<StringOperators>;
};
export declare type RoleList = PaginatedList & {
    __typename?: 'RoleList';
    items: Role[];
    totalItems: Scalars['Int'];
};
export declare type RoleListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<RoleSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<RoleFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type RoleSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
};
export declare type Sale = Node &
    StockMovement & {
        __typename?: 'Sale';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
        orderItem: OrderItem;
    };
export declare type SearchInput = {
    term?: Maybe<Scalars['String']>;
    facetValueIds?: Maybe<Array<Scalars['ID']>>;
    facetValueOperator?: Maybe<LogicalOperator>;
    facetValueFilters?: Maybe<FacetValueFilterInput[]>;
    collectionId?: Maybe<Scalars['ID']>;
    collectionSlug?: Maybe<Scalars['String']>;
    groupByProduct?: Maybe<Scalars['Boolean']>;
    take?: Maybe<Scalars['Int']>;
    skip?: Maybe<Scalars['Int']>;
    sort?: Maybe<SearchResultSortParameter>;
};
export declare type SearchReindexResponse = {
    __typename?: 'SearchReindexResponse';
    success: Scalars['Boolean'];
};
export declare type SearchResponse = {
    __typename?: 'SearchResponse';
    items: SearchResult[];
    totalItems: Scalars['Int'];
    facetValues: FacetValueResult[];
    collections: CollectionResult[];
};
export declare type SearchResult = {
    __typename?: 'SearchResult';
    enabled: Scalars['Boolean'];
    /** An array of ids of the Channels in which this result appears */
    channelIds: Array<Scalars['ID']>;
    sku: Scalars['String'];
    slug: Scalars['String'];
    productId: Scalars['ID'];
    productName: Scalars['String'];
    productAsset?: Maybe<SearchResultAsset>;
    productVariantId: Scalars['ID'];
    productVariantName: Scalars['String'];
    productVariantAsset?: Maybe<SearchResultAsset>;
    price: SearchResultPrice;
    priceWithTax: SearchResultPrice;
    currencyCode: CurrencyCode;
    description: Scalars['String'];
    facetIds: Array<Scalars['ID']>;
    facetValueIds: Array<Scalars['ID']>;
    /** An array of ids of the Collections in which this result appears */
    collectionIds: Array<Scalars['ID']>;
    /** A relevance score for the result. Differs between database implementations */
    score: Scalars['Float'];
};
export declare type SearchResultAsset = {
    __typename?: 'SearchResultAsset';
    id: Scalars['ID'];
    preview: Scalars['String'];
    focalPoint?: Maybe<Coordinate>;
};
/** The price of a search result product, either as a range or as a single price */
export declare type SearchResultPrice = PriceRange | SinglePrice;
export declare type SearchResultSortParameter = {
    name?: Maybe<SortOrder>;
    price?: Maybe<SortOrder>;
};
export declare type ServerConfig = {
    __typename?: 'ServerConfig';
    orderProcess: OrderProcessState[];
    permittedAssetTypes: Array<Scalars['String']>;
    permissions: PermissionDefinition[];
    customFieldConfig: CustomFields;
};
export declare type SetCustomerForDraftOrderResult = Order | EmailAddressConflictError;
export declare type SetOrderShippingMethodResult =
    | Order
    | OrderModificationError
    | IneligibleShippingMethodError
    | NoActiveOrderError;
/** Returned if the Payment settlement fails */
export declare type SettlePaymentError = ErrorResult & {
    __typename?: 'SettlePaymentError';
    errorCode: ErrorCode;
    message: Scalars['String'];
    paymentErrorMessage: Scalars['String'];
};
export declare type SettlePaymentResult =
    | Payment
    | SettlePaymentError
    | PaymentStateTransitionError
    | OrderStateTransitionError;
export declare type SettleRefundInput = {
    id: Scalars['ID'];
    transactionId: Scalars['String'];
};
export declare type SettleRefundResult = Refund | RefundStateTransitionError;
export declare type ShippingLine = {
    __typename?: 'ShippingLine';
    id: Scalars['ID'];
    shippingMethod: ShippingMethod;
    price: Scalars['Int'];
    priceWithTax: Scalars['Int'];
    discountedPrice: Scalars['Int'];
    discountedPriceWithTax: Scalars['Int'];
    discounts: Discount[];
};
export declare type ShippingMethod = Node & {
    __typename?: 'ShippingMethod';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    name: Scalars['String'];
    description: Scalars['String'];
    fulfillmentHandlerCode: Scalars['String'];
    checker: ConfigurableOperation;
    calculator: ConfigurableOperation;
    translations: ShippingMethodTranslation[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ShippingMethodFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    languageCode?: Maybe<StringOperators>;
    code?: Maybe<StringOperators>;
    name?: Maybe<StringOperators>;
    description?: Maybe<StringOperators>;
    fulfillmentHandlerCode?: Maybe<StringOperators>;
};
export declare type ShippingMethodList = PaginatedList & {
    __typename?: 'ShippingMethodList';
    items: ShippingMethod[];
    totalItems: Scalars['Int'];
};
export declare type ShippingMethodListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<ShippingMethodSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<ShippingMethodFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type ShippingMethodQuote = {
    __typename?: 'ShippingMethodQuote';
    id: Scalars['ID'];
    price: Scalars['Int'];
    priceWithTax: Scalars['Int'];
    code: Scalars['String'];
    name: Scalars['String'];
    description: Scalars['String'];
    /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
    metadata?: Maybe<Scalars['JSON']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ShippingMethodSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    code?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    description?: Maybe<SortOrder>;
    fulfillmentHandlerCode?: Maybe<SortOrder>;
};
export declare type ShippingMethodTranslation = {
    __typename?: 'ShippingMethodTranslation';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    name: Scalars['String'];
    description: Scalars['String'];
};
export declare type ShippingMethodTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type ShopClosedError = ErrorResult & {
    __typename?: 'ShopClosedError';
    errorCode: ErrorCode;
    message: Scalars['String'];
};
/** The price value where the result has a single price */
export declare type SinglePrice = {
    __typename?: 'SinglePrice';
    value: Scalars['Int'];
};
export declare enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}
export declare type StockAdjustment = Node &
    StockMovement & {
        __typename?: 'StockAdjustment';
        id: Scalars['ID'];
        createdAt: Scalars['DateTime'];
        updatedAt: Scalars['DateTime'];
        productVariant: ProductVariant;
        type: StockMovementType;
        quantity: Scalars['Int'];
    };
export declare type StockMovement = {
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    productVariant: ProductVariant;
    type: StockMovementType;
    quantity: Scalars['Int'];
};
export declare type StockMovementItem = StockAdjustment | Allocation | Sale | Cancellation | Return | Release;
export declare type StockMovementList = {
    __typename?: 'StockMovementList';
    items: StockMovementItem[];
    totalItems: Scalars['Int'];
};
export declare type StockMovementListOptions = {
    type?: Maybe<StockMovementType>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare enum StockMovementType {
    ADJUSTMENT = 'ADJUSTMENT',
    ALLOCATION = 'ALLOCATION',
    RELEASE = 'RELEASE',
    SALE = 'SALE',
    CANCELLATION = 'CANCELLATION',
    RETURN = 'RETURN',
}
export declare type StringCustomFieldConfig = CustomField & {
    __typename?: 'StringCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    length?: Maybe<Scalars['Int']>;
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    pattern?: Maybe<Scalars['String']>;
    options?: Maybe<StringFieldOption[]>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type StringFieldOption = {
    __typename?: 'StringFieldOption';
    value: Scalars['String'];
    label?: Maybe<LocalizedString[]>;
};
/** Operators for filtering on a list of String fields */
export declare type StringListOperators = {
    inList: Scalars['String'];
};
/** Operators for filtering on a String field */
export declare type StringOperators = {
    eq?: Maybe<Scalars['String']>;
    notEq?: Maybe<Scalars['String']>;
    contains?: Maybe<Scalars['String']>;
    notContains?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    notIn?: Maybe<Array<Scalars['String']>>;
    regex?: Maybe<Scalars['String']>;
};
/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export declare type Success = {
    __typename?: 'Success';
    success: Scalars['Boolean'];
};
export declare type Surcharge = Node & {
    __typename?: 'Surcharge';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    description: Scalars['String'];
    sku?: Maybe<Scalars['String']>;
    taxLines: TaxLine[];
    price: Scalars['Int'];
    priceWithTax: Scalars['Int'];
    taxRate: Scalars['Float'];
};
export declare type SurchargeInput = {
    description: Scalars['String'];
    sku?: Maybe<Scalars['String']>;
    price: Scalars['Int'];
    priceIncludesTax: Scalars['Boolean'];
    taxRate?: Maybe<Scalars['Float']>;
    taxDescription?: Maybe<Scalars['String']>;
};
export declare type Tag = Node & {
    __typename?: 'Tag';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    value: Scalars['String'];
};
export declare type TagFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    value?: Maybe<StringOperators>;
};
export declare type TagList = PaginatedList & {
    __typename?: 'TagList';
    items: Tag[];
    totalItems: Scalars['Int'];
};
export declare type TagListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<TagSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<TagFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type TagSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    value?: Maybe<SortOrder>;
};
export declare type TaxCategory = Node & {
    __typename?: 'TaxCategory';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    isDefault: Scalars['Boolean'];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type TaxLine = {
    __typename?: 'TaxLine';
    description: Scalars['String'];
    taxRate: Scalars['Float'];
};
export declare type TaxRate = Node & {
    __typename?: 'TaxRate';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    value: Scalars['Float'];
    category: TaxCategory;
    zone: Zone;
    customerGroup?: Maybe<CustomerGroup>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type TaxRateFilterParameter = {
    id?: Maybe<IdOperators>;
    createdAt?: Maybe<DateOperators>;
    updatedAt?: Maybe<DateOperators>;
    name?: Maybe<StringOperators>;
    enabled?: Maybe<BooleanOperators>;
    value?: Maybe<NumberOperators>;
};
export declare type TaxRateList = PaginatedList & {
    __typename?: 'TaxRateList';
    items: TaxRate[];
    totalItems: Scalars['Int'];
};
export declare type TaxRateListOptions = {
    /** Skips the first n results, for use in pagination */
    skip?: Maybe<Scalars['Int']>;
    /** Takes n results, for use in pagination */
    take?: Maybe<Scalars['Int']>;
    /** Specifies which properties to sort the results by */
    sort?: Maybe<TaxRateSortParameter>;
    /** Allows the results to be filtered */
    filter?: Maybe<TaxRateFilterParameter>;
    /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
    filterOperator?: Maybe<LogicalOperator>;
};
export declare type TaxRateSortParameter = {
    id?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    value?: Maybe<SortOrder>;
};
export declare type TestEligibleShippingMethodsInput = {
    shippingAddress: CreateAddressInput;
    lines: TestShippingMethodOrderLineInput[];
};
export declare type TestShippingMethodInput = {
    checker: ConfigurableOperationInput;
    calculator: ConfigurableOperationInput;
    shippingAddress: CreateAddressInput;
    lines: TestShippingMethodOrderLineInput[];
};
export declare type TestShippingMethodOrderLineInput = {
    productVariantId: Scalars['ID'];
    quantity: Scalars['Int'];
};
export declare type TestShippingMethodQuote = {
    __typename?: 'TestShippingMethodQuote';
    price: Scalars['Int'];
    priceWithTax: Scalars['Int'];
    metadata?: Maybe<Scalars['JSON']>;
};
export declare type TestShippingMethodResult = {
    __typename?: 'TestShippingMethodResult';
    eligible: Scalars['Boolean'];
    quote?: Maybe<TestShippingMethodQuote>;
};
export declare type TextCustomFieldConfig = CustomField & {
    __typename?: 'TextCustomFieldConfig';
    name: Scalars['String'];
    type: Scalars['String'];
    list: Scalars['Boolean'];
    label?: Maybe<LocalizedString[]>;
    description?: Maybe<LocalizedString[]>;
    readonly?: Maybe<Scalars['Boolean']>;
    internal?: Maybe<Scalars['Boolean']>;
    nullable?: Maybe<Scalars['Boolean']>;
    ui?: Maybe<Scalars['JSON']>;
};
export declare type TransitionFulfillmentToStateResult = Fulfillment | FulfillmentStateTransitionError;
export declare type TransitionOrderToStateResult = Order | OrderStateTransitionError;
export declare type TransitionPaymentToStateResult = Payment | PaymentStateTransitionError;
export declare type UpdateActiveAdministratorInput = {
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    emailAddress?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateAddressCustomFieldsInput = {
    first_name?: Maybe<Scalars['String']>;
    uuid?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
};
export declare type UpdateAddressInput = {
    id: Scalars['ID'];
    fullName?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    streetLine1?: Maybe<Scalars['String']>;
    streetLine2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    countryCode?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    defaultShippingAddress?: Maybe<Scalars['Boolean']>;
    defaultBillingAddress?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<UpdateAddressCustomFieldsInput>;
};
export declare type UpdateAdministratorInput = {
    id: Scalars['ID'];
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    emailAddress?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    roleIds?: Maybe<Array<Scalars['ID']>>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateAssetInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    focalPoint?: Maybe<CoordinateInput>;
    tags?: Maybe<Array<Scalars['String']>>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateChannelCustomFieldsInput = {
    openingTime?: Maybe<Scalars['DateTime']>;
    isOpen?: Maybe<Scalars['Boolean']>;
    processingTime?: Maybe<Scalars['Int']>;
    latitude?: Maybe<Scalars['Float']>;
    longitude?: Maybe<Scalars['Float']>;
    name?: Maybe<Scalars['String']>;
    location?: Maybe<Scalars['String']>;
};
export declare type UpdateChannelInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    token?: Maybe<Scalars['String']>;
    defaultLanguageCode?: Maybe<LanguageCode>;
    pricesIncludeTax?: Maybe<Scalars['Boolean']>;
    currencyCode?: Maybe<CurrencyCode>;
    defaultTaxZoneId?: Maybe<Scalars['ID']>;
    defaultShippingZoneId?: Maybe<Scalars['ID']>;
    customFields?: Maybe<UpdateChannelCustomFieldsInput>;
};
export declare type UpdateChannelResult = Channel | LanguageNotAvailableError;
export declare type UpdateCollectionInput = {
    id: Scalars['ID'];
    isPrivate?: Maybe<Scalars['Boolean']>;
    featuredAssetId?: Maybe<Scalars['ID']>;
    parentId?: Maybe<Scalars['ID']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    filters?: Maybe<ConfigurableOperationInput[]>;
    translations?: Maybe<UpdateCollectionTranslationInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateCollectionTranslationInput = {
    id?: Maybe<Scalars['ID']>;
    languageCode: LanguageCode;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateCountryInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    translations?: Maybe<CountryTranslationInput[]>;
    enabled?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateCustomerCustomFieldsInput = {
    referredCode?: Maybe<Scalars['String']>;
    dob?: Maybe<Scalars['DateTime']>;
    gender?: Maybe<Scalars['String']>;
};
export declare type UpdateCustomerGroupInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateCustomerInput = {
    id: Scalars['ID'];
    title?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    emailAddress?: Maybe<Scalars['String']>;
    customFields?: Maybe<UpdateCustomerCustomFieldsInput>;
};
export declare type UpdateCustomerNoteInput = {
    noteId: Scalars['ID'];
    note: Scalars['String'];
};
export declare type UpdateCustomerResult = Customer | EmailAddressConflictError;
export declare type UpdateFacetInput = {
    id: Scalars['ID'];
    isPrivate?: Maybe<Scalars['Boolean']>;
    code?: Maybe<Scalars['String']>;
    translations?: Maybe<FacetTranslationInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateFacetValueCustomFieldsInput = {
    color1?: Maybe<Scalars['String']>;
    color2?: Maybe<Scalars['String']>;
};
export declare type UpdateFacetValueInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    translations?: Maybe<FacetValueTranslationInput[]>;
    customFields?: Maybe<UpdateFacetValueCustomFieldsInput>;
};
export declare type UpdateGlobalSettingsCustomFieldsInput = {
    referralLoyaltyPoints?: Maybe<Scalars['Int']>;
};
export declare type UpdateGlobalSettingsInput = {
    availableLanguages?: Maybe<LanguageCode[]>;
    trackInventory?: Maybe<Scalars['Boolean']>;
    outOfStockThreshold?: Maybe<Scalars['Int']>;
    customFields?: Maybe<UpdateGlobalSettingsCustomFieldsInput>;
};
export declare type UpdateGlobalSettingsResult = GlobalSettings | ChannelDefaultLanguageError;
export declare type UpdateOrderAddressInput = {
    fullName?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    streetLine1?: Maybe<Scalars['String']>;
    streetLine2?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    countryCode?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    customFields?: Maybe<UpdateAddressCustomFieldsInput>;
};
export declare type UpdateOrderCustomFieldsInput = {
    scheduledTime?: Maybe<Scalars['DateTime']>;
    completedTime?: Maybe<Scalars['DateTime']>;
};
export declare type UpdateOrderInput = {
    id: Scalars['ID'];
    customFields?: Maybe<UpdateOrderCustomFieldsInput>;
};
export declare type UpdateOrderItemsResult =
    | Order
    | ShopClosedError
    | OrderModificationError
    | OrderLimitError
    | NegativeQuantityError
    | InsufficientStockError;
export declare type UpdateOrderNoteInput = {
    noteId: Scalars['ID'];
    note?: Maybe<Scalars['String']>;
    isPublic?: Maybe<Scalars['Boolean']>;
};
export declare type UpdatePaymentMethodInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    code?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    enabled?: Maybe<Scalars['Boolean']>;
    checker?: Maybe<ConfigurableOperationInput>;
    handler?: Maybe<ConfigurableOperationInput>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateProductInput = {
    id: Scalars['ID'];
    enabled?: Maybe<Scalars['Boolean']>;
    featuredAssetId?: Maybe<Scalars['ID']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    facetValueIds?: Maybe<Array<Scalars['ID']>>;
    translations?: Maybe<ProductTranslationInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateProductOptionGroupInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    translations?: Maybe<ProductOptionGroupTranslationInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateProductOptionInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    translations?: Maybe<ProductOptionGroupTranslationInput[]>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateProductVariantCustomFieldsInput = {
    pre_discount_price?: Maybe<Scalars['Int']>;
};
export declare type UpdateProductVariantInput = {
    id: Scalars['ID'];
    enabled?: Maybe<Scalars['Boolean']>;
    translations?: Maybe<ProductVariantTranslationInput[]>;
    facetValueIds?: Maybe<Array<Scalars['ID']>>;
    sku?: Maybe<Scalars['String']>;
    taxCategoryId?: Maybe<Scalars['ID']>;
    price?: Maybe<Scalars['Int']>;
    featuredAssetId?: Maybe<Scalars['ID']>;
    assetIds?: Maybe<Array<Scalars['ID']>>;
    stockOnHand?: Maybe<Scalars['Int']>;
    outOfStockThreshold?: Maybe<Scalars['Int']>;
    useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
    trackInventory?: Maybe<GlobalFlag>;
    customFields?: Maybe<UpdateProductVariantCustomFieldsInput>;
};
export declare type UpdatePromotionCustomFieldsInput = {
    imageId?: Maybe<Scalars['ID']>;
    description?: Maybe<Scalars['String']>;
};
export declare type UpdatePromotionInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    enabled?: Maybe<Scalars['Boolean']>;
    startsAt?: Maybe<Scalars['DateTime']>;
    endsAt?: Maybe<Scalars['DateTime']>;
    couponCode?: Maybe<Scalars['String']>;
    perCustomerUsageLimit?: Maybe<Scalars['Int']>;
    conditions?: Maybe<ConfigurableOperationInput[]>;
    actions?: Maybe<ConfigurableOperationInput[]>;
    customFields?: Maybe<UpdatePromotionCustomFieldsInput>;
};
export declare type UpdatePromotionResult = Promotion | MissingConditionsError;
export declare type UpdateRoleInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    permissions?: Maybe<Permission[]>;
    channelIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type UpdateShippingMethodInput = {
    id: Scalars['ID'];
    code?: Maybe<Scalars['String']>;
    fulfillmentHandler?: Maybe<Scalars['String']>;
    checker?: Maybe<ConfigurableOperationInput>;
    calculator?: Maybe<ConfigurableOperationInput>;
    translations: ShippingMethodTranslationInput[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateTagInput = {
    id: Scalars['ID'];
    value?: Maybe<Scalars['String']>;
};
export declare type UpdateTaxCategoryInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    isDefault?: Maybe<Scalars['Boolean']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateTaxRateInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['Float']>;
    enabled?: Maybe<Scalars['Boolean']>;
    categoryId?: Maybe<Scalars['ID']>;
    zoneId?: Maybe<Scalars['ID']>;
    customerGroupId?: Maybe<Scalars['ID']>;
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type UpdateZoneCustomFieldsInput = {
    loyaltyPointsLimit?: Maybe<Scalars['Int']>;
    loyaltyPointsPercentage?: Maybe<Scalars['Float']>;
};
export declare type UpdateZoneInput = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    customFields?: Maybe<UpdateZoneCustomFieldsInput>;
};
export declare type User = Node & {
    __typename?: 'User';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    identifier: Scalars['String'];
    verified: Scalars['Boolean'];
    roles: Role[];
    lastLogin?: Maybe<Scalars['DateTime']>;
    authenticationMethods: AuthenticationMethod[];
    customFields?: Maybe<Scalars['JSON']>;
};
export declare type Zone = Node & {
    __typename?: 'Zone';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    name: Scalars['String'];
    members: Country[];
    customFields?: Maybe<ZoneCustomFields>;
};
export declare type ZoneCustomFields = {
    __typename?: 'ZoneCustomFields';
    loyaltyPointsLimit?: Maybe<Scalars['Int']>;
    loyaltyPointsPercentage?: Maybe<Scalars['Float']>;
};

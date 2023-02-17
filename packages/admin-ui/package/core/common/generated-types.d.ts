export declare type Maybe<T> = T | null;
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
    ID: string;
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
    channels: CurrentUserChannel[];
    id: Scalars['ID'];
    identifier: Scalars['String'];
};
export declare type CurrentUserChannel = {
    __typename?: 'CurrentUserChannel';
    code: Scalars['String'];
    id: Scalars['ID'];
    permissions: Permission[];
    token: Scalars['String'];
};
export declare type CurrentUserChannelInput = {
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
    /** Amharic */
    am = 'am',
    /** Arabic */
    ar = 'ar',
    /** Azerbaijani */
    az = 'az',
    /** Belarusian */
    be = 'be',
    /** Bulgarian */
    bg = 'bg',
    /** Bambara */
    bm = 'bm',
    /** Bangla */
    bn = 'bn',
    /** Tibetan */
    bo = 'bo',
    /** Breton */
    br = 'br',
    /** Bosnian */
    bs = 'bs',
    /** Catalan */
    ca = 'ca',
    /** Chechen */
    ce = 'ce',
    /** Corsican */
    co = 'co',
    /** Czech */
    cs = 'cs',
    /** Church Slavic */
    cu = 'cu',
    /** Welsh */
    cy = 'cy',
    /** Danish */
    da = 'da',
    /** German */
    de = 'de',
    /** Austrian German */
    de_AT = 'de_AT',
    /** Swiss High German */
    de_CH = 'de_CH',
    /** Dzongkha */
    dz = 'dz',
    /** Ewe */
    ee = 'ee',
    /** Greek */
    el = 'el',
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
    /** Spanish */
    es = 'es',
    /** European Spanish */
    es_ES = 'es_ES',
    /** Mexican Spanish */
    es_MX = 'es_MX',
    /** Estonian */
    et = 'et',
    /** Basque */
    eu = 'eu',
    /** Persian */
    fa = 'fa',
    /** Dari */
    fa_AF = 'fa_AF',
    /** Fulah */
    ff = 'ff',
    /** Finnish */
    fi = 'fi',
    /** Faroese */
    fo = 'fo',
    /** French */
    fr = 'fr',
    /** Canadian French */
    fr_CA = 'fr_CA',
    /** Swiss French */
    fr_CH = 'fr_CH',
    /** Western Frisian */
    fy = 'fy',
    /** Irish */
    ga = 'ga',
    /** Scottish Gaelic */
    gd = 'gd',
    /** Galician */
    gl = 'gl',
    /** Gujarati */
    gu = 'gu',
    /** Manx */
    gv = 'gv',
    /** Hausa */
    ha = 'ha',
    /** Hebrew */
    he = 'he',
    /** Hindi */
    hi = 'hi',
    /** Croatian */
    hr = 'hr',
    /** Haitian Creole */
    ht = 'ht',
    /** Hungarian */
    hu = 'hu',
    /** Armenian */
    hy = 'hy',
    /** Interlingua */
    ia = 'ia',
    /** Indonesian */
    id = 'id',
    /** Igbo */
    ig = 'ig',
    /** Sichuan Yi */
    ii = 'ii',
    /** Italian */
    it = 'it',
    /** Japanese */
    ja = 'ja',
    /** Javanese */
    jv = 'jv',
    /** Georgian */
    ka = 'ka',
    /** Kikuyu */
    ki = 'ki',
    /** Kazakh */
    kk = 'kk',
    /** Kalaallisut */
    kl = 'kl',
    /** Khmer */
    km = 'km',
    /** Kannada */
    kn = 'kn',
    /** Korean */
    ko = 'ko',
    /** Kashmiri */
    ks = 'ks',
    /** Kurdish */
    ku = 'ku',
    /** Cornish */
    kw = 'kw',
    /** Kyrgyz */
    ky = 'ky',
    /** Latin */
    la = 'la',
    /** Luxembourgish */
    lb = 'lb',
    /** Ganda */
    lg = 'lg',
    /** Lingala */
    ln = 'ln',
    /** Lao */
    lo = 'lo',
    /** Lithuanian */
    lt = 'lt',
    /** Luba-Katanga */
    lu = 'lu',
    /** Latvian */
    lv = 'lv',
    /** Malagasy */
    mg = 'mg',
    /** Maori */
    mi = 'mi',
    /** Macedonian */
    mk = 'mk',
    /** Malayalam */
    ml = 'ml',
    /** Mongolian */
    mn = 'mn',
    /** Marathi */
    mr = 'mr',
    /** Malay */
    ms = 'ms',
    /** Maltese */
    mt = 'mt',
    /** Burmese */
    my = 'my',
    /** Norwegian Bokmål */
    nb = 'nb',
    /** North Ndebele */
    nd = 'nd',
    /** Nepali */
    ne = 'ne',
    /** Dutch */
    nl = 'nl',
    /** Flemish */
    nl_BE = 'nl_BE',
    /** Norwegian Nynorsk */
    nn = 'nn',
    /** Nyanja */
    ny = 'ny',
    /** Oromo */
    om = 'om',
    /** Odia */
    or = 'or',
    /** Ossetic */
    os = 'os',
    /** Punjabi */
    pa = 'pa',
    /** Polish */
    pl = 'pl',
    /** Pashto */
    ps = 'ps',
    /** Portuguese */
    pt = 'pt',
    /** Brazilian Portuguese */
    pt_BR = 'pt_BR',
    /** European Portuguese */
    pt_PT = 'pt_PT',
    /** Quechua */
    qu = 'qu',
    /** Romansh */
    rm = 'rm',
    /** Rundi */
    rn = 'rn',
    /** Romanian */
    ro = 'ro',
    /** Moldavian */
    ro_MD = 'ro_MD',
    /** Russian */
    ru = 'ru',
    /** Kinyarwanda */
    rw = 'rw',
    /** Sanskrit */
    sa = 'sa',
    /** Sindhi */
    sd = 'sd',
    /** Northern Sami */
    se = 'se',
    /** Sango */
    sg = 'sg',
    /** Sinhala */
    si = 'si',
    /** Slovak */
    sk = 'sk',
    /** Slovenian */
    sl = 'sl',
    /** Samoan */
    sm = 'sm',
    /** Shona */
    sn = 'sn',
    /** Somali */
    so = 'so',
    /** Albanian */
    sq = 'sq',
    /** Serbian */
    sr = 'sr',
    /** Southern Sotho */
    st = 'st',
    /** Sundanese */
    su = 'su',
    /** Swedish */
    sv = 'sv',
    /** Swahili */
    sw = 'sw',
    /** Congo Swahili */
    sw_CD = 'sw_CD',
    /** Tamil */
    ta = 'ta',
    /** Telugu */
    te = 'te',
    /** Tajik */
    tg = 'tg',
    /** Thai */
    th = 'th',
    /** Tigrinya */
    ti = 'ti',
    /** Turkmen */
    tk = 'tk',
    /** Tongan */
    to = 'to',
    /** Turkish */
    tr = 'tr',
    /** Tatar */
    tt = 'tt',
    /** Uyghur */
    ug = 'ug',
    /** Ukrainian */
    uk = 'uk',
    /** Urdu */
    ur = 'ur',
    /** Uzbek */
    uz = 'uz',
    /** Vietnamese */
    vi = 'vi',
    /** Volapük */
    vo = 'vo',
    /** Wolof */
    wo = 'wo',
    /** Xhosa */
    xh = 'xh',
    /** Yiddish */
    yi = 'yi',
    /** Yoruba */
    yo = 'yo',
    /** Chinese */
    zh = 'zh',
    /** Simplified Chinese */
    zh_Hans = 'zh_Hans',
    /** Traditional Chinese */
    zh_Hant = 'zh_Hant',
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
    /** Add Customers to a CustomerGroup */
    addCustomersToGroup: CustomerGroup;
    addFulfillmentToOrder: AddFulfillmentToOrderResult;
    /** Adds an item to the draft Order. */
    addItemToDraftOrder: UpdateOrderItemsResult;
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
    /** Add members to a Zone */
    addMembersToZone: Zone;
    addNoteToCustomer: Customer;
    addNoteToOrder: Order;
    /** Add an OptionGroup to a Product */
    addOptionGroupToProduct: Product;
    /** Adjusts a draft OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
    adjustDraftOrderLine: UpdateOrderItemsResult;
    /** Applies the given coupon code to the draft Order */
    applyCouponCodeToDraftOrder: ApplyCouponCodeResult;
    /** Assign assets to channel */
    assignAssetsToChannel: Asset[];
    /** Assigns Collections to the specified Channel */
    assignCollectionsToChannel: Collection[];
    /** Assigns Facets to the specified Channel */
    assignFacetsToChannel: Facet[];
    /** Assigns ProductVariants to the specified Channel */
    assignProductVariantsToChannel: ProductVariant[];
    /** Assigns all ProductVariants of Product to the specified Channel */
    assignProductsToChannel: Product[];
    /** Assigns Promotions to the specified Channel */
    assignPromotionsToChannel: Promotion[];
    /** Assign a Role to an Administrator */
    assignRoleToAdministrator: Administrator;
    /** Authenticates the user using a named authentication strategy */
    authenticate: AuthenticationResult;
    cancelJob: Job;
    cancelOrder: CancelOrderResult;
    cancelPayment: CancelPaymentResult;
    /** Create a new Administrator */
    createAdministrator: Administrator;
    /** Create a new Asset */
    createAssets: CreateAssetResult[];
    /** Create a new Channel */
    createChannel: CreateChannelResult;
    /** Create a new Collection */
    createCollection: Collection;
    /** Create a new Country */
    createCountry: Country;
    /** Create a new Customer. If a password is provided, a new User will also be created an linked to the Customer. */
    createCustomer: CreateCustomerResult;
    /** Create a new Address and associate it with the Customer specified by customerId */
    createCustomerAddress: Address;
    /** Create a new CustomerGroup */
    createCustomerGroup: CustomerGroup;
    /** Creates a draft Order */
    createDraftOrder: Order;
    /** Create a new Facet */
    createFacet: Facet;
    /** Create one or more FacetValues */
    createFacetValues: FacetValue[];
    /** Create existing PaymentMethod */
    createPaymentMethod: PaymentMethod;
    /** Create a new Product */
    createProduct: Product;
    /** Create a new ProductOption within a ProductOptionGroup */
    createProductOption: ProductOption;
    /** Create a new ProductOptionGroup */
    createProductOptionGroup: ProductOptionGroup;
    /** Create a set of ProductVariants based on the OptionGroups assigned to the given Product */
    createProductVariants: Array<Maybe<ProductVariant>>;
    createPromotion: CreatePromotionResult;
    /** Create a new Role */
    createRole: Role;
    /** Create a new ShippingMethod */
    createShippingMethod: ShippingMethod;
    /** Create a new Tag */
    createTag: Tag;
    /** Create a new TaxCategory */
    createTaxCategory: TaxCategory;
    /** Create a new TaxRate */
    createTaxRate: TaxRate;
    /** Create a new Zone */
    createZone: Zone;
    /** Delete an Administrator */
    deleteAdministrator: DeletionResponse;
    /** Delete an Asset */
    deleteAsset: DeletionResponse;
    /** Delete multiple Assets */
    deleteAssets: DeletionResponse;
    /** Delete a Channel */
    deleteChannel: DeletionResponse;
    /** Delete a Collection and all of its descendants */
    deleteCollection: DeletionResponse;
    /** Delete multiple Collections and all of their descendants */
    deleteCollections: DeletionResponse[];
    /** Delete a Country */
    deleteCountry: DeletionResponse;
    /** Delete a Customer */
    deleteCustomer: DeletionResponse;
    /** Update an existing Address */
    deleteCustomerAddress: Success;
    /** Delete a CustomerGroup */
    deleteCustomerGroup: DeletionResponse;
    deleteCustomerNote: DeletionResponse;
    /** Deletes a draft Order */
    deleteDraftOrder: DeletionResponse;
    /** Delete an existing Facet */
    deleteFacet: DeletionResponse;
    /** Delete one or more FacetValues */
    deleteFacetValues: DeletionResponse[];
    /** Delete multiple existing Facets */
    deleteFacets: DeletionResponse[];
    deleteOrderNote: DeletionResponse;
    /** Delete a PaymentMethod */
    deletePaymentMethod: DeletionResponse;
    /** Delete a Product */
    deleteProduct: DeletionResponse;
    /** Delete a ProductOption */
    deleteProductOption: DeletionResponse;
    /** Delete a ProductVariant */
    deleteProductVariant: DeletionResponse;
    /** Delete multiple ProductVariants */
    deleteProductVariants: DeletionResponse[];
    /** Delete multiple Products */
    deleteProducts: DeletionResponse[];
    deletePromotion: DeletionResponse;
    /** Delete an existing Role */
    deleteRole: DeletionResponse;
    /** Delete a ShippingMethod */
    deleteShippingMethod: DeletionResponse;
    /** Delete an existing Tag */
    deleteTag: DeletionResponse;
    /** Deletes a TaxCategory */
    deleteTaxCategory: DeletionResponse;
    /** Delete a TaxRate */
    deleteTaxRate: DeletionResponse;
    /** Delete a Zone */
    deleteZone: DeletionResponse;
    flushBufferedJobs: Success;
    importProducts?: Maybe<ImportInfo>;
    /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
    login: NativeAuthenticationResult;
    logout: Success;
    /**
     * Allows an Order to be modified after it has been completed by the Customer. The Order must first
     * be in the `Modifying` state.
     */
    modifyOrder: ModifyOrderResult;
    /** Move a Collection to a different parent or index */
    moveCollection: Collection;
    refundOrder: RefundOrderResult;
    reindex: Job;
    /** Removes Collections from the specified Channel */
    removeCollectionsFromChannel: Collection[];
    /** Removes the given coupon code from the draft Order */
    removeCouponCodeFromDraftOrder?: Maybe<Order>;
    /** Remove Customers from a CustomerGroup */
    removeCustomersFromGroup: CustomerGroup;
    /** Remove an OrderLine from the draft Order */
    removeDraftOrderLine: RemoveOrderItemsResult;
    /** Removes Facets from the specified Channel */
    removeFacetsFromChannel: RemoveFacetFromChannelResult[];
    /** Remove members from a Zone */
    removeMembersFromZone: Zone;
    /** Remove an OptionGroup from a Product */
    removeOptionGroupFromProduct: RemoveOptionGroupFromProductResult;
    /** Removes ProductVariants from the specified Channel */
    removeProductVariantsFromChannel: ProductVariant[];
    /** Removes all ProductVariants of Product from the specified Channel */
    removeProductsFromChannel: Product[];
    /** Removes Promotions from the specified Channel */
    removePromotionsFromChannel: Promotion[];
    /** Remove all settled jobs in the given queues older than the given date. Returns the number of jobs deleted. */
    removeSettledJobs: Scalars['Int'];
    requestCompleted: Scalars['Int'];
    requestStarted: Scalars['Int'];
    runPendingSearchIndexUpdates: Success;
    setActiveChannel: UserStatus;
    setAsLoggedIn: UserStatus;
    setAsLoggedOut: UserStatus;
    setContentLanguage: LanguageCode;
    setCustomerForDraftOrder: SetCustomerForDraftOrderResult;
    setDisplayUiExtensionPoints: Scalars['Boolean'];
    /** Sets the billing address for a draft Order */
    setDraftOrderBillingAddress: Order;
    /** Allows any custom fields to be set for the active order */
    setDraftOrderCustomFields: Order;
    /** Sets the shipping address for a draft Order */
    setDraftOrderShippingAddress: Order;
    /** Sets the shipping method by id, which can be obtained with the `eligibleShippingMethodsForDraftOrder` query */
    setDraftOrderShippingMethod: SetOrderShippingMethodResult;
    setOrderCustomFields?: Maybe<Order>;
    setUiLanguage: LanguageCode;
    setUiLocale?: Maybe<Scalars['String']>;
    setUiTheme: Scalars['String'];
    settlePayment: SettlePaymentResult;
    settleRefund: SettleRefundResult;
    transitionFulfillmentToState: TransitionFulfillmentToStateResult;
    transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
    transitionPaymentToState: TransitionPaymentToStateResult;
    /** Update the active (currently logged-in) Administrator */
    updateActiveAdministrator: Administrator;
    /** Update an existing Administrator */
    updateAdministrator: Administrator;
    /** Update an existing Asset */
    updateAsset: Asset;
    /** Update an existing Channel */
    updateChannel: UpdateChannelResult;
    /** Update an existing Collection */
    updateCollection: Collection;
    /** Update an existing Country */
    updateCountry: Country;
    /** Update an existing Customer */
    updateCustomer: UpdateCustomerResult;
    /** Update an existing Address */
    updateCustomerAddress: Address;
    /** Update an existing CustomerGroup */
    updateCustomerGroup: CustomerGroup;
    updateCustomerNote: HistoryEntry;
    /** Update an existing Facet */
    updateFacet: Facet;
    /** Update one or more FacetValues */
    updateFacetValues: FacetValue[];
    updateGlobalSettings: UpdateGlobalSettingsResult;
    updateOrderNote: HistoryEntry;
    /** Update an existing PaymentMethod */
    updatePaymentMethod: PaymentMethod;
    /** Update an existing Product */
    updateProduct: Product;
    /** Create a new ProductOption within a ProductOptionGroup */
    updateProductOption: ProductOption;
    /** Update an existing ProductOptionGroup */
    updateProductOptionGroup: ProductOptionGroup;
    /** Update existing ProductVariants */
    updateProductVariants: Array<Maybe<ProductVariant>>;
    /** Update multiple existing Products */
    updateProducts: Product[];
    updatePromotion: UpdatePromotionResult;
    /** Update an existing Role */
    updateRole: Role;
    /** Update an existing ShippingMethod */
    updateShippingMethod: ShippingMethod;
    /** Update an existing Tag */
    updateTag: Tag;
    /** Update an existing TaxCategory */
    updateTaxCategory: TaxCategory;
    /** Update an existing TaxRate */
    updateTaxRate: TaxRate;
    updateUserChannels: UserStatus;
    /** Update an existing Zone */
    updateZone: Zone;
};
export declare type MutationAddCustomersToGroupArgs = {
    customerGroupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']>;
};
export declare type MutationAddFulfillmentToOrderArgs = {
    input: FulfillOrderInput;
};
export declare type MutationAddItemToDraftOrderArgs = {
    orderId: Scalars['ID'];
    input: AddItemToDraftOrderInput;
};
export declare type MutationAddManualPaymentToOrderArgs = {
    input: ManualPaymentInput;
};
export declare type MutationAddMembersToZoneArgs = {
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']>;
};
export declare type MutationAddNoteToCustomerArgs = {
    input: AddNoteToCustomerInput;
};
export declare type MutationAddNoteToOrderArgs = {
    input: AddNoteToOrderInput;
};
export declare type MutationAddOptionGroupToProductArgs = {
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
};
export declare type MutationAdjustDraftOrderLineArgs = {
    orderId: Scalars['ID'];
    input: AdjustDraftOrderLineInput;
};
export declare type MutationApplyCouponCodeToDraftOrderArgs = {
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
};
export declare type MutationAssignAssetsToChannelArgs = {
    input: AssignAssetsToChannelInput;
};
export declare type MutationAssignCollectionsToChannelArgs = {
    input: AssignCollectionsToChannelInput;
};
export declare type MutationAssignFacetsToChannelArgs = {
    input: AssignFacetsToChannelInput;
};
export declare type MutationAssignProductVariantsToChannelArgs = {
    input: AssignProductVariantsToChannelInput;
};
export declare type MutationAssignProductsToChannelArgs = {
    input: AssignProductsToChannelInput;
};
export declare type MutationAssignPromotionsToChannelArgs = {
    input: AssignPromotionsToChannelInput;
};
export declare type MutationAssignRoleToAdministratorArgs = {
    administratorId: Scalars['ID'];
    roleId: Scalars['ID'];
};
export declare type MutationAuthenticateArgs = {
    input: AuthenticationInput;
    rememberMe?: Maybe<Scalars['Boolean']>;
};
export declare type MutationCancelJobArgs = {
    jobId: Scalars['ID'];
};
export declare type MutationCancelOrderArgs = {
    input: CancelOrderInput;
};
export declare type MutationCancelPaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreateAdministratorArgs = {
    input: CreateAdministratorInput;
};
export declare type MutationCreateAssetsArgs = {
    input: CreateAssetInput[];
};
export declare type MutationCreateChannelArgs = {
    input: CreateChannelInput;
};
export declare type MutationCreateCollectionArgs = {
    input: CreateCollectionInput;
};
export declare type MutationCreateCountryArgs = {
    input: CreateCountryInput;
};
export declare type MutationCreateCustomerArgs = {
    input: CreateCustomerInput;
    password?: Maybe<Scalars['String']>;
};
export declare type MutationCreateCustomerAddressArgs = {
    customerId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationCreateCustomerGroupArgs = {
    input: CreateCustomerGroupInput;
};
export declare type MutationCreateFacetArgs = {
    input: CreateFacetInput;
};
export declare type MutationCreateFacetValuesArgs = {
    input: CreateFacetValueInput[];
};
export declare type MutationCreatePaymentMethodArgs = {
    input: CreatePaymentMethodInput;
};
export declare type MutationCreateProductArgs = {
    input: CreateProductInput;
};
export declare type MutationCreateProductOptionArgs = {
    input: CreateProductOptionInput;
};
export declare type MutationCreateProductOptionGroupArgs = {
    input: CreateProductOptionGroupInput;
};
export declare type MutationCreateProductVariantsArgs = {
    input: CreateProductVariantInput[];
};
export declare type MutationCreatePromotionArgs = {
    input: CreatePromotionInput;
};
export declare type MutationCreateRoleArgs = {
    input: CreateRoleInput;
};
export declare type MutationCreateShippingMethodArgs = {
    input: CreateShippingMethodInput;
};
export declare type MutationCreateTagArgs = {
    input: CreateTagInput;
};
export declare type MutationCreateTaxCategoryArgs = {
    input: CreateTaxCategoryInput;
};
export declare type MutationCreateTaxRateArgs = {
    input: CreateTaxRateInput;
};
export declare type MutationCreateZoneArgs = {
    input: CreateZoneInput;
};
export declare type MutationDeleteAdministratorArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteAssetArgs = {
    input: DeleteAssetInput;
};
export declare type MutationDeleteAssetsArgs = {
    input: DeleteAssetsInput;
};
export declare type MutationDeleteChannelArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCollectionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCollectionsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationDeleteCountryArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCustomerArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCustomerAddressArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCustomerGroupArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCustomerNoteArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteDraftOrderArgs = {
    orderId: Scalars['ID'];
};
export declare type MutationDeleteFacetArgs = {
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDeleteFacetValuesArgs = {
    ids: Array<Scalars['ID']>;
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDeleteFacetsArgs = {
    ids: Array<Scalars['ID']>;
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDeleteOrderNoteArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePaymentMethodArgs = {
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDeleteProductArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProductOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProductVariantArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProductVariantsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationDeleteProductsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationDeletePromotionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteRoleArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteShippingMethodArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteTagArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteTaxCategoryArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteTaxRateArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteZoneArgs = {
    id: Scalars['ID'];
};
export declare type MutationFlushBufferedJobsArgs = {
    bufferIds?: Maybe<Array<Scalars['String']>>;
};
export declare type MutationImportProductsArgs = {
    csvFile: Scalars['Upload'];
};
export declare type MutationLoginArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
    rememberMe?: Maybe<Scalars['Boolean']>;
};
export declare type MutationModifyOrderArgs = {
    input: ModifyOrderInput;
};
export declare type MutationMoveCollectionArgs = {
    input: MoveCollectionInput;
};
export declare type MutationRefundOrderArgs = {
    input: RefundOrderInput;
};
export declare type MutationRemoveCollectionsFromChannelArgs = {
    input: RemoveCollectionsFromChannelInput;
};
export declare type MutationRemoveCouponCodeFromDraftOrderArgs = {
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
};
export declare type MutationRemoveCustomersFromGroupArgs = {
    customerGroupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']>;
};
export declare type MutationRemoveDraftOrderLineArgs = {
    orderId: Scalars['ID'];
    orderLineId: Scalars['ID'];
};
export declare type MutationRemoveFacetsFromChannelArgs = {
    input: RemoveFacetsFromChannelInput;
};
export declare type MutationRemoveMembersFromZoneArgs = {
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']>;
};
export declare type MutationRemoveOptionGroupFromProductArgs = {
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
};
export declare type MutationRemoveProductVariantsFromChannelArgs = {
    input: RemoveProductVariantsFromChannelInput;
};
export declare type MutationRemoveProductsFromChannelArgs = {
    input: RemoveProductsFromChannelInput;
};
export declare type MutationRemovePromotionsFromChannelArgs = {
    input: RemovePromotionsFromChannelInput;
};
export declare type MutationRemoveSettledJobsArgs = {
    queueNames?: Maybe<Array<Scalars['String']>>;
    olderThan?: Maybe<Scalars['DateTime']>;
};
export declare type MutationSetActiveChannelArgs = {
    channelId: Scalars['ID'];
};
export declare type MutationSetAsLoggedInArgs = {
    input: UserStatusInput;
};
export declare type MutationSetContentLanguageArgs = {
    languageCode: LanguageCode;
};
export declare type MutationSetCustomerForDraftOrderArgs = {
    orderId: Scalars['ID'];
    customerId?: Maybe<Scalars['ID']>;
    input?: Maybe<CreateCustomerInput>;
};
export declare type MutationSetDisplayUiExtensionPointsArgs = {
    display: Scalars['Boolean'];
};
export declare type MutationSetDraftOrderBillingAddressArgs = {
    orderId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationSetDraftOrderCustomFieldsArgs = {
    orderId: Scalars['ID'];
    input: UpdateOrderInput;
};
export declare type MutationSetDraftOrderShippingAddressArgs = {
    orderId: Scalars['ID'];
    input: CreateAddressInput;
};
export declare type MutationSetDraftOrderShippingMethodArgs = {
    orderId: Scalars['ID'];
    shippingMethodId: Scalars['ID'];
};
export declare type MutationSetOrderCustomFieldsArgs = {
    input: UpdateOrderInput;
};
export declare type MutationSetUiLanguageArgs = {
    languageCode: LanguageCode;
};
export declare type MutationSetUiLocaleArgs = {
    locale?: Maybe<Scalars['String']>;
};
export declare type MutationSetUiThemeArgs = {
    theme: Scalars['String'];
};
export declare type MutationSettlePaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationSettleRefundArgs = {
    input: SettleRefundInput;
};
export declare type MutationTransitionFulfillmentToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationTransitionOrderToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationTransitionPaymentToStateArgs = {
    id: Scalars['ID'];
    state: Scalars['String'];
};
export declare type MutationUpdateActiveAdministratorArgs = {
    input: UpdateActiveAdministratorInput;
};
export declare type MutationUpdateAdministratorArgs = {
    input: UpdateAdministratorInput;
};
export declare type MutationUpdateAssetArgs = {
    input: UpdateAssetInput;
};
export declare type MutationUpdateChannelArgs = {
    input: UpdateChannelInput;
};
export declare type MutationUpdateCollectionArgs = {
    input: UpdateCollectionInput;
};
export declare type MutationUpdateCountryArgs = {
    input: UpdateCountryInput;
};
export declare type MutationUpdateCustomerArgs = {
    input: UpdateCustomerInput;
};
export declare type MutationUpdateCustomerAddressArgs = {
    input: UpdateAddressInput;
};
export declare type MutationUpdateCustomerGroupArgs = {
    input: UpdateCustomerGroupInput;
};
export declare type MutationUpdateCustomerNoteArgs = {
    input: UpdateCustomerNoteInput;
};
export declare type MutationUpdateFacetArgs = {
    input: UpdateFacetInput;
};
export declare type MutationUpdateFacetValuesArgs = {
    input: UpdateFacetValueInput[];
};
export declare type MutationUpdateGlobalSettingsArgs = {
    input: UpdateGlobalSettingsInput;
};
export declare type MutationUpdateOrderNoteArgs = {
    input: UpdateOrderNoteInput;
};
export declare type MutationUpdatePaymentMethodArgs = {
    input: UpdatePaymentMethodInput;
};
export declare type MutationUpdateProductArgs = {
    input: UpdateProductInput;
};
export declare type MutationUpdateProductOptionArgs = {
    input: UpdateProductOptionInput;
};
export declare type MutationUpdateProductOptionGroupArgs = {
    input: UpdateProductOptionGroupInput;
};
export declare type MutationUpdateProductVariantsArgs = {
    input: UpdateProductVariantInput[];
};
export declare type MutationUpdateProductsArgs = {
    input: UpdateProductInput[];
};
export declare type MutationUpdatePromotionArgs = {
    input: UpdatePromotionInput;
};
export declare type MutationUpdateRoleArgs = {
    input: UpdateRoleInput;
};
export declare type MutationUpdateShippingMethodArgs = {
    input: UpdateShippingMethodInput;
};
export declare type MutationUpdateTagArgs = {
    input: UpdateTagInput;
};
export declare type MutationUpdateTaxCategoryArgs = {
    input: UpdateTaxCategoryInput;
};
export declare type MutationUpdateTaxRateArgs = {
    input: UpdateTaxRateInput;
};
export declare type MutationUpdateUserChannelsArgs = {
    channels: CurrentUserChannelInput[];
};
export declare type MutationUpdateZoneArgs = {
    input: UpdateZoneInput;
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
export declare type NetworkStatus = {
    __typename?: 'NetworkStatus';
    inFlightRequests: Scalars['Int'];
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
    /** Grants permission to create Administrator */
    CreateAdministrator = 'CreateAdministrator',
    /** Grants permission to create Asset */
    CreateAsset = 'CreateAsset',
    /** Grants permission to create Products, Facets, Assets, Collections */
    CreateCatalog = 'CreateCatalog',
    /** Grants permission to create Channel */
    CreateChannel = 'CreateChannel',
    /** Grants permission to create Collection */
    CreateCollection = 'CreateCollection',
    /** Grants permission to create Country */
    CreateCountry = 'CreateCountry',
    /** Grants permission to create Customer */
    CreateCustomer = 'CreateCustomer',
    /** Grants permission to create CustomerGroup */
    CreateCustomerGroup = 'CreateCustomerGroup',
    /** Grants permission to create Facet */
    CreateFacet = 'CreateFacet',
    /** Grants permission to create Order */
    CreateOrder = 'CreateOrder',
    /** Grants permission to create PaymentMethod */
    CreatePaymentMethod = 'CreatePaymentMethod',
    /** Grants permission to create Product */
    CreateProduct = 'CreateProduct',
    /** Grants permission to create Promotion */
    CreatePromotion = 'CreatePromotion',
    /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    CreateSettings = 'CreateSettings',
    /** Grants permission to create ShippingMethod */
    CreateShippingMethod = 'CreateShippingMethod',
    /** Grants permission to create System */
    CreateSystem = 'CreateSystem',
    /** Grants permission to create Tag */
    CreateTag = 'CreateTag',
    /** Grants permission to create TaxCategory */
    CreateTaxCategory = 'CreateTaxCategory',
    /** Grants permission to create TaxRate */
    CreateTaxRate = 'CreateTaxRate',
    /** Grants permission to create Zone */
    CreateZone = 'CreateZone',
    /** Grants permission to delete Administrator */
    DeleteAdministrator = 'DeleteAdministrator',
    /** Grants permission to delete Asset */
    DeleteAsset = 'DeleteAsset',
    /** Grants permission to delete Products, Facets, Assets, Collections */
    DeleteCatalog = 'DeleteCatalog',
    /** Grants permission to delete Channel */
    DeleteChannel = 'DeleteChannel',
    /** Grants permission to delete Collection */
    DeleteCollection = 'DeleteCollection',
    /** Grants permission to delete Country */
    DeleteCountry = 'DeleteCountry',
    /** Grants permission to delete Customer */
    DeleteCustomer = 'DeleteCustomer',
    /** Grants permission to delete CustomerGroup */
    DeleteCustomerGroup = 'DeleteCustomerGroup',
    /** Grants permission to delete Facet */
    DeleteFacet = 'DeleteFacet',
    /** Grants permission to delete Order */
    DeleteOrder = 'DeleteOrder',
    /** Grants permission to delete PaymentMethod */
    DeletePaymentMethod = 'DeletePaymentMethod',
    /** Grants permission to delete Product */
    DeleteProduct = 'DeleteProduct',
    /** Grants permission to delete Promotion */
    DeletePromotion = 'DeletePromotion',
    /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    DeleteSettings = 'DeleteSettings',
    /** Grants permission to delete ShippingMethod */
    DeleteShippingMethod = 'DeleteShippingMethod',
    /** Grants permission to delete System */
    DeleteSystem = 'DeleteSystem',
    /** Grants permission to delete Tag */
    DeleteTag = 'DeleteTag',
    /** Grants permission to delete TaxCategory */
    DeleteTaxCategory = 'DeleteTaxCategory',
    /** Grants permission to delete TaxRate */
    DeleteTaxRate = 'DeleteTaxRate',
    /** Grants permission to delete Zone */
    DeleteZone = 'DeleteZone',
    /** Owner means the user owns this entity, e.g. a Customer's own Order */
    Owner = 'Owner',
    Placeholder = 'Placeholder',
    /** Public means any unauthenticated user may perform the operation */
    Public = 'Public',
    /** Grants permission to read Administrator */
    ReadAdministrator = 'ReadAdministrator',
    /** Grants permission to read Asset */
    ReadAsset = 'ReadAsset',
    /** Grants permission to read Products, Facets, Assets, Collections */
    ReadCatalog = 'ReadCatalog',
    /** Grants permission to read Channel */
    ReadChannel = 'ReadChannel',
    /** Grants permission to read Collection */
    ReadCollection = 'ReadCollection',
    /** Grants permission to read Country */
    ReadCountry = 'ReadCountry',
    /** Grants permission to read Customer */
    ReadCustomer = 'ReadCustomer',
    /** Grants permission to read CustomerGroup */
    ReadCustomerGroup = 'ReadCustomerGroup',
    /** Grants permission to read Facet */
    ReadFacet = 'ReadFacet',
    /** Grants permission to read Order */
    ReadOrder = 'ReadOrder',
    /** Grants permission to read PaymentMethod */
    ReadPaymentMethod = 'ReadPaymentMethod',
    /** Grants permission to read Product */
    ReadProduct = 'ReadProduct',
    /** Grants permission to read Promotion */
    ReadPromotion = 'ReadPromotion',
    /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    ReadSettings = 'ReadSettings',
    /** Grants permission to read ShippingMethod */
    ReadShippingMethod = 'ReadShippingMethod',
    /** Grants permission to read System */
    ReadSystem = 'ReadSystem',
    /** Grants permission to read Tag */
    ReadTag = 'ReadTag',
    /** Grants permission to read TaxCategory */
    ReadTaxCategory = 'ReadTaxCategory',
    /** Grants permission to read TaxRate */
    ReadTaxRate = 'ReadTaxRate',
    /** Grants permission to read Zone */
    ReadZone = 'ReadZone',
    /** SuperAdmin has unrestricted access to all operations */
    SuperAdmin = 'SuperAdmin',
    /** Grants permission to update Administrator */
    UpdateAdministrator = 'UpdateAdministrator',
    /** Grants permission to update Asset */
    UpdateAsset = 'UpdateAsset',
    /** Grants permission to update Products, Facets, Assets, Collections */
    UpdateCatalog = 'UpdateCatalog',
    /** Grants permission to update Channel */
    UpdateChannel = 'UpdateChannel',
    /** Grants permission to update Collection */
    UpdateCollection = 'UpdateCollection',
    /** Grants permission to update Country */
    UpdateCountry = 'UpdateCountry',
    /** Grants permission to update Customer */
    UpdateCustomer = 'UpdateCustomer',
    /** Grants permission to update CustomerGroup */
    UpdateCustomerGroup = 'UpdateCustomerGroup',
    /** Grants permission to update Facet */
    UpdateFacet = 'UpdateFacet',
    /** Grants permission to update GlobalSettings */
    UpdateGlobalSettings = 'UpdateGlobalSettings',
    /** Grants permission to update Order */
    UpdateOrder = 'UpdateOrder',
    /** Grants permission to update PaymentMethod */
    UpdatePaymentMethod = 'UpdatePaymentMethod',
    /** Grants permission to update Product */
    UpdateProduct = 'UpdateProduct',
    /** Grants permission to update Promotion */
    UpdatePromotion = 'UpdatePromotion',
    /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    UpdateSettings = 'UpdateSettings',
    /** Grants permission to update ShippingMethod */
    UpdateShippingMethod = 'UpdateShippingMethod',
    /** Grants permission to update System */
    UpdateSystem = 'UpdateSystem',
    /** Grants permission to update Tag */
    UpdateTag = 'UpdateTag',
    /** Grants permission to update TaxCategory */
    UpdateTaxCategory = 'UpdateTaxCategory',
    /** Grants permission to update TaxRate */
    UpdateTaxRate = 'UpdateTaxRate',
    /** Grants permission to update Zone */
    UpdateZone = 'UpdateZone',
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
    activeAdministrator?: Maybe<Administrator>;
    activeChannel: Channel;
    administrator?: Maybe<Administrator>;
    administrators: AdministratorList;
    /** Get a single Asset by id */
    asset?: Maybe<Asset>;
    /** Get a list of Assets */
    assets: AssetList;
    channel?: Maybe<Channel>;
    channels: Channel[];
    /** Get a Collection either by id or slug. If neither id nor slug is specified, an error will result. */
    collection?: Maybe<Collection>;
    collectionFilters: ConfigurableOperationDefinition[];
    collections: CollectionList;
    countries: CountryList;
    country?: Maybe<Country>;
    customer?: Maybe<Customer>;
    customerGroup?: Maybe<CustomerGroup>;
    customerGroups: CustomerGroupList;
    customers: CustomerList;
    /** Returns a list of eligible shipping methods for the draft Order */
    eligibleShippingMethodsForDraftOrder: ShippingMethodQuote[];
    facet?: Maybe<Facet>;
    facets: FacetList;
    fulfillmentHandlers: ConfigurableOperationDefinition[];
    globalSettings: GlobalSettings;
    job?: Maybe<Job>;
    jobBufferSize: JobBufferSize[];
    jobQueues: JobQueue[];
    jobs: JobList;
    jobsById: Job[];
    me?: Maybe<CurrentUser>;
    networkStatus: NetworkStatus;
    order?: Maybe<Order>;
    orders: OrderList;
    paymentMethod?: Maybe<PaymentMethod>;
    paymentMethodEligibilityCheckers: ConfigurableOperationDefinition[];
    paymentMethodHandlers: ConfigurableOperationDefinition[];
    paymentMethods: PaymentMethodList;
    pendingSearchIndexUpdates: Scalars['Int'];
    /** Used for real-time previews of the contents of a Collection */
    previewCollectionVariants: ProductVariantList;
    /** Get a Product either by id or slug. If neither id nor slug is specified, an error will result. */
    product?: Maybe<Product>;
    productOptionGroup?: Maybe<ProductOptionGroup>;
    productOptionGroups: ProductOptionGroup[];
    /** Get a ProductVariant by id */
    productVariant?: Maybe<ProductVariant>;
    /** List ProductVariants either all or for the specific product. */
    productVariants: ProductVariantList;
    /** List Products */
    products: ProductList;
    promotion?: Maybe<Promotion>;
    promotionActions: ConfigurableOperationDefinition[];
    promotionConditions: ConfigurableOperationDefinition[];
    promotions: PromotionList;
    role?: Maybe<Role>;
    roles: RoleList;
    search: SearchResponse;
    shippingCalculators: ConfigurableOperationDefinition[];
    shippingEligibilityCheckers: ConfigurableOperationDefinition[];
    shippingMethod?: Maybe<ShippingMethod>;
    shippingMethods: ShippingMethodList;
    tag: Tag;
    tags: TagList;
    taxCategories: TaxCategory[];
    taxCategory?: Maybe<TaxCategory>;
    taxRate?: Maybe<TaxRate>;
    taxRates: TaxRateList;
    testEligibleShippingMethods: ShippingMethodQuote[];
    testShippingMethod: TestShippingMethodResult;
    uiState: UiState;
    userStatus: UserStatus;
    zone?: Maybe<Zone>;
    zones: Zone[];
};
export declare type QueryAdministratorArgs = {
    id: Scalars['ID'];
};
export declare type QueryAdministratorsArgs = {
    options?: Maybe<AdministratorListOptions>;
};
export declare type QueryAssetArgs = {
    id: Scalars['ID'];
};
export declare type QueryAssetsArgs = {
    options?: Maybe<AssetListOptions>;
};
export declare type QueryChannelArgs = {
    id: Scalars['ID'];
};
export declare type QueryCollectionArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
};
export declare type QueryCollectionsArgs = {
    options?: Maybe<CollectionListOptions>;
};
export declare type QueryCountriesArgs = {
    options?: Maybe<CountryListOptions>;
};
export declare type QueryCountryArgs = {
    id: Scalars['ID'];
};
export declare type QueryCustomerArgs = {
    id: Scalars['ID'];
};
export declare type QueryCustomerGroupArgs = {
    id: Scalars['ID'];
};
export declare type QueryCustomerGroupsArgs = {
    options?: Maybe<CustomerGroupListOptions>;
};
export declare type QueryCustomersArgs = {
    options?: Maybe<CustomerListOptions>;
};
export declare type QueryEligibleShippingMethodsForDraftOrderArgs = {
    orderId: Scalars['ID'];
};
export declare type QueryFacetArgs = {
    id: Scalars['ID'];
};
export declare type QueryFacetsArgs = {
    options?: Maybe<FacetListOptions>;
};
export declare type QueryJobArgs = {
    jobId: Scalars['ID'];
};
export declare type QueryJobBufferSizeArgs = {
    bufferIds?: Maybe<Array<Scalars['String']>>;
};
export declare type QueryJobsArgs = {
    options?: Maybe<JobListOptions>;
};
export declare type QueryJobsByIdArgs = {
    jobIds: Array<Scalars['ID']>;
};
export declare type QueryOrderArgs = {
    id: Scalars['ID'];
};
export declare type QueryOrdersArgs = {
    options?: Maybe<OrderListOptions>;
};
export declare type QueryPaymentMethodArgs = {
    id: Scalars['ID'];
};
export declare type QueryPaymentMethodsArgs = {
    options?: Maybe<PaymentMethodListOptions>;
};
export declare type QueryPreviewCollectionVariantsArgs = {
    input: PreviewCollectionVariantsInput;
    options?: Maybe<ProductVariantListOptions>;
};
export declare type QueryProductArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
};
export declare type QueryProductOptionGroupArgs = {
    id: Scalars['ID'];
};
export declare type QueryProductOptionGroupsArgs = {
    filterTerm?: Maybe<Scalars['String']>;
};
export declare type QueryProductVariantArgs = {
    id: Scalars['ID'];
};
export declare type QueryProductVariantsArgs = {
    options?: Maybe<ProductVariantListOptions>;
    productId?: Maybe<Scalars['ID']>;
};
export declare type QueryProductsArgs = {
    options?: Maybe<ProductListOptions>;
};
export declare type QueryPromotionArgs = {
    id: Scalars['ID'];
};
export declare type QueryPromotionsArgs = {
    options?: Maybe<PromotionListOptions>;
};
export declare type QueryRoleArgs = {
    id: Scalars['ID'];
};
export declare type QueryRolesArgs = {
    options?: Maybe<RoleListOptions>;
};
export declare type QuerySearchArgs = {
    input: SearchInput;
};
export declare type QueryShippingMethodArgs = {
    id: Scalars['ID'];
};
export declare type QueryShippingMethodsArgs = {
    options?: Maybe<ShippingMethodListOptions>;
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
export declare type QueryTaxRateArgs = {
    id: Scalars['ID'];
};
export declare type QueryTaxRatesArgs = {
    options?: Maybe<TaxRateListOptions>;
};
export declare type QueryTestEligibleShippingMethodsArgs = {
    input: TestEligibleShippingMethodsInput;
};
export declare type QueryTestShippingMethodArgs = {
    input: TestShippingMethodInput;
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
export declare type UiState = {
    __typename?: 'UiState';
    language: LanguageCode;
    locale?: Maybe<Scalars['String']>;
    contentLanguage: LanguageCode;
    theme: Scalars['String'];
    displayUiExtensionPoints: Scalars['Boolean'];
};
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
export declare type UserStatus = {
    __typename?: 'UserStatus';
    username: Scalars['String'];
    isLoggedIn: Scalars['Boolean'];
    loginTime: Scalars['String'];
    permissions: Permission[];
    activeChannelId?: Maybe<Scalars['ID']>;
    channels: CurrentUserChannel[];
};
export declare type UserStatusInput = {
    username: Scalars['String'];
    loginTime: Scalars['String'];
    activeChannelId: Scalars['ID'];
    channels: CurrentUserChannelInput[];
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
export declare type GetProductsWithFacetValuesByIdsQueryVariables = Exact<{
    ids: Array<Scalars['String']> | Scalars['String'];
}>;
export declare type GetProductsWithFacetValuesByIdsQuery = {
    products: {
        __typename?: 'ProductList';
    } & {
        items: Array<
            {
                __typename?: 'Product';
            } & Pick<Product, 'id' | 'name'> & {
                    facetValues: Array<
                        {
                            __typename?: 'FacetValue';
                        } & Pick<FacetValue, 'id' | 'name' | 'code'> & {
                                facet: {
                                    __typename?: 'Facet';
                                } & Pick<Facet, 'id' | 'name' | 'code'>;
                            }
                    >;
                }
        >;
    };
};
export declare type GetVariantsWithFacetValuesByIdsQueryVariables = Exact<{
    ids: Array<Scalars['String']> | Scalars['String'];
}>;
export declare type GetVariantsWithFacetValuesByIdsQuery = {
    productVariants: {
        __typename?: 'ProductVariantList';
    } & {
        items: Array<
            {
                __typename?: 'ProductVariant';
            } & Pick<ProductVariant, 'id' | 'name' | 'sku'> & {
                    facetValues: Array<
                        {
                            __typename?: 'FacetValue';
                        } & Pick<FacetValue, 'id' | 'name' | 'code'> & {
                                facet: {
                                    __typename?: 'Facet';
                                } & Pick<Facet, 'id' | 'name' | 'code'>;
                            }
                    >;
                }
        >;
    };
};
export declare type UpdateProductsBulkMutationVariables = Exact<{
    input: UpdateProductInput[] | UpdateProductInput;
}>;
export declare type UpdateProductsBulkMutation = {
    updateProducts: Array<
        {
            __typename?: 'Product';
        } & Pick<Product, 'id' | 'name'> & {
                facetValues: Array<
                    {
                        __typename?: 'FacetValue';
                    } & Pick<FacetValue, 'id' | 'name' | 'code'>
                >;
            }
    >;
};
export declare type UpdateVariantsBulkMutationVariables = Exact<{
    input: UpdateProductVariantInput[] | UpdateProductVariantInput;
}>;
export declare type UpdateVariantsBulkMutation = {
    updateProductVariants: Array<
        Maybe<
            {
                __typename?: 'ProductVariant';
            } & Pick<ProductVariant, 'id' | 'name'> & {
                    facetValues: Array<
                        {
                            __typename?: 'FacetValue';
                        } & Pick<FacetValue, 'id' | 'name' | 'code'>
                    >;
                }
        >
    >;
};
export declare type RoleFragment = {
    __typename?: 'Role';
} & Pick<Role, 'id' | 'createdAt' | 'updatedAt' | 'code' | 'description' | 'permissions'> & {
        channels: Array<
            {
                __typename?: 'Channel';
            } & Pick<Channel, 'id' | 'code' | 'token'>
        >;
    };
export declare type AdministratorFragment = {
    __typename?: 'Administrator';
} & Pick<Administrator, 'id' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'emailAddress'> & {
        user: {
            __typename?: 'User';
        } & Pick<User, 'id' | 'identifier' | 'lastLogin'> & {
                roles: Array<
                    {
                        __typename?: 'Role';
                    } & RoleFragment
                >;
            };
    };
export declare type GetAdministratorsQueryVariables = Exact<{
    options?: Maybe<AdministratorListOptions>;
}>;
export declare type GetAdministratorsQuery = {
    administrators: {
        __typename?: 'AdministratorList';
    } & Pick<AdministratorList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Administrator';
                } & AdministratorFragment
            >;
        };
};
export declare type GetActiveAdministratorQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetActiveAdministratorQuery = {
    activeAdministrator?: Maybe<
        {
            __typename?: 'Administrator';
        } & AdministratorFragment
    >;
};
export declare type GetAdministratorQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetAdministratorQuery = {
    administrator?: Maybe<
        {
            __typename?: 'Administrator';
        } & AdministratorFragment
    >;
};
export declare type CreateAdministratorMutationVariables = Exact<{
    input: CreateAdministratorInput;
}>;
export declare type CreateAdministratorMutation = {
    createAdministrator: {
        __typename?: 'Administrator';
    } & AdministratorFragment;
};
export declare type UpdateAdministratorMutationVariables = Exact<{
    input: UpdateAdministratorInput;
}>;
export declare type UpdateAdministratorMutation = {
    updateAdministrator: {
        __typename?: 'Administrator';
    } & AdministratorFragment;
};
export declare type UpdateActiveAdministratorMutationVariables = Exact<{
    input: UpdateActiveAdministratorInput;
}>;
export declare type UpdateActiveAdministratorMutation = {
    updateActiveAdministrator: {
        __typename?: 'Administrator';
    } & AdministratorFragment;
};
export declare type DeleteAdministratorMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteAdministratorMutation = {
    deleteAdministrator: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type GetRolesQueryVariables = Exact<{
    options?: Maybe<RoleListOptions>;
}>;
export declare type GetRolesQuery = {
    roles: {
        __typename?: 'RoleList';
    } & Pick<RoleList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Role';
                } & RoleFragment
            >;
        };
};
export declare type GetRoleQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetRoleQuery = {
    role?: Maybe<
        {
            __typename?: 'Role';
        } & RoleFragment
    >;
};
export declare type CreateRoleMutationVariables = Exact<{
    input: CreateRoleInput;
}>;
export declare type CreateRoleMutation = {
    createRole: {
        __typename?: 'Role';
    } & RoleFragment;
};
export declare type UpdateRoleMutationVariables = Exact<{
    input: UpdateRoleInput;
}>;
export declare type UpdateRoleMutation = {
    updateRole: {
        __typename?: 'Role';
    } & RoleFragment;
};
export declare type DeleteRoleMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteRoleMutation = {
    deleteRole: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type AssignRoleToAdministratorMutationVariables = Exact<{
    administratorId: Scalars['ID'];
    roleId: Scalars['ID'];
}>;
export declare type AssignRoleToAdministratorMutation = {
    assignRoleToAdministrator: {
        __typename?: 'Administrator';
    } & AdministratorFragment;
};
export declare type CurrentUserFragment = {
    __typename?: 'CurrentUser';
} & Pick<CurrentUser, 'id' | 'identifier'> & {
        channels: Array<
            {
                __typename?: 'CurrentUserChannel';
            } & Pick<CurrentUserChannel, 'id' | 'code' | 'token' | 'permissions'>
        >;
    };
export declare type AttemptLoginMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
    rememberMe: Scalars['Boolean'];
}>;
export declare type AttemptLoginMutation = {
    login:
        | ({
              __typename?: 'CurrentUser';
          } & CurrentUserFragment)
        | ({
              __typename?: 'InvalidCredentialsError';
          } & ErrorResult_InvalidCredentialsError_Fragment)
        | ({
              __typename?: 'NativeAuthStrategyError';
          } & ErrorResult_NativeAuthStrategyError_Fragment);
};
export declare type LogOutMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type LogOutMutation = {
    logout: {
        __typename?: 'Success';
    } & Pick<Success, 'success'>;
};
export declare type GetCurrentUserQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetCurrentUserQuery = {
    me?: Maybe<
        {
            __typename?: 'CurrentUser';
        } & CurrentUserFragment
    >;
};
export declare type RequestStartedMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type RequestStartedMutation = Pick<Mutation, 'requestStarted'>;
export declare type RequestCompletedMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type RequestCompletedMutation = Pick<Mutation, 'requestCompleted'>;
export declare type UserStatusFragment = {
    __typename?: 'UserStatus';
} & Pick<UserStatus, 'username' | 'isLoggedIn' | 'loginTime' | 'activeChannelId' | 'permissions'> & {
        channels: Array<
            {
                __typename?: 'CurrentUserChannel';
            } & Pick<CurrentUserChannel, 'id' | 'code' | 'token' | 'permissions'>
        >;
    };
export declare type SetAsLoggedInMutationVariables = Exact<{
    input: UserStatusInput;
}>;
export declare type SetAsLoggedInMutation = {
    setAsLoggedIn: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
};
export declare type SetAsLoggedOutMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type SetAsLoggedOutMutation = {
    setAsLoggedOut: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
};
export declare type SetUiLanguageMutationVariables = Exact<{
    languageCode: LanguageCode;
    locale?: Maybe<Scalars['String']>;
}>;
export declare type SetUiLanguageMutation = Pick<Mutation, 'setUiLanguage' | 'setUiLocale'>;
export declare type SetUiLocaleMutationVariables = Exact<{
    locale?: Maybe<Scalars['String']>;
}>;
export declare type SetUiLocaleMutation = Pick<Mutation, 'setUiLocale'>;
export declare type SetDisplayUiExtensionPointsMutationVariables = Exact<{
    display: Scalars['Boolean'];
}>;
export declare type SetDisplayUiExtensionPointsMutation = Pick<Mutation, 'setDisplayUiExtensionPoints'>;
export declare type SetContentLanguageMutationVariables = Exact<{
    languageCode: LanguageCode;
}>;
export declare type SetContentLanguageMutation = Pick<Mutation, 'setContentLanguage'>;
export declare type SetUiThemeMutationVariables = Exact<{
    theme: Scalars['String'];
}>;
export declare type SetUiThemeMutation = Pick<Mutation, 'setUiTheme'>;
export declare type GetNetworkStatusQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetNetworkStatusQuery = {
    networkStatus: {
        __typename?: 'NetworkStatus';
    } & Pick<NetworkStatus, 'inFlightRequests'>;
};
export declare type GetUserStatusQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetUserStatusQuery = {
    userStatus: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
};
export declare type GetUiStateQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetUiStateQuery = {
    uiState: {
        __typename?: 'UiState';
    } & Pick<UiState, 'language' | 'locale' | 'contentLanguage' | 'theme' | 'displayUiExtensionPoints'>;
};
export declare type GetClientStateQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetClientStateQuery = {
    networkStatus: {
        __typename?: 'NetworkStatus';
    } & Pick<NetworkStatus, 'inFlightRequests'>;
    userStatus: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
    uiState: {
        __typename?: 'UiState';
    } & Pick<UiState, 'language' | 'locale' | 'contentLanguage' | 'theme' | 'displayUiExtensionPoints'>;
};
export declare type SetActiveChannelMutationVariables = Exact<{
    channelId: Scalars['ID'];
}>;
export declare type SetActiveChannelMutation = {
    setActiveChannel: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
};
export declare type UpdateUserChannelsMutationVariables = Exact<{
    channels: CurrentUserChannelInput[] | CurrentUserChannelInput;
}>;
export declare type UpdateUserChannelsMutation = {
    updateUserChannels: {
        __typename?: 'UserStatus';
    } & UserStatusFragment;
};
export declare type GetCollectionFiltersQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetCollectionFiltersQuery = {
    collectionFilters: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
};
export declare type CollectionFragment = {
    __typename?: 'Collection';
} & Pick<
    Collection,
    'id' | 'createdAt' | 'updatedAt' | 'name' | 'slug' | 'description' | 'isPrivate' | 'languageCode'
> & {
        breadcrumbs: Array<
            {
                __typename?: 'CollectionBreadcrumb';
            } & Pick<CollectionBreadcrumb, 'id' | 'name' | 'slug'>
        >;
        featuredAsset?: Maybe<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        assets: Array<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        filters: Array<
            {
                __typename?: 'ConfigurableOperation';
            } & ConfigurableOperationFragment
        >;
        translations: Array<
            {
                __typename?: 'CollectionTranslation';
            } & Pick<CollectionTranslation, 'id' | 'languageCode' | 'name' | 'slug' | 'description'>
        >;
        parent?: Maybe<
            {
                __typename?: 'Collection';
            } & Pick<Collection, 'id' | 'name'>
        >;
        children?: Maybe<
            Array<
                {
                    __typename?: 'Collection';
                } & Pick<Collection, 'id' | 'name'>
            >
        >;
    };
export declare type GetCollectionListQueryVariables = Exact<{
    options?: Maybe<CollectionListOptions>;
}>;
export declare type GetCollectionListQuery = {
    collections: {
        __typename?: 'CollectionList';
    } & Pick<CollectionList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Collection';
                } & Pick<Collection, 'id' | 'name' | 'slug' | 'description' | 'isPrivate'> & {
                        featuredAsset?: Maybe<
                            {
                                __typename?: 'Asset';
                            } & AssetFragment
                        >;
                        parent?: Maybe<
                            {
                                __typename?: 'Collection';
                            } & Pick<Collection, 'id'>
                        >;
                    }
            >;
        };
};
export declare type GetCollectionQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetCollectionQuery = {
    collection?: Maybe<
        {
            __typename?: 'Collection';
        } & CollectionFragment
    >;
};
export declare type CreateCollectionMutationVariables = Exact<{
    input: CreateCollectionInput;
}>;
export declare type CreateCollectionMutation = {
    createCollection: {
        __typename?: 'Collection';
    } & CollectionFragment;
};
export declare type UpdateCollectionMutationVariables = Exact<{
    input: UpdateCollectionInput;
}>;
export declare type UpdateCollectionMutation = {
    updateCollection: {
        __typename?: 'Collection';
    } & CollectionFragment;
};
export declare type MoveCollectionMutationVariables = Exact<{
    input: MoveCollectionInput;
}>;
export declare type MoveCollectionMutation = {
    moveCollection: {
        __typename?: 'Collection';
    } & CollectionFragment;
};
export declare type DeleteCollectionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCollectionMutation = {
    deleteCollection: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type DeleteCollectionsMutationVariables = Exact<{
    ids: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type DeleteCollectionsMutation = {
    deleteCollections: Array<
        {
            __typename?: 'DeletionResponse';
        } & Pick<DeletionResponse, 'result' | 'message'>
    >;
};
export declare type GetCollectionContentsQueryVariables = Exact<{
    id: Scalars['ID'];
    options?: Maybe<ProductVariantListOptions>;
}>;
export declare type GetCollectionContentsQuery = {
    collection?: Maybe<
        {
            __typename?: 'Collection';
        } & Pick<Collection, 'id' | 'name'> & {
                productVariants: {
                    __typename?: 'ProductVariantList';
                } & Pick<ProductVariantList, 'totalItems'> & {
                        items: Array<
                            {
                                __typename?: 'ProductVariant';
                            } & Pick<ProductVariant, 'id' | 'productId' | 'name' | 'sku'>
                        >;
                    };
            }
    >;
};
export declare type PreviewCollectionContentsQueryVariables = Exact<{
    input: PreviewCollectionVariantsInput;
    options?: Maybe<ProductVariantListOptions>;
}>;
export declare type PreviewCollectionContentsQuery = {
    previewCollectionVariants: {
        __typename?: 'ProductVariantList';
    } & Pick<ProductVariantList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'ProductVariant';
                } & Pick<ProductVariant, 'id' | 'productId' | 'name' | 'sku'>
            >;
        };
};
export declare type AssignCollectionsToChannelMutationVariables = Exact<{
    input: AssignCollectionsToChannelInput;
}>;
export declare type AssignCollectionsToChannelMutation = {
    assignCollectionsToChannel: Array<
        {
            __typename?: 'Collection';
        } & Pick<Collection, 'id' | 'name'>
    >;
};
export declare type RemoveCollectionsFromChannelMutationVariables = Exact<{
    input: RemoveCollectionsFromChannelInput;
}>;
export declare type RemoveCollectionsFromChannelMutation = {
    removeCollectionsFromChannel: Array<
        {
            __typename?: 'Collection';
        } & Pick<Collection, 'id' | 'name'>
    >;
};
export declare type AddressFragment = {
    __typename?: 'Address';
} & Pick<
    Address,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'fullName'
    | 'company'
    | 'streetLine1'
    | 'streetLine2'
    | 'city'
    | 'province'
    | 'postalCode'
    | 'phoneNumber'
    | 'defaultShippingAddress'
    | 'defaultBillingAddress'
> & {
        country: {
            __typename?: 'Country';
        } & Pick<Country, 'id' | 'code' | 'name'>;
    };
export declare type CustomerFragment = {
    __typename?: 'Customer';
} & Pick<
    Customer,
    'id' | 'createdAt' | 'updatedAt' | 'title' | 'firstName' | 'lastName' | 'phoneNumber' | 'emailAddress'
> & {
        user?: Maybe<
            {
                __typename?: 'User';
            } & Pick<User, 'id' | 'identifier' | 'verified' | 'lastLogin'>
        >;
        addresses?: Maybe<
            Array<
                {
                    __typename?: 'Address';
                } & AddressFragment
            >
        >;
    };
export declare type CustomerGroupFragment = {
    __typename?: 'CustomerGroup';
} & Pick<CustomerGroup, 'id' | 'createdAt' | 'updatedAt' | 'name'>;
export declare type GetCustomerListQueryVariables = Exact<{
    options?: Maybe<CustomerListOptions>;
}>;
export declare type GetCustomerListQuery = {
    customers: {
        __typename?: 'CustomerList';
    } & Pick<CustomerList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Customer';
                } & Pick<
                    Customer,
                    'id' | 'createdAt' | 'updatedAt' | 'title' | 'firstName' | 'lastName' | 'emailAddress'
                > & {
                        user?: Maybe<
                            {
                                __typename?: 'User';
                            } & Pick<User, 'id' | 'verified'>
                        >;
                    }
            >;
        };
};
export declare type GetCustomerQueryVariables = Exact<{
    id: Scalars['ID'];
    orderListOptions?: Maybe<OrderListOptions>;
}>;
export declare type GetCustomerQuery = {
    customer?: Maybe<
        {
            __typename?: 'Customer';
        } & {
            groups: Array<
                {
                    __typename?: 'CustomerGroup';
                } & Pick<CustomerGroup, 'id' | 'name'>
            >;
            orders: {
                __typename?: 'OrderList';
            } & Pick<OrderList, 'totalItems'> & {
                    items: Array<
                        {
                            __typename?: 'Order';
                        } & Pick<
                            Order,
                            'id' | 'code' | 'state' | 'totalWithTax' | 'currencyCode' | 'updatedAt'
                        >
                    >;
                };
        } & CustomerFragment
    >;
};
export declare type CreateCustomerMutationVariables = Exact<{
    input: CreateCustomerInput;
    password?: Maybe<Scalars['String']>;
}>;
export declare type CreateCustomerMutation = {
    createCustomer:
        | ({
              __typename?: 'Customer';
          } & CustomerFragment)
        | ({
              __typename?: 'EmailAddressConflictError';
          } & ErrorResult_EmailAddressConflictError_Fragment);
};
export declare type UpdateCustomerMutationVariables = Exact<{
    input: UpdateCustomerInput;
}>;
export declare type UpdateCustomerMutation = {
    updateCustomer:
        | ({
              __typename?: 'Customer';
          } & CustomerFragment)
        | ({
              __typename?: 'EmailAddressConflictError';
          } & ErrorResult_EmailAddressConflictError_Fragment);
};
export declare type DeleteCustomerMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCustomerMutation = {
    deleteCustomer: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type CreateCustomerAddressMutationVariables = Exact<{
    customerId: Scalars['ID'];
    input: CreateAddressInput;
}>;
export declare type CreateCustomerAddressMutation = {
    createCustomerAddress: {
        __typename?: 'Address';
    } & AddressFragment;
};
export declare type UpdateCustomerAddressMutationVariables = Exact<{
    input: UpdateAddressInput;
}>;
export declare type UpdateCustomerAddressMutation = {
    updateCustomerAddress: {
        __typename?: 'Address';
    } & AddressFragment;
};
export declare type DeleteCustomerAddressMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCustomerAddressMutation = {
    deleteCustomerAddress: {
        __typename?: 'Success';
    } & Pick<Success, 'success'>;
};
export declare type CreateCustomerGroupMutationVariables = Exact<{
    input: CreateCustomerGroupInput;
}>;
export declare type CreateCustomerGroupMutation = {
    createCustomerGroup: {
        __typename?: 'CustomerGroup';
    } & CustomerGroupFragment;
};
export declare type UpdateCustomerGroupMutationVariables = Exact<{
    input: UpdateCustomerGroupInput;
}>;
export declare type UpdateCustomerGroupMutation = {
    updateCustomerGroup: {
        __typename?: 'CustomerGroup';
    } & CustomerGroupFragment;
};
export declare type DeleteCustomerGroupMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCustomerGroupMutation = {
    deleteCustomerGroup: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type GetCustomerGroupsQueryVariables = Exact<{
    options?: Maybe<CustomerGroupListOptions>;
}>;
export declare type GetCustomerGroupsQuery = {
    customerGroups: {
        __typename?: 'CustomerGroupList';
    } & Pick<CustomerGroupList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'CustomerGroup';
                } & CustomerGroupFragment
            >;
        };
};
export declare type GetCustomerGroupWithCustomersQueryVariables = Exact<{
    id: Scalars['ID'];
    options?: Maybe<CustomerListOptions>;
}>;
export declare type GetCustomerGroupWithCustomersQuery = {
    customerGroup?: Maybe<
        {
            __typename?: 'CustomerGroup';
        } & {
            customers: {
                __typename?: 'CustomerList';
            } & Pick<CustomerList, 'totalItems'> & {
                    items: Array<
                        {
                            __typename?: 'Customer';
                        } & Pick<
                            Customer,
                            'id' | 'createdAt' | 'updatedAt' | 'emailAddress' | 'firstName' | 'lastName'
                        >
                    >;
                };
        } & CustomerGroupFragment
    >;
};
export declare type AddCustomersToGroupMutationVariables = Exact<{
    groupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type AddCustomersToGroupMutation = {
    addCustomersToGroup: {
        __typename?: 'CustomerGroup';
    } & CustomerGroupFragment;
};
export declare type RemoveCustomersFromGroupMutationVariables = Exact<{
    groupId: Scalars['ID'];
    customerIds: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type RemoveCustomersFromGroupMutation = {
    removeCustomersFromGroup: {
        __typename?: 'CustomerGroup';
    } & CustomerGroupFragment;
};
export declare type GetCustomerHistoryQueryVariables = Exact<{
    id: Scalars['ID'];
    options?: Maybe<HistoryEntryListOptions>;
}>;
export declare type GetCustomerHistoryQuery = {
    customer?: Maybe<
        {
            __typename?: 'Customer';
        } & Pick<Customer, 'id'> & {
                history: {
                    __typename?: 'HistoryEntryList';
                } & Pick<HistoryEntryList, 'totalItems'> & {
                        items: Array<
                            {
                                __typename?: 'HistoryEntry';
                            } & Pick<HistoryEntry, 'id' | 'type' | 'createdAt' | 'isPublic' | 'data'> & {
                                    administrator?: Maybe<
                                        {
                                            __typename?: 'Administrator';
                                        } & Pick<Administrator, 'id' | 'firstName' | 'lastName'>
                                    >;
                                }
                        >;
                    };
            }
    >;
};
export declare type AddNoteToCustomerMutationVariables = Exact<{
    input: AddNoteToCustomerInput;
}>;
export declare type AddNoteToCustomerMutation = {
    addNoteToCustomer: {
        __typename?: 'Customer';
    } & Pick<Customer, 'id'>;
};
export declare type UpdateCustomerNoteMutationVariables = Exact<{
    input: UpdateCustomerNoteInput;
}>;
export declare type UpdateCustomerNoteMutation = {
    updateCustomerNote: {
        __typename?: 'HistoryEntry';
    } & Pick<HistoryEntry, 'id' | 'data' | 'isPublic'>;
};
export declare type DeleteCustomerNoteMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCustomerNoteMutation = {
    deleteCustomerNote: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type FacetValueFragment = {
    __typename?: 'FacetValue';
} & Pick<FacetValue, 'id' | 'createdAt' | 'updatedAt' | 'languageCode' | 'code' | 'name'> & {
        translations: Array<
            {
                __typename?: 'FacetValueTranslation';
            } & Pick<FacetValueTranslation, 'id' | 'languageCode' | 'name'>
        >;
        facet: {
            __typename?: 'Facet';
        } & Pick<Facet, 'id' | 'createdAt' | 'updatedAt' | 'name'>;
    };
export declare type FacetWithValuesFragment = {
    __typename?: 'Facet';
} & Pick<Facet, 'id' | 'createdAt' | 'updatedAt' | 'languageCode' | 'isPrivate' | 'code' | 'name'> & {
        translations: Array<
            {
                __typename?: 'FacetTranslation';
            } & Pick<FacetTranslation, 'id' | 'languageCode' | 'name'>
        >;
        values: Array<
            {
                __typename?: 'FacetValue';
            } & FacetValueFragment
        >;
    };
export declare type CreateFacetMutationVariables = Exact<{
    input: CreateFacetInput;
}>;
export declare type CreateFacetMutation = {
    createFacet: {
        __typename?: 'Facet';
    } & FacetWithValuesFragment;
};
export declare type UpdateFacetMutationVariables = Exact<{
    input: UpdateFacetInput;
}>;
export declare type UpdateFacetMutation = {
    updateFacet: {
        __typename?: 'Facet';
    } & FacetWithValuesFragment;
};
export declare type DeleteFacetMutationVariables = Exact<{
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
}>;
export declare type DeleteFacetMutation = {
    deleteFacet: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type DeleteFacetsMutationVariables = Exact<{
    ids: Array<Scalars['ID']> | Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
}>;
export declare type DeleteFacetsMutation = {
    deleteFacets: Array<
        {
            __typename?: 'DeletionResponse';
        } & Pick<DeletionResponse, 'result' | 'message'>
    >;
};
export declare type CreateFacetValuesMutationVariables = Exact<{
    input: CreateFacetValueInput[] | CreateFacetValueInput;
}>;
export declare type CreateFacetValuesMutation = {
    createFacetValues: Array<
        {
            __typename?: 'FacetValue';
        } & FacetValueFragment
    >;
};
export declare type UpdateFacetValuesMutationVariables = Exact<{
    input: UpdateFacetValueInput[] | UpdateFacetValueInput;
}>;
export declare type UpdateFacetValuesMutation = {
    updateFacetValues: Array<
        {
            __typename?: 'FacetValue';
        } & FacetValueFragment
    >;
};
export declare type DeleteFacetValuesMutationVariables = Exact<{
    ids: Array<Scalars['ID']> | Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
}>;
export declare type DeleteFacetValuesMutation = {
    deleteFacetValues: Array<
        {
            __typename?: 'DeletionResponse';
        } & Pick<DeletionResponse, 'result' | 'message'>
    >;
};
export declare type GetFacetListQueryVariables = Exact<{
    options?: Maybe<FacetListOptions>;
}>;
export declare type GetFacetListQuery = {
    facets: {
        __typename?: 'FacetList';
    } & Pick<FacetList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Facet';
                } & FacetWithValuesFragment
            >;
        };
};
export declare type GetFacetWithValuesQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetFacetWithValuesQuery = {
    facet?: Maybe<
        {
            __typename?: 'Facet';
        } & FacetWithValuesFragment
    >;
};
export declare type AssignFacetsToChannelMutationVariables = Exact<{
    input: AssignFacetsToChannelInput;
}>;
export declare type AssignFacetsToChannelMutation = {
    assignFacetsToChannel: Array<
        {
            __typename?: 'Facet';
        } & Pick<Facet, 'id'>
    >;
};
export declare type RemoveFacetsFromChannelMutationVariables = Exact<{
    input: RemoveFacetsFromChannelInput;
}>;
export declare type RemoveFacetsFromChannelMutation = {
    removeFacetsFromChannel: Array<
        | ({
              __typename?: 'Facet';
          } & Pick<Facet, 'id'>)
        | ({
              __typename?: 'FacetInUseError';
          } & Pick<FacetInUseError, 'errorCode' | 'message' | 'variantCount' | 'productCount'>)
    >;
};
export declare type DiscountFragment = {
    __typename?: 'Discount';
} & Pick<Discount, 'adjustmentSource' | 'amount' | 'amountWithTax' | 'description' | 'type'>;
export declare type PaymentFragment = {
    __typename?: 'Payment';
} & Pick<Payment, 'id' | 'transactionId' | 'amount' | 'method' | 'state' | 'metadata'>;
export declare type RefundFragment = {
    __typename?: 'Refund';
} & Pick<Refund, 'id' | 'state' | 'items' | 'shipping' | 'adjustment' | 'transactionId' | 'paymentId'>;
export declare type OrderAddressFragment = {
    __typename?: 'OrderAddress';
} & Pick<
    OrderAddress,
    | 'fullName'
    | 'company'
    | 'streetLine1'
    | 'streetLine2'
    | 'city'
    | 'province'
    | 'postalCode'
    | 'country'
    | 'countryCode'
    | 'phoneNumber'
>;
export declare type OrderFragment = {
    __typename?: 'Order';
} & Pick<
    Order,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'orderPlacedAt'
    | 'code'
    | 'state'
    | 'nextStates'
    | 'total'
    | 'totalWithTax'
    | 'currencyCode'
> & {
        payments?: Maybe<
            Array<
                {
                    __typename?: 'Payment';
                } & Pick<Payment, 'id' | 'method' | 'state'>
            >
        >;
        customer?: Maybe<
            {
                __typename?: 'Customer';
            } & Pick<Customer, 'id' | 'firstName' | 'lastName' | 'phoneNumber'>
        >;
        shippingLines: Array<
            {
                __typename?: 'ShippingLine';
            } & {
                shippingMethod: {
                    __typename?: 'ShippingMethod';
                } & Pick<ShippingMethod, 'name'>;
            }
        >;
        customFields?: Maybe<
            {
                __typename?: 'OrderCustomFields';
            } & Pick<OrderCustomFields, 'scheduledTime'>
        >;
    };
export declare type FulfillmentFragment = {
    __typename?: 'Fulfillment';
} & Pick<
    Fulfillment,
    'id' | 'state' | 'nextStates' | 'createdAt' | 'updatedAt' | 'method' | 'trackingCode'
> & {
        summary: Array<
            {
                __typename?: 'FulfillmentLineSummary';
            } & Pick<FulfillmentLineSummary, 'quantity'> & {
                    orderLine: {
                        __typename?: 'OrderLine';
                    } & Pick<OrderLine, 'id'>;
                }
        >;
    };
export declare type OrderLineFragment = {
    __typename?: 'OrderLine';
} & Pick<
    OrderLine,
    | 'id'
    | 'unitPrice'
    | 'unitPriceWithTax'
    | 'proratedUnitPrice'
    | 'proratedUnitPriceWithTax'
    | 'quantity'
    | 'linePrice'
    | 'lineTax'
    | 'linePriceWithTax'
    | 'discountedLinePrice'
    | 'discountedLinePriceWithTax'
> & {
        featuredAsset?: Maybe<
            {
                __typename?: 'Asset';
            } & Pick<Asset, 'preview'>
        >;
        productVariant: {
            __typename?: 'ProductVariant';
        } & Pick<ProductVariant, 'id' | 'name' | 'sku' | 'trackInventory' | 'stockOnHand'>;
        discounts: Array<
            {
                __typename?: 'Discount';
            } & DiscountFragment
        >;
        fulfillments?: Maybe<
            Array<
                {
                    __typename?: 'Fulfillment';
                } & FulfillmentFragment
            >
        >;
        items: Array<
            {
                __typename?: 'OrderItem';
            } & Pick<OrderItem, 'id' | 'refundId' | 'cancelled'>
        >;
    };
export declare type OrderDetailFragment = {
    __typename?: 'Order';
} & Pick<
    Order,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'code'
    | 'state'
    | 'nextStates'
    | 'active'
    | 'couponCodes'
    | 'subTotal'
    | 'subTotalWithTax'
    | 'total'
    | 'totalWithTax'
    | 'currencyCode'
    | 'shipping'
    | 'shippingWithTax'
> & {
        customer?: Maybe<
            {
                __typename?: 'Customer';
            } & Pick<Customer, 'id' | 'firstName' | 'lastName' | 'phoneNumber'>
        >;
        lines: Array<
            {
                __typename?: 'OrderLine';
            } & OrderLineFragment
        >;
        surcharges: Array<
            {
                __typename?: 'Surcharge';
            } & Pick<Surcharge, 'id' | 'sku' | 'description' | 'price' | 'priceWithTax' | 'taxRate'>
        >;
        discounts: Array<
            {
                __typename?: 'Discount';
            } & DiscountFragment
        >;
        promotions: Array<
            {
                __typename?: 'Promotion';
            } & Pick<Promotion, 'id' | 'couponCode'>
        >;
        shippingLines: Array<
            {
                __typename?: 'ShippingLine';
            } & {
                shippingMethod: {
                    __typename?: 'ShippingMethod';
                } & Pick<ShippingMethod, 'id' | 'code' | 'name' | 'fulfillmentHandlerCode' | 'description'>;
            }
        >;
        taxSummary: Array<
            {
                __typename?: 'OrderTaxSummary';
            } & Pick<OrderTaxSummary, 'description' | 'taxBase' | 'taxRate' | 'taxTotal'>
        >;
        shippingAddress?: Maybe<
            {
                __typename?: 'OrderAddress';
            } & OrderAddressFragment
        >;
        billingAddress?: Maybe<
            {
                __typename?: 'OrderAddress';
            } & OrderAddressFragment
        >;
        payments?: Maybe<
            Array<
                {
                    __typename?: 'Payment';
                } & Pick<
                    Payment,
                    | 'id'
                    | 'createdAt'
                    | 'transactionId'
                    | 'amount'
                    | 'method'
                    | 'state'
                    | 'nextStates'
                    | 'errorMessage'
                    | 'metadata'
                > & {
                        refunds: Array<
                            {
                                __typename?: 'Refund';
                            } & Pick<
                                Refund,
                                | 'id'
                                | 'createdAt'
                                | 'state'
                                | 'items'
                                | 'adjustment'
                                | 'total'
                                | 'paymentId'
                                | 'reason'
                                | 'transactionId'
                                | 'method'
                                | 'metadata'
                            > & {
                                    orderItems: Array<
                                        {
                                            __typename?: 'OrderItem';
                                        } & Pick<OrderItem, 'id'>
                                    >;
                                }
                        >;
                    }
            >
        >;
        fulfillments?: Maybe<
            Array<
                {
                    __typename?: 'Fulfillment';
                } & FulfillmentFragment
            >
        >;
        modifications: Array<
            {
                __typename?: 'OrderModification';
            } & Pick<OrderModification, 'id' | 'createdAt' | 'isSettled' | 'priceChange' | 'note'> & {
                    payment?: Maybe<
                        {
                            __typename?: 'Payment';
                        } & Pick<Payment, 'id' | 'amount'>
                    >;
                    orderItems?: Maybe<
                        Array<
                            {
                                __typename?: 'OrderItem';
                            } & Pick<OrderItem, 'id'>
                        >
                    >;
                    refund?: Maybe<
                        {
                            __typename?: 'Refund';
                        } & Pick<Refund, 'id' | 'paymentId' | 'total'>
                    >;
                    surcharges?: Maybe<
                        Array<
                            {
                                __typename?: 'Surcharge';
                            } & Pick<Surcharge, 'id'>
                        >
                    >;
                }
        >;
    };
export declare type GetOrderListQueryVariables = Exact<{
    options?: Maybe<OrderListOptions>;
}>;
export declare type GetOrderListQuery = {
    orders: {
        __typename?: 'OrderList';
    } & Pick<OrderList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Order';
                } & OrderFragment
            >;
        };
};
export declare type GetOrderQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetOrderQuery = {
    order?: Maybe<
        {
            __typename?: 'Order';
        } & OrderDetailFragment
    >;
};
export declare type SettlePaymentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type SettlePaymentMutation = {
    settlePayment:
        | ({
              __typename?: 'Payment';
          } & PaymentFragment)
        | ({
              __typename?: 'SettlePaymentError';
          } & Pick<SettlePaymentError, 'paymentErrorMessage'> &
              ErrorResult_SettlePaymentError_Fragment)
        | ({
              __typename?: 'PaymentStateTransitionError';
          } & Pick<PaymentStateTransitionError, 'transitionError'> &
              ErrorResult_PaymentStateTransitionError_Fragment)
        | ({
              __typename?: 'OrderStateTransitionError';
          } & Pick<OrderStateTransitionError, 'transitionError'> &
              ErrorResult_OrderStateTransitionError_Fragment);
};
export declare type CancelPaymentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type CancelPaymentMutation = {
    cancelPayment:
        | ({
              __typename?: 'Payment';
          } & PaymentFragment)
        | ({
              __typename?: 'CancelPaymentError';
          } & Pick<CancelPaymentError, 'paymentErrorMessage'> &
              ErrorResult_CancelPaymentError_Fragment)
        | ({
              __typename?: 'PaymentStateTransitionError';
          } & Pick<PaymentStateTransitionError, 'transitionError'> &
              ErrorResult_PaymentStateTransitionError_Fragment);
};
export declare type TransitionPaymentToStateMutationVariables = Exact<{
    id: Scalars['ID'];
    state: Scalars['String'];
}>;
export declare type TransitionPaymentToStateMutation = {
    transitionPaymentToState:
        | ({
              __typename?: 'Payment';
          } & PaymentFragment)
        | ({
              __typename?: 'PaymentStateTransitionError';
          } & Pick<PaymentStateTransitionError, 'transitionError'> &
              ErrorResult_PaymentStateTransitionError_Fragment);
};
export declare type CreateFulfillmentMutationVariables = Exact<{
    input: FulfillOrderInput;
}>;
export declare type CreateFulfillmentMutation = {
    addFulfillmentToOrder:
        | ({
              __typename?: 'Fulfillment';
          } & FulfillmentFragment)
        | ({
              __typename?: 'EmptyOrderLineSelectionError';
          } & ErrorResult_EmptyOrderLineSelectionError_Fragment)
        | ({
              __typename?: 'ItemsAlreadyFulfilledError';
          } & ErrorResult_ItemsAlreadyFulfilledError_Fragment)
        | ({
              __typename?: 'InsufficientStockOnHandError';
          } & ErrorResult_InsufficientStockOnHandError_Fragment)
        | ({
              __typename?: 'InvalidFulfillmentHandlerError';
          } & ErrorResult_InvalidFulfillmentHandlerError_Fragment)
        | ({
              __typename?: 'FulfillmentStateTransitionError';
          } & Pick<FulfillmentStateTransitionError, 'errorCode' | 'message' | 'transitionError'> &
              ErrorResult_FulfillmentStateTransitionError_Fragment)
        | ({
              __typename?: 'CreateFulfillmentError';
          } & Pick<CreateFulfillmentError, 'errorCode' | 'message' | 'fulfillmentHandlerError'> &
              ErrorResult_CreateFulfillmentError_Fragment);
};
export declare type CancelOrderMutationVariables = Exact<{
    input: CancelOrderInput;
}>;
export declare type CancelOrderMutation = {
    cancelOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'EmptyOrderLineSelectionError';
          } & ErrorResult_EmptyOrderLineSelectionError_Fragment)
        | ({
              __typename?: 'QuantityTooGreatError';
          } & ErrorResult_QuantityTooGreatError_Fragment)
        | ({
              __typename?: 'MultipleOrderError';
          } & ErrorResult_MultipleOrderError_Fragment)
        | ({
              __typename?: 'CancelActiveOrderError';
          } & ErrorResult_CancelActiveOrderError_Fragment)
        | ({
              __typename?: 'OrderStateTransitionError';
          } & ErrorResult_OrderStateTransitionError_Fragment);
};
export declare type RefundOrderMutationVariables = Exact<{
    input: RefundOrderInput;
}>;
export declare type RefundOrderMutation = {
    refundOrder:
        | ({
              __typename?: 'Refund';
          } & RefundFragment)
        | ({
              __typename?: 'QuantityTooGreatError';
          } & ErrorResult_QuantityTooGreatError_Fragment)
        | ({
              __typename?: 'NothingToRefundError';
          } & ErrorResult_NothingToRefundError_Fragment)
        | ({
              __typename?: 'OrderStateTransitionError';
          } & ErrorResult_OrderStateTransitionError_Fragment)
        | ({
              __typename?: 'MultipleOrderError';
          } & ErrorResult_MultipleOrderError_Fragment)
        | ({
              __typename?: 'PaymentOrderMismatchError';
          } & ErrorResult_PaymentOrderMismatchError_Fragment)
        | ({
              __typename?: 'RefundOrderStateError';
          } & ErrorResult_RefundOrderStateError_Fragment)
        | ({
              __typename?: 'AlreadyRefundedError';
          } & ErrorResult_AlreadyRefundedError_Fragment)
        | ({
              __typename?: 'RefundStateTransitionError';
          } & ErrorResult_RefundStateTransitionError_Fragment);
};
export declare type SettleRefundMutationVariables = Exact<{
    input: SettleRefundInput;
}>;
export declare type SettleRefundMutation = {
    settleRefund:
        | ({
              __typename?: 'Refund';
          } & RefundFragment)
        | ({
              __typename?: 'RefundStateTransitionError';
          } & ErrorResult_RefundStateTransitionError_Fragment);
};
export declare type GetOrderHistoryQueryVariables = Exact<{
    id: Scalars['ID'];
    options?: Maybe<HistoryEntryListOptions>;
}>;
export declare type GetOrderHistoryQuery = {
    order?: Maybe<
        {
            __typename?: 'Order';
        } & Pick<Order, 'id'> & {
                history: {
                    __typename?: 'HistoryEntryList';
                } & Pick<HistoryEntryList, 'totalItems'> & {
                        items: Array<
                            {
                                __typename?: 'HistoryEntry';
                            } & Pick<HistoryEntry, 'id' | 'type' | 'createdAt' | 'isPublic' | 'data'> & {
                                    administrator?: Maybe<
                                        {
                                            __typename?: 'Administrator';
                                        } & Pick<Administrator, 'id' | 'firstName' | 'lastName'>
                                    >;
                                }
                        >;
                    };
            }
    >;
};
export declare type AddNoteToOrderMutationVariables = Exact<{
    input: AddNoteToOrderInput;
}>;
export declare type AddNoteToOrderMutation = {
    addNoteToOrder: {
        __typename?: 'Order';
    } & Pick<Order, 'id'>;
};
export declare type UpdateOrderNoteMutationVariables = Exact<{
    input: UpdateOrderNoteInput;
}>;
export declare type UpdateOrderNoteMutation = {
    updateOrderNote: {
        __typename?: 'HistoryEntry';
    } & Pick<HistoryEntry, 'id' | 'data' | 'isPublic'>;
};
export declare type DeleteOrderNoteMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteOrderNoteMutation = {
    deleteOrderNote: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type TransitionOrderToStateMutationVariables = Exact<{
    id: Scalars['ID'];
    state: Scalars['String'];
}>;
export declare type TransitionOrderToStateMutation = {
    transitionOrderToState?: Maybe<
        | ({
              __typename?: 'Order';
          } & OrderFragment)
        | ({
              __typename?: 'OrderStateTransitionError';
          } & Pick<OrderStateTransitionError, 'transitionError'> &
              ErrorResult_OrderStateTransitionError_Fragment)
    >;
};
export declare type UpdateOrderCustomFieldsMutationVariables = Exact<{
    input: UpdateOrderInput;
}>;
export declare type UpdateOrderCustomFieldsMutation = {
    setOrderCustomFields?: Maybe<
        {
            __typename?: 'Order';
        } & OrderFragment
    >;
};
export declare type TransitionFulfillmentToStateMutationVariables = Exact<{
    id: Scalars['ID'];
    state: Scalars['String'];
}>;
export declare type TransitionFulfillmentToStateMutation = {
    transitionFulfillmentToState:
        | ({
              __typename?: 'Fulfillment';
          } & FulfillmentFragment)
        | ({
              __typename?: 'FulfillmentStateTransitionError';
          } & Pick<FulfillmentStateTransitionError, 'transitionError'> &
              ErrorResult_FulfillmentStateTransitionError_Fragment);
};
export declare type GetOrderSummaryQueryVariables = Exact<{
    start: Scalars['DateTime'];
    end: Scalars['DateTime'];
}>;
export declare type GetOrderSummaryQuery = {
    orders: {
        __typename?: 'OrderList';
    } & Pick<OrderList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Order';
                } & Pick<Order, 'id' | 'total' | 'currencyCode'>
            >;
        };
};
export declare type ModifyOrderMutationVariables = Exact<{
    input: ModifyOrderInput;
}>;
export declare type ModifyOrderMutation = {
    modifyOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'NoChangesSpecifiedError';
          } & ErrorResult_NoChangesSpecifiedError_Fragment)
        | ({
              __typename?: 'OrderModificationStateError';
          } & ErrorResult_OrderModificationStateError_Fragment)
        | ({
              __typename?: 'PaymentMethodMissingError';
          } & ErrorResult_PaymentMethodMissingError_Fragment)
        | ({
              __typename?: 'RefundPaymentIdMissingError';
          } & ErrorResult_RefundPaymentIdMissingError_Fragment)
        | ({
              __typename?: 'OrderLimitError';
          } & ErrorResult_OrderLimitError_Fragment)
        | ({
              __typename?: 'NegativeQuantityError';
          } & ErrorResult_NegativeQuantityError_Fragment)
        | ({
              __typename?: 'InsufficientStockError';
          } & ErrorResult_InsufficientStockError_Fragment)
        | ({
              __typename?: 'CouponCodeExpiredError';
          } & ErrorResult_CouponCodeExpiredError_Fragment)
        | ({
              __typename?: 'CouponCodeInvalidError';
          } & ErrorResult_CouponCodeInvalidError_Fragment)
        | ({
              __typename?: 'CouponCodeLimitError';
          } & ErrorResult_CouponCodeLimitError_Fragment);
};
export declare type AddManualPaymentMutationVariables = Exact<{
    input: ManualPaymentInput;
}>;
export declare type AddManualPaymentMutation = {
    addManualPaymentToOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'ManualPaymentStateError';
          } & ErrorResult_ManualPaymentStateError_Fragment);
};
export declare type CreateDraftOrderMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type CreateDraftOrderMutation = {
    createDraftOrder: {
        __typename?: 'Order';
    } & OrderDetailFragment;
};
export declare type DeleteDraftOrderMutationVariables = Exact<{
    orderId: Scalars['ID'];
}>;
export declare type DeleteDraftOrderMutation = {
    deleteDraftOrder: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type AddItemToDraftOrderMutationVariables = Exact<{
    orderId: Scalars['ID'];
    input: AddItemToDraftOrderInput;
}>;
export declare type AddItemToDraftOrderMutation = {
    addItemToDraftOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'ShopClosedError';
          } & ErrorResult_ShopClosedError_Fragment)
        | ({
              __typename?: 'OrderModificationError';
          } & ErrorResult_OrderModificationError_Fragment)
        | ({
              __typename?: 'OrderLimitError';
          } & ErrorResult_OrderLimitError_Fragment)
        | ({
              __typename?: 'NegativeQuantityError';
          } & ErrorResult_NegativeQuantityError_Fragment)
        | ({
              __typename?: 'InsufficientStockError';
          } & ErrorResult_InsufficientStockError_Fragment);
};
export declare type AdjustDraftOrderLineMutationVariables = Exact<{
    orderId: Scalars['ID'];
    input: AdjustDraftOrderLineInput;
}>;
export declare type AdjustDraftOrderLineMutation = {
    adjustDraftOrderLine:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'ShopClosedError';
          } & ErrorResult_ShopClosedError_Fragment)
        | ({
              __typename?: 'OrderModificationError';
          } & ErrorResult_OrderModificationError_Fragment)
        | ({
              __typename?: 'OrderLimitError';
          } & ErrorResult_OrderLimitError_Fragment)
        | ({
              __typename?: 'NegativeQuantityError';
          } & ErrorResult_NegativeQuantityError_Fragment)
        | ({
              __typename?: 'InsufficientStockError';
          } & ErrorResult_InsufficientStockError_Fragment);
};
export declare type RemoveDraftOrderLineMutationVariables = Exact<{
    orderId: Scalars['ID'];
    orderLineId: Scalars['ID'];
}>;
export declare type RemoveDraftOrderLineMutation = {
    removeDraftOrderLine:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'OrderModificationError';
          } & ErrorResult_OrderModificationError_Fragment);
};
export declare type SetCustomerForDraftOrderMutationVariables = Exact<{
    orderId: Scalars['ID'];
    customerId?: Maybe<Scalars['ID']>;
    input?: Maybe<CreateCustomerInput>;
}>;
export declare type SetCustomerForDraftOrderMutation = {
    setCustomerForDraftOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'EmailAddressConflictError';
          } & ErrorResult_EmailAddressConflictError_Fragment);
};
export declare type SetDraftOrderShippingAddressMutationVariables = Exact<{
    orderId: Scalars['ID'];
    input: CreateAddressInput;
}>;
export declare type SetDraftOrderShippingAddressMutation = {
    setDraftOrderShippingAddress: {
        __typename?: 'Order';
    } & OrderDetailFragment;
};
export declare type SetDraftOrderBillingAddressMutationVariables = Exact<{
    orderId: Scalars['ID'];
    input: CreateAddressInput;
}>;
export declare type SetDraftOrderBillingAddressMutation = {
    setDraftOrderBillingAddress: {
        __typename?: 'Order';
    } & OrderDetailFragment;
};
export declare type ApplyCouponCodeToDraftOrderMutationVariables = Exact<{
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
}>;
export declare type ApplyCouponCodeToDraftOrderMutation = {
    applyCouponCodeToDraftOrder:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'CouponCodeExpiredError';
          } & ErrorResult_CouponCodeExpiredError_Fragment)
        | ({
              __typename?: 'CouponCodeInvalidError';
          } & ErrorResult_CouponCodeInvalidError_Fragment)
        | ({
              __typename?: 'CouponCodeLimitError';
          } & ErrorResult_CouponCodeLimitError_Fragment);
};
export declare type RemoveCouponCodeFromDraftOrderMutationVariables = Exact<{
    orderId: Scalars['ID'];
    couponCode: Scalars['String'];
}>;
export declare type RemoveCouponCodeFromDraftOrderMutation = {
    removeCouponCodeFromDraftOrder?: Maybe<
        {
            __typename?: 'Order';
        } & OrderDetailFragment
    >;
};
export declare type DraftOrderEligibleShippingMethodsQueryVariables = Exact<{
    orderId: Scalars['ID'];
}>;
export declare type DraftOrderEligibleShippingMethodsQuery = {
    eligibleShippingMethodsForDraftOrder: Array<
        {
            __typename?: 'ShippingMethodQuote';
        } & Pick<
            ShippingMethodQuote,
            'id' | 'name' | 'code' | 'description' | 'price' | 'priceWithTax' | 'metadata'
        >
    >;
};
export declare type SetDraftOrderShippingMethodMutationVariables = Exact<{
    orderId: Scalars['ID'];
    shippingMethodId: Scalars['ID'];
}>;
export declare type SetDraftOrderShippingMethodMutation = {
    setDraftOrderShippingMethod:
        | ({
              __typename?: 'Order';
          } & OrderDetailFragment)
        | ({
              __typename?: 'OrderModificationError';
          } & ErrorResult_OrderModificationError_Fragment)
        | ({
              __typename?: 'IneligibleShippingMethodError';
          } & ErrorResult_IneligibleShippingMethodError_Fragment)
        | ({
              __typename?: 'NoActiveOrderError';
          } & ErrorResult_NoActiveOrderError_Fragment);
};
export declare type AssetFragment = {
    __typename?: 'Asset';
} & Pick<
    Asset,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'name'
    | 'fileSize'
    | 'mimeType'
    | 'type'
    | 'preview'
    | 'source'
    | 'width'
    | 'height'
> & {
        focalPoint?: Maybe<
            {
                __typename?: 'Coordinate';
            } & Pick<Coordinate, 'x' | 'y'>
        >;
    };
export declare type TagFragment = {
    __typename?: 'Tag';
} & Pick<Tag, 'id' | 'value'>;
export declare type ProductOptionGroupFragment = {
    __typename?: 'ProductOptionGroup';
} & Pick<ProductOptionGroup, 'id' | 'createdAt' | 'updatedAt' | 'code' | 'languageCode' | 'name'> & {
        translations: Array<
            {
                __typename?: 'ProductOptionGroupTranslation';
            } & Pick<ProductOptionGroupTranslation, 'id' | 'languageCode' | 'name'>
        >;
    };
export declare type ProductOptionFragment = {
    __typename?: 'ProductOption';
} & Pick<ProductOption, 'id' | 'createdAt' | 'updatedAt' | 'code' | 'languageCode' | 'name' | 'groupId'> & {
        translations: Array<
            {
                __typename?: 'ProductOptionTranslation';
            } & Pick<ProductOptionTranslation, 'id' | 'languageCode' | 'name'>
        >;
    };
export declare type ProductVariantFragment = {
    __typename?: 'ProductVariant';
} & Pick<
    ProductVariant,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'enabled'
    | 'languageCode'
    | 'name'
    | 'price'
    | 'currencyCode'
    | 'priceWithTax'
    | 'stockOnHand'
    | 'stockAllocated'
    | 'trackInventory'
    | 'outOfStockThreshold'
    | 'useGlobalOutOfStockThreshold'
    | 'sku'
> & {
        taxRateApplied: {
            __typename?: 'TaxRate';
        } & Pick<TaxRate, 'id' | 'name' | 'value'>;
        taxCategory: {
            __typename?: 'TaxCategory';
        } & Pick<TaxCategory, 'id' | 'name'>;
        options: Array<
            {
                __typename?: 'ProductOption';
            } & ProductOptionFragment
        >;
        facetValues: Array<
            {
                __typename?: 'FacetValue';
            } & Pick<FacetValue, 'id' | 'code' | 'name'> & {
                    facet: {
                        __typename?: 'Facet';
                    } & Pick<Facet, 'id' | 'name'>;
                }
        >;
        featuredAsset?: Maybe<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        assets: Array<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        translations: Array<
            {
                __typename?: 'ProductVariantTranslation';
            } & Pick<ProductVariantTranslation, 'id' | 'languageCode' | 'name'>
        >;
        channels: Array<
            {
                __typename?: 'Channel';
            } & Pick<Channel, 'id' | 'code'>
        >;
    };
export declare type ProductDetailFragment = {
    __typename?: 'Product';
} & Pick<
    Product,
    'id' | 'createdAt' | 'updatedAt' | 'enabled' | 'languageCode' | 'name' | 'slug' | 'description'
> & {
        featuredAsset?: Maybe<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        assets: Array<
            {
                __typename?: 'Asset';
            } & AssetFragment
        >;
        translations: Array<
            {
                __typename?: 'ProductTranslation';
            } & Pick<ProductTranslation, 'id' | 'languageCode' | 'name' | 'slug' | 'description'>
        >;
        optionGroups: Array<
            {
                __typename?: 'ProductOptionGroup';
            } & ProductOptionGroupFragment
        >;
        facetValues: Array<
            {
                __typename?: 'FacetValue';
            } & Pick<FacetValue, 'id' | 'code' | 'name'> & {
                    facet: {
                        __typename?: 'Facet';
                    } & Pick<Facet, 'id' | 'name'>;
                }
        >;
        channels: Array<
            {
                __typename?: 'Channel';
            } & Pick<Channel, 'id' | 'code'>
        >;
    };
export declare type ProductOptionGroupWithOptionsFragment = {
    __typename?: 'ProductOptionGroup';
} & Pick<ProductOptionGroup, 'id' | 'createdAt' | 'updatedAt' | 'languageCode' | 'code' | 'name'> & {
        translations: Array<
            {
                __typename?: 'ProductOptionGroupTranslation';
            } & Pick<ProductOptionGroupTranslation, 'id' | 'name'>
        >;
        options: Array<
            {
                __typename?: 'ProductOption';
            } & Pick<ProductOption, 'id' | 'languageCode' | 'name' | 'code'> & {
                    translations: Array<
                        {
                            __typename?: 'ProductOptionTranslation';
                        } & Pick<ProductOptionTranslation, 'name'>
                    >;
                }
        >;
    };
export declare type UpdateProductMutationVariables = Exact<{
    input: UpdateProductInput;
    variantListOptions?: Maybe<ProductVariantListOptions>;
}>;
export declare type UpdateProductMutation = {
    updateProduct: {
        __typename?: 'Product';
    } & {
        variantList: {
            __typename?: 'ProductVariantList';
        } & Pick<ProductVariantList, 'totalItems'> & {
                items: Array<
                    {
                        __typename?: 'ProductVariant';
                    } & ProductVariantFragment
                >;
            };
    } & ProductDetailFragment;
};
export declare type CreateProductMutationVariables = Exact<{
    input: CreateProductInput;
    variantListOptions?: Maybe<ProductVariantListOptions>;
}>;
export declare type CreateProductMutation = {
    createProduct: {
        __typename?: 'Product';
    } & {
        variantList: {
            __typename?: 'ProductVariantList';
        } & Pick<ProductVariantList, 'totalItems'> & {
                items: Array<
                    {
                        __typename?: 'ProductVariant';
                    } & ProductVariantFragment
                >;
            };
    } & ProductDetailFragment;
};
export declare type DeleteProductMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteProductMutation = {
    deleteProduct: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type DeleteProductsMutationVariables = Exact<{
    ids: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type DeleteProductsMutation = {
    deleteProducts: Array<
        {
            __typename?: 'DeletionResponse';
        } & Pick<DeletionResponse, 'result' | 'message'>
    >;
};
export declare type CreateProductVariantsMutationVariables = Exact<{
    input: CreateProductVariantInput[] | CreateProductVariantInput;
}>;
export declare type CreateProductVariantsMutation = {
    createProductVariants: Array<
        Maybe<
            {
                __typename?: 'ProductVariant';
            } & ProductVariantFragment
        >
    >;
};
export declare type UpdateProductVariantsMutationVariables = Exact<{
    input: UpdateProductVariantInput[] | UpdateProductVariantInput;
}>;
export declare type UpdateProductVariantsMutation = {
    updateProductVariants: Array<
        Maybe<
            {
                __typename?: 'ProductVariant';
            } & ProductVariantFragment
        >
    >;
};
export declare type CreateProductOptionGroupMutationVariables = Exact<{
    input: CreateProductOptionGroupInput;
}>;
export declare type CreateProductOptionGroupMutation = {
    createProductOptionGroup: {
        __typename?: 'ProductOptionGroup';
    } & ProductOptionGroupWithOptionsFragment;
};
export declare type GetProductOptionGroupQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetProductOptionGroupQuery = {
    productOptionGroup?: Maybe<
        {
            __typename?: 'ProductOptionGroup';
        } & ProductOptionGroupWithOptionsFragment
    >;
};
export declare type AddOptionToGroupMutationVariables = Exact<{
    input: CreateProductOptionInput;
}>;
export declare type AddOptionToGroupMutation = {
    createProductOption: {
        __typename?: 'ProductOption';
    } & Pick<ProductOption, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'code' | 'groupId'>;
};
export declare type AddOptionGroupToProductMutationVariables = Exact<{
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
}>;
export declare type AddOptionGroupToProductMutation = {
    addOptionGroupToProduct: {
        __typename?: 'Product';
    } & Pick<Product, 'id' | 'createdAt' | 'updatedAt'> & {
            optionGroups: Array<
                {
                    __typename?: 'ProductOptionGroup';
                } & Pick<ProductOptionGroup, 'id' | 'createdAt' | 'updatedAt' | 'code'> & {
                        options: Array<
                            {
                                __typename?: 'ProductOption';
                            } & Pick<ProductOption, 'id' | 'createdAt' | 'updatedAt' | 'code'>
                        >;
                    }
            >;
        };
};
export declare type RemoveOptionGroupFromProductMutationVariables = Exact<{
    productId: Scalars['ID'];
    optionGroupId: Scalars['ID'];
}>;
export declare type RemoveOptionGroupFromProductMutation = {
    removeOptionGroupFromProduct:
        | ({
              __typename?: 'Product';
          } & Pick<Product, 'id' | 'createdAt' | 'updatedAt'> & {
                  optionGroups: Array<
                      {
                          __typename?: 'ProductOptionGroup';
                      } & Pick<ProductOptionGroup, 'id' | 'createdAt' | 'updatedAt' | 'code'> & {
                              options: Array<
                                  {
                                      __typename?: 'ProductOption';
                                  } & Pick<ProductOption, 'id' | 'createdAt' | 'updatedAt' | 'code'>
                              >;
                          }
                  >;
              })
        | ({
              __typename?: 'ProductOptionInUseError';
          } & ErrorResult_ProductOptionInUseError_Fragment);
};
export declare type GetProductWithVariantsQueryVariables = Exact<{
    id: Scalars['ID'];
    variantListOptions?: Maybe<ProductVariantListOptions>;
}>;
export declare type GetProductWithVariantsQuery = {
    product?: Maybe<
        {
            __typename?: 'Product';
        } & {
            variantList: {
                __typename?: 'ProductVariantList';
            } & Pick<ProductVariantList, 'totalItems'> & {
                    items: Array<
                        {
                            __typename?: 'ProductVariant';
                        } & ProductVariantFragment
                    >;
                };
        } & ProductDetailFragment
    >;
};
export declare type GetProductSimpleQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetProductSimpleQuery = {
    product?: Maybe<
        {
            __typename?: 'Product';
        } & Pick<Product, 'id' | 'name'> & {
                featuredAsset?: Maybe<
                    {
                        __typename?: 'Asset';
                    } & AssetFragment
                >;
            }
    >;
};
export declare type GetProductListQueryVariables = Exact<{
    options?: Maybe<ProductListOptions>;
}>;
export declare type GetProductListQuery = {
    products: {
        __typename?: 'ProductList';
    } & Pick<ProductList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Product';
                } & Pick<
                    Product,
                    'id' | 'createdAt' | 'updatedAt' | 'enabled' | 'languageCode' | 'name' | 'slug'
                > & {
                        featuredAsset?: Maybe<
                            {
                                __typename?: 'Asset';
                            } & Pick<Asset, 'id' | 'createdAt' | 'updatedAt' | 'preview'>
                        >;
                    }
            >;
        };
};
export declare type GetProductOptionGroupsQueryVariables = Exact<{
    filterTerm?: Maybe<Scalars['String']>;
}>;
export declare type GetProductOptionGroupsQuery = {
    productOptionGroups: Array<
        {
            __typename?: 'ProductOptionGroup';
        } & Pick<ProductOptionGroup, 'id' | 'createdAt' | 'updatedAt' | 'languageCode' | 'code' | 'name'> & {
                options: Array<
                    {
                        __typename?: 'ProductOption';
                    } & Pick<
                        ProductOption,
                        'id' | 'createdAt' | 'updatedAt' | 'languageCode' | 'code' | 'name'
                    >
                >;
            }
    >;
};
export declare type GetAssetListQueryVariables = Exact<{
    options?: Maybe<AssetListOptions>;
}>;
export declare type GetAssetListQuery = {
    assets: {
        __typename?: 'AssetList';
    } & Pick<AssetList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Asset';
                } & {
                    tags: Array<
                        {
                            __typename?: 'Tag';
                        } & TagFragment
                    >;
                } & AssetFragment
            >;
        };
};
export declare type GetAssetQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetAssetQuery = {
    asset?: Maybe<
        {
            __typename?: 'Asset';
        } & {
            tags: Array<
                {
                    __typename?: 'Tag';
                } & TagFragment
            >;
        } & AssetFragment
    >;
};
export declare type CreateAssetsMutationVariables = Exact<{
    input: CreateAssetInput[] | CreateAssetInput;
}>;
export declare type CreateAssetsMutation = {
    createAssets: Array<
        | ({
              __typename?: 'Asset';
          } & {
              tags: Array<
                  {
                      __typename?: 'Tag';
                  } & TagFragment
              >;
          } & AssetFragment)
        | ({
              __typename?: 'MimeTypeError';
          } & Pick<MimeTypeError, 'message'>)
    >;
};
export declare type UpdateAssetMutationVariables = Exact<{
    input: UpdateAssetInput;
}>;
export declare type UpdateAssetMutation = {
    updateAsset: {
        __typename?: 'Asset';
    } & {
        tags: Array<
            {
                __typename?: 'Tag';
            } & TagFragment
        >;
    } & AssetFragment;
};
export declare type DeleteAssetsMutationVariables = Exact<{
    input: DeleteAssetsInput;
}>;
export declare type DeleteAssetsMutation = {
    deleteAssets: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type SearchProductsQueryVariables = Exact<{
    input: SearchInput;
}>;
export declare type SearchProductsQuery = {
    search: {
        __typename?: 'SearchResponse';
    } & Pick<SearchResponse, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'SearchResult';
                } & Pick<
                    SearchResult,
                    | 'enabled'
                    | 'productId'
                    | 'productName'
                    | 'productVariantId'
                    | 'productVariantName'
                    | 'sku'
                    | 'channelIds'
                > & {
                        productAsset?: Maybe<
                            {
                                __typename?: 'SearchResultAsset';
                            } & Pick<SearchResultAsset, 'id' | 'preview'> & {
                                    focalPoint?: Maybe<
                                        {
                                            __typename?: 'Coordinate';
                                        } & Pick<Coordinate, 'x' | 'y'>
                                    >;
                                }
                        >;
                        productVariantAsset?: Maybe<
                            {
                                __typename?: 'SearchResultAsset';
                            } & Pick<SearchResultAsset, 'id' | 'preview'> & {
                                    focalPoint?: Maybe<
                                        {
                                            __typename?: 'Coordinate';
                                        } & Pick<Coordinate, 'x' | 'y'>
                                    >;
                                }
                        >;
                    }
            >;
            facetValues: Array<
                {
                    __typename?: 'FacetValueResult';
                } & Pick<FacetValueResult, 'count'> & {
                        facetValue: {
                            __typename?: 'FacetValue';
                        } & Pick<FacetValue, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
                                facet: {
                                    __typename?: 'Facet';
                                } & Pick<Facet, 'id' | 'createdAt' | 'updatedAt' | 'name'>;
                            };
                    }
            >;
        };
};
export declare type ProductSelectorSearchQueryVariables = Exact<{
    term: Scalars['String'];
    take: Scalars['Int'];
}>;
export declare type ProductSelectorSearchQuery = {
    search: {
        __typename?: 'SearchResponse';
    } & {
        items: Array<
            {
                __typename?: 'SearchResult';
            } & Pick<SearchResult, 'productVariantId' | 'productVariantName' | 'sku'> & {
                    productAsset?: Maybe<
                        {
                            __typename?: 'SearchResultAsset';
                        } & Pick<SearchResultAsset, 'id' | 'preview'> & {
                                focalPoint?: Maybe<
                                    {
                                        __typename?: 'Coordinate';
                                    } & Pick<Coordinate, 'x' | 'y'>
                                >;
                            }
                    >;
                    price:
                        | {
                              __typename?: 'PriceRange';
                          }
                        | ({
                              __typename?: 'SinglePrice';
                          } & Pick<SinglePrice, 'value'>);
                    priceWithTax:
                        | {
                              __typename?: 'PriceRange';
                          }
                        | ({
                              __typename?: 'SinglePrice';
                          } & Pick<SinglePrice, 'value'>);
                }
        >;
    };
};
export declare type UpdateProductOptionGroupMutationVariables = Exact<{
    input: UpdateProductOptionGroupInput;
}>;
export declare type UpdateProductOptionGroupMutation = {
    updateProductOptionGroup: {
        __typename?: 'ProductOptionGroup';
    } & ProductOptionGroupFragment;
};
export declare type UpdateProductOptionMutationVariables = Exact<{
    input: UpdateProductOptionInput;
}>;
export declare type UpdateProductOptionMutation = {
    updateProductOption: {
        __typename?: 'ProductOption';
    } & ProductOptionFragment;
};
export declare type DeleteProductOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteProductOptionMutation = {
    deleteProductOption: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type DeleteProductVariantMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteProductVariantMutation = {
    deleteProductVariant: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type GetProductVariantOptionsQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetProductVariantOptionsQuery = {
    product?: Maybe<
        {
            __typename?: 'Product';
        } & Pick<Product, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
                optionGroups: Array<
                    {
                        __typename?: 'ProductOptionGroup';
                    } & {
                        options: Array<
                            {
                                __typename?: 'ProductOption';
                            } & ProductOptionFragment
                        >;
                    } & ProductOptionGroupFragment
                >;
                variants: Array<
                    {
                        __typename?: 'ProductVariant';
                    } & Pick<
                        ProductVariant,
                        | 'id'
                        | 'createdAt'
                        | 'updatedAt'
                        | 'enabled'
                        | 'name'
                        | 'sku'
                        | 'price'
                        | 'stockOnHand'
                    > & {
                            options: Array<
                                {
                                    __typename?: 'ProductOption';
                                } & Pick<
                                    ProductOption,
                                    'id' | 'createdAt' | 'updatedAt' | 'name' | 'code' | 'groupId'
                                >
                            >;
                        }
                >;
            }
    >;
};
export declare type AssignProductsToChannelMutationVariables = Exact<{
    input: AssignProductsToChannelInput;
}>;
export declare type AssignProductsToChannelMutation = {
    assignProductsToChannel: Array<
        {
            __typename?: 'Product';
        } & Pick<Product, 'id'> & {
                channels: Array<
                    {
                        __typename?: 'Channel';
                    } & Pick<Channel, 'id' | 'code'>
                >;
            }
    >;
};
export declare type AssignVariantsToChannelMutationVariables = Exact<{
    input: AssignProductVariantsToChannelInput;
}>;
export declare type AssignVariantsToChannelMutation = {
    assignProductVariantsToChannel: Array<
        {
            __typename?: 'ProductVariant';
        } & Pick<ProductVariant, 'id'> & {
                channels: Array<
                    {
                        __typename?: 'Channel';
                    } & Pick<Channel, 'id' | 'code'>
                >;
            }
    >;
};
export declare type RemoveProductsFromChannelMutationVariables = Exact<{
    input: RemoveProductsFromChannelInput;
}>;
export declare type RemoveProductsFromChannelMutation = {
    removeProductsFromChannel: Array<
        {
            __typename?: 'Product';
        } & Pick<Product, 'id'> & {
                channels: Array<
                    {
                        __typename?: 'Channel';
                    } & Pick<Channel, 'id' | 'code'>
                >;
            }
    >;
};
export declare type RemoveVariantsFromChannelMutationVariables = Exact<{
    input: RemoveProductVariantsFromChannelInput;
}>;
export declare type RemoveVariantsFromChannelMutation = {
    removeProductVariantsFromChannel: Array<
        {
            __typename?: 'ProductVariant';
        } & Pick<ProductVariant, 'id'> & {
                channels: Array<
                    {
                        __typename?: 'Channel';
                    } & Pick<Channel, 'id' | 'code'>
                >;
            }
    >;
};
export declare type GetProductVariantQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetProductVariantQuery = {
    productVariant?: Maybe<
        {
            __typename?: 'ProductVariant';
        } & Pick<
            ProductVariant,
            | 'id'
            | 'name'
            | 'sku'
            | 'stockOnHand'
            | 'stockAllocated'
            | 'stockLevel'
            | 'useGlobalOutOfStockThreshold'
            | 'price'
            | 'priceWithTax'
        > & {
                featuredAsset?: Maybe<
                    {
                        __typename?: 'Asset';
                    } & Pick<Asset, 'id' | 'preview'> & {
                            focalPoint?: Maybe<
                                {
                                    __typename?: 'Coordinate';
                                } & Pick<Coordinate, 'x' | 'y'>
                            >;
                        }
                >;
                product: {
                    __typename?: 'Product';
                } & Pick<Product, 'id'> & {
                        featuredAsset?: Maybe<
                            {
                                __typename?: 'Asset';
                            } & Pick<Asset, 'id' | 'preview'> & {
                                    focalPoint?: Maybe<
                                        {
                                            __typename?: 'Coordinate';
                                        } & Pick<Coordinate, 'x' | 'y'>
                                    >;
                                }
                        >;
                    };
            }
    >;
};
export declare type GetProductVariantListSimpleQueryVariables = Exact<{
    options: ProductVariantListOptions;
    productId?: Maybe<Scalars['ID']>;
}>;
export declare type GetProductVariantListSimpleQuery = {
    productVariants: {
        __typename?: 'ProductVariantList';
    } & Pick<ProductVariantList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'ProductVariant';
                } & Pick<ProductVariant, 'id' | 'name' | 'sku'> & {
                        featuredAsset?: Maybe<
                            {
                                __typename?: 'Asset';
                            } & Pick<Asset, 'id' | 'preview'> & {
                                    focalPoint?: Maybe<
                                        {
                                            __typename?: 'Coordinate';
                                        } & Pick<Coordinate, 'x' | 'y'>
                                    >;
                                }
                        >;
                        product: {
                            __typename?: 'Product';
                        } & Pick<Product, 'id'> & {
                                featuredAsset?: Maybe<
                                    {
                                        __typename?: 'Asset';
                                    } & Pick<Asset, 'id' | 'preview'> & {
                                            focalPoint?: Maybe<
                                                {
                                                    __typename?: 'Coordinate';
                                                } & Pick<Coordinate, 'x' | 'y'>
                                            >;
                                        }
                                >;
                            };
                    }
            >;
        };
};
export declare type GetProductVariantListQueryVariables = Exact<{
    options: ProductVariantListOptions;
    productId?: Maybe<Scalars['ID']>;
}>;
export declare type GetProductVariantListQuery = {
    productVariants: {
        __typename?: 'ProductVariantList';
    } & Pick<ProductVariantList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'ProductVariant';
                } & ProductVariantFragment
            >;
        };
};
export declare type GetTagListQueryVariables = Exact<{
    options?: Maybe<TagListOptions>;
}>;
export declare type GetTagListQuery = {
    tags: {
        __typename?: 'TagList';
    } & Pick<TagList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Tag';
                } & TagFragment
            >;
        };
};
export declare type GetTagQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetTagQuery = {
    tag: {
        __typename?: 'Tag';
    } & TagFragment;
};
export declare type CreateTagMutationVariables = Exact<{
    input: CreateTagInput;
}>;
export declare type CreateTagMutation = {
    createTag: {
        __typename?: 'Tag';
    } & TagFragment;
};
export declare type UpdateTagMutationVariables = Exact<{
    input: UpdateTagInput;
}>;
export declare type UpdateTagMutation = {
    updateTag: {
        __typename?: 'Tag';
    } & TagFragment;
};
export declare type DeleteTagMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteTagMutation = {
    deleteTag: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'message' | 'result'>;
};
export declare type PromotionFragment = {
    __typename?: 'Promotion';
} & Pick<
    Promotion,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'name'
    | 'enabled'
    | 'couponCode'
    | 'perCustomerUsageLimit'
    | 'startsAt'
    | 'endsAt'
> & {
        conditions: Array<
            {
                __typename?: 'ConfigurableOperation';
            } & ConfigurableOperationFragment
        >;
        actions: Array<
            {
                __typename?: 'ConfigurableOperation';
            } & ConfigurableOperationFragment
        >;
    };
export declare type GetPromotionListQueryVariables = Exact<{
    options?: Maybe<PromotionListOptions>;
}>;
export declare type GetPromotionListQuery = {
    promotions: {
        __typename?: 'PromotionList';
    } & Pick<PromotionList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Promotion';
                } & PromotionFragment
            >;
        };
};
export declare type GetPromotionQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetPromotionQuery = {
    promotion?: Maybe<
        {
            __typename?: 'Promotion';
        } & PromotionFragment
    >;
};
export declare type GetAdjustmentOperationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetAdjustmentOperationsQuery = {
    promotionConditions: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
    promotionActions: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
};
export declare type CreatePromotionMutationVariables = Exact<{
    input: CreatePromotionInput;
}>;
export declare type CreatePromotionMutation = {
    createPromotion:
        | ({
              __typename?: 'Promotion';
          } & PromotionFragment)
        | ({
              __typename?: 'MissingConditionsError';
          } & ErrorResult_MissingConditionsError_Fragment);
};
export declare type UpdatePromotionMutationVariables = Exact<{
    input: UpdatePromotionInput;
}>;
export declare type UpdatePromotionMutation = {
    updatePromotion:
        | ({
              __typename?: 'Promotion';
          } & PromotionFragment)
        | {
              __typename?: 'MissingConditionsError';
          };
};
export declare type DeletePromotionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeletePromotionMutation = {
    deletePromotion: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type CountryFragment = {
    __typename?: 'Country';
} & Pick<Country, 'id' | 'createdAt' | 'updatedAt' | 'code' | 'name' | 'enabled'> & {
        translations: Array<
            {
                __typename?: 'CountryTranslation';
            } & Pick<CountryTranslation, 'id' | 'languageCode' | 'name'>
        >;
    };
export declare type GetCountryListQueryVariables = Exact<{
    options?: Maybe<CountryListOptions>;
}>;
export declare type GetCountryListQuery = {
    countries: {
        __typename?: 'CountryList';
    } & Pick<CountryList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Country';
                } & Pick<Country, 'id' | 'code' | 'name' | 'enabled'>
            >;
        };
};
export declare type GetAvailableCountriesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetAvailableCountriesQuery = {
    countries: {
        __typename?: 'CountryList';
    } & {
        items: Array<
            {
                __typename?: 'Country';
            } & Pick<Country, 'id' | 'code' | 'name' | 'enabled'>
        >;
    };
};
export declare type GetCountryQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetCountryQuery = {
    country?: Maybe<
        {
            __typename?: 'Country';
        } & CountryFragment
    >;
};
export declare type CreateCountryMutationVariables = Exact<{
    input: CreateCountryInput;
}>;
export declare type CreateCountryMutation = {
    createCountry: {
        __typename?: 'Country';
    } & CountryFragment;
};
export declare type UpdateCountryMutationVariables = Exact<{
    input: UpdateCountryInput;
}>;
export declare type UpdateCountryMutation = {
    updateCountry: {
        __typename?: 'Country';
    } & CountryFragment;
};
export declare type DeleteCountryMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCountryMutation = {
    deleteCountry: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type ZoneFragment = {
    __typename?: 'Zone';
} & Pick<Zone, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        members: Array<
            {
                __typename?: 'Country';
            } & CountryFragment
        >;
    };
export declare type GetZonesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetZonesQuery = {
    zones: Array<
        {
            __typename?: 'Zone';
        } & {
            members: Array<
                {
                    __typename?: 'Country';
                } & Pick<Country, 'createdAt' | 'updatedAt' | 'id' | 'name' | 'code' | 'enabled'>
            >;
        } & ZoneFragment
    >;
};
export declare type GetZoneQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetZoneQuery = {
    zone?: Maybe<
        {
            __typename?: 'Zone';
        } & ZoneFragment
    >;
};
export declare type CreateZoneMutationVariables = Exact<{
    input: CreateZoneInput;
}>;
export declare type CreateZoneMutation = {
    createZone: {
        __typename?: 'Zone';
    } & ZoneFragment;
};
export declare type UpdateZoneMutationVariables = Exact<{
    input: UpdateZoneInput;
}>;
export declare type UpdateZoneMutation = {
    updateZone: {
        __typename?: 'Zone';
    } & ZoneFragment;
};
export declare type DeleteZoneMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteZoneMutation = {
    deleteZone: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'message' | 'result'>;
};
export declare type AddMembersToZoneMutationVariables = Exact<{
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type AddMembersToZoneMutation = {
    addMembersToZone: {
        __typename?: 'Zone';
    } & ZoneFragment;
};
export declare type RemoveMembersFromZoneMutationVariables = Exact<{
    zoneId: Scalars['ID'];
    memberIds: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type RemoveMembersFromZoneMutation = {
    removeMembersFromZone: {
        __typename?: 'Zone';
    } & ZoneFragment;
};
export declare type TaxCategoryFragment = {
    __typename?: 'TaxCategory';
} & Pick<TaxCategory, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'isDefault'>;
export declare type GetTaxCategoriesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetTaxCategoriesQuery = {
    taxCategories: Array<
        {
            __typename?: 'TaxCategory';
        } & TaxCategoryFragment
    >;
};
export declare type GetTaxCategoryQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetTaxCategoryQuery = {
    taxCategory?: Maybe<
        {
            __typename?: 'TaxCategory';
        } & TaxCategoryFragment
    >;
};
export declare type CreateTaxCategoryMutationVariables = Exact<{
    input: CreateTaxCategoryInput;
}>;
export declare type CreateTaxCategoryMutation = {
    createTaxCategory: {
        __typename?: 'TaxCategory';
    } & TaxCategoryFragment;
};
export declare type UpdateTaxCategoryMutationVariables = Exact<{
    input: UpdateTaxCategoryInput;
}>;
export declare type UpdateTaxCategoryMutation = {
    updateTaxCategory: {
        __typename?: 'TaxCategory';
    } & TaxCategoryFragment;
};
export declare type DeleteTaxCategoryMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteTaxCategoryMutation = {
    deleteTaxCategory: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type TaxRateFragment = {
    __typename?: 'TaxRate';
} & Pick<TaxRate, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'enabled' | 'value'> & {
        category: {
            __typename?: 'TaxCategory';
        } & Pick<TaxCategory, 'id' | 'name'>;
        zone: {
            __typename?: 'Zone';
        } & Pick<Zone, 'id' | 'name'>;
        customerGroup?: Maybe<
            {
                __typename?: 'CustomerGroup';
            } & Pick<CustomerGroup, 'id' | 'name'>
        >;
    };
export declare type GetTaxRateListQueryVariables = Exact<{
    options?: Maybe<TaxRateListOptions>;
}>;
export declare type GetTaxRateListQuery = {
    taxRates: {
        __typename?: 'TaxRateList';
    } & Pick<TaxRateList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'TaxRate';
                } & TaxRateFragment
            >;
        };
};
export declare type GetTaxRateListSimpleQueryVariables = Exact<{
    options?: Maybe<TaxRateListOptions>;
}>;
export declare type GetTaxRateListSimpleQuery = {
    taxRates: {
        __typename?: 'TaxRateList';
    } & Pick<TaxRateList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'TaxRate';
                } & Pick<TaxRate, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'enabled' | 'value'> & {
                        category: {
                            __typename?: 'TaxCategory';
                        } & Pick<TaxCategory, 'id' | 'name'>;
                        zone: {
                            __typename?: 'Zone';
                        } & Pick<Zone, 'id' | 'name'>;
                    }
            >;
        };
};
export declare type GetTaxRateQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetTaxRateQuery = {
    taxRate?: Maybe<
        {
            __typename?: 'TaxRate';
        } & TaxRateFragment
    >;
};
export declare type CreateTaxRateMutationVariables = Exact<{
    input: CreateTaxRateInput;
}>;
export declare type CreateTaxRateMutation = {
    createTaxRate: {
        __typename?: 'TaxRate';
    } & TaxRateFragment;
};
export declare type UpdateTaxRateMutationVariables = Exact<{
    input: UpdateTaxRateInput;
}>;
export declare type UpdateTaxRateMutation = {
    updateTaxRate: {
        __typename?: 'TaxRate';
    } & TaxRateFragment;
};
export declare type DeleteTaxRateMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteTaxRateMutation = {
    deleteTaxRate: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type ChannelFragment = {
    __typename?: 'Channel';
} & Pick<
    Channel,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'code'
    | 'token'
    | 'pricesIncludeTax'
    | 'currencyCode'
    | 'defaultLanguageCode'
> & {
        defaultShippingZone?: Maybe<
            {
                __typename?: 'Zone';
            } & Pick<Zone, 'id' | 'name'>
        >;
        defaultTaxZone?: Maybe<
            {
                __typename?: 'Zone';
            } & Pick<Zone, 'id' | 'name'>
        >;
        customFields?: Maybe<
            {
                __typename?: 'ChannelCustomFields';
            } & Pick<ChannelCustomFields, 'isOpen'>
        >;
    };
export declare type GetChannelsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetChannelsQuery = {
    channels: Array<
        {
            __typename?: 'Channel';
        } & ChannelFragment
    >;
};
export declare type GetChannelQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetChannelQuery = {
    channel?: Maybe<
        {
            __typename?: 'Channel';
        } & ChannelFragment
    >;
};
export declare type GetActiveChannelQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetActiveChannelQuery = {
    activeChannel: {
        __typename?: 'Channel';
    } & ChannelFragment;
};
export declare type CreateChannelMutationVariables = Exact<{
    input: CreateChannelInput;
}>;
export declare type CreateChannelMutation = {
    createChannel:
        | ({
              __typename?: 'Channel';
          } & ChannelFragment)
        | ({
              __typename?: 'LanguageNotAvailableError';
          } & ErrorResult_LanguageNotAvailableError_Fragment);
};
export declare type UpdateChannelMutationVariables = Exact<{
    input: UpdateChannelInput;
}>;
export declare type UpdateChannelMutation = {
    updateChannel:
        | ({
              __typename?: 'Channel';
          } & ChannelFragment)
        | ({
              __typename?: 'LanguageNotAvailableError';
          } & ErrorResult_LanguageNotAvailableError_Fragment);
};
export declare type DeleteChannelMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteChannelMutation = {
    deleteChannel: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type PaymentMethodFragment = {
    __typename?: 'PaymentMethod';
} & Pick<PaymentMethod, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'code' | 'description' | 'enabled'> & {
        checker?: Maybe<
            {
                __typename?: 'ConfigurableOperation';
            } & ConfigurableOperationFragment
        >;
        handler: {
            __typename?: 'ConfigurableOperation';
        } & ConfigurableOperationFragment;
    };
export declare type GetPaymentMethodListQueryVariables = Exact<{
    options: PaymentMethodListOptions;
}>;
export declare type GetPaymentMethodListQuery = {
    paymentMethods: {
        __typename?: 'PaymentMethodList';
    } & Pick<PaymentMethodList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'PaymentMethod';
                } & PaymentMethodFragment
            >;
        };
};
export declare type GetPaymentMethodOperationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPaymentMethodOperationsQuery = {
    paymentMethodEligibilityCheckers: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
    paymentMethodHandlers: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
};
export declare type GetPaymentMethodQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetPaymentMethodQuery = {
    paymentMethod?: Maybe<
        {
            __typename?: 'PaymentMethod';
        } & PaymentMethodFragment
    >;
};
export declare type CreatePaymentMethodMutationVariables = Exact<{
    input: CreatePaymentMethodInput;
}>;
export declare type CreatePaymentMethodMutation = {
    createPaymentMethod: {
        __typename?: 'PaymentMethod';
    } & PaymentMethodFragment;
};
export declare type UpdatePaymentMethodMutationVariables = Exact<{
    input: UpdatePaymentMethodInput;
}>;
export declare type UpdatePaymentMethodMutation = {
    updatePaymentMethod: {
        __typename?: 'PaymentMethod';
    } & PaymentMethodFragment;
};
export declare type DeletePaymentMethodMutationVariables = Exact<{
    id: Scalars['ID'];
    force?: Maybe<Scalars['Boolean']>;
}>;
export declare type DeletePaymentMethodMutation = {
    deletePaymentMethod: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type GlobalSettingsFragment = {
    __typename?: 'GlobalSettings';
} & Pick<GlobalSettings, 'id' | 'availableLanguages' | 'trackInventory' | 'outOfStockThreshold'> & {
        serverConfig: {
            __typename?: 'ServerConfig';
        } & {
            permissions: Array<
                {
                    __typename?: 'PermissionDefinition';
                } & Pick<PermissionDefinition, 'name' | 'description' | 'assignable'>
            >;
            orderProcess: Array<
                {
                    __typename?: 'OrderProcessState';
                } & Pick<OrderProcessState, 'name'>
            >;
        };
    };
export declare type GetGlobalSettingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetGlobalSettingsQuery = {
    globalSettings: {
        __typename?: 'GlobalSettings';
    } & GlobalSettingsFragment;
};
export declare type UpdateGlobalSettingsMutationVariables = Exact<{
    input: UpdateGlobalSettingsInput;
}>;
export declare type UpdateGlobalSettingsMutation = {
    updateGlobalSettings:
        | ({
              __typename?: 'GlobalSettings';
          } & GlobalSettingsFragment)
        | ({
              __typename?: 'ChannelDefaultLanguageError';
          } & ErrorResult_ChannelDefaultLanguageError_Fragment);
};
declare type CustomFieldConfig_BooleanCustomFieldConfig_Fragment = {
    __typename?: 'BooleanCustomFieldConfig';
} & Pick<BooleanCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_DateTimeCustomFieldConfig_Fragment = {
    __typename?: 'DateTimeCustomFieldConfig';
} & Pick<DateTimeCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_FloatCustomFieldConfig_Fragment = {
    __typename?: 'FloatCustomFieldConfig';
} & Pick<FloatCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_IntCustomFieldConfig_Fragment = {
    __typename?: 'IntCustomFieldConfig';
} & Pick<IntCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_LocaleStringCustomFieldConfig_Fragment = {
    __typename?: 'LocaleStringCustomFieldConfig';
} & Pick<LocaleStringCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_RelationCustomFieldConfig_Fragment = {
    __typename?: 'RelationCustomFieldConfig';
} & Pick<RelationCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_StringCustomFieldConfig_Fragment = {
    __typename?: 'StringCustomFieldConfig';
} & Pick<StringCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
declare type CustomFieldConfig_TextCustomFieldConfig_Fragment = {
    __typename?: 'TextCustomFieldConfig';
} & Pick<TextCustomFieldConfig, 'name' | 'type' | 'list' | 'readonly' | 'nullable' | 'ui'> & {
        description?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
        label?: Maybe<
            Array<
                {
                    __typename?: 'LocalizedString';
                } & Pick<LocalizedString, 'languageCode' | 'value'>
            >
        >;
    };
export declare type CustomFieldConfigFragment =
    | CustomFieldConfig_BooleanCustomFieldConfig_Fragment
    | CustomFieldConfig_DateTimeCustomFieldConfig_Fragment
    | CustomFieldConfig_FloatCustomFieldConfig_Fragment
    | CustomFieldConfig_IntCustomFieldConfig_Fragment
    | CustomFieldConfig_LocaleStringCustomFieldConfig_Fragment
    | CustomFieldConfig_RelationCustomFieldConfig_Fragment
    | CustomFieldConfig_StringCustomFieldConfig_Fragment
    | CustomFieldConfig_TextCustomFieldConfig_Fragment;
export declare type StringCustomFieldFragment = {
    __typename?: 'StringCustomFieldConfig';
} & Pick<StringCustomFieldConfig, 'pattern'> & {
        options?: Maybe<
            Array<
                {
                    __typename?: 'StringFieldOption';
                } & Pick<StringFieldOption, 'value'> & {
                        label?: Maybe<
                            Array<
                                {
                                    __typename?: 'LocalizedString';
                                } & Pick<LocalizedString, 'languageCode' | 'value'>
                            >
                        >;
                    }
            >
        >;
    } & CustomFieldConfig_StringCustomFieldConfig_Fragment;
export declare type LocaleStringCustomFieldFragment = {
    __typename?: 'LocaleStringCustomFieldConfig';
} & Pick<LocaleStringCustomFieldConfig, 'pattern'> &
    CustomFieldConfig_LocaleStringCustomFieldConfig_Fragment;
export declare type TextCustomFieldFragment = {
    __typename?: 'TextCustomFieldConfig';
} & CustomFieldConfig_TextCustomFieldConfig_Fragment;
export declare type BooleanCustomFieldFragment = {
    __typename?: 'BooleanCustomFieldConfig';
} & CustomFieldConfig_BooleanCustomFieldConfig_Fragment;
export declare type IntCustomFieldFragment = {
    __typename?: 'IntCustomFieldConfig';
} & {
    intMin: IntCustomFieldConfig['min'];
    intMax: IntCustomFieldConfig['max'];
    intStep: IntCustomFieldConfig['step'];
} & CustomFieldConfig_IntCustomFieldConfig_Fragment;
export declare type FloatCustomFieldFragment = {
    __typename?: 'FloatCustomFieldConfig';
} & {
    floatMin: FloatCustomFieldConfig['min'];
    floatMax: FloatCustomFieldConfig['max'];
    floatStep: FloatCustomFieldConfig['step'];
} & CustomFieldConfig_FloatCustomFieldConfig_Fragment;
export declare type DateTimeCustomFieldFragment = {
    __typename?: 'DateTimeCustomFieldConfig';
} & {
    datetimeMin: DateTimeCustomFieldConfig['min'];
    datetimeMax: DateTimeCustomFieldConfig['max'];
    datetimeStep: DateTimeCustomFieldConfig['step'];
} & CustomFieldConfig_DateTimeCustomFieldConfig_Fragment;
export declare type RelationCustomFieldFragment = {
    __typename?: 'RelationCustomFieldConfig';
} & Pick<RelationCustomFieldConfig, 'entity' | 'scalarFields'> &
    CustomFieldConfig_RelationCustomFieldConfig_Fragment;
declare type CustomFields_BooleanCustomFieldConfig_Fragment = {
    __typename?: 'BooleanCustomFieldConfig';
} & BooleanCustomFieldFragment;
declare type CustomFields_DateTimeCustomFieldConfig_Fragment = {
    __typename?: 'DateTimeCustomFieldConfig';
} & DateTimeCustomFieldFragment;
declare type CustomFields_FloatCustomFieldConfig_Fragment = {
    __typename?: 'FloatCustomFieldConfig';
} & FloatCustomFieldFragment;
declare type CustomFields_IntCustomFieldConfig_Fragment = {
    __typename?: 'IntCustomFieldConfig';
} & IntCustomFieldFragment;
declare type CustomFields_LocaleStringCustomFieldConfig_Fragment = {
    __typename?: 'LocaleStringCustomFieldConfig';
} & LocaleStringCustomFieldFragment;
declare type CustomFields_RelationCustomFieldConfig_Fragment = {
    __typename?: 'RelationCustomFieldConfig';
} & RelationCustomFieldFragment;
declare type CustomFields_StringCustomFieldConfig_Fragment = {
    __typename?: 'StringCustomFieldConfig';
} & StringCustomFieldFragment;
declare type CustomFields_TextCustomFieldConfig_Fragment = {
    __typename?: 'TextCustomFieldConfig';
} & TextCustomFieldFragment;
export declare type CustomFieldsFragment =
    | CustomFields_BooleanCustomFieldConfig_Fragment
    | CustomFields_DateTimeCustomFieldConfig_Fragment
    | CustomFields_FloatCustomFieldConfig_Fragment
    | CustomFields_IntCustomFieldConfig_Fragment
    | CustomFields_LocaleStringCustomFieldConfig_Fragment
    | CustomFields_RelationCustomFieldConfig_Fragment
    | CustomFields_StringCustomFieldConfig_Fragment
    | CustomFields_TextCustomFieldConfig_Fragment;
export declare type GetServerConfigQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetServerConfigQuery = {
    globalSettings: {
        __typename?: 'GlobalSettings';
    } & Pick<GlobalSettings, 'id'> & {
            serverConfig: {
                __typename?: 'ServerConfig';
            } & Pick<ServerConfig, 'permittedAssetTypes'> & {
                    orderProcess: Array<
                        {
                            __typename?: 'OrderProcessState';
                        } & Pick<OrderProcessState, 'name' | 'to'>
                    >;
                    permissions: Array<
                        {
                            __typename?: 'PermissionDefinition';
                        } & Pick<PermissionDefinition, 'name' | 'description' | 'assignable'>
                    >;
                    customFieldConfig: {
                        __typename?: 'CustomFields';
                    } & {
                        Address: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Administrator: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Asset: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Channel: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Collection: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Country: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Customer: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        CustomerGroup: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Facet: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        FacetValue: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Fulfillment: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        GlobalSettings: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Order: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        OrderLine: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        PaymentMethod: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Product: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        ProductOption: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        ProductOptionGroup: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        ProductVariant: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Promotion: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        ShippingMethod: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        TaxCategory: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        TaxRate: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        User: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                        Zone: Array<
                            | ({
                                  __typename?: 'StringCustomFieldConfig';
                              } & CustomFields_StringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'LocaleStringCustomFieldConfig';
                              } & CustomFields_LocaleStringCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'IntCustomFieldConfig';
                              } & CustomFields_IntCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'FloatCustomFieldConfig';
                              } & CustomFields_FloatCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'BooleanCustomFieldConfig';
                              } & CustomFields_BooleanCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'DateTimeCustomFieldConfig';
                              } & CustomFields_DateTimeCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'RelationCustomFieldConfig';
                              } & CustomFields_RelationCustomFieldConfig_Fragment)
                            | ({
                                  __typename?: 'TextCustomFieldConfig';
                              } & CustomFields_TextCustomFieldConfig_Fragment)
                        >;
                    };
                };
        };
};
export declare type JobInfoFragment = {
    __typename?: 'Job';
} & Pick<
    Job,
    | 'id'
    | 'createdAt'
    | 'startedAt'
    | 'settledAt'
    | 'queueName'
    | 'state'
    | 'isSettled'
    | 'progress'
    | 'duration'
    | 'data'
    | 'result'
    | 'error'
    | 'retries'
    | 'attempts'
>;
export declare type GetJobInfoQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetJobInfoQuery = {
    job?: Maybe<
        {
            __typename?: 'Job';
        } & JobInfoFragment
    >;
};
export declare type GetAllJobsQueryVariables = Exact<{
    options?: Maybe<JobListOptions>;
}>;
export declare type GetAllJobsQuery = {
    jobs: {
        __typename?: 'JobList';
    } & Pick<JobList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'Job';
                } & JobInfoFragment
            >;
        };
};
export declare type GetJobsByIdQueryVariables = Exact<{
    ids: Array<Scalars['ID']> | Scalars['ID'];
}>;
export declare type GetJobsByIdQuery = {
    jobsById: Array<
        {
            __typename?: 'Job';
        } & JobInfoFragment
    >;
};
export declare type GetJobQueueListQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetJobQueueListQuery = {
    jobQueues: Array<
        {
            __typename?: 'JobQueue';
        } & Pick<JobQueue, 'name' | 'running'>
    >;
};
export declare type CancelJobMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type CancelJobMutation = {
    cancelJob: {
        __typename?: 'Job';
    } & JobInfoFragment;
};
export declare type ReindexMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type ReindexMutation = {
    reindex: {
        __typename?: 'Job';
    } & JobInfoFragment;
};
export declare type GetPendingSearchIndexUpdatesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPendingSearchIndexUpdatesQuery = Pick<Query, 'pendingSearchIndexUpdates'>;
export declare type RunPendingSearchIndexUpdatesMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type RunPendingSearchIndexUpdatesMutation = {
    runPendingSearchIndexUpdates: {
        __typename?: 'Success';
    } & Pick<Success, 'success'>;
};
export declare type ConfigurableOperationFragment = {
    __typename?: 'ConfigurableOperation';
} & Pick<ConfigurableOperation, 'code'> & {
        args: Array<
            {
                __typename?: 'ConfigArg';
            } & Pick<ConfigArg, 'name' | 'value'>
        >;
    };
export declare type ConfigurableOperationDefFragment = {
    __typename?: 'ConfigurableOperationDefinition';
} & Pick<ConfigurableOperationDefinition, 'code' | 'description'> & {
        args: Array<
            {
                __typename?: 'ConfigArgDefinition';
            } & Pick<
                ConfigArgDefinition,
                'name' | 'type' | 'required' | 'defaultValue' | 'list' | 'ui' | 'label' | 'description'
            >
        >;
    };
declare type ErrorResult_AlreadyRefundedError_Fragment = {
    __typename?: 'AlreadyRefundedError';
} & Pick<AlreadyRefundedError, 'errorCode' | 'message'>;
declare type ErrorResult_CancelActiveOrderError_Fragment = {
    __typename?: 'CancelActiveOrderError';
} & Pick<CancelActiveOrderError, 'errorCode' | 'message'>;
declare type ErrorResult_CancelPaymentError_Fragment = {
    __typename?: 'CancelPaymentError';
} & Pick<CancelPaymentError, 'errorCode' | 'message'>;
declare type ErrorResult_ChannelDefaultLanguageError_Fragment = {
    __typename?: 'ChannelDefaultLanguageError';
} & Pick<ChannelDefaultLanguageError, 'errorCode' | 'message'>;
declare type ErrorResult_CouponCodeExpiredError_Fragment = {
    __typename?: 'CouponCodeExpiredError';
} & Pick<CouponCodeExpiredError, 'errorCode' | 'message'>;
declare type ErrorResult_CouponCodeInvalidError_Fragment = {
    __typename?: 'CouponCodeInvalidError';
} & Pick<CouponCodeInvalidError, 'errorCode' | 'message'>;
declare type ErrorResult_CouponCodeLimitError_Fragment = {
    __typename?: 'CouponCodeLimitError';
} & Pick<CouponCodeLimitError, 'errorCode' | 'message'>;
declare type ErrorResult_CreateFulfillmentError_Fragment = {
    __typename?: 'CreateFulfillmentError';
} & Pick<CreateFulfillmentError, 'errorCode' | 'message'>;
declare type ErrorResult_EmailAddressConflictError_Fragment = {
    __typename?: 'EmailAddressConflictError';
} & Pick<EmailAddressConflictError, 'errorCode' | 'message'>;
declare type ErrorResult_EmptyOrderLineSelectionError_Fragment = {
    __typename?: 'EmptyOrderLineSelectionError';
} & Pick<EmptyOrderLineSelectionError, 'errorCode' | 'message'>;
declare type ErrorResult_FacetInUseError_Fragment = {
    __typename?: 'FacetInUseError';
} & Pick<FacetInUseError, 'errorCode' | 'message'>;
declare type ErrorResult_FulfillmentStateTransitionError_Fragment = {
    __typename?: 'FulfillmentStateTransitionError';
} & Pick<FulfillmentStateTransitionError, 'errorCode' | 'message'>;
declare type ErrorResult_IneligibleShippingMethodError_Fragment = {
    __typename?: 'IneligibleShippingMethodError';
} & Pick<IneligibleShippingMethodError, 'errorCode' | 'message'>;
declare type ErrorResult_InsufficientStockError_Fragment = {
    __typename?: 'InsufficientStockError';
} & Pick<InsufficientStockError, 'errorCode' | 'message'>;
declare type ErrorResult_InsufficientStockOnHandError_Fragment = {
    __typename?: 'InsufficientStockOnHandError';
} & Pick<InsufficientStockOnHandError, 'errorCode' | 'message'>;
declare type ErrorResult_InvalidCredentialsError_Fragment = {
    __typename?: 'InvalidCredentialsError';
} & Pick<InvalidCredentialsError, 'errorCode' | 'message'>;
declare type ErrorResult_InvalidFulfillmentHandlerError_Fragment = {
    __typename?: 'InvalidFulfillmentHandlerError';
} & Pick<InvalidFulfillmentHandlerError, 'errorCode' | 'message'>;
declare type ErrorResult_ItemsAlreadyFulfilledError_Fragment = {
    __typename?: 'ItemsAlreadyFulfilledError';
} & Pick<ItemsAlreadyFulfilledError, 'errorCode' | 'message'>;
declare type ErrorResult_LanguageNotAvailableError_Fragment = {
    __typename?: 'LanguageNotAvailableError';
} & Pick<LanguageNotAvailableError, 'errorCode' | 'message'>;
declare type ErrorResult_ManualPaymentStateError_Fragment = {
    __typename?: 'ManualPaymentStateError';
} & Pick<ManualPaymentStateError, 'errorCode' | 'message'>;
declare type ErrorResult_MimeTypeError_Fragment = {
    __typename?: 'MimeTypeError';
} & Pick<MimeTypeError, 'errorCode' | 'message'>;
declare type ErrorResult_MissingConditionsError_Fragment = {
    __typename?: 'MissingConditionsError';
} & Pick<MissingConditionsError, 'errorCode' | 'message'>;
declare type ErrorResult_MultipleOrderError_Fragment = {
    __typename?: 'MultipleOrderError';
} & Pick<MultipleOrderError, 'errorCode' | 'message'>;
declare type ErrorResult_NativeAuthStrategyError_Fragment = {
    __typename?: 'NativeAuthStrategyError';
} & Pick<NativeAuthStrategyError, 'errorCode' | 'message'>;
declare type ErrorResult_NegativeQuantityError_Fragment = {
    __typename?: 'NegativeQuantityError';
} & Pick<NegativeQuantityError, 'errorCode' | 'message'>;
declare type ErrorResult_NoActiveOrderError_Fragment = {
    __typename?: 'NoActiveOrderError';
} & Pick<NoActiveOrderError, 'errorCode' | 'message'>;
declare type ErrorResult_NoChangesSpecifiedError_Fragment = {
    __typename?: 'NoChangesSpecifiedError';
} & Pick<NoChangesSpecifiedError, 'errorCode' | 'message'>;
declare type ErrorResult_NothingToRefundError_Fragment = {
    __typename?: 'NothingToRefundError';
} & Pick<NothingToRefundError, 'errorCode' | 'message'>;
declare type ErrorResult_OrderLimitError_Fragment = {
    __typename?: 'OrderLimitError';
} & Pick<OrderLimitError, 'errorCode' | 'message'>;
declare type ErrorResult_OrderModificationError_Fragment = {
    __typename?: 'OrderModificationError';
} & Pick<OrderModificationError, 'errorCode' | 'message'>;
declare type ErrorResult_OrderModificationStateError_Fragment = {
    __typename?: 'OrderModificationStateError';
} & Pick<OrderModificationStateError, 'errorCode' | 'message'>;
declare type ErrorResult_OrderStateTransitionError_Fragment = {
    __typename?: 'OrderStateTransitionError';
} & Pick<OrderStateTransitionError, 'errorCode' | 'message'>;
declare type ErrorResult_PaymentMethodMissingError_Fragment = {
    __typename?: 'PaymentMethodMissingError';
} & Pick<PaymentMethodMissingError, 'errorCode' | 'message'>;
declare type ErrorResult_PaymentOrderMismatchError_Fragment = {
    __typename?: 'PaymentOrderMismatchError';
} & Pick<PaymentOrderMismatchError, 'errorCode' | 'message'>;
declare type ErrorResult_PaymentStateTransitionError_Fragment = {
    __typename?: 'PaymentStateTransitionError';
} & Pick<PaymentStateTransitionError, 'errorCode' | 'message'>;
declare type ErrorResult_ProductOptionInUseError_Fragment = {
    __typename?: 'ProductOptionInUseError';
} & Pick<ProductOptionInUseError, 'errorCode' | 'message'>;
declare type ErrorResult_QuantityTooGreatError_Fragment = {
    __typename?: 'QuantityTooGreatError';
} & Pick<QuantityTooGreatError, 'errorCode' | 'message'>;
declare type ErrorResult_RefundOrderStateError_Fragment = {
    __typename?: 'RefundOrderStateError';
} & Pick<RefundOrderStateError, 'errorCode' | 'message'>;
declare type ErrorResult_RefundPaymentIdMissingError_Fragment = {
    __typename?: 'RefundPaymentIdMissingError';
} & Pick<RefundPaymentIdMissingError, 'errorCode' | 'message'>;
declare type ErrorResult_RefundStateTransitionError_Fragment = {
    __typename?: 'RefundStateTransitionError';
} & Pick<RefundStateTransitionError, 'errorCode' | 'message'>;
declare type ErrorResult_SettlePaymentError_Fragment = {
    __typename?: 'SettlePaymentError';
} & Pick<SettlePaymentError, 'errorCode' | 'message'>;
declare type ErrorResult_ShopClosedError_Fragment = {
    __typename?: 'ShopClosedError';
} & Pick<ShopClosedError, 'errorCode' | 'message'>;
export declare type ErrorResultFragment =
    | ErrorResult_AlreadyRefundedError_Fragment
    | ErrorResult_CancelActiveOrderError_Fragment
    | ErrorResult_CancelPaymentError_Fragment
    | ErrorResult_ChannelDefaultLanguageError_Fragment
    | ErrorResult_CouponCodeExpiredError_Fragment
    | ErrorResult_CouponCodeInvalidError_Fragment
    | ErrorResult_CouponCodeLimitError_Fragment
    | ErrorResult_CreateFulfillmentError_Fragment
    | ErrorResult_EmailAddressConflictError_Fragment
    | ErrorResult_EmptyOrderLineSelectionError_Fragment
    | ErrorResult_FacetInUseError_Fragment
    | ErrorResult_FulfillmentStateTransitionError_Fragment
    | ErrorResult_IneligibleShippingMethodError_Fragment
    | ErrorResult_InsufficientStockError_Fragment
    | ErrorResult_InsufficientStockOnHandError_Fragment
    | ErrorResult_InvalidCredentialsError_Fragment
    | ErrorResult_InvalidFulfillmentHandlerError_Fragment
    | ErrorResult_ItemsAlreadyFulfilledError_Fragment
    | ErrorResult_LanguageNotAvailableError_Fragment
    | ErrorResult_ManualPaymentStateError_Fragment
    | ErrorResult_MimeTypeError_Fragment
    | ErrorResult_MissingConditionsError_Fragment
    | ErrorResult_MultipleOrderError_Fragment
    | ErrorResult_NativeAuthStrategyError_Fragment
    | ErrorResult_NegativeQuantityError_Fragment
    | ErrorResult_NoActiveOrderError_Fragment
    | ErrorResult_NoChangesSpecifiedError_Fragment
    | ErrorResult_NothingToRefundError_Fragment
    | ErrorResult_OrderLimitError_Fragment
    | ErrorResult_OrderModificationError_Fragment
    | ErrorResult_OrderModificationStateError_Fragment
    | ErrorResult_OrderStateTransitionError_Fragment
    | ErrorResult_PaymentMethodMissingError_Fragment
    | ErrorResult_PaymentOrderMismatchError_Fragment
    | ErrorResult_PaymentStateTransitionError_Fragment
    | ErrorResult_ProductOptionInUseError_Fragment
    | ErrorResult_QuantityTooGreatError_Fragment
    | ErrorResult_RefundOrderStateError_Fragment
    | ErrorResult_RefundPaymentIdMissingError_Fragment
    | ErrorResult_RefundStateTransitionError_Fragment
    | ErrorResult_SettlePaymentError_Fragment
    | ErrorResult_ShopClosedError_Fragment;
export declare type ShippingMethodFragment = {
    __typename?: 'ShippingMethod';
} & Pick<
    ShippingMethod,
    'id' | 'createdAt' | 'updatedAt' | 'code' | 'name' | 'description' | 'fulfillmentHandlerCode'
> & {
        checker: {
            __typename?: 'ConfigurableOperation';
        } & ConfigurableOperationFragment;
        calculator: {
            __typename?: 'ConfigurableOperation';
        } & ConfigurableOperationFragment;
        translations: Array<
            {
                __typename?: 'ShippingMethodTranslation';
            } & Pick<ShippingMethodTranslation, 'id' | 'languageCode' | 'name' | 'description'>
        >;
    };
export declare type GetShippingMethodListQueryVariables = Exact<{
    options?: Maybe<ShippingMethodListOptions>;
}>;
export declare type GetShippingMethodListQuery = {
    shippingMethods: {
        __typename?: 'ShippingMethodList';
    } & Pick<ShippingMethodList, 'totalItems'> & {
            items: Array<
                {
                    __typename?: 'ShippingMethod';
                } & ShippingMethodFragment
            >;
        };
};
export declare type GetShippingMethodQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetShippingMethodQuery = {
    shippingMethod?: Maybe<
        {
            __typename?: 'ShippingMethod';
        } & ShippingMethodFragment
    >;
};
export declare type GetShippingMethodOperationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetShippingMethodOperationsQuery = {
    shippingEligibilityCheckers: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
    shippingCalculators: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
    fulfillmentHandlers: Array<
        {
            __typename?: 'ConfigurableOperationDefinition';
        } & ConfigurableOperationDefFragment
    >;
};
export declare type CreateShippingMethodMutationVariables = Exact<{
    input: CreateShippingMethodInput;
}>;
export declare type CreateShippingMethodMutation = {
    createShippingMethod: {
        __typename?: 'ShippingMethod';
    } & ShippingMethodFragment;
};
export declare type UpdateShippingMethodMutationVariables = Exact<{
    input: UpdateShippingMethodInput;
}>;
export declare type UpdateShippingMethodMutation = {
    updateShippingMethod: {
        __typename?: 'ShippingMethod';
    } & ShippingMethodFragment;
};
export declare type DeleteShippingMethodMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteShippingMethodMutation = {
    deleteShippingMethod: {
        __typename?: 'DeletionResponse';
    } & Pick<DeletionResponse, 'result' | 'message'>;
};
export declare type TestShippingMethodQueryVariables = Exact<{
    input: TestShippingMethodInput;
}>;
export declare type TestShippingMethodQuery = {
    testShippingMethod: {
        __typename?: 'TestShippingMethodResult';
    } & Pick<TestShippingMethodResult, 'eligible'> & {
            quote?: Maybe<
                {
                    __typename?: 'TestShippingMethodQuote';
                } & Pick<TestShippingMethodQuote, 'price' | 'priceWithTax' | 'metadata'>
            >;
        };
};
export declare type TestEligibleShippingMethodsQueryVariables = Exact<{
    input: TestEligibleShippingMethodsInput;
}>;
export declare type TestEligibleShippingMethodsQuery = {
    testEligibleShippingMethods: Array<
        {
            __typename?: 'ShippingMethodQuote';
        } & Pick<
            ShippingMethodQuote,
            'id' | 'name' | 'code' | 'description' | 'price' | 'priceWithTax' | 'metadata'
        >
    >;
};
export declare type GetCustomerAddressesQueryVariables = Exact<{
    customerId: Scalars['ID'];
}>;
export declare type GetCustomerAddressesQuery = {
    customer?: Maybe<
        {
            __typename?: 'Customer';
        } & Pick<Customer, 'id'> & {
                addresses?: Maybe<
                    Array<
                        {
                            __typename?: 'Address';
                        } & AddressFragment
                    >
                >;
            }
    >;
};
declare type DiscriminateUnion<T, U> = T extends U ? T : never;
export declare namespace GetProductsWithFacetValuesByIds {
    type Variables = GetProductsWithFacetValuesByIdsQueryVariables;
    type Query = GetProductsWithFacetValuesByIdsQuery;
    type Products = NonNullable<GetProductsWithFacetValuesByIdsQuery['products']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetProductsWithFacetValuesByIdsQuery['products']>['items']>[number]
    >;
    type FacetValues = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetProductsWithFacetValuesByIdsQuery['products']>['items']>[number]
            >['facetValues']
        >[number]
    >;
    type Facet = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<
                        NonNullable<GetProductsWithFacetValuesByIdsQuery['products']>['items']
                    >[number]
                >['facetValues']
            >[number]
        >['facet']
    >;
}
export declare namespace GetVariantsWithFacetValuesByIds {
    type Variables = GetVariantsWithFacetValuesByIdsQueryVariables;
    type Query = GetVariantsWithFacetValuesByIdsQuery;
    type ProductVariants = NonNullable<GetVariantsWithFacetValuesByIdsQuery['productVariants']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetVariantsWithFacetValuesByIdsQuery['productVariants']>['items']>[number]
    >;
    type FacetValues = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetVariantsWithFacetValuesByIdsQuery['productVariants']>['items']
                >[number]
            >['facetValues']
        >[number]
    >;
    type Facet = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<
                        NonNullable<GetVariantsWithFacetValuesByIdsQuery['productVariants']>['items']
                    >[number]
                >['facetValues']
            >[number]
        >['facet']
    >;
}
export declare namespace UpdateProductsBulk {
    type Variables = UpdateProductsBulkMutationVariables;
    type Mutation = UpdateProductsBulkMutation;
    type UpdateProducts = NonNullable<NonNullable<UpdateProductsBulkMutation['updateProducts']>[number]>;
    type FacetValues = NonNullable<
        NonNullable<
            NonNullable<NonNullable<UpdateProductsBulkMutation['updateProducts']>[number]>['facetValues']
        >[number]
    >;
}
export declare namespace UpdateVariantsBulk {
    type Variables = UpdateVariantsBulkMutationVariables;
    type Mutation = UpdateVariantsBulkMutation;
    type UpdateProductVariants = NonNullable<
        NonNullable<UpdateVariantsBulkMutation['updateProductVariants']>[number]
    >;
    type FacetValues = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<UpdateVariantsBulkMutation['updateProductVariants']>[number]
            >['facetValues']
        >[number]
    >;
}
export declare namespace Role {
    type Fragment = RoleFragment;
    type Channels = NonNullable<NonNullable<RoleFragment['channels']>[number]>;
}
export declare namespace Administrator {
    type Fragment = AdministratorFragment;
    type User = NonNullable<AdministratorFragment['user']>;
    type Roles = NonNullable<NonNullable<NonNullable<AdministratorFragment['user']>['roles']>[number]>;
}
export declare namespace GetAdministrators {
    type Variables = GetAdministratorsQueryVariables;
    type Query = GetAdministratorsQuery;
    type Administrators = NonNullable<GetAdministratorsQuery['administrators']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetAdministratorsQuery['administrators']>['items']>[number]
    >;
}
export declare namespace GetActiveAdministrator {
    type Variables = GetActiveAdministratorQueryVariables;
    type Query = GetActiveAdministratorQuery;
    type ActiveAdministrator = NonNullable<GetActiveAdministratorQuery['activeAdministrator']>;
}
export declare namespace GetAdministrator {
    type Variables = GetAdministratorQueryVariables;
    type Query = GetAdministratorQuery;
    type Administrator = NonNullable<GetAdministratorQuery['administrator']>;
}
export declare namespace CreateAdministrator {
    type Variables = CreateAdministratorMutationVariables;
    type Mutation = CreateAdministratorMutation;
    type CreateAdministrator = NonNullable<CreateAdministratorMutation['createAdministrator']>;
}
export declare namespace UpdateAdministrator {
    type Variables = UpdateAdministratorMutationVariables;
    type Mutation = UpdateAdministratorMutation;
    type UpdateAdministrator = NonNullable<UpdateAdministratorMutation['updateAdministrator']>;
}
export declare namespace UpdateActiveAdministrator {
    type Variables = UpdateActiveAdministratorMutationVariables;
    type Mutation = UpdateActiveAdministratorMutation;
    type UpdateActiveAdministrator = NonNullable<
        UpdateActiveAdministratorMutation['updateActiveAdministrator']
    >;
}
export declare namespace DeleteAdministrator {
    type Variables = DeleteAdministratorMutationVariables;
    type Mutation = DeleteAdministratorMutation;
    type DeleteAdministrator = NonNullable<DeleteAdministratorMutation['deleteAdministrator']>;
}
export declare namespace GetRoles {
    type Variables = GetRolesQueryVariables;
    type Query = GetRolesQuery;
    type Roles = NonNullable<GetRolesQuery['roles']>;
    type Items = NonNullable<NonNullable<NonNullable<GetRolesQuery['roles']>['items']>[number]>;
}
export declare namespace GetRole {
    type Variables = GetRoleQueryVariables;
    type Query = GetRoleQuery;
    type Role = NonNullable<GetRoleQuery['role']>;
}
export declare namespace CreateRole {
    type Variables = CreateRoleMutationVariables;
    type Mutation = CreateRoleMutation;
    type CreateRole = NonNullable<CreateRoleMutation['createRole']>;
}
export declare namespace UpdateRole {
    type Variables = UpdateRoleMutationVariables;
    type Mutation = UpdateRoleMutation;
    type UpdateRole = NonNullable<UpdateRoleMutation['updateRole']>;
}
export declare namespace DeleteRole {
    type Variables = DeleteRoleMutationVariables;
    type Mutation = DeleteRoleMutation;
    type DeleteRole = NonNullable<DeleteRoleMutation['deleteRole']>;
}
export declare namespace AssignRoleToAdministrator {
    type Variables = AssignRoleToAdministratorMutationVariables;
    type Mutation = AssignRoleToAdministratorMutation;
    type AssignRoleToAdministrator = NonNullable<
        AssignRoleToAdministratorMutation['assignRoleToAdministrator']
    >;
}
export declare namespace CurrentUser {
    type Fragment = CurrentUserFragment;
    type Channels = NonNullable<NonNullable<CurrentUserFragment['channels']>[number]>;
}
export declare namespace AttemptLogin {
    type Variables = AttemptLoginMutationVariables;
    type Mutation = AttemptLoginMutation;
    type Login = NonNullable<AttemptLoginMutation['login']>;
}
export declare namespace LogOut {
    type Variables = LogOutMutationVariables;
    type Mutation = LogOutMutation;
    type Logout = NonNullable<LogOutMutation['logout']>;
}
export declare namespace GetCurrentUser {
    type Variables = GetCurrentUserQueryVariables;
    type Query = GetCurrentUserQuery;
    type Me = NonNullable<GetCurrentUserQuery['me']>;
}
export declare namespace RequestStarted {
    type Variables = RequestStartedMutationVariables;
    type Mutation = RequestStartedMutation;
}
export declare namespace RequestCompleted {
    type Variables = RequestCompletedMutationVariables;
    type Mutation = RequestCompletedMutation;
}
export declare namespace UserStatus {
    type Fragment = UserStatusFragment;
    type Channels = NonNullable<NonNullable<UserStatusFragment['channels']>[number]>;
}
export declare namespace SetAsLoggedIn {
    type Variables = SetAsLoggedInMutationVariables;
    type Mutation = SetAsLoggedInMutation;
    type SetAsLoggedIn = NonNullable<SetAsLoggedInMutation['setAsLoggedIn']>;
}
export declare namespace SetAsLoggedOut {
    type Variables = SetAsLoggedOutMutationVariables;
    type Mutation = SetAsLoggedOutMutation;
    type SetAsLoggedOut = NonNullable<SetAsLoggedOutMutation['setAsLoggedOut']>;
}
export declare namespace SetUiLanguage {
    type Variables = SetUiLanguageMutationVariables;
    type Mutation = SetUiLanguageMutation;
}
export declare namespace SetUiLocale {
    type Variables = SetUiLocaleMutationVariables;
    type Mutation = SetUiLocaleMutation;
}
export declare namespace SetDisplayUiExtensionPoints {
    type Variables = SetDisplayUiExtensionPointsMutationVariables;
    type Mutation = SetDisplayUiExtensionPointsMutation;
}
export declare namespace SetContentLanguage {
    type Variables = SetContentLanguageMutationVariables;
    type Mutation = SetContentLanguageMutation;
}
export declare namespace SetUiTheme {
    type Variables = SetUiThemeMutationVariables;
    type Mutation = SetUiThemeMutation;
}
export declare namespace GetNetworkStatus {
    type Variables = GetNetworkStatusQueryVariables;
    type Query = GetNetworkStatusQuery;
    type NetworkStatus = NonNullable<GetNetworkStatusQuery['networkStatus']>;
}
export declare namespace GetUserStatus {
    type Variables = GetUserStatusQueryVariables;
    type Query = GetUserStatusQuery;
    type UserStatus = NonNullable<GetUserStatusQuery['userStatus']>;
}
export declare namespace GetUiState {
    type Variables = GetUiStateQueryVariables;
    type Query = GetUiStateQuery;
    type UiState = NonNullable<GetUiStateQuery['uiState']>;
}
export declare namespace GetClientState {
    type Variables = GetClientStateQueryVariables;
    type Query = GetClientStateQuery;
    type NetworkStatus = NonNullable<GetClientStateQuery['networkStatus']>;
    type UserStatus = NonNullable<GetClientStateQuery['userStatus']>;
    type UiState = NonNullable<GetClientStateQuery['uiState']>;
}
export declare namespace SetActiveChannel {
    type Variables = SetActiveChannelMutationVariables;
    type Mutation = SetActiveChannelMutation;
    type SetActiveChannel = NonNullable<SetActiveChannelMutation['setActiveChannel']>;
}
export declare namespace UpdateUserChannels {
    type Variables = UpdateUserChannelsMutationVariables;
    type Mutation = UpdateUserChannelsMutation;
    type UpdateUserChannels = NonNullable<UpdateUserChannelsMutation['updateUserChannels']>;
}
export declare namespace GetCollectionFilters {
    type Variables = GetCollectionFiltersQueryVariables;
    type Query = GetCollectionFiltersQuery;
    type CollectionFilters = NonNullable<NonNullable<GetCollectionFiltersQuery['collectionFilters']>[number]>;
}
export declare namespace Collection {
    type Fragment = CollectionFragment;
    type Breadcrumbs = NonNullable<NonNullable<CollectionFragment['breadcrumbs']>[number]>;
    type FeaturedAsset = NonNullable<CollectionFragment['featuredAsset']>;
    type Assets = NonNullable<NonNullable<CollectionFragment['assets']>[number]>;
    type Filters = NonNullable<NonNullable<CollectionFragment['filters']>[number]>;
    type Translations = NonNullable<NonNullable<CollectionFragment['translations']>[number]>;
    type Parent = NonNullable<CollectionFragment['parent']>;
    type Children = NonNullable<NonNullable<CollectionFragment['children']>[number]>;
}
export declare namespace GetCollectionList {
    type Variables = GetCollectionListQueryVariables;
    type Query = GetCollectionListQuery;
    type Collections = NonNullable<GetCollectionListQuery['collections']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetCollectionListQuery['collections']>['items']>[number]
    >;
    type FeaturedAsset = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetCollectionListQuery['collections']>['items']>[number]
        >['featuredAsset']
    >;
    type Parent = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetCollectionListQuery['collections']>['items']>[number]
        >['parent']
    >;
}
export declare namespace GetCollection {
    type Variables = GetCollectionQueryVariables;
    type Query = GetCollectionQuery;
    type Collection = NonNullable<GetCollectionQuery['collection']>;
}
export declare namespace CreateCollection {
    type Variables = CreateCollectionMutationVariables;
    type Mutation = CreateCollectionMutation;
    type CreateCollection = NonNullable<CreateCollectionMutation['createCollection']>;
}
export declare namespace UpdateCollection {
    type Variables = UpdateCollectionMutationVariables;
    type Mutation = UpdateCollectionMutation;
    type UpdateCollection = NonNullable<UpdateCollectionMutation['updateCollection']>;
}
export declare namespace MoveCollection {
    type Variables = MoveCollectionMutationVariables;
    type Mutation = MoveCollectionMutation;
    type MoveCollection = NonNullable<MoveCollectionMutation['moveCollection']>;
}
export declare namespace DeleteCollection {
    type Variables = DeleteCollectionMutationVariables;
    type Mutation = DeleteCollectionMutation;
    type DeleteCollection = NonNullable<DeleteCollectionMutation['deleteCollection']>;
}
export declare namespace DeleteCollections {
    type Variables = DeleteCollectionsMutationVariables;
    type Mutation = DeleteCollectionsMutation;
    type DeleteCollections = NonNullable<NonNullable<DeleteCollectionsMutation['deleteCollections']>[number]>;
}
export declare namespace GetCollectionContents {
    type Variables = GetCollectionContentsQueryVariables;
    type Query = GetCollectionContentsQuery;
    type Collection = NonNullable<GetCollectionContentsQuery['collection']>;
    type ProductVariants = NonNullable<
        NonNullable<GetCollectionContentsQuery['collection']>['productVariants']
    >;
    type Items = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetCollectionContentsQuery['collection']>['productVariants']>['items']
        >[number]
    >;
}
export declare namespace PreviewCollectionContents {
    type Variables = PreviewCollectionContentsQueryVariables;
    type Query = PreviewCollectionContentsQuery;
    type PreviewCollectionVariants = NonNullable<PreviewCollectionContentsQuery['previewCollectionVariants']>;
    type Items = NonNullable<
        NonNullable<NonNullable<PreviewCollectionContentsQuery['previewCollectionVariants']>['items']>[number]
    >;
}
export declare namespace AssignCollectionsToChannel {
    type Variables = AssignCollectionsToChannelMutationVariables;
    type Mutation = AssignCollectionsToChannelMutation;
    type AssignCollectionsToChannel = NonNullable<
        NonNullable<AssignCollectionsToChannelMutation['assignCollectionsToChannel']>[number]
    >;
}
export declare namespace RemoveCollectionsFromChannel {
    type Variables = RemoveCollectionsFromChannelMutationVariables;
    type Mutation = RemoveCollectionsFromChannelMutation;
    type RemoveCollectionsFromChannel = NonNullable<
        NonNullable<RemoveCollectionsFromChannelMutation['removeCollectionsFromChannel']>[number]
    >;
}
export declare namespace Address {
    type Fragment = AddressFragment;
    type Country = NonNullable<AddressFragment['country']>;
}
export declare namespace Customer {
    type Fragment = CustomerFragment;
    type User = NonNullable<CustomerFragment['user']>;
    type Addresses = NonNullable<NonNullable<CustomerFragment['addresses']>[number]>;
}
export declare namespace CustomerGroup {
    type Fragment = CustomerGroupFragment;
}
export declare namespace GetCustomerList {
    type Variables = GetCustomerListQueryVariables;
    type Query = GetCustomerListQuery;
    type Customers = NonNullable<GetCustomerListQuery['customers']>;
    type Items = NonNullable<NonNullable<NonNullable<GetCustomerListQuery['customers']>['items']>[number]>;
    type User = NonNullable<
        NonNullable<NonNullable<NonNullable<GetCustomerListQuery['customers']>['items']>[number]>['user']
    >;
}
export declare namespace GetCustomer {
    type Variables = GetCustomerQueryVariables;
    type Query = GetCustomerQuery;
    type Customer = NonNullable<GetCustomerQuery['customer']>;
    type Groups = NonNullable<NonNullable<NonNullable<GetCustomerQuery['customer']>['groups']>[number]>;
    type Orders = NonNullable<NonNullable<GetCustomerQuery['customer']>['orders']>;
    type Items = NonNullable<
        NonNullable<NonNullable<NonNullable<GetCustomerQuery['customer']>['orders']>['items']>[number]
    >;
}
export declare namespace CreateCustomer {
    type Variables = CreateCustomerMutationVariables;
    type Mutation = CreateCustomerMutation;
    type CreateCustomer = NonNullable<CreateCustomerMutation['createCustomer']>;
}
export declare namespace UpdateCustomer {
    type Variables = UpdateCustomerMutationVariables;
    type Mutation = UpdateCustomerMutation;
    type UpdateCustomer = NonNullable<UpdateCustomerMutation['updateCustomer']>;
}
export declare namespace DeleteCustomer {
    type Variables = DeleteCustomerMutationVariables;
    type Mutation = DeleteCustomerMutation;
    type DeleteCustomer = NonNullable<DeleteCustomerMutation['deleteCustomer']>;
}
export declare namespace CreateCustomerAddress {
    type Variables = CreateCustomerAddressMutationVariables;
    type Mutation = CreateCustomerAddressMutation;
    type CreateCustomerAddress = NonNullable<CreateCustomerAddressMutation['createCustomerAddress']>;
}
export declare namespace UpdateCustomerAddress {
    type Variables = UpdateCustomerAddressMutationVariables;
    type Mutation = UpdateCustomerAddressMutation;
    type UpdateCustomerAddress = NonNullable<UpdateCustomerAddressMutation['updateCustomerAddress']>;
}
export declare namespace DeleteCustomerAddress {
    type Variables = DeleteCustomerAddressMutationVariables;
    type Mutation = DeleteCustomerAddressMutation;
    type DeleteCustomerAddress = NonNullable<DeleteCustomerAddressMutation['deleteCustomerAddress']>;
}
export declare namespace CreateCustomerGroup {
    type Variables = CreateCustomerGroupMutationVariables;
    type Mutation = CreateCustomerGroupMutation;
    type CreateCustomerGroup = NonNullable<CreateCustomerGroupMutation['createCustomerGroup']>;
}
export declare namespace UpdateCustomerGroup {
    type Variables = UpdateCustomerGroupMutationVariables;
    type Mutation = UpdateCustomerGroupMutation;
    type UpdateCustomerGroup = NonNullable<UpdateCustomerGroupMutation['updateCustomerGroup']>;
}
export declare namespace DeleteCustomerGroup {
    type Variables = DeleteCustomerGroupMutationVariables;
    type Mutation = DeleteCustomerGroupMutation;
    type DeleteCustomerGroup = NonNullable<DeleteCustomerGroupMutation['deleteCustomerGroup']>;
}
export declare namespace GetCustomerGroups {
    type Variables = GetCustomerGroupsQueryVariables;
    type Query = GetCustomerGroupsQuery;
    type CustomerGroups = NonNullable<GetCustomerGroupsQuery['customerGroups']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetCustomerGroupsQuery['customerGroups']>['items']>[number]
    >;
}
export declare namespace GetCustomerGroupWithCustomers {
    type Variables = GetCustomerGroupWithCustomersQueryVariables;
    type Query = GetCustomerGroupWithCustomersQuery;
    type CustomerGroup = NonNullable<GetCustomerGroupWithCustomersQuery['customerGroup']>;
    type Customers = NonNullable<
        NonNullable<GetCustomerGroupWithCustomersQuery['customerGroup']>['customers']
    >;
    type Items = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<GetCustomerGroupWithCustomersQuery['customerGroup']>['customers']
            >['items']
        >[number]
    >;
}
export declare namespace AddCustomersToGroup {
    type Variables = AddCustomersToGroupMutationVariables;
    type Mutation = AddCustomersToGroupMutation;
    type AddCustomersToGroup = NonNullable<AddCustomersToGroupMutation['addCustomersToGroup']>;
}
export declare namespace RemoveCustomersFromGroup {
    type Variables = RemoveCustomersFromGroupMutationVariables;
    type Mutation = RemoveCustomersFromGroupMutation;
    type RemoveCustomersFromGroup = NonNullable<RemoveCustomersFromGroupMutation['removeCustomersFromGroup']>;
}
export declare namespace GetCustomerHistory {
    type Variables = GetCustomerHistoryQueryVariables;
    type Query = GetCustomerHistoryQuery;
    type Customer = NonNullable<GetCustomerHistoryQuery['customer']>;
    type History = NonNullable<NonNullable<GetCustomerHistoryQuery['customer']>['history']>;
    type Items = NonNullable<
        NonNullable<NonNullable<NonNullable<GetCustomerHistoryQuery['customer']>['history']>['items']>[number]
    >;
    type Administrator = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetCustomerHistoryQuery['customer']>['history']>['items']
            >[number]
        >['administrator']
    >;
}
export declare namespace AddNoteToCustomer {
    type Variables = AddNoteToCustomerMutationVariables;
    type Mutation = AddNoteToCustomerMutation;
    type AddNoteToCustomer = NonNullable<AddNoteToCustomerMutation['addNoteToCustomer']>;
}
export declare namespace UpdateCustomerNote {
    type Variables = UpdateCustomerNoteMutationVariables;
    type Mutation = UpdateCustomerNoteMutation;
    type UpdateCustomerNote = NonNullable<UpdateCustomerNoteMutation['updateCustomerNote']>;
}
export declare namespace DeleteCustomerNote {
    type Variables = DeleteCustomerNoteMutationVariables;
    type Mutation = DeleteCustomerNoteMutation;
    type DeleteCustomerNote = NonNullable<DeleteCustomerNoteMutation['deleteCustomerNote']>;
}
export declare namespace FacetValue {
    type Fragment = FacetValueFragment;
    type Translations = NonNullable<NonNullable<FacetValueFragment['translations']>[number]>;
    type Facet = NonNullable<FacetValueFragment['facet']>;
}
export declare namespace FacetWithValues {
    type Fragment = FacetWithValuesFragment;
    type Translations = NonNullable<NonNullable<FacetWithValuesFragment['translations']>[number]>;
    type Values = NonNullable<NonNullable<FacetWithValuesFragment['values']>[number]>;
}
export declare namespace CreateFacet {
    type Variables = CreateFacetMutationVariables;
    type Mutation = CreateFacetMutation;
    type CreateFacet = NonNullable<CreateFacetMutation['createFacet']>;
}
export declare namespace UpdateFacet {
    type Variables = UpdateFacetMutationVariables;
    type Mutation = UpdateFacetMutation;
    type UpdateFacet = NonNullable<UpdateFacetMutation['updateFacet']>;
}
export declare namespace DeleteFacet {
    type Variables = DeleteFacetMutationVariables;
    type Mutation = DeleteFacetMutation;
    type DeleteFacet = NonNullable<DeleteFacetMutation['deleteFacet']>;
}
export declare namespace DeleteFacets {
    type Variables = DeleteFacetsMutationVariables;
    type Mutation = DeleteFacetsMutation;
    type DeleteFacets = NonNullable<NonNullable<DeleteFacetsMutation['deleteFacets']>[number]>;
}
export declare namespace CreateFacetValues {
    type Variables = CreateFacetValuesMutationVariables;
    type Mutation = CreateFacetValuesMutation;
    type CreateFacetValues = NonNullable<NonNullable<CreateFacetValuesMutation['createFacetValues']>[number]>;
}
export declare namespace UpdateFacetValues {
    type Variables = UpdateFacetValuesMutationVariables;
    type Mutation = UpdateFacetValuesMutation;
    type UpdateFacetValues = NonNullable<NonNullable<UpdateFacetValuesMutation['updateFacetValues']>[number]>;
}
export declare namespace DeleteFacetValues {
    type Variables = DeleteFacetValuesMutationVariables;
    type Mutation = DeleteFacetValuesMutation;
    type DeleteFacetValues = NonNullable<NonNullable<DeleteFacetValuesMutation['deleteFacetValues']>[number]>;
}
export declare namespace GetFacetList {
    type Variables = GetFacetListQueryVariables;
    type Query = GetFacetListQuery;
    type Facets = NonNullable<GetFacetListQuery['facets']>;
    type Items = NonNullable<NonNullable<NonNullable<GetFacetListQuery['facets']>['items']>[number]>;
}
export declare namespace GetFacetWithValues {
    type Variables = GetFacetWithValuesQueryVariables;
    type Query = GetFacetWithValuesQuery;
    type Facet = NonNullable<GetFacetWithValuesQuery['facet']>;
}
export declare namespace AssignFacetsToChannel {
    type Variables = AssignFacetsToChannelMutationVariables;
    type Mutation = AssignFacetsToChannelMutation;
    type AssignFacetsToChannel = NonNullable<
        NonNullable<AssignFacetsToChannelMutation['assignFacetsToChannel']>[number]
    >;
}
export declare namespace RemoveFacetsFromChannel {
    type Variables = RemoveFacetsFromChannelMutationVariables;
    type Mutation = RemoveFacetsFromChannelMutation;
    type RemoveFacetsFromChannel = NonNullable<
        NonNullable<RemoveFacetsFromChannelMutation['removeFacetsFromChannel']>[number]
    >;
    type FacetInlineFragment = DiscriminateUnion<
        NonNullable<NonNullable<RemoveFacetsFromChannelMutation['removeFacetsFromChannel']>[number]>,
        {
            __typename?: 'Facet';
        }
    >;
    type FacetInUseErrorInlineFragment = DiscriminateUnion<
        NonNullable<NonNullable<RemoveFacetsFromChannelMutation['removeFacetsFromChannel']>[number]>,
        {
            __typename?: 'FacetInUseError';
        }
    >;
}
export declare namespace Discount {
    type Fragment = DiscountFragment;
}
export declare namespace Payment {
    type Fragment = PaymentFragment;
}
export declare namespace Refund {
    type Fragment = RefundFragment;
}
export declare namespace OrderAddress {
    type Fragment = OrderAddressFragment;
}
export declare namespace Order {
    type Fragment = OrderFragment;
    type Payments = NonNullable<NonNullable<OrderFragment['payments']>[number]>;
    type Customer = NonNullable<OrderFragment['customer']>;
    type ShippingLines = NonNullable<NonNullable<OrderFragment['shippingLines']>[number]>;
    type ShippingMethod = NonNullable<
        NonNullable<NonNullable<OrderFragment['shippingLines']>[number]>['shippingMethod']
    >;
    type CustomFields = NonNullable<OrderFragment['customFields']>;
}
export declare namespace Fulfillment {
    type Fragment = FulfillmentFragment;
    type Summary = NonNullable<NonNullable<FulfillmentFragment['summary']>[number]>;
    type OrderLine = NonNullable<
        NonNullable<NonNullable<FulfillmentFragment['summary']>[number]>['orderLine']
    >;
}
export declare namespace OrderLine {
    type Fragment = OrderLineFragment;
    type FeaturedAsset = NonNullable<OrderLineFragment['featuredAsset']>;
    type ProductVariant = NonNullable<OrderLineFragment['productVariant']>;
    type Discounts = NonNullable<NonNullable<OrderLineFragment['discounts']>[number]>;
    type Fulfillments = NonNullable<NonNullable<OrderLineFragment['fulfillments']>[number]>;
    type Items = NonNullable<NonNullable<OrderLineFragment['items']>[number]>;
}
export declare namespace OrderDetail {
    type Fragment = OrderDetailFragment;
    type Customer = NonNullable<OrderDetailFragment['customer']>;
    type Lines = NonNullable<NonNullable<OrderDetailFragment['lines']>[number]>;
    type Surcharges = NonNullable<NonNullable<OrderDetailFragment['surcharges']>[number]>;
    type Discounts = NonNullable<NonNullable<OrderDetailFragment['discounts']>[number]>;
    type Promotions = NonNullable<NonNullable<OrderDetailFragment['promotions']>[number]>;
    type ShippingLines = NonNullable<NonNullable<OrderDetailFragment['shippingLines']>[number]>;
    type ShippingMethod = NonNullable<
        NonNullable<NonNullable<OrderDetailFragment['shippingLines']>[number]>['shippingMethod']
    >;
    type TaxSummary = NonNullable<NonNullable<OrderDetailFragment['taxSummary']>[number]>;
    type ShippingAddress = NonNullable<OrderDetailFragment['shippingAddress']>;
    type BillingAddress = NonNullable<OrderDetailFragment['billingAddress']>;
    type Payments = NonNullable<NonNullable<OrderDetailFragment['payments']>[number]>;
    type Refunds = NonNullable<
        NonNullable<NonNullable<NonNullable<OrderDetailFragment['payments']>[number]>['refunds']>[number]
    >;
    type OrderItems = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<NonNullable<OrderDetailFragment['payments']>[number]>['refunds']
                >[number]
            >['orderItems']
        >[number]
    >;
    type Fulfillments = NonNullable<NonNullable<OrderDetailFragment['fulfillments']>[number]>;
    type Modifications = NonNullable<NonNullable<OrderDetailFragment['modifications']>[number]>;
    type Payment = NonNullable<
        NonNullable<NonNullable<OrderDetailFragment['modifications']>[number]>['payment']
    >;
    type _OrderItems = NonNullable<
        NonNullable<
            NonNullable<NonNullable<OrderDetailFragment['modifications']>[number]>['orderItems']
        >[number]
    >;
    type Refund = NonNullable<
        NonNullable<NonNullable<OrderDetailFragment['modifications']>[number]>['refund']
    >;
    type _Surcharges = NonNullable<
        NonNullable<
            NonNullable<NonNullable<OrderDetailFragment['modifications']>[number]>['surcharges']
        >[number]
    >;
}
export declare namespace GetOrderList {
    type Variables = GetOrderListQueryVariables;
    type Query = GetOrderListQuery;
    type Orders = NonNullable<GetOrderListQuery['orders']>;
    type Items = NonNullable<NonNullable<NonNullable<GetOrderListQuery['orders']>['items']>[number]>;
}
export declare namespace GetOrder {
    type Variables = GetOrderQueryVariables;
    type Query = GetOrderQuery;
    type Order = NonNullable<GetOrderQuery['order']>;
}
export declare namespace SettlePayment {
    type Variables = SettlePaymentMutationVariables;
    type Mutation = SettlePaymentMutation;
    type SettlePayment = NonNullable<SettlePaymentMutation['settlePayment']>;
    type SettlePaymentErrorInlineFragment = DiscriminateUnion<
        NonNullable<SettlePaymentMutation['settlePayment']>,
        {
            __typename?: 'SettlePaymentError';
        }
    >;
    type PaymentStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<SettlePaymentMutation['settlePayment']>,
        {
            __typename?: 'PaymentStateTransitionError';
        }
    >;
    type OrderStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<SettlePaymentMutation['settlePayment']>,
        {
            __typename?: 'OrderStateTransitionError';
        }
    >;
}
export declare namespace CancelPayment {
    type Variables = CancelPaymentMutationVariables;
    type Mutation = CancelPaymentMutation;
    type CancelPayment = NonNullable<CancelPaymentMutation['cancelPayment']>;
    type CancelPaymentErrorInlineFragment = DiscriminateUnion<
        NonNullable<CancelPaymentMutation['cancelPayment']>,
        {
            __typename?: 'CancelPaymentError';
        }
    >;
    type PaymentStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<CancelPaymentMutation['cancelPayment']>,
        {
            __typename?: 'PaymentStateTransitionError';
        }
    >;
}
export declare namespace TransitionPaymentToState {
    type Variables = TransitionPaymentToStateMutationVariables;
    type Mutation = TransitionPaymentToStateMutation;
    type TransitionPaymentToState = NonNullable<TransitionPaymentToStateMutation['transitionPaymentToState']>;
    type PaymentStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<TransitionPaymentToStateMutation['transitionPaymentToState']>,
        {
            __typename?: 'PaymentStateTransitionError';
        }
    >;
}
export declare namespace CreateFulfillment {
    type Variables = CreateFulfillmentMutationVariables;
    type Mutation = CreateFulfillmentMutation;
    type AddFulfillmentToOrder = NonNullable<CreateFulfillmentMutation['addFulfillmentToOrder']>;
    type CreateFulfillmentErrorInlineFragment = DiscriminateUnion<
        NonNullable<CreateFulfillmentMutation['addFulfillmentToOrder']>,
        {
            __typename?: 'CreateFulfillmentError';
        }
    >;
    type FulfillmentStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<CreateFulfillmentMutation['addFulfillmentToOrder']>,
        {
            __typename?: 'FulfillmentStateTransitionError';
        }
    >;
}
export declare namespace CancelOrder {
    type Variables = CancelOrderMutationVariables;
    type Mutation = CancelOrderMutation;
    type CancelOrder = NonNullable<CancelOrderMutation['cancelOrder']>;
}
export declare namespace RefundOrder {
    type Variables = RefundOrderMutationVariables;
    type Mutation = RefundOrderMutation;
    type RefundOrder = NonNullable<RefundOrderMutation['refundOrder']>;
}
export declare namespace SettleRefund {
    type Variables = SettleRefundMutationVariables;
    type Mutation = SettleRefundMutation;
    type SettleRefund = NonNullable<SettleRefundMutation['settleRefund']>;
}
export declare namespace GetOrderHistory {
    type Variables = GetOrderHistoryQueryVariables;
    type Query = GetOrderHistoryQuery;
    type Order = NonNullable<GetOrderHistoryQuery['order']>;
    type History = NonNullable<NonNullable<GetOrderHistoryQuery['order']>['history']>;
    type Items = NonNullable<
        NonNullable<NonNullable<NonNullable<GetOrderHistoryQuery['order']>['history']>['items']>[number]
    >;
    type Administrator = NonNullable<
        NonNullable<
            NonNullable<NonNullable<NonNullable<GetOrderHistoryQuery['order']>['history']>['items']>[number]
        >['administrator']
    >;
}
export declare namespace AddNoteToOrder {
    type Variables = AddNoteToOrderMutationVariables;
    type Mutation = AddNoteToOrderMutation;
    type AddNoteToOrder = NonNullable<AddNoteToOrderMutation['addNoteToOrder']>;
}
export declare namespace UpdateOrderNote {
    type Variables = UpdateOrderNoteMutationVariables;
    type Mutation = UpdateOrderNoteMutation;
    type UpdateOrderNote = NonNullable<UpdateOrderNoteMutation['updateOrderNote']>;
}
export declare namespace DeleteOrderNote {
    type Variables = DeleteOrderNoteMutationVariables;
    type Mutation = DeleteOrderNoteMutation;
    type DeleteOrderNote = NonNullable<DeleteOrderNoteMutation['deleteOrderNote']>;
}
export declare namespace TransitionOrderToState {
    type Variables = TransitionOrderToStateMutationVariables;
    type Mutation = TransitionOrderToStateMutation;
    type TransitionOrderToState = NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>;
    type OrderStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>,
        {
            __typename?: 'OrderStateTransitionError';
        }
    >;
}
export declare namespace UpdateOrderCustomFields {
    type Variables = UpdateOrderCustomFieldsMutationVariables;
    type Mutation = UpdateOrderCustomFieldsMutation;
    type SetOrderCustomFields = NonNullable<UpdateOrderCustomFieldsMutation['setOrderCustomFields']>;
}
export declare namespace TransitionFulfillmentToState {
    type Variables = TransitionFulfillmentToStateMutationVariables;
    type Mutation = TransitionFulfillmentToStateMutation;
    type TransitionFulfillmentToState = NonNullable<
        TransitionFulfillmentToStateMutation['transitionFulfillmentToState']
    >;
    type FulfillmentStateTransitionErrorInlineFragment = DiscriminateUnion<
        NonNullable<TransitionFulfillmentToStateMutation['transitionFulfillmentToState']>,
        {
            __typename?: 'FulfillmentStateTransitionError';
        }
    >;
}
export declare namespace GetOrderSummary {
    type Variables = GetOrderSummaryQueryVariables;
    type Query = GetOrderSummaryQuery;
    type Orders = NonNullable<GetOrderSummaryQuery['orders']>;
    type Items = NonNullable<NonNullable<NonNullable<GetOrderSummaryQuery['orders']>['items']>[number]>;
}
export declare namespace ModifyOrder {
    type Variables = ModifyOrderMutationVariables;
    type Mutation = ModifyOrderMutation;
    type ModifyOrder = NonNullable<ModifyOrderMutation['modifyOrder']>;
}
export declare namespace AddManualPayment {
    type Variables = AddManualPaymentMutationVariables;
    type Mutation = AddManualPaymentMutation;
    type AddManualPaymentToOrder = NonNullable<AddManualPaymentMutation['addManualPaymentToOrder']>;
}
export declare namespace CreateDraftOrder {
    type Variables = CreateDraftOrderMutationVariables;
    type Mutation = CreateDraftOrderMutation;
    type CreateDraftOrder = NonNullable<CreateDraftOrderMutation['createDraftOrder']>;
}
export declare namespace DeleteDraftOrder {
    type Variables = DeleteDraftOrderMutationVariables;
    type Mutation = DeleteDraftOrderMutation;
    type DeleteDraftOrder = NonNullable<DeleteDraftOrderMutation['deleteDraftOrder']>;
}
export declare namespace AddItemToDraftOrder {
    type Variables = AddItemToDraftOrderMutationVariables;
    type Mutation = AddItemToDraftOrderMutation;
    type AddItemToDraftOrder = NonNullable<AddItemToDraftOrderMutation['addItemToDraftOrder']>;
}
export declare namespace AdjustDraftOrderLine {
    type Variables = AdjustDraftOrderLineMutationVariables;
    type Mutation = AdjustDraftOrderLineMutation;
    type AdjustDraftOrderLine = NonNullable<AdjustDraftOrderLineMutation['adjustDraftOrderLine']>;
}
export declare namespace RemoveDraftOrderLine {
    type Variables = RemoveDraftOrderLineMutationVariables;
    type Mutation = RemoveDraftOrderLineMutation;
    type RemoveDraftOrderLine = NonNullable<RemoveDraftOrderLineMutation['removeDraftOrderLine']>;
}
export declare namespace SetCustomerForDraftOrder {
    type Variables = SetCustomerForDraftOrderMutationVariables;
    type Mutation = SetCustomerForDraftOrderMutation;
    type SetCustomerForDraftOrder = NonNullable<SetCustomerForDraftOrderMutation['setCustomerForDraftOrder']>;
}
export declare namespace SetDraftOrderShippingAddress {
    type Variables = SetDraftOrderShippingAddressMutationVariables;
    type Mutation = SetDraftOrderShippingAddressMutation;
    type SetDraftOrderShippingAddress = NonNullable<
        SetDraftOrderShippingAddressMutation['setDraftOrderShippingAddress']
    >;
}
export declare namespace SetDraftOrderBillingAddress {
    type Variables = SetDraftOrderBillingAddressMutationVariables;
    type Mutation = SetDraftOrderBillingAddressMutation;
    type SetDraftOrderBillingAddress = NonNullable<
        SetDraftOrderBillingAddressMutation['setDraftOrderBillingAddress']
    >;
}
export declare namespace ApplyCouponCodeToDraftOrder {
    type Variables = ApplyCouponCodeToDraftOrderMutationVariables;
    type Mutation = ApplyCouponCodeToDraftOrderMutation;
    type ApplyCouponCodeToDraftOrder = NonNullable<
        ApplyCouponCodeToDraftOrderMutation['applyCouponCodeToDraftOrder']
    >;
}
export declare namespace RemoveCouponCodeFromDraftOrder {
    type Variables = RemoveCouponCodeFromDraftOrderMutationVariables;
    type Mutation = RemoveCouponCodeFromDraftOrderMutation;
    type RemoveCouponCodeFromDraftOrder = NonNullable<
        RemoveCouponCodeFromDraftOrderMutation['removeCouponCodeFromDraftOrder']
    >;
}
export declare namespace DraftOrderEligibleShippingMethods {
    type Variables = DraftOrderEligibleShippingMethodsQueryVariables;
    type Query = DraftOrderEligibleShippingMethodsQuery;
    type EligibleShippingMethodsForDraftOrder = NonNullable<
        NonNullable<DraftOrderEligibleShippingMethodsQuery['eligibleShippingMethodsForDraftOrder']>[number]
    >;
}
export declare namespace SetDraftOrderShippingMethod {
    type Variables = SetDraftOrderShippingMethodMutationVariables;
    type Mutation = SetDraftOrderShippingMethodMutation;
    type SetDraftOrderShippingMethod = NonNullable<
        SetDraftOrderShippingMethodMutation['setDraftOrderShippingMethod']
    >;
}
export declare namespace Asset {
    type Fragment = AssetFragment;
    type FocalPoint = NonNullable<AssetFragment['focalPoint']>;
}
export declare namespace Tag {
    type Fragment = TagFragment;
}
export declare namespace ProductOptionGroup {
    type Fragment = ProductOptionGroupFragment;
    type Translations = NonNullable<NonNullable<ProductOptionGroupFragment['translations']>[number]>;
}
export declare namespace ProductOption {
    type Fragment = ProductOptionFragment;
    type Translations = NonNullable<NonNullable<ProductOptionFragment['translations']>[number]>;
}
export declare namespace ProductVariant {
    type Fragment = ProductVariantFragment;
    type TaxRateApplied = NonNullable<ProductVariantFragment['taxRateApplied']>;
    type TaxCategory = NonNullable<ProductVariantFragment['taxCategory']>;
    type Options = NonNullable<NonNullable<ProductVariantFragment['options']>[number]>;
    type FacetValues = NonNullable<NonNullable<ProductVariantFragment['facetValues']>[number]>;
    type Facet = NonNullable<
        NonNullable<NonNullable<ProductVariantFragment['facetValues']>[number]>['facet']
    >;
    type FeaturedAsset = NonNullable<ProductVariantFragment['featuredAsset']>;
    type Assets = NonNullable<NonNullable<ProductVariantFragment['assets']>[number]>;
    type Translations = NonNullable<NonNullable<ProductVariantFragment['translations']>[number]>;
    type Channels = NonNullable<NonNullable<ProductVariantFragment['channels']>[number]>;
}
export declare namespace ProductDetail {
    type Fragment = ProductDetailFragment;
    type FeaturedAsset = NonNullable<ProductDetailFragment['featuredAsset']>;
    type Assets = NonNullable<NonNullable<ProductDetailFragment['assets']>[number]>;
    type Translations = NonNullable<NonNullable<ProductDetailFragment['translations']>[number]>;
    type OptionGroups = NonNullable<NonNullable<ProductDetailFragment['optionGroups']>[number]>;
    type FacetValues = NonNullable<NonNullable<ProductDetailFragment['facetValues']>[number]>;
    type Facet = NonNullable<NonNullable<NonNullable<ProductDetailFragment['facetValues']>[number]>['facet']>;
    type Channels = NonNullable<NonNullable<ProductDetailFragment['channels']>[number]>;
}
export declare namespace ProductOptionGroupWithOptions {
    type Fragment = ProductOptionGroupWithOptionsFragment;
    type Translations = NonNullable<
        NonNullable<ProductOptionGroupWithOptionsFragment['translations']>[number]
    >;
    type Options = NonNullable<NonNullable<ProductOptionGroupWithOptionsFragment['options']>[number]>;
    type _Translations = NonNullable<
        NonNullable<
            NonNullable<NonNullable<ProductOptionGroupWithOptionsFragment['options']>[number]>['translations']
        >[number]
    >;
}
export declare namespace UpdateProduct {
    type Variables = UpdateProductMutationVariables;
    type Mutation = UpdateProductMutation;
    type UpdateProduct = NonNullable<UpdateProductMutation['updateProduct']>;
    type VariantList = NonNullable<NonNullable<UpdateProductMutation['updateProduct']>['variantList']>;
    type Items = NonNullable<
        NonNullable<
            NonNullable<NonNullable<UpdateProductMutation['updateProduct']>['variantList']>['items']
        >[number]
    >;
}
export declare namespace CreateProduct {
    type Variables = CreateProductMutationVariables;
    type Mutation = CreateProductMutation;
    type CreateProduct = NonNullable<CreateProductMutation['createProduct']>;
    type VariantList = NonNullable<NonNullable<CreateProductMutation['createProduct']>['variantList']>;
    type Items = NonNullable<
        NonNullable<
            NonNullable<NonNullable<CreateProductMutation['createProduct']>['variantList']>['items']
        >[number]
    >;
}
export declare namespace DeleteProduct {
    type Variables = DeleteProductMutationVariables;
    type Mutation = DeleteProductMutation;
    type DeleteProduct = NonNullable<DeleteProductMutation['deleteProduct']>;
}
export declare namespace DeleteProducts {
    type Variables = DeleteProductsMutationVariables;
    type Mutation = DeleteProductsMutation;
    type DeleteProducts = NonNullable<NonNullable<DeleteProductsMutation['deleteProducts']>[number]>;
}
export declare namespace CreateProductVariants {
    type Variables = CreateProductVariantsMutationVariables;
    type Mutation = CreateProductVariantsMutation;
    type CreateProductVariants = NonNullable<
        NonNullable<CreateProductVariantsMutation['createProductVariants']>[number]
    >;
}
export declare namespace UpdateProductVariants {
    type Variables = UpdateProductVariantsMutationVariables;
    type Mutation = UpdateProductVariantsMutation;
    type UpdateProductVariants = NonNullable<
        NonNullable<UpdateProductVariantsMutation['updateProductVariants']>[number]
    >;
}
export declare namespace CreateProductOptionGroup {
    type Variables = CreateProductOptionGroupMutationVariables;
    type Mutation = CreateProductOptionGroupMutation;
    type CreateProductOptionGroup = NonNullable<CreateProductOptionGroupMutation['createProductOptionGroup']>;
}
export declare namespace GetProductOptionGroup {
    type Variables = GetProductOptionGroupQueryVariables;
    type Query = GetProductOptionGroupQuery;
    type ProductOptionGroup = NonNullable<GetProductOptionGroupQuery['productOptionGroup']>;
}
export declare namespace AddOptionToGroup {
    type Variables = AddOptionToGroupMutationVariables;
    type Mutation = AddOptionToGroupMutation;
    type CreateProductOption = NonNullable<AddOptionToGroupMutation['createProductOption']>;
}
export declare namespace AddOptionGroupToProduct {
    type Variables = AddOptionGroupToProductMutationVariables;
    type Mutation = AddOptionGroupToProductMutation;
    type AddOptionGroupToProduct = NonNullable<AddOptionGroupToProductMutation['addOptionGroupToProduct']>;
    type OptionGroups = NonNullable<
        NonNullable<
            NonNullable<AddOptionGroupToProductMutation['addOptionGroupToProduct']>['optionGroups']
        >[number]
    >;
    type Options = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<AddOptionGroupToProductMutation['addOptionGroupToProduct']>['optionGroups']
                >[number]
            >['options']
        >[number]
    >;
}
export declare namespace RemoveOptionGroupFromProduct {
    type Variables = RemoveOptionGroupFromProductMutationVariables;
    type Mutation = RemoveOptionGroupFromProductMutation;
    type RemoveOptionGroupFromProduct = NonNullable<
        RemoveOptionGroupFromProductMutation['removeOptionGroupFromProduct']
    >;
    type ProductInlineFragment = DiscriminateUnion<
        NonNullable<RemoveOptionGroupFromProductMutation['removeOptionGroupFromProduct']>,
        {
            __typename?: 'Product';
        }
    >;
    type OptionGroups = NonNullable<
        NonNullable<
            DiscriminateUnion<
                NonNullable<RemoveOptionGroupFromProductMutation['removeOptionGroupFromProduct']>,
                {
                    __typename?: 'Product';
                }
            >['optionGroups']
        >[number]
    >;
    type Options = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    DiscriminateUnion<
                        NonNullable<RemoveOptionGroupFromProductMutation['removeOptionGroupFromProduct']>,
                        {
                            __typename?: 'Product';
                        }
                    >['optionGroups']
                >[number]
            >['options']
        >[number]
    >;
}
export declare namespace GetProductWithVariants {
    type Variables = GetProductWithVariantsQueryVariables;
    type Query = GetProductWithVariantsQuery;
    type Product = NonNullable<GetProductWithVariantsQuery['product']>;
    type VariantList = NonNullable<NonNullable<GetProductWithVariantsQuery['product']>['variantList']>;
    type Items = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductWithVariantsQuery['product']>['variantList']>['items']
        >[number]
    >;
}
export declare namespace GetProductSimple {
    type Variables = GetProductSimpleQueryVariables;
    type Query = GetProductSimpleQuery;
    type Product = NonNullable<GetProductSimpleQuery['product']>;
    type FeaturedAsset = NonNullable<NonNullable<GetProductSimpleQuery['product']>['featuredAsset']>;
}
export declare namespace GetProductList {
    type Variables = GetProductListQueryVariables;
    type Query = GetProductListQuery;
    type Products = NonNullable<GetProductListQuery['products']>;
    type Items = NonNullable<NonNullable<NonNullable<GetProductListQuery['products']>['items']>[number]>;
    type FeaturedAsset = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductListQuery['products']>['items']>[number]
        >['featuredAsset']
    >;
}
export declare namespace GetProductOptionGroups {
    type Variables = GetProductOptionGroupsQueryVariables;
    type Query = GetProductOptionGroupsQuery;
    type ProductOptionGroups = NonNullable<
        NonNullable<GetProductOptionGroupsQuery['productOptionGroups']>[number]
    >;
    type Options = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductOptionGroupsQuery['productOptionGroups']>[number]>['options']
        >[number]
    >;
}
export declare namespace GetAssetList {
    type Variables = GetAssetListQueryVariables;
    type Query = GetAssetListQuery;
    type Assets = NonNullable<GetAssetListQuery['assets']>;
    type Items = NonNullable<NonNullable<NonNullable<GetAssetListQuery['assets']>['items']>[number]>;
    type Tags = NonNullable<
        NonNullable<
            NonNullable<NonNullable<NonNullable<GetAssetListQuery['assets']>['items']>[number]>['tags']
        >[number]
    >;
}
export declare namespace GetAsset {
    type Variables = GetAssetQueryVariables;
    type Query = GetAssetQuery;
    type Asset = NonNullable<GetAssetQuery['asset']>;
    type Tags = NonNullable<NonNullable<NonNullable<GetAssetQuery['asset']>['tags']>[number]>;
}
export declare namespace CreateAssets {
    type Variables = CreateAssetsMutationVariables;
    type Mutation = CreateAssetsMutation;
    type CreateAssets = NonNullable<NonNullable<CreateAssetsMutation['createAssets']>[number]>;
    type AssetInlineFragment = DiscriminateUnion<
        NonNullable<NonNullable<CreateAssetsMutation['createAssets']>[number]>,
        {
            __typename?: 'Asset';
        }
    >;
    type Tags = NonNullable<
        NonNullable<
            DiscriminateUnion<
                NonNullable<NonNullable<CreateAssetsMutation['createAssets']>[number]>,
                {
                    __typename?: 'Asset';
                }
            >['tags']
        >[number]
    >;
    type ErrorResultInlineFragment = DiscriminateUnion<
        NonNullable<NonNullable<CreateAssetsMutation['createAssets']>[number]>,
        {
            __typename?: 'ErrorResult';
        }
    >;
}
export declare namespace UpdateAsset {
    type Variables = UpdateAssetMutationVariables;
    type Mutation = UpdateAssetMutation;
    type UpdateAsset = NonNullable<UpdateAssetMutation['updateAsset']>;
    type Tags = NonNullable<NonNullable<NonNullable<UpdateAssetMutation['updateAsset']>['tags']>[number]>;
}
export declare namespace DeleteAssets {
    type Variables = DeleteAssetsMutationVariables;
    type Mutation = DeleteAssetsMutation;
    type DeleteAssets = NonNullable<DeleteAssetsMutation['deleteAssets']>;
}
export declare namespace SearchProducts {
    type Variables = SearchProductsQueryVariables;
    type Query = SearchProductsQuery;
    type Search = NonNullable<SearchProductsQuery['search']>;
    type Items = NonNullable<NonNullable<NonNullable<SearchProductsQuery['search']>['items']>[number]>;
    type ProductAsset = NonNullable<
        NonNullable<NonNullable<NonNullable<SearchProductsQuery['search']>['items']>[number]>['productAsset']
    >;
    type FocalPoint = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<SearchProductsQuery['search']>['items']>[number]
            >['productAsset']
        >['focalPoint']
    >;
    type ProductVariantAsset = NonNullable<
        NonNullable<
            NonNullable<NonNullable<SearchProductsQuery['search']>['items']>[number]
        >['productVariantAsset']
    >;
    type _FocalPoint = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<SearchProductsQuery['search']>['items']>[number]
            >['productVariantAsset']
        >['focalPoint']
    >;
    type FacetValues = NonNullable<
        NonNullable<NonNullable<SearchProductsQuery['search']>['facetValues']>[number]
    >;
    type FacetValue = NonNullable<
        NonNullable<
            NonNullable<NonNullable<SearchProductsQuery['search']>['facetValues']>[number]
        >['facetValue']
    >;
    type Facet = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<SearchProductsQuery['search']>['facetValues']>[number]
            >['facetValue']
        >['facet']
    >;
}
export declare namespace ProductSelectorSearch {
    type Variables = ProductSelectorSearchQueryVariables;
    type Query = ProductSelectorSearchQuery;
    type Search = NonNullable<ProductSelectorSearchQuery['search']>;
    type Items = NonNullable<NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]>;
    type ProductAsset = NonNullable<
        NonNullable<
            NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]
        >['productAsset']
    >;
    type FocalPoint = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]
            >['productAsset']
        >['focalPoint']
    >;
    type Price = NonNullable<
        NonNullable<NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]>['price']
    >;
    type SinglePriceInlineFragment = DiscriminateUnion<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]
            >['price']
        >,
        {
            __typename?: 'SinglePrice';
        }
    >;
    type PriceWithTax = NonNullable<
        NonNullable<
            NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]
        >['priceWithTax']
    >;
    type _SinglePriceInlineFragment = DiscriminateUnion<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<ProductSelectorSearchQuery['search']>['items']>[number]
            >['priceWithTax']
        >,
        {
            __typename?: 'SinglePrice';
        }
    >;
}
export declare namespace UpdateProductOptionGroup {
    type Variables = UpdateProductOptionGroupMutationVariables;
    type Mutation = UpdateProductOptionGroupMutation;
    type UpdateProductOptionGroup = NonNullable<UpdateProductOptionGroupMutation['updateProductOptionGroup']>;
}
export declare namespace UpdateProductOption {
    type Variables = UpdateProductOptionMutationVariables;
    type Mutation = UpdateProductOptionMutation;
    type UpdateProductOption = NonNullable<UpdateProductOptionMutation['updateProductOption']>;
}
export declare namespace DeleteProductOption {
    type Variables = DeleteProductOptionMutationVariables;
    type Mutation = DeleteProductOptionMutation;
    type DeleteProductOption = NonNullable<DeleteProductOptionMutation['deleteProductOption']>;
}
export declare namespace DeleteProductVariant {
    type Variables = DeleteProductVariantMutationVariables;
    type Mutation = DeleteProductVariantMutation;
    type DeleteProductVariant = NonNullable<DeleteProductVariantMutation['deleteProductVariant']>;
}
export declare namespace GetProductVariantOptions {
    type Variables = GetProductVariantOptionsQueryVariables;
    type Query = GetProductVariantOptionsQuery;
    type Product = NonNullable<GetProductVariantOptionsQuery['product']>;
    type OptionGroups = NonNullable<
        NonNullable<NonNullable<GetProductVariantOptionsQuery['product']>['optionGroups']>[number]
    >;
    type Options = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetProductVariantOptionsQuery['product']>['optionGroups']>[number]
            >['options']
        >[number]
    >;
    type Variants = NonNullable<
        NonNullable<NonNullable<GetProductVariantOptionsQuery['product']>['variants']>[number]
    >;
    type _Options = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetProductVariantOptionsQuery['product']>['variants']>[number]
            >['options']
        >[number]
    >;
}
export declare namespace AssignProductsToChannel {
    type Variables = AssignProductsToChannelMutationVariables;
    type Mutation = AssignProductsToChannelMutation;
    type AssignProductsToChannel = NonNullable<
        NonNullable<AssignProductsToChannelMutation['assignProductsToChannel']>[number]
    >;
    type Channels = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<AssignProductsToChannelMutation['assignProductsToChannel']>[number]
            >['channels']
        >[number]
    >;
}
export declare namespace AssignVariantsToChannel {
    type Variables = AssignVariantsToChannelMutationVariables;
    type Mutation = AssignVariantsToChannelMutation;
    type AssignProductVariantsToChannel = NonNullable<
        NonNullable<AssignVariantsToChannelMutation['assignProductVariantsToChannel']>[number]
    >;
    type Channels = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<AssignVariantsToChannelMutation['assignProductVariantsToChannel']>[number]
            >['channels']
        >[number]
    >;
}
export declare namespace RemoveProductsFromChannel {
    type Variables = RemoveProductsFromChannelMutationVariables;
    type Mutation = RemoveProductsFromChannelMutation;
    type RemoveProductsFromChannel = NonNullable<
        NonNullable<RemoveProductsFromChannelMutation['removeProductsFromChannel']>[number]
    >;
    type Channels = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<RemoveProductsFromChannelMutation['removeProductsFromChannel']>[number]
            >['channels']
        >[number]
    >;
}
export declare namespace RemoveVariantsFromChannel {
    type Variables = RemoveVariantsFromChannelMutationVariables;
    type Mutation = RemoveVariantsFromChannelMutation;
    type RemoveProductVariantsFromChannel = NonNullable<
        NonNullable<RemoveVariantsFromChannelMutation['removeProductVariantsFromChannel']>[number]
    >;
    type Channels = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<RemoveVariantsFromChannelMutation['removeProductVariantsFromChannel']>[number]
            >['channels']
        >[number]
    >;
}
export declare namespace GetProductVariant {
    type Variables = GetProductVariantQueryVariables;
    type Query = GetProductVariantQuery;
    type ProductVariant = NonNullable<GetProductVariantQuery['productVariant']>;
    type FeaturedAsset = NonNullable<NonNullable<GetProductVariantQuery['productVariant']>['featuredAsset']>;
    type FocalPoint = NonNullable<
        NonNullable<NonNullable<GetProductVariantQuery['productVariant']>['featuredAsset']>['focalPoint']
    >;
    type Product = NonNullable<NonNullable<GetProductVariantQuery['productVariant']>['product']>;
    type _FeaturedAsset = NonNullable<
        NonNullable<NonNullable<GetProductVariantQuery['productVariant']>['product']>['featuredAsset']
    >;
    type _FocalPoint = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductVariantQuery['productVariant']>['product']>['featuredAsset']
        >['focalPoint']
    >;
}
export declare namespace GetProductVariantListSimple {
    type Variables = GetProductVariantListSimpleQueryVariables;
    type Query = GetProductVariantListSimpleQuery;
    type ProductVariants = NonNullable<GetProductVariantListSimpleQuery['productVariants']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']>[number]
    >;
    type FeaturedAsset = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']>[number]
        >['featuredAsset']
    >;
    type FocalPoint = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']>[number]
            >['featuredAsset']
        >['focalPoint']
    >;
    type Product = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']>[number]
        >['product']
    >;
    type _FeaturedAsset = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']>[number]
            >['product']
        >['featuredAsset']
    >;
    type _FocalPoint = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<
                        NonNullable<GetProductVariantListSimpleQuery['productVariants']>['items']
                    >[number]
                >['product']
            >['featuredAsset']
        >['focalPoint']
    >;
}
export declare namespace GetProductVariantList {
    type Variables = GetProductVariantListQueryVariables;
    type Query = GetProductVariantListQuery;
    type ProductVariants = NonNullable<GetProductVariantListQuery['productVariants']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetProductVariantListQuery['productVariants']>['items']>[number]
    >;
}
export declare namespace GetTagList {
    type Variables = GetTagListQueryVariables;
    type Query = GetTagListQuery;
    type Tags = NonNullable<GetTagListQuery['tags']>;
    type Items = NonNullable<NonNullable<NonNullable<GetTagListQuery['tags']>['items']>[number]>;
}
export declare namespace GetTag {
    type Variables = GetTagQueryVariables;
    type Query = GetTagQuery;
    type Tag = NonNullable<GetTagQuery['tag']>;
}
export declare namespace CreateTag {
    type Variables = CreateTagMutationVariables;
    type Mutation = CreateTagMutation;
    type CreateTag = NonNullable<CreateTagMutation['createTag']>;
}
export declare namespace UpdateTag {
    type Variables = UpdateTagMutationVariables;
    type Mutation = UpdateTagMutation;
    type UpdateTag = NonNullable<UpdateTagMutation['updateTag']>;
}
export declare namespace DeleteTag {
    type Variables = DeleteTagMutationVariables;
    type Mutation = DeleteTagMutation;
    type DeleteTag = NonNullable<DeleteTagMutation['deleteTag']>;
}
export declare namespace Promotion {
    type Fragment = PromotionFragment;
    type Conditions = NonNullable<NonNullable<PromotionFragment['conditions']>[number]>;
    type Actions = NonNullable<NonNullable<PromotionFragment['actions']>[number]>;
}
export declare namespace GetPromotionList {
    type Variables = GetPromotionListQueryVariables;
    type Query = GetPromotionListQuery;
    type Promotions = NonNullable<GetPromotionListQuery['promotions']>;
    type Items = NonNullable<NonNullable<NonNullable<GetPromotionListQuery['promotions']>['items']>[number]>;
}
export declare namespace GetPromotion {
    type Variables = GetPromotionQueryVariables;
    type Query = GetPromotionQuery;
    type Promotion = NonNullable<GetPromotionQuery['promotion']>;
}
export declare namespace GetAdjustmentOperations {
    type Variables = GetAdjustmentOperationsQueryVariables;
    type Query = GetAdjustmentOperationsQuery;
    type PromotionConditions = NonNullable<
        NonNullable<GetAdjustmentOperationsQuery['promotionConditions']>[number]
    >;
    type PromotionActions = NonNullable<
        NonNullable<GetAdjustmentOperationsQuery['promotionActions']>[number]
    >;
}
export declare namespace CreatePromotion {
    type Variables = CreatePromotionMutationVariables;
    type Mutation = CreatePromotionMutation;
    type CreatePromotion = NonNullable<CreatePromotionMutation['createPromotion']>;
}
export declare namespace UpdatePromotion {
    type Variables = UpdatePromotionMutationVariables;
    type Mutation = UpdatePromotionMutation;
    type UpdatePromotion = NonNullable<UpdatePromotionMutation['updatePromotion']>;
}
export declare namespace DeletePromotion {
    type Variables = DeletePromotionMutationVariables;
    type Mutation = DeletePromotionMutation;
    type DeletePromotion = NonNullable<DeletePromotionMutation['deletePromotion']>;
}
export declare namespace Country {
    type Fragment = CountryFragment;
    type Translations = NonNullable<NonNullable<CountryFragment['translations']>[number]>;
}
export declare namespace GetCountryList {
    type Variables = GetCountryListQueryVariables;
    type Query = GetCountryListQuery;
    type Countries = NonNullable<GetCountryListQuery['countries']>;
    type Items = NonNullable<NonNullable<NonNullable<GetCountryListQuery['countries']>['items']>[number]>;
}
export declare namespace GetAvailableCountries {
    type Variables = GetAvailableCountriesQueryVariables;
    type Query = GetAvailableCountriesQuery;
    type Countries = NonNullable<GetAvailableCountriesQuery['countries']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetAvailableCountriesQuery['countries']>['items']>[number]
    >;
}
export declare namespace GetCountry {
    type Variables = GetCountryQueryVariables;
    type Query = GetCountryQuery;
    type Country = NonNullable<GetCountryQuery['country']>;
}
export declare namespace CreateCountry {
    type Variables = CreateCountryMutationVariables;
    type Mutation = CreateCountryMutation;
    type CreateCountry = NonNullable<CreateCountryMutation['createCountry']>;
}
export declare namespace UpdateCountry {
    type Variables = UpdateCountryMutationVariables;
    type Mutation = UpdateCountryMutation;
    type UpdateCountry = NonNullable<UpdateCountryMutation['updateCountry']>;
}
export declare namespace DeleteCountry {
    type Variables = DeleteCountryMutationVariables;
    type Mutation = DeleteCountryMutation;
    type DeleteCountry = NonNullable<DeleteCountryMutation['deleteCountry']>;
}
export declare namespace Zone {
    type Fragment = ZoneFragment;
    type Members = NonNullable<NonNullable<ZoneFragment['members']>[number]>;
}
export declare namespace GetZones {
    type Variables = GetZonesQueryVariables;
    type Query = GetZonesQuery;
    type Zones = NonNullable<NonNullable<GetZonesQuery['zones']>[number]>;
    type Members = NonNullable<
        NonNullable<NonNullable<NonNullable<GetZonesQuery['zones']>[number]>['members']>[number]
    >;
}
export declare namespace GetZone {
    type Variables = GetZoneQueryVariables;
    type Query = GetZoneQuery;
    type Zone = NonNullable<GetZoneQuery['zone']>;
}
export declare namespace CreateZone {
    type Variables = CreateZoneMutationVariables;
    type Mutation = CreateZoneMutation;
    type CreateZone = NonNullable<CreateZoneMutation['createZone']>;
}
export declare namespace UpdateZone {
    type Variables = UpdateZoneMutationVariables;
    type Mutation = UpdateZoneMutation;
    type UpdateZone = NonNullable<UpdateZoneMutation['updateZone']>;
}
export declare namespace DeleteZone {
    type Variables = DeleteZoneMutationVariables;
    type Mutation = DeleteZoneMutation;
    type DeleteZone = NonNullable<DeleteZoneMutation['deleteZone']>;
}
export declare namespace AddMembersToZone {
    type Variables = AddMembersToZoneMutationVariables;
    type Mutation = AddMembersToZoneMutation;
    type AddMembersToZone = NonNullable<AddMembersToZoneMutation['addMembersToZone']>;
}
export declare namespace RemoveMembersFromZone {
    type Variables = RemoveMembersFromZoneMutationVariables;
    type Mutation = RemoveMembersFromZoneMutation;
    type RemoveMembersFromZone = NonNullable<RemoveMembersFromZoneMutation['removeMembersFromZone']>;
}
export declare namespace TaxCategory {
    type Fragment = TaxCategoryFragment;
}
export declare namespace GetTaxCategories {
    type Variables = GetTaxCategoriesQueryVariables;
    type Query = GetTaxCategoriesQuery;
    type TaxCategories = NonNullable<NonNullable<GetTaxCategoriesQuery['taxCategories']>[number]>;
}
export declare namespace GetTaxCategory {
    type Variables = GetTaxCategoryQueryVariables;
    type Query = GetTaxCategoryQuery;
    type TaxCategory = NonNullable<GetTaxCategoryQuery['taxCategory']>;
}
export declare namespace CreateTaxCategory {
    type Variables = CreateTaxCategoryMutationVariables;
    type Mutation = CreateTaxCategoryMutation;
    type CreateTaxCategory = NonNullable<CreateTaxCategoryMutation['createTaxCategory']>;
}
export declare namespace UpdateTaxCategory {
    type Variables = UpdateTaxCategoryMutationVariables;
    type Mutation = UpdateTaxCategoryMutation;
    type UpdateTaxCategory = NonNullable<UpdateTaxCategoryMutation['updateTaxCategory']>;
}
export declare namespace DeleteTaxCategory {
    type Variables = DeleteTaxCategoryMutationVariables;
    type Mutation = DeleteTaxCategoryMutation;
    type DeleteTaxCategory = NonNullable<DeleteTaxCategoryMutation['deleteTaxCategory']>;
}
export declare namespace TaxRate {
    type Fragment = TaxRateFragment;
    type Category = NonNullable<TaxRateFragment['category']>;
    type Zone = NonNullable<TaxRateFragment['zone']>;
    type CustomerGroup = NonNullable<TaxRateFragment['customerGroup']>;
}
export declare namespace GetTaxRateList {
    type Variables = GetTaxRateListQueryVariables;
    type Query = GetTaxRateListQuery;
    type TaxRates = NonNullable<GetTaxRateListQuery['taxRates']>;
    type Items = NonNullable<NonNullable<NonNullable<GetTaxRateListQuery['taxRates']>['items']>[number]>;
}
export declare namespace GetTaxRateListSimple {
    type Variables = GetTaxRateListSimpleQueryVariables;
    type Query = GetTaxRateListSimpleQuery;
    type TaxRates = NonNullable<GetTaxRateListSimpleQuery['taxRates']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetTaxRateListSimpleQuery['taxRates']>['items']>[number]
    >;
    type Category = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetTaxRateListSimpleQuery['taxRates']>['items']>[number]
        >['category']
    >;
    type Zone = NonNullable<
        NonNullable<NonNullable<NonNullable<GetTaxRateListSimpleQuery['taxRates']>['items']>[number]>['zone']
    >;
}
export declare namespace GetTaxRate {
    type Variables = GetTaxRateQueryVariables;
    type Query = GetTaxRateQuery;
    type TaxRate = NonNullable<GetTaxRateQuery['taxRate']>;
}
export declare namespace CreateTaxRate {
    type Variables = CreateTaxRateMutationVariables;
    type Mutation = CreateTaxRateMutation;
    type CreateTaxRate = NonNullable<CreateTaxRateMutation['createTaxRate']>;
}
export declare namespace UpdateTaxRate {
    type Variables = UpdateTaxRateMutationVariables;
    type Mutation = UpdateTaxRateMutation;
    type UpdateTaxRate = NonNullable<UpdateTaxRateMutation['updateTaxRate']>;
}
export declare namespace DeleteTaxRate {
    type Variables = DeleteTaxRateMutationVariables;
    type Mutation = DeleteTaxRateMutation;
    type DeleteTaxRate = NonNullable<DeleteTaxRateMutation['deleteTaxRate']>;
}
export declare namespace Channel {
    type Fragment = ChannelFragment;
    type DefaultShippingZone = NonNullable<ChannelFragment['defaultShippingZone']>;
    type DefaultTaxZone = NonNullable<ChannelFragment['defaultTaxZone']>;
    type CustomFields = NonNullable<ChannelFragment['customFields']>;
}
export declare namespace GetChannels {
    type Variables = GetChannelsQueryVariables;
    type Query = GetChannelsQuery;
    type Channels = NonNullable<NonNullable<GetChannelsQuery['channels']>[number]>;
}
export declare namespace GetChannel {
    type Variables = GetChannelQueryVariables;
    type Query = GetChannelQuery;
    type Channel = NonNullable<GetChannelQuery['channel']>;
}
export declare namespace GetActiveChannel {
    type Variables = GetActiveChannelQueryVariables;
    type Query = GetActiveChannelQuery;
    type ActiveChannel = NonNullable<GetActiveChannelQuery['activeChannel']>;
}
export declare namespace CreateChannel {
    type Variables = CreateChannelMutationVariables;
    type Mutation = CreateChannelMutation;
    type CreateChannel = NonNullable<CreateChannelMutation['createChannel']>;
}
export declare namespace UpdateChannel {
    type Variables = UpdateChannelMutationVariables;
    type Mutation = UpdateChannelMutation;
    type UpdateChannel = NonNullable<UpdateChannelMutation['updateChannel']>;
}
export declare namespace DeleteChannel {
    type Variables = DeleteChannelMutationVariables;
    type Mutation = DeleteChannelMutation;
    type DeleteChannel = NonNullable<DeleteChannelMutation['deleteChannel']>;
}
export declare namespace PaymentMethod {
    type Fragment = PaymentMethodFragment;
    type Checker = NonNullable<PaymentMethodFragment['checker']>;
    type Handler = NonNullable<PaymentMethodFragment['handler']>;
}
export declare namespace GetPaymentMethodList {
    type Variables = GetPaymentMethodListQueryVariables;
    type Query = GetPaymentMethodListQuery;
    type PaymentMethods = NonNullable<GetPaymentMethodListQuery['paymentMethods']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetPaymentMethodListQuery['paymentMethods']>['items']>[number]
    >;
}
export declare namespace GetPaymentMethodOperations {
    type Variables = GetPaymentMethodOperationsQueryVariables;
    type Query = GetPaymentMethodOperationsQuery;
    type PaymentMethodEligibilityCheckers = NonNullable<
        NonNullable<GetPaymentMethodOperationsQuery['paymentMethodEligibilityCheckers']>[number]
    >;
    type PaymentMethodHandlers = NonNullable<
        NonNullable<GetPaymentMethodOperationsQuery['paymentMethodHandlers']>[number]
    >;
}
export declare namespace GetPaymentMethod {
    type Variables = GetPaymentMethodQueryVariables;
    type Query = GetPaymentMethodQuery;
    type PaymentMethod = NonNullable<GetPaymentMethodQuery['paymentMethod']>;
}
export declare namespace CreatePaymentMethod {
    type Variables = CreatePaymentMethodMutationVariables;
    type Mutation = CreatePaymentMethodMutation;
    type CreatePaymentMethod = NonNullable<CreatePaymentMethodMutation['createPaymentMethod']>;
}
export declare namespace UpdatePaymentMethod {
    type Variables = UpdatePaymentMethodMutationVariables;
    type Mutation = UpdatePaymentMethodMutation;
    type UpdatePaymentMethod = NonNullable<UpdatePaymentMethodMutation['updatePaymentMethod']>;
}
export declare namespace DeletePaymentMethod {
    type Variables = DeletePaymentMethodMutationVariables;
    type Mutation = DeletePaymentMethodMutation;
    type DeletePaymentMethod = NonNullable<DeletePaymentMethodMutation['deletePaymentMethod']>;
}
export declare namespace GlobalSettings {
    type Fragment = GlobalSettingsFragment;
    type ServerConfig = NonNullable<GlobalSettingsFragment['serverConfig']>;
    type Permissions = NonNullable<
        NonNullable<NonNullable<GlobalSettingsFragment['serverConfig']>['permissions']>[number]
    >;
    type OrderProcess = NonNullable<
        NonNullable<NonNullable<GlobalSettingsFragment['serverConfig']>['orderProcess']>[number]
    >;
}
export declare namespace GetGlobalSettings {
    type Variables = GetGlobalSettingsQueryVariables;
    type Query = GetGlobalSettingsQuery;
    type GlobalSettings = NonNullable<GetGlobalSettingsQuery['globalSettings']>;
}
export declare namespace UpdateGlobalSettings {
    type Variables = UpdateGlobalSettingsMutationVariables;
    type Mutation = UpdateGlobalSettingsMutation;
    type UpdateGlobalSettings = NonNullable<UpdateGlobalSettingsMutation['updateGlobalSettings']>;
}
export declare namespace CustomFieldConfig {
    type Fragment = CustomFieldConfigFragment;
    type Description = NonNullable<NonNullable<CustomFieldConfigFragment['description']>[number]>;
    type Label = NonNullable<NonNullable<CustomFieldConfigFragment['label']>[number]>;
}
export declare namespace StringCustomField {
    type Fragment = StringCustomFieldFragment;
    type Options = NonNullable<NonNullable<StringCustomFieldFragment['options']>[number]>;
    type Label = NonNullable<
        NonNullable<NonNullable<NonNullable<StringCustomFieldFragment['options']>[number]>['label']>[number]
    >;
}
export declare namespace LocaleStringCustomField {
    type Fragment = LocaleStringCustomFieldFragment;
}
export declare namespace TextCustomField {
    type Fragment = TextCustomFieldFragment;
}
export declare namespace BooleanCustomField {
    type Fragment = BooleanCustomFieldFragment;
}
export declare namespace IntCustomField {
    type Fragment = IntCustomFieldFragment;
}
export declare namespace FloatCustomField {
    type Fragment = FloatCustomFieldFragment;
}
export declare namespace DateTimeCustomField {
    type Fragment = DateTimeCustomFieldFragment;
}
export declare namespace RelationCustomField {
    type Fragment = RelationCustomFieldFragment;
}
export declare namespace CustomFields {
    type Fragment = CustomFieldsFragment;
    type StringCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'StringCustomFieldConfig';
        }
    >;
    type LocaleStringCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'LocaleStringCustomFieldConfig';
        }
    >;
    type TextCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'TextCustomFieldConfig';
        }
    >;
    type BooleanCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'BooleanCustomFieldConfig';
        }
    >;
    type IntCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'IntCustomFieldConfig';
        }
    >;
    type FloatCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'FloatCustomFieldConfig';
        }
    >;
    type DateTimeCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'DateTimeCustomFieldConfig';
        }
    >;
    type RelationCustomFieldConfigInlineFragment = DiscriminateUnion<
        CustomFieldsFragment,
        {
            __typename?: 'RelationCustomFieldConfig';
        }
    >;
}
export declare namespace GetServerConfig {
    type Variables = GetServerConfigQueryVariables;
    type Query = GetServerConfigQuery;
    type GlobalSettings = NonNullable<GetServerConfigQuery['globalSettings']>;
    type ServerConfig = NonNullable<NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']>;
    type OrderProcess = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']>['orderProcess']
        >[number]
    >;
    type Permissions = NonNullable<
        NonNullable<
            NonNullable<NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']>['permissions']
        >[number]
    >;
    type CustomFieldConfig = NonNullable<
        NonNullable<NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']>['customFieldConfig']
    >;
    type Address = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Address']
        >[number]
    >;
    type Administrator = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Administrator']
        >[number]
    >;
    type Asset = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Asset']
        >[number]
    >;
    type Channel = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Channel']
        >[number]
    >;
    type Collection = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Collection']
        >[number]
    >;
    type Country = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Country']
        >[number]
    >;
    type Customer = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Customer']
        >[number]
    >;
    type CustomerGroup = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['CustomerGroup']
        >[number]
    >;
    type Facet = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Facet']
        >[number]
    >;
    type FacetValue = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['FacetValue']
        >[number]
    >;
    type Fulfillment = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Fulfillment']
        >[number]
    >;
    type _GlobalSettings = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['GlobalSettings']
        >[number]
    >;
    type Order = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Order']
        >[number]
    >;
    type OrderLine = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['OrderLine']
        >[number]
    >;
    type PaymentMethod = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['PaymentMethod']
        >[number]
    >;
    type Product = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Product']
        >[number]
    >;
    type ProductOption = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['ProductOption']
        >[number]
    >;
    type ProductOptionGroup = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['ProductOptionGroup']
        >[number]
    >;
    type ProductVariant = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['ProductVariant']
        >[number]
    >;
    type Promotion = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Promotion']
        >[number]
    >;
    type ShippingMethod = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['ShippingMethod']
        >[number]
    >;
    type TaxCategory = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['TaxCategory']
        >[number]
    >;
    type TaxRate = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['TaxRate']
        >[number]
    >;
    type User = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['User']
        >[number]
    >;
    type Zone = NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    NonNullable<GetServerConfigQuery['globalSettings']>['serverConfig']
                >['customFieldConfig']
            >['Zone']
        >[number]
    >;
}
export declare namespace JobInfo {
    type Fragment = JobInfoFragment;
}
export declare namespace GetJobInfo {
    type Variables = GetJobInfoQueryVariables;
    type Query = GetJobInfoQuery;
    type Job = NonNullable<GetJobInfoQuery['job']>;
}
export declare namespace GetAllJobs {
    type Variables = GetAllJobsQueryVariables;
    type Query = GetAllJobsQuery;
    type Jobs = NonNullable<GetAllJobsQuery['jobs']>;
    type Items = NonNullable<NonNullable<NonNullable<GetAllJobsQuery['jobs']>['items']>[number]>;
}
export declare namespace GetJobsById {
    type Variables = GetJobsByIdQueryVariables;
    type Query = GetJobsByIdQuery;
    type JobsById = NonNullable<NonNullable<GetJobsByIdQuery['jobsById']>[number]>;
}
export declare namespace GetJobQueueList {
    type Variables = GetJobQueueListQueryVariables;
    type Query = GetJobQueueListQuery;
    type JobQueues = NonNullable<NonNullable<GetJobQueueListQuery['jobQueues']>[number]>;
}
export declare namespace CancelJob {
    type Variables = CancelJobMutationVariables;
    type Mutation = CancelJobMutation;
    type CancelJob = NonNullable<CancelJobMutation['cancelJob']>;
}
export declare namespace Reindex {
    type Variables = ReindexMutationVariables;
    type Mutation = ReindexMutation;
    type Reindex = NonNullable<ReindexMutation['reindex']>;
}
export declare namespace GetPendingSearchIndexUpdates {
    type Variables = GetPendingSearchIndexUpdatesQueryVariables;
    type Query = GetPendingSearchIndexUpdatesQuery;
}
export declare namespace RunPendingSearchIndexUpdates {
    type Variables = RunPendingSearchIndexUpdatesMutationVariables;
    type Mutation = RunPendingSearchIndexUpdatesMutation;
    type RunPendingSearchIndexUpdates = NonNullable<
        RunPendingSearchIndexUpdatesMutation['runPendingSearchIndexUpdates']
    >;
}
export declare namespace ConfigurableOperation {
    type Fragment = ConfigurableOperationFragment;
    type Args = NonNullable<NonNullable<ConfigurableOperationFragment['args']>[number]>;
}
export declare namespace ConfigurableOperationDef {
    type Fragment = ConfigurableOperationDefFragment;
    type Args = NonNullable<NonNullable<ConfigurableOperationDefFragment['args']>[number]>;
}
export declare namespace ErrorResult {
    type Fragment = ErrorResultFragment;
}
export declare namespace ShippingMethod {
    type Fragment = ShippingMethodFragment;
    type Checker = NonNullable<ShippingMethodFragment['checker']>;
    type Calculator = NonNullable<ShippingMethodFragment['calculator']>;
    type Translations = NonNullable<NonNullable<ShippingMethodFragment['translations']>[number]>;
}
export declare namespace GetShippingMethodList {
    type Variables = GetShippingMethodListQueryVariables;
    type Query = GetShippingMethodListQuery;
    type ShippingMethods = NonNullable<GetShippingMethodListQuery['shippingMethods']>;
    type Items = NonNullable<
        NonNullable<NonNullable<GetShippingMethodListQuery['shippingMethods']>['items']>[number]
    >;
}
export declare namespace GetShippingMethod {
    type Variables = GetShippingMethodQueryVariables;
    type Query = GetShippingMethodQuery;
    type ShippingMethod = NonNullable<GetShippingMethodQuery['shippingMethod']>;
}
export declare namespace GetShippingMethodOperations {
    type Variables = GetShippingMethodOperationsQueryVariables;
    type Query = GetShippingMethodOperationsQuery;
    type ShippingEligibilityCheckers = NonNullable<
        NonNullable<GetShippingMethodOperationsQuery['shippingEligibilityCheckers']>[number]
    >;
    type ShippingCalculators = NonNullable<
        NonNullable<GetShippingMethodOperationsQuery['shippingCalculators']>[number]
    >;
    type FulfillmentHandlers = NonNullable<
        NonNullable<GetShippingMethodOperationsQuery['fulfillmentHandlers']>[number]
    >;
}
export declare namespace CreateShippingMethod {
    type Variables = CreateShippingMethodMutationVariables;
    type Mutation = CreateShippingMethodMutation;
    type CreateShippingMethod = NonNullable<CreateShippingMethodMutation['createShippingMethod']>;
}
export declare namespace UpdateShippingMethod {
    type Variables = UpdateShippingMethodMutationVariables;
    type Mutation = UpdateShippingMethodMutation;
    type UpdateShippingMethod = NonNullable<UpdateShippingMethodMutation['updateShippingMethod']>;
}
export declare namespace DeleteShippingMethod {
    type Variables = DeleteShippingMethodMutationVariables;
    type Mutation = DeleteShippingMethodMutation;
    type DeleteShippingMethod = NonNullable<DeleteShippingMethodMutation['deleteShippingMethod']>;
}
export declare namespace TestShippingMethod {
    type Variables = TestShippingMethodQueryVariables;
    type Query = TestShippingMethodQuery;
    type TestShippingMethod = NonNullable<TestShippingMethodQuery['testShippingMethod']>;
    type Quote = NonNullable<NonNullable<TestShippingMethodQuery['testShippingMethod']>['quote']>;
}
export declare namespace TestEligibleShippingMethods {
    type Variables = TestEligibleShippingMethodsQueryVariables;
    type Query = TestEligibleShippingMethodsQuery;
    type TestEligibleShippingMethods = NonNullable<
        NonNullable<TestEligibleShippingMethodsQuery['testEligibleShippingMethods']>[number]
    >;
}
export declare namespace GetCustomerAddresses {
    type Variables = GetCustomerAddressesQueryVariables;
    type Query = GetCustomerAddressesQuery;
    type Customer = NonNullable<GetCustomerAddressesQuery['customer']>;
    type Addresses = NonNullable<
        NonNullable<NonNullable<GetCustomerAddressesQuery['customer']>['addresses']>[number]
    >;
}
export {};

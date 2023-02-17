// tslint:disable
const result = {
    "possibleTypes": {
        "AddFulfillmentToOrderResult": [
            "Fulfillment",
            "EmptyOrderLineSelectionError",
            "ItemsAlreadyFulfilledError",
            "InsufficientStockOnHandError",
            "InvalidFulfillmentHandlerError",
            "FulfillmentStateTransitionError",
            "CreateFulfillmentError"
        ],
        "AddManualPaymentToOrderResult": [
            "Order",
            "ManualPaymentStateError"
        ],
        "ApplyCouponCodeResult": [
            "Order",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError"
        ],
        "AuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError"
        ],
        "CancelOrderResult": [
            "Order",
            "EmptyOrderLineSelectionError",
            "QuantityTooGreatError",
            "MultipleOrderError",
            "CancelActiveOrderError",
            "OrderStateTransitionError"
        ],
        "CancelPaymentResult": [
            "Payment",
            "CancelPaymentError",
            "PaymentStateTransitionError"
        ],
        "CreateAssetResult": [
            "Asset",
            "MimeTypeError"
        ],
        "CreateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "CreateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "CreatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ],
        "CustomField": [
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "FloatCustomFieldConfig",
            "IntCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "RelationCustomFieldConfig",
            "StringCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "CustomFieldConfig": [
            "StringCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "IntCustomFieldConfig",
            "FloatCustomFieldConfig",
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "RelationCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "ErrorResult": [
            "AlreadyRefundedError",
            "CancelActiveOrderError",
            "CancelPaymentError",
            "ChannelDefaultLanguageError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError",
            "CreateFulfillmentError",
            "EmailAddressConflictError",
            "EmptyOrderLineSelectionError",
            "FacetInUseError",
            "FulfillmentStateTransitionError",
            "IneligibleShippingMethodError",
            "InsufficientStockError",
            "InsufficientStockOnHandError",
            "InvalidCredentialsError",
            "InvalidFulfillmentHandlerError",
            "ItemsAlreadyFulfilledError",
            "LanguageNotAvailableError",
            "ManualPaymentStateError",
            "MimeTypeError",
            "MissingConditionsError",
            "MultipleOrderError",
            "NativeAuthStrategyError",
            "NegativeQuantityError",
            "NoActiveOrderError",
            "NoChangesSpecifiedError",
            "NothingToRefundError",
            "OrderLimitError",
            "OrderModificationError",
            "OrderModificationStateError",
            "OrderStateTransitionError",
            "PaymentMethodMissingError",
            "PaymentOrderMismatchError",
            "PaymentStateTransitionError",
            "ProductOptionInUseError",
            "QuantityTooGreatError",
            "RefundOrderStateError",
            "RefundPaymentIdMissingError",
            "RefundStateTransitionError",
            "SettlePaymentError",
            "ShopClosedError"
        ],
        "ModifyOrderResult": [
            "Order",
            "NoChangesSpecifiedError",
            "OrderModificationStateError",
            "PaymentMethodMissingError",
            "RefundPaymentIdMissingError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError"
        ],
        "NativeAuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError",
            "NativeAuthStrategyError"
        ],
        "Node": [
            "Address",
            "Administrator",
            "Allocation",
            "Asset",
            "AuthenticationMethod",
            "Cancellation",
            "Channel",
            "Collection",
            "Country",
            "Customer",
            "CustomerGroup",
            "Facet",
            "FacetValue",
            "Fulfillment",
            "HistoryEntry",
            "Job",
            "Order",
            "OrderItem",
            "OrderLine",
            "OrderModification",
            "Payment",
            "PaymentMethod",
            "Product",
            "ProductOption",
            "ProductOptionGroup",
            "ProductVariant",
            "Promotion",
            "Refund",
            "Release",
            "Return",
            "Role",
            "Sale",
            "ShippingMethod",
            "StockAdjustment",
            "Surcharge",
            "Tag",
            "TaxCategory",
            "TaxRate",
            "User",
            "Zone"
        ],
        "PaginatedList": [
            "AdministratorList",
            "AssetList",
            "CollectionList",
            "CountryList",
            "CustomerGroupList",
            "CustomerList",
            "FacetList",
            "HistoryEntryList",
            "JobList",
            "OrderList",
            "PaymentMethodList",
            "ProductList",
            "ProductVariantList",
            "PromotionList",
            "RoleList",
            "ShippingMethodList",
            "TagList",
            "TaxRateList"
        ],
        "RefundOrderResult": [
            "Refund",
            "QuantityTooGreatError",
            "NothingToRefundError",
            "OrderStateTransitionError",
            "MultipleOrderError",
            "PaymentOrderMismatchError",
            "RefundOrderStateError",
            "AlreadyRefundedError",
            "RefundStateTransitionError"
        ],
        "RemoveFacetFromChannelResult": [
            "Facet",
            "FacetInUseError"
        ],
        "RemoveOptionGroupFromProductResult": [
            "Product",
            "ProductOptionInUseError"
        ],
        "RemoveOrderItemsResult": [
            "Order",
            "OrderModificationError"
        ],
        "SearchResultPrice": [
            "PriceRange",
            "SinglePrice"
        ],
        "SetCustomerForDraftOrderResult": [
            "Order",
            "EmailAddressConflictError"
        ],
        "SetOrderShippingMethodResult": [
            "Order",
            "OrderModificationError",
            "IneligibleShippingMethodError",
            "NoActiveOrderError"
        ],
        "SettlePaymentResult": [
            "Payment",
            "SettlePaymentError",
            "PaymentStateTransitionError",
            "OrderStateTransitionError"
        ],
        "SettleRefundResult": [
            "Refund",
            "RefundStateTransitionError"
        ],
        "StockMovement": [
            "Allocation",
            "Cancellation",
            "Release",
            "Return",
            "Sale",
            "StockAdjustment"
        ],
        "StockMovementItem": [
            "StockAdjustment",
            "Allocation",
            "Sale",
            "Cancellation",
            "Return",
            "Release"
        ],
        "TransitionFulfillmentToStateResult": [
            "Fulfillment",
            "FulfillmentStateTransitionError"
        ],
        "TransitionOrderToStateResult": [
            "Order",
            "OrderStateTransitionError"
        ],
        "TransitionPaymentToStateResult": [
            "Payment",
            "PaymentStateTransitionError"
        ],
        "UpdateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "UpdateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "UpdateGlobalSettingsResult": [
            "GlobalSettings",
            "ChannelDefaultLanguageError"
        ],
        "UpdateOrderItemsResult": [
            "Order",
            "ShopClosedError",
            "OrderModificationError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError"
        ],
        "UpdatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ]
    }
};
export default result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50cm9zcGVjdGlvbi1yZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbW1vbi9pbnRyb3NwZWN0aW9uLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUI7QUFPWCxNQUFNLE1BQU0sR0FBNEI7SUFDNUMsZUFBZSxFQUFFO1FBQ2YsNkJBQTZCLEVBQUU7WUFDN0IsYUFBYTtZQUNiLDhCQUE4QjtZQUM5Qiw0QkFBNEI7WUFDNUIsOEJBQThCO1lBQzlCLGdDQUFnQztZQUNoQyxpQ0FBaUM7WUFDakMsd0JBQXdCO1NBQ3pCO1FBQ0QsK0JBQStCLEVBQUU7WUFDL0IsT0FBTztZQUNQLHlCQUF5QjtTQUMxQjtRQUNELHVCQUF1QixFQUFFO1lBQ3ZCLE9BQU87WUFDUCx3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLHNCQUFzQjtTQUN2QjtRQUNELHNCQUFzQixFQUFFO1lBQ3RCLGFBQWE7WUFDYix5QkFBeUI7U0FDMUI7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixPQUFPO1lBQ1AsOEJBQThCO1lBQzlCLHVCQUF1QjtZQUN2QixvQkFBb0I7WUFDcEIsd0JBQXdCO1lBQ3hCLDJCQUEyQjtTQUM1QjtRQUNELHFCQUFxQixFQUFFO1lBQ3JCLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsNkJBQTZCO1NBQzlCO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsT0FBTztZQUNQLGVBQWU7U0FDaEI7UUFDRCxxQkFBcUIsRUFBRTtZQUNyQixTQUFTO1lBQ1QsMkJBQTJCO1NBQzVCO1FBQ0Qsc0JBQXNCLEVBQUU7WUFDdEIsVUFBVTtZQUNWLDJCQUEyQjtTQUM1QjtRQUNELHVCQUF1QixFQUFFO1lBQ3ZCLFdBQVc7WUFDWCx3QkFBd0I7U0FDekI7UUFDRCxhQUFhLEVBQUU7WUFDYiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFDdEIsK0JBQStC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Q3ZCLHdCQUF3QjtTQUN6QjtRQUNELHVCQUF1QixFQUFFO1lBQ3ZCLFdBQVc7WUFDWCx3QkFBd0I7U0FDekI7S0FDRjtDQUNGLENBQUM7QUFDSSxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlXG5cbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgUG9zc2libGVUeXBlc1Jlc3VsdERhdGEge1xuICAgICAgICBwb3NzaWJsZVR5cGVzOiB7XG4gICAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0OiBQb3NzaWJsZVR5cGVzUmVzdWx0RGF0YSA9IHtcbiAgXCJwb3NzaWJsZVR5cGVzXCI6IHtcbiAgICBcIkFkZEZ1bGZpbGxtZW50VG9PcmRlclJlc3VsdFwiOiBbXG4gICAgICBcIkZ1bGZpbGxtZW50XCIsXG4gICAgICBcIkVtcHR5T3JkZXJMaW5lU2VsZWN0aW9uRXJyb3JcIixcbiAgICAgIFwiSXRlbXNBbHJlYWR5RnVsZmlsbGVkRXJyb3JcIixcbiAgICAgIFwiSW5zdWZmaWNpZW50U3RvY2tPbkhhbmRFcnJvclwiLFxuICAgICAgXCJJbnZhbGlkRnVsZmlsbG1lbnRIYW5kbGVyRXJyb3JcIixcbiAgICAgIFwiRnVsZmlsbG1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJDcmVhdGVGdWxmaWxsbWVudEVycm9yXCJcbiAgICBdLFxuICAgIFwiQWRkTWFudWFsUGF5bWVudFRvT3JkZXJSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJNYW51YWxQYXltZW50U3RhdGVFcnJvclwiXG4gICAgXSxcbiAgICBcIkFwcGx5Q291cG9uQ29kZVJlc3VsdFwiOiBbXG4gICAgICBcIk9yZGVyXCIsXG4gICAgICBcIkNvdXBvbkNvZGVFeHBpcmVkRXJyb3JcIixcbiAgICAgIFwiQ291cG9uQ29kZUludmFsaWRFcnJvclwiLFxuICAgICAgXCJDb3Vwb25Db2RlTGltaXRFcnJvclwiXG4gICAgXSxcbiAgICBcIkF1dGhlbnRpY2F0aW9uUmVzdWx0XCI6IFtcbiAgICAgIFwiQ3VycmVudFVzZXJcIixcbiAgICAgIFwiSW52YWxpZENyZWRlbnRpYWxzRXJyb3JcIlxuICAgIF0sXG4gICAgXCJDYW5jZWxPcmRlclJlc3VsdFwiOiBbXG4gICAgICBcIk9yZGVyXCIsXG4gICAgICBcIkVtcHR5T3JkZXJMaW5lU2VsZWN0aW9uRXJyb3JcIixcbiAgICAgIFwiUXVhbnRpdHlUb29HcmVhdEVycm9yXCIsXG4gICAgICBcIk11bHRpcGxlT3JkZXJFcnJvclwiLFxuICAgICAgXCJDYW5jZWxBY3RpdmVPcmRlckVycm9yXCIsXG4gICAgICBcIk9yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3JcIlxuICAgIF0sXG4gICAgXCJDYW5jZWxQYXltZW50UmVzdWx0XCI6IFtcbiAgICAgIFwiUGF5bWVudFwiLFxuICAgICAgXCJDYW5jZWxQYXltZW50RXJyb3JcIixcbiAgICAgIFwiUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiQ3JlYXRlQXNzZXRSZXN1bHRcIjogW1xuICAgICAgXCJBc3NldFwiLFxuICAgICAgXCJNaW1lVHlwZUVycm9yXCJcbiAgICBdLFxuICAgIFwiQ3JlYXRlQ2hhbm5lbFJlc3VsdFwiOiBbXG4gICAgICBcIkNoYW5uZWxcIixcbiAgICAgIFwiTGFuZ3VhZ2VOb3RBdmFpbGFibGVFcnJvclwiXG4gICAgXSxcbiAgICBcIkNyZWF0ZUN1c3RvbWVyUmVzdWx0XCI6IFtcbiAgICAgIFwiQ3VzdG9tZXJcIixcbiAgICAgIFwiRW1haWxBZGRyZXNzQ29uZmxpY3RFcnJvclwiXG4gICAgXSxcbiAgICBcIkNyZWF0ZVByb21vdGlvblJlc3VsdFwiOiBbXG4gICAgICBcIlByb21vdGlvblwiLFxuICAgICAgXCJNaXNzaW5nQ29uZGl0aW9uc0Vycm9yXCJcbiAgICBdLFxuICAgIFwiQ3VzdG9tRmllbGRcIjogW1xuICAgICAgXCJCb29sZWFuQ3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiRGF0ZVRpbWVDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJGbG9hdEN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkludEN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkxvY2FsZVN0cmluZ0N1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIlJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiU3RyaW5nQ3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiVGV4dEN1c3RvbUZpZWxkQ29uZmlnXCJcbiAgICBdLFxuICAgIFwiQ3VzdG9tRmllbGRDb25maWdcIjogW1xuICAgICAgXCJTdHJpbmdDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJMb2NhbGVTdHJpbmdDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJJbnRDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJGbG9hdEN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkJvb2xlYW5DdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIlJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiVGV4dEN1c3RvbUZpZWxkQ29uZmlnXCJcbiAgICBdLFxuICAgIFwiRXJyb3JSZXN1bHRcIjogW1xuICAgICAgXCJBbHJlYWR5UmVmdW5kZWRFcnJvclwiLFxuICAgICAgXCJDYW5jZWxBY3RpdmVPcmRlckVycm9yXCIsXG4gICAgICBcIkNhbmNlbFBheW1lbnRFcnJvclwiLFxuICAgICAgXCJDaGFubmVsRGVmYXVsdExhbmd1YWdlRXJyb3JcIixcbiAgICAgIFwiQ291cG9uQ29kZUV4cGlyZWRFcnJvclwiLFxuICAgICAgXCJDb3Vwb25Db2RlSW52YWxpZEVycm9yXCIsXG4gICAgICBcIkNvdXBvbkNvZGVMaW1pdEVycm9yXCIsXG4gICAgICBcIkNyZWF0ZUZ1bGZpbGxtZW50RXJyb3JcIixcbiAgICAgIFwiRW1haWxBZGRyZXNzQ29uZmxpY3RFcnJvclwiLFxuICAgICAgXCJFbXB0eU9yZGVyTGluZVNlbGVjdGlvbkVycm9yXCIsXG4gICAgICBcIkZhY2V0SW5Vc2VFcnJvclwiLFxuICAgICAgXCJGdWxmaWxsbWVudFN0YXRlVHJhbnNpdGlvbkVycm9yXCIsXG4gICAgICBcIkluZWxpZ2libGVTaGlwcGluZ01ldGhvZEVycm9yXCIsXG4gICAgICBcIkluc3VmZmljaWVudFN0b2NrRXJyb3JcIixcbiAgICAgIFwiSW5zdWZmaWNpZW50U3RvY2tPbkhhbmRFcnJvclwiLFxuICAgICAgXCJJbnZhbGlkQ3JlZGVudGlhbHNFcnJvclwiLFxuICAgICAgXCJJbnZhbGlkRnVsZmlsbG1lbnRIYW5kbGVyRXJyb3JcIixcbiAgICAgIFwiSXRlbXNBbHJlYWR5RnVsZmlsbGVkRXJyb3JcIixcbiAgICAgIFwiTGFuZ3VhZ2VOb3RBdmFpbGFibGVFcnJvclwiLFxuICAgICAgXCJNYW51YWxQYXltZW50U3RhdGVFcnJvclwiLFxuICAgICAgXCJNaW1lVHlwZUVycm9yXCIsXG4gICAgICBcIk1pc3NpbmdDb25kaXRpb25zRXJyb3JcIixcbiAgICAgIFwiTXVsdGlwbGVPcmRlckVycm9yXCIsXG4gICAgICBcIk5hdGl2ZUF1dGhTdHJhdGVneUVycm9yXCIsXG4gICAgICBcIk5lZ2F0aXZlUXVhbnRpdHlFcnJvclwiLFxuICAgICAgXCJOb0FjdGl2ZU9yZGVyRXJyb3JcIixcbiAgICAgIFwiTm9DaGFuZ2VzU3BlY2lmaWVkRXJyb3JcIixcbiAgICAgIFwiTm90aGluZ1RvUmVmdW5kRXJyb3JcIixcbiAgICAgIFwiT3JkZXJMaW1pdEVycm9yXCIsXG4gICAgICBcIk9yZGVyTW9kaWZpY2F0aW9uRXJyb3JcIixcbiAgICAgIFwiT3JkZXJNb2RpZmljYXRpb25TdGF0ZUVycm9yXCIsXG4gICAgICBcIk9yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3JcIixcbiAgICAgIFwiUGF5bWVudE1ldGhvZE1pc3NpbmdFcnJvclwiLFxuICAgICAgXCJQYXltZW50T3JkZXJNaXNtYXRjaEVycm9yXCIsXG4gICAgICBcIlBheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJQcm9kdWN0T3B0aW9uSW5Vc2VFcnJvclwiLFxuICAgICAgXCJRdWFudGl0eVRvb0dyZWF0RXJyb3JcIixcbiAgICAgIFwiUmVmdW5kT3JkZXJTdGF0ZUVycm9yXCIsXG4gICAgICBcIlJlZnVuZFBheW1lbnRJZE1pc3NpbmdFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJTZXR0bGVQYXltZW50RXJyb3JcIixcbiAgICAgIFwiU2hvcENsb3NlZEVycm9yXCJcbiAgICBdLFxuICAgIFwiTW9kaWZ5T3JkZXJSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJOb0NoYW5nZXNTcGVjaWZpZWRFcnJvclwiLFxuICAgICAgXCJPcmRlck1vZGlmaWNhdGlvblN0YXRlRXJyb3JcIixcbiAgICAgIFwiUGF5bWVudE1ldGhvZE1pc3NpbmdFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRQYXltZW50SWRNaXNzaW5nRXJyb3JcIixcbiAgICAgIFwiT3JkZXJMaW1pdEVycm9yXCIsXG4gICAgICBcIk5lZ2F0aXZlUXVhbnRpdHlFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja0Vycm9yXCIsXG4gICAgICBcIkNvdXBvbkNvZGVFeHBpcmVkRXJyb3JcIixcbiAgICAgIFwiQ291cG9uQ29kZUludmFsaWRFcnJvclwiLFxuICAgICAgXCJDb3Vwb25Db2RlTGltaXRFcnJvclwiXG4gICAgXSxcbiAgICBcIk5hdGl2ZUF1dGhlbnRpY2F0aW9uUmVzdWx0XCI6IFtcbiAgICAgIFwiQ3VycmVudFVzZXJcIixcbiAgICAgIFwiSW52YWxpZENyZWRlbnRpYWxzRXJyb3JcIixcbiAgICAgIFwiTmF0aXZlQXV0aFN0cmF0ZWd5RXJyb3JcIlxuICAgIF0sXG4gICAgXCJOb2RlXCI6IFtcbiAgICAgIFwiQWRkcmVzc1wiLFxuICAgICAgXCJBZG1pbmlzdHJhdG9yXCIsXG4gICAgICBcIkFsbG9jYXRpb25cIixcbiAgICAgIFwiQXNzZXRcIixcbiAgICAgIFwiQXV0aGVudGljYXRpb25NZXRob2RcIixcbiAgICAgIFwiQ2FuY2VsbGF0aW9uXCIsXG4gICAgICBcIkNoYW5uZWxcIixcbiAgICAgIFwiQ29sbGVjdGlvblwiLFxuICAgICAgXCJDb3VudHJ5XCIsXG4gICAgICBcIkN1c3RvbWVyXCIsXG4gICAgICBcIkN1c3RvbWVyR3JvdXBcIixcbiAgICAgIFwiRmFjZXRcIixcbiAgICAgIFwiRmFjZXRWYWx1ZVwiLFxuICAgICAgXCJGdWxmaWxsbWVudFwiLFxuICAgICAgXCJIaXN0b3J5RW50cnlcIixcbiAgICAgIFwiSm9iXCIsXG4gICAgICBcIk9yZGVyXCIsXG4gICAgICBcIk9yZGVySXRlbVwiLFxuICAgICAgXCJPcmRlckxpbmVcIixcbiAgICAgIFwiT3JkZXJNb2RpZmljYXRpb25cIixcbiAgICAgIFwiUGF5bWVudFwiLFxuICAgICAgXCJQYXltZW50TWV0aG9kXCIsXG4gICAgICBcIlByb2R1Y3RcIixcbiAgICAgIFwiUHJvZHVjdE9wdGlvblwiLFxuICAgICAgXCJQcm9kdWN0T3B0aW9uR3JvdXBcIixcbiAgICAgIFwiUHJvZHVjdFZhcmlhbnRcIixcbiAgICAgIFwiUHJvbW90aW9uXCIsXG4gICAgICBcIlJlZnVuZFwiLFxuICAgICAgXCJSZWxlYXNlXCIsXG4gICAgICBcIlJldHVyblwiLFxuICAgICAgXCJSb2xlXCIsXG4gICAgICBcIlNhbGVcIixcbiAgICAgIFwiU2hpcHBpbmdNZXRob2RcIixcbiAgICAgIFwiU3RvY2tBZGp1c3RtZW50XCIsXG4gICAgICBcIlN1cmNoYXJnZVwiLFxuICAgICAgXCJUYWdcIixcbiAgICAgIFwiVGF4Q2F0ZWdvcnlcIixcbiAgICAgIFwiVGF4UmF0ZVwiLFxuICAgICAgXCJVc2VyXCIsXG4gICAgICBcIlpvbmVcIlxuICAgIF0sXG4gICAgXCJQYWdpbmF0ZWRMaXN0XCI6IFtcbiAgICAgIFwiQWRtaW5pc3RyYXRvckxpc3RcIixcbiAgICAgIFwiQXNzZXRMaXN0XCIsXG4gICAgICBcIkNvbGxlY3Rpb25MaXN0XCIsXG4gICAgICBcIkNvdW50cnlMaXN0XCIsXG4gICAgICBcIkN1c3RvbWVyR3JvdXBMaXN0XCIsXG4gICAgICBcIkN1c3RvbWVyTGlzdFwiLFxuICAgICAgXCJGYWNldExpc3RcIixcbiAgICAgIFwiSGlzdG9yeUVudHJ5TGlzdFwiLFxuICAgICAgXCJKb2JMaXN0XCIsXG4gICAgICBcIk9yZGVyTGlzdFwiLFxuICAgICAgXCJQYXltZW50TWV0aG9kTGlzdFwiLFxuICAgICAgXCJQcm9kdWN0TGlzdFwiLFxuICAgICAgXCJQcm9kdWN0VmFyaWFudExpc3RcIixcbiAgICAgIFwiUHJvbW90aW9uTGlzdFwiLFxuICAgICAgXCJSb2xlTGlzdFwiLFxuICAgICAgXCJTaGlwcGluZ01ldGhvZExpc3RcIixcbiAgICAgIFwiVGFnTGlzdFwiLFxuICAgICAgXCJUYXhSYXRlTGlzdFwiXG4gICAgXSxcbiAgICBcIlJlZnVuZE9yZGVyUmVzdWx0XCI6IFtcbiAgICAgIFwiUmVmdW5kXCIsXG4gICAgICBcIlF1YW50aXR5VG9vR3JlYXRFcnJvclwiLFxuICAgICAgXCJOb3RoaW5nVG9SZWZ1bmRFcnJvclwiLFxuICAgICAgXCJPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yXCIsXG4gICAgICBcIk11bHRpcGxlT3JkZXJFcnJvclwiLFxuICAgICAgXCJQYXltZW50T3JkZXJNaXNtYXRjaEVycm9yXCIsXG4gICAgICBcIlJlZnVuZE9yZGVyU3RhdGVFcnJvclwiLFxuICAgICAgXCJBbHJlYWR5UmVmdW5kZWRFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRTdGF0ZVRyYW5zaXRpb25FcnJvclwiXG4gICAgXSxcbiAgICBcIlJlbW92ZUZhY2V0RnJvbUNoYW5uZWxSZXN1bHRcIjogW1xuICAgICAgXCJGYWNldFwiLFxuICAgICAgXCJGYWNldEluVXNlRXJyb3JcIlxuICAgIF0sXG4gICAgXCJSZW1vdmVPcHRpb25Hcm91cEZyb21Qcm9kdWN0UmVzdWx0XCI6IFtcbiAgICAgIFwiUHJvZHVjdFwiLFxuICAgICAgXCJQcm9kdWN0T3B0aW9uSW5Vc2VFcnJvclwiXG4gICAgXSxcbiAgICBcIlJlbW92ZU9yZGVySXRlbXNSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJPcmRlck1vZGlmaWNhdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiU2VhcmNoUmVzdWx0UHJpY2VcIjogW1xuICAgICAgXCJQcmljZVJhbmdlXCIsXG4gICAgICBcIlNpbmdsZVByaWNlXCJcbiAgICBdLFxuICAgIFwiU2V0Q3VzdG9tZXJGb3JEcmFmdE9yZGVyUmVzdWx0XCI6IFtcbiAgICAgIFwiT3JkZXJcIixcbiAgICAgIFwiRW1haWxBZGRyZXNzQ29uZmxpY3RFcnJvclwiXG4gICAgXSxcbiAgICBcIlNldE9yZGVyU2hpcHBpbmdNZXRob2RSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJPcmRlck1vZGlmaWNhdGlvbkVycm9yXCIsXG4gICAgICBcIkluZWxpZ2libGVTaGlwcGluZ01ldGhvZEVycm9yXCIsXG4gICAgICBcIk5vQWN0aXZlT3JkZXJFcnJvclwiXG4gICAgXSxcbiAgICBcIlNldHRsZVBheW1lbnRSZXN1bHRcIjogW1xuICAgICAgXCJQYXltZW50XCIsXG4gICAgICBcIlNldHRsZVBheW1lbnRFcnJvclwiLFxuICAgICAgXCJQYXltZW50U3RhdGVUcmFuc2l0aW9uRXJyb3JcIixcbiAgICAgIFwiT3JkZXJTdGF0ZVRyYW5zaXRpb25FcnJvclwiXG4gICAgXSxcbiAgICBcIlNldHRsZVJlZnVuZFJlc3VsdFwiOiBbXG4gICAgICBcIlJlZnVuZFwiLFxuICAgICAgXCJSZWZ1bmRTdGF0ZVRyYW5zaXRpb25FcnJvclwiXG4gICAgXSxcbiAgICBcIlN0b2NrTW92ZW1lbnRcIjogW1xuICAgICAgXCJBbGxvY2F0aW9uXCIsXG4gICAgICBcIkNhbmNlbGxhdGlvblwiLFxuICAgICAgXCJSZWxlYXNlXCIsXG4gICAgICBcIlJldHVyblwiLFxuICAgICAgXCJTYWxlXCIsXG4gICAgICBcIlN0b2NrQWRqdXN0bWVudFwiXG4gICAgXSxcbiAgICBcIlN0b2NrTW92ZW1lbnRJdGVtXCI6IFtcbiAgICAgIFwiU3RvY2tBZGp1c3RtZW50XCIsXG4gICAgICBcIkFsbG9jYXRpb25cIixcbiAgICAgIFwiU2FsZVwiLFxuICAgICAgXCJDYW5jZWxsYXRpb25cIixcbiAgICAgIFwiUmV0dXJuXCIsXG4gICAgICBcIlJlbGVhc2VcIlxuICAgIF0sXG4gICAgXCJUcmFuc2l0aW9uRnVsZmlsbG1lbnRUb1N0YXRlUmVzdWx0XCI6IFtcbiAgICAgIFwiRnVsZmlsbG1lbnRcIixcbiAgICAgIFwiRnVsZmlsbG1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiXG4gICAgXSxcbiAgICBcIlRyYW5zaXRpb25PcmRlclRvU3RhdGVSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiVHJhbnNpdGlvblBheW1lbnRUb1N0YXRlUmVzdWx0XCI6IFtcbiAgICAgIFwiUGF5bWVudFwiLFxuICAgICAgXCJQYXltZW50U3RhdGVUcmFuc2l0aW9uRXJyb3JcIlxuICAgIF0sXG4gICAgXCJVcGRhdGVDaGFubmVsUmVzdWx0XCI6IFtcbiAgICAgIFwiQ2hhbm5lbFwiLFxuICAgICAgXCJMYW5ndWFnZU5vdEF2YWlsYWJsZUVycm9yXCJcbiAgICBdLFxuICAgIFwiVXBkYXRlQ3VzdG9tZXJSZXN1bHRcIjogW1xuICAgICAgXCJDdXN0b21lclwiLFxuICAgICAgXCJFbWFpbEFkZHJlc3NDb25mbGljdEVycm9yXCJcbiAgICBdLFxuICAgIFwiVXBkYXRlR2xvYmFsU2V0dGluZ3NSZXN1bHRcIjogW1xuICAgICAgXCJHbG9iYWxTZXR0aW5nc1wiLFxuICAgICAgXCJDaGFubmVsRGVmYXVsdExhbmd1YWdlRXJyb3JcIlxuICAgIF0sXG4gICAgXCJVcGRhdGVPcmRlckl0ZW1zUmVzdWx0XCI6IFtcbiAgICAgIFwiT3JkZXJcIixcbiAgICAgIFwiU2hvcENsb3NlZEVycm9yXCIsXG4gICAgICBcIk9yZGVyTW9kaWZpY2F0aW9uRXJyb3JcIixcbiAgICAgIFwiT3JkZXJMaW1pdEVycm9yXCIsXG4gICAgICBcIk5lZ2F0aXZlUXVhbnRpdHlFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja0Vycm9yXCJcbiAgICBdLFxuICAgIFwiVXBkYXRlUHJvbW90aW9uUmVzdWx0XCI6IFtcbiAgICAgIFwiUHJvbW90aW9uXCIsXG4gICAgICBcIk1pc3NpbmdDb25kaXRpb25zRXJyb3JcIlxuICAgIF1cbiAgfVxufTtcbiAgICAgIGV4cG9ydCBkZWZhdWx0IHJlc3VsdDtcbiAgICAiXX0=
"use strict";
// tslint:disable
/** This file was generated by the graphql-errors-plugin, which is part of the "codegen" npm script. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopErrorOperationTypeResolvers = exports.VerificationTokenInvalidError = exports.VerificationTokenExpiredError = exports.ShopClosedError = exports.PaymentFailedError = exports.PaymentDeclinedError = exports.PasswordValidationError = exports.PasswordResetTokenInvalidError = exports.PasswordResetTokenExpiredError = exports.PasswordAlreadySetError = exports.OrderStateTransitionError = exports.OrderPaymentStateError = exports.OrderModificationError = exports.OrderLimitError = exports.OTPRequestTimeoutError = exports.NotVerifiedError = exports.NoActiveOrderError = exports.NegativeQuantityError = exports.NativeAuthStrategyError = exports.MissingPasswordError = exports.InvalidCredentialsError = exports.InsufficientStockError = exports.IneligibleShippingMethodError = exports.IneligiblePaymentMethodError = exports.IdentifierChangeTokenInvalidError = exports.IdentifierChangeTokenExpiredError = exports.EmailAddressConflictError = exports.CouponCodeLimitError = exports.CouponCodeInvalidError = exports.CouponCodeExpiredError = exports.AlreadyLoggedInError = exports.ErrorResult = void 0;
class ErrorResult {
}
exports.ErrorResult = ErrorResult;
class AlreadyLoggedInError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'AlreadyLoggedInError';
        this.errorCode = 'ALREADY_LOGGED_IN_ERROR';
        this.message = 'ALREADY_LOGGED_IN_ERROR';
    }
}
exports.AlreadyLoggedInError = AlreadyLoggedInError;
class CouponCodeExpiredError extends ErrorResult {
    constructor(couponCode) {
        super();
        this.couponCode = couponCode;
        this.__typename = 'CouponCodeExpiredError';
        this.errorCode = 'COUPON_CODE_EXPIRED_ERROR';
        this.message = 'COUPON_CODE_EXPIRED_ERROR';
    }
}
exports.CouponCodeExpiredError = CouponCodeExpiredError;
class CouponCodeInvalidError extends ErrorResult {
    constructor(couponCode) {
        super();
        this.couponCode = couponCode;
        this.__typename = 'CouponCodeInvalidError';
        this.errorCode = 'COUPON_CODE_INVALID_ERROR';
        this.message = 'COUPON_CODE_INVALID_ERROR';
    }
}
exports.CouponCodeInvalidError = CouponCodeInvalidError;
class CouponCodeLimitError extends ErrorResult {
    constructor(couponCode, limit) {
        super();
        this.couponCode = couponCode;
        this.limit = limit;
        this.__typename = 'CouponCodeLimitError';
        this.errorCode = 'COUPON_CODE_LIMIT_ERROR';
        this.message = 'COUPON_CODE_LIMIT_ERROR';
    }
}
exports.CouponCodeLimitError = CouponCodeLimitError;
class EmailAddressConflictError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'EmailAddressConflictError';
        this.errorCode = 'EMAIL_ADDRESS_CONFLICT_ERROR';
        this.message = 'EMAIL_ADDRESS_CONFLICT_ERROR';
    }
}
exports.EmailAddressConflictError = EmailAddressConflictError;
class IdentifierChangeTokenExpiredError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'IdentifierChangeTokenExpiredError';
        this.errorCode = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR';
        this.message = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR';
    }
}
exports.IdentifierChangeTokenExpiredError = IdentifierChangeTokenExpiredError;
class IdentifierChangeTokenInvalidError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'IdentifierChangeTokenInvalidError';
        this.errorCode = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR';
        this.message = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR';
    }
}
exports.IdentifierChangeTokenInvalidError = IdentifierChangeTokenInvalidError;
class IneligiblePaymentMethodError extends ErrorResult {
    constructor(eligibilityCheckerMessage) {
        super();
        this.eligibilityCheckerMessage = eligibilityCheckerMessage;
        this.__typename = 'IneligiblePaymentMethodError';
        this.errorCode = 'INELIGIBLE_PAYMENT_METHOD_ERROR';
        this.message = 'INELIGIBLE_PAYMENT_METHOD_ERROR';
    }
}
exports.IneligiblePaymentMethodError = IneligiblePaymentMethodError;
class IneligibleShippingMethodError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'IneligibleShippingMethodError';
        this.errorCode = 'INELIGIBLE_SHIPPING_METHOD_ERROR';
        this.message = 'INELIGIBLE_SHIPPING_METHOD_ERROR';
    }
}
exports.IneligibleShippingMethodError = IneligibleShippingMethodError;
class InsufficientStockError extends ErrorResult {
    constructor(quantityAvailable, order) {
        super();
        this.quantityAvailable = quantityAvailable;
        this.order = order;
        this.__typename = 'InsufficientStockError';
        this.errorCode = 'INSUFFICIENT_STOCK_ERROR';
        this.message = 'INSUFFICIENT_STOCK_ERROR';
    }
}
exports.InsufficientStockError = InsufficientStockError;
class InvalidCredentialsError extends ErrorResult {
    constructor(authenticationError) {
        super();
        this.authenticationError = authenticationError;
        this.__typename = 'InvalidCredentialsError';
        this.errorCode = 'INVALID_CREDENTIALS_ERROR';
        this.message = 'INVALID_CREDENTIALS_ERROR';
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class MissingPasswordError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'MissingPasswordError';
        this.errorCode = 'MISSING_PASSWORD_ERROR';
        this.message = 'MISSING_PASSWORD_ERROR';
    }
}
exports.MissingPasswordError = MissingPasswordError;
class NativeAuthStrategyError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'NativeAuthStrategyError';
        this.errorCode = 'NATIVE_AUTH_STRATEGY_ERROR';
        this.message = 'NATIVE_AUTH_STRATEGY_ERROR';
    }
}
exports.NativeAuthStrategyError = NativeAuthStrategyError;
class NegativeQuantityError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'NegativeQuantityError';
        this.errorCode = 'NEGATIVE_QUANTITY_ERROR';
        this.message = 'NEGATIVE_QUANTITY_ERROR';
    }
}
exports.NegativeQuantityError = NegativeQuantityError;
class NoActiveOrderError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'NoActiveOrderError';
        this.errorCode = 'NO_ACTIVE_ORDER_ERROR';
        this.message = 'NO_ACTIVE_ORDER_ERROR';
    }
}
exports.NoActiveOrderError = NoActiveOrderError;
class NotVerifiedError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'NotVerifiedError';
        this.errorCode = 'NOT_VERIFIED_ERROR';
        this.message = 'NOT_VERIFIED_ERROR';
    }
}
exports.NotVerifiedError = NotVerifiedError;
class OTPRequestTimeoutError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'OTPRequestTimeoutError';
        this.errorCode = 'OTPREQUEST_TIMEOUT_ERROR';
        this.message = 'OTPREQUEST_TIMEOUT_ERROR';
    }
}
exports.OTPRequestTimeoutError = OTPRequestTimeoutError;
class OrderLimitError extends ErrorResult {
    constructor(maxItems) {
        super();
        this.maxItems = maxItems;
        this.__typename = 'OrderLimitError';
        this.errorCode = 'ORDER_LIMIT_ERROR';
        this.message = 'ORDER_LIMIT_ERROR';
    }
}
exports.OrderLimitError = OrderLimitError;
class OrderModificationError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'OrderModificationError';
        this.errorCode = 'ORDER_MODIFICATION_ERROR';
        this.message = 'ORDER_MODIFICATION_ERROR';
    }
}
exports.OrderModificationError = OrderModificationError;
class OrderPaymentStateError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'OrderPaymentStateError';
        this.errorCode = 'ORDER_PAYMENT_STATE_ERROR';
        this.message = 'ORDER_PAYMENT_STATE_ERROR';
    }
}
exports.OrderPaymentStateError = OrderPaymentStateError;
class OrderStateTransitionError extends ErrorResult {
    constructor(transitionError, fromState, toState) {
        super();
        this.transitionError = transitionError;
        this.fromState = fromState;
        this.toState = toState;
        this.__typename = 'OrderStateTransitionError';
        this.errorCode = 'ORDER_STATE_TRANSITION_ERROR';
        this.message = 'ORDER_STATE_TRANSITION_ERROR';
    }
}
exports.OrderStateTransitionError = OrderStateTransitionError;
class PasswordAlreadySetError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'PasswordAlreadySetError';
        this.errorCode = 'PASSWORD_ALREADY_SET_ERROR';
        this.message = 'PASSWORD_ALREADY_SET_ERROR';
    }
}
exports.PasswordAlreadySetError = PasswordAlreadySetError;
class PasswordResetTokenExpiredError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'PasswordResetTokenExpiredError';
        this.errorCode = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR';
        this.message = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR';
    }
}
exports.PasswordResetTokenExpiredError = PasswordResetTokenExpiredError;
class PasswordResetTokenInvalidError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'PasswordResetTokenInvalidError';
        this.errorCode = 'PASSWORD_RESET_TOKEN_INVALID_ERROR';
        this.message = 'PASSWORD_RESET_TOKEN_INVALID_ERROR';
    }
}
exports.PasswordResetTokenInvalidError = PasswordResetTokenInvalidError;
class PasswordValidationError extends ErrorResult {
    constructor(validationErrorMessage) {
        super();
        this.validationErrorMessage = validationErrorMessage;
        this.__typename = 'PasswordValidationError';
        this.errorCode = 'PASSWORD_VALIDATION_ERROR';
        this.message = 'PASSWORD_VALIDATION_ERROR';
    }
}
exports.PasswordValidationError = PasswordValidationError;
class PaymentDeclinedError extends ErrorResult {
    constructor(paymentErrorMessage) {
        super();
        this.paymentErrorMessage = paymentErrorMessage;
        this.__typename = 'PaymentDeclinedError';
        this.errorCode = 'PAYMENT_DECLINED_ERROR';
        this.message = 'PAYMENT_DECLINED_ERROR';
    }
}
exports.PaymentDeclinedError = PaymentDeclinedError;
class PaymentFailedError extends ErrorResult {
    constructor(paymentErrorMessage) {
        super();
        this.paymentErrorMessage = paymentErrorMessage;
        this.__typename = 'PaymentFailedError';
        this.errorCode = 'PAYMENT_FAILED_ERROR';
        this.message = 'PAYMENT_FAILED_ERROR';
    }
}
exports.PaymentFailedError = PaymentFailedError;
class ShopClosedError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'ShopClosedError';
        this.errorCode = 'SHOP_CLOSED_ERROR';
        this.message = 'SHOP_CLOSED_ERROR';
    }
}
exports.ShopClosedError = ShopClosedError;
class VerificationTokenExpiredError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'VerificationTokenExpiredError';
        this.errorCode = 'VERIFICATION_TOKEN_EXPIRED_ERROR';
        this.message = 'VERIFICATION_TOKEN_EXPIRED_ERROR';
    }
}
exports.VerificationTokenExpiredError = VerificationTokenExpiredError;
class VerificationTokenInvalidError extends ErrorResult {
    constructor() {
        super();
        this.__typename = 'VerificationTokenInvalidError';
        this.errorCode = 'VERIFICATION_TOKEN_INVALID_ERROR';
        this.message = 'VERIFICATION_TOKEN_INVALID_ERROR';
    }
}
exports.VerificationTokenInvalidError = VerificationTokenInvalidError;
const errorTypeNames = new Set(['AlreadyLoggedInError', 'CouponCodeExpiredError', 'CouponCodeInvalidError', 'CouponCodeLimitError', 'EmailAddressConflictError', 'IdentifierChangeTokenExpiredError', 'IdentifierChangeTokenInvalidError', 'IneligiblePaymentMethodError', 'IneligibleShippingMethodError', 'InsufficientStockError', 'InvalidCredentialsError', 'MissingPasswordError', 'NativeAuthStrategyError', 'NegativeQuantityError', 'NoActiveOrderError', 'NotVerifiedError', 'OTPRequestTimeoutError', 'OrderLimitError', 'OrderModificationError', 'OrderPaymentStateError', 'OrderStateTransitionError', 'PasswordAlreadySetError', 'PasswordResetTokenExpiredError', 'PasswordResetTokenInvalidError', 'PasswordValidationError', 'PaymentDeclinedError', 'PaymentFailedError', 'ShopClosedError', 'VerificationTokenExpiredError', 'VerificationTokenInvalidError']);
function isGraphQLError(input) {
    return input instanceof ErrorResult || errorTypeNames.has(input.__typename);
}
exports.shopErrorOperationTypeResolvers = {
    UpdateOrderItemsResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    RemoveOrderItemsResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    ApplyCouponCodeResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    TransitionOrderToStateResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    ActiveOrderResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    SetOrderShippingMethodResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    AddPaymentToOrderResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Order';
        },
    },
    NativeAuthenticationResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'CurrentUser';
        },
    },
    AuthenticationResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'CurrentUser';
        },
    },
    RegisterCustomerAccountResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Success';
        },
    },
    RefreshCustomerVerificationResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Success';
        },
    },
    VerifyCustomerAccountResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'CurrentUser';
        },
    },
    UpdateCustomerPasswordResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Success';
        },
    },
    RequestPasswordResetResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'Success';
        },
    },
    ResetPasswordResult: {
        __resolveType(value) {
            return isGraphQLError(value) ? value.__typename : 'CurrentUser';
        },
    },
};
//# sourceMappingURL=generated-graphql-shop-errors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountFromStripeMinorUnits = exports.getAmountInStripeMinorUnits = void 0;
/**
 * @description
 * From the [Stripe docs](https://stripe.com/docs/currencies#zero-decimal):
 * > All API requests expect amounts to be provided in a currency’s smallest unit.
 * > For example, to charge 10 USD, provide an amount value of 1000 (that is, 1000 cents).
 * > For zero-decimal currencies, still provide amounts as an integer but without multiplying by 100.
 * > For example, to charge ¥500, provide an amount value of 500.
 *
 * Therefore, for a fractionless currency like JPY, we need to divide the amount by 100 (since Vendure always
 * stores money amounts multiplied by 100). See https://github.com/vendure-ecommerce/vendure/issues/1630
 */
function getAmountInStripeMinorUnits(order) {
    const amountInStripeMinorUnits = currencyHasFractionPart(order.currencyCode)
        ? order.totalWithTax
        : Math.round(order.totalWithTax / 100);
    return amountInStripeMinorUnits;
}
exports.getAmountInStripeMinorUnits = getAmountInStripeMinorUnits;
/**
 * @description
 * Performs the reverse of `getAmountInStripeMinorUnits` - converting the Stripe minor units into the format
 * used by Vendure.
 */
function getAmountFromStripeMinorUnits(order, stripeAmount) {
    const amountInVendureMinorUnits = currencyHasFractionPart(order.currencyCode)
        ? stripeAmount
        : stripeAmount * 100;
    return amountInVendureMinorUnits;
}
exports.getAmountFromStripeMinorUnits = getAmountFromStripeMinorUnits;
function currencyHasFractionPart(currencyCode) {
    const parts = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'symbol',
    }).formatToParts(123.45);
    const hasFractionPart = !!parts.find(p => p.type === 'fraction');
    return hasFractionPart;
}
//# sourceMappingURL=stripe-utils.js.map
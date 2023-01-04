"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StripePlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePlugin = void 0;
const core_1 = require("@vendure/core");
const graphql_tag_1 = require("graphql-tag");
const constants_1 = require("./constants");
const raw_body_middleware_1 = require("./raw-body.middleware");
const stripe_controller_1 = require("./stripe.controller");
const stripe_handler_1 = require("./stripe.handler");
const stripe_resolver_1 = require("./stripe.resolver");
const stripe_service_1 = require("./stripe.service");
/**
 * @description
 * Plugin to enable payments through [Stripe](https://stripe.com/docs) via the Payment Intents API.
 *
 * ## Requirements
 *
 * 1. You will need to create a Stripe account and get your secret key in the dashboard.
 * 2. Create a webhook endpoint in the Stripe dashboard (Developers -> Webhooks, "Add an endpoint") which listens to the `payment_intent.succeeded`
 * and `payment_intent.payment_failed` events. The URL should be `https://my-shop.com/payments/stripe`, where
 * `my-shop.com` is the host of your storefront application. *Note:* for local development, you'll need to use
 * the Stripe CLI to test your webhook locally. See the _local development_ section below.
 * 3. Get the signing secret for the newly created webhook.
 * 4. Install the Payments plugin and the Stripe Node library:
 *
 *     `yarn add \@vendure/payments-plugin stripe`
 *
 *     or
 *
 *     `npm install \@vendure/payments-plugin stripe`
 *
 * ## Setup
 *
 * 1. Add the plugin to your VendureConfig `plugins` array:
 *     ```TypeScript
 *     import { StripePlugin } from '\@vendure/payments-plugin/package/stripe';
 *
 *     // ...
 *
 *     plugins: [
 *       StripePlugin.init({
 *         apiKey: process.env.YOUR_STRIPE_SECRET_KEY,
 *         webhookSigningSecret: process.env.YOUR_STRIPE_WEBHOOK_SIGNING_SECRET,
 *         // This prevents different customers from using the same PaymentIntent
 *         storeCustomersInStripe: true,
 *       }),
 *     ]
 *     ````
 * 2. Create a new PaymentMethod in the Admin UI, and select "Stripe payments" as the handler.
 *
 * ## Storefront usage
 *
 * The plugin is designed to work with the [Custom payment flow](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements).
 * In this flow, Stripe provides libraries which handle the payment UI and confirmation for you. You can install it in your storefront project
 * with:
 *
 * ```shell
 * yarn add \@stripe/stripe-js
 * # or
 * npm install \@stripe/stripe-js
 * ```
 *
 * If you are using React, you should also consider installing `@stripe/react-stripe-js`, which is a wrapper around Stripe Elements.
 *
 * The high-level workflow is:
 * 1. Create a "payment intent" on the server by executing the `createStripePaymentIntent` mutation which is exposed by this plugin.
 * 2. Use the returned client secret to instantiate the Stripe Payment Element:
 *    ```TypeScript
 *    import { Elements } from '\@stripe/react-stripe-js';
 *    import { loadStripe, Stripe } from '\@stripe/stripe-js';
 *    import { CheckoutForm } from './CheckoutForm';
 *
 *    const stripePromise = getStripe('pk_test_....wr83u');
 *
 *    type StripePaymentsProps = {
 *      clientSecret: string;
 *      orderCode: string;
 *    }
 *
 *    export function StripePayments({ clientSecret, orderCode }: StripePaymentsProps) {
 *      const options = {
 *        // passing the client secret obtained from the server
 *        clientSecret,
 *      }
 *      return (
 *        <Elements stripe={stripePromise} options={options}>
 *          <CheckoutForm orderCode={orderCode} />
 *        </Elements>
 *      );
 *    }
 *    ```
 *    ```TypeScript
 *    // CheckoutForm.tsx
 *    import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
 *    import { FormEvent } from 'react';
 *
 *    export const CheckoutForm = ({ orderCode }: { orderCode: string }) => {
 *      const stripe = useStripe();
 *      const elements = useElements();
 *
 *      const handleSubmit = async (event: FormEvent) => {
 *        // We don't want to let default form submission happen here,
 *        // which would refresh the page.
 *        event.preventDefault();
 *
 *        if (!stripe || !elements) {
 *          // Stripe.js has not yet loaded.
 *          // Make sure to disable form submission until Stripe.js has loaded.
 *          return;
 *        }
 *
 *        const result = await stripe.confirmPayment({
 *          //`Elements` instance that was used to create the Payment Element
 *          elements,
 *          confirmParams: {
 *            return_url: location.origin + `/checkout/confirmation/${orderCode}`,
 *          },
 *        });
 *
 *        if (result.error) {
 *          // Show error to your customer (for example, payment details incomplete)
 *          console.log(result.error.message);
 *        } else {
 *          // Your customer will be redirected to your `return_url`. For some payment
 *          // methods like iDEAL, your customer will be redirected to an intermediate
 *          // site first to authorize the payment, then redirected to the `return_url`.
 *        }
 *      };
 *
 *      return (
 *        <form onSubmit={handleSubmit}>
 *          <PaymentElement />
 *          <button disabled={!stripe}>Submit</button>
 *        </form>
 *      );
 *    };
 *    ```
 * 3. Once the form is submitted and Stripe processes the payment, the webhook takes care of updating the order without additional action
 * in the storefront. As in the code above, the customer will be redirected to `/checkout/confirmation/${orderCode}`.
 *
 * {{% alert "primary" %}}
 * A full working storefront example of the Stripe integration can be found in the
 * [Remix Starter repo](https://github.com/vendure-ecommerce/storefront-remix-starter/tree/master/app/components/checkout/stripe)
 * {{% /alert %}}
 *
 * ## Local development
 *
 * 1. Download & install the Stripe CLI: https://stripe.com/docs/stripe-cli
 * 2. From your Stripe dashboard, go to Developers -> Webhooks and click "Add an endpoint" and follow the instructions
 * under "Test in a local environment".
 * 3. The Stripe CLI command will look like
 *    ```shell
 *    stripe listen --forward-to localhost:3000/payments/stripe
 *    ```
 * 4. The Stripe CLI will create a webhook signing secret you can then use in your config of the StripePlugin.
 *
 * @docsCategory payments-plugin
 * @docsPage StripePlugin
 */
let StripePlugin = StripePlugin_1 = class StripePlugin {
    /**
     * @description
     * Initialize the Stripe payment plugin
     */
    static init(options) {
        this.options = options;
        return StripePlugin_1;
    }
};
StripePlugin = StripePlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        controllers: [stripe_controller_1.StripeController],
        providers: [
            {
                provide: constants_1.STRIPE_PLUGIN_OPTIONS,
                useFactory: () => StripePlugin_1.options,
            },
            stripe_service_1.StripeService,
        ],
        configuration: config => {
            config.paymentOptions.paymentMethodHandlers.push(stripe_handler_1.stripePaymentMethodHandler);
            config.apiOptions.middleware.push({
                route: '/payments/stripe',
                handler: raw_body_middleware_1.rawBodyMiddleware,
                beforeListen: true,
            });
            if (StripePlugin_1.options.storeCustomersInStripe) {
                config.customFields.Customer.push({
                    name: 'stripeCustomerId',
                    type: 'string',
                    label: [{ languageCode: core_1.LanguageCode.en, value: 'Stripe Customer ID' }],
                    nullable: true,
                    public: false,
                    readonly: true,
                });
            }
            return config;
        },
        shopApiExtensions: {
            schema: graphql_tag_1.gql `
            extend type Mutation {
                createStripePaymentIntent: String
            }
        `,
            resolvers: [stripe_resolver_1.StripeResolver],
        },
    })
], StripePlugin);
exports.StripePlugin = StripePlugin;
//# sourceMappingURL=stripe.plugin.js.map
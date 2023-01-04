"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MolliePlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolliePlugin = void 0;
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const mollie_shop_schema_1 = require("./mollie-shop-schema");
const mollie_controller_1 = require("./mollie.controller");
const mollie_handler_1 = require("./mollie.handler");
const mollie_resolver_1 = require("./mollie.resolver");
const mollie_service_1 = require("./mollie.service");
/**
 * @description
 * Plugin to enable payments through the [Mollie platform](https://docs.mollie.com/).
 * This plugin uses the Payments API from Mollie, not the Orders API.
 *
 * ## Requirements
 *
 * 1. You will need to create a Mollie account and get your apiKey in the dashboard.
 * 2. Install the Payments plugin and the Mollie client:
 *
 *     `yarn add \@vendure/payments-plugin \@mollie/api-client`
 *
 *     or
 *
 *     `npm install \@vendure/payments-plugin \@mollie/api-client`
 *
 * ## Setup
 *
 * 1. Add the plugin to your VendureConfig `plugins` array:
 *     ```TypeScript
 *     import { MolliePlugin } from '\@vendure/payments-plugin/package/mollie';
 *
 *     // ...
 *
 *     plugins: [
 *       MolliePlugin.init({ vendureHost: 'https://yourhost.io/' }),
 *     ]
 *     ```
 * 2. Create a new PaymentMethod in the Admin UI, and select "Mollie payments" as the handler.
 * 3. Set the Redirect URL. This is the url that is used to redirect the end-user, e.g. `https://storefront/order`
 * 4. Set your Mollie apiKey in the `API Key` field.
 *
 * ## Storefront usage
 *
 * In your storefront you add a payment to an order using the `createMolliePaymentIntent` mutation. In this example, our Mollie
 * PaymentMethod was given the code "mollie-payment-method".
 *
 * ```GraphQL
 * mutation CreateMolliePaymentIntent {
 *   createMolliePaymentIntent(input: {
 *     paymentMethodCode: "mollie-payment-method"
 *     molliePaymentMethodCode: "ideal"
 *   }) {
 *          ... on MolliePaymentIntent {
 *               url
 *           }
 *          ... on MolliePaymentIntentError {
 *               errorCode
 *               message
 *          }
 *   }
 * }
 * ```
 *
 * The response will contain
 * a redirectUrl, which can be used to redirect your customer to the Mollie
 * platform.
 *
 * 'molliePaymentMethodCode' is an optional parameter that can be passed to skip Mollie's hosted payment method selection screen
 * You can get available Mollie payment methods with the following query:
 *
 * ```GraphQL
 * {
 *  molliePaymentMethods(input: { paymentMethodCode: "mollie-payment-method" }) {
 *    id
 *    code
 *    description
 *    minimumAmount {
 *      value
 *      currency
 *    }
 *    maximumAmount {
 *      value
 *      currency
 *    }
 *    image {
 *      size1x
 *      size2x
 *      svg
 *    }
 *  }
 * }
 * ```
 * You can pass `MolliePaymentMethod.code` to the `createMolliePaymentIntent` mutation to skip the method selection.
 *
 * After completing payment on the Mollie platform,
 * the user is redirected to the configured redirect url + orderCode: `https://storefront/order/CH234X5`
 *
 * ## Local development
 *
 * Use something like [localtunnel](https://github.com/localtunnel/localtunnel) to test on localhost.
 *
 * ```bash
 * npx localtunnel --port 3000 --subdomain my-shop-local-dev
 * > your url is: https://my-shop-local-dev.loca.lt     <- use this as the vendureHost for local dev.
 * ```
 *
 * @docsCategory payments-plugin
 * @docsPage MolliePlugin
 * @docsWeight 0
 */
let MolliePlugin = MolliePlugin_1 = class MolliePlugin {
    /**
     * @description
     * Initialize the mollie payment plugin
     * @param vendureHost is needed to pass to mollie for callback
     */
    static init(options) {
        this.options = options;
        return MolliePlugin_1;
    }
};
MolliePlugin = MolliePlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        controllers: [mollie_controller_1.MollieController],
        providers: [
            mollie_service_1.MollieService,
            { provide: constants_1.PLUGIN_INIT_OPTIONS, useFactory: () => MolliePlugin_1.options }
        ],
        configuration: (config) => {
            config.paymentOptions.paymentMethodHandlers.push(mollie_handler_1.molliePaymentHandler);
            return config;
        },
        shopApiExtensions: {
            schema: mollie_shop_schema_1.shopSchema,
            resolvers: [mollie_resolver_1.MollieResolver],
        },
    })
], MolliePlugin);
exports.MolliePlugin = MolliePlugin;
//# sourceMappingURL=mollie.plugin.js.map
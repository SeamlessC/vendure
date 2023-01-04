"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSchema = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.shopSchema = graphql_tag_1.gql `
    type MolliePaymentIntentError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }
    type MollieAmount {
        value: String
        currency: String
    }
    type MolliePaymentMethodImages {
        size1x: String
        size2x: String
        svg: String
    }
    type MolliePaymentMethod {
        id: ID!
        code: String!
        description: String
        minimumAmount: MollieAmount
        maximumAmount: MollieAmount
        image: MolliePaymentMethodImages
    }
    type MolliePaymentIntent {
        url: String!
    }
    union MolliePaymentIntentResult = MolliePaymentIntent | MolliePaymentIntentError
    input MolliePaymentIntentInput {
        paymentMethodCode: String!
        molliePaymentMethodCode: String
    }
    input MolliePaymentMethodsInput {
        paymentMethodCode: String!
    }
    extend type Mutation {
        createMolliePaymentIntent(input: MolliePaymentIntentInput!): MolliePaymentIntentResult!
    }
    extend type Query {
        molliePaymentMethods(input: MolliePaymentMethodsInput!): [MolliePaymentMethod!]!
    }
`;
//# sourceMappingURL=mollie-shop-schema.js.map
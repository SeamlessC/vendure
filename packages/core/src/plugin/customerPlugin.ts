import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import gql from 'graphql-tag';

import { CustomerResolver } from '../api/resolvers/admin/customer.resolver';

const schemaExtension = gql`
    extend type Mutation {
        addCustomerLoyaltyPoints(args: MutationAddCustomerLoyaltyPointsArgs!): LoyaltyPointUpdatedResponse!
    }
`;

@VendurePlugin({
    imports: [PluginCommonModule],

    adminApiExtensions: {
        schema: schemaExtension,
        resolvers: [CustomerResolver],
    },
})
export class CustomerPlugin {}

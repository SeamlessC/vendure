"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultChannelToken = void 0;
const shared_constants_1 = require("@vendure/common/lib/shared-constants");
const core_1 = require("@vendure/core");
const typeorm_1 = require("typeorm");
// tslint:disable:no-console
// tslint:disable:no-floating-promises
/**
 * Queries the database for the default Channel and returns its token.
 */
async function getDefaultChannelToken(logging = true) {
    const connection = await typeorm_1.getConnection();
    let defaultChannel;
    try {
        defaultChannel = await connection.manager.getRepository(core_1.Channel).findOne({
            where: {
                code: shared_constants_1.DEFAULT_CHANNEL_CODE,
            },
        });
    }
    catch (err) {
        console.log(`Error occurred when attempting to get default Channel`);
        console.log(err);
    }
    if (!defaultChannel) {
        throw new Error(`No default channel could be found!`);
    }
    if (logging) {
        console.log(`Got default channel token: ${defaultChannel.token}`);
    }
    return defaultChannel.token;
}
exports.getDefaultChannelToken = getDefaultChannelToken;
//# sourceMappingURL=get-default-channel-token.js.map
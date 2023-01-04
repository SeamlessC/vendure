"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawBodyMiddleware = void 0;
const body_parser_1 = require("body-parser");
/**
 * Middleware which adds the raw request body to the incoming message object. This is needed by
 * Stripe to properly verify webhook events.
 */
exports.rawBodyMiddleware = body_parser_1.json({
    verify(req, _, buf) {
        if (Buffer.isBuffer(buf)) {
            req.rawBody = Buffer.from(buf);
        }
        return true;
    },
});
//# sourceMappingURL=raw-body.middleware.js.map
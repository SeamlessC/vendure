"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctx = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
/**
 * @description
 * Resolver param decorator which extracts the {@link RequestContext} from the incoming
 * request object.
 *
 * @example
 * ```TypeScript
 *  \@Query()
 *  getAdministrators(\@Ctx() ctx: RequestContext) {
 *      // ...
 *  }
 * ```
 *
 * @docsCategory request
 * @docsPage Ctx Decorator
 */
exports.Ctx = common_1.createParamDecorator((data, ctx) => {
    const getContext = (req) => {
        const map = req[constants_1.REQUEST_CONTEXT_MAP_KEY];
        // If a map contains associated transactional context with this handler
        // we have to use it. It means that this handler was wrapped with @Transaction decorator.
        // Otherwise use default context.
        return (map === null || map === void 0 ? void 0 : map.get(ctx.getHandler())) || req[constants_1.REQUEST_CONTEXT_KEY];
    };
    if (ctx.getType() === 'graphql') {
        // GraphQL request
        return getContext(ctx.getArgByIndex(2).req);
    }
    else {
        // REST request
        return getContext(ctx.switchToHttp().getRequest());
    }
});
//# sourceMappingURL=request-context.decorator.js.map
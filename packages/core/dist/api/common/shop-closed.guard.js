"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopClosedGuard = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
let ShopClosedGuard = class ShopClosedGuard {
    canActivate(context) {
        const venctx = getCtx(context);
        if (!venctx.channel.customFields.isOpen) {
            throw new Error('This store is closed');
        }
        return true;
    }
};
ShopClosedGuard = __decorate([
    common_1.Injectable()
], ShopClosedGuard);
exports.ShopClosedGuard = ShopClosedGuard;
const getCtx = (ctx) => {
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
};
//# sourceMappingURL=shop-closed.guard.js.map
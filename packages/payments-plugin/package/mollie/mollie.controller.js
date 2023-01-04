"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MollieController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const mollie_service_1 = require("./mollie.service");
let MollieController = class MollieController {
    constructor(mollieService) {
        this.mollieService = mollieService;
    }
    async webhook(channelToken, paymentMethodId, body) {
        if (!body.id) {
            return core_1.Logger.warn(` Ignoring incoming webhook, because it has no body.id.`, constants_1.loggerCtx);
        }
        try {
            await this.mollieService.settlePayment({ channelToken, paymentMethodId, paymentId: body.id });
        }
        catch (error) {
            core_1.Logger.error(`Failed to process incoming webhook: ${error === null || error === void 0 ? void 0 : error.message}`, constants_1.loggerCtx, error);
            throw error;
        }
    }
};
__decorate([
    common_1.Post('mollie/:channelToken/:paymentMethodId'),
    __param(0, common_1.Param('channelToken')),
    __param(1, common_1.Param('paymentMethodId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MollieController.prototype, "webhook", null);
MollieController = __decorate([
    common_1.Controller('payments'),
    __metadata("design:paramtypes", [mollie_service_1.MollieService])
], MollieController);
exports.MollieController = MollieController;
//# sourceMappingURL=mollie.controller.js.map
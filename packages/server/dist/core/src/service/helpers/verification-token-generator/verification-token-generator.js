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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationTokenGenerator = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const common_2 = require("../../../common");
const config_service_1 = require("../../../config/config.service");
const secrets_1 = require("./secrets");
/**
 * This class is responsible for generating and verifying the tokens issued when new accounts are registered
 * or when a password reset is requested.
 */
let VerificationTokenGenerator = class VerificationTokenGenerator {
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * Generates a verification token which encodes the time of generation and concatenates it with a
     * random id.
     */
    async generateVerificationToken(user) {
        // const phoneNo=user.
        const otp = Math.floor(Math.random() * (987654 - 123456 + 1) + 123456).toString();
        try {
            const response = await axios_1.default.post('https://connect.mrnotify.lk/trigger/send', { msisdn: user.identifier, message: `Your OTP code is ${otp}` }, {
                headers: {
                    'Content-Type': 'application/json',
                    ApiKey: secrets_1.MRNOTIFYSECRET,
                },
            });
            if (!(response.status === 200 || response.status === 201)) {
                console.error(response);
                throw new common_2.InternalServerError('error.otp-server-error');
            }
        }
        catch (error) {
            console.error(error);
            throw new common_2.InternalServerError('error.otp-server-error');
        }
        return otp;
    }
    /**
     * Checks the age of the verification token to see if it falls within the token duration
     * as specified in the VendureConfig.
     * Returns 1 if the token is valid, 0 if it is expired, -1 if it is invalid.
     */
    verifyVerificationToken(token, tokenToVerify, expiryDate) {
        if (expiryDate === null) {
            return 0;
        }
        const with5Mins = expiryDate.getTime() + 300000;
        const currentTime = new Date().getTime();
        if (with5Mins < currentTime) {
            return 0;
        }
        if (token.trim() === '') {
            return -1;
        }
        if (tokenToVerify.trim() === token.trim()) {
            return 1;
        }
        return -1;
        // let tokenToVerify = null;
        // if(type==="identifierChangeToken"){
        //     tokenToVerify = authMethod.identifierChangeToken;
        // }
        // else if(type==="passwordResetToken"){
        //     tokenToVerify = authMethod.passwordResetToken;
        // }
        // else if(type==="verificationToken"){
        //     tokenToVerify = authMethod.verificationToken;
        // }
        // if(!tokenToVerify){
        //     return false;
        // }
        // if(tokenToVerify===token){
        //     return true;
        // }
        // const duration = ms(this.configService.authOptions.verificationTokenDuration as string);
        // const [generatedOn] = token.split('_');
        // const dateString = Buffer.from(generatedOn, 'base64').toString();
        // const date = new Date(dateString);
        // const elapsed = +new Date() - +date;
        // return elapsed < duration;
    }
};
VerificationTokenGenerator = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], VerificationTokenGenerator);
exports.VerificationTokenGenerator = VerificationTokenGenerator;
//# sourceMappingURL=verification-token-generator.js.map
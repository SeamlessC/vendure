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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeAuthenticationMethod = void 0;
const typeorm_1 = require("typeorm");
const authentication_method_entity_1 = require("./authentication-method.entity");
/**
 * @description
 * This is the default, built-in authentication method which uses a identifier (typically username or email address)
 * and password combination to authenticate a User.
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
let NativeAuthenticationMethod = class NativeAuthenticationMethod extends authentication_method_entity_1.AuthenticationMethod {
    constructor(input) {
        super(input);
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NativeAuthenticationMethod.prototype, "identifier", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], NativeAuthenticationMethod.prototype, "passwordHash", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "verificationToken", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "verificationTokenExpires", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "passwordResetToken", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "passwordResetTokenExpires", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "identifierChangeToken", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "identifierChangeTokenExpires", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], NativeAuthenticationMethod.prototype, "pendingIdentifier", void 0);
NativeAuthenticationMethod = __decorate([
    typeorm_1.ChildEntity(),
    __metadata("design:paramtypes", [Object])
], NativeAuthenticationMethod);
exports.NativeAuthenticationMethod = NativeAuthenticationMethod;
//# sourceMappingURL=native-authentication-method.entity.js.map
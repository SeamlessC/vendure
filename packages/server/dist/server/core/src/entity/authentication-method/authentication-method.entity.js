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
exports.AuthenticationMethod = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const user_entity_1 = require("../user/user.entity");
/**
 * @description
 * An AuthenticationMethod represents the means by which a {@link User} is authenticated. There are two kinds:
 * {@link NativeAuthenticationMethod} and {@link ExternalAuthenticationMethod}.
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
let AuthenticationMethod = class AuthenticationMethod extends base_entity_1.VendureEntity {
};
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.authenticationMethods),
    __metadata("design:type", user_entity_1.User)
], AuthenticationMethod.prototype, "user", void 0);
AuthenticationMethod = __decorate([
    typeorm_1.Entity(),
    typeorm_1.TableInheritance({ column: { type: 'varchar', name: 'type' } })
], AuthenticationMethod);
exports.AuthenticationMethod = AuthenticationMethod;
//# sourceMappingURL=authentication-method.entity.js.map
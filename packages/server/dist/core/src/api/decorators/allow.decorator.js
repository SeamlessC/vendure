"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allow = exports.PERMISSIONS_METADATA_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSIONS_METADATA_KEY = '__permissions__';
/**
 * @description
 * Attaches metadata to the resolver defining which permissions are required to execute the
 * operation, using one or more {@link Permission} values.
 *
 * In a GraphQL context, it can be applied to top-level queries and mutations as well as field resolvers.
 *
 * For REST controllers, it can be applied to route handlers.
 *
 * ## Allow and Sessions
 * The `@Allow()` decorator is closely linked to the way Vendure manages sessions. For any operation or route that is decorated
 * with `@Allow()`, there must be an authenticated session in progress, which would have been created during a prior authentication
 * step.
 *
 * The exception to this is when the operation is decorated with `@Allow(Permission.Owner)`. This is a special permission which is designed
 * to give access to certain resources to potentially un-authenticated users. For this reason, any operation decorated with this permission
 * will always have an anonymous session created if no session is currently in progress.
 *
 * For more information see [Understanding Permission.Owner](/docs/typescript-api/common/permission/#understanding-permissionowner).
 *
 * @example
 * ```TypeScript
 *  \@Allow(Permission.SuperAdmin)
 *  \@Query()
 *  getAdministrators() {
 *      // ...
 *  }
 * ```
 *
 * @docsCategory request
 * @docsPage Allow Decorator
 */
const Allow = (...permissions) => common_1.SetMetadata(exports.PERMISSIONS_METADATA_KEY, permissions);
exports.Allow = Allow;
//# sourceMappingURL=allow.decorator.js.map
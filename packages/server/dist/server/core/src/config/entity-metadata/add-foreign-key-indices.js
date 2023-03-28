"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addForeignKeyIndices = void 0;
const typeorm_1 = require("typeorm");
const stock_movement_entity_1 = require("../../entity/stock-movement/stock-movement.entity");
/**
 * @description
 * Dynamically adds `@Index()` metadata to all many-to-one relations. These are already added
 * by default in MySQL/MariaDB, but not in Postgres. So this modification can lead to improved
 * performance with Postgres - especially when dealing with large numbers of products, orders etc.
 *
 * See https://github.com/vendure-ecommerce/vendure/issues/1502
 *
 * TODO: In v2 we will add the Index to all relations manually, this making this redundant.
 */
const addForeignKeyIndices = (metadata) => {
    var _a;
    for (const relationMetadata of metadata.relations) {
        const { relationType, target } = relationMetadata;
        if (relationType === 'many-to-one') {
            const embeddedIn = (_a = metadata.embeddeds.find(e => e.type() === relationMetadata.target)) === null || _a === void 0 ? void 0 : _a.target;
            const targetClass = (embeddedIn !== null && embeddedIn !== void 0 ? embeddedIn : target);
            if (typeof targetClass === 'function') {
                const instance = new targetClass();
                if (!(instance instanceof stock_movement_entity_1.StockMovement)) {
                    typeorm_1.Index()(instance, relationMetadata.propertyName);
                }
            }
        }
    }
};
exports.addForeignKeyIndices = addForeignKeyIndices;
//# sourceMappingURL=add-foreign-key-indices.js.map
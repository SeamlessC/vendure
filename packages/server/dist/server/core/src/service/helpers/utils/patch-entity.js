"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchEntity = void 0;
function patchEntity(entity, input) {
    for (const key of Object.keys(entity)) {
        const value = input[key];
        if (key === 'customFields' && value) {
            patchEntity(entity[key], value);
        }
        else if (value !== undefined && key !== 'id') {
            entity[key] = value;
        }
    }
    return entity;
}
exports.patchEntity = patchEntity;
//# sourceMappingURL=patch-entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
function unique(arr, byKey) {
    if (byKey == null) {
        return Array.from(new Set(arr));
    }
    else {
        // Based on https://stackoverflow.com/a/58429784/772859
        return [...new Map(arr.map(item => [item[byKey], item])).values()];
    }
}
exports.unique = unique;
//# sourceMappingURL=unique.js.map
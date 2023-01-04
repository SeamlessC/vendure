"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// ensure that the bullmq package is installed
try {
    // tslint:disable-next-line:no-var-requires
    require('bullmq');
}
catch (e) {
    // tslint:disable-next-line:no-console
    console.error('The BullMQJobQueuePlugin depends on the "bullmq" package being installed.');
    process.exit(1);
}
__exportStar(require("./plugin"), exports);
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map
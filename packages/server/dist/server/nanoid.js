"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.customRandom = exports.customAlphabet = exports.nanoid = exports.urlAlphabet = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
const POOL_SIZE_MULTIPLIER = 32;
let pool;
let poolOffset;
const random = (bytes) => {
    if (!pool || pool.length < bytes) {
        pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
        crypto_1.default.randomFillSync(pool);
        poolOffset = 0;
    }
    else if (poolOffset + bytes > pool.length) {
        crypto_1.default.randomFillSync(pool);
        poolOffset = 0;
    }
    const res = pool.subarray(poolOffset, poolOffset + bytes);
    poolOffset += bytes;
    return res;
};
exports.random = random;
function customRandom(alphabet, size, getRandom) {
    const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
    const step = Math.ceil((1.6 * mask * size) / alphabet.length);
    return () => {
        let id = '';
        while (true) {
            const bytes = getRandom(step);
            let i = step;
            while (i--) {
                id += alphabet[bytes[i] & mask] || '';
                if (id.length === size)
                    return id;
            }
        }
    };
}
exports.customRandom = customRandom;
const customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);
exports.customAlphabet = customAlphabet;
function nanoid(size = 21) {
    const bytes = random(size);
    let id = '';
    while (size--) {
        id += exports.urlAlphabet[bytes[size] & 63];
    }
    return id;
}
exports.nanoid = nanoid;
//# sourceMappingURL=nanoid.js.map
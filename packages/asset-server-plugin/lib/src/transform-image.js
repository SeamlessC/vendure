"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeToFocalPoint = exports.transformImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const common_1 = require("./common");
/**
 * Applies transforms to the given image according to the query params passed.
 */
async function transformImage(originalImage, queryParams, presets) {
    let targetWidth = Math.round(+queryParams.w) || undefined;
    let targetHeight = Math.round(+queryParams.h) || undefined;
    let mode = queryParams.mode || 'crop';
    const fpx = +queryParams.fpx || undefined;
    const fpy = +queryParams.fpy || undefined;
    const imageFormat = common_1.getValidFormat(queryParams.format);
    if (queryParams.preset) {
        const matchingPreset = presets.find(p => p.name === queryParams.preset);
        if (matchingPreset) {
            targetWidth = matchingPreset.width;
            targetHeight = matchingPreset.height;
            mode = matchingPreset.mode;
        }
    }
    const options = {};
    if (mode === 'crop') {
        options.position = sharp_1.default.strategy.entropy;
    }
    else {
        options.fit = 'inside';
    }
    const image = sharp_1.default(originalImage);
    applyFormat(image, imageFormat);
    if (fpx && fpy && targetWidth && targetHeight && mode === 'crop') {
        const metadata = await image.metadata();
        if (metadata.width && metadata.height) {
            const xCenter = fpx * metadata.width;
            const yCenter = fpy * metadata.height;
            const { width, height, region } = resizeToFocalPoint({ w: metadata.width, h: metadata.height }, { w: targetWidth, h: targetHeight }, { x: xCenter, y: yCenter });
            return image.resize(width, height).extract(region);
        }
    }
    return image.resize(targetWidth, targetHeight, options);
}
exports.transformImage = transformImage;
function applyFormat(image, format) {
    switch (format) {
        case 'jpg':
        case 'jpeg':
            return image.jpeg();
        case 'png':
            return image.png();
        case 'webp':
            return image.webp();
        case 'avif':
            return image.avif();
        default:
            return image;
    }
}
/**
 * Resize an image but keep it centered on the focal point.
 * Based on the method outlined in https://github.com/lovell/sharp/issues/1198#issuecomment-384591756
 */
function resizeToFocalPoint(original, target, focalPoint) {
    const { width, height, factor } = getIntermediateDimensions(original, target);
    const region = getExtractionRegion(factor, focalPoint, target, { w: width, h: height });
    return { width, height, region };
}
exports.resizeToFocalPoint = resizeToFocalPoint;
/**
 * Calculates the dimensions of the intermediate (resized) image.
 */
function getIntermediateDimensions(original, target) {
    const hRatio = original.h / target.h;
    const wRatio = original.w / target.w;
    let factor;
    let width;
    let height;
    if (hRatio < wRatio) {
        factor = hRatio;
        height = Math.round(target.h);
        width = Math.round(original.w / factor);
    }
    else {
        factor = wRatio;
        width = Math.round(target.w);
        height = Math.round(original.h / factor);
    }
    return { width, height, factor };
}
/**
 * Calculates the Region to extract from the intermediate image.
 */
function getExtractionRegion(factor, focalPoint, target, intermediate) {
    const newXCenter = focalPoint.x / factor;
    const newYCenter = focalPoint.y / factor;
    const region = {
        left: 0,
        top: 0,
        width: target.w,
        height: target.h,
    };
    if (intermediate.h < intermediate.w) {
        region.left = clamp(0, intermediate.w - target.w, Math.round(newXCenter - target.w / 2));
    }
    else {
        region.top = clamp(0, intermediate.h - target.h, Math.round(newYCenter - target.h / 2));
    }
    return region;
}
/**
 * Limit the input value to the specified min and max values.
 */
function clamp(min, max, input) {
    return Math.min(Math.max(min, input), max);
}
//# sourceMappingURL=transform-image.js.map
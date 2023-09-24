"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAfterCurrentJST = exports.getAddToCurrentJST = exports.getCurrentJST = void 0;
/* eslint-disable max-len */
const dayjs_1 = __importDefault(require("dayjs"));
const timezone = __importStar(require("dayjs/plugin/timezone"));
const utc = __importStar(require("dayjs/plugin/utc"));
const localizedFormat = __importStar(require("dayjs/plugin/localizedFormat"));
dayjs_1.default.extend(utc.default);
dayjs_1.default.extend(timezone.default);
dayjs_1.default.extend(localizedFormat.default);
const getCurrentJST = () => {
    return dayjs_1.default.tz((0, dayjs_1.default)(), "Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
};
exports.getCurrentJST = getCurrentJST;
const getAddToCurrentJST = (num, unit) => {
    return dayjs_1.default.tz((0, dayjs_1.default)(), "Asia/Tokyo").add(num, unit).format("YYYY-MM-DD HH:mm:ss");
};
exports.getAddToCurrentJST = getAddToCurrentJST;
const isAfterCurrentJST = (time) => {
    const currentTimeJST = dayjs_1.default.tz((0, dayjs_1.default)(), "Asia/Tokyo");
    const inputTime = dayjs_1.default.tz((0, dayjs_1.default)(time), "Asia/Tokyo");
    return inputTime.isAfter(currentTimeJST);
};
exports.isAfterCurrentJST = isAfterCurrentJST;
//# sourceMappingURL=dayjs.js.map
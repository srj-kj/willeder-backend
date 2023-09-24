"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const options = {
    verify: (req, res, buf) => {
        if (req.originalUrl.startsWith('/stripe-webhooks'))
            req.rawBody = buf.toString();
    },
};
exports.default = body_parser_1.default.json(options);
//# sourceMappingURL=bodyParser.js.map
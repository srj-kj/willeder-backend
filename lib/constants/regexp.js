"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEXP_DATETIME = exports.REGEXP_PASSWORD = void 0;
/* eslint-disable max-len */
/**
 * @description At least one special char, one lowercase, one uppercase, one number
 */
exports.REGEXP_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
/**
 * @description YYYY-MM-DD HH:MM:SS+HH:MM
 */
exports.REGEXP_DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;
//# sourceMappingURL=regexp.js.map
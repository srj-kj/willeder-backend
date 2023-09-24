"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenConverter = exports.TOKEN_COLLECTION_KEY = void 0;
exports.TOKEN_COLLECTION_KEY = "Token";
exports.tokenConverter = {
    toFirestore(doc) {
        return {
            token_id: doc.token_id,
            user_id: doc.user_id,
            token_type: doc.token_type,
            user_type: doc.user_type,
            created_at: doc.created_at,
            expired_at: doc.expired_at,
        };
    },
    fromFirestore(snapshot) {
        const data = snapshot.data();
        const entity = {
            id: snapshot.id,
            token_id: data.token_id,
            user_id: data.user_id,
            token_type: data.token_type,
            user_type: data.user_type,
            created_at: data.created_at,
            expired_at: data.expired_at,
        };
        return entity;
    },
};
//# sourceMappingURL=token.entity.js.map
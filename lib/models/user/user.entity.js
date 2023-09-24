"use strict";
/* eslint-disable max-len */
// TODO
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConverter = exports.USER_COLLECTION_KEY = void 0;
exports.USER_COLLECTION_KEY = "users";
exports.userConverter = {
    toFirestore(doc) {
        return {
            user_id: doc.user_id,
            email: doc.email,
            password: doc.password,
            name: doc.name,
            phone: doc.phone,
            address: doc.address,
            status: doc.status,
            refresh_token: doc.refresh_token,
            created_at: doc.created_at,
            updated_at: doc.created_at,
            deleted_at: doc.deleted_at,
        };
    },
    fromFirestore(snapshot) {
        const data = snapshot.data();
        const entity = {
            id: snapshot.id,
            user_id: data.user_id,
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            address: data.address,
            status: data.status,
            refresh_token: data.refresh_token,
            created_at: data.created_at,
            updated_at: data.created_at,
            deleted_at: data.deleted_at,
        };
        return entity;
    },
};
//# sourceMappingURL=user.entity.js.map
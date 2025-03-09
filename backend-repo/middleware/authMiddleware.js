"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'validToken') {
        next();
    }
    else {
        res.status(401).send({ error: 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authMiddleware, api_1.initDocUSer);
router.delete('/delete/:collectionId/:noDoc', authMiddleware_1.authMiddleware, api_1.deleteUserData);
router.put('/update', authMiddleware_1.authMiddleware, api_1.updateUserData);
router.get('/fetch/:collectionId/:noDoc', authMiddleware_1.authMiddleware, api_1.fetchUserData);
router.post('/create', authMiddleware_1.authMiddleware, api_1.addUserData);
exports.default = router;

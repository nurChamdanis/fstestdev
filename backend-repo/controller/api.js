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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData = exports.fetchUserData = exports.updateUserData = exports.addUserData = exports.initDocUSer = void 0;
const multer_1 = __importDefault(require("multer"));
const userCollection_1 = require("../repository/userCollection");
const crypto_1 = require("crypto");
const admin = __importStar(require("firebase-admin"));
const upload = (0, multer_1.default)();
const db = admin.firestore();
const initDocUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collectionId;
        const querySnapshot = yield db.collection('testdb').limit(1).get();
        if (querySnapshot.empty) {
            yield db.collection('testdb').doc('initialDocument').set({ initialized: true });
            console.log('USERS collection created.');
        }
        else {
            const users = yield (0, userCollection_1.LoadUser)(collectionId);
            res.status(200).json(users);
            return;
        }
        res.status(200).send({ message: 'Collection initialized' });
    }
    catch (error) {
        console.error('Error checking/creating USERS collection:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.initDocUSer = initDocUSer;
const addUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload.none()(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).send({ error: 'Failed to parse form data' });
            }
            const userData = {
                id: (0, crypto_1.randomUUID)(),
                name: req.body.name,
                email: req.body.email,
            };
            const response = yield (0, userCollection_1.addUserDocument)(userData);
            res.status(200).send({ message: response });
        }));
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({ error: 'Failed to add user' });
    }
});
exports.addUserData = addUserData;
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload.none()(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).send({ error: 'Failed to parse form data' });
            }
            const updateUser = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                collection_id: req.body.collection_id,
                no_doc: req.body.no_doc
            };
            const response = yield (0, userCollection_1.updateUserDocument)(updateUser);
        }));
        res.status(200).send({ message: "update success" });
    }
    catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send({ error: 'Failed to update user data' });
    }
});
exports.updateUserData = updateUserData;
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noDoc = req.params.noDoc;
        const collectionId = req.params.collectionId;
        const userData = yield (0, userCollection_1.fetchUserDocument)(noDoc);
        if (userData) {
            res.status(200).send(userData);
        }
        else {
            res.status(404).send({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send({ error: 'Failed to fetch user data' });
    }
});
exports.fetchUserData = fetchUserData;
const deleteUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const collectionId = req.params.collectionId;
        console.log("deleteUserData - id:", id);
        console.log("deleteUserData - collectionId:", collectionId);
        const response = yield (0, userCollection_1.deleteUser)(id, collectionId);
        console.log("deleteUser response:", response); // Cek hasil return
        res.status(200).send({ message: response });
    }
    catch (error) {
        console.error("Error in deleteUserData:", error);
        res.status(500).send({ error: 'Failed to delete user data' });
    }
});
exports.deleteUserData = deleteUserData;

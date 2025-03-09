"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.fetchUserDocument = exports.updateUserDocument = exports.addUserDocument = exports.LoadUser = void 0;
const db_1 = require("../core/db");
const { format, subDays } = require('date-fns');
const getPrevDate = () => {
    const previousDate = subDays(new Date(), 1);
    return format(previousDate, 'yyyyMMdd');
};
const getCurrentDate = () => {
    return format(new Date(), 'yyyyMMdd');
};
const LoadUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocRef = db_1.db.collection("testdb").doc("users").collection(getCurrentDate());
        const querySnapshot = yield userDocRef.get();
        if (querySnapshot.empty) {
            console.log('No documents found for the current date.');
            return null;
        }
        const users = querySnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        return users;
    }
    catch (error) {
        console.error('Error fetching user document:', error);
        return null;
    }
});
exports.LoadUser = LoadUser;
const addUserDocument = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocRef = db_1.db.collection("testdb").doc("users");
        const lastID = yield checkUsers();
        let response;
        if (lastID == null) {
            userDocRef.collection(getCurrentDate()).add(userData);
            response = "user new";
        }
        else {
            console.log(lastID);
            userDocRef.collection(lastID).add(userData);
            response = "existing data";
        }
        return response;
    }
    catch (error) {
        console.error('Error updating user document:', error);
        throw error;
    }
});
exports.addUserDocument = addUserDocument;
const updateUserDocument = (updateUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('User Data:', updateUser);
        const userDocRef = db_1.db.collection("testdb").doc("users").collection(updateUser.collection_id);
        yield userDocRef.doc(updateUser.no_doc).update({
            id: updateUser.id,
            email: updateUser.email,
            name: updateUser.name
        });
        console.log('User document updated successfully');
    }
    catch (error) {
        console.error('Error updating user document:', error);
        throw error;
    }
});
exports.updateUserDocument = updateUserDocument;
const checkUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocRef = db_1.db.collection("testdb").doc("users");
        const querySnapshot = yield userDocRef.listCollections();
        const lastCollection = querySnapshot[querySnapshot.length - 1];
        let newCollectionID;
        if (lastCollection.id != getCurrentDate()) {
            newCollectionID = getCurrentDate();
            console.log("new ID", newCollectionID);
        }
        else {
            newCollectionID = lastCollection.id;
            console.log("Existing ID", newCollectionID);
        }
        return newCollectionID;
    }
    catch (error) {
        console.error('Error fetching user document:', error);
        return null; // Return null in case of error
    }
});
const fetchUserDocument = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield db_1.db.collection("testdb").doc("users").listCollections(); // Await the collections list
        for (const collection of collections) {
            const snapshot = yield collection.get();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                if (data.email === email) { // Use the provided email to find the document
                    console.log(`Found document in collection ${collection.id} with ID ${doc.id}:`, data);
                    return data; // Return the found user data, cast to User type
                }
            }
        }
        return null; // Return null if no user was found
    }
    catch (error) {
        console.error('Error fetching user document:', error);
        return null; // Return null in case of error
    }
});
exports.fetchUserDocument = fetchUserDocument;
const deleteUser = (noDoc, collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocRef = db_1.db.collection("testdb").doc("users").collection(collectionId);
        yield userDocRef.doc(noDoc).delete();
        return "delete success";
    }
    catch (error) {
        console.error('Error fetching user document:', error);
        return null;
    }
});
exports.deleteUser = deleteUser;

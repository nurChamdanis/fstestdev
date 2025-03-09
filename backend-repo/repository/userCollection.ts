import {db} from '../core/db';
import { UpdateUser, User } from '../entities/user'; 
import { collection, query, where  } from "firebase/firestore";
const { format, subDays } = require('date-fns');

const getPrevDate = () => { 
    const previousDate = subDays(new Date(), 1); 
    return format(previousDate, 'yyyyMMdd');
};

const getCurrentDate = () => { 
    return format(new Date(), 'yyyyMMdd');
}; 

export const LoadUser = async (collectionId: string) => {
    try {
        const userDocRef = db.collection("testdb").doc("users").collection(collectionId); 
        const querySnapshot = await userDocRef.get(); 
        if (querySnapshot.empty) {
            console.log('No documents found for the current date.');
            return null;
        } 
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return users;  
    } catch (error) {
        console.error('Error fetching user document:', error);
        return null;   
    }
};

export const addUserDocument = async (userData: User) => {
    try {
        const userDocRef = db.collection("testdb").doc("users");
        const lastID = await checkUsers();
        let response; 
        if (lastID == null) {
            userDocRef.collection(getCurrentDate()).add(userData);
            response="user new";
        } else {
            console.log(lastID);
            userDocRef.collection(lastID).add(userData);
            response="existing data";
        } 
        return response;
    } catch (error) {
        console.error('Error updating user document:', error);
        throw error;
    }
}

export const updateUserDocument = async (updateUser: UpdateUser) => {
    try { 
        console.log('User Data:', updateUser);  
        const userDocRef = db.collection("testdb").doc("users").collection(updateUser.collection_id);  
        await userDocRef.doc(updateUser.no_doc).update({
            id: updateUser.id,
            email: updateUser.email,
            name: updateUser.name
        });

        console.log('User document updated successfully');
    } catch (error) {
        console.error('Error updating user document:', error);
        throw error;
    }
};

const checkUsers = async () => {
    try {
        const userDocRef = db.collection("testdb").doc("users"); 
        const querySnapshot = await userDocRef.listCollections(); 
        const lastCollection = querySnapshot[querySnapshot.length - 1];
        let newCollectionID;
        if(lastCollection.id != getCurrentDate()){
            newCollectionID = getCurrentDate();
            console.log("new ID", newCollectionID); 
        }else{
            newCollectionID = lastCollection.id
            console.log("Existing ID", newCollectionID); 
        }
        return newCollectionID;
    } catch (error) {
        console.error('Error fetching user document:', error);
        return null;   
    }
};

export const fetchUserDocument = async (email: string): Promise<User | null> => {
    try {
        const collections = await db.collection("testdb").doc("users").listCollections(); // Await the collections list
        for (const collection of collections) {
            const snapshot = await collection.get();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                if (data.email === email) {  
                    console.log(`Found document in collection ${collection.id} with ID ${doc.id}:`, data);
                    return data as User; 
                }
            }
        }
        return null;  
    } catch (error) {
        console.error('Error fetching user document:', error);
        return null;  
    }
};
export const deleteUser = async (id: string, collectionId: string) => {
    try {
        console.log("deleteUser - Function Called!");
        console.log("deleteUser - collectionId:", collectionId);
        console.log("deleteUser - id:", id);

        if (!id || !collectionId) {
            throw new Error("Invalid parameters: 'id' and 'collectionId' are required.");
        }

        const userCollectionRef = db.collection("testdb").doc("users").collection(collectionId);
        const querySnapshot = await userCollectionRef.where("id", "==", id).get();

        if (querySnapshot.empty) {
            console.log("No matching user found.");
            return { success: false, message: "User not found" };
        }

        await Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()));

        return { success: true, message: "User deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting user document:", error);
        return { success: false, message: error.message };
    }
};

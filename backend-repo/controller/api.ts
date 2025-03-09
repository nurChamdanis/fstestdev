import { Request, Response } from 'express';
import multer from 'multer';
import { updateUserDocument, fetchUserDocument, addUserDocument, LoadUser, deleteUser } from '../repository/userCollection';
import { User, UpdateUser } from '../entities/user';
import { randomUUID } from 'crypto';
import * as admin from 'firebase-admin'; 

const upload = multer(); 
const db = admin.firestore();

export const initDocUSer = async (req: Request, res: Response) => { 

    try {
        const collectionId = req.params.collectionId;
        const querySnapshot = await db.collection('testdb').limit(1).get();
        if (querySnapshot.empty) {
            await db.collection('testdb').doc('initialDocument').set({ initialized: true });
            console.log('USERS collection created.');
        } else {
            const users = await LoadUser(collectionId);  
            res.status(200).json(users);  
            return;  
        }

        res.status(200).send({ message: 'Collection initialized' });
    } catch (error) {
        console.error('Error checking/creating USERS collection:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const addUserData = async (req: Request, res: Response) => { 
    try { 
        upload.none()(req, res, async (err: any) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).send({ error: 'Failed to parse form data' });
            }
 
            const userData: User = {
                id: randomUUID() as string,  
                name: req.body.name as string,
                email: req.body.email as string, 
            };

            const response = await addUserDocument(userData); 
            res.status(200).send({ message: response});
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({ error: 'Failed to add user' });
    }
}

export const updateUserData = async (req: Request, res: Response) => {
    try {
        upload.none()(req, res, async (err: any) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).send({ error: 'Failed to parse form data' });
            }

            const updateUser: UpdateUser = {
                id: req.body.id as string,
                name: req.body.name as string,
                email: req.body.email as string,
                collection_id: req.body.collection_id as string,
                no_doc: req.body.no_doc as string
            };

            const response = await updateUserDocument(updateUser);
        });
        res.status(200).send({ message: "update success" });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send({ error: 'Failed to update user data' });
    }
};

export const fetchUserData = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const collectionId = req.params.collectionId as string;

        const userData = await fetchUserDocument(id, collectionId);
        if (userData) {
            res.status(200).send(userData);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send({ error: "Failed to fetch user data" });
    }
};
 
export const deleteUserData = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const collectionId = req.params.collectionId;

        console.log("deleteUserData - id:", id);
        console.log("deleteUserData - collectionId:", collectionId);

        const response = await deleteUser(id, collectionId);

        console.log("deleteUser response:", response); // Cek hasil return
        res.status(200).send({ message: response });
    } catch (error) {
        console.error("Error in deleteUserData:", error);
        res.status(500).send({ error: 'Failed to delete user data' });
    }
};

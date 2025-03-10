import axios from "axios";
import {User, UpdateUser} from "./User";

interface FetchUsersResponse {
    users: User[];
}

interface SaveUserResponse {
    success: boolean;
    message: string;
}

interface DeleteUserResponse {
    success: boolean;
    message: string;
}

interface IDUserResponse {
    data: User[]
    success: boolean;
    message: string;
}

interface UpdateUserResponse {
    data: User[]
    success: boolean;
    message: string;
}

const DELETE_USERS = "http://127.0.0.1:3030/users/delete";
const FETCH_USERS = "http://127.0.0.1:3030/users";
const ID_FETCH_USERS = "http://127.0.0.1:3030/users/fetch";
const CREATED_USERS = "http://127.0.0.1:3030/users/create";
const UPDATED_USERS = "http://127.0.0.1:3030/users/update";

const AUTH_HEADER = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "validToken",
    },
};
 
export const fetchUsers = async (txtDate: string): Promise<FetchUsersResponse> => {
    try {
        const response = await axios.get(FETCH_USERS+"/"+txtDate, AUTH_HEADER);
        return { users: response.data };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
 
export const saveUser = async (user: User): Promise<SaveUserResponse> => {
    try {
        const response = await axios.post(CREATED_USERS, user, AUTH_HEADER);
        return { success: true, message: "User added successfully" };
    } catch (error) {
        console.error("Error saving user:", error);
        return { success: false, message: "Failed to add user" };
    }
};

export const deleteUsers = async (id: string, collectionId: string): Promise<DeleteUserResponse> => {
    try {
        const response = await axios.delete(`${DELETE_USERS}/${id}/${collectionId}`, AUTH_HEADER);
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, message: "Failed to delete user" };
    }
};

export const getIdUsers = async (id: string, collectionId: string): Promise<IDUserResponse> => {
    try {
        const response = await axios.get(`${ID_FETCH_USERS}/${id}/${collectionId}`, AUTH_HEADER); 
        return { success: true, message: "User found!", data: response.data };
    } catch (error) {
        console.error("Error fetching user:", error); 
        return { success: false, message: "Failed to fetch user", data: null };
    }
};

export const updateUser = async (updateUser: UpdateUser): Promise<UpdateUserResponse> => {
    try {
        const response = await axios.put(`${UPDATED_USERS}`, updateUser, AUTH_HEADER);
        return { success: true, message: "User found!", data: response.data };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, message: "Failed to fetch user", data: null };
    }
};

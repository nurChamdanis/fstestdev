import axios from "axios";
import User from "./User";

interface FetchUsersResponse {
    users: User[]; 
}

const fetchUsers = async (): Promise<FetchUsersResponse> => {
    try {
        const response = await axios.get("http://127.0.0.1:3030/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "validToken",
            },
        }); 
        return { users: response.data };  
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export default fetchUsers;

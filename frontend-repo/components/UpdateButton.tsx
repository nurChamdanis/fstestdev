import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import CustomButton from "../theme/CustomButton";
import fetchUsers from "../apis/userApi"; 
import User from "../apis/User";

const UpdateButton = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFetchUsers = async () => {
        setLoading(true);
        try {
            const { users } = await fetchUsers(); // 🔥 Ambil `users` dari response
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            <CustomButton onClick={handleFetchUsers} loading={loading} text="Load Users" />

            {users.length > 0 && (
                <List>
                    {users.map((user) => (
                        <ListItem key={user.id}>
                            <ListItemText primary={user.name} secondary={user.email} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default UpdateButton;

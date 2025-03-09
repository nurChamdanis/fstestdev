import React, { useState } from "react";
import {
    List, ListItem, ListItemText, SelectChangeEvent, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomButton } from "../theme/CustomButton";
import { fetchUsers, deleteUsers } from "../apis/userApi";
import { User } from "../apis/User";
import { CustomSelect } from "../theme/CustomDropdown";

export const UpdateButton = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFetchUsers = async () => {
        setLoading(true);
        try {
            if (!selectedDate) {
                console.warn("No date selected!");
                return;
            }
            const formattedDate = selectedDate.replace(/-/g, "");
            console.log("Formatted Date:", formattedDate);

            const response = await fetchUsers(formattedDate);
            console.log("API Response:", response);   
            if (!response || !response.users) {
                console.warn("No users found!");
                setUsers([]);  
                return;
            }

            setUsers(response.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleDateChange = (event: SelectChangeEvent<string>) => {
        setSelectedDate(event.target.value);
    };
 
    const handleEditUser = (user: User) => {
        console.log("Editing User:", user); 
    };
 
    const handleDeleteUser = async (userId: string) => {
        console.log("Deleting User:", userId);
        const formattedDate = selectedDate.replace(/-/g, "");
        await deleteUsers(userId, formattedDate);
        setUsers(users.filter(user => user.id !== userId));  
    };

    return (
        <div style={{ marginBottom: "10px", marginTop: "10px", display: 'flex', flexDirection: 'column' }}>
            <CustomSelect value={selectedDate} onChange={handleDateChange} style={{ height: '80px' }} />
            <CustomButton onClick={handleFetchUsers} loading={loading} text="Load Users" />
            <div>
                {users.length > 0 ? (
                    <List>
                        {users.map((user) => (
                            <ListItem key={user.id} secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }>
                                <ListItemText primary={user.name} secondary={user.email} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    !loading && <p>EMPTY DATA USERS</p>
                )}
            </div>
        </div>
    );

};

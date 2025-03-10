import React, { useState, useEffect } from "react";
import {
    List, ListItem, ListItemText, SelectChangeEvent, IconButton, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomButton } from "../theme/CustomButton";
import { CustomSelect } from "../theme/CustomDropdown";
import { CustomInput } from "../theme/CustomInput";
import { fetchUsers, deleteUsers, getIdUsers, updateUser } from "../apis/userApi";
import { UpdateUser, User } from "../apis/User";

export const UpdateButton = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    // Editing states
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [EmailUpdate, setEmailUpdate] = useState("");
    const [NameUpdate, setNameUpdate] = useState("");

    /**
     * Whenever we set an editingUser, populate the local form states (EmailUpdate, NameUpdate)
     */
    useEffect(() => {
        if (editingUser) {
            setEmailUpdate(editingUser.email);
            setNameUpdate(editingUser.name);
        } else {
            setEmailUpdate("");
            setNameUpdate("");
        }
    }, [editingUser]);
    
    const handleFetchUsers = async () => {
        if (!selectedDate) {
            console.warn("No date selected!");
            return;
        }
        setLoading(true);
        try {
            const formattedDate = selectedDate.replace(/-/g, "");
            console.log("Fetching users for date:", formattedDate);

            const response = await fetchUsers(formattedDate);
            console.log("Fetched Users:", response);

            if (!response || !response.users || response.users.length === 0) {
                console.warn("No users found!");
                setUsers([]);
            } else {
                setUsers(response.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDateChange = (event: SelectChangeEvent<string>) => {
        setSelectedDate(event.target.value);
    };
    
    const handleEditUser = async (user: User) => {
        console.log("Editing user:", user);
        if (!selectedDate) {
            console.warn("No date selected for fetching user details!");
            return;
        }

        const formattedDate = selectedDate.replace(/-/g, "");
        try {
            const userDetails = await getIdUsers(user.id, formattedDate);
            console.log("Fetched User Details:", userDetails);

            if (!userDetails.success || !Array.isArray(userDetails.data) || userDetails.data.length === 0) {
                console.warn("User details not found or not an array!", userDetails.data);
                return;
            }

            const firstUser: User = userDetails.data[0];
            setEditingUser(firstUser);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    /**
     * Delete a user from local state and the backend
     */
    const handleDeleteUser = async (userId: string) => {
        console.log("Deleting user with ID:", userId);
        if (!selectedDate) {
            console.warn("No date selected for deletion!");
            return;
        }

        const formattedDate = selectedDate.replace(/-/g, "");
        try {
            await deleteUsers(userId, formattedDate);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
 
    const handleUpdateUser = async () => {
        if (!editingUser) return;
        if (!selectedDate) {
            console.warn("No date selected for updating user!");
            return;
        }

        const formattedDate = selectedDate.replace(/-/g, ""); 
        const updatedUser: UpdateUser = {
            collectId: formattedDate, 
            ...editingUser,
            email: EmailUpdate,
            name: NameUpdate,
        };

        try { 
            await updateUser(updatedUser); 
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
            );
 
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div style={{ marginBottom: "10px", marginTop: "10px", display: 'flex', flexDirection: 'column' }}>
            <CustomSelect value={selectedDate} onChange={handleDateChange} style={{ height: '80px' }} />
            <CustomButton onClick={handleFetchUsers} loading={loading} text="Load Users" />

            {editingUser ? (
                <div style={{ width: '70vh', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Typography variant="h6">Editing User</Typography>

                    <div>
                        <label>Email</label>
                        <CustomInput
                            type="email"
                            placeholder="Enter email"
                            value={EmailUpdate}
                            onChange={(e) => setEmailUpdate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Name</label>
                        <CustomInput
                            type="text"
                            placeholder="Enter name"
                            value={NameUpdate}
                            onChange={(e) => setNameUpdate(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <CustomButton onClick={() => setEditingUser(null)} text="Cancel Edit" loading={false} />
                        <CustomButton onClick={handleUpdateUser} text="Update Edit" loading={false} />
                    </div>
                </div>
            ) : (
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
                        !loading && <Typography variant="body1">EMPTY DATA USERS</Typography>
                    )}
                </div>
            )}
        </div>
    );
};

import { useState } from "react";
import { CustomInput } from "../theme/CustomInput";
import { CustomButton } from "../theme/CustomButton";
import { saveUser } from "../apis/userApi";
import type { User } from "../apis/User";

interface SaveUserResponse {
    success: boolean;
    message?: string;
}

export const AddUsers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("black");
    const [loading, setLoading] = useState(false); 

    const handleAddUser = async () => {
        if (!email) {
            setMessage("Email is required.");
            setMessageColor("red");
            return;
        }

        const newUser: User = {
            email,
            id: undefined,
            name,
        };

        try {
            setLoading(true); 
            const response: SaveUserResponse = await saveUser(newUser);

            if (response.success) {
                setMessage(response.message || "User added successfully!");
                setMessageColor("green");
                setName("");
                setEmail("");
            } else {
                setMessage(response.message || "Failed to add user.");
                setMessageColor("red");
            }
        } catch (error) {
            setMessage("An error occurred while adding the user.");
            setMessageColor("red");
            console.error("Error:", error);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div style={{ marginTop: "20px", width: "400px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: "1px solid black",
                    width: "100%",
                    padding: "8px",
                    alignItems: "center",
                }}
            >
                <label>Add Email</label>
                <CustomInput
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: "1px solid black",
                    width: "100%",
                    padding: "8px",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <label>Add Name</label>
                <CustomInput
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <CustomButton
                onClick={handleAddUser}
                style={{ marginTop: "10px" }}
                text="Add Users"
                loading={loading} 
            />
            {message && (
                <p style={{ marginTop: "10px", color: messageColor }}>
                    {message}
                </p>
            )}
        </div>
    );
};

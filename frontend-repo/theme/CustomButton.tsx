import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CustomButtonProps {
    onClick: () => void;
    loading: boolean;
    text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, loading, text }) => {
    return (
        <Button
            style={{ height: "30px" }}
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={loading}
        >
            {loading ? <CircularProgress size={24} /> : text}
        </Button>
    );
};

export default CustomButton;

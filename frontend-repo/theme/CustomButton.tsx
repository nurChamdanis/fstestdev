import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CustomButtonProps {
    onClick: () => void;
    loading: boolean;
    text: string;
    style?: React.CSSProperties;  
}

export const CustomButton: React.FC<CustomButtonProps> = ({ onClick, loading, text, style }) => {
    return (
        <Button
            style={{ height: "30px", ...style }}  
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={loading}
        >
            {loading ? <CircularProgress size={24} /> : text}
        </Button>
    );
};

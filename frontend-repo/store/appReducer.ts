import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AppState {
    isLoading: boolean;
    users: User[];
}

const initialState: AppState = {
    isLoading: false,
    users: [],
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
});

export const { setLoading, setUsers } = appSlice.actions;
export default appSlice.reducer;

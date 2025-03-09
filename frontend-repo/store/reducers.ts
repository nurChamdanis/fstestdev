import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appReducer"; // ✅ Pastikan path benar

const rootReducer = combineReducers({
    app: appReducer, // ✅ Pastikan "app" ada di sini
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

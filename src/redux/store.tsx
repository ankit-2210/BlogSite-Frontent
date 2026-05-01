import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactReducer from "./contact/contactSlice";
import postReducer from "./post/postSlice";
import imageReducer from "./file/imageSlice";
import commentReducer from "./comment/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        contact: contactReducer,
        post: postReducer,
        image: imageReducer,
        comment: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
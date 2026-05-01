import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/api";
import type { Comment, CommentState } from "./types/comment";

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
};


export const fetchComments = createAsyncThunk<
    Comment[],
    string,
    { rejectValue: string }
>("comments/fetchComments", async (postId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/comments/${postId}`);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch comments"
            );
        }
        return rejectWithValue("Something went wrong");
    }
})


export const addComment = createAsyncThunk<
    Comment,
    { postId: string; text: string; username: string },
    { rejectValue: string }
>("comments/addComment", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/comments", payload);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add comment"
            );
        }
        return rejectWithValue("Something went wrong");
    }
})


export const deleteComment = createAsyncThunk<
    string,
    { id: string; username: string },
    { rejectValue: string }
>("comments/deleteComment", async ({ id, username }, { rejectWithValue }) => {
    try {
        await api.delete(`/comments/${id}`, {
            data: { username },
        });
        return id;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete comment"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});



const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error";
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.unshift(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(
                    (c) => c._id !== action.payload
                );
            })
    }
})

export default commentSlice.reducer;


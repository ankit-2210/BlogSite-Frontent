import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/api";
import type { Post, PostState } from "./types/post";


const initialState: PostState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
};


export const fetchPosts = createAsyncThunk<
    Post[],
    string | undefined,
    { rejectValue: string }
>("posts/fetchPosts", async (query, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/posts${query || ""}`);
        // console.log(data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch posts"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});

export const fetchPost = createAsyncThunk<
    Post,
    string,
    { rejectValue: string }
>("posts/fetchPost", async (id, { rejectWithValue }) => {
    try {
        // console.log(id);
        const { data } = await api.get(`/posts/${id}`);
        // console.log(data);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch post"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});


export const createPost = createAsyncThunk<
    Post,
    Partial<Post>,
    { rejectValue: string }
>("posts/createPost", async (postData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/create", postData);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch posts"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});


export const updatePost = createAsyncThunk<
    Post,
    { id: string, data: Partial<Post> },
    { rejectValue: string }
>("posts/updatePost", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/posts/${id}`, data);
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch posts"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});

export const deletePost = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("posts/deletePost", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/posts/${id}`);
        return id;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete post"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error fetching posts";
            })

            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error fetching posts";
            })

            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload
                );
            })

    },
});

export default postSlice.reducer;
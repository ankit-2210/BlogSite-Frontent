import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";
import axios from "axios";

interface User {
    id: string;
    username: string;
    name: string;
    email?: string
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const login = createAsyncThunk<{ user: User },
    { username: string; password: string },
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/login", credentials);
        console.log(data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});

export const signup = createAsyncThunk<{ message: string },
    {
        name: string;
        email: string;
        username: string;
        password: string;
    },
    { rejectValue: string }
>("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/signup", userData);
        console.log(data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Signup failed"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});

export const checkAuth = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("auth/check", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/about");
        console.log(data);
        return data;
    } catch {
        return rejectWithValue("Not authenticated");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await api.get("/logout");
        return true;
    } catch {
        return rejectWithValue("Logout failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Login failed";
            })

            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Signup failed";
            })

            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
                state.loading = false;
            })
    },
});

export default authSlice.reducer;
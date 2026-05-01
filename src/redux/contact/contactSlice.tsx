import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";
import axios from "axios";
import type { ContactPayload, ContactState } from "./types/contact";

const initialState: ContactState = {
    loading: false,
    error: null,
    success: false,
};


export const sendContact = createAsyncThunk<{ message: string },
    ContactPayload,
    { rejectValue: string }
>("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/contact", formData);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to send");
        }
        return rejectWithValue("Something went wrong");
    }
});


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetContact: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendContact.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(sendContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error";
            });
    }
})

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
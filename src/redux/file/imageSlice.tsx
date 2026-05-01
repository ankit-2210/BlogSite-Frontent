import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";
import axios from "axios";

interface ImageState {
    imageUrl: string | null,
    loading: boolean,
    error: string | null;
}

const initialState: ImageState = {
    imageUrl: null,
    loading: false,
    error: null,
}

export const uploadImage = createAsyncThunk<
    string,
    FormData,
    { rejectValue: string }
>("image/upload", async (formData, { rejectWithValue }) => {
    try {
        // console.log(formData);
        const { data } = await api.post("/upload", formData);
        console.log(data);
        return data.imageUrl;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Upload failed"
            );
        }
        return rejectWithValue("Something went wrong");
    }
});


const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        resetImage: (state) => {
            state.imageUrl = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false;
                state.imageUrl = action.payload;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Upload failed";
            });
    }
})

export const { resetImage } = imageSlice.actions;
export default imageSlice.reducer;
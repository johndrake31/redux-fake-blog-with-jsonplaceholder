import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";


export const loginAuth = createAsyncThunk(
    'auth/login',
    async (loginData) => {
        const email = '' + loginData.email;
        try {
            const users = await client.get("/users");
            const user = users.data.filter((user) => (email.toLowerCase() === user.email.toLowerCase()));
            if (user.length === 0) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: [{}],
        status: "idle",
        error: null,
        login: false,
    },
    reducers: {
        logoutAuth: (state) => {
            state.login = false;
            state.user = [{}];
        },

    },
    extraReducers: (builder) => {
        builder
            // create addCase for loginUser
            .addCase(loginAuth.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.login = true;
                state.error = null;
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});


export const { logoutAuth } = authSlice.actions
export default authSlice.reducer;


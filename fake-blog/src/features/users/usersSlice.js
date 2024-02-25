import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const response = await client.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
}
);
export const loginUser = createAsyncThunk(
    'users/login',
    async (loginData) => {
        const email = ''+loginData.email;
        try {
            const users = await client.get("/users");
            const user = users.data.filter((user)=>( email.toLowerCase() === user.email.toLowerCase()  ));
            return user;
      } catch (error) {
        throw error;
      }
    }
  );

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // create addCase for loginUser
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
            


    },
});


export const { } = usersSlice.actions
export default usersSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "mongoose";
const url = process.env.REACT_APP_BASE_URL;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { getState, rejectWithValue }) => {

    const token = getState().auth.token;
    try {
        const response = await axios.get(`${url}/api/users`, {
            headers: { Authorization: token },
        });
        if (response.status !== 200) {
            throw new Error("Failed to fetch users");
        }
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})


export const createUser = createAsyncThink("users/createUser", async (user, { getState, rejectWithValue }) => {

    const token = getState().auth.token;
    try {
        const response = await axios.post(`${url}/api/users`, user, {
            headers: { Authorization: token },
        });
        if (response.status !== 200) {
            throw new Error("Failed to create user");
        }
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const updateUser = createAsyncThunk("users/UpdateUser", async (user, { getState, rejectWithValue }) => {

    const token = getState().auth.token;
    try {
        const response = await axios.put(`${url}/api/users/${user.id}`, user, {
            headers: { Authorization: token },
        });
        if (response.status !== 200) {
            throw new Error("Failed to update user");
        }
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { getState, rejectWithValue }) => {

    const token = getState().auth.token;
    try {
        const response = await axios.delete(`${url}/api/users/${id}`, {
            headers: { Authorization: token },
        });
        if (response.status !== 200) {
            throw new Error("Failed to delete user");
        }
        return id;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id, { getState, rejectWithValue }) => {

    const token = getState().auth.token;
    try {
        const response = await axios.get(`${url}/api/users/${id}`, {
            headers: { Authorization: token },
        });
        if (response.status !== 200) {
            throw new Error("Failed to fetch user");
        }
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const userSlice = createSlice({
    name: "users",

    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);

            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload || "Failed to create user";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload || "Failed to update user";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete user";
            })
            .addCase(fetchUserById, fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch a user";
            })
    }

})

export default userSlice.reducer;
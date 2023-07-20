import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("Users/addUser", async (user) => {
    return axios.post("http://localhost:9000/Users", user)
    .then((res) => {return res.data})
    .catch((err) => console.log(err));
});

const ListSlice = createSlice({
    name: "Users",
    initialState: {
        users: [],
        error : false,
        status: "",
        erreur: ""
    },
    reducers: {

    },
    extraReducers : (builder) =>{
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.users = action.payload
            state.error = action.payload.error
            state.status = "Accepted"
        })
        .addCase(addUser.pending, (state) => {
            state.status = "Pending"
        })
        .addCase(addUser.rejected, (state, action) => {
            state.erreur = action.payload
            state.status = "Rejected"
        })
    }
})

export default ListSlice.reducer
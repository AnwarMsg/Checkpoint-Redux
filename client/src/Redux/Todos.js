import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTodo = createAsyncThunk("Todos/addTodo", async (todo) => {
    return axios.post("http://localhost:9000/AddTodos", todo)
    .then((res) => {return res.data})
    .catch((err) => console.log(err));
});

const AddTodoSlice = createSlice({
    name: "Todos",
    initialState: {
        todos: {},
        error : false,
        status: "",
        erreur: ""
    },
    reducers: {

    },
    extraReducers : (builder) =>{
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.todos = action.payload
            state.error = action.payload.error
            state.status = "Accepted"
        })
        .addCase(addTodo.pending, (state) => {
            state.status = "Pending"
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.erreur = action.payload
            state.status = "Rejected"
        })
    }
})

export default AddTodoSlice.reducer
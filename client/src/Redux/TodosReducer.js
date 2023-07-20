import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodo = createAsyncThunk("TodosReducer/getTodo", async (todo) => {
    return axios.post("http://localhost:9000/Todos", todo)
    .then((res) => {return res.data})
    .catch((err) => console.log(err));
});
export const deleteTodo = createAsyncThunk("TodosReducer/deleteTodo", async (id) => {
    return axios.delete(`http://localhost:9000/deletetodo/${id}`)
    .then((res) => {return res.data})
    .catch((err) => console.log(err));
});

const TodosSlice = createSlice({
    name : "TodosReducer",
    initialState : {
        todos : {},
        count : 0,
        status : "",
        erreur : ""
    },
    reducers : {
        checkedTodos(state, action){
            state.todos = state.todos.map(element => element.title === action.payload ? {...element, done : !element.done} : element)
        },
    },
    extraReducers : (builder) =>{
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.todos = action.payload.todos
            state.count = action.payload.counting
            state.status = "Accepted"
        })
        .addCase(getTodo.pending, (state) => {
            state.status = "Pending"
        })
        .addCase(getTodo.rejected, (state, action) => {
            state.erreur = action.payload
            state.status = "Rejected"
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter((element) => element._id !== action.payload);
            state.count -= 1;
            state.status = "Accepted"
        })
        .addCase(deleteTodo.pending, (state) => {
            state.status = "Pending"
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.erreur = action.payload
            state.status = "Rejected"
        })
    }

})

export const {checkedTodos, deleteTodos} = TodosSlice.actions

export default TodosSlice.reducer
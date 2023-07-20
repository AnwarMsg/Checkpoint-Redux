import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./Reducer"
import TodosReducer from "./TodosReducer";
import ApiReducer from "./ApiReducer";
import AddTodoReducer from "./Todos"

const store = configureStore({
    reducer : {
        LoginRedux : LoginReducer,
        TodosRedux : TodosReducer,
        ApiRedux : ApiReducer,
        AddTodoRedux : AddTodoReducer
    }
})

export default store
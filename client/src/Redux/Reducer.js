import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUser = createAsyncThunk("Login/LoginUser", async (user) => {
    return axios.post("http://localhost:9000/Login", user)
    .then((res) => {return res.data})
    .catch((err) => console.log(err));
});

const LoginSlice = createSlice({
    name : "Login",
    initialState : {
        user : {},
        islogged : false,
        status: "",
        erreur : ""
    },
    reducers : {
        signOut(state){
            localStorage.removeItem("user");
            state.user = {};
            state.islogged = false
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload.users))
            state.user = action.payload.users
            state.islogged = action.payload.islogged
            state.status = "Accepted"
        })
        .addCase(LoginUser.pending, (state) => {
            state.status = "Pending"
        })
        .addCase(LoginUser.rejected, (state, action) => {
            state.erreur = action.payload
            state.status = "Rejected"
        })
    }
})

export const {signOut} = LoginSlice.actions
export default LoginSlice.reducer
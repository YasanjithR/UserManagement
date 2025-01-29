import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import JwtDecode from 'jwt-decode';

const url = process.env.REACT_APP_BASE_URL;

export const login = createAsyncThunk("auth/login" ,async (credentials,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${url}/api/login`,credentials);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})


const authSlice = createSlice({

    name :"auth",
    initialState : {
        user : null,
        token : null,
        isAuthenticated : false,
        userName : null,
        email : null,
        error : null,
        loading : false
    },

    reducers :{
        logout : (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.userName = null;
            state.email = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder) =>{

        builder
        
        .addCase(login.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled,(state,action)=>{
          
            state.token = action.payload.token;
            state.isAuthenticated = true;
          
            state.loading = false;
            localStorage.setItem("token", action.payload.token);
            try{

                const decoded = JwtDecode(action.payload.token);
                state.user = decoded.id;
                state.userName = decoded.firstname;
                state.email = decoded.email;

            }catch(error){
                state.error = error.message;
            }
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to login";
          });

    }
    
})

export const{logout} = authSlice.actions;
export default authSlice.reducer;
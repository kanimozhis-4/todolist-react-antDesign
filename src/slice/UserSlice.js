import React from 'react'
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { logInUser,signInUser } from '../service/UserService'
import { useNavigate } from 'react-router-dom'
export const logInUserAsync =createAsyncThunk(
    "user/logInUser",
    async(loginData)=>{
        const response =await logInUser(loginData);
        return response;
    }

)  
export const sigInUserAsync=createAsyncThunk(
    "user/signInUser",
    async(siginData)=>{
      const response=await signInUser(siginData);
      return response;
    }
)
const userSlice =createSlice({
    name:"user",
    initialState: {
        user: null,
        status: 'idle',
        error: null,
      }, 
      extraReducers: (builder) => {
        builder
          .addCase(logInUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(logInUserAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
           
            state.user = action.payload.token;
            state.error = null;
            
          })
          .addCase(logInUserAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          .addCase(sigInUserAsync.fulfilled,(state, action)=>{
            state.status = 'succeeded';
          })
      },

}) 
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
    token:"",
}
const authSlice=createSlice({

    name:"Authentication",
    initialState:initialState,
    reducers:{
      login:(state,action)=>{
        state.isAuthenticated=true;
        state.token=action.payload;
      },
      logout:(state)=>{
        state.isAuthenticated=false; 
        state.token="";
      }
    }
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;
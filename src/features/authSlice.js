import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:localStorage.getItem("token")?true:false,
    token:localStorage.getItem("token")||"",
}
const authSlice=createSlice({

    name:"Authentication",
    initialState:initialState,
    reducers:{
      login:(state,action)=>{
        state.isAuthenticated=true;
        state.token=action.payload;
        localStorage.setItem("token",action.payload)
      },
      logout:(state)=>{
        state.isAuthenticated=false; 
        state.token="";
        localStorage.removeItem("token")
      }
    }
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;
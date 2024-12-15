import { createContext } from "react";
import { useState } from "react";
export const Authcontext=createContext();


export default function AuthContextProvider({children}){

    const[authenticated,setAuthenticated]=useState(false);
    const[token,setToken]=useState("");
    function login(token){
        setAuthenticated(true);
        setToken(token);
    }
    
    function logout(){
        setAuthenticated(false);
        localStorage.removeItem("token");
    }
    return <Authcontext.Provider  value={{login,logout,authenticated}}>
        {children}
    </Authcontext.Provider>
}
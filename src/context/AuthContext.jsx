import { createContext, useState, useContext } from "react";

const user = localStorage.getItem('user')

export const AuthUserContext = createContext(user)

export const logOut=()=>{
     localStorage.clear()
}


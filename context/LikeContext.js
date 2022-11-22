import axios from "axios";
import React, {createContext} from "react";

export const LikeContext = createContext();

export const LikeProvider = ({children}) => {
    const addLike = (username, id) => {
        axios
        .post("http://13.125.186.247:8000/scholar", {
            'username': username,
            'id': id,
        })
        .then(res =>{
            console.log(res);
        })
        .catch(e=>{
            console.log(`like error ${e}`);
        })
    }


    return (
        <LikeContext.Provider value={{addLike}}>
            {children}
        </LikeContext.Provider>
    );
};

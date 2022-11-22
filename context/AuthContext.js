import axios from "axios";
import React, {createContext} from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const register = ( password, username, semester, lastgpa, fullgpa, income, departments, residence, email) => {
        axios
        .post("http://13.125.186.247:8000/common/users/", {
            'password': password,
            'username': username,
            'semester': semester,
            'lastgpa': lastgpa,
            'fullgpa' : fullgpa,
            'income' : income,
            'departments' : departments,
            'residence' : residence,
            'email' : email,
        })
        .then(res =>{
            let userInfo = res.data;
            console.log(userInfo);
        })
        .catch(e=>{
            console.log(`에러발생!!! register error ${e}`);
        })
    }


    return (
        <AuthContext.Provider value={{register}}>
            {children}
        </AuthContext.Provider>
    );
};
// import axios from "axios";
// import React, {createContext} from "react";
// import { BASE_URL } from "../config";

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//     // const response = await fetch(
//     //     `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//     //     );
//     const register = ( password, username, semester, lastgpa, fullgpa, income, departments, residence, email) => {
//         axios
//         .post("http://13.125.186.247:8000/common/users/", {
//             'password': password,
//             'username': username,
//             'semester': semester,
//             'lastgpa': lastgpa,
//             'fullgpa' : fullgpa,
//             'income' : income,
//             'departments' : departments,
//             'residence' : residence,
//             'email' : email,
//         })
//         .then(res =>{
//             let userInfo = res.data;
//             console.log(userInfo);
//         })
//         .catch(e=>{
//             console.log(`register error ${e}`);
//         })
//     }


//     return (
//         <AuthContext.Provider value={{register}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
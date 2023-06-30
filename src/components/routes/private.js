import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from 'axios'

export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    
    // eslint-disable-next-line
    const [auth,setAuth]=useAuth();

    // we need to get the value that's why we are using the useeffect hook
    useEffect(()=>{
        const authCheck= async()=>{
            const res= await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`

            // NOTE that we have removed the object headers from it as
            // we have set default axios in the auth.js(context api setup)
            // this ensures that whatever request has been made, it passes auth token
            // in the header along with it

            // ,{
            //     headers:{
            //         "Authorization": auth?.token
            //     }
            // }


            );
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        // this if condition says
        // agar hume auth milta hai aur iss auth k andar hume token milta hai
        if(auth?.token) authCheck();
    },[auth?.token]);
    console.log(ok);  
    return ok?<Outlet/> : <Spinner/>
    // when we have to see the nested routing, then we to make the use of Outlet
    // this will enable the routing functionality
    // like in app.js we used self closing tags <Dashboard/> like this
    // so enabling this functioanlity we will be able to make nested route inside the opening and closing tags
}
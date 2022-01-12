import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux/Reducers/rootReducer'

const MyProducts = () => {

    const[auth,setAuth]=useState<boolean>(false)
    const {user}= useSelector((state:IRootState)=>state.auth)
  
    const getProfile= async()=>{console.log("user.token",user.token)
        if(user.token!== ""){
           
        await axios.get("http://localhost:5000/api/users/profile",{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user?.token}`,
            }
        }).then(res=>{
            if(res.data.success){
                setAuth(true)
            }else{
                setAuth(false)
            }
        }) 
        }
        
    }

    useEffect(()=>{
        getProfile();
    },[user])
    return (
        <div>
            {auth ? 
            <h3>MyProdcuts</h3> :
            <h3>need authorization, token failed</h3>}
            
        </div>
    )
}

export default MyProducts

import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IRootState } from "../redux/Reducers/rootReducer"

const Profile = () => {
    const navigate:any=useNavigate()
    const[auth,setAuth]=useState<boolean>(false)
    const {user}= useSelector((state:IRootState)=>state.auth)

    const getProfile= async()=>{
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
            {
                auth ? 
                <h3>profile</h3> :
                <h3>need authorization</h3>
            }
            
        </div>
    )
}

export default Profile

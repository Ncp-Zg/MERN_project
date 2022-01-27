import axios from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Item } from "../type";


const Myfavorites = () => {

    const[favorites,setFavorites] = useState<Item[] | null>(null)

    const {user} = useSelector((state:IRootState)=>({user:state.auth.user}));

    const getFavs = async () => {
        if(user.token){
            await axios.get("http://localhost:5000/api/users/profile/getfavorites",{headers:{
           "Content-Type":"application/json",
           "Authorization":`Bearer ${user.token}`
       }}).then(res=>setFavorites(res.data.favs))
        }
       
    }

    useEffect(()=>{
        getFavs()
    },[user.token])

  return (
  <div>
      {favorites?.map(fav=>
        <p key={fav._id}>{fav.title}</p>)}
  </div>
  );
};

export default Myfavorites;

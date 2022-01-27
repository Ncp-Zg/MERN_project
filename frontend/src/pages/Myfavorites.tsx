import axios from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart, Item } from "../type";


const Myfavorites = () => {

    const[favorites,setFavorites] = useState<Cart[] | null>(null)

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
    <div
    style={{
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
    }}
  >
    {favorites?.map((item) => (
      <Product item={item} key={item._id}/>
    ))}
  </div>
  );
};

export default Myfavorites;

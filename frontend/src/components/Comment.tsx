import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";

const Comment = () => {
    const{id} = useParams();
    const {user} = useSelector((state:IRootState)=>({user:state.auth.user}))

    const getComments = async ()=>{
        await axios.get(`http://localhost:5000/api/products/${id}/getallcomments`).then(res=>console.log(res.data));
        
    }

    useEffect(()=>{
        getComments();
    },[user.token])

  return (
  <div>
      Comment
  </div>
  );
};

export default Comment;

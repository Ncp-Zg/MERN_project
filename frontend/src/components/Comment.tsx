import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Comments } from "../type";

const Comment = () => {
    const{id} = useParams();
    const {user} = useSelector((state:IRootState)=>({user:state.auth.user}))
    const[comments,setComments] = useState<Comments[]>([])

    const getComments = async ()=>{
        await axios.get(`http://localhost:5000/api/products/${id}/getallcomments`).then(res=>setComments(res.data.comments));
        
    }

    useEffect(()=>{
        getComments();
    },[user.token])

  return (
  <div>
      {
          comments.map(cmt=>(
              <Card key={cmt._id} sx={{marginBottom:"5px"}}>
                  <h3>{cmt.comment}</h3>
              </Card>
              
          ))
      }
  </div>
  );
};

export default Comment;

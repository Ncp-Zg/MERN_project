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

    console.log(comments);

  return (
  <div>
      {
          comments.map(cmt=>(
              <Card key={cmt._id} sx={{marginBottom:"5px"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <h6 style={{margin:"5px 5px 0px 0px"}}>⭐⭐⭐⭐⭐</h6>
                  <h6 style={{margin:"5px 5px 0px 0px"}}>{cmt.createdAt}</h6>
                  </div>
                  
                  <h4>{cmt.comment}</h4>
                  <div style={{display:"flex",justifyContent:"end"}}>
                    <h6 style={{margin:"0px 5px 5px 0px"}}>{cmt.user.name}</h6>  
                  </div>
                  
              </Card>
              
          ))
      }
  </div>
  );
};

export default Comment;

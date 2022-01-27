import { Button, Card, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Comments, Item } from "../type";
import { Rating } from "react-simple-star-rating";

export interface Comment {
  product: Item;
}

const Comment: FunctionComponent<Comment> = (props) => {
  const { product } = props;
  console.log(product);
  const { id } = useParams();
  const { user } = useSelector((state: IRootState) => ({
    user: state.auth.user,
  }));
  const [comments, setComments] = useState<Comments[]>([]);
  const [cmt, setCmt] = useState<string>("");
  const [newComment, setNewComment] = useState<Comments>();

  const [rating, setRating] = useState(20); // initial rating value

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);


  const forik = ()=>{let value = [];
    for(let i =0; i< Math.floor(total/5)+1;i++){
     value.push(i+1);
    
}return value;
}

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    // other logic
  };

  const getComments = async () => {
    await axios
      .get(`http://localhost:5000/api/products/${id}/getallcomments`,{params:{page:`${page}`}})
      .then((res) => {setComments(res.data.data);setTotal(res.data.total)});
  };

  useEffect(() => {
    getComments();
  }, [user.token,newComment,page]);

  const handleClick = async (e: any) => {
    e.preventDefault()
    await axios
      .post(
        `http://localhost:5000/api/products/${product._id}/addcomment`,
        { comment: cmt, rating: +rating / 20 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {setNewComment(res.data);setCmt("")});
      
  };

  console.log(cmt);

  
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <div>
      {comments.map((cmt) => (
        <Card key={cmt._id} sx={{ marginBottom: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {cmt.rating === 1 ? (
              <h6 style={{ margin: "5px 5px 0px 0px" }}>⭐</h6>
            ) : cmt.rating === 2 ? (
              <h6 style={{ margin: "5px 5px 0px 0px" }}>⭐⭐</h6>
            ) : cmt.rating === 3 ? (
              <h6 style={{ margin: "5px 5px 0px 0px" }}>⭐⭐⭐</h6>
            ) : cmt.rating === 4 ? (
              <h6 style={{ margin: "5px 5px 0px 0px" }}>⭐⭐⭐⭐</h6>
            ) : (
              <h6 style={{ margin: "5px 5px 0px 0px" }}>⭐⭐⭐⭐⭐</h6>
            )}
            <h6 style={{ margin: "5px 5px 0px 0px" }}>
              {moment(cmt.createdAt).format("LLL")}
            </h6>
          </div>

          <h4>{cmt.comment}</h4>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <h6 style={{ margin: "0px 5px 5px 0px" }}>{cmt.user.name}</h6>
          </div>
        </Card>
      ))}
      <ToggleButtonGroup
      value={page}
      exclusive
      onChange={handleAlignment}
      sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}
    >
      {
        forik().map((pg,index)=>(
          
        
        forik().length=== 1 ? null : <ToggleButton value={pg} key={index} sx={{padding:"4px",marginRight:"2px"}}>{pg}</ToggleButton>
      
  ))
      }
      </ToggleButtonGroup>

      {product.customer?.includes(user.id) ? (
        <Card sx={{ marginTop: "2rem", padding: "0.2rem" }}>
          <Rating onClick={handleRating} ratingValue={rating} />
          <b>{rating / 20}/5</b>
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField
            value={cmt}
              rows={5}
              multiline
              fullWidth
              label="Comment"
              id="fullWidth"
              onChange={(e) => setCmt(e.target.value)}
            />
          </Box>
          <Button fullWidth size="small" onClick={handleClick}>
            send
          </Button>
        </Card>
      ) : null}
    </div>
  );
};

export default Comment;
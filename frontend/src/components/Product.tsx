import React, { FunctionComponent, useRef, useState } from "react";
import { Cart, Item } from "../type";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Product.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/ActionCreators/CartActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";


interface IItemProps {
  item: Cart;
}

const Product: FunctionComponent<IItemProps> = (props) => {

  const navigate = useNavigate();
  const ref = useRef(0);
  const ref2 = useRef(0);
  const [index,setIndex] = useState<any>(0)
  const { item } = props;
  const dispatch = useDispatch();
  const {cart} = useSelector((state:IRootState)=>({cart:state.cart.cart,product:state.product.product}))
  

  const handleClick = () => {
    if(cart.some(c=>c._id===item._id)){
      ref.current = cart[ref2.current].amount
      dispatch(addToCart([{...item,amount:ref.current+1}]))
    }else{
    dispatch(addToCart([{...item,amount:1}]))
   
    
    }

  }

  return (
    <Card sx={{ maxWidth: 320, margin: "10px" }}>
      <div className="slideshow-container1">
        <CardMedia
          sx={{ objectFit: "contain", width:"320px" }}
          component="img"
          height="250"
          image={item.img[index]}
          alt={item.title}
        />
        <a className="prev1" onClick={()=>{
          if(index === 0){
            setIndex(item.img.length -1)}
          else{
            setIndex(index-1)
          }
          }}>
          &#10094;
        </a>
        <a className="next1" onClick={()=>{
          if(index === item.img.length-1){
            setIndex(0);
          }else{
            setIndex(index+1)
          }
        }} >
          &#10095;
        </a>
      </div>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {item.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.desc.slice(0,30)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>Add to Cart</Button>
        <Button size="small" onClick={()=>navigate(`/details/${item._id}`)}>Details</Button>
      </CardActions>
    </Card>
  );
};

export default Product;

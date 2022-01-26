import { Favorite, FavoriteBorder, FavoriteOutlined } from "@mui/icons-material";
import { Button, CardMedia, Grid, Paper, styled, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { addToCart } from "../redux/ActionCreators/CartActionCreators";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";
import "./ProductDetails.css"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProductDetails = () => {
    const [index,setIndex] = useState<any>(0)
    const [amount,setAmount] = useState<number>(1)
    const dispatch = useDispatch();
  const { id } = useParams();
  const { product,user } = useSelector((state: IRootState) => ({
    product: state.product.product,user:state.auth.user
  }));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products",{params:{page:`${state}`}})
      .then((res) => {
        dispatch(setProducts(res.data.data))
      });
  }, []);
 const filteredState = product.filter((item) => item._id.toString() === id);
  console.log(filteredState);
  const {state} = useLocation()
  
  const handleClick=()=>{
    dispatch(addToCart([{...filteredState[0],amount:+amount}]))
  }

  const addToFavorite = ()=>{
    if (user) {
      
    }
  }

  const removeFromFavorite = ()=>{
    
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item className="slideshow-container">
              <CardMedia
                className="fade"
                sx={{ objectFit: "cover" }}
                component="img"
                height="450"
                src={filteredState[0]?.img[index]}
              />
              <a className="prev" onClick={()=>{
          if(index === 0){
            setIndex(filteredState[0].img.length -1)}
          else{
            setIndex(index-1)
          }
          }}>
          &#10094;
        </a>
        <a className="next" onClick={()=>{
          if(index === filteredState[0].img.length-1){
            setIndex(0);
          }else{
            setIndex(index+1)
          }
        }} >
          &#10095;
        </a>
          </Item>
          {
            filteredState.length !== 0 ? <Comment product={filteredState[0]}/> : null
          }
            
          
        </Grid>
        <Grid item xs={6} >
          <Item style={{maxWidth:"100vh"}}>
              <h3>{filteredState[0]?.title}</h3>
          
              <h6>{filteredState[0]?.category}</h6>
          
              <p style={{textAlign:"justify",wordWrap:"break-word"}}>{filteredState[0]?.desc}</p>
              <p>₺{filteredState[0]?.cost}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <TextField type="number" size="small" sx={{width:"4rem"}} onChange = {(e:any)=>setAmount(e.target.value)} InputProps={{
        inputProps: { min: 0,max:12} 
      }}/>
                <Button onClick={handleClick}>Add to Cart</Button>
                {
                  user.fav.includes(filteredState[0]._id.toString()) ? <Favorite onClick={removeFromFavorite}/> :
                  
                  <FavoriteBorder onClick={addToFavorite} color="error"/>}
              </div>
              
          </Item>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ProductDetails;

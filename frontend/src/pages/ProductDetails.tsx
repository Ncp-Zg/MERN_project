import { Favorite, FavoriteBorder, FavoriteOutlined } from "@mui/icons-material";
import { Button, CardMedia, Grid, Paper, styled, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { setLikes } from "../redux/ActionCreators/AuthActionCreators";
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
    const [like,setLike] = useState<boolean>(false)
    const dispatch = useDispatch();
  const { id } = useParams();
  const { product,user } = useSelector((state: IRootState) => ({
    product: state.product.product,user:state.auth.user
  }));

  useEffect(() => {
    console.log("render");
    axios
      .get("http://localhost:5000/api/products",{params:{page:`${state}`}})
      .then((res) => {
        dispatch(setProducts(res.data.data))
      });
  }, [like]);
 const filteredState = product.filter((item) => item._id.toString() === id);
  console.log(filteredState);
  const {state} = useLocation()
  
  const handleClick=()=>{
    dispatch(addToCart([{...filteredState[0],amount:+amount}]))
  }

  const addToFavorite = ()=>{
    if (user) {
      axios.get(`http://localhost:5000/api/users/${filteredState[0]._id}/addtofavorite`,{headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`
    }}).then(res=>console.log(res.data))
    setLike(!like)
    let favorites = JSON.parse(localStorage.getItem("user") || '{}');
    favorites.fav.push(filteredState[0]._id)
    localStorage.setItem("user",JSON.stringify(favorites));
    dispatch(setLikes(favorites.fav))
      
    }
  }

  const removeFromFavorite = ()=>{
    axios.get(`http://localhost:5000/api/users/${filteredState[0]._id}/removefromfavorite`,{headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`
    }}).then(res=>console.log(res.data))
    setLike(!like)
    let favorites = JSON.parse(localStorage.getItem("user") || '{}');
    let newFavs = favorites.fav.filter((fav:string)=> fav.toString() !== filteredState[0]._id.toString())
    console.log(newFavs);
    favorites.fav = newFavs;
    localStorage.setItem("user",JSON.stringify(favorites));
    dispatch(setLikes(newFavs))
  }
  console.log(like);
 
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
        inputProps: { min: 1,max:12} 
      }}/>
                <Button onClick={handleClick}>Add to Cart</Button>
                {
                  user.fav.includes(filteredState[0]?._id.toString()) ? <Favorite onClick={removeFromFavorite} color="error"/> :
                  
                  <FavoriteBorder onClick={addToFavorite} color="error"/>}
              </div>
              
          </Item>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ProductDetails;

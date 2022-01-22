import { CardMedia, Grid, Paper, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../components/Comment";
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
    const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state: IRootState) => ({
    product: state.product.product,
  }));

  const filteredState = product.filter((item) => item._id.toString() === id);
  console.log(filteredState);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products",{params:{page:`${state}`}})
      .then((res) => {
        dispatch(setProducts(res.data.data))
      });
  }, []);

  const {state} = useLocation()
  console.log(state)

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
          <Item>
            <Comment />
          </Item>
        </Grid>
        <Grid item xs={6} >
          <Item style={{height:"87vh",maxWidth:"100vh"}}>
              <h3>{filteredState[0]?.title}</h3>
          
              <h6>{filteredState[0]?.category}</h6>
          
              <p style={{textAlign:"justify",wordWrap:"break-word"}}>{filteredState[0]?.desc}</p>
              <p>₺{filteredState[0]?.cost}</p>
          </Item>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ProductDetails;

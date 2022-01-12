import { CardMedia, Grid, Paper, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProductDetails = () => {
  const { id } = useParams();
  const { product } = useSelector((state: IRootState) => ({
    product: state.product.product,
  }));

  const filteredState = product.filter((item) => item._id.toString() === id);
  console.log(filteredState);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
              <CardMedia
                sx={{ objectFit: "cover" }}
                component="img"
                height="350"
                src={filteredState[0].img[0]}
              />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ProductDetails;

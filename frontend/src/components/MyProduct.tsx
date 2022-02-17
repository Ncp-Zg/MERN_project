import { FunctionComponent, useRef, useState } from "react";
import {Item } from "../type";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Product.css"
import { useNavigate } from "react-router-dom";


interface IItemProps {
  item: Item;
}

const MyProduct: FunctionComponent<IItemProps> = (props) => {

  const navigate = useNavigate();
  const [index,setIndex] = useState<any>(0)
  const { item } = props;

  return (
    <Card sx={{width: 300, margin: "10px" }}>
      <div className="slideshow-container1">
        <CardMedia
          className="fade"
          sx={{ objectFit: "contain"}}
          height="250"
          component="img"
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
      <CardActions >
        <Button size="small" fullWidth onClick={()=>{navigate(`/admin/myproducts/${item._id}/edit`)}}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default MyProduct;

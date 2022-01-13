import {ShoppingCartOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { Item } from "../type";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<Item[]>()
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {setData(res.data.data)
        dispatch(setProducts(res.data.data))
      });
  }, []);
  console.log(data)
  return (
    <div>
      <ShoppingCartOutlined style={{position:"fixed",right:"35",zIndex:"2",backgroundColor:"tomato",borderRadius:"100%",padding:"10",fontSize:"50px",color:"white"}} onClick={()=>navigate("/shoppingcart") }/>
      <div style={{backgroundColor:"gray",borderRadius:"100%",width:"20px",height:"20px",position:"fixed",right:"30px",top:"93px",zIndex:"3",color:"white",paddingLeft:"5px"}}>1</div>
    <div
      style={{
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {data?.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </div>
    </div>
  );
};

export default Home;

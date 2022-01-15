import { ShoppingCartOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart, Item } from "../type";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cart} = useSelector((state:IRootState)=>({cart:state.cart.cart}))
  const [data, setData] = useState<Cart[]>();
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setData(res.data.data);
      dispatch(setProducts(res.data.data));
    });
  }, []);
  console.log(data);
  return (
    <div>
      <ShoppingCartOutlined
        style={{
          position: "fixed",
          right: "35",
          zIndex: "2",
          backgroundColor: "tomato",
          borderRadius: "100%",
          padding: "10",
          fontSize: "50px",
          color: "white",
        }}
        onClick={() => navigate("/shoppingcart")}
      />
      
        {cart[0]._id === 0 ? null : (
          <div
        style={{
          backgroundColor: "gray",
          borderRadius: "100%",
          width: "20px",
          height: "20px",
          position: "fixed",
          right: "30px",
          top: "93px",
          zIndex: "3",
          color: "white",
          paddingLeft: "5px",
        }}
      >{cart.length}</div>
        )}
      
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

import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart} from "../type";

const Home = () => {
  const dispatch = useDispatch();
  const ref = useRef(0);
  const navigate = useNavigate();
  const {cart} = useSelector((state:IRootState)=>({cart:state.cart.cart}))
  const [data, setData] = useState<Cart[]>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);


  const forik = ()=>{let value = [];
    for(let i =0; i< Math.floor(total/5)+1;i++){
     value.push(i+1);
    
}return value;
}

  useEffect(() => {
    axios.get("http://localhost:5000/api/products",{ params: { page: `${page}`} }).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total)
      dispatch(setProducts(res.data.data));
    });
  }, [page]);
  console.log(cart.length);
  if(cart[0]?._id !== 0 ){
    const sumAll=cart.map(c=>c.amount).reduce((prev,curr)=>prev+curr, 0)
    ref.current=sumAll
  }

  

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
      
        {cart[0]?._id === 0 || cart.length === 0 ? null : (
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
      >{ref.current }</div>
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
      {console.log(Math.floor(9/5))}
      <div style={{display:"flex",justifyContent:"center"}}>
      {
      forik().map(pg=>
        <Button onClick={()=>setPage(pg)}>{pg}</Button>)
      }
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Product from "../components/Product";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { Item } from "../type";


const Home = () => {
    const dispatch = useDispatch();
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
  );
};

export default Home;

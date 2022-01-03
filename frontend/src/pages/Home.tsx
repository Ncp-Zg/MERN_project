import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Item } from "../type";


const Home = () => {

    const [data, setData] = useState<Item[]>()
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setData(res.data.data));
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
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Home;

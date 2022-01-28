import axios from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart, Item } from "../type";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useNavigate } from "react-router-dom";

const Myfavorites = () => {
  const [favorites, setFavorites] = useState<Cart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate: any = useNavigate()

  const { user } = useSelector((state: IRootState) => ({
    user: state.auth.user,
  }));

  const getFavs = async () => {
    if (user.token) {
      setLoading(true);
      await axios
        .get("http://localhost:5000/api/users/profile/getfavorites", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setFavorites(res.data.favs);
          setLoading(false);
        }).catch(err=>{if(err){setError(true)}});
    }
  };

  useEffect(() => {
    getFavs();
  }, [user.token]);

  return (
    <div
      style={{
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <ClimbingBoxLoader size={30} color="#c67c03" />
        </div>
      ): !error ? (
        favorites?.map((item) => <Product item={item} key={item._id} />)
      ) : (navigate("/login")) }
    </div>
  );
};

export default Myfavorites;

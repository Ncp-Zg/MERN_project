import axios from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart, Item } from "../type";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Myfavorites = () => {
  const [favorites, setFavorites] = useState<Cart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        });
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
      {!loading ? (
        favorites?.map((item) => <Product item={item} key={item._id} />)
      ) : (
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
      )}
    </div>
  );
};

export default Myfavorites;

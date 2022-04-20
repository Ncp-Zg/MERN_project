import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { toast } from "react-toastify";
import MyProduct from "../../components/MyProduct";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { Item } from "../../type";
import PopupAlert from "../../components/common/PopupAlert";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: IRootState) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getProfile = async () => {
    if (user.token !== "") {
      setLoading(true);
      await axios
        .get("http://localhost:5000/api/users/admin/getmyproducts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          setMyProducts(res.data.myproduct);
          setLoading(true);
        })
        .catch((err) => {
          setLoading(false);
          toast.warning(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, [user.token]);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {myProducts ? (
        myProducts?.map((prdct) => <MyProduct key={prdct._id} item={prdct} />)
      ) : loading ? (
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
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <PopupAlert open={open} handleClose={handleClose} handleOpen={handleOpen}/>
        </div>
      )}
    </div>
  );
};

export default MyProducts;

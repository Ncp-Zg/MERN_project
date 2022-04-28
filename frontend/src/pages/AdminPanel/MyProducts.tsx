import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { toast } from "react-toastify";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { Item } from "../../type";
import PopupAlert from "../../components/common/PopupAlert";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/common/ErrorBoundary";

const MyProduct = lazy(() => import("../../components/MyProduct"));

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: IRootState) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const abortCont = new AbortController();

    const getProfile = async () => {
      if (user.id !== "") {
        setLoading(true);
        await axios
          .get("http://localhost:5000/api/users/admin/getmyproducts", {
            withCredentials: true,
            signal: abortCont.signal,
          })
          .then((res) => {
            setMyProducts(res.data.myproduct);
            setLoading(true);
          })
          .catch((err) => {
            if (err.message === "canceled") {
              console.log("axios aborted");
            } else {
              setLoading(false);
              toast.warning(err.response.data.message);
            }
          });
      }
    };

    getProfile();

    return () => abortCont.abort();
  }, [user.id]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <Suspense fallback={<div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <ClimbingBoxLoader size={30} color="#c67c03" />
            </div>}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {myProducts ? (
            myProducts?.map((prdct) => (
              <MyProduct key={prdct._id} item={prdct} />
            ))
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
              <PopupAlert
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            </div>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MyProducts;

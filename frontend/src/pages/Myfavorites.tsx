import axios from "axios";
import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart } from "../type";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/common/ErrorBoundary";
const Product = lazy(() => import("../components/Product"));

const Myfavorites = () => {
  const [favorites, setFavorites] = useState<Cart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate: any = useNavigate();

  const { user } = useSelector((state: IRootState) => ({
    user: state.auth.user,
  }));

  const getFavs = async () => {
    if (user.id) {
      setLoading(true);
      await axios
        .get("http://localhost:5000/api/users/profile/getfavorites", {
          withCredentials: true,
        })
        .then((res) => {
          setFavorites(res.data.favs);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            setError(true);
          }
        });
    }
  };

  useEffect(() => {
    getFavs();
  }, [user.id]);

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
      ) : !error ? (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Suspense
            fallback={
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
            }
          >
            {favorites?.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </Suspense>
        </ErrorBoundary>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default Myfavorites;

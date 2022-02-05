import { ShoppingCartOutlined } from "@mui/icons-material";
import {
  Pagination,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import Product from "../components/Product";
import { setProducts } from "../redux/ActionCreators/ProductActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Cart } from "../type";

const Home = () => {
  const dispatch = useDispatch();
  const ref = useRef(0);
  const navigate = useNavigate();
  const { cart } = useSelector((state: IRootState) => ({
    cart: state.cart.cart,
  }));
  const [data, setData] = useState<Cart[]>();
  // const [page, setPage] = useState<number>(1);
  const pageRef = useRef<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const RouterPage = searchParams.get("page");
  // console.log(RouterPage);

  const forik = () => {
    let value = 0;
    for (let i = 0; i < Math.floor(total / 4) + 1; i++) {
      value += 1;
    }
    return value;
  };

  useEffect(() => {
    setLoading(true);

    console.log("render");
    axios
      .get("http://localhost:5000/api/products", {
        params: { page: `${RouterPage}`, limit: 4 },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
        setTotal(res.data.total);
        dispatch(setProducts(res.data.data));
      });
  }, [RouterPage]);
  // console.log(cart.length);
  if (cart[0]?._id !== 0) {
    const sumAll = cart
      .map((c) => c.amount)
      .reduce((prev, curr) => prev + curr, 0);
    ref.current = sumAll;
  }

  const handleAlignment = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log(newPage);
    pageRef.current = newPage;
    setSearchParams(createSearchParams({ page: `${pageRef.current}` }));
  };

  return (
    <div>
      {!loading ? (
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
            >
              {ref.current}
            </div>
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
          <div style={{ display: "flex", justifyContent: "center",marginTop:"1rem" }}>
            <Stack spacing={2}>
              <Pagination
                sx={{color:"red"}}
                count={forik()}
                page={!RouterPage ? pageRef.current : Number(RouterPage)}
                onChange={handleAlignment}
                defaultPage={1}
                color="primary"
              />
            </Stack>
          </div>
        </div>
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

export default Home;

import { ShoppingCartOutlined } from "@mui/icons-material";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
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
  const [allData, setAllData] = useState<Cart[] | undefined>();
  const [filteredData, setFilteredData] = useState<Cart[] | undefined>();
  // const [page, setPage] = useState<number>(1);
  const pageRef = useRef<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  const RouterPage = searchParams.get("page");

  const forik = () => {
    let value = 0;
    for (let i = 0; i < Math.floor(total / 3) + 1; i++) {
      value += 1;
    }
    return value;
  };

  useEffect(() => {
    const abortConst = new AbortController();
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products", {
        params: { page: `${RouterPage}`, limit: 3 },signal:abortConst.signal
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
        setTotal(res.data.total);
        dispatch(setProducts(res.data.data));
      }).catch(err=>{if(err.message==="canceled"){console.log("axios aborted")}else{console.log(err)}});

      return ()=> abortConst.abort();
  }, [RouterPage]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getallproducts")
      .then((res) => {
        setAllData(res.data.data);
      });
  }, []);

  useEffect(() => {
    if(search === ""){
      setFilteredData(data)
    }else{
      setFilteredData(allData?.filter(prdct=>prdct.title.toLowerCase().includes(search.toLowerCase())))
    }
    
  }, [search,data]);

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
    pageRef.current = newPage;
    setSearchParams(createSearchParams({ page: `${pageRef.current}` }));
  };

  const handleChange = (
    e: any
  ) => {
    if(!e.target.innerHTML.startsWith("<path")){
      if(e.target.value === 0){
        setSearch(e.target.innerHTML)
      }else if(e.target.value === undefined){
        setSearch("")
      }else{
        setSearch(e.target.value);
      }
      
    }else{
      setSearch("")
    }
    
  };

  return (
    <div>
      {!loading ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            {allData ? (
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="free-solo-demo"
                  size="small"
                  freeSolo
                  options={allData.map((option) => option.title)}
                  onChange={(e)=>handleChange(e)}
                  renderInput={(params) => (
                    <TextField {...params} label="Search by title" color="warning"  />
                  )}
                />
              </Stack>
            ) : null}
          </div>

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
              top: "65",
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
            {filteredData?.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </div>
          {search==="" ? (<div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                sx={{ color: "red" }}
                count={forik()}
                page={!RouterPage ? pageRef.current : Number(RouterPage)}
                onChange={handleAlignment}
                defaultPage={1}
                color="primary"
              />
            </Stack>
          </div>) : null}
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

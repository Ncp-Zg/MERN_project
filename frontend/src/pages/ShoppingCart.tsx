import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/Reducers/rootReducer";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material";
import {
  addItemToCart,
  checkStock,
  deleteItemFromCart,
} from "../redux/ActionCreators/CartActionCreators";
import { useEffect, useRef, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const ref = useRef<number>(0);
  const counterRef = useRef<number>(0);
  const { cart } = useSelector((state: IRootState) => ({
    cart: state.cart.cart,
  }));
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const [state, setState] = useState<boolean>(false);
  const handleIncrease = (i: number) => {
    setAmount(cart[i].amount);
    setId(cart[i]._id);
    dispatch(addItemToCart(i));
  };

  const handleDecrease = (i: number) => {
    setId(cart[i]._id);
    setAmount(cart[i].amount);
    dispatch(deleteItemFromCart(i));
  };

  const handleClick = () => {
    counterRef.current = 0;
    cart.forEach((prdct, index) => {
      if (prdct.amount > prdct.stock && prdct.stock !== 0) {
        dispatch(checkStock(index));
        setState(!state);
        toast.warn(
          `${prdct.title} is already updated with new amount you can buy `
        );
      } else if (prdct.stock === 0) {
        dispatch(deleteItemFromCart(index));
        toast.warn(`${prdct.title} is out of stock `);
        setState(!state);
      } else {
        counterRef.current = counterRef.current + 1;
        if (counterRef.current === cart.length) {
          navigate("/shoppingcart/payment", { state: ref.current });
        }
      }
    });
  };
  useEffect(() => {
  }, [id, amount, state]);

  if (cart[0]?._id !== 0) {
    const sumAll = cart
      .map((c) => c.amount * +c.cost)
      .reduce((prev, curr) => prev + curr, 0);
    ref.current = sumAll;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {cart[0]?._id === 0 || cart.length === 0 ? (
            <p>Your Shoppingcart is empty.</p>
          ) : (
            cart.map((crt, index) => (
              <Card
                key={crt._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  justifyItems: "center",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={crt.img[0]}
                  alt="Live from space album cover"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifySelf: "start",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {crt.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Mac Miller
                    </Typography>
                  </CardContent>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignSelf: "center",
                    justifySelf: "end",
                  }}
                >
                  <AddCircleRounded onClick={() => handleIncrease(index)} />
                  <span>{crt.amount} piece</span>
                  <RemoveCircleRounded onClick={() => handleDecrease(index)} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                >
                  <CurrencyFormat
                    renderText={(value: any) => (
                      <>
                        <h2>
                          {" "}
                          <strong>{value}</strong>
                        </h2>
                      </>
                    )}
                    decimalScale={2}
                    value={crt.amount * +crt.cost}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₺"}
                  />
                </Box>
              </Card>
            ))
          )}
        </Grid>
        <Grid item xs={4}>
          <Card style={{ height: "87vh", maxWidth: "100vh", padding: "10px" }}>
            Total : <hr />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <CurrencyFormat
                renderText={(value: any) => (
                  <>
                    <h1>
                      {" "}
                      <strong>{value}</strong>
                    </h1>
                  </>
                )}
                decimalScale={2}
                value={ref.current}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₺"}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                disabled={ref.current === 0 ? true : false}
                variant="contained"
                size="small"
                sx={{ marginTop: "20px" }}
                onClick={() => handleClick()}
              >
                Continue
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShoppingCart;

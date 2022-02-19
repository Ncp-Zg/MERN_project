import { Button, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import { emptyBasket } from "../redux/ActionCreators/CartActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

const PaymentPage = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const { state } :any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state: IRootState) => ({
    cart: state.cart.cart,
    user: state.auth,
  }));
  const socket = useRef<Socket>();
  console.log(cart);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  const handleClick = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:5000/api/orders/addorders", cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Payment is successfull");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.message}`);
      });

    setLoading(false);

    cart.forEach((crt) => {
      setTimeout(() => {
        if (socket.current && user.user.id !== "") {
          socket?.current.emit("addUser", crt.seller);
        }
      }, 500);
    });

    dispatch(emptyBasket());
    navigate("/home");
  };

  // useEffect(() => {
  //   if(cart[0].cost !== ""){
  //     const getClientSecret = async () => {
  //     await axios
  //       .post(`http://localhost:5000/api/payment/add/?total=${state*100}`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setClientSecret(res.data.clientSecret);
  //       })
  //       .catch((err) => console.log(err.response));
  //   };

  //   getClientSecret();}else{
  //     toast.warning("your cart is empty")
  //   }
  // }, []);

  const handleSubmit = async (e: any) => {
    setProcessing(true);
    
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async (data: any) => {
        if(data.error){
          toast.error(data.error.message)
          setProcessing(false)
        }else{
          setLoading(true);
        await axios
      .post("http://localhost:5000/api/orders/addorders", cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Payment is successfull");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.message}`);
      });

      setProcessing(false)
      setError(null);
    setLoading(false);

    cart.forEach((crt) => {
      setTimeout(() => {
        if (socket.current && crt.seller !== "") {
          socket?.current.emit("addUser", crt.seller);
        }
      }, 500);
    });

    dispatch(emptyBasket());
    navigate("/home");
      

        }
        })
      
  };

  const handleChange = (e:any)=>{
    console.log(e.empty)
      setDisabled(e.empty);
      setError(e.error ? e.error.massage : "");
  }

  
  return (
    <div>
      {!loading ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                height: "50vh",
                width: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <h3>Credit Card Information</h3> */}
              <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
              <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
                <CardElement onChange={handleChange}/>
                <Button sx={{ width: 300 }} type="submit" disabled={processing || disabled}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </Button>
                {error && <div>{error}</div>}
              </form>
              </div>
              
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Card
              style={{
                height: "15vh",
                width: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <CurrencyFormat
                  renderText={(value:any) => (
                    <>
                      <h3>
                        Order Total:{" "}
                        <strong>{value}</strong>
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={state}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₺"}
                />
              <Button onClick={handleClick}>Buy</Button>
            </Card>
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

export default PaymentPage;

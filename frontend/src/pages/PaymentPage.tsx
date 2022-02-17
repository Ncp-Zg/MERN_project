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
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const PaymentPage = () => {
  
  const stripe:any = useStripe();
  const elements:any = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<boolean>(true);
  const { state } = useLocation();
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
      .then((res) => {console.log(res.data);
    toast.success("Payment is successfull")})
    .catch(err=>{console.log(err);toast.error(`${err.response.data.message}`)})


    setLoading(false);

    
      cart.forEach((crt) => {
            setTimeout(()=>{if(socket.current && user.user.id !== "") {socket?.current.emit("addUser", crt.seller)}},500)
        
      });
    
    dispatch(emptyBasket());
    navigate("/home");
  };

  useEffect(() => {
    const getClientSecret = async () => {
      await axios.post(`http://localhost:5000/api/payment/add/?total=${state}`).then(res=>{console.log(res.data);setClientSecret(res.data.clientSecret)}).catch(err=>console.log(err.response))
      
      
    };

    getClientSecret();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent } :any) => {
        console.log(paymentIntent)

      });
  };

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
              <h3>Credit Card Information</h3>
              <form onSubmit={handleSubmit}>
              <CardElement/>
              </form>
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
              <h3>Total:₺{state}</h3>
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

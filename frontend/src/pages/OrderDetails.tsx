import {
  AssignmentReturnedOutlined,
  Check,
  LocalShipping,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Order } from "../type";

const OrderDetail = () => {
  const { user } = useSelector((state: IRootState) => ({ user: state.auth }));

  const { id } = useParams();
  const location = useLocation();
  const state = location.state as Order;
  console.log(state);
  const [deliver, setDeliver] = useState<Array<Boolean>>(state.delivered);
  const [preparing, setPreparing] = useState<Array<Boolean>>(state.preparing);
  const [sentByCargo, setSentByCargo] = useState<Array<Boolean>>(
    state.sentbycargo
  );

  console.log(state.delivered);

  const handleClick = async (index: number) => {
    console.log(index);
    await axios
      .post(
        "http://localhost:5000/api/orders/myorders/changeDelivered",
        { orderId: state._id, index: index },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.user.token}`,
          },
        }
      )
      .then((res) => {
        setDeliver(res.data.delivered);
      });
  };

  return (
    <div>
      <Card sx={{ padding: "1em", width: "100vh" }}>
        <h3>Order - {id}</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {state.order.map((crt: any, index: number) => (
              <Card key={crt._id} sx={{marginBottom:"5px",padding:"3px"}}>
                <div
                  
                  style={{
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
                      alignSelf: "center",
                    }}
                  >
                    <Typography component="div" variant="h6">
                      {state.amount[index]} piece
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: "center",
                    }}
                  >
                    <Typography component="div" variant="h4">
                      ₺{crt.cost}
                    </Typography>
                  </Box>
                </div>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check sx={preparing[index] ? {color:"green"} : {color:"black"}}/>
                    <h5 style={preparing[index] ? {color:"green"} : {color:"black"}}>Preparing...</h5>
                    <div style={sentByCargo[index] ? {backgroundColor:"green",width:"100px",height:"5px",borderRadius:"10px"} :{backgroundColor:"lightgray",width:"100px",height:"5px",borderRadius:"10px"}}/>
                    <LocalShipping sx={sentByCargo[index] ? {color:"green"} : {color:"black"}}/>
                    <h5 style={sentByCargo[index] ? {color:"green"} : {color:"black"}}>SentByCargo</h5>
                    <div style={deliver[index] ? {backgroundColor:"green",width:"100px",height:"5px",borderRadius:"10px"} : {backgroundColor:"lightgray",width:"100px",height:"5px",borderRadius:"10px"}}/>
                    <AssignmentReturnedOutlined sx={deliver[index] ? {color:"green"} : {color:"black"}}/>
                    <h6 style={deliver[index] ? {color:"green"} : {color:"black"}}>Confirm When you received.</h6>
                  </Box>
                  <Box>
                    <Button
                      disabled={((preparing[index] || sentByCargo[index]) && !deliver[index])? false : true}
                      variant="contained"
                      color="success"
                      onClick={() => handleClick(index)}
                    >
                      Yes, I received.
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default OrderDetail;

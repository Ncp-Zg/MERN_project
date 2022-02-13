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
import { useEffect, useState } from "react";
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
  const [data,setData]=useState<Order>(state)

  console.log(state.delivered);

  const getOrder = async()=>{
    if(user.user.id !== ""){
      await axios.get(`http://localhost:5000/api/orders/myorders/${state._id}`,
    {headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user?.user.token}`,
    }}).then(res=>setData(res.data.data))
  }
  
    }
    
console.log(data)
  useEffect(()=>{
    getOrder()
  },[user.user.token,deliver])


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
            {data?.order.map((crt: any, index: number) => (
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
                      {data?.amount[index]} piece
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
                    <Check sx={data.preparing[index] ? {color:"green"} : {color:"black"}}/>
                    <h5 style={data.preparing[index] ? {color:"green"} : {color:"black"}}>Preparing...</h5>
                    <div style={data.sentbycargo[index] ? {backgroundColor:"green",width:"100px",height:"5px",borderRadius:"10px"} :{backgroundColor:"lightgray",width:"100px",height:"5px",borderRadius:"10px"}}/>
                    <LocalShipping sx={data.sentbycargo[index] ? {color:"green"} : {color:"black"}}/>
                    <h5 style={data.sentbycargo[index] ? {color:"green"} : {color:"black"}}>SentByCargo</h5>
                    <div style={data.delivered[index] ? {backgroundColor:"green",width:"100px",height:"5px",borderRadius:"10px"} : {backgroundColor:"lightgray",width:"100px",height:"5px",borderRadius:"10px"}}/>
                    <AssignmentReturnedOutlined sx={data.delivered[index] ? {color:"green"} : {color:"black"}}/>
                    <h6 style={data.delivered[index] ? {color:"green"} : {color:"black"}}>Confirm When you received.</h6>
                  </Box>
                  <Box sx={{display:"flex",justifyContent:"end"}}>
                    <Button
                      disabled={((data.preparing[index] || data.sentbycargo[index]) && !data.delivered[index])? false : true}
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

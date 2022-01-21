import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { IRootState } from '../redux/Reducers/rootReducer';
import { Order} from '../type';


const OrderDetail = () => {

  const {user}=useSelector((state:IRootState)=>({user:state.auth}))

  
    const {id} = useParams()
    const location= useLocation()
    const state = location.state as Order
    console.log(state);  
const [deliver,setDeliver] = useState<Boolean>(state.delivered)

  console.log(deliver);
  
    const handleClick = async () => {
      await axios.post("http://localhost:5000/api/orders/myorders/changeState",{orderId:state._id},{
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${user?.user.token}`
        }
      }).then(res=>setDeliver(res.data.delivered));
      
      
    }

  return (
  <div>
    <Card sx={{padding:"1em",width:"100vh"}}>
      <h3>Order - {id}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {
            state.order.map((crt:any, index:number) => (
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
                    alignSelf: "center",
                  }}
                >
                  <Typography component="div" variant="h6">
                    {state.amount[index] } piece
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
              </Card>
            ))}
          
        </Grid>
        <Grid item xs={12} style={{display:"flex",justifyContent:"end"}}>
          <Button disabled = {deliver ? true : false} variant="contained" color='success' onClick={handleClick}>Yes, I received.</Button>
        </Grid>
        
      </Grid>
     
    </Card>
  </div>
  );
};

export default OrderDetail;
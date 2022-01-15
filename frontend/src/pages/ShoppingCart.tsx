import { useSelector } from "react-redux"
import { IRootState } from "../redux/Reducers/rootReducer"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const ShoppingCart = () => {

    const {cart} = useSelector((state:IRootState)=>({cart:state.cart.cart}))


    return (
        <div>
          {cart[0]._id === 0 ? <p>Your Shoppingcart is empty.</p> : cart.map(crt=>(
          <Card sx={{ display: 'grid',gridTemplateColumns:"1fr 3fr 1fr",justifyItems:"center",alignItems:"center", width:"120vh",marginBottom:"5px"}}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={crt.img[0]}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column',justifySelf:"start" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {crt.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        {crt.amount}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column',alignSelf:"center" }}>
      <Typography component="div" variant="h5">
            ₺{crt.amount * +crt.cost}
          </Typography></Box>
      </Card>)) 
      
    }
       </div>
    )
}

export default ShoppingCart

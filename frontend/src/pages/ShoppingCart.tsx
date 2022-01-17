import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../redux/Reducers/rootReducer"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material";
import { addItemToCart, deleteItemFromCart } from "../redux/ActionCreators/CartActionCreators";
import { useEffect, useState } from "react";


const ShoppingCart = () => {

    const {cart} = useSelector((state:IRootState)=>({cart:state.cart.cart}))
    const dispatch = useDispatch();
    const [amount,setAmount]=useState<number>(0);
    console.log(cart)
    const handleIncrease = (i:number) => {
      setAmount(cart[i].amount)
      dispatch(addItemToCart(i))
      
    }

    const handleDecrease = (i:number) => {
      console.log(cart[i].amount)
      setAmount(cart[i].amount)
      dispatch(deleteItemFromCart(i))
    }

    useEffect(()=>{
      console.log("render")
    },[amount,cart.length])


    return (
        <div>
          {cart[0]?._id === 0 || cart.length===0 ? <p>Your Shoppingcart is empty.</p> : cart.map((crt,index)=>(
          <Card sx={{ display: 'grid',gridTemplateColumns:"1fr 2fr 1fr 1fr",justifyItems:"center",alignItems:"center", width:"120vh",marginBottom:"5px"}}>
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
        
      </Box><Box sx={{ display: 'flex',flexDirection:"column", alignItems:"center", alignSelf: 'center',justifySelf:"end"}}>
        <AddCircleRounded onClick={()=>handleIncrease(index)}/>
        <span>{crt.amount} piece</span>
        <RemoveCircleRounded onClick={()=>handleDecrease(index)}/>
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

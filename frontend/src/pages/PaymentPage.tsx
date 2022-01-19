import { Button, Card } from '@mui/material'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { emptyBasket } from '../redux/ActionCreators/CartActionCreators';
import { IRootState } from '../redux/Reducers/rootReducer';


const PaymentPage = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart,user}=useSelector((state:IRootState)=>({cart:state.cart.cart,user:state.auth}))
    console.log(cart)

    const handleClick = ()=>{
        axios.post("http://localhost:5000/api/orders/addorders",cart,
        {headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.user.token}`,
        }}).then(res=>console.log(res.data))
        toast.success("Payment is successfull");
        dispatch(emptyBasket())
        navigate("/home")
    }

    return (
        <div>
        <div style={{display:"flex",justifyContent:"center"}}>
            <Card style={{height:"50vh",width:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <h3>Credit Card Information</h3>
            </Card>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"5px"}}>
            <Card style={{height:"15vh",width:"80vh",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px"}}>
                <h3>Total:₺{state}</h3>
                <Button onClick={handleClick}>Buy</Button>
            </Card>
        </div>
        </div>
    )
}

export default PaymentPage

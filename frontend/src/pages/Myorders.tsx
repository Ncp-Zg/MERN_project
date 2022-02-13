import { Button, Card } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ClimbingBoxLoader } from "react-spinners"
import { setOrders } from "../redux/ActionCreators/OrdersActionCreators"
import { IRootState } from "../redux/Reducers/rootReducer"
import { Order } from "../type"

const Myorders = () => {
    const {user}=useSelector((state:IRootState)=>({user:state.auth}))
    const [myOrders,setMyOrders] = useState<Order[]>([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const ref = useRef<number>(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const getMyOrders = async () => {
        setLoading(true)
        await axios.get("http://localhost:5000/api/orders/myorders",
        {headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.user.token}`,
        }}).then(res=>{setMyOrders(res.data.myorders);setLoading(false);dispatch(setOrders(res.data.myorders))}).catch(err=> err ? setError(true) : null)
    }

    console.log(error);
    


    useEffect(()=>{
        if(user.user.token){
            getMyOrders();
        }
        
    },[user?.user.token])


    return (
        <div>
            {
                myOrders.length !== 0 ? (
                    [...myOrders].reverse()?.map(order=>(
                        <Card
                key={order._id}
                sx={{
                  display: "grid",
                  gridAutoRows:"1fr,1fr,1fr",
                  width:"80vh",
                    padding:"5px 5px 0px 5px",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                  <h3>{moment(order.createdAt).format("LLL")}</h3>
                
                <h3>
                    {order.order.length} brand {" "}
                    {ref.current = order.order.map((c,index) => +order.amount[index] * +c.cost)
                    .reduce((prev, curr) => prev + curr, 0)}₺
                </h3>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Button variant="contained" size="small" onClick={()=>navigate(`/profile/myorders/${order._id}`,{state:order})}>Details</Button>  
                </div>
                
                    
      
              </Card>
                    ))
                ) : error ? 
                (
                    <h3>need authorization</h3>
                )
                :
                loading ? (
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
                )
                :
                (
                    <h3>
                        no order
                    </h3>
                )
            }
        </div>
    )
}

export default Myorders

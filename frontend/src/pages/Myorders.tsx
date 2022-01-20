import { Button, Card } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IRootState } from "../redux/Reducers/rootReducer"
import { Order } from "../type"

const Myorders = () => {
    const {user}=useSelector((state:IRootState)=>({user:state.auth}))
    const [myOrders,setMyOrders] = useState<Order[]>([])
    const [error, setError] = useState<boolean>(false)
    const ref = useRef<number>(0)
    const navigate = useNavigate()

    const getMyOrders = async () => {
        await axios.get("http://localhost:5000/api/orders/myorders",
        {headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.user.token}`,
        }}).then(res=>setMyOrders(res.data.myorders)).catch(err=> err ? setError(true) : null)
    }

    console.log(error);
    


    useEffect(()=>{
        getMyOrders();
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
                  <h3>{order.createdAt}</h3>
                
                <h3>
                    {order.order.length} piece {" "}
                    {ref.current = order.order.map((c,index) => +order.amount[index] * +c.cost)
                    .reduce((prev, curr) => prev + curr, 0)}₺
                </h3>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {
                        order.delivered? (<p style={{fontStyle:"italic",color:"green"}}>Delivered ✔</p>) : (<p style={{fontStyle:"italic", color:"red"}}>not delivered yet ✖</p>)
                    }
                  <Button variant="contained" size="small" onClick={()=>navigate(`/profile/myorders/${order._id}`)}>Details</Button>  
                </div>
                
                    
      
              </Card>
                    ))
                ) : error ? 
                (
                    <h3>need authorization</h3>
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

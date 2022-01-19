import { Card } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { IRootState } from "../redux/Reducers/rootReducer"
import { Order } from "../type"

const Myorders = () => {
    const {user}=useSelector((state:IRootState)=>({user:state.auth}))
    const [myOrders,setMyOrders] = useState<Order[]>([])

    const getMyOrders = async () => {
        await axios.get("http://localhost:5000/api/orders/myorders",
        {headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.user.token}`,
        }}).then(res=>setMyOrders(res.data.myorders))
    }

    console.log(user?.user.token)

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
                  display: "flex",
                  flexDirection:"column",
                  width:"80vh",
                  
                  justifyItems: "center",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                  <h3>{order.createdAt}</h3>
                {order.order.map((pr,index)=>(
                    <p key={index}>{pr.cost}</p>
                ))}
              </Card>
                    ))
                ) : (
                    <h3>
                        no order
                    </h3>
                )
            }
        </div>
    )
}

export default Myorders

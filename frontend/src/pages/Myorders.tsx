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


    useEffect(()=>{
        getMyOrders();
    },[])

    return (
        <div>
            {
                myOrders.length !== 0 ? (
                    myOrders?.map(order=>(
                        <Card
                key={order._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  justifyItems: "center",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                {order.user}
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

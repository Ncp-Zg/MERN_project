import { Card } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IRootState } from "../redux/Reducers/rootReducer"
import { Order } from "../type"

const Myorders = () => {
    const {user}=useSelector((state:IRootState)=>({user:state.auth}))
    const [myOrders,setMyOrders] = useState<Order[]>([])
    const ref = useRef<number>(0)

    const getMyOrders = async () => {
        await axios.get("http://localhost:5000/api/orders/myorders",
        {headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.user.token}`,
        }}).then(res=>setMyOrders(res.data.myorders))
    }


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
                
                <h3>
                    {ref.current = order.order.map((c,index) => +order.amount[index] * +c.cost)
                    .reduce((prev, curr) => prev + curr, 0)}₺
                </h3>
                    
      
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

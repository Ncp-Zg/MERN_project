import { Card } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { incomingOrders } from "../../type";
import {io, Socket} from "socket.io-client"


const IncomingOrders = () => {

const [ data , setData] = useState<incomingOrders[]>();
const [ orders , setOrders] = useState<number>(0);
const socket = useRef<Socket>()
const {user}= useSelector((state:IRootState)=>state.auth)
const getIncomingOrders = async () => {
    if(user.token!== ""){
    await axios.get("http://localhost:5000/api/users/admin/incomingorders",{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user?.token}`
        }
    }).then(res=>setData(res.data.incomingOrders.reverse())).catch(err=>toast.warn(err.response.data.message))}
}

useEffect(()=>{
    socket.current=io("ws://localhost:8900");
},[])

useEffect(()=>{
    if(socket.current && user.id !== ""){socket?.current.emit("addUser",user.id)
    socket?.current.on("getUsers",(users)=>{
        const order = users.filter((usr:any)=>usr.user._id === user.id)
        setOrders(order[0].user.incomingOrders.length)
    })}
},[user])

console.log(orders)

useEffect(()=>{
    getIncomingOrders();
},[user.token,orders])

  return (
  
  <div>
      {data?.map((ordr,index) => 
        
        <Card key={index} sx={{marginBottom:"4px",padding:"0px 5px 0px 5px"}}>
            <h3>{ordr.data.title} : {ordr.amount} piece</h3>
            <h4>Customer : {ordr.toWho.email}</h4>
            <p>{moment(ordr.orderedAt).format("LLL")}</p>
        </Card>
        
        )}
  </div>
  
  
  );
};

export default IncomingOrders;

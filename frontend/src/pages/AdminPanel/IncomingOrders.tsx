import { Button, Card } from "@mui/material";
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
const [ prep , setPrep] = useState<Array<boolean>>();
const [ sent , setSent] = useState<Array<boolean>>();
const [ orders , setOrders] = useState<number>(0);
const socket = useRef<Socket>()
const {user}= useSelector((state:IRootState)=>state.auth)

const changePrep = async (index:number) => {
    console.log(index)
    if(data){
      await axios.post("http://localhost:5000/api/orders/myorders/changepreparing",{orderId:data[index].orderId,productId:data[index].data._id},{
          headers:{
              "Content-Type" : "application/json",
              Authorization: `Bearer ${user?.token}`
          }
      }).then((res)=>setPrep(res.data.preparing)).catch(err=>console.log(err.response.data.message))  
    }
    
}

const changeSentByCargo = async (index:number) => {
    if(data){
      await axios.post("http://localhost:5000/api/orders/myorders/changesentbycargo",{orderId:data[index].orderId,productId:data[index].data._id},{
          headers:{
              "Content-Type" : "application/json",
              Authorization: `Bearer ${user?.token}`
          }
      }).then((res)=>setSent(res.data.sentbycargo)).catch(err=>console.log(err.response.data.message))  
    }
    
}

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
    if(socket.current && user.id !== ""){
    socket?.current.on("getUsers",(usr)=>{
        console.log(usr)
        if(usr.userId === user.id){
           setOrders(usr.user.incomingOrders.length) 
        }
        
    })}
},[user])

console.log(orders)

useEffect(()=>{
    getIncomingOrders();
},[user.token,orders])

  return (
  
  <div>
      {data?.map((ordr,index) => 
        
        <Card key={index} sx={{marginBottom:"4px",padding:"0px 0px 5px 5px", backgroundColor:"#E4CDA7"}}>
            <h3>{ordr.data.title} : {ordr.amount} piece</h3>
            <h4>Customer : {ordr.toWho.email}</h4>
            <p>{moment(ordr.orderedAt).format("LLL")}</p>
            <Button onClick={()=>changePrep(index)}>preparing...</Button>
            <Button onClick={()=>changeSentByCargo(index)}>sent by cargo</Button>
        </Card>
        
        )}
  </div>
  
  
  );
};

export default IncomingOrders;

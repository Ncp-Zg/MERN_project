import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { incomingOrders } from "../../type";


const IncomingOrders = () => {

const [ data , setData] = useState<incomingOrders[]>();
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
    getIncomingOrders();
},[user.token])

  return (
  
  <div>
      {data?.map((ordr,index) => 
        
        <div key={index}>
            <h3>{ordr.data.title} : {ordr.amount} piece</h3>
            <h4>Customer : {ordr.toWho.email}</h4>
            <p>{moment(ordr.orderedAt).format("LLL")}</p>
        </div>
        
        )}
  </div>
  
  
  );
};

export default IncomingOrders;

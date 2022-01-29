import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import Product from '../../components/Product'
import { IRootState } from '../../redux/Reducers/rootReducer'
import { Cart} from '../../type'

const MyProducts = () => {

    const[myProducts,setMyProducts]=useState<Cart[] | null>(null)
    const[loading,setLoading]=useState<boolean>(false)
    const {user}= useSelector((state:IRootState)=>state.auth)
  
    const getProfile= async()=>{console.log("user.token",user.token)
        if(user.token!== ""){
        setLoading(true)   
        await axios.get("http://localhost:5000/api/users/profile/getmyproducts",{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user?.token}`,
            }
        }).then(res=>{
            setMyProducts(res.data.myproduct)
            setLoading(true)
        }).catch(err=>{setLoading(false);toast.warning(err.response.data.message)})
        }
        
    }

    useEffect(()=>{
        getProfile();
    },[user.token])
    return (
        <div>
            {myProducts ? 
            (myProducts?.map(prdct => <Product item={prdct} />)) : loading ? (<div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <ClimbingBoxLoader size={30} color="#c67c03" />
              </div>) :
            <h3>need authorization, token failed</h3>}
            
        </div>
    )
}

export default MyProducts

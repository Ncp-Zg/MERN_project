import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import MyProduct from '../../components/MyProduct'
import { IRootState } from '../../redux/Reducers/rootReducer'
import { alert, Item } from '../../type'
import Alert from 'react-popup-alert'
import 'react-popup-alert/dist/index.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const MyProducts = () => {

    const[myProducts,setMyProducts]=useState<Item[] | null>(null)
    const[loading,setLoading]=useState<boolean>(false)
    const {user}= useSelector((state:IRootState)=>state.auth)
    const navigate = useNavigate()

    const [alert, setAlert] = useState<alert>({
        type: "error",
        text: <p></p>,
        show: false,
      });
    
      function onCloseAlert() {
        setAlert({
          type: "",
          text: <p></p>,
          show: false,
        });
        navigate("/login");
      }
    
      function onShowAlert(type: any) {
        setAlert({
          type: type,
          text: <p>You need to login. Your token is expired already.</p>,
          show: true,
        });
      }
  
    const getProfile= async()=>{console.log("user.token",user.token)
        if(user.token!== ""){
        setLoading(true)   
        await axios.get("http://localhost:5000/api/users/admin/getmyproducts",{
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
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            {myProducts ? 
            (myProducts?.map(prdct => <MyProduct key={prdct._id} item={prdct}/>)) : loading ? (<div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <ClimbingBoxLoader size={30} color="#c67c03" />
              </div>) :(
                  <div>
                  <div
                    style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
                  >
                    <Button onClick={() => onShowAlert("error")}>
                      Something went wrong!!
                    </Button>
                  </div>
                  <Alert
                    header={"Authorization"}
                    btnText={"Close"}
                    text={alert.text}
                    type={alert.type}
                    show={alert.show}
                    onClosePress={onCloseAlert}
                    pressCloseOnOutsideClick={true}
                    showBorderBottom={true}
                    alertStyles={{}}
                    headerStyles={{}}
                    textStyles={{}}
                    buttonStyles={{}}
                  />
                </div>
                  )
            
            }
            
        </div>
    )
}

export default MyProducts

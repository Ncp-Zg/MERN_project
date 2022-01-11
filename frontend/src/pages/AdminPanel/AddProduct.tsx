
import { Button } from '@mui/material'
import axios from 'axios';
import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import Step1 from '../../components/AddProduct/Step1';
import Step2 from '../../components/AddProduct/Step2';
import Step3 from '../../components/AddProduct/Step3';
import { IRootState } from '../../redux/Reducers/rootReducer';



const AddProduct = () => {

  const[auth,setAuth]=useState<boolean>(false)
  const {user}= useSelector((state:IRootState)=>state.auth)

  const getProfile= async()=>{console.log("user.token",user.token)
      if(user.token!== ""){
         
      await axios.get("http://localhost:5000/api/users/profile",{
          headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${user?.token}`,
          }
      }).then(res=>{
          if(res.data.success){
              setAuth(true)
          }else{
              setAuth(false)
          }
      }) 
      }
      
  }

  useEffect(()=>{
      getProfile();
  },[user])

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
      
        category:"",
        description:"",
        stock:"",
        cost:"",
        title:"",
        seller:"",
        img:[]
  
      
      
    });

    const FormTitles = ["Step 1", "Step 2", "Step 3"];

    const PageDisplay = () => {
      if (page === 0) {
        return <Step1 formdata={formData} setFormData={setFormData} />;
      } 
      else if (page === 1) {
        return <Step2 formdata={formData} setFormData={setFormData} />;
      } else {
        return <Step3 formdata={formData} setFormData={setFormData} />;
      }
    };
   

    console.log(formData)
    



    return (
        <div style={{display:"flex",flexDirection:"column"}}>

          {
            auth ? (<>
            <form style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <h3>{FormTitles[page]}</h3>
            <div style={{width:"100%"}}>{PageDisplay()}</div>
            
            </form>
            <div style={{display:"flex",marginTop:"20px",alignSelf:"center"}}>
              <Button variant="contained" disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
           sx={{marginRight:"10px"}}>Previous</Button>
              <Button variant="contained" color={page === FormTitles.length - 1 ? "success" : "primary"} onClick={async (e) => {
              if (page === FormTitles.length - 1) {
                e.preventDefault();
                await axios.post("http://localhost:5000/api/products/add",
                {
                  category:formData.category,
                  cost:formData.cost,
                  desc:formData.description,
                  seller:formData.seller,
                  stock:formData.stock,
                  title:formData.title,
                  img:formData.img
                }).then(res=>{console.log(res.data);
                    localStorage.removeItem("previewData")})
                // alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }} sx={{}}>{page === FormTitles.length - 1 ? "Submit" : "Next"}</Button>
            </div></>):(
              <h3>need authorization, token failed</h3>
            )
          }
            
        </div>
    )
}

export default AddProduct

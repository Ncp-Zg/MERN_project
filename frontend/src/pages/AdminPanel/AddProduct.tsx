
import { Button } from '@mui/material'
import { useState} from 'react'
import Step1 from '../../components/AddProduct/Step1';
import Step2 from '../../components/AddProduct/Step2';
import Step3 from '../../components/AddProduct/Step3';



const AddProduct = () => {


    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
      category: "",
      description: "",
      
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
              <Button variant="contained" color={page === FormTitles.length - 1 ? "success" : "primary"} onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }} sx={{}}>{page === FormTitles.length - 1 ? "Submit" : "Next"}</Button>
            </div>
        </div>
    )
}

export default AddProduct

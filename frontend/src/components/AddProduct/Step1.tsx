import { PhotoCamera } from '@mui/icons-material';
import { IconButton, MenuItem, TextField } from '@mui/material';
import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react'

export interface form {
    formdata: {
      category:string;
      description:string
    };
    setFormData: Dispatch<SetStateAction<any>>
  }

const Step1 : FunctionComponent<form> = (props) => {

  
  
    const {formdata,setFormData} = props;

    const [image, setImage] = useState<Array<any>>([]);
    const [preview, setPreview] = useState<Array<any>>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formdata,category:event.target.value})
    };

console.log(image)
  
    // useEffect(() => {
    //   if (image) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setPreview(reader.result as string);
    //     };
    //     reader.readAsDataURL(image);
    //   } 
    // }, [image]);
  
useEffect(()=>{
  if(image !== []){image.map((img)=>{
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onloadend =() => {
    setPreview([...preview,(reader.result as string)]);
  };
        
})}
},[image.length])    


console.log(image)
       
      
    

    const categories = [
        {
          value: 'Electronic',
          label: 'Electronic',
        },
        {
          value: 'Food',
          label: 'Food',
        },
        {
          value: 'Accessory',
          label: 'Accessory',
        },
        {
          value: 'Dress',
          label: 'Dress',
        },
      ];

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          {preview.length !== 0 ? 
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",width:"50%",border:"solid",borderColor:"lightgray",borderRadius:"10px"}}>
              {
          preview.map((pre,index)=>{
            return(<img key={index}
          
            src={pre}
            style={{ objectFit: "cover",width:"100px", borderRadius:"10px", marginBottom:"10px",marginTop:"10px"}}
            onClick={() => {
              setPreview([]);
              setImage([])
            }}
          />)
            
          })}
          
          </div> : null}
        <IconButton
          color="primary" x-large
          
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
          >
            <PhotoCamera fontSize='large'/>
          </IconButton>
        <input
          multiple
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event:any) => {
            const file = event.target.files[0];
            console.log(file)
            if(file.size < 200000){
              setImage([...image,file])
            }else{
              alert("please be sure your pic less than 200kb")
            }
            
          }}
        />
        
        <TextField
        sx={{width: "50%" }}
          id="filled-select-currency"
          select
          label="Select Category"
          value={formdata.category}
          onChange={handleChange}
          variant="filled"
        >{categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}</TextField>
        </div>
    )
}

export default Step1

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

    const [image, setImage] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [category, setCategory] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategory(event.target.value);
      setFormData({...formdata,category:event.target.value})
    };


  
    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(image);
      } 
    }, [image]);

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
            {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover",width:"50%", borderRadius:"10px", marginBottom:"10px"}}
            onClick={() => {
              setPreview(null);
              setImage(null)
            }}
          />
        ) : (
          <IconButton
          color="primary" x-large
          sx={{marginBottom:"20px",width:"200px",height:"200px",borderRadius:"100%",backgroundColor:"lightgray"}}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
          >
            <PhotoCamera fontSize='large'/>
          </IconButton>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event:any) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
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

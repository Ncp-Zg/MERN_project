import { Button, MenuItem, TextField } from '@mui/material'
import {useEffect, useRef, useState} from 'react'

const AddProduct = () => {


    const [category, setCategory] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategory(event.target.value);
    };

    const [image, setImage] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
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

      console.log(image)

    return (
        <div>
            <form style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <h3>Step 1</h3>
            {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover",width:"50%", borderRadius:"10px", marginBottom:"10px" }}
            onClick={() => {
              setPreview(null);
              setImage(null)
            }}
          />
        ) : (
          <Button
          variant="contained"
          sx={{marginBottom:"20px",width:"200px",height:"200px",borderRadius:"100%"}}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
          >
            Add Image
          </Button>
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
          value={category}
          onChange={handleChange}
          variant="filled"
        >{categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}</TextField>
            </form>
        </div>
    )
}

export default AddProduct

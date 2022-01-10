import { PhotoCamera } from "@mui/icons-material";
import { IconButton, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export interface form {
  formdata: {
    category: string;
    description: string;
    stock: string;
    cost: string;
    title: string;
    seller: string;
    img: Array<any>;
  };
  setFormData: Dispatch<SetStateAction<any>>;
}

const Step1: FunctionComponent<form> = (props) => {
  console.log(process.env.REACT_APP_CLOUD_NAME);

  const { formdata, setFormData } = props;

  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delete_token, setDelete_token] = useState<Array<any>>([]);
  const [image, setImage] = useState<Array<any>>([]);
  const [preview, setPreview] = useState<Array<any>>(
    JSON.parse(localStorage.getItem("previewData") || "[]")
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formdata, category: event.target.value });
  };

  console.log(delete_token);
  // console.log(JSON.parse(localStorage.getItem("previewData") || '{}'))

  const uploadPic = (pic: any) => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "MERN_stack");
      data.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setDelete_token([...delete_token, data.delete_token]);
          setLoading(false);
          setFormData({...formdata,img:[...formdata.img,data.url]})
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteCloud = async (i: number) => {
    setDelLoading(true)
    console.log(delete_token,i);
    await axios
      .post("https://api.cloudinary.com/v1_1/dl0na75ef/delete_by_token", {
        token: `${delete_token[i]}`,
      })
      .then((res) => {console.log(res);
        delete_token.splice(i,1);
        formdata.img.splice(i,1);
        setDelete_token(delete_token)
        console.log(formdata.img)
        setFormData({...formdata,img:formdata.img})

      setDelLoading(false)}).catch(()=>setDelLoading(false))
  };

  useEffect(() => {
    console.log("render");

  }, [preview.length]);

  // console.log(preview, preview.length);

  const categories = [
    {
      value: "Electronic",
      label: "Electronic",
    },
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Accessory",
      label: "Accessory",
    },
    {
      value: "Dress",
      label: "Dress",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "50%",
          border: "solid",
          borderColor: "lightgray",
          borderRadius: "10px",
        }}
      >
        {!delLoading ? preview.length !== 0 ? (
          preview?.map((pre: any, index: number) => {
            return (
              <img
                key={index}
                src={pre}
                alt=""
                style={{
                  objectFit: "cover",
                  width: "100px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
                onClick={() => {
                  console.log(index);
                  preview.splice(index, 1);
                  image.splice(index, 1);
                  const storage: Array<any> = JSON.parse(
                    localStorage.getItem("previewData") || "{}"
                  );
                  storage.splice(index, 1);
                  localStorage.setItem(
                    "previewData",
                    JSON.stringify([...storage])
                  );
                  setImage([...image]);
                  setPreview([...preview]);
                  deleteCloud(index);

                  console.log(image, preview);
                }}
              />
            );
          })
        ) : (
          <h3>Add Picture</h3>
        ) : <h3>Deleting..</h3>}
      </div>
      <IconButton
        disabled={loading}
        color="primary"
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        <PhotoCamera fontSize="large" />
      </IconButton>
      <input
        multiple
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={(event: any) => {
          const file = event.target.files[0];
          uploadPic(file);
          if (file.size < 200000 && image.length < 5) {
            setImage([...image, file]);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setPreview([...preview, reader.result as string]);
              localStorage.setItem(
                "previewData",
                JSON.stringify([...preview, reader.result as string])
              );
            };
          } else if (file.size > 200000) {
            alert("please be sure your pic less than 200kb");
          } else if (image.length >= 5) {
            alert("you have reached maximum capacity");
          }
        }}
      />

      <TextField
        sx={{ width: "50%" }}
        id="filled-select-currency"
        select
        label="Select Category"
        value={formdata.category}
        onChange={handleChange}
        variant="filled"
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default Step1;

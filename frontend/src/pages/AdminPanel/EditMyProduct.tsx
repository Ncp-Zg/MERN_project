import { Button, Card, CardMedia, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IRootState } from "../../redux/Reducers/rootReducer";
import { formdata, Item } from "../../type";
import "./EditMyProduct.css";

const EditMyProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Item>();
  const [index, setIndex] = useState<any>(0);
  const {user}= useSelector((state:IRootState)=>state.auth)
  const [formData, setFormData] = useState<formdata>({
    category:  "",
    description: "",
    stock:  0,
    cost:  0,
    title:"",
  });

  const getsingleproduct = async () => {
    await axios
      .get(`http://localhost:5000/api/products/getsingleproduct/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setFormData({
          category: res.data.product.category,
          description: res.data.product.desc,
          stock: res.data.product.stock,
          cost: res.data.product.cost,
          title: res.data.product.title,
        });
      });
  };

  const handleClick = async () => {
    await axios.put(`http://localhost:5000/api/users/admin/${id}/edit`,formData,{
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${user?.token}`
      }
    }).then(res=>console.log(res.data)).catch((error)=>{
        toast.warn(error.response.data.message)
    })
  }

  useEffect(() => {
    getsingleproduct();
  }, []);

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "70%" }}>
        <div className="slideshow-container3">
          <CardMedia
            className="fade"
            sx={{ objectFit: "contain", maxWidth: "500" }}
            component="img"
            height="250"
            image={product?.img[index]}
            alt={product?.title}
          />
          <a
            className="prev3"
            onClick={() => {
              if (index === 0 && product) {
                setIndex(product?.img.length - 1);
              } else {
                setIndex(index - 1);
              }
            }}
          >
            &#10094;
          </a>
          <a
            className="next3"
            onClick={() => {
              if (product && index === product?.img.length - 1) {
                setIndex(0);
              } else {
                setIndex(index + 1);
              }
            }}
          >
            &#10095;
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            sx={{ width: "90%" }}
            id="filled-select-currency"
            select
            label="Select Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            variant="filled"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <TextField
            id="filled-textarea"
            label="Title"
            placeholder=""
            multiline
            value={formData.title}
            variant="filled"
            sx={{ width: "90%", marginBottom: "5px" }}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={10}
            value={formData.description}
            variant="filled"
            sx={{ width: "90%", marginBottom: "5px" }}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <TextField
            id="filled-textarea"
            label="Stock(Number)"
            placeholder=""
            multiline
            value={formData.stock}
            variant="filled"
            sx={{ width: "90%", marginBottom: "5px" }}
            onChange={(e) =>
              setFormData({ ...formData, stock: +e.target.value })}
          />
          <TextField
            id="filled-textarea"
            label="Cost"
            placeholder=""
            multiline
            value={formData.cost}
            variant="filled"
            sx={{ width: "90%",marginBottom:"4px"}}
            onChange={(e) =>
              setFormData({ ...formData, cost: +e.target.value })}
          />
          <Button variant="contained" sx={{width:"90%",marginBottom:"2rem"}} onClick={handleClick}>Edit</Button>
        </div>

      </Card>
    </div>
  );
};

export default EditMyProduct;

import { Button, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/ActionCreators/AuthActionCreators";

export interface IState {
  values:{
      name:string
      password:string
      email:string
      confirmpassword:string
  }
}

const Register = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<IState["values"]>({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(values.password === values.confirmpassword){

      await axios
      .post("http://localhost:5000/api/users/register", {
        email: values.email,
        password: values.password,
        name: values.name,
      })
      .then((res) => dispatch(registerUser({name:res.data.name,email:res.data.email,isAdmin:res.data.isAdmin,token:res.data.token})));
  };
    }

    

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            border: 1,
            borderColor: "gray",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            REGISTER
          </h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "5%",
              marginTop: "5%",
              marginLeft: "2%",
              marginRight: "2%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              onChange={(e)=>setValues({...values,name:e.target.value})}
            />
            <TextField
            type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              onChange={(e)=>setValues({...values,email:e.target.value})}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              onChange={(e)=>setValues({...values,password:e.target.value})}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Confirm Password"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
              onChange={(e)=>setValues({...values,confirmpassword:e.target.value})}
            />
            <Button variant="contained" color="success" type="submit">
              REGISTER
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Register;

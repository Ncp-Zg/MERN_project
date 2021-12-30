import { Button, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/users/register", {
        email: values.email,
        password: values.password,
        name: values.name,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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

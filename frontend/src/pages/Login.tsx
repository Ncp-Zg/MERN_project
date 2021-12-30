import { Box, Button, FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Login = () => {

    const [values,setValues] = useState({
        email:"",
        password:""
    })

    console.log(values)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        await axios.post("http://localhost:5000/api/users/login",{email:values.email,password:values.password}).then(res=>console.log(res.data))
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
        <Box sx={{ border: 1,borderColor:"gray", borderRadius: "10px",padding:"10px" }}>
          <h3 style={{ display: "flex", justifyContent: "center" }}>LOGIN</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5%",
              marginTop: "5%",
              marginLeft: "2%",
              marginRight: "2%",
            }}
          >
            <TextField
                onChange={(e)=>setValues({...values,email:e.target.value})}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ marginBottom: "10px" }}
            />
            <TextField
            onChange={(e)=>setValues({...values,password:e.target.value})}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <Button variant="contained" color="primary" type="submit">LOGIN</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;

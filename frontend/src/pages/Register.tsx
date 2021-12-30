import { Button, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Register = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <FormControl>

            <Box sx={{ border: 1,borderColor:"gray",borderRadius:"10px",padding:"10px"}}>
            <h3 style={{display:"flex",justifyContent:"center"}}>REGISTER</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "5%",
          marginTop:"5%",
          marginLeft: "2%",
              marginRight: "2%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ marginBottom: "10px" }}
        />
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ marginBottom: "10px" }} />
        <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ marginBottom: "10px" }}/>
        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" sx={{ marginBottom: "20px" }}/>
        <Button variant="contained" color="success">REGISTER</Button>
      </Box>
    </Box>
        </FormControl>
        
    </Box>
    
  );
};

export default Register;

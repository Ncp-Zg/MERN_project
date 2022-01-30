import { Box, Button,TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/ActionCreators/AuthActionCreators";
import { IRootState } from "../redux/Reducers/rootReducer";

export interface auth {
  name: string;
  email: string;
  isAdmin: boolean;
  token:string;
  id:string;
  fav:Array<string>;
}

const Login = () => {
  const dispatch = useDispatch();

  const {user}= useSelector((state:IRootState)=>state.auth)
  console.log(user)

  const [values, setValues] = useState({
    email: `${user.email}`,
    password: "",
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/api/users/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        dispatch(
          loginUser({
            name: res.data.name,
            email: res.data.email,
            isAdmin: res.data.isAdmin,
            token:res.data.token,
            id:res.data._id,
            fav:res.data.fav
          })
        );console.log(res.data);
      });
  };

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
            autoComplete="on"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={values.email}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
            autoComplete="on"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
              id="outlined-basic1"
              label="Password"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <Button variant="contained" color="primary" type="submit">
              LOGIN
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;

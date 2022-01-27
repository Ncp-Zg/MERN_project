import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../redux/Reducers/rootReducer";

const Profile = () => {
  const navigate: any = useNavigate();
  const [auth, setAuth] = useState<boolean>(false);
  const { user } = useSelector((state: IRootState) => state.auth);

  const getProfile = async () => {
    if (user.token !== "") {
      await axios
        .get("http://localhost:5000/api/users/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <div>
      {auth ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <h3 style={{ display: "flex", justifyContent: "center" }}>PROFILE</h3>
          <img style={{width:"20rem",height:"20rem",borderRadius:"100%"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"/>
          <Button variant="contained" sx={{margin:"1rem"}} onClick={() => navigate("/profile/myorders")}>
            MyOrders
          </Button>
          <Button variant="contained" onClick={() => navigate("/profile/myfavorites")}>MyFavorites</Button>
        </div>
      ) : (
        <h3>need authorization</h3>
      )}
    </div>
  );
};

export default Profile;

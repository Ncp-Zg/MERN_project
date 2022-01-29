import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { IRootState } from "../redux/Reducers/rootReducer";
import Alert from 'react-popup-alert'
import 'react-popup-alert/dist/index.css'

const Profile = () => {
  const navigate: any = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: IRootState) => state.auth);

  const [alert, setAlert] = useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    });
    navigate("/login")
  }

  function onShowAlert(type:any) {
    setAlert({
      type: type,
      text: 'You need to login. Your token is expired already.',
      show: true
    })
  }

  const getProfile = async () => {
    if (user.token !== "") {
        setLoading(true)
      await axios
        .get("http://localhost:5000/api/users/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
            setLoading(false)
        }).catch(err=>{console.log(err.response.data);if(err){setLoading(false);setError(true)}});
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <div>
      {user.id !== "" && !error ? (
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
      ) : loading ? (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <ClimbingBoxLoader size={30} color="#c67c03" />
      </div>
      ):(
           
        <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <Button onClick={() => onShowAlert('error')}>Something went wrong!!</Button>
      </div>
      <Alert
        header={'Authorization'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
    </div>

      )}
    </div>
  );
};

export default Profile;

import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";
import Step1 from "../../components/AddProduct/Step1";
import Step2 from "../../components/AddProduct/Step2";
import Step3 from "../../components/AddProduct/Step3";
import { IRootState } from "../../redux/Reducers/rootReducer";
import Alert from "react-popup-alert";
import "react-popup-alert/dist/index.css";

const AddProduct = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
    navigate("/login");
  }

  function onShowAlert(type: any) {
    setAlert({
      type: type,
      text: "You need to login. Your token is expired already.",
      show: true,
    });
  }

  const getProfile = async () => {
    console.log("user.token", user.token);
    if (user.token !== "") {
      setLoading(true);

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
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setAuth(false);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    stock: 0,
    cost: 0,
    title: "",
    seller: "",
    img: [],
  });

  const FormTitles = ["Step 1", "Step 2", "Step 3"];

  const PageDisplay = () => {
    if (page === 0) {
      return <Step1 formdata={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Step2 formdata={formData} setFormData={setFormData} />;
    } else {
      return <Step3 formdata={formData} setFormData={setFormData} />;
    }
  };

  console.log(formData);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {auth ? (
        <>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>{FormTitles[page]}</h3>
            <div style={{ width: "100%" }}>{PageDisplay()}</div>
          </form>
          <div
            style={{ display: "flex", marginTop: "20px", alignSelf: "center" }}
          >
            <Button
              variant="contained"
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
              sx={{ marginRight: "10px" }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color={page === FormTitles.length - 1 ? "success" : "primary"}
              onClick={async (e) => {
                if (page === FormTitles.length - 1) {
                  if(!isNaN(formData.stock) && !isNaN(+formData.cost)){
                    e.preventDefault();
                  await axios
                    .post(
                      "http://localhost:5000/api/products/add",
                      {
                        category: formData.category,
                        cost: formData.cost,
                        desc: formData.description,
                        stock: formData.stock,
                        title: formData.title,
                        img: formData.img,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${user?.token}`,
                        },
                      }
                    )
                    .then((res) => {
                      toast.success("Product added successfully");
                      navigate("/home");
                    });
                  }else{
                    console.log(typeof formData.stock,+formData.cost)
                    toast.error("provide a valid stock or cost for the product")
                  }
                  
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              sx={{}}
            >
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </>
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
      ) : (
        <div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <Button onClick={() => onShowAlert("error")}>
              Something went wrong!!
            </Button>
          </div>
          <Alert
            header={"Authorization"}
            btnText={"Close"}
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

export default AddProduct;

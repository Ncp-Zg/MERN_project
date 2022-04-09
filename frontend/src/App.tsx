import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./components/Navbar";
import { loginUser } from "./redux/ActionCreators/AuthActionCreators";
import Alert from "react-popup-alert";
import "react-popup-alert/dist/index.css";
import { alert } from "./type";

const defaultTheme = createTheme();

const theme: any = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: "5px",
          [defaultTheme.breakpoints.up("sm")]: { minHeight: "40px" },
          [defaultTheme.breakpoints.down("sm")]: { minHeight: "40px" },
          backgroundColor: "red",
          padding: 0,
          margin: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(JSON.parse(localStorage.getItem("user") || "{}"));

      dispatch(loginUser(JSON.parse(localStorage.getItem("user") || "{}")));
    }

    setTimeout(() => onShowAlert("warning"), 4000);
  }, []);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [alert, setAlert] = useState<alert>({
    type: "",
    text: <p></p>,
    show: false,
  });

  function onCloseAlert() {
    setAlert({
      type: "",
      text: <p></p>,
      show: false,
    });
  }

  function onShowAlert(type: any) {
    setAlert({
      type: type,
      text: (
        <div style={{ display: "flex", flexDirection: "column",alignItems:"start"}}>
          <p style={{margin:0}}><b>1.</b>Authorization/Authentication by using JWT Token</p>
          <p style={{margin:0}}><b>2.</b>Add to Cart function by using redux/redux-thunk</p>
          <p style={{margin:0}}><b>3.</b>Grouping same products in the cart list</p>
          <p style={{margin:0}}><b>4.</b>Pagination in backend</p>
          <p style={{margin:0}}><b>5.</b>Adding product with pictures by admin</p>
          <p style={{margin:0}}><b>6.</b>Editting own products by admin</p>
          <p style={{margin:0}}><b>7.</b>Listing incoming orders by admin</p>
          <p style={{margin:0}}><b>8.</b>Giving a like to any product</p>
          <p style={{margin:0}}><b>9.</b>Listing favorites in profile</p>
          <p style={{margin:0}}><b>10.</b>Payment with StripeJs</p>
          <p style={{margin:0}}><b>11.</b>Seeing all changes in orders page synchronously(socketIO)</p>
          <p style={{margin:0}}><b>12.</b>Stock Control</p>
        </div>
      ),
      show: true,
    });
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div style={{lineHeight:1.1}}>
          <Alert
            header={"**Functions**"}
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

        <PersistentDrawerLeft />
      </ThemeProvider>
    </Router>
  );
}

export default App;

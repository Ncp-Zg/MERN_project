import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./components/Navbar";
import { loginUser } from "./redux/ActionCreators/AuthActionCreators";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {

      dispatch(loginUser(JSON.parse(localStorage.getItem("user") || "{}")));
    }

    setTimeout(() => handleOpen(), 4000);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              Functions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2,display: "flex", flexDirection:"column" }}>
              <span style={{ margin: 0 }}>
                <b>1.</b>Authorization/Authentication by using JWT Token
              </span>
              <span style={{ margin: 0 }}>
                <b>2.</b>Add to Cart function by using redux/redux-thunk
              </span>
              <span style={{ margin: 0 }}>
                <b>3.</b>Grouping same products in the cart list
              </span>
              <span style={{ margin: 0 }}>
                <b>4.</b>Pagination in backend
              </span>
              <span style={{ margin: 0 }}>
                <b>5.</b>Adding product with pictures by admin
              </span>
              <span style={{ margin: 0 }}>
                <b>6.</b>Editting own products by admin
              </span>
              <span style={{ margin: 0 }}>
                <b>7.</b>Listing incoming orders by admin
              </span>
              <span style={{ margin: 0 }}>
                <b>8.</b>Giving a like to any product
              </span>
              <span style={{ margin: 0 }}>
                <b>9.</b>Listing favorites in profile
              </span>
              <span style={{ margin: 0 }}>
                <b>10.</b>Payment with StripeJs
              </span>
              <span style={{ margin: 0 }}>
                <b>11.</b>Seeing all changes in orders page
                synchronously(socketIO)
              </span>
              <span style={{ margin: 0 }}>
                <b>12.</b>Stock Control
              </span>
            </Typography>
          </Box>
        </Modal>

        <PersistentDrawerLeft />
      </ThemeProvider>
    </Router>
  );
}

export default App;

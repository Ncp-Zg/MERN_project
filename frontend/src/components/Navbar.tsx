import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/Reducers/rootReducer";
import { Button } from "@mui/material";
import { logoutUser } from "../redux/ActionCreators/AuthActionCreators";
import axios from "axios";
import {
  AddBusiness,
  AppRegistrationOutlined,
  CoPresentOutlined,
  ExitToAppOutlined,
  HomeMax,
  HomeOutlined,
  ListAltOutlined,
  LoginOutlined,
  MoveToInboxOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const AddProduct = React.lazy(() => import("../pages/AdminPanel/AddProduct"));
const MyProducts = React.lazy(() => import("../pages/AdminPanel/MyProducts"));
const Profile = React.lazy(() => import("../pages/Profile"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const ShoppingCart = React.lazy(() => import("../pages/ShoppingCart"));
const PaymentPage = React.lazy(() => import("../pages/PaymentPage"));
const Myorders = React.lazy(() => import("../pages/Myorders"));
const OrderDetails = React.lazy(() => import("../pages/OrderDetails"));
const Myfavorites = React.lazy(() => import("../pages/Myfavorites"));
const EditMyProduct = React.lazy(
  () => import("../pages/AdminPanel/EditMyProduct")
);
const IncomingOrders = React.lazy(
  () => import("../pages/AdminPanel/IncomingOrders")
);

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { minHeight: "40px" },
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
  );

  const { user } = useSelector((state: IRootState) => ({
    user: state.auth.user,
  }));
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeRoute = (text: any) => {
    setValue(text);
    navigate(`/${text.toLowerCase()}`);
  };

  const changeRouteAdmin = (text: any) => {
    setValue(text);
    navigate(`admin/${text.toLowerCase().replace(" ", "")}`);
  };

  const handleClick = async () => {
    //logout

    dispatch(logoutUser());
    await axios
      .get("http://localhost:5000/api/users/logout", { withCredentials: true })
      .then((res) => toast.info("logged out successfully"));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          variant="regular"
          sx={
            user.id
              ? {
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#D9534F",
                  color: "#FFEEAD",
                }
              : { backgroundColor: "#F57B51", color: "#F6EEDF" }
          }
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {value}
          </Typography>
          {user.id ? (
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ justifySelf: "end" }}
              onClick={handleClick}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          {user ? <h3 style={{ margin: "0px" }}>{user.name}</h3> : null}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {user.id === ""
            ? ["Home", "Login", "Register"].map((text, index) => (
                <ListItem button key={text} onClick={() => changeRoute(text)}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeMax />
                    ) : index === 1 ? (
                      <LoginOutlined />
                    ) : index === 2 ? (
                      <AppRegistrationOutlined />
                    ) : (
                      <VerifiedUserOutlined />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))
            : ["Home", "Login", "Register", "Profile"].map((text, index) => (
                <ListItem button key={text} onClick={() => changeRoute(text)}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeOutlined />
                    ) : index === 1 ? (
                      <ExitToAppOutlined />
                    ) : index === 2 ? (
                      <AppRegistrationOutlined />
                    ) : (
                      <CoPresentOutlined />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
        </List>
        <Divider />

        {user?.isAdmin ? (
          <List>
            <ListItem>Admin Panel</ListItem>
            {["Add Product", "Incoming Orders", "My Products"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => changeRouteAdmin(text)}
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <AddBusiness />
                    ) : index === 1 ? (
                      <MoveToInboxOutlined />
                    ) : (
                      <ListAltOutlined />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        ) : null}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ToastContainer />

        <React.Suspense fallback={<div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <ClimbingBoxLoader size={30} color="#c67c03" />
            </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/myorders" element={<Myorders />} />
            <Route path="/profile/myorders/:id" element={<OrderDetails />} />
            <Route path="/profile/myfavorites" element={<Myfavorites />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/myproducts" element={<MyProducts />} />
            <Route
              path="/admin/myproducts/:id/edit"
              element={<EditMyProduct />}
            />
            <Route path="/admin/incomingorders" element={<IncomingOrders />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />

            <Route
              path="/shoppingcart/payment"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              }
            />
          </Routes>
        </React.Suspense>
      </Main>
    </Box>
  );
}

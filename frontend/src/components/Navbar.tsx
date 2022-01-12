import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from '../pages/Home';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/Reducers/rootReducer';
import AddProduct from '../pages/AdminPanel/AddProduct';
import MyProducts from '../pages/AdminPanel/MyProducts';
import Profile from '../pages/Profile';
import { Button } from '@mui/material';
import { logoutUser } from '../redux/ActionCreators/AuthActionCreators';
import axios from 'axios';
import ProductDetails from '../pages/ProductDetails';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
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
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {



const {user} = useSelector((state: IRootState)=>({user:state.auth.user }));
const dispatch = useDispatch()
  const theme = useTheme();
  const navigate= useNavigate()
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeRoute = (text:any) => {
    setValue(text);
    navigate(`/${text.toLowerCase()}`)
  };

  const changeRouteAdmin = (text:any) => {
    setValue(text);
    navigate(`admin/${text.toLowerCase().replace(" ","")}`)
  };

const handleClick = async()=>{
    //logout

    dispatch(logoutUser());
    await axios.get("http://localhost:5000/api/users/logout",
    {
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`,
      }
    }).then(res=>console.log(res.data))
}


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={user.token? {display:"flex",justifyContent:"space-between"} : null}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {value}
          </Typography>
          {
            user.token ? <Button variant="contained" color='error' sx={{justifySelf:"end"}} onClick={handleClick}>Logout</Button> : null
          }
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{display:"flex",justifyContent:"space-between"}}>
          {user? <h3>{user.name}</h3> : null}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Login', 'Register', 'Profile'].map((text, index) => (
            <ListItem button key={text} onClick={()=>changeRoute(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        
        {user?.isAdmin ? <List>
          <ListItem>Admin Panel</ListItem>{['Add Product', 'Remove Product', 'My Products'].map((text, index) => (
            <ListItem button key={text} onClick={()=>changeRouteAdmin(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> : null}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
   
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/myproducts" element={<MyProducts />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
        
      </Main>
    </Box>
  );
}

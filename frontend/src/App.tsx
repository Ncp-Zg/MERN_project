import { createTheme,ThemeProvider } from "@mui/material/styles";
import {useEffect} from "react"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import PersistentDrawerLeft from './components/Navbar';
import { loginUser } from "./redux/ActionCreators/AuthActionCreators";

const defaultTheme = createTheme()

const theme:any = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: "5px",
          [defaultTheme.breakpoints.up("sm")]:{minHeight:"40px"},
          [defaultTheme.breakpoints.down("sm")]:{minHeight:"40px"},
          backgroundColor:"red",
          padding:0,
          margin:0
        },
      },
    },
  },
})

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("user")){
     console.log(JSON.parse(localStorage.getItem("user") || '{}'))
    
      dispatch(loginUser((JSON.parse(localStorage.getItem("user") || '{}'))))
    
    }
  },[])

  return (
    
    <Router>
      <ThemeProvider theme={theme}>
      <PersistentDrawerLeft/>
      </ThemeProvider>
    </Router>
    
  );
}

export default App;

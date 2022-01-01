import {useEffect} from "react"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import PersistentDrawerLeft from './components/Navbar';
import { loginUser } from "./redux/ActionCreators/AuthActionCreators";

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
      <PersistentDrawerLeft/>
      
    </Router>
  );
}

export default App;

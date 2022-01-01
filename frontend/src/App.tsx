import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import PersistentDrawerLeft from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <PersistentDrawerLeft/>
      
    </Router>
  );
}

export default App;

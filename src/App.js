import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
// Pages
import Header from './componentes/header';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ListUsers from './pages/listUsers';
import Account from './pages/account';
// Css
import './App.css';

function App() {
  return (
    <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/listusers" element={<ListUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import SignUp from './components/SignUp';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
      {/* <Login/>
      <SignUp/> */}
    </div>
  );
}

export default App;

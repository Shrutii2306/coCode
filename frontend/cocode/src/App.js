import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {Provider} from 'react-redux';
import appStore from './redux/store';

function App() {
  return (
    <Provider store={appStore} >
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
    </Provider>
  );
}

export default App;

import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';
import appStore from './redux/store';
import InternetPopup from './components/popUps/InternetPopup';
import useInternetStatus from './utils/useInternetStatus';
import { setNetworkPopup } from './redux/variableSlice';
function App() {

  const status = useInternetStatus();

  return (
    <Provider store={appStore} >
    <div className="App">
      <Header/>
        <InternetPopup />
      <div className='z-0 relative'>
        <Outlet/>
      </div>
    </div>
    </Provider>
  );
}

export default App;

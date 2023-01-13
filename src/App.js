import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import {stateContext} from "./components/contextApi/StateProvider"
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';


function App() {
 const [{user}] = useContext(stateContext);
 console.log(user);
  return (
    <div className="container ">
      { !user ?  <Login/> :
      <div className='app-body'> 
      <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Chat/>} />
        <Route path='/rooms/:roomId' element={<Chat/>} />
      </Routes>
      </BrowserRouter>
      </div>
      }
      
    </div>
  );
}

export default App;

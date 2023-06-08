import { useState } from 'react'
import axios from 'axios';
import Context from "./Context"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Plans from "./pages/Plans/Plans"
import Users from "./pages/Users/Users"

export default function App() {

  const [userData, setUserData,] = useState([]);

  axios.defaults.headers.common['Authorization'] = 'Y2VCJ9anYPua7XDEup8Q5oWn';

  return (
    <>
    <Context.Provider value={[userData,setUserData]}>
          <BrowserRouter>

                <Routes>

                  <Route path='/' element={  <Login/> } />
                  <Route path='/sign-up' element={  <SignUp/> } />
                  <Route path='/subscriptions/:idPlan' element={  <Plans/> } />
                  <Route path='/subscriptions' element={  <Plans/> } />
                  <Route path='/home' element={  <Home/> } />
                  <Route path='/users' element={  <Users/> } />

                </Routes>

          </BrowserRouter>
    </Context.Provider>
    </>
  )
}



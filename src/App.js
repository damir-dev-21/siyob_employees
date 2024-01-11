import { Route, Routes } from 'react-router-dom'
import {useState,useEffect} from 'react'
import AuthPage from './pages/auth_page'
import MainPage from './pages/main_page'
import AddEmployee from './pages/add_employee_page'
import SoonPage from './pages/soon_page'

import { connect } from "react-redux";

function App({isAuth}) {
  const [username, setUsername] = useState('')

  useEffect(()=>{
    var username = localStorage.getItem('username')
    if(username != null){
      setUsername(username)
    }
  },[])

  return (
    <div className="App">
      {
        isAuth ?
        <Routes>
          <Route exact path="/" element={<MainPage />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
          <Route path="/soon" element={<SoonPage />}></Route>

        </Routes>
        :
          <Routes>
            <Route exact path="/" element={<AuthPage />}></Route>
          </Routes>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, null)(App);

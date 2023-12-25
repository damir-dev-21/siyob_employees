import { useState } from 'react'
import { auth } from '../redux/actions/auth'
import { NavLink, Navigate } from 'react-router-dom'

import { connect } from 'react-redux'

function AuthPage({auth}){
    const [login,setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (isLogin) => {
        auth(login, password, isLogin)
    }

  return (
    <div className='auth-page'>
          <div class="login-container">
              <h1>SIYOB</h1>
              <form onSubmit={(e) => e.preventDefault()} method="post">
                  <input type="text" id="login" name="login" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                  <input type="password" id="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {/* <NavLink to={'/main'}> */}
                  <button type="submit" onClick={() => handleSubmit(true)}>Войти</button>
                  {/* </NavLink> */}
              </form>
          </div>
    </div>
            
        
    )
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (username, password, isLogin) => dispatch(auth(username, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(AuthPage)
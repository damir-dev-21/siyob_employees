import { useEffect, useState } from 'react'
import { auth } from '../redux/actions/auth'
import { NavLink, Navigate } from 'react-router-dom'

import { connect } from 'react-redux'

function AuthPage({isAuth, auth}){
    const [login,setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = (isLogin) => {
        auth(login, password, isLogin)
    }

    useEffect(() => {
        if (isAuth == false) {
            setModalVisible(true);
            const interval = setInterval(() => {
                setModalVisible(false);
            }, 3000);
            return () => clearInterval(interval); 
        }
    }, [isAuth]);

  return (
    <div className='auth-page'>
          <div class="login-container">
              {isAuth == false && <Modal onClose={() => setModalVisible(false)} />}

              <h1>SIYOB</h1>
              <form onSubmit={(e) => e.preventDefault()} method="post">
                  <input type="text" id="login" name="login" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                  <input type="password" id="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" onClick={() => handleSubmit(true)}>Войти</button>
              </form>
          </div>
    </div>
            
        
    )
}

const Modal = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            padding: '10px',
            color:"white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Вы не авторизованы</p>
        </div>
    );
};


function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (username, password, isLogin) => dispatch(auth(username, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
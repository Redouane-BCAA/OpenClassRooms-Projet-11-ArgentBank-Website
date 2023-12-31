import React from 'react'
import { NavLink } from 'react-router-dom'
import ArgentBankLogo from '../assets/argentBankLogo.webp'
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/authentificationslice';

export default function Header() {
  
  // on utilise useSelector pour obtenir l'état de l'authentification depuis le Redux store
  const isConnected = useSelector ((state) => state.authentification.isConnected)
  const userInfo = useSelector((state) => state.userInformation.userData)

  const dispatch = useDispatch();

  // Fonction pour gérer la déconnexion 
  const handleSignOut = () =>{
    dispatch(signOut())
  }

  return (
    <div>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink> 
    
        <div>
          {/* On vérifie si l'utilisateur est connecté / modification du main nav item en fonction de l'état*/}
          {isConnected ? (
            <div>
              <NavLink to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userInfo ? `${userInfo.userName}  ` : ''}
            </NavLink>
              
                <i className="fa fa-sign-out"></i>
              <NavLink to="/signin" className="main-nav-item" onClick={handleSignOut}>
                Sign Out
              </NavLink>
            </div>)
            : 
            (
            <NavLink to="/signin" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  )
}

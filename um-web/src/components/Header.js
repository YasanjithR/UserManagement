import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from './Logo';
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/authSlice"
import { useNavigate } from 'react-router-dom';

  


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)
  const {userName} = useSelector((state) => state.auth)
  const handleLogout = () => {

    try{
    dispatch(logout());
    navigate('/');
  }catch(error){
    console.error('Failed to logout:', error)
  }
  };

  return (
    <div className="header d-flex justify-content-between align-items-center bg-primary p-3">
      <div className="d-flex align-items-center">
        <Logo size="sm" />
        <span className="ms-2 font-weight-bold text-white">User Management</span>
      </div>
      <div>
        {auth.isAuthenticated && (
          <>
            <span className="text-white me-3">Hello, {userName}!</span>
            <button onClick={handleLogout} className="btn btn-outline-light">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

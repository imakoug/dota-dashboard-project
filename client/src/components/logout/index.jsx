import React from 'react';
import apiService from '../../services/AuthApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

const Logout = (props) => {
  let navigate = useNavigate();
  const handleClick = () => {
    apiService.logout();
    handleAuth();
  };

  const handleAuth = () => {
    props.setIsAuthenticated(false);
    auth.logout(() => navigate('/'));
  };

  return (
    <div className='logout'>
      <h2>Are you sure you want to log out?</h2>
      <Link to="/">
        <button className='confirm-btn'>No</button>
      </Link>
      <button className='confirm-btn' onClick={() => handleClick()}>
        Yes
      </button>
    </div>
  );
};

export default Logout;

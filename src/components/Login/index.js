import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const LoginForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    history.replace('/');
  };

  const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg);
    setShowSubmitError(true);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true); // Show loader while processing

    try {
      const response = await axios.post('https://jmbackend.onrender.com/login/', {
        email,
        password
      });

      onSubmitSuccess(response.data.jwtToken);

      setEmail('');
      setPassword('');
    } catch (error) {
      onSubmitFailure(error.response.data.error);
    } finally {
      setIsLoading(false); // Hide loader after processing
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <div>
        <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1708777302/ecommerce-shop-removebg-preview_p4vq81.png" alt="signup" className='signIn-image'/>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className='create-heading'>SignIn/Existing User</h2>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder='EMAIL'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
       
        <input 
          type={showPassword ? "text" : "password"} 
          id="password" 
          name="password" 
          value={password} 
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <div>
          <input 
            type="checkbox" 
            id="showPassword" 
            name="showPassword" 
            checked={showPassword} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="showPassword">
            Show Password
          </label>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className='signup-link'>Don't have an account? <Link to="/signup">Signup</Link></p> 
        {showSubmitError&& <p className='signup-response'>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

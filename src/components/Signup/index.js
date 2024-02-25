import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./index.css";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loader while processing
    
    const formData = {
      username: username,
      name: name,
      password: password,
      email: email,
      phoneNumber: phoneNumber
    };

    try {
      const response = await axios.post('https://jmbackend.onrender.com/users/', formData);
      console.log('Response:', response.data);
      
      // Clear form fields
      setUsername('');
      setName('');
      setPassword('');
      setEmail('');
      setPhoneNumber('');
 
      setResponseMessage('Signup successful!');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Signup failed. Please try again.');
    } finally {
      setIsLoading(false); // Hide loader after processing
    }
  };

  return (
    <div className="signup-container">
      <div>
        <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1708777302/ecommerce-shop-removebg-preview_p4vq81.png" alt="signup" className='signup-image'/>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className='create-heading'>Create Account</h2>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={username} 
          placeholder='USERNAME'
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={name}
          placeholder='FULLNAME' 
          onChange={(e) => setName(e.target.value)} 
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
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          id="phoneNumber" 
          name="phoneNumber" 
          value={phoneNumber} 
          placeholder='PHONE NUMBER'
          onChange={(e) => setPhoneNumber(e.target.value)} 
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
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {responseMessage && <p className='signup-response'>{responseMessage}</p>}
        <p className='signup-link'>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default SignupForm;

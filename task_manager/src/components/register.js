import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async  (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8081/demo', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    if (response.ok) {
      toast.success("Registration Successful!")
      setTimeout(() => {
        navigate('/');
      }, 9000);
    } else {
      toast.error("Registration failed!")
    }
    // navigate('/');
  };

  return (
    <>
      <toastContainer />
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="max-w-md w-full p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;

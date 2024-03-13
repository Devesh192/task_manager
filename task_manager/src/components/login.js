import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data.username);
            dispatch(loginUser(data.username))
            toast.success("Login Successful!")
            // If login is successful, navigate to home page
            setTimeout(() => {
                navigate('/home');
            }, 900);
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (e.g., display error message to user)
        }
    };
    const redirect = () => {
        navigate('/register');
     }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex justify-center items-center bg-gray-200 p-10">
                <div className="max-w-md w-full p-8 bg-white rounded shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                    </form>
                    <div className="mb-6 m-10 justify-center">
                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirect}>
                            First Time user? Register Here
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default Login;

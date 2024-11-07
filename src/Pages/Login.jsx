import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (state === 'Sign Up') {
      if (users.some(user => user.email === email)) {
        setMessage('Email already exists!');
        return;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem("auth", true);
      setMessage('Account successfully created');
      setTimeout(() => {
        navigate('/'); 
      }, 500);
    } else {
      const existingUser = users.find(user => user.email === email && user.password === password);
      if (existingUser) {
        setMessage('Logged in');
        localStorage.setItem("auth", true);
        setTimeout(() => {
          navigate('/'); 
        }, 500);
      } else {
        setMessage('Invalid email or password');
        setTimeout(() => setMessage(''), 1000);
      }
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Enter your full name'
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder='Enter your email'
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder='Enter password'
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {message && <p className="text-green-500">{message}</p>}

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary underline cursor-pointer">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

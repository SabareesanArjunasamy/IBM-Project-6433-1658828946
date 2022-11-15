import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();

  const loginHandler = (e) => {
    e.preventDefault();
    fetch('http://169.51.205.76:32522/authenticate', {
      method: 'POST',
      mode: 'cors',
      redirect: 'manual',
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem('@user', email);
        window.location.reload();
      }
      else setLoginError(true);
    })

    if (loginError) {
      setLoginError(true);
    }
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="pt-40 pl-20">
          <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
            <form onSubmit={loginHandler}>
              <div className="flex items-center justify-center">
                <h2 className="text-2xl font-bold tracking-wide">
                  Welcome back
                </h2>
              </div>
              <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                Log In
              </h2>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="text"
                className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                placeholder="Email id"
              />
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                placeholder="Password"
              />
              <div className="flex items-center justify-between">
                <Link
                  to="/signup"
                  className="text-gray-600"
                >
                  New User? Signup
                </Link>
                <button className="bg-gray-800 text-gray-200  px-2 py-1 rounded">
                  Log In
                </button>
              </div>
            </form>
            {loginError ? (
              <div className="loginerror text-center text-red-500">
                Invalid Email or Password
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="mr-20 mt-40 p-12"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
          }}
        >
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Welcome to NewsHub
          </h1>
          <h1 className="text-5xl py-2 font-bold text-white tracking-wide">

          </h1>
          <p className="text-white py-2">
            Provide you with the news you want. <br /> Save Time. Say yes to NewsHub.
          </p>
          <span className="text-white">
            Create New Account?
            <Link
              to="/signup"
              className="text-white text-lg ml-2 font-bold hover:text-red-500"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login;
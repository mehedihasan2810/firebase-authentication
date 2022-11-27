import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { useUserAuth } from "../firebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForPass, setShowForPass] = useState(true);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const { login, signInWithGoogle, user, setTimeActive, verifyEmail, auth, passwordReset } =
    useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);

      /* send verification mail if email not verified */
      if (!auth.currentUser.emailVerified) {
        await verifyEmail();
        setTimeActive(true);
        navigate("/verifyEmail");
      }
      // ...
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error.message);
    }
  };

  /* password reset */
  const handlePasswordReset = async (e) => {
    e.preventDefault();
     try {
      await passwordReset(resetEmail)
     } catch (error) {
      console.log(error.message)
     }
  }
  // .....

  useEffect(() => {
    if (user !== null && user?.emailVerified) {
      navigate("/home");
    }
  }, [user]);
  

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="space-y-6">
        <div className="max-w-[400px] w-full mx-auto p-4 border rounded-md space-y-6 ">
          <h1 className="text-2xl font-semibold text-center">
            Firebase Authentication App.
          </h1>
          <hr />
          {error && (
            <p className="bg-red-500 text-white text-center py-3 px-2 text-xl rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="">
              <label htmlFor="email"></label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border w-full p-3 rounded-md text-[18px]"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border w-full p-3 rounded-md text-[18px]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4285F4] py-[10px] text-xl rounded-md text-white hover:shadow-md hover:shadow-[#4285F4]/30"
            >
              Log In
            </button>
          </form>

          {/* password reset email */}
          { showForPass ? 
          <p onClick={()=>setShowForPass(false)} className="underline mt-0">Forgot Password?</p> :
          <form onSubmit={handlePasswordReset}>
            <label htmlFor="email"></label>
            <input onChange={(e)=> setResetEmail(e.target.value)} className="border w-full p-3 rounded-md text-[18px]" type="email" name="email" id="email" placeholder="Reset email" />
            <button
              type="submit"
              className="w-full mt-2 bg-[#4285F4] py-[10px] text-xl rounded-md text-white hover:shadow-md hover:shadow-[#4285F4]/30"
            >
              Reset Password
            </button>
          </form>
          }
         {/* .... */}

          <hr />
          <GoogleButton onClick={handleGoogleLogin} className="!w-full" />
        </div>
        <div className="p-4 border rounded-md text-[18px] font-normal text-center">
          <h2>
            Don't have an account?{" "}
            <Link to="/signup" className="underline hover:decoration-pink-500">
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;

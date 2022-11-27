import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../firebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  // ...
  const { createUser, verifyEmail, user, updatingProfile, setTimeActive } = useUserAuth();
  // ...

  const navigate = useNavigate();
  // ...

  /* validate password */
  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }

    if(password !== "" && confirmPassword === ""){
      isValid = false;
      setError('Confirm your password')
    }

    return isValid;
  };
  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (validatePassword()) {
      try {
        setLoading(true)
        await createUser(email, password);
        await updatingProfile(name);
        await verifyEmail();
        setTimeActive(true);
        setLoading(false)
        navigate('/verifyEmail');
      } catch (error) {
        setLoading(false)
        setError(error.message);
        console.log(error.message);
      }
    }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  // ...

  /* naviigate to home page if a users email is verified */
  useEffect(() => {
    if (user !== null && user?.emailVerified) {
      navigate("/home");
    }
  }, [user]);

 if(loading){
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
            <div>
              <label htmlFor="name"></label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="border w-full p-3 rounded-md text-[20px]"
              />
            </div>

            <div>
              <label htmlFor="email"></label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border w-full p-3 rounded-md text-[20px]"
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
                className="border w-full p-3 rounded-md text-[20px]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword"></label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border w-full p-3 rounded-md text-[20px]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4285F4] py-[10px] text-xl rounded-md text-white hover:shadow-md hover:shadow-[#4285F4]/30"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="p-4 border rounded-md text-[17px] font-normal text-center">
          <h2>
            Already have an account?{" "}
            <Link to="/" className="underline hover:decoration-pink-500">
              Log In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;

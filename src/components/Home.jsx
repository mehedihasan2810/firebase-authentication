import React, { useState } from "react";
import { useUserAuth } from "../firebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [userProvidePassword, setUserProvidePassword] = useState("");

  const { logout, user, updateMail, reauthenticate, auth, verifyEmail, setTimeActive } = useUserAuth();
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  /* update user email */
  const handleUpdateMail = async (e) => {
    e.preventDefault();
    try {
      await updateMail(email);
        await verifyEmail();
        setTimeActive(true);
        navigate('/verifyEmail');
      
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleMe = () => {
    setIsButtonVisible(false)
setIsPassVisible(true)
  }

  const handleVerifyPassword = async (e) => {
     e.preventDefault();
     try {
      await reauthenticate(userProvidePassword)
     } catch (error) {
      console.log(error.message)
     }
     setIsPassVisible(false)
     setIsEmailVisible(true)

  }



  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[400px] border p-6 w-full space-y-4 rounded-md">
        
        <h2 className="text-center text-xl">Welcome!</h2>
        <p>Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
        <p>IsVerified: {`${user.emailVerified}`}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 py-3 w-full rounded-md text-white text-[18px] hover:shadow-lg hover:shadow-red-500/30"
        >
          Log out
        </button>
        <hr />
        <div>

        {isButtonVisible && <button onClick={handleMe} className="bg-green-400 text-white font-semibold text-xl p-3 w-full mt-3">update profile</button>}

        {/* update user email */}
        
         { isEmailVisible && ( <form onSubmit={handleUpdateMail}>
            <label htmlFor="email"></label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border w-full p-3"
            />
            <button
              type="submit"
              className="bg-green-400 text-white font-semibold text-xl p-3 w-full mt-3"
            >
              change email
            </button>
          </form> )}
          

          {/* verification password section */}
          { isPassVisible && ( <form onSubmit={handleVerifyPassword}>
            <p>to update your profile first verify that its you</p>
            <label htmlFor="password"></label>
            <input
              onChange={(e) => setUserProvidePassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border w-full p-3"
            />
            <button
              type="submit"
              className="bg-green-400 text-white font-semibold text-xl p-3 w-full mt-3"
            >
              Confirm
            </button>
          </form> )}


           


        </div>
      </div>
    </div>
  );
};

export default Home;

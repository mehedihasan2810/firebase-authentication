import React, { useState, useEffect } from "react";
import { useUserAuth } from "../firebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [time, setTime] = useState(60);
  const { user, verifyEmail, timeActive, setTimeActive } = useUserAuth();
  const navigate = useNavigate();

  //....
  const resendEmail = async () => {
    try {
      await verifyEmail();
      setTimeActive(true);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
// ...

  //....
  useEffect(() => {
    let interval = null;
    if (timeActive && time != 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time == 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, timeActive]);
  //....

  // ...
  useEffect(() => {
    const interval = setInterval(() => {
      user?.reload()
        .then(() => {
          if (user?.emailVerified) {
            clearInterval(interval);
            navigate("/home");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [user, navigate]);
  // ....

  /* Alternative */
  //     useEffect(() => {

  //       const interval = setInterval( async () => {
  //       try {
  //          await user?.reload();
  //        if(user?.emailVerified){
  //           clearInterval(interval)
  //           navigate('/home')
  //        }
  //       } catch (error) {
  //           console.log(error.message)
  //       }
  //   }, 1000)

  // }, [user, navigate])
  // ....

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border p-3 text-center space-y-2">
        <h1 className="font-bold text-xl">Verify your email address</h1>
        <hr />
        <h2 className="font-semibold">
          A verification email has been sent to:{" "}
          {user && <span className="font-bold">{user?.email}</span>}{" "}
        </h2>
        <p>Follow the instruction in the email to verify your email.</p>
        <button
          onClick={resendEmail}
          disabled={timeActive}
          className="border-2 rounded-md py-2 px-3 font-semibold"
        >
          Resend Email {timeActive && time}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

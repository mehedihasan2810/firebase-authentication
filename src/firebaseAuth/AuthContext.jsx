import { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  updateEmail,
  sendEmailVerification,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential, 
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebase";

const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [timeActive, setTimeActive] = useState(false);

  /*1st: creating user with email password */
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /* 2nd: signIn with email password */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* 3rd: Sign Out */
  const logout = () => {
    signOut(auth);
  };

  /* 5th: sign in with google account */
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  /* update user email */
  const updateMail = (email) => {
    updateEmail(auth.currentUser, email);
  };

  /* send user a verification email */
  const verifyEmail = () => {
 sendEmailVerification(auth.currentUser)
  }

  
/* updating user profile */
const updatingProfile = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  })
}


/* reauthenticate */
const reauthenticate = (userProvidePassword) => {
  const credential = EmailAuthProvider.credential(auth.currentUser.email, userProvidePassword);
  reauthenticateWithCredential(auth.currentUser, credential);
}


// password reset //
const passwordReset = (email) => {
sendPasswordResetEmail(auth, email)
}
// ....

  /* 4th: get data from current user */
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ 
        createUser, 
        login, 
        logout, 
        signInWithGoogle, 
        user, 
        updateMail, 
        verifyEmail, 
        updatingProfile, 
        timeActive, 
        setTimeActive, 
        auth, 
        reauthenticate, 
        passwordReset
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};

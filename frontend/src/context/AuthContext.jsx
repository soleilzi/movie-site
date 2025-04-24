import React, { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
  } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      toast.success('Verification email sent! Please check your inbox.');
      await signOut(auth);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(!userCredential.user.emailVerified) {
        toast.warning('Please verify your email before logging in.');
        await signOut(auth);
        return;
      }
      toast.success('Sign in successful!');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast.info('Signed out.');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.emailVerified ? user : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, signin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
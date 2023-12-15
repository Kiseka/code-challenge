"use client";

import { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../utils/firebase"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth"

interface TypeFirebaseUser extends User {
  accessToken?: string
}

type AuthContextType = {
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  firebaseUser: TypeFirebaseUser | null,
  authenticated: undefined | boolean,
  isAuthorized: (status: boolean) => void,
  logout: () => void
}
const defaultAuthContext: AuthContextType = {
  signup: () => {
    return Promise.reject('AuthContext not initialized');
  },
  login: () => {
    return Promise.reject('AuthContext not initialized');
  },
  isAuthorized: (status: boolean) => { },
  firebaseUser: null,
  authenticated: undefined,
  logout: () => { }
};
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [firebaseUser, setFirebaseUser] = useState<TypeFirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState<undefined | boolean>(undefined)

  function isAuthorized(status: boolean) {
    setAuthenticated(status);
  }

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email: string, password: string) {
    setAuthenticated(undefined)
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthenticated(true);
        return userCredential;
      });
  }



  function logout() {
    setAuthenticated(false);
    return auth.signOut()
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setFirebaseUser(user)
      if (user == null) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
      setLoading(false)
    })
    return unsubscribe()
  }, [])

  useEffect(() => {
    console.log(firebaseUser)
  }, [firebaseUser])

  const value = {
    firebaseUser,
    login,
    signup,
    logout,
    resetPassword,
    authenticated,
    isAuthorized
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

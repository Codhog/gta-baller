import {useContext, createContext, useState, useEffect} from "react";
import {GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {auth} from "./firebase";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const googleLogin = () => {
        return signInWithPopup(auth, provider)

    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setCurrentUser(user)
        });
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        googleLogin,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
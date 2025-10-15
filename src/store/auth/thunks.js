import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup( auth, provider );
            const { displayName, email, photoURL, uid } = result.user;
            dispatch( login({ displayName, email, photoURL, uid }) );
        } catch (error) {
            dispatch( logout({ errorMessage: error.message }) );
        }
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        try {
            const result = await signInWithEmailAndPassword( auth, email, password );
            const { displayName, photoURL, uid } = result.user;
            dispatch( login({ displayName, email, photoURL, uid }) );
        } catch (error) {
            dispatch( logout({ errorMessage: 'Credenciales incorrectas' }) );
        }
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await signOut(auth);
        dispatch( logout() );
    }
}


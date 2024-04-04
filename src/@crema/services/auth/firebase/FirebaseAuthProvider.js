import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from './firebase';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';
import jwtAxios from '../jwt-auth';
import axios from 'axios';
import { serverLink } from 'shared/constants/Constan';

const FirebaseContext = createContext();
const FirebaseActionsContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

const FirebaseAuthProvider = ({children}) => {
  const [SRole, setSRole] = useState();
  const [firebaseData, setFirebaseData] = useState({
    user: undefined,
    isLoading: true,
    isAuthenticated: false,
    role: undefined,
  });
  // console.log('DDDDDD', firebaseData);
  const dispatch = useDispatch();

  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem('storedValue') || '';
    setSRole(value);
    console.log('FFFF', value, SRole);
    const getAuthUser = auth.onAuthStateChanged(
      (user) => {
        setFirebaseData({
          user: user,
          isAuthenticated: Boolean(user),
          isLoading: false,
          role: value,
        });
      },
      () => {
        setFirebaseData({
          user: firebaseData.user,
          isLoading: false,
          isAuthenticated: false,
          role: firebaseData.role,
        });
      },
      (completed) => {
        setFirebaseData({
          user: firebaseData.user,
          isLoading: false,
          isAuthenticated: completed,
          role: firebaseData.role,
        });
      },
    );

    return () => {
      getAuthUser();
    };
  }, []);

  const getProvider = (providerName) => {
    switch (providerName) {
      case 'google': {
        return googleAuthProvider;
      }
      case 'facebook': {
        return facebookAuthProvider;
      }
      case 'twitter': {
        return twitterAuthProvider;
      }
      case 'github': {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const signInWithPopup = async (providerName, selectedRole) => {
    console.log('Sing in with Popup for all');
    dispatch({type: FETCH_START});
    try {
      const {user} = await auth.signInWithPopup(getProvider(providerName));
      // jwtAxios
      //   .post('user/signup', {user, providerName})
      //   .then((data) => {
      //     console.log('Firebase user ', data);
      //   })
      //   .catch((error) => {
      //     console.log('Firebase user ', error);
      //   });
      AxiosFunctionVerifyUser(user, selectedRole);
      localStorage.setItem('storedValue', selectedRole);
      setFirebaseData({
        user,
        isAuthenticated: true,
        isLoading: false,
        role: selectedRole,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const AxiosFunctionVerifyUser = async (data, selectedRole) => {
    console.log('DDDd', data);
    axios
      .post(`${serverLink}/users/signin`, {
        // firstName: data?.displayName || '',
        // lastName: data?.family_name || '',
        emailId: data,
        // emailId: data?.email,
        // userType: selectedRole,
      })
      .then(async function (response, data) {
        console.log('Positive Response', response);
        await setFirebaseData({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          role:selectedRole
        });
      })
      .catch(function (error) {
        console.log('Errorrr', error);
        setFirebaseData({
          ...firebaseData,
          isAuthenticated: false,
          isLoading: false,
        });
      });
  };

  const signInWithPopupForGoogle = async (data, selectedRole) => {
    console.log('In signinwithpopup', data, selectedRole);
    dispatch({type: FETCH_START});
    try {
      // AxiosFunctionVerifyUser(data, selectedRole);
      setFirebaseData({
        data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const signInWithEmailAndPassword = async (data, selectedRole) => {
    console.log(' EMAIL PSIGNINASS 0', data, selectedRole);
    dispatch({type: FETCH_START});
    try {
      const {user} = await auth.signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      AxiosFunctionVerifyUser(data.email, selectedRole);
      console.log('SIGNIN EMAIL PASS', selectedRole);
      localStorage.setItem('storedValue', selectedRole);
      // setFirebaseData({
      //   user,
      //   isAuthenticated: true,
      //   isLoading: false,
      //   role: selectedRole,
      // });
      // dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
        role: undefined,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
  const createUserWithEmailAndPassword = async ({
    name,
    email,
    password,
    phoneNumbr,
    selectedRole,
  }) => {
    dispatch({type: FETCH_START});
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification({
        url: window.location.href,
        handleCodeInApp: true,
      });
      await auth.currentUser.updateProfile({
        displayName: name,
      });
      setFirebaseData({
        user: {...user, displayName: name},
        isAuthenticated: true,
        isLoading: false,
      });
      // AxiosFunctionVerifyUser(
      //   (data = {firstName: name, emailId: email}),
      //   selectedRole,
      // );
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const logout = async () => {
    setFirebaseData({...firebaseData, isLoading: true});
    try {
      await auth.signOut();
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <FirebaseActionsContext.Provider
        value={{
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          signInWithPopup,
          signInWithPopupForGoogle,
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

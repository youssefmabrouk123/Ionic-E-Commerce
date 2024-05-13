import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { useUser } from "../context/authContext";
import localforage from 'localforage';

import {
  IonPage, IonRouterLink,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonRow,
  IonCol,
  IonGrid
} from "@ionic/react";
import "./SignUpPage.css"; // Import du fichier CSS

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [storage, setStorage] = useState(null);
  const [auth, setAuth] = useState(false);
  const { user, isAuthenticated, isLoading, checkAuthUser } = useUser();


  useEffect(() => {
    const initializeStorage = async () => {
      await localforage.ready();
      setStorage(localforage);
      const token = await localforage.getItem("token");
      console.log(token);
      if (token) {
        setAuth(true);
        console.log(auth)
      }
    };

    initializeStorage();
  }, [auth]);



  const handleSignUp = () => {

    const userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      role: "USER"
    };

    axios.post('http://localhost:8080/auth/signup', userData)
      .then(response => {
        // Handle successful signup here
        console.log("Signup successful!");
        history.push('/signin'); // Redirect to /signin after successful signup
      })
      .catch(error => {
        // Handle errors
        console.error("Signup failed:", error);
      });
  };



  if (!auth) {
    return (
      <IonPage>
        <IonContent fullscreen className="ion-padding" scrollY={false}>
          <img alt="avatar" src="../../assets/signupp.png" style={{ display: 'block', margin: '0 auto' }} />
          <h1 className="title" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '-10%', color: '#333'
          }}>Create an account in One minute ! </h1>
          <IonGrid className="signup-container" style={{ marginTop: '-70%' }} >
            <IonRow className="ion-align-items-center">
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="12">
                <IonInput
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onIonChange={(e) => setFirstName(e.detail.value)}
                  className="input-field"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="12">
                <IonInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onIonChange={(e) => setLastName(e.detail.value)}
                  className="input-field"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="12">
                <IonInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value)}
                  className="input-field"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="12">
                <IonInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value)}
                  className="input-field"
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="12" className="ion-text-center">
                <IonButton expand="block" onClick={handleSignUp} className="signup-button">
                  Sign Up
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center" style={{ marginTop: '3vh' }}>
              <IonCol size="12" className="ion-text-center">
                <IonText className="signin-link">
                  Don't have an account?
                  <IonRouterLink routerLink="/signin">  Sign in</IonRouterLink>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  } else { history.push("/home"); }
};

export default SignUpPage;

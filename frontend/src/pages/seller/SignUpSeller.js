import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

import {
    IonRouterLink,
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    IonRow,
    IonToast,
    IonCol,
    IonGrid
} from "@ionic/react";
import "../SignUpPage.css"; // Import du fichier CSS

const SignUpSeller = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [storage, setStorage] = useState(null);
    const [auth, setAuth] = useState(false);
    const [showToast, setShowToast] = useState(false);





    //   useEffect(() => {
    //     const initializeStorage = async () => {
    //         const storage = new Storage();
    //         await storage.create();
    //         setStorage(storage);
    //         const token = await storage.get("token");
    //   console.log(token)
    //   if(token){
    //     setAuth(true);

    //   }
    //   console.log(auth)

    //     };

    //     initializeStorage();
    // }, [auth]);


    const handleSignUp = () => {

        const userData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            role: "USER"
        };

        axios.post('http://localhost:8080/auth/signupseller', userData)
            .then(response => {
                // Handle successful signup here
                console.log("Signup successful!");
                showSignUpToast(); // Show toast on successful signup
                setTimeout(() => {
                    history.push('/signinasseller'); // Redirect to /signin after 2 seconds
                }, 2000);
            })
            .catch(error => {
                // Handle errors
                console.error("Signup failed:", error);
            });
    };
    const showSignUpToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2300); // Hide the toast after 2 seconds
    };
    if (!auth) {
        return (
            <IonPage>
                <IonContent fullscreen className="ion-padding" scrollY={false}>
                    <IonGrid className="signup-container">
                        <img alt="avatar" src="../../assets/store.png" style={{ display: 'block', margin: '0 auto' }} />
                        <h1 className="title" style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            margin: '20px 0', color: '#333'
                        }}>It is time to upgrade your business. Make every screen a storefront ! </h1>
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
                                <IonToast
                                    isOpen={showToast}
                                    message="Signup successful !"
                                    duration={2500} // Duration in milliseconds
                                    onDidDismiss={() => setShowToast(false)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText className="signin-link">
                                    Already have an account? <IonRouterLink routerLink="/signinasseller">Sign in</IonRouterLink>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    } else { history.push("/home"); }
};

export default SignUpSeller;

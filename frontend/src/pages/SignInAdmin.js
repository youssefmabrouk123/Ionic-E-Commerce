import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, Link } from "react-router-dom"; // Import useHistory from react-router-dom

import {IonRouterLink,
    IonAvatar,
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonToast // Import IonToast for error handling
} from "@ionic/react";
import "./SignUpPage.css"; // Import du fichier CSS
import { Storage } from '@ionic/storage';
import { useAdmin } from "../context/authAdminContext";

const SignInAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Define error state
    const history = useHistory(); // Initialize useHistory hook
    const { admin, isAuthenticated, isLoading, checkAuthAdmin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [auth, setAuth] = useState(false);


    useEffect(() => {
        const initializeStorage = async () => {
            const storage = new Storage();
            await storage.create();
            setStorage(storage);
            const token = await storage.get("token");
            console.log(token)
            if (token) {
                setAuth(true);

            }
            console.log(auth)

        };

        initializeStorage();
    }, [auth]);

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/signinasadmin", {
                email,
                password
            });

            if (response.data.statusCode === 200) {
                console.log("Sign in successful as ADMIN :", response.data);

                // Initialize Ionic Storage
                const storage = new Storage();
                await storage.create();

                // Store the token in Ionic Storage
                await storage.set("token", response.data.token);

                await checkAuthAdmin();
                history.push('/dashboard');
            } else {
                console.error("Sign in failed:", error);
                setError("Sign in failed. Please check your credentials."); // Set error messageage
            }
        } catch (error) {
            console.error("Sign in failed:", error);
            setError("Sign in failed. Please check your credentials."); // Set error message
        }
    };
    if (!auth) {
        return (
            <IonPage>
                <IonContent fullscreen className="ion-padding" scrollY={false}>
                    <img alt="avatar" src="../../assets/admin.png" style={{ display: 'block', margin: '0 auto' }} />
                    <IonGrid className="signin-container" style={{ marginTop: '1.5em' }}>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="12" className="ion-text-center ">
                                <h1 className="title">Sign In As ADMIN</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-align-items-center ">
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
                                <IonButton expand="block" onClick={handleSignIn} className="signup-button">
                                    Sign In
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText className="signup-link">
                                <i> Are you having a problem ? Please contact department.</i>
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="12" className="ion-text-center">
                                <IonText className="signup-link">
                                    <IonRouterLink routerLink="/home" style={{ display: 'block', marginTop: '15%', textDecoration: 'none', color: '#007bff' }}>
                                        <b>Return to Home page.</b>
                                    </IonRouterLink>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/* Render IonToast for error handling */}
                    <IonToast
                        isOpen={!!error} // Show toast if error is not empty
                        message={error} // Error message to display
                        duration={5000} // Duration in milliseconds
                        onDidDismiss={() => setError("")} // Clear error state when toast is dismissed
                    />
                </IonContent>
            </IonPage>
        );
    } else { history.push("/dashboard"); }
};

export default SignInAdmin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
    IonRow,
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonAlert,
    IonGrid,
    IonList,
    IonItem,
    IonHeader,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonToast
} from '@ionic/react';
import { chevronBack } from "ionicons/icons";
import { Storage } from '@ionic/storage';


function UpdateProfile() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        number: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [storage, setStorage] = useState(null);

    const initializeStorage = async () => {
        const storageInstance = new Storage();
        await storageInstance.create();
        setStorage(storageInstance);
    };

    useEffect(() => {
        initializeStorage();
    }, []);

    const history = useHistory(); // Import and initialize useHistory

    
    const handleSubmit = async () => {
        try {
            if (!formData.firstname || !formData.lastname || !formData.number || !formData.email || !formData.password) {
                setError("Please fill out all required fields.")
                throw new Error('Please fill out all required fields.');
            }

            const token = await storage.get("token");
            if (!token) throw new Error('Token not found');
            const response = await axios.post('http://localhost:8080/admin/addSeller', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            console.log("Seller added successfully!");

            setSuccessMessage('Seller added successfully!'); // Display success message

            // Redirect to /dashboard route after 2 seconds
            setTimeout(() => {
                history.push('/dashboard');
            }, 1500);
        } catch (error) {
            console.error(error);
            setError("Please fill out all fields correctly.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/dashboard" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBack} />
                            &nbsp; <b>Dashboard</b>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" scrollY={false}>
                <IonGrid className="signin-container" style={{ marginTop: '5em' }}>
                    <IonList>
                        <IonItem>
                            <IonInput name="firstname" value={formData.firstname} onIonChange={handleInputChange} label="Text input" placeholder="Seller's firstname" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="lastname" value={formData.lastname} onIonChange={handleInputChange} label="Text input" placeholder="Seller's lastname" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="number" value={formData.number} onIonChange={handleInputChange} label="Telephone input" type="number" placeholder="12345678" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="email" value={formData.email} onIonChange={handleInputChange} label="Email input" type="email" placeholder="email@domain.com" required ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="password" value={formData.password} onIonChange={handleInputChange} label="Password input" type="password" placeholder="Password" required ></IonInput>
                        </IonItem>
                    </IonList>
                </IonGrid>
                <IonRow style={{ justifyContent: 'space-between', marginTop: "1.5em" }}>
                    <IonButton color="danger" style={{ width: '7em' }} routerLink="/dashboard" routerDirection="back" >Cancel</IonButton>
                    <IonButton color="primary" style={{ width: '7em' }} onClick={handleSubmit}>Add seller</IonButton>
                </IonRow>



                <IonToast
                    isOpen={!!error}
                    message={error}
                    duration={5000}
                    onDidDismiss={() => setError(null)}
                />
                <IonToast
                    isOpen={!!successMessage}
                    message={successMessage}
                    duration={5000}
                    onDidDismiss={() => setSuccessMessage('')}
                />

            </IonContent>
        </IonPage>
    );
}

export default UpdateProfile;

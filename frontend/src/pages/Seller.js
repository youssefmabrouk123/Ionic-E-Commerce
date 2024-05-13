import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import {
    IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol,
    IonActionSheet,IonToast, useIonActionSheet, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import styles from './Product.module.css';


const Seller = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(null);
    const [storage, setStorage] = useState(null);
    const [present] = useIonActionSheet();
    const [showToast, setShowToast] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const initializeStorage = async () => {
            const storageInstance = new Storage();
            await storageInstance.create();
            setStorage(storageInstance);
        };

        initializeStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (storage) {
                    const token = await storage.get('token');
                    const response = await axios.get(`http://localhost:8080/admin/seller/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setSeller(response.data);
                }
            } catch (error) {
                console.error('Error fetching seller:', error);
            }
        };

        fetchData();
    }, [id, storage]);

    const handleDeleteSeller = async () => {
        try {
            if (storage) {
                const token = await storage.get('token');
                await axios.delete(`http://localhost:8080/admin/seller/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Seller deleted successfully!');
                showDeleteToast();
                // Redirect to /dashboard after successful deletion
                history.push('/dashboard');
            }
        } catch (error) {
            console.error('Error deleting seller:', error);
        }
    };
    const showDeleteToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2300); // Hide the toast after 2 seconds
    };
    console.log(seller); // Add this line before navigating to the update seller page

    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/dashboard" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp; Dashboard
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {seller && (
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonCard className={styles.categoryCard}>
                                    <IonCardHeader className={styles.productCardHeader}>
                                        <img src={seller.image} alt="product pic" />
                                        <p className="ion-text-wrap">{seller.firstname} {seller.lastname}</p>
                                    </IonCardHeader>
                                    <IonCardContent className={styles.categoryCardContent}>
                                        <div className={styles.productPrice}>
                                            <IonRow style={{ justifyContent: 'space-between', marginTop: '2em' }}>
                                                <IonButton size="large" color="danger" style={{ marginRight: '2.5em', width: '9em' }}
                                                    onClick={() =>
                                                        present({
                                                            header: 'Confirm Delete ?',
                                                            message: 'Are you sure you want to delete this seller?',
                                                            buttons: [
                                                                {
                                                                    text: 'Delete',
                                                                    role: 'destructive',
                                                                    handler: () => handleDeleteSeller(),
                                                                    data: {
                                                                        action: 'delete',
                                                                    },
                                                                },

                                                                {
                                                                    text: 'Cancel',
                                                                    role: 'cancel',
                                                                    data: {
                                                                        action: 'cancel',
                                                                    },
                                                                },
                                                            ],
                                                        })
                                                    }
                                                >
                                                    DELETE seller
                                                </IonButton>
                                                <IonToast
                                                    isOpen={showToast}
                                                    message="Seller deleted successfully ! Redirecting dashboard..."
                                                    duration={2300} // Duration in milliseconds
                                                    onDidDismiss={() => setShowToast(false)}
                                                />

                                                <IonButton size="large" color="success" style={{ width: '9em' }} routerLink={`/updateseller/${id}`} >UPDATE Seller</IonButton>
                                            </IonRow>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )}
            </IonContent>

        </IonPage>
    );
};

export default Seller;

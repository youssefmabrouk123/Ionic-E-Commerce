import { useEffect, useState } from 'react';
import {
    IonButton, IonButtons, useIonToast,
    IonLabel, IonSpinner, IonItem, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar
} from '@ionic/react';
import {closeCircleOutline, checkmarkCircleOutline, chevronBack } from 'ionicons/icons';

import axios from 'axios';
import { useAdmin } from '../../context/authAdminContext';
import { Storage } from '@ionic/storage';

const Demands = () => {
    const { admin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [adminData, setAdminData] = useState();
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');
    const [present] = useIonToast();

    useEffect(() => {
        const initializeStorage = async () => {
            const storageInstance = new Storage();
            await storageInstance.create();
            setStorage(storageInstance);

            try {
                const data = await storageInstance.get("admin");
                setAdminData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setError('Error fetching admin data');
            }
        };

        initializeStorage();
    }, []);

    const fetchData = async () => {
        try {
            const token = await storage.get("token");
            const response = await axios.get('http://localhost:8080/admin/sellerspending', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSellers(response.data);
            console.log(sellers);
        } catch (error) {
            console.error('Error fetching sellers:', error);
            setError('Error fetching sellers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storage) {
            fetchData();
        }
    }, [storage]);

    const handleActivateSeller = async (sellerId) => {
        try {
            const token = await storage.get("token");
            const response = await axios.put(`http://localhost:8080/admin/seller/${sellerId}/activate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            presentToastActive();
            console.log(response);
            fetchData();

            // Perform any additional actions after successful activation
        } catch (error) {
            console.error('Error activating seller account:', error);
            // Handle error scenarios
        }
    };

    const handleRejectSeller = async (sellerId) => {
        try {
            const token = await storage.get("token");
            const response = await axios.put(`http://localhost:8080/admin/seller/${sellerId}/reject`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            presentToastReject();
            console.log(response);
            fetchData();

            // Perform any additional actions after successful rejection
        } catch (error) {
            console.error('Error rejecting seller account:', error);
            // Handle error scenarios
        }
    };

    const presentToastActive = () => {
        present({
            message: 'Seller account ACTIVATED successfuly !',
            duration: 1500,
            position: 'top',
        });
    };

    const presentToastReject = () => {
        present({
            message: 'Seller account REJECTED successfuly !',
            duration: 1500,
            position: 'top',
        });
    };

    return (
        <IonPage id="home-page">
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
            {loading ? (
                <IonItem>
                    <IonLabel>Loading...</IonLabel>
                    <IonSpinner></IonSpinner>
                </IonItem>
            ) : error ? (
                <IonItem>
                    <IonLabel>Error: {error}</IonLabel>
                </IonItem>
            ) : (
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Sellers</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonGrid>
                        {sellers.map((seller, index) => (
                            <IonRow style={{marginTop:'-5%'}}>
                                <IonCol key={`seller_list_${index}`}>

                                    <IonCard>
                                        <IonRow>
                                            <IonCol size="8" className="ion-text-left">
                                                <IonCardContent className="categoryCardContent">
                                                    <IonCardSubtitle>{`${seller.firstname} ${seller.lastname}`}</IonCardSubtitle>
                                                    <IonCardSubtitle>{seller.email}</IonCardSubtitle>
                                                    <IonCardSubtitle>{seller.number}</IonCardSubtitle>
                                                </IonCardContent>
                                            </IonCol>
                                            <IonCol size="4" className="ion-text-right">
                                                <IonRow>
                                                    <IonButton color="danger" onClick={() => handleRejectSeller(seller.id)}>
                                                        <IonIcon slot="icon-only" icon={closeCircleOutline} ></IonIcon>
                                                    </IonButton>
                                                    <IonButton color="success" onClick={() => handleActivateSeller(seller.id)}>
                                                        <IonIcon slot="icon-only" icon={checkmarkCircleOutline} ></IonIcon>
                                                    </IonButton>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonCard>

                                </IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>
                </IonContent>
            )}
        </IonPage>
    );
};

export default Demands;

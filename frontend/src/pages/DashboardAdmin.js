import { useEffect, useState } from 'react';
import {
    IonAvatar, IonNote, IonBadge, IonButton, IonButtons,
    IonLabel, IonSpinner, IonItem, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage,
    IonRouterLink, IonRow, IonTitle, IonToolbar
} from '@ionic/react';
import { personAddOutline, peopleOutline } from 'ionicons/icons';

import axios from 'axios';
import { useAdmin } from '../context/authAdminContext';
import { Storage } from '@ionic/storage';

const DashboardAdmin = () => {
    const { admin } = useAdmin();
    const [storage, setStorage] = useState(null);
    const [adminData, setAdminData] = useState();
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await storage.get("token");
                const response = await axios.get('http://localhost:8080/admin/sellersactive', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSellers(response.data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
                setError('Error fetching sellers');
            } finally {
                setLoading(false);
            }
        };

        if (storage) {
            fetchData();
        }
    }, [storage]);

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {adminData ? (
                            <IonRouterLink routerLink="/adminprofil" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                                <IonAvatar aria-hidden="true">
                                <img alt="user img" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                            </IonRouterLink>
                        ) : (
                            <IonRouterLink routerLink="/signinasadmin" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                                <IonAvatar aria-hidden="true">
                                <img alt="user img" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                            </IonRouterLink>
                        )}
                        {adminData && (
                            <IonRouterLink routerLink="/adminprofil">
                                <IonNote size="large" style={{ color: 'blue', padding: '1em', fontSize: "1.15em" }}><b>Hi,</b>  {adminData.firstname.charAt(0).toUpperCase() + adminData.firstname.slice(1)} {adminData.lastname.toUpperCase()}</IonNote>
                            </IonRouterLink>
                        )}
                    </div>
                    <IonButton color="primary" routerLink="/addseller" slot="end">
                        <IonIcon icon={personAddOutline} />
                        <IonBadge color="blue" ><b>Add seller</b></IonBadge>
                    </IonButton>
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
                            <IonButton size="medium" color="warning" routerLink="/sellersdemands" slot="end">
                                <IonIcon icon={peopleOutline} />
                                <IonLabel ><b>Demands</b></IonLabel>
                            </IonButton>
                        </IonToolbar>
                    </IonHeader>

                    <IonGrid>
                        <IonRow>
                            {sellers.map((seller, index) => (
                                <IonCol key={`seller_list_${index}`}>
                                    <IonRouterLink routerLink={`/seller/${seller.id}`} state={{ seller }}>
                                        <IonCard>
                                            <img src={seller.cover} alt="Seller cover" />
                                            <IonCardContent className="categoryCardContent">
                                                <IonCardSubtitle>{`${seller.firstname} ${seller.lastname}`}</IonCardSubtitle>
                                                <IonCardSubtitle>{seller.email}</IonCardSubtitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonRouterLink>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            )}
        </IonPage>
    );
};

export default DashboardAdmin;

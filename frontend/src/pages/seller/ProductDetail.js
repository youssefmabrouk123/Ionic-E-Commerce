import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import {
    IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonRouterLink,
    IonActionSheet, IonToast, useIonActionSheet, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import styles from '../Product.module.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [storage, setStorage] = useState(null);
    const [present] = useIonActionSheet();
    const [showToast, setShowToast] = useState(false);
    const history = useHistory(); // Use useHistory hook from react-router-dom

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
                    const response = await axios.get(`http://localhost:8080/users/products/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProduct(response.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [id, storage]);

    const handleDeleteProduct = async () => {
        try {
            if (storage) {
                const token = await storage.get('token');
                await axios.delete(`http://localhost:8080/users/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Product deleted successfully!');
                showDeleteToast();
                // Redirect to /dashboard after successful deletion
                setTimeout(() => {
                    // Redirect to /store after successful deletion
                    history.push('/store');
                }, 2300);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const showDeleteToast = () => {
        setShowToast(true);
    };

    console.log(product);
    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/store" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp; Store
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {product && (
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonCard className={styles.categoryCard}>
                                    <IonCardHeader className={styles.productCardHeader}>
                                        <img src={product.image} alt="product pic" />
                                        <p className="ion-text-wrap">{product.nameProduct} {product.priceProduct}TND</p>
                                    </IonCardHeader>
                                    <IonCardContent className={styles.categoryCardContent}>
                                        <div className={styles.priceProduct}>
                                            <IonRow style={{ justifyContent: 'space-between', marginTop: '2em' }}>
                                                <IonButton size="large" color="danger" style={{ width: '9em' }}
                                                    onClick={() =>
                                                        present({
                                                            header: 'Confirm Delete ?',
                                                            message: 'Are you sure you want to delete this product?',
                                                            buttons: [
                                                                {
                                                                    text: 'Delete Product',
                                                                    role: 'destructive',
                                                                    handler: () => handleDeleteProduct(),
                                                                },
                                                                {
                                                                    text: 'Cancel',
                                                                    role: 'cancel',
                                                                },
                                                            ],
                                                        })
                                                    }
                                                >
                                                    DELETE
                                                </IonButton>
                                                {product && (
                                                    <IonRouterLink routerLink={`/updateproduct/${id}`} state={{ product }}>
                                                        <IonButton size="large" color="success" style={{ width: '9em' }}>UPDATE</IonButton>
                                                    </IonRouterLink>
                                                )}

                                            </IonRow>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )}
            </IonContent>
            <IonToast
                isOpen={showToast}
                message="Product deleted successfully ! Redirecting to your store..."
                duration={2300}
                onDidDismiss={() => setShowToast(false)}
            />
        </IonPage>
    );
};

export default ProductDetail;

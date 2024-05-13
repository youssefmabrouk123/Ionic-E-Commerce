import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
    IonLabel, IonAlert,
    IonFab, IonFabButton,
    IonSelect, IonSelectOption,
    IonRow,
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonGrid,
    IonList,
    IonItem,
    IonHeader,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonToast,
} from '@ionic/react';
import { chevronBack } from "ionicons/icons";
import { Storage } from '@ionic/storage';
import { camera } from 'ionicons/icons';
import PhotoGallery from '../PhotoGallery';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

function AddProduct() {
    const [formData, setFormData] = useState({
        nameProduct: '',
        image: '',
        descriptionProduct: '',
        priceProduct: '',
        stockProduct: '',
        categoryId: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [categories, setCategories] = useState([]); // State to store fetched categories
    const history = useHistory(); // Import and initialize useHistory

    const { photos, takePhoto, deletePhoto } = usePhotoGallery();

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/category/all');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Fetch categories when component mounts

    const handleSubmit = async () => {
        try {
            if (!formData.nameProduct || !formData.priceProduct || !formData.stockProduct || !formData.categoryId) {
                setError("Please fill out all required fields.");
                throw new Error('Please fill out all required fields.');
            }

            const token = await storage.get("token");
            if (!token) throw new Error('Token not found');
            const response = await axios.post('http://localhost:8080/users/products/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            console.log("Product added successfully ! Redirecting to store....");

            setSuccessMessage('Product added successfully!'); // Display success message

            // Redirect to /dashboard route after 2 seconds
            setTimeout(() => {
                history.push('/store');
            }, 1200);
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
                        <IonButton color="dark" routerLink="/store" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBack} />
                            &nbsp; <b>My store</b>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" scrollY={false}>
                <img alt="avatar" src="../../assets/prdct.png" style={{ width: '16em', height: '15em', display: 'block', margin: '0 auto' }} />

                <IonGrid className="signin-container" style={{ marginTop: '2em' }}>
                    <IonList>
                        <IonItem>
                            <IonInput
                                name="nameProduct"
                                value={formData.nameProduct}
                                onIonChange={handleInputChange}
                                label="Product Name"
                                placeholder="Enter product name*"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                name="descriptionProduct"
                                value={formData.descriptionProduct}
                                onIonChange={handleInputChange}
                                label="Description"
                                placeholder="Enter description*"
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                name="priceProduct"
                                value={formData.priceProduct}
                                onIonChange={handleInputChange}
                                label="Price"
                                type="number"
                                placeholder="Enter price*"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                name="stockProduct"
                                value={formData.stockProduct}
                                onIonChange={handleInputChange}
                                label="Stock"
                                placeholder="Enter stock"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonSelect
                                aria-label="Category"
                                interface="popover"
                                placeholder="Select Category*"
                                name="categoryId"
                                value={formData.categoryId}
                                onIonChange={handleInputChange} required
                            >
                                {categories.map(category => (
                                    <IonSelectOption key={category.id} value={category.id}>{category.name}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonButton id="present-alert">Images of the product</IonButton>
                            <IonAlert
                                trigger="present-alert"
                                header="A Short Title Is Best"
                                message="A message should be a short, complete sentence."
                                buttons={['Action']}
                            ></IonAlert>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Images :</IonLabel>
                            <PhotoGallery photos={photos} deletePhoto={deletePhoto} />
                            <IonFabButton onClick={() => takePhoto()} >
                                <IonIcon icon={camera}></IonIcon>
                            </IonFabButton>
                        </IonItem>

                    </IonList>
                </IonGrid>

                <IonRow style={{ justifyContent: 'space-between', marginTop: "1.5em" }}>
                    <IonButton color="danger" style={{ width: '7em' }} routerLink="/store" routerDirection="back" >Cancel</IonButton>
                    <IonButton color="primary" style={{ width: '7em' }} onClick={handleSubmit}>Add Product</IonButton>
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
                    duration={3000}
                    onDidDismiss={() => setSuccessMessage('')}
                />

            </IonContent>
        </IonPage>
    );
}

export default AddProduct;

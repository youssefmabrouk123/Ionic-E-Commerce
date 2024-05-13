import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
    IonSelect, IonSelectOption,
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
    IonToast,
    IonTitle
} from '@ionic/react';
import { chevronBack } from "ionicons/icons";
import { Storage } from '@ionic/storage';

function UpdateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        descriptionProduct: '',
        price: '',
        stockProduct: '',
        categoryId: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [categories, setCategories] = useState([]); // State to store fetched categories
    const history = useHistory(); // Initialize useHistory
    const location = useLocation(); // Get location object
    // const product = location.state && location.state.product;
    const [product, setProduct] = useState(null);
    const { id } = useParams();


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
                    console.log("product");
                    console.log(product);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [id, storage]);

    useEffect(() => {
        if (product) {
            // Populate formData state with product data
            setFormData({
                name: product.nameProduct || '',
                descriptionProduct: product.descriptionProduct || '',
                price: product.price || '',
                stockProduct: product.stockProduct || '',
                categoryId: product.categoryId || ''
            });
        }
    }, [product]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


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

    console.log(product);


    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.price || !formData.stockProduct || !formData.categoryId) {
                setError("Please fill out all required fields.");
                throw new Error('Please fill out all required fields.');
            }

            const token = await storage.get("token");
            if (!token) throw new Error('Token not found');

            const response = await axios.post(`http://localhost:8080/users/products/update/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            console.log("Product updated successfully!");

            setSuccessMessage('Product updated successfully!');

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
                    <IonTitle>Update product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" scrollY={false}>
                <img alt="avatar" src="/assets/update.webp" style={{ width: '16em', height: '15em', display: 'block', margin: '0 auto' }} />
                <IonGrid className="signin-container" style={{ marginTop: '2em' }}>
                    <IonList>
                        <IonItem>
                            <IonInput name="name" value={formData.name} onIonChange={handleInputChange} label="Text input" placeholder="Products's name" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="descriptionProduct" value={formData.descriptionProduct} onIonChange={handleInputChange} label="descriptionProduct input" placeholder="Description of the product" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="price" value={formData.price} onIonChange={handleInputChange} label="price input" type="number" placeholder="Price" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput name="stockProduct" value={formData.stockProduct} onIonChange={handleInputChange} label="stockProduct input" placeholder="Stock" required ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonSelect aria-label="Category" interface="popover" placeholder="Select product's category" name="categoryId" value={formData.categoryId} onIonChange={handleInputChange}>
                                {categories.map(category => (
                                    <IonSelectOption key={category.id} value={category.id}>{category.name}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </IonList>
                </IonGrid>
                <IonRow style={{ justifyContent: 'space-between', marginTop: "1.5em" }}>
                    <IonButton color="danger" style={{ width: '7em' }} routerLink="/store" routerDirection="back" >Cancel</IonButton>
                    <IonButton color="primary" style={{ width: '7em' }} onClick={handleSubmit} state={{ product }} >Update</IonButton>
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

export default UpdateProduct;

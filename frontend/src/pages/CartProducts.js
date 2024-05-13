import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { IonAlert, IonAvatar, IonBadge, IonButton, IonButtons, IonCardSubtitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cart, checkmarkSharp, chevronBackOutline, trashOutline } from "ionicons/icons";
import styles from "./CartProducts.module.css";
import { CartStore, removeFromCart } from "../data/CartStore";
import { ProductStore } from "../data/ProductStore";
import localforage from 'localforage';

const CartProducts = () => {
    const cartRef = useRef();
    const products = ProductStore.useState(s => s.products);
    const shopCart = CartStore.useState(s => s.product_ids);
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [storage, setStorage] = useState(null);
    const [userData, setUserData] = useState();
    //const shopCart = CartStore.useState(s => s.product_ids);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [numero, setNumero] = useState("");
    useEffect(() => {
        console.log("Updated Invoice details:", { name, email, address, numero });
    }, [name, email, address, numero]);

    useEffect(() => {
        const getCartProducts = () => {
            let tempCartProducts = [];
            let tempTotal = 0;
            shopCart.forEach(product => {
                const [categorySlug, productId] = product.split("/");
                const tempCategory = products.find(p => p.slug === categorySlug);
                if (tempCategory) {
                    const tempProduct = tempCategory.products.find(p => p.id === parseInt(productId));
                    if (tempProduct) {
                        const tempCartProduct = {
                            category: tempCategory,
                            product: tempProduct
                        };
                        tempCartProducts.push(tempCartProduct);
                        tempTotal += parseFloat(tempProduct.price.replace("£", ""));
                    }
                }
            });
            setCartProducts(tempCartProducts);
            setTotal(tempTotal);
        };
        getCartProducts();
    }, [shopCart, products]);

    const removeProductFromCart = (index) => {
        const productId = shopCart[index];
        removeFromCart(productId);
    };

    const handleCheckout = () => {
        setShowAlert(true);
    };

    useEffect(() => {
        const initializeStorage = async () => {
            try {
                const storageInstance = localforage.createInstance({
                    name: 'yourStorageName', // Provide a name for your storage
                    storeName: 'yourStoreName' // Provide a name for your store
                });
                await storageInstance.ready(); // Ensure storage is ready before proceeding
                setStorage(storageInstance);
            } catch (error) {
                console.error('Error initializing storage:', error);
                // Handle error scenarios
            }
        };

        initializeStorage();
    }, []);

    console.log("storage");
    console.log(storage);

    console.log(cartProducts);

    // Assuming cartProducts is your array of products
    const cartProductIds = cartProducts.map(product => product.product.id);
    console.log(cartProductIds);

    const handleAlertConfirm = async () => {
        try {
            console.log("!!!", name);
            const invoiceDetails = { name, email, address, numero, cartProducts };
            console.log("Invoice details:", invoiceDetails);
            const token = await storage.get("token");

            const response = await axios.post('http://localhost:8080/users/commands/add', invoiceDetails, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Command added successfully:', response.data);
            setShowAlert(false);
            // You can perform any additional actions here after successfully adding the command
        } catch (error) {
            console.error('Error adding command:', error);
            // Handle error here (e.g., show error message)
        }
    };


    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" routerLink="/" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Categories
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Cart</IonTitle>
                    <IonButtons slot="end">
                        <IonBadge color="dark">{shopCart.length}</IonBadge>
                        <IonButton color="dark">
                            <IonIcon ref={cartRef} className="animate__animated" icon={cart} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonRow className="ion-text-center ion-margin-top">
                    <IonCol size="12">
                        <IonNote>{cartProducts.length} {cartProducts.length !== 1 ? "products" : "product"} found</IonNote>
                    </IonCol>
                </IonRow>

                <IonList>
                    {cartProducts.map((product, index) => (
                        <IonItemSliding key={index}>
                            <IonItem lines="none" detail={false}>
                                <IonAvatar>
                                    <IonImg src={product.product.image} />
                                </IonAvatar>
                                <IonLabel className="ion-padding-start ion-text-wrap">
                                    <p>{product.category.name}</p>
                                    <h4>{product.product.name}</h4>
                                </IonLabel>
                                <div className={styles.cartActions}>
                                    <IonBadge color="dark">{product.product.price}</IonBadge>
                                    <IonButton fill="clear" color="danger" onClick={() => removeProductFromCart(index)}>
                                        <IonIcon icon={trashOutline} slot="icon-only" />
                                    </IonButton>
                                </div>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>

            <IonFooter className={styles.cartFooter}>
                <div className={styles.cartCheckout}>
                    <IonCardSubtitle>£{total.toFixed(2)}</IonCardSubtitle>
                    <IonButton color="dark" onClick={handleCheckout}>
                        <IonIcon icon={checkmarkSharp} />&nbsp;Checkout
                    </IonButton>
                </div>
            </IonFooter>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Enter Invoice Details"
                inputs={[
                    {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Name',
                        value: name,
                        onIonChange: (e) => setName(() => e.target.value)
                    },
                    {
                        name: 'email',
                        type: 'email',
                        placeholder: 'Email',
                        value: email,
                        onIonChange: (e) => setEmail(() => e.target.value)
                    },
                    {
                        name: 'address',
                        type: 'text',
                        placeholder: 'Address',
                        value: address,
                        onIonChange: (e) => setAddress(() => e.target.value)
                    },
                    {
                        name: 'numero',
                        type: 'tel',
                        placeholder: 'Telephone',
                        value: numero,
                        onIonChange: (e) => setNumero(() => e.target.value)
                    }
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setShowAlert(false)
                    },
                    {
                        text: 'Confirm',
                        handler: handleAlertConfirm
                    }
                ]}
            />
        </IonPage>
    );
}

export default CartProducts;

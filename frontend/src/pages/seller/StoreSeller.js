import { useEffect, useState } from 'react';
import {
    IonAvatar, IonNote, IonBadge, IonButton, IonButtons, IonSearchbar,
    IonLabel, IonSpinner, IonItem, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar
} from '@ionic/react';
import { addOutline, bagCheckOutline } from 'ionicons/icons';
import axios from 'axios';
import { useSeller } from '../../context/AuthSellerContext';
import { Storage } from '@ionic/storage';

const StoreSeller = () => {
    const { seller, isLoading, checkAuthSeller } = useSeller();
    const [storage, setStorage] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const initializeStorage = async () => {
            const storageInstance = new Storage();
            await storageInstance.create();
            setStorage(storageInstance);
            await checkAuthSeller(); // Check seller authentication status
        };

        initializeStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await storage.get("token");
                const response = await axios.get('http://localhost:8080/users/products/seller', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            }
        };

        if (seller && storage) {
            fetchData();
        }
    }, [seller, storage]);


    // Filter products based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.nameProduct && product.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);


    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {seller ? (
                            <IonRouterLink routerLink="/sellerprofile" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                                <IonAvatar aria-hidden="true">
                                <img alt="user img" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                            </IonRouterLink>
                        ) : (
                            <IonRouterLink routerLink="/signinasseller" style={{ textDecoration: 'none', color: 'inherit', padding: '0' }}>
                                <IonAvatar aria-hidden="true">
                                <img alt="user img" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                </IonAvatar>
                            </IonRouterLink>
                        )}

                        {(seller != null) && (
                            <IonRouterLink routerLink="/sellerprofile">
                                <IonNote size="large" style={{ color: 'blue', padding: '1em', fontSize: "1.15em" }}><b>Hi, {seller.firstname.charAt(0).toUpperCase() + seller.firstname.slice(1)} {seller.lastname.toUpperCase()}</b></IonNote>
                            </IonRouterLink>
                        )}
                    </div>
                    <IonButton size="medium" color="success" routerLink="/addproduct" slot="end">
                        <IonIcon icon={addOutline} />
                        <IonLabel>Add a product</IonLabel>
                    </IonButton>

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Products</IonTitle>
                        <IonButton size="medium" color="warning" slot="end">
                            <IonIcon icon={bagCheckOutline} />
                            <IonLabel ><b>Orders</b></IonLabel>
                        </IonButton>
                    </IonToolbar>
                    <IonSearchbar showCancelButton="focus" placeholder="Search a product" value={searchQuery} onIonChange={handleSearchInputChange}></IonSearchbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        {filteredProducts.map((product, index) => (
                            <IonCol key={`product_list_${index}`}>
                                <IonRouterLink routerLink={`/product/${product.idProduct}`} state={{ product }}>
                                    <IonCard>
                                        <img src={product.image} alt="product cover" />
                                        <IonCardContent className="categoryCardContent">
                                            <IonCardSubtitle>{`${product.nameProduct} ${product.priceProduct}`}</IonCardSubtitle>
                                            <IonCardSubtitle>{product.stockProduct}</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </IonRouterLink>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default StoreSeller;

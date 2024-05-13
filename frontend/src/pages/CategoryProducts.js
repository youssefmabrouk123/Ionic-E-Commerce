import {
    IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
    IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar
} from "@ionic/react";
import { cart, chevronBackOutline, heart ,searchOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import ProductCard from "../components/ProductCard";
import { FavouritesStore } from '../data/FavouritesStore';

import { CartStore } from "../data/CartStore";
import { ProductStore } from "../data/ProductStore";

import styles from "./CategoryProducts.module.css";

const CategoryProducts = () => {
    const params = useParams();
    const cartRef = useRef();
    const products = ProductStore.useState(s => s.products);
    const favourites = FavouritesStore.useState(s => s.product_ids);
    const shopCart = CartStore.useState(s => s.product_ids);
    const [category, setCategory] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [amountLoaded, setAmountLoaded] = useState(6);

    useEffect(() => {
        const categorySlug = params.slug;
        const tempCategory = products.find(p => p.slug === categorySlug); // Changed to find method
        if (tempCategory) {
            setCategory(tempCategory);
            setSearchResults(tempCategory.products || []); // Added a check for products
        }
    }, [params.slug, products]);

    const fetchMore = async (e) => {
        setAmountLoaded(prevAmount => prevAmount + 6);
        e.target.complete();
    }

    const search = async e => {
        const searchVal = e.target.value;
        if (searchVal !== "") {
            const tempResults = category.products.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()));
            setSearchResults(tempResults);
        } else {
            setSearchResults(category.products);
        }
    }

    return (
        <IonPage id="category-page" className={styles.categoryPage}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" text={category.name} routerLink="/" routerDirection="back">
                            <IonIcon color="dark" icon={chevronBackOutline} />&nbsp;Categories
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{category.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonBadge color="danger">{favourites.length}</IonBadge>
                        <IonButton color="danger" routerLink="/favourites">
                            <IonIcon icon={heart} />
                        </IonButton>
                        <IonBadge color="dark">{shopCart.length}</IonBadge>
                        <IonButton color="dark" routerLink="/cart">
                            <IonIcon ref={cartRef} className="animate__animated" icon={cart} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar className={styles.search} onKeyUp={search} placeholder="Try 'high back'" searchIcon={searchOutline} animated={true} />
                <IonGrid>
                    <IonRow className="ion-text-center">
                        <IonCol size="12">
                            <IonNote>{searchResults.length} {searchResults.length !== 1 ? "products" : "product"} found</IonNote>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {searchResults.map((product, index) => (
                            (index <= amountLoaded && product && product.image) && // Added a check for product and product.image
                            <ProductCard key={`category_product_${index}`} product={product} index={index} cartRef={cartRef} category={category} />
                        ))}
                    </IonRow>
                </IonGrid>
                <IonInfiniteScroll threshold="100px" onIonInfinite={fetchMore}>
                    <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Fetching more..." />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
}

export default CategoryProducts;

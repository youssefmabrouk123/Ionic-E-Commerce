import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cart, heart, cameraOutline, chevronBack, chevronBackOutline } from "ionicons/icons";
import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import { useUser } from "../context/authContext";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Profile = () => {
  const products = ProductStore.useState((s) => s.products);
  const favourites = FavouritesStore.useState((s) => s.product_ids);
  const shopCart = CartStore.useState((s) => s.product_ids);
  const { clearStorage } = useUser();
  const [storage, setStorage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const data = await storage.get("user");
      console.log(data);
      if (data) {
        setUserData(data);
      }
      setLoading(false);
    };

    initializeStorage();
  }, [loading]);

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (userData) {
        try {
          const response = await axios.get(`http://localhost:8080/user/image/${userData.id}`, {
            responseType: 'arraybuffer',
          });
          const base64String = btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
          );
          setUserPhoto(`data:image/jpeg;base64,${base64String}`);
        } catch (error) {
          console.error('Error fetching user photo:', error);
        }
      }
    };

    fetchUserPhoto();
  }, [loading, userData]);

  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const token = await storage.get("token");
      console.log(token);
      if (token) {
        setAuth(true);
      }
    };

    initializeStorage();
  }, []);

  const logout = () => {
    clearStorage();
    history.push('/signIn');
  };

  const navigateToUpdatePhoto = () => {
    history.push(`/updatephoto/${userData.id}`);
  };

  if (auth) {
    return (
      <IonPage id="home-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="dark"
                text="Home"
                routerLink="/"
                routerDirection="back"
                > 
                <IonIcon color="dark" icon={chevronBackOutline} /> &nbsp;
                Home
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonBadge color="danger">{favourites.length}</IonBadge>
              <IonButton color="danger" routerLink="/favourites">
                <IonIcon icon={heart} />
              </IonButton>
              <IonBadge color="dark">{shopCart.length}</IonBadge>
              <IonButton color="dark" routerLink="/cart">
                <IonIcon icon={cart} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="12" className="ion-text-center">
                <IonImg src={userPhoto} />
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="auto">
                <IonCard>
                  <IonCardContent>
                    {userData && (
                      <div>
                        <IonLabel>First Name:</IonLabel>
                        <IonItem>
                          <IonLabel>{userData.firstname}</IonLabel>
                        </IonItem>
                        <IonLabel>Last Name:</IonLabel>
                        <IonItem>
                          <IonLabel>{userData.lastname}</IonLabel>
                        </IonItem>
                        <IonLabel>Email:</IonLabel>
                        <IonItem>
                          <IonLabel>{userData.email}</IonLabel>
                        </IonItem>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="auto">
                <IonButton color="primary" onClick={navigateToUpdatePhoto}>
                  <IonIcon icon={cameraOutline} slot="start" />
                  Update Photo
                </IonButton>
              </IonCol>
              <IonCol size="auto">
                <IonButton color="danger" onClick={logout}>
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  } else {
    history.push("/signIn");
    return null;
  }
};

export default Profile;

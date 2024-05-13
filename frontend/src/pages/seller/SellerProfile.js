import { useEffect, useState } from "react";
import {
  IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar,
} from "@ionic/react";
import { chevronBack , cameraOutline} from "ionicons/icons";
import { useSeller } from '../../context/AuthSellerContext';
import { useHistory } from "react-router-dom";
import { Storage } from "@ionic/storage";
import { addOutline, createOutline, logOutOutline } from 'ionicons/icons';

const SellerProfile = () => {
  const { clearStorage } = useSeller();
  const [storage, setStorage] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const initializeStorage = async () => {
      const storageInstance = new Storage();
      await storageInstance.create();
      setStorage(storageInstance);
      const data = await storageInstance.get("seller");
      setSellerData(data);
      setLoading(false);
    };

    initializeStorage();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await storage.get("token");
      setAuth(!!token);
    };

    if (storage) {
      checkAuthentication();
    }
  }, [storage]);

  const logout = () => {
    clearStorage();
    history.push("/signinasseller");
  };

  // const navigateToUpdatePhoto = () => {
  //   history.push(`/updatephoto/${sellerData.id}`);
  // };

  if (auth) {
    return (
      <IonPage id="home-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="dark" routerLink="/store" routerDirection="back">
                <IonIcon color="dark" icon={chevronBack} />
                &nbsp; <b>My Store</b>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile</IonTitle>
              <IonButton color="primary" routerLink="/updateprofile" slot="end">
                <IonIcon icon={addOutline} />
                <IonBadge color="blue" ><b>Update profile</b></IonBadge>
              </IonButton>
            </IonToolbar>
          </IonHeader>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <IonGrid>
              <IonPage>
                <IonHeader>
                  <IonToolbar>
                    <IonButton color="success" routerLink="/addseller" slot="end">
                      <IonIcon icon={createOutline} />
                      <IonBadge color="blue" ><b>Update Profile</b></IonBadge>
                    </IonButton>
                  </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                  {" "}
                  <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <h2></h2>
                    {(sellerData != null) && (
                      <div >
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel><b>First Name: </b></IonLabel>
                          <IonLabel style={{ textAlign: "center", margin: "1.2em" }}>
                            {sellerData.firstname}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Last Name: </b>
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {sellerData.lastname}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Email: </b>
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {sellerData.email}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Address: </b>{" "}
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {sellerData.address}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Phone number: </b>{" "}
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {sellerData.number}
                          </IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonButton color="primary" style={{ marginLeft:'35%' }}>
                            <IonIcon icon={cameraOutline} slot="start" />
                            Update Photo
                          </IonButton>
                        </IonItem>

                      </div>
                    )}
                  </div>

                </IonContent>
                <IonButton size="medium" color='danger' onClick={() => logout()} style={{ color: 'blue', margin: '1.6em', fontSize: '1.2em' }}
                >
                  <IonIcon icon={logOutOutline} size="medium" />
                  <IonLabel >Logout</IonLabel>
                </IonButton>
              </IonPage>


            </IonGrid>

          )}

        </IonContent>
      </IonPage>
    );
  } else {
    history.push("/signInasseller");
    return null;
  }
};

export default SellerProfile;

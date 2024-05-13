import { useEffect, useState } from "react";
import {
  IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar,
} from "@ionic/react";
import { cart, cartOutline, chevronBackOutline, heart } from "ionicons/icons";
import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import { useAdmin } from "../context/authAdminContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Storage } from "@ionic/storage/dist/esm";

import { chevronBack } from 'ionicons/icons';


const ProfilAdmin = () => {
  const { clearStorage } = useAdmin();
  const [storage, setStorage] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [auth, setAuth] = useState(true);


  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const data = await storage.get("admin");
      console.log(data);
      setAdminData(() => data);
      setLoading(false);
      console.log("adminDataprofil");
      console.log(adminData);
    };

    initializeStorage();
  }, [loading]);


  useEffect(() => {
    const initializeStorage = async () => {
      const storage = new Storage();
      await storage.create();
      setStorage(storage);
      const token = await storage.get("token");
      console.log(token)
      if (token) {
        setAuth((e) => true);

      }
      console.log(auth)

    };

    initializeStorage();
  }, [auth]);

  const logout = () => {
    clearStorage();

    history.push('/signinasadmin');
  }

  if (auth) {
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

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <IonGrid>
              <IonPage>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                  {" "}
                  <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <h2></h2>
                    {(adminData != null) && (
                      <div >
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel><b>First Name: </b></IonLabel>
                          <IonLabel style={{ textAlign: "center", margin: "1.2em" }}>
                            {adminData.firstname}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Last Name: </b>
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {adminData.lastname}
                          </IonLabel>
                        </IonItem>
                        <IonItem style={{ textAlign: "center", margin: "1.2em" }}>
                          <IonLabel style={{ textAlign: "center" }}>
                            <b>Email: </b>{" "}
                          </IonLabel>
                          <IonLabel style={{ textAlign: "center" }}>
                            {adminData.email}
                          </IonLabel>
                        </IonItem>

                      </div>
                    )}
                  </div>

                </IonContent>
                <IonButton onClick={() => logout()} style={{ color: 'blue', margin: '1.6em', fontSize: '1.2em' }}
                >
                  <b>Log Out</b>
                </IonButton>
              </IonPage>


            </IonGrid>

          )}

        </IonContent>
      </IonPage>
    );
  } else { history.push("/signInasadmin"); }
};

export default ProfilAdmin;

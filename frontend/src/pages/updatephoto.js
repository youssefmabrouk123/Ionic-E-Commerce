
import {
 
  IonToast,
  IonThumbnail,
} from "@ionic/react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cart, cartOutline, chevronBackOutline, heart, cameraOutline } from "ionicons/icons";
import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import { useUser } from "../context/authContext";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";


const UpdatePhoto = ({ match }) => {
  const userId = match.params.id;
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // To display the selected photo
  const history = useHistory();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPhotoURL(URL.createObjectURL(event.target.files[0]));
  };


  const handleTakePhoto = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" } // Use the rear camera (if available)
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      await videoElement.play();
  
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d").drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob(blob => {
        setFile(blob);
        setPhotoURL(URL.createObjectURL(blob));
      }, "image/jpeg");
  
      stream.getVideoTracks().forEach(track => track.stop()); // Stop video stream
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const handleSubmit = async () => {
    if (!file) {
      setToastMessage("Please select or take a photo to update.");
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(`http://localhost:8080/user/up/${userId}`, formData);
      setToastMessage(response.data);
      setShowToast(true);

      history.push('/profile')
    } catch (error) {
      setToastMessage("Error updating user: " + error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="dark"
                text="Home"
                routerLink="/profile"
                routerDirection="back"
              >
                <IonIcon color="dark" icon={chevronBackOutline}/>
                &nbsp;Profile
              </IonButton>
            </IonButtons>
            {/* <IonButtons slot="end">
              <IonBadge color="danger">{favourites.length}</IonBadge>
              <IonButton color="danger" routerLink="/favourites">
                <IonIcon icon={heart} />
              </IonButton>
              <IonBadge color="dark">{shopCart.length}</IonBadge>
              <IonButton color="dark" routerLink="/cart">
                <IonIcon icon={cart} />
              </IonButton>
            </IonButtons> */}
          </IonToolbar>      </IonHeader>

      <IonContent >
        {photoURL && (
          <IonThumbnail>
            <img src={photoURL} alt="Selected" />
          </IonThumbnail>
        )}
<IonRow style={{ marginTop: '45%' }}>
        <IonItem >
          <IonLabel>Select Image</IonLabel>
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
          <IonButton onClick={handleTakePhoto} >
          Take Photo</IonButton>
        </IonItem>
        </IonRow>

        <IonRow className="ion-justify-content-center" style={{ marginTop: '8%' }}>

        <IonButton onClick={handleSubmit} >Update</IonButton>
        </IonRow>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
      
    </IonPage>
  );
};

export default UpdatePhoto;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { IonPage, IonContent, IonItem, IonButton, IonThumbnail, IonToast } from '@ionic/react';
// import { usePhotoGallery } from '../pages/hooks/usePhotoGallery'; 

// const UpdatePhoto = ({ match }) => {
//   const userId = match.params.id;
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const { takePhoto, photos } = usePhotoGallery();

//   const handleSubmit = async () => {
//     if (!photos.length) {
//       setToastMessage("Please select or take a photo to update.");
//       setShowToast(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", photos); // Use the first photo in the array

//     try {
//       const response = await axios.put(`http://localhost:8080/user/up/${userId}`, formData);
//       console.log(response.data)
//       setToastMessage(response.data);
//       setShowToast(true);
//     } catch (error) {
//       console.error("Error updating user:", error); // Log detailed error for debugging
//       setToastMessage("Error updating user. Please check server logs for details.");
//       setShowToast(true);
//     }
//   };

//   return (
//     <IonPage>
//       <IonContent>
       
//           <IonThumbnail>
//             <img src={photo.webviewPath} alt="Selected" />
//           </IonThumbnail>
//         <IonItem>
//           <IonButton onClick={takePhoto}>Take Photo</IonButton>
//         </IonItem>
//         <IonButton onClick={handleSubmit}>Update</IonButton>
//         <IonToast
//           isOpen={showToast}
//           onDidDismiss={() => setShowToast(false)}
//           message={toastMessage}
//           duration={3000}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default UpdatePhoto;

import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { camera } from 'ionicons/icons';
import PhotoGallery from './PhotoGallery';
import { usePhotoGallery } from '../pages/hooks/usePhotoGallery';

const Camera = () => {
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ionic Photo Gallery</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <PhotoGallery photos={photos} deletePhoto={deletePhoto} />

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => takePhoto()}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Camera;

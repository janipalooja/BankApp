import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
  import React from 'react';
  import './Accounts.css';
  import TabBar from '../components/TabBar';
  
  
  class Funds extends React.Component {

    render() {
        return (
          <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Rahastot</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding-horizontal">

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Rahasto</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Sinulla ei ole rahastosijoituksia.
              </IonCardContent>
            </IonCard>
              
              </IonContent>

              <TabBar/>
              
          </IonPage>
        )
      }
  };
  
  export default Funds;
  
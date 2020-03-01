import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
  import React from 'react';
  import './Accounts.css';
  import TabBar from '../components/TabBar';
  
  
  class Cards extends React.Component {

    render() {
        return (
          <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Kortit</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding-horizontal">

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Tiliisi liitetyt kortit</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Tiliisi ei ole liitetty yhään korttia.
              </IonCardContent>
            </IonCard>
              
              </IonContent>

              <TabBar/>
              
          </IonPage>
        )
      }
  };
  
  export default Cards;
  
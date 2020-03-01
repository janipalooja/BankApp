import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
  import React from 'react';
  import './Accounts.css';
  import TabBar from '../components/TabBar';
  
  
  class Loans extends React.Component {

    render() {
        return (
          <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lainat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding-horizontal">

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Lainat</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Sinulla ei ole maksamattomia lainoja.
              </IonCardContent>
            </IonCard>
              
              </IonContent>

              <TabBar/>
              
          </IonPage>
        )
      }
  };
  
  export default Loans;
  
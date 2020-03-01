import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/react';
  import React from 'react';
  import './Accounts.css';
  import TabBar from '../components/TabBar';
  
  
  class More extends React.Component {

    constructor(props) {
      super(props);
      this.presentAlertConfirm = this.presentAlertConfirm.bind(this);
    }

    presentAlertConfirm() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Kirjaudu ulos';
      alert.message = 'Oletko varma, että haluat kirjautua ulos?';
      alert.buttons = [
        {
          text: 'Ei',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Kylla',
          handler: () => {
            this.props.history.push("home");
          }
        }
      ];
    
      document.body.appendChild(alert);
      return alert.present();
    }

    render() {
        return (
          <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lisää</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding-vertical">
            <IonList>
      <IonItem button onClick={this.presentAlertConfirm}>
        <IonLabel>Kirjaudu ulos</IonLabel>
      </IonItem>
    </IonList>
              </IonContent>

              <TabBar/>
              
          </IonPage>
        )
      }
  };
  
  export default More;
  
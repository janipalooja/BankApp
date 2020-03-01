import { IonContent, IonItem, IonPage, IonLabel, IonInput, IonButton } from '@ionic/react';
import React from 'react';
import './Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loading = document.createElement('ion-loading');
  }

  presentAlert(msg) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Virhe';
    alert.message = msg;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }

  async presentLoading() {
    this.loading.message = 'Odota...';
  
    document.body.appendChild(this.loading);
    await this.loading.present();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {

      if(formData.get("username").length > 1 || formData.get("password").length > 1) {

      fetch('https://whispering-headland-79777.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      }, this.presentLoading())
      
      .then(res => res.json())
        .then((response) => {
          if(response != null){
          if(response._id != null || response._id !== "") {
            this.loading.dismiss();
            this.props.history.push({
              pathname: '/Accounts',
              data: { _id: response._id, name: response.name }
            })
          }
        }
        else {
          this.loading.dismiss();
          this.presentAlert("Väärä käyttäjätunnus tai salasana.");
        }
        })

      }
      // If required fields are not filled...
      else {
        this.presentAlert("Anna käyttäjätunnus ja salasana.");
      }

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <IonPage>
        <IonContent class="ion-padding-horizontal">
          <h1 className="logo">Ionic + React<br/>BankApp</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <IonItem class="ion-margin-vertical">
              <IonLabel position="floating">Käyttäjätunnus</IonLabel>
              <IonInput type="text" id="username" name="username"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Salasana</IonLabel>
              <IonInput type="password" id="password" name="password"></IonInput>
            </IonItem>
              <IonButton type="submit" expand="block" class="ion-margin-vertical" size="medium">Kirjaudu sisään</IonButton>
          </form>
          </IonContent>
      </IonPage>
    )
  }
};

export default Home;

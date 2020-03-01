import React from 'react';
import { IonAlert, IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption} from '@ionic/react';

  export default class NewPayment extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          showModal: false,
          showAlert1: false
          };
      }

      userId = this.props.userId
      name = this.props.name

      state = {
        loading: true
      }

    async componentDidMount() {
        const url = "https://whispering-headland-79777.herokuapp.com/api/accounts/"+ this.userId;
            const response = await fetch(url);
            const data = await response.json();
        setTimeout(() => {
            this.setState({accounts: data, loading: false});
          }, 1000);
    }

      async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
          fetch('https://whispering-headland-79777.herokuapp.com/api/transactions', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: data.get("from"),
              to: data.get("to"),
              payee: data.get("payee"),
              payer: this.name,
              amount: data.get("amount")
            })
          })
          .then(response => {
            if(response.ok) {
            this.setState({ showAlert1: true })
          }
        })
        } catch (e) {
          console.error(e);
        }
      }


  render() {
  return (
    <>
      <IonModal isOpen={this.state.showModal}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Uusi maksu</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => this.setState({ showModal: false })}>
              <IonIcon name="close" slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

      <form onSubmit={e => this.handleSubmit(e)} action="post">

      <IonItem>
        <IonLabel>Tililtä</IonLabel>
        {this.state.loading || !this.state.accounts ? (
                <p className="textLoading">Ladataan, odota hetki...</p>
            ) : (
              <IonSelect id="from" name="from">
                    {this.state.accounts.map((account, index) => {
                        return <IonSelectOption key={account._id} value={account.accountNumber}>
                            {account.accountNumber}
                        </IonSelectOption>
                    })}
              </IonSelect>
              
            )}
      </IonItem>

            <IonItem>
                <IonLabel position="floating">Saajan nimi:</IonLabel>
                <IonInput id="payee" name="payee" placeholder="Matti Meikäläinen"></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">Saajan tilinumero:</IonLabel>
                <IonInput id="to" name="to" placeholder="FI1122223333444455"></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">Summa:</IonLabel>
                <IonInput id="amount" name="amount" placeholder="0.00"></IonInput>
            </IonItem>

            <IonButton type="submit" color="success" expand="block" class="ion-margin">
                MAKSA
            </IonButton>
        </form>

      </IonContent>
      </IonModal>
      <IonButton color="primary" expand="block" class="ion-margin" onClick={() => this.setState({ showModal: true })}>
          UUSI MAKSU
      </IonButton>

      <IonAlert
          isOpen={this.state.showAlert1}
          header={'Maksu onnistui'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                this.setState({ showAlert1: false })
                this.setState({ showModal: false })
              }
            }
          ]}
        />

    </>
  );
  }
};
import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import './Transactions.css';
import ListSkeletonLoader from '../components/ListSkeletonLoader';

class Transactions extends React.Component {

  accountNumber = this.props.location.data
  name = ""
  amount = ""

    state = {
        loading: true
    }

    async componentDidMount() {
        const url = "https://whispering-headland-79777.herokuapp.com/api/transactions/"+this.accountNumber;
        console.log("URL: "+url);
            const response = await fetch(url);
            const data = await response.json();
        setTimeout(() => {
            this.setState({transactions: data, loading: false});
          }, 1000);
    }

  render() {
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/accounts" />
          </IonButtons>
          <IonTitle>Tilitapahtumat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" >

      {this.state.loading || !this.state.transactions ? (
                <ListSkeletonLoader/>
            ) : (
                <IonList className="transactionList">
                    {this.state.transactions.map((transaction, index) => {
                      if(transaction.from === this.accountNumber) {
                        this.name = transaction.payee
                        this.amount = transaction.amount * -1
                      }
                      else {
                        this.name = transaction.payer
                        this.amount = transaction.amount
                      }
                        return <IonItem color="light" key="{transaction._id}"><IonLabel>{this.name} <span className="amount">{this.amount} €</span></IonLabel></IonItem>
                    })}
              </IonList>
            )}

      </IonContent>
    </IonPage>
    )
  }
};

export default Transactions;

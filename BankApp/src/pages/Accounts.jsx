import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
  import React from 'react';
  import './Accounts.css';
  import TabBar from '../components/TabBar';
  import NewPayment from '../components/NewPayment';
  
  class Accounts extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    userId = this.props.location.data._id
    name = this.props.location.data.name

    state = {
      loading: true
    }
    
    async componentDidUpdate() {
      const url = "https://whispering-headland-79777.herokuapp.com/api/accounts/" + this.userId;
          const response = await fetch(url);
          const data = await response.json();
      setTimeout(() => {
          this.setState({accounts: data, loading: false});
        }, 1000);
    }

  async handleSubmit(e, accountNumber) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/accounts/transactions',
      data: accountNumber
    })
  }

    render() {
        return (
          <IonPage>
            <IonHeader>
                <IonToolbar>
              <IonTitle>Tilit</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding-horizontal">

            {this.state.loading || !this.state.accounts ? (
                <p className="textLoading">Ladataan, odota hetki...</p>
            ) : (
                <div>
                    {this.state.accounts.map((account, index) => {
                        return <IonCard onClick={e => this.handleSubmit(e, account.accountNumber)} key={account._id}>
                        <IonCardHeader>
                          <IonCardSubtitle>{account.accountName}</IonCardSubtitle>
                          <IonCardTitle>{account.accountNumber}</IonCardTitle>
                        </IonCardHeader>
                  
                        <IonCardContent>
                          Saldo: {account.accountBalance} €
                         </IonCardContent>
                      </IonCard>
                    })}
                    </div>
              
            )}

            <NewPayment userId={this.userId} name={this.name}/>
              
              </IonContent>

              <TabBar/>
              
          </IonPage>
        )
      }
  };
  
  export default Accounts;
  
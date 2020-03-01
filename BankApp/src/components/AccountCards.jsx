import React from 'react'
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

export default class AccountCards extends React.Component {

    state = {
        loading: true
    }

    async componentDidMount() {
        const url = "https://whispering-headland-79777.herokuapp.com/api/accounts";
            const response = await fetch(url);
            const data = await response.json();
        setTimeout(() => {
            this.setState({accounts: data, loading: false});
          }, 1000);
    }

    AccountCard(props) {
        return <h1>Hello, {props.userId}</h1>;
      }

    render() {
        return <>
            {this.state.loading || !this.state.accounts ? (
                <p className="textLoading">Ladataan, odota hetki...</p>
            ) : (
                <div>
                    {this.state.accounts.map((account, index) => {
                        return <IonCard key={account._id} routerLink="/accounts/transactions">
                        <IonCardHeader>
                          <IonCardSubtitle>{account.accountName} - {this.userId}</IonCardSubtitle>
                          <IonCardTitle>{account.accountNumber}</IonCardTitle>
                        </IonCardHeader>
                  
                        <IonCardContent>
                          Saldo: {account.accountBalance} €
                         </IonCardContent>
                      </IonCard>
                    })}
                    </div>
              
            )}
        </>
    }

}

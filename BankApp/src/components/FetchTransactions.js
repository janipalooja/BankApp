import React from 'react'
import { IonItem, IonLabel, IonList } from '@ionic/react';
import ListSkeletonLoader from './ListSkeletonLoader';

export default class FetchTransactions extends React.Component {

    accountNumber = this.props.location.data

    state = {
        loading: true
    }

    async componentDidMount() {
        const url = "https://whispering-headland-79777.herokuapp.com/api/transactions/FI1111111111111111";
            const response = await fetch(url);
            const data = await response.json();
        setTimeout(() => {
            this.setState({transactions: data, loading: false});
          }, 1000);
    }

    render() {
        return <div >
            {this.state.loading || !this.state.transactions ? (
                <ListSkeletonLoader/>
            ) : (
                <IonList className="transactionList">
                    {this.state.transactions.map((transaction, index) => {
                        return <IonItem color="light" key="{transaction._id}"><IonLabel>{this.accountNumber} # {transaction.payee} <span className="amount">{transaction.amount * -1} €</span></IonLabel></IonItem>
                    })}
              </IonList>
            )}
        </div>
    }

}
import React from 'react'
import { IonSelectOption, IonSelect } from '@ionic/react';

export default class FetchAccounts extends React.Component {

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

    render() {
        return <>
            {this.state.loading || !this.state.accounts ? (
                <p className="textLoading">Ladataan, odota hetki...</p>
            ) : (
                <IonSelect>
                    {this.state.accounts.map((account, index) => {
                        return <IonSelectOption key={account._id} value={account._id}>
                            {account.accountNumber}
                        </IonSelectOption>
                    })}
              </IonSelect>
              
            )}
        </>
    }

}

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Loans from './pages/Loans';
import Funds from './pages/Funds';
import More from './pages/More';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

class App extends React.Component {
  render() {
    return(
      <>
      <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/accounts" component={Accounts} exact={true}/>
        <Route path="/accounts/transactions" component={Transactions} />
        <Route path="/cards" component={Cards}/>
        <Route path="/loans" component={Loans}/>
        <Route path="/funds" component={Funds}/>
        <Route path="/more" component={More}/>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </>
    )
  }
}

export default App;

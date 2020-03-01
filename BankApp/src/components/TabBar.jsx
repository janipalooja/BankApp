import React from 'react';
import './TabBar.css';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { card, logoEuro, trendingUp, cash, ellipsisHorizontalOutline } from 'ionicons/icons';

class TabBar extends React.Component {
  render() {
    return (
      <IonTabBar slot="bottom">

          <IonTabButton tab="accounts" href="/accounts">
            <IonIcon icon={logoEuro} />
            <IonLabel>Tilit</IonLabel>
          </IonTabButton>

          <IonTabButton tab="cards" href="/cards">
            <IonIcon icon={card} />
            <IonLabel>Kortit</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="loans" href="/loans">
            <IonIcon icon={cash} />
            <IonLabel>Lainat</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="funds" href="/funds">
            <IonIcon icon={trendingUp} />
            <IonLabel>Rahastot</IonLabel>
          </IonTabButton>

          <IonTabButton tab="more" href="/more">
            <IonIcon icon={ellipsisHorizontalOutline} />
            <IonLabel>Lisää</IonLabel>
          </IonTabButton>
          
        </IonTabBar>
    )
  }
};

export default TabBar;

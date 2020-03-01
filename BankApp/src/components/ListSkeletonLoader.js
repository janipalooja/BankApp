import React from 'react'
import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';

export default class ListSkeletonLoader extends React.Component {
    
    render() {

        const elements = [1,2,3,4,5,6,7,8];
        return (
            <IonList className="transactionList" lines="none">
            {elements.map((value, index) => {
                return <div>
                    <IonItem color="light">
                    <IonLabel>
                        <h3>
                        <IonSkeletonText animated style={{ width: '50%' }} />
                        </h3>
                        <p>
                        <IonSkeletonText animated style={{ width: '80%' }} />
                        </p>
                        <p>
                        <IonSkeletonText animated style={{ width: '60%' }} />
                        </p>
                    </IonLabel>
                    </IonItem>
                </div>
            })}
            </IonList>
        )
    }
}
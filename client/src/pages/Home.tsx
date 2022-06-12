import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'http://localhost:3000/todos',
      );
      const json = await res.json();
      setItems(json);
    };

    fetchData();
  }, [setItems]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todo List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
           {items.map((item: any, idx: number) => (
            <IonItem key={idx}>
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

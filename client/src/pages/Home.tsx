import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonNote, IonChip, IonLabel } from '@ionic/react';
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
        <IonList class="list">
           {items.map((item: any, idx: number) => (
             <IonItem key={idx}>
              <div className="todo-item">
                <IonText class="todo-name">{item.name}</IonText>
                <IonText class="description">
                  {item.description}
                </IonText>
              </div>
              <IonNote slot="end">
                <IonChip color={item.IsDone ? 'success' : 'secondary'}>
                    <IonLabel color={item.IsDone ? 'success' : 'secondary'}>{item.IsDone ? 'Done' : 'In progress'}</IonLabel>
                  </IonChip>
                </IonNote>
             </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

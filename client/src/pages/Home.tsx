import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonNote, IonChip, IonLabel, useIonToast, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

interface TodoItem {
  name: string;
  description: string;
  isDone: boolean;
}

const Home: React.FC = () => {
  const [present] = useIonToast();
  const [items, setItems] = useState([]);

  const setStatus = async (id: number, isDone: boolean, index: number ) => {
    try {
      await fetch(
        `http://localhost:3000/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isDone }),
        }
      );
      present('Todo is updated successfully', 3000)
      
      const newItems = [...items]
      const changed: TodoItem = items[index]
      changed.isDone = isDone;
      setItems(newItems);
    }
    catch(e: unknown) {
      let msg = 'Unknown error. pleas try again'

      if (e instanceof Error) msg = e.message
      present(`There is something wrong: ${msg}`)
    }
  };

  const handleStatusClick = (id: number, isDone: boolean, index: number) => {
    setStatus(id, isDone, index);
    const slidingItem = document.getElementById(`slidingItem${index}`) as any
    slidingItem.close();
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'http://localhost:3000/todos',
      );
      const json = await res.json();
      setItems(json);
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Todo List (swipe left to right to update todo status)'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{'Todo List (swipe left to right to update todo status)'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList class="list">
           {items.map((item: any, idx: number) => (
             <IonItemSliding key={idx} id={`slidingItem${idx}`}>
              <IonItemOptions side="start">
                <IonItemOption onClick={() => handleStatusClick(item.id, !item.isDone, idx)}>{item.isDone ? 'Set to InProgres' : 'Set to Done'}</IonItemOption>
              </IonItemOptions>

              <IonItem>
              <div className="todo-item">
                <IonText class="todo-name">{item.name}</IonText>
                <IonText class="description">
                  {item.description}
                </IonText>
              </div>
              <IonNote slot="end">
                <IonChip color={item.isDone ? 'success' : 'secondary'}>
                    <IonLabel color={item.isDone ? 'success' : 'secondary'}>{item.isDone ? 'Done' : 'In progress'}</IonLabel>
                  </IonChip>
                </IonNote>
             </IonItem>
             </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

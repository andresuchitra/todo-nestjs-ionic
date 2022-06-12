import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Form from '../components/Form';

const CreateTodo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create new todo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create new todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Form name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default CreateTodo;

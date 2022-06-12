import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Form from '../components/Form';
interface FormData {
  name: string;
  description: string;
}

const CreateTodo: React.FC = () => {
  // const [present, dismiss] = useIonToast();
  const data: FormData = {
    name: '',
    description: '',
  }

  const submitData = (data: any ) => {
    // const res = await fetch(
    //   'http://localhost:3000/todos',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    // const result = await res.json()
  };
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
        <Form data={data} isEdit={false} callSubmit={submitData} />
      </IonContent>
    </IonPage>
  );
};

export default CreateTodo;

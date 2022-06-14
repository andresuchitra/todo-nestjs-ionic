import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import Form from '../components/Form';
import { useHistory } from "react-router-dom";

interface FormData {
  name: string;
  description: string;
}

const CreateTodo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();

  const data: FormData = {
    name: '',
    description: '',
  }

  const submitData = async (data: any ) => {
    try {
      await fetch(
        'http://localhost:3000/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      present('Todo is created successfully')
      history.push('/home')
    }
    catch(e: unknown) {
      let msg = 'Unknown error. pleas try again'

      if (e instanceof Error) msg = e.message
      present(`There is something wrong: ${msg}`, 3000)
    }
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

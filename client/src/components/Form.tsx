import { IonInput, IonItem, IonLabel, IonTextarea, IonButton } from '@ionic/react';
import { useState } from 'react';
import './Form.css';

interface FormProps {
  data: {
    name: string,
    description: string,
  };
  isEdit: boolean;
  callSubmit: Function;
}

const Form: React.FC<FormProps> = ({ data: any, isEdit, callSubmit }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [valid, setValid] = useState(false)

  const handleSubmit = (event: any) => {
    callSubmit({ name, description })
    event.preventDefault();
  }

  const handleName = (value: any) => {
    setName(value);
    if(value) {
      setValid(true)
    } else setValid(false)
  }

  return (
    <form className="ion-padding" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput value={name} onIonChange={e => handleName(e.detail.value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
      </IonItem>
      <IonButton className="ion-margin-top" type="submit" expand="block" disabled={!valid}>
        Submit
      </IonButton>
    </form>
  );
};

export default Form;

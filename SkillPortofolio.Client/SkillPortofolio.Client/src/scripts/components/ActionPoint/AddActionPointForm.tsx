import { TextField, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import './ActionPoint.scss';

interface APFormProps {
  handleActionPointCreation(actionPoint: IActionPoint): void;
}

const ActionPointForm: React.FC<APFormProps> = (props) => {
  const [actionPoint, setActionPoint] = React.useState<IActionPoint>({
    Title: '',
    Resources: '',
    Description: '',
  });

  const getErrorMessage = (value: string): string => {
    return value.length > 0 ? '' : 'Input required';
  };

  function createActionPoint(): void {
    props.handleActionPointCreation(actionPoint);
  }

  return (
    <div>
      <form className='container'>
        <TextField
          className='item'
          label='Title'
          required={true}
          value={actionPoint.Title}
          onGetErrorMessage={getErrorMessage}
          validateOnLoad={false}
          onChange={(_, title: string) =>
            setActionPoint({ ...actionPoint, Title: title ?? '' })
          }
        />
        <TextField
          className='item'
          label='Description'
          required={true}
          multiline={true}
          rows={3}
          value={actionPoint.Description}
          onGetErrorMessage={getErrorMessage}
          validateOnLoad={false}
          onChange={(_, description: string) =>
            setActionPoint({ ...actionPoint, Description: description ?? '' })
          }
        />
        <TextField
          className='item'
          label='Resorces'
          multiline={true}
          autoAdjustHeight={true}
          required={true}
          value={actionPoint.Resources}
          onGetErrorMessage={getErrorMessage}
          validateOnLoad={false}
          onChange={(_, resources: string) =>
            setActionPoint({ ...actionPoint, Resources: resources ?? '' })
          }
        />
        <PrimaryButton
          className='item__button'
          text='Submit'
          onClick={createActionPoint}
        />
      </form>
    </div>
  );
};
export default ActionPointForm;

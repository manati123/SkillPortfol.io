import { TextField, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import './ActionPoint.scss';

interface UpdateAPFormProps {
  currentActionPoint: IActionPoint;
  handleAPEdit(actionPoint: IActionPoint);
}

const UpdateActionPointForm: React.FC<UpdateAPFormProps> = (props) => {
  const [actionPoint, setActionPoint] = React.useState<IActionPoint>(
    props.currentActionPoint
  );
  const getErrorMessage = (value: string): string => {
    return value.length > 0 ? '' : 'Input required';
  };

  return (
    <div className='container'>
      <TextField
        className='item'
        label='Title'
        readOnly={true}
        defaultValue={actionPoint.Title}
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
        label='Resources'
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
        onClick={() => {
          props.handleAPEdit(actionPoint);
        }}
      />
    </div>
  );
};
export default UpdateActionPointForm;

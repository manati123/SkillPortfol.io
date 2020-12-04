import React, { FC, useState, useEffect } from 'react';
import { IUserActionPoint } from 'scripts/models/ActionPoint/IUserActionPoint';
import { Status } from 'scripts/models/Status/Status';
import { UserActionPointsServices } from 'scripts/services/ActionPoints/UserActionPointsServices';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';

export const ActionPointAccordionComponent: FC<{
  ActionPoint: IUserActionPoint;
}> = ({ ActionPoint }) => {
  const [statusComplete, setStatusCompleteState] = useState<string>('');
  const buttonPressed = (id: number) => {
    ActionPoint.Status = { Value: Status.Done };
    setStatusCompleteState('Done');
    UserActionPointsServices.CompleteUserActionPoint(id);
  };

  useEffect(() => {
    if (Status[ActionPoint.Status.Value] === Status['Done']) {
      setStatusCompleteState('Done');
    }
    else {
      setStatusCompleteState('In Progress');
    }
  });

  return (
    <div className='accordion-action-point'>
      <p className='skio-actionpoint-title'>
        <strong>{ActionPoint.Title}</strong>
      </p>
      <p className='skio-actionpoint-description'>{ActionPoint.Description}</p>
      <p className='skio-actionpoint-resources'>{ActionPoint.Resources}</p>
      <p className='skio-actionpoint-status'>{statusComplete}</p>
      <PrimaryButton  text='Complete Action Point' className='skio-actionpoint-button' onClick={() => buttonPressed(ActionPoint.Id)} />
    </div>
  );
};

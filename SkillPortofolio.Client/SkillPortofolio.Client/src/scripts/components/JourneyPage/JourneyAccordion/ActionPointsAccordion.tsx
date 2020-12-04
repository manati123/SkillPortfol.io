import React, { FC } from 'react';
import { IUserActionPoint } from 'scripts/models/ActionPoint/IUserActionPoint';
import { ActionPointAccordionComponent } from './ActionPointAccordionComponent';

export const ActionPointsAccordion: FC<{
  ActionPoints: IUserActionPoint[];
}> = ({ ActionPoints }) => {
  return (
    <div className='accordion-action-points'>
      {ActionPoints &&
        ActionPoints.map((ActionPoint: IUserActionPoint, index) => (
          <ActionPointAccordionComponent
            ActionPoint={ActionPoint}
            key={index}
          />
        ))}
    </div>
  );
};

import * as React from 'react';
import { IUserActionPoint } from 'scripts/models/ActionPoint/IUserActionPoint';
import '../JourneyPage/JourneyPage.scss';
export const ActionPointComponent: React.FC<{
  ActionPoint: IUserActionPoint;
  index: number;
}> = ({ ActionPoint, index }) => {
  return (
    <li key={index} className='skillportfolio-journey-action'>
      {ActionPoint.Title}
    </li>
  );
};

import React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import ActionPointItem from './ActionPointItem';
import './ActionPointsContainer.scss';

interface ActionPointsProps {
  handleActionPointEditForm(actionPoint: IActionPoint);
  contents: IActionPoint[];
}

const ActionPointsContainer: React.FC<ActionPointsProps> = (props: ActionPointsProps) => {
    return (
        <div className='ap-container'>
            {props.contents.map((actionPoint: IActionPoint) => {
                return (<ActionPointItem key={actionPoint.Id} handleEditPressed={props.handleActionPointEditForm} actionPoint={actionPoint} />);
            })}
        </div>
    );
};
export default ActionPointsContainer;

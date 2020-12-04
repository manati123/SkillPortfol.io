import React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';

interface ActionPointItemPropsType{
    actionPoint: IActionPoint
}

const ActionPointItem: React.FC<ActionPointItemPropsType> = (props) => {
    return (
        <article className='spio-actionpoint-item'>
            <div>
                <h4>{props.actionPoint.Title}</h4>
            </div>
            <p>
                {props.actionPoint.Description}
            </p>
            <p>
                {props.actionPoint.Resources}
            </p>
        </article>
    );
};

export default ActionPointItem;
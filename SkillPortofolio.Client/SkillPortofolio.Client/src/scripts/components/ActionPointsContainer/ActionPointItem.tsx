import React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import './ActionPointItem.scss';
import { DefaultButton } from 'office-ui-fabric-react';

interface APItemPropType {
  key?: number;
  handleEditPressed(actionPoint: IActionPoint);
  actionPoint: IActionPoint;
}

const ActionPointItem: React.FC<APItemPropType> = (props) => {
    return (
        <article className='ap-item'>
            <div>
                <h2>{props.actionPoint.Title}</h2>
                <p>{props.actionPoint.Description}</p>
                <p>{props.actionPoint.Resources}</p>
            </div>
            <div>
                <DefaultButton
                iconProps={{iconName: 'Edit'}}
                onClick={
                    () => { props.handleEditPressed(props.actionPoint); }
                }/>
            </div>
        </article>
    );
};

export default ActionPointItem;

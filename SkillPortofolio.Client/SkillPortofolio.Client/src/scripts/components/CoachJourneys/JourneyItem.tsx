import { DefaultButton } from 'office-ui-fabric-react';
import React from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import { Level } from 'scripts/models/Level/Level';
import './JourneyItem.scss';

interface JourneyItemPropTypes {
    journey: IJourney,
    handleEdit(journey: IJourney): void,
    handleDelete(journey: IJourney): void
}

const JourneyItem: React.FC<JourneyItemPropTypes> = (props) => {
    return (
        <article className='spio-journey-item'>
            <div>
                <h1>
                    <a href='#'>
                        {props.journey.Title}
                    </a>
                </h1>
                <p>
                    {props.journey.Description}
                </p>
                <p>
                    {Level[props.journey.Level]}
                </p>
            </div>
            <div>
                <DefaultButton onClick={() => { props.handleEdit(props.journey); }} iconProps={{iconName: 'EditSolid12'}} />
                <DefaultButton onClick={() => { props.handleDelete(props.journey); }} iconProps={{iconName: 'Delete'}} />
            </div>
        </article>
    );
};

export default JourneyItem;
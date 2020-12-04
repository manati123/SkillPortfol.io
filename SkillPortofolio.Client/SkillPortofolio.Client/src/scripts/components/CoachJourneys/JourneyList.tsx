import { DefaultButton } from 'office-ui-fabric-react';
import React from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import JourneyItem from './JourneyItem';
import './JourneyItem.scss';

interface JourneyListPropType {
    journeys: IJourney[],
    handleEdit(journey: IJourney): void,
    handleDelete(journey: IJourney): void
}

const JourneyList: React.FC<JourneyListPropType> = (props: JourneyListPropType) => {
    return (
        <div className='spio-journeys-container'>
            {props.journeys.map((journey: IJourney) =>
                <JourneyItem handleDelete={props.handleDelete} handleEdit={props.handleEdit} key={journey.Id} journey={journey} />
            )}
        </div>
    );
};

export default JourneyList;

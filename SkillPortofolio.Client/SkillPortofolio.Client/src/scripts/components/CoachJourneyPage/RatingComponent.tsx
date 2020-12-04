import React from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import './CoachJourneyPage.scss';

interface RatingComponentPropsType {
    rating: number
}

const RatingComponent: React.FC<RatingComponentPropsType> = (props) => {
    React.useEffect(() => {
        if (props.rating){
            document.getElementsByClassName('spio-rating-bar')[0].setAttribute('style', `width: ${(props.rating / 5) * 100}%`);
        }
        else {
            document.getElementsByClassName('spio-rating-bar')[0].setAttribute('style', 'width: 0');
        }
    }, []);

    return (
        <div>
            <p>Rating</p>
            <div className='spio-rating-container'>
                <div className='spio-rating-bar' />
            </div>
        </div>
    );
};

export default RatingComponent;
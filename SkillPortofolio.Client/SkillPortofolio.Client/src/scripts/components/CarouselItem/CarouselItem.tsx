import React from 'react';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { Level } from 'scripts/models/Level/Level';
import './CarouselItem.css';

interface PropsType {
  journey: IUserJourney;
}

const CarouselItem: React.FC<PropsType> = (props) => {
  return (
    <article className='spio-carousel-item'>
      <div>
        <div>
          <h1>
            <a href={`Journey.aspx?id=${props.journey.Id}`}>
              {props.journey.Title}
            </a>
          </h1>
          <h2>{Level[props.journey.Level]}</h2>

          <p>{props.journey.Description}</p>
        </div>
        <div>
          <p>Coach: {props.journey.Coach}</p>
        </div>
      </div>
    </article>
  );
};

export default CarouselItem;

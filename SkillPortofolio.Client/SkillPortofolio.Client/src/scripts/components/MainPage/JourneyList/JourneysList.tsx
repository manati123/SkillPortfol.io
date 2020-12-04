import React, { FC } from 'react';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { JourneyRow } from './JourneyRow';

export const JourneysList: FC<{ Journeys: IUserJourney[] }> = ({
  Journeys,
}) => {
  return (
    <ul className='skillportofolio-journeylist'>
      {Journeys &&
        Journeys.map((journey: IUserJourney, index) => (
          <JourneyRow Journey={journey} key={index} />
        ))}
    </ul>
  );
};

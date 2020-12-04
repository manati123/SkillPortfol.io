import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { Level } from 'scripts/models/Level/Level';
import './JourneyListStyle.scss';

export const JourneyRow: FC<{ Journey: IUserJourney }> = ({ Journey }) => {
  return (
    <li className='spio-journeyrow'>
      <a
        href={'Journey.aspx?Id=' + String(Journey.Id)}
      >
        <h1 id='spio-journey-title'>{Journey.Title}</h1>
        </a>
        <h2 id='spio-journey-coach'>{Journey.Coach}</h2>
        <p id='spio-journey-desc'>{Journey.Description}</p>
        <p id='spio-journey-level'>{Level[Journey.Level]}</p>
    </li>
  );
};

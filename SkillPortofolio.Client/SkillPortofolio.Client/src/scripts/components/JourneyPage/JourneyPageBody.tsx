import * as React from 'react';
import './JourneyPage.scss';
import {
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';
import { DialogComponent } from './DialogComponent';
import { IJourney } from 'scripts/models/Journey/IJourney';
export const JourneyPageBody: React.FC<{
  Journey: IJourney;
  isCoach: boolean;
}> = ({ Journey, isCoach }) => {
  return (
    <div className='skillportofolio-journey-body'>
      <div>
        <h2 className='skillportofolio-journey-title skillportofolio-general-style'>
          {Journey.Title}
        </h2>
        <h3 className='skillportofolio-journey-coach skillportofolio-general-style'>
          By coach {Journey.Coach}
        </h3>
        <p className='skillportofolio-journey-description skillportofolio-general-style'>
          {Journey.Description}
        </p>
        <DialogComponent />
        <DefaultButton
          disabled={!isCoach.valueOf()}
          text='Modify Journey'
          title='InfoSolid'
          ariaLabel='InfoSolid'
        />
        <DefaultButton>Start Journey</DefaultButton>
      </div>
    </div>
  );
};

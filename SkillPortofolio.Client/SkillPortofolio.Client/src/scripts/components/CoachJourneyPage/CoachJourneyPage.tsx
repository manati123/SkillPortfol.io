import * as React from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import { JourneyServices } from 'scripts/services/Journeys/JourneysServices';
import UserService from 'scripts/services/Users/UserService';
import { COACHES_GROUP } from 'scripts/services/GroupNames';
import Header from '@components/Header/Header';
import './CoachJourneyPage.scss';
import SkillContainer from './SkillContainer';
import { Level } from 'scripts/models/Level/Level';
import RatingComponent from './RatingComponent';
import { PrimaryButton } from 'office-ui-fabric-react';

const CoachJourneyPage = () => {
  const [journey, setJourney] = React.useState<IJourney>({
    Title: '',
    Description: '',
    Level: 0,
    AverageDuration: 0,
    Skills: [],
    Coach: ''
  });
  const [isCoach, setIsCoach] = React.useState<boolean>(false);

  const fetchJourney = async () => {
    const journeyId: number = +window.location.href.toString().split('?')[1].split('=')[1];
    if (journeyId){
      const journeyValue = await JourneyServices.GetJourney(journeyId);
      setJourney(journeyValue);
    }
  };

  const checkCoach = async () => {
    const isUserCoach: boolean = (await UserService.CheckMembership(COACHES_GROUP)).IsInGroup;
    setIsCoach(isUserCoach);
  };

  React.useEffect(() => {
    fetchJourney();
    checkCoach();
  }, []);

  return (
    <div>
      <Header />
      {
        journey.Id &&
        <div className='spio-wrapper'>
          <div>
            <h1>
              {journey.Title}
            </h1>
            <h2>
                {`Level: ${Level[journey.Level]}`}
            </h2>
            <h3>
              {`By coach ${journey.Coach}`}
            </h3>
            <p>
              {journey.Description}
            </p>
            {
              journey.Rating !== undefined && <RatingComponent rating={journey.Rating} />
            }
            <div>
              <PrimaryButton text='Start journey' />
            </div>
          </div>
          <div>
            <h2>Skills</h2>
            {journey.Skills.map(skill => <SkillContainer key={skill.Id} skill={skill} />)}
          </div>
        </div>
      }
    </div>
  );
};

export default CoachJourneyPage;

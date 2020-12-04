import React, { useState, useEffect} from 'react';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import './JourneyPage.scss';
import { getAuxJourneys } from '@utils/utils';
import { JourneyPageBody } from './JourneyPageBody';
import { SkillsAccordion } from 'scripts/components/JourneyPage/JourneyAccordion/SkillsAccordion';
import { UserSkillsServices } from 'scripts/services/Skills/UserSkillsServices';
import {Status} from 'scripts/models/Status/Status';
import Header from '@components/Header/Header';

const journeys: IUserJourney[] = getAuxJourneys();
function getJourneyById(id: number): IUserJourney {
  const journeyById: IUserJourney | undefined = journeys.find((j) => {
    return j.Id === id;
  });
  if (journeyById === undefined) return journeys[0];
  return journeyById;
}

const journey = getJourneyById(0);

const JourneyPageComponent = () => {
  const [userSkills, setUserSkills] = useState<IUserSkill[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedUserSkills = await UserSkillsServices.GetUserSkills();
      setUserSkills(fetchedUserSkills);
    })();

  }, []);

 /* const completeUAPandSubSkills = (id : number) => {
    const newSkills=userSkills.map(userSkill=>[...userSkill, ActionPoints : userSkill.ActionPoints.map(actionPoint=>{
      if (actionPoint.Id === id){
        actionPoint.Status= {Value : Status.Done};
        return actionPoint;
      }
    })])
  }*/

  return (
    <div>
      <Header />
      <div className='skillportofolio-flex-container'>
        <JourneyPageBody Journey={journey} isCoach={false} />
      </div>
      <SkillsAccordion Skills={userSkills} />
    </div>
  );
};

export default JourneyPageComponent;

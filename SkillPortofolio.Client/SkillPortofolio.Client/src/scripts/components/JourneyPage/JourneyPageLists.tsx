import * as React from 'react';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import './JourneyPage.scss';
import { ActionPointComponent } from '../ModelComponents/ActionPointComponent';
import { SkillComponent } from '../ModelComponents/SkillComponent';
export const JourneyPageLists: React.FC<{ Journey: IUserJourney }> = ({
  Journey,
}) => {
  return (
    <div className='skillportofolio-journey-info'>
      <p>Journey Level: {Journey.Level}</p>
      <p>Journey Average Duration: {Journey.AverageDuration}</p>
      {Journey.Skills && (
        <ul>
          {Journey.Skills.map((skill, index) => (
            <SkillComponent key={index} Skill={skill} index={index}>
              {skill.SubSkills.length > 0 && (
                <ul>
                  {skill.SubSkills.map((subskill, SubSkillIndex) => (
                    <SkillComponent
                      key={SubSkillIndex}
                      Skill={subskill}
                      index={SubSkillIndex}
                    >
                      {subskill.ActionPoints.length > 0 && (
                        <ul>
                          {subskill.ActionPoints.map((p, ActionPointindex) => (
                            <ActionPointComponent
                              key={ActionPointindex}
                              ActionPoint={p}
                              index={ActionPointindex}
                            />
                          ))}
                        </ul>
                      )}
                    </SkillComponent>
                  ))}
                </ul>
              )}
            </SkillComponent>
          ))}
        </ul>
      )}
    </div>
  );
};

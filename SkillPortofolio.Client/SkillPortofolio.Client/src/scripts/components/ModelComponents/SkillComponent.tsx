import * as React from 'react';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import '../JourneyPage/JourneyPage.scss';
import { ActionPointComponent } from './ActionPointComponent';

export const SkillComponent: React.FC<{ Skill: IUserSkill; index: number }> = ({
  Skill,
  index,
}) => {
  return (
    <li key={index} className='skillportfolio-journey-skill'>
      {Skill.Title}
      {Skill.ActionPoints.length > 0 && (
        <ul>
          {Skill.ActionPoints.map((p, ActionPointindex) => (
            <ActionPointComponent
              key={ActionPointindex}
              ActionPoint={p}
              index={ActionPointindex}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

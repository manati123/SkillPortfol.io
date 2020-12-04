import React, { FC, useState, useEffect } from 'react';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import { SkillAccordion } from './SkillAccordion';
import './Accordion.scss';

export const SkillsAccordion: FC<{ Skills: IUserSkill[] }> = ({ Skills }) => {
  return (
    <div className='skills'>
      {Skills &&
        Skills.map((Skill: IUserSkill, index) => (
          <SkillAccordion Skill={Skill} key={index} />
        ))}
    </div>
  );
};

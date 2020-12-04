import React from 'react';
import { ISkill } from 'scripts/models/Skill/ISkill';
import SkillItem from './SkillItem/SkillItem';
import './SkillsList.scss';

interface SkillsListProp{
    skills: ISkill[],
    handleEditSkill(skill: ISkill): void;
}

const SkillsList: React.FC<SkillsListProp> = ((skillsData: SkillsListProp) => {
      return (
        <div className='spio-skills'>
            {skillsData.skills.map((skill: ISkill) => {
                return (<SkillItem key = {skill.Id}
                    handleEditSkill = {skillsData.handleEditSkill}
                    skill = {skill} />);
            })}
        </div>
    );
});

export default SkillsList;
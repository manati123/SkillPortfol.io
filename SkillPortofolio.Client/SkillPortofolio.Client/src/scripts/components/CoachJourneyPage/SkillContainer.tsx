import React from 'react';
import { Level } from 'scripts/models/Level/Level';
import { ISkill } from 'scripts/models/Skill/ISkill';
import ActionPointItem from './ActionPointItem';
import './CoachJourneyPage.scss';

interface SkillContainerPropsType {
    skill: ISkill
}

const SkillContainer: React.FC<SkillContainerPropsType> = (props: SkillContainerPropsType) => {
    return (
        <div>
            <h2>
                {props.skill.Title}
            </h2>
            <h3>
                {`Level: ${Level[props.skill.Level]}`}
            </h3>
            <p>
                {props.skill.Description}
            </p>
            <div className='spio-actionpoints-container'>
                {props.skill.ActionPoints.map(actionPoint => <ActionPointItem key={actionPoint.Id} actionPoint={actionPoint} />)}
            </div>
        </div>
    );
};

export default SkillContainer;

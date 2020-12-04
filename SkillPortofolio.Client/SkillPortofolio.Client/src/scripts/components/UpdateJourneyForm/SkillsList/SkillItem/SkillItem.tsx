import { DefaultButton, IIconProps } from 'office-ui-fabric-react';
import React from 'react';
import { Level } from 'scripts/models/Level/Level';
import { ISkill } from 'scripts/models/Skill/ISkill';
import './SkillItem.scss';

interface SkillItemProps{
    key?: number,
    handleEditSkill(skill: ISkill),
    skill: ISkill
}
const editIcon: IIconProps = { iconName: 'Edit' };
const SkillItem: React.FC<SkillItemProps> = (props: SkillItemProps) => {
    return (
        <article className='spio-skill-tile'>
            <div className='skill-detail'>
                <h2>{props.skill.Title}</h2>
                <p>{props.skill.Description}</p>
                <p>{Level[props.skill.Level]}</p>
            </div>
            <div className='skill-detail'>
                <DefaultButton
                className = 'edit-skill'
                iconProps={editIcon}
                onClick={
                    () => { props.handleEditSkill(props.skill); }
                }/>
            </div>
        </article>
    );
};
export default SkillItem;
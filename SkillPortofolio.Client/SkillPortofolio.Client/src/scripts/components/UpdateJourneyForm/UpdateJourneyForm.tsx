import AddSkillForm from '@components/AddSkillForm/AddSkillForm';
import UpdateSkillForm from '@components/AddSkillForm/UpdateSkillForm';
import { IIconProps } from '@fluentui/react';
import { DefaultButton, Dropdown, IDropdownOption, MaskedTextField, PrimaryButton, TextField } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import { Level } from 'scripts/models/Level/Level';
import { ISkill } from 'scripts/models/Skill/ISkill';
import { JourneyServices } from 'scripts/services/Journeys/JourneysServices';
import { SkillsService } from 'scripts/services/Skills/SkillsService';
import SkillsList from './SkillsList/SkillsList';
import './UpdateJourney.scss';

export interface SkillDropdownType extends IDropdownOption {
    details: ISkill
}
const levelOptions = [
    { key: Level.Beginner, text: Level[Level.Beginner] },
    { key: Level.Intermediate, text: Level[Level.Intermediate] },
    { key: Level.Advanced, text: Level[Level.Advanced] },
    { key: Level.Expert, text: Level[Level.Expert] }
];

let skills: ISkill[] = [];
const addIcon: IIconProps = { iconName: 'Add' };
const UpdateJourneyForm: React.FC<{ currentJourney: IJourney, handleEdit(journey: IJourney) }> = ({ currentJourney, handleEdit }) => {

    const [journey, setJourney] = React.useState<IJourney>(currentJourney);
    const [skillChoices, setSkillChoices] = React.useState<SkillDropdownType[]>([]);
    const [selectedSkills, setSelectedSkills] = React.useState<number[]>(journey.Skills.map((skill: ISkill) => {
        return skill.Id ? skill.Id : 0;
    }));
    const [isActive, setActive] = useState<boolean>(true);
    const [addSkill, setAddSkill] = React.useState<boolean>(false);
    const [editSkill, setEditSkill] = React.useState<boolean>(false);
    const [selectedSkillForEdit, setSelectedSkillForEdit] = React.useState<ISkill>({
        Title: '',
        Description: '',
        SubSkills: [],
        ActionPoints: [],
        Level: Level.Intermediate
    });
    const getSkills = async () => {
        skills = await SkillsService.GetSkills();
        setSkillChoices([...convertSkills([...skills])]);
    };
    useEffect(() => {
        getSkills();
        setSkillChoices([...convertSkills([...skills])]);
    }, []);

    const convertSkills = (skillsToConvert: ISkill[]): SkillDropdownType[] => {
        const result: SkillDropdownType[] = [];
        skillsToConvert.forEach((currSkill: ISkill) => {
            result.push({
                key: currSkill.Id ? currSkill.Id : 0,
                text: currSkill.Title,
                details: currSkill
            });
        });
        return result;
    };
    const handleSkillCreation = async (skill: ISkill) => {
        skill = await SkillsService.CreateSkill(skill);
        if (skill.Id) {
            setSkillChoices([...skillChoices, { key: skill.Id, text: skill.Title, details: { Id: skill.Id, ...skill } }]);
            setAddSkill(true);
            setActive(false);
            setEditSkill(false);
            setJourney({ ...journey, Skills: [...journey.Skills, skill] });
            setSelectedSkills([...selectedSkills, skill.Id]);
        }
    };

    const handleSkillEditForm = (skill: ISkill): void => {
        setSelectedSkillForEdit(skill);
        setEditSkill(true);
        setActive(false);
        setAddSkill(false);
    };

    const handleSkillEdit = async (newSkill: ISkill) => {
        if (selectedSkillForEdit.Id) {
            await SkillsService.UpdateSkill(selectedSkillForEdit.Id, newSkill);
            setEditSkill(false);
            setAddSkill(false);
            setActive(true);
            setJourney({
                ...journey, Skills: [...journey.Skills.map((skill: ISkill) => {
                    return skill.Id === newSkill.Id ? newSkill : skill;
                })]
            });
            setSkillChoices([...skillChoices.map((choice: SkillDropdownType) => {
                return choice.key === newSkill.Id ? {
                    key: choice.key,
                    text: newSkill.Title,
                    details: newSkill
                } : choice;
            })]);
        }

    };

    const onSelectedSkillsChanged = (option: SkillDropdownType) => {
        if (option.details) {
            if (journey.Skills.find(elem => elem.Id === option.key) === undefined) {
                setJourney({ ...journey, Skills: [...journey.Skills, option.details] });
            }
            else {
                setJourney({ ...journey, Skills: [...journey.Skills.filter((skill) => skill.Title !== option.text)] });
            }
            setSelectedSkills(
                option.selected ? [...selectedSkills, +option.key] : selectedSkills.filter(key => key !== option.key)
            );
        }
    };

    const handleFormExit = () => {
        setAddSkill(false);
        setActive(true);
    };

    const handleEditFormExit = () => {
        setEditSkill(false);
        setActive(true);
    };

    return (
        <><div className='spio-journey-container'>
            <h1>Edit journey</h1>
            <form className={`spio-journey-form ${isActive === true ? 'box' : ''}`}>
                <PrimaryButton
                    className='spio-journey-submit'
                    text='Update Journey'
                    onClick={async () => {
                        if (currentJourney.Id) {
                            await JourneyServices.UpdateJourney(currentJourney.Id, journey);
                            handleEdit(journey);
                        }
                    }}
                />
                <TextField
                    label='Title'
                    value={journey.Title}
                    required={true}
                    onChange={(_, title: string) => setJourney({ ...journey, Title: title ?? '' })} />
                <TextField
                    label='Journey description'
                    multiline={true}
                    value={journey.Description}
                    autoAdjustHeight={true}
                    onChange={(_, description: string) => setJourney({ ...journey, Description: description ?? '' })} />
                <div className='spio-details-container'>
                    <Dropdown
                        label='Level'
                        className='spio-level'
                        options={levelOptions}
                        selectedKey={journey.Level}
                        onChanged={(option: IDropdownOption) => {
                            setJourney({ ...journey, Level: +option.key });
                        }} />
                    <MaskedTextField
                        className='spio-duration'
                        value={journey.AverageDuration.toString()}
                        label='Duration' mask='99'
                        onChange={(_, duration: string) => setJourney({ ...journey, AverageDuration: +duration ?? '' })}
                    />
                </div>
                <div className='spio-skills-container'>
                    <Dropdown
                        className='spio-skills-dropdown'
                        placeholder='Skills'
                        label='Skills'
                        options={skillChoices}
                        multiSelect={true}
                        selectedKeys={selectedSkills}
                        onChanged={(option: SkillDropdownType) => onSelectedSkillsChanged(option)} />
                    <DefaultButton
                        className='spio-submit-skill'
                        iconProps={addIcon} onClick={() => {
                            setAddSkill(true);
                            setActive(false);
                            setEditSkill(false);
                        }
                        } text='Add a Skill' />
                </div>
                <SkillsList handleEditSkill={handleSkillEditForm} skills={journey.Skills} />
            </form>
            <div className='spio-createskill-form'>
                {addSkill && <AddSkillForm handleSkillCreation={handleSkillCreation} handleFormExit={handleFormExit} />}
            </div>

            <div className='spio-editskill-form'>
                {editSkill && <UpdateSkillForm skill={selectedSkillForEdit} handleSkillEdit={handleSkillEdit} handleFormExit={handleEditFormExit}/>}
            </div>
        </div>
        </>
    );
};

export default UpdateJourneyForm;

import AddSkillForm from '@components/AddSkillForm/AddSkillForm';
import { DefaultButton, Dropdown, IDropdownOption, IIconProps, MaskedTextField, PrimaryButton, TextField } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import { Level } from 'scripts/models/Level/Level';
import { ISkill } from 'scripts/models/Skill/ISkill';
import { JourneyServices } from 'scripts/services/Journeys/JourneysServices';
import { SkillsService } from 'scripts/services/Skills/SkillsService';
import './Journey.scss';

export interface SkillDropdownType extends IDropdownOption {
  details: ISkill;
}
const levelOptions = [
  { key: Level.Beginner, text: Level[Level.Beginner] },
  { key: Level.Intermediate, text: Level[Level.Intermediate] },
  { key: Level.Advanced, text: Level[Level.Advanced] },
  { key: Level.Expert, text: Level[Level.Expert] }
];

let skills: ISkill[] = [];
const addIcon: IIconProps = { iconName: 'Add' };
const AddJourneyForm: React.FC<{ handleAddedJourney(journey: IJourney): void; }> = (props) => {
  const [journey, setJourney] = useState<IJourney>({
    Title: '',
    Description: '',
    Level: Level.Intermediate,
    AverageDuration: 0,
    Skills: []
  });
  const [showSkillsForm, setShowSkillsForm] = useState<boolean>(false);
  const [skillChoices, setSkillChoices] = useState<SkillDropdownType[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [isActive, setActive] = useState<boolean>(true);

  const convertSkills = (skillsOpt: ISkill[]): SkillDropdownType[] => {
    const result: SkillDropdownType[] = [];
    for (const skill of skillsOpt) {
      if (skill.Id) {
        result.push({
          key: skill.Id,
          text: skill.Title,
          details: skill
        });
      }
    }
    return result;
  };

  const getSkills = async () => {
    skills = await SkillsService.GetSkills();
    setSkillChoices([...convertSkills([...skills])]);
  };

  useEffect(() => {
    getSkills();
  }, [isActive]);

  const handleSkillCreation = async (skill: ISkill) => {
    skill = await SkillsService.CreateSkill(skill);
    if (skill.Id) {
      setSkillChoices([
        ...skillChoices,
        {
          key: skill.Id,
          text: skill.Title,
          details: { ...skill },
        }
      ]);
      setJourney({ ...journey, Skills: [...journey.Skills, skill] });
      setSelectedSkills([...selectedSkills, skill.Id]);
      setShowSkillsForm(!showSkillsForm);
    }
  };

  const createJourney = async () => {
    const createdJourney: IJourney = await JourneyServices.CreateJourney(journey);
    setJourney(createdJourney);
    props.handleAddedJourney(createdJourney);
  };

  const onSelectedSkillsChanged = (option: SkillDropdownType) => {
    if (option.details) {
      if (!journey.Skills.find(elem => elem.Id === option.key)) {
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
    setActive(!isActive);
    setShowSkillsForm(!showSkillsForm);
  };

  return (
    <><div className='spio-journey-container'>
      <h1>Add a journey</h1>
      <form className={`spio-journey-form ${isActive === true ? 'box' : ''}`}>
        <PrimaryButton
          className='spio-journey-submit'
          text='Create Journey'
          onClick={() => { createJourney(); }} />
        <TextField
          label='Title'
          required={true}
          onChange={(_, title: string) => setJourney({ ...journey, Title: title ?? '' })} />
        <TextField
          label='Journey description'
          multiline={true}
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
            label='Duration' mask='99'
            onChange={(_, duration: string) => setJourney({ ...journey, AverageDuration: +duration ?? '' })} />
        </div>
        <div className='spio-skills-container'>
          <Dropdown
            className='spio-skills'
            placeholder='Skills'
            label='Choose from existing skills'
            options={skillChoices}
            multiSelect={true}
            selectedKeys={selectedSkills}
            onChanged={(option: SkillDropdownType) => onSelectedSkillsChanged(option)} />
          <DefaultButton
            className='spio-submit-skill'
            iconProps={addIcon}
            onClick={() => {
              setActive(!isActive);
              setShowSkillsForm(!showSkillsForm);
            }} text='Add a new Skill' />
        </div>
      </form>
      <div className='spio-createskill-form'>
        {showSkillsForm && <AddSkillForm handleSkillCreation={handleSkillCreation} handleFormExit={handleFormExit} />}
      </div>
    </div>
    </>
  );
};
export default AddJourneyForm;

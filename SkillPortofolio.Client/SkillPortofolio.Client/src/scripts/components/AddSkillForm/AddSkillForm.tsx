import React, { useState, useEffect } from 'react';
import {
  TextField,
  Dropdown,
  PrimaryButton,
  IDropdownOption,
  initializeIcons,
  IIconProps,
  DefaultButton
} from '@fluentui/react';
import { ISkill } from './../../models/Skill/ISkill';
import { Level } from './../../models/Level/Level';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import './AddSkillForm.scss';
import { useBoolean } from '@uifabric/react-hooks';
import ActionPointModal from '@components/shared/modal/Modal';
import { ActionPointsServices } from 'scripts/services/ActionPoints/ActionPointsServices';

initializeIcons();
export interface APDropdownType extends IDropdownOption {
  details: IActionPoint;
}

interface SkillFormProps {
  handleSkillCreation(skill: ISkill): void;
  handleFormExit();
}

const exitIcon: IIconProps = { iconName: 'ChromeClose' };
let existingActionPoints: IActionPoint[] = [];
const levelOptions = [
  { key: Level.Beginner, text: Level[Level.Beginner] },
  { key: Level.Intermediate, text: Level[Level.Intermediate] },
  { key: Level.Advanced, text: Level[Level.Advanced] },
  { key: Level.Expert, text: Level[Level.Expert] }
];
const addIcon: IIconProps = { iconName: 'Add' };
const AddSkillForm: React.FC<SkillFormProps> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [skillDetails, setSkillDetails] = useState<ISkill>({
    Title: '',
    Description: '',
    SubSkills: [],
    ActionPoints: [],
    Level: Level.Beginner
  });
  const [apChoices, setapChoices] = useState<APDropdownType[]>([]);
  const [selectedAPs, setSelectedAPs] = useState<number[]>([]);

  const convertAPs = (actionpoints: IActionPoint[]): APDropdownType[] => {
    const result: APDropdownType[] = [];
    for (const ap of actionpoints) {
      if (ap.Id) {
        result.push({
          key: ap.Id,
          text: ap.Title,
          details: ap
        });
      }
    }
    return result;
  };
  const getAP = async () => {
    existingActionPoints = await ActionPointsServices.GetActionPoints();
    setapChoices([...convertAPs([...existingActionPoints])]);
  };

  useEffect(() => {
    getAP();
  }, []);

  const handleActionPointCreation = async (actionPoint: IActionPoint): Promise<void> => {
    actionPoint = await ActionPointsServices.CreateActionPoint(actionPoint);
    if (actionPoint.Id) {
      setapChoices([...apChoices, { key: actionPoint.Id, text: actionPoint.Title, details: { Id: actionPoint.Id, ...actionPoint } }]);
      setSelectedAPs([...selectedAPs, actionPoint.Id]);
      setSkillDetails({ ...skillDetails, ActionPoints: [...skillDetails.ActionPoints, actionPoint] });
    }
    hideModal();
  };

  const onSelectedAPChanged = (option: APDropdownType) => {
    if (option.details) {
      if (!skillDetails.ActionPoints.find(elem => elem.Id === option.key)) {
        setSkillDetails({ ...skillDetails, ActionPoints: [...skillDetails.ActionPoints, option.details] });
      }
      else {
        setSkillDetails({ ...skillDetails, ActionPoints: [...skillDetails.ActionPoints.filter((actionpoint) => actionpoint.Title !== option.text)] });
      }
      setSelectedAPs(
        option.selected ? [...selectedAPs, +option.key] : selectedAPs.filter(key => key !== option.key)
      );
    }
  };
  return (
    <><form className='spio-skill-form box'>
      <div className='spio-skill-header'>
        <h1 className='spio-skill-title'>Create Skill</h1>
        <DefaultButton
          className='spio-header-close'
          iconProps={exitIcon}
          onClick={props.handleFormExit} />
      </div>
      <TextField
        required={true}
        autoAdjustHeight={true}
        label='Title'
        onChange={(_, title: string) => {
          setSkillDetails({ ...skillDetails, Title: title ?? '' });
        }} />
      <TextField
        label='Description'
        multiline={true}
        autoAdjustHeight={true}
        onChange={(_, description: string) => {
          setSkillDetails({ ...skillDetails, Description: description ?? '' });
        }} />
      <ActionPointModal
        title='Add a new Action Point'
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        onClose={hideModal}
        isUpdate={false}
        actionPoint={{ Title: '', Description: '', Resources: '' }}
        handleAction={handleActionPointCreation}
      />
      <Dropdown
        label='Level'
        options={levelOptions}
        selectedKey={skillDetails.Level}
        onChanged={(option: IDropdownOption) => {
          setSkillDetails({ ...skillDetails, Level: +option.key });
        }} />
      <div className='spio-ap-container'>
        <Dropdown
          className='spio-ap-dropdown'
          label='Choose from existing action points'
          placeholder='Action points'
          options={apChoices}
          multiSelect={true}
          selectedKeys={selectedAPs}
          onChanged={(option: APDropdownType) => onSelectedAPChanged(option)} />
        <DefaultButton
          iconProps={addIcon}
          className='spio-ap-button'
          onClick={showModal}
          text='Add action point' />
      </div>
      <PrimaryButton
        className='spio-submit-button'
        text='Submit'
        onClick={() => {
          props.handleSkillCreation(skillDetails);
        }} />
    </form></>
  );
};
export default AddSkillForm;

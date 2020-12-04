import React, { useState, useEffect } from 'react';
import { TextField, Dropdown, PrimaryButton, IDropdownOption } from '@fluentui/react';
import {  useBoolean } from '@uifabric/react-hooks';
import { ISkill } from './../../models/Skill/ISkill';
import { Level } from './../../models/Level/Level';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import { APDropdownType } from 'scripts/components/AddSkillForm/AddSkillForm';
import ActionPointsContainer from './../ActionPointsContainer/ActionPointsContainer';
import './UpdateSkillForm.scss';
import { DefaultButton, IIconProps} from 'office-ui-fabric-react';
import ActionPointModal from '@components/shared/modal/Modal';
import { SkillsService } from 'scripts/services/Skills/SkillsService';
import { ActionPointsServices } from 'scripts/services/ActionPoints/ActionPointsServices';

interface PropTypes {
  skill: ISkill,
  handleSkillEdit(skill: ISkill);
  handleFormExit();
}

interface SubSkillDropdownType extends IDropdownOption {
  details: ISkill
}

let existingAP: IActionPoint[] = [];
const exitIcon: IIconProps = { iconName: 'ChromeClose' };
let existingSkills: ISkill[] = [];

const levelOptions = [
  { key: Level.Beginner, text: Level[Level.Beginner] },
  { key: Level.Intermediate, text: Level[Level.Intermediate] },
  { key: Level.Advanced, text: Level[Level.Advanced] },
  { key: Level.Expert, text: Level[Level.Expert] }
];

const UpdateSkillForm: React.FC<PropTypes> = (props) => {
  const [skillDetails, setSkillDetails] = useState<ISkill>(props.skill);
  const [apFormToggled, setapFormToggled] = useState<boolean>(false);
  const [apChoices, setapChoices] = useState<APDropdownType[]>([]);
  const [selectedAPs, setSelectedAPs] = useState<number[]>(skillDetails.ActionPoints.map((actionpoint) => {
    if (actionpoint.Id) {
      return actionpoint.Id;
    }
    else return 0;
  }));
  const [apEdit, setapEdit] = useState<IActionPoint>({ Title: '', Description: '', Resources: '' });
  const [subSkillsChoices, setSubSkillChoices] = useState<SubSkillDropdownType[]>([]);
  const [selectedSubSkills, setSelectedSubSkills] = useState<number[]>(skillDetails.SubSkills.map((subskill) => {
    if (subskill.Id) {
      return subskill.Id;
    }
    else return 0;
  }));
  const [isAPModalOpen, { setTrue: showAPModal, setFalse: hideAPModal }] = useBoolean(false);

  const convertAPs = (apToConvert: IActionPoint[]): APDropdownType[] => {
    const result: APDropdownType[] = [];
    for (const ap of apToConvert) {
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

  const convertSubSkills = (subskills: ISkill[]): SubSkillDropdownType[] => {
    const result: SubSkillDropdownType[] = [];
    for (const ss of subskills) {
      if (ss.Id !== undefined) {
        result.push({
          key: ss.Id,
          text: ss.Title,
          details: ss
        });
      }
    }
    return result;
  };

  const getSkills = async () => {
    existingSkills = await SkillsService.GetSkills();
    setSubSkillChoices([...convertSubSkills([...existingSkills].concat(skillDetails.SubSkills))]);
  };

  const getAP = async () => {
    existingAP = await ActionPointsServices.GetActionPoints();
    setapChoices([...convertAPs([...existingAP].concat(skillDetails.ActionPoints))]);
  };

  useEffect(() => {
    getAP();
    getSkills();
  }, []);

  const handleActionPointCreation = async (actionPoint: IActionPoint) => {
    actionPoint =  await ActionPointsServices.CreateActionPoint(actionPoint);
    if (actionPoint.Id) {
      setapChoices([
        ...apChoices,
        {
          key: actionPoint.Id,
          text: actionPoint.Title,
          details: { Id: actionPoint.Id, ...actionPoint }
        }
      ]);
      onSelectedAPChanged({
        key: actionPoint.Id, text: actionPoint.Title, details: { Id: actionPoint.Id, ...actionPoint }
      });
    }
    setapFormToggled(!apFormToggled);
  };
  const handleActionPointEdit = async (updatedActionPoint: IActionPoint) => {
    if (apEdit.Id){
      await ActionPointsServices.UpdateActionPoint(apEdit.Id, updatedActionPoint);
      hideAPModal();
      setSkillDetails({
        ...skillDetails, ActionPoints: [...skillDetails.ActionPoints.map((apItem) => {
          if (apItem.Id === updatedActionPoint.Id) {
            return updatedActionPoint;
          }
          else return apItem;
        })]
      });
      setapChoices([...apChoices.map((choice) => {
        if (choice.key === updatedActionPoint.Id) {
          return {
            key: choice.key,
            text: choice.text,
            details: updatedActionPoint
          };
        }
        else return choice;
      })]);
    }
  };

  const setApForEdit = (actionPoint: IActionPoint) => {
    setapEdit(actionPoint);
    showAPModal();
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

  const onSelectedSkillsChanged = (option: SubSkillDropdownType) => {
    if (option.details) {
      if (!skillDetails.SubSkills.find(elem => elem.Id === option.key)) {
        setSkillDetails({ ...skillDetails, SubSkills: [...skillDetails.SubSkills, option.details] });
      }
      else {
        setSkillDetails({ ...skillDetails, SubSkills: [...skillDetails.SubSkills.filter((subskill) => subskill.Title !== option.text)] });
      }
      setSelectedSubSkills(
        option.selected ? [...selectedSubSkills, +option.key] : selectedSubSkills.filter(key => key !== option.key)
      );
    }
  };
  return (
    <><form className='spio-skill-form box'>
       <div className='spio-skill-header'>
        <h1 className='spio-skill-title'>Update Skill</h1>
        <DefaultButton
          className='spio-header-close'
          iconProps={exitIcon}
          onClick={props.handleFormExit} />
      </div>
      <TextField
        required={true}
        defaultValue={skillDetails.Title}
        autoAdjustHeight={true}
        label='Title'
        onChange={(_, title: string) => {
          setSkillDetails({ ...skillDetails, Title: title ?? '' });
        }} />

      <TextField
        label='Description'
        defaultValue={skillDetails.Description}
        multiline={true}
        autoAdjustHeight={true}
        onChange={(_, description: string) => {
          setSkillDetails({ ...skillDetails, Description: description ?? '' });
        }} />

      <Dropdown
        label='Level'
        options={levelOptions}
        selectedKey={skillDetails.Level}
        onChanged={(option: IDropdownOption) => {
          setSkillDetails({ ...skillDetails, Level: +option.key });
        }} />

      <div className='spio-container-row'>
        <Dropdown
          label='Action points'
          options={apChoices}
          multiSelect={true}
          selectedKeys={selectedAPs}
          onChanged={(option: APDropdownType) => onSelectedAPChanged(option)}
        />
        <DefaultButton iconProps={{ iconName: 'Add' }} className='toggle-apform-button' onClick={() => { setapFormToggled(!apFormToggled); }} text='Add a new Action Point' />
      </div>

      <ActionPointsContainer handleActionPointEditForm={setApForEdit} contents={skillDetails.ActionPoints} />

      <ActionPointModal
        title='Add a new Action Point'
        isOpen={apFormToggled}
        onDismiss={() => { setapFormToggled(false); }}
        isBlocking={false}
        onClose={() => { setapFormToggled(false); }}
        isUpdate={false}
        actionPoint={{ Title: '', Description: '', Resources: '' }}
        handleAction={handleActionPointCreation}
      />
      <ActionPointModal
        title='Edit Action Point'
        isOpen={isAPModalOpen}
        onDismiss={hideAPModal}
        isBlocking={false}
        onClose={hideAPModal}
        isUpdate={true}
        actionPoint={apEdit}
        handleAction={handleActionPointEdit}
      />
      <div className='spio-container-row'>
        <Dropdown
          label='Subskills'
          options={subSkillsChoices}
          multiSelect={true}
          selectedKeys={selectedSubSkills}
          onChanged={(option: SubSkillDropdownType) => onSelectedSkillsChanged(option)} />
        <PrimaryButton
          className='submit-button'
          text='Submit'
          onClick={() => {
            props.handleSkillEdit(skillDetails);
          }} />
      </div>
    </form></>
  );
};

export default UpdateSkillForm;

import React, { FC, useState, useEffect, useRef } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import { Level } from 'scripts/models/Level/Level';
import { Status } from 'scripts/models/Status/Status';
import { IUserActionPoint } from 'scripts/models/ActionPoint/IUserActionPoint';
import { ActionPointsAccordion } from './ActionPointsAccordion';
import { SkillsAccordion } from './SkillsAccordion';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { UserSkillsServices } from 'scripts/services/Skills/UserSkillsServices';
import {
  Dialog,
  DialogType,
  DialogFooter,
} from 'office-ui-fabric-react/lib/Dialog';


export const SkillAccordion: FC<{ Skill: IUserSkill }> = ({ Skill }) => {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const content = useRef(document.createElement('div'));
  const [setSkillComplete, setSkillCompleteState] = useState('');
  const [setTitleComplete, setTitleCompleteState] = useState('');
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Please make sure to complete all action points including the ones from the subskills!',
    subText: 'Revisit skills completion!',
  };

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
  }
  useEffect(() => {
    if (Skill.Status.Value === 'Done') {
      setSkillCompleteState('#2ecc71');
      setTitleCompleteState(' - Completed');
    }
  });
  function checkUAPComplete(UAP: IUserActionPoint[]) {
    let complete: boolean = true;
    for (let uap of UAP) {
      if (Status[uap.Status.Value] !== Status['Done']) {
        complete = false;
        break;
      }
    }
    return complete;
  }
  function checkSubSkillsComplete() {
    let complete: boolean = true;
    if (Skill.SubSkills !== null) {
      for (let subSkill of Skill.SubSkills) {
        if (checkUAPComplete(subSkill.ActionPoints) === false) {
          complete = false;
          break;
        }
      }
      return complete;
    }
    else {
      return true;
    }
  }
  const completeUserSkill = async (id: number) => {
    if (checkUAPComplete(Skill.ActionPoints) && checkSubSkillsComplete()) {
      UserSkillsServices.completeUserSkill(id);
      setSkillCompleteState('#2ecc71');
      setTitleCompleteState(' - Completed');
    }
    else {
      toggleHideDialog();
    }
  };

  return (

    <div className='skillportofolio-accordion-skills' >
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      />
      <button type='button' className='accordion' style={{ backgroundColor: `${setSkillComplete}` }} onClick={toggleAccordion} >
        <Icon iconName='ChevronDown' />
        <strong style={{ marginLeft: '10px' }}> {Skill.Title}  {setTitleComplete} </strong>
      </button>
      < div ref={content} style={{ maxHeight: `${setHeight}`, }} className={`accordion-content ${setActive}`}>
        <p className='skio-skill-description' > {Skill.Description} </p>
        <p className='skio-skill-level' > {Level[Skill.Level]} </p>
        <ActionPointsAccordion ActionPoints={Skill.ActionPoints} />
        <p className='skio-skill-status' > {Status[Skill.Status.Value]} </p>
        <p>Sub-Skills</p>
        <SkillsAccordion Skills={Skill.SubSkills} />
        <PrimaryButton text='Complete Skill' className='skio-complete-skill' onClick={() => completeUserSkill(Skill.Id)} />
      </div>
    </div>
  );
};

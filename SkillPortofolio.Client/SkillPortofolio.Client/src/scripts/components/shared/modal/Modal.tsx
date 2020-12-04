import UpdateActionPointForm from '@components/ActionPoint/UpdateActionPoint';
import { IconButton, IIconProps, Modal } from 'office-ui-fabric-react';
import React from 'react';
import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import './Modal.scss';
import AddActionPointForm from './../../ActionPoint/AddActionPointForm';

interface ModalProps {
    title: string;
    isOpen: boolean;
    isUpdate: boolean;
    isBlocking: boolean;
    actionPoint: IActionPoint;
    onDismiss();
    onClose();
    handleAction(actionPoint: IActionPoint);
}
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const ActionPointModal: React.FC<ModalProps> = (props) => {

    return (
        <Modal
            titleAriaId={props.title}
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            isBlocking={props.isBlocking}
        >
            <div className='header'>
                <span id={props.title}>{props.title}</span>
                <IconButton
                    iconProps={cancelIcon}
                    ariaLabel='Close form'
                    onClick={props.onClose}
                    className='icon'
                />
            </div>
            <div className='modal-body'>
                {props.isUpdate ? <UpdateActionPointForm currentActionPoint={props.actionPoint} handleAPEdit={props.handleAction} /> :
                    <AddActionPointForm handleActionPointCreation={props.handleAction} />}
            </div>
        </Modal>
    );
};
export default ActionPointModal;
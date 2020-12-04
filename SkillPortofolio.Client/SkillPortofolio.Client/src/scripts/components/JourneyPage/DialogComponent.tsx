import * as React from 'react';
import './JourneyPage.scss';
import {
  Dialog,
  DialogType,
  DialogFooter,
} from 'office-ui-fabric-react/lib/Dialog';
import {
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';
import { useBoolean } from '@uifabric/react-hooks';
import { UserJourneysServices } from 'scripts/services/Journeys/UserJourneysServices';
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Are you sure you want to do this?',
  subText: 'Finishing this action will cancel your journey!',
};

export const DialogComponent: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <>
      <DefaultButton
        secondaryText='Opens the Cancel Dialog'
        onClick={toggleHideDialog}
        text='Cancel Journey'
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text='Cancel Journey' />
          <DefaultButton
            onClick={() => {
              toggleHideDialog();
              UserJourneysServices.CancelJourney(1);
            }}
            text='Cancel'
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

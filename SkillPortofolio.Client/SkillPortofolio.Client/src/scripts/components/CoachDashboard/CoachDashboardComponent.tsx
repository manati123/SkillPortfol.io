import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { IJourney } from 'scripts/models/Journey/IJourney';
import { JourneyServices } from 'scripts/services/Journeys/JourneysServices';
import AddJourneyForm from '@components/AddJourneyForm/AddJourneyForm';
import Header from '@components/Header/Header';
import JourneyList from '@components/CoachJourneys/JourneyList';
import UpdateJourneyForm from '@components/UpdateJourneyForm/UpdateJourneyForm';

const CoachDashboardComponent = () => {
  const [addJourneyFormDisplay, setAddJourneyFormDisplay] = React.useState<boolean>(false);
  const [editJourneyFormDisplay, setEditJourneyFormDisplay] = React.useState<boolean>(false);
  const [journeys, setJourneys] = React.useState<IJourney[]>([]);
  const [currentJourney, setCurrentJourney] = React.useState<IJourney>(
    {
      Title: '',
      Description: '',
      Level: 0,
      AverageDuration: 0,
      Skills: [],
      Coach: ''
    }
  );
  const fetchData = async () => {
    const data = await JourneyServices.GetJourneys();
    setJourneys([...data]);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleEditJourneyButtonPressed = (journey: IJourney): void => {
    setCurrentJourney(journey);
    setEditJourneyFormDisplay(!editJourneyFormDisplay);
  };

  const handleAddedJourney = (journey: IJourney): void => {
    setJourneys([...journeys, journey]);
    setAddJourneyFormDisplay(!addJourneyFormDisplay);
  };

  const handleJourneyDelete = async (removedJourney: IJourney) => {
    if (removedJourney.Id) {
      await JourneyServices.RemoveJourney(removedJourney.Id);
      setJourneys([...journeys.filter(journey => journey.Id !== removedJourney.Id)]);
    }
  };

  const handleJourneyEdit = (editedJourney: IJourney): void => {
    setJourneys([...journeys.map(journey => {
      if (journey.Id && editedJourney.Id){
        if (journey.Id === editedJourney.Id){
          return editedJourney;
        }
        else return journey;
      }
      return journey;
    })]);
    setEditJourneyFormDisplay(!editJourneyFormDisplay);
  };

  return (
    <div>
      <Header />

      <DefaultButton text='Add a journey' onClick={() => setAddJourneyFormDisplay(!addJourneyFormDisplay)} />

      <JourneyList handleDelete={handleJourneyDelete} handleEdit={handleEditJourneyButtonPressed} journeys={journeys} />

      { addJourneyFormDisplay && <AddJourneyForm handleAddedJourney={handleAddedJourney} />}
      { editJourneyFormDisplay && <UpdateJourneyForm handleEdit={handleJourneyEdit} currentJourney={currentJourney} />}

    </div>
  );
};
export default CoachDashboardComponent;
import { USER_JOURNEY_URL } from './../endpoints';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { Level } from 'scripts/models/Level/Level';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import { UserJourneyStatus } from 'scripts/models/Status/UserJourneyStatus';
import axios from 'axios';
export class UserJourneysServices {
  public static CancelJourney(id: number) {
    axios.put(`${USER_JOURNEY_URL}/cancel/` + String(id));
  }

  public static async GetUserJourneys(){
    const res = await axios.get(`${USER_JOURNEY_URL}/GetUserJourneys`, { headers: { email: _spPageContextInfo.userEmail}});
    return res.data;
  }

  public static async StartJourney(id: number){
    const res = await axios.post(`${USER_JOURNEY_URL}/${id}`,{} , { headers: { email: _spPageContextInfo.userEmail}});
    return res.data;
  }

  public static getMockUserJourneys(): IUserJourney[] {
    const journeys: IUserJourney[] = [
      {
        Id: 1,
        Title: 'Learn Java',
        Description:
          'Take part in a journey where you\'ll learn many languages, including Java!',
        Level: Level.Beginner,
        Skills: new Array<IUserSkill>(),
        Coach: 'John Doe',
        StartDate: '',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.InProgress,
        OriginalJourney: '',
      },
      {
        Id: 2,
        Title: 'USB tutorial',
        Description:
          'Learn how to plug in your printer with this wacky tutorial.',
        Level: Level.Intermediate,
        Skills: new Array<IUserSkill>(),
        Coach: '22222',
        StartDate: '',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
      {
        Id: 3,
        Title: 'Get McMarkup\'d with this XML journey',
        Description: 'This is boring.',
        Level: Level.Advanced,
        Skills: new Array<IUserSkill>(),
        Coach: 'very old man',
        StartDate: '13-02-2020',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
      {
        Id: 4,
        Title: 'ooky scary selectors',
        Description: 'Centering a div has never been scarier!',
        Level: Level.Intermediate,
        Skills: new Array<IUserSkill>(),
        Coach: 'CSS master dr. John Colorson',
        StartDate: '20-03-2020',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
      {
        Id: 2,
        Title: 'USB tutorial',
        Description:
          'Learn how to plug in your printer with this wacky tutorial.',
        Level: Level.Intermediate,
        Skills: new Array<IUserSkill>(),
        Coach: '22222',
        StartDate: '',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
      {
        Id: 3,
        Title: 'Get McMarkup\'d with this XML journey',
        Description: 'This is boring.',
        Level: Level.Advanced,
        Skills: new Array<IUserSkill>(),
        Coach: 'very old man',
        StartDate: '13-02-2020',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
      {
        Id: 4,
        Title: 'ooky scary selectors',
        Description: 'Centering a div has never been scarier!',
        Level: Level.Intermediate,
        Skills: new Array<IUserSkill>(),
        Coach: 'CSS master dr. John Colorson',
        StartDate: '20-03-2020',
        Rating: 1,
        AverageDuration: 1,
        EndDate: '',
        DueDate: '',
        Trainee: 'me',
        Review: '',
        Status: UserJourneyStatus.Done,
        OriginalJourney: '',
      },
    ];
    return journeys;
  }
}

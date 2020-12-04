import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
import { UserJourneyStatus } from 'scripts/models/Status/UserJourneyStatus';
import { Level } from 'scripts/models/Level/Level';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';

export function getAuxJourneys(): IUserJourney[] {

    const journeys: IUserJourney[] = [
        {
            Id: 1,
            Title: 'Learn Java',
            Description: 'Take part in a journey where you\'ll learn many languages, including Java!',
            Level: Level.Beginner,
            Skills: [],
            Coach: 'John Doe',
            StartDate: '',
            Rating: 1,
            AverageDuration: 1,
            EndDate: '',
            DueDate: '',
            Trainee: 'me',
            Review: '',
            Status: UserJourneyStatus.InProgress,
            OriginalJourney: ''
        },

    ];
    return journeys;
}
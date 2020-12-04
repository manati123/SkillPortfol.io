import { Level } from '../Level/Level';
import { UserJourneyStatus } from './../Status/UserJourneyStatus';
import { IUserSkill } from '../Skill/IUserSkill';

export interface IUserJourney{
    Id: number,
    Title: string,
    Description: string,
    Level: Level,
    Rating: number,
    AverageDuration: number,
    Skills: IUserSkill[],
    StartDate: string,
    EndDate: string,
    DueDate: string,
    Trainee: string,
    Review: string,
    OriginalJourney: string,
    Status: UserJourneyStatus,
    Coach: string
}
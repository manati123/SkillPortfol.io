import { Level } from '../Level/Level';
import { ISkill } from '../Skill/ISkill';

export interface IJourney{
    Id?: number,
    Title: string,
    Description: string,
    Level: Level,
    Rating?: number,
    AverageDuration: number,
    Skills: ISkill[],
    Coach?: string
}
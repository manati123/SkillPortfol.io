import { IActionPoint } from '../ActionPoint/IActionPoint';
import { Level } from '../Level/Level';

export interface ISkill {
    Id?: number,
    Title: string,
    Description: string,
    SubSkills: ISkill[],
    ActionPoints: IActionPoint[],
    Level: Level
}
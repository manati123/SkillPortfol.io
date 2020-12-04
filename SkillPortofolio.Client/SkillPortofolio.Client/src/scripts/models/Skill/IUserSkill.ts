import { Level } from '../Level/Level';
import { IUserActionPoint } from '../ActionPoint/IUserActionPoint';
import { Status } from '../Status/Status';

export interface IUserSkill {
    Id: number,
    Title: string,
    Description: string,
    SubSkills: IUserSkill[],
    ActionPoints: IUserActionPoint[],
    Level: Level,
    Status: ItemStatus
}

type ItemStatus = {
    Value: Status;
};
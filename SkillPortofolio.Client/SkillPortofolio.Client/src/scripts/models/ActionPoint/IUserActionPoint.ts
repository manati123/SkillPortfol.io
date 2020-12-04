import { Status } from '../Status/Status';

export interface IUserActionPoint {
    Id: number,
    Title: string,
    Description: string,
    Resources: string,
    Status: ItemStatus
}

type ItemStatus = {
    Value: Status;
};
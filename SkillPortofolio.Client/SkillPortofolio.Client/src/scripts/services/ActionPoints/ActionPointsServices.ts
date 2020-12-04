import { IActionPoint } from 'scripts/models/ActionPoint/IActionPoint';
import { ACTION_POINTS_URL } from './../endpoints';
import Axios from 'axios';

export class ActionPointsServices {

    public static async CreateActionPoint(actionPoint: IActionPoint): Promise<IActionPoint> {
        const res = await Axios.post(`${ACTION_POINTS_URL}/Create`, actionPoint);
        return res.data;
    }

    public static  async UpdateActionPoint(id: number, actionPoint: IActionPoint): Promise<string> {
        const res = await Axios.put(`${ACTION_POINTS_URL}/Update/${id}`, actionPoint);
        return res.data;
    }

    public static async GetActionPoint(id: number): Promise<IActionPoint> {
        const res = await Axios.get(`${ACTION_POINTS_URL}/Get/${id}`);
        return res.data;
    }

    public static  async GetActionPoints(): Promise<IActionPoint[]> {
        const res = await Axios.get(`${ACTION_POINTS_URL}/GetActionPoints`);
        return res.data;
    }

}
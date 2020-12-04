import { USER_ACTION_POINTS_URL } from './../endpoints';
import Axios from 'axios';

export class UserActionPointsServices {
    public static async CompleteUserActionPoint(id: number): Promise<void> {
        await Axios.put(
            `${USER_ACTION_POINTS_URL}/` + id.toString()
        );
    }
}
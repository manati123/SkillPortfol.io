import { JOURNEYS_URL } from './../endpoints';
import { IJourney } from './../../models/Journey/IJourney';
import Axios from 'axios';

export class JourneyServices {

    public static async GetJourneys(): Promise<IJourney[]> {
        const response = await Axios.get(`${JOURNEYS_URL}/GetJourneys`);
        return response.data;
    }

    public static async GetJourney(id: number): Promise<IJourney> {
        const response = await Axios.get(`${JOURNEYS_URL}/Get/${id}`);
        return response.data;
    }

    public static async CreateJourney(journey: IJourney): Promise<IJourney>{
        const response = await Axios.post(`${JOURNEYS_URL}/Create`, journey, { headers: { email: _spPageContextInfo.userEmail}});
        return response.data;
    }

    public static async UpdateJourney(id: number, journey: IJourney): Promise<string>{
        const response = await Axios.put(`${JOURNEYS_URL}/Update/${id}`, journey, { headers: { email: _spPageContextInfo.userEmail }});
        return response.data;
    }

    public static async RemoveJourney(id: number): Promise<boolean>{
        const response = await Axios.delete(`${JOURNEYS_URL}/Remove/${id}`, { headers: { email: _spPageContextInfo.userEmail }});
        return response.data;
    }
}

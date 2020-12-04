import { USER_SKILLS_URL } from './../endpoints';
import Axios from 'axios';
import { IUserSkill } from 'scripts/models/Skill/IUserSkill';
export class UserSkillsServices {
    public static async GetUserSkills(): Promise<IUserSkill[]> {
        const response = await Axios.get(`${USER_SKILLS_URL}`);
        return response.data;
    }
    public static async completeUserSkill(id: number): Promise<void> {
        await Axios.put(`${USER_SKILLS_URL}` + '/' + id.toString());
    }
}
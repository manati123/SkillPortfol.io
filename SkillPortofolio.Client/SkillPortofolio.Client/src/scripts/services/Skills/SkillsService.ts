import Axios from 'axios';
import { ISkill } from 'scripts/models/Skill/ISkill';
import {SKILLS_URL} from './../endpoints';

export class SkillsService{
    public static async CreateSkill(skill: ISkill): Promise<ISkill>{
        const res = await Axios.post(SKILLS_URL, skill);
        return res.data;
    }

    public static  async UpdateSkill(id: number, skill: ISkill): Promise<string> {
        const res = await Axios.put(`${SKILLS_URL}/${id}`, skill);
        return res.data;
    }

    public static async GetSkill(id: number): Promise<ISkill> {
        const res = await Axios.get(`${SKILLS_URL}/${id}`);
        return res.data;
    }

    public static  async GetSkills(): Promise<ISkill[]> {
        const res = await Axios.get(`${SKILLS_URL}`);
        return res.data;
    }
}
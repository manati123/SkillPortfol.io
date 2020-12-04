import Axios from 'axios';
import { USER_MEMBERSHIP_URL } from '../endpoints';

export interface MembershipType {
  IsInGroup: boolean;
}

export default class UserService {
  public static async CheckMembership(
    GroupName: string
  ): Promise<MembershipType> {
    const res = await Axios({url: USER_MEMBERSHIP_URL + '?GroupName=' + GroupName.toString(), method: 'get', headers: { email: _spPageContextInfo.userEmail}});
    return res.data;
  }
}

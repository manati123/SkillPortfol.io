import { Link } from 'office-ui-fabric-react';
import React, { useState, useEffect } from 'react';
import { COACHES_GROUP } from 'scripts/services/GroupNames';
import UserService from 'scripts/services/Users/UserService';
import './Header.scss';

interface GroupMemberships{
    IsBasicUser: boolean,
    IsCoach: boolean,
    IsAdmin: boolean
}

const Header = () => {
    const [groupMemberships, setGroupMemberships] = useState<GroupMemberships>({
        IsBasicUser: true,
        IsCoach: false,
        IsAdmin: false
    });

    const checkCoach = async () => {
        const response = await UserService.CheckMembership(COACHES_GROUP);
        setGroupMemberships({...groupMemberships, IsCoach: response.IsInGroup});
    };

    useEffect(() => {
        checkCoach();
    }, []);

    return (
        <nav className='spio-nav'>
            <ul>
                {
                    groupMemberships.IsCoach === true &&
                    <li>
                        <Link href='Coach.aspx' >
                            <h2>Coach page</h2>
                        </Link>
                    </li>
                }
                <li>
                    <Link href='Home.aspx' >
                        <h2>Home page</h2>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
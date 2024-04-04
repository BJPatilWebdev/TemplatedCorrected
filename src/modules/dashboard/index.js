import { AppCard } from '@crema';
import { useAuthUser } from '@crema/utility/AuthHooks';
import Profile from 'modules/recruiter/profile/index';
import Seekerdashboard from 'pages/seeker/seekerdashboard';
import React from 'react';

export default function Dasboard() {
    const { user, role } = useAuthUser();

    return (
        <>
            <div>Welcome {user.displayName}</div>
            <AppCard title='Our Association' />
                <pre>{JSON.stringify(user, null, 2)}</pre>

          {role==="recruiter"&& <Profile />}
           {role==="seeker"&& <Seekerdashboard />} 
        </>

    );
}

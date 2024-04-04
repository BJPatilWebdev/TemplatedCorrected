import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Profile = asyncComponent(() =>
  import('../../modules/recruiter/Profile'),
);
export default AppPage(() => <Profile />);

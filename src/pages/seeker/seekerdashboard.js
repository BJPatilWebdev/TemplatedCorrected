import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Seekerdashboard = asyncComponent(() =>
  import('../../modules/seeker/Seekerdashboard'),
);
export default AppPage(() => <Seekerdashboard />);

import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Experience = asyncComponent(() =>
  import('../../modules/seeker/Experience'),
);
export default AppPage(() => <Experience/>);

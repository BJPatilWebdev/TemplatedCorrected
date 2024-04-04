import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Searchforjob = asyncComponent(() =>
  import('../../modules/seeker/Searchforjob/index2'),
);
export default AppPage(() => <Searchforjob />);

import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Jobdetails = asyncComponent(() =>
  import('../../modules/recruiter/Jobdetails'),
);
export default AppPage(() => <Jobdetails />);

import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Page2 = asyncComponent(() =>
  import('../../modules/sample/Page2'),
);
export default AppPage(() => <Page2 />);

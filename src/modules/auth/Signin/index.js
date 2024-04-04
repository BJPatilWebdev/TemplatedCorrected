import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import SigninFirebase from './SigninFirebase';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import {useState} from 'react';
import RollSelectionCards from './RollSelectionCards';

const Signin = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <h1>{selectedOption}</h1>
      {!selectedOption ? (
        <>
          {/* <SelectRole
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          /> */}
          <RollSelectionCards setSelectedOption={setSelectedOption}/>
        </>
      ) : (
        <AuthWrapper>
          <Box sx={{width: '100%'}}>
            <Box sx={{mb: {xs: 6, xl: 8}}}>
              <Box
                sx={{
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AppLogo />
              </Box>
            </Box>
            <SigninFirebase selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
          </Box>
        </AuthWrapper>
      )}
    </>
  );
};

export default Signin;

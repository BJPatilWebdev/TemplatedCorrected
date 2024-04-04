import React from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppInfoView from '../../../@crema/core/AppInfoView';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';
import {Fonts} from '../../../shared/constants/AppEnums';
import {AiOutlineGoogle, AiOutlineTwitter} from 'react-icons/ai';
import {FaFacebookF} from 'react-icons/fa';
import {BsGithub} from 'react-icons/bs';
import {useRouter} from 'next/router';
import {GoogleLoginButton} from 'react-social-login-buttons';
// import {LoginSocialGoogle} from 'reactjs-social-login';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninFirebase = ({selectedOption, setSelectedOption}) => {
  const {
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithPopupForGoogle,
  } = useAuthMethod();
  const history = useRouter();

  const onGoToForgetPassword = () => {
    history.push('/forget-password', {tab: 'firebase'});
  };

  const {messages} = useIntl();
  const handleGoogleSuccess = (data) => {
    console.log('xyz0', data);
    // axios
    //   .post('http://192.168.1.37:4000/user/signup', {
    //     firstName: data.given_name,
    //     lastName: data.family_name,
    //     emailId: data.email,
    //     userType: selectedOption,
    //   })
    //   .then(async function (response, data) {
    //     console.log('Positive Response', response);
    //     await onSuccess(data);
    //   })
    //   .catch(function (error) {
    //     console.log('Errorrr', error);
    //   });
    // history.push('/sample/page-1');
    signInWithPopup(data, selectedOption);
    // signInWithPopupForGoogle(data,selectedOption)
    console.log(provider, 'xyz2', data);
  };
  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            role: selectedOption,
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signInWithEmailAndPassword(data, selectedOption);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={selectedOption}
                  name='role'
                  label={selectedOption}
                  variant='outlined'
                  // disabled
                  onClick={() => setSelectedOption(null)}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email']}
                  name='email'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox sx={{ml: -3}} />
                  <Box
                    component='span'
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                {/* <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box> */}
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: {xs: 5, md: 7},
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.dontHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link href='/signup'>
            <a>
              <IntlMessages id='common.signup' />
            </a>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: {xs: -5, lg: -10},
          mb: {xs: -6, lg: -11},
          mt: 'auto',
          py: 2,
          px: {xs: 5, lg: 10},
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <IconButton
            sx={{
              p: 2,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('google', selectedOption)}
          >
            <GoogleLoginButton
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
              }}
            />
          </IconButton>
          {/* <IntlMessages id='common.orLoginWith' /> */}
          {/* <LoginSocialGoogle
            client_id='137624150911-8nis88df0b2maao7784s5kunipvhr07d.apps.googleusercontent.com'
            scope='openid profile email'
            // access_type="offline"
            onResolve={(response) => {
              console.log( "xyz", response);
              handleGoogleSuccess(response);
          }}
            onReject={(err) => {
              console.log(err);
            }}
            style={{textAlign: 'center'}} // Center align the button contents
          >
            <GoogleLoginButton
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
              }}
            />
          </LoginSocialGoogle> */}
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              p: 2,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('google',selectedOption)}
          >
           <AiOutlineGoogle />
            <img
              width='20'
              height='20'
              src='https://img.icons8.com/color/20/google-logo.png'
              alt='google-logo'
            />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('facebook')}
          >
           <FaFacebookF /> 
            <img width="24" height="24" src="https://img.icons8.com/color/24/facebook.png" alt="facebook"/>
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('github')}
          >
           <BsGithub /> 

            <img width="28" height="28" src="https://img.icons8.com/color/28/github--v1.png" alt="github--v1"/>          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('twitter')}
          >
            <img width="36" height="36" src="https://img.icons8.com/color/36/twitter--v1.png" alt="twitter--v1"/>
            <AiOutlineTwitter /> 
          </IconButton>
        </Box> */}
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninFirebase;

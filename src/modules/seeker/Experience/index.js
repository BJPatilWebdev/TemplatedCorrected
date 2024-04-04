import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, Typography, Box, TextField, Button, MenuItem, Select } from '@mui/material';

import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import DateFnsUtils from '@date-io/date-fns';
import { Chip } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { styled } from '@mui/material/styles';


import { domainKnowledgeOptions, noticePeriodOptions, softSkillsOptions, technicalSkillsOptions } from '../../../shared/constants/Constan';
import { redirect } from 'react-router-dom';



// Custom styled component for the certifications input field container
const CertificationsInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Experience = () => {

  const [education, setEducation] = useState('');
  const [showOtherEducation, setShowOtherEducation] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState('');
  const [showCustomDomain, setShowCustomDomain] = useState(false); // State for custom domain text field
  const [gender, setGender] = useState('');

  const validationSchema = Yup.object().shape({

    mobile: Yup.string()
      .test('is-valid-number', 'Invalid mobile number', (value) => {
        try {
          const phoneNumber = value ? value.toString() : '';
          return phoneNumber.length >= 12 && phoneNumber.length <= 14;
        } catch (error) {
          return false;
        }
      })
      .required('Mobile number is required'),
  


    // Add other validation rules for other fields

    email: Yup.string().email('Invalid email').required('Email is required'),
    currentCity: Yup.string().required('Current city is required'),
    desiredLocation: Yup.string().required('Desired location is required'),
    education: Yup.string().required('Education is required'),
    softSkills: Yup.array().min(1, 'At least one soft skill is required'),
    technicalSkills: Yup.array().min(1, 'At least one technical skill is required'),
    expectedCTC: Yup.number()
      .typeError('Expected CTC must be a number')
      .required('Expected CTC is required')
      .min(0, 'Expected CTC must be greater than or equal to 0')
      .max(20000000, 'Expected CTC must be less than or equal to 2 crore')
      .test('decimal', 'Expected CTC must have up to 2 decimal points', (value) => (value + '').match(/^\d+(\.\d{1,2})?$/)),
    currentCTC: Yup.number()
      .typeError('Current CTC must be a number')
      .required('Current CTC is required')
      .min(0, 'Current CTC must be greater than or equal to 0')
      .max(20000000, 'Current CTC must be less than or equal to 2 crore')
      .test('decimal', 'Current CTC must have up to 2 decimal points', (value) => (value + '').match(/^\d+(\.\d{1,2})?$/)),
    dateOfBirth: Yup.date()
      .typeError('Date of Birth must be a valid date')
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
    achievements: Yup.string().required('Achievements/Accomplishments are required'),
    resume: Yup.mixed().required('Resume is required').test('fileSize', 'File too large', (value) => value && value.size <= 2000000), // 2MB limit
    noticePeriod: Yup.string().required('Notice Period is required'),
    relevantExperience: Yup.number()
      .typeError('Relevant Experience must be a number')
      .required('Relevant Experience is required')
      .min(0, 'Relevant Experience must be greater than or equal to 0')
      .max(50, 'Relevant Experience must be less than or equal to 50')
      .test('decimal', 'Relevant Experience must have up to 2 decimal points', (value) => (value + '').match(/^\d+(\.\d{1,2})?$/)),
    totalExperience: Yup.number()
      .typeError('Total Experience must be a number')
      .required('Total Experience is required')
      .min(0, 'Total Experience must be greater than or equal to 0')
      .max(50, 'Total Experience must be less than or equal to 50')
      .test('decimal', 'Total Experience must have up to 2 decimal points', (value) => (value + '').match(/^\d+(\.\d{1,2})?$/)),
    certificationsDone: Yup.array().of(Yup.string().required('Certificate is required')),
    domainKnowledge: Yup.array().min(1, 'At least one domain knowledge is required'),
    customDomainKnowledge: Yup.string(),
    gender: Yup.string().required('Gender is required'),
  });

  const educationOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate'
  ];

  const cityOptions = [
    'Mumbai',
    'Delhi',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Pune',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Patna',
    'Vadodara',
    // Add more Indian cities as needed
  ];
  
  const popularCities = [
    'Mumbai',
    'Delhi',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Pune',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Patna',
    'Vadodara',
    // Add more popular Indian cities as needed
  ];
  
  const popularDesiredLocations = [
    'Remote',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Mumbai',
    'Delhi NCR',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Nagpur',
    // Add more popular desired locations in India as needed
  ];
  

  const handleEducationChange = (event, newValue) => {
    if (newValue === 'Other') {
      setShowOtherEducation(true);
    } else {
      setShowOtherEducation(false);
    }
    setEducation(newValue);
    formik.setFieldValue('education', newValue);
  };

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      email: '',
      currentCity: '',
      desiredLocation: '',
      education: '',
      softSkills: [],
      technicalSkills: [],
      expectedCTC: '',
      currentCTC: '',
      dateOfBirth: null,
      achievements: '',
      resume: null,
      noticePeriod: '',
      relevantExperience: '',
      totalExperience: '',
      certificationsDone: [''], // Initial certificate field
      domainKnowledge: [],
      customDomainKnowledge: '',
      gender: '', // Initial gender field
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // Add a custom style for input fields
  const inputStyle = {
    marginBottom: '16px', // Adjust as needed
  };



  return (
    <Container maxWidth="md">
      <Box sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h4" gutterBottom>
          Experienced
        </Typography>
        {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <PhoneInput
                defaultCountry="IN"
                value={formik.values.mobile || ''}
                onChange={(value) => formik.setFieldValue('mobile', value)}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                inputProps={{
                  name: 'mobile',
                  id: 'mobile',
                  placeholder: 'Mobile Number',
                }}
                fullWidth
              />
              {formik.touched.mobile && Boolean(formik.errors.mobile) && (
                <Typography variant="caption" display="block" sx={{ color: '#d32f2f', px: 3, pt: 2 }}>
                  {formik.errors.mobile}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="gender"
                name="gender"
                select
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="currentCity"
                name="currentCity"
                select
                label="Current City"
                value={formik.values.currentCity}
                onChange={formik.handleChange}
                error={formik.touched.currentCity && Boolean(formik.errors.currentCity)}
                helperText={formik.touched.currentCity && formik.errors.currentCity}
              >
                {popularCities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="desiredLocation"
                name="desiredLocation"
                select
                label="Desired Location"
                value={formik.values.desiredLocation}
                onChange={formik.handleChange}
                error={formik.touched.desiredLocation && Boolean(formik.errors.desiredLocation)}
                helperText={formik.touched.desiredLocation && formik.errors.desiredLocation}
              >
                {popularDesiredLocations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Education Autocomplete */}
            <Grid item xs={12} md={12}>
              <Autocomplete
                fullWidth
                id="education"
                name="education"
                options={educationOptions}
                value={education}
                onChange={handleEducationChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Education(Highest/Relevant Degree)"
                    error={formik.touched.education && Boolean(formik.errors.education)}
                    helperText={formik.touched.education && formik.errors.education}
                    style={inputStyle}
                  />
                )}
              />
            </Grid>
            {/* Other Education Textfield */}
            {showOtherEducation && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="otherEducation"
                  name="otherEducation"
                  label="Other Education"
                  value={formik.values.otherEducation}
                  onChange={formik.handleChange}
                  error={formik.touched.otherEducation && Boolean(formik.errors.otherEducation)}
                  helperText={formik.touched.otherEducation && formik.errors.otherEducation}
                  style={inputStyle}
                />
              </Grid>
            )}
            {/* Soft Skills */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="softSkills"
                name="softSkills"
                options={softSkillsOptions}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Soft Skills"
                    placeholder="Add soft skills"
                    error={formik.touched.softSkills && Boolean(formik.errors.softSkills)}
                    helperText={formik.touched.softSkills && formik.errors.softSkills}
                  />
                )}
                onChange={(e, value) => formik.setFieldValue('softSkills', value)}
              />
            </Grid>
            {/* Technical Skills */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="technicalSkills"
                name="technicalSkills"
                options={technicalSkillsOptions}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Technical Skills"
                    placeholder="Add technical skills"
                    error={formik.touched.technicalSkills && Boolean(formik.errors.technicalSkills)}
                    helperText={formik.touched.technicalSkills && formik.errors.technicalSkills}
                  />
                )}
                onChange={(e, value) => formik.setFieldValue('technicalSkills', value)}
              />
            </Grid>
            {/* Expected CTC */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="expectedCTC"
                name="expectedCTC"
                label="Expected CTC"
                type="number"
                value={formik.values.expectedCTC}
                onChange={formik.handleChange}
                error={formik.touched.expectedCTC && Boolean(formik.errors.expectedCTC)}
                helperText={formik.touched.expectedCTC && formik.errors.expectedCTC}
              />
            </Grid>
            {/* Current CTC */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="currentCTC"
                name="currentCTC"
                label="Current CTC"
                type="number"
                value={formik.values.currentCTC}
                onChange={formik.handleChange}
                error={formik.touched.currentCTC && Boolean(formik.errors.currentCTC)}
                helperText={formik.touched.currentCTC && formik.errors.currentCTC}
              />
            </Grid>
            {/* Date of Birth */}
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  format="MM/dd/yyyy"
                  value={formik.values.dateOfBirth}
                  onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {/* Achievements */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="achievements"
                name="achievements"
                label="Achievements/Accomplishments"
                multiline
                rows={4}
                value={formik.values.achievements}
                onChange={formik.handleChange}
                error={formik.touched.achievements && Boolean(formik.errors.achievements)}
                helperText={formik.touched.achievements && formik.errors.achievements}
              />
            </Grid>
            {/* Notice Period */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="noticePeriod"
                name="noticePeriod"
                label="Notice Period"
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
                error={formik.touched.noticePeriod && Boolean(formik.errors.noticePeriod)}
                helperText={formik.touched.noticePeriod && formik.errors.noticePeriod}
              />
            </Grid>
            {/* Relevant Experience */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="relevantExperience"
                name="relevantExperience"
                label="Relevant Experience (in years)"
                type="number"
                value={formik.values.relevantExperience}
                onChange={formik.handleChange}
                error={formik.touched.relevantExperience && Boolean(formik.errors.relevantExperience)}
                helperText={formik.touched.relevantExperience && formik.errors.relevantExperience}
              />
            </Grid>
            {/* Total Experience */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="totalExperience"
                name="totalExperience"
                label="Total Experience (in years)"
                type="number"
                value={formik.values.totalExperience}
                onChange={formik.handleChange}
                error={formik.touched.totalExperience && Boolean(formik.errors.totalExperience)}
                helperText={formik.touched.totalExperience && formik.errors.totalExperience}
              />
            </Grid>
            {/* Certifications Done */}
            <Grid item xs={12}>
              {formik.values.certificationsDone.map((cert, index) => (
                <div key={index}>
                <TextField
                  fullWidth
                  name={`certificationsDone.${index}`} // Use backticks to include the index dynamically
                  label={`Certificate #${index + 1}`} // Use backticks to include the index dynamically
                  value={cert}
                  onChange={formik.handleChange}
                />
                {/* Check if the field is touched and has errors */}
                {formik.touched.certificationsDone && formik.errors.certificationsDone && formik.errors.certificationsDone[index] ? (
                  <div style={{color:'red'}}>{formik.errors.certificationsDone[index]}</div>
                ) : null}
              </div>
              ))}
              <Button
                type="button"
                onClick={() => formik.setFieldValue('certificationsDone', [...formik.values.certificationsDone, ''])}
                startIcon={<AddIcon />}
              >
                Add Certificate
              </Button>
            </Grid>
            {/* Domain Knowledge */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="domainKnowledge"
                name="domainKnowledge"
                options={domainKnowledgeOptions}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Domain Knowledge"
                    placeholder="Add domain knowledge"
                    error={formik.touched.domainKnowledge && Boolean(formik.errors.domainKnowledge)}
                    helperText={formik.touched.domainKnowledge && formik.errors.domainKnowledge}
                  />
                )}
                onChange={(e, value) => formik.setFieldValue('domainKnowledge', value)}
              />
            </Grid>
            {/* Custom Domain Knowledge */}
            {showCustomDomain && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="customDomainKnowledge"
                  name="customDomainKnowledge"
                  label="Custom Domain Knowledge"
                  value={formik.values.customDomainKnowledge}
                  onChange={formik.handleChange}
                  error={formik.touched.customDomainKnowledge && Boolean(formik.errors.customDomainKnowledge)}
                  helperText={formik.touched.customDomainKnowledge && formik.errors.customDomainKnowledge}
                />
              </Grid>
            )}
            {/* Resume */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Upload Resume
              </Typography>
              <input
                id="resume"
                name="resume"
                type="file"
                onChange={(event) => formik.setFieldValue("resume", event.currentTarget.files[0])}
              />
              {formik.touched.resume && formik.errors.resume ? (
                <div>{formik.errors.resume}</div>
              ) : null}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Experience;
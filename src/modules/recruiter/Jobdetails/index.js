import React from 'react';
import { useState } from 'react';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, Typography, Box, MenuItem, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useAuthUser } from '@crema/utility/AuthHooks';
import { serverLink } from 'shared/constants/Constan';
// import JobDetails from './JobDetails';

const Jobdetails = () => {

    const [showOtherCertificate, setShowOtherCertificate] = useState(false);

    // Form submission logic
    const onSubmit = (values) => {
        // Redirect to job detail page with form values in URL query parameters
        window.location.href = `/job-details?jobTitle=${values.jobTitle}&companyName=${values.companyName}&jobDescription=${values.jobDescription}&totalExperience=${values.totalExperience}`;
    };
    const certificationOptions = [
        'Certification 1',
        'Certification 2',
        'Certification 3',
        'Other' // Added "Other" option
    ];

    const handleCertificateChange = (event, newValue) => {
        if (newValue === 'Other') {
            setShowOtherCertificate(true);
        } else {
            setShowOtherCertificate(false);
        }
        formik.setFieldValue('certifications', newValue);
    };

    const [showOtherEducation, setShowOtherEducation] = useState(false);

    const handleEducationChange = (event, newValue) => {
        if (newValue === 'Other') {
            setShowOtherEducation(true);
        } else {
            setShowOtherEducation(false);
        }
        formik.setFieldValue('education', newValue);
    };
    // Define domain options
    const domainOptions = [
        { value: 'BFSI', label: 'Banking, Financial Services and Insurance' },
        { value: 'TME', label: 'Telecommunications, Media & Entertainment' },
        { value: 'Manufacturing', label: 'Manufacturing' },
        { value: 'Retail & Consumer Goods', label: 'Retail & Consumer Goods' },
        { value: 'Healthcare & Life Sciences', label: 'Healthcare & Life Sciences' },
        { value: 'Public Services', label: 'Public Services' },
        { value: 'Travel & Transportation', label: 'Travel & Transportation' },
        { value: 'Energy & Utilities', label: 'Energy & Utilities' },
        { value: 'EdTech', label: 'Education Technology (EdTech)' },
        { value: 'Agriculture', label: 'Agriculture' },
        // { value: 'Other', label: 'Other' }
        // Add more options as needed
    ];

    // Define notice period options
    const noticePeriodOptions = [
        { value: 'Immediately', label: 'Immediately' },
        { value: '1 month', label: '1 month' },
        { value: '2 months', label: '2 months' },
        { value: '3 months', label: '3 months' },
        { value: 'More than 3 months', label: 'More than 3 months' },
        // Add more options as needed
    ];

    // Define soft skills options
    const softSkillsOptions = [
        'Communication',
        'Problem-solving',
        'Assertiveness',
        'Teamwork',
        'Adaptability',
        'Critical Thinking',
        'Listening',
        'Attention to detail',
        'Work Ethic',
        'Customer Service',
        'Leadership',
        'Other'
        // Add more soft skills here...
    ];

    // Define technical skills options
    const technicalSkillsOptions = [
        'Python',
        'Java',
        'Javascript',
        'C',
        'C++',
        'Kotlin',
        'React',
        'Next.JS',
        'MySQL',
        'MongoDB',
        'PostgreSQL',
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Google Cloud Platform (GCP)',
        'Other'
        // Add more technical skills here...
    ];

    // Define education options
    const educationOptions = [
        'High School Diploma',
        'Associate Degree',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'Doctorate'

        // Add more education options as needed
    ];

    const validationSchema = Yup.object().shape({
        jobTitle: Yup.string()
            // .trim() // Ensure the value is a string before trimming
            .required('Job Title is required')
            .matches(/^[A-Za-z]+(?:[ _-][A-Za-z0-9]+)*$/, 'Job Title must contain only letters or a mixture of letters and numbers'),
        // Other validation rules for other fields...
        companyName: Yup.string()
            .trim()
            .required('Company Name is required')
            .matches(/^[A-Za-z]+(?:[ _-][A-Za-z0-9]+)*$/, 'Company Name must contain only letters or a mixture of letters and numbers'),
        jobDescription: Yup.string()
            .trim()
            .required('Job Description is required')
            .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'Job Description must contain only letters or a mixture of letters and numbers'),
        totalExperience: Yup.number()
            .required('Total Experience is required')
            .min(0, 'Total Experience must be greater than or equal to 0')
            .max(50, 'Total Experience must be less than or equal to 50'),
        // accomplishments: Yup.string()
        //     .trim()
        //     .nullable()
        //     .matches(/^[A-Za-z0-9 .,!?'-]+$/, 'Accomplishments/Achievements must contain only letters, numbers, spaces, and basic punctuation')
        //     .required('Accomplishments/Achievements are required'),
        // uploadFile: Yup.mixed().required('File is required'), // Validation for file upload
        expectedCtc: Yup.number()
            .required('Maximum Expected CTC (IN LPA INR) is required')
            .min(0, 'Maximum Expected CTC must be greater than or equal to 0')
            .max(20000000, 'Maximum Expected CTC must be less than or equal to 2 crore'), // Limit set to 2 crore (20,000,000 INR)
        noticePeriod: Yup.string()
            .required('Notice Period is required'), // Validation for notice period
        domain: Yup.array().min(1, 'At least one domain is required'), // Validation for domain selection
        softSkills: Yup.array().min(1, 'At least one soft skill is required'), // Validation for soft skills selection
        technicalSkills: Yup.array().min(1, 'At least one technical skill is required'), // Validation for technical skills selection
        education: Yup.string().required('Education is required'), // Validation for education selection
        // Your existing validation schema
        certifications: Yup.string().required('Certificate is required').nullable()
    });
    const { user } = useAuthUser()
    // Initialize Formik form
    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            companyName: '',
            jobDescription: '',
            totalExperience: '',
            accomplishments: '',
            uploadFile: null,
            expectedCtc: '',
            certifications: '',
            noticePeriod: '', // Initial value for notice period
            domain: [], // Initial value for domain
            softSkills: [], // Initial value for soft skills
            technicalSkills: [], // Initial value for technical skills
            education: '', // Initial value for education
            userIdRef:1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission

            console.log(values);
            axios.post("http://192.168.1.40:4080/jobinfo/jobinfo", values)
            axios.post(`${serverLink}/jobinfo/jobinfo`, values)
                .then(async function (response, data) {
                    console.log("Positive Response", response);

                    // await (onSuccess(data));
                })
                .catch(function (error) {
                    console.log("Errorrr", error);
                });


        },
    });

    // Predefined list of job titles
    const jobTitles = [
        'UX UI Designer',
        'Product Manager',
        'Data Scientist',
        'Security Engineer',
        'QA Tester',
        'DevOps Engineer',
        'Full-Stack Developer',
        'Back-End Developer',
        'Front-End Developer',
        'Scrum Master',
        'Project Manager',
        'Delivery manager',
        'Agile Coach',
        'Product Owner',
        'Business Analyst',
        'Configuration Manager',
        'Quality Assurance Manager',
        'Developer',
        'Senior Developer',
        'Tech. Lead',
        'Team Lead',
        'Other'
    ];


    return (
        <Container maxWidth="md">
            <Box sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '2rem', backgroundColor: 'white' }}>
                <Typography variant="h4" gutterBottom>
                    Post New Job
                </Typography>
                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}


                <form onSubmit={(formik.handleSubmit)}>
                    <Grid container spacing={2}>
                        {/* Company Name and Job Title */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="companyName"
                                name="companyName"
                                label="Company Name"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                helperText={formik.touched.companyName && formik.errors.companyName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                fullWidth
                                id="jobTitle"
                                name="jobTitle"
                                options={jobTitles}
                                value={formik.values.jobTitle}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('jobTitle', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Job Title"
                                        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                                        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                                    />
                                )}
                                filterOptions={(options, params) => {
                                    const filtered = createFilterOptions()(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            label: params.inputValue,
                                            value: params.inputValue,
                                        });
                                    }
                                    return filtered;
                                }}
                            />
                        </Grid>
                        {/* Rest of the fields */}

                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                fullWidth
                                multiple // Enable multiple selection
                                id="softSkills"
                                name="softSkills"
                                options={softSkillsOptions}
                                value={formik.values.softSkills}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('softSkills', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Skills-Soft"
                                        error={formik.touched.softSkills && Boolean(formik.errors.softSkills)}
                                        helperText={formik.touched.softSkills && formik.errors.softSkills}
                                    />
                                )}
                                // Allow free text entry for 'Other'
                                filterOptions={(options, params) => {
                                    const filtered = createFilterOptions()(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            label: params.inputValue,
                                            value: params.inputValue,
                                        });
                                    }
                                    return filtered;
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                fullWidth
                                multiple // Enable multiple selection
                                id="technicalSkills"
                                name="technicalSkills"
                                options={technicalSkillsOptions}
                                value={formik.values.technicalSkills}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('technicalSkills', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Skills-Technical"
                                        error={formik.touched.technicalSkills && Boolean(formik.errors.technicalSkills)}
                                        helperText={formik.touched.technicalSkills && formik.errors.technicalSkills}
                                    />
                                )}
                                // Allow free text entry for 'Other'
                                filterOptions={(options, params) => {
                                    const filtered = createFilterOptions()(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            label: params.inputValue,
                                            value: params.inputValue,
                                        });
                                    }
                                    return filtered;
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                id="certifications"
                                name="certifications"
                                options={certificationOptions}
                                value={formik.values.certifications}
                                onChange={handleCertificateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Certifications Required"
                                        error={formik.touched.certifications && Boolean(formik.errors.certifications)}
                                        helperText={formik.touched.certifications && formik.errors.certifications}
                                    />
                                )}
                                filterOptions={(options, params) => {
                                    const filtered = createFilterOptions()(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            label: params.inputValue,
                                            value: params.inputValue,
                                        });
                                    }
                                    return filtered;
                                }}
                            />
                        </Grid>
                        {showOtherCertificate && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="otherCertificate"
                                    name="otherCertificate"
                                    label="Other Certificate"
                                    value={formik.values.otherCertificate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otherCertificate && Boolean(formik.errors.otherCertificate)}
                                    helperText={formik.touched.otherCertificate && formik.errors.otherCertificate}
                                />
                            </Grid>
                        )}
                        {/* Education Autocomplete */}
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                fullWidth
                                id="education"
                                name="education"
                                options={educationOptions}
                                value={formik.values.education}
                                onChange={handleEducationChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Education"
                                        error={formik.touched.education && Boolean(formik.errors.education)}
                                        helperText={formik.touched.education && formik.errors.education}
                                    />
                                )}
                            />
                        </Grid>
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
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                id="noticePeriod"
                                name="noticePeriod"
                                label="Notice Period Expected(Max In Months)"
                                value={formik.values.noticePeriod}
                                onChange={formik.handleChange}
                                error={formik.touched.noticePeriod && Boolean(formik.errors.noticePeriod)}
                                helperText={formik.touched.noticePeriod && formik.errors.noticePeriod}
                            >
                                {noticePeriodOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="expectedCtc"
                                name="expectedCtc"
                                label="Maximum Expected CTC  Requirement(IN LPA INR)"
                                type="number"
                                value={formik.values.expectedCtc}
                                onChange={formik.handleChange}
                                error={formik.touched.expectedCtc && Boolean(formik.errors.expectedCtc)}
                                helperText={formik.touched.expectedCtc && formik.errors.expectedCtc}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="totalExperience"
                                name="totalExperience"
                                label="Total Experience Required (in years)"
                                type="number"
                                value={formik.values.totalExperience}
                                onChange={formik.handleChange}
                                error={formik.touched.totalExperience && Boolean(formik.errors.totalExperience)}
                                helperText={formik.touched.totalExperience && formik.errors.totalExperience}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {/* Job Description */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="jobDescription"
                                        name="jobDescription"
                                        label="Job Description"
                                        multiline
                                        rows={4}
                                        value={formik.values.jobDescription}
                                        onChange={formik.handleChange}
                                        error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
                                        helperText={formik.touched.jobDescription && formik.errors.jobDescription}
                                    />
                                </Grid>
                                {/* Accomplishments/Achievements */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="accomplishments"
                                        name="accomplishments"
                                        label="Accomplishments/Achievements"
                                        multiline
                                        rows={4}
                                        value={formik.values.accomplishments}
                                        onChange={formik.handleChange}
                                        error={formik.touched.accomplishments && Boolean(formik.errors.accomplishments)}
                                        helperText={formik.touched.accomplishments && formik.errors.accomplishments}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Domain */}
                            <Autocomplete
                                fullWidth
                                multiple // Enable multiple selection
                                id="domain"
                                name="domain"
                                options={domainOptions}
                                value={formik.values.domain}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('domain', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Domain Knowledge(If required)"
                                        error={formik.touched.domain && Boolean(formik.errors.domain)}
                                        helperText={formik.touched.domain && formik.errors.domain}
                                    />
                                )}
                                // Allow free text entry for 'Other'
                                filterOptions={(options, params) => {
                                    const filtered = createFilterOptions()(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            label: params.inputValue,
                                            value: params.inputValue,
                                        });
                                    }
                                    return filtered;
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="uploadFile"
                                name="uploadFile"
                                label="Upload JD (PDF/DOC/DOCX)"
                                onChange={(event) => {
                                    formik.setFieldValue("uploadFile", event.currentTarget.files[0]);
                                }}
                                error={formik.touched.uploadFile && Boolean(formik.errors.uploadFile)}
                                helperText={formik.touched.uploadFile && formik.errors.uploadFile}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </form>


            </Box>
        </Container>
    );
};

export default Jobdetails;
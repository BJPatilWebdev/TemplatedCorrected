import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Typography,
    Container,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    InputLabel,
    FormControl,
    Button,
    TextField,
    Modal,
    Box,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import AppDialog from '@crema/core/AppDialog';

const jobRoles = [
    'Management Skills',
    'UX/UI Designer',
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
];

const desiredLocations = [
    'New York',
    'San Francisco',
    'London',
    'Berlin',
    'Singapore',
    'Tokyo',
    'Sydney',
    'Pune',
    'Mumbai',
    'Latur',
];

const itCompanies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Facebook',
    'Apple',
    'Netflix',
    'Salesforce',
    'Oracle',
    'Adobe',
    'IBM',
];

const technologySkills = [
    'Python',
    'Java',
    'JavaScript',
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
];

const validationSchema = Yup.object().shape({
    jobRole: Yup.string().required('Required'),
    desiredLocation: Yup.string().required('Required'),
    company: Yup.string().required('Required'),
    technology: Yup.string().required('Required'),
});

const Searchforjob = () => {
    const formik = useFormik({
        initialValues: {
            jobRole: 'Product Manager',
            desiredLocation: 'Berlin',
            company: 'Microsoft',
            technology: 'Java',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Here you can perform your form submission action, for example:
                const response = await axios.get(
                    `https://sheet.best/api/sheets/e20827f3-0442-403f-84f8-59e36756c007`
                );
                console.log('Form values:', values);
                const filtereddata = response.data.filter(
                    (item) =>
                        item.jobRole.toLowerCase() === values.jobRole.toLowerCase() &&
                        item.desiredLocation.toLowerCase() === values.desiredLocation.toLowerCase() &&
                        item.company.toLowerCase() === values.company.toLowerCase() &&
                        item.technology.toLowerCase() === values.technology.toLowerCase()
                );
                console.log('Filtered Data', filtereddata);
                setfilterData(filtereddata)
            } catch (error) {
                console.error('Form submission error:', error);
            }
        },
    });
    const [filterData, setfilterData] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const toggleOpen = () => {
        setOpenModal(!openModal)
    };
    const [selectedJobDetail, setSelectedJobDetail] = useState({});
    const handleDetails = (row) => {
        setSelectedJobDetail(row);
        toggleOpen()
    };
    const handleSubmitApplication = () =>{
        console.log('Your Applicatkoin Submitted',selectedJobDetail.jobRole)
    }
    return (
        <Container>
            <Typography variant="h4" align="center" m={5}>
                Search Jobs
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="jobRole-label">Job Role</InputLabel>
                            <Select
                                labelId="jobRole-label"
                                id="jobRole"
                                name="jobRole"
                                value={formik.values.jobRole}
                                onChange={formik.handleChange}
                                error={formik.touched.jobRole && Boolean(formik.errors.jobRole)}
                            >
                                <MenuItem value="">Select Job Role</MenuItem>
                                {jobRoles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.jobRole && formik.errors.jobRole ? (
                                <Typography color="error">{formik.errors.jobRole}</Typography>
                            ) : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="location-label">Location</InputLabel>
                            <Select
                                labelId="location-label"
                                id="location-select"
                                name="desiredLocation"
                                value={formik.values.desiredLocation}
                                onChange={formik.handleChange}
                                error={formik.touched.desiredLocation && Boolean(formik.errors.desiredLocation)}
                            >
                                <MenuItem value="">Select Location</MenuItem>
                                {desiredLocations.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.desiredLocation && formik.errors.desiredLocation ? (
                                <Typography color="error">{formik.errors.desiredLocation}</Typography>
                            ) : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="company-label">Company</InputLabel>
                            <Select
                                labelId="company-label"
                                id="company-select"
                                name="company"
                                value={formik.values.company}
                                onChange={formik.handleChange}
                                error={formik.touched.company && Boolean(formik.errors.company)}
                            >
                                <MenuItem value="">Select Job Role</MenuItem>
                                {itCompanies.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.company && formik.errors.company ? (
                                <Typography color="error">{formik.errors.company}</Typography>
                            ) : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="technology-label">Technology</InputLabel>
                            <Select
                                labelId="technology-label"
                                id="technology"
                                name="technology"
                                value={formik.values.technology}
                                onChange={formik.handleChange}
                                error={formik.touched.technology && Boolean(formik.errors.technology)}
                            >
                                <MenuItem value="">Select Job Role</MenuItem>
                                {technologySkills.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.technology && formik.errors.technology ? (
                                <Typography color="error">{formik.errors.technology}</Typography>
                            ) : null}
                        </FormControl>
                    </Grid>
                    {/* Repeat similar structure for other form fields */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth m={3}>
                            Search
                        </Button>
                    </Grid>
                </Grid>

            </form>

            {filterData && (
                <>
                    <Typography variant="h4" align="center" m={5}>
                        Jobs Available for you
                    </Typography>
                    <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Job Role</TableCell>
                                    <TableCell>Desired Location</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Technology</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.jobRole}</TableCell>
                                        <TableCell>{row.desiredLocation}</TableCell>
                                        <TableCell>{row.company}</TableCell>
                                        <TableCell>{row.technology}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => handleDetails(row)}
                                            >
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
            <AppDialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="job-detail-modal-title"
                aria-describedby="job-detail-modal-description"
            // className={classes.modal}
            >
                <Box
                //  className={classes.paper}
                >
                    <Typography variant="h4" id="job-detail-modal-title" gutterBottom>
                        Job Details
                    </Typography>
                    <Typography variant="body1" id="job-detail-modal-description">


                    </Typography>
                    <div>
                        <Typography variant="body1" gutterBottom>
                            <strong>Job Role:</strong> {selectedJobDetail.jobRole}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Job Location:</strong> {selectedJobDetail.jobRole}
                        </Typography>
                        {/*
                         <Typography variant="body1" gutterBottom>
                            <strong>Job Title:</strong> {selectedJobDetail.jobTitle}
                        </Typography> 
                        <Typography variant="body1" gutterBottom>
                            <strong>Company Name:</strong> {selectedJobDetail.companyName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Job Description:</strong> {selectedJobDetail.jobDescription}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Total Experience:</strong> {selectedJobDetail.totalExperience}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Accomplishments:</strong> {selectedJobDetail.accomplishments}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Uploaded File:</strong> {selectedJobDetail.uploadFile}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Expected CTC:</strong> {selectedJobDetail.expectedCTC}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Notice Period:</strong> {selectedJobDetail.noticePeriod}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Domain:</strong> {selectedJobDetail.domain}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Soft Skills:</strong> {selectedJobDetail.softSkills}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Technical Skills:</strong> {selectedJobDetail.technicalSkills}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Education:</strong> {selectedJobDetail.education}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Certifications:</strong> {selectedJobDetail.certifications}
                        </Typography> */}
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}
                            onClick={handleSubmitApplication}
                        >
                            Apply
                        </Button>
                    </div>

                </Box>
            </AppDialog>
        </Container>
    );
};

export default Searchforjob;

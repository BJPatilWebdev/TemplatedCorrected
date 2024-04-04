import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  MenuItem,
  withStyles,
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


const Searchforjob = ({ styles }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [otherRole, setOtherRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [otherLocation, setOtherLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [otherCompany, setOtherCompany] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [otherTechnology, setOtherTechnology] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);

  const fetchGoogleSheetRow = async (column, value) => {
    try {
      const response = await axios.get(
        `https://sheet.best/api/sheets/e20827f3-0442-403f-84f8-59e36756c007?${column}=${value}`
      );
      // console.log('first2',response)
      const filteredData = response.data.filter(
        (item) => item.jobRole.toLowerCase() === value.toLowerCase(),
      );
      setSelectedData(filteredData);
    } catch (error) {
      console.error('Error fetching Google Sheet row:', error);
    }
  };

  const handleFilterChange = async (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'jobRole':
        setSelectedRole(value);
        if (value === 'Other') {
          setSelectedData([]);
        } else {
          await fetchGoogleSheetRow(name, value);
        }
        break;
      case 'desiredLocation':
        setSelectedLocation(value);
        break;
      case 'company':
        setSelectedCompany(value);
        break;
      case 'technology':
        setSelectedTechnology(value);
        break;
      default:
        break;
    }
  };

  const handleOtherOptionChange = (event, stateSetter) => {
    stateSetter(event.target.value);
  };

  const handleDetailButtonClick = (job) => {
    console.log('Details for job:', job);
    setSelectedJobDetail(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSubmitApplication = () => {
    // Dummy function to simulate application submission
    console.log('Application submitted successfully!');
    // Here you can add code to send the application details to the backend/database
  };
  return (
    <Container
    // className={styles.container}
    >
      <Typography variant='h4' align='center' m={5}>
        Search Jobs
      </Typography>
      <Grid container justify='center' alignItems='center' spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <InputLabel id='job-role-label'>Job Role</InputLabel>
            <Select
              labelId='job-role-label'
              id='job-role-select'
              name='jobRole'
              value={selectedRole}
              onChange={handleFilterChange}
            >
              <MenuItem value=''>Select Job Role</MenuItem>
              {jobRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
            {selectedRole === 'Other' && (
              <TextField
                label='Enter Job Role'
                value={otherRole}
                onChange={(event) =>
                  handleOtherOptionChange(event, setOtherRole)
                }
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <InputLabel id='location-label'>Location</InputLabel>
            <Select
              labelId='location-label'
              id='location-select'
              name='desiredLocation'
              value={selectedLocation}
              onChange={handleFilterChange}
            >
              <MenuItem value=''>Select Location</MenuItem>
              {desiredLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
            {selectedLocation === 'Other' && (
              <TextField
                label='Enter Location'
                value={otherLocation}
                onChange={(event) =>
                  handleOtherOptionChange(event, setOtherLocation)
                }
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <InputLabel id='company-label'>Company</InputLabel>
            <Select
              labelId='company-label'
              id='company-select'
              name='company'
              value={selectedCompany}
              onChange={handleFilterChange}
            >
              <MenuItem value=''>Select Company</MenuItem>
              {itCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
            {selectedCompany === 'Other' && (
              <TextField
                label='Enter Company'
                value={otherCompany}
                onChange={(event) =>
                  handleOtherOptionChange(event, setOtherCompany)
                }
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant='outlined' sx={{ width: '100%' }}>
            <InputLabel id='technology-label'>Technology</InputLabel>
            <Select
              labelId='technology-label'
              id='technology-select'
              name='technology'
              value={selectedTechnology}
              onChange={handleFilterChange}
            >
              <MenuItem value=''>Select Technology</MenuItem>
              {technologySkills.map((tech) => (
                <MenuItem key={tech} value={tech}>
                  {tech}
                </MenuItem>
              ))}
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
            {selectedTechnology === 'Other' && (
              <TextField
                label='Enter Technology'
                value={otherTechnology}
                onChange={(event) =>
                  handleOtherOptionChange(event, setOtherTechnology)
                }
              />
            )}
          </FormControl>
        </Grid>
      </Grid>
      {selectedData && (
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
              {selectedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.jobRole}</TableCell>
                  <TableCell>{row.desiredLocation}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.technology}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleDetailButtonClick(row)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
            {selectedJobDetail && (
              <div>
                <Typography variant="body1" gutterBottom>
                  <strong>Job Title:</strong> {selectedJobDetail.jobTitle}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Company Name:</strong> {companyName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Job Description:</strong> {jobDescription}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Total Experience:</strong> {totalExperience}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Accomplishments:</strong> {accomplishments}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Uploaded File:</strong> {uploadFile}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Expected CTC:</strong> {expectedCTC}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Notice Period:</strong> {noticePeriod}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Domain:</strong> {domain}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Soft Skills:</strong> {softSkills}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Technical Skills:</strong> {technicalSkills}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Education:</strong> {education}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Certifications:</strong> {certifications}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmitApplication}>
                  Apply
                </Button>
              </div>
            )}

          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

// export default withStyles(styles)(Searchforjob);
//
export default Searchforjob;
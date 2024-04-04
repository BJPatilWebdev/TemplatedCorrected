import React from 'react';
import { Box } from '@mui/material';
import AppPageMeta from '../../../@crema/core/AppPageMeta';
import {useState, useMemo, useEffect} from 'react'; 
import  styles from '../../../modules/css/RecruiterDashboard.module.css';
import Link from "next/link"
//  import jobpost from '/assets/images/ps-job.png';
// import jobposted from '/assets/images/jb-posted.png';
      // import NewJobPostForm from './NewJobPostForm'
      import {ColDef, AgGridReact} from 'ag-grid-react';
      import 'ag-grid-community/styles/ag-grid.css';
      import 'ag-grid-community/styles/ag-theme-alpine.css';
      import {FaUserCircle} from 'react-icons/fa'; // Import FaUserCircle icon

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
      const [username, setUsername] = useState('Muskan');
      const [companyName, setCompanyName] = useState('AGile');
      const [contact, setContact] = useState('9098988789');
      const [password, setPassword] = useState('');
      const [editing, setEditing] = useState(false);
      const [newUsername, setNewUsername] = useState('');
      const [newCompanyName, setNewCompanyName] = useState('');
      const [newContact, setNewContact] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [usernameError, setUsernameError] = useState('');
      const [companyNameError, setCompanyNameError] = useState('');
      const [contactError, setContactError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [postedJobs, setPostedJobs] = useState([]);
      const [showPostedJobs, setShowPostedJobs] = useState(false);
      const [showPostNewJob, setShowPostNewJob] = useState(true); // New state variable for controlling visibility of BootsRecruiter



      const [showUserProfile, setShowUserProfile] = useState(false);
    // useEffect(() => {
    //     // Fetch user details when the component mounts
    //     // fetchUserProfile();
    // }, []);

    // const fetchUserProfile = async () => {
    //     try {
    //         const response = await fetch('/api/userProfile'); // Replace '/api/userProfile' with your actual backend API endpoint
    //         if (response.ok) {
    //             const userData = await response.json();
    //             // Set user profile state and populate form fields
    //             setUserProfile(userData);
    //             setUsername(userData.username);
    //             setCompanyName(userData.companyName);
    //             setContact(userData.contact);
    //             setPassword(userData.password);
    //         } else {
    //             console.error('Failed to fetch user profile');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user profile:', error);
    //     }
    // };
    // useEffect(() => {
    //     const storedJobs = JSON.parse(localStorage.getItem('postedJobs'));
    //     if (storedJobs) {
    //         setPostedJobs(storedJobs);
    //     }
    // }, []);
   
   

    const togglePostNewJob = () => {
        setShowPostNewJob(!showPostNewJob);
      setShowPostedJobs(false);
      setShowUserProfile(false);
    };

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile);
      setShowPostedJobs(false);
      setShowPostNewJob(false);
    };

    const togglePostedJobs = () => {
        setShowPostedJobs(!showPostedJobs);
      setShowUserProfile(false);
      setShowPostNewJob(false);
    };

    // useEffect(() => {
    //     const storedJobs = JSON.parse(localStorage.getItem('postedJobs'));
    //     if (storedJobs) {
    //         setPostedJobs(storedJobs);
    //     }
    // }, []);
 // Define column definitions for the AgGridReact component
 const columnDefs = [
      {headerName: 'Job Title', field: 'jobTitle' },
      {headerName: 'Applications Received', field: 'applicationsReceived' },
      {headerName: 'Available Job Positions', field: 'availablePositions' }
      ];
    
const handlePostJob = (newJob) => {
    // Add the new job to the postedJobs array
    const updatedPostedJobs = [...postedJobs, newJob];
      setPostedJobs(updatedPostedJobs);
      // Store the updated jobs in localStorage
      localStorage.setItem('postedJobs', JSON.stringify(updatedPostedJobs));
      // Hide the new job post form
      setShowPostNewJob(false);
};
  return (
    <>
      <AppPageMeta />
    
      <div className={styles.rcdashboardmainpage}>
        <div className={styles.rcdashnav}>
          <h1>Recruiter Dashboard</h1>
          <div className={styles.usericonwrapper} onClick={toggleUserProfile}>
            <FaUserCircle className={styles.rcuser} />
          </div>
        </div>
        <div className={styles.recruiterstatusbox}>
          <div className={styles.statusboxes}>
          <div className={ styles.rcapplications} onClick={togglePostNewJob}>

              <img src='/assets/images/ps-job.png' className={styles.jobpost} />
             
              <Link href={'/recruiter/jobdetails'} >
                        <h1 type='submit' >
                        Post New Job
                        </h1>
                    </Link>
            </div>

            <div className={styles.rcjobpost}
            // {showPostedJobs &&  {styles.selectedbox}  } 
            onClick={togglePostedJobs}>
          <img src='/assets/images/jb-posted.png' className={styles.jobpost} />
            <h1>My Jobs Posted</h1>
          </div>
        </div>
      </div>
      {showUserProfile && (
        <div className={styles.userprofileform}>
          <div className={styles.userprofiledisplay}>
            <div className={styles.profileinfo}>
              <label>Username:</label>
              {editing ? (
                <input type='text' className={styles.proform} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              ) : (
                <span>{username}</span>
              )}
            </div>
            <div className={styles.error}>{usernameError}</div>
            <div className={styles.profileinfo}>
              <label>Company Name:</label>
              {editing ? (
                <input type='text' className={styles.proform} value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} />
              ) : (
                <span>{companyName}</span>
              )}
            </div>
            <div className={styles.error}>{companyNameError}</div>
            <div className={styles.profileinfo}>
              <label>Contact:</label>
              {editing ? (
                <input type='text' className={styles.proform} value={newContact} onChange={(e) => setNewContact(e.target.value)} />
              ) : (
                <span>{contact}</span>
              )}
            </div>
            <div className={styles.error}>{contactError}</div>
            <div className={styles.profileinfo}>
              <label>Password:</label>
              {editing ? (
                <input type='password' className={styles.proform} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              ) : (
                <span>****</span>
              )}
            </div>
            <div className={styles.error}>{passwordError}</div>
            {editing ? (
              <button onClick={() => setEditing(false)}>Cancel</button>
            ) : (
              <button onClick={() => setEditing(true)}>Update</button>
            )}
          </div>
        </div>
      )}
      {showPostedJobs && (
        <div className={styles.agthemealpine} style={{ height: '200px', width: '100%' }}>
          <AgGridReact rowData={postedJobs} columnDefs={columnDefs}></AgGridReact>
        </div>
      )}

      {/* {showPostNewJob && <NewJobPostForm onPostJob={handlePostJob} />} */}

    </div >
    </>
  );
};

export default Profile;

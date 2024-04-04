import React, { useState } from 'react';
import { FaUserCircle, FaCheck } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import Link from 'next/link'
 //import board from '/assets/images/seeker.png';
import styles from '../../../modules/css/SeekerDashboard.module.css';

// const Seekerdashboard = () => {


//     return (
//         <>
//         </>
//     );
// };
const Seekerdashboard = () => {
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile);
    };

    const handleButtonClick = (button) => {
        if (selectedButton === button) {
            setSelectedButton(null);
        } else {
            setSelectedButton(button);
        }
    };

    const handleUpdateProfile = () => {
        if (selectedButton) {
            console.log('Fetching page for:', selectedButton);
            switch (selectedButton) {
                case 'fresher':
                    return "/fresher";
                case 'experience':
                    return "/experience";
                default:
                    break;
            }
        } else {
            return null;
        }
    };
    return (
        <div className={styles.seekerdashboardmainpage}> {/* Changed class name */}
            <div className={styles.seekerdashnav}> {/* Changed class name */}
                <h2 style={{ display: 'flex', alignItems: 'center' }}>Jobseeker Dashboard</h2>
                <div className={styles.usericonwrapper} onClick={toggleUserProfile}>
                    <FaUserCircle className={styles.seekeruser} /> {/* Changed class name */}
                </div>
            </div>
            {showUserProfile && (
                <div className={styles.seekerprofileform}> {/* Changed class name */}
                    <form className={styles.seekermainform}> {/* Changed class name */}
                        <div className={styles.seekerform}> {/* Changed class name */}
                            <label htmlFor='username'>Username:</label>
                            <input type='text' id='username' name='username' />
                        </div>
                    </form>
                </div>
            )}
            <div className={styles.seekerdashcontent}> {/* Changed class name */}
                <div className={styles.dashcontent}>
                     <Link href={'/seeker/searchforjob'} className={styles.seekerprobtn}>
                        <button type='submit' className={styles.seekerprobtns}>
                            Search for job
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.seekerprofile}> {/* Changed class name */}
                <div className={styles.dashboard}>
                    <img src='/assets/images/seeker.png' alt='' className={styles.seekerjob} /> 
                </div>
                <div className={styles.toprecruiters}>
                    {/* <button
                type='button'
                className={styles.top-button ${selectedButton === 'fresher' ? 'selected' : ''}}
                onClick={() => handleButtonClick('fresher')}
            >
                I am fresher {selectedButton === 'fresher' && <FaCheck />}
            </button> */}
                    <button
                        type='button'
                        // className={styles.`top-button ${selectedButton === 'experience' ? 'selected' : ''}`}
                        style={{ margin: '10px', width: '10.5rem' }}
                        onClick={() => handleButtonClick('experience')} >

                        I am experienced {selectedButton === 'experience' && <FaCheck />}
                    </button>

                </div>
            </div>
            <div className={styles.seekerupdate}> {/* Changed class name */}
                {handleUpdateProfile() === null ? (
                    <button className={styles.seekerupdateprofilebutton} onClick={() => alert('Please choose a role.')}>
                        Update Profile
                    </button>
                ) : (

                    // <Link href={'/recruiter/jobdetails'} >
                    //     <button type='submit' >
                    //     Post New Job
                    //     </button>
                    // </Link>
                    <Link href={'/seeker/experience'}>
                        <h1>Update Profile</h1>
                    </Link>
                )}
            </div>
        </div>

    )
}

export default Seekerdashboard;
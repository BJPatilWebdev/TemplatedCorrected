import {BiAlignLeft} from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaUserFriends } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
const routesConfig = [
  {
        id: 'dash',
        title: 'Dashboard',
        messageId: 'Dashboard',
        type: 'item',
        icon: <FaUserTie />,
        url: '/dashboard',
        // permittedRole:'Seeker'
  },

  {
    id: 'app',
    title: 'recruiter',
    messageId: 'recruiter',
    type: 'group',
    permittedRole:'recruiter',
    children: [
      

      {
        id: 'page-1',
        title: 'Page 1111',
        messageId: 'Post New Job',
        type: 'item',
        icon: <FaBriefcase />,
        url: '/recruiter/jobdetails',
        permittedRole:'recruiter'
       
      },
      
    ],
  },


  {
    id: 'app',
    title: 'seeker',
    messageId: 'seeker',
    type: 'group',
    permittedRole:'seeker',
    children: [
     
      {
        id: 'page-1',
        title: 'Page 1111',
        messageId: 'experience',
        type: 'item',
        icon: <FaUserFriends />,
        url: '/seeker/experience',
        permittedRole:'seeker'
      },
      {
        id: 'page-1',
        title: 'Page 1111',
        messageId: 'searchforjob',
        type: 'item',
        icon: <RiUserSearchFill />,
        url: '/seeker/searchforjob',
        permittedRole:'seeker'
      },
  
    ],
  },
];
export default routesConfig;

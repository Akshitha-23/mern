import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './profile.css'
// import ProfileBg from './page-bg2.png'
//import './ProfilePage.css';

const  ProfilePage = ({onLogin}) => {
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const toggleAbout = () => {
    setShowAbout(true);
    setShowEditProfile(false);
  };

  const toggleEditProfile = () => {
    setShowAbout(false);
    setShowEditProfile(true);
  };
  const params = new URLSearchParams(location.search);
  const rollnumber = params.get('roll');
  const [users, setUsers] = useState({});
  const [user,setUser] = useState({});

  const [editProfileData, setEditProfileData] = useState({
    firstname: '',
    secondname: '',
    mobile: '',
  });

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditProfileData({ ...editProfileData, [name]: value });
  };

  const url = `http://localhost:5000/students/${rollnumber}`;
  const userurl = `http://localhost:5000/user/${rollnumber}`;
  const fetchUserSData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        //console.log(data);
      } else {
        console.log('Error');
        //console.log(users);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(userurl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(data);
      } else {
        console.log('Error');
        console.log(user);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleEdit = async () => {
    try {
      const response = await fetch(userurl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProfileData),
      });

      if (response.ok) {
        // Profile updated successfully, you can handle this as needed
        console.log('Profile updated successfully');

      } else {
        console.log('Error updating profile');
      }
      //window.location.href = '/profile-page?roll=' + rollnumber;
    } catch (error) {
      console.log('Error:', error);
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProfileData),
      });

      if (response.ok) {
        // Profile updated successfully, you can handle this as needed
        console.log('Profile updated successfully');

      } else {
        console.log('Error updating profile');
      }
      window.location.href = '/profile-page?roll=' + rollnumber;
    } catch (error) {
      console.log('Error:', error);
    }

   
  };


  useEffect(() => {
    fetchUserData();
    fetchUserSData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  async function viewPerformance() {
    // window.location.href="/performance-page?roll="+users.rollnumber;
    window.location.href = "/sem1-chart?roll=" + users.rollnumber;
  }
  return (
    <div className="profile-page">
      <div className='profile-container'>

        <div className='header'>
          <h3>{users.name}</h3>
          <div className='viewbtn'>
            <button onClick={viewPerformance} className="view-performance-button">
              View Performance
            </button>
          </div>
        </div>
     
        {/* <div><a href="/">Dashboard</a>/<a href=''>Profile</a></div> */}
          <div className='cards'>
            <div className='profile-card'>
              <div className='upper-card'>
                <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000" alt="profile" className='profile'></img>
                <h4 className='displayname'>{users.secondname}</h4>
              </div>
            <div className='lowwer-card'>
                <p><span>Phone Number : </span>{user.mobile}</p>
                <p><span>Email : </span> {users.rollnumber}@cvr.ac.in</p>
            </div>
          </div>
        <div className='details-card'>
          <nav className='nav' style={{backgroundColor:'#bababa'}}>
            <span href='' onClick={toggleAbout}>About</span>
            <span href='' onClick={toggleEditProfile}>Edit Profile</span>
          </nav>
          {<div className='details'>
            {showAbout && 
                          (<div id="About">
                            <p>Roll Number : {users.rollnumber}</p>
                            <p>Degree : {users.degree}</p>
                            <p>Branch : {users.branch}</p>
                            <p>Section : {users.section}</p>
                          </div>)}
            { showEditProfile &&  
                          ( <div id="editprofile">
                          <form>
                            <label>First Name:</label>
                            <input
                              type="text"
                              name="firstname"
                              value={editProfileData.firstname}
                              onChange={handleEditInputChange}
                            />
                            <br />
                            <label>Second Name:</label>
                            <input
                              type="text"
                              name="secondname"
                              value={editProfileData.secondname}
                              onChange={handleEditInputChange}
                            />
                            <br />
                            <label>Phone Number:</label>
                            <input
                              type="text"
                              name="mobile"
                              value={editProfileData.mobile}
                              onChange={handleEditInputChange}
                            />
                            <br />
                            <button type="button" onClick={handleEdit}>
                              Edit details
                            </button>
                          </form>
                        </div> )
              }
            </div>
          }
       
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

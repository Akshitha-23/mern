import React from 'react';
import './AdminPage.css';
import { Link } from 'react-router-dom';

class AdminPage extends React.Component {
  render() {
    return (
      <div class="admin-page">
        <h1>Admin Page</h1>
        <input type="password" placeholder="Enter password" />
        <button>Login</button>
        <Link class="/admin" to="/forgot-password">Forgot Password</Link>
      </div>
    );
  }
}

export default AdminPage;

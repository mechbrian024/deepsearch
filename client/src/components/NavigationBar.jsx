import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 40px',
    backgroundColor: '#282c34',
    color: 'white',
  };

  const leftButtonStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  };

  const rightContainerStyle = {
    display: 'flex',
    gap: '15px',
  };

  const rightButtonStyle = {
    padding: '8px 14px',
    backgroundColor: '#1DB954',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={navStyle}>
      <button onClick={() => navigate('/landing')} style={leftButtonStyle}>
        Deep Search
      </button>

      <div style={rightContainerStyle}>
        <button onClick={() => navigate('/searches')} style={rightButtonStyle}>
          Your Searches
        </button>
        <button onClick={() => navigate('/playlists')} style={rightButtonStyle}>
          Your Playlists
        </button>
        <button onClick={() => navigate('/community')} style={rightButtonStyle}>
          Community
        </button>
        <button onClick={() => navigate('/account')} style={rightButtonStyle}>
          Account
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
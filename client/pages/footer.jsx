import React from 'react';

const Footer = props => {
  return (
    <div className="row footer">
      <div className="column-full">
        <div className="footer-container">
          <i className="fas fa-trophy size"></i>
          <i onClick = {() => props.handleFixtures(event)} className="fas fa-home size"></i>
          <i onClick = {() => props.handleProfile(event)} className="far fa-user-circle size"></i>
        </div>
      </div>
    </div>
  );
};
export default Footer;

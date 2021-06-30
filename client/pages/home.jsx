import React from 'react';
import { useMediaQuery } from 'react-responsive';
const Home = props => {
  const isNotMobile = useMediaQuery({ minWidth: 900 });
  return (
    <>
      <div className="overlay"></div>
      <div className="bg-image home-bg">
          <div className="title title-row">
            <a href="#fixtures">

            <span className="large">
              <h2>
                F<i className="fas fa-futbol logoSize"></i>tBets
              </h2>
            </span>
            </a>
            </div>

            <div className="align message-row">
              <h3 className = {isNotMobile ? 'lg' : ''}>
                An interactive competition against your friends to see who can rack up the
                most tokens!
              </h3>
              <h4 className = {isNotMobile ? 'lg' : ''}>Make wagers on football matches from all across the world!</h4>
          </div>
        <div className="button-container row button-row">
          <a href="#sign-in">
            <button className="sign-buttons " type="button">
              Sign In
            </button>
          </a>
          <a href="#sign-up">
            <button className="sign-buttons" type="button">
              Sign Up
            </button>
          </a>
        </div>
        </div>
    </>
  );
};
export default Home;
